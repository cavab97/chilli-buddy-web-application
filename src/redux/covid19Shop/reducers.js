import actions from "./actions";

const initState = {
  modalActive: false,

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

  errorReturn: {},
  covid19Shops: [],
  covid19Shop: {
    id: null,
    businessName: null,
    ssmNumber: null,
    referral: null,
    address: {
      line1: null,
      line2: null,
      postcode: null,
      city: null,
      state: null,
      country: null
    },
    
    userIds: [],
    user: {
      role: {
        absoluteDeveloper: false,
        developer: false,
        director: false,
        executive: false,
        admin: false,
        user: true,
      },
      accessLevel: 50,
      plan: null,
      disabled: false,
      displayName: null,
      name: { firstName: null, lastName: null },
      address: {
        line1: null,
        line2: null,
        postcode: null,
        state: null,
        country: null,
      },
      dateOfBirth: null,
      gender: null,
      username: null,
      email: null,
      emailVerified: false,
      identityNumber: null,
      phoneNumber: null,
      notificationToken: [],
      photoURL: null,
      providerId: null,
      lastLoginAt: null,
      created: { at: null, by: null },
      deleted: { at: null, by: null },
      updated: { at: null, by: null },
      id: null,
    },

    originCovid19Shop: {
      id: null,
      businessName: null,
      ssmNumber: null,
      referral: null,
      address: {
        line1: null,
        line2: null,
        postcode: null,
        city: null,
        state: null,
        country: null
      },
    
      userIds: [],
      user: {
        role: {
          absoluteDeveloper: false,
          developer: false,
          director: false,
          executive: false,
          admin: false,
          user: true,
        },
        accessLevel: 50,
        plan: null,
        disabled: false,
        displayName: null,
        name: { firstName: null, lastName: null },
        address: {
          line1: null,
          line2: null,
          postcode: null,
          state: null,
          country: null,
        },
        dateOfBirth: null,
        gender: null,
        username: null,
        email: null,
        emailVerified: false,
        identityNumber: null,
        phoneNumber: null,
        notificationToken: [],
        photoURL: null,
        providerId: null,
        lastLoginAt: null,
        created: { at: null, by: null },
        deleted: { at: null, by: null },
        updated: { at: null, by: null },
        id: null,
      },
    },

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
        covid19Shops: [],
        readLoading: true,
        readError: false,
      };
    case actions.READ_FROM_DATABASE_SUCCESS:
      return {
        ...state,
        readLoading: false,
        covid19Shops: payload.data,
        readError: false,
      };
    case actions.READ_FROM_DATABASE_ERROR:
      return {
        ...state,
        readLoading: false,
        readError: payload.error,
      };
    // case actions.READ_BY_DATE:
    //   return {
    //     ...state,
    //     covid19NameLists: [],
    //     readLoading: true,
    //     readError: false,
    //   };
    // case actions.READ_BY_DATE_SUCCESS:
    //   return {
    //     ...state,
    //     readLoading: false,
    //     covid19NameLists: payload.data,
    //     readError: false,
    //   };
    // case actions.READ_BY_DATE_ERROR:
    //   return {
    //     ...state,
    //     readLoading: false,
    //     readError: payload.error,
    //   };
    case actions.READ_SPECIFIED_RECORD:
      return {
        ...state,
        covid19Shop: initState.covid19Shop,
        readSpecifiedRecordLoading: true,
        readSpecifiedRecordError: false,
      };
    case actions.READ_SPECIFIED_RECORD_SUCCESS:
      return {
        ...state,
        readSpecifiedRecordLoading: false,
        covid19Shop: payload.data ? payload.data : initState.covid19Shop,
        originCovid19Shop: payload.data ? payload.data : initState.covid19Shop,
        readSpecifiedRecordError: false,
      };
    case actions.READ_SPECIFIED_RECORD_ERROR:
      return {
        ...state,
        covid19NameList: initState.covid19NameList,
        readSpecifiedRecordLoading: false,
        readError: payload.error,
      };
    // case actions.PUSH_NEW_RECORD:
    //   return {
    //     ...state,
    //     rewards: [...state.rewards, payload.data],
    //   };

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
        covid19Shop: { ...state.covid19Shop, id: payload.data.ids[0] },
        originCovid19Shop: { ...state.covid19Shop, id: payload.data.ids[0] },
      };

    case actions.SUBMIT_TO_BACKEND_ERROR:
      return {
        ...state,
        submitLoading: false,
        submitError: payload.error,
        submitResult: initState.submitResult,
      };

    // case actions.UPLOAD_TO_STORAGE:
    //   return {
    //     ...state,
    //     uploadLoading: true,
    //     uploadProgress: initState.uploadProgress,
    //     uploadResult: initState.uploadResult,
    //     uploadError: initState.uploadError,
    //   };

    // case actions.UPLOAD_TO_STORAGE_SUCCESS:
    //   return {
    //     ...state,
    //     uploadLoading: false,
    //     uploadProgress: initState.uploadProgress,
    //     uploadResult: payload.data,
    //     uploadError: initState.uploadError,
    //   };

    // case actions.UPLOAD_TO_STORAGE_ERROR:
    //   return {
    //     ...state,
    //     uploadLoading: false,
    //     uploadProgress: initState.uploadProgress,
    //     uploadResult: initState.uploadResult,
    //     uploadError: payload.error,
    //   };

    // case actions.UPDATE_UPLOAD_PROGRESS:
    //   return {
    //     ...state,
    //     uploadProgress: payload.data,
    //   };
    case actions.MODAL_CONTROL:
      return {
        ...state,
        modalActive: !state.modalActive,
        covid19Shop: payload.data ? payload.data : initState.covid19Shop
      };
      
    case actions.ERROR_UPDATE:
      return {
        ...state,
        errorReturn: payload.data,
      };
    case actions.STATE_UPDATE:
      return {
        ...state,
        covid19Shop: payload.data? payload.data : initState.covid19Shop,
      };
    default:
      return state;
  }
}
