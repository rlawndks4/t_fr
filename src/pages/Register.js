import "../styles/css/Register.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/** react-toastify */
/** https://www.npmjs.com/package/react-toastify */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
/** MUI Components **/
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { ContentWrapper, Wrappers } from "../components/UserContentTemplete";
import LeftContent from "../components/LeftContent";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");

  const register = async () => {
    if (!name || !email || !password || !password2) {
      return toast("모든 값을 입력해주세요!");
    }

    if (password !== password2) {
      return toast("패스워드를 다시 한 번 확인해주세요!");
    }

    try {
      const { data: response } = await axios.post('/api/adduser', {
        id: name,
        email: email,
        pw: password
      })
      if (response.result > 0) {
        toast("WOW! Not-To-Do-List 서비스에 성공적으로 회원가입이 되었어요!");
      } else {
        toast(response.message);
      }
    } catch (err) {
      console.log(err);

      alert(err?.message);
    }
  };

  useEffect(() => {
  }, []);

  return (
    <Wrappers>
      <LeftContent />
      <ContentWrapper>
        <div className="register">
          <div className="register__container">
            <TextField
              id="name-text-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">ID</InputAdornment>
                ),
              }}
              sx={{ m: 1, width: "25ch" }}
              variant="filled"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <TextField
              id="email-text-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Email</InputAdornment>
                ),
              }}
              sx={{ m: 1, width: "25ch" }}
              variant="filled"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <TextField
              id="pw-text-field"
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

            <TextField
              id="pw2-text-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">PW 확인</InputAdornment>
                ),
              }}
              sx={{ m: 1, width: "25ch" }}
              variant="filled"
              type="password"
              onChange={(event) => {
                setPassword2(event.target.value);
              }}
            />

            <button className="register__btn" onClick={register}>
              회원가입
            </button>

            <div>
              이미 계정이 있으신가요? <Link to="/">로그인</Link>으로.
            </div>
          </div>

          <ToastContainer />
        </div>
      </ContentWrapper>
    </Wrappers>

  );
}
export default Register;
