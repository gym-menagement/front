import { useEffect, useState } from 'react';
import { Card, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { Discount } from '../../models';
import { useNavigate, useParams } from 'react-router-dom';
import GymSelector from '../../components/GymSelector';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const DiscountForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    discount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode && id) {
      loadDiscount();
    }
  }, [id]);

  const loadDiscount = async () => {
    try {
      setInitialLoading(true);
      const response = await Discount.get(Number(id));
      const discount = response.item;
      setFormData({
        name: discount.name,
        discount: discount.discount,
      });
    } catch (error) {
      console.error('Failed to load discount:', error);
      alert('할인 정보를 불러오는데 실패했습니다.');
      navigate('/admin/discounts');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedGymId) {
      alert('헬스장을 선택해주세요.');
      return;
    }

    if (!formData.name.trim()) {
      alert('할인명을 입력해주세요.');
      return;
    }

    if (formData.discount <= 0 || formData.discount > 100) {
      alert('할인율은 1~100 사이의 값을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      if (isEditMode) {
        await Discount.update(Number(id), formData);
        alert('할인이 수정되었습니다.');
      } else {
        await Discount.insert({
          ...formData,
          gym: selectedGymId,
          date: new Date().toISOString(),
        });
        alert('할인이 등록되었습니다.');
      }

      navigate('/admin/discounts');
    } catch (error) {
      console.error('Failed to save discount:', error);
      alert(`할인 ${isEditMode ? '수정' : '등록'}에 실패했습니다.`);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div style={{ padding: theme.spacing[8] }}>
        <div style={{ textAlign: 'center', marginTop: theme.spacing[16] }}>
          데이터를 불러오는 중...
        </div>
      </div>
    );
  }

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
              onClick={() => navigate('/admin/discounts')}
            >
              ← 목록
            </Button>
            <h1
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                margin: 0,
              }}
            >
              {isEditMode ? '할인 수정' : '할인 등록'}
            </h1>
          </div>
          <GymSelector />
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: theme.spacing[8],
        }}
      >
        <Card>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing[6],
              }}
            >
              <Input
                label="할인명"
                placeholder="예: 신규 회원 할인, 조기 등록 할인"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                fullWidth
              />

              <Input
                label="할인율 (%)"
                type="number"
                placeholder="10"
                value={formData.discount || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discount: Number(e.target.value),
                  })
                }
                min="1"
                max="100"
                required
                fullWidth
                helperText="1~100 사이의 값을 입력해주세요"
              />

              <div
                style={{
                  display: 'flex',
                  gap: theme.spacing[3],
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate('/admin/discounts')}
                >
                  취소
                </Button>
                <Button type="submit" variant="primary" loading={loading}>
                  {isEditMode ? '수정' : '등록'}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default DiscountForm;
