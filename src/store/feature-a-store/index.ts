import { createFlowStore } from "../create-flow-store";

export interface FeatureAData {
  "a-1": { name: string; email: string };
  "a-2": { address: string; city: string };
  "a-3": { preferences: string[] };
  "a-result": { confirmed: boolean };
}

export interface ApiResponses {
  step1Response: { id: number; userId: number; title: string; body: string };
}

export const useFeatureAStore = createFlowStore<FeatureAData, ApiResponses>(
  ["a-1", "a-2", "a-3", "a-result"],
  "a-1"
);
