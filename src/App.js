// App.js의 코드는 컴포넌트를 생성합니다. 

import './App.css'

// 컴포넌트는 사용자 인터페이스 일부를 표시하는 재사용 가능한 코드 조각입니다.
// 컴포넌트는 UI 요소를 렌더링, 관리, 업데이트할 때 사용합니다.

// export 키워드는 이 함수를 파일 외부에서 접근할 수 있도록 만들어 줍니다.
// default 키워드는 코드를 사용하는 다른 파일에서 이 함수가 파일의 주요 함수임을 알려줍니다.
export default function Square() {  // 함수 정의
  return <button className="square">X</button>;  // 버튼 반환
}