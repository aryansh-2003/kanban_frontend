import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { AlignLeft, Calendar, MessageSquare, Paperclip, Globe2, Lock } from 'lucide-react';

export default function CardItem({ card, index }) {
  const formattedDate = card.dueDate 
    ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(card.dueDate))
    : null;

  return (
    <Draggable draggableId={card.id || card._id} index={index}>
      {(provided, snapshot) => (
        // OUTER DIV: Strictly handles DnD physics. 
        // FIX: Added 'mb-3' here instead of using 'gap' on the parent column.
        <div 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-3" 
          style={provided.draggableProps.style} 
        >
          {/* INNER DIV: Extraordinary Glassmorphism Styling */}
          <div className={`
            group relative p-4 rounded-xl transition-all duration-200
            ${snapshot.isDragging 
              ? 'bg-slate-800/95 backdrop-blur-xl border-indigo-500 shadow-[0_10px_40px_rgba(99,102,241,0.3)] rotate-2 scale-105 cursor-grabbing z-50' 
              : 'bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-md border-white/10 shadow-lg hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] cursor-grab'
            }
            border
          `}>
            
            <div className="flex justify-between items-center mb-3">
              <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border 
                ${card.isPublished 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }
              `}>
                {card.isPublished ? <Globe2 size={12} /> : <Lock size={12} />}
                {card.isPublished ? 'Public' : 'Draft'}
              </div>
            </div>

            <h4 className="text-slate-100 text-sm font-semibold mb-1 leading-snug break-words group-hover:text-indigo-300 transition-colors">
              {card.title}
            </h4>
            
            {card.description && (
              <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4">
                {card.description}
              </p>
            )}
            
            <div className="flex items-center justify-between text-slate-400 text-xs mt-4 pt-3 border-t border-white/5">
              <div className="flex items-center gap-3">
                {card.dueDate && (
                  <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 transition-colors
                    ${new Date(card.dueDate) < new Date() ? 'text-rose-400 bg-rose-500/10' : 'text-slate-300'}
                  `}>
                    <Calendar size={12} /> {formattedDate}
                  </div>
                )}
                <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"><AlignLeft size={14} /></span>
                <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"><MessageSquare size={14} /> 0</span>
              </div>
              
              {card.owner && (
                <div className="flex -space-x-2">
                  <img 
                    src={card.owner.avatar || `https://ui-avatars.com/api/?name=${card.owner.name || 'U'}&background=6366f1&color=fff&rounded=true`} 
                    alt="Owner" 
                    className="w-6 h-6 rounded-full border-2 border-[#1e2136] shadow-sm object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}