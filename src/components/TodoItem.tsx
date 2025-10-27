"use client";
import { useState, useEffect } from "react";
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
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  useEffect(() => {
    setEditText(todo.text);
  }, [todo.text]);

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    } else {
      setEditText(todo.text); // Revert if empty
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex justify-between items-center p-3 rounded-lg shadow-sm mb-2 transition-colors bg-white dark:bg-gray-800`}
    >
      <div className="flex items-center gap-2 w-full">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-4 h-4"
        />
        {isEditing ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEdit();
              }
            }}
            className={`bg-transparent w-full outline-none ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
            autoFocus
          />
        ) : (
          <span
            className={`w-full ${todo.completed ? "line-through text-gray-400" : ""}`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex gap-2 ml-2">
        {isEditing ? (
          <button onClick={handleEdit} className="text-green-500 hover:text-green-700">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700">
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
}
