// Action.
/* export const increament = () => {
  return {
		type :  "INCREAMENT"
	};
}; */
export const increament = () => dispatch => {
  dispatch({ type: 'INCREAMENT' });
}
