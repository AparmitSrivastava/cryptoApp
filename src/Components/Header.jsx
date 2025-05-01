import React from 'react';
import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';  // Use useHistory instead of useNavigate
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: '#ffeb3b',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize:28
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();  // useHistory hook for navigation
  const {currency,setCurrency} =  CryptoState()

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" style={{ backgroundColor: '#225f9b' }}>
        <Container>
          <Toolbar>
            <Typography
              onClick={() => history.push('/')}  // Use history.push for navigation
              className={classes.title}
            >
              CryptoPlace
            </Typography>

             {/* <Link to="/" className={classes.title} style={{ textDecoration: "none", color: "gold" }}>
             CryptoPlace
         </Link> */}
            {/* a tag is not used because it causes full page to reload/re render there jo chize change nhi hui unkr=o bhi rerender hona padta hai */}


            <Select
              variant="outlined"
              defaultValue="USD"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
                color: 'white',
                backgroundColor: '#2b2b2b',
              }}
              value={currency}
              onChange={e=>{setCurrency(e.target.value)}}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
