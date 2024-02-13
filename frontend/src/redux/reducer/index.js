import { combineReducers } from "redux";
import {setProductReducer} from './productReducer'

const reducers =combineReducers({
    allProducts:setProductReducer
    
})
export default reducers;


