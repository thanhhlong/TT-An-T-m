import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  Layers,
  CalendarCheck,
  Wallet,
  DoorOpen,
  CalendarDays,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  FileSpreadsheet,
  ArrowLeft,
  RefreshCw,
  Cloud,
  CreditCard,
  Banknote,
  GraduationCap,
  AlertTriangle,
  UploadCloud,
  DownloadCloud,
  Menu
} from "lucide-react";
import {
  googleSignIn,
  listGoogleSheets,
  createGoogleSheet,
  ensureSpreadsheetTabs,
  writeNamedTabValues,
  readNamedTabValues
} from "../googleSheetsService";

// ---------- Types ----------

type Gender = "Nam" | "Nữ";
type StudentStatus = "Đang học" | "Bảo lưu" | "Đã nghỉ";
type ActiveStatus = "Hoạt động" | "Ngừng";
type ClassStatus = "Đang học" | "Chưa khai giảng" | "Kết thúc";
type RoomStatus = "Sẵn sàng" | "Đang sử dụng" | "Bảo trì";
type PaymentMethod = "Tiền mặt" | "Chuyển khoản";
type AttendanceStatus = "Có mặt" | "Vắng" | "Trễ" | "Nghỉ phép";

interface CenterStudent {
  id: string;
  hoTen: string;
  gioiTinh: Gender;
  ngaySinh: string;
  sdt: string;
  email: string;
  diaChi: string;
  phuHuynh: string;
  sdtPhuHuynh: string;
  lopId: string;
  trangThai: StudentStatus;
  ngayGhiDanh: string;
  ghiChu: string;
}

interface CenterTeacher {
  id: string;
  hoTen: string;
  sdt: string;
  email: string;
  chuyenMon: string;
  trangThai: ActiveStatus;
}

interface CenterCourse {
  id: string;
  tenKhoaHoc: string;
  hocPhi: number;
  thoiLuong: string;
  trangThai: ActiveStatus;
}

interface CenterClass {
  id: string;
  tenLop: string;
  khoaHocId: string;
  giaoVienId: string;
  phongId: string;
  siSoToiDa: number;
  trangThai: ClassStatus;
}

interface CenterRoom {
  id: string;
  tenPhong: string;
  sucChua: number;
  trangThai: RoomStatus;
}

interface CenterAttendance {
  id: string;
  ngay: string;
  lopId: string;
  hocVienId: string;
  trangThai: AttendanceStatus;
  ghiChu: string;
}

interface CenterTuition {
  id: string;
  hocVienId: string;
  lopId: string;
  soTien: number;
  daDong: number;
  ngayThu: string;
  hinhThuc: PaymentMethod;
  ghiChu: string;
}

interface CenterScheduleItem {
  id: string;
  thu: string;
  lopId: string;
  giaoVienId: string;
  phongId: string;
  gioBatDau: string;
  gioKetThuc: string;
}

interface CenterData {
  students: CenterStudent[];
  teachers: CenterTeacher[];
  courses: CenterCourse[];
  classes: CenterClass[];
  rooms: CenterRoom[];
  attendance: CenterAttendance[];
  tuition: CenterTuition[];
  schedule: CenterScheduleItem[];
}

type PageKey = "dashboard" | "students" | "teachers" | "courses" | "classes" | "attendance" | "tuition" | "rooms" | "schedule";

const STORAGE_KEY = "ttat_center_management_v1";
const SPREADSHEET_KEY = "ttat_center_spreadsheet_id";

const WEEKDAYS = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

const TAB_NAMES: Record<keyof CenterData, string> = {
  students: "HocVien",
  teachers: "GiaoVien",
  courses: "KhoaHoc",
  classes: "LopHoc",
  rooms: "PhongHoc",
  attendance: "DiemDanh",
  tuition: "HocPhi",
  schedule: "ThoiKhoaBieu"
};

const ENTITY_LABEL: Record<keyof CenterData, string> = {
  students: "học viên",
  teachers: "giáo viên",
  courses: "khóa học",
  classes: "lớp học",
  rooms: "phòng học",
  attendance: "buổi điểm danh",
  tuition: "phiếu thu",
  schedule: "lịch học"
};

const todayISO = () => new Date().toISOString().slice(0, 10);
const daysAgoISO = (n: number) => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);

