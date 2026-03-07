import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  defaultADLRows,
  defaultIADLRows,
  defaultMemoryRows,
  defaultBehavioralRows,
  defaultFamilyHistoryRows,
  defaultArteryRows,
} from '../data/internalFields';

export type ViewMode = 'wizard' | 'scroll';

interface AppSettings {
  viewMode: ViewMode;
  hideImages: boolean;
}

interface FormStore {
  // Cardio form data
  cardio: Record<string, unknown>;
  // Internal form data
  internal: Record<string, unknown>;
  // Table data for internal
  adlRows: typeof defaultADLRows;
  iadlRows: typeof defaultIADLRows;
  memoryRows: typeof defaultMemoryRows;
  behavioralRows: typeof defaultBehavioralRows;
  familyHistoryRows: typeof defaultFamilyHistoryRows;
  arteryRows: typeof defaultArteryRows;
  // Settings
  settings: AppSettings;
  // Active wizard step per form
  cardioStep: number;
  internalStep: number;
  bothStep: number;

  // Actions
  setCardioField: (id: string, value: unknown) => void;
  setInternalField: (id: string, value: unknown) => void;
  setADLRow: (index: number, value: string) => void;
  setIADLRow: (index: number, value: string) => void;
  setMemoryRow: (index: number, field: 'present' | 'comments', value: boolean | string) => void;
  setBehavioralRow: (index: number, field: 'present' | 'comments', value: boolean | string) => void;
  setFamilyHistoryRow: (index: number, field: 'familyMember' | 'ageOfOnset', value: string) => void;
  setArteryRow: (index: number, field: string, value: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setHideImages: (hide: boolean) => void;
  setCardioStep: (step: number) => void;
  setInternalStep: (step: number) => void;
  setBothStep: (step: number) => void;
  clearAll: () => void;
  clearCardio: () => void;
  clearInternal: () => void;
}

const initialState = {
  cardio: {} as Record<string, unknown>,
  internal: {} as Record<string, unknown>,
  adlRows: structuredClone(defaultADLRows),
  iadlRows: structuredClone(defaultIADLRows),
  memoryRows: structuredClone(defaultMemoryRows),
  behavioralRows: structuredClone(defaultBehavioralRows),
  familyHistoryRows: structuredClone(defaultFamilyHistoryRows),
  arteryRows: structuredClone(defaultArteryRows),
  settings: { viewMode: 'wizard' as ViewMode, hideImages: false },
  cardioStep: 0,
  internalStep: 0,
  bothStep: 0,
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      ...initialState,

      setCardioField: (id, value) =>
        set((state) => ({ cardio: { ...state.cardio, [id]: value } })),

      setInternalField: (id, value) =>
        set((state) => ({ internal: { ...state.internal, [id]: value } })),

      setADLRow: (index, value) =>
        set((state) => {
          const rows = [...state.adlRows];
          rows[index] = { ...rows[index], value: value as '' };
          return { adlRows: rows };
        }),

      setIADLRow: (index, value) =>
        set((state) => {
          const rows = [...state.iadlRows];
          rows[index] = { ...rows[index], value: value as '' };
          return { iadlRows: rows };
        }),

      setMemoryRow: (index, field, value) =>
        set((state) => {
          const rows = [...state.memoryRows];
          rows[index] = { ...rows[index], [field]: value };
          return { memoryRows: rows };
        }),

      setBehavioralRow: (index, field, value) =>
        set((state) => {
          const rows = [...state.behavioralRows];
          rows[index] = { ...rows[index], [field]: value };
          return { behavioralRows: rows };
        }),

      setFamilyHistoryRow: (index, field, value) =>
        set((state) => {
          const rows = [...state.familyHistoryRows];
          rows[index] = { ...rows[index], [field]: value };
          return { familyHistoryRows: rows };
        }),

      setArteryRow: (index, field, value) =>
        set((state) => {
          const rows = [...state.arteryRows];
          rows[index] = { ...rows[index], [field]: value };
          return { arteryRows: rows };
        }),

      setViewMode: (mode) =>
        set((state) => ({ settings: { ...state.settings, viewMode: mode } })),

      setHideImages: (hide) =>
        set((state) => ({ settings: { ...state.settings, hideImages: hide } })),

      setCardioStep: (step) => set({ cardioStep: step }),
      setInternalStep: (step) => set({ internalStep: step }),
      setBothStep: (step) => set({ bothStep: step }),

      clearAll: () => set((state) => ({ ...structuredClone(initialState), settings: state.settings })),
      clearCardio: () => set({ cardio: {}, cardioStep: 0, bothStep: 0 }),
      clearInternal: () =>
        set({
          internal: {},
          internalStep: 0,
          adlRows: structuredClone(defaultADLRows),
          iadlRows: structuredClone(defaultIADLRows),
          memoryRows: structuredClone(defaultMemoryRows),
          behavioralRows: structuredClone(defaultBehavioralRows),
          familyHistoryRows: structuredClone(defaultFamilyHistoryRows),
          arteryRows: structuredClone(defaultArteryRows),
        }),
    }),
    {
      name: 'hospital-cases-store',
    }
  )
);
