export const PRINT_HELLO = 'printhello';

export const printHelloWorld=(val)=>{
  console.log('Hello World Action...');
  return {type : PRINT_HELLO, payload:{message: 'Hello World...' + val}};
}