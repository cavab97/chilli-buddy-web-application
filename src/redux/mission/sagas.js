import { all, takeEvery, put, call, take, select } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import actions from "./actions";
import { missionBackendServices } from "services/backend";
import { missionDataServices } from "services/database";
import { missionStorageServices } from "services/storage";

export const getMissionState = state => state.Mission;

function* readFromDatabase({ payload }) {
  const { routeID } = payload
  try {
    const missions = yield call(missionDataServices.readObjects, {
      groupId: routeID,
    });

    yield put(actions.readFromDatabaseSuccess(missions));
  } catch (error) {
    console.log(error);
    yield put(actions.readFromDatabaseError(error));
  }
}

function* readSpecifiedRecord({ payload }) {
  try {
    const { id } = payload;
    const { missions } = yield select(getMissionState);

    if (!id) {
      return yield put(actions.readSpecifiedRecordSuccess(null));
    }

    let mission = missions.filter(mission=>{
      return mission.id === id
    })[0];

    if (!mission) {
        mission = yield call(missionDataServices.readObject, { id });
      yield put(actions.pushNewRecord(mission));
    }

    yield put(actions.readSpecifiedRecordSuccess(mission));
  } catch (error) {
    console.log(error);
    yield put(actions.readSpecifiedRecordError(error));
  }
}

function* submitIntoBackend({ payload }) {
  const { data, actionName, routeID } = payload;
  let result = {};
  
  delete data["created"];
  delete data["deleted"];
  delete data["updated"];

  try {
    switch (actionName) {
      case "delete":
        result = yield call(missionBackendServices.remove, { data });
        break;
      case "restore":
        result = yield call(missionBackendServices.restore, { data });
        break;
      case "update":
        result = yield call(missionBackendServices.update, { data });
        break;
      default:
        result = yield call(missionBackendServices.create, { data }, routeID);
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
  const { missionId, file } = data;
  const channel = yield call(uploadProgressChannel, missionId, file);

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

function uploadProgressChannel(missionId, file) {
  return eventChannel(emit => {
    const progressListener = missionStorageServices
      .uploadFile({
        id: missionId,
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
