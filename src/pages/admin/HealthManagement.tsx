import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input, Select } from '../../components/ui';
import { theme } from '../../theme';
import { Health, HealthCategory, Term, Discount, DayType } from '../../models';
import type { Health as HealthType } from '../../types/health';
import type { Healthcategory as HealthCategoryType } from '../../types/healthcategory';
import type { Term as TermType } from '../../types/term';
import type { Discount as DiscountType } from '../../types/discount';
import type { Daytype as DaytypeType } from '../../types/daytype';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';
import DiscountModal from './DiscountModal';
import TermModal from './TermModal';
import DaytypeModal from './DaytypeModal';

type TabType = 'health' | 'category' | 'discount' | 'term';

const HealthManagement = () => {
  const navigate = useNavigate();
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [activeTab, setActiveTab] = useState<TabType>('health');
  
  // Health Plans
  const [healthPlans, setHealthPlans] = useState<HealthType[]>([]);
  const [filterCategory, setFilterCategory] = useState<number | 'all'>('all');
  
  // Categories
  const [categories, setCategories] = useState<HealthCategoryType[]>([]);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  
  // Discounts
  const [discounts, setDiscounts] = useState<DiscountType[]>([]);
  const [discountModalState, setDiscountModalState] = useState<{
    show: boolean;
    discount: DiscountType | null;
  }>({ show: false, discount: null });
  
  // Terms
  const [terms, setTerms] = useState<TermType[]>([]);
  const [daytypes, setDaytypes] = useState<DaytypeType[]>([]);
  const [termModalState, setTermModalState] = useState<{
    show: boolean;
    term: TermType | null;
  }>({ show: false, term: null });
  const [daytypeModalState, setDaytypeModalState] = useState<{
    show: boolean;
    daytype: DaytypeType | null;
  }>({ show: false, daytype: null });
  
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (selectedGymId) {
      loadAllData();
    }
  }, [selectedGymId, filterCategory]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadHealthPlans(),
        loadCategories(),
        loadDiscounts(),
        loadTerms(),
        loadDaytypes(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadHealthPlans = async () => {
    try {
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
    }
  };

  const loadCategories = async () => {
    try {
      if (!selectedGymId) return;
      const data = await HealthCategory.find({ gym: selectedGymId });
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadDiscounts = async () => {
    try {
      if (!selectedGymId) return;
      const data = await Discount.find({ gym: selectedGymId });
      data.sort((a, b) => b.discount - a.discount);
      setDiscounts(data);
    } catch (error) {
      console.error('Failed to load discounts:', error);
    }
  };

  const loadTerms = async () => {
    try {
      if (!selectedGymId) return;
      const data = await Term.find({ gym: selectedGymId });
      data.sort((a, b) => b.term - a.term);
      setTerms(data);
    } catch (error) {
      console.error('Failed to load terms:', error);
    }
  };

  const loadDaytypes = async () => {
    try {
      if (!selectedGymId) return;
      const data = await DayType.find({ gym: selectedGymId });
      setDaytypes(data);
    } catch (error) {
      console.error('Failed to load daytypes:', error);
    }
  };

  // Tab button style
  const tabButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    backgroundColor: isActive
      ? theme.colors.brand.primary
      : theme.colors.background.primary,
    color: isActive ? '#FFFFFF' : theme.colors.text.secondary,
    border: `1px solid ${isActive ? theme.colors.brand.primary : theme.colors.border.light}`,
    borderRadius: 0,
    cursor: 'pointer',
    transition: `all ${theme.effects.transition.duration[200]} ${theme.effects.transition.timing.inOut}`,
  });

  // Health Plan handlers
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

  const handleDeleteHealth = async (planId: number, planName: string) => {
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

  // Category handlers
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCategory = async () => {
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

  const handleUpdateCategory = async (categoryId: number) => {
    if (!editingCategoryName.trim()) {
      alert('카테고리명을 입력해주세요.');
      return;
    }

    try {
      await HealthCategory.patch(categoryId, {
        name: editingCategoryName.trim(),
      });

      setEditingCategoryId(null);
      setEditingCategoryName('');
      loadCategories();
    } catch (error) {
      console.error('Failed to update category:', error);
      alert('카테고리 수정에 실패했습니다.');
    }
  };

  const handleDeleteCategory = async (categoryId: number, categoryName: string) => {
    if (!confirm(`"${categoryName}" 카테고리를 정말 삭제하시겠습니까?\n\n※ 이 카테고리를 사용하는 회원권이 있다면 삭제할 수 없습니다.`)) {
      return;
    }

    try {
      await HealthCategory.remove(categoryId);
      loadCategories();
      alert('카테고리가 삭제되었습니다.');
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert('카테고리 삭제에 실패했습니다.\n이 카테고리를 사용하는 회원권이 있을 수 있습니다.');
    }
  };

  // Discount handlers
  const filteredDiscounts = discounts.filter((discount) =>
    discount.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteDiscount = async (discountId: number, discountName: string) => {
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

  const handleSaveDiscount = async (data: { name: string; discount: number }) => {
    if (!selectedGymId) {
      alert('헬스장을 선택해주세요.');
      return;
    }

    try {
      if (discountModalState.discount) {
        await Discount.patch(discountModalState.discount.id, {
          name: data.name,
          discount: data.discount,
        });
        alert('할인이 수정되었습니다.');
      } else {
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

  // Term handlers
  const filteredTerms = terms.filter((term) =>
    term.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteTerm = async (termId: number, termName: string) => {
    if (!confirm(`"${termName}" 기간을 정말 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await Term.remove(termId);
      loadTerms();
      alert('기간이 삭제되었습니다.');
    } catch (error) {
      console.error('Failed to delete term:', error);
      alert('기간 삭제에 실패했습니다.');
    }
  };

  const handleSaveTerm = async (data: { name: string; term: number; daytype: number }) => {
    if (!selectedGymId) {
      alert('헬스장을 선택해주세요.');
      return;
    }

    try {
      if (termModalState.term) {
        await Term.patch(termModalState.term.id, {
          name: data.name,
          term: data.term,
          daytype: data.daytype,
        });
        alert('기간이 수정되었습니다.');
      } else {
        await Term.insert({
          gym: selectedGymId,
          name: data.name,
          term: data.term,
          daytype: data.daytype,
          date: new Date().toISOString(),
        });
        alert('기간이 등록되었습니다.');
      }

      loadTerms();
    } catch (error) {
      console.error('Failed to save term:', error);
      throw error;
    }
  };

  // Daytype handlers
  const handleDeleteDaytype = async (daytypeId: number, daytypeName: string) => {
    if (!confirm(`"${daytypeName}" 이용시간대를 정말 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await DayType.remove(daytypeId);
      loadDaytypes();
      alert('이용시간대가 삭제되었습니다.');
    } catch (error) {
      console.error('Failed to delete daytype:', error);
      alert('이용시간대 삭제에 실패했습니다.');
    }
  };

  const handleSaveDaytype = async (data: { name: string }) => {
    if (!selectedGymId) {
      alert('헬스장을 선택해주세요.');
      return;
    }

    try {
      if (daytypeModalState.daytype) {
        await DayType.patch(daytypeModalState.daytype.id, {
          name: data.name,
        });
        alert('이용시간대가 수정되었습니다.');
      } else {
        await DayType.insert({
          gym: selectedGymId,
          name: data.name,
          date: new Date().toISOString(),
        });
        alert('이용시간대가 등록되었습니다.');
      }

      loadDaytypes();
    } catch (error) {
      console.error('Failed to save daytype:', error);
      throw error;
    }
  };

  const getDaytypeName = (daytypeId: number) => {
    const dt = daytypes.find((d) => d.id === daytypeId);
    return dt ? dt.name : '알 수 없음';
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background.secondary,
      }}
    >
      <AdminHeader title="회원권 상품 관리">
        {activeTab === 'health' && (
          <Button variant="primary" onClick={() => navigate('/admin/health/new')}>
            + 새 회원권 등록
          </Button>
        )}
        {activeTab === 'discount' && (
          <Button
            variant="primary"
            onClick={() => setDiscountModalState({ show: true, discount: null })}
          >
            + 새 할인 등록
          </Button>
        )}
        {activeTab === 'term' && (
          <Button
            variant="primary"
            onClick={() => setTermModalState({ show: true, term: null })}
          >
            + 새 기간 등록
          </Button>
        )}
      </AdminHeader>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: theme.spacing[8],
        }}
      >
        {/* Tabs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            marginBottom: theme.spacing[6],
            borderRadius: theme.borderRadius.lg,
            overflow: 'hidden',
            boxShadow: theme.boxShadow.sm,
          }}
        >
          <button
            style={{
              ...tabButtonStyle(activeTab === 'health'),
              borderTopLeftRadius: theme.borderRadius.lg,
              borderBottomLeftRadius: theme.borderRadius.lg,
            }}
            onClick={() => {
              setActiveTab('health');
              setSearchTerm('');
            }}
          >
            회원권
          </button>
          <button
            style={tabButtonStyle(activeTab === 'category')}
            onClick={() => {
              setActiveTab('category');
              setSearchTerm('');
            }}
          >
            카테고리
          </button>
          <button
            style={tabButtonStyle(activeTab === 'discount')}
            onClick={() => {
              setActiveTab('discount');
              setSearchTerm('');
            }}
          >
            할인
          </button>
          <button
            style={{
              ...tabButtonStyle(activeTab === 'term'),
              borderTopRightRadius: theme.borderRadius.lg,
              borderBottomRightRadius: theme.borderRadius.lg,
            }}
            onClick={() => {
              setActiveTab('term');
              setSearchTerm('');
            }}
          >
            기간
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'health' && (
          <>
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
                          onClick={() => handleDeleteHealth(plan.id, plan.name)}
                        >
                          삭제
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'category' && (
          <>
            {/* Add Category */}
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
                        handleCreateCategory();
                      }
                    }}
                    fullWidth
                  />
                </div>
                <Button variant="primary" onClick={handleCreateCategory}>
                  추가
                </Button>
              </div>
            </Card>

            {/* Search */}
            <Card style={{ marginBottom: theme.spacing[6] }}>
              <Input
                placeholder="카테고리명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
            </Card>

            {/* Categories List */}
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
                      {editingCategoryId === category.id ? (
                        <>
                          <Input
                            value={editingCategoryName}
                            onChange={(e) => setEditingCategoryName(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleUpdateCategory(category.id);
                              } else if (e.key === 'Escape') {
                                setEditingCategoryId(null);
                                setEditingCategoryName('');
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
                              onClick={() => handleUpdateCategory(category.id)}
                            >
                              저장
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              fullWidth
                              onClick={() => {
                                setEditingCategoryId(null);
                                setEditingCategoryName('');
                              }}
                            >
                              취소
                            </Button>
                          </div>
                        </>
                      ) : (
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
                            등록일: {new Date(category.date).toLocaleDateString('ko-KR')}
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
                              onClick={() => {
                                setEditingCategoryId(category.id);
                                setEditingCategoryName(category.name);
                              }}
                            >
                              수정
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              fullWidth
                              onClick={() =>
                                handleDeleteCategory(category.id, category.name)
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
          </>
        )}

        {activeTab === 'discount' && (
          <>
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

                      <Badge variant="error" size="lg">
                        {discount.discount}% OFF
                      </Badge>

                      <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            setDiscountModalState({ show: true, discount })
                          }
                        >
                          수정
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() =>
                            handleDeleteDiscount(discount.id, discount.name)
                          }
                        >
                          삭제
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'term' && (
          <>
            {/* Search */}
            <Card style={{ marginBottom: theme.spacing[6] }}>
              <Input
                placeholder="기간명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
            </Card>

            {/* Terms List */}
            {loading ? (
              <Card>
                <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
                  데이터를 불러오는 중...
                </div>
              </Card>
            ) : filteredTerms.length === 0 ? (
              <Card>
                <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
                  {searchTerm ? '검색 결과가 없습니다.' : '등록된 기간이 없습니다.'}
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
                {filteredTerms.map((term) => (
                  <Card key={term.id} hoverable>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto auto',
                        gap: theme.spacing[4],
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontWeight: theme.typography.fontWeight.semibold,
                            fontSize: theme.typography.fontSize.lg,
                            marginBottom: theme.spacing[1],
                          }}
                        >
                          {term.name}
                        </div>
                        <div
                          style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.text.secondary,
                          }}
                        >
                          이용 시간대: {getDaytypeName(term.daytype)}
                        </div>
                      </div>

                      <Badge variant="info" size="lg">
                        {term.term}일
                      </Badge>

                      <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            setTermModalState({ show: true, term })
                          }
                        >
                          수정
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDeleteTerm(term.id, term.name)}
                        >
                          삭제
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <DiscountModal
        show={discountModalState.show}
        discount={discountModalState.discount}
        gymId={selectedGymId}
        onClose={() => setDiscountModalState({ show: false, discount: null })}
        onSave={handleSaveDiscount}
      />
      <TermModal
        show={termModalState.show}
        term={termModalState.term}
        gymId={selectedGymId}
        daytypes={daytypes}
        onClose={() => setTermModalState({ show: false, term: null })}
        onSave={handleSaveTerm}
      />
      <DaytypeModal
        show={daytypeModalState.show}
        daytype={daytypeModalState.daytype}
        gymId={selectedGymId}
        onClose={() => setDaytypeModalState({ show: false, daytype: null })}
        onSave={handleSaveDaytype}
      />
    </div>
  );
};

export default HealthManagement;
