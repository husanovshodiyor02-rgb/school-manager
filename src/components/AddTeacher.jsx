import { useState } from "react";

export default function AddTeacher({ setPage }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    class: "",
    gender: "",
    subject: "",
    age: "",
    about: "",
  });

  const saveTeacher = () => {
    const data = JSON.parse(localStorage.getItem("teachers")) || [];
    localStorage.setItem("teachers", JSON.stringify([...data, form]));
    setPage("list");
  };

  return (
    <>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Add teacher</h1>
        <button
          onClick={saveTeacher}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-lg">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            className="p-3 border rounded-lg"
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        ))}
      </div>
    </>
  );
}
