import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";

const App = () => {
  return (
    <div>
      <div>Hello world 9 de parameters</div>
      //^react.component <Test hello="bla" count={1} />^
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
