import React, { useState } from "react";

const ListItem = React.memo(({ item, todoData, setTodoData, deleteClick }) => {
  // console.log("ListItem Rendering...");

  // 현재 편집 중인지 아닌지를 관리하는 State 생성
  // isEditing 이 false 라면 목록 보여줌.
  // isEditing 이 true 라면 편집 보여줌.
  const [isEditing, setIsEditing] = useState(false);
  // 제목을 출력하고 변경하는 State
  // 편집창에는 타이틀이 먼저 작성되어 있어야 하므로
  const [editedTitle, setEditedTitle] = useState(item.title);

  // const deleteClick = (id) => {
  //   // 클릭된 ID 와 다른 요소들만 걸러서 새로운 배열 생성
  //   const newTodo = todoData.filter((item) => item.id !== id);
  //   // console.log("클릭", newTodo);
  //   setTodoData(newTodo);
  // };

  // 편집창 내용 갱신 처리
  const editChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const toggleClick = (id) => {
    // map 을 통해서 todoData 의 complete 를 업데이트 해보자.
    const updateTodo = todoData.map((item) => {
      if (item.id === id) {
        // if (item.id === true) {
        //   item.completed = false;
        // } else {
        //   item.completed = true;
        // }
        item.completed = !item.completed;
      }

      return item;
    });
    setTodoData(updateTodo);
    // 로컬에 저장(DB 저장 예정)
    localStorage.setItem("todoData", JSON.stringify(updateTodo));
  };

  // 현재 item.id 에 해당하는 것만 업데이트 한다.
  const todoId = item.id;
  const updateTitle = () => {
    // 공백 문자열 제거 추가
    let str = editedTitle;
    str = str.replace(/^\s+|\s+$/gm, "");
    if (str.length === 0) {
      alert("제목을 입력하세요.");
      setEditedTitle(item.title);
      return;
    }

    let tempTodo = todoData.map((item) => {
      // 모든 todoData 중에 현재 ID 와 같다면
      if (item.id === todoId) {
        // 타이틀 글자를 수정하겠다.
        item.title = editedTitle;
      }
      return item;
    });

    // 데이터 갱신
    setTodoData(tempTodo);
    // 로컬에 저장(DB 저장 예정)
    localStorage.setItem("todoData", JSON.stringify(tempTodo));
    // 목록창으로 이동
    setIsEditing(false);
  };

  if (isEditing) {
    // 편집일때 JSX 리턴
    return (
      <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded">
        <div className="items-center ">
          <input
            type="text"
            className="w-full px-3 py-2 mr-4 text-gray-500 bg-white border rounded"
            value={editedTitle}
            onChange={editChange}
          />
        </div>
        <div className="items-center ">
          <button className="px-4 py-2" onClick={updateTitle}>
            Update
          </button>
          <button className="px-4 py-2" onClick={() => setIsEditing(false)}>
            Close
          </button>
        </div>
      </div>
    );
  } else {
    // 목록일때 JSX 리턴
    return (
      <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded">
        <div className="items-center ">
          <input
            type="checkbox"
            defaultChecked={item.completed}
            onChange={() => toggleClick(item.id)}
          />{" "}
          <span className={item.completed ? "line-through" : "none"}>
            {item.title}
          </span>
        </div>
        <div className="items-center ">
          <button
            className="px-4 py-2"
            onClick={() => {
              setIsEditing(true);
              setEditedTitle(item.title);
            }}
          >
            Edit
          </button>
          <button className="px-4 py-2" onClick={() => deleteClick(item.id)}>
            x
          </button>
        </div>
      </div>
    );
  }
});

export default ListItem;
