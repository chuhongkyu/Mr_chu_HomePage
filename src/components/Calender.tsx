import {useEffect, useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays} from 'date-fns';
import styled from 'styled-components';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { motion } from 'framer-motion';

const Wrapper = styled(motion.div)`
    width: 350px;
    height: 400px;
    background-color: rgba(34,34,34, 0.9);
    color: ${(props) => props.theme.white.lighter};
    position: absolute;
    bottom: 41px;
    right: 0;
    @media ${(props) => props.theme.device.mobile} {
        width: 300px;
        height: 350px;
    }
`

const Header = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    padding: 20px;
    border-bottom: 1px solid rgba(255,255,255, 0.2);
    .date-group{
        display: flex; 
        justify-content: center; 
        align-items:center; 
        gap: 10px;
        font-size: 18px;
        span{display: flex; 
        justify-content: center; 
        align-items:center; }
        p{margin-left: 3px;}
    }
    .btn-group{
        display: flex;
        justify-content: flex-start;
        align-items:center;
        gap: 20px;
    }
    @media ${(props) => props.theme.device.mobile} {
        .date-group{font-size: 15px;}
    }
`

const Days = styled.div`
    width: 100%;
    height: 40px;
    display: grid;
    grid-template-columns: repeat(7,1fr);
    margin: 10px 0;
    font-weight: 600;
    .day{
        grid-column: span 1;
        font-size: 15px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    @media ${(props) => props.theme.device.mobile} {
        .day{font-size: 12px;}
    }
`

const Body = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 50px);
`

const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    .col{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 2px;
        cursor: pointer;
    }
    .disabled{
        opacity: 0.4;
    }
    .selected{
        background-color: rgb(46,142,214);
        border: 1px solid rgba(255,255,255, 0.2);
    }
`

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }:any) => {
    return (
        <Header>
            <div className="date-group">
                <span>{format(currentMonth, 'yyyy')}<p>년</p></span>
                <span>{format(currentMonth, 'M')}<p>월</p></span>
                <span>{format(currentMonth, 'd')}<p>일</p></span>        
            </div>
            <div className="btn-group">
                <AiOutlineArrowLeft onClick={prevMonth}>이전</AiOutlineArrowLeft>
                <AiOutlineArrowRight onClick={nextMonth}>이후</AiOutlineArrowRight>
            </div>
        </Header>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ['일', '월', '화', '수', '목', '금', '토'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="day" key={i}>
                <p>{date[i]}</p>
            </div>,
        );
    }

    return <Days>{days}</Days>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }:any) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                            ? 'selected'
                            : format(currentMonth, 'M') !== format(day, 'M')
                            ? 'not-valid'
                            : 'valid'
                    }`}
                    key={i}
                    onClick={() => onDateClick(cloneDay)}
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
                </div>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <Row key={day+ ""}>
                {days}
            </Row>,
        );
        days = [];
    }
    return <Body>{rows}</Body>;
};

const Calender = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(()=>{
        console.log(currentMonth)
    },[])

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick:any = (day:any) => {
        setSelectedDate(day);
    };
    return (
        <Wrapper animate={{y: [100, 0], opacity:[0, 1], transition:{duration: 0.5}}}>
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
        </Wrapper>
    );
};

export default Calender;