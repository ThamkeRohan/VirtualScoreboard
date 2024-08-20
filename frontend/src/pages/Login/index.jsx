import React, { useState } from "react";
import { useAsyncFn } from "../../hooks/useAsync";
import { login } from "../../services/auth";
import { useErrorPortalUpdate } from "../../contexts/ErrorPortalContext";
import { useAuthUpdate } from "../../contexts/AuthContext";
import Loading from "../../components/Loading";

export default function Login() {
  const [umpireName, setUmpireName] = useState("");
  const [password, setPassword] = useState("");
  const loginFn = useAsyncFn(login);
  const {login: loginLocally} = useAuthUpdate()
  const {addError} = useErrorPortalUpdate()

  function handleSubmit(e) {
    e.preventDefault();
    if (umpireName.trim().length === 0 || password.trim().length === 0) {
      return addError("All fields are required");
    }
    loginFn.execute({ umpireName, password })
    .then((data) => loginLocally(data.umpire, data.token))
    .catch((message) => addError(message))
  }
  return (
    <div className="signup">
      <div className="container-sm">
        <h1 className="page-heading text-xl-bold">Login</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="Umpire name"
            value={umpireName}
            onChange={(e) => setUmpireName(e.target.value)}
          />
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={loginFn.loading}
            className="btn btn-block submit-btn"
          >
            {loginFn.loading ? <Loading isBtnLoading/> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
