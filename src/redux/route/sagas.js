import { all, takeEvery, put, call, take, select } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import actions from "./actions";
import { routeBackendServices } from "services/backend";
import { routeDataServices } from "services/database";
import { routeStorageServices } from "services/storage";

export const getRouteState = (state) => state.Route;

function* readFromDatabase({ payload }) {
  const { routeGroupID } = payload;
  try {
    const routes = yield call(routeDataServices.readObjects, {
      groupId: routeGroupID,
    });
    yield put(actions.readFromDatabaseSuccess(routes));
  } catch (error) {
    console.log(error);
    yield put(actions.readFromDatabaseError(error));
  }
}

function* readSpecifiedRecord({ payload }) {
  try {
    const { id } = payload;
    const { routes } = yield select(getRouteState);

    if (!id) {
      return yield put(actions.readSpecifiedRecordSuccess(null));
    }

    let route = routes.filter((route) => {
      return route.id === id;
    })[0];

    if (!route) {
      route = yield call(routeDataServices.readObject, { id });
      yield put(actions.pushNewRecord(route));
    }

    yield put(actions.readSpecifiedRecordSuccess(route));
  } catch (error) {
    yield put(actions.readSpecifiedRecordError(error));
  }
}

function* submitIntoBackend({ payload }) {
  const { data, actionName, routeGroupID } = payload;
  let result = {};

  delete data["created"];
  delete data["deleted"];
  delete data["updated"];

  try {
    switch (actionName) {
      case "delete":
        result = yield call(routeBackendServices.remove, { data });
        break;
      case "restore":
        result = yield call(routeBackendServices.restore, { data });
        break;
      case "update":
        result = yield call(routeBackendServices.update, { data });
        break;
      case "publish":
        result = yield call(routeBackendServices.publish, { data });
        break;
      case "terminate":
        result = yield call(routeBackendServices.terminate, { data });
        break;
      case "assignComplete":
        result = yield call(routeBackendServices.assignComplete, { data });
        break;
      default:
        result = yield call(
          routeBackendServices.create,
          { data },
          routeGroupID
        );
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
  const { routeId, file } = data;
  const channel = yield call(uploadProgressChannel, routeId, file);


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

function uploadProgressChannel(routeId, file) {
  return eventChannel((emit) => {
    const progressListener = routeStorageServices
      .uploadFile({
        id: routeId,
        file,
        progressListener: (snap) => {
          const progress = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100
          );
          emit({ progress });
        },
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
    takeEvery(actions.UPLOAD_TO_STORAGE, uploadToStorage),
  ]);
}
