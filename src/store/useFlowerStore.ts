import { create } from 'zustand';

export type FlowerType = 'Rose' | 'Tulip' | 'Sunflower' | 'Lily' | 'Daisy' | 'Lavender' | 'CherryBlossom';

export interface FlowerData {
  id: string;
  type: FlowerType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

export type WrapperStyle = 'newspaper' | 'kraft' | 'black';

export type ScreenState = 'scan' | 'my-flowers';

interface FlowerState {
  flowers: FlowerData[];
  selectedType: FlowerType;
  isBouquetMode: boolean;
  wrapperStyle: WrapperStyle;
  selectedFlowerId: string | null;
  controlMode: 'translate' | 'rotate' | 'scale';
  currentScreen: ScreenState;
  addFlower: (flower: Omit<FlowerData, 'id'>) => void;
  updateFlowerPosition: (id: string, position: [number, number, number]) => void;
  updateFlowerData: (id: string, data: Partial<FlowerData>) => void;
  clearFlowers: () => void;
  setSelectedType: (type: FlowerType) => void;
  toggleBouquetMode: () => void;
  cycleWrapperStyle: () => void;
  setSelectedFlowerId: (id: string | null) => void;
  setControlMode: (mode: 'translate' | 'rotate' | 'scale') => void;
  setCurrentScreen: (screen: ScreenState) => void;
}

export const useFlowerStore = create<FlowerState>((set) => ({
  flowers: [],
  selectedType: 'Rose',
  isBouquetMode: false,
  wrapperStyle: 'newspaper',
  selectedFlowerId: null,
  controlMode: 'translate',
  currentScreen: 'scan',
  addFlower: (flower) => set((state) => ({
    flowers: [...state.flowers, { ...flower, id: Math.random().toString(36).substring(2, 11) }]
  })),
  updateFlowerPosition: (id, position) => set((state) => ({
    flowers: state.flowers.map(f => f.id === id ? { ...f, position } : f)
  })),
  updateFlowerData: (id, data) => set((state) => ({
    flowers: state.flowers.map(f => f.id === id ? { ...f, ...data } : f)
  })),
  clearFlowers: () => set({ flowers: [], selectedFlowerId: null }),
  setSelectedType: (type) => set({ selectedType: type }),
  toggleBouquetMode: () => set((state) => ({ isBouquetMode: !state.isBouquetMode, selectedFlowerId: null })),
  cycleWrapperStyle: () => set((state) => {
    const styles: WrapperStyle[] = ['newspaper', 'kraft', 'black'];
    const currentIndex = styles.indexOf(state.wrapperStyle);
    const nextIndex = (currentIndex + 1) % styles.length;
    return { wrapperStyle: styles[nextIndex] };
  }),
  setSelectedFlowerId: (id) => set({ selectedFlowerId: id }),
  setControlMode: (mode) => set({ controlMode: mode }),
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
}));
