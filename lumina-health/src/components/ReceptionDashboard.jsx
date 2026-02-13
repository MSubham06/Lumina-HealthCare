import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, Calendar, Clock, User, Phone, MessageSquare, Filter, Loader2, CheckCircle, Trash2, Plus, X, ChevronDown, Activity, LogOut } from 'lucide-react';

const ReceptionDashboard = () => {
  // --- CONFIGURATION ---
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyznHixbNannkZHx9YEi1E2rMp4yDItu33CaaKd8Vagp68BAp2G1TbcCYc86HLey7Q/exec";

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBooking, setNewBooking] = useState({ name: '', phone: '', date: '', time: 'Morning (9AM - 12PM)', department: 'General', message: '' });

  // --- SAFE HELPERS (Prevents White Screen Crashes) ---
  const safeString = (val) => String(val || '').replace(/'/g, '').trim();
  
  const formatDate = (dateVal) => {
    if (!dateVal || dateVal === "N/A") return "N/A";
    try {
      const d = new Date(dateVal);
      // Check if date is valid
      if (isNaN(d.getTime())) return safeString(dateVal);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return safeString(dateVal);
    }
  };

  // --- API ---
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL);
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        if (Array.isArray(data)) {
          setAppointments(data.reverse());
          setLastUpdated(new Date());
        }
      } catch (e) {
        console.error("JSON Parse Error. Script might be returning HTML error page.");
      }
    } catch (error) {
      console.error("Network Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action, payload) => {
    // Optimistic Delete (Removes from UI immediately)
    if (action === "delete") {
      setAppointments(prev => prev.filter(a => a.rowIndex !== payload.rowIndex));
    }

    const formData = new URLSearchParams();
    formData.append("action", action);
    Object.keys(payload).forEach(key => formData.append(key, payload[key]));

    try {
      await fetch(GOOGLE_SCRIPT_URL, { method: "POST", body: formData });
      if (action !== "delete") fetchData(); // Re-fetch to confirm updates
    } catch (error) {
      alert("Network error. Changes might not have saved.");
      fetchData(); // Revert on error
    } finally {
      setActionLoading(null);
      if (action === "create") setIsModalOpen(false);
    }
  };

  const updateStatus = (rowIndex, newStatus) => {
    setActionLoading(rowIndex);
    handleAction("update", { rowIndex, status: newStatus });
  };

  const deleteRow = (rowIndex) => {
    if (window.confirm("Permanently delete this booking?")) {
      setActionLoading(rowIndex);
      handleAction("delete", { rowIndex });
    }
  };

  const submitBooking = (e) => {
    e.preventDefault();
    setActionLoading("new");
    handleAction("create", newBooking);
    setNewBooking({ name: '', phone: '', date: '', time: 'Morning (9AM - 12PM)', department: 'General', message: '' });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredAppointments = appointments.filter(app => 
    safeString(app.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
    safeString(app.phone).includes(searchTerm)
  );

  const getStatusColor = (status) => {
    const s = safeString(status).toLowerCase();
    if (s.includes('confirm')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (s.includes('complete')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (s.includes('cancel')) return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* --- FIXED NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-200">
            <Activity size={20} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-slate-900 leading-none">Lumina<span className="text-blue-600">Admin</span></h1>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">Reception Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => window.location.href='/'} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <div className="pt-24 px-6 lg:px-8 pb-10 max-w-[1600px] mx-auto space-y-8">
        
        {/* ACTION BAR */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
            <p className="text-slate-500 text-sm mt-1">Real-time patient appointments.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchData} className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition-all shadow-sm">
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5">
              <Plus size={20} /> New Booking
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: "Total Bookings", value: appointments.length, icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Pending", value: appointments.filter(a => a.status === 'Pending').length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Confirmed", value: appointments.filter(a => safeString(a.status).includes('Confirm')).length, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Today's Patients", value: appointments.filter(a => new Date(a.date).toDateString() === new Date().toDateString()).length, icon: User, color: "text-purple-600", bg: "bg-purple-50" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[20px] border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-slate-800">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          ))}
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-[24px] shadow-xl shadow-slate-100/60 border border-slate-100 overflow-hidden">
          {/* SEARCH */}
          <div className="p-5 border-b border-slate-100 bg-white flex items-center gap-4">
            <Search size={20} className="text-slate-300" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm font-medium text-slate-700 placeholder-slate-400 outline-none"
            />
          </div>

          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-left">
              <thead className="bg-slate-50/80 border-b border-slate-100">
                <tr>
                  {['Patient', 'Status', 'Date', 'Contact', 'Actions'].map((h, i) => (
                    <th key={i} className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredAppointments.length === 0 ? (
                  <tr><td colSpan="5" className="p-10 text-center text-slate-400 text-sm">No records found.</td></tr>
                ) : (
                  filteredAppointments.map((app, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      
                      {/* Name */}
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs uppercase">
                            {safeString(app.name).charAt(0) || '?'}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{safeString(app.name)}</p>
                            <p className="text-[10px] text-slate-400 font-medium">
                              {app.department || 'General'} • #{app.rowIndex}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="p-5">
                        <div className="relative inline-block w-40">
                          <select
                            value={safeString(app.status)}
                            onChange={(e) => updateStatus(app.rowIndex, e.target.value)}
                            disabled={actionLoading === app.rowIndex}
                            className={`w-full appearance-none pl-3 pr-8 py-2 rounded-lg text-xs font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-100 transition-all ${getStatusColor(app.status)}`}
                          >
                            {["Pending", "Confirmed", "Completed", "Cancelled"].map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
                          {actionLoading === app.rowIndex && (
                            <div className="absolute right-8 top-1/2 -translate-y-1/2">
                              <Loader2 size={12} className="animate-spin" />
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="p-5">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-700">{formatDate(app.date)}</span>
                          <span className="text-[10px] text-slate-400">{safeString(app.time)}</span>
                        </div>
                      </td>

                      <td className="p-5">
                        <span className="text-xs font-medium text-slate-600 font-mono">
                          {safeString(app.phone)}
                        </span>
                      </td>

                      <td className="p-5">
                        <button 
                          onClick={() => deleteRow(app.rowIndex)}
                          disabled={actionLoading === app.rowIndex}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                          {actionLoading === app.rowIndex ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={16} />}
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 text-slate-300 hover:text-slate-600"><X size={20} /></button>
            <h2 className="text-xl font-bold text-slate-900 mb-6">New Appointment</h2>
            <form onSubmit={submitBooking} className="space-y-4">
              <input required className="w-full p-3 bg-slate-50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100" 
                value={newBooking.name} onChange={e => setNewBooking({...newBooking, name: e.target.value})} placeholder="Patient Name" />
              <input required className="w-full p-3 bg-slate-50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100" 
                value={newBooking.phone} onChange={e => setNewBooking({...newBooking, phone: e.target.value})} placeholder="Phone Number" />
              <div className="grid grid-cols-2 gap-4">
                <input type="date" required className="w-full p-3 bg-slate-50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100" 
                  value={newBooking.date} onChange={e => setNewBooking({...newBooking, date: e.target.value})} />
                <select className="w-full p-3 bg-slate-50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100"
                  value={newBooking.department} onChange={e => setNewBooking({...newBooking, department: e.target.value})}>
                  {['General', 'Cardiology', 'Pediatrics', 'Neurology'].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <button className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                {actionLoading === "new" ? <Loader2 className="animate-spin mx-auto" /> : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceptionDashboard;