import { useEffect, useState } from 'react';
import { Card, Badge, Button } from '../../components/ui';
import { theme } from '../../theme';
import { Inquiry } from '../../models';
import type { Inquiry as InquiryType } from '../../types/inquiry';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';
import { userAtom } from '../../store/auth';

const InquiryManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const currentUser = useAtomValue(userAtom);
  const [inquiries, setInquiries] = useState<InquiryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<number | null>(null);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryType | null>(null);
  const [answerText, setAnswerText] = useState('');

  useEffect(() => {
    if (selectedGymId) {
      loadInquiries();
    }
  }, [selectedGymId]);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const data = await Inquiry.findall({ gym: selectedGymId! });
      data.sort((a, b) => new Date(b.createddate).getTime() - new Date(a.createddate).getTime());
      setInquiries(data);
    } catch (error) {
      console.error('Failed to load inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const openAnswerModal = (inquiry: InquiryType) => {
    setSelectedInquiry(inquiry);
    setAnswerText(inquiry.answer || '');
    setShowAnswerModal(true);
  };

  const handleAnswer = async () => {
    if (!selectedInquiry || !answerText.trim()) {
      alert('답변을 입력해주세요.');
      return;
    }
    try {
      await Inquiry.patch(selectedInquiry.id, {
        answer: answerText,
        answeredby: currentUser?.id,
        answereddate: new Date().toISOString(),
        status: Inquiry.status.ANSWERED,
      });
      setShowAnswerModal(false);
      await loadInquiries();
    } catch (error) {
      console.error('Failed to save answer:', error);
      alert('답변 저장에 실패했습니다.');
    }
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    if (filterType !== null && inquiry.type !== filterType) return false;
    if (filterStatus !== null && inquiry.status !== filterStatus) return false;
    return true;
  });

  const getTypeColor = (type: number): 'default' | 'info' | 'warning' | 'error' | 'success' => {
    switch (type) {
      case Inquiry.type.GENERAL: return 'default';
      case Inquiry.type.MEMBERSHIP: return 'info';
      case Inquiry.type.REFUND: return 'warning';
      case Inquiry.type.FACILITY: return 'error';
      case Inquiry.type.OTHER: return 'default';
      default: return 'default';
    }
  };

  const stats = {
    total: inquiries.length,
    waiting: inquiries.filter((i) => i.status === Inquiry.status.WAITING).length,
    answered: inquiries.filter((i) => i.status === Inquiry.status.ANSWERED).length,
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.background.secondary }}>
      <AdminHeader title="문의 관리" />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: theme.spacing[8] }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: theme.spacing[4], marginBottom: theme.spacing[6] }}>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>전체</div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.brand.primary }}>{stats.total}</div>
          </Card>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>대기중</div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.semantic.warning }}>{stats.waiting}</div>
          </Card>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>답변완료</div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.semantic.success }}>{stats.answered}</div>
          </Card>
        </div>

        {/* Filters */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <div style={{ display: 'flex', gap: theme.spacing[4], alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: theme.spacing[2] }}>
              <span style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, alignSelf: 'center' }}>유형:</span>
              <Button variant={filterType === null ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterType(null)}>전체</Button>
              <Button variant={filterType === Inquiry.type.GENERAL ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterType(Inquiry.type.GENERAL)}>일반</Button>
              <Button variant={filterType === Inquiry.type.MEMBERSHIP ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterType(Inquiry.type.MEMBERSHIP)}>회원권</Button>
              <Button variant={filterType === Inquiry.type.REFUND ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterType(Inquiry.type.REFUND)}>환불</Button>
              <Button variant={filterType === Inquiry.type.FACILITY ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterType(Inquiry.type.FACILITY)}>시설</Button>
              <Button variant={filterType === Inquiry.type.OTHER ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterType(Inquiry.type.OTHER)}>기타</Button>
            </div>
            <div style={{ display: 'flex', gap: theme.spacing[2] }}>
              <span style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, alignSelf: 'center' }}>상태:</span>
              <Button variant={filterStatus === null ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterStatus(null)}>전체</Button>
              <Button variant={filterStatus === Inquiry.status.WAITING ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterStatus(Inquiry.status.WAITING)}>대기중</Button>
              <Button variant={filterStatus === Inquiry.status.ANSWERED ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterStatus(Inquiry.status.ANSWERED)}>답변완료</Button>
            </div>
          </div>
        </Card>

        {/* Inquiry List */}
        {loading ? (
          <Card><div style={{ textAlign: 'center', padding: theme.spacing[8] }}>불러오는 중...</div></Card>
        ) : filteredInquiries.length === 0 ? (
          <Card><div style={{ textAlign: 'center', padding: theme.spacing[8] }}>문의가 없습니다.</div></Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
            {filteredInquiries.map((inquiry) => (
              <Card key={inquiry.id} hoverable>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2], marginBottom: theme.spacing[2] }}>
                      <Badge variant={getTypeColor(inquiry.type)}>{Inquiry.getType(inquiry.type)}</Badge>
                      <Badge variant={inquiry.status === Inquiry.status.ANSWERED ? 'success' : 'warning'}>{Inquiry.getStatus(inquiry.status)}</Badge>
                    </div>
                    <h3 style={{ fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold, margin: 0, marginBottom: theme.spacing[1] }}>
                      {inquiry.title}
                    </h3>
                    <p style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, margin: 0, marginBottom: theme.spacing[2], whiteSpace: 'pre-wrap', maxHeight: '60px', overflow: 'hidden' }}>
                      {inquiry.content}
                    </p>
                    {inquiry.answer && (
                      <div style={{ backgroundColor: theme.colors.background.secondary, padding: theme.spacing[3], borderRadius: theme.borderRadius.md, marginBottom: theme.spacing[2] }}>
                        <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary, marginBottom: theme.spacing[1] }}>
                          답변 ({inquiry.extra?.answeredbyuser?.name || '-'})
                        </div>
                        <p style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.primary, margin: 0, whiteSpace: 'pre-wrap', maxHeight: '40px', overflow: 'hidden' }}>
                          {inquiry.answer}
                        </p>
                      </div>
                    )}
                    <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary, display: 'flex', gap: theme.spacing[4] }}>
                      <span>작성자: {inquiry.extra?.inquireruser?.name || '-'}</span>
                      <span>작성일: {inquiry.createddate ? inquiry.createddate.split('T')[0] : '-'}</span>
                      {inquiry.answereddate && <span>답변일: {inquiry.answereddate.split('T')[0]}</span>}
                    </div>
                  </div>
                  <div style={{ marginLeft: theme.spacing[4] }}>
                    <Button
                      variant={inquiry.status === Inquiry.status.WAITING ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => openAnswerModal(inquiry)}
                    >
                      {inquiry.status === Inquiry.status.WAITING ? '답변하기' : '답변수정'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Answer Modal */}
      {showAnswerModal && selectedInquiry && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: theme.colors.background.primary, borderRadius: theme.borderRadius.lg,
            padding: theme.spacing[8], width: '600px', maxHeight: '80vh', overflow: 'auto',
          }}>
            <h2 style={{ fontSize: theme.typography.fontSize.xl, fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing[4] }}>
              문의 답변
            </h2>
            <div style={{ backgroundColor: theme.colors.background.secondary, padding: theme.spacing[4], borderRadius: theme.borderRadius.md, marginBottom: theme.spacing[4] }}>
              <div style={{ display: 'flex', gap: theme.spacing[2], marginBottom: theme.spacing[2] }}>
                <Badge variant={getTypeColor(selectedInquiry.type)}>{Inquiry.getType(selectedInquiry.type)}</Badge>
              </div>
              <h3 style={{ fontSize: theme.typography.fontSize.base, fontWeight: theme.typography.fontWeight.semibold, margin: 0, marginBottom: theme.spacing[2] }}>
                {selectedInquiry.title}
              </h3>
              <p style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, margin: 0, whiteSpace: 'pre-wrap' }}>
                {selectedInquiry.content}
              </p>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.medium, marginBottom: theme.spacing[2] }}>답변</label>
              <textarea
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                rows={6}
                placeholder="답변을 입력해주세요..."
                style={{
                  width: '100%', padding: theme.spacing[3], borderRadius: theme.borderRadius.md,
                  border: `1px solid ${theme.colors.border.medium}`, backgroundColor: theme.colors.background.primary,
                  fontSize: theme.typography.fontSize.sm, resize: 'vertical', boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: theme.spacing[3], marginTop: theme.spacing[6] }}>
              <Button variant="ghost" onClick={() => setShowAnswerModal(false)}>취소</Button>
              <Button variant="primary" onClick={handleAnswer}>답변 저장</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryManagement;
