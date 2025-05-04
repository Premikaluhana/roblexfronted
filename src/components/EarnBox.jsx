import { useState, useEffect } from 'react';
import Footer from './Footer';
import { FaQuestionCircle, FaCheck, FaLock, FaUnlock, FaInfoCircle, FaInstagram, FaTwitter, FaFacebook, FaDiscord } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

const EarnRobux = () => {
  const [selectedUrl, setSelectedUrl] = useState('https://torox.io/ifr/show/30496/a65b3066-e577-4c42-9147-6d135f1b55f4/15712');
  const [showTooltips, setShowTooltips] = useState(true);
  const [activeTab, setActiveTab] = useState('offers');

  useEffect(() => {
    const hasSeenTooltips = localStorage.getItem('hasSeenEarnTooltips');
    if (!hasSeenTooltips) {
      setShowTooltips(true);
      localStorage.setItem('hasSeenEarnTooltips', 'true');
    } else {
      setShowTooltips(false);
    }
  }, []);

  // Data arrays with tooltips
  const offerwalls = [
    {
      id: 1,
      alt: "Torox logo white on blue background",
      src: "https://blx.gg/img/offerwalls/torox.webp",
      badge: { text: "+50%", icon: "🚀", color: "bg-green-400" },
      bgColor: "bg-gray-800",
      url: "https://torox.io/ifr/show/30496/a65b3066-e577-4c42-9147-6d135f1b55f4/15712",
      tooltip: "Complete offers and watch videos on Torox to earn Robux instantly"
    },
    {
      id: 2,
      alt: "AYE STUDIOS logo white on black background",
      src: "https://blx.gg/img/offerwalls/ayetstudios.webp",
      bgColor: "bg-gray-800",
      url: "/offerwalls/ayetstudios",
      tooltip: "Complete tasks and surveys on AYE STUDIOS to earn Robux"
    },
    {
      id: 3,
      alt: "Bitlabs OFFERS logo white and blue on black background",
      src: "https://blx.gg/img/offerwalls/bitlabs-offers.webp",
      bgColor: "bg-gray-800",
      url: "/offerwalls/bitlabs-offers",
      tooltip: "Complete offers and earn Robux through Bitlabs"
    },
    {
      id: 4,
      alt: "AdGate media logo white on black background",
      src: "https://blx.gg/img/offerwalls/adgate.webp",
      bgColor: "bg-gray-800",
      url: "/offerwalls/adgate",
      tooltip: "Watch videos and complete offers on AdGate to earn Robux"
    },
    {
      id: 5,
      alt: "lootably logo white on black background",
      src: "https://blx.gg/img/offerwalls/lootably.webp",
      bgColor: "bg-gray-800",
      url: "/offerwalls/lootably",
      tooltip: "Complete tasks and earn Robux through Lootably"
    },
  ];

  const surveys = [
    {
      id: 1,
      alt: "Bitlabs logo white and blue on black background",
      src: "https://blx.gg/img/offerwalls/bitlabs.webp",
      badge: { text: "HOT", icon: "🔥", color: "bg-green-400" },
      bgColor: "bg-gray-800",
      url: "/surveys/bitlabs",
      tooltip: "Complete surveys on Bitlabs to earn Robux. Takes 5-10 minutes per survey."
    },
    {
      id: 2,
      alt: "Prime Surveys logo blue on black background",
      src: "https://blx.gg/img/offerwalls/primesurveys.webp",
      bgColor: "bg-gray-800",
      url: "/surveys/primesurveys",
      tooltip: "Share your opinions through Prime Surveys to earn Robux"
    },
    {
      id: 3,
      alt: "CPX RESEARCH logo green and white on black background",
      src: "https://blx.gg/img/offerwalls/cpxresearch.webp",
      bgColor: "bg-gray-800",
      url: "/surveys/cpxresearch",
      tooltip: "Complete market research surveys on CPX Research to earn Robux"
    },
    {
      id: 4,
      alt: "theorem reach logo purple and white on black background",
      src: "https://blx.gg/img/offerwalls/theoremreach.webp",
      bgColor: "bg-gray-800",
      url: "/surveys/theoremreach",
      tooltip: "Participate in surveys on Theorem Reach to earn Robux"
    },
  ];

  const socialTasks = [
    {
      id: 1,
      alt: "Instagram Follow",
      icon: <FaInstagram className="w-8 h-8 text-pink-500" />,
      url: "/tasks/instagram1",
      tooltip: "Follow our Instagram page to earn Robux"
    },
    {
      id: 2,
      alt: "Twitter Follow",
      icon: <FaTwitter className="w-8 h-8 text-blue-400" />,
      url: "/tasks/x1",
      tooltip: "Follow our X (Twitter) account to earn Robux"
    },
    {
      id: 3,
      alt: "Facebook Like",
      icon: <FaFacebook className="w-8 h-8 text-blue-600" />,
      url: "/tasks/facebook1",
      tooltip: "Like our Facebook page to earn Robux"
    },
    {
      id: 4,
      alt: "Discord Join",
      icon: <FaDiscord className="w-8 h-8 text-indigo-500" />,
      url: "/tasks/discord1",
      tooltip: "Join our Discord server to earn Robux"
    }
  ];

  const Badge = ({ text, icon, color }) => (
    <div className={`absolute top-0 left-0 z-10 flex items-center space-x-1 text-xs font-semibold px-3 py-1 rounded-br-md rounded-tl-md select-none text-white ${color}`}>
      <span>{text}</span>
      <span aria-label={`${text} icon`} role="img">{icon}</span>
    </div>
  );

  const ImageCard = ({ item, onItemClick, tooltipId }) => (
    <div 
      className="relative group h-32 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      data-tooltip-id={tooltipId}
      data-tooltip-content={item.tooltip}
    >
      {item.badge && <Badge {...item.badge} />}
      <button
        onClick={() => onItemClick(item.url)}
        className={`w-full h-full ${item.bgColor} flex items-center justify-center p-4 focus:outline-none focus:ring-4 focus:ring-teal-400/50`}
      >
        <img
          alt={item.alt}
          className="h-16 object-contain transition-opacity group-hover:opacity-75"
          draggable="false"
          src={item.src}
        />
      </button>
    </div>
  );

  const SectionHeader = ({ title, description, tooltipId }) => (
    <div className="mb-8 space-y-4">
      <div className="flex items-center space-x-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          {title}
        </h2>
        {showTooltips && (
          <FaInfoCircle 
            className="w-5 h-5 text-gray-400 cursor-pointer"
            data-tooltip-id={tooltipId}
            data-tooltip-content={description}
          />
        )}
      </div>
    </div>
  );

  const Section = ({ title, description, items, onItemClick, sectionId }) => (
    <section className="py-8">
      <SectionHeader title={title} description={description} tooltipId={`${sectionId}-header`} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item) => (
          <ImageCard 
            key={item.id} 
            item={item} 
            onItemClick={onItemClick}
            tooltipId={`${sectionId}-${item.id}`}
          />
        ))}
      </div>
    </section>
  );

  const IframeSection = () => (
    <section className="rounded-xl overflow-hidden shadow-2xl mb-12 border border-gray-700">
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-200">Active Offer</h3>
        <button
          onClick={() => setSelectedUrl(null)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
      <div className="aspect-video bg-gray-900">
        <iframe
          title="Offer Content"
          src={selectedUrl}
          className="w-full h-full"
          allowFullScreen
        />
      </div>
    </section>
  );

  const InfoSection = () => (
    <div className="max-w-5xl mx-auto py-12 space-y-12">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-100">Earn Robux Legitimately</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-teal-400">Safe & Secure</h3>
            <p className="text-gray-400">
              We partner with trusted offerwall providers to ensure your earnings are safe
              and your information remains protected.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Instant Rewards</h3>
            <p className="text-gray-400">
              Most rewards are delivered instantly upon task completion. No waiting - get
              your Robux immediately!
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const [taskItems, setTaskItems] = useState([
    {
      id: 1,
      title: 'Watch Video',
      reward: '10 Robux',
      completed: false,
      locked: false,
      tooltip: 'Watch a short video to earn Robux. Videos are usually 30 seconds or less.'
    },
    {
      id: 2,
      title: 'Complete Survey',
      reward: '50 Robux',
      completed: false,
      locked: true,
      tooltip: 'Answer a few questions about your preferences to earn more Robux.'
    },
    {
      id: 3,
      title: 'Install App',
      reward: '100 Robux',
      completed: false,
      locked: true,
      tooltip: 'Install and try out a new app to earn a larger reward.'
    }
  ]);

  const handleTaskClick = (taskId) => {
    setTaskItems(taskItems.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'offers':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Available Offers</h2>
              <div className="flex items-center space-x-2">
                <FaInfoCircle 
                  className="w-5 h-5 text-gray-400 cursor-pointer"
                  data-tooltip-id="offers-guide"
                  data-tooltip-content="Browse through available offers and complete them to earn Robux. Each offer has different rewards and requirements."
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {offerwalls.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg cursor-pointer group"
                  onClick={() => setSelectedUrl(offer.url)}
                  data-tooltip-id={`offer-${offer.id}`}
                  data-tooltip-content={offer.tooltip}
                >
                  <div className="relative">
                    {offer.badge && (
                      <div className={`absolute -top-2 -right-2 z-10 flex items-center space-x-1 text-xs font-semibold px-3 py-1 rounded-full ${offer.badge.color}`}>
                        <span>{offer.badge.text}</span>
                        <span aria-label={`${offer.badge.text} icon`} role="img">{offer.badge.icon}</span>
                      </div>
                    )}
                    <div className="aspect-4/2 w-full bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center p-4">
                      <img 
                        src={offer.src} 
                        alt={offer.alt} 
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-100"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'surveys':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Available Surveys</h2>
              <div className="flex items-center space-x-2">
                <FaInfoCircle 
                  className="w-5 h-5 text-gray-400 cursor-pointer"
                  data-tooltip-id="surveys-guide"
                  data-tooltip-content="Complete surveys to earn Robux. Each survey takes 5-10 minutes and pays different amounts based on length and complexity."
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {surveys.map((survey) => (
                <div
                  key={survey.id}
                  className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg cursor-pointer group"
                  onClick={() => setSelectedUrl(survey.url)}
                  data-tooltip-id={`survey-${survey.id}`}
                  data-tooltip-content={survey.tooltip}
                >
                  <div className="relative">
                    {survey.badge && (
                      <div className={`absolute -top-2 -right-2 z-10 flex items-center space-x-1 text-xs font-semibold px-3 py-1 rounded-full ${survey.badge.color}`}>
                        <span>{survey.badge.text}</span>
                        <span aria-label={`${survey.badge.text} icon`} role="img">{survey.badge.icon}</span>
                      </div>
                    )}
                    <div className="aspect-4/2 w-full bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center p-4">
                      <img 
                        src={survey.src} 
                        alt={survey.alt} 
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'social':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Social Tasks</h2>
              <div className="flex items-center space-x-2">
                <FaInfoCircle 
                  className="w-5 h-5 text-gray-400 cursor-pointer"
                  data-tooltip-id="social-guide"
                  data-tooltip-content="Complete social media tasks to earn Robux. Follow, like, and engage with our social media accounts to earn rewards."
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {socialTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg cursor-pointer group"
                  onClick={() => setSelectedUrl(task.url)}
                  data-tooltip-id={`task-${task.id}`}
                  data-tooltip-content={task.tooltip}
                >
                  <div className="aspect-4/2 w-full bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center p-4">
                    {task.icon}
                  </div>
                  <div className="mt-2 text-center">
                    <h3 className="text-white font-medium text-sm truncate">{task.alt}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'offers' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
            onClick={() => setActiveTab('offers')}
          >
            Offers
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'surveys' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
            onClick={() => setActiveTab('surveys')}
          >
            Surveys
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'social' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
            onClick={() => setActiveTab('social')}
          >
            Social Tasks
          </button>
        </div>

        {/* Content */}
        {renderContent()}

        {/* Active Offer Iframe */}
        {selectedUrl && (
          <div className="mt-8">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">Active Offer</h3>
                <button
                  onClick={() => setSelectedUrl(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <iframe
                src={selectedUrl}
                className="w-full h-[500px] rounded-lg"
                title="Offer Content"
              />
            </div>
          </div>
        )}

        {/* Tooltips */}
        {showTooltips && (
          <>
            {/* Section Guide Tooltips */}
            <Tooltip
              id="offers-guide"
              place="left"
              className="z-50"
              style={{
                backgroundColor: '#1E2237',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '14px',
                maxWidth: '200px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />
            <Tooltip
              id="surveys-guide"
              place="left"
              className="z-50"
              style={{
                backgroundColor: '#1E2237',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '14px',
                maxWidth: '200px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />
            <Tooltip
              id="social-guide"
              place="left"
              className="z-50"
              style={{
                backgroundColor: '#1E2237',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '14px',
                maxWidth: '200px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />

            {/* Item Tooltips */}
            {[...offerwalls, ...surveys, ...socialTasks].map((item) => (
              <Tooltip
                key={`${item.id}`}
                id={`${item.type}-${item.id}`}
                place="top"
                className="z-50"
                style={{
                  backgroundColor: '#1E2237',
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  maxWidth: '200px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              />
            ))}
          </>
        )}
      </div>
      <Footer className="border-t border-gray-800" />
    </div>
  );
};

export default EarnRobux;