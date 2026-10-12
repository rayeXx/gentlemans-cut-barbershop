"use client";

import React, { useState, useEffect } from "react";
import { 
  Barber, 
  ServiceItem, 
  Booking, 
  MemberSubscription, 
  ToastMessage, 
  BookingStatus,
  AuthUser 
} from "@/types/barbershop";
import { 
  INITIAL_BARBERS, 
  INITIAL_SERVICES, 
  INITIAL_BOOKINGS, 
  INITIAL_SUBSCRIPTIONS 
} from "@/lib/mockData";
import { LandingPage } from "@/components/landing/LandingPage";
import { LoginPage } from "@/components/auth/LoginPage";
import { Navbar } from "@/components/Navbar";
import { MobileBottomNav } from "@/components/mobile/MobileBottomNav";
import { ToastContainer } from "@/components/ui/Toast";
import { BookingWizard } from "@/components/customer/BookingWizard";
import { ServiceCatalog } from "@/components/customer/ServiceCatalog";
import { MembershipSection } from "@/components/customer/MembershipSection";
import { BookingSuccessModal } from "@/components/customer/BookingSuccessModal";
import { CheckBookingModal } from "@/components/customer/CheckBookingModal";
import { AdminLoginModal } from "@/components/admin/AdminLoginModal";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AppointmentTable } from "@/components/admin/AppointmentTable";
import { ServiceManagementModal } from "@/components/admin/ServiceManagementModal";
import { MembershipManagementView } from "@/components/admin/MembershipManagementView";
import { QuickWalkInModal } from "@/components/admin/QuickWalkInModal";
import { 
  Scissors, 
  LayoutDashboard, 
  ListOrdered, 
  Layers, 
  Users, 
  Star, 
  Clock 
} from "lucide-react";

