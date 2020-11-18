const type = "event";

const actions = {
  READ_FROM_DATABASE: type + "READ_FROM_DATABASE",
  READ_FROM_DATABASE_SUCCESS: type + "READ_FROM_DATABASE_SUCCESS",
  READ_FROM_DATABASE_ERROR: type + "READ_FROM_DATABASE_ERROR",

  READ_SPECIFIED_RECORD: type + "READ_SPECIFIED_RECORD",
  READ_SPECIFIED_RECORD_SUCCESS: type + "READ_SPECIFIED_RECORD_SUCCESS",
  READ_SPECIFIED_RECORD_ERROR: type + "READ_SPECIFIED_RECORD_ERROR",
  PUSH_NEW_RECORD: type + "PUSH_NEW_RECORD",

  SUBMIT_TO_BACKEND: type + "SUBMIT_TO_BACKEND",
  SUBMIT_TO_BACKEND_ERROR: type + "SUBMIT_TO_BACKEND_ERROR",
  SUBMIT_TO_BACKEND_SUCCESS: type + "SUBMIT_TO_BACKEND_SUCCESS",

  UPLOAD_TO_STORAGE: type + "UPLOAD_TO_STORAGE",
  UPLOAD_TO_STORAGE_SUCCESS: type + "UPLOAD_TO_STORAGE_SUCCESS",
  UPLOAD_TO_STORAGE_ERROR: type + "UPLOAD_TO_STORAGE_ERROR",
  UPDATE_UPLOAD_PROGRESS: type + "UPDATE_UPLOAD_PROGRESS",

  MODAL_CONTROL: type + "MODAL_CONTROL",
  ERROR_UPDATE: type + 'ERROR_UPDATE',
  STATE_UPDATE: type + "STATE_UPDATE",

  readFromDatabase: () => {
    return { type: actions.READ_FROM_DATABASE };
  },

  readFromDatabaseSuccess: data => ({
    type: actions.READ_FROM_DATABASE_SUCCESS,
    payload: { data }
  }),

  readFromDatabaseError: error => ({
    type: actions.READ_FROM_DATABASE_ERROR,
    payload: { error }
  }),

  readSpecifiedRecord: id => {
    return { type: actions.READ_SPECIFIED_RECORD, payload: { id } };
  },

  readSpecifiedRecordSuccess: (data) => ({
    type: actions.READ_SPECIFIED_RECORD_SUCCESS,
    payload: { data }
  }),

  readSpecifiedRecordError: error => ({
    type: actions.READ_SPECIFIED_RECORD_ERROR,
    payload: { error }
  }),

  pushNewRecord : data =>({
    type: actions.PUSH_NEW_RECORD,
    payload: { data }
  }),

  submitToBackend: (data, actionName = "insert") => ({
    type: actions.SUBMIT_TO_BACKEND,
    payload: { data, actionName }
  }),

  submitToBackendError: error => ({
    type: actions.SUBMIT_TO_BACKEND_ERROR,
    payload: { error }
  }),

  submitToBackendSuccess: data => ({
    type: actions.SUBMIT_TO_BACKEND_SUCCESS,
    payload: { data }
  }),

  uploadFile: ({key, routeGroupId, file = null }) => ({
    type: actions.UPLOAD_TO_STORAGE,
    payload: { data: {key, routeGroupId, file } }
  }),

  uploadFileSuccess: data => ({
    type: actions.UPLOAD_TO_STORAGE_SUCCESS,
    payload: { data }
  }),

  uploadFileError: error => ({
    type: actions.UPLOAD_TO_STORAGE_ERROR,
    payload: { error }
  }),

  uploadFileProgress: data => ({
    type: actions.UPDATE_UPLOAD_PROGRESS,
    payload: { data }
  }),

  modalControl: () => ({
    type: actions.MODAL_CONTROL
  }),

  errorUpdate: data => ({
    type: actions.ERROR_UPDATE,
    payload: { data },
  }),
  
  update: data => ({
    type: actions.STATE_UPDATE,
    payload: { data }
  })
};
export default actions;
