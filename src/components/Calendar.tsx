import "../styles/Calendar.css";
import { useCallback, useMemo, useState, useContext } from "react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    differenceInCalendarDays,
    getMonth,
    isSaturday,
    isSunday,
    setYear
} from "date-fns";
import { TodoContext } from "../libs/TodoProvider";

export default function Calendar() {
    const context = useContext(TodoContext);
    if (context === null) {
        throw new Error("YourComponent must be used within a TodoProvider");
    }
    const { setSelectedDate } = context;
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showYearSelect, setShowYearSelect] = useState(false);
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const weekMock = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const nextMonthHandler = useCallback(() => {
        setCurrentDate(addMonths(currentDate, 1));
    }, [currentDate]);

    const prevMonthHandler = useCallback(() => {
        setCurrentDate(subMonths(currentDate, 1));
    }, [currentDate]);

    const handleYearChange = (year: number) => {
        setCurrentDate(setYear(currentDate, year));
        setShowYearSelect(false);
    };

    const yearOptions = useMemo(() => {
        const startYear = 2024;
        return Array.from({length: 21}, (_, i) => startYear + i);
    }, []);

    const createMonth = useMemo(() => {
        const monthArray = [];
        let day = startDate;
        while (differenceInCalendarDays(endDate, day) >= 0) {
            monthArray.push(day);
            day = addDays(day, 1);
        }
        return monthArray;
    }, [startDate, endDate]);

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
    };

    return (
        <section className="Calendar">
            <div className="CalendarIn">
                <div className="CalendarHeader">
                    <button onClick={prevMonthHandler}>&lt;</button>
                    <div className="Year">
                        <span className="changeYear" onClick={() => setShowYearSelect(!showYearSelect)}>
                            {format(currentDate, "yyyy")}
                        </span>
                        {showYearSelect && (
                            <div className="selectBox">
                                <button onClick={() => setShowYearSelect(false)}><p>x</p></button>
                                <div className="selectYear">
                                <ul>
                                    {yearOptions.map((year) => (
                                        <li 
                                            key={year}
                                            className={Number(year) === Number(format(currentDate, "yyyy")) ? "active" : ""}
                                            onClick={() => handleYearChange(Number(year))}
                                        >
                                            {year}
                                        </li>
                                    ))}
                                </ul>
                                </div>
                            </div>
                        )}
                        <span>{format(currentDate, "MMMM")}</span>
                    </div>
                    <button onClick={nextMonthHandler}>&gt;</button>
                </div>
                <div className="DayContainer">
                    {weekMock.map((v, i) => (
                        <div key={`day${i}`} className={i === 0 || i === 6 ? 'weekend' : ''}>
                            {v}
                        </div>
                    ))}
                </div>
                <div className="DateContainer">
                    {createMonth.map((v, i) => {
                        const validation = getMonth(currentDate) === getMonth(v);
                        const today = format(new Date(), "yyyyMMdd") === format(v, "yyyyMMdd");
                        const isWeekend = isSaturday(v) || isSunday(v);
                        return (
                            <div
                                key={`date${i}`}
                                className={`${validation ? "CurrentMonth" : "DiffMonth"} ${isWeekend ? 'weekend' : ''}`}
                                onClick={() => handleDateClick(v)}
                            >
                                <div className="TopLine">
                                    <span className="Day">{format(v, "d")}</span>
                                </div>
                                {today && <div className="Today">Today</div>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
