// 应用了 env 插件后，构建时将会被替换成 process.env 对象
import { PATH } from 'env';

console.log(`PATH is ${PATH}`);