export default function BarbershopApp() {
  // Theme state: defaults to light (cerah modern barbershop)
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const isDark = theme === "dark";

  // App Navigation Flow: 'landing' | 'login' | 'app'
  const [currentView, setCurrentView] = useState<"landing" | "login" | "app">("landing");

  // User Authentication State
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  // Role state: 'customer' | 'admin'
  const [currentRole, setCurrentRole] = useState<"customer" | "admin">("customer");
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // Customer Navigation Tab
  const [activeCustomerTab, setActiveCustomerTab] = useState<"booking" | "services" | "membership">("booking");
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);

  // Admin Navigation Tab
  const [activeAdminTab, setActiveAdminTab] = useState<"overview" | "queue" | "services" | "members">("overview");

  // Local Storage Mock Database State
  const [barbers, setBarbers] = useState<Barber[]>(INITIAL_BARBERS);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [subscriptions, setSubscriptions] = useState<MemberSubscription[]>(INITIAL_SUBSCRIPTIONS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Modals state
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [isCheckBookingModalOpen, setIsCheckBookingModalOpen] = useState(false);
  const [isQuickWalkInModalOpen, setIsQuickWalkInModalOpen] = useState(false);

  // Toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast Helper
  const addToast = (title: string, message: string, type: ToastMessage["type"] = "success") => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedBarbers = localStorage.getItem("gentleman_barbers");
      if (savedBarbers) setBarbers(JSON.parse(savedBarbers));

      const savedServices = localStorage.getItem("gentleman_services");
      if (savedServices) setServices(JSON.parse(savedServices));

      const savedBookings = localStorage.getItem("gentleman_bookings");
      if (savedBookings) setBookings(JSON.parse(savedBookings));

      const savedSubs = localStorage.getItem("gentleman_subscriptions");
      if (savedSubs) setSubscriptions(JSON.parse(savedSubs));

      const savedTheme = localStorage.getItem("gentleman_theme");
      if (savedTheme === "dark" || savedTheme === "light") setTheme(savedTheme);

      const savedUser = localStorage.getItem("gentleman_auth_user");
      if (savedUser) {
        const parsedUser: AuthUser = JSON.parse(savedUser);
        setAuthUser(parsedUser);
        setCurrentRole(parsedUser.role);
        setCurrentView("app");
      }
    } catch (e) {
      console.error("Failed to load local database", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("gentleman_barbers", JSON.stringify(barbers));
      localStorage.setItem("gentleman_services", JSON.stringify(services));
      localStorage.setItem("gentleman_bookings", JSON.stringify(bookings));
      localStorage.setItem("gentleman_subscriptions", JSON.stringify(subscriptions));
      localStorage.setItem("gentleman_theme", theme);
      if (authUser) {
        localStorage.setItem("gentleman_auth_user", JSON.stringify(authUser));
      } else {
        localStorage.removeItem("gentleman_auth_user");
      }
    } catch (e) {
      console.error("Failed to persist local database", e);
    }
  }, [barbers, services, bookings, subscriptions, theme, authUser, isLoaded]);

  // Handle Login Success (Otomatis Role Detection)
  const handleLoginSuccess = (user: AuthUser) => {
    setAuthUser(user);
    setCurrentRole(user.role);
    setCurrentView("app");
    if (user.role === "admin") {
      setActiveAdminTab("overview");
      addToast(
        "Selamat Datang, Admin! 👑",
        `Masuk sebagai Kasir POS (${user.email})`,
        "success"
      );
    } else {
      setActiveCustomerTab("booking");
      addToast(
        "Login Berhasil! ✂️",
        `Halo ${user.name}, selamat datang di Gentleman's Cut`,
        "success"
      );
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setAuthUser(null);
    setCurrentRole("customer");
    setCurrentView("landing");
    addToast("Logout Berhasil", "Anda telah keluar dari akun", "info");
  };

  // Handle Role Switch
  const handleRoleToggle = (targetRole: "customer" | "admin") => {
    if (targetRole === "admin") {
      if (authUser?.role === "admin") {
        setCurrentRole("admin");
      } else {
        setIsAdminLoginModalOpen(true);
      }
    } else {
      setCurrentRole("customer");
    }
  };

  const handleAdminModalLoginSuccess = () => {
    const adminUser: AuthUser = {
      id: "usr-admin-quick",
      name: "Admin Kasir Barbershop",
      email: "admin@gentlemanscut.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      role: "admin",
      provider: "password",
    };
    setAuthUser(adminUser);
    setCurrentRole("admin");
    setIsAdminLoginModalOpen(false);
    setCurrentView("app");
    addToast("Login Admin Berhasil", "Akses Kasir POS Terbuka", "success");
  };

  // Booking handlers
  const handleAddBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);

    // If payment method is membership_quota, automatically decrement quota for that member
    if (newBooking.paymentMethod === "membership_quota") {
      setSubscriptions((prev) =>
        prev.map((sub) => {
          if (
            sub.status === "active" &&
            sub.customerPhone.replace(/\D/g, "") === newBooking.customerPhone.replace(/\D/g, "") &&
            typeof sub.quotaRemaining === "number" &&
            sub.quotaRemaining > 0
          ) {
            return {
              ...sub,
              quotaRemaining: sub.quotaRemaining - 1,
            };
          }
          return sub;
        })
      );
    }

    addToast(
      "Reservasi Dikonfirmasi!",
      `Kode Booking: ${newBooking.bookingCode} atas nama ${newBooking.customerName}`,
      "success"
    );
  };

  const handleUpdateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
    addToast("Status Diperbarui", `Sesi booking telah diubah menjadi ${status}`, "info");
  };

  const handleDeleteBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    addToast("Booking Dihapus", "Data reservasi berhasil dihapus dari sistem", "warning");
  };

  // Service CRUD handlers
  const handleAddService = (newService: ServiceItem) => {
    setServices((prev) => [...prev, newService]);
    addToast("Layanan Ditambahkan", `${newService.name} berhasil masuk katalog`, "success");
  };

  const handleUpdateService = (updated: ServiceItem) => {
    setServices((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
    addToast("Layanan Diperbarui", `${updated.name} telah disimpan`, "success");
  };

  const handleDeleteService = (serviceId: string) => {
    setServices((prev) => prev.filter((s) => s.id !== serviceId));
    addToast("Layanan Dihapus", "Layanan telah dihapus dari katalog", "warning");
  };

  // Subscription handlers
  const handleAddSubscription = (sub: MemberSubscription) => {
    setSubscriptions((prev) => [sub, ...prev]);
    addToast(
      "Membership Diaktifkan! 👑",
      `${sub.customerName} resmi menjadi member ${sub.planName}`,
      "success"
    );
  };

  const handleUpdateSubscriptionQuota = (id: string, newQuota: number | "unlimited") => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, quotaRemaining: newQuota } : s))
    );
    addToast("Kuota Diperbarui", "Sisa kuota member berhasil diubah", "info");
  };

  const handleDeleteSubscription = (id: string) => {
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
    addToast("Member Dihapus", "Data membership berhasil dihapus", "warning");
  };

  // Switch to Booking tab from Service Catalog
  const handleSelectServiceForBooking = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setActiveCustomerTab("booking");
  };

  // ========================================================
  // VIEW 1: LANDING PAGE
  // ========================================================
  if (currentView === "landing") {
    return (
      <>
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
        <LandingPage
          onGoToLogin={() => setCurrentView("login")}
          onExploreAsGuest={() => {
            setCurrentRole("customer");
            setCurrentView("app");
          }}
          services={services}
          barbers={barbers}
          isDark={isDark}
          onThemeToggle={() => setTheme(isDark ? "light" : "dark")}
        />
      </>
    );
  }

  // ========================================================
  // VIEW 2: LOGIN PAGE (GOOGLE & EMAIL/PASS WITH AUTO ROLE)
  // ========================================================
  if (currentView === "login") {
    return (
      <>
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onBackToLanding={() => setCurrentView("landing")}
          isDark={isDark}
        />
      </>
    );
  }

  // ========================================================
  // VIEW 3: MAIN APP (CUSTOMER & ADMIN POS VIEWS)
  // ========================================================
  return (
    <div
      className={`min-h-screen flex flex-col pb-16 md:pb-0 transition-colors duration-200 font-sans selection:bg-amber-500 selection:text-slate-950 ${
        isDark
          ? "bg-slate-950 text-slate-100"
          : "bg-stone-50 text-stone-900"
      }`}
    >
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Main Responsive Navbar */}
      <Navbar
        authUser={authUser}
        currentRole={currentRole}
        isAdminLoggedIn={authUser?.role === "admin"}
        onRoleToggle={handleRoleToggle}
        onLogout={handleLogout}
        onGoToLanding={() => setCurrentView("landing")}
        onGoToLogin={() => setCurrentView("login")}
        theme={theme}
        onThemeToggle={() => setTheme(isDark ? "light" : "dark")}
        onOpenCheckBooking={() => setIsCheckBookingModalOpen(true)}
        activeCustomerTab={activeCustomerTab}
        setActiveCustomerTab={setActiveCustomerTab}
      />

      {/* Hero Brand Banner for Customer View */}
      {currentRole === "customer" && activeCustomerTab === "booking" && (
        <div
          className={`border-b py-8 sm:py-10 px-4 sm:px-6 relative overflow-hidden transition ${
            isDark
              ? "bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border-slate-800/80"
              : "bg-gradient-to-r from-amber-100/90 via-amber-50 to-stone-100 border-amber-200/80"
          }`}
        >
          {/* Subtle Accent Glows */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <span className="text-[11px] font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400 font-mono flex items-center gap-1.5">
                <Scissors className="w-4 h-4" />
                THE GENTLEMAN&apos;S CUT • JAKARTA
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight">
                Penampilan Sempurna, <br className="hidden sm:inline" />
                Dimulai dari Kursi Kami.
              </h1>
              <p className={`text-xs sm:text-sm max-w-xl ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                Reservasi jadwal potong rambut, cukur jenggot royal hot shave, dan treatment kepala tanpa antre. Nikmati kenyamanan lounge dan kopi premium gratis.
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex flex-row md:flex-col gap-2.5 shrink-0">
              <div
                className={`p-3 rounded-2xl border flex items-center gap-2.5 backdrop-blur-sm ${
                  isDark ? "bg-slate-900/80 border-slate-800" : "bg-white/90 border-amber-200 shadow-sm"
                }`}
              >
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <span className="font-bold text-xs sm:text-sm block">4.9 / 5.0 Rating</span>
                  <span className="text-[10px] opacity-70">500+ Pelanggan Puas</span>
                </div>
              </div>

              <div
                className={`p-3 rounded-2xl border flex items-center gap-2.5 backdrop-blur-sm ${
                  isDark ? "bg-slate-900/80 border-slate-800" : "bg-white/90 border-amber-200 shadow-sm"
                }`}
              >
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-xs sm:text-sm block">Buka Setiap Hari</span>
                  <span className="text-[10px] opacity-70">09:00 - 21:00 WIB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Header Tabs for Admin View */}
      {currentRole === "admin" && (
        <div
          className={`border-b px-4 sm:px-6 lg:px-8 py-3 sticky top-20 z-30 backdrop-blur-md ${
            isDark ? "bg-slate-950/90 border-slate-800" : "bg-white/90 border-amber-200"
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setActiveAdminTab("overview")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeAdminTab === "overview"
                    ? isDark
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "bg-amber-600 text-white shadow"
                    : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Ringkasan &amp; Metrik</span>
              </button>

              <button
                onClick={() => setActiveAdminTab("queue")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeAdminTab === "queue"
                    ? isDark
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "bg-amber-600 text-white shadow"
                    : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span>Antrean &amp; Kasir (POS)</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-400">
                  {bookings.filter((b) => b.status === "scheduled" || b.status === "in_chair").length}
                </span>
              </button>

              <button
                onClick={() => setActiveAdminTab("services")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeAdminTab === "services"
                    ? isDark
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "bg-amber-600 text-white shadow"
                    : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Kelola Layanan (CRUD)</span>
              </button>

              <button
                onClick={() => setActiveAdminTab("members")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeAdminTab === "members"
                    ? isDark
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "bg-amber-600 text-white shadow"
                    : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Anggota Membership</span>
              </button>
            </div>

            <span className="hidden md:inline-flex text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
              ● POS Active (Kasir Utama)
            </span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* ======================================================== */}
        {/* CUSTOMER VIEWS                                          */}
        {/* ======================================================== */}
        {currentRole === "customer" && (
          <div className="space-y-12">
            {activeCustomerTab === "booking" && (
              <BookingWizard
                barbers={barbers}
                services={services}
                bookings={bookings}
                subscriptions={subscriptions}
                onAddBooking={handleAddBooking}
                onBookingSuccess={(booking) => setConfirmedBooking(booking)}
                isDark={isDark}
                preselectedServiceId={preselectedServiceId}
              />
            )}

            {activeCustomerTab === "services" && (
              <ServiceCatalog
                services={services}
                barbers={barbers}
                onSelectServiceForBooking={handleSelectServiceForBooking}
                isDark={isDark}
              />
            )}

            {activeCustomerTab === "membership" && (
              <MembershipSection
                subscriptions={subscriptions}
                onAddSubscription={handleAddSubscription}
                isDark={isDark}
              />
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* ADMIN / KASIR VIEWS                                      */}
        {/* ======================================================== */}
        {currentRole === "admin" && (
          <div className="space-y-8">
            {activeAdminTab === "overview" && (
              <AdminDashboard
                bookings={bookings}
                barbers={barbers}
                subscriptions={subscriptions}
                onOpenQuickWalkIn={() => setIsQuickWalkInModalOpen(true)}
                onUpdateStatus={handleUpdateBookingStatus}
                isDark={isDark}
              />
            )}

            {activeAdminTab === "queue" && (
              <AppointmentTable
                bookings={bookings}
                barbers={barbers}
                onUpdateStatus={handleUpdateBookingStatus}
                onDeleteBooking={handleDeleteBooking}
                isDark={isDark}
              />
            )}

            {activeAdminTab === "services" && (
              <ServiceManagementModal
                services={services}
                onAddService={handleAddService}
                onUpdateService={handleUpdateService}
                onDeleteService={handleDeleteService}
                isDark={isDark}
              />
            )}

            {activeAdminTab === "members" && (
              <MembershipManagementView
                subscriptions={subscriptions}
                onAddSubscription={handleAddSubscription}
                onUpdateSubscriptionQuota={handleUpdateSubscriptionQuota}
                onDeleteSubscription={handleDeleteSubscription}
                isDark={isDark}
              />
            )}
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (Phone App Shell) */}
      <MobileBottomNav
        currentRole={currentRole}
        activeCustomerTab={activeCustomerTab}
        setActiveCustomerTab={setActiveCustomerTab}
        activeAdminTab={activeAdminTab}
        setActiveAdminTab={setActiveAdminTab}
        onOpenCheckBooking={() => setIsCheckBookingModalOpen(true)}
        onGoToLanding={() => setCurrentView("landing")}
        onLogout={handleLogout}
        isDark={isDark}
      />

      {/* Modals */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={handleAdminModalLoginSuccess}
        isDark={isDark}
      />

      <BookingSuccessModal
        booking={confirmedBooking}
        onClose={() => setConfirmedBooking(null)}
        isDark={isDark}
      />

      <CheckBookingModal
        isOpen={isCheckBookingModalOpen}
        onClose={() => setIsCheckBookingModalOpen(false)}
        bookings={bookings}
        isDark={isDark}
        onOpenTicket={(b) => setConfirmedBooking(b)}
      />

      <QuickWalkInModal
        isOpen={isQuickWalkInModalOpen}
        onClose={() => setIsQuickWalkInModalOpen(false)}
        barbers={barbers}
        services={services}
        onAddBooking={handleAddBooking}
        isDark={isDark}
      />

      {/* Footer */}
      <footer
        className={`border-t py-8 px-4 sm:px-6 lg:px-8 text-xs transition hidden md:block ${
          isDark
            ? "bg-slate-950/80 border-slate-900 text-slate-500"
            : "bg-white border-amber-200 text-stone-500"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-300 dark:text-slate-300 font-serif">
                The Gentleman&apos;s Cut Barbershop
              </p>
              <p className="text-[11px] opacity-70">
                Senopati Branch &amp; Pondok Indah Branch • Jakarta
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <span
              onClick={() => setCurrentView("landing")}
              className="cursor-pointer hover:text-amber-500 transition"
            >
              Beranda
            </span>
            <span>•</span>
            <span
              onClick={() => {
                setCurrentRole("customer");
                setActiveCustomerTab("booking");
              }}
              className="cursor-pointer hover:text-amber-500 transition"
            >
              Booking Online
            </span>
            <span>•</span>
            <span
              onClick={() => {
                setCurrentRole("customer");
                setActiveCustomerTab("services");
              }}
              className="cursor-pointer hover:text-amber-500 transition"
            >
              Katalog Layanan
            </span>
            <span>•</span>
            <span
              onClick={() => {
                setCurrentRole("customer");
                setActiveCustomerTab("membership");
              }}
              className="cursor-pointer hover:text-amber-500 transition"
            >
              Grooming Pass VIP
            </span>
            <span>•</span>
            <span
              onClick={() => handleRoleToggle("admin")}
              className="cursor-pointer hover:text-amber-500 transition font-mono font-bold"
            >
              Akses Admin Kasir (POS)
            </span>
          </div>

          <p className="font-mono text-[11px]">
            © 2026 The Gentleman&apos;s Cut. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
