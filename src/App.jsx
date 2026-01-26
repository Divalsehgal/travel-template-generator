import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import ProjectEditor from './pages/ProjectEditor';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/project/:projectId" element={<ProjectEditor />} />
      </Routes>
    </BrowserRouter>
  );
}
