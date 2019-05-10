import _ from "lodash";
import  * as globals  from '../utils/global';
const GET_ASSIGN_DATA = "GET_ASSIGN_DATA"
const GET_ASSIGN_DATA_SUCCESS = "GET_ASSIGN_DATA_SUCCESS"
const GET_ASSIGN_DATA_FAIL = "GET_ASSIGN_DATA_FAIL"

const SET_ASSIGN_QUERY = "SET_ASSIGN_QUERY"

const testData = [
    {"text":"OK, I see the current price for goldis 3000/gm", "order":1}, 
    {"text":"This price is valid for the next 5 minutes","order":2},
    {"voice_msg": "the current price for gold is 3000/gm and valid for the next 5 minutes"} ]

const initialState = {   
    assignList:[],   
    assignQuery: "",
    requesting:false,
    error:null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {        

        case GET_ASSIGN_DATA:
            return { ...state, requesting: true,error:null,assignList:[]};
        case GET_ASSIGN_DATA_SUCCESS:
           
            return { ...state, requesting: false,assignList:testData };

        case GET_ASSIGN_DATA_FAIL:
            
            return {...state,requesting: false,assignList:testData};     
        case SET_ASSIGN_QUERY:            
            return {...state,assignQuery: action.payload,}; 
        default:
            return state
    }
}
export function callQuery(queryModel){
    return (dispatch, getState) => {   
        dispatch({type: SET_ASSIGN_QUERY,payload: queryModel.query});    
        let api = `assignment` ;
        dispatch({
            type: GET_ASSIGN_DATA,       
            payload: {
                client: 'default',
                request: {
                    method: 'post',
                    url: api,
                    data: queryModel,
                    //params: queryObj
                }
            }
        });
    }
    
}





