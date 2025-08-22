export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-stealth-gray to-panel-bg text-white py-8 mt-16 border-t-2 border-nasa-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Mission Footer Content */}
          <div className="mb-6">
            <div className="flex justify-center space-x-4 mb-4">
              <span className="text-2xl">P</span>
              <span className="text-2xl">A</span>
              <span className="text-2xl">S</span>
              <span className="text-2xl">M</span>
              <span className="text-2xl">C</span>
            </div>
            <h3 className="text-xl font-bold font-display text-nasa-blue">PlaneBrain Mission Control</h3>
            <p className="text-gray-400">Advanced training simulation for aviation and space operations</p>
          </div>
          
          {/* Mission Facts */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-panel-bg p-4 rounded-lg border border-nasa-blue">
              <div className="text-2xl mb-2">E</div>
              <p className="text-sm text-gray-300">NASA's International Space Station orbits Earth every 90 minutes at 17,500 mph!</p>
            </div>
            <div className="bg-panel-bg p-4 rounded-lg border border-military-green">
              <div className="text-2xl mb-2">R</div>
              <p className="text-sm text-gray-300">The Saturn V rocket that took astronauts to the Moon was 363 feet tall!</p>
            </div>
            <div className="bg-panel-bg p-4 rounded-lg border border-nasa-red">
              <div className="text-2xl mb-2">F</div>
              <p className="text-sm text-gray-300">The F-22 Raptor can reach speeds of Mach 2.25 (1,500 mph) in supercruise!</p>
            </div>
          </div>
          
          {/* Mission Status */}
          <div className="border-t border-border-color pt-6">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-success text-sm font-bold">MISSION STATUS: OPERATIONAL</span>
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 PlaneBrain Mission Control - Advanced training simulation for future aviation and space pioneers!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
