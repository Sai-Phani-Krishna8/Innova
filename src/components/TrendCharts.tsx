import React, { useState } from 'react';
import { TrendingUp, Thermometer, Droplets } from 'lucide-react';

interface DataPoint {
  time: string;
  moisture: number;
  temperature: number;
}

interface TrendChartsProps {
  selectedPlot: string;
  data: DataPoint[];
}

export const TrendCharts: React.FC<TrendChartsProps> = ({ selectedPlot, data }) => {
  const [hoveredPoint, setHoveredPoint] = useState<{ index: number; type: 'moisture' | 'temperature' } | null>(null);

  const createPath = (values: number[], maxValue: number, height: number) => {
    const width = 600;
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    return values.map((value, index) => {
      const x = padding + (index / (values.length - 1)) * chartWidth;
      const y = padding + chartHeight - (value / maxValue) * chartHeight;
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ');
  };

  const moistureValues = data.map(d => d.moisture);
  const temperatureValues = data.map(d => d.temperature);
  const maxMoisture = Math.max(...moistureValues, 50);
  const maxTemp = Math.max(...temperatureValues, 40);

  const moisturePath = createPath(moistureValues, maxMoisture, 200);
  const temperaturePath = createPath(temperatureValues, maxTemp, 200);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Soil Moisture Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Droplets className="mr-2 text-blue-600" />
          Soil Moisture - {selectedPlot}
        </h3>
        
        <div className="relative">
          <svg width="100%" height="200" viewBox="0 0 600 200" className="border rounded-lg bg-gradient-to-b from-blue-50 to-white">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map(y => (
              <line
                key={y}
                x1="40"
                y1={40 + (160 * (100 - y)) / 100}
                x2="560"
                y2={40 + (160 * (100 - y)) / 100}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}
            
            {/* Y-axis labels */}
            {[0, 25, 50].map(y => (
              <text
                key={y}
                x="25"
                y={40 + (160 * (50 - y)) / 50 + 5}
                fontSize="12"
                fill="#6b7280"
                textAnchor="middle"
              >
                {y}%
              </text>
            ))}

            {/* Data line */}
            <path
              d={moisturePath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Data points */}
            {moistureValues.map((value, index) => {
              const x = 40 + (index / (moistureValues.length - 1)) * 520;
              const y = 40 + 160 - (value / maxMoisture) * 160;
              
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#3b82f6"
                  className="cursor-pointer hover:r-6 transition-all"
                  onMouseEnter={() => setHoveredPoint({ index, type: 'moisture' })}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              );
            })}

            {/* Tooltip */}
            {hoveredPoint && hoveredPoint.type === 'moisture' && (
              <g>
                <rect
                  x={40 + (hoveredPoint.index / (moistureValues.length - 1)) * 520 - 30}
                  y={40 + 160 - (moistureValues[hoveredPoint.index] / maxMoisture) * 160 - 35}
                  width="60"
                  height="25"
                  fill="rgba(0,0,0,0.8)"
                  rx="4"
                />
                <text
                  x={40 + (hoveredPoint.index / (moistureValues.length - 1)) * 520}
                  y={40 + 160 - (moistureValues[hoveredPoint.index] / maxMoisture) * 160 - 18}
                  fill="white"
                  fontSize="12"
                  textAnchor="middle"
                >
                  {moistureValues[hoveredPoint.index]}%
                </text>
              </g>
            )}
          </svg>
          
          {/* X-axis labels */}
          <div className="flex justify-between mt-2 px-10 text-sm text-gray-600">
            {data.map((d, index) => (
              <span key={index} className={index % 2 === 0 ? '' : 'opacity-50'}>
                {d.time}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Temperature Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Thermometer className="mr-2 text-red-600" />
          Temperature - {selectedPlot}
        </h3>
        
        <div className="relative">
          <svg width="100%" height="200" viewBox="0 0 600 200" className="border rounded-lg bg-gradient-to-b from-red-50 to-white">
            {/* Grid lines */}
            {[20, 25, 30, 35, 40].map(temp => (
              <line
                key={temp}
                x1="40"
                y1={40 + (160 * (40 - temp)) / 20}
                x2="560"
                y2={40 + (160 * (40 - temp)) / 20}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}
            
            {/* Y-axis labels */}
            {[20, 30, 40].map(temp => (
              <text
                key={temp}
                x="25"
                y={40 + (160 * (40 - temp)) / 20 + 5}
                fontSize="12"
                fill="#6b7280"
                textAnchor="middle"
              >
                {temp}°C
              </text>
            ))}

            {/* Data line */}
            <path
              d={temperaturePath}
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Data points */}
            {temperatureValues.map((value, index) => {
              const x = 40 + (index / (temperatureValues.length - 1)) * 520;
              const y = 40 + 160 - ((value - 20) / 20) * 160;
              
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#ef4444"
                  className="cursor-pointer hover:r-6 transition-all"
                  onMouseEnter={() => setHoveredPoint({ index, type: 'temperature' })}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              );
            })}

            {/* Tooltip */}
            {hoveredPoint && hoveredPoint.type === 'temperature' && (
              <g>
                <rect
                  x={40 + (hoveredPoint.index / (temperatureValues.length - 1)) * 520 - 35}
                  y={40 + 160 - ((temperatureValues[hoveredPoint.index] - 20) / 20) * 160 - 35}
                  width="70"
                  height="25"
                  fill="rgba(0,0,0,0.8)"
                  rx="4"
                />
                <text
                  x={40 + (hoveredPoint.index / (temperatureValues.length - 1)) * 520}
                  y={40 + 160 - ((temperatureValues[hoveredPoint.index] - 20) / 20) * 160 - 18}
                  fill="white"
                  fontSize="12"
                  textAnchor="middle"
                >
                  {temperatureValues[hoveredPoint.index]}°C
                </text>
              </g>
            )}
          </svg>
          
          {/* X-axis labels */}
          <div className="flex justify-between mt-2 px-10 text-sm text-gray-600">
            {data.map((d, index) => (
              <span key={index} className={index % 2 === 0 ? '' : 'opacity-50'}>
                {d.time}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};