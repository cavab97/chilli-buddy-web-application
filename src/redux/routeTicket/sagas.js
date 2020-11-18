import { all, takeEvery, put, call, take, select } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import actions from "./actions";
import { routeTicketBackendServices } from "services/backend";
import { routeTicketDataServices } from "services/database";
// import { routeTicketStorageServices } from "services/storage";

export const getRouteTicketState = (state) => state.RouteGroup;

function* readFromDatabase({ payload }) {
  const { startTime, endTime } = payload;
  try {
    let routeTickets = yield call(routeTicketDataServices.readObjects, {
      startTime,
      endTime,
    });

    const filteredRouteTickets = [];

    routeTickets.forEach((routeTicket) => {
      if (routeTicket.route.type === "Luxury") {
        filteredRouteTickets.push(routeTicket);
      } else if (
        routeTicket.route.type === "Casual" &&
        routeTicket.numberCompletedMissions > 0
      ) {
        filteredRouteTickets.push(routeTicket);
      }
    });

    yield put(actions.readFromDatabaseSuccess(filteredRouteTickets));
  } catch (error) {
    console.log(error);
    yield put(actions.readFromDatabaseError(error));
  }
}

//let channel = {};

function* listenByObjectGroup({ payload }) {
  const { groupId } = payload;
  const channel = yield call(listenChannel, groupId);

  try {
    while (true) {
      const result = yield take(channel);

      yield put(actions.readFromDatabaseSuccess(result.routeTicket));
    }
  } catch (error) {
    console.log(error);
    yield put(actions.readFromDatabaseError(error));
  } finally {
    channel.close();
  }
}

function listenChannel(groupId) {
  return eventChannel((emit) => {
    routeTicketDataServices
      .listenObjectsByObjectGroup({
        groupId,
        updateListener: (routeTicket) => {
          emit({ routeTicket });
        },
      })
      /* .then(({ url }) => {
        emit({ url });
        emit(END);
      }); */
    return () => {
      //progressListener();
    };
  });
}

function* unlistenObjectsByObjectGroup() {
  //channel.close();
  routeTicketDataServices.unlistenObjectsByObjectGroup();
}
// function* readSpecifiedRecord({ payload }) {
//   try {
//     const { id } = payload;
//     const { routeGroups } = yield select(getRouteGroupState);

//     if (!id) {
//       return yield put(actions.readSpecifiedRecordSuccess(null));
//     }

//     let routeGroup = routeGroups.filter(routeGroup=>{
//       return routeGroup.id === id
//     })[0];

//     if (!routeGroup) {
//       routeGroup = yield call(routeGroupDataServices.readObject, { id });
//       yield put(actions.pushNewRecord(routeGroup));
//     }

//     yield put(actions.readSpecifiedRecordSuccess(routeGroup));
//   } catch (error) {
//     console.log(error);
//     yield put(actions.readSpecifiedRecordError(error));
//   }
// }

function* submitIntoBackend({ payload }) {
  const { data, actionName } = payload;
  let result = {};

  delete data["created"];
  delete data["deleted"];
  delete data["updated"];

  try {
    switch (actionName) {
      // case "delete":
      //   result = yield call(routeTicketBackendServices.remove, { data });
      //   break;
      // case "restore":
      //   result = yield call(routeTicketBackendServices.restore, { data });
      //   break;
      case "verify":
        result = yield call(routeTicketBackendServices.verify, { data });
        break;
      default:
        // result = yield call(routeTicketBackendServices.create, { data });
        break;
    }

    yield put(actions.submitToBackendSuccess(result));
    // if(["update", "insert"].includes(actionName))
    // {
    //   let shops = yield select(getShops);
    //   const nextPage = shops.modalCurrentPage + 1

    //   yield put(actions.modalControl({ toggle: nextPage > 1 , nextPage: nextPage > 1 ? 0: nextPage }));
    // }
    // yield put({ type: actions.READ_FROM_DATABASE });
  } catch (error) {
    console.log(error);
    yield put(actions.submitToBackendError(error));
  }
}

// function* uploadToStorage({ payload }) {
//   const { data } = payload;
//   const { routeGroupId, file } = data;
//   const channel = yield call(uploadProgressChannel, routeGroupId, file);

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

// function uploadProgressChannel(routeGroupId, file) {
//   return eventChannel(emit => {
//     const progressListener = routeGroupStorageServices
//       .uploadFile({
//         id: routeGroupId,
//         file,
//         progressListener: snap => {
//           const progress = Math.round(
//             (snap.bytesTransferred / snap.totalBytes) * 100
//           );
//           emit({ progress });
//         }
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
    takeEvery(actions.READ_BY_OBJECTGROUP, listenByObjectGroup),
    takeEvery(actions.REMOVE_LISTEN_BY_OBJECT_GROUP , unlistenObjectsByObjectGroup),
    // takeEvery(actions.READ_SPECIFIED_RECORD, readSpecifiedRecord),
    takeEvery(actions.SUBMIT_TO_BACKEND, submitIntoBackend),
    // takeEvery(actions.UPLOAD_TO_STORAGE, uploadToStorage)
  ]);
}
