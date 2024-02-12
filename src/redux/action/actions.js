import {actionTypes} from "../constants/action-types"

export const setProduct=(job)=>{
    return {
        type:actionTypes.SET_PRODUCT,
        payload:job
    }
}
