// 스코프 체인: 함수에서 어떤 값에 접근이 가능하고 불가한 지 범위
// 라이브러리나 내장함수는 아래와 같이 생각하면 된다
const console = {
  log() {
    // 콘솔에 글자 적는 기능
  },
};

const x = 'hello';

function c() {
  const y = 'y';
  console.log('c');
  function b() {
    // 2. 여기 b 선언 실행 부분으로 바로 갈 수 있는 것이 아니다. (uncaught referenceError: b is not defined 발생) 안 되는 경우는 스코프 분석해야 한다. 
    const z = 'z';
    console.log('b');
    c();
  }
}

function a() {
  const x = 'bye'; // 스코프가 다르기 때문에 문제가 안됨
  console.log('a');
  console.log(x)
  b(); // 1. 앞의 호출스택에서 배운 것처럼 b() 호출하면, 
}

a();
c();

스코프 판단하는 방법 - 함수의 '선언'을 기준으로 보자 (에디터 접어서 확인)
  function c() {}
    function b() {}
  function a() {}

[lexical scope]
  c --> anonymous (anonymous는 전체 코드에 대한 함수라고 생각하면 된다, 화살표는 포함하고 있는 더 큰 함수를 뜻함. anonymous함수 안에 함수 c가 있다)
  a --> anonymous 
  b --> c --> anonymous (함수 b는 함수 c에 포함되고, 함수 c는 anonymous에 포함)
  
  [선언을 기준으로 확인]
  # a 함수안에서 b 접근 불가 (최상위 함수만 남기고 접어서 확인) 위의 레퍼런스 에러: b is not defined
  # b 함수에서 a 접근 가능
    1. b함수 안에서 a 선언 없음 
    2. 그 다음 부모인 c 안에서 a 선언 없음
    3. 그 다음 부모인 anonymous 안에 a 선언 있음

[헷갈릴 때는 선언지도를 그려보자]
  anonymous <-- x, c, a
  c <-- y, b
  b <-- z
  a <-- x (1. console.log(x)하면 따라서 bye가 출력된다. a함수에서 x에 접근할 수 있기 떄문.)

  a --> anonymous(2. 만약 a 함수안에서 x를 못 찾으면, a의 부모인 anonymous안에서 찾고 그 결과 hello 출력된다.)
  똑같은 변수가 있으면 먼저 찾는 것이 우선으로 찾아진다.