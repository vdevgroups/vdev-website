import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Legal from './pages/Legal'
import ProjectVanthenda from './pages/ProjectVanthenda'
import ProjectVishrea from './pages/ProjectVishrea'
import Labs from './pages/Labs'
import Services from './pages/Services'
import About from './pages/About'
import Builds from './pages/Builds'
import Network from './pages/Network'
import Contact from './pages/Contact'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Cursor } from './components/Cursor'
import { ConsultationModal } from './components/ConsultationModal'
import { ExitIntent } from './components/ExitIntent'

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Cursor />
        <ConsultationModal />
        <ExitIntent />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/builds/vanthenda-paalkaran" element={<ProjectVanthenda />} />
            <Route path="/builds/vishrea-studio" element={<ProjectVishrea />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/builds" element={<Builds />} />
            <Route path="/network" element={<Network />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  )
}

export default App
