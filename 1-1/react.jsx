import { useCallback } from 'react';

export const App = () => {
  const onclick = useCallback((e) => {
    console.log(e.target);
  }, []);
  return <div onclick={onclick}></div>;

  // (x) return <div onClick={onclick()}></div>; // 매개변수 없이 onClick 호출
  // return 값 넣어보면 return <div onClick={console.log(e.target)}><div>
  // onClick={undefined}
};
