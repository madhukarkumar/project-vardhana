import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Filter, ChevronDown, Search } from 'lucide-react';

const columns = [
  { name: '', width: '40px' },
  { name: 'Company', width: '200px' },
  { name: 'Estimated ARR', width: '150px' },
  { name: 'Funding Stage', width: '150px' },
  { name: 'CEO', width: '150px' },
  { name: 'Recent News', width: '300px' },
];

const data = [
  {
    id: 1,
    company: {
      name: 'SingleStore',
      website: 'singlestore.com'
    },
    estimatedArr: '$100M',
    fundingStage: 'Series E',
    ceo: 'Raj Verma',
    recentNews: 'SingleStore acquired ByteFlow to enhance its...'
  }
];

export function LeadGenerationDetails() {
  return (
    <div className="flex flex-col min-h-screen -m-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-4">
          <Link to="/playbooks" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Lead Generation Details</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">View and manage generated leads</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4 px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            className="h-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Filter className="h-4 w-4" />
          Filter
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 rounded-lg">
          <Plus className="h-4 w-4" />
          Add Lead
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {columns.map((column, i) => (
                <th
                  key={i}
                  className="sticky top-0 bg-white dark:bg-gray-900 text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400"
                  style={{ width: column.width }}
                >
                  <div className="flex items-center gap-2">
                    {column.name}
                    {column.name && <ChevronDown className="h-4 w-4" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="p-4">
                  <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-indigo-600" />
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="text-gray-900 dark:text-white font-medium">{row.company.name}</span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">{row.company.website}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-900 dark:text-white">{row.estimatedArr}</td>
                <td className="p-4">
                  <span className="px-2 py-1 text-sm rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                    {row.fundingStage}
                  </span>
                </td>
                <td className="p-4 text-gray-900 dark:text-white">{row.ceo}</td>
                <td className="p-4 text-gray-600 dark:text-gray-400">{row.recentNews}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}