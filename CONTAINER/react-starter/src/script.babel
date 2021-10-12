function transform(offset) {
  const cos = Math.cos(offset);
  const sin = Math.sin(offset);
  return { transform: `matrix3d(${sin}, ${-cos}, ${sin}, 0, ${-cos}, ${sin}, 0, 0, 0, ${cos}, ${cos}, ${sin}, 0, 0, 0, 1)` };
}
 
class App extends React.Component {
  state = {styleOne: {}, styleTwo: {} };
  
  onMouseMove = (event) => {
    this.setState({
      styleOne: transform(-event.clientX / event.clientY),
      styleTwo: transform(event.clientX / event.clientY)
    })
  }
 
  render() {
    return <div onMouseMove={this.onMouseMove}>
      <div className="panel" style={this.state.styleOne} />
      <div className="panel" style={this.state.styleTwo} />      
    </div>    
  } 
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);