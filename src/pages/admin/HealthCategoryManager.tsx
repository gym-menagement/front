import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { HealthCategory } from '../../models';
import type { Healthcategory } from '../../types/healthcategory';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const HealthCategoryManager = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [categories, setCategories] = useState<Healthcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    if (selectedGymId) {
      loadCategories();
    }
  }, [selectedGymId]);

  const loadCategories = async () => {
    try {
      setLoading(true);

      if (!selectedGymId) {
        setCategories([]);
        return;
      }

      const data = await HealthCategory.findall({ gym: selectedGymId });

      // 정렬: 최신순
      data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newCategoryName.trim()) {
      alert('카테고리명을 입력해주세요.');
      return;
    }

    if (!selectedGymId) {
      alert('헬스장을 선택해주세요.');
      return;
    }

    try {
      await HealthCategory.insert({
        name: newCategoryName.trim(),
        gym: selectedGymId,
        date: new Date().toISOString(),
      });

      setNewCategoryName('');
      loadCategories();
      alert('카테고리가 추가되었습니다.');
    } catch (error) {
      console.error('Failed to create category:', error);
      alert('카테고리 추가에 실패했습니다.');
    }
  };

  const handleUpdate = async (categoryId: number) => {
    if (!editingName.trim()) {
      alert('카테고리명을 입력해주세요.');
      return;
    }

    try {
      await HealthCategory.patch(categoryId, {
        name: editingName.trim(),
      });

      setEditingId(null);
      setEditingName('');
      loadCategories();
    } catch (error) {
      console.error('Failed to update category:', error);
      alert('카테고리 수정에 실패했습니다.');
    }
  };

  const handleDelete = async (categoryId: number, categoryName: string) => {
    if (
      !confirm(
        `"${categoryName}" 카테고리를 정말 삭제하시겠습니까?\n\n※ 이 카테고리를 사용하는 회원권이 있다면 삭제할 수 없습니다.`
      )
    ) {
      return;
    }

    try {
      await HealthCategory.remove(categoryId);
      loadCategories();
      alert('카테고리가 삭제되었습니다.');
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert(
        '카테고리 삭제에 실패했습니다.\n이 카테고리를 사용하는 회원권이 있을 수 있습니다.'
      );
    }
  };

  const startEdit = (category: Healthcategory) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background.secondary,
      }}
    >
      <AdminHeader title="카테고리 관리" />

      {/* Content */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: theme.spacing[8],
        }}
      >
        {/* 카테고리 추가 */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <h2
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.semibold,
              marginBottom: theme.spacing[4],
              color: theme.colors.text.primary,
            }}
          >
            새 카테고리 추가
          </h2>
          <div
            style={{
              display: 'flex',
              gap: theme.spacing[3],
              alignItems: 'flex-end',
            }}
          >
            <div style={{ flex: 1 }}>
              <Input
                label="카테고리명"
                placeholder="예: 헬스, PT, 요가, 필라테스"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleCreate();
                  }
                }}
                fullWidth
              />
            </div>
            <Button variant="primary" onClick={handleCreate}>
              추가
            </Button>
          </div>
        </Card>

        {/* 검색 필터 */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <Input
            placeholder="카테고리명으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Card>

        {/* 카테고리 목록 */}
        {loading ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              카테고리 목록을 불러오는 중...
            </div>
          </Card>
        ) : filteredCategories.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              {searchTerm
                ? '검색 결과가 없습니다.'
                : '등록된 카테고리가 없습니다.'}
            </div>
          </Card>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: theme.spacing[4],
            }}
          >
            {filteredCategories.map((category) => (
              <Card key={category.id} hoverable>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing[3],
                  }}
                >
                  {editingId === category.id ? (
                    // 편집 모드
                    <>
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleUpdate(category.id);
                          } else if (e.key === 'Escape') {
                            cancelEdit();
                          }
                        }}
                        autoFocus
                        fullWidth
                      />
                      <div
                        style={{
                          display: 'flex',
                          gap: theme.spacing[2],
                        }}
                      >
                        <Button
                          size="sm"
                          variant="primary"
                          fullWidth
                          onClick={() => handleUpdate(category.id)}
                        >
                          저장
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          fullWidth
                          onClick={cancelEdit}
                        >
                          취소
                        </Button>
                      </div>
                    </>
                  ) : (
                    // 보기 모드
                    <>
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
                            fontSize: theme.typography.fontSize.lg,
                            color: theme.colors.text.primary,
                          }}
                        >
                          {category.name}
                        </div>
                        <Badge variant="info" size="sm">
                          ID: {category.id}
                        </Badge>
                      </div>

                      <div
                        style={{
                          fontSize: theme.typography.fontSize.sm,
                          color: theme.colors.text.secondary,
                        }}
                      >
                        등록일:{' '}
                        {new Date(category.date).toLocaleDateString('ko-KR')}
                      </div>

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
                          onClick={() => startEdit(category)}
                        >
                          수정
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          fullWidth
                          onClick={() =>
                            handleDelete(category.id, category.name)
                          }
                        >
                          삭제
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthCategoryManager;
