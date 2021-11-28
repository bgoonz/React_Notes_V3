import React from "react";
import ReactDOM from "react-dom";

if (module.hot) {
  module.hot.accept();
}

const App = () => {
  return <div>Hi there!</div>;
};

ReactDOM.render(<App />, document.querySelector("#root"));
