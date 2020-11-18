const DOCUMENT = 'ADVERTISEMENTS_';

const actions = {
  LOAD_FROM_FIRESTORE: DOCUMENT + 'LOAD_FROM_FIRESTORE',
  LOAD_DELETED_USER_FROM_FIRESTORE: DOCUMENT + 'LOAD_DELETED_USER_FROM_FIRESTORE',
  LOAD_FROM_FIRESTORE_SUCCESS: DOCUMENT + 'LOAD_FROM_FIRESTORE_SUCCESS',
  LOAD_FROM_FIRESTORE_ERROR: DOCUMENT + 'LOAD_FROM_FIRESTORE_ERROR',

  SAVE_INTO_FIRESTORE: DOCUMENT + 'SAVE_INTO_FIRESTORE',
  SAVE_INTO_FIRESTORE_SUCCESS: DOCUMENT + 'SAVE_INTO_FIRESTORE_SUCCESS',
  SAVE_INTO_FIRESTORE_ERROR: DOCUMENT + 'SAVE_INTO_FIRESTORE_ERROR',
  RESET_FIRESTORE_DOCUMENTS: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS',
  RESET_FIRESTORE_DOCUMENTS_ERROR: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS_ERROR',

  TOGGLE_FIRESTORE_HANDLE_MODAL: DOCUMENT + 'TOGGLE_FIRESTORE_HANDLE_MODAL',
  FIRESTORE_UPDATE: DOCUMENT + 'FIRESTORE_UPDATE',

  SHOP_ID_CHECK: DOCUMENT + 'SHOP_ID_CHECK',
  SHOP_ID_CHECK_SUCCESS: DOCUMENT + 'SHOP_ID_CHECK_SUCCESS',
  SHOP_ID_CHECK_ERROR: DOCUMENT + 'SHOP_ID_CHECK_ERROR',

  ERROR_UPDATE: DOCUMENT + 'ERROR_UPDATE',

  HANDLE_CHANGE_IMAGE: DOCUMENT + 'HANDLE_CHANGE_IMAGE',
  HANDLE_UPLOAD_LOGO: DOCUMENT + 'HANDLE_UPLOAD_LOGO',
  UPLOAD_TO_STORAGE_SUCCESS: DOCUMENT + "UPLOAD_TO_STORAGE_SUCCESS",
  UPLOAD_TO_STORAGE_ERROR : DOCUMENT + "UPLOAD_TO_STORAGE_ERROR",
  UPDATE_UPLOAD_PROGRESS : DOCUMENT+ "UPDATE_UPLOAD_PROGRESS",

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

  // checkShopID: key =>({
  //   type: actions.SHOP_ID_CHECK,
  //   payload: { key },
  // }),

  // checkShopIDSuccess: data =>({
  //   type: actions.SHOP_ID_CHECK_SUCCESS,
  //   payload: { data },
  // }),

  // checkShopIDError: error =>({
  //   type: actions.SHOP_ID_CHECK_ERROR,
  //   payload: { error },
  // }),

  toggleModal: ({toggle = false, nextPage = 0, data = null}) => ({
    type: actions.TOGGLE_FIRESTORE_HANDLE_MODAL,
    payload: { toggle, nextPage, data },
  }),

  update: (data) => ({ 
    type: actions.FIRESTORE_UPDATE,
    payload: { data },
  }),
  
  saveIntoFireStore: (data, actionName = 'insert') => ({
    type: actions.SAVE_INTO_FIRESTORE,
    payload: { data, actionName },
  }),

  saveIntoFireStoreSuccess: data => ({
    type: actions.SAVE_INTO_FIRESTORE_SUCCESS,
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

  errorUpdate: data => ({
    type: actions.ERROR_UPDATE,
    payload: { data },
  }),

  handleUploadLogo: ({key, advertisementId, file = null} ) => ({ 
    type: actions.HANDLE_UPLOAD_LOGO,
    payload: { data: {key, advertisementId , file} },
  }),

  uploadFileSuccess: (data)=>({
    type: actions.UPLOAD_TO_STORAGE_SUCCESS,
    payload: { data },
  }),

  uploadFileError: (error)=>({
    type: actions.UPLOAD_TO_STORAGE_ERROR,
    payload: { error },
  }),

  uploadFileProgress:(data)=>({
    type: actions.UPDATE_UPLOAD_PROGRESS,
    payload: { data },
  }),

  // handleChangeImage: (section, event) => ({
  //   type: actions.HANDLE_CHANGE_IMAGE,
  //   payload: { section, event },
  // }),
};



export default actions;
