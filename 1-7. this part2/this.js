// this를 분석할 수 없는 케이스

header.addEventListener('click', function () {
  console.log(this); // <h3 class="blabla">공지사항</h3>
});

// 왜 this가 window 가 아닐까? -> this는 함수가 호출 될 때 결정되니까
// function이 호출된 것이 아니라 addEventListner가 호출 되었다
// function 함수는 호출하는 부분이 안 보이니까(우리가 보이지 않는 부분에서) 분석이 어려워 그냥 외어야 한다..
// 경험적으로 이렇게 나오는 것을 그냥 외어야 한다.
// 결론: 공식문서 보기 전까지는 알 수 없다. 그러나 경험적으로 addEventLister 앞에 붙은 것이 this가 된다.

header.addEventListener('click', () => {
  console.log(this); // window
});

// 선언() => {} 에 대한 부모는 addEventListener가 아니다!
// addEventListener는 호출이니까
// 선언의 부모는 안보이니까 anonymous -> window
