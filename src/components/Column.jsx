import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { MoreHorizontal, Plus } from 'lucide-react';
import  CardItem  from '../components/CardItem'; 
import cardService from '../../Service/card'

export function Column({ column, setBoard }) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDesc, setNewCardDesc] = useState(''); // NEW: State for description
  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCardTitle.trim() || !newCardDesc) return;
    cardService.createCard({name:newCardTitle.trim(),description:newCardDesc,columnId:column._id}).then((res) => {
      console.log(res)
    })
    const newCard = {
      id: `card-${Date.now()}`,
      _id: `card-${Date.now()}`,
      title: newCardTitle,
      description: newCardDesc || "No description provided.", // Uses the new input
      isPublished: true,
      column: column.id || column._id,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      owner: {
        _id: "user-mock-1",
        name: "Developer",
        avatar: `https://ui-avatars.com/api/?name=Dev&background=6366f1&color=fff&rounded=true`
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setBoard(prev => ({
      ...prev,
      column: prev.column.map(col => 
        (col.id === column.id || col._id === column._id) 
          ? { ...col, cards: [...(col.cards || []), newCard] } 
          : col
      )
    }));

    setNewCardTitle('');
    setNewCardDesc(''); // Reset desc
    setIsAddingCard(false);
  };

  const cardsToRender = column.cards || [];

  return (

    <div className="w-[320px] flex-shrink-0 flex flex-col bg-white/[0.04] border border-white/10 rounded-2xl shadow-2xl max-h-full">

      <div className="p-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-slate-200 tracking-wide">{column.title}</h3>
          <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-full border border-indigo-500/20">
            {cardsToRender.length}
          </span>
        </div>
        <button className="text-slate-400 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Droppable Card List */}
      <Droppable droppableId={column.id || column._id}>
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            // FIX: Removed 'flex flex-col gap-3' from the inner div. Relying on mb-3 from CardItem.
            className={`flex-1 overflow-y-auto p-3 pb-0 min-h-[150px] transition-all duration-300 custom-scrollbar ${
              snapshot.isDraggingOver ? 'bg-indigo-500/[0.03] shadow-[inset_0_0_20px_rgba(99,102,241,0.05)] rounded-lg' : ''
            }`}
          >
            <div className="pb-2">
              {cardsToRender.map((card, index) => (
                <CardItem key={card.id || card._id} card={card} index={index} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>

      {/* Footer (Add Card) */}
      <div className="p-3 border-t border-white/5 mt-auto bg-black/20 rounded-b-2xl">
        {isAddingCard ? (
          <form onSubmit={handleAddCard} className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Title Input */}
            <input
              autoFocus
              type="text"
              placeholder="Task Title..."
              className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-medium text-sm transition-all"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
            />
            {/* Description Textarea */}
            <textarea
              placeholder="Add a detailed description..."
              className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm resize-none transition-all"
              rows={3}
              value={newCardDesc}
              onChange={(e) => setNewCardDesc(e.target.value)}
            />
            <div className="flex gap-2">
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20">
                Save Task
              </button>
              <button type="button" onClick={() => setIsAddingCard(false)} className="text-slate-400 hover:text-white px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-white/5">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button 
            onClick={() => setIsAddingCard(true)}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 font-medium text-sm group"
          >
            <Plus size={18} className="group-hover:scale-110 transition-transform" /> Add a card
          </button>
        )}
      </div>
    </div>
  );
}