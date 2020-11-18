import actions from './actions';
import moment from "moment";

const initState = {
  isLoading: false,
  errorMessage: false,
  advertisements: {},
  modalActive: false,
  modalCurrentPage: 0,
  checkingShopError:false,
  isCheckingShop:false,
  checkingShopResult:{},
  errorReturn: {},
  submitLoading: false,
  submitError: {
    code: null,
    message: null,
    details: null
  },
  submitResult: {
    objectName: null,
    key: null,
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
  advertisement: {
    key: '',
    merchantDesc: '',
    coverPic: [],
    createAt: moment(),
    created: {
      by: "gogogain",
      time: moment(),
    },
    description: '',
    endDate: null, //new Date(),
    logo: '',
    
    shopID: '',
    startDate: null, //new Date(),
    subImage: [],
    termAndCon: '',
    title: '',
    updated: {
      by: "",
      time: "",
    },
    likes:0,
    createAtString: "",
    startDateString: "",
    endDateString: "",
    subImage0:'',
    subImage1:'',
    subImage2:'',
    deleted_at: null, // soft delete
    notificationTitle:'',
    notificationBody:'',
    notificationIosSubtitle:'',
  },
};

export default function reducer(
  state = initState,
  { type, payload, newRecord }
) {
  switch (type) {
    case actions.LOAD_FROM_FIRESTORE:
      console.log("LOAD_FROM_FIRESTORE");
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        // modalActive: false,
      };

      case actions.LOAD_DELETED_USER_FROM_FIRESTORE:
        console.log("LOAD_DELETED_USER_FROM_FIRESTORE");
        return {
          ...state,
          isLoading: true,
          errorMessage: false,
          // modalActive: false,
      };

    case actions.LOAD_FROM_FIRESTORE_SUCCESS:
      console.log("LOAD_FROM_FIRESTORE_SUCCESS");
      //console.log(payload.data)
      //console.log(payload)
      return {
        ...state,
        isLoading: false,
        advertisements: payload.data,
        errorMessage: false,
        submitLoading: false
      };
    case actions.LOAD_FROM_FIRESTORE_ERROR:
      console.log("LOAD_FROM_FIRESTORE_ERRO");
      return {
        ...state,
        isLoading: false,
        errorMessage: 'There is a loading problem',
      };

    case actions.TOGGLE_FIRESTORE_HANDLE_MODAL:
      console.log("toggle firestore handle modal")
      return {
        ...state,
        modalActive: payload.toggle? !state.modalActive : state.modalActive, 
        modalCurrentPage: payload.nextPage,
        advertisement: payload.toggle ? state.modalActive ? initState.advertisement : payload.data ? payload.data : initState.advertisement 
        : state.advertisement
        //advertisement: payload.data == null ? initState.advertisement : payload.data,
      };

    // case actions.SHOP_ID_CHECK:
    //   console.log("SHOP ID CHECK")
    //     return {
    //       ...state,
    //       advertisement: payload.key, 
    //       isCheckingShop: true,
    //       checkingShopError: false,   
    //   };

    // case actions.SHOP_ID_CHECK_SUCCESS:
    //   console.log("SHOP ID CHECK SUCCESS")
    //   console.log(payload.data)
    //     return {
    //       ...state,
    //       checkingShopError: false,
    //       advertisement: payload.data,
    //       isCheckingShop: false
    // };

    // case actions.SHOP_ID_CHECK_ERROR:
    //   console.log("SHOP ID CHECK ERROR")
    //   console.log(payload.error)
    //     return {
    //       ...state,
    //       isCheckingShop: false,
    //       checkingShopResult:{},
    //       checkingShopError: payload.error,
    // };

    case actions.SAVE_INTO_FIRESTORE:
      //console.log("save into firestore")
      return {
        ...state,
        submitLoading: true,
        submitError: initState.submitError,
        submitResult: initState.submitResult
      };

    case actions.SAVE_INTO_FIRESTORE_SUCCESS:
        console.log("save into firebase success")
        //console.log(payload.data)
        //console.log(payload)
      return {
        ...state,
        submitLoading: false,
        submitError: initState.submitError,
        submitResult: payload.data,
        advertisement: {...state.advertisement, key:payload.data.key}
      };

    case actions.SAVE_INTO_FIRESTORE_ERROR:
        console.log("save into firestore error")
        console.log(payload)
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
        advertisement: payload.data
      };

    case actions.ERROR_UPDATE:
      console.log("ERROR_UPDATE");
      console.log(payload)
      return {
        ...state,
        errorReturn: payload.data
      };

    case actions.UPDATE_UPLOAD_PROGRESS:
        console.log("update upload progress")
      return {
        ...state,
        uploadProgress: payload.data
      };

    case actions.HANDLE_UPLOAD_LOGO:
      console.log("HANDLE_UPLOAD_LOGOE");
      console.log(payload.data)
          return { 
            ...state,
            // errorReturn: payload.data, 
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
      


    default:
      return state;
  }
}
