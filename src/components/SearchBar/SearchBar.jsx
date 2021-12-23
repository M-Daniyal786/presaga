import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';


export default function SearchBar(props) {

  const { search, setSearch } = props;

  return (
    <Root
      component="form"
    >
    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon style={{color:"white"}}/>
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search google maps' }}
        style={{ width: "70%", color: "white" }}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
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
