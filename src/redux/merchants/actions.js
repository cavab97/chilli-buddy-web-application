const DOCUMENT = 'MERCHANT_';

const actions = {
  LOAD_FROM_FIRESTORE: DOCUMENT + 'LOAD_FROM_FIRESTORE',
  LOAD_DELETED_USER_FROM_FIRESTORE: DOCUMENT + 'LOAD_DELETED_USER_FROM_FIRESTORE',
  LOAD_FROM_FIRESTORE_SUCCESS: DOCUMENT + 'LOAD_FROM_FIRESTORE_SUCCESS',
  LOAD_FROM_FIRESTORE_ERROR: DOCUMENT + 'LOAD_FROM_FIRESTORE_ERROR',

  SAVE_INTO_FIRESTORE: DOCUMENT + 'SAVE_INTO_FIRESTORE',
  
  SAVE_INTO_FIRESTORE_ERROR: DOCUMENT + 'SAVE_INTO_FIRESTORE_ERROR',
  RESET_FIRESTORE_DOCUMENTS: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS',
  RESET_FIRESTORE_DOCUMENTS_ERROR: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS_ERROR',

  TOGGLE_FIRESTORE_HANDLE_MODAL: DOCUMENT + 'TOGGLE_FIRESTORE_HANDLE_MODAL',
  FIRESTORE_UPDATE: DOCUMENT + 'FIRESTORE_UPDATE',

  USER_ID_CHECK: DOCUMENT + 'ID_CHECK',
  USER_ID_CHECK_SUCCESS: DOCUMENT + 'ID_CHECK_SUCCESS',
  USER_ID_CHECK_ERROR: DOCUMENT + 'ID_CHECK_ERROR',

  loadFromFireStore: () => {
    return { type: actions.LOAD_FROM_FIRESTORE };
  },

  loadDeletedUserFromFireStore: () => {
    return { type: actions.LOAD_DELETED_USER_FROM_FIRESTORE};
  },

  loadFromFireStoreSuccess: data => ({
    type: actions.LOAD_FROM_FIRESTORE_SUCCESS,
    payload: { data },
  }),

  loadFromFireStoreError: error => ({
    type: actions.LOAD_FROM_FIRESTORE_ERROR,
    payload: { error },
  }),

  saveIntoFireStore: (data, actionName = 'insert') => ({
    type: actions.SAVE_INTO_FIRESTORE,
    payload: { data, actionName },
  }),

  checkUserID: (id) =>({
    type: actions.USER_ID_CHECK,
    payload: {id},
  }),

  checkUserIDSuccess: data =>({
    type: actions.USER_ID_CHECK_SUCCESS,
    payload: { data},
  }),

  checkUserIDError: error =>({
    type: actions.USER_ID_CHECK_ERROR,
    payload: { error},
  }),

  toggleModal: (data = null) => ({
    type: actions.TOGGLE_FIRESTORE_HANDLE_MODAL,
    payload: { data },
  }),

  update: data => ({
    type: actions.FIRESTORE_UPDATE,
    payload: { data },
  }),

  saveIntoFireStoreError: error => ({
    type: actions.SAVE_INTO_FIRESTORE_ERROR,
    payload: { error },
  }),

  resetFireStoreDocuments: () => ({
    type: actions.RESET_FIRESTORE_DOCUMENTS,
  }),

  resetFireStoreDocumentsError: error => ({
    type: actions.RESET_FIRESTORE_DOCUMENTS_ERROR,
    payload: { error },
  }),
};

export default actions;
