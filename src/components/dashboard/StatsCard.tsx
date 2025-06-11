import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  index: number;
}

export default function StatsCard({ title, value, icon, index }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="card"
    >
      <div className="flex items-center">
        <div className="rounded-lg p-3 bg-indigo-100 text-indigo-600">
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-semibold text-slate-800 mt-1">{value}</h3>
        </div>
      </div>
    </motion.div>
  );
}
