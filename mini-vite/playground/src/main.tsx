import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => <div>hello 12312213123</div>;

ReactDOM.render(<App />, document.getElementById('root'));

// @ts-ignore
import.meta.hot.accept(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
