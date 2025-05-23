
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Initialize state from localStorage if available
const getInitialState = (): AuthState => {
  const storedAuth = localStorage.getItem("isAuthenticated");
  const storedUser = localStorage.getItem("user");
  
  return {
    isAuthenticated: storedAuth === "true",
    user: storedUser ? JSON.parse(storedUser) : null,
    loading: false,
    error: null
  };
};

// Async thunks for API operations
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", { email, password });
      
      // Store in localStorage for session persistence
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(response.data));
      
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(error instanceof Error ? error.message : "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/register", { name, email, password });
      
      // Store in localStorage for session persistence
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(response.data));
      
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      return rejectWithValue(error instanceof Error ? error.message : "Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    logout: (state) => {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      
      state.isAuthenticated = false;
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (!state.user) return;
      
      const updatedUser = {
        ...state.user,
        ...action.payload,
      };
      
      localStorage.setItem("user", JSON.stringify(updatedUser));
      state.user = updatedUser;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Login cases
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Register cases
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const { logout, updateUser, clearError } = authSlice.actions;
export default authSlice.reducer;
