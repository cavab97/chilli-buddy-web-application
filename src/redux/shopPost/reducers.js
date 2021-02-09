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
  posts: [],
  post: {
    id: null,
    title: null,
    description: null,
    startTime: null,
    endTime: null,
    ended: { at: null, by: null, boolean: false },
    started: { at: null, by: null, boolean: false },
    coverPhoto: [],
    images: [],
    shopIds: [],
    shop: {
      id: null,
      title: null,
      displayTitle: null,
      subtitle: null,
      description: null,
      logo: [],
      images: [],
      facebookUrl: null,
      instagramUrl: null,
      whatsapp:null,
      websiteUrl: null,
      phoneNumber: null,
      email: null,
      address: {
        line1: null,
        line2: null,
        postcode: null,
        state: null,
        country: null
      },
      operatingHour: [
        { close: "1800", day: "mon", open: "0600", operate: false },
        { close: "1800", day: "tue", open: "0600", operate: false },
        { close: "1800", day: "wed", open: "0600", operate: false },
        { close: "1800", day: "thu", open: "0600", operate: false },
        { close: "1800", day: "fri", open: "0600", operate: false },
        { close: "1800", day: "sat", open: "0600", operate: false },
        { close: "1800", day: "sun", open: "0600", operate: false }
      ],
      merchants: [],
      manager: [],
      supervisor: [],
      worker: [],
      tags: [],
      categories: [],
      isPromote: false,
      dateJoined: null,
      totalMissions: 0,
      created: { at: null, by: null },
      deleted: { at: null, by: null },
      updated: { at: null, by: null },
      l: { _lat: 0, _long: 0 },
      g: null
    },

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
        posts: [],
        readLoading: true,
        readError: false
      };
    case actions.READ_FROM_DATABASE_SUCCESS:
      return {
        ...state,
        readLoading: false,
        posts: payload.data,
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
        post: initState.post,
        readSpecifiedRecordLoading: true,
        readSpecifiedRecordError: false
      };
    case actions.READ_SPECIFIED_RECORD_SUCCESS:
      return {
        ...state,
        readSpecifiedRecordLoading: false,
        post: payload.data ? payload.data : initState.post,
        readSpecifiedRecordError: false
      };
    case actions.READ_SPECIFIED_RECORD_ERROR:
      return {
        ...state,
        post: initState.post,
        readSpecifiedRecordLoading: false,
        readError: payload.error
      };
    case actions.PUSH_NEW_RECORD:

      return {
        ...state,
        posts: [...state.posts, payload.data ],
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
        post: { ...state.post, id: payload.data.ids[0] }
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
        post: payload.data
      };
    default:
      return state;
  }
}
