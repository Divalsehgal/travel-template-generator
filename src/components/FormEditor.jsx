import { useState, useEffect } from 'react';

export default function FormEditor({ isOpen, onClose, initialData, onSave }) {
  const [formData, setFormData] = useState(initialData);

  // Update form data when initialData changes
  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
    }
  }, [isOpen, initialData]);

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleItineraryChange = (index, field, value) => {
    setFormData(prev => {
      const newItinerary = [...prev.itinerary];
      newItinerary[index] = { ...newItinerary[index], [field]: value };
      return { ...prev, itinerary: newItinerary };
    });
  };

  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, {
        day: `Day ${prev.itinerary.length + 1}`,
        badge: 'TREK',
        title: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
      }]
    }));
  };

  const removeItineraryDay = (index) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  const handleInclusionChange = (index, field, value) => {
    setFormData(prev => {
      const newInclusions = [...prev.inclusions];
      newInclusions[index] = { ...newInclusions[index], [field]: value };
      return { ...prev, inclusions: newInclusions };
    });
  };

  const addInclusion = () => {
    setFormData(prev => ({
      ...prev,
      inclusions: [...prev.inclusions, {
        icon: 'check_circle',
        title: '',
        description: ''
      }]
    }));
  };

  const removeInclusion = (index) => {
    setFormData(prev => ({
      ...prev,
      inclusions: prev.inclusions.filter((_, i) => i !== index)
    }));
  };

  const handleThingsToCarryChange = (index, field, value) => {
    setFormData(prev => {
      const newThings = [...prev.thingsToCarry];
      newThings[index] = { ...newThings[index], [field]: value };
      return { ...prev, thingsToCarry: newThings };
    });
  };

  const addThingToCarry = () => {
    setFormData(prev => ({
      ...prev,
      thingsToCarry: [...prev.thingsToCarry, {
        icon: 'backpack',
        label: ''
      }]
    }));
  };

  const removeThingToCarry = (index) => {
    setFormData(prev => ({
      ...prev,
      thingsToCarry: prev.thingsToCarry.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Edit Template Content</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Header Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Header Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.header.phone}
                  onChange={(e) => handleChange('header', 'phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.header.email}
                  onChange={(e) => handleChange('header', 'email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website/Instagram</label>
                <input
                  type="text"
                  value={formData.header.website}
                  onChange={(e) => handleChange('header', 'website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Brand Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand Title</label>
                <input
                  type="text"
                  value={formData.brand.title}
                  onChange={(e) => handleChange('brand', 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={formData.brand.subtitle}
                  onChange={(e) => handleChange('brand', 'subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Hero Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                <input
                  type="text"
                  value={formData.hero.badge}
                  onChange={(e) => handleChange('hero', 'badge', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.hero.title}
                  onChange={(e) => handleChange('hero', 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.hero.image}
                  onChange={(e) => handleChange('hero', 'image', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={formData.hero.stats.duration}
                  onChange={(e) => handleChange('hero', 'stats', { ...formData.hero.stats, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Altitude</label>
                <input
                  type="text"
                  value={formData.hero.stats.altitude}
                  onChange={(e) => handleChange('hero', 'stats', { ...formData.hero.stats, altitude: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <input
                  type="text"
                  value={formData.hero.stats.difficulty}
                  onChange={(e) => handleChange('hero', 'stats', { ...formData.hero.stats, difficulty: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Overview Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Overview</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.overview.text}
                onChange={(e) => handleChange('overview', 'text', e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Leader Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Leader Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.leader.name}
                  onChange={(e) => handleChange('leader', 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  value={formData.leader.role}
                  onChange={(e) => handleChange('leader', 'role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.leader.image}
                  onChange={(e) => handleChange('leader', 'image', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Itinerary Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-lg font-semibold text-gray-700">Itinerary Days</h3>
              <button
                type="button"
                onClick={addItineraryDay}
                className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Add Day
              </button>
            </div>
            <div className="space-y-4">
              {formData.itinerary.map((day, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-700">Day {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeItineraryDay(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Day Label</label>
                      <input
                        type="text"
                        value={day.day}
                        onChange={(e) => handleItineraryChange(index, 'day', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Day 1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Badge</label>
                      <input
                        type="text"
                        value={day.badge}
                        onChange={(e) => handleItineraryChange(index, 'badge', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="TREK"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={day.title}
                        onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Day title"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                      <textarea
                        value={day.description}
                        onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                        rows="2"
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Day description"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={day.image}
                        onChange={(e) => handleItineraryChange(index, 'image', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-lg font-semibold text-gray-700">Inclusions</h3>
              <button
                type="button"
                onClick={addInclusion}
                className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Add Item
              </button>
            </div>
            <div className="space-y-3">
              {formData.inclusions.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-semibold text-gray-700">Item {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeInclusion(index)}
                      className="px-2 py-0.5 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Icon</label>
                      <input
                        type="text"
                        value={item.icon}
                        onChange={(e) => handleInclusionChange(index, 'icon', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="luggage"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleInclusionChange(index, 'title', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Meals"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleInclusionChange(index, 'description', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="All meals included"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Things to Carry Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-lg font-semibold text-gray-700">Things to Carry</h3>
              <button
                type="button"
                onClick={addThingToCarry}
                className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Add Item
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {formData.thingsToCarry.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item.icon}
                    onChange={(e) => handleThingsToCarryChange(index, 'icon', e.target.value)}
                    className="w-20 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Icon"
                  />
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => handleThingsToCarryChange(index, 'label', e.target.value)}
                    className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Item name"
                  />
                  <button
                    type="button"
                    onClick={() => removeThingToCarry(index)}
                    className="px-2 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Footer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.footer.title}
                  onChange={(e) => handleChange('footer', 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Copyright</label>
                <input
                  type="text"
                  value={formData.footer.copyright}
                  onChange={(e) => handleChange('footer', 'copyright', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.footer.description}
                  onChange={(e) => handleChange('footer', 'description', e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save & Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
