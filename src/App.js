import './App.css';
import MvList from './components/MvList';
import MvItem from './components/MvItem';
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<MvList />} />
        <Route path='/MvItem/:movieCd' element={<MvItem />} />
      </Routes>
    </>
  );
}

export default App;