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

export type CaseType = 'cardio' | 'internal' | 'both';

export interface SavedCase {
  id: string;
  type: CaseType;
  patientName: string;
  savedAt: number; // timestamp
  cardio: Record<string, unknown>;
  internal: Record<string, unknown>;
  adlRows: typeof defaultADLRows;
  iadlRows: typeof defaultIADLRows;
  memoryRows: typeof defaultMemoryRows;
  behavioralRows: typeof defaultBehavioralRows;
  familyHistoryRows: typeof defaultFamilyHistoryRows;
  arteryRows: typeof defaultArteryRows;
}

interface CasesStore {
  cases: SavedCase[];
  saveCase: (c: SavedCase) => void;
  deleteCase: (id: string) => void;
  updateCase: (c: SavedCase) => void;
}

export const useCasesStore = create<CasesStore>()(
  persist(
    (set) => ({
      cases: [],
      saveCase: (c) =>
        set((state) => ({ cases: [c, ...state.cases] })),
      deleteCase: (id) =>
        set((state) => ({ cases: state.cases.filter((c) => c.id !== id) })),
      updateCase: (updated) =>
        set((state) => ({
          cases: state.cases.map((c) => (c.id === updated.id ? updated : c)),
        })),
    }),
    { name: 'hospital-saved-cases' }
  )
);
