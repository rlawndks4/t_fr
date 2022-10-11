import styled from "styled-components";

export const Wrappers = styled.div`
display:flex;
width:100%;
background:#fff;
min-height:100vh;
`
export const CalendarWrappers = styled.div`
margin-top:80px;
`
export const ContentWrapper = styled.div`
display:flex;
width:65%;
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

