import { useEffect, useState } from "react";
import styled from "styled-components";
import { AuthButton, CalendarWrappers } from "../components/UserContentTemplete";
import beforeImg from '../assets/before.svg'
import afterImg from '../assets/after.svg'
import calendarImg from '../assets/calendar.svg'
import theme from "../styles/theme";
import { format, addMonths, subMonths, getYear, getDate, getDay, getMonth, add, differenceInDays } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import axios from "axios";
const Wrappers = styled.div`
width:90%;
background:${props => props.theme.color.background4};
margin:16px auto;
display:flex;
flex-direction:column;
border-radius:8px;
@media screen and (max-width: 800px) {

}
`
const ContentWrapper = styled.div`
display: flex;
width:90%;
justify-content:space-around;
margin:0 auto;
@media screen and (max-width: 800px) {
flex-direction:column;
}
`
const ContentSubWrapper = styled.div`
display: flex;
flex-direction: column;
width:45%;
@media screen and (max-width: 800px) {
    width:100%;
}
`
const ChartContainerTitle = styled.div`
width:100%;
margin: 0 auto;
text-align:center;
font-weight: 600;
font-size: 24px;
color:${props => props.theme.color.font2};
`
const ChartContainer = styled.div`
width:100%;
margin: 12px auto 64px auto;
padding:42px 0;
background:#fff;
border-radius:8px;
display:flex;
flex-direction:column;
font-size:14px;
`
const Chart = () => {
    const [typeNum, setTypeNum] = useState(0);
    const type_list = ["Monthly", "Weekley", "Today"];
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(currentMonth);
    const endDate = endOfWeek(currentMonth);

    const [toDoObj, setToDoObj] = useState({});
    const [notToDoObj, setNotToDoObj] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true)
            let auth = JSON.parse(localStorage.getItem('auth'))
            let result = [];
            if (typeNum == 0) {
                let current_day = monthStart;
                for (var i = 0; i < 50; i++) {
                    result.push(format(current_day, 'yyyy-MM-dd'));
                    current_day = addDays(current_day, 1);
                    if (current_day > monthEnd) {
                        break;
                    }
                }
            } else if (typeNum == 1) {
                let current_day = startDate;
                for (var i = 0; i < 50; i++) {
                    result.push(format(current_day, 'yyyy-MM-dd'));
                    current_day = addDays(current_day, 1);
                    if (current_day > endDate) {
                        break;
                    }
                }
            } else if (typeNum == 2) {
                let current_day = currentMonth;
                result.push(format(current_day, 'yyyy-MM-dd'))
            } else {
                return;
            }
            const { data: response } = await axios.post('/api/gettodoliststatistics', {
                list: result,
                user_pk: auth?.pk ?? 0
            })
            console.log(response)
            let to_do_obj = {};
            let not_to_do_obj = {};
            let list = response.data ?? [];
            for (var i = 0; i < list.length; i++) {
                if (list[i].category == 0) {//todo
                    if (!to_do_obj[list[i].tag]) {
                        to_do_obj[list[i].tag] = {};
                        to_do_obj[list[i].tag].total_count = 1;
                        if (list[i].status == 1) {
                            to_do_obj[list[i].tag].success_count = 1;
                        } else {
                            to_do_obj[list[i].tag].success_count = 0;
                        }
                    } else {
                        to_do_obj[list[i].tag].total_count += 1;
                        if (list[i].status == 1) {
                            to_do_obj[list[i].tag].success_count += 1;
                        }
                    }

                } else {//nottodo
                    if (!not_to_do_obj[list[i].tag]) {
                        not_to_do_obj[list[i].tag] = {};
                        not_to_do_obj[list[i].tag].total_count = 1;
                        if (list[i].status == 1) {
                            not_to_do_obj[list[i].tag].success_count = 1;
                        } else {
                            not_to_do_obj[list[i].tag].success_count = 0;
                        }
                    } else {
                        not_to_do_obj[list[i].tag].total_count += 1;
                        if (list[i].status == 1) {
                            not_to_do_obj[list[i].tag].success_count += 1;
                        }
                    }
                }
            }
            setToDoObj(to_do_obj);
            setNotToDoObj(not_to_do_obj);
            setTimeout(() => setLoading(false), 1000);
        }
        fetchPosts();
    }, [typeNum])
    return (
        <>
            <CalendarWrappers>

                <Wrappers>
                    <div style={{ width: '200px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px auto', fontSize: '26px', color: theme.color.background1 }}>
                        <img src={beforeImg} onClick={() => { typeNum != 0 ? setTypeNum(typeNum - 1) : setTypeNum(typeNum) }} style={{ cursor: 'pointer', height: '24px' }} />
                        <AuthButton style={{ cursor: 'text', height: '42px', marginTop: '0', width: '120px', borderRadius: '8px', background: '#fff', color: theme.color.font2, display: 'flex', fontSize: '18px', alignItems: 'center', justifyContent: "space-around" }}>
                            <img src={calendarImg} style={{ width: '24px' }} />
                            {type_list[typeNum]}

                        </AuthButton>
                        <img src={afterImg} onClick={() => { typeNum != 2 ? setTypeNum(typeNum + 1) : setTypeNum(typeNum) }} style={{ cursor: 'pointer', height: '24px' }} />
                    </div>
                    <ContentWrapper>
                        <ContentSubWrapper>
                            <ChartContainerTitle>To-Do 달성률(%)</ChartContainerTitle>
                            <ChartContainer>
                                <div style={{ width: '90%', margin: '2px auto', display: 'flex' }}>
                                    <div style={{ width: '22%', textAlign: 'right', minWidth: '66px' }}>0</div>
                                    <div style={{ width: '19.5%', textAlign: 'right' }}>25</div>
                                    <div style={{ width: '19.5%', textAlign: 'right' }}>50</div>
                                    <div style={{ width: '19.5%', textAlign: 'right' }}>75</div>
                                    <div style={{ width: '19.5%', textAlign: 'right' }}>100</div>
                                </div>
                                {Object.keys(toDoObj).map((item, idx) => (
                                    <>
                                        <div style={{ width: '90%', margin: '2px auto', display: 'flex' }}>
                                            <div style={{ width: '20%', textAlign: 'left', minWidth: '56px' }}>#{item}</div>
                                            <div style={{ width: `${toDoObj[item].success_count / toDoObj[item].total_count * 80}%`, height: '20px', background: theme.color.background1 }}></div>
                                        </div>
                                    </>
                                ))}
                            </ChartContainer>

                        </ContentSubWrapper>
                        <ContentSubWrapper>
                            <ChartContainerTitle>Not-To-Do 달성률(%)</ChartContainerTitle>
                            <ChartContainer>
                                <div style={{ width: '90%', margin: '2px auto', display: 'flex' }}>
                                    <div style={{ width: '22%', textAlign: 'right', minWidth: '66px' }}>0</div>
                                    <div style={{ width: '19.5%', textAlign: 'right' }}>25</div>
                                    <div style={{ width: '19.5%', textAlign: 'right' }}>50</div>
                                    <div style={{ width: '19.5%', textAlign: 'right' }}>75</div>
                                    <div style={{ width: '19.5%', textAlign: 'right' }}>100</div>
                                </div>
                                {Object.keys(notToDoObj).map((item, idx) => (
                                    <>
                                        <div style={{ width: '90%', margin: '2px auto', display: 'flex' }}>
                                            <div style={{ width: '20%', textAlign: 'left', minWidth: '56px' }}>#{item}</div>
                                            <div style={{ width: `${notToDoObj[item].success_count / notToDoObj[item].total_count * 80}%`, height: '20px', background: theme.color.background1 }}></div>
                                        </div>
                                    </>
                                ))}
                            </ChartContainer>
                        </ContentSubWrapper>
                    </ContentWrapper>

                </Wrappers>
            </CalendarWrappers>
        </>
    )
}
export default Chart;