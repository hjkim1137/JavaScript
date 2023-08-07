import { useCallback } from 'react';

[올바른 경우]
export const App = () => {
  const onclick = useCallback((e) => {
    console.log(e.target);
  }, []);
  return <div onclick={onclick}></div>;
};

[잘못 쓰는 경우]
export const App = () => {
  const onclick = useCallback((e) => {
    console.log(e.target);
  }, []);
  return <div onClick={onclick()}></div>; 
  // return 값 넣어보면 return <div onClick={console.log(e.target)}><div> <-- 매개변수(e) 없이 onClick 호출
  // 따라서 onClick={undefined}
};
