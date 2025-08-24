import { APP_NAME } from "@/data/constants";
import CurrentYear from "./CurrentYear";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-stealth-gray to-panel-bg text-white py-8 mt-16 border-t-2 border-nasa-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Mission Status */}
          <div className="border-t border-border-color pt-6">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            </div>
            <p className="text-gray-400 text-sm">
              © <CurrentYear /> {APP_NAME} - Cultivating future aviation and space pioneers!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
