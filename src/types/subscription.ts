// P1 정기 구독결제 + P3 스케줄 + P4 리포트 타입 (백엔드 손코드 라우트와 짝)
// 백엔드: back/router/{billing,schedule,report}.go

export interface Subscription {
  id: number;
  user: number;
  gym: number;
  health: number;
  usehealth: number;
  billingkey: number;
  cost: number;
  status: number; // 1:active 2:paused 3:cancelled 4:failed
  nextbillingdate: string;
  failcount: number;
  date: string;
}

export interface TrainerSchedule {
  id: number;
  trainer: number;
  gym: number;
  dayofweek: number; // 0:일 ~ 6:토
  starttime: string; // HH:MM
  endtime: string;
  breakstart: string; // 없으면 ''
  breakend: string;
  date: string;
}

export interface AvailableSlot {
  start: string; // HH:MM
  end: string;
}

export interface ReportSummary {
  monthly: { month: string; revenue: number; count: number }[];
  bymethod: { method: number; revenue: number; count: number }[];
  newmembers: number;
  expired: number;
  renewed: number;
  renewrate: number;
  tophealth: { health: number; name: string; count: number }[];
  attendance: { dow: number; hour: number; count: number }[];
}
