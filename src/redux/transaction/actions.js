const type = "transaction";

const actions = {
  READ_FROM_DATABASE: type + 'READ_FROM_DATABASE',
  READ_FROM_DATABASE_SUCCESS: type + 'READ_FROM_DATABASE_SUCCESS',
  READ_FROM_DATABASE_ERROR: type + 'READ_FROM_DATABASE_ERROR',

  SUBMIT_TO_BACKEND: type + 'SUBMIT_TO_BACKEND',
  SUBMIT_TO_BACKEND_ERROR: type + 'SUBMIT_TO_BACKEND_ERROR',
  SUBMIT_TO_BACKEND_SUCCESS: type + 'SUBMIT_TO_BACKEND_SUCCESS',

  UPLOAD_TO_STORAGE: type + "UPLOAD_TO_STORAGE",
  UPLOAD_TO_STORAGE_SUCCESS: type + "UPLOAD_TO_STORAGE_SUCCESS",
  UPLOAD_TO_STORAGE_ERROR : type + "UPLOAD_TO_STORAGE_ERROR",
  UPDATE_UPLOAD_PROGRESS : type+ "UPDATE_UPLOAD_PROGRESS",

  MODAL_CONTROL: type + 'MODAL_CONTROL',
  STATE_UPDATE: type + 'STATE_UPDATE',

  readFromDatabase: ( routeTicketId ) => {
    return { 
      type: actions.READ_FROM_DATABASE,
      payload: { routeTicketId },
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

  submitToBackend: (data, actionName, routeTicketId ) => (
    {
    type: actions.SUBMIT_TO_BACKEND,
    payload: { data, actionName, routeTicketId },
  }),

  submitToBackendError: error => ({
    type: actions.SUBMIT_TO_BACKEND_ERROR,
    payload: { error },
  }),

  submitToBackendSuccess: data => ({
    type: actions.SUBMIT_TO_BACKEND_SUCCESS,
    payload: { data },
  }),

  uploadFile: ({key, shopId, file = null})=>({
    type: actions.UPLOAD_TO_STORAGE,
    payload: { data: {key, shopId, file} },
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

  modalControl: (data = null) => ({
    type: actions.MODAL_CONTROL,
    payload: { data },
  }),

  update: data => ({
    type: actions.STATE_UPDATE,
    payload: { data },
  }),
};
export default actions;
