const x = 'x1';
console.log(z);
var y = 'hehe';
const z = () => {};

function c() {
  const y = 'y';
  console.log('c');
  function b() {
    const z = 'z';
    console.log('b');
    c();
  }
}

function a() {
  console.log('a');
  b();
  console.log(x); //TDZ: temperal dead zone (변수의 선언보다 위에서 변수에 접근)
  const x = 'x2';
}

a()
c()

// (참고)eslint 같은 툴 사용하면 선언 전에 접근했는지를 체크해준다.


[호이스팅 연습]
// 위의 코드를 호이스팅하는 방법을 배워보자.
var y // 1.var는 선언부분만 떼어서 위로 올린다.

function c() { //2. 함수들은 다 위로 올려준다.
  const y = 'y';
  console.log('c');
  function b() {
    const z = 'z';
    console.log('b');
    c();
  }
}

function a() {
  console.log('a');
  b();
  console.log(x); //TDZ: temperal dead zone (변수의 선언보다 위에서 변수에 접근)
  const x = 'x2';
}

const x = 'x1'; //3. const는 위치 그대로 둔다.
console.log(z); // 에러발생: z에 대해 TDZ
y = 'hehe'; // 1. 나머지 부분은 그냥 둔다.
const z = () => {};

a()
c()

1. var는 가능하면 쓰지 마라
2. const나 let 위에서 선언 전에 접근하지 마라


[여기서 의문!]
function a() {
  console.log(z) //z1
}
const z = 'z1'
a() 

z위로는 TDZ인데 어떻게 출력이 되는 걸까?
이거는 이전에 배운 선언지도를 생각하면 된다.
a --> anoymous
함수 안에는 없으므로 밖에서 찾아보면 z가 선언되어 있기 때문에 출력됨

function a() {
  console.log(z) // error
}
a()
const z = 'z1'

하지만 순서를 바꿔서 하면 에러이다 : z is not defined
함수 호출하고 난 다음에 선언이 되어서??
--> 다시 확인해보자!