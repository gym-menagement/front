import { atom } from 'jotai';
import type { User, UserProfile } from '../types/user';
import { User as UserModel } from '../models';
import { authService } from '../services/auth.service';

// Auth state atoms
export const userAtom = atom<User | null>(authService.getCurrentUser());
export const isAuthenticatedAtom = atom<boolean>(authService.isAuthenticated());
export const tokenAtom = atom<string | null>(authService.getToken());

// Profile state atoms
export const currentProfileAtom = atom<UserProfile | null>(authService.getCurrentProfile());

export const profilesAtom = atom((get) => {
  const user = get(userAtom);
  return user?.profiles || [];
});

export const switchProfileAtom = atom(
  null,
  (_get, set, profile: UserProfile) => {
    authService.switchProfile(profile);
    set(currentProfileAtom, profile);
    // Update user atom to reflect any checks that rely on the stored user object
    set(userAtom, authService.getCurrentUser());
  }
);

// Derived atom for checking if user is admin
export const isAdminAtom = atom((get) => {
  const profile = get(currentProfileAtom);
  return profile?.role === UserModel.role.GYM_ADMIN || profile?.role === UserModel.role.PLATFORM_ADMIN;
});

// Derived atom for checking if user is trainer
export const isTrainerAtom = atom((get) => {
  const profile = get(currentProfileAtom);
  return profile?.role === UserModel.role.TRAINER;
});

// Derived atom for checking if user is member
export const isMemberAtom = atom((get) => {
  const profile = get(currentProfileAtom);
  return profile?.role === UserModel.role.MEMBER;
});
