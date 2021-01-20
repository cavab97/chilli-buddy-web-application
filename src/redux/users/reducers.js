import actions from './actions';

const initState = {
  isLoading: false,
  errorMessage: false,
  users: [],
  modalActive: false,
  signupModalActive: false,

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

  readLoading: false,
  readError: false,

  loginDetails: {
    email: null,
    password: null,
  },

  user: {
    key: null,
    ID: '',
    address:{
      country:"",
      line1:"",
      line2:"",
      postcode:"",
      states:"",
    },
    country:"",
    line1:"",
    line2:"",
    postcode:"",
    states:"",
    avatar: '',
    birthday: '',
    email: '',
    gender: '',
    isNewUser: true,
    name: '',
    phoneNumber: '',
    providerId: 'admin portal',
    uid: '',
    verifiied: false,
    created_at: new Date().getTime(),
    deleted_at: null, // soft delete
    role:'',
    merchantID:'',
    shopID:'',
  },
};

export default function reducer(
  state = initState,
  { type, payload, newRecord }
) {
  switch (type) {
    case actions.READ_FROM_DATABASE:
      return {
        ...state,
        users:[],
        readLoading: true,
        readError: false,
      };

    case actions.READ_FROM_DATABASE_SUCCESS:
      return {
        ...state,
        readLoading: false,
        users: payload.data,
        readError: false
      };

    case actions.READ_FROM_DATABASE_ERROR:
      return {
        ...state,
        readLoading: false,
        readError: payload.error
      };

    case actions.LOAD_FROM_FIRESTORE:
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        modalActive: false,
      };

    case actions.LOAD_DELETED_USER_FROM_FIRESTORE:
        return {
          ...state,
          isLoading: true,
          errorMessage: false,
          modalActive: false,
        };

    case actions.LOAD_FROM_FIRESTORE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload.data,
        errorMessage: false,
      };

    case actions.LOAD_FROM_FIRESTORE_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: 'There is a loading problem',
      };

    case actions.TOGGLE_FIRESTORE_HANDLE_MODAL:
      return {
        ...state,
        modalActive: !state.modalActive,
        user: payload.data == null ? initState.user : payload.data,
      };

    case actions.SIGNUP_REQUEST:
      return {
        ...state,
        submitLoading: true,
        submitError: initState.submitError,
        submitResult: initState.submitResult
      };
    case actions.SIGNUP_SUCCESS:
      return {
        ...state,
        submitLoading: false,
        submitError: initState.submitError,
        submitResult: payload.user,
        isLoggedIn: false,
        user: payload.user,
        signupModalActive: !state.signupModalActive,
      };

    case actions.SIGNUP_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        user: initState.user,
        submitLoading: false,
        submitError: payload.error,
        submitResult: initState.submitResult
      };
    
    case actions.SIGNUP_TOGGLE:
      return {
        ...state,
        signupModalActive: !state.signupModalActive,
      }

    case actions.UPDATE_LOGIN_DETAILS:
      return {
        ...state,
        loginDetails: payload.data,
      };

    case actions.FIRESTORE_UPDATE:
      return {
        ...state,
        user: payload.data,
      };
    
    case actions.ERROR_UPDATE:
      return {
        ...state,
        errorReturn: payload.data,
      };

    default:
      return state;
  }
}
