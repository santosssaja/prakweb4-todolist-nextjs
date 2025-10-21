"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import { Todo } from "@/types/todo";
import { v4 as uuid } from "uuid";

export default function Page() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  const addTodo = (text: string) => {
    const newTodo: Todo = { id: uuid(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <main className="max-w-md mx-auto mt-10 bg-gray-50 p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">📝 To-Do List</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </main>
  );
}
