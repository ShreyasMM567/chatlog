import React from 'react';
import { motion } from 'framer-motion';

export function LoadingMoreIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="flex items-center justify-center py-3 px-4 bg-gray-50 border-b border-gray-200"
    >
      <div className="flex items-center space-x-2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-4 h-4 border-2 border-[#25d366] border-t-transparent rounded-full"
        />
        <span className="text-sm text-gray-600 font-medium">
          Loading more messages...
        </span>
      </div>
    </motion.div>
  );
}
