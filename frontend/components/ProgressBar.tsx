interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full bg-stealth-gray rounded-full h-4 border-2 border-nasa-blue overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-nasa-blue to-success transition-all duration-500 ease-out relative"
        style={{ width: `${percentage}%` }}
      >
        {/* Mission progress indicator */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
          <div className="text-lg">P</div>
        </div>
        
        {/* Progress trail */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
