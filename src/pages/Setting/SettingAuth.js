import "../../styles/css/Setting.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Wrappers, ContentWrapper } from "../../components/UserContentTemplete";
import LeftContent from "../../components/LeftContent";
import styled from "styled-components";
import { GrNext, GrPrevious } from 'react-icons/gr'
import beforeImg from '../../assets/before.svg'
const Content = styled.div`
border-bottom: 1px solid ${props => props.theme.color.background1};
height:64px;
display:flex;
justify-content:space-between;
align-items:center;
font-size:24px;
color:${props => props.theme.color.background1};
`
const SettingAuth = () => {
    const navigate = useNavigate();
    const [isCheckPw, setIsCheckPw] = useState(false);

    const onChangeTarget = (e) => {
        console.log(e.target.value)
    }
    return (
        <Wrappers>
            <LeftContent width={50} />
            <ContentWrapper width={50}>
                {isCheckPw?
                <>
                </>
                :
                <>
                <div style={{ width: '80%', margin: 'auto' }}>
                    <Content>화면 설정</Content>
                    <Content>
                        <div>한 주의 시작을 월요일로</div>
                        <label class="switch">
                            <input type="checkbox" onChange={onChangeTarget} />
                            <span class="slider round"></span>
                        </label>
                    </Content>
                    <Content style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
                        <div>뒤로 가기</div>
                        <img src={beforeImg} style={{ height: '24px' }} />
                    </Content>
                </div>
                </>
                }
                

                <ToastContainer />
            </ContentWrapper>
        </Wrappers>

    );
}
export default SettingAuth;
