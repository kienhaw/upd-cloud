import React from 'react';
import dayjs from 'dayjs';

export const showDuration = (date) => {
    let difdays = dayjs(date).diff(dayjs(), 'day');
    let difmonth = dayjs(date).diff(dayjs(), 'month');
    let difyear = dayjs(date).diff(dayjs(), 'year');
    if (difdays > 365) {
            return <span className='c-success'>Expires in {difyear} year {dayjs(date).diff(dayjs().add(difyear, 'year'), 'day')} days</span>
    } else if (difdays > 30) {
        return <span className='c-success'>Expires in {difmonth} month {dayjs().add(difmonth, 'month').diff(date, 'day')} days</span>
    } else if (difdays > 0) {
        return <span className='c-pending'>Expires in {difdays} days</span>
    } else {
        return <span className='c-error'>Expired</span>
    }
}

export const checkExpiry = (dated) => {
    let daysCalc = dayjs(dated).diff(dayjs(), 'day');
    if (daysCalc < 1) {
        return 0;
    } else if(daysCalc < 16) {
        return daysCalc;
    }
}

export const calculateDays = (date) => {
    const todayDate = dayjs();
    const days = todayDate.diff(date, 'days');
    return days;
  }