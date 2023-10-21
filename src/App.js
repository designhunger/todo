import React, { useState } from "react";
import FlipMove from "react-flip-move";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import Quote from "./components/Quote";
import Header from "./components/Header";
import { setTodos } from "./redux/todosSlice";

function App() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const [inputTodoText, setInputTodoText] = useState("");
  const [editedTodoText, setEditedTodoText] = useState("");
  const [editedTodoId, setEditedTodoId] = useState("");

  const useOutsideClick = (callback) => {
    const ref = React.useRef();

    React.useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      document.addEventListener("click", handleClick, true);

      return () => {
        document.removeEventListener("click", handleClick, true);
      };
    }, [ref, callback]);

    return ref;
  };

  const handleClickOutside = () => {
    setEditedTodoId("");
  };

  const ref = useOutsideClick(handleClickOutside);

  const addTodo = (e) => {
    e.preventDefault();

    if (inputTodoText.length > 0) {
      let currentDate = new Date();

      dispatch(
        setTodos([
          ...todos,
          [
            crypto.randomUUID(),
            inputTodoText.charAt(0).toUpperCase() + inputTodoText.slice(1),
            currentDate.toDateString(),
            false,
          ],
        ])
      );
      setInputTodoText("");
    }
  };

  const deleteTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => {
      return todo[0] !== todoId;
    });

    dispatch(setTodos(updatedTodos));
  };

  const completeTodo = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo[0] === todoId) {
        return [todo[0], todo[1], todo[2], todo[3] ? false : true];
      }
      return todo;
    });

    dispatch(setTodos(updatedTodos));
  };

  const handleInputChange = (e) => {
    setInputTodoText(e.target.value);
  };

  const handleUpdateChange = (e) => {
    setEditedTodoText(e.target.value);
  };

  const handleTodoUpdate = (e) => {
    if (e.key === "Enter") {
      const updatedTodos = todos.map((todo) => {
        if (todo[0] === editedTodoId) {
          return [todo[0], e.target.value, todo[2], todo[3]];
        }
        return todo;
      });

      dispatch(setTodos(updatedTodos));

      setEditedTodoId("");
    }
  };

  const showEditForm = (todoId) => {
    todos.find((todo) => {
      if (todo[0] === todoId && todo[3] === false) {
        setEditedTodoText(todo[1]);
        setEditedTodoId(todoId);
      }
    });
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
      <div className="mx-auto max-w-2xl pt-16">
        <div className="mb-8 flex justify-center">
          <Quote />
        </div>
        <div className="text-center">
          <Header />

          <div className="relative mt-10 rounded-md shadow-sm">
            <form>
              <input
                value={inputTodoText}
                onChange={handleInputChange}
                className="shadow-sm block w-full rounded-md border-0 py-5 pl-5 pr-52 text-gray-800 ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6"
                placeholder="What's your next task?"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  type="submit"
                  onClick={addTodo}
                  className="rounded-md bg-indigo-600 px-5 py-5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add TeuxDeux
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
      </div>
      {todos.length > 0 && (
        <div className="mx-auto max-w-2xl pt-20">
          <div className="flex justify-center">
            <div className="w-full">
              <div className="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
                <div className="text-sm">
                  <FlipMove enterAnimation="fade">
                    {todos.map((todo) => (
                      <div
                        key={todo[0]}
                        className="flex justify-start  text-gray-700 hover:text-gray-600  rounded-md px-2 py-2 my-2"
                      >
                        <input
                          type="checkbox"
                          onClick={() => completeTodo(todo[0])}
                          defaultChecked={todo[3]}
                          className="h-5 w-5 cursor-pointer rounded-full checked:bg-green-400 focus:ring-green-400 text-green-400 "
                        />
                        <div
                          className={
                            "flex-grow font-medium px-2 " +
                            (todo[3] ? "text-green-400 line-through" : "")
                          }
                          onClick={() => showEditForm(todo[0])}
                        >
                          {(editedTodoId === todo[0] && (
                            <input
                              value={editedTodoText}
                              onChange={handleUpdateChange}
                              onKeyDown={handleTodoUpdate}
                              ref={ref}
                              className="shadow-sm block w-full border-0 border-b-2 p-0 pb-2 text-gray-800 ring-0 border-gray-300 focus:ring-0 focus:border-t-0 focus:border-b-2 focus:border-indigo-600"
                            />
                          )) ||
                            todo[1]}
                        </div>
                        <div className="text-sm font-normal text-gray-500 tracking-wide">
                          <button onClick={() => deleteTodo(todo[0])}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 hover:text-red-400"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </FlipMove>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
