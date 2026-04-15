import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Loader2 } from 'lucide-react';
import {WorkspaceCard} from '../components/WorkspaceCard';
import { CreateWorkspaceModal } from '../components/CreateWorkspace';
import workSpaceService from '../../Service/workspace';
import {socket} from '../../Service/socket.js';
import { useSelector } from 'react-redux';

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const userData = useSelector(state => state.auth.userData)
  
  // Fetch real data on mount
  const fetchWorkspaces = async () => {
    try {
      setIsLoading(true);
      const res = await workSpaceService.getworkspaces();
        if (res?.data?.data) {
        setWorkspaces(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const handleCreateWorkspace = async (title) => {
    try {
      const response = await workSpaceService.createworkspace({ name: title });
      setIsModalOpen(false);
      const New_workspace = {
        name: title,
        members:[],
        owner:{
          avatar:userData?.avatar,
          fullname:userData?.fullname,
          _id:userData._id,
        },
        slug:title,
        _id: Date.now()
      }

      socket.emit("newWorkspace",(New_workspace))
      
      if (response?.data?.data) {
             const New_workspace = {
            name: title,
            members:[],
            owner:{
              avatar:userData?.avatar,
              fullname:userData?.fullname,
              _id:userData._id,
            },
            slug:title,
            _id: response?.data?.data._id
          }

      socket.emit("newWorkspace",(New_workspace))
        console.log(response?.data?.data._id)
      } else {
        fetchWorkspaces(); 
      }
    } catch (error) {
      console.error("Failed to create workspace:", error);
    }
  };

  socket.on("newWorkspaceNotification",(data) => {
    setWorkspaces([data, ...workspaces]);

  })
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-6 md:p-12 font-sans overflow-hidden relative">
      
      {/* Decorative ambient background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse delay-700"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6"
        >
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight">
              Workspaces
            </h1>
            <p className="text-white/60 mt-2 text-sm md:text-base">
              Manage your collaborative Kanban boards and teams.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white px-5 py-3 rounded-xl shadow-lg transition-all font-medium"
          >
            <Plus size={18} />
            <span>New Workspace</span>
          </motion.button>
        </motion.header>

        {/* Content Area */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-white/50">
             <Loader2 size={40} className="animate-spin mb-4 text-purple-400" />
             <p>Loading your workspaces...</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {workspaces.map((workspace) => (
              <WorkspaceCard key={workspace._id} workspace={workspace} />
            ))}
            
            {workspaces.length === 0 && (
              <div className="col-span-full text-center py-12 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-white/60">No workspaces found. Create one to get started!</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Create Workspace Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <CreateWorkspaceModal 
            onClose={() => setIsModalOpen(false)} 
            onSubmit={handleCreateWorkspace} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}