import axios from "axios"
import setAlert from "./alert"
import { GET_PROIFLE, PROFILE_ERROR } from "./types"


export const getCurrentProfile = () => async dispatch => {

    try {
        const res= await axios.get('/api/profiles/me')
        dispatch({type:GET_PROIFLE, payload:res.data});
    } catch (err) {
        dispatch({type:PROFILE_ERROR, payload:{status: err.response.status, msg: err.response.statusText}});
    }
}

export const createProfile = (formData, navigate, edit=false) => async dispatch => {

    try {
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 

        const res = await axios.post('/api/profiles', formData, config);
        
        dispatch({type:GET_PROIFLE, payload: res.data});
        console.log(res.data)

        dispatch(setAlert(edit? 'Profile Updated' : 'Profile Created' , 'success'));
        navigate('/dashboard')

    } catch (err) {

        const errors = err.response.data.errors

        if(errors)  {
            errors.forEach(error => {
                console.log(error)
                dispatch(setAlert(error.msg, 'danger'))}
            );
        }
        dispatch({type:PROFILE_ERROR, payload:{status: err.response.status, msg: err.response.statusText}});
    }
}