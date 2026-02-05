import { useEffect, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { theme } from '../../theme';
import { Notice } from '../../models';
import type { Notice as NoticeType } from '../../types/notice';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';
import { userAtom } from '../../store/auth';

const NoticeManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const currentUser = useAtomValue(userAtom);
  const [notices, setNotices] = useState<NoticeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState<NoticeType | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: Notice.type.GENERAL,
    target: Notice.target.ALL,
    ispopup: Notice.ispopup.NO,
    ispush: Notice.ispush.NO,
    status: Notice.status.PUBLIC,
    startdate: '',
    enddate: '',
  });

  useEffect(() => {
    if (selectedGymId) {
      loadNotices();
    }
  }, [selectedGymId]);

  const loadNotices = async () => {
    try {
      setLoading(true);
      const data = await Notice.findall({ gym: selectedGymId! });
      data.sort((a, b) => new Date(b.createddate).getTime() - new Date(a.createddate).getTime());
      setNotices(data);
    } catch (error) {
      console.error('Failed to load notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingNotice(null);
    setFormData({
      title: '',
      content: '',
      type: Notice.type.GENERAL,
      target: Notice.target.ALL,
      ispopup: Notice.ispopup.NO,
      ispush: Notice.ispush.NO,
      status: Notice.status.PUBLIC,
      startdate: new Date().toISOString().split('T')[0],
      enddate: '',
    });
    setShowModal(true);
  };

  const openEditModal = (notice: NoticeType) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      type: notice.type,
      target: notice.target,
      ispopup: notice.ispopup,
      ispush: notice.ispush,
      status: notice.status,
      startdate: notice.startdate ? notice.startdate.split('T')[0] : '',
      enddate: notice.enddate ? notice.enddate.split('T')[0] : '',
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (!formData.title.trim()) {
        alert('제목을 입력해주세요.');
        return;
      }

      const payload = {
        ...formData,
        gym: selectedGymId!,
        createdby: currentUser?.id,
        startdate: formData.startdate ? `${formData.startdate}T00:00:00` : undefined,
        enddate: formData.enddate ? `${formData.enddate}T23:59:59` : undefined,
        date: new Date().toISOString(),
      };

      if (editingNotice) {
        await Notice.update(editingNotice.id, payload);
      } else {
        await Notice.insert(payload);
      }

      setShowModal(false);
      await loadNotices();
    } catch (error) {
      console.error('Failed to save notice:', error);
      alert('저장에 실패했습니다.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      await Notice.remove(id);
      await loadNotices();
    } catch (error) {
      console.error('Failed to delete notice:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const filteredNotices = notices.filter((notice) => {
    if (filterType !== null && notice.type !== filterType) return false;
    if (filterStatus !== null && notice.status !== filterStatus) return false;
    return true;
  });

  const getTypeColor = (type: number): 'default' | 'info' | 'warning' | 'error' => {
    switch (type) {
      case Notice.type.GENERAL: return 'default';
      case Notice.type.IMPORTANT: return 'error';
      case Notice.type.EVENT: return 'info';
      default: return 'default';
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.background.secondary }}>
      <AdminHeader title="공지사항 관리">
        <Button variant="primary" onClick={openCreateModal}>
          공지 작성
        </Button>
      </AdminHeader>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: theme.spacing[8] }}>
        {/* Filters */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <div style={{ display: 'flex', gap: theme.spacing[4], alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: theme.spacing[2] }}>
              <span style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, alignSelf: 'center' }}>유형:</span>
              <Button variant={filterType === null ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterType(null)}>전체</Button>
              <Button variant={filterType === Notice.type.GENERAL ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterType(Notice.type.GENERAL)}>일반</Button>
              <Button variant={filterType === Notice.type.IMPORTANT ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterType(Notice.type.IMPORTANT)}>중요</Button>
              <Button variant={filterType === Notice.type.EVENT ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterType(Notice.type.EVENT)}>이벤트</Button>
            </div>
            <div style={{ display: 'flex', gap: theme.spacing[2] }}>
              <span style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, alignSelf: 'center' }}>상태:</span>
              <Button variant={filterStatus === null ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterStatus(null)}>전체</Button>
              <Button variant={filterStatus === Notice.status.PUBLIC ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterStatus(Notice.status.PUBLIC)}>공개</Button>
              <Button variant={filterStatus === Notice.status.PRIVATE ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterStatus(Notice.status.PRIVATE)}>비공개</Button>
            </div>
          </div>
        </Card>

        {/* Notice List */}
        {loading ? (
          <Card><div style={{ textAlign: 'center', padding: theme.spacing[8] }}>불러오는 중...</div></Card>
        ) : filteredNotices.length === 0 ? (
          <Card><div style={{ textAlign: 'center', padding: theme.spacing[8] }}>공지사항이 없습니다.</div></Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
            {filteredNotices.map((notice) => (
              <Card key={notice.id} hoverable>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2], marginBottom: theme.spacing[2] }}>
                      <Badge variant={getTypeColor(notice.type)}>{Notice.getType(notice.type)}</Badge>
                      <Badge variant={notice.status === Notice.status.PUBLIC ? 'success' : 'default'}>{Notice.getStatus(notice.status)}</Badge>
                      {notice.ispopup === Notice.ispopup.YES && <Badge variant="warning">팝업</Badge>}
                      {notice.ispush === Notice.ispush.YES && <Badge variant="info">푸시</Badge>}
                    </div>
                    <h3 style={{ fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold, margin: 0, marginBottom: theme.spacing[1] }}>
                      {notice.title}
                    </h3>
                    <p style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, margin: 0, marginBottom: theme.spacing[2], whiteSpace: 'pre-wrap', maxHeight: '60px', overflow: 'hidden' }}>
                      {notice.content}
                    </p>
                    <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary, display: 'flex', gap: theme.spacing[4] }}>
                      <span>대상: {Notice.getTarget(notice.target)}</span>
                      <span>조회수: {notice.viewcount}</span>
                      <span>작성자: {notice.extra?.user?.name || '-'}</span>
                      {notice.startdate && <span>시작: {notice.startdate.split('T')[0]}</span>}
                      {notice.enddate && <span>종료: {notice.enddate.split('T')[0]}</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: theme.spacing[2], marginLeft: theme.spacing[4] }}>
                    <Button variant="ghost" size="sm" onClick={() => openEditModal(notice)}>수정</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(notice.id)}>삭제</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: theme.colors.background.primary, borderRadius: theme.borderRadius.lg,
            padding: theme.spacing[8], width: '600px', maxHeight: '80vh', overflow: 'auto',
          }}>
            <h2 style={{ fontSize: theme.typography.fontSize.xl, fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing[6] }}>
              {editingNotice ? '공지 수정' : '공지 작성'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
              <Input label="제목" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              <div>
                <label style={{ display: 'block', fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.medium, marginBottom: theme.spacing[2], color: theme.colors.text.primary }}>내용</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  style={{
                    width: '100%', padding: theme.spacing[3], borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.border.medium}`, backgroundColor: theme.colors.background.primary,
                    fontSize: theme.typography.fontSize.sm, resize: 'vertical', boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing[4] }}>
                <div>
                  <label style={{ display: 'block', fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.medium, marginBottom: theme.spacing[2] }}>유형</label>
                  <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: Number(e.target.value) })}
                    style={{ width: '100%', padding: theme.spacing[3], borderRadius: theme.borderRadius.md, border: `1px solid ${theme.colors.border.medium}`, backgroundColor: theme.colors.background.primary, fontSize: theme.typography.fontSize.sm }}>
                    <option value={Notice.type.GENERAL}>일반</option>
                    <option value={Notice.type.IMPORTANT}>중요</option>
                    <option value={Notice.type.EVENT}>이벤트</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.medium, marginBottom: theme.spacing[2] }}>대상</label>
                  <select value={formData.target} onChange={(e) => setFormData({ ...formData, target: Number(e.target.value) })}
                    style={{ width: '100%', padding: theme.spacing[3], borderRadius: theme.borderRadius.md, border: `1px solid ${theme.colors.border.medium}`, backgroundColor: theme.colors.background.primary, fontSize: theme.typography.fontSize.sm }}>
                    <option value={Notice.target.ALL}>전체</option>
                    <option value={Notice.target.MEMBERS_ONLY}>회원만</option>
                    <option value={Notice.target.SPECIFIC_MEMBERS}>특정회원</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.medium, marginBottom: theme.spacing[2] }}>상태</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: Number(e.target.value) })}
                    style={{ width: '100%', padding: theme.spacing[3], borderRadius: theme.borderRadius.md, border: `1px solid ${theme.colors.border.medium}`, backgroundColor: theme.colors.background.primary, fontSize: theme.typography.fontSize.sm }}>
                    <option value={Notice.status.PUBLIC}>공개</option>
                    <option value={Notice.status.PRIVATE}>비공개</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: theme.spacing[4], alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2], fontSize: theme.typography.fontSize.sm }}>
                    <input type="checkbox" checked={formData.ispopup === Notice.ispopup.YES}
                      onChange={(e) => setFormData({ ...formData, ispopup: e.target.checked ? Notice.ispopup.YES : Notice.ispopup.NO })} />
                    팝업
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2], fontSize: theme.typography.fontSize.sm }}>
                    <input type="checkbox" checked={formData.ispush === Notice.ispush.YES}
                      onChange={(e) => setFormData({ ...formData, ispush: e.target.checked ? Notice.ispush.YES : Notice.ispush.NO })} />
                    푸시
                  </label>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing[4] }}>
                <Input label="시작일" type="date" value={formData.startdate} onChange={(e) => setFormData({ ...formData, startdate: e.target.value })} />
                <Input label="종료일" type="date" value={formData.enddate} onChange={(e) => setFormData({ ...formData, enddate: e.target.value })} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: theme.spacing[3], marginTop: theme.spacing[6] }}>
              <Button variant="ghost" onClick={() => setShowModal(false)}>취소</Button>
              <Button variant="primary" onClick={handleSave}>{editingNotice ? '수정' : '작성'}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeManagement;
