import { useEffect, useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays} from 'date-fns';
import { motion } from "motion/react";

interface IHeader {
    currentMonth: Date;
    prevMonth: () => void;
    nextMonth: () => void;
}

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }:IHeader) => {
    return (
        <div className={"header"}>
            <div className={"date-group"}>
                <span>{format(currentMonth, 'yyyy')}<p>년</p></span>
                <span>{format(currentMonth, 'M')}<p>월</p></span>
                <span>{format(currentMonth, 'd')}<p>일</p></span>        
            </div>
            <div className={"btn-group"}>
                <span onClick={prevMonth}>
                    <img src="/assets/icons/navbtn.svg" alt="left"/>
                </span>
                <span className={"right"} onClick={nextMonth}>
                    <img src="/assets/icons/navbtn.svg" alt="right"/>
                </span>
            </div>
        </div>
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

    return <div className={"days"}>{days}</div>;
};

interface RenderCellsProps {
    currentMonth: Date;
    selectedDate: Date;
    onDateClick: (date: Date) => void;
}

const RenderCells = ({ currentMonth, selectedDate, onDateClick }:RenderCellsProps) => {
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
            <div 
                key={day+ ""}
                className={"rows"}
            >
                {days}
            </div>,
        );
        days = [];
    }
    return <div className={"body"}>{rows}</div>;
};

const Calender = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(()=>{
        // console.log(currentMonth)
    },[])

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day:Date) => {
        setSelectedDate(day);
    };
    return (
        <motion.div 
            className={"calendar"} 
            animate={{y: [100, 0], opacity:[0, 1], transition:{duration: 0.5}}}>
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
        </motion.div>
    );
};

export default Calender;