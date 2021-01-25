import { all, takeEvery, put, call, select, take } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import actions from "./actions";
import FirebaseHelper from "marslab-library-react/utils/helper/firebase";
import omit from "lodash/omit";
import { notification } from "marslab-library-react/components/organisms";
import firebase from "firebase";
import uuid from "uuid/v4";
import { backend, database as databaseHelper } from "../../marslab-library-react/utils/helper";
import * as auth from "marslab-library-react/services/auth";
import { merchantBackendServices } from "services/backend";
import { merchantDataServices } from "services/database";
import { merchantStorageServices } from "services/storage";

export const getMerchant = (state) => state.Merchant;

function* readFromDatabase() {
  try {
    const merchants = yield call(merchantDataServices.readObjects);

    yield put(actions.readFromDatabaseSuccess(merchants));
  } catch (error) {
    console.log(error);
    yield put(actions.readFromDatabaseError(error));
  }
}

function* readSpecifiedRecord({ payload }) {
  try {
    const { id } = payload;
    const { merchants } = yield select(getMerchant);
    if (!id) {
      return yield put(actions.readSpecifiedRecordSuccess(null));
    }

    let merchant = merchants.filter(merchant => {
      return merchant.id === id
    })[0];

    if (!merchant) {
      merchant = yield call(merchantDataServices.readObject, { id });
      yield put(actions.readSpecifiedRecordSuccess(merchant));
    }

    yield put(actions.readSpecifiedRecordSuccess(merchant));
  } catch (error) {
    console.log(error);
    yield put(actions.readSpecifiedRecordError(error));
  }
}

function* readSpecifiedUserMerchant({ payload }) {
  try {
    const uid = payload.data;

    const merchant = yield call(merchantDataServices.readSubjectObject, { uid });

    yield put(actions.readSpecifiedUserMerchantSuccess(merchant));
  } catch (error) {
    console.log(error);
    yield put(actions.readSpecifiedUserMerchantError(error));
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
        result = yield call(merchantBackendServices.remove, { data });
        break;
      case "restore":
        result = yield call(merchantBackendServices.restore, { data });
        break;
      case "update":
        result = yield call(merchantBackendServices.update, { data });
        break;
      default:
        result = yield call(merchantBackendServices.create, { data });
        break;
    }
    
    yield put(actions.submitToBackendSuccess(result));
    yield put({ type: actions.READ_FROM_DATABASE });
  } catch (error) {
    console.log(error);
    yield put(actions.submitToBackendError(error));
  }
}


function* uploadToStorage({ payload }) {
  const { data } = payload;
  const { merchantId, file } = data;
  const channel = yield call(uploadProgressChannel, merchantId, file);

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

function uploadProgressChannel(merchantId, file) {
  return eventChannel(emit => {
    const progressListener = merchantStorageServices
      .uploadFile({
        id: merchantId,
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
    takeEvery(actions.UPLOAD_TO_STORAGE, uploadToStorage),
    takeEvery(actions.READ_FROM_DATABASE_USER_MERCHANT, readSpecifiedUserMerchant)
  ]);
}
