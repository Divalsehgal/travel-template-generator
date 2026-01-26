import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import initialContent from "../data/content.json";
import TrekTemplate from '../components/TrekTemplate';
import FormEditor from '../components/FormEditor';
import PreviewModal from '../components/PreviewModal';

export default function ProjectEditor() {
  const { projectId } = useParams();
  
  // Load content from localStorage or use initial content
  const [content, setContent] = useState(() => {
    const savedContent = localStorage.getItem(`project_${projectId}`);
    return savedContent ? JSON.parse(savedContent) : initialContent;
  });
  
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Save to localStorage whenever content changes
  useEffect(() => {
    localStorage.setItem(`project_${projectId}`, JSON.stringify(content));
  }, [content, projectId]);

  const handleSaveContent = (newContent) => {
    setContent(newContent);
  };

  const handleExportPDF = () => {
    // Open preview modal first, then trigger print
    setIsPreviewOpen(true);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white print:min-h-0">
      {/* Top Bar */}
      <div className="no-print bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/projects"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="font-semibold">Projects</span>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-xl font-bold text-forest-green">Shiv Bhoomi Trek Template</h1>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditorOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-lg">edit</span>
              Edit Content
            </button>
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-lg">visibility</span>
              Preview
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 bg-forest-green hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-lg">download</span>
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Template Preview */}
      <div className="no-print container mx-auto px-4 py-8">
        <TrekTemplate content={content} />
      </div>

      {/* Modals */}
      <FormEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        initialData={content}
        onSave={handleSaveContent}
      />
      
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        content={content}
      />
    </div>
  );
}
