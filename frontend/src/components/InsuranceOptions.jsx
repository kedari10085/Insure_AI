import React from 'react';

const options = [
  { name: 'Umbrella Quote', description: 'Get comprehensive coverage that extends beyond your standard policies.' },
  { name: 'Auto Insurance', description: 'Protect your vehicle with our flexible and affordable auto insurance plans.' },
  { name: 'Home Insurance', description: 'Secure your home and belongings with our reliable home insurance policies.' },
];

const InsuranceOptions = ({ onSelect }) => {
  return (
    <div className="bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Select a Service</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((option) => (
          <div
            key={option.name}
            onClick={() => onSelect(option.name)}
            className="bg-white/50 p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300 cursor-pointer"
          >
            <h3 className="font-bold text-lg text-teal-700">{option.name}</h3>
            <p className="text-sm text-gray-600 mt-2">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsuranceOptions;
