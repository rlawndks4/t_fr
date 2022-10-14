import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/css/Login.css";

/** MUI Components **/

/** react-toastify */
/** https://www.npmjs.com/package/react-toastify */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
/** MUI Icons */
/** https://mui.com/material-ui/material-icons/?query=lock&selected=Lock */
import { AuthButton, AuthContent, ContentWrapper, Input, InputContainer, InputTitle, Wrappers } from "../../components/UserContentTemplete";
import LeftContent from "../../components/LeftContent";
/*************************************************************************/

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function isUser() {
      const { data: response } = await axios.get('/api/auth')
      if (response.pk > 0) {
        navigate('/calendar');
      } else {
        localStorage.removeItem('auth');
      }
    }

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
  const onKeyPressPw = (e) => {
    if (e.key == 'Enter') {
      onLogin();
    }
  }
  return (
    <Wrappers>
      <LeftContent width={50} />
      <ContentWrapper width={50}>
        <AuthContent>
          <InputContainer>
            <InputTitle>ID</InputTitle>
            <Input onChange={(event) => {
              setEmail(event.target.value);
            }} />
          </InputContainer>
          <InputContainer>
            <InputTitle>PW</InputTitle>
            <Input type={'password'} onChange={(event) => {
              setPassword(event.target.value);
            }}
              onKeyPress={onKeyPressPw} />
          </InputContainer>
          <div style={{ width: '80%', margin: '8px auto', textAlign: 'end' }}>
            처음 오셨나요? <Link to="/register">회원가입</Link>
          </div>
          <AuthButton onClick={onLogin}>Login</AuthButton>
        </AuthContent>

        {/* TBD */}
        {/* <div>
          <Link to="/reset">패스워드 찾기</Link>
        </div> */}
      </ContentWrapper>
      <ToastContainer />
    </Wrappers>
  );
}
