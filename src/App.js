import './App.css';
import Homepage from './pages/Homepage'
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import AddUser from './pages/AddUser';
import NoPage from './pages/NoPage';
import NewSplit from './pages/NewSplit'
import ViewSplit from './pages/ViewSplit';
import { GlobalStateProvider } from './GlobalStateContext';

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <GlobalStateProvider>
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route path="/AddUser" element={<AddUser />} />
                <Route path="/NewSplit" element={<NewSplit />} />
                <Route path="/ViewSplit" element={<ViewSplit />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
          </GlobalStateProvider >
        </div>
      </BrowserRouter>
  );
}

export default App;
