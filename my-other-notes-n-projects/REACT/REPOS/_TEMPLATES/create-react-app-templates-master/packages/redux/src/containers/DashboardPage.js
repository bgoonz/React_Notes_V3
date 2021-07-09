import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Counter from '../components/Counter';
import Items from '../components/Items';
import { increment, decrement, update } from '../store/count/action';
import { load } from '../store/items/action';

class DashboardPage extends Component {
  render() {
    return (
      <div className="DashboardPage">
        <Counter
          count={this.props.count}
          handleChange={value => this.props.dispatch(update(value))}
          handleIncrement={() => this.props.dispatch(increment())}
          handleDecrement={() => this.props.dispatch(decrement())}
        />
        <Items
          items={this.props.items}
          handleRefresh={() => this.props.dispatch(load())}
        />
      </div>
    );
  }
}

DashboardPage.propTypes = {
  count: PropTypes.number,
  dispatch: PropTypes.func,
  items: PropTypes.array,
};

const mapStateToProps = state => ({
  count: state.count,
  items: state.items.list,
});

export default connect(mapStateToProps)(DashboardPage);
