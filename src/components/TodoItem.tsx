"use client";
import { motion } from "framer-motion";
import { Todo } from "@/types/todo";

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}) {
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex justify-between items-center p-3 rounded-lg shadow-sm mb-2 transition-colors
        ${isOverdue ? "bg-red-100" : "bg-white dark:bg-gray-800"}`}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-4 h-4"
        />
        <input
          value={todo.text}
          onChange={(e) => onEdit(todo.id, e.target.value)}
          className={`bg-transparent w-full outline-none ${
            todo.completed ? "line-through text-gray-400" : ""
          }`}
        />
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-700 ml-2"
      >
        ✕
      </button>
    </motion.div>
  );
}
