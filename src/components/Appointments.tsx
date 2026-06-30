import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar as CalendarIcon, Clock, User, CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react";
import { Appointment } from "../types";

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/appointments');
      if (!res.ok) throw new Error('Failed to fetch appointments. Ensure backend is running.');
      const data = await res.json();
      setAppointments(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'completed': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'cancelled': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-amber-400 bg-amber-500/10 border-amber-500/20'; // pending
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Appointments</h1>
          <p className="text-gray-400">Manage your bookings and schedule.</p>
        </div>
        <button className="bg-[#FF4F00] hover:bg-[#E64600] shadow-[0_0_15px_rgba(255,79,0,0.3)] text-white font-medium px-5 py-2.5 rounded-full transition-all border border-[#FF4F00]">
          + New Appointment
        </button>
      </div>

      {error ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Failed to load appointments</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <button onClick={fetchAppointments} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium">
            Try Again
          </button>
        </div>
      ) : loading ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 text-[#FF4F00] animate-spin mb-4" />
          <p className="text-gray-400 font-medium">Loading appointments...</p>
        </div>
      ) : (
        <div className="flex-1 overflow-auto hidden-scrollbar pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {appointments.length === 0 ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                <CalendarIcon className="w-12 h-12 text-gray-600 mb-4" />
                <p className="text-gray-400 font-medium text-lg">No appointments scheduled yet</p>
              </div>
            ) : (
              appointments.map((apt, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={apt.id}
                  className="bg-white/[0.02] backdrop-blur-md border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-white">{apt.customerName}</h3>
                    <div className={`px-3 py-1 rounded-full border flex items-center gap-1.5 text-xs font-semibold capitalize ${getStatusColor(apt.status)}`}>
                      {getStatusIcon(apt.status)}
                      {apt.status}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-400">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <CalendarIcon className="w-4 h-4 text-gray-300" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Date & Time</p>
                        <p className="text-sm font-medium text-gray-300">{apt.date} at {apt.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-400">
                      <div className="w-8 h-8 rounded-full bg-[#FF4F00]/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-[#FF4F00]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Assigned Staff</p>
                        <p className="text-sm font-medium text-gray-300">{apt.staff}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex justify-between items-center">
                    <span className="text-white/90 font-medium">{apt.service}</span>
                    <button className="text-xs font-medium text-gray-400 hover:text-white transition-colors">
                      Edit Details
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
