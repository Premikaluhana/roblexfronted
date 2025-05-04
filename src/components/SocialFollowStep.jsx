import { useState, useEffect } from 'react';
import { 
  FaInstagram, 
  FaFacebook, 
  FaTwitter, 
  FaDiscord,
  FaCheck,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { followSocials } from '../utlis/Api';

const SocialFollowStep = ({ onComplete, isCompleted, changeCurrentStep }) => {
  const [followed, setFollowed] = useState({
    instagram: false,
    facebook: false,
    twitter: false,
    discord: false
  });

  const [visited, setVisited] = useState({
    instagram: false,
    facebook: false,
    twitter: false,
    discord: false
  });
  // Track if API call is in progress
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialPlatforms = [
    {
      name: 'instagram',
      label: 'Instagram',
      url: 'https://instagram.com/yourpage',
      icon: <FaInstagram className="w-6 h-6 text-pink-600" />
    },
    {
      name: 'facebook',
      label: 'Facebook',
      url: 'https://facebook.com/yourpage',
      icon: <FaFacebook className="w-6 h-6 text-blue-600" />
    },
    {
      name: 'twitter',
      label: 'Twitter',
      url: 'https://twitter.com/yourpage',
      icon: <FaTwitter className="w-6 h-6 text-blue-400" />
    },
    {
      name: 'discord',
      label: 'Discord Server',
      url: 'https://discord.gg/yourpage',
      icon: <FaDiscord className="w-6 h-6 text-indigo-500" />
    }
  ];

  const handleFollow = (platform) => {
    if (!visited[platform] || followed[platform]) return;
    
    // Update local state only
    setFollowed(prev => ({ 
      ...prev, 
      [platform]: true 
    }));
  };

  useEffect(() => {
    const submitFollows = async () => {
      const allFollowed = Object.values(followed).every(Boolean);
      
      if (allFollowed && !isCompleted && !isSubmitting) {
        try {
          setIsSubmitting(true);
          // Call API with all platforms
          console.log(allFollowed);
          const res = await followSocials(allFollowed);
          
          if (res.success) {
            onComplete(true);
            changeCurrentStep(2)
          }
        } catch (error) {
          console.error('API Error:', error);
          // Reset follows on error
          setFollowed({
            instagram: false,
            facebook: false,
            twitter: false,
            discord: false
          });
        } finally {
          setIsSubmitting(false);
        }
      }
    };

    submitFollows();
  }, [followed, isCompleted, isSubmitting, onComplete]);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="pb-4 border-b border-gray-600">
        <p className="text-gray-400 mt-1">Follow all our social platforms to continue</p>
      </div>

      <div className="space-y-4">
        {socialPlatforms.map((platform) => (
          <div 
            key={platform.name}
            className="flex items-center justify-between p-4 bg-black/25 rounded-lg border border-gray-500 hover:border-blue-200 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-700 rounded-lg">
                {platform.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-300">{platform.label}</h3>
                <a 
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 text-sm flex items-center gap-1"
                  onClick={() => setVisited(prev => ({ ...prev, [platform.name]: true }))}
                >
                  Visit page <FaExternalLinkAlt className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <button 
                onClick={() => handleFollow(platform.name)}
                disabled={!visited[platform.name] || followed[platform.name]}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2
                  ${followed[platform.name]
                    ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                    : !visited[platform.name]
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                {followed[platform.name] ? (
                  <>
                    <FaCheck className="w-4 h-4" />
                    Following
                  </>
                ) : 'Follow'}
              </button>
              {!visited[platform.name] && !followed[platform.name] && (
                <span className="text-red-500 text-xs">
                  Visit page to enable follow
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {isCompleted && (
        <div className="pt-6 border-t border-gray-200">
          <button
            onClick={() => changeCurrentStep(2)}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            Continue to Next Step
            <span className="text-xl">→</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SocialFollowStep;