"use client";
import { useState } from "react";

export default function TodoInput({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tambahkan tugas..."
        className="flex-1 px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-400"
      />
      <button type="submit" className="bg-blue-500 text-white px-6 py-3 text-lg rounded-lg hover:bg-blue-600">
        Add
      </button>
    </form>
  );
}
