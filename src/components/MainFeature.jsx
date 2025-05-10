import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MainFeature = ({ serviceType }) => {
  // Icon declarations
  const PlaneIcon = getIcon('Plane');
  const BuildingIcon = getIcon('Building2');
  const TrainIcon = getIcon('Train');
  const BusIcon = getIcon('Bus');
  const CalendarIcon = getIcon('Calendar');
  const MapPinIcon = getIcon('MapPin');
  const UsersIcon = getIcon('Users');
  const SearchIcon = getIcon('Search');
  const SwapIcon = getIcon('ArrowLeftRight');
  const LoaderIcon = getIcon('Loader2');
  const ChevronDownIcon = getIcon('ChevronDown');
  const CheckIcon = getIcon('Check');

  // State for form inputs
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [travelClass, setTravelClass] = useState('Economy');
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [results, setResults] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  // Service-specific data
  const serviceConfig = {
    flights: {
      icon: PlaneIcon,
      fromLabel: 'Departure City',
      toLabel: 'Arrival City',
      classOptions: ['Economy', 'Premium Economy', 'Business', 'First'],
      placeholders: {
        from: 'New York',
        to: 'London'
      }
    },
    hotels: {
      icon: BuildingIcon,
      fromLabel: 'Destination',
      toLabel: 'Property Type',
      classOptions: ['Hotel', 'Resort', 'Villa', 'Apartment', 'Hostel'],
      placeholders: {
        from: 'Paris, France',
        to: 'All Properties'
      }
    },
    trains: {
      icon: TrainIcon,
      fromLabel: 'Departure Station',
      toLabel: 'Arrival Station',
      classOptions: ['Standard', 'First Class', 'Sleeper'],
      placeholders: {
        from: 'Grand Central',
        to: 'Union Station'
      }
    },
    buses: {
      icon: BusIcon,
      fromLabel: 'Departure City',
      toLabel: 'Arrival City',
      classOptions: ['Standard', 'Premium', 'Sleeper'],
      placeholders: {
        from: 'Boston',
        to: 'Washington DC'
      }
    }
  };

  // Current service configuration
  const currentService = serviceConfig[serviceType];

  // Reset form when service type changes
  useEffect(() => {
    setFrom('');
    setTo('');
    setReturnDate('');
    setTravelClass(currentService.classOptions[0]);
    setResults([]);
    setFormErrors({});
  }, [serviceType, currentService.classOptions]);

  // Current date for min date in date inputs
  const today = new Date().toISOString().split('T')[0];

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    if (!from) errors.from = `Please enter ${currentService.fromLabel}`;
    if (!to) errors.to = `Please enter ${currentService.toLabel}`;
    if (!departureDate) errors.departureDate = 'Please select departure date';
    if (isRoundTrip && !returnDate) errors.returnDate = 'Please select return date';
    
    // If there are errors, show them and stop
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Clear any previous errors
    setFormErrors({});
    
    // Show loading state
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      generateFakeResults();
      setIsLoading(false);
      toast.success(`Found options for your ${serviceType} search!`);
    }, 1500);
  };

  // Generate fake search results based on service type
  const generateFakeResults = () => {
    let fakeResults = [];
    
    if (serviceType === 'flights') {
      fakeResults = [
        {
          id: 'fl1',
          provider: 'SkyWings Airlines',
          departure: '08:15 AM',
          arrival: '11:45 AM',
          duration: '3h 30m',
          price: 249,
          direct: true,
          rating: 4.5,
        },
        {
          id: 'fl2',
          provider: 'Global Airways',
          departure: '12:30 PM',
          arrival: '04:15 PM',
          duration: '3h 45m',
          price: 199,
          direct: true,
          rating: 4.2,
        },
        {
          id: 'fl3',
          provider: 'Azure Airlines',
          departure: '04:20 PM',
          arrival: '08:10 PM',
          duration: '3h 50m',
          price: 179,
          direct: false,
          rating: 3.9,
        }
      ];
    } else if (serviceType === 'hotels') {
      fakeResults = [
        {
          id: 'ht1',
          provider: 'Grand Plaza Hotel',
          location: 'Downtown',
          checkIn: '2:00 PM',
          checkOut: '12:00 PM',
          price: 129,
          rating: 4.7,
        },
        {
          id: 'ht2',
          provider: 'Waterfront Resort',
          location: 'Beachside',
          checkIn: '3:00 PM',
          checkOut: '11:00 AM',
          price: 189,
          rating: 4.9,
        },
        {
          id: 'ht3',
          provider: 'City View Apartments',
          location: 'Midtown',
          checkIn: '2:00 PM',
          checkOut: '10:00 AM',
          price: 99,
          rating: 4.3,
        }
      ];
    } else if (serviceType === 'trains') {
      fakeResults = [
        {
          id: 'tr1',
          provider: 'Express Rail',
          departure: '07:30 AM',
          arrival: '09:45 AM',
          duration: '2h 15m',
          price: 68,
          rating: 4.6,
        },
        {
          id: 'tr2',
          provider: 'Central Lines',
          departure: '10:15 AM',
          arrival: '12:30 PM',
          duration: '2h 15m',
          price: 64,
          rating: 4.4,
        },
        {
          id: 'tr3',
          provider: 'Metro Connect',
          departure: '01:00 PM',
          arrival: '03:25 PM',
          duration: '2h 25m',
          price: 59,
          rating: 4.2,
        }
      ];
    } else {
      fakeResults = [
        {
          id: 'bs1',
          provider: 'City Express',
          departure: '06:45 AM',
          arrival: '12:30 PM',
          duration: '5h 45m',
          price: 42,
          rating: 4.3,
        },
        {
          id: 'bs2',
          provider: 'Comfort Lines',
          departure: '08:30 AM',
          arrival: '02:15 PM',
          duration: '5h 45m',
          price: 48,
          rating: 4.5,
        },
        {
          id: 'bs3',
          provider: 'Night Traveler',
          departure: '10:45 PM',
          arrival: '05:30 AM',
          duration: '6h 45m',
          price: 39,
          rating: 4.1,
        }
      ];
    }
    
    setResults(fakeResults);
  };

  // Swap from and to locations
  const handleSwapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  // Handle booking selection
  const handleSelect = (result) => {
    toast.success(`${result.provider} selected! Booking flow would continue here.`);
  };

  // Render stars for ratings
  const renderRatingStars = (rating) => {
    const StarIcon = getIcon('Star');
    const StarHalfIcon = getIcon('StarHalf');
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`star-${i}`} size={16} className="text-yellow-400 fill-current" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalfIcon key="half-star" size={16} className="text-yellow-400" />);
    }
    
    return (
      <div className="flex items-center">
        <div className="flex mr-1">{stars}</div>
        <span className="text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="w-full">
      <motion.div
        key={serviceType}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="card p-6"
      >
        {/* Form Section */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex flex-wrap gap-4 md:gap-6 mb-6">
            {/* Trip Type Toggle (only for flights, trains, buses) */}
            {serviceType !== 'hotels' && (
              <div className="w-full">
                <div className="inline-flex p-1 bg-surface-100 dark:bg-surface-800 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setIsRoundTrip(true)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      isRoundTrip
                        ? 'bg-white dark:bg-surface-700 shadow-sm'
                        : 'text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    Round Trip
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsRoundTrip(false)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      !isRoundTrip
                        ? 'bg-white dark:bg-surface-700 shadow-sm'
                        : 'text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    One Way
                  </button>
                </div>
              </div>
            )}

            {/* From and To Inputs with Swap Button */}
            <div className="flex flex-col md:flex-row w-full gap-2 md:gap-4">
              <div className="flex-1 relative">
                <label htmlFor="from" className="label">
                  {currentService.fromLabel}
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                    <MapPinIcon size={18} />
                  </div>
                  <input
                    id="from"
                    type="text"
                    value={from || ''}
                    onChange={(e) => setFrom(e.target.value || '')}
                    placeholder={currentService.placeholders.from}
                    className={`input pl-10 ${formErrors.from ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                </div>
                {formErrors.from && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.from}</p>
                )}
              </div>
              
              {/* Swap button */}
              {serviceType !== 'hotels' && (
                <div className="flex items-center justify-center md:pt-6">
                  <button
                    type="button"
                    onClick={handleSwapLocations}
                    className="p-2 rounded-full bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 transition-colors"
                    aria-label="Swap locations"
                  >
                    <SwapIcon size={18} />
                  </button>
                </div>
              )}
              
              <div className="flex-1 relative">
                <label htmlFor="to" className="label">
                  {currentService.toLabel}
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                    <MapPinIcon size={18} />
                  </div>
                  <input
                    id="to"
                    type="text"
                    value={to || ''}
                    onChange={(e) => setTo(e.target.value || '')}
                    placeholder={currentService.placeholders.to}
                    className={`input pl-10 ${formErrors.to ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                </div>
                {formErrors.to && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.to}</p>
                )}
              </div>
            </div>
            
            {/* Date Selection */}
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <div className="flex-1">
                <label htmlFor="departureDate" className="label">
                  {serviceType === 'hotels' ? 'Check-in Date' : 'Departure Date'}
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                    <CalendarIcon size={18} />
                  </div>
                  <input
                    id="departureDate"
                    type="date"
                    min={today}
                    value={departureDate || ''}
                    onChange={(e) => setDepartureDate(e.target.value || '')}
                    className={`input pl-10 ${formErrors.departureDate ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                </div>
                {formErrors.departureDate && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.departureDate}</p>
                )}
              </div>
              
              {(isRoundTrip || serviceType === 'hotels') && (
                <div className="flex-1">
                  <label htmlFor="returnDate" className="label">
                    {serviceType === 'hotels' ? 'Check-out Date' : 'Return Date'}
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                      <CalendarIcon size={18} />
                    </div>
                    <input
                      id="returnDate"
                      type="date"
                      min={departureDate || today}
                      value={returnDate || ''}
                      onChange={(e) => setReturnDate(e.target.value || '')}
                      className={`input pl-10 ${formErrors.returnDate ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                  </div>
                  {formErrors.returnDate && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.returnDate}</p>
                  )}
                </div>
              )}
            </div>
            
            {/* Travelers and Class Selection */}
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <div className="flex-1">
                <label htmlFor="travelers" className="label">
                  {serviceType === 'hotels' ? 'Guests' : 'Travelers'}
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                    <UsersIcon size={18} />
                  </div>
                  <select
                    id="travelers"
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="select pl-10 appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 pointer-events-none">
                    <ChevronDownIcon size={18} />
                  </div>
                </div>
              </div>
              
              <div className="flex-1 relative">
                <label className="label">
                  {serviceType === 'hotels' ? 'Property Type' : 'Class'}
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="input text-left flex items-center justify-between w-full"
                    onClick={() => setShowClassDropdown(!showClassDropdown)}
                  >
                    <span>{travelClass}</span>
                    <ChevronDownIcon size={18} className="text-surface-500" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {showClassDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 mt-1 w-full rounded-lg bg-white dark:bg-surface-800 shadow-lg border border-surface-200 dark:border-surface-700 py-1"
                      >
                        {currentService.classOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className="flex items-center justify-between w-full px-4 py-2 text-left hover:bg-surface-100 dark:hover:bg-surface-700"
                            onClick={() => {
                              setTravelClass(option);
                              setShowClassDropdown(false);
                            }}
                          >
                            <span>{option}</span>
                            {travelClass === option && <CheckIcon size={16} className="text-primary" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary py-3 px-8 rounded-full text-base flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <LoaderIcon size={20} className="animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <SearchIcon size={20} />
                  <span>Search {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</span>
                </>
              )}
            </button>
          </div>
        </form>
        
        {/* Results Section */}
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8"
            >
              <h3 className="text-xl font-semibold mb-4">Available Options</h3>
              <div className="space-y-4">
                {results.map((result) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="card border-l-4 border-l-primary p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-grow">
                        <div className="flex items-center mb-2">
                          <h4 className="font-semibold text-lg">{result.provider}</h4>
                          {result.direct && (
                            <span className="ml-2 px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                              Direct
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-surface-600 dark:text-surface-400 mb-3">
                          {serviceType !== 'hotels' ? (
                            <>
                              <div className="flex items-center">
                                <span className="font-medium">{result.departure}</span>
                                <span className="mx-2">-</span>
                                <span className="font-medium">{result.arrival}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <currentService.icon size={14} className="mr-1" />
                                <span>{result.duration}</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center">
                                <MapPinIcon size={14} className="mr-1" />
                                <span>{result.location}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <span>{result.checkIn} check-in, {result.checkOut} check-out</span>
                              </div>
                            </>
                          )}
                        </div>
                        
                        <div className="flex items-center">
                          {renderRatingStars(result.rating)}
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex flex-col items-end">
                        <div className="text-2xl font-bold text-primary mb-2">
                          ${result.price}
                          <span className="text-sm font-normal text-surface-500">
                            {serviceType === 'hotels' ? '/night' : ''}
                          </span>
                        </div>
                        <button
                          onClick={() => handleSelect(result)}
                          className="btn-primary w-full md:w-auto"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MainFeature;