function buildSeedData(): CenterData {
  return {
    teachers: [
      { id: "GV01", hoTen: "Nguyễn Văn A", sdt: "0901234567", email: "a@gmail.com", chuyenMon: "IELTS", trangThai: "Hoạt động" },
      { id: "GV02", hoTen: "Trần Thị B", sdt: "0901234568", email: "b@gmail.com", chuyenMon: "TOEIC", trangThai: "Hoạt động" },
      { id: "GV03", hoTen: "Lê Văn C", sdt: "0901234569", email: "c@gmail.com", chuyenMon: "Giao tiếp", trangThai: "Hoạt động" }
    ],
    courses: [
      { id: "K01", tenKhoaHoc: "IELTS", hocPhi: 5000000, thoiLuong: "3 tháng", trangThai: "Hoạt động" },
      { id: "K02", tenKhoaHoc: "TOEIC", hocPhi: 3000000, thoiLuong: "2 tháng", trangThai: "Hoạt động" },
      { id: "K03", tenKhoaHoc: "Giao tiếp", hocPhi: 4000000, thoiLuong: "3 tháng", trangThai: "Hoạt động" },
      { id: "K04", tenKhoaHoc: "Khóa Tháng 7", hocPhi: 1000000, thoiLuong: "2 tháng", trangThai: "Hoạt động" },
      { id: "K05", tenKhoaHoc: "Khóa Giao tiếp cho người mới", hocPhi: 2500000, thoiLuong: "4 tháng", trangThai: "Hoạt động" },
      { id: "K06", tenKhoaHoc: "Khóa B", hocPhi: 2500000, thoiLuong: "2 tháng", trangThai: "Hoạt động" }
    ],
    rooms: [
      { id: "P01", tenPhong: "Phòng 101", sucChua: 20, trangThai: "Sẵn sàng" },
      { id: "P02", tenPhong: "Phòng 102", sucChua: 15, trangThai: "Đang sử dụng" },
      { id: "P03", tenPhong: "Phòng Online", sucChua: 30, trangThai: "Sẵn sàng" }
    ],
    classes: [
      { id: "L01", tenLop: "Lớp IELTS 1", khoaHocId: "K01", giaoVienId: "GV01", phongId: "P01", siSoToiDa: 15, trangThai: "Đang học" },
      { id: "L02", tenLop: "Lớp TOEIC 1", khoaHocId: "K02", giaoVienId: "GV02", phongId: "P02", siSoToiDa: 20, trangThai: "Đang học" },
      { id: "L03", tenLop: "Lớp Giao tiếp 1", khoaHocId: "K03", giaoVienId: "GV03", phongId: "P01", siSoToiDa: 10, trangThai: "Đang học" },
      { id: "L04", tenLop: "Lớp Giao Tiếp Mới", khoaHocId: "K05", giaoVienId: "GV03", phongId: "P03", siSoToiDa: 20, trangThai: "Chưa khai giảng" }
    ],
    students: [
      { id: "HV01", hoTen: "Nguyễn Nam", gioiTinh: "Nam", ngaySinh: "1999-01-15", sdt: "0901111111", email: "nam@gmail.com", diaChi: "HCM", phuHuynh: "", sdtPhuHuynh: "", lopId: "L01", trangThai: "Đang học", ngayGhiDanh: daysAgoISO(18), ghiChu: "" },
      { id: "HV02", hoTen: "Trần Nữ B", gioiTinh: "Nữ", ngaySinh: "2001-02-02", sdt: "0902222222", email: "nub@gmail.com", diaChi: "HCM", phuHuynh: "", sdtPhuHuynh: "", lopId: "L01", trangThai: "Đang học", ngayGhiDanh: daysAgoISO(17), ghiChu: "" },
      { id: "HV03", hoTen: "Lê A", gioiTinh: "Nam", ngaySinh: "2002-03-03", sdt: "0903333333", email: "a2@gmail.com", diaChi: "HCM", phuHuynh: "", sdtPhuHuynh: "", lopId: "L02", trangThai: "Đang học", ngayGhiDanh: daysAgoISO(16), ghiChu: "" },
      { id: "HV04", hoTen: "Phạm B", gioiTinh: "Nữ", ngaySinh: "2003-04-04", sdt: "0904444444", email: "b2@gmail.com", diaChi: "HCM", phuHuynh: "", sdtPhuHuynh: "", lopId: "L02", trangThai: "Đang học", ngayGhiDanh: daysAgoISO(15), ghiChu: "" },
      { id: "HV05", hoTen: "Hoàng C", gioiTinh: "Nam", ngaySinh: "2004-05-05", sdt: "0905555555", email: "c2@gmail.com", diaChi: "HCM", phuHuynh: "", sdtPhuHuynh: "", lopId: "L03", trangThai: "Đang học", ngayGhiDanh: daysAgoISO(14), ghiChu: "" },
      { id: "HV06", hoTen: "Nguyễn Văn Hoàng Anh", gioiTinh: "Nam", ngaySinh: "2003-07-01", sdt: "0865341745", email: "kimlt.develop@gmail.com", diaChi: "HCM", phuHuynh: "", sdtPhuHuynh: "", lopId: "L01", trangThai: "Đang học", ngayGhiDanh: daysAgoISO(10), ghiChu: "" },
      { id: "HV07", hoTen: "Nguyễn Văn Tâm", gioiTinh: "Nam", ngaySinh: "1995-07-01", sdt: "0865342123", email: "kim.abc@gmail.com", diaChi: "HCM", phuHuynh: "", sdtPhuHuynh: "", lopId: "L02", trangThai: "Đang học", ngayGhiDanh: daysAgoISO(8), ghiChu: "" },
      { id: "HV08", hoTen: "Học Viên Mới", gioiTinh: "Nam", ngaySinh: "2000-07-01", sdt: "0865341645", email: "kimlt@gmail.com", diaChi: "HCM", phuHuynh: "Phụ Huynh", sdtPhuHuynh: "0865341632", lopId: "L04", trangThai: "Đang học", ngayGhiDanh: daysAgoISO(1), ghiChu: "Chuyển đến" }
    ],
    tuition: [
      { id: "PT01", hocVienId: "HV01", lopId: "L01", soTien: 5000000, daDong: 5000000, ngayThu: daysAgoISO(9), hinhThuc: "Chuyển khoản", ghiChu: "" },
      { id: "PT02", hocVienId: "HV02", lopId: "L01", soTien: 5000000, daDong: 3000000, ngayThu: daysAgoISO(8), hinhThuc: "Tiền mặt", ghiChu: "" },
      { id: "PT03", hocVienId: "HV03", lopId: "L02", soTien: 3000000, daDong: 3000000, ngayThu: daysAgoISO(7), hinhThuc: "Chuyển khoản", ghiChu: "" },
      { id: "PT04", hocVienId: "HV04", lopId: "L02", soTien: 3000000, daDong: 1500000, ngayThu: daysAgoISO(6), hinhThuc: "Tiền mặt", ghiChu: "" },
      { id: "PT05", hocVienId: "HV05", lopId: "L03", soTien: 4000000, daDong: 4000000, ngayThu: daysAgoISO(5), hinhThuc: "Chuyển khoản", ghiChu: "" },
      { id: "PT06", hocVienId: "HV04", lopId: "L01", soTien: 500000, daDong: 500000, ngayThu: daysAgoISO(2), hinhThuc: "Tiền mặt", ghiChu: "Phụ phí tài liệu" },
      { id: "PT07", hocVienId: "HV01", lopId: "L01", soTien: 2500000, daDong: 2000000, ngayThu: daysAgoISO(2), hinhThuc: "Chuyển khoản", ghiChu: "" },
      { id: "PT08", hocVienId: "HV08", lopId: "L04", soTien: 2500000, daDong: 2000000, ngayThu: daysAgoISO(1), hinhThuc: "Chuyển khoản", ghiChu: "" }
    ],
    attendance: [
      { id: "DD01", ngay: todayISO(), lopId: "L01", hocVienId: "HV01", trangThai: "Có mặt", ghiChu: "" },
      { id: "DD02", ngay: todayISO(), lopId: "L01", hocVienId: "HV02", trangThai: "Có mặt", ghiChu: "" },
      { id: "DD03", ngay: todayISO(), lopId: "L01", hocVienId: "HV06", trangThai: "Vắng", ghiChu: "Báo bận" }
    ],
    schedule: [
      { id: "LH01", thu: "Thứ 2", lopId: "L01", giaoVienId: "GV01", phongId: "P01", gioBatDau: "18:00", gioKetThuc: "20:00" },
      { id: "LH02", thu: "Thứ 3", lopId: "L02", giaoVienId: "GV02", phongId: "P02", gioBatDau: "18:00", gioKetThuc: "20:00" },
      { id: "LH03", thu: "Thứ 4", lopId: "L03", giaoVienId: "GV03", phongId: "P01", gioBatDau: "19:00", gioKetThuc: "21:00" },
      { id: "LH04", thu: "Thứ 5", lopId: "L01", giaoVienId: "GV01", phongId: "P01", gioBatDau: "18:00", gioKetThuc: "20:00" },
      { id: "LH05", thu: "Thứ 7", lopId: "L04", giaoVienId: "GV03", phongId: "P03", gioBatDau: "09:00", gioKetThuc: "11:00" }
    ]
  };
}

function loadInitialData(): CenterData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fall through to seed data
  }
  return buildSeedData();
}

const formatVND = (n: number) => `${(n || 0).toLocaleString("vi-VN")} đ`;

