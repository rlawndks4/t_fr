import "../styles/css/Calendar.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format, addMonths, subMonths } from 'date-fns';
import RenderCells from "../components/calendar/RenderCells";
import RenderDays from "../components/calendar/RenderDays";
import RenderHeader from "../components/calendar/RenderHeader";
import { CalendarWrappers } from "../components/UserContentTemplete";
import styled from "styled-components";
import studyImg from '../assets/study.svg';
import promiseImg from '../assets/promise.svg';
import subjectImg from '../assets/subject.svg';
import notImg from '../assets/not.svg';
import theme from "../styles/theme";
import addImg from '../assets/add.svg'
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
border-radius:2px;
margin-left:4px;
`

const Calendar = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [toDoList, setTodoList] = useState({

    })
    const [notToDoList] = useState({

    })
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
        console.log(year)
        console.log(month)
        console.log(date)
        setSelectedDate(format)

    };
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
                <div style={{ width: '100%', display: 'flex', height: '72px', color: theme.color.font2 }}>
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
                <img src={addImg} style={{ width: '32px', margin: '8px auto', cursor: 'pointer' }} />
            </TodoList>
        </CalendarWrappers>
    );
};
export default Calendar;