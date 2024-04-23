/// <reference types="vite/client" />
declare module 'virtual:fib' {
  export default function fib(n: number): number;
}

declare module 'virtual:env' {
  export default Record<string, string>;
}
