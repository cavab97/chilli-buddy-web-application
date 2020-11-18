import { all, takeEvery, put, call, take, select } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import actions from "./actions";
import { rewardBackendServices } from "services/backend";
import { rewardDataServices } from "services/database";
import { rewardStorageServices } from "services/storage";

export const getRewardState = (state) => state.Reward;

function* readFromDatabase({ payload }) {
  const { id, groupName } = payload;
  try {
    const rewards = yield call(rewardDataServices.readObjects, {
      groupId: id,
      objectGroupName: groupName,
    });

    yield put(actions.readFromDatabaseSuccess(rewards));
  } catch (error) {
    console.log(error);
    yield put(actions.readFromDatabaseError(error));
  }
}

function* readSpecifiedRecord({ payload }) {
  try {
    const { id } = payload;
    // const { rewards } = yield select(getRewardState);

    if (!id) {
      return yield put(actions.readSpecifiedRecordSuccess(null));
    }

    // let reward = rewards.filter(reward=>{
    //   return reward.id === id
    // })[0];

    // if (!reward) {
    const reward = yield call(rewardDataServices.readObject, { id });
    // yield put(actions.pushNewRecord(reward));
    // }
    yield put(actions.readSpecifiedRecordSuccess(reward));
  } catch (error) {
    console.log(error);
    yield put(actions.readSpecifiedRecordError(error));
  }
}

function* readNextRank({ payload }) {
  const { id, groupName } = payload;
  try {
    const rank = yield call(rewardDataServices.readNextRank, {
      groupId: id,
      objectGroupName: groupName,
    });

    yield put(actions.readNextRankSuccess(rank));
  } catch (error) {
    console.log(error);
    yield put(actions.readNextRankError(error));
  }
}

function* submitIntoBackend({ payload }) {
  const { data, actionName, routeID, eventID } = payload;
  let result = {};

  delete data["created"];
  delete data["deleted"];
  delete data["updated"];

  try {
    switch (actionName) {
      case "delete":
        result = yield call(rewardBackendServices.remove, { data });
        break;
      case "restore":
        result = yield call(rewardBackendServices.restore, { data });
        break;
      case "update":
        result = yield call(rewardBackendServices.update, { data });
        break;
      case "assign":
        result = yield call(rewardBackendServices.assign, { data });
        break;
      case "claim":
        result = yield call(rewardBackendServices.claim, { data });
        break;
      default:
        result = yield call(
          rewardBackendServices.create,
          { data },
          { routeID, eventID }
        );
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
  const { rewardId, file } = data;
  const channel = yield call(uploadProgressChannel, rewardId, file);

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

function uploadProgressChannel(rewardId, file) {
  return eventChannel((emit) => {
    const progressListener = rewardStorageServices
      .uploadFile({
        id: rewardId,
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
    takeEvery(actions.READ_NEXT_RANK, readNextRank),
    takeEvery(actions.SUBMIT_TO_BACKEND, submitIntoBackend),
    takeEvery(actions.UPLOAD_TO_STORAGE, uploadToStorage),
  ]);
}
