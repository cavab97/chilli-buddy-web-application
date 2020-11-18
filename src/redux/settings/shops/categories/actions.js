const DOCUMENT = 'SHOPS_SETTINGS_CATEGORIES';

const actions = {
  LOAD_FROM_FIRESTORE: DOCUMENT + 'LOAD_FROM_FIRESTORE',
  LOAD_DELETED_DISPOSABLE_ITEM_FROM_FIRESTORE: DOCUMENT + 'LOAD_DELETED_DISPOSABLE_ITEM_FROM_FIRESTORE',
  LOAD_FROM_FIRESTORE_SUCCESS: DOCUMENT + 'LOAD_FROM_FIRESTORE_SUCCESS',
  LOAD_FROM_FIRESTORE_ERROR: DOCUMENT + 'LOAD_FROM_FIRESTORE_ERROR',

  LOAD_SPECIFY_FROM_FIRESTORE: DOCUMENT + 'LOAD_SPECIFY_FROM_FIRESTORE',
  LOAD_SPECIFY_FROM_FIRESTORE_SUCCESS: DOCUMENT + 'LOAD_SPECIFY_FROM_FIRESTORE_SUCCESS',
  LOAD_SPECIFY_FROM_FIRESTORE_ERROR: DOCUMENT + 'LOAD_SPECIFY_FROM_FIRESTORE_ERROR',

  SAVE_INTO_FIRESTORE: DOCUMENT + 'SAVE_INTO_FIRESTORE',
  
  SAVE_INTO_FIRESTORE_ERROR: DOCUMENT + 'SAVE_INTO_FIRESTORE_ERROR',
  RESET_FIRESTORE_DOCUMENTS: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS',
  RESET_FIRESTORE_DOCUMENTS_ERROR: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS_ERROR',

  TOGGLE_FIRESTORE_HANDLE_MODAL: DOCUMENT + 'TOGGLE_FIRESTORE_HANDLE_MODAL',
  FIRESTORE_UPDATE: DOCUMENT + 'FIRESTORE_UPDATE',

  loadFromFireStore: () => {
    return { type: actions.LOAD_FROM_FIRESTORE };
  },

  loadFromFireStoreSuccess: data => ({
    type: actions.LOAD_FROM_FIRESTORE_SUCCESS,
    payload: { data},
  }),

  loadFromFireStoreError: error => ({
    type: actions.LOAD_FROM_FIRESTORE_ERROR,
    payload: { error },
  }),

  loadSpecifyFromFireStore: (id) => ({
    type: actions.LOAD_SPECIFY_FROM_FIRESTORE,
    payload: { id }
  }),

  loadSpecifyFromFireStoreSuccess: data => ({
    type: actions.LOAD_SPECIFY_FROM_FIRESTORE_SUCCESS,
    payload: { data },
  }),

  loadSpecifyFromFireStoreError: error => ({
    type: actions.LOAD_SPECIFY_FROM_FIRESTORE_ERROR,
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
