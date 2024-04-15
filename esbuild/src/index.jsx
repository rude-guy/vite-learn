import Server from 'react-dom/server';

let Greet = () => <h1>Hello, juejin!</h1>;
const code = Server.renderToString(<Greet />);

console.log(code);
