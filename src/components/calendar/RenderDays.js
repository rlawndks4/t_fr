
import "../../styles/css/Calendar.css";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Days = styled.div`
width:13.8%;
text-align:center;
background:${props=>props.theme.color.background4};
border-radius:2px;
margin:auto;
`
const RenderDays = () => {
    const days = [];
    const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <Days key={i}>
                {date[i]}
            </Days>,
        );
    }

    return <div className="days row">{days}</div>;
};
export default RenderDays;