import { SET_ALERT, REMOVE_ALERT } from './types'
import {v4 } from 'uuid'


const setAlert = (msg, alertType, timeout=10000) => (dispatch) =>{
    const id = v4();
    console.log(id);
    dispatch({
        type:SET_ALERT,
        payload:{msg, alertType, id}
    });

    setTimeout(() => dispatch({type:REMOVE_ALERT, payload:id }), timeout);
}

export default setAlert; //Type error resolved by exporting default for setAlert



    