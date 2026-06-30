import React, { useState } from "react";
import { X, Calendar, Clock, User, Phone, Mail } from "lucide-react";

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (name: string) => void;
}

export default function BookingFormModal({ isOpen, onClose, onSuccess }: BookingFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSuccess) onSuccess(formData.name || "Client");
    else onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050816]/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bento-card p-8 mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-white">New Appointment</h2>
          <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-[#06B6D4] uppercase tracking-wider">Client Details</h3>
              
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#050816] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#06B6D4] transition-colors"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full bg-[#050816] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#06B6D4] transition-colors"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="w-full bg-[#050816] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#06B6D4] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-[#8B5CF6] uppercase tracking-wider">Appointment</h3>
              
              <div>
                <select required className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#06B6D4] transition-colors appearance-none">
                  <option value="" disabled selected>Select Service</option>
                  <option value="consultation">Initial Consultation</option>
                  <option value="therapy">Therapy Session</option>
                  <option value="followup">Follow-up</option>
                </select>
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  required
                  className="w-full bg-[#050816] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#06B6D4] transition-colors custom-date-picker"
                />
              </div>

              <div className="relative">
                <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  required
                  className="w-full bg-[#050816] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#06B6D4] transition-colors custom-time-picker"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <textarea
              placeholder="Custom notes or special requests..."
              rows={3}
              className="w-full bg-[#050816] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#06B6D4] transition-colors resize-none"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-full text-white bg-white/5 hover:bg-white/10 transition-colors font-medium">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 rounded-full text-black bg-[#06B6D4] hover:bg-[#06B6D4]/80 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] font-semibold">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
