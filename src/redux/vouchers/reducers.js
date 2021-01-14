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
    vouchers: [],
    voucher: {
        id: null,
        active: false,
        assigned: false,
        amount: null,
        title: null,
        description: null,
        tnc: null,
        usedDate: { at: null, by: null },
        shopIds: [null],
        shop: {
            id: null,
            title: null,
            displayTitle: null,
            subtitle: null,
            description: null,
            logo: [null],
            images: [null],
            facebookUrl: null,
            instagramUrl: null,
            websiteUrl: null,
            whatsapp: null,
            phoneNumber: null,
            email: null,
            address: {
            line1: null,
            line2: null,
            postcode: null,
            state: null,
            country: null,
            },
            operatingHour: [{ day: null, open: null, close: null, operate: false }],
            merchants: [null],
            manager: [null],
            supervisor: [null],
            worker: [null],
            tags: [null],
            categories: [null],
            isPromote: false,
            dateJoined: null,
            created: { at: null, by: null },
            deleted: { at: null, by: null },
            updated: { at: null, by: null },
            l: { _lat: 0, _long: 0 },
            g: null,
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
        prevUserIds: [null],
        prevUser: {
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
        assignedDate: { at: null, by: null },
        expiryDate:  null,
        prevAssignedDate: [null],
        startDate: null,
        endDate: null,
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
                promotions: [],
                readLoading: true,
                readError: false,
            };

        case actions.READ_FROM_DATABASE_SUCCESS:
            return {
                ...state,
                readLoading: false,
                vouchers: payload.data,
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
                voucher: initState.voucher,
                readSpecifiedRecordLoading: true,
                readSpecifiedRecordError: false
            };

        case actions.READ_SPECIFIED_RECORD_SUCCESS:
            return {
                ...state,
                readSpecifiedRecordLoading: false,
                voucher: payload.data ? payload.data : initState.voucher,
                readSpecifiedRecordError: false
            };

        case actions.READ_SPECIFIED_RECORD_ERROR:
            return {
                ...state,
                voucher: initState.voucher,
                readSpecifiedRecordLoading: false,
                readError: payload.error
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
                voucher: { ...state.voucher, id: payload.data.ids[0] }
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

        case actions.ERROR_UPDATE:
            return {
                ...state,
                errorReturn: payload.data,
            };

        case actions.STATE_UPDATE:
            return {
                ...state,
                voucher: payload.data
            };

        case actions.MODAL_CONTROL:
            return {
              ...state,
              modalActive: !state.modalActive
            };

        default: 
            return state;
    }
}
