// src/redux/actions.js
export const setUserToken = (token) => ({
  type: 'SET_USER_TOKEN',
  payload: token,
});

export const setIsLoggedIn = (isLoggedIn) => ({
  type: 'SET_IS_LOGGED_IN',
  payload: isLoggedIn,
});