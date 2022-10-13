import "../../styles/css/Calendar.css";
import React, { useEffect, useState } from "react";
import { format, addMonths, subMonths, getYear, getDate, getDay, getMonth, add, differenceInDays } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import styled from "styled-components";
import theme from "../../styles/theme";

const Card = styled.div`
width:7.7vw;
padding:0.3vw;
margin-left:auto;
height:10vh;
margin-bottom:2px;
border-radius:4px;
@media screen and (max-width: 1000px) {
    height:10vw;
    width:13%;
}
`
const RenderCells = (props) => {
    let { currentMonth, selectedDate, onDateClick } = props;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const [rows, setRows] = useState([]);
    useEffect(() => {
        console.log(endDate)
        console.log(format(endDate, 'yyMMdd'))
        let list = [];
        let day = startDate;
        format(day, 'yyyy-MM-dd');
        for (var i = 0; i < 100; i++) {
            let obj = {};
            obj.year = getYear(day);//년
            obj.month = getMonth(day);//월
            obj.date = getDate(day);//일
            obj.weeks_of_day = getDay(day);//요일
            obj.format = format(day, 'yyyy-MM-dd');
            list.push(obj);
            day = addDays(day, 1)
            if (differenceInDays(day, endDate) > 0) {
                break;
            }
        }
        list.pop();
        console.log(list)
        setRows(list);
    }, [currentMonth])
    const returnColor = () => {

    }
    return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between' }}>
                {rows && rows.map((item, idx) => (
                    <>
                        <Card style={{
                            color: `${item.month == getMonth(currentMonth) ? '#000' : '#ccc'}`, cursor: `${item.month == getMonth(currentMonth) ? 'pointer' : ''}`,
                            background: `${`${item.format}` == selectedDate ? theme.color.background4 : '#fff'}`
                        }} onClick={() => {
                            if (item.month == getMonth(currentMonth)) {
                                onDateClick(item.year, item.month, item.date, item.format)
                            }
                        }}>{item.date}</Card>
                    </>
                ))}
            </div>
        </>
    )
};
export default RenderCells;