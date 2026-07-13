import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";
import firebaseConfig from "../firebase-applet-config.json";

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Add required Google Workspace scopes
provider.addScope("https://www.googleapis.com/auth/spreadsheets");
provider.addScope("https://www.googleapis.com/auth/drive.file");

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize auth state listener
export const initAuthListener = (
  onSuccess: (user: User, token: string) => void,
  onFailure: () => void
) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (cachedAccessToken) {
        onSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // Clear if not in the middle of active sign-in
        onFailure();
      }
    } else {
      cachedAccessToken = null;
      onFailure();
    }
  });
};

// Sign in with Google Popup
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("Không thể nhận Access Token từ Google OAuth");
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error("Lỗi đăng nhập Google:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

// Sign out
export const googleSignOut = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

// List spreadsheets in Google Drive
export const listGoogleSheets = async (accessToken: string): Promise<any[]> => {
  const query = encodeURIComponent("mimeType='application/vnd.google-apps.spreadsheet' and trashed=false");
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink)&pageSize=30`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Lỗi khi tải danh sách Google Sheets từ Drive");
    }
    const data = await res.json();
    return data.files || [];
  } catch (error) {
    console.error("listGoogleSheets Error:", error);
    throw error;
  }
};

// Create a new Google Spreadsheet
export const createGoogleSheet = async (accessToken: string, title: string): Promise<{ id: string; url: string }> => {
  const url = "https://sheets.googleapis.com/v4/spreadsheets";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          title: title,
        },
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || "Lỗi khi tạo Google Sheet mới");
    }

    const data = await res.json();
    return {
      id: data.spreadsheetId,
      url: data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}/edit`,
    };
  } catch (error) {
    console.error("createGoogleSheet Error:", error);
    throw error;
  }
};

const writeSheetValues = async (accessToken: string, spreadsheetId: string, values: any[][], range: string = "Sheet1!A1") => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=RAW`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error?.message || "Lỗi khi ghi dữ liệu lên Google Sheet");
  }
};

const readSheetValues = async (accessToken: string, spreadsheetId: string, range: string, requireData: boolean = true): Promise<any[][]> => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error?.message || "Lỗi khi đọc dữ liệu từ Google Sheet");
  }
  const data = await res.json();
  const rows = data.values;
  if (!rows || rows.length <= 1) {
    if (requireData) {
      throw new Error("Google Sheet này không có dữ liệu hoặc chỉ có dòng tiêu đề.");
    }
    return [];
  }
  return rows.slice(1);
};

// --- Named-tab helpers: used by the Center Management module, which keeps
// one spreadsheet with a dedicated tab per entity (Students, Teachers, ...) ---

export const listSpreadsheetTabTitles = async (accessToken: string, spreadsheetId: string): Promise<string[]> => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties.title`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error?.message || "Lỗi khi đọc danh sách tab của Google Sheet");
  }
  const data = await res.json();
  return (data.sheets || []).map((s: any) => s.properties?.title).filter(Boolean);
};

export const ensureSpreadsheetTabs = async (accessToken: string, spreadsheetId: string, tabNames: string[]): Promise<void> => {
  const existing = await listSpreadsheetTabTitles(accessToken, spreadsheetId);
  const missing = tabNames.filter((t) => !existing.includes(t));
  if (missing.length === 0) return;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      requests: missing.map((title) => ({ addSheet: { properties: { title } } })),
    }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error?.message || "Lỗi khi tạo tab mới trên Google Sheet");
  }
};

export const writeNamedTabValues = async (
  accessToken: string,
  spreadsheetId: string,
  tabName: string,
  headers: string[],
  rows: any[][]
): Promise<void> => {
  await writeSheetValues(accessToken, spreadsheetId, [headers, ...rows], `${tabName}!A1`);
};

export const readNamedTabValues = async (
  accessToken: string,
  spreadsheetId: string,
  tabName: string
): Promise<any[][]> => {
  return readSheetValues(accessToken, spreadsheetId, `${tabName}!A1:Z2000`, false);
};

// --- Account file: Họ tên, Tài khoản, Mật khẩu, Khối ---

export const exportAccountsToGoogleSheet = async (
  accessToken: string,
  spreadsheetId: string,
  students: any[]
): Promise<void> => {
  const headers = ["Họ tên học sinh", "Tài khoản", "Mật khẩu", "Khối"];
  const rows = students.map((s) => [s.hoTen || "", s.taiKhoan || "", s.matKhau || "", s.khoi || "Lớp 8"]);
  try {
    await writeSheetValues(accessToken, spreadsheetId, [headers, ...rows]);
  } catch (error) {
    console.error("exportAccountsToGoogleSheet Error:", error);
    throw error;
  }
};

export const importAccountsFromGoogleSheet = async (accessToken: string, spreadsheetId: string): Promise<any[]> => {
  try {
    const rows = await readSheetValues(accessToken, spreadsheetId, "Sheet1!A1:D500");
    return rows.map((row) => ({
      hoTen: row[0] || "Học sinh",
      taiKhoan: row[1] || `hs_${Math.random().toString(36).substring(2, 7)}`,
      matKhau: row[2] || "123456",
      khoi: row[3] || "Lớp 8",
    }));
  } catch (error) {
    console.error("importAccountsFromGoogleSheet Error:", error);
    throw error;
  }
};

// --- Score file: Tài khoản, Họ tên, Điểm Toán, Điểm KHTN, Điểm Tiếng Anh, Điểm Văn ---

export const exportScoresToGoogleSheet = async (
  accessToken: string,
  spreadsheetId: string,
  students: any[]
): Promise<void> => {
  const headers = ["Tài khoản", "Họ tên học sinh", "Điểm Toán", "Điểm KHTN", "Điểm Tiếng Anh", "Điểm Văn"];
  const rows = students.map((s) => [
    s.taiKhoan || "",
    s.hoTen || "",
    s.diemToan ?? 0,
    s.diemKHTN ?? 0,
    s.diemTiengAnh ?? 0,
    s.diemVan ?? 0,
  ]);
  try {
    await writeSheetValues(accessToken, spreadsheetId, [headers, ...rows]);
  } catch (error) {
    console.error("exportScoresToGoogleSheet Error:", error);
    throw error;
  }
};

export const importScoresFromGoogleSheet = async (
  accessToken: string,
  spreadsheetId: string
): Promise<{ taiKhoan: string; diemToan: number; diemKHTN: number; diemTiengAnh: number; diemVan: number }[]> => {
  try {
    const rows = await readSheetValues(accessToken, spreadsheetId, "Sheet1!A1:F500");
    return rows
      .map((row) => ({
        taiKhoan: row[0] || "",
        diemToan: parseFloat(row[2] || "0") || 0,
        diemKHTN: parseFloat(row[3] || "0") || 0,
        diemTiengAnh: parseFloat(row[4] || "0") || 0,
        diemVan: parseFloat(row[5] || "0") || 0,
      }))
      .filter((r) => r.taiKhoan);
  } catch (error) {
    console.error("importScoresFromGoogleSheet Error:", error);
    throw error;
  }
};
