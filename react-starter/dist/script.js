function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function transform(offset) {
  const cos = Math.cos(offset);
  const sin = Math.sin(offset);
  return { transform: `matrix3d(${sin}, ${-cos}, ${sin}, 0, ${-cos}, ${sin}, 0, 0, 0, ${cos}, ${cos}, ${sin}, 0, 0, 0, 1)` };
}

class App extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    { styleOne: {}, styleTwo: {} });_defineProperty(this, "onMouseMove",

    event => {
      this.setState({
        styleOne: transform(-event.clientX / event.clientY),
        styleTwo: transform(event.clientX / event.clientY) });

    });}

  render() {
    return /*#__PURE__*/React.createElement("div", { onMouseMove: this.onMouseMove }, /*#__PURE__*/
    React.createElement("div", { className: "panel", style: this.state.styleOne }), /*#__PURE__*/
    React.createElement("div", { className: "panel", style: this.state.styleTwo }));

  }}


ReactDOM.render( /*#__PURE__*/
React.createElement(App, null),
document.querySelector('#root'));