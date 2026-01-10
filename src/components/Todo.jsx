import { useEffect, useState } from "react";
import API from "../api";
import { logout } from "../utils/auth";

const Todo = ({ setAuth }) => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [filter, setFilter] = useState("all");

  // fetch todos
  const fetchTodos = async () => {
    const res = await API.get("/todos");
    setTodos(res.data);
  };

  // add todo
  const addTodo = async () => {
    if (!title.trim()) return;
    await API.post("/todos", { title });
    setTitle("");
    fetchTodos();
  };

  // delete todo
  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    fetchTodos();
  };

  // toggle completed
  const toggleTodo = async (todo) => {
    await API.put(`/todos/${todo.id}`, {
      completed: !todo.completed,
    });
    fetchTodos();
  };

  // update title
  const updateTodo = async (todo) => {
    if (!editTitle.trim()) return;

    await API.put(`/todos/${todo.id}`, {
      title: editTitle,
    });

    setEditingId(null);
    setEditTitle("");
    fetchTodos();
  };

  // filter todos
  const getFilteredTodos = () => {
    if (filter === "active") {
      return todos.filter((todo) => todo.completed === false);
    }
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed === true);
    }
    return todos;
  };

  // logout
  const handleLogout = () => {
    logout();
    setAuth("login");
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="relative bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        
        {/* Logout */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 text-sm text-red-500 hover:text-red-700 font-medium"
        >
          Logout
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">
          ✅ Todo App
        </h2>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-4">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded ${
                filter === f ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Add todo */}
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new todo"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {/* Todo list */}
        <div className="space-y-2">
          {getFilteredTodos().map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-2 bg-gray-50 p-2 rounded"
            >
              <input
                type="checkbox"
                checked={todo.completed === true}
                onChange={() => toggleTodo(todo)}
              />

              {editingId === todo.id ? (
                <>
                  <input
                    className="flex-1 border rounded px-2 py-1"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <button
                    onClick={() => updateTodo(todo)}
                    className="text-green-600"
                  >
                    💾
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-red-500"
                  >
                    ✖
                  </button>
                </>
              ) : (
                <>
                  <span
                    className={`flex-1 ${
                      todo.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.title}
                  </span>

                  <button
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditTitle(todo.title);
                    }}
                    className="text-blue-500"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500"
                  >
                    🗑
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
