import Logo from '../assets/logo.svg'
import {
  LayoutDashboard,
  Users,
  User,
  CreditCard,
  Settings,
  BookOpen,
  Sparkles,
} from "lucide-react";

export default function Sidebar({ page, setPage }) {
  const item = (id, title, Icon) => (
    <div
      onClick={() => setPage(id)}
      className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer
        ${
          page === id
            ? "bg-[#2F6FED] text-white"
            : "text-blue-100 hover:bg-blue-800"
        }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} />
        <span>{title}</span>
      </div>
      {id === "teachers" && <span>{">"}</span>}
    </div>
  );

  return (
    <div className="w-64 bg-[#081A4B] text-white p-6 flex flex-col justify-between">
      <div>
        <div className="flex justify-center mb-4">
          
          <a href="/"><img src={Logo} alt="" /></a>
        </div>
        <div className="text-xl font-semibold mb-10">Udemy Inter.school</div>
        {item("dashboard", "Dashboard", LayoutDashboard)}
        {item("teachers", "Teachers", Users)}
        {item("students", "Students", User)}
        {item("billing", "Billing", CreditCard)}
        {item("settings", "Settings and profile", Settings)}
        {item("exams", "Exams", BookOpen)}
      </div>

      <div>
        <div className="flex items-center gap-2 text-blue-200 mb-4">
          <Sparkles size={16} /> Features{" "}
          <span className="bg-blue-600 text-xs px-2 rounded ml-2">NEW</span>
        </div>
      </div>
    </div>
  );
}
