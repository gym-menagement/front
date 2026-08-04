import { get, post, del } from '../services/api';
import type { ApiResponse } from '../types/user';
import type { TrainerSchedule, AvailableSlot } from '../types/subscription';

export default class TrainerScheduleModel {
  static readonly days = ['일', '월', '화', '수', '목', '금', '토'];

  /** 트레이너의 주간 근무 스케줄 */
  static async findByTrainer(trainerId: number) {
    const res = await get<ApiResponse<TrainerSchedule>>('/trainerschedule', {
      params: { trainer: trainerId },
    });
    return res.data.content || [];
  }

  static async insert(item: Partial<TrainerSchedule>) {
    const res = await post<{ code: string; id: number }>('/trainerschedule', item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<{ code: string }>(`/trainerschedule/${id}`);
    return res.data;
  }

  /** 특정 날짜의 예약 가능 슬롯 (근무시간 ∩ 휴게·기존예약 제외) */
  static async availableSlots(trainerId: number, date: string) {
    const res = await get<ApiResponse<AvailableSlot>>('/ptreservation/available', {
      params: { trainer: trainerId, date },
    });
    return res.data.content || [];
  }
}
