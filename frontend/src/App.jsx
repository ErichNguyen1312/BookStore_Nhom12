import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Books from './pages/Books';
import Login from './pages/Login';
import AddBook from './pages/AddBook';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-book" element={<AddBook />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
