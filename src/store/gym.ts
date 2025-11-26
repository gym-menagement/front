import { atom } from 'jotai';
import type { Gym } from '../types/gym';

// 선택된 헬스장 ID
export const selectedGymIdAtom = atom<number>(0);

// 선택된 헬스장 정보
export const selectedGymAtom = atom<Gym | null>(null);

// 관리자가 소유한 헬스장 목록
export const myGymsAtom = atom<Gym[]>([]);
