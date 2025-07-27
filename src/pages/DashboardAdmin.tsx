import { useEffect, useState } from "react";
import axios from "axios";

interface Checklist {
  id: number;
  title: string;
  status: boolean;
  user_name: string;
}

export default function DashboardAdmin() {
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [filteredChecklists, setFilteredChecklists] = useState<Checklist[]>([]);

  useEffect(() => {
    const fetchChecklists = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/all-checklists"
        );
        setChecklists(data);
        setFilteredChecklists(data);
      } catch (error) {
        console.error("Failed to fetch checklist data:", error);
      }
    };

    fetchChecklists();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Ini isi kontennya */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-700">
            📋 Admin Checklist Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-400 text-white rounded-lg shadow hover:bg-red-500"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredChecklists.map((item) => {
            const borderColor = item.status;
            const textColor = item.status ? "text-blue-400" : "";
            const statusLabel = item.status;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-lg shadow-md bg-white border-l-4 ${borderColor}`}
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className={`mt-1 text-sm font-medium ${textColor}`}>
                  {statusLabel}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
