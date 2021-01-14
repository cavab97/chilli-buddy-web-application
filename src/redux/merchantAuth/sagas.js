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

export const getMerchant = (state) => state.MerchantAuth;

const {
  database,
  createBatch,
  rsfFirestore,
  createNewRef,
  processFireStoreCollection,
} = FirebaseHelper;

/**
 * DOC: https://redux-saga-firebase.js.org/reference/dev/firestore
 */

const COLLECTION_NAME = "user"; // change your collection
const ORDER_BY = "createAt";
const ORDER = "desc";

function* loadFromFirestore() {
  try {
    const collections = database
      .collection(COLLECTION_NAME)
      .where("deleted_at", "==", null)
      .orderBy(ORDER_BY, ORDER);
    const snapshot = yield call(rsfFirestore.getCollection, collections);
    let data = processFireStoreCollection(snapshot);

    let result = {};

    Object.keys(data).forEach((recordId) => {
      const parent = databaseHelper.processData({ data: data[recordId] });
      const created = databaseHelper.processData({ data: data[recordId].created });
      const updated = databaseHelper.processData({ data: data[recordId].updated });

      const coverPic =
        data[recordId].coverPic === "" ||
        data[recordId].coverPic === null ||
        data[recordId].coverPic.length === 0
          ? []
          : [data[recordId].coverPic];

      const popUpImage =
        data[recordId].popUpImage === undefined ||
        data[recordId].popUpImage === "" ||
        data[recordId].popUpImage === null ||
        data[recordId].popUpImage.length === 0
          ? []
          : [data[recordId].popUpImage];

      //let subImage = [];

      // data[recordId].subImage.forEach((picUrl) => {
      //   if (picUrl !== "" && picUrl !== null) {
      //     subImage.push(picUrl);
      //   }
      // });

      const processedData = { ...parent, created, updated, coverPic, popUpImage };

      result = {
        ...result,
        [recordId]: processedData,
      };
    });

    yield put(actions.loadFromFireStoreSuccess(result));
  } catch (error) {
    console.log(error);
    yield put(actions.loadFromFireStoreError(error));
  }
}

export function* signupRequest({ payload }) {
  try {
    const { email, password } = payload;
    const user = yield call(merchantBackendServices.signup, { email, password });
    console.log(user);

    yield put(actions.signupSuccess({ user }));
  } catch (error) {
    console.log(error);
    yield put(actions.signupError({ error }));
  }
}

export function* signupSuccess({ payload }) {
  yield localStorage.setItem("user", JSON.stringify(payload.user));
}

export function* signupError() {}

function* storeIntoFirestore({ payload }) {
  const { data, actionName, item, deleted_at } = payload;
  //const { key, title, merchantDesc, description, createAt, endDate, startDate} = data;

  const postsRef = database.collection("posts").doc();
  const newKey = postsRef.id;

  let resultFirst = {};
  let result = {};
  let resultCreate = {};

  resultFirst = backend.processDataV2({ data });
  const created = backend.processDataV2({ data: data.created });
  const updated = backend.processDataV2({ data: data.updated });

  const coverPic = data.coverPic.length === 0 ? "" : data.coverPic[0];
  const popUpImage = data.popUpImage.length === 0 ? "" : data.popUpImage[0];
  const isPopUp = data.popUpImage[0] ? true : false;
  // let subImage = [];

  // for (let i = 0; i < 3; i++) {
  //   if (data.subImage[i] === null || data.subImage[i] === undefined || data.subImage[i] === "") {
  //     subImage.push("");
  //   } else {
  //     subImage.push(data.subImage[i]);
  //   }
  // }

  result = {
    ...resultFirst,
    created,
    updated,
    coverPic,
    popUpImage,
    isPopUp,
  };

  resultCreate = {
    ...resultFirst,
    key: newKey,
    created,
    updated,
    coverPic,
    popUpImage,
    isPopUp,
  };

  // throw null;

  let submitData = {};

  try {
    switch (actionName) {
      case "delete":
        submitData = yield call(rsfFirestore.updateDocument, `${COLLECTION_NAME}/${result.key}`, {
          ...omit(result, ["key"]),
          deleted_at: new Date().getTime(),
        });
        break;
      case "restore":
        submitData = yield call(rsfFirestore.updateDocument, `${COLLECTION_NAME}/${result.key}`, {
          ...omit(result, ["key"]),
          deleted_at: null,
        });
        break;
      case "update":
        submitData = yield call(rsfFirestore.updateDocument, `${COLLECTION_NAME}/${result.key}`, {
          ...omit(result, ["key"]),
          key: result.key,
        });
        break;
      default:
        submitData = yield call(
          rsfFirestore.setDocument,
          `${COLLECTION_NAME}/${newKey}`,
          resultCreate
        );

        yield put(actions.saveIntoFireStoreSuccess({ key: newKey }));

        break;
    }

    if (["update", "insert"].includes(actionName)) {
      let merchantAuth = yield select(getMerchant);
      const nextPage = merchantAuth.modalCurrentPage + 1;
      yield put(
        actions.toggleModal({ toggle: nextPage > 1, nextPage: nextPage > 1 ? 0 : nextPage })
      );
    }

    yield put({
      type:
        data.deleted_at !== null
          ? actions.LOAD_DELETED_USER_FROM_FIRESTORE
          : actions.LOAD_FROM_FIRESTORE,
    });
  } catch (error) {
    yield put(actions.saveIntoFireStoreError(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.SIGNUP_REQUEST, signupRequest),
/*     takeEvery(actions.SIGNUP_SUCCESS, signupSuccess),
    takeEvery(actions.SIGNUP_ERROR, signupError), */

    takeEvery(actions.LOAD_FROM_FIRESTORE, loadFromFirestore),
    takeEvery(actions.SAVE_INTO_FIRESTORE, storeIntoFirestore),
  ]);
}
