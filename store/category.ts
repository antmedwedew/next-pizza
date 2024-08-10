import { create } from 'zustand';

interface CategoryStateType {
  activeId: number;
  setActiveId: (activeId: number) => void;
}

export const useCategoryStore = create<CategoryStateType>()((set) => ({
  activeId: 0,
  setActiveId: (activeId: number) => set({ activeId }),
}));
