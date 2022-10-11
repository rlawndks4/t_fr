import "../../styles/css/Calendar.css";
import React, { useEffect, useState } from "react";
import { format, addMonths, subMonths } from 'date-fns';
import { GrNext, GrPrevious } from 'react-icons/gr'
import { AuthButton } from "../UserContentTemplete";
import theme from '../../styles/theme'
import beforeImg from '../../assets/before.svg'
import afterImg from '../../assets/after.svg'
const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    
    return (
        <div style={{ width: '200px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px auto', fontSize: '26px', color: theme.color.background1 }}>
            <img src={beforeImg} onClick={prevMonth} style={{ cursor: 'pointer',height:'24px' }}/>
            <AuthButton style={{ cursor: 'text', height: '54px', marginTop: '0', width: '120px', borderRadius: '2px' }}>
                {format(currentMonth, 'yyyy')}-{format(currentMonth, 'M')}
            </AuthButton>
            <img src={afterImg} onClick={nextMonth} style={{ cursor: 'pointer',height:'24px' }}/>
        </div>

    );
};
export default RenderHeader;