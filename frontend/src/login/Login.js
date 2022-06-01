import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./Login.css";

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input type="text" name="uname" required placeholder="ID"/>
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <input type="password" name="pass" required placeholder="PW"/>
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" value="로그인"/>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">로그인</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
        <div className="idpw">아이디 | 비밀번호 찾기</div>
        <div className="signup">회원가입 하기</div>
      </div>
    </div>
  );
}

export default Login;