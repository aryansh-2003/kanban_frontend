import React, { useEffect, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { Plus, X } from 'lucide-react';
import { Column } from '../components/Column';
import columnService from '../../Service/column';
import CardService from '../../Service/card';
import { socket } from '../../Service/socket';

export function Board({ activeBoard, setBoard }) {
  const [isAddingCol, setIsAddingCol] = useState(false);
  const [newColTitle, setNewColTitle] = useState('');

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result; 

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceColIndex = activeBoard.column.findIndex(col => col.id === source.droppableId || col._id === source.droppableId);
    const destColIndex = activeBoard.column.findIndex(col => col.id === destination.droppableId || col._id === destination.droppableId);

    const sourceCol = activeBoard.column[sourceColIndex];
    const destCol = activeBoard.column[destColIndex];

    const sourceCards = [...(sourceCol.cards || [])];
    const destCards = source.droppableId === destination.droppableId ? sourceCards : [...(destCol.cards || [])];

    const [movedCard] = sourceCards.splice(source.index, 1);
    destCards.splice(destination.index, 0, movedCard);

    const newColumnState = [...activeBoard.column];
    newColumnState[sourceColIndex] = { ...sourceCol, cards: sourceCards };
    
    if (source.droppableId !== destination.droppableId) {
      newColumnState[destColIndex] = { ...destCol, cards: destCards };
    }

    setBoard(prev => ({ ...prev, column: newColumnState }));

    socket.emit("cardMoved", {
      boardId: activeBoard._id, 
      cardId: draggableId,
      sourceColId: source.droppableId,
      destColId: destination.droppableId,
      sourceIndex: source.index,
      destIndex: destination.index
    });

    try {
      await CardService.updateCard({
        cardId: draggableId,
        columnId: destination.droppableId,
        source: source.droppableId
      });
    } catch (error) {
      console.error("Failed to sync card position with database:", error);
    }
  };

  useEffect(() => {
    if (!activeBoard || !activeBoard._id) return;

    columnService.getColumn({ boardId: activeBoard._id })
      .then((res) => {
        const fetchedColumns = res.data.data.map(col => ({
          ...col,
          id: col._id, 
          cards: col.cards || [] 
        }));
        setBoard(prev => ({ ...prev, column: fetchedColumns }));
      })
      .catch(err => console.error("Error fetching columns:", err));

    socket.emit("joinBoard", activeBoard._id);

    const handleNewCardMove = (data) => {
      const { cardId, sourceColId, destColId, sourceIndex, destIndex } = data;

      setBoard((prev) => {
        const updatedColumns = JSON.parse(JSON.stringify(prev.column || []));

        const sourceColIdx = updatedColumns.findIndex(col => col.id === sourceColId || col._id === sourceColId);
        const destColIdx = updatedColumns.findIndex(col => col.id === destColId || col._id === destColId);

        if (sourceColIdx === -1 || destColIdx === -1) return prev; // Safety check

        const sCol = updatedColumns[sourceColIdx];
        const dCol = updatedColumns[destColIdx];
        sCol.cards = sCol.cards || [];
        dCol.cards = dCol.cards || [];

        const cardIndex = sCol.cards.findIndex(c => c.id === cardId || c._id === cardId);
        
        if (cardIndex === -1) return prev; 

        const [movedCard] = sCol.cards.splice(cardIndex, 1);

        if (sourceColId === destColId) {
          sCol.cards.splice(destIndex, 0, movedCard);
        } else {
          dCol.cards.splice(destIndex, 0, movedCard);
        }

        return { ...prev, column: updatedColumns };
      });
    };

    socket.on("newCardMove", handleNewCardMove);

    return () => {
      socket.off("newCardMove", handleNewCardMove); // FIX: Was "cardMoved"
      socket.emit("leaveBoard", activeBoard._id);
    };
  }, [activeBoard._id, setBoard]); 

  const handleAddColumn = async (e) => {
    e.preventDefault();
    if (!newColTitle.trim()) return;

    try {
      const res = await columnService.createColumn({ name: newColTitle, boardId: activeBoard._id });
      const newColumnData = res.data?.data || { _id: `temp-col-${Date.now()}`, title: newColTitle };
      const newColumn = { ...newColumnData, id: newColumnData._id, cards: [] };

      setBoard(prev => ({ ...prev, column: [...prev.column, newColumn] }));
      setNewColTitle('');
      setIsAddingCol(false);
    } catch (err) {
      console.error("Error creating column:", err);
    }
  };

  const columnsToRender = activeBoard?.column || [];

  return (
    <div className="p-8 h-screen flex flex-col">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">{activeBoard?.title}</h1>
          <p className="text-slate-400 mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Workspace Active
          </p>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex items-start gap-6 overflow-x-auto pb-8 custom-scrollbar flex-1">
          {columnsToRender.map(column => (
            <Column key={column.id || column._id} column={column} setBoard={setBoard} />
          ))}

          <div className="w-[320px] flex-shrink-0">
            {isAddingCol ? (
              <form onSubmit={handleAddColumn} className="bg-white/5 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-xl">
                <input
                  autoFocus
                  type="text"
                  placeholder="e.g., To Do, In Progress..."
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 mb-3 text-sm"
                  value={newColTitle}
                  onChange={(e) => setNewColTitle(e.target.value)}
                />
                <div className="flex gap-2">
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                    Save List
                  </button>
                  <button type="button" onClick={() => setIsAddingCol(false)} className="text-slate-400 hover:text-white px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-white/5">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button 
                onClick={() => setIsAddingCol(true)}
                className="w-full flex items-center gap-2 p-4 bg-white/[0.02] hover:bg-white/5 border border-dashed border-white/20 rounded-2xl text-slate-400 hover:text-slate-200 transition-all duration-200 font-medium"
              >
                <Plus size={20} /> Add a new list
              </button>
            )}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}