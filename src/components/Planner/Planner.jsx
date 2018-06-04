import React from 'react';
import { Input } from 'semantic-ui-react';
import CalendarPicker from './CalendarPicker';
import PlannerRenderer from './PlannerRenderer';

const Planner = () => (
  <React.Fragment>
    <PlannerRenderer />
    <CalendarPicker />
    <Input />
  </React.Fragment>
);

export default Planner;
