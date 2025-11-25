import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { Discount } from '../../models';
import type { Discount as DiscountType } from '../../types/discount';
import { useNavigate } from 'react-router-dom';
import GymSelector from '../../components/GymSelector';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const DiscountManagement = () => {
  const navigate = useNavigate();
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [discounts, setDiscounts] = useState<DiscountType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
    if (!confirm(`${discountName} 할인을 정말 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await Discount.remove(discountId);
      loadDiscounts();
    } catch (error) {
      console.error('Failed to delete discount:', error);
      alert('할인 삭제에 실패했습니다.');
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
              할인 관리
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
              onClick={() => navigate('/admin/discounts/new')}
            >
              + 새 할인 등록
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
                      할인율: {discount.discount}%
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
                      onClick={() => navigate(`/admin/discounts/${discount.id}`)}
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
    </div>
  );
};

export default DiscountManagement;
