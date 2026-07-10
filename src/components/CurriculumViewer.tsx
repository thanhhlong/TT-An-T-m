import { useState } from "react";
import { CURRICULUM_DATA, Lesson } from "../curriculumData";
import { BookOpen, Award, CheckCircle, ChevronDown, ChevronUp, Sparkles, BookOpenCheck } from "lucide-react";
import Markdown from "react-markdown";

interface CurriculumViewerProps {
  role: "teacher" | "admin";
}

export default function CurriculumViewer({ role }: CurriculumViewerProps) {
  const [selectedGrade, setSelectedGrade] = useState<string>("Lớp 8");
  const [selectedSubject, setSelectedSubject] = useState<string>("Toán");
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

  const grades = ["Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9"];
  const subjects = ["Toán", "Tiếng Anh", "Văn", "KHTN"];

  const curriculumData = (() => {
    const saved = localStorage.getItem("antam_curriculum_data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading curriculum data in CurriculumViewer", e);
      }
    }
    return CURRICULUM_DATA;
  })();

  const activeLessons = curriculumData[selectedGrade]?.[selectedSubject] || [];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6" id="curriculum-viewer-root">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <BookOpenCheck className="w-5 h-5 text-emerald-600" />
            Khung Học Liệu & Đề Thi Mẫu Toàn Quốc (GDPT 2018)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {role === "teacher" 
              ? "Quyền Giáo viên: Tra cứu và tham khảo toàn bộ chương trình học tập đa khối"
              : "Quyền Quản trị viên: Quản trị và kiểm duyệt ngân hàng tài nguyên học thuật toàn hệ thống"
            }
          </p>
        </div>
        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold rounded-full w-fit">
          {role === "teacher" ? "Bảng Giáo viên" : "Hệ thống Admin"}
        </span>
      </div>

      {/* Grade Selector Row */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Chọn Khối Lớp
        </label>
        <div className="flex flex-wrap gap-2">
          {grades.map((grade) => (
            <button
              key={grade}
              onClick={() => {
                setSelectedGrade(grade);
                setExpandedLessonId(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedGrade === grade
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/50"
              }`}
            >
              Khối {grade.split(" ")[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Selector Row */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Chọn Môn Học
        </label>
        <div className="flex flex-wrap gap-2">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => {
                setSelectedSubject(sub);
                setExpandedLessonId(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSubject === sub
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/50"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons List Content */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span>Danh sách bài giảng ({activeLessons.length})</span>
          <span>Khối: {selectedGrade} • Môn: {selectedSubject}</span>
        </div>

        {activeLessons.length === 0 ? (
          <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-xl">
            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-xs">Không tìm thấy tài liệu phù hợp cho bộ lọc này.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeLessons.map((lesson: Lesson) => {
              const isExpanded = expandedLessonId === lesson.id;
              return (
                <div
                  key={lesson.id}
                  className={`border rounded-xl transition-all ${
                    isExpanded 
                      ? "border-emerald-500 bg-emerald-50/5 shadow-xs" 
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {/* Collapsible Header */}
                  <div
                    onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}
                    className="p-4 flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
                        {lesson.summary}
                      </p>
                    </div>
                    <button className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Expanded Body */}
                  {isExpanded && (
                    <div className="px-4 pb-5 pt-1 border-t border-slate-100 space-y-6">
                      {/* Theory content */}
                      <div className="space-y-2">
                        <h5 className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md w-fit flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          Nội dung Tóm tắt Giáo trình Sư phạm
                        </h5>
                        <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-700 leading-relaxed border border-slate-200/50 markdown-body">
                          <Markdown>{lesson.theory}</Markdown>
                        </div>
                      </div>

                      {/* Quiz Question Bank */}
                      <div className="space-y-3">
                        <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-emerald-600" />
                          Ngân hàng câu hỏi trắc nghiệm
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {lesson.questions.map((q, qIdx) => (
                            <div key={qIdx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
                              <span className="text-[9px] font-bold text-slate-400 uppercase">Câu hỏi {qIdx + 1}</span>
                              <p className="font-bold text-slate-800 text-xs leading-relaxed">{q.question}</p>
                              <div className="space-y-1.5">
                                {q.options.map((opt, oIdx) => (
                                  <div 
                                    key={oIdx} 
                                    className={`p-2 rounded-lg text-xs flex items-center gap-2 border ${
                                      oIdx === q.correctIndex
                                        ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-medium"
                                        : "bg-slate-50 border-slate-100 text-slate-600"
                                    }`}
                                  >
                                    <span className="font-mono text-[10px] w-4 h-4 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                                      {String.fromCharCode(65 + oIdx)}
                                    </span>
                                    <span>{opt}</span>
                                    {oIdx === q.correctIndex && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 ml-auto shrink-0" />}
                                  </div>
                                ))}
                              </div>
                              <div className="mt-3 pt-3 border-t border-slate-100 bg-amber-50/30 p-2.5 rounded-lg text-[11px] text-slate-500 leading-relaxed">
                                <strong className="text-amber-800 font-semibold block mb-0.5">Lời giải chi tiết:</strong>
                                {q.explanation}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
