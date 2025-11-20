import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { User } from '../../models';
import type { User as UserType } from '../../types/user';
import { useNavigate } from 'react-router-dom';

const MemberManagement = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    loadMembers();
  }, [filterStatus]);

  const loadMembers = async () => {
    try {
      setLoading(true);
      const params: any = { role: User.role.MEMBER };

      if (filterStatus === 'active') {
        params.use = 1;
      } else if (filterStatus === 'inactive') {
        params.use = 0;
      }

      const data = await User.find(params);
      setMembers(data);
    } catch (error) {
      console.error('Failed to load members:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.loginid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.tel.includes(searchTerm)
  );

  const handleStatusChange = async (memberId: number, newStatus: number) => {
    try {
      await User.update(memberId, { use: newStatus });
      loadMembers();
    } catch (error) {
      console.error('Failed to update member status:', error);
      alert('상태 변경에 실패했습니다.');
    }
  };

  const handleDelete = async (memberId: number, memberName: string) => {
    if (!confirm(`${memberName} 회원을 정말 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await User.remove(memberId);
      loadMembers();
    } catch (error) {
      console.error('Failed to delete member:', error);
      alert('회원 삭제에 실패했습니다.');
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
              회원 관리
            </h1>
          </div>
          <Button variant="primary" onClick={() => navigate('/admin/members/new')}>
            + 새 회원 등록
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
                placeholder="이름, 아이디, 전화번호로 검색..."
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
                variant={filterStatus === 'inactive' ? 'primary' : 'ghost'}
                onClick={() => setFilterStatus('inactive')}
              >
                비활성
              </Button>
            </div>
          </div>
        </Card>

        {/* Members List */}
        {loading ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              회원 목록을 불러오는 중...
            </div>
          </Card>
        ) : filteredMembers.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              {searchTerm ? '검색 결과가 없습니다.' : '등록된 회원이 없습니다.'}
            </div>
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
            {filteredMembers.map((member) => (
              <Card key={member.id} hoverable>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr auto',
                    gap: theme.spacing[4],
                    alignItems: 'center',
                  }}
                >
                  {/* 회원 정보 */}
                  <div>
                    <div
                      style={{
                        fontWeight: theme.typography.fontWeight.semibold,
                        fontSize: theme.typography.fontSize.base,
                        marginBottom: theme.spacing[1],
                      }}
                    >
                      {member.name}
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                      }}
                    >
                      {member.loginid}
                    </div>
                  </div>

                  {/* 연락처 */}
                  <div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                        marginBottom: theme.spacing[1],
                      }}
                    >
                      전화번호
                    </div>
                    <div style={{ fontSize: theme.typography.fontSize.sm }}>
                      {member.tel}
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
                    <Badge variant={member.use === 1 ? 'success' : 'default'}>
                      {member.use === 1 ? '활성' : '비활성'}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => navigate(`/admin/members/${member.id}`)}
                    >
                      상세
                    </Button>
                    <Button
                      size="sm"
                      variant={member.use === 1 ? 'ghost' : 'primary'}
                      onClick={() => handleStatusChange(member.id, member.use === 1 ? 0 : 1)}
                    >
                      {member.use === 1 ? '비활성화' : '활성화'}
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(member.id, member.name)}
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

export default MemberManagement;
