import axios from 'axios';
import {
    POST_WRITE,
    POST_EDIT,
    POST_DELETE
} from './types';

export function postWrite(dataToSubmit){
    const request = axios.post("/api/post/write", dataToSubmit)
    .then((response) => (response.data), [])

    return {
        type:POST_WRITE,
        payload: request
    }
}

export function postEdit(dataToSubmit){
    const request = axios.patch("/api/post/edit", dataToSubmit)
    .then((response) => (response.data))

    return {
        type:POST_EDIT,
        payload: request
    }
}

export function postDelete(dataToSubmit){
    const request = axios.delete("/api/post/delete", dataToSubmit)
    .then((response) => (response.data))
    
    return{
        type:POST_DELETE,
    }
}