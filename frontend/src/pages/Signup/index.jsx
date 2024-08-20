import React, { useState } from "react";
import { useAsyncFn } from "../../hooks/useAsync";
import { signup } from "../../services/auth";
import { useAuthUpdate } from "../../contexts/AuthContext";
import { profilePics } from "../../data/profilePics";
import ProfilePic from "./ProfilePic";
import { useErrorPortalUpdate } from "../../contexts/ErrorPortalContext";
import Loading from "../../components/Loading";

export default function Signup() {
  const [selectedProfilePic, setSelectedProfilePic] = useState("bee.png");
  const [umpireName, setUmpireName] = useState("");
  const [password, setPassword] = useState("");
  const signupFn = useAsyncFn(signup);
  const { login: loginLocally } = useAuthUpdate();
  const {addError} = useErrorPortalUpdate()

  function handleSubmit(e) {
    e.preventDefault();
    if (
      selectedProfilePic.trim().length === 0 ||
      umpireName.trim().length === 0 ||
      password.trim().length === 0
    ) {
      return addError("All fields are required")
    }

    signupFn
      .execute({ profilePicUrl: selectedProfilePic, umpireName, password })
      .then((data) => loginLocally(data.umpire, data.token))
      .catch((message) => addError(message))
  }

  return (
    <div className="signup">
      <div className="div container-sm">
        <h1 className="page-heading text-xl-bold">Signup</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="profile-pics-container">
            {profilePics.map((profilePic) => {
              return (
                <ProfilePic
                  key={profilePic}
                  profilePic={profilePic}
                  selectedProfilePic={selectedProfilePic}
                  setSelectedProfilePic={setSelectedProfilePic}
                />
              );
            })}
          </div>
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
            disabled={signupFn.loading}
            className="btn btn-block submit-btn"
          >
            {signupFn.loading ? <Loading isBtnLoading/> : "Submit" }
          </button>
        </form>
      </div>
    </div>
  );
}
