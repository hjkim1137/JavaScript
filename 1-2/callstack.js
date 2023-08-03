//1-2. 호출스택
const x = 'x';

function c() {
  const y = 'y';
  console.log('c');
}

function a() {
  console.log('a');
  function b() {
    console.log('b');
    c();
  }
  b();
}

a(); //a, b, c
c(); //c

// 스택: 명함집/저금통 FILO or LIFO
// 큐: FIFO
