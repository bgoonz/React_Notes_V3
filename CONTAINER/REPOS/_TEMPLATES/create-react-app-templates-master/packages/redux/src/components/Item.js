import PropTypes from 'prop-types';
import React from 'react';
import { ListItem } from 'react-md/lib/Lists';

const Item = props => <ListItem primaryText={props.text} />;

Item.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Item;
