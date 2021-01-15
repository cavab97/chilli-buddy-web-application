const DOCUMENT = "MERCHANTAUTH_";

const actions = {
  LOAD_FROM_FIRESTORE: DOCUMENT + "LOAD_FROM_FIRESTORE",
  LOAD_DELETED_USER_FROM_FIRESTORE: DOCUMENT + "LOAD_DELETED_USER_FROM_FIRESTORE",
  LOAD_FROM_FIRESTORE_SUCCESS: DOCUMENT + "LOAD_FROM_FIRESTORE_SUCCESS",
  LOAD_FROM_FIRESTORE_ERROR: DOCUMENT + "LOAD_FROM_FIRESTORE_ERROR",

  SAVE_INTO_FIRESTORE: DOCUMENT + "SAVE_INTO_FIRESTORE",
  SAVE_INTO_FIRESTORE_SUCCESS: DOCUMENT + "SAVE_INTO_FIRESTORE_SUCCESS",
  SAVE_INTO_FIRESTORE_ERROR: DOCUMENT + "SAVE_INTO_FIRESTORE_ERROR",
  RESET_FIRESTORE_DOCUMENTS: DOCUMENT + "RESET_FIRESTORE_DOCUMENTS",
  RESET_FIRESTORE_DOCUMENTS_ERROR: DOCUMENT + "RESET_FIRESTORE_DOCUMENTS_ERROR",

  TOGGLE_FIRESTORE_HANDLE_MODAL: DOCUMENT + "TOGGLE_FIRESTORE_HANDLE_MODAL",
  FIRESTORE_UPDATE: DOCUMENT + "FIRESTORE_UPDATE",
  UPDATE_LOGIN_DETAILS: DOCUMENT + "UPDATE_LOGIN_DETAILS",

  SIGNUP_REQUEST: DOCUMENT + "SIGNUP_REQUEST",
  SIGNUP_SUCCESS: DOCUMENT + "SIGNUP_SUCCESS",
  SIGNUP_ERROR: DOCUMENT + "SIGNUP_ERROR",

  ERROR_UPDATE: DOCUMENT + "ERROR_UPDATE",

  loadFromFireStore: () => {
    return { type: actions.LOAD_FROM_FIRESTORE };
  },

  loadFromFireStoreSuccess: (data) => ({
    type: actions.LOAD_FROM_FIRESTORE_SUCCESS,
    payload: { data },
  }),

  loadFromFireStoreError: (error) => ({
    type: actions.LOAD_FROM_FIRESTORE_ERROR,
    payload: { error },
  }),

  toggleModal: ({ toggle = false, nextPage = 0, data = null }) => ({
    type: actions.TOGGLE_FIRESTORE_HANDLE_MODAL,
    payload: { toggle, nextPage, data },
  }),

  update: (data) => ({
    type: actions.FIRESTORE_UPDATE,
    payload: { data },
  }),

  updateLoginDetails: (data) => ({
    type: actions.UPDATE_LOGIN_DETAILS,
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

  saveIntoFireStore: (data, actionName = "insert") => ({
    type: actions.SAVE_INTO_FIRESTORE,
    payload: { data, actionName },
  }),

  saveIntoFireStoreSuccess: (data) => ({
    type: actions.SAVE_INTO_FIRESTORE_SUCCESS,
    payload: { data },
  }),

  saveIntoFireStoreError: (error) => ({
    type: actions.SAVE_INTO_FIRESTORE_ERROR,
    payload: { error },
  }),

  resetFireStoreDocuments: () => ({
    type: actions.RESET_FIRESTORE_DOCUMENTS,
  }),

  resetFireStoreDocumentsError: (error) => ({
    type: actions.RESET_FIRESTORE_DOCUMENTS_ERROR,
    payload: { error },
  }),

  errorUpdate: (data) => ({
    type: actions.ERROR_UPDATE,
    payload: { data },
  }),
};

export default actions;
