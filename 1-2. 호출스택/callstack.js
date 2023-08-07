[호출과 선언을 반드시 구분해라!]

// c함수 선언
function c() {
  const y = 'y';
  console.log('c');
}

// a 함수 선언
function a() {
  console.log('a');
  function b() {
    console.log('b');
    c(); // c함수 호출
  }
  b(); // b함수 호출
}

a(); // a 함수 호출 /출력: a, b, c 
c(); // c 함수 호출 /출력: c

