import { LOGGED_IN, REGISTERED, ERROR } from "./actionTypes";
import axios from 'axios';
import AuthReducer from '../reducers/AuthReducer';


export const login = (data) => async dispatch => {
		try {
    const res = await axios.post('http://localhost:4000/signin', data);
    console.log(res.data.results);
    if (res.data.results == "not a user") {
      console.log("not a user");
    }
    else {
      //console.log(res.data.token);
      const token = res.data.token;
      const { first_name, id } = JSON.parse(JSON.parse(atob(token.split('.')[1])).data)[0];
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('expiryDate', Date.now() + 3600000);
      console.log("Call Dispatcher");
      console.log(res.data);
      //return { type: LOGGED_IN, value: { data: res.data } };
      dispatch(AuthReducer({ type: 'LOGGED_IN', value: { data: res.data } }))
      //dispatch(setAlert(`Welcome ${first_name}!`,'success'))
    }
  }
  catch (err) {
    dispatch({ type: ERROR, value: err.message });
  }
}