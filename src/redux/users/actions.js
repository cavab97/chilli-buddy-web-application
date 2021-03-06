const type = 'USER_';

const actions = {
  READ_FROM_DATABASE: type + 'READ_FROM_DATABASE',
  READ_FROM_DATABASE_SUCCESS: type + 'READ_FROM_DATABASE_SUCCESS',
  READ_FROM_DATABASE_ERROR: type + 'READ_FROM_DATABASE_ERROR',

  LOAD_FROM_FIRESTORE: type + 'LOAD_FROM_FIRESTORE',
  LOAD_DELETED_USER_FROM_FIRESTORE: type + 'LOAD_DELETED_USER_FROM_FIRESTORE',
  LOAD_FROM_FIRESTORE_SUCCESS: type + 'LOAD_FROM_FIRESTORE_SUCCESS',
  LOAD_FROM_FIRESTORE_ERROR: type + 'LOAD_FROM_FIRESTORE_ERROR',

  SAVE_INTO_FIRESTORE: type + 'SAVE_INTO_FIRESTORE',
  
  SAVE_INTO_FIRESTORE_ERROR: type + 'SAVE_INTO_FIRESTORE_ERROR',
  RESET_FIRESTORE_DOCUMENTS: type + 'RESET_FIRESTORE_DOCUMENTS',
  RESET_FIRESTORE_DOCUMENTS_ERROR: type + 'RESET_FIRESTORE_DOCUMENTS_ERROR',

  SIGNUP_REQUEST: type + "SIGNUP_REQUEST",
  SIGNUP_SUCCESS: type + "SIGNUP_SUCCESS",
  SIGNUP_ERROR: type + "SIGNUP_ERROR",
  SIGNUP_TOGGLE: type + "SIGNUP_TOGGLE",

  TOGGLE_FIRESTORE_HANDLE_MODAL: type + 'TOGGLE_FIRESTORE_HANDLE_MODAL',
  FIRESTORE_UPDATE: type + 'FIRESTORE_UPDATE',
  UPDATE_LOGIN_DETAILS: type + 'UPDATE_LOGIN_DETAILS',

  ERROR_UPDATE: type + "ERROR_UPDATE",

  readFromDatabase: () => {
    return { 
      type: actions.READ_FROM_DATABASE
     };
  },

  readFromDatabaseSuccess: data => ({
    type: actions.READ_FROM_DATABASE_SUCCESS,
    payload: { data },
  }),

  readFromDatabaseError: error => ({
    type: actions.READ_FROM_DATABASE_ERROR,
    payload: { error },
  }),
  
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
    payload: { data, actionName},
  }),

  toggleModal: (data = null) => ({
    type: actions.TOGGLE_FIRESTORE_HANDLE_MODAL,
    payload: { data },
  }),

  signup: (data) => ({
    type: actions.SIGNUP_REQUEST,
    payload: { data },
  }),

  signupSuccess: ({ user }) => ({
    type: actions.SIGNUP_SUCCESS,
    payload: { user },
  }),

  signupError: ({ error }) => ({
    type: actions.SIGNUP_ERROR,
    payload: { error },
  }),

  signupToggle: (data) => ({
    type: actions.SIGNUP_TOGGLE,
    payload: { data }
  }),

  updateLoginDetails: (data) => ({
    type: actions.UPDATE_LOGIN_DETAILS,
    payload: { data }
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

  errorUpdate: (data) => ({
    type: actions.ERROR_UPDATE,
    payload: { data },
  }),

};
export default actions;
