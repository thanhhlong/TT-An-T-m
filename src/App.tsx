import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from "recharts";
import { CURRICULUM_DATA } from "./curriculumData";
import CurriculumViewer from "./components/CurriculumViewer";
import {
  Sparkles,
  BookOpen,
  User,
  Layers,
  Cpu,
  GraduationCap,
  CheckCircle,
  Copy,
  Check,
  RotateCcw,
  History,
  Trash2,
  Lightbulb,
  Play,
  Database,
  Menu,
  X,
  ChevronRight,
  Info,
  ExternalLink,
  BookOpenCheck,
  Award,
  Upload,
  FileJson,
  FileSpreadsheet,
  Lock,
  Shield,
  Users,
  LogOut,
  MessageSquare,
  Send,
  UserCheck,
  BarChart2,
  Settings,
  Key
} from "lucide-react";

const DEFAULT_JSON_DB = `[
  {
    "hoTen": "Nguyễn Hoàng Nam",
    "taiKhoan": "namnh6",
    "matKhau": "Nam@2026",
    "diemToan": 8.5,
    "diemKHTN": 7.2,
    "diemTiengAnh": 9.0,
    "diemVan": 8.0,
    "khoi": "Lớp 8"
  },
  {
    "hoTen": "Trần Thị Mai",
    "taiKhoan": "maitt7",
    "matKhau": "MaiMai#123",
    "diemToan": 9.5,
    "diemKHTN": 9.0,
    "diemTiengAnh": 8.2,
    "diemVan": 8.5,
    "khoi": "Lớp 9"
  },
  {
    "hoTen": "Phạm Minh Đức",
    "taiKhoan": "ducmm8",
    "matKhau": "DucDuc!456",
    "diemToan": 6.0,
    "diemKHTN": 5.5,
    "diemTiengAnh": 7.0,
    "diemVan": 6.5,
    "khoi": "Lớp 7"
  }
]`;

const DEFAULT_CSV_DB = `Họ tên học sinh,Tài khoản,Mật khẩu,Điểm Toán,Điểm KHTN,Điểm Tiếng Anh,Điểm Văn,Khối
Nguyễn Hoàng Nam,namnh6,Nam@2026,8.5,7.2,9.0,8.0,Lớp 8
Trần Thị Mai,maitt7,MaiMai#123,9.5,9.0,8.2,8.5,Lớp 9
Phạm Minh Đức,ducmm8,DucDuc!456,6.0,5.5,7.0,6.5,Lớp 7`;

interface GeneratedInstruction {
  id: string;
  timestamp: string;
  teacherName: string;
  subject: string;
  grade: string;
  coreIdea: string;
  coreFeatures: string;
  tone: string;
  explanationStyle: string;
  appName: string;
  conceptAnalysis: string;
  systemInstruction: string;
  testInstructions: string;
  upgradeSuggestions: string;
  sampleDatabase: string;
}

const PRESETS = [
  {
    id: "preset-it-6",
    teacherName: "Thầy Nguyễn Văn A",
    subject: "Tin học",
    grade: "Lớp 6, Lớp 7 (THCS)",
    coreIdea: "Trợ lý giúp học sinh ôn tập và làm quen với tư duy lập trình kéo thả Scratch. Giải thích các khái niệm vòng lặp, điều kiện một cách trực quan, vui vẻ thông qua ví dụ thực tế.",
    coreFeatures: "- Sinh các thử thách lập trình ngắn theo chủ đề\n- Hướng dẫn sửa lỗi code Scratch qua mô tả\n- Chấm điểm bài làm lý thuyết và đưa ra lời khuyên động viên",
    tone: "Thân thiện, khích lệ & Sáng tạo",
    explanationStyle: "Đặt câu hỏi gợi mở (Scaffolding)",
    tag: "Tin học"
  },
  {
    id: "preset-math-9",
    teacherName: "Cô Lê Thị B",
    subject: "Toán học",
    grade: "Lớp 9 (THCS)",
    coreIdea: "Gia sư ảo hỗ trợ học sinh ôn tập kiến thức hình học ôn thi vào 10, tập trung vào chủ đề Hệ thức lượng trong tam giác vuông và Đường tròn. Giúp học sinh tự tin chứng minh hình học.",
    coreFeatures: "- Gợi ý các bước vẽ hình phụ khi bí bài\n- Đưa ra bài tập tự luận và chấm điểm chi tiết\n- Phân tích các lỗi sai hình học phổ biến",
    tone: "Nghiêm túc, mô phạm & Kiên nhẫn",
    explanationStyle: "Từng bước chi tiết (Step-by-step)",
    tag: "Toán học"
  },
  {
    id: "preset-english-7",
    teacherName: "Thầy Trần Văn C",
    subject: "Tiếng Anh",
    grade: "Lớp 7, Lớp 8 (THCS)",
    coreIdea: "Trợ lý hội thoại giúp học sinh thực hành giao tiếp tiếng Anh theo chủ đề SGK mới (Global Success), sửa lỗi phát âm/ngữ pháp và bổ sung vốn từ vựng.",
    coreFeatures: "- Đóng vai trò các tình huống đàm thoại thực tế\n- Chỉnh sửa lỗi ngữ pháp kèm giải thích trực quan\n- Sinh từ vựng kèm mẫu câu ứng dụng hàng ngày",
    tone: "Vui vẻ, sinh động & Đồng hành",
    explanationStyle: "Giải thích kết hợp ví dụ thực tế",
    tag: "Tiếng Anh"
  },
  {
    id: "preset-physics-8",
    teacherName: "Cô Nguyễn Thị D",
    subject: "Vật lí",
    grade: "Lớp 8 (THCS)",
    coreIdea: "App giải đáp thí nghiệm trực quan về áp suất, lực đẩy Ác-si-mét và các hiện tượng nhiệt học trong chương trình KHTN 8. Giúp học sinh liên hệ công thức với đời sống.",
    coreFeatures: "- Giải thích hiện tượng vật lí thực tế\n- Giải bài tập tính toán từng bước\n- Sinh câu hỏi trắc nghiệm kiểm tra nhanh kiến thức",
    tone: "Gợi mở, truyền cảm hứng & Khoa học",
    explanationStyle: "Học thuyết kiến tạo (Constructivism)",
    tag: "Khoa học tự nhiên"
  }
];

