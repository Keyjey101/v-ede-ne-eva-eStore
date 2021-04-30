import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import  AppRouter  from './components/AppRouter';
import  NavBar  from './components/NavBar';
import LogoStore from './images/logo.svg'
import { Image, Container } from 'react-bootstrap';
import { MAIN_ROUTE } from './utils/constants';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from './index';
import { check } from './http/userAPI';

import CircularProgress from '@material-ui/core/CircularProgress';



const App = observer(() => {
  const {user} = useContext(Context)

  const [load, setLoad] = useState(true)

  useEffect(()=> {

check().then( data => {
  
  user.setUser({email: data.email, role: data.role})
  user.setIsAuth(true)
  
}).finally(() => {setLoad(false)})


  },[user])

  if (load) {
    return <CircularProgress />
  }

  return (
    
    <BrowserRouter>
    
    <NavBar />
    <Container>
   <a href={MAIN_ROUTE}><Image  className='logo-img' src={LogoStore}/></a> 
    </Container>
    <AppRouter />
    </BrowserRouter>
  );
})

export default App;
