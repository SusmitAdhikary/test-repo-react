
function Welcome(props) {
  return <h1>Hello {props.name}</h1>;
}
function App() {
  return (
    <div>
      <Welcome name="Harry" />
      <Welcome name="Jerry" />
      <Welcome name="Jini" />
    </div>
  );
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);