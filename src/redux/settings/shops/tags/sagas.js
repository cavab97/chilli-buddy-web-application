import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import FirebaseHelper from 'marslab-library-react/utils/helper/firebase';
import omit from 'lodash/omit';

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

const COLLECTION_NAME = 'settings'; // change your collection
var DOCUMENT_NAME = 'shops';
const COLLECTION_LIST = 'tags';
const ORDER_BY = 'no';
const ORDER = 'asc';

function* loadFromFirestore() {
  //console.log(action.item)
  try {
    const collections = database
      .collection(COLLECTION_NAME)
      .doc(DOCUMENT_NAME)
      .collection(COLLECTION_LIST)
      .where('deleted_at', '==', null)
      .orderBy(ORDER_BY, ORDER);
    const snapshot = yield call(rsfFirestore.getCollection, collections);
    let data = processFireStoreCollection(snapshot);
    yield put(actions.loadFromFireStoreSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(actions.loadFromFireStoreError(error));
  }
}


function* storeIntoFirestore({ payload }) {
  const { data, actionName ,item} = payload;
  try {
    switch (actionName) {
      case 'delete':
        yield call(rsfFirestore.setDocument, `${COLLECTION_NAME}/${DOCUMENT_NAME}/${COLLECTION_LIST}/${data.key}`, {
          ...data,
          deleted_at: new Date().getTime(),
        });
        break;
      case 'update':
        yield call(rsfFirestore.setDocument, `${COLLECTION_NAME}/${DOCUMENT_NAME}/${COLLECTION_LIST}/${data.key}`, 
          data
        );
        break;
      default:
        yield call(rsfFirestore.setDocument, `${COLLECTION_NAME}/${DOCUMENT_NAME}/${COLLECTION_LIST}/${data.key}`, data);
        break;
    }
    yield put({type:  actionName=== 'restore'? actions.LOAD_DELETED_DISPOSABLE_ITEM_FROM_FIRESTORE: actions.LOAD_FROM_FIRESTORE });
  } catch (error) {
    console.log(error);
    yield put(actions.saveIntoFireStoreError(error));
  }
}

const readAllFirestoreDocuments = async () =>
  await database
    .collection(COLLECTION_NAME)
    .get()
    .then(querySnapshot => {
      const documents = [];
      try {
        querySnapshot.forEach(doc => {
          documents.push(doc.id);
        });
      } catch (e) {}
      return documents;
    });


export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOAD_FROM_FIRESTORE, loadFromFirestore),
    takeEvery(actions.SAVE_INTO_FIRESTORE, storeIntoFirestore),
  ]);
}
