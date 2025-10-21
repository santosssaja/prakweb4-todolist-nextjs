"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Todo } from "@/types/todo";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import ThemeToggle from "@/components/ThemeToggle";
import { exportTodos, importTodos } from "@/utils/exportImport";

export default function Page() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const addTodo = (text: string, dueDate?: string) => {
    setTodos([...todos, { id: uuid(), text, completed: false, createdAt: Date.now(), dueDate }]);
  };

  const toggleTodo = (id: string) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const deleteTodo = (id: string) => setTodos(todos.filter((t) => t.id !== id));

  const editTodo = (id: string, newText: string) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: newText } : t)));

  const filtered = todos
    .filter((t) =>
      filter === "completed"
        ? t.completed
        : filter === "active"
        ? !t.completed
        : true
    )
    .filter((t) => t.text.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.createdAt - a.createdAt);

  const progress = todos.length
    ? Math.round((todos.filter((t) => t.completed).length / todos.length) * 100)
    : 0;

  return (
    <main className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <ThemeToggle />
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">📝 To-Do List</h1>

        <TodoInput onAdd={addTodo} />

        {/* Filter & Search */}
        <div className="flex gap-2 mb-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-2 py-1"
          >
            <option value="all">Semua</option>
            <option value="active">Belum selesai</option>
            <option value="completed">Selesai</option>
          </select>
          <input
            type="text"
            placeholder="Cari..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded-lg px-2 py-1"
          />
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 rounded mb-4">
          <div
            className="h-2 bg-green-500 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>

        <TodoList todos={filtered} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />

        {/* Export/Import */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <button onClick={() => exportTodos(todos)} className="hover:underline">
            ⬇️ Export
          </button>
          <label className="cursor-pointer hover:underline">
            ⬆️ Import
            <input
              type="file"
              accept="application/json"
              onChange={(e) =>
                e.target.files && importTodos(e.target.files[0], setTodos)
              }
              className="hidden"
            />
          </label>
        </div>
      </div>
    </main>
  );
}
