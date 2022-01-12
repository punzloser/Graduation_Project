import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Menu } from './Components/MovieComponent/Menu';
import routes from './routing';
import { ValidateCharacter } from './Components/Utilities/ValidateCharacter';
import { useState } from 'react';
import claim from './Components/Security/IAuth';
import { AuthenContext } from './Components/Security/AuthenContext';
import { Loading } from './Components/Utilities/Loading';

ValidateCharacter();

function App() {

  const [claims, setClaims] = useState<claim[]>([
    // { name: 'role', value: 'user' },
    // { name: 'role', value: 'admin' }
  ]);

  const isAdmin = () => {
    return claims.findIndex(a => a.name === 'role' && a.value === 'admin') > -1;
  }

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
            >
              {
                route.isAdmin && !isAdmin() ? <Loading check /> :
                  <route.component />
              }
            </Route>
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
