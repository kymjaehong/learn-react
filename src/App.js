// App.js의 코드는 컴포넌트를 생성합니다. 

import { useState } from 'react';
import './App.css'

export default function Board() {
   return (
    <>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}

function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    setValue('X');
  }

  return (
    <button 
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}