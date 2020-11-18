import { all, takeEvery, put, call, take, select } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import actions from "./actions";
import { covid19ShopBackendServices } from "services/backend";
import { covid19ShopDataServices } from "services/database";
//import { rewardStorageServices } from "services/storage";


function* readFromDatabase() {

  try {
    const covid19Shops = yield call(covid19ShopDataServices.readObjects);

    yield put(actions.readFromDatabaseSuccess(covid19Shops));
  } catch (error) {
    console.log(error);
    yield put(actions.readFromDatabaseError(error));
  }
}

// function* readByDate({ payload }) {
//   const { groupId, startDate, endDate } = payload;
//   try {
//     const covid19NameLists = yield call(covid19ShopDataServices.readByDates, {
//       groupId, startDate, endDate
//     });

//     yield put(actions.readByDateSuccess(covid19NameLists));
//   } catch (error) {
//     console.log(error);
//     yield put(actions.readByDateError(error));
//   }
// }

function* readSpecifiedRecord({ payload }) {
  try {
    const { id } = payload;

    if (!id) {
      return yield put(actions.readSpecifiedRecordSuccess(null));
    }
    
    const covid19Shop = yield call(covid19ShopDataServices.readObject, { id });

    yield put(actions.readSpecifiedRecordSuccess(covid19Shop));
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
      case "update":
        result = yield call(covid19ShopBackendServices.update, { data });
        break;
      default:
        result = yield call(covid19ShopBackendServices.create,{ data }, userID);
        break;
    }

    yield put(actions.submitToBackendSuccess(result));

  } catch (error) {
    console.log(error);
    yield put(actions.submitToBackendError(error));
  }
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
    takeEvery(actions.READ_FROM_DATABASE, readFromDatabase),
    // takeEvery(actions.READ_BY_DATE, readByDate),
    takeEvery(actions.READ_SPECIFIED_RECORD, readSpecifiedRecord),
    takeEvery(actions.SUBMIT_TO_BACKEND, submitIntoBackend),
    // takeEvery(actions.UPLOAD_TO_STORAGE, uploadToStorage),
  ]);
}
