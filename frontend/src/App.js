import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import CarScreen from './screens/CarScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import CarListScreen from './screens/CarListScreen'
import CarEditScreen from './screens/CarEditScreen'




const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/car/:id' component={CarScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/carlist' component={CarListScreen} />
          <Route path='/admin/car/:id/edit' component={CarEditScreen} />
          <Route path='/search/:keyword' component={HomeScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>        
      </main>
      <Footer />
    </Router>
  );
}

export default App;
