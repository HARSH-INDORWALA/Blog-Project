import { useState } from 'react'
import './App.css'
import { Provider, useDispatch } from 'react-redux';
import store from './store/store';

function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch();

  return (
    <>
      
    </>
  )
}

export default App
