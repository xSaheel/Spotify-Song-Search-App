import Home from "./components/Home";
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

const App = () => {
  return (
    <div>
        <Router>
          <Switch>
            <Route path='/' component={Home}/>
          </Switch>
        </Router>
    </div>
  );
}

export default App;