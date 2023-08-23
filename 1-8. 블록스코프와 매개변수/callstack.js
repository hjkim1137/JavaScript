const x = true;
const y= false

function a() {
  let a = 4
  if(x) {
    let a =3
    for(let i=0; i<a i++) {
      console.log(i)
    }
    if(y) {
      kkk()
    }
  }
  z()
}

a()
const z = () => {}


[1단계]

//호출스택                                                         //선언지도(코드 작성할 때 확정이 되어 변하지 않는다.)
|         |                                                       ____________________________________ 
|         |                                                      | anoy <- a(func), x(ture), y(false) |
|         |                                                      |                                    |
|__anony__| -> this: window(strict 모드이면 this는 undefined)       |____________________________________| 


[2단계]

//호출스택                                                         //선언지도(코드 작성할 때 확정이 되어 변하지 않는다.)
|         |                                                       ___________________________________________ 
|         |                                                      | anoy <- a(func), x(ture), y(false-> true) |
|    a    | -> this: window                                      | a <- a(4)                                 |
|__anony__| -> this: window(strict 모드이면 this는 undefined)       |___________________________________________| 

y=true에서, a에서 y에 접근할 수 있는 지 보려면 a의 부모는 anonymous이다. 
anonymous안에는 y가 포함되어 있다. 따라서 false에서 true로 바꿀 수 있다.


[3단계]

//호출스택                                                         //선언지도(코드 작성할 때 확정이 되어 변하지 않는다.)
|         |                                                       ___________________________________________ 
|         |                                                      | anoy <- a(func), x(ture), y(false-> true) |
|    a    | -> this: window                                      | a <- a(4)                                 |
|__anony__| -> this: window(strict 모드이면 this는 undefined)       | a if(x)  <- a(3) : 블록스코프 _______________| 


[4단계]

//호출스택                                                         //선언지도(코드 작성할 때 확정이 되어 변하지 않는다.)
|         |                                                       ___________________________________________ 
|         |                                                      | anoy <- a(func), x(ture), y(false-> true) |
|    a    | -> this: window                                      | a <- a(4)                                 |
|__anony__| -> this: window(strict 모드이면 this는 undefined)       | a if(x)  <- a(3) : 블록스코프                | 
                                                                 | a if(x) for <- i(0)                       | 
                                                                 | a if(x) for <- i(1)                       |
                                                                 | a if(x) for <- i(2)                       |

* 요약하면 anoy <- a <- a if(x) <- a if(x) for 와 같이 포함된다.
* 형제(for문 0,1,2) 간에는 서로간의 변수에 접근할 수 없다. 따라서 let j= 1과 같이 새로운 변수에 접근하려면 for문 안에 쓰면 안되고, 바깥의 부모 층으로 올려서 사용해야 함.


[5단계]

//호출스택                                                         //선언지도(코드 작성할 때 확정이 되어 변하지 않는다.)
|         |                                                       ___________________________________________ 
|         |                                                      | anoy <- a(func), x(ture), y(false-> true) |
|    a    | -> this: window                                      | a <- a(4)                                 |
|__anony__| -> this: window(strict 모드이면 this는 undefined)       | a if(x)  <- a(3) : 블록스코프                | 
                                                                 | a if(x) for <- i(0)                       | 
                                                                 | a if(x) for <- i(1)                       |
                                                                 | a if(x) for <- i(2)                       |

a에서 z에 접근이 가능한가? 선언 되기 전에 호출되므로 에러가 발생한다. z() //에러         
하지만 function z()와 같이 함수이면 호이스팅 된다. 따라서 먼저 호이스팅 되는 것이 있는 지 구별 필요함.                                                    