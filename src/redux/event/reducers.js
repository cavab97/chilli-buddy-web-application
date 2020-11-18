import actions from "./actions";

const initState = {
  modalActive: false,
  modalCurrentPage: 0,

  readLoading: false,
  readError: false,

  submitLoading: false,
  submitError: {
    code: null,
    message: null,
    details: null
  },
  submitResult: {
    objectName: null,
    ids: null,
    status: null,
    action: null,
    message: null
  },

  uploadKey:null,
  uploadLoading: false,
  uploadResult: {
    url: null
  },
  uploadError: false,
  uploadProgress: 0,

  errorReturn: {},
  events: [],
  event: {
    id: null,
    type: null,
    title: null,
    subtitle: null,
    description: null,
    images: [],
    rules: null,
    terms: null,
    winner: {
      at: null,
      by: null,
      displayName: null,
      prizeTitle: null
    },
    published: { at: null, by: null },
    terminated: { at: null, by: null },
    ended: { at: null, by: null, boolean: false },
    startTime: null,
    endTime: null,
    assignedRewards: null,
    totalReward: null,

    
    created: { at: null, by: null },
    deleted: { at: null, by: null },
    updated: { at: null, by: null },
  }
};

export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.READ_FROM_DATABASE:
      return {
        ...state,
        events: [],
        readLoading: true,
        readError: false
      };
    case actions.READ_FROM_DATABASE_SUCCESS:
      return {
        ...state,
        readLoading: false,
        events: payload.data,
        readError: false
      };
    case actions.READ_FROM_DATABASE_ERROR:
      return {
        ...state,
        readLoading: false,
        readSpecifiedRecordError: payload.error
      };
    case actions.READ_SPECIFIED_RECORD:
      return {
        ...state,
        event: initState.event,
        readSpecifiedRecordLoading: true,
        readSpecifiedRecordError: false
      };
    case actions.READ_SPECIFIED_RECORD_SUCCESS:
      return {
        ...state,
        readSpecifiedRecordLoading: false,
        event: payload.data ? payload.data : initState.event,
        readSpecifiedRecordError: false
      };
    case actions.READ_SPECIFIED_RECORD_ERROR:
      return {
        ...state,
        event: initState.event,
        readSpecifiedRecordLoading: false,
        readError: payload.error
      };
    case actions.PUSH_NEW_RECORD:

      return {
        ...state,
        events: [...state.events, payload.data ],
      };

    case actions.SUBMIT_TO_BACKEND:
      return {
        ...state,
        submitLoading: true,
        submitError: initState.submitError,
        submitResult: initState.submitResult
      };
    case actions.SUBMIT_TO_BACKEND_SUCCESS:
      return {
        ...state,
        submitLoading: false,
        submitError: initState.submitError,
        submitResult: payload.data,
        event: { ...state.event, id: payload.data.ids[0] }
      };

    case actions.SUBMIT_TO_BACKEND_ERROR:
      return {
        ...state,
        submitLoading: false,
        submitError: payload.error,
        submitResult: initState.submitResult
      };

    case actions.UPLOAD_TO_STORAGE:
      return {
        ...state,
        uploadKey: payload.data.key,
        uploadLoading: true,
        uploadProgress: initState.uploadProgress,
        uploadResult: initState.uploadResult,
        uploadError: initState.uploadError
      };

    case actions.UPLOAD_TO_STORAGE_SUCCESS:
      return {
        ...state,
        uploadKey: initState.uploadKey,
        uploadLoading: false,
        uploadProgress: initState.uploadProgress,
        uploadResult: payload.data,
        uploadError: initState.uploadError
      };

    case actions.UPLOAD_TO_STORAGE_ERROR:
      return {
        ...state,
        uploadKey: initState.uploadKey,
        uploadLoading: false,
        uploadProgress: initState.uploadProgress,
        uploadResult: initState.uploadResult,
        uploadError: payload.error
      };

    case actions.UPDATE_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: payload.data
      };

    case actions.MODAL_CONTROL:
      return {
        ...state,
        modalActive: !state.modalActive
      };
    case actions.ERROR_UPDATE:
      return {
        ...state,
        errorReturn: payload.data,
      };
  case actions.STATE_UPDATE:
      return {
        ...state,
        event: payload.data
      };
    default:
      return state;
  }
}
