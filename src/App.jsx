import { use, useState,useEffect } from 'react'
import './App.css'
import { login, logout } from './store/authSlice';
import { Provider, useDispatch } from 'react-redux';
import { authService } from './appwrite/auth';
import { Header, Footer } from './components/index';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => { 
    authService.getCurrentUser()
      .then((userData) => {
        if(userData){
          dispatch(login({userData}));  
        }
        else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      }); 
  }, []);

  return !loading? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-500 '>
      <div className='w-full block'>
        <Header/>
        
        <Footer/>
      </div>
    </div>
  )  : null;

}

export default App;