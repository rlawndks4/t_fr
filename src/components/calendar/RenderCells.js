import "../../styles/css/Calendar.css";
import React, { useEffect, useState } from "react";
import { format, addMonths, subMonths, getYear, getDate, getDay, getMonth, add, differenceInDays, subDays } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import styled from "styled-components";
import theme from "../../styles/theme";
import { holyDays } from "../../data/Data";
import axios from "axios";
import {AiFillHeart} from 'react-icons/ai';
import {MdOutlineDoNotDisturb} from 'react-icons/md'
const Card = styled.div`
width:7.7vw;
padding:0.3vw;
margin-left:auto;
height:10vh;
margin-bottom:2px;
border-radius:4px;
display:flex;
flex-direction:column;
@media screen and (max-width: 1000px) {
    height:10vw;
    width:13%;
}
`
const RenderCells = (props) => {
    let { currentMonth, selectedDate, onDateClick, is_monday } = props;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const [rows, setRows] = useState([]);
    useEffect(() => {
        async function fetchPost() {
            let list = [];
            let day = startDate;
            if(getDay(monthStart)==0){
                day = subDays(day,7)
            }
            format(day, 'yyyy-MM-dd');
            if (is_monday) {
                day = addDays(day, 1);
            }
            for (var i = 0; i < 100; i++) {
                let obj = {};
                obj.day = day;
                obj.year = getYear(day);//년
                obj.month = getMonth(day);//월
                obj.date = getDate(day);//일
                obj.weeks_of_day = getDay(day);//요일
                obj.format = format(day, 'yyyy-MM-dd');
                list.push(obj);
                day = addDays(day, 1);
                if (is_monday) {
                    if (differenceInDays(day, endDate) > 1) {
                        break;
                    }
                }else{
                    if (differenceInDays(day, endDate) > 0) {
                        break;
                    }
                }
                
            }
            list.pop();
            console.log(list)
            
            let auth = JSON.parse(localStorage.getItem('auth'));
            const {data:response} = await axios.post('/api/gettodocountbycanlendar',{
                arr:list.map((item)=>item.format),
                user_pk:auth.pk
            })
            for(var i = 0;i<list.length;i++){
                list[i].count = response.data[i];
            }
            setRows(list);

        }
        fetchPost();
    }, [currentMonth])
    const returnColor = () => {

    }
    const isHolyDay = (month, day) =>{
        for(var i =0;i<holyDays.length;i++){
            if(holyDays[i].month==parseInt(month)&&holyDays[i].day==parseInt(day)){
                break;
            }
        }
        if(holyDays.length==i){
            return false;
        }else{
            return true;
        }
    }
    return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between' }}>
                {rows && rows.map((item, idx) => (
                    <>
                        <Card style={{
                            color: `${getDay(item.day)==0 || getDay(item.day)==6 || isHolyDay(item.month+1,item.date) ?(getDay(item.day)==0||isHolyDay(item.month+1,item.date)?'#ff0000':'#0081cc'):(item.month == getMonth(currentMonth) ? '#000000' : '#cccccc')}${item.month == getMonth(currentMonth)?'ff':'99'}`, cursor: `${item.month == getMonth(currentMonth) ? 'pointer' : ''}`,
                            background: `${`${item.format}` == selectedDate ? theme.color.background4 : '#fff'}`
                        }} onClick={() => {
                            if (item.month == getMonth(currentMonth)) {
                                onDateClick(item.year, item.month, item.date, item.format)
                            }
                        }}>
                        <div>{item.date}</div>
                        {window.innerWidth>=650?
                        <>
                        <div style={{marginTop:'auto',color:`#000000${item.month == getMonth(currentMonth)?'ff':'99'}`}}>
                        <div style={{display:'flex',alignItems:'center'}}><AiFillHeart/><div style={{margin:'0 0 4px 4px'}}>{item.count.todo}</div></div>
                        <div style={{display:'flex',alignItems:'center'}}><MdOutlineDoNotDisturb/><div style={{margin:'0 0 4px 4px'}}>{item.count.not_todo}</div></div>
                        </div>
                        </>
                        :
                        <>
                        {item.count.todo>0 || item.count.not_todo>0?
                        <>
                        <div style={{marginTop:'auto',color:`#000000${item.month == getMonth(currentMonth)?'ff':'99'}`}}>●</div>
                        </>
                        :
                        <>
                        </>
                        }
                        </>}
                        
                        </Card>
                    </>
                ))}
            </div>
        </>
    )
};
export default RenderCells;