export type BookingStatus = "scheduled" | "in_chair" | "completed" | "cancelled" | "no_show";

export type PaymentMethod = "cash" | "qris" | "membership_quota";

export interface Barber {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  avatar: string;
  status: "available" | "busy" | "off";
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  category: "haircut" | "shave" | "treatment" | "package" | "addon";
  iconName?: string;
  popular?: boolean;
}

export interface MembershipPlan {
  id: string;
  name: string;
  priceMonthly: number;
  haircutQuota: number | "unlimited";
  description: string;
  features: string[];
  badgeColor: string;
  popular?: boolean;
}

export interface MemberSubscription {
  id: string;
  customerName: string;
  customerPhone: string;
  planId: string;
  planName: string;
  quotaRemaining: number | "unlimited";
  quotaTotal: number | "unlimited";
  startDate: string;
  expiryDate: string;
  status: "active" | "expired";
}

export interface Booking {
  id: string;
  bookingCode: string;
  customerName: string;
  customerPhone: string;
  customerNotes?: string;
  branch: string;
  barberId: string;
  barberName: string;
  serviceId: string;
  serviceName: string;
  addonIds: string[];
  addonNames: string[];
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:mm
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: "paid" | "unpaid";
  status: BookingStatus;
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}
