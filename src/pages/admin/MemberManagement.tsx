import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { Membership, UseHealth } from '../../models';
import type { Membership as MembershipType } from '../../types/membership';
import type { Usehealth as UsehealthType } from '../../types/usehealth';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';
import MemberDetailModal from './MemberDetailModal';

const MemberManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [memberships, setMemberships] = useState<MembershipType[]>([]);
  const [usehealthMap, setUsehealthMap] = useState<
    Map<number, UsehealthType[]>
  >(new Map());
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembership, setSelectedMembership] =
    useState<MembershipType | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    if (selectedGymId) {
      loadMemberships();
    }
  }, [selectedGymId]);

  const loadMemberships = async () => {
    try {
      setLoading(true);

      if (!selectedGymId) {
        setMemberships([]);
        setUsehealthMap(new Map());
        return;
      }

      // Load memberships for this gym (all pages)
      const membershipData = await Membership.find({
        gym: selectedGymId,
        page: 0,
        pageSize: 9999,
      });

      // Sort by date (newest first)
      membershipData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setMemberships(membershipData);

      // Load usehealth data for each membership (all pages)
      const usehealthData = await UseHealth.find({
        gym: selectedGymId,
        page: 0,
        pageSize: 9999,
      });
      console.log('Total usehealths loaded:', usehealthData.length);
      console.log('Usehealths data:', usehealthData);

      // Group usehealth by membership
      const map = new Map<number, UsehealthType[]>();
      usehealthData.forEach((uh) => {
        if (!map.has(uh.membership)) {
          map.set(uh.membership, []);
        }
        map.get(uh.membership)!.push(uh);
      });

      console.log('Usehealth map:', map);
      console.log('Map entries:', Array.from(map.entries()));

      setUsehealthMap(map);
    } catch (error) {
      console.error('Failed to load memberships:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMemberships = memberships.filter((membership) => {
    const userName = membership.extra?.user?.name || '';
    const userEmail = membership.extra?.user?.email || '';
    const userTel = membership.extra?.user?.tel || '';

    const searchLower = searchTerm.toLowerCase();
    return (
      userName.toLowerCase().includes(searchLower) ||
      userEmail.toLowerCase().includes(searchLower) ||
      userTel.toLowerCase().includes(searchLower)
    );
  });

  const getActiveUsehealths = (membershipId: number) => {
    const usehealths = usehealthMap.get(membershipId) || [];
    const today = new Date();

    return usehealths.filter((uh) => {
      const startDate = new Date(uh.startday);
      const endDate = new Date(uh.endday);
      return startDate <= today && today <= endDate;
    });
  };

  const getExpiredUsehealths = (membershipId: number) => {
    const usehealths = usehealthMap.get(membershipId) || [];
    const today = new Date();

    return usehealths.filter((uh) => {
      const endDate = new Date(uh.endday);
      return endDate < today;
    });
  };

  const handleViewDetail = (membership: MembershipType) => {
    setSelectedMembership(membership);
    setShowDetailModal(true);
  };

  const stats = {
    total: filteredMemberships.length,
    active: filteredMemberships.filter(
      (m) => getActiveUsehealths(m.id).length > 0
    ).length,
    inactive: filteredMemberships.filter(
      (m) => getActiveUsehealths(m.id).length === 0
    ).length,
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background.secondary,
      }}
    >
      <AdminHeader title="회원 관리">
        <Button variant="secondary" onClick={loadMemberships}>
          새로고침
        </Button>
      </AdminHeader>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: theme.spacing[8],
        }}
      >
        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: theme.spacing[4],
            marginBottom: theme.spacing[6],
          }}
        >
          <Card>
            <div
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing[1],
              }}
            >
              전체 회원
            </div>
            <div
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.brand.primary,
              }}
            >
              {stats.total}
            </div>
          </Card>
          <Card>
            <div
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing[1],
              }}
            >
              활성 회원
            </div>
            <div
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.semantic.success,
              }}
            >
              {stats.active}
            </div>
          </Card>
          <Card>
            <div
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing[1],
              }}
            >
              비활성 회원
            </div>
            <div
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.tertiary,
              }}
            >
              {stats.inactive}
            </div>
          </Card>
        </div>

        {/* Search */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <Input
            placeholder="회원명, 이메일, 전화번호로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Card>

        {/* Members List */}
        {loading ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              회원 목록을 불러오는 중...
            </div>
          </Card>
        ) : filteredMemberships.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              {searchTerm ? '검색 결과가 없습니다.' : '등록된 회원이 없습니다.'}
            </div>
          </Card>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing[4],
            }}
          >
            {filteredMemberships.map((membership) => {
              const activeUsehealths = getActiveUsehealths(membership.id);
              const expiredUsehealths = getExpiredUsehealths(membership.id);
              const user = membership.extra?.user;

              return (
                <Card key={membership.id} hoverable>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto auto',
                      gap: theme.spacing[4],
                      alignItems: 'center',
                    }}
                  >
                    {/* User Info */}
                    <div>
                      <div
                        style={{
                          fontWeight: theme.typography.fontWeight.bold,
                          fontSize: theme.typography.fontSize.lg,
                          marginBottom: theme.spacing[1],
                        }}
                      >
                        {user?.name || `회원 #${membership.user}`}
                      </div>
                      <div
                        style={{
                          fontSize: theme.typography.fontSize.sm,
                          color: theme.colors.text.secondary,
                          display: 'flex',
                          gap: theme.spacing[3],
                          flexWrap: 'wrap',
                        }}
                      >
                        {user?.email && <span>📧 {user.email}</span>}
                        {user?.tel && <span>📱 {user.tel}</span>}
                        <span>
                          가입일:{' '}
                          {new Date(membership.date).toLocaleDateString(
                            'ko-KR'
                          )}
                        </span>
                      </div>
                      <div
                        style={{
                          marginTop: theme.spacing[2],
                          display: 'flex',
                          gap: theme.spacing[2],
                          flexWrap: 'wrap',
                        }}
                      >
                        {activeUsehealths.length > 0 && (
                          <Badge variant="success">
                            활성 이용권 {activeUsehealths.length}개
                          </Badge>
                        )}
                        {expiredUsehealths.length > 0 && (
                          <Badge variant="info">
                            만료 이용권 {expiredUsehealths.length}개
                          </Badge>
                        )}
                        {activeUsehealths.length === 0 &&
                          expiredUsehealths.length === 0 && (
                            <Badge variant="warning">이용권 없음</Badge>
                          )}
                      </div>
                    </div>

                    {/* Status Badge */}
                    <Badge
                      variant={
                        activeUsehealths.length > 0 ? 'success' : 'warning'
                      }
                      size="lg"
                    >
                      {activeUsehealths.length > 0 ? '활성' : '비활성'}
                    </Badge>

                    {/* Action Button */}
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleViewDetail(membership)}
                    >
                      상세보기
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedMembership && (
        <MemberDetailModal
          show={showDetailModal}
          membership={selectedMembership}
          usehealths={usehealthMap.get(selectedMembership.id) || []}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedMembership(null);
          }}
          onRefresh={loadMemberships}
        />
      )}
    </div>
  );
};

export default MemberManagement;
