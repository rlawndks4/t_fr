import "../styles/css/Calendar.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format, addMonths, subMonths } from 'date-fns';
import RenderCells from "../components/calendar/RenderCells";
import RenderDays from "../components/calendar/RenderDays";
import RenderHeader from "../components/calendar/RenderHeader";
import { CalendarWrappers, LogoutButton } from "../components/UserContentTemplete";
import styled from "styled-components";
import studyImg from '../assets/study.svg';
import promiseImg from '../assets/promise.svg';
import subjectImg from '../assets/subject.svg';
import notImg from '../assets/not.svg';
import theme from "../styles/theme";
import addImg from '../assets/add.svg'
import axios from "axios";
import { AiOutlineSearch } from 'react-icons/ai'
import $ from 'jquery'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoList = styled.div`
width:40vw;
min-height:90vh;
display:flex;
flex-direction:column;
@media screen and (max-width: 1000px) {
    width:90%;
    margin: 32px auto;
}
`
const Title = styled.div`
width: 50%;
text-align: center;
margin: auto 0;
font-weight: 500;
font-size: 28px;
@media screen and (max-width: 500px) {
    font-size:20px;
}
`
const List = styled.div`
display:flex;
width:50%;
flex-direction:column;
`
const Content = styled.div`
display:flex;
flex-direction:column;
min-height:64px;
`
const Hash = styled.div`
background:#C5B6A3;
display:flex;
color:${props => props.theme.color.font2};
font-weight: 600;
font-size: 20px;
align-items:center;
margin-right:auto;
padding:0 4px;
border-radius:4px;
margin-left:4px;
`
const ModalContainer = styled.div`
position:fixed;
background:#00000066;
width:100vw;
height:110vh;
top:-10vh;
display: ${props=>props.display};
z-index:15;
`
const ModalContentContainer = styled.div`
background:${props => props.theme.color.background4};
margin:auto;
background: #ECE8D9;
box-shadow: -7px 0px 4px rgba(0, 0, 0, 0.15), 7px 7px 4px rgba(0, 0, 0, 0.15), inset 0px 7px 4px rgba(0, 0, 0, 0.15);
border-radius: 30px;
display:flex;
flex-direction:column;
width:40vw;
margin:20vh 8px auto auto;
@media screen and (max-width: 1000px) {
    width:90%;
    margin:20vh auto auto auto;
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
}
`
const ModalTitle = styled.div`
width:36px;
font-size:16px;
font-weight: 400;
text-align:center;
color:${props => props.theme.color.font2};
`
const ModalInput = styled.input`
font-size:13px;
padding: 0.5vw;
border-radius:50px;
border:none;
outline:none;
font-weight: 300;
margin:0 0.5vw;
`
const ModalDateInput = styled.input`
font-size:13px;
padding: 0.5vw;
border-radius:50px;
border:none;
outline:none;
font-weight: 300;
margin:0 0.5vw;
width:6vw;
@media screen and (max-width: 1000px) {
    width:15vw;
}
@media screen and (max-width: 500px) {
    width:18vw;
}
`
const ModalSelect = styled.select`
font-size:13px;
padding: 0.5vw;
border-radius:50px;
border:none;
outline:none;
font-weight: 300;
margin:0 0.5vw;
`
const Calendar = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [modalDisplay, setModalDisplay] = useState("none")
    const [lng, setLng] = useState(-1);
    const [lat, setLat] = useState(-1);
    const [placeName, setPlaceName] = useState("")
    const [toDoList, setTodoList] = useState({

    })
    const [notToDoList] = useState({

    })
    const [addressList, setAddressList] = useState([])
    const to_do_list = [
        {
            title: "과제",
            icon: subjectImg
        },
        {
            title: "공부",
            icon: studyImg
        },
        {
            title: "약속",
            icon: promiseImg
        },
    ];
    const not_to_do_list = [
        {
            title: "지각",
            icon: notImg
        },
        {
            title: "결석",
            icon: notImg
        },
        {
            title: "핸드폰",
            icon: notImg
        }
    ];

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        setSelectedDate(format(new Date(), 'yyyy-MM-dd'))
        $('.modal-container').on('click', function (e) {
            if($(e.target).parents('.modal-content-container').length < 1){
                setModalDisplay("none");
            }
        });
    }, [])
    useEffect(() => {
        async function fetchPost() {
            let auth = JSON.parse(localStorage.getItem('auth'))?.pk ?? 0;

        }
        fetchPost();
        console.log(selectedDate)
    }, [selectedDate])
    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (year, month, date, format) => {
        setSelectedDate(format)
    };
    const onChangeModalDispplay = () => {
        if(modalDisplay=="flex"){
            setModalDisplay("none")
        }else{
            setModalDisplay("flex")
        }
    }
    const geocoding = async () => {
        const { data: response } = await axios.post('/api/getaddressbytext', {
            text: $('.place').val()
        });
        setAddressList(response.data ?? []);
    }
    const addTodoList = async () => {
        if (!$('.title').val()) {
            alert('제목을 입력해 주세요.');
        } else if (!$('.start-time').val() || !$('.end-time').val()) {
            alert('시간을 설정해 주세요.');
        } else if (lat == -1 && lng == -1) {
            alert('장소를 설정해 주세요.');
        } else {
            if (window.confirm("저장 하시겠습니까?")) {
                let auth = JSON.parse(localStorage.getItem('auth'));
                const { data: response } = await axios.post('/api/addtodo', {
                    title: $('.title').val(),
                    select_date: selectedDate,
                    start_time: $('.start-time').val(),
                    end_time: $('.end-time').val(),
                    tag: $('.tag').val(),
                    minute_ago: $('.minute-ago').val(),
                    place: placeName,
                    lat: lat,
                    lng: lng,
                    user_pk: auth.pk
                })
                console.log(response)
                if (response.result > 0) {
                    toast("저장이 완료되었습니다!");
                    setLat(-1);
                    setLng(-1);
                }
            }
        }

    }
    const setPlace = (obj) =>{
        setPlaceName(obj.road_address);
        setLat(obj.lat)
        setLng(obj.lng)
    }
    return (
        <CalendarWrappers>
            <div className="calendar">
                <RenderHeader
                    currentMonth={currentMonth}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                />
                <RenderDays />
                <RenderCells
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={onDateClick}
                />
            </div>
            <TodoList>
                <div style={{ width: '100%', display: 'flex', height: '88px', color: theme.color.font2 }}>
                    <Title>To do List</Title>
                    <Title style={{ display: 'flex' }}>
                        <div style={{ display: 'flex', margin: '0 auto' }}>
                            <p style={{ margin: '0 4px 0 0', textDecoration: 'underline' }}>Not</p> <div>To do List</div>
                        </div>
                    </Title>
                </div>
                <div style={{ width: '100%', display: 'flex' }}>
                    <List style={{ borderRight: '2px dashed #93816D' }}>
                        {to_do_list.map((item) => (
                            <>
                                <Hash>
                                    <div>#{item.title}</div>
                                    <img src={item.icon} style={{ height: '20px', marginLeft: '4px' }} />
                                </Hash>
                                <Content>

                                </Content>
                            </>
                        ))}
                    </List>
                    <List>
                        {not_to_do_list.map((item) => (
                            <>
                                <Hash>
                                    <div>#{item.title}</div>
                                    <img src={item.icon} style={{ height: '20px', marginLeft: '4px' }} />
                                </Hash>
                                <Content>

                                </Content>
                            </>
                        ))}
                    </List>
                </div>
                <img src={addImg} style={{ width: '32px', margin: '8px auto', cursor: 'pointer' }} onClick={onChangeModalDispplay} />
            </TodoList>
            <ModalContainer display={modalDisplay} className="modal-container">
                <ModalContentContainer className="modal-content-container">
                    <ModalContent>
                        <ModalTitle>제목</ModalTitle>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ModalInput style={{ width: '86%' }} className="title" />
                        </div>
                    </ModalContent>
                    <ModalContent>
                        <ModalTitle>일시</ModalTitle>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ModalDateInput type="date" value={selectedDate} />
                            <ModalDateInput type="time" className="start-time" />
                            <div style={{ width: '2%' }}>~</div>
                            <ModalDateInput type="date" value={selectedDate} />
                            <ModalDateInput type="time" className="end-time" />
                        </div>

                    </ModalContent>
                    <ModalContent>
                        <ModalTitle>태그</ModalTitle>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ModalSelect className="tag">
                                <option value={1}>과제</option>
                                <option value={2}>공부</option>
                                <option value={3}>약속</option>
                                <option value={4}>지각</option>
                                <option value={5}>결석</option>
                                <option value={6}>핸드폰</option>
                            </ModalSelect>
                        </div>

                    </ModalContent>
                    <ModalContent>
                        <ModalTitle>알림</ModalTitle>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ModalSelect className="minute-ago">
                                <option value={10}>10분전</option>
                                <option value={30}>30분전</option>
                                <option value={60}>1시간전</option>
                                <option value={180}>3시간전</option>
                                <option value={300}>5시간전</option>
                            </ModalSelect>
                        </div>
                    </ModalContent>
                    <ModalContent>
                        <ModalTitle>장소</ModalTitle>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ModalInput className="place" onKeyPress={(e) => {
                                console.log(e.key)
                                if (e.key == 'Enter') {
                                    geocoding();
                                }
                            }} />
                            <AiOutlineSearch style={{ padding: '4px', fontSize: '20px', cursor: 'pointer' }} onClick={geocoding} />
                        </div>
                    </ModalContent>
                    {addressList.length > 0 ?
                        <>
                            <ModalContent style={{ flexDirection: 'column' }}>
                                <div>
                                    
                                </div>
                                {addressList.map((item, idx) => (
                                    <>
                                    <div onClick={()=>{setPlace(item)}}>{item.road_address}</div>
                                    </>
                                ))}
                            </ModalContent>
                        </>
                        :
                        <>
                        </>}


                    <ModalContent>
                        <LogoutButton style={{ borderRadius: '50px', margin: '64px auto' }} onClick={addTodoList}>일정추가</LogoutButton>
                    </ModalContent>
                </ModalContentContainer>
            </ModalContainer>
            <ToastContainer />
        </CalendarWrappers>
    );
};
export default Calendar;