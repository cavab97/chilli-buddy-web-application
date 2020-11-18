import { all, takeEvery, put, call, take, select } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import actions from "./actions";
import { promotionBackendServices } from "services/backend";
import { promotionDataServices } from "services/database";
import { promotionStorageServices } from "services/storage";

export const getPromotionState = state => state.Promotion;

function* readFromDatabase({ payload }) {
  const { shopID } = payload
  try {
    const promotions = yield call(promotionDataServices.readObjects, {
      groupId: shopID,
    });

    yield put(actions.readFromDatabaseSuccess(promotions));
  } catch (error) {
    console.log(error);
    yield put(actions.readFromDatabaseError(error));
  }
}

function* readSpecifiedRecord({ payload }) {
  try {
    const { id } = payload;
    const { promotions } = yield select(getPromotionState);
    if (!id) {
      return yield put(actions.readSpecifiedRecordSuccess(null));
    }

    let promotion = promotions.filter(promotion=>{
      return promotion.id === id
    })[0];

    if (!promotion) {
        promotion = yield call(promotionDataServices.readObject, { id });
      yield put(actions.readSpecifiedRecordSuccess(promotion));
    }

    yield put(actions.readSpecifiedRecordSuccess(promotion));
  } catch (error) {
    console.log(error);
    yield put(actions.readSpecifiedRecordError(error));
  }
}

function* submitIntoBackend({ payload }) {
  const { data, actionName, shopID } = payload;
  let result = {};
  
  delete data["created"];
  delete data["deleted"];
  delete data["updated"];

  try {
    switch (actionName) {
      case "delete":
        result = yield call(promotionBackendServices.remove, { data });
        break;
      case "restore":
        result = yield call(promotionBackendServices.restore, { data });
        break;
      case "update":
        result = yield call(promotionBackendServices.update, { data });
        break;
      default:
        result = yield call(promotionBackendServices.create, { data }, shopID);
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
