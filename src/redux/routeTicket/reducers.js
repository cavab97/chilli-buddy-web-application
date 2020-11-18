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
  routeTickets: [],
  routeTicket: {
    id: null,
    invited: { at: null, by: null },
    sharedFb: { at: null, by: null },
    routeIds: [null],
    route: {
      title: null,
      type: null,
      subtitle: null,
      description: null,
      images: [null],
      rules: null,
      terms: null,
      published: { at: null, by: null },
      terminated: { at: null, by: null },
      pending: { at: null, by: null },
      ongoing: { at: null, by: null },
      ended: { at: null, by: null },
      startTime: new Date(),
      endTime: new Date(),
      currentUser: 0,
      minimumUser: 0,
      totalMissions: 0,
      id: null,
      routeGroupId: [null],
      created: { at: null, by: null },
      deleted: { at: null, by: null },
      updated: { at: null, by: null },
    },
    userIds: [null],
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
    rewardIds: [null],
    reward: {
      
    },
    numberApprovedMission: 0,
    numberCompletedMissions: 0,
    completedMissions: [],
    verify: false,
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
        readLoading: true,
        readError: false,
      };
    case actions.READ_FROM_DATABASE_SUCCESS:
      return {
        ...state,
        readLoading: false,
        routeTickets: payload.data,
        readError: false,
      };
    case actions.READ_FROM_DATABASE_ERROR:
      return {
        ...state,
        readLoading: false,
        readError: payload.error,
      };

    case actions.READ_BY_OBJECTGROUP:
      return {
        ...state,
        readLoading: true,
        readError: false,
      };
    case actions.READ_BY_OBJECTGROUP_SUCCESS:
      return {
        ...state,
        readLoading: false,
        routeTickets: payload.data,
        readError: false,
      };
    case actions.READ_BY_OBJECTGROUP_ERROR:
      return {
        ...state,
        readLoading: false,
        readError: payload.error,
      };
    // case actions.READ_SPECIFIED_RECORD:
    //   return {
    //     ...state,
    //     routeTicket: initState.routeGroup,
    //     readSpecifiedRecordLoading: true,
    //     readSpecifiedRecordError: false,
    //   };
    // case actions.READ_SPECIFIED_RECORD_SUCCESS:
    //   return {
    //     ...state,
    //     readSpecifiedRecordLoading: false,
    //     routeTicket: payload.data ? payload.data : initState.routeGroup,
    //     readSpecifiedRecordError: false,
    //   };
    // case actions.READ_SPECIFIED_RECORD_ERROR:
    //   return {
    //     ...state,
    //     routeTicket: initState.routeGroup,
    //     readSpecifiedRecordLoading: false,
    //     readError: payload.error,
    //   };
    // case actions.PUSH_NEW_RECORD:
    //   return {
    //     ...state,
    //     routeTickets: [...state.routeGroups, payload.data],
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
        routeTicket: { ...state.routeGroup, id: payload.data.ids[0] },
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
    //     uploadKey: payload.data.key,
    //     uploadLoading: true,
    //     uploadProgress: initState.uploadProgress,
    //     uploadResult: initState.uploadResult,
    //     uploadError: initState.uploadError,
    //   };

    // case actions.UPLOAD_TO_STORAGE_SUCCESS:
    //   return {
    //     ...state,
    //     uploadKey: initState.uploadKey,
    //     uploadLoading: false,
    //     uploadProgress: initState.uploadProgress,
    //     uploadResult: payload.data,
    //     uploadError: initState.uploadError,
    //   };

    // case actions.UPLOAD_TO_STORAGE_ERROR:
    //   return {
    //     ...state,
    //     uploadKey: initState.uploadKey,
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

    // case actions.MODAL_CONTROL:
    //   return {
    //     ...state,
    //     modalActive: !state.modalActive,
    //   };
    // case actions.ERROR_UPDATE:
    //   return {
    //     ...state,
    //     errorReturn: payload.data,
    //   };
    case actions.STATE_UPDATE:
      return {
        ...state,
        routeTicket: payload.data,
      };
    case actions.UPDATE_ARRAY:
      return {
        ...state,
        routeTickets: payload.data,
      };
    default:
      return state;
  }
}
