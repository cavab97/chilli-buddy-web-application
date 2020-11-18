import { all, takeEvery, put, call, take ,select } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import actions from "./actions";
import { shopBackendServices } from "services/backend";
import { shopDataServices } from "services/database";
import { shopStorageServices } from "services/storage";

export const getShops = (state) => state.Shops

function* readFromDatabase() {
  try {
    const shops = yield call(shopDataServices.readObjects);

    yield put(actions.readFromDatabaseSuccess(shops));
  } catch (error) {
    console.log(error);
    yield put(actions.readFromDatabaseError(error));
  }
}

function* readSpecifiedRecord({ payload }) {
  try {
    const { id } = payload;
    const { shops } = yield select(getShops);

    if (!id) {
      return yield put(actions.readSpecifiedRecordSuccess(null));
    }

    let shop = shops.filter(shop=>{
      return shop.id === id
    })[0];

    if (!shop) {
      shop = yield call(shopDataServices.readObject, { id });
    }

    if(shop)
      yield put(actions.readSpecifiedRecordSuccess(shop));
    else
      yield put(actions.readSpecifiedRecordSuccess(null));

  } catch (error) {
    console.log(error);
    yield put(actions.readSpecifiedRecordError(error));
  }
}

function* submitIntoBackend({ payload }) {
  const { data, actionName } = payload;
  let result = {};
  console.log(data)
  delete data["created"];
  delete data["deleted"];
  delete data["updated"];

  try {
    switch (actionName) {
      case "delete":
        result = yield call(shopBackendServices.remove, { data });
        break;
      case "restore":
        result = yield call(shopBackendServices.restore, { data });
        break;
      case "update":
        result = yield call(shopBackendServices.update, { data });
        break;
      default:
        result = yield call(shopBackendServices.create, { data });
        break;
    }
    
    yield put(actions.submitToBackendSuccess(result));
    if(["update", "insert"].includes(actionName))
    {
      let shops = yield select(getShops);
      const nextPage = shops.modalCurrentPage + 1

      yield put(actions.modalControl({ toggle: nextPage > 1 , nextPage: nextPage > 1 ? 0: nextPage }));
    }
    yield put({ type: actions.READ_FROM_DATABASE });
    
  } catch (error) {
    console.log(error);
    yield put(actions.submitToBackendError(error));
  }
}

function* uploadToStorage({ payload }) {
  const { data } = payload;
  console.log(payload)
  const { shopId, file } = data;
  console.log(payload)
  const channel = yield call(uploadProgressChannel, shopId, file);

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

function uploadProgressChannel(shopId, file) {
  return eventChannel(emit => {
    const progressListener = shopStorageServices
      .uploadFile({
        shopId,
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
