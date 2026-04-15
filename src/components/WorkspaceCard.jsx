import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Layout, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';

export const WorkspaceCard = ({ workspace }) => {
  // Destructure matching your exact JSON response
  const { _id, name, owner, members, createdAt } = workspace;
  const memberCount = members ? members.length : 0;
  const navigate = useNavigate()
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      onClick={() => navigate(`/workspace/${_id}`)}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative flex flex-col bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/30 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all cursor-pointer overflow-hidden"
    >
=      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

      <div className="flex justify-between items-start mb-4">
        <div className="bg-white/10 p-3 rounded-lg border border-white/10 text-white shadow-inner">
          <Layout size={24} />
        </div>
        <button className="text-white/40 hover:text-white transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      <h3 className="text-xl font-semibold text-white mb-3 truncate">
        {name}
      </h3>
      
      {/* Displaying Real Avatar & Full Name from API */}
      <div className="flex items-center gap-3 mb-6 flex-grow">
        {owner?.avatar ? (
          <img 
            src={owner.avatar} 
            alt={owner.fullname} 
            className="w-8 h-8 rounded-full border border-white/20 object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 border border-white/20 flex items-center justify-center text-white text-xs font-bold">
            {owner?.fullname?.charAt(0) || 'U'}
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-white/50 text-xs">Created by</span>
          <span className="text-white/90 text-sm font-medium">
            {owner?.fullname || owner?.username || 'Unknown User'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-white/50 text-sm border-t border-white/10 pt-4">
        <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md">
          <Users size={14} />
          <span>{memberCount}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={14} />
          <span>
            {new Date(createdAt).toLocaleDateString('en-US', {
               month: 'short', 
               day: 'numeric', 
               year: 'numeric'
            })}
          </span>
        </div>
      </div>
    </motion.div>
  );
};