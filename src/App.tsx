import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Learn from './pages/Learn'
import Teacher from './pages/Teacher'
import About from './pages/About'

export default function App() {
  const location = useLocation()
  return (
    <div key={location.pathname} className="animate-fadeIn">
      <Routes location={location}>
        <Route path="/" element={<Landing />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}
