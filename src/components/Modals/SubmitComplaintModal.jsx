import React, { useState } from 'react';
import { X, Send, Building2 } from 'lucide-react';

export default function SubmitComplaintModal({ isOpen, onClose, onSubmitComplaint }) {
  const [requestType, setRequestType] = useState('Assistance');
  const [category, setCategory] = useState('Plumbing');
  const [block, setBlock] = useState('Hostel B');
  const [roomNo, setRoomNo] = useState('207');
  const [timeSlot, setTimeSlot] = useState('9 AM - 12 PM');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    onSubmitComplaint({
      requestType,
      category,
      title: subject.trim(),
      description: description.trim(),
      location: `${block} – Room ${roomNo}`,
      timeSlot,
      urgency: 'Medium'
    });

    onClose();
    setSubject('');
    setDescription('');
  };

  const categories = [
    "Plumbing",
    "Electricity",
    "Carpentry",
    "Water Cooler / RO",
    "Air Cooler / Geyser",
    "Civil & Seepage"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="theme-card rounded-[20px] theme-border border shadow-2xl max-w-lg w-full overflow-hidden theme-text-primary">
        
        {/* Real LPU RMS Top Header Bar */}
        <div className="p-5 sm:p-6 border-b theme-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl pill-accent flex items-center justify-center text-[#F48120] font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold theme-text-primary">
                RMS - Maintenance Request
              </h3>
              <p className="text-[11px] theme-text-secondary mt-0.5">
                Log New Hostel Maintenance Request
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="theme-text-secondary hover:theme-text-primary p-2 rounded-xl btn-outline-neutral transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Real LPU RMS Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
          
          {/* Radio Buttons: Assistance | Grievance | Enquiry | Feedback */}
          <div>
            <label className="block text-[11px] font-bold theme-text-secondary uppercase mb-2">
              Request Type*
            </label>
            <div className="flex flex-wrap gap-4 text-xs">
              {['Assistance', 'Grievance', 'Enquiry', 'Feedback'].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer font-medium theme-text-primary">
                  <input
                    type="radio"
                    name="requestType"
                    value={type}
                    checked={requestType === type}
                    onChange={(e) => setRequestType(e.target.value)}
                    className="accent-[#F48120] w-3.5 h-3.5"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-[11px] font-bold theme-text-secondary uppercase mb-1.5">
              Category*
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl theme-border border theme-card theme-text-primary outline-none focus:border-[#F48120]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Block & Room No */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold theme-text-secondary uppercase mb-1.5">
                Block*
              </label>
              <select
                value={block}
                onChange={(e) => setBlock(e.target.value)}
                className="w-full p-2.5 rounded-xl theme-border border theme-card theme-text-primary outline-none focus:border-[#F48120]"
              >
                <option value="Hostel B">Hostel B</option>
                <option value="Hostel A">Hostel A</option>
                <option value="Hostel C">Hostel C</option>
                <option value="Girls Hostel 1">Girls Hostel 1</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold theme-text-secondary uppercase mb-1.5">
                Room No*
              </label>
              <input
                type="text"
                value={roomNo}
                onChange={(e) => setRoomNo(e.target.value)}
                className="w-full p-2.5 rounded-xl theme-border border theme-card theme-text-primary outline-none focus:border-[#F48120]"
                required
              />
            </div>
          </div>

          {/* Preferred Time Slot */}
          <div>
            <label className="block text-[11px] font-bold theme-text-secondary uppercase mb-1.5">
              Preferred Time Slot*
            </label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full p-2.5 rounded-xl theme-border border theme-card theme-text-primary outline-none focus:border-[#F48120]"
            >
              <option value="9 AM - 12 PM">9:00 AM - 12:00 PM (Morning Slot)</option>
              <option value="2 PM - 5 PM">2:00 PM - 5:00 PM (Afternoon Slot)</option>
              <option value="5 PM - 8 PM">5:00 PM - 8:00 PM (Evening Slot)</option>
            </select>
          </div>

          {/* Subject / Title */}
          <div>
            <label className="block text-[11px] font-bold theme-text-secondary uppercase mb-1.5">
              Subject*
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Geyser water not heating / Door latch broken..."
              className="w-full p-2.5 rounded-xl theme-border border theme-card theme-text-primary outline-none focus:border-[#F48120]"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-bold theme-text-secondary uppercase mb-1.5">
              Description*
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide exact room location details and symptoms..."
              rows={3}
              className="w-full p-2.5 rounded-xl theme-border border theme-card theme-text-primary outline-none focus:border-[#F48120]"
              required
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-[var(--border-card)]/50 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs theme-text-secondary hover:theme-text-primary font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-lpu-gradient text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 hover:opacity-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Request</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
