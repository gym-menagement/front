import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { Discount } from '../../models';
import type { Discount as DiscountType } from '../../types/discount';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';
import DiscountModal from './DiscountModal';

const DiscountManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [discounts, setDiscounts] = useState<DiscountType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalState, setModalState] = useState<{
    show: boolean;
    discount: DiscountType | null;
  }>({
    show: false,
    discount: null,
  });

  useEffect(() => {
    if (selectedGymId) {
      loadDiscounts();
    }
  }, [selectedGymId]);

  const loadDiscounts = async () => {
    try {
      setLoading(true);

      if (!selectedGymId) {
        setDiscounts([]);
        return;
      }

      const data = await Discount.find({ gym: selectedGymId });

      // 정렬: 할인율 높은 순
      data.sort((a, b) => b.discount - a.discount);

      setDiscounts(data);
    } catch (error) {
      console.error('Failed to load discounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDiscounts = discounts.filter((discount) =>
    discount.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (discountId: number, discountName: string) => {
    if (!confirm(`"${discountName}" 할인을 정말 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await Discount.remove(discountId);
      loadDiscounts();
      alert('할인이 삭제되었습니다.');
    } catch (error) {
      console.error('Failed to delete discount:', error);
      alert('할인 삭제에 실패했습니다.');
    }
  };

  const openCreateModal = () => {
    setModalState({
      show: true,
      discount: null,
    });
  };

  const openEditModal = (discount: DiscountType) => {
    setModalState({
      show: true,
      discount,
    });
  };

  const closeModal = () => {
    setModalState({
      show: false,
      discount: null,
    });
  };

  const handleSave = async (data: { name: string; discount: number }) => {
    if (!selectedGymId) {
      alert('헬스장을 선택해주세요.');
      return;
    }

    try {
      if (modalState.discount) {
        // 수정
        await Discount.patch(modalState.discount.id, {
          name: data.name,
          discount: data.discount,
        });
        alert('할인이 수정되었습니다.');
      } else {
        // 등록
        await Discount.insert({
          gym: selectedGymId,
          name: data.name,
          discount: data.discount,
          date: new Date().toISOString(),
        });
        alert('할인이 등록되었습니다.');
      }

      loadDiscounts();
    } catch (error) {
      console.error('Failed to save discount:', error);
      throw error;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background.secondary,
      }}
    >
      <AdminHeader title="할인 관리">
        <Button variant="primary" onClick={openCreateModal}>
          + 새 할인 등록
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
        {/* Search */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <Input
            placeholder="할인명으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Card>

        {/* Discounts List */}
        {loading ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              할인 목록을 불러오는 중...
            </div>
          </Card>
        ) : filteredDiscounts.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              {searchTerm ? '검색 결과가 없습니다.' : '등록된 할인이 없습니다.'}
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
            {filteredDiscounts.map((discount) => (
              <Card key={discount.id} hoverable>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto',
                    gap: theme.spacing[4],
                    alignItems: 'center',
                  }}
                >
                  {/* 할인 정보 */}
                  <div>
                    <div
                      style={{
                        fontWeight: theme.typography.fontWeight.semibold,
                        fontSize: theme.typography.fontSize.lg,
                        marginBottom: theme.spacing[1],
                      }}
                    >
                      {discount.name}
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                      }}
                    >
                      등록일: {new Date(discount.date).toLocaleDateString('ko-KR')}
                    </div>
                  </div>

                  {/* 할인율 배지 */}
                  <Badge variant="error" size="lg">
                    {discount.discount}% OFF
                  </Badge>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => openEditModal(discount)}
                    >
                      수정
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(discount.id, discount.name)}
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

      {/* Discount Modal */}
      <DiscountModal
        show={modalState.show}
        discount={modalState.discount}
        gymId={selectedGymId}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default DiscountManagement;
