import actions from './actions';

const initState = {
  isLoading: false,
  errorMessage: false,
  categories: [],
  modalActive: false,
  category: {
    key: null,
    title:'',
    tags:[],
    no:'',
    id:'',
    created_at: new Date().getTime(),
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
    case actions.LOAD_DELETED_TAG_FROM_FIRESTORE:
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
        categories: payload.data,
        errorMessage: false,
      };
    case actions.LOAD_FROM_FIRESTORE_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: 'There is a loading problem',
      };
    case actions.LOAD_SPECIFY_FROM_FIRESTORE:
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        modalActive: false,
      };
    case actions.LOAD_SPECIFY_FROM_FIRESTORE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: payload.data,
        errorMessage: false,
      };
    case actions.LOAD_SPECIFY_FROM_FIRESTORE_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: 'There is a loading problem',
      };
    case actions.TOGGLE_FIRESTORE_HANDLE_MODAL:
      return {
        ...state,
        modalActive: !state.modalActive,
        category: payload.data == null ? initState.category : payload.data,
      };
    case actions.FIRESTORE_UPDATE:
      return {
        ...state,
        category: payload.data,
      };
    default:
      return state;
  }
}
