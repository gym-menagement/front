import { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { selectedGymIdAtom, selectedGymAtom, myGymsAtom } from '../store/gym';
import { userAtom } from '../store/auth';
import { Gym } from '../models';
import { theme } from '../theme';

const GymSelector = () => {
  const user = useAtomValue(userAtom);
  const [myGyms, setMyGyms] = useAtom(myGymsAtom);
  const [selectedGymId, setSelectedGymId] = useAtom(selectedGymIdAtom);
  const [, setSelectedGym] = useAtom(selectedGymAtom);

  // 내가 소유한 헬스장 목록 로드
  useEffect(() => {
    const loadMyGyms = async () => {
      if (!user) return;

      try {
        // 관리자가 소유한 헬스장 목록 조회
        console.log('Loading gyms for user:', user.id);
        const gyms = await Gym.findall({ user: user.id });
        setMyGyms(gyms);

        // 첫 번째 헬스장을 기본으로 선택
        if (gyms.length > 0 && !selectedGymId) {
          setSelectedGymId(gyms[0].id);
          setSelectedGym(gyms[0]);
        }
      } catch (error) {
        console.error('Failed to load gyms:', error);
      }
    };

    loadMyGyms();
  }, [user, setMyGyms, selectedGymId, setSelectedGymId, setSelectedGym]);

  // 선택된 헬스장 ID가 변경되면 헬스장 정보 업데이트
  useEffect(() => {
    if (selectedGymId) {
      const gym = myGyms.find((g) => g.id === selectedGymId);
      if (gym) {
        setSelectedGym(gym);
      }
    }
  }, [selectedGymId, myGyms, setSelectedGym]);

  const handleGymChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const gymId = parseInt(e.target.value);
    setSelectedGymId(gymId);
  };

  if (myGyms.length === 0) {
    return (
      <div
        style={{
          padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.md,
          border: `1px solid ${theme.colors.border.medium}`,
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.text.secondary,
        }}
      >
        등록된 헬스장이 없습니다
      </div>
    );
  }

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2] }}
    >
      {/* <label
        htmlFor="gym-selector"
        style={{
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.colors.text.primary,
          whiteSpace: 'nowrap',
        }}
      >
        헬스장 선택:
      </label> */}
      <select
        id="gym-selector"
        value={selectedGymId || ''}
        onChange={handleGymChange}
        style={{
          padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
          fontSize: theme.typography.fontSize.base,
          color: theme.colors.text.primary,
          backgroundColor: theme.colors.background.primary,
          border: `1px solid ${theme.colors.border.medium}`,
          borderRadius: theme.borderRadius.md,
          outline: 'none',
          cursor: 'pointer',
          minWidth: '200px',
        }}
      >
        {myGyms.map((gym) => (
          <option key={gym.id} value={gym.id}>
            {gym.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GymSelector;
