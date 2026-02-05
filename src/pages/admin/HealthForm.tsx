import { useEffect, useState } from 'react';
import { Card, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { Health, HealthCategory, Term, Discount } from '../../models';
import type { Healthcategory as HealthCategoryType } from '../../types/healthcategory';
import type { Term as TermType } from '../../types/term';
import type { Discount as DiscountType } from '../../types/discount';
import { useNavigate, useParams } from 'react-router-dom';
import GymSelector from '../../components/GymSelector';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const HealthForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    category: 0,
    term: 0,
    count: 0,
    cost: 0,
    discount: 0,
    costdiscount: 0,
    content: '',
  });

  const [categories, setCategories] = useState<HealthCategoryType[]>([]);
  const [terms, setTerms] = useState<TermType[]>([]);
  const [discounts, setDiscounts] = useState<DiscountType[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);

  useEffect(() => {
    loadCategories();
    loadTerms();
    loadDiscounts();
    if (isEditMode && id) {
      loadHealth();
    }
  }, [id, selectedGymId]);

  const loadCategories = async () => {
    try {
      if (!selectedGymId) return;
      const data = await HealthCategory.findall({ gym: selectedGymId });
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadTerms = async () => {
    try {
      if (!selectedGymId) return;
      const data = await Term.findall({ gym: selectedGymId });
      setTerms(data);
    } catch (error) {
      console.error('Failed to load terms:', error);
    }
  };

  const loadDiscounts = async () => {
    try {
      if (!selectedGymId) return;
      const data = await Discount.findall({ gym: selectedGymId });
      setDiscounts(data);
    } catch (error) {
      console.error('Failed to load discounts:', error);
    }
  };

  const loadHealth = async () => {
    try {
      setInitialLoading(true);
      const response = await Health.get(Number(id));
      const health = response.item;
      setFormData({
        name: health.name,
        category: health.category,
        term: health.term,
        count: health.count,
        cost: health.cost,
        discount: health.discount,
        costdiscount: health.costdiscount,
        content: health.content,
      });
    } catch (error) {
      console.error('Failed to load health:', error);
      alert('회원권 정보를 불러오는데 실패했습니다.');
      navigate('/admin/health');
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
      alert('회원권 이름을 입력해주세요.');
      return;
    }

    if (!formData.category) {
      alert('카테고리를 선택해주세요.');
      return;
    }

    if (!formData.term) {
      alert('기간을 선택해주세요.');
      return;
    }

    if (formData.cost <= 0) {
      alert('가격을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      if (isEditMode) {
        await Health.update(Number(id), formData);
        alert('회원권이 수정되었습니다.');
      } else {
        await Health.insert({
          ...formData,
          gym: selectedGymId,
          date: new Date().toISOString(),
        });
        alert('회원권이 등록되었습니다.');
      }

      navigate('/admin/health');
    } catch (error) {
      console.error('Failed to save health:', error);
      alert(`회원권 ${isEditMode ? '수정' : '등록'}에 실패했습니다.`);
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
            <Button variant="ghost" onClick={() => navigate('/admin/health')}>
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
              {isEditMode ? '회원권 수정' : '회원권 등록'}
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
                label="회원권 이름"
                placeholder="예: 헬스 1개월권"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                fullWidth
              />

              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: theme.spacing[2],
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.text.primary,
                  }}
                >
                  카테고리 *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: Number(e.target.value),
                    })
                  }
                  required
                  style={{
                    width: '100%',
                    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.border.light}`,
                    backgroundColor: theme.colors.background.primary,
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.base,
                  }}
                >
                  <option value="">카테고리 선택</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: theme.spacing[2],
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.text.primary,
                  }}
                >
                  기간 *
                </label>
                <select
                  value={formData.term}
                  onChange={(e) =>
                    setFormData({ ...formData, term: Number(e.target.value) })
                  }
                  required
                  style={{
                    width: '100%',
                    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.border.light}`,
                    backgroundColor: theme.colors.background.primary,
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.base,
                  }}
                >
                  <option value="">기간 선택</option>
                  {terms.map((term) => (
                    <option key={term.id} value={term.id}>
                      {term.name}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="횟수"
                type="number"
                placeholder="0 (기간권인 경우 0)"
                value={formData.count || ''}
                onChange={(e) =>
                  setFormData({ ...formData, count: Number(e.target.value) })
                }
                min="0"
                fullWidth
                helperText="횟수제인 경우 이용 가능 횟수를 입력하세요"
              />

              <Input
                label="가격 (원)"
                type="number"
                placeholder="100000"
                value={formData.cost || ''}
                onChange={(e) =>
                  setFormData({ ...formData, cost: Number(e.target.value) })
                }
                min="0"
                required
                fullWidth
              />

              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: theme.spacing[2],
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.text.primary,
                  }}
                >
                  할인
                </label>
                <select
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discount: Number(e.target.value),
                    })
                  }
                  style={{
                    width: '100%',
                    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.border.light}`,
                    backgroundColor: theme.colors.background.primary,
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.base,
                  }}
                >
                  <option value="0">할인 없음</option>
                  {discounts.map((discount) => (
                    <option key={discount.id} value={discount.id}>
                      {discount.name} ({discount.discount}%)
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="할인 후 가격 (원)"
                type="number"
                placeholder="90000"
                value={formData.costdiscount || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    costdiscount: Number(e.target.value),
                  })
                }
                min="0"
                fullWidth
                helperText="할인을 적용한 최종 가격"
              />

              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: theme.spacing[2],
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.text.primary,
                  }}
                >
                  상세 설명
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="회원권에 대한 상세 설명을 입력하세요"
                  rows={4}
                  style={{
                    width: '100%',
                    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.border.light}`,
                    backgroundColor: theme.colors.background.primary,
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.base,
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                />
              </div>

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
                  onClick={() => navigate('/admin/health')}
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

export default HealthForm;
