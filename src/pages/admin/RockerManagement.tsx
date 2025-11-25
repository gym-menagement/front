import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { Rocker, RockerGroup } from '../../models';
import type { Rocker as RockerType } from '../../types/rocker';
import type { RockerGroup as RockerGroupType } from '../../types/rockergroup';
import { useNavigate } from 'react-router-dom';
import GymSelector from '../../components/GymSelector';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const RockerManagement = () => {
  const navigate = useNavigate();
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [rockers, setRockers] = useState<RockerType[]>([]);
  const [groups, setGroups] = useState<RockerGroupType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState<number | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<number | 'all'>('all');

  useEffect(() => {
    if (selectedGymId) {
      loadRockers();
      loadGroups();
    }
  }, [selectedGymId, filterGroup, filterStatus]);

  const loadRockers = async () => {
    try {
      setLoading(true);

      if (!selectedGymId) {
        setRockers([]);
        return;
      }

      const params: any = { gym: selectedGymId };

      if (filterGroup !== 'all') {
        params.group = filterGroup;
      }

      if (filterStatus !== 'all') {
        params.available = filterStatus;
      }

      const data = await Rocker.find(params);
      setRockers(data);
    } catch (error) {
      console.error('Failed to load rockers:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadGroups = async () => {
    try {
      if (!selectedGymId) return;
      const data = await RockerGroup.find({ gym: selectedGymId });
      setGroups(data);
    } catch (error) {
      console.error('Failed to load groups:', error);
    }
  };

  const filteredRockers = rockers.filter((rocker) =>
    rocker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGroupName = (groupId: number) => {
    const group = groups.find((g) => g.id === groupId);
    return group ? group.name : '-';
  };

  const handleDelete = async (rockerId: number, rockerName: string) => {
    if (!confirm(`락커 ${rockerName}를 정말 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await Rocker.remove(rockerId);
      loadRockers();
    } catch (error) {
      console.error('Failed to delete rocker:', error);
      alert('락커 삭제에 실패했습니다.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background.secondary,
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: theme.colors.background.primary,
          borderBottom: `1px solid ${theme.colors.border.light}`,
          padding: `${theme.spacing[4]} ${theme.spacing[8]}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing[4],
            }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/dashboard')}
            >
              ← 대시보드
            </Button>
            <h1
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                margin: 0,
              }}
            >
              락커 관리
            </h1>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing[4],
            }}
          >
            <GymSelector />
            <Button
              variant="primary"
              onClick={() => navigate('/admin/rockers/new')}
            >
              + 새 락커 등록
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: theme.spacing[8],
        }}
      >
        {/* Filters */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <div
            style={{
              display: 'flex',
              gap: theme.spacing[4],
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <div style={{ flex: '1 1 300px' }}>
              <Input
                placeholder="락커 번호로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
            </div>
            <div style={{ display: 'flex', gap: theme.spacing[2], flexWrap: 'wrap' }}>
              <Button
                variant={filterGroup === 'all' ? 'primary' : 'ghost'}
                onClick={() => setFilterGroup('all')}
                size="sm"
              >
                전체 그룹
              </Button>
              {groups.map((group) => (
                <Button
                  key={group.id}
                  variant={filterGroup === group.id ? 'primary' : 'ghost'}
                  onClick={() => setFilterGroup(group.id)}
                  size="sm"
                >
                  {group.name}
                </Button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: theme.spacing[2] }}>
              <Button
                variant={filterStatus === 'all' ? 'primary' : 'ghost'}
                onClick={() => setFilterStatus('all')}
                size="sm"
              >
                전체 상태
              </Button>
              <Button
                variant={filterStatus === 1 ? 'primary' : 'ghost'}
                onClick={() => setFilterStatus(1)}
                size="sm"
              >
                사용 가능
              </Button>
              <Button
                variant={filterStatus === 0 ? 'primary' : 'ghost'}
                onClick={() => setFilterStatus(0)}
                size="sm"
              >
                사용중
              </Button>
            </div>
          </div>
        </Card>

        {/* Rockers Grid */}
        {loading ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              락커 목록을 불러오는 중...
            </div>
          </Card>
        ) : filteredRockers.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              {searchTerm ? '검색 결과가 없습니다.' : '등록된 락커가 없습니다.'}
            </div>
          </Card>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: theme.spacing[4],
            }}
          >
            {filteredRockers.map((rocker) => (
              <Card key={rocker.id} hoverable>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing[3],
                  }}
                >
                  {/* 락커 번호 */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: theme.typography.fontWeight.bold,
                        fontSize: theme.typography.fontSize.xl,
                        color: theme.colors.text.primary,
                      }}
                    >
                      {rocker.name}
                    </div>
                    <Badge
                      variant={rocker.available === 1 ? 'success' : 'default'}
                    >
                      {rocker.available === 1 ? '사용 가능' : '사용중'}
                    </Badge>
                  </div>

                  {/* 그룹 정보 */}
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.secondary,
                    }}
                  >
                    그룹: {getGroupName(rocker.group)}
                  </div>

                  {/* Actions */}
                  <div
                    style={{
                      display: 'flex',
                      gap: theme.spacing[2],
                      marginTop: theme.spacing[2],
                    }}
                  >
                    <Button
                      size="sm"
                      variant="secondary"
                      fullWidth
                      onClick={() => navigate(`/admin/rockers/${rocker.id}`)}
                    >
                      수정
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      fullWidth
                      onClick={() => handleDelete(rocker.id, rocker.name)}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RockerManagement;
