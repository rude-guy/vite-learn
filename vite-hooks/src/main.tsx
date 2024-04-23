import fib from 'virtual:fib';
import env from 'virtual:env';
// 当作组件中使用
import Logo from './logo.svg';
// 当作URL使用
// import logoUrl, { ReactComponent as Logo } from './logo.svg';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      <Logo />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

console.log(`结果: ${fib(10)}`);
console.log(env);
