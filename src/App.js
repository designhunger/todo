import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [quote, setQuote] = useState("");

  const addTodo = (e) => {
    e.preventDefault();

    setTodos([
      ...todos,
      todo
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    ]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  useEffect(() => {
    const getQuotes = async () =>
      await fetch(`https://type.fit/api/quotes`)
        .then((res) => res.json())
        .then((data) => {
          const rand = Math.floor(Math.random() * data.length);

          setQuote(data[rand]);
        });

    getQuotes();
  }, []);

  // todo erweitern
  // - id: uuid
  // - dueAt: date
  // - done: bool

  // Dot rot anzeigen, wenn überfällig
  // Dot grün anzeigen, wenn zukünftig oder heute

  // Sortierung nach dueAt

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
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            {quote.text} - <i>{quote.author}</i>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            My great Teux Deux app
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            This is the perfect spot to note all your ToDos for the next days.
            Type in all you need to do and be happy to strike the items when
            done!
          </p>

          <div className="relative mt-10 rounded-md shadow-sm">
            <form>
              <input
                value={todo}
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
                    <div className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                      <span className="bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                      <div className="flex-grow font-medium px-2">{todo}</div>
                      <div className="text-sm font-normal text-gray-500 tracking-wide">
                        31.10.23
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
