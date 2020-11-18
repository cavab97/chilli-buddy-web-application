import { all, takeEvery, put, call, take, select } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import actions from "./actions";
import { shopPostBackendServices } from "services/backend";
import { shopPostDataServices } from "services/database";
import { shopPostStorageServices } from "services/storage";

export const getShopPostState = (state) => state.ShopPost;

function* readFromDatabase({ payload }) {
  try {
    const { groupId } = payload;

    const shopPosts = yield call(shopPostDataServices.readObjects, { groupId });

    yield put(actions.readFromDatabaseSuccess(shopPosts));
  } catch (error) {
    console.log(error);
    yield put(actions.readFromDatabaseError(error));
  }
}

function* readSpecifiedRecord({ payload }) {
  try {
    const { id } = payload;
    const { posts } = yield select(getShopPostState);
    if (!id) {
      return yield put(actions.readSpecifiedRecordSuccess(null));
    }

    let shopPost = posts.filter((post) => {
      return post.id === id;
    })[0];

    if (!shopPost) {
      shopPost = yield call(shopPostDataServices.readObject, { id });
      yield put(actions.readSpecifiedRecordSuccess(shopPost));
    }

    yield put(actions.readSpecifiedRecordSuccess(shopPost));
  } catch (error) {
    console.log(error);
    yield put(actions.readSpecifiedRecordError(error));
  }
}

function* submitIntoBackend({ payload }) {
  const { data, actionName, shopID } = payload;
  let result = {};

  delete data["created"];
  delete data["deleted"];
  delete data["updated"];
  

  try {
    switch (actionName) {
      case "delete":
        result = yield call(shopPostBackendServices.remove, { data });
        break;
      case "restore":
        result = yield call(shopPostBackendServices.restore, { data });
        break;
      case "update":
        result = yield call(shopPostBackendServices.update, { data });
        break;
      case "publish":
        result = yield call(shopPostBackendServices.publish, { data });
        break;
      case "terminate":
        result = yield call(shopPostBackendServices.terminate, { data });
        break;
      default:
        result = yield call(shopPostBackendServices.create, { data }, shopID);
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
  const { shopPostId, file } = data;
  const channel = yield call(uploadProgressChannel, shopPostId, file);

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

function uploadProgressChannel(shopPostId, file) {
  return eventChannel((emit) => {
    const progressListener = shopPostStorageServices
      .uploadFile({
        id: shopPostId,
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
