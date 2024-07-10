// cookiesReducer.tsx

import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  loginUser: {},
  jobinfo :{},
  profiledata:{},
  postjobdata:{},
  campanyprofiledata:{},
//   datatext:{name:'helo',jobtype:'',aducation:'',address:'',minsal:'',maxsal:'',staff:'',availablity:'',minexp:'',maxexp:'',
// gender:'',english:'',homejob:'',skill:'',suggestskill:'',discrip:'',image:''
// }
};

const cookies = createSlice({
  name: 'cookies',
  initialState,
  reducers: {
    setLoginuser: (state, action) => {
      state.loginUser = action.payload;
    },
    setJobinfo: (state, action) => {
      state.jobinfo = action.payload;
    },
    setProfiledata: (state, action) => {
      state.profiledata = action.payload;
    },
    setPostjobdata: (state, action) => {
      state.postjobdata = { ...state.postjobdata, ...action.payload };
    },
    setcampanyProfiledata: (state, action) => {
      state.campanyprofiledata = action.payload;
    },
    // setdata: (state, action) => {
    //   state.datatext = action.payload;
    // },
    
    
  },
});

export const {setLoginuser,setJobinfo,setProfiledata,setPostjobdata,setcampanyProfiledata} = cookies.actions;
export default cookies.reducer;
