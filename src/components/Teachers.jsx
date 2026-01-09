import { Bell } from "lucide-react";
import { useState } from "react";
import Koala from "../assets/koala.svg";

export default function Teachers({ teachers, setTeachers }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null); 
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    class: "",
    age: "",
    gender: "",
    about: "",
  });

  const save = () => {
    const updated = [...teachers, form];
    localStorage.setItem("teachers", JSON.stringify(updated));
    setTeachers(updated);
    setOpen(false);
    setForm({
      name: "",
      email: "",
      subject: "",
      class: "",
      age: "",
      gender: "",
      about: "",
    });
  };

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase())
  );

  const deleteTeacher = (index) => {
    const updated = teachers.filter((_, i) => i !== index);
    setTeachers(updated);
    localStorage.setItem("teachers", JSON.stringify(updated));
    setActive(null);
  };

  const saveEdit = (index, updatedData) => {
    const updated = [...teachers];
    updated[index] = updatedData;
    setTeachers(updated);
    localStorage.setItem("teachers", JSON.stringify(updated));
    setActive(null);
  };

  return (
    <div className="flex-1 p-10">
     
      <div className="flex items-center justify-end gap-6 text-gray-600 relative">
        <div className="absolute -top-0.5 right-20.5 w-2.5 h-2.5 rounded-[100%] bg-blue-600"></div>
        <Bell size={23} />
        <span className="cursor-pointer">Log out</span>
      </div>

      <div className="flex justify-between items-center my-6">
        <h1 className="text-2xl font-semibold">Teachers</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Add Teachers
        </button>
      </div>

      <input
        placeholder="Search for a student by name or email"
        className="w-full p-3 border rounded-lg mb-10"
        onChange={(e) => setSearch(e.target.value)}
      />

      
      {open && (
        <div className="bg-white p-6 rounded-xl mb-12 grid md:grid-cols-2 gap-4">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              placeholder={key}
              className="border p-3 rounded-lg"
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          ))}
          <button
            onClick={save}
            className="bg-blue-600 text-white py-2 rounded-lg md:col-span-2"
          >
            Save
          </button>
        </div>
      )}

   
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center text-gray-500 mt-16">
          <img src={Koala} className="w-44 mb-6" />
          <p className="text-xl font-semibold">No Teachers at this time</p>
          <span>
            Teachers will appear here after they enroll in your school.
          </span>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Gender
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((t, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setActive({ ...t, index: i })}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{t.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{t.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{t.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{t.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{t.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      
      {active && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-3xl p-8 rounded-xl relative">
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">{active.name}</h2>

              {Object.keys(form).map((key) => (
                <div key={key} className="flex justify-between">
                  <span className="font-medium">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </span>
                  <span>{active[key]}</span>
                </div>
              ))}

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    const updatedData = {
                      ...active,
                      name: prompt("Name", active.name) || active.name,
                      email: prompt("Email", active.email) || active.email,
                      subject:
                        prompt("Subject", active.subject) || active.subject,
                      class: prompt("Class", active.class) || active.class,
                      age: prompt("Age", active.age) || active.age,
                      gender: prompt("Gender", active.gender) || active.gender,
                      about: prompt("About", active.about) || active.about,
                    };
                    saveEdit(active.index, updatedData);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTeacher(active.index)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

   
      <button className="fixed bottom-6 right-6 bg-[#0B1B4B] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66667 0C2.99067 0 0 2.99067 0 6.66667V9.42867C0 10.1113 0.598 10.6667 1.33333 10.6667H2C2.17681 10.6667 2.34638 10.5964 2.4714 10.4714C2.59643 10.3464 2.66667 10.1768 2.66667 10V6.57133C2.66667 6.39452 2.59643 6.22495 2.4714 6.09993C2.34638 5.9749 2.17681 5.90467 2 5.90467H1.39467C1.76533 3.32467 3.98533 1.33333 6.66667 1.33333C9.348 1.33333 11.568 3.32467 11.9387 5.90467H11.3333C11.1565 5.90467 10.987 5.9749 10.8619 6.09993C10.7369 6.22495 10.6667 6.39452 10.6667 6.57133V10.6667C10.6667 11.402 10.0687 12 9.33333 12H8V11.3333H5.33333V13.3333H9.33333C10.804 13.3333 12 12.1373 12 10.6667C12.7353 10.6667 13.3333 10.1113 13.3333 9.42867V6.66667C13.3333 2.99067 10.3427 0 6.66667 0Z"
                fill="#FCFAFA"
              />
            </svg>
          </div>
          Support
        </div>
        <div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 10L8 6L12 10"
              stroke="#FCFAFA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}
