import Home from './Pages/Home';
import Signin from './Pages/Signin'
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import MemberDashboard from './Pages/Dashboard/MemberDashboard/MemberDashboard.js';
import Allbooks from './Pages/Allbooks';
import BookDetail from './Pages/BookDetail';
import Model from './Pages/Model';
import Header from './Components/Header';
import AdminDashboard from './Pages/Dashboard/AdminDashboard/AdminDashboard.js';
import { useContext } from "react"
import { AuthContext } from "./Context/AuthContext.js"
import {useSelector} from "react-redux"
import ModelCategory from './Pages/ModelCategory.js';

function App() {
  const { user } = useContext(AuthContext)
  return (
    <Router>
      <Header />
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/signin'>
            {user ? (user.isAdmin ? <Redirect to='/dashboard@admin' />:<Redirect to='/dashboard@member' />) : <Signin />}
          </Route>
          <Route exact path='/dashboard@member'>
            {user ? (user.isAdmin === false ? <MemberDashboard /> : <Redirect to='/' />) : <Redirect to='/' />}
          </Route>
          <Route exact path='/dashboard@admin'>
            {user ? (user.isAdmin === true ? <AdminDashboard /> : <Redirect to='/' />) : <Redirect to='/' />}
          </Route>
          <Route exact path='/books'>
            <Allbooks />
          </Route>
          <Route path='/books/:id'>
            <BookDetail />
          </Route>
          <Route exact path='/model'>
            <Model />
          </Route>
          <Route exact path='/modelCate'>
            <ModelCategory category="Trinh thám" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;