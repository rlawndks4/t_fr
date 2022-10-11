import "../../styles/css/Calendar.css";
import React, { useEffect, useState } from "react";
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import styled from "styled-components";

const Card = styled.div`

`
const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const [rows, setRows] = useState([]);
    let days = [];
    let day = startDate;
    let formattedDate = '';
    useEffect(()=>{
        console.log(monthStart)
        console.log(monthEnd)
        console.log(startDate)
        console.log(endDate)
    },[])
    const getDay = () =>{

    }
    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            let cloneDay = day;
            days.push(
                <Card
                    className={`col cell ${!isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                                ? 'selected'
                                : format(currentMonth, 'M') !== format(day, 'M')
                                    ? 'not-valid'
                                    : 'valid'
                        }`}
                    key={day}
                    onClick={() => onDateClick(parse(cloneDay))}
                >
                    <span
                        className={
                            format(currentMonth, 'M') !== format(day, 'M')
                                ? 'text not-valid'
                                : ''
                        }
                    >
                        {formattedDate}
                    </span>
                </Card>,
            );
            day = addDays(day, 1);
        }
        let list = [...rows];
        list.push(
            <div className="row" key={day}>
                {days}
            </div>,
        );
        setRows(list);
        days = [];
    }
    return <div className="body">{rows}</div>;
};
export default RenderCells;