
import "../../styles/css/Calendar.css";
import React, { useEffect, useState } from "react";
import { RiArrowLeftCircleFill } from 'react-icons/ri';
import { RiArrowRightCircleFill } from 'react-icons/ri';
import { AiFillSetting } from 'react-icons/ai';
import { format, addMonths, subMonths } from 'date-fns';

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    function handleClick(e) {
        window.location.href = "/setting"
    }
    return (
        <div className="header row">
            <div className="col col-start">
                <span className="text">
                    <span className="text month">
                        {format(currentMonth, 'M')}월
                    </span>
                    {format(currentMonth, 'yyyy')}
                </span>
            </div>
            <div className="col col-end">
                <RiArrowLeftCircleFill onClick={prevMonth} />
                <RiArrowRightCircleFill onClick={nextMonth} />
                <AiFillSetting onClick={handleClick} />
            </div>
        </div>
    );
};
export default RenderHeader;