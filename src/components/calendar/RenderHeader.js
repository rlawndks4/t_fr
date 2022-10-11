
import "../../styles/css/Calendar.css";
import React, { useEffect, useState } from "react";
import { format, addMonths, subMonths } from 'date-fns';
import { GrNext, GrPrevious } from 'react-icons/gr'
import { AuthButton } from "../UserContentTemplete";
import theme from '../../styles/theme'
const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    
    return (
        <div style={{ width: '200px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px auto', fontSize: '26px', color: theme.color.background1 }}>
            <GrPrevious onClick={prevMonth} style={{ cursor: 'pointer', color: theme.color.background1 }} />
            <AuthButton style={{ cursor: 'text', height: '54px', marginTop: '0', width: '120px', borderRadius: '2px' }}>
                {format(currentMonth, 'yyyy')}-{format(currentMonth, 'M')}
            </AuthButton>
            <GrNext onClick={nextMonth} style={{ cursor: 'pointer', color: theme.color.background1 }} />
        </div>

    );
};
export default RenderHeader;