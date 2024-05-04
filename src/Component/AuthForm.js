import { useState, useRef, useContext } from "react";

import classes from "./AuthForm.module.css";
import AuthContext from "../auth-context";
// import { useNavigate } from "react-router";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputConfirmPasswordRef = useRef();

  const authCtx = useContext(AuthContext);
  //   const history = useHistory()
  console.log(authCtx);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;
    setIsLoading(true);
    
    
    let url;
    if (isLogin) {
        url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCur9xCsh35ycJRAqP2U3DynKEpK8MDbj8";
    } else {
        
        const enteredConfirmPassword = inputConfirmPasswordRef.current.value;
        if(enteredConfirmPassword !== enteredPassword){
            setIsLoading(false)
            return alert('password not match')
        }
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCur9xCsh35ycJRAqP2U3DynKEpK8MDbj8";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = " authencaton failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            // alert(errorMessage);
            // console.log(data);
            if (isLogin) {
              errorMessage =
                "Authentication failed alert like the way you did in signup";
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        authCtx.login(data.idToken);
        //   history.replace('/')
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={inputEmailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={inputPasswordRef}
          />
        </div>

        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="password">confirm Password</label>
            <input
              type="password"
              id="confirm_password"
              required
              ref={inputConfirmPasswordRef}
            />
          </div>
        )}

        <div
          style={{
            backgroundColor: "brown",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className={classes.actions}
        >
          {!isLoading && (
            <button
              type="submit"
              className={classes.toggle}
              onClick={submitHandler}
            >
              {isLogin ? "login" : " create account"}
            </button>
          )}
          {isLoading && <p>sending a request</p>}
        </div>
        <div className={classes.actions}>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
