import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [activeTab, setActiveTab] = useState('flights');
  
  // Icon declarations
  const PlaneIcon = getIcon('Plane');
  const BuildingIcon = getIcon('Building2');
  const TrainIcon = getIcon('Train');
  const BusIcon = getIcon('Bus');
  const ChevronRightIcon = getIcon('ChevronRight');
  
  // Example travel categories with icons and descriptions
  const travelServices = [
    {
      id: 'flights',
      title: 'Flights',
      icon: PlaneIcon,
      description: 'Book domestic and international flights with filters for price, duration, and airlines.'
    },
    {
      id: 'hotels',
      title: 'Hotels',
      icon: BuildingIcon,
      description: 'Search and book hotels, resorts, villas, and homestays with photos, reviews, and ratings.'
    },
    {
      id: 'trains',
      title: 'Trains',
      icon: TrainIcon,
      description: 'Reserve train tickets with real-time availability and seat selection options.'
    },
    {
      id: 'buses',
      title: 'Buses',
      icon: BusIcon,
      description: 'Book bus tickets with real-time seat selection and operator options.'
    }
  ];
  
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    toast.info(`Switched to ${tabId} booking`, {
      icon: travelServices.find(service => service.id === tabId).icon
    });
  };

  return (
    <div className="container mx-auto py-8">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">Travel Anywhere</span>, Seamlessly
          </h1>
          <p className="text-lg md:text-xl text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Book flights, hotels, trains, and buses all in one place with TravelSwift's streamlined booking platform.
          </p>
        </div>

        {/* Service Tabs */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4 mb-8">
            {travelServices.map((service) => (
              <button
                key={service.id}
                onClick={() => handleTabChange(service.id)}
                className={`
                  flex items-center justify-center gap-2 px-4 py-3 rounded-xl md:rounded-full
                  transition-all duration-300 text-sm md:text-base font-medium
                  ${activeTab === service.id
                    ? 'bg-primary text-white shadow-soft'
                    : 'bg-white dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 border border-surface-200 dark:border-surface-700'}
                `}
              >
                <service.icon size={20} />
                <span>{service.title}</span>
              </button>
            ))}
          </div>
          
          {/* Main Booking Feature */}
          <MainFeature serviceType={activeTab} />
        </div>
      </motion.section>

      {/* Additional Features Highlight */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
      >
        {travelServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="card p-6 hover:shadow-lg dark:hover:border-primary/60 transition-all duration-300"
          >
            <div className="flex items-start mb-4">
              <div className="p-3 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary mr-4">
                <service.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
            </div>
            <p className="text-surface-600 dark:text-surface-400 mb-4">
              {service.description}
            </p>
            <button 
              onClick={() => handleTabChange(service.id)}
              className="group flex items-center text-primary font-medium"
            >
              <span>Explore {service.title}</span>
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
                <ChevronRightIcon size={18} />
              </span>
            </button>
          </motion.div>
        ))}
      </motion.section>

      {/* App Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="py-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">A complete travel booking solution</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-4">
                  {getIcon('CheckCircle')({ size: 20 })}
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Easy Management</h4>
                  <p className="text-surface-600 dark:text-surface-400">View all your bookings in one place with easy cancellation and refund options.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                  {getIcon('Shield')({ size: 20 })}
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Secure Booking</h4>
                  <p className="text-surface-600 dark:text-surface-400">Our secure platform ensures your personal information and payments are protected.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4">
                  {getIcon('Filter')({ size: 20 })}
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Advanced Filters</h4>
                  <p className="text-surface-600 dark:text-surface-400">Find exactly what you need with our comprehensive filtering options.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Travel planning on device" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-surface-800 rounded-xl p-4 shadow-lg border border-surface-200 dark:border-surface-700">
              <div className="flex items-center gap-3">
                {getIcon('Zap')({ className: "text-yellow-500", size: 24 })}
                <div>
                  <p className="text-sm font-medium">Book in seconds</p>
                  <p className="text-xs text-surface-500">Fast, easy & secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;