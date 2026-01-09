import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Teachers from "./components/Teachers";

export default function App() {
  const [teachers, setTeachers] = useState([]);
  const [page, setPage] = useState("teachers");

  useEffect(() => {
    setTeachers(JSON.parse(localStorage.getItem("teachers")) || []);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F5F7FB]">
      <Sidebar page={page} setPage={setPage} />
      {page === "teachers" && (
        <Teachers teachers={teachers} setTeachers={setTeachers} />
      )}
    </div>
  );
}
