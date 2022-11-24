import {POST_WRITE, POST_EDIT, POST_DELETE} from '../_actions/types';

const initialState = {
    title:null,
    country:null,
    location:null,
    fromDate:null,
    toDate:null,
    content:null,
    writer:null,
    file1:null,
    file2:null,
    file3:null,
    file4:null

}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {initialState}, action){
    switch (action.type){
        case POST_WRITE : 
            return {...state, postWriteSuccess:action.payload}
            break;
        
        case POST_EDIT :
            return {...state, postEditSuccess:action.payload}
            break;
        
        case POST_DELETE:
            return {...state, postDeleteSuccess:action.payload}
            break;

        default:
            return state;
    }
}