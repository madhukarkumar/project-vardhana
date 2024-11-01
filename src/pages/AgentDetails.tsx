import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bot, Database, Wrench, Brain, Play, ArrowLeft, Plus, X } from 'lucide-react';

const llmOptions = [
  { id: 'openai', name: 'OpenAI 01', description: 'Most capable model, best for complex tasks' },
  { id: 'llama', name: 'Llama 3.2', description: 'Fast and efficient for most tasks' },
  { id: 'claude', name: 'Claude Sonnet 3.5', description: 'Excellent for analysis and reasoning' },
  { id: 'flux', name: 'Flux 1.2', description: 'Advanced language processing capabilities' },
];

const toolOptions = [
  { id: 'web', name: 'Web Search', description: 'Search and retrieve information from the web' },
  { id: 'browser', name: 'Use Browser', description: 'Process and analyze data' },
  { id: 'social', name: 'Social Media', description: 'Interact with social media platforms' },
  { id: 'email', name: 'Email', description: 'Send and manage email communications' },
];

export function AgentDetails() {
  const { id } = useParams();
  const [selectedLLM, setSelectedLLM] = useState('openai');
  const [dataSources, setDataSources] = useState<string[]>([]);
  const [newDataSource, setNewDataSource] = useState('');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [isTraining, setIsTraining] = useState(false);

  const handleAddDataSource = () => {
    if (newDataSource.trim()) {
      setDataSources([...dataSources, newDataSource.trim()]);
      setNewDataSource('');
    }
  };

  const handleRemoveDataSource = (index: number) => {
    setDataSources(dataSources.filter((_, i) => i !== index));
  };

  const toggleTool = (toolId: string) => {
    setSelectedTools(prev => 
      prev.includes(toolId) 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
  };

  const handleTrain = () => {
    setIsTraining(true);
    // Simulate training process
    setTimeout(() => setIsTraining(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <a href="/agents" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </a>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Configure Agent</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">Customize your agent's capabilities and knowledge</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* LLM Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Language Model</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {llmOptions.map((llm) => (
              <button
                key={llm.id}
                onClick={() => setSelectedLLM(llm.id)}
                className={`flex flex-col p-4 rounded-lg border ${
                  selectedLLM === llm.id
                    ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-400'
                }`}
              >
                <span className="font-medium text-gray-900 dark:text-white">{llm.name}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{llm.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Knowledge */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Knowledge</h2>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newDataSource}
                onChange={(e) => setNewDataSource(e.target.value)}
                placeholder="Enter knowledge source URL or path"
                className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                onClick={handleAddDataSource}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {dataSources.map((source, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2"
                >
                  <span className="text-sm text-gray-900 dark:text-white">{source}</span>
                  <button
                    onClick={() => handleRemoveDataSource(index)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tools</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {toolOptions.map((tool) => (
              <button
                key={tool.id}
                onClick={() => toggleTool(tool.id)}
                className={`flex flex-col p-4 rounded-lg border ${
                  selectedTools.includes(tool.id)
                    ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-400'
                }`}
              >
                <span className="font-medium text-gray-900 dark:text-white">{tool.name}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Train Button */}
        <div className="flex justify-end">
          <button
            onClick={handleTrain}
            disabled={isTraining}
            className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors ${
              isTraining
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500'
            }`}
          >
            {isTraining ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Training...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Train Agent
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}