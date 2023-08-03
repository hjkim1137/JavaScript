// 1-1. 함수와 함수의 호출의 차이, 고차함수

const add = (a, b) => a + b; //(ㅇ)
// const add = (a, b) => ({a+b}); //(o) 또는 이렇게도 쓸 수 있다. 객체를 리턴할 때는 감싸줘야 함
// const add = (a, b) => {a+b}; //(x) 자바스크립트 엔진이 함수의 body라고 오해할 수 있음

function calculator(func, a, b) {
  return func(a, b);
}

add(3, 5); //8
calculator(add, 3, 5); // return add(3,5) // 8

document.querySelector('#header').addEventListener('click', add); // o
document.querySelector('#header').addEventListener('click', add()); // x 이건 함수가 아니고 함수의 리턴값임
// 안 헷갈리려면 함수의 호출을 return 값으로 대체해서 확인해보기
// add안에 아무것도 없으니까 return 값은 undefined + undefined

// 예외경우
document.querySelector('#header').addEventListener('click', onClick());
// 아래 2개는 같은 함수임

const onClick = () => {
  return () => {
    console.log('hello');
  };
};

const onClick = () => () => {
  console.log('hello');
};

// return 값으로 대체해보면... 이는 올바른 코드가 된다
document.querySelector('#header').addEventListener('click', () => {
  console.log('hello');
});
