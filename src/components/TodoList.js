import React from "react";

function TodoList({ todos }) {
  console.log(todos);

  return (
    <div className="mx-auto max-w-2xl pt-20">
      <div className="flex justify-center">
        <div className="w-full">
          <div className="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
            <div className="text-sm">
              {todos.map((todo) => (
                <div
                  key={todo[0]}
                  className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2"
                >
                  <span className="bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                  <div className="flex-grow font-medium px-2">{todo[1]}</div>
                  <div className="text-sm font-normal text-gray-500 tracking-wide">
                    {/* <button onClick={deleteTodo.bind(this, todo[0])}>
                      Delete
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
