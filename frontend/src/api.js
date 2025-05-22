import axios from 'axios';

const API = axios.create({
  baseURL: 'https://todo-summary-assistant-tykp.onrender.com',
});

export const getTodos = () => API.get('/todos');
export const addTodo = (title) => API.post('/todos', { title });
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
export const summarizeTodos = () => API.post('/summarize');
