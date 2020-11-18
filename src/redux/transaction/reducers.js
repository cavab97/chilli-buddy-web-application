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
  transactions: [],
  transaction:{
    id: null,
    shopIds: [],
    userIds: [],
    routeTicketIds: [],
    routeIds: [],
    missionIds: [],
    payment: {
      paymentType: null,
      paymentId: null,
      receiptId: null,
      amount: null,
      receiptPhotoUrl: [],
      receiptUrl: null
    },
    shop: {
      d: {}
    },
    user: {
      name: {}
    },
    routeTicket: {},
    route: {},
    mission: {
      d: {}
    },
    paymentType: null,
    paymentId: null,
    approved: { at: null, by: null },
    rejected: { at: null, by: null },

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
        transactions:[],
        readLoading: true,
        readError: false,
      };
    case actions.READ_FROM_DATABASE_SUCCESS:
      return {
        ...state,
        readLoading: false,
        transactions: payload.data,
        readError: false
      };
    case actions.READ_FROM_DATABASE_ERROR:
      return {
        ...state,
        readLoading: false,
        readError: payload.error
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
        transaction: { ...state.transaction, id: payload.data.ids[0] }
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
        uploadError: initState.uploadError,
        
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
        modalActive: !state.modalActive,
        transaction: payload.data !== null ? payload.data : state.transaction
    };
    case actions.STATE_UPDATE:
      return {
        ...state,
        transaction: payload.data
      };
    default:
      return state;
  }
}
