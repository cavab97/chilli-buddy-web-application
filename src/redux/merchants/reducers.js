import actions from './actions';

const initState = {
  isLoading: false,
  errorMessage: false,
  merchants: {},
  modalActive: false,
  checkingUserError:false,
  isCheckingUser:false,
  checkingUserResult:{},
  merchant: {
    key: null,
    status: '',
    id: '',
    logo:'',
    name: '',
    businessRegNo:'',
    superAdminName:'',
    superAdminIC:'',
    superAdminID:'',
    email:'',
    phone:'',
    shopList: [],
    createAt: new Date().getTime(),
    likes: '',
    dateJoined:'',
    address:{
      line1:"",
      line2:"",
      country:"",
      states:"",
      postcode:"",
    },
    deleted_at: null, // soft delete
  },
};

export default function reducer(
  state = initState,
  { type, payload, newRecord }
) {
  switch (type) {
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
        merchants: payload.data,
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
        checkingUserResult:{},
        checkingUserError:false,
        isCheckingUser:false,
        merchant: payload.data == null ? initState.merchant : payload.data,
      };
    case actions.USER_ID_CHECK:
        return {
          ...state,
          isCheckingUser: true,
          checkingUserError: false,
      };

    case actions.USER_ID_CHECK_SUCCESS:
        return {
          ...state,
          isCheckingUser: false,
          checkingUserError: false,
          checkingUserResult: payload.data,
    };
    case actions.USER_ID_CHECK_ERROR:
        return {
          ...state,
          isCheckingUser: false,
          checkingUserResult:{},
          checkingUserError: payload.error,
    };
    case actions.FIRESTORE_UPDATE:
      return {
        ...state,
        merchant: payload.data,
      };
    default:
      return state;
  }
}
