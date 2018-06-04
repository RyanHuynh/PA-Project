import React, { Component } from 'react';

export const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
];

export const DAYS_SHORT = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
];

export const DAYS_LONG = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];


const numberOfCols = 7;
const currentSelectedDate = new Date();
class PlannerRenderer extends Component {
  constructor() {
    super();
  }
  getActiveDays = (seletedDate, num) => {
    const days = [];
    days.push(seletedDate);
    for (let i = 0; i < num; i += 1) {
      const nextDate = new Date();
      nextDate.setDate(days[i].getDate() + 1);
      days.push(nextDate);
    }
    return days;
  }
  renderHeader() {
    return this.getActiveDays(currentSelectedDate, numberOfCols).map(d => (
      `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${DAYS_SHORT[d.getDay()]}`));
  }
  render() {
    return (
      <div>
        {this.renderHeader()}
      </div>
    );
  }
}

export default PlannerRenderer;
