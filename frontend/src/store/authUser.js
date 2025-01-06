import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  isAddTask: false,
  isShowTask: false,
  tasks: [],
  totalTasks: 0, 
  currentPage: 1,
  totalPages: 1,
  isUpdateTask: false,
  isDeleteTask: false,

  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed");
      set({ isSigningUp: false, user: null });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Logged in successfully");
      return true;
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response.data.message || "Login failed");
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },

  addTask: async (taskData) => {
    set({ isAddTask: true });
    try {
      const response = await axios.post('/api/v1/user/add-task', taskData);
      set((state) => ({
        tasks: [...state.tasks, response.data.task], // Add the new task to the existing list
        isAddTask: false,
      }));
      return response.data.task; 
    } catch (error) {
      console.error('Error adding task:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Task creation failed');
      set({ isAddTask: false });
      throw error; 
    }
  },
  
  getAllTasks: async (page = 1, limit = 10) => {
    set({ isShowTask: true });
    try {
      const response = await axios.get(`/api/v1/user/all-tasks?page=${page}&limit=${limit}`);
      set({
        tasks: response.data.tasks,
        totalTasks: response.data.totalTasks,  
        totalPages: response.data.totalPages,
        isShowTask: false,
      });
    } catch (error) {
      toast.error(error.response.data.message || "Failed to load tasks");
      set({ isShowTask: false, tasks: [], totalTasks: 0 });
    }
  },

  getUserTasks: async (page = 1, limit = 10) => {
    set({ isShowTask: true });
    try {
      const response = await axios.get(`/api/v1/user/user-tasks?page=${page}&limit=${limit}`);
      set({
        tasks: response.data.tasks,
        totalTasks: response.data.totalTasks,  
        totalPages: response.data.totalPages,
        isShowTask: false,
      });
    } catch (error) {
      toast.error(error.response.data.message || "Failed to load tasks");
      set({ isShowTask: false, tasks: [], totalTasks: 0 });
    }
  },

updateTask: async (taskId, updatedTask) => {
  set({ isUpdateTask: true });
  try {
    const response = await axios.put(`/api/v1/user/update-task/${taskId}`, updatedTask); 
    set({ isUpdateTask: false, tasks: response.data.tasks }); 
    toast.success("Task updated successfully");
  } catch (error) {
    toast.error(error.response.data.message || "Task update failed");
    set({ isUpdateTask: false });
  }
},

taskCompOrNot: async (taskId, updatedTask) => {
	set({ isUpdateTask: true });
	try {
	  const response = await axios.put(`/api/v1/user/up-task/${taskId}`, updatedTask); 
	  set({ isUpdateTask: false, tasks: response.data.tasks });  
	  toast.success("Task status successfully updated");
	} catch (error) {
	  toast.error(error.response.data.message || "Task update failed");
	  set({ isUpdateTask: false });
	}
  },

deleteTask: async (taskId) => {
	set({ isDeleteTask: true });
	try {
	  const response = await axios.delete(`/api/v1/user/delete-task/${taskId}`); 
	  set({ isDeleteTask: false, tasks: response.data.tasks });
	  toast.success("Task deleted successfully");
	} catch (error) {
	  toast.error(error.response.data.message || "Task delete failed");
	  set({ isDeleteTask: false });
	}
  },


  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Logout failed");
    }
  },

  // Update Profile
  updateProfile: async (profileData) => {
    try {
      const response = await axios.put('/api/v1/auth/update-profile', profileData);
      set({ user: response.data.user }); // Update user in state
      toast.success('Profile updated successfully!');
    } catch (error) {
      throw error;
    }
  },

  // Change Password
  changePassword: async (passwordData) => {
    try {
      await axios.put('/api/v1/auth/change-password', passwordData);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password.');
      throw error;
    }
  },

}));
