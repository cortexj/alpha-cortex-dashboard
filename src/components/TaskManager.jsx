import React, { useState } from 'react';
import { Plus, Search, Filter, CheckCircle2, Circle, Trash2, Edit, Clock } from 'lucide-react';
import useProductivityStore from '../store/useProductivityStore';

const TaskManager = () => {
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useProductivityStore();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed);
    
    return matchesSearch && matchesFilter;
  });
  
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle.trim(),
        description: '',
        priority: 'medium',
        category: 'general'
      });
      setNewTaskTitle('');
      setIsAddingTask(false);
    }
  };
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-300 bg-red-50';
      case 'medium': return 'border-yellow-300 bg-yellow-50';
      case 'low': return 'border-green-300 bg-green-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="glass-effect rounded-2xl p-6 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-accent-500/5 to-success-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Task Manager</h2>
          <button
            onClick={() => setIsAddingTask(true)}
            className="button-micro flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="flex gap-2">
            {['all', 'active', 'completed'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  filter === filterType
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Add Task Form */}
        {isAddingTask && (
          <form onSubmit={handleAddTask} className="mb-6 p-4 bg-white rounded-xl border border-gray-200">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter task title..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                autoFocus
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-success-500 text-white rounded-lg hover:bg-success-600 transition-colors duration-200"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAddingTask(false);
                  setNewTaskTitle('');
                }}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        
        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <Circle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-500 mb-2">No tasks found</h3>
              <p className="text-gray-400">
                {searchTerm ? 'Try adjusting your search' : 'Start by adding your first task!'}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  task.completed 
                    ? 'bg-success-50 border-success-200' 
                    : getPriorityColor(task.priority)
                }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="flex-shrink-0 transition-all duration-200 hover:scale-110"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-success-600" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 hover:text-primary-500" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <h3 className={`font-medium ${
                      task.completed ? 'text-gray-500 line-through' : 'text-gray-800'
                    }`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(task.createdAt)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.priority === 'high' ? 'bg-red-100 text-red-700' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {task.priority} priority
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;