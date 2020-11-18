import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import FirebaseHelper from 'marslab-library-react/utils/helper/firebase';

const {
  database,
  rsfFirestore,
  processFireStoreCollection,
} = FirebaseHelper;


/**
 * DOC: https://redux-saga-firebase.js.org/reference/dev/firestore
 */

const COLLECTION_NAME = 'merchants'; // change your collection
const ORDER_BY = 'createAt';
const ORDER = 'desc';
function* loadFromFirestore() {
  try {
    const collections = database
      .collection(COLLECTION_NAME)
      .where('deleted_at', '==', null)
      .orderBy(ORDER_BY, ORDER);
    const snapshot = yield call(rsfFirestore.getCollection, collections);
    let data = processFireStoreCollection(snapshot);
    yield put(actions.loadFromFireStoreSuccess(data));
  } catch (error) {
    console.log(error)
    yield put(actions.loadFromFireStoreError(error));
  }
}

function* loadDeletedUserFromFireStore() {
  try {
    const collections = database
      .collection(COLLECTION_NAME)
      .where('deleted_at', '>', 0)
      .orderBy('deleted_at', ORDER);
    const snapshot = yield call(rsfFirestore.getCollection, collections);
    let data = processFireStoreCollection(snapshot);
    yield put(actions.loadFromFireStoreSuccess(data));
  } catch (error) {
    console.log(error)
    yield put(actions.loadFromFireStoreError(error));
  }
}

function* storeIntoFirestore({ payload }) {
  const { data, actionName } = payload;
  try {
    switch (actionName) {
      case 'delete':
        yield call(rsfFirestore.updateDocument, `${COLLECTION_NAME}/${data.key}`, {
          ...data,
          deleted_at: new Date().getTime(),
        });
        break;
      case 'restore':
        yield call(rsfFirestore.updateDocument, `${COLLECTION_NAME}/${data.key}`, {
          ...data,
          deleted_at: null,
        });
        break;
      case 'update':
        yield call(rsfFirestore.updateDocument, `${COLLECTION_NAME}/${data.key}`, {
          ...data,
        });
        break;
      default:
        yield call(rsfFirestore.addDocument, `${COLLECTION_NAME}`, data);
        break;
    }
    yield put({type:  data.deleted_at !== null? actions.LOAD_DELETED_USER_FROM_FIRESTORE: actions.LOAD_FROM_FIRESTORE });
  } catch (error) {
    console.log(error)
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

function* checkUserID({ payload }) {
  const { id } = payload;
  try {
    const document = database
      .collection("users")
      .doc(id);
    const snapshot = yield call(rsfFirestore.getDocument, document);
    const exists = snapshot.exists
    if(exists){
      let data = snapshot.data()
      yield put(actions.checkUserIDSuccess(data));}
    else
      yield put(actions.checkUserIDError('The User ID Not Exist'));
  } catch (error) {
    console.log(error);
    yield put(actions.checkUserIDError(error));
  }
}


export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOAD_FROM_FIRESTORE, loadFromFirestore),
    takeEvery(actions.LOAD_DELETED_USER_FROM_FIRESTORE, loadDeletedUserFromFireStore),
    takeEvery(actions.SAVE_INTO_FIRESTORE, storeIntoFirestore),
    takeEvery(actions.USER_ID_CHECK, checkUserID),
  ]);
}
