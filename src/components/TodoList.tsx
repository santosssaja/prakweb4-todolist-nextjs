"use client";
import { AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";
import { Todo } from "@/types/todo";

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
}: {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}) {
  if (todos.length === 0)
    return <p className="text-center text-gray-500">Belum ada tugas.</p>;

  return (
    <AnimatePresence>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </AnimatePresence>
  );
}
