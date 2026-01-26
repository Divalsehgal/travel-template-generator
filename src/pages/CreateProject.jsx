import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function CreateProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Project metadata
    name: '',
    description: '',
    category: 'Tour & Travel',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    
    // Header
    phone: '+91 98765 43210',
    email: 'contact@example.com',
    website: 'www.example.com',
    
    // Brand
    brandTitle: '',
    brandSubtitle: 'Tour and Travels',
    
    // Hero
    heroBadge: 'Adventure',
    heroTitle: '',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    duration: '6 Days / 5 Nights',
    altitude: '4,200 Meters',
    difficulty: 'Moderate - Difficult',
    
    // Overview
    overviewText: '',
    
    // Leader
    leaderName: 'John Doe',
    leaderRole: 'Lead Expedition Guide',
    leaderImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    
    // Itinerary (will have 3 default days)
    itinerary: [
      { day: '01', badge: 'Basecamp', title: 'Arrival & Acclimatization', description: 'Arrival and initial briefing', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
      { day: '02', badge: 'Trek Start', title: 'Beginning the Journey', description: 'Start of the main trek', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
      { day: '03', badge: 'Summit', title: 'Reaching the Peak', description: 'Summit day and descent', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' }
    ],
    
    // Inclusions
    inclusions: [
      { icon: 'restaurant', title: 'All Meals', description: 'Breakfast, lunch, and dinner included' },
      { icon: 'camping', title: 'Accommodation', description: 'Tents and camping gear provided' },
      { icon: 'medical_services', title: 'Safety Kit', description: 'First aid and emergency equipment' }
    ],
    
    // Things to Carry
    thingsToCarry: [
      { icon: 'hiking', label: 'Trek Boots' },
      { icon: 'ac_unit', label: 'Warm Jacket' },
      { icon: 'light', label: 'Headlamp' },
      { icon: 'water_bottle', label: 'Water Bottle' }
    ],
    
    // Footer
    footerTitle: 'Begin Your Journey',
    footerDescription: 'Contact us for bookings and more information',
    footerCopyright: '© 2024 Your Company'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectId = formData.name.toLowerCase().replace(/\s+/g, '-');
    
    // Create full content structure
    const projectContent = {
      header: {
        phone: formData.phone,
        email: formData.email,
        website: formData.website
      },
      brand: {
        title: formData.brandTitle || formData.name,
        subtitle: formData.brandSubtitle
      },
      hero: {
        badge: formData.heroBadge,
        title: formData.heroTitle || formData.name,
        image: formData.heroImage,
        stats: {
          duration: formData.duration,
          altitude: formData.altitude,
          difficulty: formData.difficulty
        }
      },
      overview: {
        text: formData.overviewText
      },
      leader: {
        name: formData.leaderName,
        role: formData.leaderRole,
        image: formData.leaderImage
      },
      itinerary: formData.itinerary,
      inclusions: formData.inclusions,
      thingsToCarry: formData.thingsToCarry,
      footer: {
        title: formData.footerTitle,
        description: formData.footerDescription,
        copyright: formData.footerCopyright
      }
    };
    
    // Save project metadata to localStorage
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const newProject = {
      id: projectId,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      thumbnail: formData.thumbnail,
      color: 'from-green-600 to-teal-600',
      createdAt: new Date().toISOString()
    };
    
    // Only add if doesn't exist
    if (!projects.find(p => p.id === projectId)) {
      projects.push(newProject);
      localStorage.setItem('projects', JSON.stringify(projects));
    }
    
    // Save project content
    localStorage.setItem(`project_${projectId}`, JSON.stringify(projectContent));
    
    navigate(`/project/${projectId}`);
  };
  
  const addItineraryDay = () => {
    const newDay = {
      day: String(formData.itinerary.length + 1).padStart(2, '0'),
      badge: 'Day',
      title: 'New Day',
      description: 'Description for this day',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
    };
    setFormData({ ...formData, itinerary: [...formData.itinerary, newDay] });
  };
  
  const removeItineraryDay = (index) => {
    const newItinerary = formData.itinerary.filter((_, i) => i !== index);
    setFormData({ ...formData, itinerary: newItinerary });
  };
  
  const updateItineraryDay = (index, field, value) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setFormData({ ...formData, itinerary: newItinerary });
  };
  
  const addInclusion = () => {
    const newInclusion = { icon: 'check_circle', title: 'New Item', description: 'Description' };
    setFormData({ ...formData, inclusions: [...formData.inclusions, newInclusion] });
  };
  
  const removeInclusion = (index) => {
    const newInclusions = formData.inclusions.filter((_, i) => i !== index);
    setFormData({ ...formData, inclusions: newInclusions });
  };
  
  const updateInclusion = (index, field, value) => {
    const newInclusions = [...formData.inclusions];
    newInclusions[index] = { ...newInclusions[index], [field]: value };
    setFormData({ ...formData, inclusions: newInclusions });
  };
  
  const addThingToCarry = () => {
    const newThing = { icon: 'backpack', label: 'New Item' };
    setFormData({ ...formData, thingsToCarry: [...formData.thingsToCarry, newThing] });
  };
  
  const removeThingToCarry = (index) => {
    const newThings = formData.thingsToCarry.filter((_, i) => i !== index);
    setFormData({ ...formData, thingsToCarry: newThings });
  };
  
  const updateThingToCarry = (index, field, value) => {
    const newThings = [...formData.thingsToCarry];
    newThings[index] = { ...newThings[index], [field]: value };
    setFormData({ ...formData, thingsToCarry: newThings });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Projects
          </Link>
          <button
            type="submit"
            form="create-project-form"
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-bold transition-all"
          >
            Create Project
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <span className="material-symbols-outlined text-white text-3xl">add_circle</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Create New Project</h1>
            <p className="text-gray-600">
              Fill in all the details to create your complete PDF template
            </p>
          </div>

          {/* Form */}
          <form id="create-project-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Basic Info Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                <h2 className="text-xl font-bold text-white">📋 Basic Information</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Project Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="e.g., Manali Trek Adventure"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      <option>Tour & Travel</option>
                      <option>Event Planning</option>
                      <option>Workshop</option>
                      <option>Conference</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="Brief description..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Thumbnail URL</label>
                  <input
                    type="url"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Header Contact Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4">
                <h2 className="text-xl font-bold text-white">📞 Header Contact Information</h2>
              </div>
              <div className="p-6 grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                    placeholder="contact@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Website</label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                    placeholder="www.example.com"
                  />
                </div>
              </div>
            </div>

            {/* Brand Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
                <h2 className="text-xl font-bold text-white">🏷️ Brand Information</h2>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Brand Title</label>
                  <input
                    type="text"
                    value={formData.brandTitle}
                    onChange={(e) => setFormData({ ...formData, brandTitle: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    placeholder="Leave empty to use Project Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Brand Subtitle</label>
                  <input
                    type="text"
                    value={formData.brandSubtitle}
                    onChange={(e) => setFormData({ ...formData, brandSubtitle: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    placeholder="Tour and Travels"
                  />
                </div>
              </div>
            </div>

            {/* Hero Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4">
                <h2 className="text-xl font-bold text-white">🎯 Hero Section</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Hero Title</label>
                    <input
                      type="text"
                      value={formData.heroTitle}
                      onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      placeholder="Leave empty to use Project Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Badge</label>
                    <input
                      type="text"
                      value={formData.heroBadge}
                      onChange={(e) => setFormData({ ...formData, heroBadge: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      placeholder="e.g., High Altitude Expedition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Hero Image URL</label>
                  <input
                    type="url"
                    value={formData.heroImage}
                    onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    placeholder="https://example.com/hero.jpg"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      placeholder="6 Days / 5 Nights"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Max Altitude</label>
                    <input
                      type="text"
                      value={formData.altitude}
                      onChange={(e) => setFormData({ ...formData, altitude: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      placeholder="4,200 Meters"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Difficulty</label>
                    <input
                      type="text"
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      placeholder="Moderate - Difficult"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Overview & Leader Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4">
                <h2 className="text-xl font-bold text-white">📝 Overview & Leader</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Overview Text *</label>
                  <textarea
                    required
                    value={formData.overviewText}
                    onChange={(e) => setFormData({ ...formData, overviewText: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                    placeholder="Detailed overview of the trek..."
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Leader Name</label>
                    <input
                      type="text"
                      value={formData.leaderName}
                      onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Leader Role</label>
                    <input
                      type="text"
                      value={formData.leaderRole}
                      onChange={(e) => setFormData({ ...formData, leaderRole: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                      placeholder="Lead Expedition Guide"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Leader Image URL</label>
                    <input
                      type="url"
                      value={formData.leaderImage}
                      onChange={(e) => setFormData({ ...formData, leaderImage: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                      placeholder="https://example.com/leader.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Itinerary Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">📅 Itinerary</h2>
                <button
                  type="button"
                  onClick={addItineraryDay}
                  className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 font-bold text-sm"
                >
                  + Add Day
                </button>
              </div>
              <div className="p-6 space-y-4">
                {formData.itinerary.map((day, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-lg p-4 relative">
                    <button
                      type="button"
                      onClick={() => removeItineraryDay(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
                    >
                      ×
                    </button>
                    <div className="grid md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Day #</label>
                        <input
                          type="text"
                          value={day.day}
                          onChange={(e) => updateItineraryDay(index, 'day', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="01"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Badge</label>
                        <input
                          type="text"
                          value={day.badge}
                          onChange={(e) => updateItineraryDay(index, 'badge', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Basecamp"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-700 mb-1">Title</label>
                        <input
                          type="text"
                          value={day.title}
                          onChange={(e) => updateItineraryDay(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Day Title"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                        <textarea
                          value={day.description}
                          onChange={(e) => updateItineraryDay(index, 'description', e.target.value)}
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Day description..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Image URL</label>
                        <input
                          type="url"
                          value={day.image}
                          onChange={(e) => updateItineraryDay(index, 'image', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="https://example.com/day.jpg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">✓ Inclusions</h2>
                <button
                  type="button"
                  onClick={addInclusion}
                  className="px-4 py-2 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 font-bold text-sm"
                >
                  + Add Item
                </button>
              </div>
              <div className="p-6 space-y-3">
                {formData.inclusions.map((item, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-lg p-3 relative">
                    <button
                      type="button"
                      onClick={() => removeInclusion(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-sm"
                    >
                      ×
                    </button>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Icon Name</label>
                        <input
                          type="text"
                          value={item.icon}
                          onChange={(e) => updateInclusion(index, 'icon', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="restaurant"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Title</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateInclusion(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="All Meals"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateInclusion(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Details..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Things to Carry Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">🎒 Things to Carry</h2>
                <button
                  type="button"
                  onClick={addThingToCarry}
                  className="px-4 py-2 bg-white text-amber-600 rounded-lg hover:bg-amber-50 font-bold text-sm"
                >
                  + Add Item
                </button>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-3">
                {formData.thingsToCarry.map((item, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-lg p-3 relative">
                    <button
                      type="button"
                      onClick={() => removeThingToCarry(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-sm"
                    >
                      ×
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Icon Name</label>
                        <input
                          type="text"
                          value={item.icon}
                          onChange={(e) => updateThingToCarry(index, 'icon', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="hiking"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Label</label>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => updateThingToCarry(index, 'label', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Trek Boots"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-4">
                <h2 className="text-xl font-bold text-white">📄 Footer</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Footer Title</label>
                    <input
                      type="text"
                      value={formData.footerTitle}
                      onChange={(e) => setFormData({ ...formData, footerTitle: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500"
                      placeholder="Begin Your Journey"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Copyright</label>
                    <input
                      type="text"
                      value={formData.footerCopyright}
                      onChange={(e) => setFormData({ ...formData, footerCopyright: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500"
                      placeholder="© 2024 Your Company"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Footer Description</label>
                  <textarea
                    value={formData.footerDescription}
                    onChange={(e) => setFormData({ ...formData, footerDescription: e.target.value })}
                    rows="2"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500"
                    placeholder="Contact information or call to action..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex gap-4">
                <Link
                  to="/projects"
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-bold text-gray-700 text-center"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-xl font-bold text-center transform hover:scale-105 transition-all"
                >
                  Create Project & Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
