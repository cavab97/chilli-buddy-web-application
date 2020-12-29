import actions from "./actions";
import moment from "moment";

const initState = {
  isLoading: false,
  errorMessage: false,
  errorReturn: {},
  modalActive: false,
  modalCurrentPage: 0,
  isLoggedIn: false,
  loading: false,
  error: false,
  forgotPasswordLoading: false,
  forgotPasswordMessage: false,
  forgotPasswordError: false,
  loginDetails: {
    email: null,
    password: null,
  },
  users: [],
  user: {
    user: {
      uid: null,
      displayName: null,
      photoURL: null,
      phoneNumber: null,
      email: null,
      role: {
        director: false,
        executive: false,
        admin: false,
        user: false,
        merchant: true,
      },
      shopIds: [],
    },
    idTokenResult: {
      token: null,
      expirationTime: null,
      authTime: null,
      issuedAtTime: null,
      signInProvider: null,
      claims: {
        name: null,
        role: {
          director: false,
          executive: false,
          admin: false,
          user: false,
          merchant: true,
        },
        accessLevel: 50,
        plan: null,
      },
      user_id: null,
      email: null,
      email_verified: false,
    },
  },
};

export default function reducer(state = initState, { type, payload, newRecord }) {
  switch (type) {
    case actions.LOAD_FROM_FIRESTORE:
      //console.log("LOAD_FROM_FIRESTORE");
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        // modalActive: false,
      };

    case actions.LOAD_FROM_FIRESTORE_SUCCESS:
      //console.log(payload.data)
      //console.log(payload)
      return {
        ...state,
        isLoading: false,
        users: payload.data,
        errorMessage: false,
        submitLoading: false,
      };
    case actions.LOAD_FROM_FIRESTORE_ERROR:
      // console.log("LOAD_FROM_FIRESTORE_ERRO");
      return {
        ...state,
        isLoading: false,
        errorMessage: "There is a loading problem",
      };

    case actions.TOGGLE_FIRESTORE_HANDLE_MODAL:
      //console.log("toggle firestore handle modal")
      return {
        ...state,
        modalActive: payload.toggle ? !state.modalActive : state.modalActive,
        modalCurrentPage: payload.nextPage,
        user: payload.toggle
          ? state.modalActive
            ? initState.user
            : payload.data
            ? payload.data
            : initState.user
          : state.user,
      };

    case actions.SAVE_INTO_FIRESTORE:
      //console.log("save into firestore")
      return {
        ...state,
        submitLoading: true,
        submitError: initState.submitError,
        submitResult: initState.submitResult,
      };

    case actions.SAVE_INTO_FIRESTORE_SUCCESS:
      console.log("save into firebase success");
      //console.log(payload.data)
      //console.log(payload)
      return {
        ...state,
        submitLoading: false,
        submitError: initState.submitError,
        submitResult: payload.data,
        advertisement: { ...state.advertisement, key: payload.data.key },
      };

    case actions.SAVE_INTO_FIRESTORE_ERROR:
      console.log("save into firestore error");
      return {
        ...state,
        submitLoading: false,
        submitError: payload.error,
        submitResult: initState.submitResult,
      };

    case actions.FIRESTORE_UPDATE:
      //console.log("FIRESTORE_UPDATE");
      //console.log(payload.data);
      return {
        ...state,
        user: payload.data,
      };

    case actions.UPDATE_LOGIN_DETAILS:
      return {
        ...state,
        loginDetails: payload.data,
      };

    case actions.ERROR_UPDATE:
      return {
        ...state,
        errorReturn: payload.data,
      };

    case actions.SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actions.SIGNUP_SUCCESS:
      console.log("Signup");
      console.log(payload.user);
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: payload.user,
      };
    case actions.SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        user: {},
        error: payload.error,
      };

    default:
      return state;
  }
}
