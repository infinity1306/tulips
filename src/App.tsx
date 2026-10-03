import { MainScene } from './scene/MainScene';
import { UIOverlay } from './scene/UIOverlay';

function App() {
  return (
    <div className="w-full h-dvh bg-black overflow-hidden relative">
      <MainScene />
      <UIOverlay />
    </div>
  );
}

export default App;
