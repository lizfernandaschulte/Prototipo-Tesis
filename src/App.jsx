import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import CartaPage from './pages/carta/CartaPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout>
            <CartaPage />
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App