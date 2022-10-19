import "../styles/css/Setting.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthButton, AuthContent, ContentWrapper, Input, InputContainer, InputTitle, Wrappers } from "../components/UserContentTemplete";
import LeftContent from "../components/LeftContent";
import styled from "styled-components";
import { GrNext, GrPrevious } from 'react-icons/gr'
import beforeImg from '../assets/before.svg'
import afterImg from '../assets/after.svg'
import theme from "../styles/theme";
import axios from "axios";
import { MdCancel } from 'react-icons/md'
import $ from 'jquery'

const Content = styled.div`
border-bottom: 1px solid ${props => props.theme.color.background1};
height:64px;
display:flex;
justify-content:space-between;
align-items:center;
font-size:24px;
color:${props => props.theme.color.background1};
`
const ModalContainer = styled.div`
position:fixed;
background:#00000066;
width:110vw;
height:110vh;
top:-10vh;
right:0;
display: ${props => props.display};
z-index:15;
`
const ModalContentContainer = styled.div`
background:${props => props.theme.color.background4};
background: #ECE8D9;
box-shadow: -7px 0px 4px rgba(0, 0, 0, 0.15), 7px 7px 4px rgba(0, 0, 0, 0.15), inset 0px 7px 4px rgba(0, 0, 0, 0.15);
border-radius: 10px;
display:flex;
flex-direction:column;
width:40vw;
position:fixed;
right: 30vw;
top:15vh;
@media screen and (max-width: 1000px) {
    width:75%;
    top:15vh;
    right: 12.5vw;
}
@media screen and (max-width: 500px) {
    top:12vh;
    width:95%;
    right: 2.5vw;
}
`
const ModalContent = styled.div`
width:90%;
margin:5vh auto 0 auto;
display:flex;
align-items:center;
@media screen and (max-width: 500px) {
    flex-direction:column;
    align-items:flex-start;
    margin:2vh auto 0 auto;
}
`
export const SaveButton = styled.button`
width:100px;
background:${props => props.theme.color.background3};
color:#fff;
font-size: 18px;
font-weight: 600;
text-align: center;
height:36px;
cursor:pointer;
border:none;
border-radius: 10px;
margin-top:48px;

`
const Setting = () => {
  const navigate = useNavigate();
  const [modalDisplay, setModalDisplay] = useState("none")
  const [checkPw, setCheckPw] = useState(false);

  const onLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      const { data: response } = await axios.post('/api/logout');
      if (response.result > 0) {
        localStorage.removeItem('auth');
        navigate('/login');
      }
    }
  }
  const onChangeModalDispplay = () => {
    setCheckPw(false)
    if (modalDisplay == "flex") {
      setModalDisplay("none")
    } else {
      setModalDisplay("flex")
    }
  }
  const onCheckPw = async () => {
    const { data: response } = await axios.post('/api/checkpw', {
      pw: $('.check-pw').val(),
    })
    if (response.result < 0) {
      toast(response.message);
    } else {
      onChangeModalDispplay();
      setCheckPw(true)
      await new Promise((r) => setTimeout(r, 200));
      let auth = await JSON.parse(localStorage.getItem('auth'));
      let email = auth.email.split("@")
      $('.email1').val(email[0] ?? "");
      $('.email2').val(email[1] ?? "");
    }
  }
  const editMyInfo = async () => {
    if (window.confirm("저장하시겠습니까?")) {
      if (!$('.email1').val() || !$('.email2').val() || !$('.new-pw').val() || !$('.new-pw-check').val()) {
        toast("필수값이 비어있습니다.");
      } else if ($('.new-pw').val() != $('.new-pw-check').val()) {
        toast("비밀번호가 일치하지 않습니다.");
      } else {
        const { data: response } = await axios.post('/api/editmyinfo', {
          email: $('.email1').val() + "@" + $('.email2').val(),
          pw: $('.new-pw').val()
        })
        toast(response.message);
        if(response.result>0){
          await new Promise((r) => setTimeout(r, 1000));
          const { data: response } = await axios.post('/api/logout');
          await localStorage.removeItem('auth');
          navigate('/login');
        }
      }
    }
  }
  return (
    <Wrappers>
      <LeftContent width={50} />

      <ContentWrapper width={50}>
        {checkPw ?
          <>
            <AuthContent style={{ background: '#fff' }}>
              <div style={{ textAlign: 'center', margin: '54px auto', fontSize: '20px', fontWeight: 'bold', color: theme.color.background1 }}>개인정보 수정</div>
              <InputContainer style={{ margin: '24px auto', border: `3px solid ${theme.color.background4}` }}>
                <InputTitle>e-mail</InputTitle>
                <div style={{ display: 'flex' }}>
                  <Input className="email1" style={{ width: '25%' }} />
                  <div>@</div>
                  <Input className="email2" style={{ width: '35%' }} />
                </div>
              </InputContainer>
              <InputContainer style={{ margin: '24px auto', border: `3px solid ${theme.color.background4}` }}>
                <InputTitle>PW</InputTitle>
                <Input className="new-pw" type={'password'} />
              </InputContainer>
              <InputContainer style={{ margin: '24px auto', border: `3px solid ${theme.color.background4}` }}>
                <InputTitle>새 PW 확인</InputTitle>
                <Input className="new-pw-check" type={'password'} />
              </InputContainer>
              <div style={{ width: '250px', display: 'flex', margin: '0 auto', justifyContent: 'space-between' }}>
                <SaveButton onClick={editMyInfo}>수정</SaveButton>
                <SaveButton onClick={() => setCheckPw(false)}>돌아가기</SaveButton>
              </div>
            </AuthContent>
          </>
          :
          <>
            <div style={{ width: '80%', margin: 'auto' }}>
              <Content style={{ cursor: 'pointer' }}>
                <div>계정</div>
                <AuthButton style={{ color: '#fff', height: '54px', marginTop: '0', width: '240px', borderRadius: '12px', background: theme.color.background3 }}
                  onClick={onChangeModalDispplay}>
                  계정정보 수정
                </AuthButton>
              </Content>
              <Content style={{ cursor: 'pointer' }} onClick={() => navigate('/settingdisplay')}>
                <div>화면</div>
                <img src={afterImg} style={{ height: '24px' }} />
              </Content>
              <Content style={{ cursor: 'pointer' }} onClick={onLogout}>
                <div>로그아웃</div>
                <img src={afterImg} style={{ height: '24px' }} />
              </Content>
              <Content style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
                <div>뒤로 가기</div>
                <img src={beforeImg} style={{ height: '24px' }} />
              </Content>
            </div>
          </>
        }

        <ModalContainer display={modalDisplay} className="modal-container">
          <ModalContentContainer className="modal-content-container">

            <ModalContent style={{ margin: '5vh auto 0 auto' }}>
              <MdCancel style={{ marginLeft: 'auto', fontSize: '28px', color: theme.color.background1, cursor: 'pointer' }} onClick={onChangeModalDispplay} />
            </ModalContent>

            <AuthContent>
              <InputContainer style={{ background: theme.color.background4, color: theme.color.background1, height: '36px', fontWeight: 'bold' }}>
                본인 확인을 위해 비밀번호를 입력해주세요
              </InputContainer>
              <InputContainer style={{ margin: '0 auto' }}>
                <InputTitle>PW</InputTitle>
                <Input className="check-pw" type={'password'} />
              </InputContainer>
            </AuthContent>
            <AuthButton onClick={onCheckPw}>확인</AuthButton>
          </ModalContentContainer>
        </ModalContainer>
        <ToastContainer />
      </ContentWrapper>
    </Wrappers>

  );
}
export default Setting;
