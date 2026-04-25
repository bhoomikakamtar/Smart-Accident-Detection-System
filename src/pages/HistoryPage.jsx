import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  MapPin, 
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { cn } from '../lib/utils';

const mockHistory = [
  { id: 1, date: '2026-04-20', time: '14:32', severity: 'Critical', type: 'High Impact Collision', location: '19.0760° N, 72.8777° E', status: 'Resolved' },
  { id: 2, date: '2026-04-18', time: '09:15', severity: 'Low', type: 'Minor Fall', location: '19.0821° N, 72.8890° E', status: 'Resolved' },
  { id: 3, date: '2026-04-12', time: '18:45', severity: 'Medium', type: 'Skid Detection', location: '19.1234° N, 72.9123° E', status: 'Resolved' },
  { id: 4, date: '2026-03-25', time: '11:20', severity: 'High', type: 'Vehicle Tilted', location: '19.0567° N, 72.8456° E', status: 'Resolved' },
  { id: 5, date: '2026-03-10', time: '22:10', severity: 'Critical', type: 'Head-on Collision', location: '19.0987° N, 72.8678° E', status: 'Resolved' },
];

const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Incident History</h1>
          <p className="text-gray-400">View and export past accident logs and alerts</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-dark-900 transition-all hover:bg-gray-100 active:scale-95">
          <Download size={18} />
          Export Reports
        </button>
      </div>

      <div className="glass-panel overflow-hidden rounded-[2rem]">
        {/* Table Controls */}
        <div className="flex flex-col gap-4 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-sm text-white outline-none focus:border-accent-blue/50"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-gray-300 hover:text-white">
              <Calendar size={16} />
              Last 30 Days
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-gray-300 hover:text-white">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Incident Type</th>
                <th className="px-6 py-4">Severity</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockHistory.map((item) => (
                <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">{item.date}</span>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-300">{item.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase",
                      item.severity === 'Critical' ? "bg-red-500/10 text-red-500" :
                      item.severity === 'High' ? "bg-orange-500/10 text-orange-500" :
                      item.severity === 'Medium' ? "bg-yellow-500/10 text-yellow-500" :
                      "bg-green-500/10 text-green-500"
                    )}>
                      <AlertCircle size={12} />
                      {item.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MapPin size={14} className="text-accent-blue" />
                      {item.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-accent-green font-semibold">
                      <CheckCircle2 size={14} />
                      {item.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="rounded-lg p-2 text-gray-500 hover:bg-white/5 hover:text-white transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-white/10 p-6">
          <span className="text-xs text-gray-500">Showing 1 to 5 of 24 entries</span>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-white/10 p-2 text-gray-500 hover:bg-white/5 disabled:opacity-30">
              <ChevronLeft size={18} />
            </button>
            <button className="rounded-lg border border-white/10 p-2 text-gray-500 hover:bg-white/5">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
