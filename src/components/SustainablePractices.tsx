import React, { useState } from 'react';
import { Leaf, Droplets, Recycle, Sun, Wind, Zap } from 'lucide-react';

const SustainablePractices: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('water');

  const categories = [
    { id: 'water', name: 'Water Conservation', icon: Droplets, color: 'blue' },
    { id: 'soil', name: 'Soil Health', icon: Leaf, color: 'green' },
    { id: 'energy', name: 'Renewable Energy', icon: Sun, color: 'yellow' },
    { id: 'waste', name: 'Waste Management', icon: Recycle, color: 'purple' },
    { id: 'biodiversity', name: 'Biodiversity', icon: Wind, color: 'teal' }
  ];

  const practices = {
    water: [
      {
        title: 'Drip Irrigation System',
        description: 'Install drip irrigation to reduce water usage by up to 50% while improving crop yields.',
        impact: 'Saves 2,000L water per day',
        difficulty: 'Medium',
        cost: '₹15,000 - 25,000',
        implementation: [
          'Survey field layout and water source',
          'Design irrigation zones based on crop water needs',
          'Install main and sub-main pipelines',
          'Set up drippers and filters',
          'Install timer and automation system'
        ],
        benefits: ['50% water savings', 'Better crop yields', 'Reduced labor costs', 'Precise nutrient delivery']
      },
      {
        title: 'Rainwater Harvesting',
        description: 'Collect and store rainwater during monsoon for use during dry periods.',
        impact: 'Stores 10,000L rainwater',
        difficulty: 'Easy',
        cost: '₹8,000 - 12,000',
        implementation: [
          'Install gutters on farm buildings',
          'Set up collection tanks',
          'Add filtration system',
          'Create overflow management'
        ],
        benefits: ['Free water source', 'Reduced dependency on groundwater', 'Flood prevention']
      },
      {
        title: 'Mulching',
        description: 'Use organic matter to cover soil and retain moisture.',
        impact: 'Reduces watering by 30%',
        difficulty: 'Easy',
        cost: '₹2,000 - 4,000',
        implementation: [
          'Collect organic waste (straw, leaves)',
          'Spread 2-3 inch layer around plants',
          'Maintain mulch throughout season',
          'Replenish as needed'
        ],
        benefits: ['Moisture retention', 'Weed suppression', 'Soil temperature control']
      }
    ],
    soil: [
      {
        title: 'Composting',
        description: 'Convert organic waste into nutrient-rich compost for soil enrichment.',
        impact: 'Produces 500kg compost monthly',
        difficulty: 'Easy',
        cost: '₹3,000 - 5,000',
        implementation: [
          'Set up compost pit or bin',
          'Layer green and brown materials',
          'Turn mixture regularly',
          'Maintain proper moisture',
          'Harvest mature compost'
        ],
        benefits: ['Improved soil structure', 'Better water retention', 'Reduced fertilizer costs']
      },
      {
        title: 'Cover Cropping',
        description: 'Plant cover crops during off-season to improve soil health.',
        impact: 'Increases soil nitrogen by 40%',
        difficulty: 'Medium',
        cost: '₹1,500 - 3,000',
        implementation: [
          'Choose appropriate cover crop variety',
          'Plant after main crop harvest',
          'Allow to grow for 60-90 days',
          'Incorporate into soil before next planting'
        ],
        benefits: ['Nitrogen fixation', 'Erosion prevention', 'Organic matter addition']
      },
      {
        title: 'Crop Rotation',
        description: 'Rotate different crop families to maintain soil fertility.',
        impact: 'Reduces pesticide use by 25%',
        difficulty: 'Medium',
        cost: 'No additional cost',
        implementation: [
          'Plan 3-4 year rotation cycle',
          'Alternate legumes with cereals',
          'Include deep and shallow-rooted crops',
          'Monitor soil health improvements'
        ],
        benefits: ['Disease prevention', 'Pest reduction', 'Soil nutrient balance']
      }
    ],
    energy: [
      {
        title: 'Solar Water Pumping',
        description: 'Replace electric pumps with solar-powered irrigation systems.',
        impact: 'Saves ₹50,000 annually',
        difficulty: 'Medium',
        cost: '₹1,20,000 - 1,80,000',
        implementation: [
          'Assess water requirements',
          'Size solar panel system',
          'Install panels and inverter',
          'Connect to water pump',
          'Set up monitoring system'
        ],
        benefits: ['Zero electricity bills', 'Environmental friendly', 'Government subsidies available']
      },
      {
        title: 'Biogas Plant',
        description: 'Generate methane from animal waste for cooking and heating.',
        impact: 'Produces 2m³ gas daily',
        difficulty: 'Hard',
        cost: '₹25,000 - 40,000',
        implementation: [
          'Construct digester chamber',
          'Install gas collection system',
          'Connect to storage and distribution',
          'Regular maintenance schedule'
        ],
        benefits: ['Free cooking gas', 'Organic slurry fertilizer', 'Waste management']
      }
    ],
    waste: [
      {
        title: 'Crop Residue Management',
        description: 'Convert crop waste into useful products instead of burning.',
        impact: 'Processes 2 tonnes residue',
        difficulty: 'Medium',
        cost: '₹8,000 - 15,000',
        implementation: [
          'Collect crop residues after harvest',
          'Shred or chop material',
          'Use for composting or mulching',
          'Create biochar for soil improvement'
        ],
        benefits: ['Reduces air pollution', 'Soil improvement', 'Additional income source']
      },
      {
        title: 'Plastic Recycling',
        description: 'Properly collect and recycle agricultural plastic waste.',
        impact: 'Recycles 100kg plastic monthly',
        difficulty: 'Easy',
        cost: '₹1,000 - 2,000',
        implementation: [
          'Set up collection bins',
          'Sort different plastic types',
          'Partner with recycling centers',
          'Regular pickup schedule'
        ],
        benefits: ['Cleaner farm environment', 'Potential income', 'Environmental protection']
      }
    ],
    biodiversity: [
      {
        title: 'Beneficial Insects Habitat',
        description: 'Create habitats to attract pest-controlling beneficial insects.',
        impact: 'Reduces pesticide use by 40%',
        difficulty: 'Easy',
        cost: '₹500 - 1,500',
        implementation: [
          'Plant flowering plants around fields',
          'Create insect hotels using natural materials',
          'Maintain diverse plant species',
          'Avoid broad-spectrum pesticides'
        ],
        benefits: ['Natural pest control', 'Improved pollination', 'Reduced chemical costs']
      },
      {
        title: 'Agroforestry',
        description: 'Integrate trees with agricultural crops for multiple benefits.',
        impact: 'Sequesters 5 tonnes CO₂ yearly',
        difficulty: 'Hard',
        cost: '₹10,000 - 20,000',
        implementation: [
          'Select appropriate tree species',
          'Plan tree placement for minimal crop interference',
          'Plant during monsoon season',
          'Regular pruning and maintenance'
        ],
        benefits: ['Additional income from timber/fruits', 'Improved microclimate', 'Carbon sequestration']
      }
    ]
  };

  const currentPractices = practices[activeCategory as keyof typeof practices] || [];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-600 text-white',
      green: 'bg-green-600 text-white',
      yellow: 'bg-yellow-600 text-white',
      purple: 'bg-purple-600 text-white',
      teal: 'bg-teal-600 text-white'
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Leaf className="h-8 w-8" />
          <div>
            <h2 className="text-3xl font-bold">Sustainable Farming Practices</h2>
            <p className="text-green-100">Build a more sustainable and profitable farm</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold">15%</div>
            <div className="text-sm text-green-100">Cost Reduction</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold">40%</div>
            <div className="text-sm text-green-100">Water Savings</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold">25%</div>
            <div className="text-sm text-green-100">Yield Increase</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-green-100">Practices Adopted</div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-4 rounded-lg text-center transition-all ${
                  activeCategory === category.id
                    ? getColorClasses(category.color)
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-8 w-8 mx-auto mb-2" />
                <div className="font-medium">{category.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Practices Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {currentPractices.map((practice, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{practice.title}</h3>
                <p className="text-gray-600">{practice.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(practice.difficulty)}`}>
                {practice.difficulty}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Impact</div>
                <div className="font-semibold text-green-800">{practice.impact}</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Investment</div>
                <div className="font-semibold text-blue-800">{practice.cost}</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Implementation Steps</h4>
                <ul className="space-y-1">
                  {practice.implementation.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-sm text-gray-600 flex items-start">
                      <span className="w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        {stepIndex + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Key Benefits</h4>
                <div className="flex flex-wrap gap-2">
                  {practice.benefits.map((benefit, benefitIndex) => (
                    <span
                      key={benefitIndex}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                Start Implementation
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Tracking */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Sustainability Progress</h3>
          <Zap className="h-6 w-6 text-yellow-500" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <div className="w-full h-full bg-gray-200 rounded-full">
                <div className="w-full h-full bg-green-500 rounded-full" style={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 65%, 50% 65%)' }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-900">65%</span>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900">Water Conservation</h4>
            <p className="text-sm text-gray-600">3 of 5 practices implemented</p>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <div className="w-full h-full bg-gray-200 rounded-full">
                <div className="w-full h-full bg-blue-500 rounded-full" style={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 45%, 50% 45%)' }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-900">45%</span>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900">Energy Efficiency</h4>
            <p className="text-sm text-gray-600">1 of 3 practices implemented</p>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <div className="w-full h-full bg-gray-200 rounded-full">
                <div className="w-full h-full bg-purple-500 rounded-full" style={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 80%, 50% 80%)' }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-900">80%</span>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900">Soil Health</h4>
            <p className="text-sm text-gray-600">4 of 5 practices implemented</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainablePractices;