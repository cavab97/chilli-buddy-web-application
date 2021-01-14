import { all, takeEvery, put, call, take, select } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import actions from "./actions";
import { voucherBackendServices } from "services/backend";
import { voucherDataServices } from "services/database";
import { promotionStorageServices } from "services/storage";

export const getVoucherState = state => state.Voucher;

function* readFromDatabase() {
  try {
    const vouchers = yield call(voucherDataServices.readObjects);

    yield put(actions.readFromDatabaseSuccess(vouchers));
  } catch (error) {
    console.log(error);
    yield put(actions.readFromDatabaseError(error));
  }
}

function* readSpecifiedRecord({ payload }) {
  try {
    const { id } = payload;
    const { vouchers } = yield select(getVoucherState);
    if (!id) {
      return yield put(actions.readSpecifiedRecordSuccess(null));
    }

    let voucher = vouchers.filter(voucher=>{
      return voucher.id === id
    })[0];

    if (!voucher) {
      voucher = yield call(voucherDataServices.readObject, { id });
      yield put(actions.readSpecifiedRecordSuccess(voucher));
    }

    yield put(actions.readSpecifiedRecordSuccess(voucher));
  } catch (error) {
    console.log(error);
    yield put(actions.readSpecifiedRecordError(error));
  }
}

function* submitIntoBackend({ payload }) {
  const { data, actionName } = payload;
  let result = {};
  
  delete data["created"];
  delete data["deleted"];
  delete data["updated"];

  try {
    switch (actionName) {
      case "delete":
        result = yield call(voucherBackendServices.remove, { data });
        break;
      case "restore":
        result = yield call(voucherBackendServices.restore, { data });
        break;
      case "update":
        result = yield call(voucherBackendServices.update, { data });
        break;
      default:
        result = yield call(voucherBackendServices.create, { data });
        break;
    }
    
    yield put(actions.submitToBackendSuccess(result));
    // if(["update", "insert"].includes(actionName))
    // {
    //   let shops = yield select(getShops);
    //   const nextPage = shops.modalCurrentPage + 1

    //   yield put(actions.modalControl({ toggle: nextPage > 1 , nextPage: nextPage > 1 ? 0: nextPage }));
    // }
    //yield put({ type: actions.READ_FROM_DATABASE });
  } catch (error) {
    console.log(error);
    yield put(actions.submitToBackendError(error));
  }
}

function* uploadToStorage({ payload }) {
  const { data } = payload;
  const { promotionId, file } = data;
  const channel = yield call(uploadProgressChannel, promotionId, file);

  try {
    while (true) {
      const result = yield take(channel);
      if (result.progress) {
        yield put(actions.uploadFileProgress(result.progress));
      } else if (result.url) {
        yield put(actions.uploadFileSuccess({ url: result.url }));
      }
    }
  } catch (error) {
    console.log(error);
    yield put(actions.uploadFileError(error));
  } finally {
    channel.close();
  }
}

function uploadProgressChannel(promotionId, file) {
  return eventChannel(emit => {
    const progressListener = promotionStorageServices
      .uploadFile({
        id: promotionId,
        file,
        progressListener: snap => {
          const progress = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100
          );
          emit({ progress });
        }
      })
      .then(({ url }) => {
        emit({ url });
        emit(END);
      });
    return () => {
      //progressListener();
    };
  });
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.READ_FROM_DATABASE, readFromDatabase),
    takeEvery(actions.READ_SPECIFIED_RECORD, readSpecifiedRecord),
    takeEvery(actions.SUBMIT_TO_BACKEND, submitIntoBackend),
    takeEvery(actions.UPLOAD_TO_STORAGE, uploadToStorage)
  ]);
}
