'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Todo } from '@/types/todo'

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, newText: string) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const itemRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Update editText state if the todo.text prop changes from parent
  useEffect(() => {
    setEditText(todo.text)
  }, [todo.text])

  const handleEdit = useCallback(() => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim())
    } else {
      setEditText(todo.text) // Revert if empty
    }
    setIsEditing(false)
  }, [editText, onEdit, todo.id, todo.text])

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  // Click outside to save
  useEffect(() => {
    if (!isEditing) return

    const handleClickOutside = (event: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        handleEdit()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEditing, handleEdit])

  return (
    <motion.div
      ref={itemRef}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex justify-between items-center p-4 rounded-lg shadow-sm mb-3 transition-colors bg-white dark:bg-gray-800`}
    >
      <div className="flex items-center gap-4 w-full">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5"
        />
        {isEditing ? (
          <input
            ref={inputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEdit()
              if (e.key === 'Escape') {
                setIsEditing(false)
                setEditText(todo.text)
              }
            }}
            className={`bg-transparent w-full outline-none text-lg ${
              todo.completed ? 'line-through text-gray-400' : ''
            }`}
          />
        ) : (
          <span
            className={`w-full text-lg ${
              todo.completed ? 'line-through text-gray-400' : ''
            }`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex gap-3 ml-4 text-lg">
        {isEditing ? (
          <button
            onClick={handleEdit}
            className="text-green-500 hover:text-green-700"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700"
          >
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
  )
}
