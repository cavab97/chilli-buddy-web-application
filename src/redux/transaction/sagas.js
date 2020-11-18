import { all, takeEvery, put, call, take, select } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import actions from "./actions";
import { transactionBackendServices } from "services/backend";
import { transactionDataServices } from "services/database";
import { transactionStorageServices } from "services/storage";

export const getTransactions = (state) => state.Transactions;

function* readFromDatabase({ payload }) {
  const { routeTicketId } = payload;

  try {
    let transactions = [];
    if (routeTicketId === null) {
      transactions = [];
    } else if (routeTicketId) {
      transactions = yield call(
        transactionDataServices.readRouteTicketTransactions,
        { routeTicketId }
      );
    } else {
      transactions = yield call(transactionDataServices.readObjects);
    }

    yield put(actions.readFromDatabaseSuccess(transactions));
  } catch (error) {
    console.log(error);
    yield put(actions.readFromDatabaseError(error));
  }
}

function* submitIntoBackend({ payload }) {
  const { data, actionName, routeTicketId } = payload;
  let result = {};
  /*   
  delete data["created"];
  delete data["deleted"];
  delete data["updated"]; */

  try {
    switch (actionName) {
      case "approve":
        result = yield call(transactionBackendServices.approve, { data });
        break;
      case "reject":
        result = yield call(transactionBackendServices.reject, { data });
        break;
    }

    yield put(actions.submitToBackendSuccess(result));
    yield put({ type: actions.READ_FROM_DATABASE, payload: { routeTicketId } });
  } catch (error) {
    console.log(error);
    yield put(actions.submitToBackendError(error));
  }
}

function* uploadToStorage({ payload }) {
  const { data } = payload;
  const { transactionId, file } = data;
  const channel = yield call(uploadProgressChannel, transactionId, file);

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

function uploadProgressChannel(transactionId, file) {
  return eventChannel((emit) => {
    const progressListener = transactionStorageServices
      .uploadFile({
        transactionId,
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
    takeEvery(actions.SUBMIT_TO_BACKEND, submitIntoBackend),
    takeEvery(actions.UPLOAD_TO_STORAGE, uploadToStorage),
  ]);
}
