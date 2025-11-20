import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { Membership, User } from '../../models';
import type { Membership as MembershipType } from '../../types/membership';
import { useNavigate } from 'react-router-dom';

interface MembershipWithUser extends MembershipType {
  userName?: string;
}

const MembershipManagement = () => {
  const navigate = useNavigate();
  const [memberships, setMemberships] = useState<MembershipWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired'>('all');

  useEffect(() => {
    loadMemberships();
  }, [filterStatus]);

  const loadMemberships = async () => {
    try {
      setLoading(true);
      const params: any = {};

      if (filterStatus === 'active') {
        params.use = 1;
      } else if (filterStatus === 'expired') {
        params.use = 0;
      }

      const data = await Membership.find(params);

      // Load user names
      const membershipsWithUsers = await Promise.all(
        data.map(async (membership) => {
          try {
            const user = await User.get(membership.userid);
            return {
              ...membership,
              userName: user.name,
            };
          } catch {
            return {
              ...membership,
              userName: '알 수 없음',
            };
          }
        })
      );

      setMemberships(membershipsWithUsers);
    } catch (error) {
      console.error('Failed to load memberships:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMemberships = memberships.filter((membership) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      membership.userName?.toLowerCase().includes(searchLower) ||
      membership.name.toLowerCase().includes(searchLower)
    );
  });

  const handleDelete = async (membershipId: number, membershipName: string) => {
    if (!confirm(`${membershipName} 회원권을 정말 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await Membership.remove(membershipId);
      loadMemberships();
    } catch (error) {
      console.error('Failed to delete membership:', error);
      alert('회원권 삭제에 실패했습니다.');
    }
  };

  const isExpired = (enddate: string) => {
    return new Date(enddate) < new Date();
  };

  const isExpiringSoon = (enddate: string) => {
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
    const enddateObj = new Date(enddate);
    return enddateObj > new Date() && enddateObj <= thirtyDaysLater;
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('ko-KR');
    } catch {
      return dateStr;
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
          borderBottom: `1px solid ${theme.colors.border.primary}`,
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
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[4] }}>
            <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
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
              회원권 관리
            </h1>
          </div>
          <Button variant="primary" onClick={() => navigate('/admin/memberships/new')}>
            + 새 회원권 등록
          </Button>
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
                placeholder="회원명, 회원권명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
            </div>
            <div style={{ display: 'flex', gap: theme.spacing[2] }}>
              <Button
                variant={filterStatus === 'all' ? 'primary' : 'ghost'}
                onClick={() => setFilterStatus('all')}
              >
                전체
              </Button>
              <Button
                variant={filterStatus === 'active' ? 'primary' : 'ghost'}
                onClick={() => setFilterStatus('active')}
              >
                활성
              </Button>
              <Button
                variant={filterStatus === 'expired' ? 'primary' : 'ghost'}
                onClick={() => setFilterStatus('expired')}
              >
                만료
              </Button>
            </div>
          </div>
        </Card>

        {/* Memberships List */}
        {loading ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              회원권 목록을 불러오는 중...
            </div>
          </Card>
        ) : filteredMemberships.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              {searchTerm ? '검색 결과가 없습니다.' : '등록된 회원권이 없습니다.'}
            </div>
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
            {filteredMemberships.map((membership) => (
              <Card key={membership.id} hoverable>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr auto',
                    gap: theme.spacing[4],
                    alignItems: 'center',
                  }}
                >
                  {/* 회원권 정보 */}
                  <div>
                    <div
                      style={{
                        fontWeight: theme.typography.fontWeight.semibold,
                        fontSize: theme.typography.fontSize.base,
                        marginBottom: theme.spacing[1],
                      }}
                    >
                      {membership.name}
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                      }}
                    >
                      회원: {membership.userName}
                    </div>
                  </div>

                  {/* 기간 */}
                  <div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                        marginBottom: theme.spacing[1],
                      }}
                    >
                      사용 기간
                    </div>
                    <div style={{ fontSize: theme.typography.fontSize.sm }}>
                      {formatDate(membership.startdate)} - {formatDate(membership.enddate)}
                    </div>
                  </div>

                  {/* 가격 */}
                  <div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                        marginBottom: theme.spacing[1],
                      }}
                    >
                      가격
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.base,
                        fontWeight: theme.typography.fontWeight.semibold,
                      }}
                    >
                      {membership.price.toLocaleString()}원
                    </div>
                  </div>

                  {/* 상태 */}
                  <div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                        marginBottom: theme.spacing[1],
                      }}
                    >
                      상태
                    </div>
                    {isExpired(membership.enddate) ? (
                      <Badge variant="error">만료</Badge>
                    ) : isExpiringSoon(membership.enddate) ? (
                      <Badge variant="warning">만료 임박</Badge>
                    ) : (
                      <Badge variant="success">정상</Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => navigate(`/admin/memberships/${membership.id}`)}
                    >
                      상세
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(membership.id, membership.name)}
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

export default MembershipManagement;
