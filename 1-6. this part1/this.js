console.log(this); // window {0:global...} -> this는 기본적으로 window다.

// this가 window가 아니라 다른것으로 바뀌는 때
const obj = {
  name: 'zerocho',
  sayName() {
    console.log(this.name);
  },
};

obj.sayName(); //zerocho
window.name; // ''

// 이와 같이, 이 때는 this가 window가 아니다. obj를 가리킴
const sayN = obj.sayName;
sayN(); // 결과 없음

///////////////////////////////////////////////
//고전 문법 ((참고)완벽하게 똑같은 것은 아님, 속성은 다름)
const obj = {
  name: 'zerocho',
  sayName: function() {
    console.log(this.name);
  },
};
///////////////////////////////////////////////


// 배운점 (this가 바뀌는 상황들)
0. this는 strict 모드에서는 undefined 된다

1. this는 함수가 "호출"될 때 정해진다. this는 함수가 "호출"될 때 정해진다. this는 함수가 "호출"될 때 정해진다. this는 함수가 "호출"될 때 정해진다. this는 함수가 "호출"될 때 정해진다. 
따라서 호출스택 분석할 때 this를 같이 옆에 그리자
기본적으로는 window이나 함수 앞에 객체가 붙으면(예: obj.sayName()) this가 그 객체가 된다.

2. 화살표함수와 this는 떼레야 뗄 수 없는 관계이다. (화살표 함수는 부모함수의 this를 가져온다)
    const obj = {
      name: 'zerocho',
      sayName:() => {
        console.log(this.name);
      },
    };
    obj.sayName(); // 결과 안뜸 : window.name
    window.name; // ''


    // 면접에서 많이 묻는 예제
    const obj = {
      name: 'zerocho',
      sayName() {
        console.log(this.name)
        function inner() {
          console.log(this.name)
        }
        inner()
      }
    }
    // 스코프 체인: inner -> sayName --> anonymous
    
    obj.sayName() //zerocho (obj가 붙었고 화살표 함수가 아니니까 this가 obj가 된다.)
    // 결과 안뜸: window.name --> (inner() 호출할 때 this 바꿔주는 행동 안했기 때문에 window.name)

    // 위 예제가 화살표 함수가 된다면?
    const obj = {
      name: 'zerocho',
      sayName() {
        console.log(this.name) //zerocho <-- this는 호출될 때 판단해야한다. 따라서 그 전까지는 모른다. 찍어봐야 앎.
        const inner () => {
          console.log(this.name) //zerocho
        }
        inner()
      }
    }
    obj.sayName()


3. new 생성자 함수를 사용할 경우 this는 객체 자기 자신이 된다.
    function Human(name) {
      this.name = name;
    }
    new Human ('zerocho') //Human {name: 'zerocho'}

4. this를 바꿔주는 bind, apply, call 
    function sayName() {
      console.log(this.name)
    }
    sayName() // 결과 안뜸 : window.name

    sayName.bind({name: 'zerocho'})() // zerocho --> this를 바꿔주는 bind 함수 (this만 바꿔줌. 호출 따로 해야 함)
    sayName.apply({name: 'zerocho'}) // zerocho --> this를 바꿔주는 apply (호출까지 해줌)
    sayName.call({name: 'zerocho'}) // zerocho --> this를 바꿔주는 call (호출까지 해줌)

    // a.apply(window) === a.bind(window)() === a.call(window)

// call 스택 분석하기
    const obj = {
      name: 'zerocho',
      sayName() {
        console.log(this.name);
        const inner() => {
          console.log(this.name)
        }
        inner()
      },
    };
    obj.sayName(); //zerocho

    [1단계]
    |             |
    |             |
    |             |
    |__anonymous__| this -> window

    [2단계]
    |             |
    |             |
    | obj.sayName | this -> object
    |__anonymous__| this -> window

    [3단계]
    |             |
    |    log      | // zerocho
    | obj.sayName | this -> object
    |__anonymous__| this -> window

    [4단계]
    |             |
    |             | -> log 호출 스택에서 빠져나감
    | obj.sayName | this -> object
    |__anonymous__| this -> window

    [5단계]
    |    inner    | // this -> object, 즉 zerocho(화살표 함수이므로 부모를 가져옴)
    |             | 
    | obj.sayName | this -> object
    |__anonymous__| this -> window

    [6단계]
    |     log     | // zerocho
    |    inner    | // this -> object, 즉 zerocho(화살표 함수이므로 부모를 가져옴)
    |             | 
    | obj.sayName | this -> object
    |__anonymous__| this -> window


// 만약 inner가 function이면 어떻게 달라질까?
const obj = {
    name: 'zerocho',
    sayName() {
      console.log(this.name);
      function inner() {
        console.log(this.name)
      }
      inner()
    },
  };
  obj.sayName(); //zerocho

  [1단계]
  |             |
  |             |
  |             |
  |__anonymous__| this -> window

  [2단계]
  |             |
  |             |
  | obj.sayName | this -> object
  |__anonymous__| this -> window

  [3단계]
  |             |
  |    log      | // zerocho
  | obj.sayName | this -> object
  |__anonymous__| this -> window

  [4단계]
  |             |
  |             | -> log 호출 스택에서 빠져나감
  | obj.sayName | this -> object
  |__anonymous__| this -> window

  [5단계]
  |    inner    | // this -> window(화살표 함수 아니므로)
  |             | 
  | obj.sayName | this -> object
  |__anonymous__| this -> window

  [6단계]
  |     log     | // zerocho
  |    inner    | // this -> window(화살표 함수 아니므로)
  |             | 
  | obj.sayName | this -> object
  |__anonymous__| this -> window