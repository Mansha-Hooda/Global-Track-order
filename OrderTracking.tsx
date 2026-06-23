"use client";

import React, { useState } from "react";

// ---------------------------------------------------------------------------
// Design tokens (from Figma)
// ---------------------------------------------------------------------------
const colors = {
  // Base
  white: "#ffffff",
  // Gray scale
  gray50: "#ebeef1",
  gray100: "#dbe0e6",
  gray200: "#c2ccd6",
  gray500: "#6b7a8d",
  gray700: "#47566a",
  gray900: "#252d38",
  textPrimary: "#2e3742",
  // Brand
  brand25: "#f1f7ff",
  brand200: "#9acbff",
  brand600: "#0066dc",
  // Warning / Status
  warning50: "#fff5ed",
  warningText: "#ab5200",
  // Pattern
  patternFill: "rgba(214,232,255,0.2)",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type OrderStatus = "Order Placed" | "Order in Progress" | "Dispatched" | "Delivered";

type MedicineItem = {
  qty: number;
  name: string;
};

type Order = {
  id: string;
  patient: string;
  status: OrderStatus;
  orderedOn?: string;
  eta: string;
  store: string;
  location: string;
  items: MedicineItem[];
  moreCount?: number;
  category: string;
};

type FilterTab = {
  id: string;
  label: string;
};

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------
const FILTERS: FilterTab[] = [
  { id: "all", label: "All" },
  { id: "medicine", label: "Medicine" },
  { id: "labs", label: "Labs" },
  { id: "in-clinic", label: "In-clinic Consults" },
  { id: "vision", label: "Vision" },
];

const ORDERS: Order[] = [
  {
    id: "#24562",
    patient: "Mr. Jyotishman Mishra",
    status: "Order Placed",
    eta: "ETA to be Updated",
    store: "Store",
    location: "Apollo Pharmacy, HSR Layout, Bangalore",
    items: [
      { qty: 2, name: "Gemcal XT Tablet" },
      { qty: 2, name: "Paracetamol 650 mg" },
    ],
    moreCount: 2,
    category: "medicine",
  },
  {
    id: "#24563",
    patient: "Mr. Jyotishman Mishra",
    status: "Order in Progress",
    orderedOn: "28-May-2024",
    eta: "30-May-2024 · 10:15 AM",
    store: "Store",
    location: "Apollo Pharmacy, HSR Layout, Bangalore",
    items: [
      { qty: 2, name: "Gemcal XT Tablet" },
      { qty: 2, name: "Paracetamol 650 mg" },
    ],
    moreCount: 2,
    category: "medicine",
  },
  {
    id: "#24564",
    patient: "Ms. Priya Sharma",
    status: "Dispatched",
    orderedOn: "20-May-2024",
    eta: "22-May-2024 · 02:00 PM",
    store: "Lab",
    location: "Metropolis Labs, Koramangala, Bangalore",
    items: [
      { qty: 1, name: "CBC Blood Test" },
      { qty: 1, name: "Lipid Profile" },
    ],
    moreCount: 1,
    category: "labs",
  },
  {
    id: "#24565",
    patient: "Mr. Rahul Verma",
    status: "Delivered",
    orderedOn: "15-May-2024",
    eta: "17-May-2024 · 11:00 AM",
    store: "Clinic",
    location: "MediCare Clinic, Indiranagar, Bangalore",
    items: [
      { qty: 1, name: "General Consultation" },
    ],
    category: "in-clinic",
  },
  {
    id: "#24566",
    patient: "Ms. Anjali Rao",
    status: "Order in Progress",
    orderedOn: "22-May-2024",
    eta: "24-May-2024 · 09:30 AM",
    store: "Store",
    location: "Vision Express, MG Road, Bangalore",
    items: [
      { qty: 1, name: "Progressive Lenses" },
      { qty: 1, name: "Anti-glare Coating" },
    ],
    category: "vision",
  },
];

// ---------------------------------------------------------------------------
// Status badge color mapping
// ---------------------------------------------------------------------------
function getStatusStyle(status: OrderStatus) {
  switch (status) {
    case "Delivered":
      return { bg: "#f0fdf4", text: "#166534", border: "#bbf7d0" };
    case "Dispatched":
      return { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" };
    default:
      return { bg: "#fff5ed", text: "#ab5200", border: "#fed7aa" };
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatusBar() {
  return (
    <div
      className="flex items-center justify-between bg-white shrink-0"
      style={{ height: 28, paddingLeft: 20, paddingRight: 20, paddingTop: 6 }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: colors.gray900,
          fontFamily: "'Lexend Deca', sans-serif",
          lineHeight: 1,
        }}
      >
        11:27 PM
      </span>
      <div className="flex items-center gap-1.5">
        {/* Signal */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="6" width="3" height="6" rx="1" fill={colors.gray900} />
          <rect x="4.5" y="4" width="3" height="8" rx="1" fill={colors.gray900} />
          <rect x="9" y="2" width="3" height="10" rx="1" fill={colors.gray900} />
          <rect x="13.5" y="0" width="3" height="12" rx="1" fill={colors.gray900} />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill={colors.gray900} />
          <path d="M5.17 7.17a4 4 0 0 1 5.66 0" stroke={colors.gray900} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M2.34 4.34a8 8 0 0 1 11.32 0" stroke={colors.gray900} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke={colors.gray900} strokeOpacity="0.35" />
          <rect x="2" y="2" width="17" height="8" rx="1.5" fill={colors.gray900} />
          <path d="M23 4v4a2 2 0 0 0 0-4z" fill={colors.gray900} fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div
      className="flex items-center gap-2 bg-white shrink-0"
      style={{
        height: 56,
        paddingLeft: 16,
        paddingRight: 16,
        boxShadow: "0px 1px 4px rgba(0,0,0,0.04), 0px 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <button
        aria-label="Go back"
        className="w-6 h-6 flex items-center justify-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
      >
        {/* arrow-left icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 12H5M5 12l7-7M5 12l7 7"
            stroke={colors.textPrimary}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <span
        style={{
          fontSize: 16,
          fontWeight: 500,
          color: colors.textPrimary,
          lineHeight: "24px",
          fontFamily: "'Lexend Deca', sans-serif",
        }}
      >
        My Orders
      </span>
    </div>
  );
}

function PromoBanner() {
  return (
    <div
      className="mx-4 mt-4 overflow-hidden relative shrink-0"
      style={{
        height: 80,
        borderRadius: 12,
        background: "linear-gradient(123.23deg, #feedda 2.47%, #fff7f2 49.78%)",
      }}
    >
      {/* Doctors illustration */}
      <div className="absolute left-0 top-0 h-full" style={{ width: 86 }}>
        <svg width="86" height="80" viewBox="0 0 86 80" fill="none">
          {/* Female doctor */}
          <ellipse cx="30" cy="22" rx="10" ry="10" fill="#F7D6C8" />
          <path d="M22 19 Q24 12 30 11 Q36 12 38 19" fill="#3A2820" />
          <path d="M24 40 Q24 50 30 50 Q36 50 36 40" fill="#F7D6C8" />
          <path d="M18 80 Q20 55 30 52 Q40 55 42 80" fill="#5B6AC1" />
          <circle cx="30" cy="54" r="2.5" fill="none" stroke="#d0d0d0" strokeWidth="1.5" />
          {/* Male doctor */}
          <ellipse cx="58" cy="24" rx="10" ry="10" fill="#F5C5B8" />
          <path d="M50 21 Q52 15 58 14 Q64 15 66 21" fill="#1A1A1A" />
          <path d="M52 42 Q52 52 58 52 Q64 52 64 42" fill="#F5C5B8" />
          <path d="M46 80 Q48 57 58 54 Q68 57 70 80" fill="#A0C4E8" />
          <circle cx="58" cy="56" r="2.5" fill="none" stroke="#d0d0d0" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Text */}
      <div
        className="absolute flex flex-col justify-center gap-1"
        style={{ left: 90, right: 40, top: 0, bottom: 0 }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: colors.textPrimary,
            lineHeight: "18px",
            fontFamily: "'Lexend Deca', sans-serif",
          }}
        >
          Know about Surgery costs,
          <br />
          Coverage, and more
        </p>
      </div>

      {/* Chevron */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M6 3l5 5-5 5"
            stroke="#f27400"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function FilterBar({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: string;
  onFilterChange: (id: string) => void;
}) {
  return (
    <div
      className="flex items-center gap-2 bg-white shrink-0 border-b overflow-x-auto"
      style={{
        height: 64,
        paddingLeft: 16,
        paddingRight: 16,
        borderColor: colors.gray100,
        boxShadow: "0px 1px 2px rgba(0,0,0,0.04), 0px 4px 5px rgba(0,0,0,0.05)",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {FILTERS.map((f) => {
        const active = f.id === activeFilter;
        return (
          <button
            key={f.id}
            onClick={() => onFilterChange(f.id)}
            className="shrink-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            style={{
              height: 32,
              paddingLeft: 12,
              paddingRight: 12,
              borderRadius: 64,
              border: `1px solid ${active ? colors.brand200 : colors.gray50}`,
              background: active ? colors.brand25 : colors.white,
              boxShadow: "0px 1px 0.5px rgba(0,0,0,0.02), 0px 2px 2px rgba(0,0,0,0.04)",
              fontSize: 10,
              fontWeight: active ? 500 : 400,
              color: colors.textPrimary,
              fontFamily: "'Lexend Deca', sans-serif",
              lineHeight: "16px",
              whiteSpace: "nowrap",
            }}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}

function DiagonalPattern({ id }: { id: string }) {
  return (
    <svg
      width="100%"
      height="96"
      viewBox="0 0 328 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width="31"
          height="31"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-45.38)"
        >
          <rect x="5" y="5" width="21" height="21" rx="2" fill={colors.patternFill} />
        </pattern>
      </defs>
      <rect width="328" height="96" fill={`url(#${id})`} />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="1.5" y="3.5" width="9" height="7" rx="1" stroke={colors.gray700} strokeWidth="1.2" />
      <path d="M4.5 3.5V2.5a1.5 1.5 0 0 1 3 0v1" stroke={colors.gray700} strokeWidth="1.2" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M6 1a3.5 3.5 0 0 1 3.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 0 1 6 1z"
        stroke={colors.gray700}
        strokeWidth="1.2"
      />
      <circle cx="6" cy="4.5" r="1" fill={colors.gray700} />
    </svg>
  );
}

function DeliveryIcon({ color = colors.gray700 }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="4.5" width="9" height="7" rx="1" stroke={color} strokeWidth="1.2" />
      <path d="M10 6.5h2l2 3v2h-4v-5z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="3.5" cy="12" r="1.5" fill={color} />
      <circle cx="12.5" cy="12" r="1.5" fill={color} />
    </svg>
  );
}

function MedicineBottleIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="10" y="4" width="12" height="24" rx="3" stroke={colors.gray200} strokeWidth="1.5" />
      <rect x="10" y="11" width="12" height="4" fill={colors.gray100} />
      <path d="M13 7h6" stroke={colors.gray200} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 18h6M16 15v6" stroke={colors.gray200} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function OrderCard({ order, patternId }: { order: Order; patternId: string }) {
  const statusStyle = getStatusStyle(order.status);

  return (
    <div
      className="relative overflow-hidden bg-white"
      style={{
        borderRadius: 12,
        border: `1px solid ${colors.gray100}`,
        boxShadow: "0px 1px 4px rgba(0,0,0,0.04), 0px 4px 10px rgba(0,0,0,0.03)",
        width: "100%",
      }}
    >
      {/* Decorative diagonal pattern — top 96px */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: 96 }}>
        <DiagonalPattern id={patternId} />
      </div>

      {/* Status badge — top-right, flush with card edge */}
      <div className="relative flex justify-end" style={{ width: "100%" }}>
        <div
          style={{
            background: statusStyle.bg,
            color: statusStyle.text,
            borderBottomLeftRadius: 12,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 4,
            paddingBottom: 4,
            fontSize: 10,
            fontWeight: 500,
            fontFamily: "'Lexend Deca', sans-serif",
            lineHeight: "16px",
            whiteSpace: "nowrap",
          }}
        >
          {order.status}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col" style={{ gap: 12, paddingBottom: 4 }}>
        {/* Order info */}
        <div className="flex flex-col" style={{ gap: 4, paddingLeft: 16, paddingRight: 16 }}>
          {/* Order ID / Date row */}
          <div
            className="flex items-center gap-2"
            style={{
              fontSize: 12,
              fontWeight: 300,
              color: colors.gray700,
              fontFamily: "'Lexend Deca', sans-serif",
              lineHeight: "20px",
            }}
          >
            {order.orderedOn && (
              <>
                <span>Ordered on: {order.orderedOn}</span>
                <span style={{ fontSize: 14 }}>•</span>
              </>
            )}
            <span>Order ID: {order.id}</span>
          </div>

          {/* Patient name */}
          <p
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: colors.gray900,
              fontFamily: "'Lexend Deca', sans-serif",
              lineHeight: "20px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {order.patient}
          </p>

          {/* ETA / delivery status */}
          <div className="flex items-center" style={{ gap: 4 }}>
            <DeliveryIcon color={order.status === "Order Placed" ? "#f27400" : colors.gray700} />
            <span
              style={{
                fontSize: 12,
                fontWeight: 300,
                color: colors.textPrimary,
                fontFamily: "'Lexend Deca', sans-serif",
                lineHeight: "20px",
              }}
            >
              {order.eta}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: colors.gray50, width: "100%" }} />

        {/* Medicine details */}
        <div
          className="flex items-start"
          style={{ gap: 12, paddingLeft: 16, paddingRight: 16 }}
        >
          {/* Medicine bottle thumbnail */}
          <div
            className="shrink-0 flex items-center justify-center"
            style={{
              width: 64,
              height: 64,
              borderRadius: 8,
              border: `1.24px solid ${colors.gray100}`,
              background: colors.white,
            }}
          >
            <MedicineBottleIcon />
          </div>

          {/* Store + items */}
          <div className="flex flex-col min-w-0" style={{ gap: 2, flex: 1 }}>
            {/* Store row */}
            <div className="flex items-center" style={{ gap: 4, height: 20 }}>
              <div className="flex items-center" style={{ gap: 2 }}>
                <StoreIcon />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: colors.gray900,
                    fontFamily: "'Lexend Deca', sans-serif",
                    lineHeight: "20px",
                  }}
                >
                  {order.store}
                </span>
              </div>
              <span
                style={{
                  fontSize: 14,
                  color: colors.gray700,
                  fontWeight: 300,
                  fontFamily: "'Lexend Deca', sans-serif",
                  lineHeight: "18px",
                }}
              >
                •
              </span>
              <div className="flex items-center min-w-0" style={{ gap: 2, flex: 1 }}>
                <LocationIcon />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: colors.gray900,
                    fontFamily: "'Lexend Deca', sans-serif",
                    lineHeight: "20px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {order.location}
                </span>
              </div>
            </div>

            {/* Items list */}
            <div className="flex flex-col" style={{ gap: 2 }}>
              {order.items.map((item, idx) => {
                const isLast = idx === order.items.length - 1;
                return (
                  <div
                    key={idx}
                    className="flex items-center"
                    style={{ gap: 2 }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 300,
                        color: colors.gray700,
                        fontFamily: "'Lexend Deca', sans-serif",
                        lineHeight: "20px",
                        flex: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      • ({item.qty}) {item.name}
                    </span>
                    {isLast && order.moreCount && (
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 300,
                          color: colors.gray700,
                          fontFamily: "'Lexend Deca', sans-serif",
                          lineHeight: "20px",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        +{order.moreCount} more
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Track Order button */}
        <div style={{ paddingLeft: 16, paddingRight: 16 }}>
          <button
            className="w-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
            style={{
              height: 36,
              borderRadius: 8,
              border: `1px solid ${colors.brand600}`,
              background: colors.white,
              boxShadow: "0px 1px 2px rgba(23,27,34,0.05)",
              fontSize: 14,
              fontWeight: 600,
              color: colors.brand600,
              fontFamily: "'Lexend Deca', sans-serif",
              lineHeight: "20px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = colors.brand25;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = colors.white;
            }}
          >
            Track Order
          </button>
        </div>

        {/* Bottom spacer */}
        <div style={{ height: 4 }} />
      </div>
    </div>
  );
}

function BottomFilterBar() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 bg-white flex items-center justify-center shrink-0"
      style={{
        height: 50,
        borderTop: `1px solid ${colors.gray100}`,
        boxShadow: "0px -1px 2px rgba(0,0,0,0.03), 0px -2px 4px rgba(0,0,0,0.03)",
      }}
    >
      <button
        className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        aria-label="Open filters"
      >
        <div className="relative">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M2 5h16M5 10h10M8 15h4"
              stroke={colors.textPrimary}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          {/* Red dot indicator */}
          <span
            className="absolute"
            style={{
              top: -2,
              right: -2,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#e53e3e",
              border: "1.5px solid white",
            }}
          />
        </div>
        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: colors.textPrimary,
            fontFamily: "'Lexend Deca', sans-serif",
            lineHeight: "20px",
          }}
        >
          Filter
        </span>
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main screen
// ---------------------------------------------------------------------------

export default function OrderTracking() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredOrders =
    activeFilter === "all"
      ? ORDERS
      : ORDERS.filter((o) => o.category === activeFilter);

  const activeLabel = FILTERS.find((f) => f.id === activeFilter)?.label ?? "";
  const sectionHeading = `${activeLabel} Orders`;

  return (
    <div
      className="flex items-start justify-center"
      style={{ minHeight: "100vh", background: "#f0f2f5" }}
    >
      {/* Phone frame */}
      <div
        className="relative flex flex-col bg-white"
        style={{
          width: 360,
          minHeight: "100vh",
          overflow: "hidden",
          boxShadow: "0 4px 40px rgba(0,0,0,0.12)",
        }}
      >
        <StatusBar />
        <Header />

        {/* Thin divider below header */}
        <div style={{ height: 1, background: colors.gray100, flexShrink: 0 }} />

        {/* Scrollable content */}
        <div
          className="flex-1 overflow-y-auto bg-white"
          style={{ paddingBottom: 66 }}
        >
          {/* Promo banner */}
          <PromoBanner />

          {/* Filter bar */}
          <div style={{ marginTop: 16 }}>
            <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </div>

          {/* Orders section */}
          <div style={{ padding: "16px 16px 0" }}>
            {/* Section header */}
            <h2
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: colors.textPrimary,
                fontFamily: "'Lexend Deca', sans-serif",
                lineHeight: "24px",
                marginBottom: 16,
              }}
            >
              {sectionHeading} ({filteredOrders.length})
            </h2>

            {/* Order cards */}
            <div className="flex flex-col" style={{ gap: 16 }}>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, i) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    patternId={`diag-pattern-${i}`}
                  />
                ))
              ) : (
                <p
                  style={{
                    fontSize: 14,
                    color: colors.gray500,
                    fontFamily: "'Lexend Deca', sans-serif",
                    textAlign: "center",
                    padding: "32px 0",
                  }}
                >
                  No {activeLabel.toLowerCase()} orders found.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Fixed bottom filter bar */}
        <BottomFilterBar />
      </div>
    </div>
  );
}
