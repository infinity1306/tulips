import { useState } from 'react';
import type { FlowerType } from '@/store/useFlowerStore';
import { useFlowerStore } from '@/store/useFlowerStore';
import { FlowerRegistry } from '../flowers/FlowerRegistry';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, Trash2, Wand2, Flower2, FileText, ScanLine, Leaf, ChevronRight } from 'lucide-react';
import { MyFlowersScreen } from './MyFlowersScreen';

const flowerIcons: Record<string, string> = {
  Rose: '🌹',
  Tulip: '🌷',
  Sunflower: '🌻',
  Lily: '🌸',
  Daisy: '🌼',
  Lavender: '🪻',
  CherryBlossom: '💮',
};

export function UIOverlay() {
  const selectedType = useFlowerStore(state => state.selectedType);
  const setSelectedType = useFlowerStore(state => state.setSelectedType);
  const addFlower = useFlowerStore(state => state.addFlower);
  const clearFlowers = useFlowerStore(state => state.clearFlowers);
  const isBouquetMode = useFlowerStore(state => state.isBouquetMode);
  const toggleBouquetMode = useFlowerStore(state => state.toggleBouquetMode);
  const currentScreen = useFlowerStore(state => state.currentScreen);
  const setCurrentScreen = useFlowerStore(state => state.setCurrentScreen);
  const [showNote, setShowNote] = useState(false);
  
  const flowerTypes = Object.keys(FlowerRegistry) as FlowerType[];

  const handleSpawn = () => {
    addFlower({
      type: selectedType,
      position: [
        (Math.random() - 0.5) * 4,
        Math.random() * 2,
        (Math.random() - 0.5) * 2
      ],
      rotation: [
        (Math.random() - 0.5) * 0.2,
        Math.random() * Math.PI * 2,
        (Math.random() - 0.5) * 0.2
      ],
      scale: 0.8 + Math.random() * 0.4
    });
  };

  return (
    <>
      <AnimatePresence>
        {currentScreen === 'my-flowers' && <MyFlowersScreen />}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between z-30 font-sans overflow-hidden">
        
        {/* --- TOP SECTION --- */}
        <AnimatePresence>
          {currentScreen === 'scan' && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col p-4 md:p-8 pt-8 md:pt-10"
            >
        <header className="flex flex-row justify-between items-start w-full pointer-events-auto">
          <div className="flex flex-col">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl md:text-3xl font-serif tracking-tighter text-white drop-shadow-lg cursor-pointer select-none"
              onClick={() => setShowNote(!showNote)}
            >
              Shiwi's<span className="font-bold font-sans tracking-tight text-pink-400 ml-2">Garden</span>
            </motion.h1>
            <AnimatePresence>
              {showNote && (
                <motion.p
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="text-white/70 italic text-[10px] md:text-xs mt-1.5 max-w-[220px] md:max-w-[300px] leading-relaxed font-serif overflow-hidden"
                >
                  "prr ye saare phool bhi aap ke aage kuch nhii or inki mehek bhi aap ki mehek ke aage feeki hai"
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex gap-2 items-center">
            <div className="flex bg-[#111111]/80 backdrop-blur-md rounded-full border border-white/5 shadow-lg overflow-hidden">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('zoom-in'))}
                className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors border-r border-white/5 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn size={14} /> <span className="font-mono font-bold">+</span>
              </button>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('zoom-out'))}
                className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut size={14} /> <span className="font-mono font-bold">-</span>
              </button>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={clearFlowers}
              className="flex items-center justify-center p-2.5 bg-[#111111]/80 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-colors cursor-pointer border border-white/5 shadow-lg hover:bg-white/10"
              title="Clear Scene"
            >
              <Trash2 size={16} />
            </motion.button>
          </div>
        </header>
      </motion.div>
    )}
  </AnimatePresence>

  {/* --- BOTTOM SECTION --- */}
  <div className="w-full flex flex-col pointer-events-auto pb-4 md:pb-4 mt-auto z-50">
    
    <AnimatePresence>
      {currentScreen === 'scan' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="w-full"
        >
          {/* Flower Types Selector */}
        <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 md:px-6 mb-2 md:mb-4 flex items-end">
          <div className="flex gap-1 md:gap-2 min-w-max mx-auto px-2 pb-1 md:pb-2">
            {flowerTypes.map((type) => {
              const isActive = selectedType === type;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex flex-col items-center gap-1 md:gap-2 px-2 py-1.5 md:px-4 md:py-3 rounded-xl md:rounded-2xl transition-all cursor-pointer min-w-[55px] md:min-w-[70px] ${
                    isActive 
                      ? 'bg-pink-500/10 border border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.15)]'
                      : 'border border-transparent opacity-60 hover:opacity-100 hover:bg-white/5'
                  }`}
                >
                  <span className="text-xl md:text-2xl drop-shadow-md">{flowerIcons[type] || '🌸'}</span>
                  <span className={`text-[9px] md:text-xs ${isActive ? 'text-white font-medium' : 'text-white/80'}`}>
                    {type}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons Stack */}
        <div className="w-full px-3 md:px-4 flex flex-col gap-1.5 md:gap-2 max-w-md mx-auto mb-2 md:mb-4">
          <button
            onClick={handleSpawn}
            className="flex items-center justify-between px-4 py-1.5 md:px-5 md:py-2.5 rounded-full font-semibold shadow-[0_0_20px_rgba(236,72,153,0.2)] transition-all active:scale-[0.98] cursor-pointer bg-gradient-to-r from-pink-600 to-pink-500 text-white text-[11px] md:text-sm"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <Wand2 size={14} className="opacity-80 md:w-4 md:h-4" />
              <span>Spawn {selectedType}</span>
            </div>
            <ChevronRight size={14} className="opacity-70 md:w-4 md:h-4" />
          </button>

          <button
            onClick={toggleBouquetMode}
            className="flex items-center justify-between px-4 py-1.5 md:px-5 md:py-2.5 rounded-full font-medium transition-all active:scale-[0.98] backdrop-blur-md cursor-pointer bg-[#151515]/90 border border-white/10 text-white hover:bg-[#202020] text-[11px] md:text-sm"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <Flower2 size={14} className="text-white/60 md:w-4 md:h-4" />
              <span>{isBouquetMode ? 'Scatter Flowers' : 'Make Bouquet'}</span>
            </div>
            <ChevronRight size={14} className="text-white/40 md:w-4 md:h-4" />
          </button>

          <button
            onClick={useFlowerStore.getState().cycleWrapperStyle}
            className={`flex items-center justify-between px-4 py-1.5 md:px-5 md:py-2.5 rounded-full font-medium transition-all active:scale-[0.98] backdrop-blur-md cursor-pointer bg-[#151515]/90 border border-white/10 text-white hover:bg-[#202020] text-[11px] md:text-sm ${!isBouquetMode ? 'opacity-50 pointer-events-none hidden' : ''}`}
          >
            <div className="flex items-center gap-2 md:gap-3">
              <FileText size={14} className="text-white/60 md:w-4 md:h-4" />
              <span>Change Paper</span>
            </div>
            <ChevronRight size={14} className="text-white/40 md:w-4 md:h-4" />
          </button>
        </div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Bottom Nav Bar */}
      <div className="w-full flex justify-around items-center px-8 py-1.5 md:py-2.5 border-t border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl">
        <button 
          onClick={() => setCurrentScreen('scan')}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${currentScreen === 'scan' ? 'text-pink-500' : 'text-white/40 hover:text-white/80'}`}
        >
          <ScanLine size={20} />
          <span className="text-[10px] font-medium tracking-wide">Scan</span>
        </button>
        <button 
          onClick={() => setCurrentScreen('my-flowers')}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${currentScreen === 'my-flowers' ? 'text-pink-500' : 'text-white/40 hover:text-white/80'}`}
        >
          <Leaf size={20} />
          <span className="text-[10px] font-medium tracking-wide">My Flowers</span>
        </button>
      </div>

    </div>
  </div>
  </>
);
}
