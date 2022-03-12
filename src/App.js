import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from "./components/Home";
import Search from "./components/search";

const App = () => {
  return (
    <div>
        <Router>
          <Switch>
            <Route path='/search' component={Search}/>
            <Route path='/' component={Home}/>
          </Switch>
        </Router>
    </div>
  );
}

export default App;