import { useState } from "react";
import "./App.css";
import Quote from "./Quote";
import Header from "./Header";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  const addTodo = (e) => {
    e.preventDefault();

    let currentDate = new Date();

    setTodos([
      ...todos,
      [
        crypto.randomUUID(),
        todoText.charAt(0).toUpperCase() + todoText.slice(1),
        currentDate.toDateString(),
        false,
      ],
    ]);
    setTodoText("");
  };

  const deleteTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => {
      return todo[0] !== todoId;
    });

    setTodos(updatedTodos);
  };

  const markCompleted = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo[0] === todoId) {
        return [todo[0], todo[1], todo[2], todo[3] ? false : true];
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleChange = (e) => {
    setTodoText(e.target.value);
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
                value={todoText}
                onChange={handleChange}
                className="shadow-sm block w-full rounded-md border-0 py-5 pl-5 pr-52 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6"
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
                  {todos.map((todo) => (
                    <div
                      key={todo[0]}
                      className="flex justify-start cursor-pointer text-gray-700 hover:text-gray-600  rounded-md px-2 py-2 my-2"
                    >
                      <input
                        type="checkbox"
                        onClick={markCompleted.bind(this, todo[0])}
                        className="h-5 w-5 rounded-full checked:bg-green-400"
                      />
                      {/* <span
                        onClick={markCompleted.bind(this, todo[0])}
                        className="bg-green-400 h-2 w-2 m-2 rounded-full"
                      ></span> */}
                      <div
                        className={
                          "flex-grow font-medium px-2 " +
                          (todo[3] ? "text-green-400 line-through" : "")
                        }
                      >
                        {todo[1]}
                      </div>
                      <div className="text-sm font-normal text-gray-500 tracking-wide">
                        <button onClick={deleteTodo.bind(this, todo[0])}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
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