export default function App() {
  // Authentication & Multi-role States
  const [userRole, setUserRole] = useState<"student" | "teacher" | "admin" | null>(null);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [loginRoleTab, setLoginRoleTab] = useState<"student" | "teacher" | "admin">("student");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerMode, setRegisterMode] = useState(false);
  const [registerFullName, setRegisterFullName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerSubject, setRegisterSubject] = useState("Toán học");
  const [registerGrade, setRegisterGrade] = useState("Lớp 8");
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Custom persistent teachers list
  const [teachersList, setTeachersList] = useState<any[]>([
    { hoTen: "Thầy Nguyễn Văn A", taiKhoan: "teacher1", matKhau: "teacher123", monHoc: "Vật lý", capHoc: "Lớp 9" },
    { hoTen: "Cô Lê Thị Bình", taiKhoan: "nguyenvana", matKhau: "teacher123", monHoc: "Ngữ văn", capHoc: "Lớp 7" },
  ]);

  // Student AI Chat state
  const [studentMessages, setStudentMessages] = useState<{ sender: "user" | "ai"; text: string }[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [currentChatInput, setCurrentChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Student Dashboard Expanded States
  const [studentActiveTab, setStudentActiveTab] = useState<"hoc-tap" | "kiem-tra" | "qua-trinh">("hoc-tap");
  const [studentSelectedSubject, setStudentSelectedSubject] = useState<"Toán" | "Tiếng Anh" | "Văn" | "KHTN">("Toán");
  const [quizAttempts, setQuizAttempts] = useState<any[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<{ [questionIndex: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

  // Admin Dashboard States
  const [adminActiveTab, setAdminActiveTab] = useState<"stats" | "students" | "instructions" | "settings">("stats");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentForDetails, setSelectedStudentForDetails] = useState<any | null>(null);
  const [editingUsername, setEditingUsername] = useState<string | null>(null);
  const [editKhoi, setEditKhoi] = useState<string>("");

  // Form State
  const [teacherName, setTeacherName] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [coreIdea, setCoreIdea] = useState("");
  const [coreFeatures, setCoreFeatures] = useState("");
  const [tone, setTone] = useState("Thân thiện, khích lệ & Sáng tạo");
  const [explanationStyle, setExplanationStyle] = useState("Đặt câu hỏi gợi mở (Scaffolding)");
  const [customDatabase, setCustomDatabase] = useState(DEFAULT_JSON_DB);
  const [dbFormat, setDbFormat] = useState<"json" | "csv">("json");

  // App System States
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedInstruction | null>(null);
  const [history, setHistory] = useState<GeneratedInstruction[]>([]);
  const [activeTab, setActiveTab] = useState<"system" | "test" | "upgrades" | "database">("system");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [showHistorySidebar, setShowHistorySidebar] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Load history on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("instruction_generator_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Error loading history", e);
      }
    }
  }, []);

  // Load persistent teachers list on mount
  useEffect(() => {
    const savedTeachers = localStorage.getItem("registered_teachers_list");
    if (savedTeachers) {
      try {
        setTeachersList(JSON.parse(savedTeachers));
      } catch (e) {
        console.error("Error loading teachers list", e);
      }
    }
  }, []);

  // Auto-scroll student chat to bottom when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [studentMessages]);

  const getStudentsList = (): any[] => {
    try {
      if (dbFormat === "json") {
        const parsed = JSON.parse(customDatabase);
        if (Array.isArray(parsed)) {
          return parsed.map((item: any) => ({
            hoTen: item.hoTen || item["hoTen"] || item["Họ tên"] || item["Họ tên học sinh"] || item.name || "Học sinh",
            taiKhoan: item.taiKhoan || item["taiKhoan"] || item["Tài khoản"] || item.username || item.account || "",
            matKhau: item.matKhau || item["matKhau"] || item["Mật khẩu"] || item.password || "",
            diemToan: parseFloat(item.diemToan || item["diemToan"] || item["Điểm Toán"] || item.math || "0"),
            diemKHTN: parseFloat(item.diemKHTN || item["diemKHTN"] || item["Điểm KHTN"] || item.science || "0"),
            diemTiengAnh: parseFloat(item.diemTiengAnh || item["diemTiengAnh"] || item["Điểm Tiếng Anh"] || item.english || "0"),
            diemVan: parseFloat(item.diemVan || item["diemVan"] || item["Điểm Văn"] || item.literature || "0"),
            khoi: item.khoi || item["khoi"] || item["Khối"] || item["grade"] || "Lớp 8"
          }));
        }
      } else {
        const lines = customDatabase.split("\n").map(l => l.trim()).filter(Boolean);
        if (lines.length > 1) {
          return lines.slice(1).map(line => {
            const cols = line.split(",").map(c => c.trim());
            return {
              hoTen: cols[0] || "Học sinh",
              taiKhoan: cols[1] || "",
              matKhau: cols[2] || "",
              diemToan: parseFloat(cols[3] || "0"),
              diemKHTN: parseFloat(cols[4] || "0"),
              diemTiengAnh: parseFloat(cols[5] || "0"),
              diemVan: parseFloat(cols[6] || "0"),
              khoi: cols[7] || "Lớp 8"
            };
          });
        }
      }
    } catch (e) {
      console.error("Error parsing student database:", e);
    }
    return [];
  };

  const registerNewStudent = (fullName: string, uName: string, pWord: string, khoi: string = "Lớp 8") => {
    const currentStudents = getStudentsList();
    if (currentStudents.some(s => s.taiKhoan.toLowerCase() === uName.toLowerCase())) {
      throw new Error("Tài khoản học sinh này đã tồn tại!");
    }

    const toan = Math.round((5 + Math.random() * 5) * 10) / 10;
    const khtn = Math.round((5 + Math.random() * 5) * 10) / 10;
    const tienganh = Math.round((5 + Math.random() * 5) * 10) / 10;
    const van = Math.round((5 + Math.random() * 5) * 10) / 10;

    if (dbFormat === "json") {
      try {
        let list = [];
        try {
          list = JSON.parse(customDatabase);
          if (!Array.isArray(list)) list = [];
        } catch {
          list = [];
        }
        const newRecord = {
          hoTen: fullName,
          taiKhoan: uName,
          matKhau: pWord,
          diemToan: toan,
          diemKHTN: khtn,
          diemTiengAnh: tienganh,
          diemVan: van,
          khoi: khoi
        };
        list.push(newRecord);
        setCustomDatabase(JSON.stringify(list, null, 2));
        return newRecord;
      } catch (err: any) {
        throw new Error("Lỗi định dạng JSON: " + err.message);
      }
    } else {
      const newRow = `\n${fullName},${uName},${pWord},${toan},${khtn},${tienganh},${van},${khoi}`;
      setCustomDatabase(prev => prev.trim() + newRow);
      return {
        hoTen: fullName,
        taiKhoan: uName,
        matKhau: pWord,
        diemToan: toan,
        diemKHTN: khtn,
        diemTiengAnh: tienganh,
        diemVan: van,
        khoi: khoi
      };
    }
  };

  const handleSaveStudentGrade = (username: string) => {
    try {
      if (dbFormat === "json") {
        const parsed = JSON.parse(customDatabase);
        if (Array.isArray(parsed)) {
          const updated = parsed.map((item: any) => {
            const itemUsername = item.taiKhoan || item["taiKhoan"] || item["Tài khoản"] || item.username || item.account || "";
            if (itemUsername.toLowerCase() === username.toLowerCase()) {
              return {
                ...item,
                khoi: editKhoi
              };
            }
            return item;
          });
          setCustomDatabase(JSON.stringify(updated, null, 2));
        }
      } else {
        const lines = customDatabase.split("\n").map(l => l.trim()).filter(Boolean);
        if (lines.length > 1) {
          const updatedLines = [lines[0]];
          lines.slice(1).forEach(line => {
            const cols = line.split(",").map(c => c.trim());
            const itemUsername = cols[1] || "";
            if (itemUsername.toLowerCase() === username.toLowerCase()) {
              cols[7] = editKhoi;
            }
            updatedLines.push(cols.join(","));
          });
          setCustomDatabase(updatedLines.join("\n"));
        }
      }
      setEditingUsername(null);
    } catch (e) {
      console.error("Error saving student grade:", e);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setSuccessMessage(null);

    if (!loginUsername.trim() || !loginPassword.trim()) {
      setAuthError("Vui lòng điền đầy đủ Tài khoản và Mật khẩu!");
      return;
    }

    if (loginRoleTab === "admin") {
      if (loginUsername === "admin" && loginPassword === "admin123") {
        setSuccessMessage("Đăng nhập Admin thành công!");
        setTimeout(() => {
          setUserRole("admin");
          setCurrentUser({ hoTen: "Quản trị viên Hệ thống", taiKhoan: "admin" });
        }, 800);
      } else {
        setAuthError("Tài khoản hoặc mật khẩu Admin không chính xác!");
      }
    } else if (loginRoleTab === "teacher") {
      const foundTeacher = teachersList.find(
        t => t.taiKhoan.toLowerCase() === loginUsername.toLowerCase() && t.matKhau === loginPassword
      );

      if (foundTeacher) {
        setSuccessMessage(`Chào mừng ${foundTeacher.hoTen}! Đang vào không gian làm việc giáo viên...`);
        if (foundTeacher.hoTen) setTeacherName(foundTeacher.hoTen);
        if (foundTeacher.monHoc) setSubject(foundTeacher.monHoc);
        if (foundTeacher.capHoc) setGrade(foundTeacher.capHoc);

        setTimeout(() => {
          setUserRole("teacher");
          setCurrentUser(foundTeacher);
        }, 800);
      } else {
        setAuthError("Tài khoản hoặc mật khẩu Giáo viên không chính xác!");
      }
    } else {
      const students = getStudentsList();
      const foundStudent = students.find(
        s => s.taiKhoan.toLowerCase() === loginUsername.toLowerCase() && s.matKhau === loginPassword
      );

      if (foundStudent) {
        setSuccessMessage(`Đăng nhập thành công! Chào em, ${foundStudent.hoTen}.`);
        
        const welcomeText = `Chào em, **${foundStudent.hoTen}**! Thầy/Cô rất vui được đồng hành cùng em học tập. 
Dưới đây là bảng điểm số hiện tại của em:
- **Toán học**: ${foundStudent.diemToan} / 10
- **Khoa học Tự nhiên**: ${foundStudent.diemKHTN} / 10
- **Tiếng Anh**: ${foundStudent.diemTiengAnh} / 10
- **Ngữ văn**: ${foundStudent.diemVan} / 10

Em muốn cùng Thầy/Cô ôn tập chủ đề gì hôm nay nào? Hãy hỏi bất kỳ câu hỏi nào về môn học của em nhé! Thầy/Cô sẽ hướng dẫn em giải đáp và rèn luyện tư duy từng bước!`;

        setStudentMessages([
          { sender: "ai", text: welcomeText }
        ]);

        setTimeout(() => {
          setUserRole("student");
          setCurrentUser(foundStudent);
        }, 800);
      } else {
        setAuthError("Tài khoản hoặc mật khẩu Học sinh không chính xác!");
      }
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setSuccessMessage(null);

    if (!registerFullName.trim() || !registerUsername.trim() || !registerPassword.trim()) {
      setAuthError("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (loginRoleTab === "teacher") {
      const exists = teachersList.some(t => t.taiKhoan.toLowerCase() === registerUsername.toLowerCase());
      if (exists) {
        setAuthError("Tài khoản này đã được sử dụng!");
        return;
      }

      const newTeacher = {
        hoTen: registerFullName,
        taiKhoan: registerUsername,
        matKhau: registerPassword,
        monHoc: registerSubject || "Toán học",
        capHoc: registerGrade || "Lớp 8"
      };

      const updatedList = [...teachersList, newTeacher];
      setTeachersList(updatedList);
      localStorage.setItem("registered_teachers_list", JSON.stringify(updatedList));

      setSuccessMessage("Đăng ký tài khoản Giáo viên thành công! Mời Thầy/Cô đăng nhập.");
      setRegisterMode(false);
      setLoginUsername(registerUsername);
      setLoginPassword(registerPassword);
    } else {
      try {
        const newRecord = registerNewStudent(registerFullName, registerUsername, registerPassword, registerGrade || "Lớp 8");
        setSuccessMessage(`Đăng ký thành công! Chào em ${newRecord.hoTen}, tài khoản đã được thiết lập.`);
        setRegisterMode(false);
        setLoginUsername(registerUsername);
        setLoginPassword(registerPassword);
      } catch (err: any) {
        setAuthError(err.message || "Không thể đăng ký học sinh mới.");
      }
    }
  };

  const handleStudentSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentChatInput.trim() || isChatLoading) return;

    const userMessage = currentChatInput.trim();
    setCurrentChatInput("");
    
    const updatedMessages: { sender: "user" | "ai"; text: string }[] = [...studentMessages, { sender: "user" as const, text: userMessage }];
    setStudentMessages(updatedMessages);
    setIsChatLoading(true);

    try {
      let sysInstruction = "";
      if (result) {
        sysInstruction = result.systemInstruction;
      } else {
        sysInstruction = `You are a friendly, encouraging virtual Vietnamese school teacher named "AI Tutor".
You are teaching a student named "${currentUser?.hoTen || 'Học sinh'}".
Student profile and grades:
- Math: ${currentUser?.diemToan}
- Science: ${currentUser?.diemKHTN}
- English: ${currentUser?.diemTiengAnh}
- Literature: ${currentUser?.diemVan}
Please use this student profile to customize your teaching. Use the scaffolding pedagogical style (gợi mở từng bước). Never give direct answers instantly. Always reply in Vietnamese, with an encouraging and friendly tone. Ensure student safety.`;
      }

      const formattedHistory = updatedMessages.map(msg => ({
        role: msg.sender === "user" ? "user" : "model",
        text: msg.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: sysInstruction,
          messages: formattedHistory
        })
      });

      const data = await res.json();
      if (data.error) {
        setStudentMessages(prev => [...prev, { sender: "ai" as const, text: `⚠️ Đã xảy ra lỗi: ${data.error}` }]);
      } else {
        setStudentMessages(prev => [...prev, { sender: "ai" as const, text: data.text || "Thầy cô chưa tìm thấy phản hồi thích hợp." }]);
      }
    } catch (err: any) {
      setStudentMessages(prev => [...prev, { sender: "ai" as const, text: "⚠️ Không thể kết nối với máy chủ AI." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentUser(null);
    setLoginUsername("");
    setLoginPassword("");
    setRegisterFullName("");
    setRegisterUsername("");
    setRegisterPassword("");
    setAuthError(null);
    setSuccessMessage(null);
    setStudentMessages([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readFileContent(file);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    readFileContent(file);
  };

  const readFileContent = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (file.name.endsWith(".json")) {
        setDbFormat("json");
        setCustomDatabase(content);
      } else if (file.name.endsWith(".csv")) {
        setDbFormat("csv");
        setCustomDatabase(content);
      } else {
        setCustomDatabase(content);
      }
    };
    reader.readAsText(file);
  };

  const validateDatabase = () => {
    const lower = customDatabase.toLowerCase();
    const hasName = lower.includes("hoten") || lower.includes("họ tên") || lower.includes("name");
    const hasAccount = lower.includes("taikhoan") || lower.includes("tài khoản") || lower.includes("username") || lower.includes("account");
    const hasPassword = lower.includes("matkhau") || lower.includes("mật khẩu") || lower.includes("password") || lower.includes("pass");
    const hasMath = lower.includes("toan") || lower.includes("toán") || lower.includes("math");
    const hasScience = lower.includes("khtn") || lower.includes("science") || lower.includes("tự nhiên");
    const hasEnglish = lower.includes("tieng anh") || lower.includes("tiếng anh") || lower.includes("english");
    const hasLiterature = lower.includes("van") || lower.includes("văn") || lower.includes("literature") || lower.includes("ngữ văn");

    return { hasName, hasAccount, hasPassword, hasMath, hasScience, hasEnglish, hasLiterature };
  };

  const validation = validateDatabase();

  // Loading steps animation simulation
  useEffect(() => {
    if (!loading) return;
    const steps = [
      "Đang phân tích chương trình GDPT 2018...",
      "Đang tối ưu hóa phương pháp sư phạm ứng với tâm sinh lý lứa tuổi học sinh...",
      "Đang dịch thuật và xây dựng System Instruction tiếng Anh chuẩn hóa...",
      "Đang khởi tạo các kịch bản kiểm thử (Test Cases)...",
      "Đang thiết kế cơ sở dữ liệu mẫu phù hợp với môn học...",
      "Hoàn tất! Chuẩn bị kết quả xuất bản..."
    ];
    setLoadingStep(0);
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [loading]);

  const selectPreset = (preset: typeof PRESETS[0]) => {
    setTeacherName(preset.teacherName);
    setSubject(preset.subject);
    setGrade(preset.grade);
    setCoreIdea(preset.coreIdea);
    setCoreFeatures(preset.coreFeatures);
    setTone(preset.tone);
    setExplanationStyle(preset.explanationStyle);
    setError(null);
  };

  const handleReset = () => {
    setTeacherName("");
    setSubject("");
    setGrade("");
    setCoreIdea("");
    setCoreFeatures("");
    setTone("Thân thiện, khích lệ & Sáng tạo");
    setExplanationStyle("Đặt câu hỏi gợi mở (Scaffolding)");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !grade.trim() || !coreIdea.trim()) {
      setError("Vui lòng nhập đầy đủ các thông tin cốt lõi (Môn học, Lớp học, Ý tưởng cơ bản) để bắt đầu sinh.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherName,
          subject,
          grade,
          coreIdea,
          coreFeatures,
          tone,
          explanationStyle,
          customDatabase
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Đã xảy ra lỗi không xác định từ máy chủ.");
      }

      const newInstruction: GeneratedInstruction = {
        id: `inst-${Date.now()}`,
        timestamp: new Date().toLocaleString("vi-VN"),
        teacherName: teacherName || "Thầy/Cô giáo",
        subject,
        grade,
        coreIdea,
        coreFeatures,
        tone,
        explanationStyle,
        ...data
      };

      setResult(newInstruction);
      setActiveTab("system");

      // Update History
      const updatedHistory = [newInstruction, ...history.slice(0, 19)];
      setHistory(updatedHistory);
      localStorage.setItem("instruction_generator_history", JSON.stringify(updatedHistory));

    } catch (err: any) {
      setError(err.message || "Không thể kết nối đến máy chủ AI. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    localStorage.setItem("instruction_generator_history", JSON.stringify(updated));
    if (result && result.id === id) {
      setResult(null);
    }
  };

  const copyToClipboard = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => {
      setCopiedSection(null);
    }, 2000);
  };

  const loadingStepsText = [
    "Đang phân tích chương trình GDPT 2018...",
    "Đang tối ưu hóa phương pháp sư phạm ứng với tâm sinh lý lứa tuổi học sinh...",
    "Đang dịch thuật và xây dựng System Instruction tiếng Anh chuẩn hóa...",
    "Đang khởi tạo các kịch bản kiểm thử (Test Cases)...",
    "Đang thiết kế cơ sở dữ liệu mẫu phù hợp với môn học...",
    "Hoàn tất! Chuẩn bị kết quả xuất bản..."
  ];

  if (userRole === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4" id="auth-root">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Auth Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white text-center">
            <img
              src="/logo.png"
              alt="An Tâm Education Logo"
              className="w-28 h-28 object-contain mx-auto mb-3 filter drop-shadow-sm transition-transform hover:scale-105 duration-300"
              referrerPolicy="no-referrer"
            />
            <h2 className="text-xl font-bold tracking-tight">AN TÂM EDUCATION</h2>
            <p className="text-xs text-emerald-100/80 mt-1">Hệ thống phân quyền chuẩn Sư phạm GDPT 2018</p>
          </div>

          <div className="p-6">
            {/* Roles Select Tabs */}
            {!registerMode && (
              <div className="flex bg-slate-100 p-1 rounded-xl mb-6 border border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setLoginRoleTab("student");
                    setAuthError(null);
                    setSuccessMessage(null);
                  }}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    loginRoleTab === "student"
                      ? "bg-white text-emerald-700 shadow-xs border border-slate-200/50"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  Học sinh
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginRoleTab("teacher");
                    setAuthError(null);
                    setSuccessMessage(null);
                  }}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    loginRoleTab === "teacher"
                      ? "bg-white text-emerald-700 shadow-xs border border-slate-200/50"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  Giáo viên
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginRoleTab("admin");
                    setAuthError(null);
                    setSuccessMessage(null);
                  }}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    loginRoleTab === "admin"
                      ? "bg-white text-emerald-700 shadow-xs border border-slate-200/50"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  Admin
                </button>
              </div>
            )}

            {/* Error & Success Messages */}
            {authError && (
              <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
                <X className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-start gap-2">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Login / Register Form */}
            {!registerMode ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Tài khoản đăng nhập
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      placeholder={
                        loginRoleTab === "student"
                          ? "Ví dụ: namnh6"
                          : loginRoleTab === "teacher"
                          ? "Ví dụ: teacher1"
                          : "Ví dụ: admin"
                      }
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Mật khẩu bảo mật
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-6"
                >
                  <Lock className="w-4 h-4" />
                  <span>Đăng nhập hệ thống</span>
                </button>

                {/* Switch to Register (Except Admin) */}
                {loginRoleTab !== "admin" && (
                  <div className="text-center mt-4">
                    <p className="text-xs text-slate-500">
                      Chưa có tài khoản?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setRegisterMode(true);
                          setAuthError(null);
                          setSuccessMessage(null);
                        }}
                        className="text-emerald-600 font-bold hover:underline cursor-pointer"
                      >
                        Đăng ký tài khoản mới
                      </button>
                    </p>
                  </div>
                )}

                {/* Mock Accounts Helper Box */}
                <div className="mt-6 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 space-y-1">
                  <p className="font-bold text-slate-700 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-emerald-600" />
                    Tài khoản kiểm thử nhanh:
                  </p>
                  {loginRoleTab === "student" && (
                    <>
                      <p>• Tài khoản: <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-bold">namnh6</code> / Mật khẩu: <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700">Nam@2026</code> (Toán 8.5, KHTN 7.2)</p>
                      <p>• Tài khoản: <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-bold">maitt7</code> / Mật khẩu: <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700">MaiMai#123</code> (Văn 9.2, Anh 8.5)</p>
                    </>
                  )}
                  {loginRoleTab === "teacher" && (
                    <>
                      <p>• Tài khoản: <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-bold">teacher1</code> / Mật khẩu: <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700">teacher123</code></p>
                      <p>• Tài khoản: <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-bold">nguyenvana</code> / Mật khẩu: <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700">teacher123</code></p>
                    </>
                  )}
                  {loginRoleTab === "admin" && (
                    <p>• Tài khoản: <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-bold">admin</code> / Mật khẩu: <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700">admin123</code></p>
                  )}
                </div>
              </form>
            ) : (
              // REGISTER FORM
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Họ và Tên đầy đủ
                  </label>
                  <input
                    type="text"
                    required
                    value={registerFullName}
                    onChange={(e) => setRegisterFullName(e.target.value)}
                    placeholder="Ví dụ: Hoàng Văn Học"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Tài khoản
                    </label>
                    <input
                      type="text"
                      required
                      value={registerUsername}
                      onChange={(e) => setRegisterUsername(e.target.value)}
                      placeholder="User đăng nhập"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Mật khẩu
                    </label>
                    <input
                      type="password"
                      required
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder="Mật khẩu"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>

                {loginRoleTab === "teacher" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Môn học phụ trách
                      </label>
                      <select
                        value={registerSubject}
                        onChange={(e) => setRegisterSubject(e.target.value)}
                        className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      >
                        <option value="Toán học">Toán học</option>
                        <option value="Vật lý">Vật lý</option>
                        <option value="Hóa học">Hóa học</option>
                        <option value="Khoa học Tự nhiên">Khoa học Tự nhiên</option>
                        <option value="Ngữ văn">Ngữ văn</option>
                        <option value="Tiếng Anh">Tiếng Anh</option>
                        <option value="Tin học">Tin học</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Cấp học / Lớp
                      </label>
                      <input
                        type="text"
                        value={registerGrade}
                        onChange={(e) => setRegisterGrade(e.target.value)}
                        placeholder="Ví dụ: Lớp 9"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                )}

                {loginRoleTab === "student" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Chọn Khối Lớp đang học *
                      </label>
                      <select
                        value={registerGrade}
                        onChange={(e) => setRegisterGrade(e.target.value)}
                        className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-bold text-slate-700 transition-all cursor-pointer"
                      >
                        <option value="Lớp 6">Khối 6 (Lớp 6)</option>
                        <option value="Lớp 7">Khối 7 (Lớp 7)</option>
                        <option value="Lớp 8">Khối 8 (Lớp 8)</option>
                        <option value="Lớp 9">Khối 9 (Lớp 9)</option>
                      </select>
                    </div>
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
                      <strong>Thông báo hệ thống:</strong> Điểm số ban đầu của học sinh mới đăng ký sẽ được khởi tạo ngẫu nhiên từ 5.0 - 10.0 và được đồng bộ trực tiếp vào cơ sở dữ liệu học sinh của trường.
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-6"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Đăng ký ngay</span>
                </button>

                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setRegisterMode(false);
                      setAuthError(null);
                      setSuccessMessage(null);
                    }}
                    className="text-slate-500 text-xs font-semibold hover:underline cursor-pointer"
                  >
                    Quay lại màn hình Đăng nhập
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (userRole === "student") {
    const student = currentUser;

    const activeLessons = CURRICULUM_DATA[student.khoi || "Lớp 8"]?.[studentSelectedSubject] || [];

    const handleAskAITeacherDirectly = async (customPrompt: string) => {
      if (isChatLoading) return;
      const updatedMessages = [...studentMessages, { sender: "user" as const, text: customPrompt }];
      setStudentMessages(updatedMessages);
      setIsChatLoading(true);

      try {
        let sysInstruction = "";
        if (result) {
          sysInstruction = result.systemInstruction;
        } else {
          sysInstruction = `You are a friendly, encouraging virtual school teacher named "AI Tutor".
You are teaching a student named "${student?.hoTen || 'Học sinh'}".
Student profile, grade, and scores:
- Lớp: ${student?.khoi || 'Lớp 8'}
- Toán: ${student?.diemToan}
- KHTN: ${student?.diemKHTN}
- Tiếng Anh: ${student?.diemTiengAnh}
- Ngữ văn: ${student?.diemVan}
Please use this student profile to customize your teaching. Use the scaffolding pedagogical style (gợi mở từng bước). Never give direct answers instantly. Always reply in Vietnamese, with an encouraging and friendly tone. Ensure student safety.`;
        }

        const formattedHistory = updatedMessages.map(msg => ({
          role: msg.sender === "user" ? "user" : "model",
          text: msg.text
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: sysInstruction,
            messages: formattedHistory
          })
        });

        const data = await res.json();
        if (data.error) {
          setStudentMessages(prev => [...prev, { sender: "ai" as const, text: `⚠️ Đã xảy ra lỗi: ${data.error}` }]);
        } else {
          setStudentMessages(prev => [...prev, { sender: "ai" as const, text: data.text || "Thầy cô chưa tìm thấy phản hồi thích hợp." }]);
        }
      } catch (err: any) {
        setStudentMessages(prev => [...prev, { sender: "ai" as const, text: "⚠️ Không thể kết nối với máy chủ AI." }]);
      } finally {
        setIsChatLoading(false);
      }
    };

    const handleQuizAnswerSelect = (questionIndex: number, optionIndex: number) => {
      if (quizSubmitted) return;
      setQuizAnswers(prev => ({
        ...prev,
        [questionIndex]: optionIndex
      }));
    };

    const handleQuizSubmit = (lesson: any) => {
      if (quizSubmitted) return;
      
      let correctCount = 0;
      lesson.questions.forEach((q: any, idx: number) => {
        if (quizAnswers[idx] === q.correctIndex) {
          correctCount++;
        }
      });

      const score = Math.round((correctCount / lesson.questions.length) * 10 * 10) / 10;
      const newAttempt = {
        id: `attempt-${Date.now()}`,
        lessonTitle: lesson.title,
        subject: studentSelectedSubject,
        correctCount,
        totalCount: lesson.questions.length,
        score,
        timestamp: new Date().toLocaleString("vi-VN")
      };

      setQuizAttempts(prev => [newAttempt, ...prev]);
      setQuizSubmitted(true);
    };

    const handleQuizReset = () => {
      setQuizAnswers({});
      setQuizSubmitted(false);
    };

    const chartData = [
      { name: "Toán", Score: student.diemToan, fill: "#10b981" },
      { name: "Tiếng Anh", Score: student.diemTiengAnh, fill: "#3b82f6" },
      { name: "Ngữ văn", Score: student.diemVan, fill: "#f59e0b" },
      { name: "KHTN", Score: student.diemKHTN, fill: "#8b5cf6" }
    ];

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans" id="student-root">
        {/* Navbar */}
        <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs" id="student-navbar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-semibold text-lg text-slate-900 tracking-tight font-display">
                  Cổng học sinh: Học tập thông minh ({student.khoi})
                </h1>
                <p className="text-xs text-slate-500 hidden sm:block">
                  Hệ thống số hóa bài giảng và kiểm tra thích ứng theo Khung GDPT 2018
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-sm font-bold text-slate-800">{student.hoTen}</span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5 text-center">
                  Học sinh: {student.khoi || "Lớp 8"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-all border border-rose-100 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </nav>

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
          {/* Welcome and dynamic advice header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <span className="bg-white/10 text-emerald-200 border border-white/10 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                Học tập Cá nhân hóa • Sư phạm Kiến tạo
              </span>
              <h2 className="text-2xl font-bold font-display">
                Xin chào em, {student.hoTen}!
              </h2>
              <p className="text-emerald-100/90 text-xs leading-relaxed max-w-2xl">
                Hệ thống đã tự động lọc nội dung giáo trình riêng biệt dành cho **{student.khoi || "Lớp 8"}**. Em hãy tự do ôn tập lý thuyết lý thú, làm bài tập trắc nghiệm thích ứng và trao đổi trực tiếp với Trợ lý Giáo viên AI nhé!
              </p>
            </div>
            <div className="absolute top-1/2 right-4 -translate-y-1/2 text-white/5 pointer-events-none hidden lg:block">
              <BookOpenCheck className="w-36 h-36" />
            </div>
          </div>

          {/* Navigation Tabs for Student Dashboard */}
          <div className="flex bg-white border border-slate-200 rounded-xl p-1 gap-1 w-full md:w-fit border shadow-xs">
            <button
              onClick={() => {
                setStudentActiveTab("hoc-tap");
                setExpandedLessonId(null);
              }}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                studentActiveTab === "hoc-tap"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Học tập</span>
            </button>
            <button
              onClick={() => {
                setStudentActiveTab("kiem-tra");
                setActiveQuizId(null);
                handleQuizReset();
              }}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                studentActiveTab === "kiem-tra"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Bài kiểm tra</span>
            </button>
            <button
              onClick={() => setStudentActiveTab("qua-trinh")}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                studentActiveTab === "qua-trinh"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Quá trình học tập</span>
            </button>
          </div>

          {/* Student Tabs Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT / CENTER VIEW: DEPENDS ON THE ACTIVE TAB */}
            <div className={`${studentActiveTab === "qua-trinh" ? "lg:col-span-12" : "lg:col-span-7"} space-y-6`}>
              
              {/* TAB 1: HỌC TẬP (Learning Hub) */}
              {studentActiveTab === "hoc-tap" && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                        <BookOpenCheck className="w-4.5 h-4.5 text-emerald-600" />
                        Học liệu tự học: {student.khoi}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">Chọn môn học để bắt đầu tra cứu lý thuyết trọng tâm</p>
                    </div>
                    <span className="text-xs font-bold text-slate-400">Khối lớp: {student.khoi}</span>
                  </div>

                  {/* Subject selector tabs */}
                  <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
                    {(["Toán", "Tiếng Anh", "Văn", "KHTN"] as const).map((subjectOption) => (
                      <button
                        key={subjectOption}
                        onClick={() => {
                          setStudentSelectedSubject(subjectOption);
                          setExpandedLessonId(null);
                        }}
                        className={`py-2 text-[11px] font-bold rounded-lg transition-all text-center cursor-pointer ${
                          studentSelectedSubject === subjectOption
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {subjectOption}
                      </button>
                    ))}
                  </div>

                  {/* Lesson Cards List */}
                  <div className="space-y-4">
                    {activeLessons.length === 0 ? (
                      <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                        <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-30 animate-pulse" />
                        <p className="text-xs">Hiện tại chưa có học liệu môn {studentSelectedSubject} cho lớp của em.</p>
                      </div>
                    ) : (
                      activeLessons.map((lesson) => {
                        const isExpanded = expandedLessonId === lesson.id;
                        return (
                          <div 
                            key={lesson.id} 
                            className={`border rounded-xl transition-all overflow-hidden ${
                              isExpanded 
                                ? "border-emerald-500 bg-emerald-50/5 shadow-xs" 
                                : "border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            {/* Toggle Header */}
                            <div 
                              onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}
                              className="p-4 cursor-pointer flex justify-between items-start gap-3"
                            >
                              <div className="space-y-1">
                                <h4 className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                                  <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                                  {lesson.title}
                                </h4>
                                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                                  {lesson.summary}
                                </p>
                              </div>
                              <span className="p-1 text-slate-400 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold shrink-0">
                                {isExpanded ? "Đóng" : "Học ngay"}
                              </span>
                            </div>

                            {/* Collapsible Content */}
                            {isExpanded && (
                              <div className="px-4 pb-4 border-t border-slate-100 pt-3 space-y-4">
                                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed markdown-body">
                                  <Markdown>{lesson.theory}</Markdown>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3">
                                  <div className="text-left">
                                    <h5 className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                                      <Sparkles className="w-3.5 h-3.5" />
                                      Cùng thảo luận kiến thức
                                    </h5>
                                    <p className="text-[10px] text-slate-500">Đặt câu hỏi gợi mở, lý giải lý thuyết cùng Trợ lý Giáo viên AI</p>
                                  </div>
                                  <button
                                    onClick={() => {
                                      const prompt = `Chào Thầy/Cô, em là học sinh ${student.hoTen} lớp ${student.khoi}. Em đang tìm hiểu bài học '${lesson.title}' môn ${studentSelectedSubject}. Thầy/Cô hãy tóm tắt ngắn gọn 3 điểm lý thuyết cốt lõi nhất của bài học này và đặt cho em một câu hỏi nhỏ để em trả lời thử nhé!`;
                                      handleAskAITeacherDirectly(prompt);
                                    }}
                                    disabled={isChatLoading}
                                    className="w-full sm:w-auto px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold text-[10px] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    <span>Hỏi Trợ lý AI về bài này</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: BÀI KIỂM TRA (Interactive Quizzes) */}
              {studentActiveTab === "kiem-tra" && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
                  {/* Select Quiz */}
                  {activeQuizId === null ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div>
                          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                            <Award className="w-4.5 h-4.5 text-emerald-600" />
                            Luyện tập trắc nghiệm tự động
                          </h3>
                          <p className="text-[11px] text-slate-500 mt-0.5">Luyện đề thích ứng để đánh giá năng lực ngay lập tức</p>
                        </div>
                        <span className="text-xs font-bold text-slate-400">Khối: {student.khoi}</span>
                      </div>

                      {/* Subject Filter Row */}
                      <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
                        {(["Toán", "Tiếng Anh", "Văn", "KHTN"] as const).map((subjectOption) => (
                          <button
                            key={subjectOption}
                            onClick={() => {
                              setStudentSelectedSubject(subjectOption);
                              handleQuizReset();
                            }}
                            className={`py-2 text-[11px] font-bold rounded-lg transition-all text-center cursor-pointer ${
                              studentSelectedSubject === subjectOption
                                ? "bg-emerald-600 text-white shadow-sm"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            {subjectOption}
                          </button>
                        ))}
                      </div>

                      {/* Quizzes list */}
                      <div className="space-y-3">
                        {activeLessons.length === 0 ? (
                          <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                            <Award className="w-8 h-8 mx-auto mb-2 opacity-30" />
                            <p className="text-xs">Chưa có bài trắc nghiệm môn {studentSelectedSubject} cho lớp của em.</p>
                          </div>
                        ) : (
                          activeLessons.map((lesson) => (
                            <div key={lesson.id} className="p-4 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors flex items-center justify-between gap-4">
                              <div className="space-y-1">
                                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{lesson.title}</h4>
                                <p className="text-[10px] text-slate-500">Môn học: {studentSelectedSubject} • Đề trắc nghiệm: {lesson.questions.length} câu hỏi mẫu</p>
                              </div>
                              <button
                                onClick={() => {
                                  setActiveQuizId(lesson.id);
                                  handleQuizReset();
                                }}
                                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[10px] rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                              >
                                <Play className="w-3 h-3" />
                                <span>Bắt đầu</span>
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ) : (
                    // Quiz Active Mode
                    (() => {
                      const activeLesson = activeLessons.find(l => l.id === activeQuizId);
                      if (!activeLesson) return null;

                      let correctCount = 0;
                      activeLesson.questions.forEach((q, idx) => {
                        if (quizAnswers[idx] === q.correctIndex) {
                          correctCount++;
                        }
                      });
                      const calculatedScore = Math.round((correctCount / activeLesson.questions.length) * 10 * 10) / 10;

                      return (
                        <div className="space-y-5">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <button
                              onClick={() => setActiveQuizId(null)}
                              className="text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer bg-slate-100 px-2.5 py-1 rounded-lg"
                            >
                              ← Quay lại danh sách
                            </button>
                            <span className="text-xs font-bold text-emerald-600 font-mono">
                              Môn: {studentSelectedSubject} • {student.khoi}
                            </span>
                          </div>

                          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                            <h3 className="font-bold text-slate-800 text-sm">{activeLesson.title}</h3>
                            <p className="text-[10px] text-slate-400">Em hãy chọn phương án chính xác nhất cho từng câu hỏi bên dưới.</p>
                          </div>

                          {/* Quiz questions */}
                          <div className="space-y-6">
                            {activeLesson.questions.map((q, idx) => {
                              const selectedOpt = quizAnswers[idx];
                              return (
                                <div key={idx} className="p-4 border border-slate-200 rounded-xl space-y-3 bg-white">
                                  <p className="text-xs font-bold text-slate-800 leading-relaxed">
                                    Câu hỏi {idx + 1}: {q.question}
                                  </p>

                                  <div className="grid grid-cols-1 gap-2">
                                    {q.options.map((opt, optIdx) => {
                                      const isSelected = selectedOpt === optIdx;
                                      const isCorrect = optIdx === q.correctIndex;
                                      
                                      let optionStyle = "bg-slate-50 border-slate-200/60 hover:bg-slate-100 text-slate-700";
                                      if (isSelected && !quizSubmitted) {
                                        optionStyle = "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold";
                                      } else if (quizSubmitted) {
                                        if (isSelected && isCorrect) {
                                          optionStyle = "bg-emerald-100 border-emerald-500 text-emerald-900 font-bold";
                                        } else if (isSelected && !isCorrect) {
                                          optionStyle = "bg-rose-100 border-rose-400 text-rose-900 font-bold";
                                        } else if (isCorrect) {
                                          optionStyle = "bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold";
                                        } else {
                                          optionStyle = "bg-slate-50/50 border-slate-100 text-slate-400";
                                        }
                                      }

                                      return (
                                        <button
                                          key={optIdx}
                                          type="button"
                                          disabled={quizSubmitted}
                                          onClick={() => handleQuizAnswerSelect(idx, optIdx)}
                                          className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center gap-3 border transition-all cursor-pointer ${optionStyle}`}
                                        >
                                          <span className="font-mono text-[10px] w-5 h-5 rounded-full bg-slate-200/80 text-slate-700 flex items-center justify-center font-bold shrink-0">
                                            {String.fromCharCode(65 + optIdx)}
                                          </span>
                                          <span className="flex-1">{opt}</span>
                                          {quizSubmitted && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                                        </button>
                                      );
                                    })}
                                  </div>

                                  {/* Explanation block */}
                                  {quizSubmitted && (
                                    <div className="mt-3 p-3 bg-amber-50/50 border border-amber-200 rounded-xl text-[11px] text-slate-600 leading-relaxed">
                                      <strong className="text-amber-800 font-semibold block mb-0.5">Lời giải sư phạm:</strong>
                                      {q.explanation}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Submit & score summary */}
                          {!quizSubmitted ? (
                            <div className="flex justify-end pt-2">
                              <button
                                type="button"
                                onClick={() => handleQuizSubmit(activeLesson)}
                                disabled={Object.keys(quizAnswers).length < activeLesson.questions.length}
                                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                              >
                                <Check className="w-4 h-4" />
                                <span>Hoàn thành & Nộp bài</span>
                              </button>
                            </div>
                          ) : (
                            <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
                              <div className="space-y-1 text-center md:text-left">
                                <h4 className="text-sm font-bold text-emerald-400 flex items-center justify-center md:justify-start gap-1">
                                  <Award className="w-4 h-4" />
                                  KẾT QUẢ BÀI THI CỦA EM
                                </h4>
                                <p className="text-xs text-slate-300">
                                  Đúng **{correctCount}/{activeLesson.questions.length}** câu hỏi • Đạt điểm: **{calculatedScore.toFixed(1)} / 10.0**
                                </p>
                              </div>

                              <div className="flex flex-wrap items-center gap-2">
                                <button
                                  type="button"
                                  onClick={handleQuizReset}
                                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                                >
                                  Làm lại bài này
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const prompt = `Thầy cô ơi, em vừa làm xong bài trắc nghiệm tự luyện '${activeLesson.title}' môn ${studentSelectedSubject} lớp ${student.khoi} với kết quả: ${correctCount}/${activeLesson.questions.length} câu đúng (${calculatedScore.toFixed(1)} điểm). Thầy cô hãy giải thích cặn kẽ vì sao đáp án đúng và giúp em củng cố mảng kiến thức này bằng phương pháp gợi mở từng bước nhé!`;
                                    handleAskAITeacherDirectly(prompt);
                                  }}
                                  disabled={isChatLoading}
                                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Sparkles className="w-3.5 h-3.5" />
                                  <span>Yêu cầu AI giảng giải chi tiết</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()
                  )}
                </div>
              )}
            </div>

            {/* RIGHT PANEL: CHAT WITH AI TEACHER (For tabs hoc-tap and kiem-tra) */}
            {studentActiveTab !== "qua-trinh" && (
              <div className="lg:col-span-5 flex flex-col h-[550px] bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                      <Cpu className="w-4 h-4 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-xs sm:text-sm">
                        {result ? result.appName : "Trợ lý Giáo viên AI"}
                      </h3>
                      <p className="text-[10px] text-slate-400">
                        Hệ thống Sư phạm Cá nhân hóa
                      </p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
                    Trực tuyến
                  </span>
                </div>

                {/* Chat Message Panel */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/20">
                  {studentMessages.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 space-y-2 h-full flex flex-col justify-center items-center">
                      <MessageSquare className="w-10 h-10 mx-auto opacity-20 animate-bounce" />
                      <h4 className="font-bold text-slate-700 text-xs">Phòng thảo luận cùng Trợ lý AI</h4>
                      <p className="text-[10px] text-slate-400 max-w-xs leading-relaxed">
                        Em có thể học lý thuyết ở cột bên trái và bấm nút "Hỏi AI" để giáo viên ảo trực tiếp hướng dẫn và chữa bài nhé!
                      </p>
                    </div>
                  ) : (
                    studentMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-2 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border ${
                            msg.sender === "user"
                              ? "bg-emerald-600 border-emerald-700 text-white font-bold"
                              : "bg-slate-200 border-slate-300 text-slate-700"
                          }`}
                        >
                          {msg.sender === "user" ? "Em" : "AI"}
                        </div>

                        <div
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs shadow-xs leading-relaxed ${
                            msg.sender === "user"
                              ? "bg-emerald-600 text-white rounded-tr-none"
                              : "bg-white border border-slate-200 text-slate-700 rounded-tl-none markdown-body"
                          }`}
                        >
                          {msg.sender === "user" ? (
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                          ) : (
                            <Markdown>{msg.text}</Markdown>
                          )}
                        </div>
                      </div>
                    ))
                  )}

                  {isChatLoading && (
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-[10px] text-slate-600 font-bold">
                        AI
                      </div>
                      <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl rounded-tl-none px-3.5 py-2.5 text-xs flex items-center gap-2 shadow-xs">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-[10px]">Giáo viên AI đang phân tích sư phạm...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!currentChatInput.trim() || isChatLoading) return;
                    const text = currentChatInput.trim();
                    setCurrentChatInput("");
                    handleAskAITeacherDirectly(text);
                  }}
                  className="p-3 border-t border-slate-200 bg-white flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={currentChatInput}
                    onChange={(e) => setCurrentChatInput(e.target.value)}
                    placeholder="Em hãy nhập câu hỏi để trò chuyện cùng AI..."
                    disabled={isChatLoading}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isChatLoading || !currentChatInput.trim()}
                    className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:bg-slate-100 disabled:text-slate-400 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: QUÁ TRÌNH HỌC TẬP (Overall Adaptive Progress Panel) */}
            {studentActiveTab === "qua-trinh" && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
                {/* Visual Radar / Bar Chart of Subject Grades */}
                <div className="md:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart2 className="w-4 h-4 text-emerald-600" />
                    Biểu đồ trực quan hóa năng lực học tập
                  </h3>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/50">
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                          <YAxis domain={[0, 10]} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                          <Tooltip cursor={{ fill: "#f8fafc" }} contentStyle={{ fontSize: "11px", borderRadius: "12px", border: "1px solid #e2e8f0" }} />
                          <Bar dataKey="Score" radius={[8, 8, 0, 0]} maxBarSize={45}>
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 text-center italic leading-relaxed">
                    * Thang điểm 10.0 dựa trên cơ sở dữ liệu học sinh đồng bộ. Điểm càng cao biểu hiện độ tự chủ và nắm bắt kiến thức sâu sắc.
                  </p>
                </div>

                {/* Score list profile */}
                <div className="md:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                    Phiếu điểm năng lực
                  </h3>

                  <div className="space-y-3.5">
                    {chartData.map((s, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-700">{s.name}</span>
                          <span className="text-slate-900 font-bold">{s.Score.toFixed(1)} / 10.0</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div 
                            className="h-1.5 rounded-full transition-all" 
                            style={{ width: `${s.Score * 10}%`, backgroundColor: s.fill }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Adaptive Recommendations */}
                  <div className="border-t border-slate-100 pt-4 space-y-3">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Khuyến nghị lộ trình cá nhân hóa:</h4>
                    
                    {/* Math Alert */}
                    {student.diemToan < 7 && (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[10px] text-amber-800 flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-slate-800">Cần củng cố toán học</p>
                          <p className="text-slate-500">Môn Toán dưới 7.0. Khuyên em nên ôn lại các bài lý thuyết Số hữu tỉ / Đa thức ở tab "Học tập" và gửi thắc mắc cho AI.</p>
                        </div>
                      </div>
                    )}

                    {/* General Alert */}
                    {student.diemToan >= 7 && student.diemKHTN >= 7 && student.diemTiengAnh >= 7 && student.diemVan >= 7 ? (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[10px] text-emerald-800 flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-slate-800">Thành tích học xuất sắc</p>
                          <p className="text-slate-500">Kết quả học của em rất đồng đều. Hãy rèn luyện thêm câu hỏi nâng cao tại phần "Bài kiểm tra" và nâng tầm kiến thức cùng AI!</p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] text-slate-700 flex items-start gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-slate-800">Mẹo rèn luyện thích ứng</p>
                          <p className="text-slate-500 leading-normal">Hãy làm các đề thi thử trắc nghiệm ở tab **"Bài kiểm tra"** để hệ thống thu thập điểm thi thích ứng nhé!</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* HISTORICAL PRACTICE LOGS */}
                <div className="md:col-span-12 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <History className="w-4 h-4 text-emerald-600" />
                    Nhật ký học tập & Lịch sử thi thử trắc nghiệm ({quizAttempts.length})
                  </h3>

                  {quizAttempts.length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-slate-200 rounded-2xl text-slate-400 space-y-1">
                      <Award className="w-8 h-8 mx-auto opacity-20 animate-pulse" />
                      <p className="text-xs font-bold">Chưa có bản ghi kết quả thi nào</p>
                      <p className="text-[10px] text-slate-400 max-w-sm mx-auto leading-relaxed">
                        Em hãy sang tab **"Bài kiểm tra"**, chọn một chủ đề môn học phù hợp và làm trắc nghiệm thử. Điểm số và thời gian nộp bài sẽ tự động hiển thị ở đây!
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            <th className="pb-2.5">Thời gian</th>
                            <th className="pb-2.5">Chủ đề kiểm tra</th>
                            <th className="pb-2.5">Môn học</th>
                            <th className="pb-2.5 text-center">Số câu đúng</th>
                            <th className="pb-2.5 text-center">Điểm số</th>
                            <th className="pb-2.5 text-right">Đánh giá sư phạm</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600">
                          {quizAttempts.map((attempt) => (
                            <tr key={attempt.id} className="hover:bg-slate-50/50">
                              <td className="py-3 font-mono text-[11px] text-slate-400">{attempt.timestamp}</td>
                              <td className="py-3 font-bold text-slate-800">{attempt.lessonTitle}</td>
                              <td className="py-3">
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-semibold border border-slate-200/50">
                                  {attempt.subject}
                                </span>
                              </td>
                              <td className="py-3 text-center font-mono font-bold text-slate-700">
                                {attempt.correctCount} / {attempt.totalCount}
                              </td>
                              <td className="py-3 text-center">
                                <span className={`font-mono font-extrabold text-sm ${attempt.score >= 8 ? "text-emerald-600" : attempt.score >= 5 ? "text-amber-600" : "text-rose-600"}`}>
                                  {attempt.score.toFixed(1)}
                                </span>
                              </td>
                              <td className="py-3 text-right">
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                                  attempt.score >= 8 
                                    ? "bg-emerald-50 border-emerald-100 text-emerald-700" 
                                    : attempt.score >= 5 
                                      ? "bg-amber-50 border-amber-100 text-amber-700" 
                                      : "bg-rose-50 border-rose-100 text-rose-700"
                                }`}>
                                  {attempt.score >= 8 ? "Xuất sắc" : attempt.score >= 5 ? "Đạt yêu cầu" : "Cần cố gắng"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    );
  }

  if (userRole === "admin") {
    const students = getStudentsList();
    const filteredStudents = students.filter(s => 
      s.hoTen.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.taiKhoan.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans" id="admin-root">
        {/* Navbar */}
        <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs" id="admin-navbar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-900 text-white rounded-xl border border-slate-800">
                <Shield className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h1 className="font-semibold text-lg text-slate-900 tracking-tight font-display">
                  Cổng Quản Trị Hệ Thống Phân Quyền
                </h1>
                <p className="text-xs text-slate-500 hidden sm:block">
                  Quản lý người dùng, cơ sở dữ liệu học sinh, và giám sát bản thiết kế AI Studio
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-sm font-bold text-slate-800">Admin Quản trị viên</span>
                <span className="text-[10px] text-amber-700 font-bold bg-amber-50 border border-amber-100 rounded-full px-2 py-0.5 text-center">Toàn quyền hệ thống</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-all border border-rose-100 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </nav>

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
          {/* Menu sub navigation */}
          <div className="flex bg-white border border-slate-200 rounded-xl p-1 gap-1 w-full md:w-fit border">
            <button
              onClick={() => setAdminActiveTab("stats")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                adminActiveTab === "stats"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              Tổng quan
            </button>
            <button
              onClick={() => setAdminActiveTab("students")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                adminActiveTab === "students"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Quản lý Học sinh ({students.length})
            </button>
            <button
              onClick={() => setAdminActiveTab("instructions")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                adminActiveTab === "instructions"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Kho Bản Thiết Kế AI ({history.length + (result ? 1 : 0)})
            </button>
            <button
              onClick={() => setAdminActiveTab("settings")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                adminActiveTab === "settings"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              Thiết lập hệ thống
            </button>
          </div>

          {/* Sub Panels */}
          {adminActiveTab === "stats" && (
            <div className="space-y-6">
              {/* Metrics block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Học sinh đã nạp</span>
                    <div className="p-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-800">{students.length}</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Nạp từ custom student database</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Giáo viên đã đăng ký</span>
                    <div className="p-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl">
                      <User className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-800">{teachersList.length}</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Đã cấp quyền sư phạm</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Bản Prompt AI đã sinh</span>
                    <div className="p-2 bg-purple-50 text-purple-600 border border-purple-100 rounded-xl">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-800">{history.length + (result ? 1 : 0)}</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Chứa trong bộ nhớ đệm / lịch sử</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Model Gemini Active</span>
                    <div className="p-2 bg-amber-50 text-amber-600 border border-amber-100 rounded-xl">
                      <Cpu className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-amber-800 mt-2">Gemini 3.5 Flash</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Phản hồi siêu tốc, an toàn sư phạm</p>
                </div>
              </div>

              {/* Quick instructions logs and stat tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Danh sách Giáo viên</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 font-bold">
                          <th className="pb-2">Họ tên</th>
                          <th className="pb-2">Tài khoản</th>
                          <th className="pb-2">Môn học</th>
                          <th className="pb-2">Mật khẩu</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-600">
                        {teachersList.map((t, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="py-2.5 font-semibold text-slate-800">{t.hoTen}</td>
                            <td className="py-2.5 font-mono">{t.taiKhoan}</td>
                            <td className="py-2.5">
                              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {t.monHoc}
                              </span>
                            </td>
                            <td className="py-2.5 font-mono">{t.matKhau}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Mô phỏng Hoạt động & Hệ thống</h3>
                  <div className="space-y-3 text-xs leading-relaxed text-slate-600">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <p className="text-slate-700 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        Trạng thái Tường lửa bảo mật (Sandbox):
                      </p>
                      <p className="text-[11px] text-slate-400">Đã cô lập thành công luồng dữ liệu học sinh. Học sinh không thể nhìn thấy System Instruction nguyên bản hay xâm nhập cấu hình máy chủ của giáo viên.</p>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <p className="text-slate-700 font-semibold flex items-center gap-1">
                        <Database className="w-3.5 h-3.5 text-emerald-600" />
                        Tính đồng bộ CSDL:
                      </p>
                      <p className="text-[11px] text-slate-400">Mọi hành vi đăng ký học sinh mới hoặc chỉnh sửa điểm số đều được chuyển đổi thành văn bản thô JSON/CSV ngay lập tức để thuận tiện sao lưu.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {adminActiveTab === "students" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Danh sách học sinh đồng bộ</h3>
                <input
                  type="text"
                  placeholder="Tìm kiếm học sinh theo họ tên hoặc tài khoản..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-72 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold">
                      <th className="pb-2">Họ tên học sinh</th>
                      <th className="pb-2">Tài khoản</th>
                      <th className="pb-2">Mật khẩu</th>
                      <th className="pb-2 text-center">Toán</th>
                      <th className="pb-2 text-center">KHTN</th>
                      <th className="pb-2 text-center">Tiếng Anh</th>
                      <th className="pb-2 text-center">Ngữ văn</th>
                      <th className="pb-2 text-center">Khối học</th>
                      <th className="pb-2 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-center py-6 text-slate-400">Không tìm thấy học sinh nào phù hợp.</td>
                      </tr>
                    ) : (
                      filteredStudents.map((s, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2.5 font-bold text-slate-800">{s.hoTen}</td>
                          <td className="py-2.5 font-mono">{s.taiKhoan}</td>
                          <td className="py-2.5 font-mono">{s.matKhau}</td>
                          <td className="py-2.5 text-center font-semibold text-emerald-600">{s.diemToan}</td>
                          <td className="py-2.5 text-center font-semibold text-emerald-600">{s.diemKHTN}</td>
                          <td className="py-2.5 text-center font-semibold text-emerald-600">{s.diemTiengAnh}</td>
                          <td className="py-2.5 text-center font-semibold text-emerald-600">{s.diemVan}</td>
                          <td className="py-2.5 text-center">
                            {editingUsername === s.taiKhoan ? (
                              <select
                                value={editKhoi}
                                onChange={(e) => setEditKhoi(e.target.value)}
                                className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer font-sans"
                              >
                                <option value="Lớp 6">Khối 6 (Lớp 6)</option>
                                <option value="Lớp 7">Khối 7 (Lớp 7)</option>
                                <option value="Lớp 8">Khối 8 (Lớp 8)</option>
                                <option value="Lớp 9">Khối 9 (Lớp 9)</option>
                              </select>
                            ) : (
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full font-bold text-[10px]">
                                {s.khoi || "Lớp 8"}
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 text-right">
                            {editingUsername === s.taiKhoan ? (
                              <div className="flex justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleSaveStudentGrade(s.taiKhoan)}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] shadow-xs cursor-pointer"
                                >
                                  Lưu
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingUsername(null)}
                                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-lg text-[10px] cursor-pointer"
                                >
                                  Hủy
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingUsername(s.taiKhoan);
                                  setEditKhoi(s.khoi || "Lớp 8");
                                }}
                                className="px-2.5 py-1 text-slate-700 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                              >
                                Sửa Khối
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {adminActiveTab === "instructions" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Toàn bộ Bản Thiết Kế AI đang quản lý</h3>
              {result === null && history.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Cpu className="w-12 h-12 mx-auto mb-3 opacity-25" />
                  <p className="text-sm">Chưa có bản thiết kế System Instruction nào được tạo ra trong phiên làm việc này.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result && (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase">Bản hiện tại</span>
                        <span className="text-[9px] text-slate-400">{result.timestamp}</span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm mb-1">{result.appName}</h4>
                      <p className="text-xs text-slate-500 mb-4 line-clamp-2">Ý tưởng: {result.coreIdea}</p>
                      <pre className="p-3 bg-slate-900 text-slate-100 rounded-lg text-[10px] font-mono overflow-x-auto max-h-36">
                        {result.systemInstruction}
                      </pre>
                    </div>
                  )}

                  {history.map((h, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase">Lịch sử {idx + 1}</span>
                        <span className="text-[9px] text-slate-400">{h.timestamp}</span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm mb-1">{h.appName}</h4>
                      <p className="text-xs text-slate-500 mb-4 line-clamp-2">Ý tưởng: {h.coreIdea}</p>
                      <pre className="p-3 bg-slate-900 text-slate-100 rounded-lg text-[10px] font-mono overflow-x-auto max-h-36">
                        {h.systemInstruction}
                      </pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {adminActiveTab === "settings" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cấu hình Hệ thống & Phân Quyền</h3>
              <div className="space-y-4 text-xs text-slate-600">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-0.5">Tự động kích hoạt Đăng ký tự do (Self-registration)</h4>
                    <p className="text-[10px] text-slate-400">Cho phép học sinh tự đăng ký tài khoản từ cổng đăng nhập bên ngoài mà không cần admin duyệt trước.</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold rounded-lg text-[10px]">Đang Bật (ACTIVE)</span>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-0.5">Độ cô lập luồng chat AI (Prompt Isolation)</h4>
                    <p className="text-[10px] text-slate-400">Ngăn chặn tối đa Prompt Injection để bảo vệ tính công bằng và quy chuẩn sư phạm của bài thi thử nghiệm.</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold rounded-lg text-[10px]">Cực cao (EXCELLENT)</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" id="app-root">
      {/* Upper Top Navbar */}
      <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs" id="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-semibold text-lg text-slate-900 tracking-tight font-display">
                AI Studio System Instruction Generator
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                Hỗ trợ Giáo viên Việt Nam kiến tạo Trợ lý Học tập Đạt chuẩn Sư phạm
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden lg:flex flex-col text-right mr-2">
              <span className="text-xs font-semibold text-slate-800">{currentUser?.hoTen}</span>
              <span className="text-[10px] text-slate-400">Giáo viên: {currentUser?.monHoc} • {currentUser?.capHoc}</span>
            </div>

            <button
              onClick={() => setShowGuideModal(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              id="btn-guide"
            >
              <Info className="w-4 h-4" />
              <span className="hidden md:inline">Cẩm nang AI Studio</span>
            </button>
            <button
              onClick={() => setShowHistorySidebar(true)}
              className="relative flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-100"
              id="btn-history"
            >
              <History className="w-4 h-4" />
              <span>Lịch sử ({history.length})</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg border border-rose-100 transition-colors cursor-pointer"
              title="Đăng xuất"
              id="btn-logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Banner / Introduction Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 rounded-2xl shadow-sm relative overflow-hidden" id="hero-banner">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <GraduationCap className="w-48 h-48" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <span className="bg-emerald-500/30 text-emerald-100 text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-emerald-400/20">
              Công cụ nghiệp vụ sư phạm
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-3 font-display tracking-tight leading-tight">
              Biến ý tưởng giảng dạy thành Chatbot thông minh trên Google AI Studio
            </h2>
            <p className="text-emerald-100 mt-2 text-sm md:text-base leading-relaxed">
              Bạn chỉ cần mô tả ý tưởng bằng tiếng Việt giản dị. Công cụ sẽ tự động phân tích độ tuổi, áp dụng lý thuyết sư phạm K-12 và biên soạn một bản <strong>System Instruction bằng tiếng Anh tối ưu nhất</strong>, giúp mô hình Gemini hiểu và tương tác với học sinh một cách xuất sắc.
            </p>
          </div>
        </div>

        {/* Quick Presets Grid */}
        <div id="presets-section">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <BookOpenCheck className="w-4 h-4 text-emerald-600" />
            Chọn nhanh Ý tưởng Mẫu (Presets)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRESETS.map((preset) => (
              <motion.button
                key={preset.id}
                whileHover={{ y: -2 }}
                onClick={() => selectPreset(preset)}
                className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-500 text-left p-4 rounded-xl shadow-xs transition-all duration-200 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {preset.tag}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {preset.grade.split(" ")[0]}
                    </span>
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm line-clamp-1 mb-1">
                    {preset.subject} - {preset.teacherName}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {preset.coreIdea}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-emerald-600">
                  <span>Áp dụng mẫu này</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Side-by-Side Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="workspace">
          
          {/* LEFT: Creator Form */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs" id="form-container">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-600" />
                Cấu hình ý tưởng App
              </h3>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 hover:bg-slate-100 px-2 py-1 rounded transition-colors"
                id="btn-reset"
              >
                <RotateCcw className="w-3 h-3" />
                Xóa làm lại
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Teacher / Author Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Họ tên Giáo viên (Tác giả)
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Thầy Nguyễn Văn A"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  id="input-teacher"
                />
              </div>

              {/* Grid: Subject & Grades */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    Môn học *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Tin học, Toán, Anh..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    id="input-subject"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    Cấp học / Lớp học *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Lớp 6, Lớp 7 (THCS)"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    id="input-grade"
                  />
                </div>
              </div>

              {/* Core Idea Textarea */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-slate-400" />
                  Mô tả Ý tưởng cơ bản *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Mô tả ngắn gọn ứng dụng của bạn sẽ làm gì... (Ví dụ: Giúp học sinh lớp 6 ôn tập kiến thức toán phương trình bằng ví dụ thực tế trực quan.)"
                  value={coreIdea}
                  onChange={(e) => setCoreIdea(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none leading-relaxed"
                  id="textarea-idea"
                />
              </div>

              {/* Core Features Textarea */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-slate-400" />
                  Các Tính năng chính mong muốn
                </label>
                <textarea
                  rows={3}
                  placeholder="Mỗi dòng là một tính năng... (Ví dụ:&#10;- Sinh câu hỏi ôn tập theo bài học&#10;- Đánh giá đúng/sai từng bước giải&#10;- Gợi ý bài học tiếp theo)"
                  value={coreFeatures}
                  onChange={(e) => setCoreFeatures(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none leading-relaxed text-xs"
                  id="textarea-features"
                />
              </div>

              {/* Grid: Tone & Explanation Style */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Giọng điệu giao tiếp
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    id="select-tone"
                  >
                    <option>Thân thiện, khích lệ & Sáng tạo</option>
                    <option>Nghiêm túc, mô phạm & Kiên nhẫn</option>
                    <option>Vui vẻ, sinh động & Đồng hành</option>
                    <option>Gợi mở, truyền cảm hứng & Khoa học</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Giải thích & Sư phạm
                  </label>
                  <select
                    value={explanationStyle}
                    onChange={(e) => setExplanationStyle(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    id="select-style"
                  >
                    <option>Đặt câu hỏi gợi mở (Scaffolding)</option>
                    <option>Từng bước chi tiết (Step-by-step)</option>
                    <option>Học thuyết kiến tạo (Constructivism)</option>
                    <option>Giải thích kết hợp ví dụ thực tế</option>
                  </select>
                </div>
              </div>

              {/* Custom Student Database Configuration Section */}
              <div className="border border-slate-200 bg-slate-50/50 p-4.5 rounded-xl space-y-4" id="custom-database-section">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Cơ sở dữ liệu học sinh mẫu & Bảo mật
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Thiết lập dữ liệu tài khoản, mật khẩu, và điểm số của học sinh
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-500 leading-relaxed space-y-1.5">
                  <p className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    Cổng bảo mật Đăng nhập (Login) / Đăng ký (Register)
                  </p>
                  <p className="text-[11px]">
                    Hệ thống sẽ lập trình chatbot ảo bảo mật thông tin. Học sinh bắt buộc phải nhập đúng <strong>tài khoản</strong> và <strong>mật khẩu</strong> đã có trong CSDL (hoặc đăng ký mới) để bắt đầu. AI sẽ cá nhân hóa bài giảng dựa trên điểm số các môn: <strong>Toán, KHTN, Tiếng Anh, Văn học</strong>.
                  </p>
                </div>

                {/* Upload & Drag Drop Area */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  className="border-2 border-dashed border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/10 rounded-xl p-4 text-center cursor-pointer transition-all relative group"
                  onClick={() => document.getElementById("file-db-upload")?.click()}
                  id="drag-drop-db-zone"
                >
                  <input
                    type="file"
                    id="file-db-upload"
                    accept=".json,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Upload className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 mx-auto mb-2 transition-colors" />
                  <p className="text-xs font-semibold text-slate-700">
                    Kéo thả hoặc Click để tải tệp CSDL mẫu (.JSON, .CSV)
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Hỗ trợ tệp bảng tính CSV hoặc danh sách JSON học sinh đầy đủ 7 trường
                  </p>
                </div>

                {/* Formats Tabs & Quick Preset Actions */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setDbFormat("json");
                        setCustomDatabase(DEFAULT_JSON_DB);
                      }}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                        dbFormat === "json"
                          ? "bg-emerald-100 text-emerald-800"
                          : "text-slate-500 hover:bg-slate-200/50"
                      }`}
                    >
                      Định dạng JSON
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDbFormat("csv");
                        setCustomDatabase(DEFAULT_CSV_DB);
                      }}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                        dbFormat === "csv"
                          ? "bg-emerald-100 text-emerald-800"
                          : "text-slate-500 hover:bg-slate-200/50"
                      }`}
                    >
                      Định dạng CSV
                    </button>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setCustomDatabase(dbFormat === "json" ? DEFAULT_JSON_DB : DEFAULT_CSV_DB);
                    }}
                    className="text-[10px] text-slate-500 hover:text-emerald-600 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Tải lại CSDL mẫu gốc
                  </button>
                </div>

                {/* Textarea Editor */}
                <div>
                  <textarea
                    rows={6}
                    value={customDatabase}
                    onChange={(e) => setCustomDatabase(e.target.value)}
                    className="w-full p-2.5 font-mono text-[11px] text-slate-600 bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all leading-relaxed"
                    placeholder={
                      dbFormat === "json"
                        ? "Dán cấu trúc JSON chứa danh sách học sinh..."
                        : "Họ tên học sinh,Tài khoản,Mật khẩu,Điểm Toán,Điểm KHTN,Điểm Tiếng Anh,Điểm Văn..."
                    }
                  />
                </div>

                {/* Checklist validation badge indicators */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Phân tích trường dữ liệu yêu cầu:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-0.5 transition-all ${
                        validation.hasName
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {validation.hasName ? "✓" : "✗"} Họ tên
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-0.5 transition-all ${
                        validation.hasAccount
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {validation.hasAccount ? "✓" : "✗"} Tài khoản
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-0.5 transition-all ${
                        validation.hasPassword
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {validation.hasPassword ? "✓" : "✗"} Mật khẩu
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-0.5 transition-all ${
                        validation.hasMath
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {validation.hasMath ? "✓" : "✗"} Điểm Toán
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-0.5 transition-all ${
                        validation.hasScience
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {validation.hasScience ? "✓" : "✗"} Điểm KHTN
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-0.5 transition-all ${
                        validation.hasEnglish
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {validation.hasEnglish ? "✓" : "✗"} Điểm T.Anh
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-0.5 transition-all ${
                        validation.hasLiterature
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {validation.hasLiterature ? "✓" : "✗"} Điểm Văn
                    </span>
                  </div>
                </div>
              </div>

              {/* Error Message if any */}
              {error && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-start gap-2" id="error-box">
                  <X className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Action Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                id="btn-submit"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Đang thiết lập sư phạm...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Thiết kế System Instruction</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: Output Panel / Empty State */}
          <div className="lg:col-span-7" id="output-container">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs flex flex-col items-center justify-center min-h-[450px] text-center"
                  id="loading-panel"
                >
                  <div className="relative flex items-center justify-center mb-6">
                    <div className="absolute animate-ping h-16 w-16 rounded-full bg-emerald-100 opacity-75"></div>
                    <div className="relative rounded-full p-4 bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <Cpu className="w-8 h-8 animate-pulse" />
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg mb-1 font-display">
                    Đang thiết kế System Instruction
                  </h4>
                  <p className="text-slate-500 text-sm max-w-md mb-6 leading-relaxed">
                    Hệ thống đang gọi Gemini 3.5 Flash để soạn thảo hướng dẫn đạt chuẩn nghiệp vụ sư phạm dựa trên thông tin giáo viên cung cấp.
                  </p>

                  {/* Progress Indicator Steps */}
                  <div className="w-full max-w-sm bg-slate-100 rounded-full h-1.5 overflow-hidden mb-4">
                    <div
                      className="bg-emerald-600 h-full transition-all duration-1000"
                      style={{ width: `${((loadingStep + 1) / loadingStepsText.length) * 100}%` }}
                    ></div>
                  </div>
                  <motion.p
                    key={loadingStep}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-semibold text-emerald-600 italic h-4"
                  >
                    {loadingStepsText[loadingStep]}
                  </motion.p>
                </motion.div>
              )}

              {!loading && !result && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs flex flex-col items-center justify-center min-h-[480px] text-center"
                  id="empty-panel"
                >
                  <div className="p-4 bg-slate-50 text-slate-400 rounded-full border border-slate-100 mb-4">
                    <GraduationCap className="w-10 h-10" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-base mb-1">
                    Hãy bắt đầu lập trình sư phạm AI
                  </h4>
                  <p className="text-slate-500 text-sm max-w-md leading-relaxed mb-6">
                    Quý thầy cô vui lòng điền thông tin mô tả ứng dụng ở khung bên trái hoặc click vào một <strong>Ý tưởng Mẫu</strong> ở trên để trải nghiệm nhanh.
                  </p>

                  <div className="border-t border-slate-100 pt-6 w-full max-w-md text-left">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-emerald-600" />
                      Tại sao System Instruction quan trọng?
                    </h5>
                    <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 shrink-0 mt-0.5">●</span>
                        <span>Định hình **Vai trò & Tính cách** (như trợ lý, giáo viên, bạn bè đồng hành) để AI xưng hô chuẩn mực.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 shrink-0 mt-0.5">●</span>
                        <span>Giới hạn **Phạm vi kiến thức** để AI không trả lời lan man ngoài nội dung chương trình học phổ thông.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 shrink-0 mt-0.5">●</span>
                        <span>Thiết lập **Phương pháp sư phạm** (gợi mở scaffolding) giúp phát triển tư duy học sinh thay vì chép bài giải sẵn.</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {!loading && result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                  id="result-panel"
                >
                  {/* Generated Heading & Analysis Box */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-0.5">
                            Đã sinh thành công
                          </span>
                          <span className="text-xs text-slate-400">
                            vào {result.timestamp}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 mt-2 font-display">
                          {result.appName}
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Tác giả: {result.teacherName} | Môn: {result.subject} | Lớp: {result.grade}
                        </p>
                      </div>
                      <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 shrink-0">
                        <Award className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="bg-slate-50 border-l-4 border-emerald-500 p-4 rounded-r-xl mt-4 text-xs text-slate-700 leading-relaxed flex items-start gap-3">
                      <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-900 font-semibold mb-0.5">Phân tích Sư phạm từ Chuyên gia AI:</strong>
                        {result.conceptAnalysis}
                      </div>
                    </div>
                  </div>

                  {/* Tabs Selector */}
                  <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-100/50 p-1 rounded-xl border">
                    <button
                      onClick={() => setActiveTab("system")}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                        activeTab === "system"
                          ? "bg-white text-emerald-700 shadow-sm border border-slate-200/50"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/55"
                      }`}
                      id="tab-system"
                    >
                      <Cpu className="w-3.5 h-3.5" />
                      System Instruction
                    </button>
                    <button
                      onClick={() => setActiveTab("test")}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                        activeTab === "test"
                          ? "bg-white text-emerald-700 shadow-sm border border-slate-200/50"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/55"
                      }`}
                      id="tab-test"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Kiểm thử App
                    </button>
                    <button
                      onClick={() => setActiveTab("upgrades")}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                        activeTab === "upgrades"
                          ? "bg-white text-emerald-700 shadow-sm border border-slate-200/50"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/55"
                      }`}
                      id="tab-upgrades"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      Gợi ý nâng cấp
                    </button>
                    <button
                      onClick={() => setActiveTab("database")}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                        activeTab === "database"
                          ? "bg-white text-emerald-700 shadow-sm border border-slate-200/50"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/55"
                      }`}
                      id="tab-database"
                    >
                      <Database className="w-3.5 h-3.5" />
                      CSDL Mẫu
                    </button>
                  </div>

                  {/* Tabs Content Box */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                    {activeTab === "system" && (
                      <div className="space-y-4" id="content-system">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                            System Instruction (English)
                            <span className="text-[10px] font-normal text-slate-500">Copy đoạn này dán vào ô System Instruction ở AI Studio</span>
                          </h4>
                          <button
                            onClick={() => copyToClipboard(result.systemInstruction, "system")}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all shadow-xs cursor-pointer"
                            id="btn-copy-system"
                          >
                            {copiedSection === "system" ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Đã sao chép</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Sao chép Code</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Pedagogical Tip Banner */}
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-start gap-2">
                          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>Mẹo nghiệp vụ:</strong> Bản System Instruction được soạn bằng tiếng Anh vì mô hình AI sẽ tuân thủ tốt nhất và tránh bị phá rào bảo mật, nhưng AI đã được thiết lập để <strong>luôn trả lời học sinh bằng tiếng Việt thân thiện</strong>.
                          </span>
                        </div>

                        <div className="relative">
                          <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[400px]">
                            {result.systemInstruction}
                          </pre>
                        </div>
                      </div>
                    )}

                    {activeTab === "test" && (
                      <div className="space-y-4" id="content-test">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-800">
                            Kịch bản và các bước Kiểm thử App (Bằng tiếng Việt)
                          </h4>
                          <button
                            onClick={() => copyToClipboard(result.testInstructions, "test")}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all cursor-pointer"
                            id="btn-copy-test"
                          >
                            {copiedSection === "test" ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>Copy Hướng dẫn</span>
                          </button>
                        </div>

                        <div className="prose prose-slate max-w-none text-xs leading-relaxed text-slate-600">
                          <div className="markdown-body">
                            <Markdown>{result.testInstructions}</Markdown>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "upgrades" && (
                      <div className="space-y-4" id="content-upgrades">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-800">
                            Các Đề xuất Nâng cấp tính năng nâng cao trong tương lai
                          </h4>
                          <button
                            onClick={() => copyToClipboard(result.upgradeSuggestions, "upgrades")}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all cursor-pointer"
                            id="btn-copy-upgrades"
                          >
                            {copiedSection === "upgrades" ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>Copy Đề xuất</span>
                          </button>
                        </div>

                        <div className="prose prose-slate max-w-none text-xs leading-relaxed text-slate-600">
                          <div className="markdown-body">
                            <Markdown>{result.upgradeSuggestions}</Markdown>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "database" && (
                      <div className="space-y-4" id="content-database">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-800">
                            Cơ sở dữ liệu câu hỏi / Từ vựng mẫu (Sample Database)
                          </h4>
                          <button
                            onClick={() => copyToClipboard(result.sampleDatabase, "database")}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 rounded-lg transition-all cursor-pointer"
                            id="btn-copy-database"
                          >
                            {copiedSection === "database" ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>Copy CSDL</span>
                          </button>
                        </div>

                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800 flex items-start gap-2">
                          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>Cách dùng CSDL:</strong> Thầy/Cô có thể copy khối dữ liệu này và dán trực tiếp vào góc dưới của System Instruction hoặc truyền tải trực tiếp trong hộp thoại kiểm thử trên AI Studio làm ngân hàng dữ liệu để AI tham khảo.
                          </span>
                        </div>

                        <div className="prose prose-slate max-w-none text-xs leading-relaxed text-slate-600">
                          <div className="markdown-body">
                            <Markdown>{result.sampleDatabase}</Markdown>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Informative Handbook Accordion / FAQ */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs" id="quick-handbook">
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
            <GraduationCap className="w-5 h-5 text-emerald-600" />
            Cẩm nang nhanh cho Giáo viên sử dụng Google AI Studio
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">1</span>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm mb-1">Dán System Instruction</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Đăng nhập vào <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-medium hover:underline inline-flex items-center gap-0.5">Google AI Studio <ExternalLink className="w-3 h-3" /></a>, tạo một Chat Prompt mới và dán toàn bộ mã System Instruction bằng tiếng Anh vào ô <strong>"System Instructions"</strong> ở cột bên phải màn hình.
                </p>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">2</span>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm mb-1">Thiết lập tham số và kiểm thử</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Ở phần Model, chọn <strong>Gemini 2.5 Flash</strong> hoặc <strong>Gemini 1.5 Flash</strong>. Hãy gõ thử các câu chào hỏi, trả lời sai thử các thử thách để kiểm tra phản hồi sư phạm của chatbot ảo xem đã đạt yêu cầu chưa.
                </p>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3">
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">3</span>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm mb-1">Xuất bản và chia sẻ</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Bấm nút <strong>Get Code</strong> ở góc trên bên phải để lấy mã API nhúng vào web trường học, hoặc bấm <strong>Share</strong> để tạo link web chia sẻ trực tiếp ứng dụng chatbot thông minh này cho các em học sinh tự luyện tập tại nhà!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AI Studio Prompt Designer dành cho Giáo dục Việt Nam.</p>
          <div className="flex items-center space-x-4">
            <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors inline-flex items-center gap-1">
              Google AI Studio <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <span className="text-slate-400">Được vận hành bởi Gemini 3.5 Flash</span>
          </div>
        </div>
      </footer>

      {/* SIDEBAR: History Panel */}
      <AnimatePresence>
        {showHistorySidebar && (
          <div className="fixed inset-0 z-50 flex justify-end" id="history-sidebar-container">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistorySidebar(false)}
              className="absolute inset-0 bg-black"
            />
            
            {/* Sidebar Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative w-full max-w-md h-full bg-white shadow-xl flex flex-col z-10 border-l border-slate-200"
            >
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center space-x-2">
                  <History className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-slate-800">Lịch sử thiết kế ({history.length})</h3>
                </div>
                <button
                  onClick={() => setShowHistorySidebar(false)}
                  className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {history.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <History className="w-12 h-12 mx-auto mb-3 opacity-25" />
                    <p className="text-sm">Chưa có bản ghi lịch sử nào được lưu trữ.</p>
                    <p className="text-xs text-slate-400 mt-1">Các thiết lập của bạn sẽ tự động lưu lại đây.</p>
                  </div>
                ) : (
                  history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setResult(item);
                        setActiveTab("system");
                        setShowHistorySidebar(false);
                      }}
                      className="group relative bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 p-4 rounded-xl cursor-pointer transition-all duration-150"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          {item.subject}
                        </span>
                        <button
                          onClick={(e) => deleteHistoryItem(item.id, e)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm mt-1 line-clamp-1">
                        {item.appName}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {item.coreIdea}
                      </p>
                      <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Lớp: {item.grade}</span>
                        <span>{item.timestamp.split(" ")[1] || item.timestamp}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: Full Detailed Guide */}
      <AnimatePresence>
        {showGuideModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="guide-modal-container">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGuideModal(false)}
              className="absolute inset-0 bg-black"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh] z-10 border border-slate-200"
            >
              <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-emerald-50">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-bold text-slate-800 text-lg">Hướng dẫn triển khai trên Google AI Studio</h3>
                </div>
                <button
                  onClick={() => setShowGuideModal(false)}
                  className="p-1.5 hover:bg-slate-200/50 rounded-lg text-slate-500 hover:text-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  Google AI Studio là một nền tảng tạo mẫu nhanh (prototyping environment) miễn phí của Google để xây dựng các kịch bản tương tác với các mô hình ngôn ngữ lớn (Gemini). Dưới đây là các bước giúp thầy cô triển khai nhanh:
                </p>

                <div className="space-y-4 mt-2">
                  <div className="border-l-4 border-emerald-500 pl-3">
                    <h4 className="font-bold text-slate-800 text-sm">Bước 1: Tạo Chat Prompt mới</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Truy cập <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-semibold inline-flex items-center gap-0.5">aistudio.google.com <ExternalLink className="w-3 h-3" /></a>. Bấm vào nút <strong>Create new prompt</strong> và chọn <strong>Chat Prompt</strong>.
                    </p>
                  </div>

                  <div className="border-l-4 border-emerald-500 pl-3">
                    <h4 className="font-bold text-slate-800 text-sm">Bước 2: Cấu hình System Instruction</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Bấm vào tab "System Instructions" nằm ở góc phải hoặc ô nhập đầu tiên. Copy đoạn code System Instruction tiếng Anh do công cụ sinh ra và dán vào đó. Việc viết bằng tiếng Anh đảm bảo AI tuân thủ luật cực tốt, không bị hack phá luật, nhưng phản hồi cuối vẫn hoàn toàn bằng tiếng Việt chuẩn sư phạm.
                    </p>
                  </div>

                  <div className="border-l-4 border-emerald-500 pl-3">
                    <h4 className="font-bold text-slate-800 text-sm">Bước 3: Nhúng cơ sở dữ liệu mẫu</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Dán CSDL mẫu (ví dụ: Ngân hàng câu hỏi, bảng thuật ngữ) ngay dưới đoạn System Instruction hoặc lưu trữ trong một tệp văn bản. AI sẽ dựa vào nguồn dữ liệu chuẩn này để sinh đề trắc nghiệm hoặc sửa bài thay vì tự nghĩ lan man.
                    </p>
                  </div>

                  <div className="border-l-4 border-emerald-500 pl-3">
                    <h4 className="font-bold text-slate-800 text-sm">Bước 4: Chia sẻ cho học sinh tự học</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Thầy cô bấm nút <strong>Share</strong> ở thanh menu phía trên, sau đó bật tính năng Public Link và gửi link cho học sinh lớp mình tự học trực tuyến. Thầy cô hoàn toàn không mất chi phí duy trì máy chủ hay bảo mật phức tạp!
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setShowGuideModal(false)}
                  className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg text-xs hover:bg-emerald-700 transition-colors"
                >
                  Tôi đã hiểu
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
