import { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
  currentProfileAtom,
  profilesAtom,
  switchProfileAtom,
} from '../../store/auth';
import { selectedGymIdAtom } from '../../store/gym';
import { User as UserModel } from '../../models';
import { useNavigate } from 'react-router-dom';
import { Select } from '../ui';

export default function ProfileSwitcher() {
  const currentProfile = useAtomValue(currentProfileAtom);
  const profiles = useAtomValue(profilesAtom);
  const [, switchProfile] = useAtom(switchProfileAtom);
  const [, setSelectedGymId] = useAtom(selectedGymIdAtom);
  const navigate = useNavigate();

  // Sync selectedGymId when currentProfile changes
  useEffect(() => {
    if (currentProfile && currentProfile.gymId) {
        setSelectedGymId(currentProfile.gymId);
    }
  }, [currentProfile, setSelectedGymId]);

  if (!profiles || profiles.length <= 1) {
    return null;
  }

  const handleSwitch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value, 10);
    const profile = profiles[index];
    
    if (profile) {
        switchProfile(profile);
        
        // Redirect based on role
        if (profile.role === UserModel.role.GYM_ADMIN) {
            navigate('/admin/dashboard');
        } else if (profile.role === UserModel.role.TRAINER) {
            navigate('/trainer/dashboard');
        } else {
            navigate('/member/dashboard');
        }
    }
  };

  const getRoleName = (role: number) => {
    switch (role) {
      case UserModel.role.GYM_ADMIN:
        return '관리자';
      case UserModel.role.TRAINER:
        return '트레이너';
      case UserModel.role.MEMBER:
        return '회원';
      default:
        return '사용자';
    }
  };

  // Find current profile index
  const currentIndex = currentProfile 
    ? profiles.findIndex(p => p.role === currentProfile.role && p.gymId === currentProfile.gymId)
    : 0;

  const options = profiles.map((profile, index) => ({
    value: index,
    label: `[${getRoleName(profile.role)}] ${profile.gymName || 'Gym'}`
  }));

  return (
    <div style={{ minWidth: '200px', marginRight: '16px' }}>
      <Select
        options={options}
        value={currentIndex}
        onChange={handleSwitch}
        selectSize="md"
      />
    </div>
  );
}
