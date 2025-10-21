export const exportTodos = (todos: any[]) => {
  const blob = new Blob([JSON.stringify(todos, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "todos_backup.json";
  a.click();
  URL.revokeObjectURL(url);
};

export const importTodos = (file: File, callback: (data: any[]) => void) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string);
      callback(data);
    } catch {
      alert("Gagal membaca file JSON!");
    }
  };
  reader.readAsText(file);
};
