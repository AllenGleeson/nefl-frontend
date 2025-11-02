"use client";

// src/components/Management/NewsManagement/NewsList.tsx
import { useState } from 'react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  status: 'published' | 'draft' | 'archived';
  views: number;
  category: string;
}

type Props = {
  onAddNews?: () => void
}

export default function NewsList({ onAddNews }: Props) {
  const [articles] = useState<NewsArticle[]>([
    {
      id: '1',
      title: 'Championship Race Heats Up as Top Teams Battle',
      excerpt: 'The race for the championship title is intensifying as Manchester City and Arsenal continue their fierce competition...',
      author: 'John Smith',
      publishedAt: '2024-01-15',
      status: 'published',
      views: 1250,
      category: 'Match Reports'
    },
    {
      id: '2',
      title: 'New Signing Joins Arsenal Squad',
      excerpt: 'Arsenal FC has announced the signing of a promising young midfielder from the academy...',
      author: 'Sarah Johnson',
      publishedAt: '2024-01-14',
      status: 'published',
      views: 890,
      category: 'Transfers'
    },
    {
      id: '3',
      title: 'League Cup Final Preview',
      excerpt: 'A comprehensive look at the upcoming League Cup final between Liverpool and Chelsea...',
      author: 'Mike Wilson',
      publishedAt: '2024-01-13',
      status: 'draft',
      views: 0,
      category: 'Previews'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-bold">News Articles</h2>
          <div className="flex flex-row gap-2 flex-wrap">
            {onAddNews && (
              <button 
                onClick={onAddNews}
                className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm sm:text-base"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Add News Article</span>
                <span className="sm:hidden">Add</span>
              </button>
            )}
            <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
              <span className="hidden sm:inline">Export Articles</span>
              <span className="sm:hidden">Export</span>
            </button>
            <button className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base">
              <span className="hidden sm:inline">Bulk Actions</span>
              <span className="sm:hidden">Bulk</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {articles.map((article) => (
            <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              {/* Mobile Layout */}
              <div className="block sm:hidden">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold mb-2 line-clamp-2">{article.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                        {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                <div className="flex flex-col space-y-1 text-xs text-gray-500 mb-3">
                  <span>By {article.author}</span>
                  <span>{article.publishedAt} • {article.views} views</span>
                </div>
                <div className="flex space-x-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Edit
                  </button>
                  <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                    View
                  </button>
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                    Delete
                  </button>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{article.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                      {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{article.excerpt}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>By {article.author}</span>
                    <span>•</span>
                    <span>{article.publishedAt}</span>
                    <span>•</span>
                    <span>{article.views} views</span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Edit
                  </button>
                  <button className="text-green-600 hover:text-green-800 text-sm">
                    View
                  </button>
                  <button className="text-red-600 hover:text-red-800 text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
