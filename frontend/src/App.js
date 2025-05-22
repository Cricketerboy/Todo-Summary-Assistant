import React, { useEffect, useState } from 'react';
import './App.css';
import { getTodos, addTodo, deleteTodo, summarizeTodos } from './api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import SummaryButton from './components/SummaryButton';

function App() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // ✅ new state
  const [summaryText, setSummaryText] = useState('');

  const loadTodos = async () => {
    setFetching(true); // ✅ start spinner
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch {
      setStatus('❌ Failed to load todos.');
    }
    setFetching(false); // ✅ stop spinner
  };

  const handleAdd = async (title) => {
    setLoading(true);
    try {
      await addTodo(title);
      setStatus('✅ Todo added!');
      await loadTodos();
    } catch {
      setStatus('❌ Failed to add todo.');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteTodo(id);
      setStatus('✅ Todo deleted!');
      await loadTodos();
    } catch {
      setStatus('❌ Failed to delete todo.');
    }
    setLoading(false);
  };

  const handleSummarize = async () => {
    setLoading(true);
    setStatus('');
    setSummaryText('');
    try {
      const res = await summarizeTodos();
      setStatus('✅ ' + res.data.message);
      setSummaryText(res.data.summary); 
    } catch {
      setStatus('❌ Failed to send summary to Slack.');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="App">
    <div className="container">
      <h1>📝 Todo Summary Assistant</h1>
      <TodoForm onAdd={handleAdd} />
      
      {fetching ? (
        <div className="spinner-container">
          <div className="custom-spinner"></div>
        </div>
      ) : (
        <>
          <TodoList todos={todos} onDelete={handleDelete} />
          <SummaryButton
            onSummarize={handleSummarize}
            status={status}
            loading={loading}
            summaryText={summaryText}
          />
        </>
      )}
    </div>
  </div>  
  );
}

export default App;
