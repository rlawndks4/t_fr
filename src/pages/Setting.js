import "../styles/css/Setting.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Wrappers, ContentWrapper } from "../components/UserContentTemplete";
import LeftContent from "../components/LeftContent";
import styled from "styled-components";
import { GrNext, GrPrevious } from 'react-icons/gr'
import beforeImg from '../assets/before.svg'
import afterImg from '../assets/after.svg'
import { AuthButton } from "../components/UserContentTemplete";
import theme from "../styles/theme";
import axios from "axios";
const Content = styled.div`
border-bottom: 1px solid ${props => props.theme.color.background1};
height:64px;
display:flex;
justify-content:space-between;
align-items:center;
font-size:24px;
color:${props => props.theme.color.background1};
`
export default function Setting() {
  const navigate = useNavigate();

  const onChangeTarget = (e) => {
    console.log(e.target.value)
  }
  const onLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
        const { data: response } = await axios.post('/api/logout');
        if (response.result > 0) {
            localStorage.removeItem('auth');
            navigate('/login');
        }
    }
}
  return (
    <Wrappers>
      <LeftContent width={50} />
      <ContentWrapper width={50}>
        <div style={{ width: '80%', margin: 'auto' }}>
          <Content style={{ cursor: 'pointer' }}>
            <div>계정</div>
            <AuthButton style={{ color: '#fff', height: '54px', marginTop: '0', width: '240px', borderRadius: '12px',background:theme.color.background3 }}
            onClick={()=>{navigate('/settingauth')}}>
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

        <ToastContainer />
      </ContentWrapper>
    </Wrappers>

  );
}
