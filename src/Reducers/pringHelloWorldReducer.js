import {PRINT_HELLO} from '../Actions/printHelloAction';

const printHelloReducer = (state={message:'No Message'},{type,payload})=>{
  switch (type) {
    case PRINT_HELLO:
        console.log('IN REDUCER');
        return payload;
      default:
        console.log('IN REDUCER Default');
        return state;
  }
}
export default printHelloReducer;