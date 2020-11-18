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
  routes: [],
  route: {
    id: null,
    type: null,
    title: null,
    category: null,
    subtitle: null,
    description: null,
    images: [],
    rules: null,
    terms: null,
    station: null,
    routeGroupId: [],
    winner: {
      at: null,
      by: null,
      displayName: null,
      prizeTitle: null
    },
    published: { at: null, by: null },
    terminated: { at: null, by: null },
    pending: { at: null, by: null },
    ongoing: { at: null, by: null },
    ended: { at: null, by: null, boolean: false },
    startTime: null,
    endTime: null,
    minimumUser: 0,
    currentUser: 0,
    assignedRewards: 0,
    totalRewards: 0,
    totalMissions: 0,
    assignCompleted: false,
    
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
        routes: [],
        readLoading: true,
        readError: false,
      };
    case actions.READ_FROM_DATABASE_SUCCESS:
      return {
        ...state,
        readLoading: false,
        routes: payload.data,
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
        route: initState.route,
        readSpecifiedRecordLoading: true,
        readSpecifiedRecordError: false,
      };
    case actions.READ_SPECIFIED_RECORD_SUCCESS:
      return {
        ...state,
        readSpecifiedRecordLoading: false,
        route: payload.data ? payload.data : initState.route,
        readSpecifiedRecordError: false,
      };
    case actions.READ_SPECIFIED_RECORD_ERROR:
      return {
        ...state,
        route: initState.route,
        readSpecifiedRecordLoading: false,
        readError: payload.error,
      };
    case actions.PUSH_NEW_RECORD:
      return {
        ...state,
        routes: [...state.routes, payload.data],
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
        route: { ...state.route, id: payload.data.ids[0] },
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
        route: payload.data,
      };
    default:
      return state;
  }
}
