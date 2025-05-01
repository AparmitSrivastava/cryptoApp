import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';  // Use Switch instead of Routes
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import Coinpage from './Pages/Coinpage';
import { makeStyles } from '@material-ui/styles';

function App() {
  const [count, setCount] = useState(0);

  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Switch>  {/* Replace Routes with Switch */}
          <Route exact path="/" component={Homepage} />  {/* Use component prop */}
          <Route exact path="/coins/:id" component={Coinpage} />  {/* Use component prop */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
