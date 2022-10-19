import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/css/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { AuthButton, AuthContent, AuthDiv, ContentWrapper, Input, InputContainer, InputTitle, Wrappers } from "../../components/UserContentTemplete";
import LeftContent from "../../components/LeftContent";
import theme from "../../styles/theme";
import personImg from '../../assets/person.svg'
import keyImg from '../../assets/key.svg'
const FindMyInfo = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState(0);//0-선택창, 1-id찾기, 2-pw찾기
    const navigate = useNavigate();

    const findId = () => {

    }
    const findPw = () => {

    }
    const onKeyPressPw = (e) => {
        if (e.key == 'Enter') {
        }
    }
    return (
        <Wrappers>
            <LeftContent width={50} />
            <ContentWrapper width={50}>
                {type == 0 ?
                    <>
                        <AuthContent>
                            <InputContainer style={{ textAlign: 'center', flexDirection: 'column', width: '50%', color: theme.color.background1, fontSize: '30px', fontWeight: 'bold', minWidth: '200px' }}>
                                <div style={{ margin: 'auto' }}>ID/PW 찾기</div>
                            </InputContainer>
                            <InputContainer style={{ background: theme.color.background4, justifyContent: 'space-between', marginBottom: '72px' }}>
                                <AuthDiv style={{ color: '#fff', width: '45%', fontSize: '30px' }} onClick={() => setType(1)}>
                                    <img src={personImg} style={{height:'48px',margin:'auto 8px auto auto'}} />
                                    <div style={{margin:'auto auto auto 8px'}}>ID</div>
                                </AuthDiv>
                                <AuthDiv style={{ color: '#fff', width: '45%', fontSize: '30px' }} onClick={() => setType(2)}>
                                    <img src={keyImg} style={{height:'42px',margin:'auto 8px auto auto'}} />
                                    <div style={{margin:'auto auto auto 8px'}}>PW</div>
                                </AuthDiv>
                            </InputContainer>
                        </AuthContent>
                    </>
                    :
                    <>
                    </>}
                {type == 1 ?
                    <>
                        <AuthContent>

                            <AuthButton>확인</AuthButton>
                        </AuthContent>
                    </>
                    :
                    <>
                    </>}
                {type == 2 ?
                    <>
                        <AuthContent>

                            <AuthButton>확인</AuthButton>
                        </AuthContent>
                    </>
                    :
                    <>
                    </>}
            </ContentWrapper>
            <ToastContainer />
        </Wrappers>
    );
}
export default FindMyInfo;