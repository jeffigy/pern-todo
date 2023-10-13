import React, { useState } from "react";

type InputTodoProps = {};

const InputTodo: React.FC<InputTodoProps> = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location.reload();
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <form className="mx-auto flex flex-col space-y-2" onSubmit={onSubmitForm}>
      <label htmlFor="description">Input Todo</label>

      <input
        id="description"
        type="text"
        className="border border-gray-700 rounded-md w-[500px] p-1"
        value={description}
        placeholder="e.g. feed the dogs"
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <div className="mx-auto">
        <button className="px-3 py-1 bg-teal-700 rounded-md text-white">
          Add
        </button>
      </div>
    </form>
  );
};
export default InputTodo;
