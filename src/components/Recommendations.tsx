import React from 'react';
import { AlertTriangle, CheckCircle, Droplets, TrendingUp } from 'lucide-react';

interface Plot {
  id: string;
  name: string;
  moisture: number;
  temperature: number;
  crop: string;
}

interface RecommendationsProps {
  plots: Plot[];
}

export const Recommendations: React.FC<RecommendationsProps> = ({ plots }) => {
  const getRecommendation = (plot: Plot) => {
    if (plot.moisture < 30) {
      return {
        type: 'critical',
        icon: AlertTriangle,
        message: `Irrigate immediately with 25L`,
        action: 'Critical - Water needed',
        color: 'border-red-500 bg-red-50',
        iconColor: 'text-red-600',
        actionColor: 'bg-red-600',
      };
    } else if (plot.moisture < 40) {
      return {
        type: 'warning',
        icon: Droplets,
        message: `Consider irrigation with 15L`,
        action: 'Monitor closely',
        color: 'border-yellow-500 bg-yellow-50',
        iconColor: 'text-yellow-600',
        actionColor: 'bg-yellow-600',
      };
    } else {
      return {
        type: 'healthy',
        icon: CheckCircle,
        message: `Optimal moisture level`,
        action: 'No action needed',
        color: 'border-green-500 bg-green-50',
        iconColor: 'text-green-600',
        actionColor: 'bg-green-600',
      };
    }
  };

  const criticalPlots = plots.filter(p => p.moisture < 30).length;
  const warningPlots = plots.filter(p => p.moisture >= 30 && p.moisture < 40).length;
  const healthyPlots = plots.filter(p => p.moisture >= 40).length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical Plots</p>
              <p className="text-2xl font-bold text-red-600">{criticalPlots}</p>
            </div>
            <AlertTriangle className="text-red-500" size={32} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Warning Plots</p>
              <p className="text-2xl font-bold text-yellow-600">{warningPlots}</p>
            </div>
            <TrendingUp className="text-yellow-500" size={32} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Healthy Plots</p>
              <p className="text-2xl font-bold text-green-600">{healthyPlots}</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </div>
      </div>

      {/* Detailed Recommendations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Irrigation Recommendations</h3>
        
        <div className="space-y-4">
          {plots.map((plot) => {
            const rec = getRecommendation(plot);
            const IconComponent = rec.icon;
            
            return (
              <div
                key={plot.id}
                className={`border rounded-lg p-4 ${rec.color} transition-all duration-200 hover:shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <IconComponent className={rec.iconColor} size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-800">{plot.name}</h4>
                      <p className="text-sm text-gray-600">{plot.crop} • {plot.moisture}% moisture</p>
                      <p className="text-sm text-gray-700 mt-1">{rec.message}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-white text-sm ${rec.actionColor}`}>
                      {rec.action}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{plot.temperature}°C</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};