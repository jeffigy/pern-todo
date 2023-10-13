import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {
  return (
    <div className="flex flex-col space-y-5 p-10">
      <InputTodo />
      <ListTodos />
    </div>
  );
}

export default App;
