import "../styles/css/Calendar.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format, addMonths, subMonths } from 'date-fns';
import RenderCells from "../components/calendar/RenderCells";
import RenderDays from "../components/calendar/RenderDays";
import RenderHeader from "../components/calendar/RenderHeader";
import { CalendarWrappers, LogoutButton } from "../components/UserContentTemplete";
import styled from "styled-components";
import theme from "../styles/theme";
import addImg from '../assets/add.svg'
import axios from "axios";
import { AiOutlineSearch } from 'react-icons/ai'
import $ from 'jquery'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdCancel } from 'react-icons/md'
import Loading from "../components/Loading";
import { MdDelete } from 'react-icons/md'
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
align-items:center;
margin:2px 0;
font-size:16px;
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
border-radius: 30px;
display:flex;
flex-direction:column;
width:40vw;
position:fixed;
right: 16px;
top:5vh;
@media screen and (max-width: 1000px) {
    width:95%;
    top:5vh;
}
@media screen and (max-width: 500px) {
    top:2vh;
    width:92%;

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
background:#fff;
&::placeholder {
    color: #ccc;
}
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

    const navigate = useNavigate();
    const [modalDisplay, setModalDisplay] = useState("none")
    const [lng, setLng] = useState(-1);
    const [lat, setLat] = useState(-1);
    const [placeName, setPlaceName] = useState("")
    const [toDoObj, setToDoObj] = useState({});
    const [notToDoObj, setNotToDoObj] = useState({});
    const [addressList, setAddressList] = useState([])
    const [loading, setLoading] = useState(false);

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [isUpdate, setIsUpdate] = useState(false)
    const [updateItem, setUpdateItem] = useState({})
    useEffect(() => {
        setSelectedDate(format(new Date(), 'yyyy-MM-dd'))
    }, [])
    useEffect(() => {
        getTodoList();
    }, [selectedDate])

    const getTodoList = async () => {
        setLoading(true);
        let auth = JSON.parse(localStorage.getItem('auth'));
        const { data: response } = await axios.post('/api/gettodolist', {
            select_date: selectedDate,
            user_pk: auth.pk
        })
        let list = response.data ?? [];
        let to_do_obj = {};
        let not_to_do_obj = {};
        for (var i = 0; i < list.length; i++) {
            if (list[i].category == 0) {//to do
                if (!to_do_obj[list[i].tag]) {
                    to_do_obj[list[i].tag] = [];
                }
                to_do_obj[list[i].tag].push(list[i])

            } else {//not to do
                if (!not_to_do_obj[list[i].tag]) {
                    not_to_do_obj[list[i].tag] = [];
                }
                not_to_do_obj[list[i].tag].push(list[i])
            }
        }
        setToDoObj(to_do_obj);
        setNotToDoObj(not_to_do_obj);
        setTimeout(() => setLoading(false), 1000);
    }
    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (year, month, date, format) => {
        setSelectedDate(format)
    };

    const geocoding = async () => {
        const { data: response } = await axios.post('/api/getaddressbytext', {
            text: $('.place').val()
        });
        setAddressList(response.data ?? []);
    }
    const onChangeModalDispplay = async (item) => {
        if (modalDisplay == "flex") {
            setModalDisplay("none")
        } else {
            setModalDisplay("flex")
            if (item) {
                setIsUpdate(true);
                await new Promise((r) => setTimeout(r, 200));
                setLat(-1);
                setLng(-1);
                setUpdateItem({});
                setUpdateItem(item);
                $('.title').val(item.title);
                $('.category').val(item.category);
                $('.start-time').val(item.start_time);
                $('.end-time').val(item.end_time);
                $('.tag').val(item.tag);
                $('.minute-ago').val(item.minute_ago);
                $('.place').val(item.place);
            } else {
                setIsUpdate(false);
            }
        }
    }
    const addTodoList = async () => {
        if (!$('.title').val()) {
            alert('제목을 입력해 주세요.');
        } else if (!$('.start-time').val() || !$('.end-time').val()) {
            alert('시간을 설정해 주세요.');
        } else {
            if (window.confirm("저장 하시겠습니까?")) {
                let auth = JSON.parse(localStorage.getItem('auth'));
                const { data: response } = await axios.post(`/api/${isUpdate?'update':'add'}todo`, {
                    title: $('.title').val(),
                    category: $('.category').val(),
                    select_date: selectedDate,
                    start_time: $('.start-time').val(),
                    end_time: $('.end-time').val(),
                    tag: $('.tag').val(),
                    minute_ago: $('.minute-ago').val(),
                    place: placeName,
                    lat: lat,
                    lng: lng,
                    user_pk: auth.pk,
                    pk:isUpdate?updateItem.pk:undefined
                })
                if (response.result > 0) {
                    toast("저장이 완료되었습니다!");
                    setLat(-1);
                    setLng(-1);
                    getTodoList();
                    onChangeModalDispplay();
                }
            }
        }

    }
    
    const setPlace = (obj) => {
        setPlaceName(obj.road_address);
        setLat(obj.lat)
        setLng(obj.lng)
    }
    const onChangeCheck = async (e) => {
        let pk = parseInt(e.target.name.substring(6, e.target.name.length));
        let obj = {
            pk: pk,
            status: e.target.checked ? 1 : 0
        }
        const { data: response } = await axios.post('/api/changestatus', obj)
    }
    const deleteToto = async (pk) => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            const { data: response } = await axios.delete(`/api/deletetodo/${pk}`)
            toast(response.message);
            if (response.result > 0) {
                getTodoList();
            }
        }
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
            {loading ?
                <>
                    <Loading />
                </>
                :
                <>
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
                                {Object.keys(toDoObj).map((item, idx) => (
                                    <>
                                        <Hash>
                                            <div>#{item}</div>
                                        </Hash>
                                        {toDoObj[item].map((itm, idx) => (
                                            <>
                                                <Content>
                                                    <input type={'checkbox'} name={`check-${itm.pk}`} defaultChecked={itm.status == 1 ? true : false} onChange={onChangeCheck} />
                                                    <div style={{ marginBottom: '4px', cursor: 'pointer' }} onClick={() => { onChangeModalDispplay(itm) }}>{itm.title}</div>
                                                    <MdDelete style={{ marginBottom: '4px', fontSize: '20px', cursor: 'pointer', color: theme.color.background2 }} onClick={() => deleteToto(itm.pk)} />
                                                </Content>
                                            </>
                                        ))}
                                    </>
                                ))}
                            </List>
                            <List>
                                {Object.keys(notToDoObj).map((item, idx) => (
                                    <>
                                        <Hash>
                                            <div>#{item}</div>
                                        </Hash>
                                        {notToDoObj[item].map((itm, idx) => (
                                            <>
                                                <Content>
                                                    <input type={'checkbox'} name={`check-${itm.pk}`} defaultChecked={itm.status == 1 ? true : false} onChange={onChangeCheck} />
                                                    <div style={{ marginBottom: '4px', cursor: 'pointer' }} onClick={() => { onChangeModalDispplay(itm) }}>{itm.title}</div>
                                                    <MdDelete style={{ marginBottom: '4px', fontSize: '20px', cursor: 'pointer', color: theme.color.background2 }} onClick={() => deleteToto(itm.pk)} />

                                                </Content>
                                            </>
                                        ))}
                                    </>
                                ))}
                            </List>
                        </div>
                        <img src={addImg} style={{ width: '32px', margin: '8px auto', cursor: 'pointer' }} onClick={onChangeModalDispplay} />
                    </TodoList>
                </>
            }

            <ModalContainer display={modalDisplay} className="modal-container">
                <ModalContentContainer className="modal-content-container">
                    <ModalContent style={{ margin: '5vh auto 0 auto' }}>
                        <MdCancel style={{ marginLeft: 'auto', fontSize: '28px', color: theme.color.background1, cursor: 'pointer' }} onClick={onChangeModalDispplay} />
                    </ModalContent>
                    <ModalContent style={{ marginTop: '0' }}>
                        <ModalTitle>제목</ModalTitle>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ModalInput style={{ width: '86%' }} className="title" />
                        </div>
                    </ModalContent>
                    <ModalContent>
                        <ModalTitle>카테고리</ModalTitle>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ModalSelect className="category">
                                <option value={0}>To do</option>
                                <option value={1}>Not To do</option>
                            </ModalSelect>
                        </div>
                    </ModalContent>
                    <ModalContent>
                        <ModalTitle>일시</ModalTitle>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ModalDateInput type="date" value={selectedDate} disabled />
                            <ModalDateInput type="time" className="start-time" />
                            <div style={{ width: '2%' }}>~</div>
                            <ModalDateInput type="date" value={selectedDate} disabled />
                            <ModalDateInput type="time" className="end-time" />
                        </div>

                    </ModalContent>
                    <ModalContent>
                        <ModalTitle>태그</ModalTitle>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ModalInput className="tag" placeholder="#빼고 공백없이" />
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
                            <ModalInput className="place" placeholder="도로명주소를 입력해주세요." onKeyPress={(e) => {
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
                                        <div style={{ cursor: 'pointer', padding: '4px', borderRadius: '4px', background: `${item.lat == lat && item.lng == lng ? theme.color.background1 : ''}`, color: `${item.lat == lat && item.lng == lng ? '#fff' : theme.color.font2}` }}
                                            onClick={() => { setPlace(item) }}>
                                            {item.road_address}
                                        </div>
                                    </>
                                ))}
                            </ModalContent>
                        </>
                        :
                        <>
                        </>}


                    <ModalContent>
                        <LogoutButton style={{ borderRadius: '50px', margin: '32px auto' }} onClick={addTodoList}>{isUpdate ? '일정수정' : '일정추가'}</LogoutButton>
                    </ModalContent>
                </ModalContentContainer>
            </ModalContainer>
            <ToastContainer />
        </CalendarWrappers>
    );
};
export default Calendar;