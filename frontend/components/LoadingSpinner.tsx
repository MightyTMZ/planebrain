export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        {/* Rotating rocket */}
        <div className="animate-spin w-16 h-16">
          <div className="text-4xl">P</div>
        </div>
        
        {/* Launch trail */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-nasa-blue rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-nasa-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-nasa-blue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
      
      <p className="mt-4 text-lg text-nasa-blue font-medium">Initializing mission systems...</p>
      <div className="mt-2 flex space-x-1">
        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-success rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-success rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
}
