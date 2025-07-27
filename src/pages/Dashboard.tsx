import { useState } from "react";

interface ChecklistItem {
  id: number;
  title: string;
  completed: boolean;
  deadline?: string;
}

export default function Dashboard() {
  const [checklists, setChecklists] = useState<ChecklistItem[]>([
    { id: 1, title: "Submit dokumen KTP", completed: false, deadline: "2025-07-30" },
    { id: 2, title: "Lengkapi profil", completed: true },
  ]);

  const handleAdd = () => {
    const newItem: ChecklistItem = {
      id: Date.now(),
      title: prompt("Masukkan nama checklist") || "Checklist Baru",
      completed: false,
    };
    setChecklists([...checklists, newItem]);
  };

  const toggleStatus = (id: number) => {
    const updated = checklists.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setChecklists(updated);
  };

  const removeItem = (id: number) => {
    const filtered = checklists.filter((item) => item.id !== id);
    setChecklists(filtered);
  };

  const unfinished = checklists.filter((item) => !item.completed);
  const finished = checklists.filter((item) => item.completed);

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-500">📋 Checklist Onboarding</h1>
          <button
            onClick={handleAdd}
            className="bg-pink-300 text-white px-4 py-2 rounded-md hover:bg-pink-400 transition"
          >
            + Tambah Checklist
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Belum Selesai */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-pink-400">Belum Selesai</h2>
            {unfinished.length === 0 ? (
              <p className="text-sm text-gray-600">Tidak ada checklist.</p>
            ) : (
              unfinished.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-4 mb-3 border-l-4 border-pink-300"
                >
                  <h3 className="font-medium">{item.title}</h3>
                  {item.deadline && (
                    <p className="text-sm text-gray-500">Deadline: {item.deadline}</p>
                  )}
                  <div className="flex justify-end mt-2 gap-2">
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className="text-sm px-2 py-1 bg-blue-200 rounded hover:bg-blue-300"
                    >
                      Tandai Selesai
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm px-2 py-1 bg-red-200 rounded hover:bg-red-300"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Selesai */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-blue-400">Selesai</h2>
            {finished.length === 0 ? (
              <p className="text-sm text-gray-600">Belum ada yang selesai.</p>
            ) : (
              finished.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-4 mb-3 border-l-4 border-blue-300"
                >
                  <h3 className="font-medium line-through">{item.title}</h3>
                  {item.deadline && (
                    <p className="text-sm text-gray-500">Deadline: {item.deadline}</p>
                  )}
                  <div className="flex justify-end mt-2 gap-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm px-2 py-1 bg-red-200 rounded hover:bg-red-300"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
