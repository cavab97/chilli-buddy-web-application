import { all, takeEvery, put, call } from "redux-saga/effects";
import actions from "./actions";
import FirebaseHelper from "marslab-library-react/utils/helper/firebase";
import omit from "lodash/omit";
import { shopCategoryDataServices } from "services/database";
import { ErrorMessage } from "formik";

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

const COLLECTION_NAME = "settings"; // change your collection
var DOCUMENT_NAME = "shops";
const COLLECTION_LIST = "categories";
const ORDER_BY = "no";
const ORDER = "asc";

function* loadFromFirestore() {
  //console.log(action.item)
  try {
    const collections = database
      .collection(COLLECTION_NAME)
      .doc(DOCUMENT_NAME)
      .collection(COLLECTION_LIST)
      .where("deleted_at", "==", null)
      .orderBy(ORDER_BY, ORDER);
    const snapshot = yield call(rsfFirestore.getCollection, collections);
    let data = processFireStoreCollection(snapshot);
    yield put(actions.loadFromFireStoreSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(actions.loadFromFireStoreError(error));
  }
}

function* loadSpecifyFromFirestore({ payload }) {
  const { id } = payload;
  //console.log(action.item)
  try {
    let categories = yield call(shopCategoryDataServices.readSpecifyObjects, { id });

    yield put(actions.loadSpecifyFromFireStoreSuccess(categories));
  } catch (error) {
    console.log(error);
    yield put(actions.loadSpecifyFromFireStoreError(error));
  }
}

function* storeIntoFirestore({ payload }) {
  console.log("hi");
  const { data, actionName, item } = payload;

  const collections = database.collection("shopPrivate0").where("deleted.at", "==", null);
  const snapshot = yield call(rsfFirestore.getCollection, collections);
  let shopData = processFireStoreCollection(snapshot);
  let result = [];

  Object.keys(shopData).forEach((shopId) => {
    const categoryId = shopData[shopId].d.categories;
    const id = categoryId.toString();
    result.push(id);
  });

  console.log("resukt: " + JSON.stringify(result));

  try {
    switch (actionName) {
      case "delete":
        const key = data.key.toString();
        console.log("data.key: " + key);
        const used = result.includes(key);
        if (used === false) {
          console.log("delete");
          yield call(
            rsfFirestore.setDocument,
            `${COLLECTION_NAME}/${DOCUMENT_NAME}/${COLLECTION_LIST}/${data.key}`,
            {
              ...omit(data, ["key"]),
              deleted_at: new Date().getTime(),
            }
          );
        } else {
          console.log("not delete");
          yield put(actions.deleteCategoriesError());
        }
        break;
      case "update":
        yield call(
          rsfFirestore.setDocument,
          `${COLLECTION_NAME}/${DOCUMENT_NAME}/${COLLECTION_LIST}/${data.key}`,
          {
            ...omit(data, ["key"]),
          }
        );
        break;
      default:
        yield call(
          rsfFirestore.setDocument,
          `${COLLECTION_NAME}/${DOCUMENT_NAME}/${COLLECTION_LIST}/${data.key}`,
          data
        );
        break;
    }
    yield put({
      type:
        actionName === "restore"
          ? actions.LOAD_DELETED_DISPOSABLE_ITEM_FROM_FIRESTORE
          : actions.LOAD_FROM_FIRESTORE,
    });
  } catch (error) {
    console.log(error);
    yield put(actions.saveIntoFireStoreError(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOAD_FROM_FIRESTORE, loadFromFirestore),
    takeEvery(actions.SAVE_INTO_FIRESTORE, storeIntoFirestore),
    takeEvery(actions.LOAD_SPECIFY_FROM_FIRESTORE, loadSpecifyFromFirestore),
  ]);
}
