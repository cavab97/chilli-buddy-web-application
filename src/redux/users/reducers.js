import actions from './actions';

const initState = {
  isLoading: false,
  errorMessage: false,
  users: [],
  modalActive: false,

  readLoading: false,
  readError: false,

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
    case actions.FIRESTORE_UPDATE:
      return {
        ...state,
        user: payload.data,
      };
    default:
      return state;
  }
}
