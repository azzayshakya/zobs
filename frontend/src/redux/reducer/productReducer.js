import {actionTypes} from '../constants/action-types'

const initialeState={
    products:[]
}
export const setProductReducer=(state=initialeState,{type,payload})=>{
    
    switch(type){
        case actionTypes.SET_PRODUCT:
        return {...state,products:payload}

        default:
            return state

    }    
}



