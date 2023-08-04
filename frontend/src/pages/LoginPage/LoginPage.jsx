import { useSelector, useDispatch } from "react-redux";

import LoginForm from "../../modules/LoginForm/LoginFormForm";

import { login } from "../../redux/auth/auth-operations";

import { getAuthError } from "../../redux/auth/auth-selectors";

const { REACT_APP_API_URL } = process.env;

const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, message } = useSelector(getAuthError);

  const onLogin = (data) => {
    dispatch(login(data));
  };

  return (
    <div className="container">
      <h2>Login Page</h2>
      <LoginForm onSubmit={onLogin} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <a href={`${REACT_APP_API_URL}/auth/google`}>Login with Google</a>
        <a href={`${REACT_APP_API_URL}/auth/google2`}>Login with Google 2</a>
        <a href={`${REACT_APP_API_URL}/auth/facebook`}>Login with Facebook</a>
        <a href={`${REACT_APP_API_URL}/auth/github`}>Login with GitHub</a>
        <a href={`${REACT_APP_API_URL}/auth/linkedin`}>Login with LinkedIn</a>
        <a href={`${REACT_APP_API_URL}/auth/instagram`}>Login with Instagram</a>
      </div>
      {status && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
};

export default LoginPage;
