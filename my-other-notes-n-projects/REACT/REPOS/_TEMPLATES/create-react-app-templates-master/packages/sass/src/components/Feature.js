import PropTypes from 'prop-types';
import React from 'react';
import ExpansionPanel from 'react-md/lib/ExpansionPanels/ExpansionPanel';

const Feature = props => (
  <ExpansionPanel
    focused={props.focused}
    overflown={props.overflown}
    columnWidths={props.columnWidths}
    label={props.label}
    footer={props.footer}
  >
    <p>{props.description}</p>
  </ExpansionPanel>
);

Feature.propTypes = {
  // Notice these three props. They are injected via the `ExpansionList` component
  // and are required to get correct styling and keyboard accessibility.
  focused: PropTypes.bool,
  overflown: PropTypes.bool,
  columnWidths: PropTypes.arrayOf(PropTypes.number),
  description: PropTypes.string,
  label: PropTypes.string,
};

export default Feature;
