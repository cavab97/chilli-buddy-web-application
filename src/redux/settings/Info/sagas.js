import { all, takeEvery, put, call, take, select } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import actions from "./actions";
import { settingInfoBackendServices } from "services/backend";
import { settingInfoDataServices } from "services/database";
import { settingInfoStorageServices } from "services/storage";

export const getSettingInfoState = state => state.SettingInfo;

function* readFromDatabase() {
  try {
    const settingInfo = yield call(settingInfoDataServices.readObject,{ id:"info" });

    if(settingInfo){
      yield put(actions.readFromDatabaseSuccess(settingInfo));
    }else{
      yield put(actions.readFromDatabaseSuccess());
    }

  } catch (error) {
    console.log(error);
    yield put(actions.readFromDatabaseError(error));
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
      case "update":
        result = yield call(settingInfoBackendServices.update, { data });
        break;
    }

    yield put(actions.submitToBackendSuccess(result));
  } catch (error) {
    console.log(error);
    yield put(actions.submitToBackendError(error));
  }
}

function* uploadToStorage({ payload }) {
  const { data } = payload;
  const { id, file } = data;
  const channel = yield call(uploadProgressChannel, id, file);

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

function uploadProgressChannel(id, file) {
  return eventChannel(emit => {
    const progressListener = settingInfoStorageServices
      .uploadFile({
        id: id,
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
    takeEvery(actions.SUBMIT_TO_BACKEND, submitIntoBackend),
    takeEvery(actions.UPLOAD_TO_STORAGE, uploadToStorage)
  ]);
}
