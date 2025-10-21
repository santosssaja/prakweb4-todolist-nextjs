"use client";
import { useState } from "react";

export default function TodoInput({ onAdd }: { onAdd: (text: string, dueDate?: string) => void }) {
  const [text, setText] = useState("");
  const [due, setDue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim(), due);
    setText("");
    setDue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tambahkan tugas..."
        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="date"
        value={due}
        onChange={(e) => setDue(e.target.value)}
        className="px-3 py-2 border rounded-lg"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Add
      </button>
    </form>
  );
}
