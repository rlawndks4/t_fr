import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { FaBell } from 'react-icons/fa'
import { BsBarChartLineFill, BsFillCalendarFill } from 'react-icons/bs'
import { AiFillSetting } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md'
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
z-index:10;
`
const Headers = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [display, setDisplay] = useState(false);
    const [auth, setAuth] = useState({})
    const ignoreList = ['/', '/login', '/register', '/findmyinfo'];
    
    useEffect(() => {

        if (localStorage.getItem('auth')) {
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
                        <div style={{ width: '300px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <MdLocationOn style={{ cursor: 'pointer' }} onClick={() => window.location.reload()} />
                            <BsFillCalendarFill style={{ cursor: 'pointer' }} onClick={() => navigate('/calendar')} />
                            <BsBarChartLineFill style={{ cursor: 'pointer' }} onClick={() => navigate('/chart')} />
                            <AiFillSetting style={{ cursor: 'pointer' }} onClick={() => navigate('/setting')} />
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