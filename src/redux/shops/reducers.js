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

  uploadKey: null,
  uploadLoading: false,
  uploadResult: {
    url: null,
  },
  uploadError: false,
  uploadProgress: 0,

  errorReturn: {},
  shops: [],
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
    whatsapp: null,
    websiteUrl: null,
    phoneNumber: null,
    email: null,
    address: {
      line1: null,
      line2: null,
      postcode: null,
      state: null,
      country: "Malaysia",
    },
    operatingHour: [
      { close: "2200", day: "mon", open: "1000", operate: true },
      { close: "2200", day: "tue", open: "1000", operate: true },
      { close: "2200", day: "wed", open: "1000", operate: true },
      { close: "2200", day: "thu", open: "1000", operate: true },
      { close: "2200", day: "fri", open: "1000", operate: true },
      { close: "2200", day: "sat", open: "1000", operate: true },
      { close: "2200", day: "sun", open: "1000", operate: true },
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
    g: null,
  },
};

export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.READ_FROM_DATABASE:
      return {
        ...state,
        readLoading: true,
        readError: false,
      };
    case actions.READ_FROM_DATABASE_SUCCESS:
      return {
        ...state,
        readLoading: false,
        shops: payload.data,
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
        shop: initState.shop,
        readSpecifiedRecordLoading: true,
        readSpecifiedRecordError: false,
      };
    case actions.READ_SPECIFIED_RECORD_SUCCESS:
      return {
        ...state,
        readSpecifiedRecordLoading: false,
        shop: payload.data ? payload.data : initState.shop,
        readSpecifiedRecordError: false,
      };
    case actions.READ_SPECIFIED_RECORD_ERROR:
      return {
        ...state,
        shop: initState.shop,
        readSpecifiedRecordLoading: false,
        readError: payload.error,
      };
    case actions.SUBMIT_TO_BACKEND:
      console.log("submitBackend");
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
        shop: { ...state.shop, id: payload.data.ids[0] },
      };

    case actions.SUBMIT_TO_BACKEND_ERROR:
      return {
        ...state,
        submitLoading: false,
        submitError: payload.error,
        submitResult: initState.submitResult,
      };

    case actions.UPLOAD_TO_STORAGE:
      console.log("uploadStorage");
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
        uploadError: initState.uploadError,
      };

    case actions.UPLOAD_TO_STORAGE_ERROR:
      return {
        ...state,
        uploadKey: initState.uploadKey,
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
      console.log("modalControl");
      return {
        ...state,
        modalActive: payload.toggle ? !state.modalActive : state.modalActive,
        modalCurrentPage: payload.nextPage,
        shop: payload.toggle
          ? state.modalActive
            ? initState.shop
            : payload.data
            ? payload.data
            : initState.shop
          : state.shop,
      };
    case actions.ERROR_UPDATE:
      return {
        ...state,
        errorReturn: payload.data,
      };
    case actions.STATE_UPDATE:
      return {
        ...state,
        shop: payload.data,
      };
    default:
      return state;
  }
}
