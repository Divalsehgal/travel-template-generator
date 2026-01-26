import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Projects() {
  const [projects, setProjects] = useState(() => {
    // Load from localStorage or use default
    const saved = localStorage.getItem('projects');
    const defaultProject = {
      id: 'shiv-bhoomi-trek',
      name: 'Shiv Bhoomi Trek',
      description: 'Professional trek itinerary template with day-by-day details',
      category: 'Tour & Travel',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      color: 'from-green-600 to-teal-600'
    };
    
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure default project exists
      if (!parsed.find(p => p.id === 'shiv-bhoomi-trek')) {
        return [defaultProject, ...parsed];
      }
      return parsed;
    }
    return [defaultProject];
  });

  useEffect(() => {
    // Save to localStorage whenever projects change
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const handleCreateProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-forest-green text-white py-12">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-black mb-2">Template Projects</h1>
              <p className="text-white/80">Choose a template to start creating your PDF</p>
            </div>
            <Link
              to="/projects/new"
              className="bg-white text-forest-green px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              New Project
            </Link>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
            >
              <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-6xl">description</span>
                </div>
              </div>
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-glacier-blue/10 text-glacier-blue text-xs font-bold uppercase rounded-full mb-3">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold mb-2 text-forest-green group-hover:text-glacier-blue transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                <div className="flex items-center gap-2 text-glacier-blue font-semibold">
                  <span>Open Editor</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon Card */}
        <div className="mt-8 bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
          <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">add_circle</span>
          <h3 className="text-xl font-bold text-gray-400 mb-2">Create Your Own Template</h3>
          <p className="text-gray-500 mb-4">Click "New Project" button above to get started</p>
        </div>
      </div>
    </div>
  );
}
