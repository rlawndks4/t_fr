import "../../styles/css/Register.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/** react-toastify */
/** https://www.npmjs.com/package/react-toastify */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
/** MUI Components **/
import { AuthButton, AuthContent, ContentWrapper, Input, InputContainer, InputTitle, Wrappers } from "../../components/UserContentTemplete";
import LeftContent from "../../components/LeftContent";

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
      <LeftContent width={50}  />
      <ContentWrapper width={50} >
        <AuthContent>
          <InputContainer>
            <InputTitle>ID</InputTitle>
            <Input onChange={(event) => {
              setName(event.target.value);
            }} />
          </InputContainer>
          <InputContainer>
            <InputTitle>EMAIL</InputTitle>
            <Input onChange={(event) => {
              setEmail(event.target.value);
            }} />
          </InputContainer>
          <InputContainer>
            <InputTitle>PW</InputTitle>
            <Input type={'password'} onChange={(event) => {
              setPassword(event.target.value);
            }} />
          </InputContainer>
          <InputContainer>
            <InputTitle>PW 확인</InputTitle>
            <Input type={'password'} onChange={(event) => {
              setPassword2(event.target.value);
            }} />

          </InputContainer>
          <div style={{ width: '80%', margin: '8px auto', textAlign: 'end' }}>
            이미 계정이 있으신가요? <Link to="/">로그인</Link>
          </div>
          <AuthButton onClick={register}>Join</AuthButton>

        </AuthContent>

        <ToastContainer />
      </ContentWrapper>
    </Wrappers>

  );
}
export default Register;
