import { all, takeEvery, put, call, take, select } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import actions from "./actions";
import { Map } from 'immutable';
import { covid19NameListBackendServices } from "services/backend";
import { covid19NameListDataServices } from "services/database";
//import { rewardStorageServices } from "services/storage";

export const getCovid19NameListState = state => state.Covid19NameList;

function getCovid19User() {
  try {
    const covid19User = localStorage.getItem('covid19User');

    return new Map({covid19User});
  } catch (err) {
    localStorage.removeItem('covid19User');
    return new Map();
  }
}

function* readLocalStorage() {
  try {
    let covid19NameList = JSON.parse(getCovid19User().get("covid19User"));

    yield put(actions.readLocalStorageSuccess(covid19NameList));
  } catch (error) {
    console.log(error);
    yield put(actions.readLocalStorageError(error));
  }
}

function* readFromDatabase({ payload }) {
  const { groupId } = payload;
  try {
    const covid19NameLists = yield call(covid19NameListDataServices.readObjects, {
      groupId
    });

    yield put(actions.readFromDatabaseSuccess(covid19NameLists));
  } catch (error) {
    console.log(error);
    yield put(actions.readFromDatabaseError(error));
  }
}

function* readByDate({ payload }) {
  const { groupId, startDate, endDate } = payload;
  try {
    const covid19NameLists = yield call(covid19NameListDataServices.readByDates, {
      groupId, startDate, endDate
    });

    yield put(actions.readByDateSuccess(covid19NameLists));
  } catch (error) {
    console.log(error);
    yield put(actions.readByDateError(error));
  }
} 

function* readSpecifiedRecord({ payload }) {
  try {
    const { id } = payload;

    if (!id) {
      return yield put(actions.readSpecifiedRecordSuccess(null));
    }

    const covid19NameList = yield call(covid19NameListDataServices.readObject, { id });

    yield put(actions.readSpecifiedRecordSuccess(covid19NameList));
  } catch (error) {
    console.log(error);
    yield put(actions.readSpecifiedRecordError(error));
  }
}

function* submitIntoBackend({ payload }) {
  const { data, actionName, userID } = payload;
  let result = {};

  delete data["created"];
  delete data["deleted"];
  delete data["updated"];

  try {
    switch (actionName) {
      // case "delete":
      //   result = yield call(rewardBackendServices.remove, { data });
      //   break;
      // case "restore":
      //   result = yield call(rewardBackendServices.restore, { data });
      //   break;
      // case "update":
      //   result = yield call(rewardBackendServices.update, { data });
      //   break;
      default:
        result = yield call(covid19NameListBackendServices.create,{ data }, userID);
        break;
    }

    yield put(actions.submitToBackendSuccess(result));

  } catch (error) {
    console.log(error);
    yield put(actions.submitToBackendError(error));
  }
}

export function* submitIntoBackendSuccess({ payload }) {
  const { covid19NameList } = yield select(getCovid19NameListState);

  const user = {
    name: covid19NameList.name,
    phoneNumber: covid19NameList.phoneNumber,
  }

  console.log(user);

  yield localStorage.setItem("covid19User", JSON.stringify(user));
}
// function* uploadToStorage({ payload }) {
//   const { data } = payload;
//   const { rewardId, file } = data;
//   const channel = yield call(uploadProgressChannel, rewardId, file);

//   try {
//     while (true) {
//       const result = yield take(channel);
//       if (result.progress) {
//         yield put(actions.uploadFileProgress(result.progress));
//       } else if (result.url) {
//         yield put(actions.uploadFileSuccess({ url: result.url }));
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     yield put(actions.uploadFileError(error));
//   } finally {
//     channel.close();
//   }
// }

// function uploadProgressChannel(rewardId, file) {
//   return eventChannel((emit) => {
//     const progressListener = rewardStorageServices
//       .uploadFile({
//         id: rewardId,
//         file,
//         progressListener: (snap) => {
//           const progress = Math.round(
//             (snap.bytesTransferred / snap.totalBytes) * 100
//           );
//           emit({ progress });
//         },
//       })
//       .then(({ url }) => {
//         emit({ url });
//         emit(END);
//       });
//     return () => {
//       //progressListener();
//     };
//   });
// }

export default function* rootSaga() {
  yield all([
    takeEvery(actions.READ_FROM_LOCAL_STORAGE, readLocalStorage),
    takeEvery(actions.READ_FROM_DATABASE, readFromDatabase),
    takeEvery(actions.READ_BY_DATE, readByDate),
    takeEvery(actions.READ_SPECIFIED_RECORD, readSpecifiedRecord),
    takeEvery(actions.SUBMIT_TO_BACKEND, submitIntoBackend),
    takeEvery(actions.SUBMIT_TO_BACKEND_SUCCESS, submitIntoBackendSuccess),
    // takeEvery(actions.UPLOAD_TO_STORAGE, uploadToStorage),
  ]);
}
