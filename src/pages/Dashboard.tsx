import { useEffect, useState } from "react";
import axios from "axios";

interface ChecklistItem {
  id: number;
  title: string;
  status: string;
  deadline?: string;
  user_id: number;
}

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentItem, setCurrentItem] = useState<ChecklistItem | null>(null);
  const [form, setForm] = useState({ title: "", deadline: "" });

  const [checklists, setChecklists] = useState<ChecklistItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const userId = localStorage.getItem("user_id");

  const fetchData = async () => {
    try {
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }
      const res = await axios.get(
        `http://localhost:8000/api/checklists?user_id=${userId}`
      );
      setChecklists(res.data);
    } catch (err) {
      console.error("Gagal fetch checklist:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleStatus = async (id: number) => {
    await axios.post(`http://localhost:8000/api/checklists/done/${id}`);
    fetchData();
  };

  const removeItem = async (id: number) => {
    await axios.delete(`http://localhost:8000/api/checklists/delete/${id}`);
    fetchData();
  };

  const markSelectedAsDone = async () => {
    await Promise.all(
      selectedIds.map((id) =>
        axios.post(`http://localhost:8000/api/checklists/done/${id}`)
      )
    );
    setSelectedIds([]);
    fetchData();
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };
  const handleAdd = () => {
    setForm({ title: "", deadline: "" });
    setModalMode("add");
    setShowModal(true);
  };

  const handleEdit = (item: ChecklistItem) => {
    setCurrentItem(item);
    setForm({ title: item.title, deadline: item.deadline || "" });
    setModalMode("edit");
    setShowModal(true);
  };

  const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/";
};


  const unfinished = checklists.filter((item) => item.status !== "Selesai");
  const finished = checklists.filter((item) => item.status === "Selesai");

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-500">
            📋 Checklist Onboarding
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="bg-pink-300 text-white px-2 py-1 rounded-md hover:bg-pink-400 transition"
            >
              + Tambah Checklist
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-400 text-white px-2 py-1 rounded-md hover:bg-red-500 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-pink-400">
              Belum Selesai
            </h2>
            
            <button
              onClick={markSelectedAsDone}
              className="bg-blue-300 text-white px-2 py-1 mb-2 rounded-md hover:bg-blue-400 transition"
            >
              ✅ Tandai Selesai
            </button>
            {unfinished.length === 0 ? (
              <p className="text-sm text-gray-600">Tidak ada checklist.</p>
            ) : (
              unfinished.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-4 mb-3 border-l-4 border-pink-300 flex items-start gap-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    {item.deadline && (
                      <p className="text-sm text-gray-500">
                        Deadline: {item.deadline}
                      </p>
                    )}
                    <div className="flex justify-end mt-2 gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-sm px-2 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
                      >
                        ✏️ Edit
                      </button>
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
                </div>
              ))
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-blue-400">
              Selesai
            </h2>
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
                    <p className="text-sm text-gray-500">
                      Deadline: {item.deadline}
                    </p>
                  )}
                  <div className="flex justify-end mt-2 gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-sm px-2 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
                    >
                      ✏️ Edit
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
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold text-gray-700">
              {modalMode === "add" ? "Tambah Checklist" : "Edit Checklist"}
            </h2>
            <input
              type="text"
              placeholder="Judul checklist"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2 border rounded-md bg-blue-100"
            />
            <input
              type="date"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              className="w-full p-2 border rounded-md bg-blue-100"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={async () => {
                  try {
                    if (modalMode === "add") {
                      await axios.post(
                        "http://localhost:8000/api/checklists/create",
                        {
                          user_id: Number(userId),
                          title: form.title,
                          status: "Belum Selesai",
                          deadline: form.deadline || null,
                        }
                      );
                    } else if (modalMode === "edit" && currentItem) {
                      await axios.put(
                        `http://localhost:8000/api/checklists/update/${currentItem.id}`,
                        {
                          title: form.title,
                          deadline: form.deadline || null,
                        }
                      );
                    }
                    setShowModal(false);
                    fetchData();
                  } catch (err) {
                    console.error("Gagal submit:", err);
                  }
                }}
                className="px-2 py-1 bg-pink-400 text-white rounded hover:bg-pink-500"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
