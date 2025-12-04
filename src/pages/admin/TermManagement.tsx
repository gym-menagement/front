import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { Term, DayType } from '../../models';
import type { Term as TermType } from '../../types/term';
import type { Daytype as DaytypeType } from '../../types/daytype';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';
import TermModal from './TermModal';
import DaytypeModal from './DaytypeModal';

type TabType = 'term' | 'daytype';

const TermManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [activeTab, setActiveTab] = useState<TabType>('term');
  const [terms, setTerms] = useState<TermType[]>([]);
  const [daytypes, setDaytypes] = useState<DaytypeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [termModalState, setTermModalState] = useState<{
    show: boolean;
    term: TermType | null;
  }>({
    show: false,
    term: null,
  });
  const [daytypeModalState, setDaytypeModalState] = useState<{
    show: boolean;
    daytype: DaytypeType | null;
  }>({
    show: false,
    daytype: null,
  });

  useEffect(() => {
    if (selectedGymId) {
      loadData();
    }
  }, [selectedGymId]);

  const loadData = async () => {
    try {
      setLoading(true);

      if (!selectedGymId) {
        setTerms([]);
        setDaytypes([]);
        return;
      }

      const [termsData, daytypesData] = await Promise.all([
        Term.find({ gym: selectedGymId }),
        DayType.find({ gym: selectedGymId }),
      ]);

      // 정렬: 기간 긴 순서
      termsData.sort((a, b) => b.term - a.term);

      setTerms(termsData);
      setDaytypes(daytypesData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTerms = terms.filter((term) =>
    term.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDaytypes = daytypes.filter((daytype) =>
    daytype.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Term handlers
  const handleDeleteTerm = async (termId: number, termName: string) => {
    if (!confirm(`"${termName}" 기간을 정말 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await Term.remove(termId);
      loadData();
      alert('기간이 삭제되었습니다.');
    } catch (error) {
      console.error('Failed to delete term:', error);
      alert('기간 삭제에 실패했습니다.');
    }
  };

  const openCreateTermModal = () => {
    setTermModalState({
      show: true,
      term: null,
    });
  };

  const openEditTermModal = (term: TermType) => {
    setTermModalState({
      show: true,
      term,
    });
  };

  const closeTermModal = () => {
    setTermModalState({
      show: false,
      term: null,
    });
  };

  const handleSaveTerm = async (data: { name: string; term: number; daytype: number }) => {
    if (!selectedGymId) {
      alert('헬스장을 선택해주세요.');
      return;
    }

    try {
      if (termModalState.term) {
        // 수정
        await Term.patch(termModalState.term.id, {
          name: data.name,
          term: data.term,
          daytype: data.daytype,
        });
        alert('기간이 수정되었습니다.');
      } else {
        // 등록
        await Term.insert({
          gym: selectedGymId,
          name: data.name,
          term: data.term,
          daytype: data.daytype,
          date: new Date().toISOString(),
        });
        alert('기간이 등록되었습니다.');
      }

      loadData();
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
      loadData();
      alert('이용시간대가 삭제되었습니다.');
    } catch (error) {
      console.error('Failed to delete daytype:', error);
      alert('이용시간대 삭제에 실패했습니다.');
    }
  };

  const openCreateDaytypeModal = () => {
    setDaytypeModalState({
      show: true,
      daytype: null,
    });
  };

  const openEditDaytypeModal = (daytype: DaytypeType) => {
    setDaytypeModalState({
      show: true,
      daytype,
    });
  };

  const closeDaytypeModal = () => {
    setDaytypeModalState({
      show: false,
      daytype: null,
    });
  };

  const handleSaveDaytype = async (data: { name: string }) => {
    if (!selectedGymId) {
      alert('헬스장을 선택해주세요.');
      return;
    }

    try {
      if (daytypeModalState.daytype) {
        // 수정
        await DayType.patch(daytypeModalState.daytype.id, {
          name: data.name,
        });
        alert('이용시간대가 수정되었습니다.');
      } else {
        // 등록
        await DayType.insert({
          gym: selectedGymId,
          name: data.name,
          date: new Date().toISOString(),
        });
        alert('이용시간대가 등록되었습니다.');
      }

      loadData();
    } catch (error) {
      console.error('Failed to save daytype:', error);
      throw error;
    }
  };

  const getDaytypeName = (daytypeId: number) => {
    const dt = daytypes.find((d) => d.id === daytypeId);
    return dt ? dt.name : '알 수 없음';
  };

  const tabButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: `${theme.spacing[3]} ${theme.spacing[6]}`,
    fontSize: theme.typography.fontSize.base,
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

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background.secondary,
      }}
    >
      <AdminHeader title="기간 관리">
        <Button
          variant="primary"
          onClick={activeTab === 'term' ? openCreateTermModal : openCreateDaytypeModal}
        >
          + {activeTab === 'term' ? '새 기간 등록' : '새 이용시간대 등록'}
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
        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            marginBottom: theme.spacing[6],
            borderRadius: theme.borderRadius.lg,
            overflow: 'hidden',
            boxShadow: theme.boxShadow.sm,
          }}
        >
          <button
            style={{
              ...tabButtonStyle(activeTab === 'term'),
              flex: 1,
              borderTopLeftRadius: theme.borderRadius.lg,
              borderBottomLeftRadius: theme.borderRadius.lg,
            }}
            onClick={() => {
              setActiveTab('term');
              setSearchTerm('');
            }}
          >
            기간 (Term)
          </button>
          <button
            style={{
              ...tabButtonStyle(activeTab === 'daytype'),
              flex: 1,
              borderTopRightRadius: theme.borderRadius.lg,
              borderBottomRightRadius: theme.borderRadius.lg,
            }}
            onClick={() => {
              setActiveTab('daytype');
              setSearchTerm('');
            }}
          >
            이용시간대 (Daytype)
          </button>
        </div>

        {/* Search */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <Input
            placeholder={
              activeTab === 'term'
                ? '기간명으로 검색...'
                : '이용시간대명으로 검색...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Card>

        {/* Content */}
        {loading ? (
          <Card>
            <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
              데이터를 불러오는 중...
            </div>
          </Card>
        ) : activeTab === 'term' ? (
          // Terms List
          filteredTerms.length === 0 ? (
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
                    {/* 기간 정보 */}
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

                    {/* 기간 배지 */}
                    <Badge variant="info" size="lg">
                      {term.term}일
                    </Badge>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => openEditTermModal(term)}
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
          )
        ) : (
          // Daytypes List
          filteredDaytypes.length === 0 ? (
            <Card>
              <div style={{ textAlign: 'center', padding: theme.spacing[8] }}>
                {searchTerm
                  ? '검색 결과가 없습니다.'
                  : '등록된 이용시간대가 없습니다.'}
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
              {filteredDaytypes.map((daytype) => (
                <Card key={daytype.id} hoverable>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      gap: theme.spacing[4],
                      alignItems: 'center',
                    }}
                  >
                    {/* 이용시간대 정보 */}
                    <div>
                      <div
                        style={{
                          fontWeight: theme.typography.fontWeight.semibold,
                          fontSize: theme.typography.fontSize.lg,
                          marginBottom: theme.spacing[1],
                        }}
                      >
                        {daytype.name}
                      </div>
                      <div
                        style={{
                          fontSize: theme.typography.fontSize.sm,
                          color: theme.colors.text.secondary,
                        }}
                      >
                        등록일: {new Date(daytype.date).toLocaleDateString('ko-KR')}
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => openEditDaytypeModal(daytype)}
                      >
                        수정
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteDaytype(daytype.id, daytype.name)}
                      >
                        삭제
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )
        )}
      </div>

      {/* Modals */}
      <TermModal
        show={termModalState.show}
        term={termModalState.term}
        gymId={selectedGymId}
        daytypes={daytypes}
        onClose={closeTermModal}
        onSave={handleSaveTerm}
      />
      <DaytypeModal
        show={daytypeModalState.show}
        daytype={daytypeModalState.daytype}
        gymId={selectedGymId}
        onClose={closeDaytypeModal}
        onSave={handleSaveDaytype}
      />
    </div>
  );
};

export default TermManagement;

