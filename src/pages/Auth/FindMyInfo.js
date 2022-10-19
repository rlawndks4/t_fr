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
import $ from 'jquery'
const FindMyInfo = () => {
    const [type, setType] = useState(0);//0-선택창, 1-id찾기, 2-pw찾기
    const navigate = useNavigate();
    const [isFindId, setIsFindId] = useState(false)
    const [findId, setFindId] = useState("")
    const onFindId = async () => {
        const { data: response } = await axios.post('/api/findauthbynameandemail', {
            name: $('.find-id-name').val(),
            email: $('.find-id-email').val()
        });
        if (response.result < 0) {
            toast(response.message);
        } else {
            setIsFindId(true)
            setFindId(response.data.id)
        }
    }
    const onFindPw = async () => {
        const { data: response } = await axios.post('/api/findpwbynameandid', {
            name: $('.find-pw-name').val(),
            id: $('.find-pw-id').val()
        });
        if (response.result < 0) {
            toast(response.message);
        } else {
            toast(response.message);
            await new Promise((r) => setTimeout(r, 1000));
            navigate(-1);
        }
    }
    const onKeyPressPw = (e) => {
        if (e.key == 'Enter') {
        }
    }
    const formatId = (str) => {
        let result = "";
        for (var i = 0; i < str.length; i++) {
            if (i == 0 || i == str.length - 1 || i == str.length - 2) {
                result += str[i];
            } else {
                result += "*"
            }
        }
        return result;
    }
    return (
        <Wrappers>
            <LeftContent width={50} />
            <ContentWrapper width={50} style={{ flexDirection: 'column' }}>
                {type == 0 ?
                    <>
                        <AuthContent>
                            <InputContainer style={{ textAlign: 'center', flexDirection: 'column', width: '50%', color: theme.color.background1, fontSize: '30px', fontWeight: 'bold', minWidth: '200px' }}>
                                <div style={{ margin: 'auto' }}>ID/PW 찾기</div>
                            </InputContainer>
                            <InputContainer style={{ background: theme.color.background4, justifyContent: 'space-between', marginBottom: '72px' }}>
                                <AuthDiv style={{ color: '#fff', width: '45%', fontSize: '30px' }} onClick={() => setType(1)}>
                                    <img src={personImg} style={{ height: '48px', margin: 'auto 8px auto auto' }} />
                                    <div style={{ margin: 'auto auto auto 8px' }}>ID</div>
                                </AuthDiv>
                                <AuthDiv style={{ color: '#fff', width: '45%', fontSize: '30px' }} onClick={() => setType(2)}>
                                    <img src={keyImg} style={{ height: '42px', margin: 'auto 8px auto auto' }} />
                                    <div style={{ margin: 'auto auto auto 8px' }}>PW</div>
                                </AuthDiv>
                            </InputContainer>
                        </AuthContent>
                    </>
                    :
                    <>
                    </>}
                {type == 1 ?
                    <>

                        <AuthContent style={{ marginTop: '70px' }}>
                            <InputContainer>
                                <InputTitle>Name</InputTitle>
                                <Input className="find-id-name" />
                            </InputContainer>
                            <InputContainer>
                                <InputTitle>Email</InputTitle>
                                <Input className="find-id-email" />
                            </InputContainer>
                            <AuthButton onClick={onFindId}>확인</AuthButton>
                        </AuthContent>
                        {isFindId ?
                            <>
                                <AuthContent style={{ marginTop: '32px', marginBottom: '32px', width: '70%', background: '#fff', border: `3px solid ${theme.color.background4}` }}>
                                    <InputContainer style={{ flexDirection: 'column', fontSize: '24px', color: theme.color.background1 }}>
                                        <div>Your ID</div>
                                        <div>{formatId(findId)}</div>
                                    </InputContainer>
                                    <AuthButton onClick={() => { navigate(-1) }}>확인</AuthButton>
                                </AuthContent>
                            </>
                            :
                            <>
                            </>
                        }

                    </>
                    :
                    <>
                    </>}
                {type == 2 ?
                    <>
                        <AuthContent>
                            <InputContainer>
                                <InputTitle>Name</InputTitle>
                                <Input className="find-pw-name" />
                            </InputContainer>
                            <InputContainer>
                                <InputTitle>ID</InputTitle>
                                <Input className="find-pw-id" />
                            </InputContainer>
                            <AuthButton onClick={onFindPw}>확인</AuthButton>
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