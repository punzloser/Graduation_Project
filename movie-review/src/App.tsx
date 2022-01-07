import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Menu } from './Components/MovieComponent/Menu';
import routes from './routing';
import { ValidateCharacter } from './Components/Utilities/ValidateCharacter';

ValidateCharacter();

function App() {

  return (

    <Router>
      <Menu />
      <Switch>
        {routes.map(route =>
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component} />
        )};
      </Switch>
      <footer className='d-flex justify-content-end bg-dark text-white py-2 rounded-top fixed-bottom'>
        - - - Thanh Vy - Graduation project {new Date().getFullYear()}.
      </footer>
    </Router>

  );
}

export default App;
