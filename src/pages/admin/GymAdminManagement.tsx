
import { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';
import { Gymadmin, User } from '../../models';
import { Button, Card, Input, Select } from '../../components/ui';
import { theme } from '../../theme';
import type { GymadminResponse, GymadminCreateRequest } from '../../types/gymadmin';
import type { User as UserType } from '../../types/user'; 

const GymAdminManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [admins, setAdmins] = useState<GymadminResponse[]>([]);
  const [adminUsers, setAdminUsers] = useState<Map<number, UserType>>(new Map());
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Search state for adding new admin
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number>(Gymadmin.level.MANAGER);

  useEffect(() => {
    if (selectedGymId) {
      loadAdmins();
    }
  }, [selectedGymId]);

  const loadAdmins = async () => {
    if (!selectedGymId) return;
    setLoading(true);
    try {
      const data = await Gymadmin.findByGym(selectedGymId);
      setAdmins(data);
      
      // Load user details for each admin
      const userMap = new Map<number, UserType>();
      for (const admin of data) {
        if (!userMap.has(admin.userId)) {
            try {
                const user = await User.get(admin.userId);
                // User.get returns ApiSingleResponse<User> or User directly depending on implementation
                // Based on User.ts model: static async get(id: number) { const res = ... return res.data; }
                // And res.data seems to be the User object or wrapped. 
                // Let's assume it returns User object based on typical pattern or check usage.
                // Actually User.get returns res.data which is ApiSingleResponse<User> usually? 
                // Let's check User.ts again if needed, but for now assume we can get user.
                // Actually User.get in the viewed code returns res.data. 
                // If the API returns { data: User }, then User.get returns User.
                userMap.set(admin.userId, user as unknown as UserType); // Type assertion to be safe if types mismatch slightly
            } catch (e) {
                console.error(`Failed to load user ${admin.userId}`, e);
            }
        }
      }
      setAdminUsers(userMap);

    } catch (error) {
      console.error('Failed to load admins:', error);
      alert('관리자 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchUser = async () => {
    if (!searchTerm) return;
    try {
      // Try searching by different criteria
      const resultsByEmail = await User.searchByEmail(searchTerm);
      const resultsByTel = await User.searchByTel(searchTerm);
      const resultsByName = await User.find({ name: searchTerm }); 
      
      // Merge results and remove duplicates
      const uniqueUsers = new Map();
      [...resultsByEmail, ...resultsByTel, ...(resultsByName || [])].forEach(user => {
        uniqueUsers.set(user.id, user);
      });
      
      setSearchResults(Array.from(uniqueUsers.values()));
    } catch (error) {
      console.error('Search failed:', error);
      alert('사용자 검색에 실패했습니다.');
    }
  };

  const handleAddAdmin = async () => {
    if (!selectedUser || !selectedGymId) return;

    try {
      const newAdmin: GymadminCreateRequest = {
        gymId: selectedGymId,
        userId: selectedUser.id,
        level: selectedLevel,
        status: Gymadmin.status.ACTIVE,
      };

      await Gymadmin.insert(newAdmin);
      alert('관리자가 추가되었습니다.');
      setIsModalOpen(false);
      setSelectedUser(null);
      setSearchTerm('');
      setSearchResults([]);
      loadAdmins();
    } catch (error) {
      console.error('Failed to add admin:', error);
      alert('관리자 추가에 실패했습니다.');
    }
  };

  const handleRemoveAdmin = async (id: number) => {
    if (!window.confirm('정말 이 관리자를 삭제하시겠습니까?')) return;

    try {
      await Gymadmin.remove(id);
      loadAdmins();
    } catch (error) {
      console.error('Failed to remove admin:', error);
      alert('관리자 삭제에 실패했습니다.');
    }
  };

  const handleLevelChange = async (id: number, newLevel: number) => {
    try {
      await Gymadmin.patch(id, { level: newLevel });
      loadAdmins();
    } catch (error) {
      console.error('Failed to update level:', error);
      alert('등급 수정에 실패했습니다.');
    }
  };

  const handleStatusChange = async (id: number, newStatus: number) => {
    try {
      await Gymadmin.patch(id, { status: newStatus });
      loadAdmins();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('상태 수정에 실패했습니다.');
    }
  };

  return (
    <div style={{ padding: theme.spacing[8] }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing[6] }}>
        <h1 style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: 'bold' }}>
          헬스장 관리자 설정
        </h1>
        <Button onClick={() => setIsModalOpen(true)}>관리자 추가</Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
        {loading ? (
             <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>로딩중...</div>
        ) : admins.length === 0 ? (
            <Card>
                <div style={{ textAlign: 'center', padding: theme.spacing[8], color: theme.colors.text.secondary }}>
                    등록된 관리자가 없습니다.
                </div>
            </Card>
        ) : (
            admins.map(admin => {
                const user = adminUsers.get(admin.userId);
                return (
                    <Card key={admin.id}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
                            
                            {/* Header: User Info & Actions */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ fontWeight: theme.typography.fontWeight.bold, fontSize: theme.typography.fontSize.lg }}>
                                        {user ? user.name : `User #${admin.userId}`}
                                    </div>
                                    <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, marginTop: theme.spacing[1] }}>
                                        {user && (
                                            <>
                                                <span>{user.email}</span>
                                                <span style={{ margin: '0 8px' }}>|</span>
                                                <span>{user.tel}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <Button variant="danger" size="sm" onClick={() => handleRemoveAdmin(admin.id)}>
                                    삭제
                                </Button>
                            </div>

                            {/* Controls */}
                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                                gap: theme.spacing[4],
                                backgroundColor: theme.colors.background.secondary,
                                padding: theme.spacing[4],
                                borderRadius: theme.borderRadius.md
                            }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: theme.typography.fontSize.xs, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>
                                        등급
                                    </label>
                                    <Select
                                        value={admin.level}
                                        options={[
                                            { value: Gymadmin.level.OWNER, label: '운영자' },
                                            { value: Gymadmin.level.MANAGER, label: '관리자' },
                                        ]}
                                        onChange={(e) => handleLevelChange(admin.id, Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: theme.typography.fontSize.xs, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>
                                        상태
                                    </label>
                                    <Select
                                        value={admin.status}
                                        options={[
                                            { value: Gymadmin.status.ACTIVE, label: '활성' },
                                            { value: Gymadmin.status.INACTIVE, label: '비활성' },
                                        ]}
                                        onChange={(e) => handleStatusChange(admin.id, Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: theme.typography.fontSize.xs, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>
                                        등록일
                                    </label>
                                    <div style={{ padding: '10px 0', fontSize: theme.typography.fontSize.sm }}>
                                        {new Date(admin.date).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                );
            })
        )}
      </div>

      {/* Inline Modal */}
      {isModalOpen && (
        <div
            style={{
                position: 'fixed',
                top: 0, 
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1050,
                padding: theme.spacing[4],
            }}
            onClick={() => setIsModalOpen(false)}
        >
            <div
                style={{
                    backgroundColor: theme.colors.background.primary,
                    borderRadius: theme.borderRadius.lg,
                    maxWidth: '600px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflow: 'auto',
                    padding: theme.spacing[6],
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing[4] }}>
                    <h2 style={{ fontSize: theme.typography.fontSize.xl, fontWeight: 'bold' }}>새 관리자 등록</h2>
                    <Button variant="ghost" onClick={() => setIsModalOpen(false)}>✕</Button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: theme.spacing[2], fontWeight: theme.typography.fontWeight.medium }}>사용자 검색</label>
                        <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                        <Input 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="이름, 이메일, 전화번호"
                            fullWidth
                        />
                        <Button onClick={handleSearchUser}>검색</Button>
                        </div>
                    </div>

                    {searchResults.length > 0 && (
                        <div>
                        <label style={{ display: 'block', marginBottom: theme.spacing[2], fontWeight: theme.typography.fontWeight.medium }}>검색 결과</label>
                        <div style={{ 
                            maxHeight: '200px', 
                            overflowY: 'auto', 
                            border: `1px solid ${theme.colors.border.light}`, 
                            borderRadius: theme.borderRadius.md 
                        }}>
                            {searchResults.map(user => (
                            <div 
                                key={user.id}
                                onClick={() => setSelectedUser(user)}
                                style={{
                                padding: theme.spacing[3],
                                cursor: 'pointer',
                                backgroundColor: selectedUser?.id === user.id ? theme.colors.brand.primarySubtle : 'transparent',
                                borderBottom: `1px solid ${theme.colors.border.light}`
                                }}
                            >
                                <div style={{ fontWeight: theme.typography.fontWeight.medium }}>{user.name} <span style={{fontSize: '0.8em', color: theme.colors.text.secondary}}>({user.loginid})</span></div>
                                <div style={{ fontSize: '0.85em', color: theme.colors.text.secondary }}>{user.email} / {user.tel}</div>
                            </div>
                            ))}
                        </div>
                        </div>
                    )}

                    {selectedUser && (
                        <div>
                        <label style={{ display: 'block', marginBottom: theme.spacing[2], fontWeight: theme.typography.fontWeight.medium }}>권한 등급</label>
                        <Select
                            value={selectedLevel}
                            options={[
                            { value: Gymadmin.level.OWNER, label: '운영자' },
                            { value: Gymadmin.level.MANAGER, label: '관리자' },
                            ]}
                            onChange={(e) => setSelectedLevel(Number(e.target.value))}
                        />
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: theme.spacing[2], marginTop: theme.spacing[4] }}>
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>취소</Button>
                        <Button onClick={handleAddAdmin} disabled={!selectedUser}>등록</Button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default GymAdminManagement;
