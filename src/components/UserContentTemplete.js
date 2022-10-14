import styled from "styled-components";

export const Wrappers = styled.div`
display:flex;
width:100%;
background:#fff;
min-height:100vh;
@media screen and (max-width: 800px) {
}
`
export const CalendarWrappers = styled.div`
margin-top:80px;
display:flex;
position:relative;
@media screen and (max-width: 1000px) {
    flex-direction:column;
}
`
export const ContentWrapper = styled.div`
display:flex;
width:${props=>props.width}%;
@media screen and (max-width: 800px) {
    width:100%;
    margin-top:7rem;
}
`
export const LogoutButton = styled.button`
height: 52px;
width: 149px;
border-radius: 2px;
border:none;
background:${props => props.theme.color.background1};
color:${props => props.theme.color.background4};
font-size:20px;
cursor:pointer;
`
export const AuthContent = styled.div`
width:80%;
background:${props => props.theme.color.background4};
margin:auto;
border-radius: 10px;
@media screen and (max-width: 800px) {
    width:90%;
}
`
export const AuthButton = styled.button`
width:100%;
background:${props => props.theme.color.background1};
color:${props => props.theme.color.background4};
font-size: 24px;
font-weight: 600;
text-align: center;
height:84px;
cursor:pointer;
border:none;
border-radius: 10px;
margin-top:48px;

`
export const InputContainer = styled.div`
display:flex;
align-items:center;
border-radius: 10px;
height:84px;
background:#fff;
width:80%;
margin:48px auto 0 auto;
`
export const InputTitle = styled.div`
width:30%;
text-align:center;
font-size: 28px;
font-weight: 600;
color:${props => props.theme.color.background1};
`
export const Input = styled.input`
width:60%;
margin:0 auto;
border:none;
font-size: 28px;
color:${props => props.theme.color.font1};
outline:none;
`
export const WithIconButtonStyle = styled.div`

`
export const WithIconButton = (props) =>{
    return (
        <>
        </>
    )
}
