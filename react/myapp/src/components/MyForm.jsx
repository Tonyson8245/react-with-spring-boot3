import { useState } from "react";

function MyForm() {
  const [text, setText] = useState("");

  // 입력 요소의 내용이 변경 되면 값을 상태에 저장
  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    alert(`You typed: ${text}`);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} value={text} />
      <input type="submit" value="Press me" />
    </form>
  );
}

export default MyForm;
