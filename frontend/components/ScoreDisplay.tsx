interface ScoreDisplayProps {
  score: number;
  total: number;
  show: boolean;
}

export default function ScoreDisplay({ score, total, show }: ScoreDisplayProps) {
  const percentage = (score / total) * 100;
  
  const getScoreEmoji = () => {
    if (percentage >= 90) return 'C';
    if (percentage >= 80) return 'E';
    if (percentage >= 70) return 'M';
    if (percentage >= 60) return 'F';
    if (percentage >= 50) return 'S';
    return 'P';
  };
  
  const getScoreMessage = () => {
    if (percentage >= 90) return 'Mission Commander!';
    if (percentage >= 80) return 'Elite Pilot!';
    if (percentage >= 70) return 'Mission Specialist!';
    if (percentage >= 60) return 'Flight Officer!';
    if (percentage >= 50) return 'Cadet!';
    return 'Mission Trainee!';
  };

  const getMissionStatus = () => {
    if (percentage >= 90) return 'MISSION ACCOMPLISHED';
    if (percentage >= 80) return 'MISSION SUCCESSFUL';
    if (percentage >= 70) return 'MISSION COMPLETE';
    if (percentage >= 60) return 'MISSION PARTIAL';
    if (percentage >= 50) return 'MISSION CHALLENGING';
    return 'MISSION TRAINING';
  };
  
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="panel-bg rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border-4 border-nasa-blue nasa-glow">
        <div className="text-center">
          {/* Mission Status */}
          <div className="mb-4">
            <div className="flex justify-center items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-success text-sm font-bold">{getMissionStatus()}</span>
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Score Emoji */}
          {/* <div className="text-6xl mb-4 animate-bounce">
            {getScoreEmoji()}
          </div> */}
          
          {/* Score Title */}
          <h2 className="text-3xl font-bold text-white mb-4 font-display">
            Mission Complete!
          </h2>
          
          {/* Score Display */}
          <div className="mb-6">
            <div className="text-4xl font-bold text-nasa-blue mb-2">
              {score}/{total}
            </div>
            <div className="text-lg text-gray-400">
              {percentage.toFixed(0)}% Success Rate
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-stealth-gray rounded-full h-3 mb-6 border border-border-color">
            <div 
              className="h-full bg-gradient-to-r from-nasa-blue to-success rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          
          {/* Score Message */}
          <div className="text-xl font-bold text-success mb-6">
            {getScoreMessage()}
          </div>
          
          {/* Mission Facts */}
          {/* <div className="bg-stealth-gray p-4 rounded-xl mb-6 border border-border-color">
            <p className="text-sm text-gray-300">
              Mission Intel: NASA's Artemis program aims to return humans to the Moon by 2025 and establish a sustainable lunar presence!
            </p>
          </div> */}
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()}
              className="w-full military-btn text-white py-3 px-6 rounded-xl font-bold text-lg hover-lift nasa-glow"
            >
              New Mission
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-stealth-gray text-white py-3 px-6 rounded-xl font-medium hover:bg-border-color border border-border-color"
            >
              Return to Base
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
