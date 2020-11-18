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
  
    uploadLoading: false,
    uploadResult: {
      url: null
    },
    uploadError: false,
    uploadProgress: 0,
  
    errorReturn: {},
    missions: [],
    mission: {
      id: null,
      title: null,
      subtitle: null,
      description: null,
      images: [],
      shopIds: [],
      routeIds: [],
      minSpend: 0,
      numberRouteTickets: 0,
      shop : {
        id: null,
        title : null,
        displayTitle : null,
        subtitle : null,
        description : null,
        logo :[null],
        images : [null],
        facebookUrl : null,
        instagramUrl : null,
        websiteUrl : null,
        whatsapp : null,
        phoneNumber : null,
        email : null,
        address : {
          line1: null,
          line2: null,
          postcode: null,
          state: null,
          country: null
          },
        operatingHour :[{ day: null, open: null, close: null, operate: false }],
        merchants : [null],
        manager : [null],
        supervisor : [null],
        worker : [null],
        tags : [null],
        categories : [null],
        isPromote: false,
        dateJoined : null,
        created : { at: null, by: null },
        deleted : { at: null, by: null },
        updated : { at: null, by: null },
        l : null,
        g : null
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
            missions: [],
            readLoading: true,
            readError: false,
        };
        case actions.READ_FROM_DATABASE_SUCCESS:
        return {
            ...state,
            readLoading: false,
            missions: payload.data,
            readError: false
        };
        case actions.READ_FROM_DATABASE_ERROR:
        return {
            ...state,
            readLoading: false,
            readError: payload.error
        };
        case actions.READ_SPECIFIED_RECORD:
        return {
            ...state,
            mission: initState.mission,
            readSpecifiedRecordLoading: true,
            readSpecifiedRecordError: false
        };
        case actions.READ_SPECIFIED_RECORD_SUCCESS:
        return {
            ...state,
            readSpecifiedRecordLoading: false,
            mission: payload.data ? payload.data : initState.mission,
            readSpecifiedRecordError: false
        };
        case actions.READ_SPECIFIED_RECORD_ERROR:
        return {
            ...state,
            mission: initState.mission,
            readSpecifiedRecordLoading: false,
            readError: payload.error
        };
        case actions.PUSH_NEW_RECORD:

        return {
            ...state,
            missions: [...state.missions, payload.data ],
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
            mission: { ...state.mission, id: payload.data.ids[0] }
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
            uploadLoading: true,
            uploadProgress: initState.uploadProgress,
            uploadResult: initState.uploadResult,
            uploadError: initState.uploadError
        };

        case actions.UPLOAD_TO_STORAGE_SUCCESS:
        return {
            ...state,
            uploadLoading: false,
            uploadProgress: initState.uploadProgress,
            uploadResult: payload.data,
            uploadError: initState.uploadError
        };

        case actions.UPLOAD_TO_STORAGE_ERROR:
        return {
            ...state,
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
            mission: payload.data
        };
        default:
        return state;
    }
}
