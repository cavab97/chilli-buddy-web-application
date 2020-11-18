import { all, takeEvery, put, call, take, select } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import actions from "./actions";
import { eventBackendServices } from "services/backend";
import { eventDataServices } from "services/database";
import { eventStorageServices } from "services/storage";

export const getEventState = (state) => state.Event;

function* readFromDatabase() {
  try {
    const events = yield call(eventDataServices.readObjects);

    yield put(actions.readFromDatabaseSuccess(events));
  } catch (error) {
    console.log(error);
    yield put(actions.readFromDatabaseError(error));
  }
}

function* readSpecifiedRecord({ payload }) {
  try {
    const { id } = payload;
    const { events } = yield select(getEventState);

    if (!id) {
      return yield put(actions.readSpecifiedRecordSuccess(null));
    }

    let event = events.filter((event) => {
      return event.id === id;
    })[0];

    if (!event) {
      event = yield call(eventDataServices.readObject, { id });
      yield put(actions.pushNewRecord(event));
    }

    yield put(actions.readSpecifiedRecordSuccess(event));
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
        result = yield call(eventBackendServices.remove, { data });
        break;
      case "restore":
        result = yield call(eventBackendServices.restore, { data });
        break;
      case "update":
        result = yield call(eventBackendServices.update, { data });
        break;
      case "publish":
        result = yield call(eventBackendServices.publish, { data });
        break;
      case "terminate":
        result = yield call(eventBackendServices.terminate, { data });
        break;
      default:
        result = yield call(eventBackendServices.create, { data });
        break;
    }


    yield put(actions.submitToBackendSuccess(result));
    // if(["update", "insert"].includes(actionName))
    // {
    //   let shops = yield select(getShops);
    //   const nextPage = shops.modalCurrentPage + 1

    //   yield put(actions.modalControl({ toggle: nextPage > 1 , nextPage: nextPage > 1 ? 0: nextPage }));
    // }
    yield put({ type: actions.READ_FROM_DATABASE });
  } catch (error) {
    console.log(error);
    yield put(actions.submitToBackendError(error));
  }
}

function* uploadToStorage({ payload }) {
  const { data } = payload;
  const { eventId, file } = data;
  const channel = yield call(uploadProgressChannel, eventId, file);

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

function uploadProgressChannel(eventId, file) {
  return eventChannel((emit) => {
    const progressListener = eventStorageServices
      .uploadFile({
        id: eventId,
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
