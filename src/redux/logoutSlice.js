import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    localStorage.clear();

    return true;
  } catch (error) {
    throw new Error('Something went wrong with the logout');
  }
});

const initialState = {
  status: 'idle',
  error: null,
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null,
      }))
      .addCase(logoutUser.fulfilled, (state) => ({
        ...state,
        status: 'succeeded',
        error: null,
      }))
      .addCase(logoutUser.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

// export const {} = logoutSlice.actions;
export default logoutSlice.reducer;
