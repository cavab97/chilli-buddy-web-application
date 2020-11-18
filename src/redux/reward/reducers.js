import actions from "./actions";

const initState = {
  modalActive: false,
  modalCurrentPage: 0,

  readLoading: false,
  readError: false,

  readSpecifiedRecordLoading: false,
  readSpecifiedRecordError: false,

  submitLoading: false,
  submitError: {
    code: null,
    message: null,
    details: null,
  },
  submitResult: {
    objectName: null,
    ids: null,
    status: null,
    action: null,
    message: null,
  },

  uploadLoading: false,
  uploadResult: {
    url: null,
  },
  uploadError: false,
  uploadProgress: 0,

  errorReturn: {},
  nextRank: 0,
  rewards: [],
  reward: {
    id: null,
    rank: 0,
    title: null,
    subtitle: null,
    description: null,
    images: [],
    eventIds:[],
    routeIds: [],
    routeTicketIds: [],
    user: {},
    
    obtained: {
      at: null, 
      by: null,
      displayName: null,
      photoURL: null,
    },
    
    issued: { at: null, by: null },
    claimed: { at: null, by: null },

    created: { at: null, by: null },
    deleted: { at: null, by: null },
    updated: { at: null, by: null },
  },
};

export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.READ_FROM_DATABASE:
      return {
        ...state,
        rewards: [],
        readLoading: true,
        readError: false,
      };
    case actions.READ_FROM_DATABASE_SUCCESS:
      return {
        ...state,
        readLoading: false,
        rewards: payload.data,
        readError: false,
      };
    case actions.READ_FROM_DATABASE_ERROR:
      return {
        ...state,
        readLoading: false,
        readError: payload.error,
      };
    case actions.READ_SPECIFIED_RECORD:
      return {
        ...state,
        reward: initState.reward,
        readSpecifiedRecordLoading: true,
        readSpecifiedRecordError: false,
      };
    case actions.READ_SPECIFIED_RECORD_SUCCESS:
      return {
        ...state,
        readSpecifiedRecordLoading: false,
        reward: payload.data ? payload.data : initState.reward,
        readSpecifiedRecordError: false,
      };
    case actions.READ_SPECIFIED_RECORD_ERROR:
      return {
        ...state,
        reward: initState.reward,
        readSpecifiedRecordLoading: false,
        readError: payload.error,
      };
    case actions.PUSH_NEW_RECORD:
      return {
        ...state,
        rewards: [...state.rewards, payload.data],
      };
    case actions.READ_NEXT_RANK:
      return {
        ...state,
        nextRank: 0,
        readLoading: true,
        readError: false,
      };
    case actions.READ_NEXT_RANK_SUCCESS:
      return {
        ...state,
        readLoading: false,
        nextRank: payload.data,
        readError: false,
      };
    case actions.READ_NEXT_RANK_ERROR:
      return {
        ...state,
        readLoading: false,
        readError: payload.error,
      };
    case actions.SUBMIT_TO_BACKEND:
      return {
        ...state,
        submitLoading: true,
        submitError: initState.submitError,
        submitResult: initState.submitResult,
      };
    case actions.SUBMIT_TO_BACKEND_SUCCESS:
      return {
        ...state,
        submitLoading: false,
        submitError: initState.submitError,
        submitResult: payload.data,
        reward: { ...state.reward, id: payload.data.ids[0] },
      };

    case actions.SUBMIT_TO_BACKEND_ERROR:
      return {
        ...state,
        submitLoading: false,
        submitError: payload.error,
        submitResult: initState.submitResult,
      };

    case actions.UPLOAD_TO_STORAGE:
      return {
        ...state,
        uploadLoading: true,
        uploadProgress: initState.uploadProgress,
        uploadResult: initState.uploadResult,
        uploadError: initState.uploadError,
      };

    case actions.UPLOAD_TO_STORAGE_SUCCESS:
      return {
        ...state,
        uploadLoading: false,
        uploadProgress: initState.uploadProgress,
        uploadResult: payload.data,
        uploadError: initState.uploadError,
      };

    case actions.UPLOAD_TO_STORAGE_ERROR:
      return {
        ...state,
        uploadLoading: false,
        uploadProgress: initState.uploadProgress,
        uploadResult: initState.uploadResult,
        uploadError: payload.error,
      };

    case actions.UPDATE_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: payload.data,
      };

    case actions.MODAL_CONTROL:
      return {
        ...state,
        modalActive: !state.modalActive,
      };
    case actions.ERROR_UPDATE:
      return {
        ...state,
        errorReturn: payload.data,
      };
    case actions.STATE_UPDATE:
      return {
        ...state,
        reward: payload.data? payload.data : initState.reward,
      };
    default:
      return state;
  }
}
