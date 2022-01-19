import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Menu } from './Components/MovieComponent/Menu';
import routes from './routing';
import { ValidateCharacter } from './Components/Utilities/ValidateCharacter';
import { useEffect, useState } from 'react';
import claim from './Components/Security/IAuth';
import { AuthenContext } from './Components/Security/AuthenContext';
import { Loading } from './Components/Utilities/Loading';
import { getClaim } from './Components/Security/handleJwt';
import { ConfigInterceptor } from './Components/Utilities/ConfigInterceptor';

ValidateCharacter();
ConfigInterceptor();

function App() {

  const [claims, setClaims] = useState<claim[]>([]);

  const isAdmin = () => {
    return claims.findIndex(claim => claim.name === 'role' && claim.value === 'admin') > -1;
  }

  useEffect(() => {
    setClaims(getClaim());
  }, [])

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
