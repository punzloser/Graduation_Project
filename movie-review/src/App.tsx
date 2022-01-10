import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Menu } from './Components/MovieComponent/Menu';
import routes from './routing';
import { ValidateCharacter } from './Components/Utilities/ValidateCharacter';
import { useState } from 'react';
import claim from './Components/Security/IAuth';
import { AuthenContext } from './Components/Security/AuthenContext';

ValidateCharacter();

function App() {

  const [claims, setClaims] = useState<claim[]>([
    { name: 'role', value: 'user' },
    // { name: 'role', value: 'admin' }
  ]);

  return (

    <Router>

      <AuthenContext.Provider value={{ claims: claims, update: setClaims }}>
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
      </AuthenContext.Provider>

    </Router>

  );
}

export default App;
