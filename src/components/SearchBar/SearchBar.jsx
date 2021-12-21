// import React from 'react'
// import "./SearchBar.module.css"

// const SearchBar =() => {
//   return (
 
//        <div class="col-md-12 col-lg-8 col-xl-7">
            
//               <div class=" d-flex justify-content-between pt-5">
//         {/* <div class="input-group input-group-lg">
//                   <input type="text" class="form-control form-control-lg" style={{background:"rgba(255,255,255,.1)",color:"white", borderRadius:100}} placeholder="Search"
//                     aria-label="Search" aria-describedby="basic-addon2" />
//                 </div> */}
        
//              </div>
//             </div>
        
//   )
// }

// export default SearchBar

import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

// const useStyles = makeStyles(theme => ({
//   Paper: {
//     borderRadius: 100,
//     marginTop: 30,
//     width: "50%",
//     position: "relative",
    
//   },
//   Input: {
//     width:"90%"
//   }
 
// }))

export default function SearchBar() {

  // const classes = useStyles();

  return (
    <Root
      component="form"
      // className={classes.Paper}
    >
    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon style={{color:"white"}}/>
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search google maps' }}
        style={{width:"70%",color:"white"}}
        // className={classes.Input}
      />
      
     
    </Root>
  );
}

const Root = styled('Paper')(({ theme }) => ({
    borderRadius: 100,
    marginTop: 30,
    width: "50%",
  position: "relative",
  background: "rgba(255,255,255,.1)",
  [theme.breakpoints.down('md')]: {
    width:"100%"
  },
 
}));
