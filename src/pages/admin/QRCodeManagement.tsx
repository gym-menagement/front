import { useEffect, useState } from 'react';
import { Card, Badge, Button } from '../../components/ui';
import { theme } from '../../theme';
import { QRCode as QRCodeModel } from '../../models';
import type { Qrcode } from '../../types/qrcode';
import AdminHeader from '../../components/AdminHeader';
import { useAtomValue } from 'jotai';
import { selectedGymIdAtom } from '../../store/gym';

const QRCodeManagement = () => {
  const selectedGymId = useAtomValue(selectedGymIdAtom);
  const [qrcodes, setQrcodes] = useState<Qrcode[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterActive, setFilterActive] = useState<number | null>(null);

  useEffect(() => {
    if (selectedGymId) {
      loadQRCodes();
    }
  }, [selectedGymId]);

  const loadQRCodes = async () => {
    try {
      setLoading(true);
      const data = await QRCodeModel.findall({});
      setQrcodes(data);
    } catch (error) {
      console.error('Failed to load QR codes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (qrcode: Qrcode) => {
    try {
      const newStatus = qrcode.isactive === QRCodeModel.isactive.ACTIVE
        ? QRCodeModel.isactive.INACTIVE
        : QRCodeModel.isactive.ACTIVE;
      await QRCodeModel.patch(qrcode.id, { isactive: newStatus });
      await loadQRCodes();
    } catch (error) {
      console.error('Failed to toggle QR code status:', error);
      alert('상태 변경에 실패했습니다.');
    }
  };

  const filteredQRCodes = qrcodes.filter((qr) => {
    if (filterActive !== null && qr.isactive !== filterActive) return false;
    return true;
  });

  const stats = {
    total: qrcodes.length,
    active: qrcodes.filter((q) => q.isactive === QRCodeModel.isactive.ACTIVE).length,
    inactive: qrcodes.filter((q) => q.isactive === QRCodeModel.isactive.INACTIVE).length,
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.background.secondary }}>
      <AdminHeader title="QR코드 관리" />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: theme.spacing[8] }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: theme.spacing[4], marginBottom: theme.spacing[6] }}>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>전체</div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.brand.primary }}>{stats.total}</div>
          </Card>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>활성</div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.semantic.success }}>{stats.active}</div>
          </Card>
          <Card>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, marginBottom: theme.spacing[1] }}>비활성</div>
            <div style={{ fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.text.tertiary }}>{stats.inactive}</div>
          </Card>
        </div>

        {/* Filters */}
        <Card style={{ marginBottom: theme.spacing[6] }}>
          <div style={{ display: 'flex', gap: theme.spacing[2] }}>
            <Button variant={filterActive === null ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterActive(null)}>전체</Button>
            <Button variant={filterActive === QRCodeModel.isactive.ACTIVE ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterActive(QRCodeModel.isactive.ACTIVE)}>활성</Button>
            <Button variant={filterActive === QRCodeModel.isactive.INACTIVE ? 'primary' : 'secondary'} size="sm" onClick={() => setFilterActive(QRCodeModel.isactive.INACTIVE)}>비활성</Button>
          </div>
        </Card>

        {/* QR Code List */}
        {loading ? (
          <Card><div style={{ textAlign: 'center', padding: theme.spacing[8] }}>불러오는 중...</div></Card>
        ) : filteredQRCodes.length === 0 ? (
          <Card><div style={{ textAlign: 'center', padding: theme.spacing[8] }}>QR코드가 없습니다.</div></Card>
        ) : (
          <Card>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${theme.colors.border.light}` }}>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, fontWeight: theme.typography.fontWeight.medium }}>ID</th>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, fontWeight: theme.typography.fontWeight.medium }}>회원</th>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, fontWeight: theme.typography.fontWeight.medium }}>코드</th>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, fontWeight: theme.typography.fontWeight.medium }}>상태</th>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, fontWeight: theme.typography.fontWeight.medium }}>사용횟수</th>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, fontWeight: theme.typography.fontWeight.medium }}>만료일</th>
                    <th style={{ padding: theme.spacing[3], textAlign: 'left', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, fontWeight: theme.typography.fontWeight.medium }}>최종사용</th>
                    <th style={{ padding: theme.spacing[3], textAlign: 'center', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary, fontWeight: theme.typography.fontWeight.medium }}>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQRCodes.map((qr) => (
                    <tr key={qr.id} style={{ borderBottom: `1px solid ${theme.colors.border.light}` }}>
                      <td style={{ padding: theme.spacing[3], fontSize: theme.typography.fontSize.sm }}>{qr.id}</td>
                      <td style={{ padding: theme.spacing[3], fontSize: theme.typography.fontSize.sm }}>{qr.extra?.user?.name || `#${qr.user}`}</td>
                      <td style={{ padding: theme.spacing[3], fontSize: theme.typography.fontSize.sm, fontFamily: 'monospace' }}>{qr.code ? qr.code.substring(0, 12) + '...' : '-'}</td>
                      <td style={{ padding: theme.spacing[3] }}>
                        <Badge variant={qr.isactive === QRCodeModel.isactive.ACTIVE ? 'success' : 'default'}>
                          {QRCodeModel.getIsactive(qr.isactive)}
                        </Badge>
                      </td>
                      <td style={{ padding: theme.spacing[3], fontSize: theme.typography.fontSize.sm }}>{qr.usecount}</td>
                      <td style={{ padding: theme.spacing[3], fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>{qr.expiredate ? qr.expiredate.split('T')[0] : '-'}</td>
                      <td style={{ padding: theme.spacing[3], fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>{qr.lastuseddate ? qr.lastuseddate.split('T')[0] : '-'}</td>
                      <td style={{ padding: theme.spacing[3], textAlign: 'center' }}>
                        <Button
                          variant={qr.isactive === QRCodeModel.isactive.ACTIVE ? 'danger' : 'primary'}
                          size="sm"
                          onClick={() => handleToggleActive(qr)}
                        >
                          {qr.isactive === QRCodeModel.isactive.ACTIVE ? '비활성화' : '활성화'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QRCodeManagement;