function exportCsv(filename: string, headers: string[], rows: (string | number)[][]) {
  const escape = (v: any) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [headers, ...rows].map((r) => r.map(escape).join(",")).join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function useCrud<T extends { id: string }>(items: T[], setItems: (updater: (prev: T[]) => T[]) => void, idPrefix: string) {
  const nextId = () => {
    const nums = items.map((d) => parseInt(d.id.replace(idPrefix, ""), 10)).filter((n) => !isNaN(n));
    const max = nums.length ? Math.max(...nums) : 0;
    return `${idPrefix}${String(max + 1).padStart(2, "0")}`;
  };
  const add = (item: Record<string, any>) => setItems((prev) => [...prev, { ...item, id: nextId() } as T]);
  const update = (id: string, patch: Record<string, any>) => setItems((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  const remove = (id: string) => setItems((prev) => prev.filter((d) => d.id !== id));
  return { add, update, remove };
}

// ---------- Shared UI pieces ----------

const STATUS_STYLES: Record<string, string> = {
  "Đang học": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Hoạt động": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Sẵn sàng": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Có mặt": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Bảo lưu": "bg-amber-50 text-amber-700 border-amber-100",
  "Trễ": "bg-amber-50 text-amber-700 border-amber-100",
  "Đang sử dụng": "bg-amber-50 text-amber-700 border-amber-100",
  "Chưa khai giảng": "bg-slate-100 text-slate-600 border-slate-200",
  "Nghỉ phép": "bg-slate-100 text-slate-600 border-slate-200",
  "Đã nghỉ": "bg-rose-50 text-rose-700 border-rose-100",
  "Ngừng": "bg-rose-50 text-rose-700 border-rose-100",
  "Vắng": "bg-rose-50 text-rose-700 border-rose-100",
  "Kết thúc": "bg-rose-50 text-rose-700 border-rose-100",
  "Bảo trì": "bg-rose-50 text-rose-700 border-rose-100"
};

function StatusBadge({ status }: { status: string }) {
  const cls = STATUS_STYLES[status] || "bg-slate-100 text-slate-600 border-slate-200";
  return <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${cls}`}>{status}</span>;
}

function StatCard({ label, value, sub, icon, tone }: { label: string; value: React.ReactNode; sub?: string; icon: React.ReactNode; tone: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{label}</span>
        <div className={`p-2 rounded-xl border ${tone}`}>{icon}</div>
      </div>
      <h4 className="text-xl font-bold text-slate-800">{value}</h4>
      {sub && <p className="text-[10px] text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

type FieldDef =
  | { key: string; label: string; type: "text" | "email" | "tel" | "date" | "time" | "textarea"; required?: boolean; placeholder?: string; span?: 1 | 2 }
  | { key: string; label: string; type: "number"; required?: boolean; placeholder?: string; span?: 1 | 2 }
  | { key: string; label: string; type: "select"; options: { value: string; label: string }[]; required?: boolean; span?: 1 | 2 };

function FormModal({
  title,
  fields,
  values,
  onChange,
  onCancel,
  onSubmit
}: {
  title: string;
  fields: FieldDef[];
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl">
          <h3 className="font-bold text-slate-800">{title}</h3>
          <button onClick={onCancel} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="p-5 space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.key} className={f.span === 2 || f.type === "textarea" ? "col-span-2" : "col-span-1"}>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {f.label}
                  {f.required && <span className="text-rose-500"> *</span>}
                </label>
                {f.type === "select" ? (
                  <select
                    value={values[f.key] ?? ""}
                    required={f.required}
                    onChange={(e) => onChange(f.key, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  >
                    <option value="">— Chọn —</option>
                    {f.options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                ) : f.type === "textarea" ? (
                  <textarea
                    value={values[f.key] ?? ""}
                    onChange={(e) => onChange(f.key, e.target.value)}
                    rows={2}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                ) : (
                  <input
                    type={f.type}
                    value={values[f.key] ?? ""}
                    required={f.required}
                    placeholder={f.placeholder}
                    onChange={(e) => onChange(f.key, f.type === "number" ? Number(e.target.value) : e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button type="button" onClick={onCancel} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer">
              Hủy
            </button>
            <button type="submit" className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface ColumnDef<T> {
  key: string;
  label: string;
  className?: string;
  render: (row: T) => React.ReactNode;
}

interface FilterDef {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}

function ListPage<T extends { id: string }>({
  icon,
  title,
  rows,
  totalCount,
  columns,
  search,
  onSearchChange,
  searchPlaceholder,
  filters,
  dateFilters,
  addLabel,
  onAdd,
  onEdit,
  onDelete,
  onExport
}: {
  icon: React.ReactNode;
  title: string;
  rows: T[];
  totalCount: number;
  columns: ColumnDef<T>[];
  search?: string;
  onSearchChange?: (v: string) => void;
  searchPlaceholder?: string;
  filters?: FilterDef[];
  dateFilters?: { label: string; value: string; onChange: (v: string) => void }[];
  addLabel: string;
  onAdd: () => void;
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
  onExport: () => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        {icon}
        {title}
      </h2>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 flex flex-wrap items-center gap-2 border-b border-slate-100">
          {onSearchChange && (
            <div className="relative flex-1 min-w-[180px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              />
            </div>
          )}
          {filters?.map((f) => (
            <select
              key={f.label}
              value={f.value}
              onChange={(e) => f.onChange(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="">{f.label}</option>
              {f.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ))}
          {dateFilters?.map((f) => (
            <div key={f.label} className="flex items-center gap-1.5 text-xs text-slate-500">
              <span>{f.label}</span>
              <input
                type="date"
                value={f.value}
                onChange={(e) => f.onChange(e.target.value)}
                className="px-2 py-2 border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
              {f.value && (
                <button onClick={() => f.onChange("")} className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
          <div className="flex-1" />
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 border border-emerald-200 hover:bg-emerald-50 rounded-lg cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" /> Xuất Excel
          </button>
          <button
            onClick={onAdd}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> {addLabel}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/60">
                {columns.map((c) => (
                  <th key={c.key} className={`px-4 py-2.5 whitespace-nowrap ${c.className || ""}`}>
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-2.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-8 text-slate-400">
                    Chưa có dữ liệu.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/60">
                    {columns.map((c) => (
                      <td key={c.key} className={`px-4 py-2.5 ${c.className || ""}`}>
                        {c.render(row)}
                      </td>
                    ))}
                    <td className="px-4 py-2.5">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => onEdit(row)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => onDelete(row)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 border-t border-slate-100 text-[11px] text-slate-400">
          Hiển thị {rows.length} / {totalCount} dòng
        </div>
      </div>
    </div>
  );
}

const NAV_ITEMS: { key: PageKey; label: string; icon: React.ReactNode }[] = [
  { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { key: "students", label: "Học viên", icon: <Users className="w-4 h-4" /> },
  { key: "teachers", label: "Giáo viên", icon: <UserCheck className="w-4 h-4" /> },
  { key: "courses", label: "Khóa học", icon: <BookOpen className="w-4 h-4" /> },
  { key: "classes", label: "Lớp học", icon: <Layers className="w-4 h-4" /> },
  { key: "attendance", label: "Điểm danh", icon: <CalendarCheck className="w-4 h-4" /> },
  { key: "tuition", label: "Học phí", icon: <Wallet className="w-4 h-4" /> },
  { key: "rooms", label: "Phòng học", icon: <DoorOpen className="w-4 h-4" /> },
  { key: "schedule", label: "Thời khóa biểu", icon: <CalendarDays className="w-4 h-4" /> }
];

// ---------- Google Sheet row <-> object mapping ----------

const STUDENT_HEADERS = ["Mã", "Họ tên", "Giới tính", "Ngày sinh", "SĐT", "Email", "Địa chỉ", "Phụ huynh", "SĐT phụ huynh", "Lớp", "Trạng thái", "Ngày ghi danh", "Ghi chú"];
const teacherHeaders = ["Mã", "Họ tên", "SĐT", "Email", "Chuyên môn", "Trạng thái"];
const courseHeaders = ["Mã", "Tên khóa học", "Học phí", "Thời lượng", "Trạng thái"];
const classHeaders = ["Mã", "Tên lớp", "Khóa học", "Giáo viên", "Phòng", "Sĩ số tối đa", "Trạng thái"];
const roomHeaders = ["Mã", "Tên phòng", "Sức chứa", "Trạng thái"];
const attendanceHeaders = ["Mã", "Ngày", "Lớp", "Học viên", "Trạng thái", "Ghi chú"];
const tuitionHeaders = ["Mã", "Học viên", "Lớp", "Số tiền", "Đã đóng", "Ngày thu", "Hình thức", "Ghi chú"];
const scheduleHeaders = ["Mã", "Thứ", "Lớp", "Giáo viên", "Phòng", "Giờ bắt đầu", "Giờ kết thúc"];

export default function CenterManagement({ currentUserName, accessToken, onExit }: { currentUserName?: string; accessToken?: string | null; onExit: () => void }) {
  const [data, setData] = useState<CenterData>(loadInitialData);
  const [activePage, setActivePage] = useState<PageKey>("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const setEntity = <K extends keyof CenterData>(key: K, updater: (prev: CenterData[K]) => CenterData[K]) => {
    setData((prev) => ({ ...prev, [key]: updater(prev[key]) }));
  };

  const studentsCrud = useCrud(data.students, (u) => setEntity("students", u), "HV");
  const teachersCrud = useCrud(data.teachers, (u) => setEntity("teachers", u), "GV");
  const coursesCrud = useCrud(data.courses, (u) => setEntity("courses", u), "K");
  const classesCrud = useCrud(data.classes, (u) => setEntity("classes", u), "L");
  const roomsCrud = useCrud(data.rooms, (u) => setEntity("rooms", u), "P");
  const attendanceCrud = useCrud(data.attendance, (u) => setEntity("attendance", u), "DD");
  const tuitionCrud = useCrud(data.tuition, (u) => setEntity("tuition", u), "PT");
  const scheduleCrud = useCrud(data.schedule, (u) => setEntity("schedule", u), "LH");

  const crudMap: Record<keyof CenterData, ReturnType<typeof useCrud>> = {
    students: studentsCrud,
    teachers: teachersCrud,
    courses: coursesCrud,
    classes: classesCrud,
    rooms: roomsCrud,
    attendance: attendanceCrud,
    tuition: tuitionCrud,
    schedule: scheduleCrud
  };

  // ---- lookups ----
  const getStudentName = (id: string) => data.students.find((s) => s.id === id)?.hoTen || "—";
  const getTeacherName = (id: string) => data.teachers.find((t) => t.id === id)?.hoTen || "—";
  const getCourseName = (id: string) => data.courses.find((c) => c.id === id)?.tenKhoaHoc || "—";
  const getClassLabel = (id: string) => data.classes.find((c) => c.id === id)?.tenLop || "—";
  const getRoomName = (id: string) => data.rooms.find((r) => r.id === id)?.tenPhong || "—";

  // ---- modal state ----
  const [modalEntity, setModalEntity] = useState<keyof CenterData | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [modalId, setModalId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const openAdd = (entity: keyof CenterData, defaults: Record<string, any>) => {
    setModalEntity(entity);
    setModalMode("add");
    setModalId(null);
    setFormValues(defaults);
  };
  const openEdit = (entity: keyof CenterData, row: Record<string, any>) => {
    setModalEntity(entity);
    setModalMode("edit");
    setModalId(row.id);
    setFormValues({ ...row });
  };
  const closeModal = () => setModalEntity(null);
  const handleFormChange = (key: string, value: any) => setFormValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!modalEntity) return;
    const crud = crudMap[modalEntity];
    if (modalMode === "add") crud.add(formValues);
    else if (modalId) crud.update(modalId, formValues);
    closeModal();
  };

  const handleDelete = (entity: keyof CenterData, row: { id: string }, label: string) => {
    if (confirm(`Bạn có chắc muốn xóa ${ENTITY_LABEL[entity]} "${label}" không?`)) {
      crudMap[entity].remove(row.id);
    }
  };

  const getFieldsFor = (entity: keyof CenterData): FieldDef[] => {
    switch (entity) {
      case "students":
        return [
          { key: "hoTen", label: "Họ và tên", type: "text", required: true },
          { key: "gioiTinh", label: "Giới tính", type: "select", options: [{ value: "Nam", label: "Nam" }, { value: "Nữ", label: "Nữ" }] },
          { key: "ngaySinh", label: "Ngày sinh", type: "date" },
          { key: "sdt", label: "SĐT", type: "tel" },
          { key: "email", label: "Email", type: "email", span: 2 },
          { key: "diaChi", label: "Địa chỉ", type: "text", span: 2 },
          { key: "phuHuynh", label: "Phụ huynh", type: "text" },
          { key: "sdtPhuHuynh", label: "SĐT phụ huynh", type: "tel" },
          { key: "lopId", label: "Lớp", type: "select", options: data.classes.map((c) => ({ value: c.id, label: c.tenLop })) },
          {
            key: "trangThai",
            label: "Trạng thái",
            type: "select",
            options: [
              { value: "Đang học", label: "Đang học" },
              { value: "Bảo lưu", label: "Bảo lưu" },
              { value: "Đã nghỉ", label: "Đã nghỉ" }
            ]
          },
          { key: "ngayGhiDanh", label: "Ngày ghi danh", type: "date" },
          { key: "ghiChu", label: "Ghi chú", type: "textarea" }
        ];
      case "teachers":
        return [
          { key: "hoTen", label: "Họ và tên", type: "text", required: true, span: 2 },
          { key: "sdt", label: "SĐT", type: "tel" },
          { key: "email", label: "Email", type: "email" },
          { key: "chuyenMon", label: "Chuyên môn", type: "text" },
          {
            key: "trangThai",
            label: "Trạng thái",
            type: "select",
            options: [
              { value: "Hoạt động", label: "Hoạt động" },
              { value: "Ngừng", label: "Ngừng" }
            ]
          }
        ];
      case "courses":
        return [
          { key: "tenKhoaHoc", label: "Tên khóa học", type: "text", required: true, span: 2 },
          { key: "hocPhi", label: "Học phí (đ)", type: "number", required: true },
          { key: "thoiLuong", label: "Thời lượng", type: "text", placeholder: "VD: 3 tháng" },
          {
            key: "trangThai",
            label: "Trạng thái",
            type: "select",
            options: [
              { value: "Hoạt động", label: "Hoạt động" },
              { value: "Ngừng", label: "Ngừng" }
            ],
            span: 2
          }
        ];
      case "classes":
        return [
          { key: "tenLop", label: "Tên lớp", type: "text", required: true, span: 2 },
          { key: "khoaHocId", label: "Khóa học", type: "select", required: true, options: data.courses.map((c) => ({ value: c.id, label: c.tenKhoaHoc })) },
          { key: "giaoVienId", label: "Giáo viên", type: "select", required: true, options: data.teachers.map((t) => ({ value: t.id, label: t.hoTen })) },
          { key: "phongId", label: "Phòng học", type: "select", options: data.rooms.map((r) => ({ value: r.id, label: r.tenPhong })) },
          { key: "siSoToiDa", label: "Sĩ số tối đa", type: "number" },
          {
            key: "trangThai",
            label: "Trạng thái",
            type: "select",
            options: [
              { value: "Đang học", label: "Đang học" },
              { value: "Chưa khai giảng", label: "Chưa khai giảng" },
              { value: "Kết thúc", label: "Kết thúc" }
            ]
          }
        ];
      case "rooms":
        return [
          { key: "tenPhong", label: "Tên phòng", type: "text", required: true, span: 2 },
          { key: "sucChua", label: "Sức chứa", type: "number" },
          {
            key: "trangThai",
            label: "Trạng thái",
            type: "select",
            options: [
              { value: "Sẵn sàng", label: "Sẵn sàng" },
              { value: "Đang sử dụng", label: "Đang sử dụng" },
              { value: "Bảo trì", label: "Bảo trì" }
            ]
          }
        ];
      case "attendance":
        return [
          { key: "ngay", label: "Ngày", type: "date", required: true },
          { key: "lopId", label: "Lớp", type: "select", required: true, options: data.classes.map((c) => ({ value: c.id, label: c.tenLop })) },
          { key: "hocVienId", label: "Học viên", type: "select", required: true, options: data.students.map((s) => ({ value: s.id, label: s.hoTen })), span: 2 },
          {
            key: "trangThai",
            label: "Trạng thái",
            type: "select",
            options: [
              { value: "Có mặt", label: "Có mặt" },
              { value: "Vắng", label: "Vắng" },
              { value: "Trễ", label: "Trễ" },
              { value: "Nghỉ phép", label: "Nghỉ phép" }
            ]
          },
          { key: "ghiChu", label: "Ghi chú", type: "text" }
        ];
      case "tuition":
        return [
          { key: "hocVienId", label: "Học viên", type: "select", required: true, options: data.students.map((s) => ({ value: s.id, label: s.hoTen })), span: 2 },
          { key: "lopId", label: "Lớp", type: "select", options: data.classes.map((c) => ({ value: c.id, label: c.tenLop })) },
          { key: "ngayThu", label: "Ngày thu", type: "date" },
          { key: "soTien", label: "Số tiền (đ)", type: "number", required: true },
          { key: "daDong", label: "Đã đóng (đ)", type: "number" },
          {
            key: "hinhThuc",
            label: "Hình thức",
            type: "select",
            options: [
              { value: "Tiền mặt", label: "Tiền mặt" },
              { value: "Chuyển khoản", label: "Chuyển khoản" }
            ]
          },
          { key: "ghiChu", label: "Ghi chú", type: "text" }
        ];
      case "schedule":
        return [
          { key: "thu", label: "Thứ", type: "select", required: true, options: WEEKDAYS.map((w) => ({ value: w, label: w })) },
          { key: "lopId", label: "Lớp", type: "select", required: true, options: data.classes.map((c) => ({ value: c.id, label: c.tenLop })) },
          { key: "giaoVienId", label: "Giáo viên", type: "select", required: true, options: data.teachers.map((t) => ({ value: t.id, label: t.hoTen })) },
          { key: "phongId", label: "Phòng học", type: "select", options: data.rooms.map((r) => ({ value: r.id, label: r.tenPhong })) },
          { key: "gioBatDau", label: "Giờ bắt đầu", type: "time", required: true },
          { key: "gioKetThuc", label: "Giờ kết thúc", type: "time", required: true }
        ];
      default:
        return [];
    }
  };

  // ---- page-level filter state ----
  const [studentSearch, setStudentSearch] = useState("");
  const [studentClassFilter, setStudentClassFilter] = useState("");
  const [studentStatusFilter, setStudentStatusFilter] = useState("");

  const [teacherSearch, setTeacherSearch] = useState("");
  const [teacherStatusFilter, setTeacherStatusFilter] = useState("");

  const [courseSearch, setCourseSearch] = useState("");
  const [courseStatusFilter, setCourseStatusFilter] = useState("");

  const [classSearch, setClassSearch] = useState("");
  const [classCourseFilter, setClassCourseFilter] = useState("");
  const [classStatusFilter, setClassStatusFilter] = useState("");

  const [roomSearch, setRoomSearch] = useState("");
  const [roomStatusFilter, setRoomStatusFilter] = useState("");

  const [attendanceClassFilter, setAttendanceClassFilter] = useState("");
  const [attendanceDateFilter, setAttendanceDateFilter] = useState("");

  const [tuitionSearch, setTuitionSearch] = useState("");
  const [tuitionClassFilter, setTuitionClassFilter] = useState("");
  const [tuitionDebtFilter, setTuitionDebtFilter] = useState("");

  const [scheduleClassFilter, setScheduleClassFilter] = useState("");
  const [scheduleDayFilter, setScheduleDayFilter] = useState("");

  const [dashboardFrom, setDashboardFrom] = useState("");
  const [dashboardTo, setDashboardTo] = useState("");

  // ---- Google Sheets sync ----
  const [gToken, setGToken] = useState<string | null>(accessToken || null);
  const [gSpreadsheetId, setGSpreadsheetId] = useState<string>(() => localStorage.getItem(SPREADSHEET_KEY) || "");
  const [gSheetsList, setGSheetsList] = useState<any[]>([]);
  const [showSyncPanel, setShowSyncPanel] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [newSheetTitle, setNewSheetTitle] = useState("Trung tâm - Dữ liệu quản lý");

  useEffect(() => {
    if (gSpreadsheetId) localStorage.setItem(SPREADSHEET_KEY, gSpreadsheetId);
  }, [gSpreadsheetId]);

  const connectGoogle = async () => {
    setSyncMsg(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setGToken(result.accessToken);
        const sheets = await listGoogleSheets(result.accessToken);
        setGSheetsList(sheets);
      }
    } catch (e: any) {
      setSyncMsg({ type: "error", text: e.message || "Lỗi đăng nhập Google" });
    }
  };

  const refreshSheetList = async () => {
    if (!gToken) return;
    try {
      setGSheetsList(await listGoogleSheets(gToken));
    } catch (e: any) {
      setSyncMsg({ type: "error", text: e.message });
    }
  };

  const handleCreateSheet = async () => {
    if (!gToken || !newSheetTitle.trim()) return;
    setSyncing(true);
    setSyncMsg(null);
    try {
      const created = await createGoogleSheet(gToken, newSheetTitle.trim());
      setGSpreadsheetId(created.id);
      await refreshSheetList();
      setSyncMsg({ type: "success", text: "Đã tạo Google Sheet mới." });
    } catch (e: any) {
      setSyncMsg({ type: "error", text: e.message });
    } finally {
      setSyncing(false);
    }
  };

  const handleExportToSheet = async () => {
    if (!gToken || !gSpreadsheetId) return;
    setSyncing(true);
    setSyncMsg(null);
    try {
      await ensureSpreadsheetTabs(gToken, gSpreadsheetId, Object.values(TAB_NAMES));
      await writeNamedTabValues(gToken, gSpreadsheetId, TAB_NAMES.students, STUDENT_HEADERS,
        data.students.map((s) => [s.id, s.hoTen, s.gioiTinh, s.ngaySinh, s.sdt, s.email, s.diaChi, s.phuHuynh, s.sdtPhuHuynh, s.lopId, s.trangThai, s.ngayGhiDanh, s.ghiChu]));
      await writeNamedTabValues(gToken, gSpreadsheetId, TAB_NAMES.teachers, teacherHeaders,
        data.teachers.map((t) => [t.id, t.hoTen, t.sdt, t.email, t.chuyenMon, t.trangThai]));
      await writeNamedTabValues(gToken, gSpreadsheetId, TAB_NAMES.courses, courseHeaders,
        data.courses.map((c) => [c.id, c.tenKhoaHoc, c.hocPhi, c.thoiLuong, c.trangThai]));
      await writeNamedTabValues(gToken, gSpreadsheetId, TAB_NAMES.classes, classHeaders,
        data.classes.map((c) => [c.id, c.tenLop, c.khoaHocId, c.giaoVienId, c.phongId, c.siSoToiDa, c.trangThai]));
      await writeNamedTabValues(gToken, gSpreadsheetId, TAB_NAMES.rooms, roomHeaders,
        data.rooms.map((r) => [r.id, r.tenPhong, r.sucChua, r.trangThai]));
      await writeNamedTabValues(gToken, gSpreadsheetId, TAB_NAMES.attendance, attendanceHeaders,
        data.attendance.map((a) => [a.id, a.ngay, a.lopId, a.hocVienId, a.trangThai, a.ghiChu]));
      await writeNamedTabValues(gToken, gSpreadsheetId, TAB_NAMES.tuition, tuitionHeaders,
        data.tuition.map((t) => [t.id, t.hocVienId, t.lopId, t.soTien, t.daDong, t.ngayThu, t.hinhThuc, t.ghiChu]));
      await writeNamedTabValues(gToken, gSpreadsheetId, TAB_NAMES.schedule, scheduleHeaders,
        data.schedule.map((s) => [s.id, s.thu, s.lopId, s.giaoVienId, s.phongId, s.gioBatDau, s.gioKetThuc]));
      setSyncMsg({ type: "success", text: "Đã đồng bộ toàn bộ dữ liệu lên Google Sheet." });
    } catch (e: any) {
      setSyncMsg({ type: "error", text: e.message || "Lỗi khi đồng bộ lên Google Sheet" });
    } finally {
      setSyncing(false);
    }
  };

  const handleImportFromSheet = async () => {
    if (!gToken || !gSpreadsheetId) return;
    setSyncing(true);
    setSyncMsg(null);
    try {
      const [studentRows, teacherRows, courseRows, classRows, roomRows, attendanceRows, tuitionRows, scheduleRows] = await Promise.all([
        readNamedTabValues(gToken, gSpreadsheetId, TAB_NAMES.students),
        readNamedTabValues(gToken, gSpreadsheetId, TAB_NAMES.teachers),
        readNamedTabValues(gToken, gSpreadsheetId, TAB_NAMES.courses),
        readNamedTabValues(gToken, gSpreadsheetId, TAB_NAMES.classes),
        readNamedTabValues(gToken, gSpreadsheetId, TAB_NAMES.rooms),
        readNamedTabValues(gToken, gSpreadsheetId, TAB_NAMES.attendance),
        readNamedTabValues(gToken, gSpreadsheetId, TAB_NAMES.tuition),
        readNamedTabValues(gToken, gSpreadsheetId, TAB_NAMES.schedule)
      ]);

      const next: CenterData = {
        students: studentRows.map((r) => ({
          id: r[0] || "", hoTen: r[1] || "", gioiTinh: (r[2] as Gender) || "Nam", ngaySinh: r[3] || "", sdt: r[4] || "",
          email: r[5] || "", diaChi: r[6] || "", phuHuynh: r[7] || "", sdtPhuHuynh: r[8] || "", lopId: r[9] || "",
          trangThai: (r[10] as StudentStatus) || "Đang học", ngayGhiDanh: r[11] || "", ghiChu: r[12] || ""
        })),
        teachers: teacherRows.map((r) => ({ id: r[0] || "", hoTen: r[1] || "", sdt: r[2] || "", email: r[3] || "", chuyenMon: r[4] || "", trangThai: (r[5] as ActiveStatus) || "Hoạt động" })),
        courses: courseRows.map((r) => ({ id: r[0] || "", tenKhoaHoc: r[1] || "", hocPhi: parseFloat(r[2] || "0") || 0, thoiLuong: r[3] || "", trangThai: (r[4] as ActiveStatus) || "Hoạt động" })),
        classes: classRows.map((r) => ({ id: r[0] || "", tenLop: r[1] || "", khoaHocId: r[2] || "", giaoVienId: r[3] || "", phongId: r[4] || "", siSoToiDa: parseInt(r[5] || "0", 10) || 0, trangThai: (r[6] as ClassStatus) || "Đang học" })),
        rooms: roomRows.map((r) => ({ id: r[0] || "", tenPhong: r[1] || "", sucChua: parseInt(r[2] || "0", 10) || 0, trangThai: (r[3] as RoomStatus) || "Sẵn sàng" })),
        attendance: attendanceRows.map((r) => ({ id: r[0] || "", ngay: r[1] || "", lopId: r[2] || "", hocVienId: r[3] || "", trangThai: (r[4] as AttendanceStatus) || "Có mặt", ghiChu: r[5] || "" })),
        tuition: tuitionRows.map((r) => ({ id: r[0] || "", hocVienId: r[1] || "", lopId: r[2] || "", soTien: parseFloat(r[3] || "0") || 0, daDong: parseFloat(r[4] || "0") || 0, ngayThu: r[5] || "", hinhThuc: (r[6] as PaymentMethod) || "Tiền mặt", ghiChu: r[7] || "" })),
        schedule: scheduleRows.map((r) => ({ id: r[0] || "", thu: r[1] || "", lopId: r[2] || "", giaoVienId: r[3] || "", phongId: r[4] || "", gioBatDau: r[5] || "", gioKetThuc: r[6] || "" }))
      };
      setData(next);
      setSyncMsg({ type: "success", text: "Đã tải dữ liệu từ Google Sheet về." });
    } catch (e: any) {
      setSyncMsg({ type: "error", text: e.message || "Lỗi khi tải dữ liệu từ Google Sheet" });
    } finally {
      setSyncing(false);
    }
  };

  // ---- derived dashboard stats ----
  const tuitionInRange = data.tuition.filter((t) => (!dashboardFrom || t.ngayThu >= dashboardFrom) && (!dashboardTo || t.ngayThu <= dashboardTo));
  const tienMat = tuitionInRange.filter((t) => t.hinhThuc === "Tiền mặt").reduce((s, t) => s + t.daDong, 0);
  const chuyenKhoan = tuitionInRange.filter((t) => t.hinhThuc === "Chuyển khoản").reduce((s, t) => s + t.daDong, 0);
  const tongDoanhThu = tienMat + chuyenKhoan;
  const congNo = data.tuition.reduce((s, t) => s + Math.max(t.soTien - t.daDong, 0), 0);
  const lopDangHoc = data.classes.filter((c) => c.trangThai === "Đang học").length;
  const today = todayISO();
  const attendanceToday = data.attendance.filter((a) => a.ngay === today);
  const attendanceTodayPresent = attendanceToday.filter((a) => a.trangThai === "Có mặt").length;

  const revenueByClass = data.classes.map((c) => ({
    cls: c,
    enrolled: data.students.filter((s) => s.lopId === c.id).length,
    revenue: data.tuition.filter((t) => t.lopId === c.id).reduce((s, t) => s + t.daDong, 0)
  }));
  const maxClassRevenue = Math.max(1, ...revenueByClass.map((r) => r.revenue));

  const studentsByStatus = data.students.reduce<Record<string, number>>((acc, s) => {
    acc[s.trangThai] = (acc[s.trangThai] || 0) + 1;
    return acc;
  }, {});

  const filteredStudents = data.students.filter(
    (s) =>
      (s.hoTen.toLowerCase().includes(studentSearch.toLowerCase()) || s.sdt.includes(studentSearch) || s.email.toLowerCase().includes(studentSearch.toLowerCase())) &&
      (!studentClassFilter || s.lopId === studentClassFilter) &&
      (!studentStatusFilter || s.trangThai === studentStatusFilter)
  );

  const filteredTeachers = data.teachers.filter(
    (t) =>
      (t.hoTen.toLowerCase().includes(teacherSearch.toLowerCase()) || t.sdt.includes(teacherSearch) || t.email.toLowerCase().includes(teacherSearch.toLowerCase())) &&
      (!teacherStatusFilter || t.trangThai === teacherStatusFilter)
  );

  const filteredCourses = data.courses.filter((c) => c.tenKhoaHoc.toLowerCase().includes(courseSearch.toLowerCase()) && (!courseStatusFilter || c.trangThai === courseStatusFilter));

  const filteredClasses = data.classes.filter(
    (c) => c.tenLop.toLowerCase().includes(classSearch.toLowerCase()) && (!classCourseFilter || c.khoaHocId === classCourseFilter) && (!classStatusFilter || c.trangThai === classStatusFilter)
  );

  const filteredRooms = data.rooms.filter((r) => r.tenPhong.toLowerCase().includes(roomSearch.toLowerCase()) && (!roomStatusFilter || r.trangThai === roomStatusFilter));

  const filteredAttendance = data.attendance.filter((a) => (!attendanceClassFilter || a.lopId === attendanceClassFilter) && (!attendanceDateFilter || a.ngay === attendanceDateFilter));

  const filteredTuition = data.tuition.filter((t) => {
    const hasDebt = t.soTien - t.daDong > 0;
    const matchesDebt = !tuitionDebtFilter || (tuitionDebtFilter === "debt" ? hasDebt : !hasDebt);
    return (
      (getStudentName(t.hocVienId).toLowerCase().includes(tuitionSearch.toLowerCase())) &&
      (!tuitionClassFilter || t.lopId === tuitionClassFilter) &&
      matchesDebt
    );
  });

  const filteredSchedule = data.schedule.filter((s) => (!scheduleClassFilter || s.lopId === scheduleClassFilter) && (!scheduleDayFilter || s.thu === scheduleDayFilter));

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans" id="center-management-root">
      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-blue-900 to-blue-950 text-white flex flex-col transition-transform ${mobileNavOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
          <div className="p-2 bg-white/10 rounded-xl">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">Trung Tâm An Tâm</p>
            <p className="text-[10px] text-blue-200">Quản lý trung tâm</p>
          </div>
        </div>
        <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActivePage(item.key);
                setMobileNavOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activePage === item.key ? "bg-white text-blue-900 shadow-sm" : "text-blue-100 hover:bg-white/10"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={onExit} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-blue-100 hover:bg-white/10 cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Quay lại ứng dụng
          </button>
        </div>
      </aside>

      {mobileNavOpen && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setMobileNavOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileNavOpen(true)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg md:hidden cursor-pointer">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-slate-800">{NAV_ITEMS.find((n) => n.key === activePage)?.label}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-slate-500">{currentUserName || "Quản trị viên"}</span>
            <button
              onClick={() => setShowSyncPanel(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-lg cursor-pointer"
            >
              <Cloud className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đồng bộ Google Sheets</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
          {activePage === "dashboard" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-slate-800">Dashboard Tổng Quan</h2>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Từ</span>
                  <input type="date" value={dashboardFrom} onChange={(e) => setDashboardFrom(e.target.value)} className="px-2 py-1.5 border border-slate-200 rounded-lg" />
                  <span className="text-slate-400">Đến</span>
                  <input type="date" value={dashboardTo} onChange={(e) => setDashboardTo(e.target.value)} className="px-2 py-1.5 border border-slate-200 rounded-lg" />
                  {(dashboardFrom || dashboardTo) && (
                    <button
                      onClick={() => {
                        setDashboardFrom("");
                        setDashboardTo("");
                      }}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Tổng học viên" value={data.students.length} icon={<Users className="w-4 h-4" />} tone="bg-blue-50 text-blue-600 border-blue-100" />
                <StatCard label="Tổng doanh thu" value={formatVND(tongDoanhThu)} icon={<Wallet className="w-4 h-4" />} tone="bg-emerald-50 text-emerald-600 border-emerald-100" />
                <StatCard label="Tiền mặt" value={formatVND(tienMat)} icon={<Banknote className="w-4 h-4" />} tone="bg-amber-50 text-amber-600 border-amber-100" />
                <StatCard label="Chuyển khoản" value={formatVND(chuyenKhoan)} icon={<CreditCard className="w-4 h-4" />} tone="bg-indigo-50 text-indigo-600 border-indigo-100" />
                <StatCard label="Lớp đang học" value={`${lopDangHoc}/${data.classes.length}`} icon={<Layers className="w-4 h-4" />} tone="bg-blue-50 text-blue-600 border-blue-100" />
                <StatCard label="Công nợ" value={formatVND(congNo)} icon={<AlertTriangle className="w-4 h-4" />} tone="bg-rose-50 text-rose-600 border-rose-100" />
                <StatCard label="Giáo viên" value={data.teachers.length} icon={<UserCheck className="w-4 h-4" />} tone="bg-emerald-50 text-emerald-600 border-emerald-100" />
                <StatCard label="Điểm danh hôm nay" value={`${attendanceTodayPresent}/${attendanceToday.length}`} icon={<CalendarCheck className="w-4 h-4" />} tone="bg-amber-50 text-amber-600 border-amber-100" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Doanh thu theo lớp</h3>
                  <div className="space-y-3">
                    {revenueByClass.map(({ cls, enrolled, revenue }) => (
                      <div key={cls.id}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-semibold text-slate-700">
                            {cls.tenLop} ({cls.id}) · {enrolled}/{cls.siSoToiDa} HV
                          </span>
                          <span className="text-slate-500">{formatVND(revenue)}</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(revenue / maxClassRevenue) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Trạng thái học viên</h3>
                  <div className="space-y-2 text-xs">
                    {Object.entries(studentsByStatus).map(([status, count]) => (
                      <div key={status} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                        <StatusBadge status={status} />
                        <span className="font-bold text-slate-700">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePage === "students" && (
            <ListPage
              icon={<Users className="w-5 h-5 text-blue-600" />}
              title="Quản lý Học viên"
              rows={filteredStudents}
              totalCount={data.students.length}
              search={studentSearch}
              onSearchChange={setStudentSearch}
              searchPlaceholder="Tìm tên, SĐT, Email..."
              filters={[
                { label: "Tất cả lớp", value: studentClassFilter, onChange: setStudentClassFilter, options: data.classes.map((c) => ({ value: c.id, label: c.tenLop })) },
                {
                  label: "Tất cả trạng thái",
                  value: studentStatusFilter,
                  onChange: setStudentStatusFilter,
                  options: [
                    { value: "Đang học", label: "Đang học" },
                    { value: "Bảo lưu", label: "Bảo lưu" },
                    { value: "Đã nghỉ", label: "Đã nghỉ" }
                  ]
                }
              ]}
              addLabel="Thêm học viên"
              onAdd={() => openAdd("students", { gioiTinh: "Nam", trangThai: "Đang học", ngayGhiDanh: todayISO(), lopId: "" })}
              onEdit={(row) => openEdit("students", row)}
              onDelete={(row) => handleDelete("students", row, row.hoTen)}
              onExport={() => exportCsv("hoc-vien.csv", STUDENT_HEADERS, filteredStudents.map((s) => [s.id, s.hoTen, s.gioiTinh, s.ngaySinh, s.sdt, s.email, s.diaChi, s.phuHuynh, s.sdtPhuHuynh, getClassLabel(s.lopId), s.trangThai, s.ngayGhiDanh, s.ghiChu]))}
              columns={[
                { key: "hoTen", label: "Học viên", render: (s) => <div><p className="font-semibold text-slate-800">{s.hoTen}</p><p className="text-[10px] text-slate-400">{s.id} · {s.email}</p></div> },
                { key: "gioiTinh", label: "Giới tính", render: (s) => s.gioiTinh },
                { key: "ngaySinh", label: "Ngày sinh", render: (s) => s.ngaySinh },
                { key: "sdt", label: "SĐT", render: (s) => s.sdt },
                { key: "lop", label: "Lớp", render: (s) => getClassLabel(s.lopId) },
                { key: "trangThai", label: "Trạng thái", render: (s) => <StatusBadge status={s.trangThai} /> }
              ]}
            />
          )}

          {activePage === "teachers" && (
            <ListPage
              icon={<UserCheck className="w-5 h-5 text-blue-600" />}
              title="Quản lý Giáo viên"
              rows={filteredTeachers}
              totalCount={data.teachers.length}
              search={teacherSearch}
              onSearchChange={setTeacherSearch}
              searchPlaceholder="Tìm giáo viên..."
              filters={[
                {
                  label: "Tất cả trạng thái",
                  value: teacherStatusFilter,
                  onChange: setTeacherStatusFilter,
                  options: [
                    { value: "Hoạt động", label: "Hoạt động" },
                    { value: "Ngừng", label: "Ngừng" }
                  ]
                }
              ]}
              addLabel="Thêm giáo viên"
              onAdd={() => openAdd("teachers", { trangThai: "Hoạt động" })}
              onEdit={(row) => openEdit("teachers", row)}
              onDelete={(row) => handleDelete("teachers", row, row.hoTen)}
              onExport={() => exportCsv("giao-vien.csv", teacherHeaders, filteredTeachers.map((t) => [t.id, t.hoTen, t.sdt, t.email, t.chuyenMon, t.trangThai]))}
              columns={[
                { key: "hoTen", label: "Giáo viên", render: (t) => <div><p className="font-semibold text-slate-800">{t.hoTen}</p><p className="text-[10px] text-slate-400">{t.id}</p></div> },
                { key: "sdt", label: "SĐT", render: (t) => t.sdt },
                { key: "email", label: "Email", render: (t) => t.email },
                { key: "chuyenMon", label: "Chuyên môn", render: (t) => <StatusBadge status={t.chuyenMon} /> },
                { key: "trangThai", label: "Trạng thái", render: (t) => <StatusBadge status={t.trangThai} /> }
              ]}
            />
          )}

          {activePage === "courses" && (
            <ListPage
              icon={<BookOpen className="w-5 h-5 text-blue-600" />}
              title="Quản lý Khóa học"
              rows={filteredCourses}
              totalCount={data.courses.length}
              search={courseSearch}
              onSearchChange={setCourseSearch}
              searchPlaceholder="Tìm khóa học..."
              filters={[
                {
                  label: "Tất cả trạng thái",
                  value: courseStatusFilter,
                  onChange: setCourseStatusFilter,
                  options: [
                    { value: "Hoạt động", label: "Hoạt động" },
                    { value: "Ngừng", label: "Ngừng" }
                  ]
                }
              ]}
              addLabel="Thêm khóa học"
              onAdd={() => openAdd("courses", { trangThai: "Hoạt động" })}
              onEdit={(row) => openEdit("courses", row)}
              onDelete={(row) => handleDelete("courses", row, row.tenKhoaHoc)}
              onExport={() => exportCsv("khoa-hoc.csv", courseHeaders, filteredCourses.map((c) => [c.id, c.tenKhoaHoc, c.hocPhi, c.thoiLuong, c.trangThai]))}
              columns={[
                { key: "id", label: "Mã", render: (c) => c.id },
                { key: "tenKhoaHoc", label: "Tên khóa học", render: (c) => <span className="font-semibold text-slate-800">{c.tenKhoaHoc}</span> },
                { key: "hocPhi", label: "Học phí", render: (c) => <span className="text-emerald-600 font-semibold">{formatVND(c.hocPhi)}</span> },
                { key: "thoiLuong", label: "Thời lượng", render: (c) => c.thoiLuong },
                { key: "trangThai", label: "Trạng thái", render: (c) => <StatusBadge status={c.trangThai} /> }
              ]}
            />
          )}

          {activePage === "classes" && (
            <ListPage
              icon={<Layers className="w-5 h-5 text-blue-600" />}
              title="Quản lý Lớp học"
              rows={filteredClasses}
              totalCount={data.classes.length}
              search={classSearch}
              onSearchChange={setClassSearch}
              searchPlaceholder="Tìm lớp học..."
              filters={[
                { label: "Tất cả khóa học", value: classCourseFilter, onChange: setClassCourseFilter, options: data.courses.map((c) => ({ value: c.id, label: c.tenKhoaHoc })) },
                {
                  label: "Tất cả trạng thái",
                  value: classStatusFilter,
                  onChange: setClassStatusFilter,
                  options: [
                    { value: "Đang học", label: "Đang học" },
                    { value: "Chưa khai giảng", label: "Chưa khai giảng" },
                    { value: "Kết thúc", label: "Kết thúc" }
                  ]
                }
              ]}
              addLabel="Thêm lớp học"
              onAdd={() => openAdd("classes", { trangThai: "Chưa khai giảng", siSoToiDa: 20 })}
              onEdit={(row) => openEdit("classes", row)}
              onDelete={(row) => handleDelete("classes", row, row.tenLop)}
              onExport={() => exportCsv("lop-hoc.csv", classHeaders, filteredClasses.map((c) => [c.id, c.tenLop, getCourseName(c.khoaHocId), getTeacherName(c.giaoVienId), getRoomName(c.phongId), c.siSoToiDa, c.trangThai]))}
              columns={[
                { key: "tenLop", label: "Lớp", render: (c) => <div><p className="font-semibold text-slate-800">{c.tenLop}</p><p className="text-[10px] text-slate-400">{c.id}</p></div> },
                { key: "khoaHoc", label: "Khóa học", render: (c) => getCourseName(c.khoaHocId) },
                { key: "giaoVien", label: "Giáo viên", render: (c) => getTeacherName(c.giaoVienId) },
                { key: "phong", label: "Phòng", render: (c) => getRoomName(c.phongId) },
                { key: "siSo", label: "Sĩ số", render: (c) => `${data.students.filter((s) => s.lopId === c.id).length}/${c.siSoToiDa}` },
                { key: "trangThai", label: "Trạng thái", render: (c) => <StatusBadge status={c.trangThai} /> }
              ]}
            />
          )}

          {activePage === "rooms" && (
            <ListPage
              icon={<DoorOpen className="w-5 h-5 text-blue-600" />}
              title="Quản lý Phòng học"
              rows={filteredRooms}
              totalCount={data.rooms.length}
              search={roomSearch}
              onSearchChange={setRoomSearch}
              searchPlaceholder="Tìm phòng học..."
              filters={[
                {
                  label: "Tất cả trạng thái",
                  value: roomStatusFilter,
                  onChange: setRoomStatusFilter,
                  options: [
                    { value: "Sẵn sàng", label: "Sẵn sàng" },
                    { value: "Đang sử dụng", label: "Đang sử dụng" },
                    { value: "Bảo trì", label: "Bảo trì" }
                  ]
                }
              ]}
              addLabel="Thêm phòng học"
              onAdd={() => openAdd("rooms", { trangThai: "Sẵn sàng", sucChua: 20 })}
              onEdit={(row) => openEdit("rooms", row)}
              onDelete={(row) => handleDelete("rooms", row, row.tenPhong)}
              onExport={() => exportCsv("phong-hoc.csv", roomHeaders, filteredRooms.map((r) => [r.id, r.tenPhong, r.sucChua, r.trangThai]))}
              columns={[
                { key: "id", label: "Mã", render: (r) => r.id },
                { key: "tenPhong", label: "Tên phòng", render: (r) => <span className="font-semibold text-slate-800">{r.tenPhong}</span> },
                { key: "sucChua", label: "Sức chứa", render: (r) => `${r.sucChua} chỗ` },
                { key: "trangThai", label: "Trạng thái", render: (r) => <StatusBadge status={r.trangThai} /> }
              ]}
            />
          )}

          {activePage === "attendance" && (
            <ListPage
              icon={<CalendarCheck className="w-5 h-5 text-blue-600" />}
              title="Điểm danh"
              rows={filteredAttendance}
              totalCount={data.attendance.length}
              filters={[
                { label: "Tất cả lớp", value: attendanceClassFilter, onChange: setAttendanceClassFilter, options: data.classes.map((c) => ({ value: c.id, label: c.tenLop })) }
              ]}
              dateFilters={[{ label: "Ngày", value: attendanceDateFilter, onChange: setAttendanceDateFilter }]}
              addLabel="Điểm danh"
              onAdd={() => openAdd("attendance", { ngay: todayISO(), trangThai: "Có mặt" })}
              onEdit={(row) => openEdit("attendance", row)}
              onDelete={(row) => handleDelete("attendance", row, `${getStudentName(row.hocVienId)} - ${row.ngay}`)}
              onExport={() => exportCsv("diem-danh.csv", attendanceHeaders, filteredAttendance.map((a) => [a.id, a.ngay, getClassLabel(a.lopId), getStudentName(a.hocVienId), a.trangThai, a.ghiChu]))}
              columns={[
                { key: "ngay", label: "Ngày", render: (a) => a.ngay },
                { key: "lop", label: "Lớp", render: (a) => getClassLabel(a.lopId) },
                { key: "hocVien", label: "Học viên", render: (a) => getStudentName(a.hocVienId) },
                { key: "trangThai", label: "Trạng thái", render: (a) => <StatusBadge status={a.trangThai} /> },
                { key: "ghiChu", label: "Ghi chú", render: (a) => a.ghiChu || "—" }
              ]}
            />
          )}

          {activePage === "tuition" && (
            <ListPage
              icon={<Wallet className="w-5 h-5 text-blue-600" />}
              title="Quản lý Học phí"
              rows={filteredTuition}
              totalCount={data.tuition.length}
              search={tuitionSearch}
              onSearchChange={setTuitionSearch}
              searchPlaceholder="Tìm học viên..."
              filters={[
                { label: "Tất cả lớp", value: tuitionClassFilter, onChange: setTuitionClassFilter, options: data.classes.map((c) => ({ value: c.id, label: c.tenLop })) },
                {
                  label: "Tình trạng nợ",
                  value: tuitionDebtFilter,
                  onChange: setTuitionDebtFilter,
                  options: [
                    { value: "debt", label: "Còn nợ" },
                    { value: "paid", label: "Đã đủ" }
                  ]
                }
              ]}
              addLabel="Lập phiếu thu"
              onAdd={() => openAdd("tuition", { ngayThu: todayISO(), hinhThuc: "Tiền mặt", daDong: 0 })}
              onEdit={(row) => openEdit("tuition", row)}
              onDelete={(row) => handleDelete("tuition", row, row.id)}
              onExport={() =>
                exportCsv(
                  "hoc-phi.csv",
                  tuitionHeaders,
                  filteredTuition.map((t) => [t.id, getStudentName(t.hocVienId), getClassLabel(t.lopId), t.soTien, t.daDong, t.ngayThu, t.hinhThuc, t.ghiChu])
                )
              }
              columns={[
                { key: "id", label: "Mã phiếu", render: (t) => t.id },
                { key: "hocVien", label: "Học viên", render: (t) => getStudentName(t.hocVienId) },
                { key: "lop", label: "Lớp", render: (t) => getClassLabel(t.lopId) },
                { key: "soTien", label: "Số tiền", render: (t) => formatVND(t.soTien) },
                { key: "daDong", label: "Đã đóng", render: (t) => <span className="text-emerald-600 font-semibold">{formatVND(t.daDong)}</span> },
                {
                  key: "conNo",
                  label: "Còn nợ",
                  render: (t) => (t.soTien - t.daDong > 0 ? <span className="text-rose-600 font-semibold">{formatVND(t.soTien - t.daDong)}</span> : <span className="text-emerald-600 font-semibold flex items-center gap-1">✓ Đã đủ</span>)
                },
                { key: "ngayThu", label: "Ngày thu", render: (t) => t.ngayThu },
                { key: "hinhThuc", label: "Hình thức", render: (t) => <StatusBadge status={t.hinhThuc} /> }
              ]}
            />
          )}

          {activePage === "schedule" && (
            <ListPage
              icon={<CalendarDays className="w-5 h-5 text-blue-600" />}
              title="Thời khóa biểu"
              rows={filteredSchedule}
              totalCount={data.schedule.length}
              filters={[
                { label: "Tất cả lớp", value: scheduleClassFilter, onChange: setScheduleClassFilter, options: data.classes.map((c) => ({ value: c.id, label: c.tenLop })) },
                { label: "Tất cả các thứ", value: scheduleDayFilter, onChange: setScheduleDayFilter, options: WEEKDAYS.map((w) => ({ value: w, label: w })) }
              ]}
              addLabel="Thêm lịch"
              onAdd={() => openAdd("schedule", { thu: "Thứ 2", gioBatDau: "18:00", gioKetThuc: "20:00" })}
              onEdit={(row) => openEdit("schedule", row)}
              onDelete={(row) => handleDelete("schedule", row, `${row.thu} - ${getClassLabel(row.lopId)}`)}
              onExport={() =>
                exportCsv(
                  "thoi-khoa-bieu.csv",
                  scheduleHeaders,
                  filteredSchedule.map((s) => [s.id, s.thu, getClassLabel(s.lopId), getTeacherName(s.giaoVienId), getRoomName(s.phongId), s.gioBatDau, s.gioKetThuc])
                )
              }
              columns={[
                { key: "thu", label: "Thứ", render: (s) => <span className="font-semibold text-slate-800">{s.thu}</span> },
                { key: "lop", label: "Lớp", render: (s) => getClassLabel(s.lopId) },
                { key: "giaoVien", label: "Giáo viên", render: (s) => getTeacherName(s.giaoVienId) },
                { key: "phong", label: "Phòng", render: (s) => getRoomName(s.phongId) },
                { key: "batDau", label: "Bắt đầu", render: (s) => s.gioBatDau },
                { key: "ketThuc", label: "Kết thúc", render: (s) => s.gioKetThuc }
              ]}
            />
          )}
        </main>
      </div>

      {modalEntity && (
        <FormModal
          title={modalMode === "add" ? `Thêm ${ENTITY_LABEL[modalEntity]}` : `Sửa ${ENTITY_LABEL[modalEntity]}`}
          fields={getFieldsFor(modalEntity)}
          values={formValues}
          onChange={handleFormChange}
          onCancel={closeModal}
          onSubmit={handleSubmit}
        />
      )}

      {showSyncPanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" onClick={() => setShowSyncPanel(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Cloud className="w-4 h-4 text-blue-600" /> Đồng bộ Google Sheets
              </h3>
              <button onClick={() => setShowSyncPanel(false)} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4 text-sm">
              {!gToken ? (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500">Kết nối tài khoản Google để đồng bộ dữ liệu trung tâm lên một Google Sheet (mỗi module là một tab riêng).</p>
                  <button onClick={connectGoogle} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer">
                    Kết nối Google
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Chọn Google Sheet</label>
                    <div className="flex gap-2">
                      <select
                        value={gSpreadsheetId}
                        onChange={(e) => setGSpreadsheetId(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      >
                        <option value="">— Chọn sheet —</option>
                        {gSheetsList.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                      <button onClick={refreshSheetList} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer" title="Làm mới danh sách">
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Hoặc tạo Sheet mới</label>
                    <div className="flex gap-2">
                      <input
                        value={newSheetTitle}
                        onChange={(e) => setNewSheetTitle(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      />
                      <button onClick={handleCreateSheet} disabled={syncing} className="px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-lg cursor-pointer disabled:opacity-50">
                        Tạo
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={handleExportToSheet}
                      disabled={!gSpreadsheetId || syncing}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer disabled:opacity-50"
                    >
                      <UploadCloud className="w-3.5 h-3.5" /> Tải lên Sheet
                    </button>
                    <button
                      onClick={handleImportFromSheet}
                      disabled={!gSpreadsheetId || syncing}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer disabled:opacity-50"
                    >
                      <DownloadCloud className="w-3.5 h-3.5" /> Tải về từ Sheet
                    </button>
                  </div>
                </div>
              )}

              {syncMsg && (
                <div className={`text-xs px-3 py-2 rounded-lg border ${syncMsg.type === "success" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-rose-50 text-rose-700 border-rose-100"}`}>
                  {syncMsg.text}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
