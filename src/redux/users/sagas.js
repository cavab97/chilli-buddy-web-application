import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import { userDataServices } from "services/database";
import FirebaseHelper from 'marslab-library-react/utils/helper/firebase';
import omit from 'lodash/omit';
import { authBackendServices } from "services/backend";

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

const COLLECTION_NAME = 'users'; // change your collection
const SUBCOLLECTION_NAME = 'permission';
const ROLE_INFO ='roleInfo';
const ORDER_BY = 'uid';
const ORDER = 'asc';

function* readFromDatabase() {
  try {
    const users = yield call(userDataServices.readObjects);

    yield put(actions.readFromDatabaseSuccess(users));
  } catch (error) {
    console.log(error);
    yield put(actions.readFromDatabaseError(error));
  }
}

function* loadFromFirestore() {
  try {
    const collections = database
      .collection(COLLECTION_NAME)
      .where('deleted_at', '==', null)
      .where('providerId', '==', "admin portal")
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
  const { data, actionName ,item} = payload;
  let batch = createBatch();
  try {
    switch (actionName) {
      case 'delete':
        yield call(rsfFirestore.updateDocument, `${COLLECTION_NAME}/${data.key}`, {
          ...data,
          deleted_at: new Date().getTime(),
        });
        break;
      case 'restore':
        batch.update(database.collection(COLLECTION_NAME).doc(data.key), {...data, deleted_at: null});
        batch.update(database.collection(COLLECTION_NAME).doc(data.key).collection(SUBCOLLECTION_NAME).doc(ROLE_INFO), {role:data.role, merchantID:data.merchantID,shopID:data.shopID});
        batch.commit();
        break;
      case 'update':
        batch.update(database.collection(COLLECTION_NAME).doc(data.key), {...data, deleted_at: null});
        batch.update(database.collection(COLLECTION_NAME).doc(data.key).collection(SUBCOLLECTION_NAME).doc(ROLE_INFO), {role:data.role, merchantID:data.merchantID,shopID:data.shopID});
        batch.commit();
        break;
      default:
        batch.set(database.collection(COLLECTION_NAME).doc(data.key), data);
        batch.set(database.collection(COLLECTION_NAME).doc(data.key).collection(SUBCOLLECTION_NAME).doc(ROLE_INFO), {role:data.role, merchantID:data.merchantID,shopID:data.shopID});
        batch.commit();
        break;
    }
    yield put({type:  data.deleted_at !== null? actions.LOAD_DELETED_USER_FROM_FIRESTORE: actions.LOAD_FROM_FIRESTORE });
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

export function* signupRequest({ payload }) {
  try {
    const { data } = payload; 
    const user = yield call(authBackendServices.signup, { data });

    yield put(actions.signupSuccess({ user }));
  } catch (error) {
    console.log(error);
    yield put(actions.signupError({ error }));
  }
}

// function* resetFireStoreDocuments() {
//   try {
//     const docsKey = yield call(readAllFirestoreDocuments);

//     let batch = createBatch();
//     docsKey.forEach(key => {
//       batch.delete(database.collection(COLLECTION_NAME).doc(key));
//       batch.commit();
//       batch = createBatch();
//     });

//     batch = createBatch();
//     fakeDataList.forEach(user => {
//       const doc = database.collection(COLLECTION_NAME).doc(createNewRef());
//       batch.set(doc, user);
//     });
//     batch.commit();

//     yield put({ type: actions.LOAD_FROM_FIRESTORE });
//   } catch (error) {
//   }
// }

export default function* rootSaga() {
  yield all([
    takeEvery(actions.READ_FROM_DATABASE, readFromDatabase),
    takeEvery(actions.LOAD_FROM_FIRESTORE, loadFromFirestore),
    takeEvery(actions.LOAD_DELETED_USER_FROM_FIRESTORE, loadDeletedUserFromFireStore),
    takeEvery(actions.SAVE_INTO_FIRESTORE, storeIntoFirestore),
    takeEvery(actions.SIGNUP_REQUEST, signupRequest)
  ]);
}
