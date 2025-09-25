import React from 'react';
import { Droplets, Sprout, MapPin } from 'lucide-react';

interface Plot {
  id: string;
  name: string;
  moisture: number;
  crop: string;
  x: number;
  y: number;
}

interface FarmPlotsProps {
  plots: Plot[];
  selectedPlot: string;
  onPlotSelect: (plotId: string) => void;
}

export const FarmPlots: React.FC<FarmPlotsProps> = ({ plots, selectedPlot, onPlotSelect }) => {
  const getMoistureStatus = (moisture: number) => {
    if (moisture > 40) return { color: 'bg-green-400', status: 'Healthy' };
    if (moisture >= 30) return { color: 'bg-yellow-400', status: 'Moderate' };
    return { color: 'bg-red-400', status: 'Low' };
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <MapPin className="mr-2 text-green-600" />
        Farm Plot Overview
      </h2>
      
      <div className="relative bg-gradient-to-b from-green-50 to-green-100 rounded-lg p-8 min-h-96">
        {/* Farm boundary */}
        <div className="absolute inset-4 border-2 border-green-300 border-dashed rounded-lg"></div>
        
        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-sm">
          <div className="text-sm font-medium mb-2">Soil Moisture</div>
          <div className="space-y-1">
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 bg-green-400 rounded mr-2"></div>
              Healthy (&gt;40%)
            </div>
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 bg-yellow-400 rounded mr-2"></div>
              Moderate (30-40%)
            </div>
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 bg-red-400 rounded mr-2"></div>
              Low (&lt;30%)
            </div>
          </div>
        </div>

        {/* Plots */}
        {plots.map((plot) => {
          const status = getMoistureStatus(plot.moisture);
          const isSelected = selectedPlot === plot.id;
          
          return (
            <div
              key={plot.id}
              className={`absolute cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                isSelected ? 'ring-4 ring-blue-400 ring-opacity-50' : ''
              }`}
              style={{
                left: `${plot.x}%`,
                top: `${plot.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => onPlotSelect(plot.id)}
            >
              <div
                className={`w-20 h-16 ${status.color} rounded-lg flex items-center justify-center shadow-lg border-2 border-white`}
              >
                <Sprout className="text-white" size={24} />
              </div>
              
              <div className="mt-2 text-center">
                <div className="text-sm font-medium text-gray-800">{plot.name}</div>
                <div className="text-xs text-gray-600">{plot.crop}</div>
                <div className="text-xs font-medium text-gray-700">{plot.moisture}%</div>
              </div>
              
              {/* Irrigation icon */}
              <div className="absolute -top-2 -right-2">
                <Droplets 
                  className={`${plot.moisture < 35 ? 'text-blue-600' : 'text-gray-300'} bg-white rounded-full p-1`} 
                  size={20} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};