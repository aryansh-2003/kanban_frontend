import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { MoreHorizontal, Plus, MessageSquare, Paperclip, AlignLeft, Calendar, Layout } from 'lucide-react';
import {Board} from '../components/Board'
import boardService from "../../Service/board"
import { useParams } from 'react-router';



export default function KanbanApp() {
  const [board, setBoard] = useState(); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#1a1c2c] to-slate-900 font-sans text-slate-200">
      {!board ? (
        <CreateBoardState setBoard={setBoard} />
      ) : (
        <Board activeBoard={board} setBoard={setBoard} />
      )}
    </div>
  );
}


 function CreateBoardState ({ setBoard }) {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
    const {id} = useParams()
    useEffect(() => {
      if(!id) return
        boardService.getBoards({workSpaceId:id}).then((res)=>{
          console.log(res)
          setBoard(res?.data?.data?.[0])
          console.log(res?.data?.data?.[0])
        }).catch((err) => {console.log(err)})
    },[id])


  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    const res  = await boardService.createBoard({name:title,workSpaceId:id})
    console.log(res)
    // Create the new board with an empty columns array
    setBoard({
      id: `board-${Date.now()}`,
      title: title,
      columns: [] 
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 rounded-3xl text-center max-w-md w-full shadow-2xl">
        <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-indigo-500/20">
          <Layout size={32} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Create your board</h2>
        <p className="text-slate-400 mb-8 text-sm leading-relaxed">
          Start by creating a board for your project. You can add lists and cards later to organize your workflow.
        </p>
        
        {isCreating ? (
          <form onSubmit={handleCreate} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <input
              autoFocus
              type="text"
              placeholder="e.g., Software Development"
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex gap-3">
              <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/25">
                Create
              </button>
              <button type="button" onClick={() => setIsCreating(false)} className="px-5 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-xl transition-colors">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button 
            onClick={() => setIsCreating(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 w-full transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
          >
            <Plus size={20} /> New Workspace
          </button>
        )}
      </div>
    </div>
  );
}