import { create } from "zustand";

interface StepData<T> {
  data: T;
  visited: boolean;
}

// 플로우 상태 인터페이스 (isValid 관련 로직 제거)
interface FlowState<
  T extends Record<string, any>,
  R extends Record<string, any> = {}
> {
  // 상태
  steps: Record<keyof T, StepData<T[keyof T]>>;
  currentStep: keyof T | null;
  isCompleted: boolean;

  // 액션
  updateStepData: <K extends keyof T>(step: K, data: Partial<T[K]>) => void;
  nextStep: () => keyof T | null;
  prevStep: () => keyof T | null;
  goToStep: (step: keyof T) => boolean;
  updateCurrentStepFromPath: (path: string) => boolean;
  reset: () => void;
  complete: () => void;

  // 셀렉터
  getCurrentStepData: () => StepData<T[keyof T]> | null;
  getStepData: <K extends keyof T>(step: K) => StepData<T[K]> | null;
  getAllData: () => Partial<T>;
  getVisitedSteps: () => Array<keyof T>;

  // API 응답 저장소 추가
  // API 응답 저장소 추가
  apiResponses: Partial<R>;

  // API 응답 저장 액션 추가
  setApiResponse: <K extends keyof R>(key: K, response: R[K]) => void;
  getApiResponse: <K extends keyof R>(key: K) => R[K] | undefined;
}

/**
 * 멀티스텝 플로우 상태 관리를 위한 Zustand 스토어를 생성합니다.
 *
 * @param stepArray 플로우 단계들의 배열
 * @param initialStep 초기 단계 (기본값: 배열의 첫 번째 요소)
 * @returns Zustand 스토어 훅
 */
export function createFlowStore<
  T extends Record<string, any>,
  R extends Record<string, any> = {}
>(stepArray: Array<keyof T>, initialStep: keyof T = stepArray[0]) {
  // 초기 상태 생성 (isValid와 errors 제거)
  const createInitialState = () => ({
    steps: stepArray.reduce(
      (acc, step) => ({
        ...acc,
        [step]: {
          data: {} as T[typeof step],
          visited: false,
        },
      }),
      {} as Record<keyof T, StepData<T[keyof T]>>
    ),
    currentStep: initialStep,
    isCompleted: false,

    // API 응답 저장소 초기화
    apiResponses: {} as Partial<R>,
  });

  // Zustand 스토어 생성
  return create<FlowState<T, R>>((set, get) => ({
    ...createInitialState(),

    // API 응답 저장 액션
    setApiResponse: <K extends keyof R>(key: K, response: R[K]) =>
      set((state) => ({
        apiResponses: {
          ...state.apiResponses,
          [key]: response,
        },
      })),

    // API 응답 가져오기 셀렉터
    getApiResponse: <K extends keyof R>(key: K) => {
      const state = get();
      return state.apiResponses[key];
    },

    // 스텝 데이터 업데이트
    updateStepData: <K extends keyof T>(step: K, data: Partial<T[K]>) =>
      set((state) => ({
        steps: {
          ...state.steps,
          [step]: {
            ...state.steps[step],
            data: {
              ...state.steps[step].data,
              ...data,
            },
            visited: true,
          },
        },
      })),

    // 다음 스텝으로 이동
    nextStep: () => {
      const state = get();
      const currentIndex = stepArray.indexOf(state.currentStep as keyof T);

      if (currentIndex < stepArray.length - 1) {
        const nextStep = stepArray[currentIndex + 1];
        set({ currentStep: nextStep });
        return nextStep;
      }

      // 마지막 스텝이면 완료 상태로 설정
      if (currentIndex === stepArray.length - 1) {
        set({ isCompleted: true });
      }

      return state.currentStep;
    },

    // 이전 스텝으로 이동
    prevStep: () => {
      const state = get();
      const currentIndex = stepArray.indexOf(state.currentStep as keyof T);

      if (currentIndex > 0) {
        const prevStep = stepArray[currentIndex - 1];
        set({ currentStep: prevStep });
        return prevStep;
      }

      return state.currentStep;
    },

    // 특정 스텝으로 이동
    goToStep: (step: keyof T) => {
      if (stepArray.includes(step)) {
        set({ currentStep: step });
        return true;
      }
      return false;
    },

    // URL 경로에서 현재 스텝 업데이트
    updateCurrentStepFromPath: (path: string) => {
      // 경로에서 스텝 식별자 추출
      const step = path as keyof T;
      if (stepArray.includes(step)) {
        set({ currentStep: step });
        return true;
      }
      return false;
    },

    // 스토어 초기화
    reset: () => set(createInitialState()),

    // 플로우 완료 설정
    complete: () => set({ isCompleted: true }),

    // 현재 스텝 데이터 가져오기
    getCurrentStepData: () => {
      const state = get();
      return state.currentStep ? state.steps[state.currentStep] : null;
    },

    // 특정 스텝 데이터 가져오기
    getStepData: <K extends keyof T>(step: K) => {
      const state = get();
      return step in state.steps ? (state.steps[step] as StepData<T[K]>) : null;
    },

    // 모든 데이터 가져오기
    getAllData: () => {
      const state = get();
      return Object.entries(state.steps).reduce(
        (acc, [key, stepData]) => ({
          ...acc,
          [key]: stepData.data,
        }),
        {} as Partial<T>
      );
    },

    // 방문한 스텝 목록 가져오기
    getVisitedSteps: () => {
      const state = get();
      return Object.entries(state.steps)
        .filter(([_, stepData]) => stepData.visited)
        .map(([key]) => key as keyof T);
    },
  }));
}
