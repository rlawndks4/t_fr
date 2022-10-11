import "../styles/css/Setting.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/** MUI Components **/
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

/** react-toastify */
/** https://www.npmjs.com/package/react-toastify */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/** MUI Icons */
/** https://mui.com/material-ui/material-icons/?query=lock&selected=Lock */
import LockIcon from "@mui/icons-material/Lock";
/*************************************************************************/

export default function Setting() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    
  }, []);

  return (
    <div className="setting">
      <div className="left">
        <h1>😁 🙁</h1>
        <h1>To do</h1>
        <h2>or</h2>
        <h1>Not to do</h1>
        <h1>List</h1>
      </div>
      <div className="right">
        <div
          style={{
            width: "50vw",
            height: 1,
            backgroundColor: "black",
            marginTop: 16,
            marginBottom: 16,
          }}
        />
        <h1 className="left-align">화면 설정</h1>

        <div
          style={{
            width: "50vw",
            height: 1,
            backgroundColor: "black",
            marginTop: 16,
            marginBottom: 16,
          }}
        />

        <div
          style={{
            display: "flex",
            width: "50vw",
            alignItems: "flex-start",
            alignSelf: "flex-start",
          }}
        >
          <h1 className="left-align">한 주의 시작을 월요일로</h1>

          <div style={{ width: "25vw" }}></div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>

        <div
          style={{
            width: "50vw",
            height: 1,
            backgroundColor: "black",
            marginTop: 16,
            marginBottom: 16,
          }}
        />

        <div
          style={{
            display: "flex",
            width: "50vw",
            alignItems: "flex-start",
            alignSelf: "flex-start",
          }}
        >
          <h1 className="left-align"><Link to="/calendar">뒤로 가기</Link></h1>

          <div style={{ width: "36vw" }}></div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <h1 style={{ color: "gray" }}></h1>
          </div>
        </div>

        <div
          style={{
            width: "50vw",
            height: 1,
            backgroundColor: "black",
            marginTop: 16,
            marginBottom: 16,
          }}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
