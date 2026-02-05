import { useEffect, useState } from 'react';
import { Card, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { Membership } from '../../models';
import type { Membership as MembershipType } from '../../types/membership';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const MembershipManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [memberships, setMemberships] = useState<MembershipType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    if (selectedGymId) {
      loadMemberships();
    }
  }, [selectedGymId]);

  const loadMemberships = async () => {
    try {
      setLoading(true);
      const data = await Membership.findall({ gym: selectedGymId! });
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setMemberships(data);
    } catch (error) {
      console.error('Failed to load memberships:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMemberships = memberships.filter((m) => {
    if (searchName && !m.extra?.user?.name?.includes(searchName)) return false;
    return true;
  });

  const stats = {
    total: memberships.length,
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.background.secondary }}>
      <AdminHeader title="가입 회원 관리" />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: theme.spacing[8] }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: theme.spacing[4], marginBottom: theme.spacing[6] }}>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>전체 가입</div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.brand.primary }}>{stats.total}</div>
          </Card>
        </div>

        {/* Search */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <div style={{ display: 'flex', gap: theme.spacing[4], alignItems: 'flex-end' }}>
            <Input
              label="회원 검색"
              placeholder="이름으로 검색"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              style={{ width: '250px' }}
            />
            <Button variant="ghost" onClick={() => setSearchName('')}>초기화</Button>
          </div>
        </Card>

        {/* Membership List */}
        {loading ? (
          <Card><div style={{ textAlign: 'center', padding: theme.spacing[8] }}>불러오는 중...</div></Card>
        ) : filteredMemberships.length === 0 ? (
          <Card><div style={{ textAlign: 'center', padding: theme.spacing[8] }}>가입 회원이 없습니다.</div></Card>
        ) : (
          <Card>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${theme.colors.border.light}` }}>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, fontWeight: theme.typography.fontWeight.medium }}>회원</th>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, fontWeight: theme.typography.fontWeight.medium }}>연락처</th>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, fontWeight: theme.typography.fontWeight.medium }}>이메일</th>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, fontWeight: theme.typography.fontWeight.medium }}>가입일</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMemberships.map((m) => (
                    <tr key={m.id} style={{ borderBottom: `1px solid ${theme.colors.border.light}` }}>
                      <td style={{ padding: theme.spacing[3], fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.medium }}>
                        {m.extra?.user?.name || `#${m.user}`}
                      </td>
                      <td style={{ padding: theme.spacing[3], fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>
                        {m.extra?.user?.tel || '-'}
                      </td>
                      <td style={{ padding: theme.spacing[3], fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>
                        {m.extra?.user?.email || m.extra?.user?.loginid || '-'}
                      </td>
                      <td style={{ padding: theme.spacing[3], fontSize: theme.typography.fontSize.sm, color: theme.colors.text.tertiary }}>
                        {m.date ? m.date.split('T')[0] : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MembershipManagement;
