import React from 'react';
import { CloudRain, Droplets, RotateCcw } from 'lucide-react';

interface ControlsProps {
  selectedPlot: string;
  onPlotSelect: (plotId: string) => void;
  onRainEvent: () => void;
  onIrrigationEvent: () => void;
  onResetData: () => void;
  plots: Array<{ id: string; name: string; crop: string }>;
}

export const Controls: React.FC<ControlsProps> = ({
  selectedPlot,
  onPlotSelect,
  onRainEvent,
  onIrrigationEvent,
  onResetData,
  plots,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Dashboard Controls</h3>
      
      <div className="flex flex-wrap items-center gap-4">
        {/* Plot Selection */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Select Plot:</label>
          <select
            value={selectedPlot}
            onChange={(e) => onPlotSelect(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {plots.map((plot) => (
              <option key={plot.id} value={plot.id}>
                {plot.name} - {plot.crop}
              </option>
            ))}
          </select>
        </div>

        {/* Event Simulation Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={onRainEvent}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm"
          >
            <CloudRain className="mr-2" size={16} />
            Simulate Rain
          </button>
          
          <button
            onClick={onIrrigationEvent}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 text-sm"
          >
            <Droplets className="mr-2" size={16} />
            Apply Irrigation
          </button>
          
          <button
            onClick={onResetData}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 text-sm"
          >
            <RotateCcw className="mr-2" size={16} />
            Reset Data
          </button>
        </div>
      </div>
    </div>
  );
};