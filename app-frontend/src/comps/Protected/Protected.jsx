import Login from "../../views/Login/login";

function Protected(isAuth, children) {
  return isAuth ? children: <Login/>
}

export default Protected;