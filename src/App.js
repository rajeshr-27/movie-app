 import '../src/App.css'
 import 'bootstrap/dist/css/bootstrap.min.css';
 import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Movie from './components/Movie';
import Home from './components/Home';
import WatchMovie from './components/WatchMovie';
import Register from './components/Register';
import Login from './components/Login';
import {Provider} from 'react-redux';
import store from './redux/app/store';
import ProtectedRoute from './components/ProtectedRoute';
 function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Header />} >
                <Route path="/" element={<Home />} ></Route>              
                <Route path="/watch-movie/:id" element={<WatchMovie />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                {/* Protected Routes */}
                <Route path='/' element={<ProtectedRoute />} >
                  <Route path="/movies" element={<Movie />}></Route>
                </Route>
                
            </Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
