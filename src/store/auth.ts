import { atom } from 'jotai';
import type { User } from '../types';
import { User as UserModel } from '../models';
import { authService } from '../services/auth.service';

// Auth state atoms
export const userAtom = atom<User | null>(authService.getCurrentUser());
export const isAuthenticatedAtom = atom<boolean>(authService.isAuthenticated());
export const tokenAtom = atom<string | null>(authService.getToken());

// Derived atom for checking if user is admin
export const isAdminAtom = atom((get) => {
  const user = get(userAtom);
  return user?.role === UserModel.role.GYM_ADMIN || user?.role === UserModel.role.PLATFORM_ADMIN;
});

// Derived atom for checking if user is trainer
export const isTrainerAtom = atom((get) => {
  const user = get(userAtom);
  return user?.role === UserModel.role.TRAINER;
});

// Derived atom for checking if user is member
export const isMemberAtom = atom((get) => {
  const user = get(userAtom);
  return user?.role === UserModel.role.MEMBER;
});
