import { get, post, put, patch, del } from '../services/api';
import type {
  Notificationsetting,
  ApiResponse,
  ApiSingleResponse,
  NotificationsettingSearchParams,
} from '../types/notificationsetting';

export default class NotificationsettingModel {
  // Enabled constants (from backend: enums/enabled/Enums.kt)
  static readonly enabled = {
    ENABLED: 1,
    DISABLED: 2,
  };
  static readonly enableds = [
    '',
    '활성화',
    '비활성화',
  ];

  static getEnabled(value: number): string {
    return this.enableds[value] || String(value);
  }

  // Membershipexpiry constants (from backend: enums/membershipexpiry/Enums.kt)
  static readonly membershipexpiry = {
    ENABLED: 1,
    DISABLED: 2,
  };
  static readonly membershipexpirys = [
    '',
    '활성화',
    '비활성화',
  ];

  static getMembershipexpiry(value: number): string {
    return this.membershipexpirys[value] || String(value);
  }

  // Membershipnear constants (from backend: enums/membershipnear/Enums.kt)
  static readonly membershipnear = {
    ENABLED: 1,
    DISABLED: 2,
  };
  static readonly membershipnears = [
    '',
    '활성화',
    '비활성화',
  ];

  static getMembershipnear(value: number): string {
    return this.membershipnears[value] || String(value);
  }

  // Attendanceenc constants (from backend: enums/attendanceenc/Enums.kt)
  static readonly attendanceenc = {
    ENABLED: 1,
    DISABLED: 2,
  };
  static readonly attendanceencs = [
    '',
    '활성화',
    '비활성화',
  ];

  static getAttendanceenc(value: number): string {
    return this.attendanceencs[value] || String(value);
  }

  // Gymannounce constants (from backend: enums/gymannounce/Enums.kt)
  static readonly gymannounce = {
    ENABLED: 1,
    DISABLED: 2,
  };
  static readonly gymannounces = [
    '',
    '활성화',
    '비활성화',
  ];

  static getGymannounce(value: number): string {
    return this.gymannounces[value] || String(value);
  }

  // Systemnotice constants (from backend: enums/systemnotice/Enums.kt)
  static readonly systemnotice = {
    ENABLED: 1,
    DISABLED: 2,
  };
  static readonly systemnotices = [
    '',
    '활성화',
    '비활성화',
  ];

  static getSystemnotice(value: number): string {
    return this.systemnotices[value] || String(value);
  }

  // Paymentconfirm constants (from backend: enums/paymentconfirm/Enums.kt)
  static readonly paymentconfirm = {
    ENABLED: 1,
    DISABLED: 2,
  };
  static readonly paymentconfirms = [
    '',
    '활성화',
    '비활성화',
  ];

  static getPaymentconfirm(value: number): string {
    return this.paymentconfirms[value] || String(value);
  }

  // Pauseexpiry constants (from backend: enums/pauseexpiry/Enums.kt)
  static readonly pauseexpiry = {
    ENABLED: 1,
    DISABLED: 2,
  };
  static readonly pauseexpirys = [
    '',
    '활성화',
    '비활성화',
  ];

  static getPauseexpiry(value: number): string {
    return this.pauseexpirys[value] || String(value);
  }

  // Weeklygoal constants (from backend: enums/weeklygoal/Enums.kt)
  static readonly weeklygoal = {
    ENABLED: 1,
    DISABLED: 2,
  };
  static readonly weeklygoals = [
    '',
    '활성화',
    '비활성화',
  ];

  static getWeeklygoal(value: number): string {
    return this.weeklygoals[value] || String(value);
  }

  // Personalrecord constants (from backend: enums/personalrecord/Enums.kt)
  static readonly personalrecord = {
    ENABLED: 1,
    DISABLED: 2,
  };
  static readonly personalrecords = [
    '',
    '활성화',
    '비활성화',
  ];

  static getPersonalrecord(value: number): string {
    return this.personalrecords[value] || String(value);
  }

  // Quietenabled constants (from backend: enums/quietenabled/Enums.kt)
  static readonly quietenabled = {
    ENABLED: 1,
    DISABLED: 2,
  };
  static readonly quietenableds = [
    '',
    '활성화',
    '비활성화',
  ];

  static getQuietenabled(value: number): string {
    return this.quietenableds[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Notificationsetting>) {
    const res = await post<Notificationsetting>('/notificationsetting', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Notificationsetting>[]) {
    const res = await post<Notificationsetting[]>('/notificationsetting/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Notificationsetting>) {
    const res = await put<Notificationsetting>(`/notificationsetting/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Notificationsetting>) {
    const res = await patch<Notificationsetting>(`/notificationsetting/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/notificationsetting/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/notificationsetting/batch', { data: ids });
    return res.data;
  }

  static async find(params?: NotificationsettingSearchParams) {
    const res = await get<ApiResponse<Notificationsetting>>('/notificationsetting', { params });
    return res.data.content || [];
  }

  static async findall(params?: NotificationsettingSearchParams) {
    params!.page = 0;
    params!.pagesize = 9999;
    const res = await get<ApiResponse<Notificationsetting>>('/notificationsetting', { params });
    return res.data.content || [];
  }

  static async findpage(params?: NotificationsettingSearchParams) {
    const res = await get<ApiResponse<Notificationsetting>>('/notificationsetting', { params });
    return res.data
  }

  static async count(params?: NotificationsettingSearchParams) {
    const res = await get<{ count: number }>('/notificationsetting/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Notificationsetting>>(`/notificationsetting/${id}`);
    return res.data;
  }
}
