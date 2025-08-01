// App.js의 코드는 컴포넌트를 생성합니다. 

import './App.css'

export default function Board() {
   return (
    <>
      <div className='board-row'>
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className='board-row'>
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className='board-row'>
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}

function Square({ value }) {
  function handleClick() {
    alert("clicked!");
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