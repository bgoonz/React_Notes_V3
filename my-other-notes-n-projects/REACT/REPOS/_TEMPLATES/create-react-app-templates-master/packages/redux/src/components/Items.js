import PropTypes from 'prop-types';
import React from 'react';
import Button from 'react-md/lib/Buttons';
import { Card, CardText, CardTitle } from 'react-md/lib/Cards';
import { List } from 'react-md/lib/Lists';
import Item from './Item';

const Items = ({ items = [], handleRefresh }) => {
  const renderItems = () => {
    if (!items || !items.length) {
      return null;
    }

    return (
      <List>
        {items.map((item, index) => <Item key={index} text={item.text} />)}
      </List>
    );
  };

  return (
    <Card className="Items-card">
      <CardTitle
        title="Basic Async Example"
        subtitle="This example illustrates an asyncronous Redux pattern."
      />
      <CardText className="Items-card-text">
        <Button icon primary onClick={() => handleRefresh()}>
          refresh
        </Button>
        {renderItems()}
      </CardText>
    </Card>
  );
};

Items.propTypes = {
  items: PropTypes.array,
  handleRefresh: PropTypes.func.isRequired,
};

export default Items;
