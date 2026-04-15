import React from 'react';
import { X, AlignLeft, Tag, Calendar, Users, Activity } from 'lucide-react';

export const CardModal = ({ card, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900/90 border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
          <h2 className="text-2xl font-bold text-white tracking-wide">{card.title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-8 custom-scrollbar">
          
          {/* Main Info (Left Col) */}
          <div className="md:col-span-3 space-y-8 text-gray-300">
            {/* Description */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-white font-semibold text-lg">
                <AlignLeft size={20} className="text-indigo-400" />
                Description
              </div>
              <textarea 
                className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 transition-colors"
                placeholder="Add a more detailed description (Markdown supported)..."
                defaultValue={"## Implement UI\nEnsure glassmorphism looks clean.\n- Add shadows\n- Fix border opacities"}
                onBlur={(e) => console.log('API: Update Description', e.target.value)}
              />
            </div>

            {/* Activity / Comments Placeholder */}
            <div>
              <div className="flex items-center gap-2 mb-4 text-white font-semibold text-lg">
                <Activity size={20} className="text-indigo-400" />
                Activity
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">Me</div>
                <input 
                  type="text" 
                  placeholder="Write a comment..." 
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Sidebar Info (Right Col) */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                <Users size={14} /> Assignees
              </h4>
              <div className="flex items-center gap-2 flex-wrap">
                {card.assignees.length ? card.assignees.map(a => (
                  <div key={a} className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs shadow-lg">U</div>
                )) : <span className="text-sm text-gray-500">Unassigned</span>}
                <button className="w-8 h-8 rounded-full border border-dashed border-gray-500 flex items-center justify-center hover:border-white hover:text-white transition-colors text-gray-500">+</button>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                <Tag size={14} /> Labels
              </h4>
              <div className="flex flex-wrap gap-2">
                {card.labels.map(l => (
                   <span key={l} className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-md text-xs font-semibold">{l}</span>
                ))}
                 <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1 rounded-md text-xs font-semibold text-gray-300 transition-colors">+</button>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                <Calendar size={14} /> Due Date
              </h4>
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-2 text-sm text-left text-gray-300 transition-colors">
                Select Date...
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};