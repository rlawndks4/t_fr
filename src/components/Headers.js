import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { FaBell } from 'react-icons/fa'
import { BsBarChartLineFill } from 'react-icons/bs'
import { AiFillSetting } from 'react-icons/ai';
import { LogoutButton } from "./UserContentTemplete";
import axios from 'axios'
const Header = styled.header`
height:72px;
position:fixed;
top:0;
width:95%;
padding:0 2.5%;
background:${props => props.theme.color.background4};
color:${props => props.theme.color.background1};
display:flex;
justify-content:space-between;
align-items:center;
font-size: 26px;
font-weight: 600;
`
const Headers = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [display, setDisplay] = useState(false);
    const [auth, setAuth] = useState({})
    const ignoreList = ['/', '/login', '/register'];
    useEffect(() => {

        if (!localStorage.getItem('auth')) {
            navigate('/login');
        } else {
            let auth = JSON.parse(localStorage.getItem('auth'));
            setAuth(auth);

        }
        if (ignoreList.includes(location.pathname)) {
            setDisplay(false);
        } else {
            setDisplay(true);
        }
    }, [location])
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
        <>
            {display ?
                <>
                    <Header>
                        <div>To do or Not List</div>
                        <div style={{ width: '270px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <BsBarChartLineFill style={{ cursor: 'pointer' }} />
                            <FaBell style={{ cursor: 'pointer' }} />
                            <AiFillSetting style={{ cursor: 'pointer' }} />
                            {
                                auth ?
                                    <LogoutButton onClick={onLogout}>LOGOUT</LogoutButton>
                                    :
                                    <></>
                            }
                        </div>
                    </Header>
                </>
                :
                <>
                </>
            }

        </>
    )
}
export default Headers;