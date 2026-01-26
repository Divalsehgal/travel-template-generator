import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-green via-gray-900 to-stone-gray">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-white mb-16">
          <h1 className="text-6xl font-black mb-4 tracking-tight">
            PDF Template Generator
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create stunning, professional PDF templates for tours, treks, events, and more. 
            Edit content easily and download print-ready PDFs instantly.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="w-16 h-16 bg-glacier-blue/20 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl text-glacier-blue">edit_document</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Easy Editing</h3>
            <p className="text-gray-300">
              Intuitive form-based editor to customize all content, images, and details without coding.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="w-16 h-16 bg-sunrise-orange/20 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl text-sunrise-orange">visibility</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Live Preview</h3>
            <p className="text-gray-300">
              See your changes in real-time with instant preview modal before generating the final PDF.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl text-green-400">download</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Export PDF</h3>
            <p className="text-gray-300">
              Download professional, print-ready PDFs with a single click. Perfect for marketing materials.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 bg-glacier-blue hover:bg-glacier-blue/90 text-white px-8 py-4 rounded-full text-lg font-bold shadow-2xl transition-all transform hover:scale-105"
          >
            <span className="material-symbols-outlined text-2xl">rocket_launch</span>
            View Projects
          </Link>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-16 text-forest-green">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-forest-green text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-bold text-lg mb-2">Choose Template</h4>
              <p className="text-sm text-gray-600">Select from available project templates</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-glacier-blue text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-bold text-lg mb-2">Edit Content</h4>
              <p className="text-sm text-gray-600">Fill in your custom information</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sunrise-orange text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-bold text-lg mb-2">Preview</h4>
              <p className="text-sm text-gray-600">Check how your PDF will look</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h4 className="font-bold text-lg mb-2">Download</h4>
              <p className="text-sm text-gray-600">Export your professional PDF</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
