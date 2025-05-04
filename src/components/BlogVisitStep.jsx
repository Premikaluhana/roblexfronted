import React, { useState, useEffect } from 'react';
import { visitBlog } from '../utlis/Api';

const BlogVisitStep = ({ onComplete, visitedCount, changeCurrentStep }) => {
  const [visited, setVisited] = useState(visitedCount || 0);
  const [visitedPosts, setVisitedPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const blogPosts = [
    { id: 'getting-started', title: 'Getting Started Guide', url: 'https://blog.blx.gg/getting-started' },
    { id: 'tips-and-tricks', title: 'Tips & Tricks', url: 'https://blog.blx.gg/tips-and-tricks' },
    { id: 'faq', title: 'FAQ', url: 'https://blog.blx.gg/faq' }
  ];

  const handleVisit = async (postId) => {
    if (visitedPosts.includes(postId)) return;
    
    setVisitedPosts(prev => [...prev, postId]);
    setVisited(prev => prev + 1);
    
    // If all blogs are visited, call the API
    if (visited + 1 >= 3) {
      setLoading(true);
      try {
        const res = await visitBlog();
        console.log('Blog visit response:', res);
        // in the end change setting the visitedBlogPosts to true
        if (res?.visitedBlogPosts>=1) {
          onComplete();
          changeCurrentStep(4);
        }
      } catch (error) {
        console.error('Error recording visit:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#1E2237] p-6 rounded-lg border border-[#21395e]">
        <h2 className="text-xl font-semibold text-white mb-4">Visit Our Blog</h2>
        <p className="text-gray-300 mb-4">
          Visit our blog posts to learn more about our platform and how to maximize your earnings.
        </p>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-2 bg-[#21395e] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#5B6DF6] transition-all duration-300"
              style={{ width: `${Math.min(visited * 33.33, 100)}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-300">
            {visited}/3 posts visited
          </span>
        </div>

        <div className="space-y-4">
          {blogPosts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleVisit(post.id)}
              className={`block p-4 rounded-lg transition-colors ${
                visitedPosts.includes(post.id)
                  ? 'bg-[#2b3a6b] border border-[#5B6DF6]'
                  : 'bg-[#21395e] hover:bg-[#2b3a6b]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white">{post.title}</h3>
                  <p className="text-gray-400 mt-1">
                    {post.id === 'getting-started' && 'Learn the basics of earning Robux on our platform'}
                    {post.id === 'tips-and-tricks' && 'Maximize your earnings with these pro tips'}
                    {post.id === 'faq' && 'Find answers to common questions'}
                  </p>
                </div>
                {visitedPosts.includes(post.id) && (
                  <span className="text-[#5B6DF6]">✓ Visited</span>
                )}
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => changeCurrentStep(2)}
            className="px-4 py-2 bg-[#21395e] text-white rounded-md hover:bg-[#2b3a6b] transition-colors"
          >
            Previous
          </button>
          <button
            onClick={onComplete}
            disabled={visited < 3 || loading}
            className={`px-4 py-2 rounded-md ${
              visited >= 3 && !loading
                ? 'bg-[#5B6DF6] hover:bg-[#4a5bd4] text-white'
                : 'bg-[#21395e] text-gray-400 cursor-not-allowed'
            } transition-colors`}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            ) : visited >= 3 ? (
              'Complete'
            ) : (
              'Visit More Posts'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogVisitStep;
