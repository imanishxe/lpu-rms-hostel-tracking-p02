import React, { useState } from 'react';
import { X, Star, CheckCircle2, Sparkles } from 'lucide-react';

export default function FeedbackModal({ isOpen, onClose, complaint, onSubmitFeedback }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState(['Fixed on First Visit', 'Transparent Delay Updates']);
  const [comment, setComment] = useState('The issue was resolved properly and transparent updates helped me schedule my classes.');

  if (!isOpen || !complaint) return null;

  const quickTags = [
    "Fixed on First Visit",
    "Polite & Professional Tech",
    "Cleaned Work Area",
    "Transparent Delay Updates",
    "Accurate Completion Window",
    "Quick Two-Way Verification"
  ];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitFeedback(complaint.id, {
      rating,
      tags: selectedTags,
      comment: comment.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="theme-card rounded-[20px] theme-border border shadow-2xl max-w-lg w-full overflow-hidden theme-text-primary">
        
        {/* Header */}
        <div className="p-5 sm:p-6 flex items-center justify-between border-b theme-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold theme-text-primary">
                Resolution Verified · Rate Service (FIX-08)
              </h3>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                Closing the Loop: Evaluating Hostel Maintenance Quality
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
          
          <div className="theme-subtle p-4 rounded-xl theme-border border text-center">
            <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block">
              Ticket: {complaint.id} · {complaint.location}
            </span>
            <p className="font-bold theme-text-primary text-sm mt-1">
              {complaint.title}
            </p>
            <p className="text-[11px] theme-text-secondary mt-1">
              Technician: <strong className="theme-text-primary">{complaint.assignedTechnician}</strong> ({complaint.assignedUnit})
            </p>
          </div>

          {/* Star Rating */}
          <div className="text-center py-2">
            <label className="block font-bold theme-text-secondary uppercase mb-2">
              Overall Maintenance Satisfaction:
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-115 transition-transform"
                >
                  <Star 
                    className={`w-7 h-7 ${
                      star <= (hoverRating || rating) 
                        ? 'fill-amber-400 text-amber-400' 
                        : 'text-stone-300 dark:text-stone-600'
                    } transition-colors`} 
                  />
                </button>
              ))}
            </div>
            <span className="inline-block mt-2 font-bold text-xs theme-text-primary">
              {rating === 5 && "⭐ Outstanding Service"}
              {rating === 4 && "👍 Good & Timely Fix"}
              {rating === 3 && "👌 Acceptable"}
              {rating === 2 && "⚠️ Needs Improvement"}
              {rating === 1 && "❌ Unsatisfactory"}
            </span>
          </div>

          {/* Quick Tags */}
          <div>
            <label className="block font-bold theme-text-secondary uppercase mb-2">
              Select Highlights (Multi-select)
            </label>
            <div className="flex flex-wrap gap-2">
              {quickTags.map((tag, i) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-2 rounded-xl text-[11px] font-semibold border transition-all ${
                      isSelected
                        ? 'pill-accent border-[#F48120] text-[#F48120]'
                        : 'theme-subtle theme-border theme-text-secondary hover:theme-text-primary'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block font-bold theme-text-secondary uppercase mb-1.5">
              Feedback Remarks for Hostel Warden &amp; Supervisor
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share what went well or what could be improved..."
              rows={2}
              className="w-full p-3 rounded-xl theme-border border theme-text-primary theme-card focus:border-[#F48120] outline-none"
            />
          </div>

          <div className="pt-3 border-t border-[var(--border-card)]/50 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 theme-text-secondary hover:theme-text-primary font-semibold text-xs"
            >
              Skip
            </button>
            <button
              type="submit"
              className="btn-lpu-gradient px-5 py-2.5 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5 hover:opacity-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Submit Feedback</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
