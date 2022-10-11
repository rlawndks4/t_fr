import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/css/Login.css";

/** MUI Components **/
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

/** react-toastify */
/** https://www.npmjs.com/package/react-toastify */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
/** MUI Icons */
/** https://mui.com/material-ui/material-icons/?query=lock&selected=Lock */
import LockIcon from "@mui/icons-material/Lock";
import { ContentWrapper, Wrappers } from "../components/UserContentTemplete";
import LeftContent from "../components/LeftContent";
/*************************************************************************/

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

  }, []);
  const onLogin = async () => {
    if (!email || !password) {
      return toast("모든 값을 입력해주세요!");
    } else {
      const { data: response } = await axios.post('/api/loginbyid', {
        id: email,
        pw: password
      })
      if (response.result > 0) {
        localStorage.setItem('auth', JSON.stringify(response.data));
        toast("환영합니다!");
        await new Promise((r) => setTimeout(r, 1000));
        navigate('/calendar')
      } else {
        toast(response.message);
      }
    }
  }
  return (
    <Wrappers>
      <LeftContent />
      <ContentWrapper>
        <div className="login__container">
          <TextField
            id="email-text-field"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">ID</InputAdornment>
              ),
            }}
            sx={{ m: 1, width: "25ch" }}
            variant="filled"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <TextField
            id="password-text-field"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">PW</InputAdornment>
              ),
            }}
            sx={{ m: 1, width: "25ch" }}
            variant="filled"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <Button
            variant="contained"
            style={{ marginTop: 10, backgroundColor: "#333", cursor: 'pointer' }}
            onClick={onLogin}
          >
            <LockIcon />
            <span style={{ marginLeft: 25 }}>로그인</span>
          </Button>

          <div>
            처음 오셨나요? <Link to="/register">회원가입</Link>으로.
          </div>

          {/* TBD */}
          {/* <div>
          <Link to="/reset">패스워드 찾기</Link>
        </div> */}
        </div>
      </ContentWrapper>
      <ToastContainer />
    </Wrappers>
  );
}
