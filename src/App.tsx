import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';
import { FarmPlots } from './components/FarmPlots';
import { TrendCharts } from './components/TrendCharts';
import { Recommendations } from './components/Recommendations';
import { Controls } from './components/Controls';

interface Plot {
  id: string;
  name: string;
  moisture: number;
  temperature: number;
  crop: string;
  x: number;
  y: number;
}

interface DataPoint {
  time: string;
  moisture: number;
  temperature: number;
}

function App() {
  const [selectedPlot, setSelectedPlot] = useState('plot1');
  const [plots, setPlots] = useState<Plot[]>([
    { id: 'plot1', name: 'Plot 1', moisture: 28, temperature: 32, crop: 'Tomatoes', x: 25, y: 30 },
    { id: 'plot2', name: 'Plot 2', moisture: 45, temperature: 29, crop: 'Corn', x: 60, y: 25 },
    { id: 'plot3', name: 'Plot 3', moisture: 35, temperature: 31, crop: 'Wheat', x: 35, y: 60 },
    { id: 'plot4', name: 'Plot 4', moisture: 42, temperature: 28, crop: 'Soybeans', x: 70, y: 55 },
    { id: 'plot5', name: 'Plot 5', moisture: 25, temperature: 33, crop: 'Carrots', x: 50, y: 75 },
  ]);

  const [chartData, setChartData] = useState<Record<string, DataPoint[]>>({});

  // Initialize chart data
  useEffect(() => {
    const generateInitialData = () => {
      const data: Record<string, DataPoint[]> = {};
      
      plots.forEach(plot => {
        data[plot.id] = [];
        for (let i = 0; i < 8; i++) {
          const hour = 6 + i * 2;
          data[plot.id].push({
            time: `${hour}:00`,
            moisture: plot.moisture + Math.random() * 10 - 5,
            temperature: plot.temperature + Math.random() * 6 - 3,
          });
        }
      });
      
      return data;
    };

    setChartData(generateInitialData());
  }, []);

  // Update chart data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prevData => {
        const newData = { ...prevData };
        
        Object.keys(newData).forEach(plotId => {
          const plot = plots.find(p => p.id === plotId);
          if (plot && newData[plotId].length > 0) {
            // Add new data point and remove oldest if we have more than 8
            const lastPoint = newData[plotId][newData[plotId].length - 1];
            const currentHour = parseInt(lastPoint.time.split(':')[0]);
            const nextHour = currentHour + 2;
            
            if (nextHour <= 22) {
              const newPoint: DataPoint = {
                time: `${nextHour}:00`,
                moisture: plot.moisture + Math.random() * 8 - 4,
                temperature: plot.temperature + Math.random() * 4 - 2,
              };
              
              newData[plotId] = [...newData[plotId].slice(-7), newPoint];
            }
          }
        });
        
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [plots]);

  const handleRainEvent = () => {
    setPlots(prevPlots => 
      prevPlots.map(plot => ({
        ...plot,
        moisture: Math.min(50, plot.moisture + Math.random() * 15 + 10),
        temperature: Math.max(25, plot.temperature - Math.random() * 3),
      }))
    );
  };

  const handleIrrigationEvent = () => {
    setPlots(prevPlots => 
      prevPlots.map(plot => 
        plot.id === selectedPlot
          ? {
              ...plot,
              moisture: Math.min(50, plot.moisture + Math.random() * 10 + 8),
            }
          : plot
      )
    );
  };

  const handleResetData = () => {
    setPlots(prevPlots => 
      prevPlots.map(plot => ({
        ...plot,
        moisture: Math.random() * 25 + 25, // 25-50%
        temperature: Math.random() * 10 + 25, // 25-35°C
      }))
    );
  };

  const selectedPlotData = chartData[selectedPlot] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Leaf className="text-green-600 mr-3" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Smart Agriculture Dashboard</h1>
                <p className="text-sm text-gray-600">Precision farming through IoT monitoring</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Last Updated</div>
              <div className="text-lg font-medium text-gray-900">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Controls */}
        <Controls
          selectedPlot={selectedPlot}
          onPlotSelect={setSelectedPlot}
          onRainEvent={handleRainEvent}
          onIrrigationEvent={handleIrrigationEvent}
          onResetData={handleResetData}
          plots={plots}
        />

        {/* Farm Overview */}
        <FarmPlots
          plots={plots}
          selectedPlot={selectedPlot}
          onPlotSelect={setSelectedPlot}
        />

        {/* Charts */}
        <TrendCharts
          selectedPlot={selectedPlot}
          data={selectedPlotData}
        />

        {/* Recommendations */}
        <Recommendations plots={plots} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              © 2025 Smart Agriculture Dashboard - Precision Farming Solutions
            </p>
            <p className="text-xs mt-1">
              IoT sensor data simulation for demonstration purposes
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;