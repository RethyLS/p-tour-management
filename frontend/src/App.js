import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserList from './pages/UserList';
import RegisterPage from './pages/RegisterPage';
import Layout from './pages/Layout';
import CategoryList from './pages/CategoryList';
import ProductList from './pages/ProductList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/products"
          element={
            <Layout>
              <ProductList />
            </Layout>
          }
        />
        <Route
          path="/categories"
          element={
            <Layout>
              <CategoryList />
            </Layout>
          }
        />
        <Route
          path="/users"
          element={
            <Layout>
              <UserList />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
