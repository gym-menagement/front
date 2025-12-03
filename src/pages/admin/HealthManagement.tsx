import { useEffect, useState } from 'react';
import { Card, Button, Input, Select } from '../../components/ui';
import { theme } from '../../theme';
import { Health, HealthCategory, Term, Discount } from '../../models';
import type { Health as HealthType } from '../../types/health';
import type { HealthCategory as HealthCategoryType } from '../../types/healthcategory';
import type { Term as TermType } from '../../types/term';
import type { Discount as DiscountType } from '../../types/discount';
import { useNavigate } from 'react-router-dom';
import GymSelector from '../../components/GymSelector';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const HealthManagement = () => {
  const navigate = useNavigate();
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [healthPlans, setHealthPlans] = useState<HealthType[]>([]);
  const [categories, setCategories] = useState<HealthCategoryType[]>([]);
  const [terms, setTerms] = useState<TermType[]>([]);
  const [discounts, setDiscounts] = useState<DiscountType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<number | 'all'>('all');

  useEffect(() => {
    if (selectedGymId) {
      loadHealthPlans();
      loadCategories();
      loadTerms();
      loadDiscounts();
    }
  }, [selectedGymId, filterCategory]);

  const loadHealthPlans = async () => {
    try {
      setLoading(true);

      if (!selectedGymId) {
        setHealthPlans([]);
        return;
      }

      const params: any = { gym: selectedGymId };

      if (filterCategory !== 'all') {
        params.category = filterCategory;
      }

      const data = await Health.find(params);
      setHealthPlans(data);
    } catch (error) {
      console.error('Failed to load health plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      if (!selectedGymId) return;
      const data = await HealthCategory.find({ gym: selectedGymId });
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadTerms = async () => {
    try {
      if (!selectedGymId) return;
      const data = await Term.find({ gym: selectedGymId });
      setTerms(data);
    } catch (error) {
      console.error('Failed to load terms:', error);
    }
  };

  const loadDiscounts = async () => {
    try {
      const data = await Discount.find();
      setDiscounts(data);
    } catch (error) {
      console.error('Failed to load discounts:', error);
    }
  };

  const filteredHealthPlans = healthPlans.filter((plan) =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTermName = (termId: number) => {
    const term = terms.find((t) => t.id === termId);
    return term ? term.name : '-';
  };

  const getDiscountRate = (discountId: number) => {
    const discount = discounts.find((d) => d.id === discountId);
    return discount ? `${discount.discount}%` : '0%';
  };

  const handleDelete = async (planId: number, planName: string) => {
    if (!confirm(`${planName} 회원권을 정말 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await Health.remove(planId);
      loadHealthPlans();
    } catch (error) {
      console.error('Failed to delete health plan:', error);
      alert('회원권 삭제에 실패했습니다.');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price) + '원';
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
              회원권 관리
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
              onClick={() => navigate('/admin/health/new')}
            >
              + 새 회원권 등록
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
                placeholder="회원권명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
            </div>
            <div style={{ width: '200px' }}>
              <Select
                value={filterCategory}
                onChange={(e) => {
                  const value = e.target.value === 'all' ? 'all' : Number(e.target.value);
                  setFilterCategory(value);
                }}
                options={[
                  { value: 'all', label: '전체 카테고리' },
                  ...categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  })),
                ]}
                selectSize="md"
                fullWidth
              />
            </div>
          </div>
        </Card>

        {/* Health Plans List */}
        {loading ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              회원권 목록을 불러오는 중...
            </div>
          </Card>
        ) : filteredHealthPlans.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              {searchTerm
                ? '검색 결과가 없습니다.'
                : '등록된 회원권이 없습니다.'}
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
            {filteredHealthPlans.map((plan) => (
              <Card key={plan.id} hoverable>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing[3],
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: theme.typography.fontWeight.bold,
                          fontSize: theme.typography.fontSize.lg,
                          marginBottom: theme.spacing[2],
                          color: theme.colors.text.primary,
                        }}
                      >
                        {plan.name}
                      </div>
                      <Select
                        value={plan.category}
                        onChange={async (e) => {
                          const newCategoryId = Number(e.target.value);
                          try {
                            await Health.update(plan.id, {
                              category: newCategoryId,
                            });
                            loadHealthPlans();
                          } catch (error) {
                            console.error('Failed to update category:', error);
                            alert('카테고리 변경에 실패했습니다.');
                          }
                        }}
                        options={categories.map((cat) => ({
                          value: cat.id,
                          label: cat.name,
                        }))}
                        selectSize="sm"
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: theme.spacing[2],
                      fontSize: theme.typography.fontSize.sm,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ color: theme.colors.text.secondary }}>
                        기간
                      </span>
                      <span
                        style={{
                          fontWeight: theme.typography.fontWeight.medium,
                        }}
                      >
                        {getTermName(plan.term)}
                      </span>
                    </div>

                    {plan.count > 0 && (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span style={{ color: theme.colors.text.secondary }}>
                          이용 횟수
                        </span>
                        <span
                          style={{
                            fontWeight: theme.typography.fontWeight.medium,
                          }}
                        >
                          {plan.count}회
                        </span>
                      </div>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ color: theme.colors.text.secondary }}>
                        원가
                      </span>
                      <span
                        style={{
                          fontWeight: theme.typography.fontWeight.medium,
                          textDecoration:
                            plan.discount > 0 ? 'line-through' : 'none',
                          color:
                            plan.discount > 0
                              ? theme.colors.text.tertiary
                              : theme.colors.text.primary,
                        }}
                      >
                        {formatPrice(plan.cost)}
                      </span>
                    </div>

                    {plan.discount > 0 && (
                      <>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span style={{ color: theme.colors.text.secondary }}>
                            할인율
                          </span>
                          <span
                            style={{
                              fontWeight: theme.typography.fontWeight.medium,
                              color: theme.colors.semantic.error,
                            }}
                          >
                            {getDiscountRate(plan.discount)}
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span style={{ color: theme.colors.text.secondary }}>
                            할인가
                          </span>
                          <span
                            style={{
                              fontWeight: theme.typography.fontWeight.bold,
                              fontSize: theme.typography.fontSize.lg,
                              color: theme.colors.brand.primary,
                            }}
                          >
                            {formatPrice(plan.costdiscount)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  {plan.content && (
                    <div
                      style={{
                        padding: theme.spacing[2],
                        backgroundColor: theme.colors.background.secondary,
                        borderRadius: theme.borderRadius.sm,
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                      }}
                    >
                      {plan.content}
                    </div>
                  )}

                  {/* Actions */}
                  <div
                    style={{
                      display: 'flex',
                      gap: theme.spacing[2],
                      marginTop: theme.spacing[2],
                      paddingTop: theme.spacing[3],
                      borderTop: `1px solid ${theme.colors.border.light}`,
                    }}
                  >
                    <Button
                      size="sm"
                      variant="secondary"
                      fullWidth
                      onClick={() => navigate(`/admin/health/${plan.id}`)}
                    >
                      수정
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      fullWidth
                      onClick={() => handleDelete(plan.id, plan.name)}
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

export default HealthManagement;
