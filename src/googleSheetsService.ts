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

// Export student data to a Google Spreadsheet
export const exportToGoogleSheet = async (
  accessToken: string,
  spreadsheetId: string,
  students: any[]
): Promise<void> => {
  // We will write to 'Sheet1!A1'
  const range = "Sheet1!A1";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=RAW`;

  // Prepare values grid
  const headers = [
    "Họ tên học sinh",
    "Tài khoản",
    "Mật khẩu",
    "Điểm Toán",
    "Điểm KHTN",
    "Điểm Tiếng Anh",
    "Điểm Văn",
    "Khối học",
  ];

  const rows = students.map((s) => [
    s.hoTen || "",
    s.taiKhoan || "",
    s.matKhau || "",
    s.diemToan ?? 0,
    s.diemKHTN ?? 0,
    s.diemTiengAnh ?? 0,
    s.diemVan ?? 0,
    s.khoi || "Lớp 8",
  ]);

  const body = {
    values: [headers, ...rows],
  };

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || "Lỗi khi xuất dữ liệu sang Google Sheet");
    }
  } catch (error) {
    console.error("exportToGoogleSheet Error:", error);
    throw error;
  }
};

// Import student data from a Google Spreadsheet
export const importFromGoogleSheet = async (accessToken: string, spreadsheetId: string): Promise<any[]> => {
  const range = "Sheet1!A1:H100"; // Read first 100 rows
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || "Lỗi khi nhập dữ liệu từ Google Sheet");
    }

    const data = await res.json();
    const rows = data.values;
    if (!rows || rows.length <= 1) {
      throw new Error("Google Sheet này không có dữ liệu hoặc chỉ có dòng tiêu đề.");
    }

    // Header validation and mapping
    const headers = rows[0].map((h: string) => h.trim().toLowerCase());
    
    // Map data rows
    return rows.slice(1).map((row: any[]) => {
      return {
        hoTen: row[0] || "Học sinh",
        taiKhoan: row[1] || `hs_${Math.random().toString(36).substring(2, 7)}`,
        matKhau: row[2] || "123456",
        diemToan: parseFloat(row[3] || "0") || 0,
        diemKHTN: parseFloat(row[4] || "0") || 0,
        diemTiengAnh: parseFloat(row[5] || "0") || 0,
        diemVan: parseFloat(row[6] || "0") || 0,
        khoi: row[7] || "Lớp 8",
      };
    });
  } catch (error) {
    console.error("importFromGoogleSheet Error:", error);
    throw error;
  }
};
