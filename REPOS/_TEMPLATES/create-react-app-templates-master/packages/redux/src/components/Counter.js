import PropTypes from 'prop-types';
import React from 'react';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';
import { Card, CardText, CardTitle } from 'react-md/lib/Cards';

import './Counter.css';

const Counter = ({
  count = 0,
  handleChange,
  handleIncrement,
  handleDecrement,
}) => (
  <Card className="Counter-card">
    <CardTitle
      title="Basic Counter"
      subtitle="This example illustrates a standard Redux pattern."
    />
    <CardText className="Counter-card-text">
      <TextField
        id="counterInput"
        value={count}
        onChange={value => handleChange(value)}
        type="number"
      />
      <Button icon primary onClick={() => handleIncrement()}>
        add
      </Button>
      <Button icon secondary onClick={() => handleDecrement()}>
        remove
      </Button>
    </CardText>
  </Card>
);

Counter.propTypes = {
  count: PropTypes.number,
  handleDecrement: PropTypes.func.isRequired,
  handleIncrement: PropTypes.func.isRequired,
};

export default Counter;
