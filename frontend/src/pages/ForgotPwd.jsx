import "../styles/forgotpwd.css";
import { Link } from "react-router-dom";
function ForgotPwd() {
  return (
    <div className="app-wrapper">
      <div className="helpdesk-container">
        <form>
          <p
            className="helpdesk-title"
            style={{
              textAlign: "center",
              width: "400px",
              fontSize: "1rem",
              marginBottom: "50px",
            }}
          >
            Don't worry, Enter your email below and we will send you a link to
            change password
          </p>
          <input type="email" name="email" placeholder="Email" required />
          <button type="submit" className="forgotsubmitbtn">
            Submit
          </button>{" "}
          <button type="submit" className="forgotsigninbtn">
            Sign Up
          </button>
          <div className="redirect">
            <Link to="/forgotpassword" style={{ color: "red" }}>
              Forgot Password
            </Link>
            <Link to="/signup" style={{ color: "black" }}>
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPwd;
