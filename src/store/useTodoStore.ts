import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 🧩 Define your Todo type
interface Todo {
  id: number
  taskName: string
  taskDesc: string
  status: string
  date: string // ISO string or formatted date
}

// 🧠 Store state and actions
interface TodoState {
  todos: Todo[]
  addTodo: (taskName: string, taskDesc: string, status?: string) => void
  updateTodo: (id: number, taskName: string, taskDesc: string, status?: string) => void
  // updateTodo:(id:number,taskName: string, taskDesc: string) => void
  removeTodo: (id: number) => void
  clearAll: () => void
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [{
        id: 1,
        taskName: "Creating new task",
        taskDesc: "Creating new task for TM",
        status: "Pending",
        date: new Date().toISOString(),
      }],

      // 🟢 Add a new todo
      addTodo: (taskName, taskDesc, status = 'Pending') =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now(),
              taskName,
              taskDesc,
              status,
              date: new Date().toISOString(),
            },
          ],
        })),

      // 🟡 Update a todo's status
      // updateStatus: (id, status) =>
      //   set((state) => ({
      //     todos: state.todos.map((todo) =>
      //       todo.id === id ? { ...todo, status } : todo
      //     ),
      //   })),

      updateTodo: (id, taskName, taskDesc, status) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? {
                ...todo,
                taskName: taskName ?? todo.taskName,
                taskDesc: taskDesc ?? todo.taskDesc,
                status: status ?? todo.status,
              }
              : todo
          ),
        })),



      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      // ⚫ Clear all todos
      clearAll: () => set({ todos: [] }),
    }),
    {
      name: 'todo-storage', // persist in localStorage
    }
  )
)
