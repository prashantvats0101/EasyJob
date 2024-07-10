
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedImage: null,
  loading: false,
  logindata :{},
  userId: null,
  getJobDetail:{},
  itemDetail:{},
  likedjobdata:{},
  applyedjobdata:{}
};

const sliceReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setLogindata(state, action) {
      state.logindata = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setgetJobDetail(state, action) {
      state.getJobDetail = action.payload;
    },
    setItemDetail(state, action) {
      state.itemDetail = action.payload;
    },
    setLikedJobdata(state, action) {
      state.likedjobdata = action.payload;
    },
    setApplyedJobData(state, action) {
      state.applyedjobdata = action.payload;
    },
  }
});

export const { setLoading,setLogindata ,setUserId,setgetJobDetail,setItemDetail,setLikedJobdata,setApplyedJobData} = sliceReducer.actions;
export default sliceReducer.reducer;
