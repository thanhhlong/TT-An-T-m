export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  theory: string;
  questions: QuizQuestion[];
  // Exam visibility controls (managed by admin). Undefined examVisible defaults to visible
  // for backward compatibility with existing lesson/quiz data.
  examVisible?: boolean;
  examVisibleAt?: string; // ISO datetime string; exam auto-shows once this time is reached
}

export interface SubjectData {
  subjectName: string;
  lessons: Lesson[];
}

export interface GradeData {
  gradeName: string; // "Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9"
  subjects: {
    [key: string]: Lesson[]; // "Toán", "Tiếng Anh", "Văn", "KHTN"
  };
}

export const CURRICULUM_DATA: { [grade: string]: { [subject: string]: Lesson[] } } = {
  "Lớp 6": {
    "Toán": [
      {
        id: "m6-1",
        title: "Bài 1: Tập hợp và phần tử của tập hợp",
        summary: "Hiểu khái niệm tập hợp, cách viết tập hợp bằng liệt kê hoặc chỉ ra tính chất đặc trưng, tập hợp số tự nhiên ℕ và ℕ*.",
        theory: `### 1. Tập hợp và Phần tử
- **Tập hợp** (gọi tắt là tập) bao gồm những đối tượng nhất định. Các đối tượng này được gọi là **phần tử** của tập hợp.
- Ví dụ: Tập hợp các bông hồng trong lọ hoa, tập hợp ba con cá vàng trong bình, tập hợp các học sinh trong lớp.
- Kí hiệu:
  - $x \\in A$ (đọc là $x$ thuộc $A$, nghĩa là $x$ là phần tử của $A$).
  - $y \\notin A$ (đọc là $y$ không thuộc $A$, nghĩa là $y$ không phải phần tử của $A$).
- Người ta thường đặt tên tập hợp bằng chữ cái in hoa như $A, B, C, M, N...$

### 2. Mô tả một tập hợp (Cách viết tập hợp)
Có hai cách thường dùng để mô tả một tập hợp:
1. **Cách 1: Liệt kê các phần tử của tập hợp.**
   - Ta viết các phần tử trong cặp ngoặc nhọn $\\{ \\}$, cách nhau bởi dấu chấm phẩy ";".
   - Mỗi phần tử được liệt kê đúng một lần, thứ tự liệt kê tùy ý.
   - *Ví dụ:* Tập hợp các số tự nhiên chẵn nhỏ hơn 10: $C = \\{0; 2; 4; 6; 8\\}$.
2. **Cách 2: Nêu dấu hiệu đặc trưng cho các phần tử của tập hợp.**
   - Chỉ ra thuộc tính chung của tất cả các phần tử.
   - *Ví dụ:* $C = \\{n \\in \\mathbb{N} \\mid n \\text{ là số chẵn và } n < 10\\}$.

### 3. Tập hợp số tự nhiên $\\mathbb{N}$ và $\\mathbb{N}^*$
- Tập hợp các số tự nhiên được kí hiệu là $\\mathbb{N}$: $\\mathbb{N} = \\{0; 1; 2; 3; 4; ...\\}$.
- Tập hợp các số tự nhiên khác 0 được kí hiệu là $\\mathbb{N}^*$: $\\mathbb{N}^* = \\{1; 2; 3; 4; ...\\}$.
- *Lưu ý:* Kí hiệu $x \\in \\mathbb{N} \\mid x < 5$ nghĩa là $x$ là số tự nhiên từ $0$ đến $4$.`,
        questions: [
          {
            question: "Cho tập hợp M = {x ∈ N* | x < 5}. Hãy viết tập hợp M dưới dạng liệt kê các phần tử.",
            options: [
              "M = {0; 1; 2; 3; 4}",
              "M = {1; 2; 3; 4}",
              "M = {1; 2; 3; 4; 5}",
              "M = {0; 1; 2; 3; 4; 5}"
            ],
            correctIndex: 1,
            explanation: "Tập hợp M chứa các số tự nhiên thuộc N* (nghĩa là khác 0) và nhỏ hơn 5. Các số đó là 1, 2, 3, 4. Do đó M = {1; 2; 3; 4}."
          },
          {
            question: "Cho tập hợp A = {x; y; z}. Phát biểu nào sau đây là SAI?",
            options: [
              "x ∈ A",
              "w ∉ A",
              "y ∈ A",
              "A = {z; x; w}"
            ],
            correctIndex: 3,
            explanation: "Tập hợp A gồm ba phần tử x, y, z. Phát biểu 'A = {z; x; w}' là sai vì phần tử 'w' không nằm trong tập hợp A ban đầu."
          },
          {
            "question": "Cho tập hợp A = {x ∈ N | 2 ≤ x < 10}. Viết tập hợp A dưới dạng liệt kê.",
            "options": [
              "{2; 3; 4; 5; 6; 7; 8; 9; 10}",
              "{2; 3; 4; 5; 6; 7; 8}",
              "{3; 4; 5; 6; 7; 8; 9}",
              "{2; 3; 4; 5; 6; 7; 8; 9}"
            ],
            "correctIndex": 3,
            "explanation": "Điều kiện 2 ≤ x < 10 nghĩa là x nhận các giá trị từ 2 đến 9. Vậy A = {2; 3; 4; 5; 6; 7; 8; 9}."
          },
          {
            "question": "Cho tập hợp B = {x ∈ N | 4 < x ≤ 11}. Viết tập hợp B dưới dạng liệt kê.",
            "options": [
              "{6; 7; 8; 9; 10; 11; 12}",
              "{5; 6; 7; 8; 9; 10; 11}",
              "{5; 6; 7; 8; 9; 10}",
              "{4; 5; 6; 7; 8; 9; 10; 11}"
            ],
            "correctIndex": 1,
            "explanation": "Điều kiện 4 < x ≤ 11 nghĩa là x không nhận giá trị 4 nhưng nhận giá trị 11, tức x chạy từ 5 đến 11. Vậy B = {5; 6; 7; 8; 9; 10; 11}."
          },
          {
            "question": "Cho tập hợp A = {x ∈ N | 0 ≤ x < 7}. Viết tập hợp A dưới dạng liệt kê.",
            "options": [
              "{0; 1; 2; 3; 4; 5; 6}",
              "{0; 1; 2; 3; 4; 5; 6; 7}",
              "{1; 2; 3; 4; 5; 6}",
              "{0; 1; 2; 3; 4; 5}"
            ],
            "correctIndex": 0,
            "explanation": "Điều kiện 0 ≤ x < 7 nghĩa là x nhận các giá trị từ 0 đến 6. Vậy A = {0; 1; 2; 3; 4; 5; 6}."
          },
          {
            "question": "Cho tập hợp B = {x ∈ N | 6 < x ≤ 13}. Viết tập hợp B dưới dạng liệt kê.",
            "options": [
              "{7; 8; 9; 10; 11; 12; 13}",
              "{6; 7; 8; 9; 10; 11; 12; 13}",
              "{8; 9; 10; 11; 12; 13; 14}",
              "{7; 8; 9; 10; 11; 12}"
            ],
            "correctIndex": 0,
            "explanation": "Điều kiện 6 < x ≤ 13 nghĩa là x không nhận giá trị 6 nhưng nhận giá trị 13, tức x chạy từ 7 đến 13. Vậy B = {7; 8; 9; 10; 11; 12; 13}."
          },
          {
            "question": "Cho tập hợp A = {x ∈ N | 3 ≤ x < 12}. Viết tập hợp A dưới dạng liệt kê.",
            "options": [
              "{3; 4; 5; 6; 7; 8; 9; 10; 11}",
              "{3; 4; 5; 6; 7; 8; 9; 10; 11; 12}",
              "{3; 4; 5; 6; 7; 8; 9; 10}",
              "{4; 5; 6; 7; 8; 9; 10; 11}"
            ],
            "correctIndex": 0,
            "explanation": "Điều kiện 3 ≤ x < 12 nghĩa là x nhận các giá trị từ 3 đến 11. Vậy A = {3; 4; 5; 6; 7; 8; 9; 10; 11}."
          },
          {
            "question": "Cho tập hợp B = {x ∈ N | 1 < x ≤ 9}. Viết tập hợp B dưới dạng liệt kê.",
            "options": [
              "{2; 3; 4; 5; 6; 7; 8}",
              "{2; 3; 4; 5; 6; 7; 8; 9}",
              "{3; 4; 5; 6; 7; 8; 9; 10}",
              "{1; 2; 3; 4; 5; 6; 7; 8; 9}"
            ],
            "correctIndex": 1,
            "explanation": "Điều kiện 1 < x ≤ 9 nghĩa là x không nhận giá trị 1 nhưng nhận giá trị 9, tức x chạy từ 2 đến 9. Vậy B = {2; 3; 4; 5; 6; 7; 8; 9}."
          },
          {
            "question": "Tập hợp C = {x ∈ N | 5 ≤ x ≤ 20} có bao nhiêu phần tử?",
            "options": [
              "15",
              "14",
              "16",
              "17"
            ],
            "correctIndex": 2,
            "explanation": "Số phần tử của tập hợp các số tự nhiên liên tiếp từ 5 đến 20 là (20 - 5) + 1 = 16 phần tử."
          },
          {
            "question": "Tập hợp C = {x ∈ N | 10 ≤ x ≤ 30} có bao nhiêu phần tử?",
            "options": [
              "21",
              "22",
              "20",
              "19"
            ],
            "correctIndex": 0,
            "explanation": "Số phần tử của tập hợp các số tự nhiên liên tiếp từ 10 đến 30 là (30 - 10) + 1 = 21 phần tử."
          },
          {
            "question": "Tập hợp C = {x ∈ N | 1 ≤ x ≤ 15} có bao nhiêu phần tử?",
            "options": [
              "13",
              "15",
              "16",
              "14"
            ],
            "correctIndex": 1,
            "explanation": "Số phần tử của tập hợp các số tự nhiên liên tiếp từ 1 đến 15 là (15 - 1) + 1 = 15 phần tử."
          },
          {
            "question": "Tập hợp C = {x ∈ N | 8 ≤ x ≤ 25} có bao nhiêu phần tử?",
            "options": [
              "18",
              "19",
              "17",
              "16"
            ],
            "correctIndex": 0,
            "explanation": "Số phần tử của tập hợp các số tự nhiên liên tiếp từ 8 đến 25 là (25 - 8) + 1 = 18 phần tử."
          },
          {
            "question": "Cho tập hợp A = {2; 4; 6; 8}. Số nào sau đây KHÔNG thuộc tập hợp A?",
            "options": [
              "10 (vì 10 không có trong danh sách phần tử)",
              "6 (sai, vì 6 có trong tập hợp A)",
              "2 (sai, vì 2 có trong tập hợp A)",
              "4 (sai, vì 4 có trong tập hợp A)"
            ],
            "correctIndex": 0,
            "explanation": "Tập hợp A chỉ gồm các phần tử {2; 4; 6; 8}. Số 10 không nằm trong danh sách này nên 10 ∉ A."
          },
          {
            "question": "Cho tập hợp B = {1; 3; 5; 7; 9}. Số nào sau đây KHÔNG thuộc tập hợp B?",
            "options": [
              "2 (vì 2 không có trong danh sách phần tử)",
              "1 (sai, vì 1 có trong tập hợp B)",
              "5 (sai, vì 5 có trong tập hợp B)",
              "3 (sai, vì 3 có trong tập hợp B)"
            ],
            "correctIndex": 0,
            "explanation": "Tập hợp B chỉ gồm các phần tử {1; 3; 5; 7; 9}. Số 2 không nằm trong danh sách này nên 2 ∉ B."
          },
          {
            "question": "Cho tập hợp M = {0; 5; 10; 15}. Số nào sau đây KHÔNG thuộc tập hợp M?",
            "options": [
              "10 (sai, vì 10 có trong tập hợp M)",
              "1 (vì 1 không có trong danh sách phần tử)",
              "5 (sai, vì 5 có trong tập hợp M)",
              "0 (sai, vì 0 có trong tập hợp M)"
            ],
            "correctIndex": 1,
            "explanation": "Tập hợp M chỉ gồm các phần tử {0; 5; 10; 15}. Số 1 không nằm trong danh sách này nên 1 ∉ M."
          },
          {
            "question": "Cho tập hợp K = {11; 13; 17; 19}. Số nào sau đây KHÔNG thuộc tập hợp K?",
            "options": [
              "12 (vì 12 không có trong danh sách phần tử)",
              "13 (sai, vì 13 có trong tập hợp K)",
              "17 (sai, vì 17 có trong tập hợp K)",
              "11 (sai, vì 11 có trong tập hợp K)"
            ],
            "correctIndex": 0,
            "explanation": "Tập hợp K chỉ gồm các phần tử {11; 13; 17; 19}. Số 12 không nằm trong danh sách này nên 12 ∉ K."
          },
          {
            "question": "Cách viết tập hợp nào sau đây là ĐÚNG theo quy ước?",
            "options": [
              "a = {1; 2; 3}",
              "A = (1; 2; 3)",
              "A = {1; 2; 3}",
              "A = [1; 2; 3]"
            ],
            "correctIndex": 2,
            "explanation": "Tên tập hợp phải viết bằng chữ cái in hoa, các phần tử đặt trong cặp ngoặc nhọn { } và cách nhau bởi dấu chấm phẩy. Vậy A = {1; 2; 3} là cách viết đúng."
          },
          {
            "question": "Tập hợp N* khác với tập hợp N ở điểm nào?",
            "options": [
              "N* có thêm số 0 so với N",
              "N* không chứa số 0, còn N chứa số 0",
              "N* chỉ chứa số lẻ",
              "N* và N hoàn toàn giống nhau"
            ],
            "correctIndex": 1,
            "explanation": "N = {0; 1; 2; 3; ...} là tập số tự nhiên. N* = {1; 2; 3; ...} là tập số tự nhiên khác 0, tức N* không chứa số 0 còn N thì có."
          },
          {
            "question": "Cho tập hợp D = {x ∈ N* | x < 1}. Tập hợp D là tập hợp gì?",
            "options": [
              "D = {0}",
              "D = {1}",
              "D là tập hợp rỗng (không có phần tử nào)",
              "D = {0; 1}"
            ],
            "correctIndex": 2,
            "explanation": "N* không chứa số 0, và không có số tự nhiên khác 0 nào nhỏ hơn 1. Do đó D không có phần tử nào, D là tập hợp rỗng."
          },
          {
            "question": "Có bao nhiêu cách thường dùng để mô tả (viết) một tập hợp?",
            "options": [
              "1 cách",
              "2 cách: liệt kê phần tử hoặc nêu dấu hiệu đặc trưng",
              "3 cách",
              "4 cách"
            ],
            "correctIndex": 1,
            "explanation": "Có hai cách thường dùng để mô tả một tập hợp: liệt kê các phần tử, hoặc nêu dấu hiệu đặc trưng cho các phần tử của tập hợp."
          }
        ]
      },
      {
        id: "m6-2",
        title: "Bài 2: Cách ghi số tự nhiên",
        summary: "Làm quen với hệ thập phân, giá trị các chữ số theo hàng, lớp và cách biểu diễn số La Mã từ 1 đến 30.",
        theory: `### 1. Hệ thập phân (Hệ mười)
- Trong hệ thập phân, mỗi số tự nhiên được viết dưới dạng một dãy chữ số lấy từ 10 chữ số: $0; 1; 2; 3; 4; 5; 6; 7; 8; 9$.
- **Giá trị vị trí**: Cứ 10 đơn vị ở một hàng thì làm thành 1 đơn vị ở hàng liền trước nó.
- Cấu trúc biểu diễn số tự nhiên:
  - $\\overline{ab} = a \\times 10 + b$ (với $a \\neq 0$).
  - $\\overline{abc} = a \\times 100 + b \\times 10 + c$ (với $a \\neq 0$).
  - *Ví dụ:* Số $236 = 2 \\times 100 + 3 \\times 10 + 6$.

### 2. Các lớp và hàng số tự nhiên
Số tự nhiên lớn được phân tách thành các **lớp**: lớp triệu, lớp nghìn, lớp đơn vị. Mỗi lớp gồm 3 hàng: hàng trăm, hàng chục, hàng đơn vị của lớp đó.

### 3. Số La Mã
Hệ số La Mã sử dụng các chữ số cơ bản: $\\mathrm{I} = 1$, $\\mathrm{V} = 5$, $\\mathrm{X} = 10$.
- Số từ 1 đến 10: $\\mathrm{I, II, III, IV, V, VI, VII, VIII, IX, X}$.
- Số từ 11 đến 20: Thêm chữ số $\\mathrm{X}$ vào bên trái các số từ 1 đến 10 (ví dụ: $\\mathrm{XIV} = 14$, $\\mathrm{XX} = 20$).
- Số từ 21 đến 30: Thêm hai chữ số $\\mathrm{XX}$ vào bên trái các số từ 1 đến 10 (ví dụ: $\\mathrm{XXIV} = 24$, $\\mathrm{XXX} = 30$).
- *Quy tắc:* Không được ghép quá ba ký tự $\\mathrm{I}$ hoặc $\\mathrm{X}$ đứng liền nhau.`,
        questions: [
          {
            question: "Hãy biểu diễn số 27 dưới dạng số La Mã.",
            options: [
              "XXVII",
              "XXVI",
              "XXVIII",
              "IXXV"
            ],
            correctIndex: 0,
            explanation: "Số 27 = 20 + 7. Trong hệ La Mã, 20 được biểu diễn là XX, và 7 được biểu diễn là VII. Kết hợp lại ta được XXVII."
          },
          {
            question: "Giá trị của chữ số 5 trong số tự nhiên 15 284 là bao nhiêu?",
            options: [
              "5 đơn vị",
              "500 đơn vị",
              "5 000 đơn vị",
              "50 000 đơn vị"
            ],
            correctIndex: 2,
            explanation: "Trong số 15 284, chữ số 5 nằm ở hàng nghìn, nên nó có giá trị biểu diễn là 5 000."
          },
          {
            "question": "Trong số 35 827, chữ số 8 thuộc hàng trăm và có giá trị là bao nhiêu?",
            "options": [
              "80",
              "800",
              "1 200",
              "8 000"
            ],
            "correctIndex": 1,
            "explanation": "Chữ số 8 nằm ở hàng trăm của số 35 827, nên giá trị của nó là 800."
          },
          {
            "question": "Trong số 94 162, chữ số 4 thuộc hàng nghìn và có giá trị là bao nhiêu?",
            "options": [
              "400",
              "6 000",
              "4 000",
              "40 000"
            ],
            "correctIndex": 2,
            "explanation": "Chữ số 4 nằm ở hàng nghìn của số 94 162, nên giá trị của nó là 4 000."
          },
          {
            "question": "Trong số 271 905, chữ số 9 thuộc hàng trăm và có giá trị là bao nhiêu?",
            "options": [
              "90",
              "1 350",
              "9 000",
              "900"
            ],
            "correctIndex": 3,
            "explanation": "Chữ số 9 nằm ở hàng trăm của số 271 905, nên giá trị của nó là 900."
          },
          {
            "question": "Trong số 58 346, chữ số 5 thuộc hàng chục nghìn và có giá trị là bao nhiêu?",
            "options": [
              "50 000",
              "500 000",
              "75 000",
              "5 000"
            ],
            "correctIndex": 0,
            "explanation": "Chữ số 5 nằm ở hàng chục nghìn của số 58 346, nên giá trị của nó là 50 000."
          },
          {
            "question": "Trong số 73 208, chữ số 2 thuộc hàng trăm và có giá trị là bao nhiêu?",
            "options": [
              "200",
              "20",
              "2 000",
              "300"
            ],
            "correctIndex": 0,
            "explanation": "Chữ số 2 nằm ở hàng trăm của số 73 208, nên giá trị của nó là 200."
          },
          {
            "question": "Trong số 609 154, chữ số 6 thuộc hàng trăm nghìn và có giá trị là bao nhiêu?",
            "options": [
              "600 000",
              "6 000 000",
              "900 000",
              "60 000"
            ],
            "correctIndex": 0,
            "explanation": "Chữ số 6 nằm ở hàng trăm nghìn của số 609 154, nên giá trị của nó là 600 000."
          },
          {
            "question": "Số La Mã nào biểu diễn số 14?",
            "options": [
              "XV",
              "XVI",
              "XIII",
              "XIV"
            ],
            "correctIndex": 3,
            "explanation": "Số 14 được biểu diễn trong hệ La Mã là XIV."
          },
          {
            "question": "Số La Mã nào biểu diễn số 19?",
            "options": [
              "XIX",
              "XXI",
              "XVIII",
              "XX"
            ],
            "correctIndex": 0,
            "explanation": "Số 19 được biểu diễn trong hệ La Mã là XIX."
          },
          {
            "question": "Số La Mã nào biểu diễn số 23?",
            "options": [
              "XXV",
              "XXIII",
              "XXIV",
              "XXII"
            ],
            "correctIndex": 1,
            "explanation": "Số 23 được biểu diễn trong hệ La Mã là XXIII."
          },
          {
            "question": "Số La Mã nào biểu diễn số 28?",
            "options": [
              "XXVIII",
              "XXVII",
              "XXX",
              "XXIX"
            ],
            "correctIndex": 0,
            "explanation": "Số 28 được biểu diễn trong hệ La Mã là XXVIII."
          },
          {
            "question": "Số La Mã nào biểu diễn số 17?",
            "options": [
              "XVII",
              "XVIII",
              "XIX",
              "XVI"
            ],
            "correctIndex": 0,
            "explanation": "Số 17 được biểu diễn trong hệ La Mã là XVII."
          },
          {
            "question": "Số La Mã nào biểu diễn số 22?",
            "options": [
              "XXIV",
              "XXI",
              "XXIII",
              "XXII"
            ],
            "correctIndex": 3,
            "explanation": "Số 22 được biểu diễn trong hệ La Mã là XXII."
          },
          {
            "question": "Số La Mã nào biểu diễn số 9?",
            "options": [
              "XI",
              "IX",
              "X",
              "VIII"
            ],
            "correctIndex": 1,
            "explanation": "Số 9 được biểu diễn trong hệ La Mã là IX."
          },
          {
            "question": "Số La Mã nào biểu diễn số 26?",
            "options": [
              "XXVI",
              "XXVII",
              "XXVIII",
              "XXV"
            ],
            "correctIndex": 0,
            "explanation": "Số 26 được biểu diễn trong hệ La Mã là XXVI."
          },
          {
            "question": "Số La Mã XVI tương ứng với số tự nhiên nào?",
            "options": [
              "16",
              "17",
              "6",
              "15"
            ],
            "correctIndex": 0,
            "explanation": "Đổi số La Mã XVI sang hệ thập phân ta được 16."
          },
          {
            "question": "Số La Mã XXIV tương ứng với số tự nhiên nào?",
            "options": [
              "25",
              "23",
              "24",
              "14"
            ],
            "correctIndex": 2,
            "explanation": "Đổi số La Mã XXIV sang hệ thập phân ta được 24."
          },
          {
            "question": "Số La Mã XIX tương ứng với số tự nhiên nào?",
            "options": [
              "19",
              "20",
              "9",
              "18"
            ],
            "correctIndex": 0,
            "explanation": "Đổi số La Mã XIX sang hệ thập phân ta được 19."
          },
          {
            "question": "Số La Mã XXVIII tương ứng với số tự nhiên nào?",
            "options": [
              "28",
              "29",
              "27",
              "18"
            ],
            "correctIndex": 0,
            "explanation": "Đổi số La Mã XXVIII sang hệ thập phân ta được 28."
          }
        ]
      },
      {
        id: "m6-3",
        title: "Bài 3: Thứ tự trong tập hợp các số tự nhiên",
        summary: "Biểu diễn số tự nhiên trên tia số, so sánh hai số tự nhiên, tính chất bắc cầu và các kí hiệu ≤, ≥.",
        theory: `### 1. Tia số và Biểu diễn số tự nhiên
- Tập hợp các số tự nhiên được biểu diễn trực quan trên một tia gốc $O$ gọi là **tia số**.
- Điểm gốc $O$ biểu diễn số $0$. Mỗi số tự nhiên $a$ được biểu diễn bởi một điểm trên tia số gọi là **điểm $a$**.
- Trên tia số nằm ngang, điểm biểu diễn số nhỏ hơn nằm ở bên trái điểm biểu diễn số lớn hơn.

### 2. So sánh hai số tự nhiên
- Trong hai số tự nhiên khác nhau, luôn có một số nhỏ hơn số kia. Nếu $a$ nhỏ hơn $b$, ta viết $a < b$ hoặc $b > a$.
- **Kí hiệu $\\le$ và $\\ge$**:
  - $a \\le b$ nghĩa là $a < b$ hoặc $a = b$ (đọc là $a$ nhỏ hơn hoặc bằng $b$).
  - $a \\ge b$ nghĩa là $a > b$ hoặc $a = b$ (đọc là $a$ lớn hơn hoặc bằng $b$).
- **Tính chất bắc cầu**: Nếu $a < b$ và $b < c$ thì $a < c$.
- Mỗi số tự nhiên có một số liền sau duy nhất (cách nó 1 đơn vị). Số liền sau của $a$ là $a+1$. Số $0$ không có số tự nhiên liền trước.`,
        questions: [
          {
            question: "Cho ba số tự nhiên a, b, c biết: a < 15, b > 18, c là số tự nhiên nằm giữa a và b. Khẳng định nào sau đây là LUÔN ĐÚNG?",
            options: [
              "a > b",
              "b < c",
              "a < c < b",
              "c < a"
            ],
            correctIndex: 2,
            explanation: "Vì c nằm giữa a và b trên tia số, ta luôn có thứ tự tăng dần là a < c < b."
          },
          {
            question: "Tập hợp các số tự nhiên x sao cho 12 ≤ x < 15 gồm các phần tử nào?",
            options: [
              "{12; 13; 14; 15}",
              "{13; 14}",
              "{12; 13; 14}",
              "{13; 14; 15}"
            ],
            correctIndex: 2,
            explanation: "Kí hiệu 12 ≤ x có lấy dấu bằng (x nhận giá trị 12), x < 15 không lấy dấu bằng (x không nhận giá trị 15). Các số tự nhiên thỏa mãn là {12; 13; 14}."
          },
          {
            "question": "So sánh hai số 482 và 479.",
            "options": [
              "Không thể so sánh 482 và 479",
              "482 = 479",
              "482 < 479",
              "482 > 479"
            ],
            "correctIndex": 3,
            "explanation": "So sánh 482 và 479 theo giá trị, ta có 482 > 479."
          },
          {
            "question": "So sánh hai số 1305 và 1350.",
            "options": [
              "Không thể so sánh 1305 và 1350",
              "1305 = 1350",
              "1305 > 1350",
              "1305 < 1350"
            ],
            "correctIndex": 3,
            "explanation": "So sánh 1305 và 1350 theo giá trị, ta có 1305 < 1350."
          },
          {
            "question": "So sánh hai số 9999 và 10000.",
            "options": [
              "9999 < 10000",
              "9999 > 10000",
              "9999 = 10000",
              "Không thể so sánh 9999 và 10000"
            ],
            "correctIndex": 0,
            "explanation": "So sánh 9999 và 10000 theo giá trị, ta có 9999 < 10000."
          },
          {
            "question": "So sánh hai số 27045 và 27054.",
            "options": [
              "27045 = 27054",
              "27045 > 27054",
              "27045 < 27054",
              "Không thể so sánh 27045 và 27054"
            ],
            "correctIndex": 2,
            "explanation": "So sánh 27045 và 27054 theo giá trị, ta có 27045 < 27054."
          },
          {
            "question": "So sánh hai số 500 và 500.",
            "options": [
              "500 > 500",
              "Không thể so sánh 500 và 500",
              "500 = 500",
              "500 < 500"
            ],
            "correctIndex": 2,
            "explanation": "So sánh 500 và 500 theo giá trị, ta có 500 = 500."
          },
          {
            "question": "Viết tập hợp các số tự nhiên x thỏa mãn 15 ≤ x < 20 dưới dạng liệt kê.",
            "options": [
              "{15; 16; 17; 18; 19; 20}",
              "{15; 16; 17; 18; 19}",
              "{16; 17; 18; 19; 20}",
              "{16; 17; 18; 19}"
            ],
            "correctIndex": 1,
            "explanation": "x nhận các giá trị từ 15 đến 19 (không tính 20). Vậy tập hợp cần tìm là {15; 16; 17; 18; 19}."
          },
          {
            "question": "Viết tập hợp các số tự nhiên x thỏa mãn 23 ≤ x < 28 dưới dạng liệt kê.",
            "options": [
              "{24; 25; 26; 27}",
              "{23; 24; 25; 26; 27; 28}",
              "{24; 25; 26; 27; 28}",
              "{23; 24; 25; 26; 27}"
            ],
            "correctIndex": 3,
            "explanation": "x nhận các giá trị từ 23 đến 27 (không tính 28). Vậy tập hợp cần tìm là {23; 24; 25; 26; 27}."
          },
          {
            "question": "Viết tập hợp các số tự nhiên x thỏa mãn 7 ≤ x < 12 dưới dạng liệt kê.",
            "options": [
              "{8; 9; 10; 11}",
              "{7; 8; 9; 10; 11}",
              "{7; 8; 9; 10; 11; 12}",
              "{8; 9; 10; 11; 12}"
            ],
            "correctIndex": 1,
            "explanation": "x nhận các giá trị từ 7 đến 11 (không tính 12). Vậy tập hợp cần tìm là {7; 8; 9; 10; 11}."
          },
          {
            "question": "Viết tập hợp các số tự nhiên x thỏa mãn 100 ≤ x < 105 dưới dạng liệt kê.",
            "options": [
              "{100; 101; 102; 103; 104}",
              "{100; 101; 102; 103; 104; 105}",
              "{101; 102; 103; 104; 105}",
              "{101; 102; 103; 104}"
            ],
            "correctIndex": 0,
            "explanation": "x nhận các giá trị từ 100 đến 104 (không tính 105). Vậy tập hợp cần tìm là {100; 101; 102; 103; 104}."
          },
          {
            "question": "Khẳng định nào sau đây thể hiện đúng tính chất bắc cầu?",
            "options": [
              "Nếu a < b và b < c thì a < c",
              "Nếu a < b thì b < a",
              "Nếu a < b và b < c thì a > c",
              "Nếu a = b thì a < b"
            ],
            "correctIndex": 0,
            "explanation": "Tính chất bắc cầu: nếu a < b và b < c thì suy ra a < c."
          },
          {
            "question": "Trên tia số nằm ngang, điểm biểu diễn số 12 nằm ở vị trí nào so với điểm biểu diễn số 18?",
            "options": [
              "Bên phải điểm 18",
              "Bên trái điểm 18",
              "Trùng với điểm 18",
              "Không thể xác định"
            ],
            "correctIndex": 1,
            "explanation": "Vì 12 < 18 nên trên tia số nằm ngang, điểm biểu diễn số 12 nằm bên trái điểm biểu diễn số 18."
          },
          {
            "question": "Số liền sau của số tự nhiên 999 là số nào?",
            "options": [
              "998",
              "1000",
              "9999",
              "990"
            ],
            "correctIndex": 1,
            "explanation": "Số liền sau của một số tự nhiên a là a + 1. Vậy số liền sau của 999 là 999 + 1 = 1000."
          },
          {
            "question": "Số tự nhiên nào KHÔNG có số liền trước?",
            "options": [
              "1",
              "0",
              "2",
              "Không có số nào"
            ],
            "correctIndex": 1,
            "explanation": "Số 0 là số tự nhiên nhỏ nhất nên không có số tự nhiên liền trước nó."
          },
          {
            "question": "Cho a ≥ 7 và a ≤ 9. Số tự nhiên a có thể nhận những giá trị nào?",
            "options": [
              "a = 7 hoặc a = 9",
              "a ∈ {7; 8; 9}",
              "a ∈ {8}",
              "a ∈ {7; 8}"
            ],
            "correctIndex": 1,
            "explanation": "Điều kiện 7 ≤ a ≤ 9 nghĩa là a nhận các giá trị 7, 8 hoặc 9 (đều lấy dấu bằng ở cả hai đầu)."
          },
          {
            "question": "Kí hiệu a ≤ b được đọc như thế nào?",
            "options": [
              "a nhỏ hơn b",
              "a lớn hơn b",
              "a nhỏ hơn hoặc bằng b",
              "a khác b"
            ],
            "correctIndex": 2,
            "explanation": "Kí hiệu a ≤ b nghĩa là a < b hoặc a = b, đọc là 'a nhỏ hơn hoặc bằng b'."
          },
          {
            "question": "Nếu a < b và b = c thì kết luận nào sau đây đúng?",
            "options": [
              "a < c",
              "a > c",
              "a = c",
              "Không so sánh được"
            ],
            "correctIndex": 0,
            "explanation": "Vì b = c nên có thể thay c vào vị trí của b trong bất đẳng thức a < b, suy ra a < c."
          },
          {
            "question": "Điểm gốc O trên tia số biểu diễn số tự nhiên nào?",
            "options": [
              "1",
              "0",
              "10",
              "Không biểu diễn số nào"
            ],
            "correctIndex": 1,
            "explanation": "Trên tia số, điểm gốc O luôn biểu diễn số 0, là điểm xuất phát của tia số."
          },
          {
            "question": "Cho ba số tự nhiên liên tiếp có số ở giữa là 20. Hai số còn lại là số nào?",
            "options": [
              "18 và 22",
              "19 và 20",
              "19 và 21",
              "20 và 21"
            ],
            "correctIndex": 2,
            "explanation": "Ba số tự nhiên liên tiếp có số ở giữa là 20 thì số liền trước là 19 và số liền sau là 21."
          }
        ]
      },
      {
        id: "m6-4",
        title: "Bài 4: Phép cộng và phép trừ số tự nhiên",
        summary: "Nắm vững quy tắc cộng, trừ số tự nhiên, các tính chất giao hoán, kết hợp, trừ một tổng và ứng dụng tính nhanh.",
        theory: `### 1. Phép cộng số tự nhiên
- Phép cộng hai số tự nhiên $a$ và $b$ cho ta một số tự nhiên duy nhất $c$ gọi là tổng của chúng:
  $$a + b = c \\quad (\\text{Số hạng} + \\text{Số hạng} = \\text{Tổng})$$
- **Tính chất phép cộng**:
  - **Giao hoán**: $a + b = b + a$.
  - **Kết hợp**: $(a + b) + c = a + (b + c)$.
  - **Cộng với số 0**: $a + 0 = 0 + a = a$.

### 2. Phép trừ số tự nhiên
- Cho hai số tự nhiên $a$ và $b$, nếu có số tự nhiên $x$ sao cho $b + x = a$ thì ta có phép trừ:
  $$a - b = x \\quad (\\text{Số bị trừ} - \\text{Số trừ} = \\text{Hiệu})$$
- *Điều kiện thực hiện phép trừ*: Phép trừ $a - b$ chỉ thực hiện được trong tập hợp số tự nhiên nếu $a \\ge b$.
- **Mô phỏng phép cộng và phép trừ trên tia số**:
  - Khi cộng $a + b$, ta xuất phát từ điểm $a$ và dịch chuyển sang bên phải $b$ đơn vị.
  - Khi trừ $a - b$, ta xuất phát từ điểm $a$ và dịch chuyển sang bên trái $b$ đơn vị.`,
        questions: [
          {
            question: "Tính nhanh tổng sau: 117 + 68 + 23",
            options: [
              "208",
              "200",
              "218",
              "198"
            ],
            correctIndex: 0,
            explanation: "Sử dụng tính chất giao hoán và kết hợp: (117 + 23) + 68 = 140 + 68 = 208."
          },
          {
            question: "Phép trừ 105 - 120 có thực hiện được trong tập hợp số tự nhiên N không?",
            options: [
              "Có, kết quả là 15",
              "Có, kết quả là -15",
              "Không thực hiện được vì số bị trừ nhỏ hơn số trừ",
              "Không thực hiện được vì kết quả bằng 0"
            ],
            correctIndex: 2,
            explanation: "Trong tập hợp số tự nhiên, phép trừ a - b chỉ thực hiện được khi a ≥ b. Vì 105 < 120 nên phép trừ này không thực hiện được trên tập N."
          },
          {
            "question": "Tính tổng: 235 + 148 + 65",
            "options": [
              "438",
              "449",
              "458",
              "448"
            ],
            "correctIndex": 3,
            "explanation": "Cộng lần lượt các số hạng: 235 + 148 + 65 = 448."
          },
          {
            "question": "Tính tổng: 327 + 89 + 173",
            "options": [
              "599",
              "579",
              "590",
              "589"
            ],
            "correctIndex": 3,
            "explanation": "Cộng lần lượt các số hạng: 327 + 89 + 173 = 589."
          },
          {
            "question": "Tính tổng: 456 + 244 + 300",
            "options": [
              "1 010",
              "990",
              "1 000",
              "1 001"
            ],
            "correctIndex": 2,
            "explanation": "Cộng lần lượt các số hạng: 456 + 244 + 300 = 1 000."
          },
          {
            "question": "Tính tổng: 512 + 88 + 400",
            "options": [
              "1 010",
              "990",
              "1 000",
              "1 001"
            ],
            "correctIndex": 2,
            "explanation": "Cộng lần lượt các số hạng: 512 + 88 + 400 = 1 000."
          },
          {
            "question": "Tính tổng: 129 + 371 + 250",
            "options": [
              "750",
              "740",
              "751",
              "760"
            ],
            "correctIndex": 0,
            "explanation": "Cộng lần lượt các số hạng: 129 + 371 + 250 = 750."
          },
          {
            "question": "Tính tổng: 618 + 182 + 200",
            "options": [
              "1 010",
              "990",
              "1 000",
              "1 001"
            ],
            "correctIndex": 2,
            "explanation": "Cộng lần lượt các số hạng: 618 + 182 + 200 = 1 000."
          },
          {
            "question": "Tính hiệu: 1000 - 347",
            "options": [
              "663",
              "653",
              "753",
              "643"
            ],
            "correctIndex": 1,
            "explanation": "Thực hiện phép trừ: 1000 - 347 = 653."
          },
          {
            "question": "Tính hiệu: 2024 - 876",
            "options": [
              "1 138",
              "1 248",
              "1 158",
              "1 148"
            ],
            "correctIndex": 3,
            "explanation": "Thực hiện phép trừ: 2024 - 876 = 1 148."
          },
          {
            "question": "Tính hiệu: 5000 - 1234",
            "options": [
              "3 866",
              "3 776",
              "3 756",
              "3 766"
            ],
            "correctIndex": 3,
            "explanation": "Thực hiện phép trừ: 5000 - 1234 = 3 766."
          },
          {
            "question": "Tính hiệu: 837 - 592",
            "options": [
              "255",
              "245",
              "235",
              "345"
            ],
            "correctIndex": 1,
            "explanation": "Thực hiện phép trừ: 837 - 592 = 245."
          },
          {
            "question": "Phép trừ 58 - 91 có thực hiện được trong tập hợp số tự nhiên N không?",
            "options": [
              "Thực hiện được, vì 58 ≥ 91",
              "Không thực hiện được, vì 58 < 91",
              "Thực hiện được, kết quả bằng 33",
              "Thực hiện được, kết quả bằng -33"
            ],
            "correctIndex": 1,
            "explanation": "Phép trừ a - b chỉ thực hiện được trong N khi a ≥ b. Không thực hiện được, vì 58 < 91."
          },
          {
            "question": "Phép trừ 204 - 150 có thực hiện được trong tập hợp số tự nhiên N không?",
            "options": [
              "Thực hiện được, kết quả bằng 54",
              "Thực hiện được, kết quả bằng 55",
              "Không thực hiện được, vì 204 < 150",
              "Thực hiện được, kết quả bằng 354"
            ],
            "correctIndex": 0,
            "explanation": "Phép trừ a - b chỉ thực hiện được trong N khi a ≥ b. Thực hiện được, kết quả bằng 54."
          },
          {
            "question": "Phép trừ 77 - 200 có thực hiện được trong tập hợp số tự nhiên N không?",
            "options": [
              "Thực hiện được, vì 77 ≥ 200",
              "Không thực hiện được, vì 77 < 200",
              "Thực hiện được, kết quả bằng 123",
              "Thực hiện được, kết quả bằng -123"
            ],
            "correctIndex": 1,
            "explanation": "Phép trừ a - b chỉ thực hiện được trong N khi a ≥ b. Không thực hiện được, vì 77 < 200."
          },
          {
            "question": "Phép trừ 999 - 998 có thực hiện được trong tập hợp số tự nhiên N không?",
            "options": [
              "Thực hiện được, kết quả bằng 1997",
              "Không thực hiện được, vì 999 < 998",
              "Thực hiện được, kết quả bằng 2",
              "Thực hiện được, kết quả bằng 1"
            ],
            "correctIndex": 3,
            "explanation": "Phép trừ a - b chỉ thực hiện được trong N khi a ≥ b. Thực hiện được, kết quả bằng 1."
          },
          {
            "question": "Tính chất nào của phép cộng được thể hiện qua đẳng thức: 25 + 17 = 17 + 25?",
            "options": [
              "Tính chất kết hợp",
              "Tính chất giao hoán",
              "Tính chất phân phối",
              "Cộng với số 0"
            ],
            "correctIndex": 1,
            "explanation": "Tính chất giao hoán của phép cộng: a + b = b + a. Đẳng thức 25 + 17 = 17 + 25 thể hiện đúng tính chất này."
          },
          {
            "question": "Tính chất nào của phép cộng được thể hiện qua đẳng thức: (12 + 8) + 5 = 12 + (8 + 5)?",
            "options": [
              "Tính chất giao hoán",
              "Tính chất kết hợp",
              "Cộng với số 0",
              "Không có tính chất nào"
            ],
            "correctIndex": 1,
            "explanation": "Tính chất kết hợp của phép cộng: (a + b) + c = a + (b + c). Đây chính là điều đẳng thức đã thể hiện."
          },
          {
            "question": "Trong phép trừ a - b = x, số a được gọi là gì?",
            "options": [
              "Số trừ",
              "Hiệu",
              "Số bị trừ",
              "Thương"
            ],
            "correctIndex": 2,
            "explanation": "Trong phép trừ Số bị trừ - Số trừ = Hiệu, số a đứng trước dấu trừ được gọi là số bị trừ."
          },
          {
            "question": "Tính nhanh: 998 + 236 bằng cách thêm bớt hợp lý.",
            "options": [
              "1234",
              "1224",
              "1244",
              "1214"
            ],
            "correctIndex": 0,
            "explanation": "Ta có thể tính: 998 + 236 = (1000 - 2) + 236 = 1000 + 236 - 2 = 1236 - 2 = 1234."
          }
        ]
      },
      {
        id: "m6-5",
        title: "Bài 5: Phép nhân và phép chia số tự nhiên",
        summary: "Tính chất giao hoán, kết hợp, phân phối của phép nhân. Phép chia hết và phép chia có dư.",
        theory: `### 1. Phép nhân số tự nhiên
- Phép nhân hai số tự nhiên $a$ và $b$ cho ta tích $c$:
  $$a \\times b = c \\quad \\text{hoặc} \\quad a \\cdot b = c$$
- **Tính chất phép nhân**:
  - **Giao hoán**: $a \\cdot b = b \\cdot a$.
  - **Kết hợp**: $(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$.
  - **Nhân với số 1**: $a \\cdot 1 = a$.
  - **Tính chất phân phối của phép nhân đối với phép cộng/phép trừ**: $a \\cdot (b \\pm c) = a \\cdot b \\pm a \\cdot c$.

### 2. Phép chia hết và Phép chia có dư
Với hai số tự nhiên $a$ và $b$ ($b \\neq 0$), luôn tìm được hai số tự nhiên $q$ và $r$ duy nhất sao cho:
$$a = b \\cdot q + r \\quad \\text{với } 0 \\le r < b$$
- **Phép chia hết**: Nếu $r = 0$, ta nói $a$ chia hết cho $b$ (kí hiệu $a \\vdots b$), ta có phép chia hết $a : b = q$.
- **Phép chia có dư**: Nếu $r > 0$, ta nói $a$ không chia hết cho $b$, ta có phép chia có dư với $q$ là thương và $r$ là số dư.
- *Chú ý quan trọng*: Số dư $r$ bao giờ cũng phải nhỏ hơn số chia $b$.`,
        questions: [
          {
            question: "Trong một phép chia có dư cho số chia là 8, số dư lớn nhất có thể có là bao nhiêu?",
            options: [
              "8",
              "7",
              "9",
              "1"
            ],
            correctIndex: 1,
            explanation: "Số dư r luôn phải nhỏ hơn số chia b. Số chia là 8 nên số dư r phải nhỏ hơn 8. Số tự nhiên lớn nhất nhỏ hơn 8 là 7."
          },
          {
            question: "Tính nhẩm nhanh tích sau bằng tính chất phân phối: 24 * 25",
            options: [
              "500",
              "600",
              "550",
              "450"
            ],
            correctIndex: 1,
            explanation: "Ta có thể phân tích: 24 * 25 = (6 * 4) * 25 = 6 * (4 * 25) = 6 * 100 = 600. Hoặc sử dụng 24 * 25 = 24 * (100 / 4) = 2400 / 4 = 600."
          },
          {
            "question": "Thực hiện phép chia 157 cho 6. Tìm thương và số dư.",
            "options": [
              "Thương = 25, số dư = 1",
              "Thương = 27, số dư = 1",
              "Thương = 26, số dư = 1",
              "Thương = 26, số dư = 2"
            ],
            "correctIndex": 2,
            "explanation": "Ta có 157 = 6 × 26 + 1, với 0 ≤ 1 < 6. Vậy thương là 26 và số dư là 1."
          },
          {
            "question": "Thực hiện phép chia 200 cho 9. Tìm thương và số dư.",
            "options": [
              "Thương = 22, số dư = 3",
              "Thương = 21, số dư = 2",
              "Thương = 22, số dư = 2",
              "Thương = 23, số dư = 2"
            ],
            "correctIndex": 2,
            "explanation": "Ta có 200 = 9 × 22 + 2, với 0 ≤ 2 < 9. Vậy thương là 22 và số dư là 2."
          },
          {
            "question": "Thực hiện phép chia 345 cho 8. Tìm thương và số dư.",
            "options": [
              "Thương = 44, số dư = 1",
              "Thương = 43, số dư = 1",
              "Thương = 42, số dư = 1",
              "Thương = 43, số dư = 2"
            ],
            "correctIndex": 1,
            "explanation": "Ta có 345 = 8 × 43 + 1, với 0 ≤ 1 < 8. Vậy thương là 43 và số dư là 1."
          },
          {
            "question": "Thực hiện phép chia 89 cho 7. Tìm thương và số dư.",
            "options": [
              "Thương = 12, số dư = 6",
              "Thương = 13, số dư = 5",
              "Thương = 12, số dư = 5",
              "Thương = 11, số dư = 5"
            ],
            "correctIndex": 2,
            "explanation": "Ta có 89 = 7 × 12 + 5, với 0 ≤ 5 < 7. Vậy thương là 12 và số dư là 5."
          },
          {
            "question": "Thực hiện phép chia 500 cho 13. Tìm thương và số dư.",
            "options": [
              "Thương = 38, số dư = 6",
              "Thương = 38, số dư = 7",
              "Thương = 37, số dư = 6",
              "Thương = 39, số dư = 6"
            ],
            "correctIndex": 0,
            "explanation": "Ta có 500 = 13 × 38 + 6, với 0 ≤ 6 < 13. Vậy thương là 38 và số dư là 6."
          },
          {
            "question": "Thực hiện phép chia 276 cho 11. Tìm thương và số dư.",
            "options": [
              "Thương = 25, số dư = 2",
              "Thương = 24, số dư = 1",
              "Thương = 26, số dư = 1",
              "Thương = 25, số dư = 1"
            ],
            "correctIndex": 3,
            "explanation": "Ta có 276 = 11 × 25 + 1, với 0 ≤ 1 < 11. Vậy thương là 25 và số dư là 1."
          },
          {
            "question": "Tính tích: 23 × 45",
            "options": [
              "1 035",
              "990",
              "1 058",
              "1 045"
            ],
            "correctIndex": 0,
            "explanation": "Thực hiện phép nhân: 23 × 45 = 1 035."
          },
          {
            "question": "Tính tích: 67 × 32",
            "options": [
              "2 112",
              "2 211",
              "2 154",
              "2 144"
            ],
            "correctIndex": 3,
            "explanation": "Thực hiện phép nhân: 67 × 32 = 2 144."
          },
          {
            "question": "Tính tích: 125 × 16",
            "options": [
              "2 010",
              "2 125",
              "2 000",
              "1 984"
            ],
            "correctIndex": 2,
            "explanation": "Thực hiện phép nhân: 125 × 16 = 2 000."
          },
          {
            "question": "Tính tích: 48 × 29",
            "options": [
              "1 440",
              "1 392",
              "1 402",
              "1 363"
            ],
            "correctIndex": 1,
            "explanation": "Thực hiện phép nhân: 48 × 29 = 1 392."
          },
          {
            "question": "Áp dụng tính chất phân phối để tính nhanh: 15 × 204",
            "options": [
              "3 075",
              "3 045",
              "3 160",
              "3 060"
            ],
            "correctIndex": 3,
            "explanation": "Ta có thể tách 204 thành tổng/hiệu thuận lợi rồi phân phối phép nhân. Kết quả cuối cùng là 15 × 204 = 3 060."
          },
          {
            "question": "Áp dụng tính chất phân phối để tính nhanh: 23 × 102",
            "options": [
              "2 346",
              "2 369",
              "2 323",
              "2 446"
            ],
            "correctIndex": 0,
            "explanation": "Ta có thể tách 102 thành tổng/hiệu thuận lợi rồi phân phối phép nhân. Kết quả cuối cùng là 23 × 102 = 2 346."
          },
          {
            "question": "Áp dụng tính chất phân phối để tính nhanh: 45 × 101",
            "options": [
              "4 645",
              "4 545",
              "4 500",
              "4 590"
            ],
            "correctIndex": 1,
            "explanation": "Ta có thể tách 101 thành tổng/hiệu thuận lợi rồi phân phối phép nhân. Kết quả cuối cùng là 45 × 101 = 4 545."
          },
          {
            "question": "Áp dụng tính chất phân phối để tính nhanh: 12 × 998",
            "options": [
              "11 976",
              "11 988",
              "11 964",
              "12 076"
            ],
            "correctIndex": 0,
            "explanation": "Ta có thể tách 998 thành tổng/hiệu thuận lợi rồi phân phối phép nhân. Kết quả cuối cùng là 12 × 998 = 11 976."
          },
          {
            "question": "Trong phép chia có dư a = b × q + r, điều kiện nào của r luôn đúng?",
            "options": [
              "r > b",
              "0 ≤ r < b",
              "r = b",
              "r < 0"
            ],
            "correctIndex": 1,
            "explanation": "Trong phép chia có dư, số dư r luôn thỏa mãn điều kiện 0 ≤ r < b (b là số chia)."
          },
          {
            "question": "Phép chia nào sau đây là phép chia hết?",
            "options": [
              "17 : 5",
              "144 : 12",
              "100 : 7",
              "50 : 3"
            ],
            "correctIndex": 1,
            "explanation": "Ta kiểm tra: 144 : 12 = 12 (dư 0) nên đây là phép chia hết. Các phép chia còn lại đều có số dư khác 0."
          },
          {
            "question": "Tính chất phân phối của phép nhân đối với phép cộng được viết đúng là:",
            "options": [
              "a × (b + c) = a × b + c",
              "a × (b + c) = a × b + a × c",
              "a × (b + c) = a + b × c",
              "a × (b + c) = (a + b) × c"
            ],
            "correctIndex": 1,
            "explanation": "Tính chất phân phối của phép nhân với phép cộng: a × (b + c) = a × b + a × c."
          },
          {
            "question": "Kết quả của phép tính 0 : 25 là bao nhiêu?",
            "options": [
              "0",
              "25",
              "Không xác định",
              "1"
            ],
            "correctIndex": 0,
            "explanation": "Số 0 chia cho bất kỳ số nào khác 0 đều bằng 0. Vậy 0 : 25 = 0."
          }
        ]
      },
      {
        id: "m6-6",
        title: "Bài 6: Lũy thừa với số mũ tự nhiên",
        summary: "Lũy thừa bậc n, cơ số, số mũ. Các công thức nhân và chia hai lũy thừa cùng cơ số.",
        theory: `### 1. Khái niệm Lũy thừa
- Lũy thừa bậc $n$ của số tự nhiên $a$ là tích của $n$ thừa số bằng nhau, mỗi thừa số bằng $a$:
  $$a^n = \\underbrace{a \\cdot a \\cdot a \\dots a}_{n \\text{ thừa số a}} \\quad (a \\in \\mathbb{N}, n \\in \\mathbb{N}^*)$$
- Trong biểu thức $a^n$:
  - $a$ được gọi là **Cơ số**.
  - $n$ được gọi là **Số mũ**.
- Đọc là: "$a$ mũ $n$" hoặc "lũy thừa bậc $n$ của $a$".
- **Bình phương**: Lũy thừa bậc 2 (ví dụ $a^2$ đọc là $a$ bình phương).
- **Lập phương**: Lũy thừa bậc 3 (ví dụ $a^3$ đọc là $a$ lập phương).
- **Quy ước**: $a^1 = a$ và $a^0 = 1$ (với $a \\neq 0$).

### 2. Nhân hai lũy thừa cùng cơ số
Khi nhân hai lũy thừa cùng cơ số, ta **giữ nguyên cơ số** và **cộng các số mũ**:
$$a^m \\cdot a^n = a^{m+n}$$

### 3. Chia hai lũy thừa cùng cơ số
Khi chia hai lũy thừa cùng cơ số (khác 0), ta **giữ nguyên cơ số** và **trừ các số mũ**:
$$a^m : a^n = a^{m-n} \\quad (a \\neq 0, m \\ge n)$$`,
        questions: [
          {
            question: "Viết biểu thức 5^6 * 5^2 : 5^3 dưới dạng một lũy thừa đơn giản.",
            options: [
              "5^5",
              "5^11",
              "5^4",
              "5^1"
            ],
            correctIndex: 0,
            explanation: "Áp dụng các công thức: 5^6 * 5^2 = 5^(6+2) = 5^8. Sau đó thực hiện phép chia: 5^8 : 5^3 = 5^(8-3) = 5^5."
          },
          {
            question: "Tìm số tự nhiên x biết x^3 = 27.",
            options: [
              "x = 9",
              "x = 3",
              "x = 2",
              "x = 4"
            ],
            correctIndex: 1,
            explanation: "Vì 3^3 = 3 * 3 * 3 = 27, nên số tự nhiên x thỏa mãn x^3 = 27 là x = 3."
          },
          {
            "question": "Tính giá trị của lũy thừa 2^7.",
            "options": [
              "64",
              "128",
              "126",
              "256"
            ],
            "correctIndex": 1,
            "explanation": "2^7 là tích của 7 thừa số 2: 2^7 = 128."
          },
          {
            "question": "Tính giá trị của lũy thừa 3^5.",
            "options": [
              "729",
              "240",
              "243",
              "81"
            ],
            "correctIndex": 2,
            "explanation": "3^5 là tích của 5 thừa số 3: 3^5 = 243."
          },
          {
            "question": "Tính giá trị của lũy thừa 5^4.",
            "options": [
              "3125",
              "620",
              "125",
              "625"
            ],
            "correctIndex": 3,
            "explanation": "5^4 là tích của 4 thừa số 5: 5^4 = 625."
          },
          {
            "question": "Tính giá trị của lũy thừa 4^4.",
            "options": [
              "252",
              "256",
              "1024",
              "64"
            ],
            "correctIndex": 1,
            "explanation": "4^4 là tích của 4 thừa số 4: 4^4 = 256."
          },
          {
            "question": "Tính giá trị của lũy thừa 6^3.",
            "options": [
              "36",
              "1296",
              "210",
              "216"
            ],
            "correctIndex": 3,
            "explanation": "6^3 là tích của 3 thừa số 6: 6^3 = 216."
          },
          {
            "question": "Tính giá trị của lũy thừa 7^3.",
            "options": [
              "336",
              "343",
              "2401",
              "49"
            ],
            "correctIndex": 1,
            "explanation": "7^3 là tích của 3 thừa số 7: 7^3 = 343."
          },
          {
            "question": "Viết kết quả của 3^4 × 3^2 dưới dạng một lũy thừa.",
            "options": [
              "3^8",
              "3^6",
              "3^2",
              "9^6"
            ],
            "correctIndex": 1,
            "explanation": "Khi nhân hai lũy thừa cùng cơ số, ta giữ nguyên cơ số và cộng hai số mũ: 3^4 × 3^2 = 3^{4+2} = 3^6."
          },
          {
            "question": "Viết kết quả của 2^5 × 2^3 dưới dạng một lũy thừa.",
            "options": [
              "4^8",
              "2^15",
              "2^8",
              "2^2"
            ],
            "correctIndex": 2,
            "explanation": "Khi nhân hai lũy thừa cùng cơ số, ta giữ nguyên cơ số và cộng hai số mũ: 2^5 × 2^3 = 2^{5+3} = 2^8."
          },
          {
            "question": "Viết kết quả của 5^3 × 5^4 dưới dạng một lũy thừa.",
            "options": [
              "25^7",
              "5^7",
              "5^1",
              "5^12"
            ],
            "correctIndex": 1,
            "explanation": "Khi nhân hai lũy thừa cùng cơ số, ta giữ nguyên cơ số và cộng hai số mũ: 5^3 × 5^4 = 5^{3+4} = 5^7."
          },
          {
            "question": "Viết kết quả của 7^2 × 7^3 dưới dạng một lũy thừa.",
            "options": [
              "7^5",
              "7^1",
              "7^6",
              "49^5"
            ],
            "correctIndex": 0,
            "explanation": "Khi nhân hai lũy thừa cùng cơ số, ta giữ nguyên cơ số và cộng hai số mũ: 7^2 × 7^3 = 7^{2+3} = 7^5."
          },
          {
            "question": "Viết kết quả của 5^7 : 5^3 dưới dạng một lũy thừa (a ≠ 0).",
            "options": [
              "5^10",
              "5^21",
              "5^4",
              "5^5"
            ],
            "correctIndex": 2,
            "explanation": "Khi chia hai lũy thừa cùng cơ số, ta giữ nguyên cơ số và trừ hai số mũ: 5^7 : 5^3 = 5^{7-3} = 5^4."
          },
          {
            "question": "Viết kết quả của 3^8 : 3^5 dưới dạng một lũy thừa (a ≠ 0).",
            "options": [
              "3^4",
              "3^13",
              "3^40",
              "3^3"
            ],
            "correctIndex": 3,
            "explanation": "Khi chia hai lũy thừa cùng cơ số, ta giữ nguyên cơ số và trừ hai số mũ: 3^8 : 3^5 = 3^{8-5} = 3^3."
          },
          {
            "question": "Viết kết quả của 2^9 : 2^4 dưới dạng một lũy thừa (a ≠ 0).",
            "options": [
              "2^6",
              "2^5",
              "2^36",
              "2^13"
            ],
            "correctIndex": 1,
            "explanation": "Khi chia hai lũy thừa cùng cơ số, ta giữ nguyên cơ số và trừ hai số mũ: 2^9 : 2^4 = 2^{9-4} = 2^5."
          },
          {
            "question": "Viết kết quả của 4^6 : 4^2 dưới dạng một lũy thừa (a ≠ 0).",
            "options": [
              "4^8",
              "4^12",
              "4^5",
              "4^4"
            ],
            "correctIndex": 3,
            "explanation": "Khi chia hai lũy thừa cùng cơ số, ta giữ nguyên cơ số và trừ hai số mũ: 4^6 : 4^2 = 4^{6-2} = 4^4."
          },
          {
            "question": "Trong lũy thừa a^n, thành phần n được gọi là gì?",
            "options": [
              "Cơ số",
              "Số mũ",
              "Tích",
              "Thương"
            ],
            "correctIndex": 1,
            "explanation": "Trong biểu thức a^n, a là cơ số và n là số mũ."
          },
          {
            "question": "Giá trị của 5^0 là bao nhiêu?",
            "options": [
              "0",
              "5",
              "1",
              "Không xác định"
            ],
            "correctIndex": 2,
            "explanation": "Theo quy ước, mọi số khác 0 có lũy thừa bậc 0 đều bằng 1. Vậy 5^0 = 1."
          },
          {
            "question": "Số nào sau đây được gọi là 'lập phương' của 4?",
            "options": [
              "4^1 = 4",
              "4^2 = 16",
              "4^3 = 64",
              "4^4 = 256"
            ],
            "correctIndex": 2,
            "explanation": "Lập phương của một số là lũy thừa bậc 3 của số đó. Lập phương của 4 là 4^3 = 64."
          },
          {
            "question": "Tìm số tự nhiên x biết x^2 = 49.",
            "options": [
              "x = 24,5",
              "x = 7",
              "x = 9",
              "x = 14"
            ],
            "correctIndex": 1,
            "explanation": "Vì 7 × 7 = 49 = 7^2, nên số tự nhiên x thỏa mãn x^2 = 49 là x = 7."
          }
        ]
      },
      {
        id: "m6-7",
        title: "Bài 7: Thứ tự thực hiện các phép tính",
        summary: "Quy tắc ưu tiên thực hiện phép tính trong biểu thức không có ngoặc và biểu thức có ngoặc.",
        theory: `### 1. Đối với biểu thức không có dấu ngoặc
- Nếu chỉ có phép cộng, trừ hoặc chỉ có phép nhân, chia: Ta thực hiện các phép tính theo thứ tự **từ trái sang phải**.
- Nếu có các phép tính cộng, trừ, nhân, chia, nâng lên lũy thừa: Ta thực hiện theo thứ tự:
  $$\\text{Lũy thừa} \\rightarrow \\text{Nhân và chia} \\rightarrow \\text{Cộng và trừ}$$

### 2. Đối với biểu thức có dấu ngoặc
Nếu biểu thức có các dấu ngoặc: ngoặc tròn $($ $)$, ngoặc vuông $[$ $]$, ngoặc nhọn $\\{$ $\\}$, ta thực hiện phép tính theo thứ tự:
$$\\text{Trong ngoặc tròn } (\\quad) \\rightarrow \\text{Trong ngoặc vuông } [\\quad] \\rightarrow \\text{Trong ngoặc nhọn } \\{\\quad\\}$$

- *Ví dụ minh họa:* Tính giá trị biểu thức $A = 8 + 36 : 3 \\cdot 2$.
  - Thực hiện chia: $36 : 3 = 12$.
  - Thực hiện nhân: $12 \\cdot 2 = 24$.
  - Thực hiện cộng: $8 + 24 = 32$.
  - Vậy $A = 32$. (Lưu ý không lấy 3 nhân 2 trước vì nhân và chia có độ ưu tiên ngang nhau, phải làm từ trái sang phải).`,
        questions: [
          {
            question: "Tính giá trị biểu thức: 5 + 3 * 2^3",
            options: [
              "64",
              "29",
              "41",
              "32"
            ],
            correctIndex: 1,
            explanation: "Thực hiện lũy thừa trước: 2^3 = 8. Sau đó thực hiện phép nhân: 3 * 8 = 24. Cuối cùng thực hiện phép cộng: 5 + 24 = 29."
          },
          {
            question: "Giá trị của biểu thức B = 50 - [30 - (10 - 5)^2] là bao nhiêu?",
            options: [
              "25",
              "45",
              "40",
              "49"
            ],
            correctIndex: 1,
            explanation: "Thực hiện trong ngoặc tròn trước: (10 - 5) = 5. Lũy thừa: 5^2 = 25. Thực hiện trong ngoặc vuông: 30 - 25 = 5. Cuối cùng thực hiện phép trừ ngoài cùng: 50 - 5 = 45."
          },
          {
            "question": "Tính giá trị biểu thức: 6 + 4 × 3^2",
            "options": [
              "42",
              "44",
              "40",
              "52"
            ],
            "correctIndex": 0,
            "explanation": "Thực hiện lũy thừa trước: 3^2 = 9. Nhân: 4 × 9 = 36. Cộng: 6 + 36 = 42."
          },
          {
            "question": "Tính giá trị biểu thức: (15 - 5) × 2 + 8",
            "options": [
              "26",
              "38",
              "30",
              "28"
            ],
            "correctIndex": 3,
            "explanation": "Trong ngoặc trước: 15 - 5 = 10. Nhân: 10 × 2 = 20. Cộng: 20 + 8 = 28."
          },
          {
            "question": "Tính giá trị biểu thức: 100 - 4 × 5^2",
            "options": [
              "0",
              "10",
              "-2",
              "2"
            ],
            "correctIndex": 0,
            "explanation": "Lũy thừa trước: 5^2 = 25. Nhân: 4 × 25 = 100. Trừ: 100 - 100 = 0."
          },
          {
            "question": "Tính giá trị biểu thức: 2^3 + 3 × (7 - 2)",
            "options": [
              "33",
              "25",
              "23",
              "21"
            ],
            "correctIndex": 2,
            "explanation": "Trong ngoặc: 7 - 2 = 5. Lũy thừa: 2^3 = 8. Nhân: 3 × 5 = 15. Cộng: 8 + 15 = 23."
          },
          {
            "question": "Tính giá trị biểu thức: [20 - (6 + 2)] × 3",
            "options": [
              "38",
              "34",
              "46",
              "36"
            ],
            "correctIndex": 3,
            "explanation": "Trong ngoặc tròn: 6 + 2 = 8. Trong ngoặc vuông: 20 - 8 = 12. Nhân: 12 × 3 = 36."
          },
          {
            "question": "Tính giá trị biểu thức: 48 : 4 + 3 × 6",
            "options": [
              "32",
              "40",
              "30",
              "28"
            ],
            "correctIndex": 2,
            "explanation": "Chia trước: 48 : 4 = 12. Nhân: 3 × 6 = 18. Cộng: 12 + 18 = 30."
          },
          {
            "question": "Tính giá trị biểu thức: 5 × 4^2 - 30 : 5",
            "options": [
              "84",
              "76",
              "72",
              "74"
            ],
            "correctIndex": 3,
            "explanation": "Lũy thừa: 4^2 = 16. Nhân: 5 × 16 = 80. Chia: 30 : 5 = 6. Trừ: 80 - 6 = 74."
          },
          {
            "question": "Tính giá trị biểu thức: 90 : [2 × (10 - 5)]",
            "options": [
              "11",
              "7",
              "9",
              "19"
            ],
            "correctIndex": 2,
            "explanation": "Trong ngoặc tròn: 10 - 5 = 5. Trong ngoặc vuông: 2 × 5 = 10. Chia: 90 : 10 = 9."
          },
          {
            "question": "Tính giá trị biểu thức: 3 × 5 + 2 × 6",
            "options": [
              "29",
              "25",
              "27",
              "37"
            ],
            "correctIndex": 2,
            "explanation": "Không có ngoặc và không có lũy thừa nên nhân trước, cộng sau: 3 × 5 = 15; 2 × 6 = 12. Cộng: 15 + 12 = 27."
          },
          {
            "question": "Tính giá trị biểu thức: 80 - 15 × 2^2",
            "options": [
              "18",
              "20",
              "30",
              "22"
            ],
            "correctIndex": 1,
            "explanation": "Lũy thừa trước: 2^2 = 4. Nhân: 15 × 4 = 60. Trừ: 80 - 60 = 20."
          },
          {
            "question": "Tính giá trị biểu thức: (9 + 3) : 3 - 1",
            "options": [
              "1",
              "13",
              "3",
              "5"
            ],
            "correctIndex": 2,
            "explanation": "Trong ngoặc trước: 9 + 3 = 12. Chia: 12 : 3 = 4. Trừ: 4 - 1 = 3."
          },
          {
            "question": "Tính giá trị biểu thức: 6^2 : 4 + 7",
            "options": [
              "14",
              "18",
              "16",
              "26"
            ],
            "correctIndex": 2,
            "explanation": "Lũy thừa trước: 6^2 = 36. Chia: 36 : 4 = 9. Cộng: 9 + 7 = 16."
          },
          {
            "question": "Tính giá trị biểu thức: 2 × [15 - (4 + 3)]",
            "options": [
              "14",
              "18",
              "16",
              "26"
            ],
            "correctIndex": 2,
            "explanation": "Trong ngoặc tròn: 4 + 3 = 7. Trong ngoặc vuông: 15 - 7 = 8. Nhân: 2 × 8 = 16."
          },
          {
            "question": "Tính giá trị biểu thức: 100 : 5^2 + 3 × 2",
            "options": [
              "8",
              "10",
              "12",
              "20"
            ],
            "correctIndex": 1,
            "explanation": "Lũy thừa: 5^2 = 25. Chia: 100 : 25 = 4. Nhân: 3 × 2 = 6. Cộng: 4 + 6 = 10."
          },
          {
            "question": "Tính giá trị biểu thức: 7 + 2 × (12 - 4 × 2)",
            "options": [
              "15",
              "17",
              "13",
              "25"
            ],
            "correctIndex": 0,
            "explanation": "Trong ngoặc: 4 × 2 = 8, rồi 12 - 8 = 4. Nhân: 2 × 4 = 8. Cộng: 7 + 8 = 15."
          },
          {
            "question": "Trong biểu thức không có dấu ngoặc, phép tính nào được ưu tiên thực hiện trước tiên?",
            "options": [
              "Cộng, trừ",
              "Nhân, chia",
              "Lũy thừa",
              "Thực hiện từ trái sang phải theo thứ tự viết"
            ],
            "correctIndex": 2,
            "explanation": "Thứ tự ưu tiên trong biểu thức không ngoặc là: Lũy thừa → Nhân và chia → Cộng và trừ. Vậy lũy thừa được ưu tiên trước."
          },
          {
            "question": "Với biểu thức có dấu ngoặc, thứ tự thực hiện đúng là:",
            "options": [
              "Ngoặc nhọn → Ngoặc vuông → Ngoặc tròn",
              "Ngoặc tròn → Ngoặc vuông → Ngoặc nhọn",
              "Thực hiện đồng thời tất cả các ngoặc",
              "Ngoặc vuông → Ngoặc tròn → Ngoặc nhọn"
            ],
            "correctIndex": 1,
            "explanation": "Thứ tự thực hiện đúng với biểu thức có ngoặc là: trong ngoặc tròn ( ) trước, rồi đến ngoặc vuông [ ], cuối cùng là ngoặc nhọn { }."
          },
          {
            "question": "Biểu thức 20 - 6 : 2 có giá trị bằng bao nhiêu?",
            "options": [
              "17",
              "7",
              "10",
              "20"
            ],
            "correctIndex": 0,
            "explanation": "Vì chỉ có trừ và chia nên ta ưu tiên phép chia trước: 6 : 2 = 3. Sau đó trừ: 20 - 3 = 17."
          }
        ]
      },
      {
        id: "m6-8",
        title: "Bài 8: Quan hệ chia hết và tính chất chia hết",
        summary: "Định nghĩa chia hết, ước và bội, tính chất chia hết của một tổng các số hạng.",
        theory: `### 1. Quan hệ chia hết
- Cho hai số tự nhiên $a$ và $b$ ($b \\neq 0$). Nếu có số tự nhiên $q$ sao cho $a = b \\cdot q$, ta nói **$a$ chia hết cho $b$** và kí hiệu là **$a \\vdots b$**.
- Nếu $a \\vdots b$, ta gọi:
  - $a$ là **bội** của $b$.
  - $b$ là **ước** của $a$.
- Tập hợp các ước của $a$ kí hiệu là $\\mathrm{U}(a)$. Tập hợp các bội của $b$ kí hiệu là $\\mathrm{B}(b)$.
- **Cách tìm ước**: Lần lượt chia $a$ cho các số tự nhiên từ $1$ đến $a$ để xem $a$ chia hết cho những số nào.
- **Cách tìm bội**: Nhân $b$ lần lượt with các số tự nhiên $0; 1; 2; 3; 4; ...$

### 2. Tính chất chia hết của một tổng
- **Tính chất 1 (Tất cả số hạng đều chia hết)**: Nếu tất cả các số hạng của một tổng đều chia hết cho cùng một số thì tổng đó chia hết cho số đó:
  $$a \\vdots m \\text{ và } b \\vdots m \\implies (a+b) \\vdots m$$
- **Tính chất 2 (Chỉ có một số hạng không chia hết)**: Nếu chỉ có đúng một số hạng của tổng không chia hết cho một số, các số hạng còn lại đều chia hết cho số đó thì tổng không chia hết cho số đó:
  $$a \\not\\vdots m \\text{ và } b \\vdots m \\implies (a+b) \\not\\vdots m$$`,
        questions: [
          {
            question: "Tập hợp các ước của số 12 là tập hợp nào?",
            options: [
              "{1; 2; 3; 4; 6; 12}",
              "{0; 12; 24; 36}",
              "{2; 3; 4; 6}",
              "{1; 2; 3; 4; 5; 6; 12}"
            ],
            correctIndex: 0,
            explanation: "Số 12 chia hết cho các số: 1, 2, 3, 4, 6, 12. Do đó tập hợp ước của 12 là U(12) = {1; 2; 3; 4; 6; 12}."
          },
          {
            question: "Không thực hiện phép tính, hãy cho biết tổng A = 24 + 36 + 15 chia hết cho số nào dưới đây?",
            options: [
              "6",
              "3",
              "9",
              "4"
            ],
            correctIndex: 1,
            explanation: "Ta thấy 24 chia hết cho 3, 36 chia hết cho 3, và 15 cũng chia hết cho 3. Theo tính chất 1, tổng A chia hết cho 3."
          },
          {
            "question": "Tìm tập hợp các ước của số 18.",
            "options": [
              "{1; 2; 3; 6; 9}",
              "{1; 2; 3; 6; 9; 18}",
              "{1; 2; 3; 6; 9; 18; 19}",
              "{2; 3; 6; 9; 18}"
            ],
            "correctIndex": 1,
            "explanation": "Lần lượt kiểm tra các số từ 1 đến 18 chia hết cho 18, ta được U(18) = {1; 2; 3; 6; 9; 18}."
          },
          {
            "question": "Tìm tập hợp các ước của số 24.",
            "options": [
              "{1; 2; 3; 4; 6; 8; 12}",
              "{1; 2; 3; 4; 6; 8; 12; 24; 25}",
              "{1; 2; 3; 4; 6; 8; 12; 24}",
              "{2; 3; 4; 6; 8; 12; 24}"
            ],
            "correctIndex": 2,
            "explanation": "Lần lượt kiểm tra các số từ 1 đến 24 chia hết cho 24, ta được U(24) = {1; 2; 3; 4; 6; 8; 12; 24}."
          },
          {
            "question": "Tìm tập hợp các ước của số 36.",
            "options": [
              "{2; 3; 4; 6; 9; 12; 18; 36}",
              "{1; 2; 3; 4; 6; 9; 12; 18; 36; 37}",
              "{1; 2; 3; 4; 6; 9; 12; 18; 36}",
              "{1; 2; 3; 4; 6; 9; 12; 18}"
            ],
            "correctIndex": 2,
            "explanation": "Lần lượt kiểm tra các số từ 1 đến 36 chia hết cho 36, ta được U(36) = {1; 2; 3; 4; 6; 9; 12; 18; 36}."
          },
          {
            "question": "Tìm tập hợp các ước của số 20.",
            "options": [
              "{2; 4; 5; 10; 20}",
              "{1; 2; 4; 5; 10; 20}",
              "{1; 2; 4; 5; 10}",
              "{1; 2; 4; 5; 10; 20; 21}"
            ],
            "correctIndex": 1,
            "explanation": "Lần lượt kiểm tra các số từ 1 đến 20 chia hết cho 20, ta được U(20) = {1; 2; 4; 5; 10; 20}."
          },
          {
            "question": "Tìm tập hợp các ước của số 32.",
            "options": [
              "{1; 2; 4; 8; 16; 32; 33}",
              "{1; 2; 4; 8; 16; 32}",
              "{1; 2; 4; 8; 16}",
              "{2; 4; 8; 16; 32}"
            ],
            "correctIndex": 1,
            "explanation": "Lần lượt kiểm tra các số từ 1 đến 32 chia hết cho 32, ta được U(32) = {1; 2; 4; 8; 16; 32}."
          },
          {
            "question": "Tìm tập hợp các ước của số 28.",
            "options": [
              "{1; 2; 4; 7; 14}",
              "{2; 4; 7; 14; 28}",
              "{1; 2; 4; 7; 14; 28}",
              "{1; 2; 4; 7; 14; 28; 29}"
            ],
            "correctIndex": 2,
            "explanation": "Lần lượt kiểm tra các số từ 1 đến 28 chia hết cho 28, ta được U(28) = {1; 2; 4; 7; 14; 28}."
          },
          {
            "question": "Liệt kê 5 bội đầu tiên (kể cả 0) của số 6.",
            "options": [
              "{0; 6; 12; 18; 24}",
              "{6; 7; 8; 9; 10}",
              "{6; 12; 18; 24; 30}",
              "{0; 6; 12; 18; 30}"
            ],
            "correctIndex": 0,
            "explanation": "Nhân 6 lần lượt với 0, 1, 2,... ta được các bội của 6 là B(6) = {0; 6; 12; 18; 24} (lấy 5 phần tử đầu tiên)."
          },
          {
            "question": "Liệt kê 6 bội đầu tiên (kể cả 0) của số 7.",
            "options": [
              "{7; 8; 9; 10; 11; 12}",
              "{0; 7; 14; 21; 28; 35}",
              "{0; 7; 14; 21; 28; 42}",
              "{7; 14; 21; 28; 35; 42}"
            ],
            "correctIndex": 1,
            "explanation": "Nhân 7 lần lượt với 0, 1, 2,... ta được các bội của 7 là B(7) = {0; 7; 14; 21; 28; 35} (lấy 6 phần tử đầu tiên)."
          },
          {
            "question": "Liệt kê 4 bội đầu tiên (kể cả 0) của số 9.",
            "options": [
              "{0; 9; 18; 36}",
              "{9; 10; 11; 12}",
              "{0; 9; 18; 27}",
              "{9; 18; 27; 36}"
            ],
            "correctIndex": 2,
            "explanation": "Nhân 9 lần lượt với 0, 1, 2,... ta được các bội của 9 là B(9) = {0; 9; 18; 27} (lấy 4 phần tử đầu tiên)."
          },
          {
            "question": "Liệt kê 5 bội đầu tiên (kể cả 0) của số 11.",
            "options": [
              "{11; 22; 33; 44; 55}",
              "{0; 11; 22; 33; 44}",
              "{0; 11; 22; 33; 55}",
              "{11; 12; 13; 14; 15}"
            ],
            "correctIndex": 1,
            "explanation": "Nhân 11 lần lượt với 0, 1, 2,... ta được các bội của 11 là B(11) = {0; 11; 22; 33; 44} (lấy 5 phần tử đầu tiên)."
          },
          {
            "question": "Không tính tổng, hãy xét xem A = 12 + 18 + 30 có chia hết cho 6 không?",
            "options": [
              "Chia hết cho 7",
              "Không thể xác định nếu không tính tổng trực tiếp",
              "Không chia hết cho 6",
              "Chia hết cho 6, vì tất cả các số hạng đều chia hết cho 6"
            ],
            "correctIndex": 3,
            "explanation": "Kiểm tra từng số hạng chia cho 6: 12 chia hết, 18 chia hết, 30 chia hết cho 6. Do đó Chia hết cho 6, vì tất cả các số hạng đều chia hết cho 6."
          },
          {
            "question": "Không tính tổng, hãy xét xem A = 15 + 20 + 9 có chia hết cho 5 không?",
            "options": [
              "Không thể xác định nếu không tính tổng trực tiếp",
              "Chia hết cho 5",
              "Chia hết cho 6",
              "Không chia hết cho 5, vì có số hạng không chia hết cho 5"
            ],
            "correctIndex": 3,
            "explanation": "Kiểm tra từng số hạng chia cho 5: 15 chia hết, 20 chia hết, 9 không chia hết cho 5. Do đó Không chia hết cho 5, vì có số hạng không chia hết cho 5."
          },
          {
            "question": "Không tính tổng, hãy xét xem A = 21 + 14 + 35 có chia hết cho 7 không?",
            "options": [
              "Không chia hết cho 7",
              "Không thể xác định nếu không tính tổng trực tiếp",
              "Chia hết cho 8",
              "Chia hết cho 7, vì tất cả các số hạng đều chia hết cho 7"
            ],
            "correctIndex": 3,
            "explanation": "Kiểm tra từng số hạng chia cho 7: 21 chia hết, 14 chia hết, 35 chia hết cho 7. Do đó Chia hết cho 7, vì tất cả các số hạng đều chia hết cho 7."
          },
          {
            "question": "Không tính tổng, hãy xét xem A = 16 + 24 + 10 có chia hết cho 4 không?",
            "options": [
              "Không thể xác định nếu không tính tổng trực tiếp",
              "Chia hết cho 5",
              "Chia hết cho 4",
              "Không chia hết cho 4, vì có số hạng không chia hết cho 4"
            ],
            "correctIndex": 3,
            "explanation": "Kiểm tra từng số hạng chia cho 4: 16 chia hết, 24 chia hết, 10 không chia hết cho 4. Do đó Không chia hết cho 4, vì có số hạng không chia hết cho 4."
          },
          {
            "question": "Nếu a chia hết cho b, ta nói a là gì của b?",
            "options": [
              "Ước của b",
              "Bội của b",
              "Số nguyên tố của b",
              "Số đối của b"
            ],
            "correctIndex": 1,
            "explanation": "Nếu a chia hết cho b thì a được gọi là bội của b, còn b được gọi là ước của a."
          },
          {
            "question": "Số 0 là bội của mọi số tự nhiên khác 0. Khẳng định này đúng hay sai?",
            "options": [
              "Đúng, vì 0 chia cho số nào (khác 0) cũng bằng 0",
              "Sai, vì 0 không chia hết cho số nào",
              "Sai, chỉ đúng với số chẵn",
              "Không xác định được"
            ],
            "correctIndex": 0,
            "explanation": "Vì 0 : b = 0 với mọi b khác 0 (thương là số tự nhiên, không dư), nên 0 chia hết cho mọi số tự nhiên khác 0, tức 0 là bội của mọi số đó."
          },
          {
            "question": "Số 1 là ước của số tự nhiên nào?",
            "options": [
              "Chỉ là ước của các số lẻ",
              "Là ước của mọi số tự nhiên",
              "Chỉ là ước của chính số 1",
              "Không là ước của số nào"
            ],
            "correctIndex": 1,
            "explanation": "Vì mọi số tự nhiên a đều có a = 1 × a, nên số 1 là ước của mọi số tự nhiên."
          },
          {
            "question": "Cách tìm bội của một số tự nhiên b (b ≠ 0) được thực hiện như thế nào?",
            "options": [
              "Chia b cho các số tự nhiên từ 1 đến b",
              "Nhân b lần lượt với 0, 1, 2, 3, ...",
              "Cộng b với 1",
              "Trừ b cho 1"
            ],
            "correctIndex": 1,
            "explanation": "Muốn tìm bội của b, ta nhân b lần lượt với 0, 1, 2, 3, ... để được các bội của b."
          }
        ]
      },
      {
        id: "m6-9",
        title: "Bài 9: Dấu hiệu chia hết cho 2, 5, 9, 3",
        summary: "Nhận biết nhanh các số chia hết cho 2 và 5 dựa vào chữ số tận cùng, chia hết cho 3 và 9 dựa vào tổng các chữ số.",
        theory: `### 1. Dấu hiệu chia hết cho 2 và cho 5
- **Chia hết cho 2**: Các số có chữ số tận cùng là chữ số chẵn: $0, 2, 4, 6, 8$ thì chia hết cho 2 và chỉ những số đó mới chia hết cho 2.
- **Chia hết cho 5**: Các số có chữ số tận cùng là $0$ hoặc $5$ thì chia hết cho 5 và chỉ những số đó mới chia hết cho 5.
- *Lưu ý*: Các số có chữ số tận cùng là $0$ thì chia hết cho cả 2 và 5.

### 2. Dấu hiệu chia hết cho 9 và cho 3
- **Chia hết cho 9**: Các số có **tổng các chữ số** chia hết cho 9 thì chia hết cho 9 và chỉ những số đó mới chia hết cho 9.
- **Chia hết cho 3**: Các số có **tổng các chữ số** chia hết cho 3 thì chia hết cho 3 và chỉ những số đó mới chia hết cho 3.
- *Chú ý*: Một số chia hết cho 9 thì chắc chắn chia hết cho 3. Ngược lại, một số chia hết cho 3 chưa chắc đã chia hết cho 9.`,
        questions: [
          {
            question: "Số nào dưới đây đồng thời chia hết cho cả 2; 5 và 9?",
            options: [
              "190",
              "270",
              "275",
              "450"
            ],
            correctIndex: 1,
            explanation: "Để chia hết cho cả 2 và 5, chữ số tận cùng của số đó phải là 0 (loại 275). Để chia hết cho 9, tổng các chữ số phải chia hết cho 9. Trong các số còn lại, số 270 có 2+7+0=9 chia hết cho 9 (đúng). Số 190 có 1+9+0=10 không chia hết cho 9."
          },
          {
            question: "Tìm chữ số * thích hợp để số 15* chia hết cho 3 nhưng không chia hết cho 9.",
            options: [
              "* = 3",
              "* = 0",
              "* = 6",
              "* = 0 hoặc * = 6"
            ],
            correctIndex: 3,
            explanation: "Tổng các chữ số là 1 + 5 + * = 6 + *. Để chia hết cho 3, tổng này phải là 6, 9, 12, 15... nghĩa là * có thể là 0, 3, 6, 9. Nếu * = 3, số là 153 có tổng bằng 9 chia hết cho 9 (loại). Nếu * = 9, số là 159 có tổng bằng 15 chia hết cho 3 nhưng không chia hết cho 9 (đúng). Nếu * = 0 hoặc * = 6 thì tổng lần loạt là 6 và 12 đều chia hết cho 3 và không chia hết cho 9."
          },
          {
            "question": "Số 3540 chia hết cho những số nào trong các số 2, 3, 5, 9?",
            "options": [
              "{2; 3; 5}",
              "{2; 3}",
              "{2; 5}",
              "{3; 5}"
            ],
            "correctIndex": 0,
            "explanation": "Số 3540 có chữ số tận cùng là 0 nên chia hết cho 2, chia hết cho 5. Tổng các chữ số là 12, chia hết cho 3 nhưng không chia hết cho 9. Vậy 3540 chia hết cho {2; 3; 5}."
          },
          {
            "question": "Số 2718 chia hết cho những số nào trong các số 2, 3, 5, 9?",
            "options": [
              "{2; 3; 9}",
              "{2; 3; 5; 9}",
              "{3; 9}",
              "{2; 9}"
            ],
            "correctIndex": 0,
            "explanation": "Số 2718 có chữ số tận cùng là 8 nên chia hết cho 2, không chia hết cho 5. Tổng các chữ số là 18, chia hết cho 9 (nên cũng chia hết cho 3). Vậy 2718 chia hết cho {2; 3; 9}."
          },
          {
            "question": "Số 94125 chia hết cho những số nào trong các số 2, 3, 5, 9?",
            "options": [
              "{3; 5}",
              "{5}",
              "{3}",
              "{2; 3; 5}"
            ],
            "correctIndex": 0,
            "explanation": "Số 94125 có chữ số tận cùng là 5 nên không chia hết cho 2, chia hết cho 5. Tổng các chữ số là 21, chia hết cho 3 nhưng không chia hết cho 9. Vậy 94125 chia hết cho {3; 5}."
          },
          {
            "question": "Số 61230 chia hết cho những số nào trong các số 2, 3, 5, 9?",
            "options": [
              "{2; 3; 5; 9}",
              "{2; 5; 9}",
              "{2; 3; 9}",
              "{3; 5; 9}"
            ],
            "correctIndex": 0,
            "explanation": "Số 61230 có chữ số tận cùng là 0 nên chia hết cho 2, chia hết cho 5. Tổng các chữ số là 12, chia hết cho 3 nhưng không chia hết cho 9. Vậy 61230 chia hết cho {2; 3; 5; 9}."
          },
          {
            "question": "Số 48651 chia hết cho những số nào trong các số 2, 3, 5, 9?",
            "options": [
              "{2; 3}",
              "{3}",
              "{3; 5}",
              "Không chia hết cho số nào trong 4 số trên"
            ],
            "correctIndex": 1,
            "explanation": "Số 48651 có chữ số tận cùng là 1 nên không chia hết cho 2, không chia hết cho 5. Tổng các chữ số là 24, chia hết cho 3 nhưng không chia hết cho 9. Vậy 48651 chia hết cho {3}."
          },
          {
            "question": "Số 72360 chia hết cho những số nào trong các số 2, 3, 5, 9?",
            "options": [
              "{2; 3; 5; 9}",
              "{2; 5; 9}",
              "{2; 3; 9}",
              "{3; 5; 9}"
            ],
            "correctIndex": 0,
            "explanation": "Số 72360 có chữ số tận cùng là 0 nên chia hết cho 2, chia hết cho 5. Tổng các chữ số là 18, chia hết cho 9 (nên cũng chia hết cho 3). Vậy 72360 chia hết cho {2; 3; 5; 9}."
          },
          {
            "question": "Số 18475 chia hết cho những số nào trong các số 2, 3, 5, 9?",
            "options": [
              "{2; 5}",
              "{3; 5}",
              "{5}",
              "Không chia hết cho số nào trong 4 số trên"
            ],
            "correctIndex": 2,
            "explanation": "Số 18475 có chữ số tận cùng là 5 nên không chia hết cho 2, chia hết cho 5. Tổng các chữ số là 25, không chia hết cho 3 và 9. Vậy 18475 chia hết cho {5}."
          },
          {
            "question": "Số 39024 chia hết cho những số nào trong các số 2, 3, 5, 9?",
            "options": [
              "{2; 3}",
              "{2}",
              "{2; 3; 5}",
              "{3}"
            ],
            "correctIndex": 0,
            "explanation": "Số 39024 có chữ số tận cùng là 4 nên chia hết cho 2, không chia hết cho 5. Tổng các chữ số là 18, chia hết cho 9 (nên cũng chia hết cho 3). Vậy 39024 chia hết cho {2; 3}."
          },
          {
            "question": "Tìm chữ số * để số 7*2 chia hết cho 3.",
            "options": [
              "Không có giá trị nào thỏa mãn",
              "* = 0",
              "* = 2",
              "* = 0, * = 3, * = 6, * = 9"
            ],
            "correctIndex": 3,
            "explanation": "Áp dụng dấu hiệu chia hết cho 3, ta tìm được các giá trị * thỏa mãn là: * = 0, * = 3, * = 6, * = 9."
          },
          {
            "question": "Tìm chữ số * để số 4*35 chia hết cho 9.",
            "options": [
              "* = 7",
              "* = 8",
              "* = 6",
              "Không có giá trị nào thỏa mãn"
            ],
            "correctIndex": 2,
            "explanation": "Áp dụng dấu hiệu chia hết cho 9, ta tìm được các giá trị * thỏa mãn là: * = 6."
          },
          {
            "question": "Tìm chữ số * để số 28* chia hết cho 5.",
            "options": [
              "* = 0",
              "Không có giá trị nào thỏa mãn",
              "* = 0, * = 5",
              "* = 2"
            ],
            "correctIndex": 2,
            "explanation": "Áp dụng dấu hiệu chia hết cho 5, ta tìm được các giá trị * thỏa mãn là: * = 0, * = 5."
          },
          {
            "question": "Tìm chữ số * để số 6*4 chia hết cho 3.",
            "options": [
              "* = 2, * = 5, * = 8",
              "Không có giá trị nào thỏa mãn",
              "* = 2",
              "* = 4"
            ],
            "correctIndex": 0,
            "explanation": "Áp dụng dấu hiệu chia hết cho 3, ta tìm được các giá trị * thỏa mãn là: * = 2, * = 5, * = 8."
          },
          {
            "question": "Số nào sau đây chia hết cho 5 nhưng không chia hết cho 2?",
            "options": [
              "120",
              "245",
              "350",
              "480"
            ],
            "correctIndex": 1,
            "explanation": "Số chia hết cho 5 có chữ số tận cùng 0 hoặc 5. Số chia hết cho 2 phải có chữ số tận cùng chẵn. Số 245 tận cùng là 5 (chia hết cho 5) nhưng là số lẻ nên không chia hết cho 2."
          },
          {
            "question": "Một số chia hết cho 9 thì có chắc chắn chia hết cho 3 không?",
            "options": [
              "Có, vì 9 chia hết cho 3 nên số chia hết cho 9 luôn chia hết cho 3",
              "Không, hai dấu hiệu này độc lập nhau",
              "Chỉ đúng với số chẵn",
              "Chỉ đúng với số có 3 chữ số"
            ],
            "correctIndex": 0,
            "explanation": "Vì 9 = 3 × 3, nếu tổng các chữ số chia hết cho 9 thì chắc chắn tổng đó cũng chia hết cho 3. Do đó số chia hết cho 9 luôn chia hết cho 3."
          },
          {
            "question": "Số 1 000 000 có chia hết cho 3 không?",
            "options": [
              "Có, vì số này rất lớn",
              "Không, vì tổng các chữ số là 1, không chia hết cho 3",
              "Có, vì tận cùng là số 0",
              "Không đủ dữ kiện để xác định"
            ],
            "correctIndex": 1,
            "explanation": "Tổng các chữ số của 1 000 000 là 1 + 0+0+0+0+0+0 = 1. Vì 1 không chia hết cho 3 nên số 1 000 000 không chia hết cho 3."
          },
          {
            "question": "Dấu hiệu nhận biết một số chia hết cho 9 dựa vào yếu tố nào của số đó?",
            "options": [
              "Chữ số tận cùng",
              "Tổng các chữ số",
              "Số lượng chữ số",
              "Chữ số đầu tiên"
            ],
            "correctIndex": 1,
            "explanation": "Một số chia hết cho 9 khi và chỉ khi tổng các chữ số của số đó chia hết cho 9."
          },
          {
            "question": "Số 2 340 có chia hết cho cả 2 và 9 hay không?",
            "options": [
              "Chia hết cho 2 nhưng không chia hết cho 9",
              "Chia hết cho cả 2 và 9",
              "Không chia hết cho cả 2 và 9",
              "Chia hết cho 9 nhưng không chia hết cho 2"
            ],
            "correctIndex": 1,
            "explanation": "Số 2 340 tận cùng là 0 (chữ số chẵn) nên chia hết cho 2. Tổng các chữ số 2+3+4+0 = 9 chia hết cho 9, nên số này cũng chia hết cho 9."
          },
          {
            "question": "Trong hai dấu hiệu chia hết cho 2 và chia hết cho 5, điểm chung là gì?",
            "options": [
              "Đều dựa vào tổng các chữ số",
              "Đều chỉ xét chữ số tận cùng của số đó",
              "Đều chỉ áp dụng cho số chẵn",
              "Không có điểm chung nào"
            ],
            "correctIndex": 1,
            "explanation": "Cả hai dấu hiệu chia hết cho 2 và cho 5 đều chỉ cần xét chữ số tận cùng của số tự nhiên đó, không cần xét các chữ số khác."
          }
        ]
      },
      {
        id: "m6-10",
        title: "Bài 10: Số nguyên tố và Hợp số",
        summary: "Định nghĩa số nguyên tố, hợp số, số đặc biệt 0 và 1, cách phân tích một số ra thừa số nguyên tố.",
        theory: `### 1. Số nguyên tố và Hợp số
- **Số nguyên tố**: Là số tự nhiên **lớn hơn 1**, chỉ có đúng hai ước là $1$ và chính nó.
  - Các số nguyên tố nhỏ hơn 10 là: $2, 3, 5, 7$. Số 2 là số nguyên tố chẵn duy nhất.
- **Hợp số**: Là số tự nhiên **lớn hơn 1**, có nhiều hơn hai ước (tức là ngoài 1 và chính nó, nó còn có ước khác).
  - Ví dụ: Số $4$ (có ước là 1, 2, 4), số $6$, số $9$.
- **Trường hợp đặc biệt**: Các số $0$ và $1$ không phải là số nguyên tố và cũng không phải là hợp số.

### 2. Phân tích một số ra thừa số nguyên tố
- Phân tích một số tự nhiên lớn hơn 1 ra thừa số nguyên tố là viết số đó dưới dạng một tích các thừa số nguyên tố.
- Có hai cách sơ đồ hóa thường dùng:
  1. **Sơ đồ cây**: Tách số thành tích hai thừa số, tiếp tục tách các hợp số cho đến khi tất cả các nhánh đều là số nguyên tố.
  2. **Sơ đồ cột**: Chia số đó cho số nguyên tố nhỏ nhất mà nó chia hết, viết thương dưới số đó rồi tiếp tục chia cho đến khi thương bằng 1.`,
        questions: [
          {
            question: "Trong các khẳng định sau, khẳng định nào đúng?",
            options: [
              "Mọi số nguyên tố đều là số lẻ",
              "Số 2 là số nguyên tố chẵn duy nhất",
              "Số 1 là số nguyên tố nhỏ nhất",
              "Hợp số có thể có đúng hai ước"
            ],
            correctIndex: 1,
            explanation: "Số 2 là số chẵn và chỉ có hai ước là 1 và 2 nên là số nguyên tố chẵn duy nhất. Số 1 không phải số nguyên tố."
          },
          {
            question: "Kết quả phân tích số 60 ra thừa số nguyên tố là biểu thức nào?",
            options: [
              "2 * 3 * 10",
              "4 * 3 * 5",
              "2^2 * 3 * 5",
              "2 * 3^2 * 5"
            ],
            correctIndex: 2,
            explanation: "Ta chia 60 : 2 = 30; 30 : 2 = 15; 15 : 3 = 5; 5 : 5 = 1. Kết quả tích lũy là 2 * 2 * 3 * 5 = 2^2 * 3 * 5. Các đáp án khác chứa hợp số 10 hoặc 4."
          },
          {
            "question": "Số 23 là số nguyên tố hay hợp số?",
            "options": [
              "23 là hợp số",
              "23 không phải số nguyên tố cũng không phải hợp số",
              "23 là số nguyên tố",
              "23 vừa là số nguyên tố vừa là hợp số"
            ],
            "correctIndex": 2,
            "explanation": "Kiểm tra các ước của 23: 23 là số nguyên tố."
          },
          {
            "question": "Số 27 là số nguyên tố hay hợp số?",
            "options": [
              "27 không phải số nguyên tố cũng không phải hợp số",
              "27 là hợp số",
              "27 là số nguyên tố",
              "27 vừa là số nguyên tố vừa là hợp số"
            ],
            "correctIndex": 1,
            "explanation": "Kiểm tra các ước của 27: 27 là hợp số (ví dụ 27 chia hết cho 3)."
          },
          {
            "question": "Số 31 là số nguyên tố hay hợp số?",
            "options": [
              "31 vừa là số nguyên tố vừa là hợp số",
              "31 là số nguyên tố",
              "31 là hợp số",
              "31 không phải số nguyên tố cũng không phải hợp số"
            ],
            "correctIndex": 1,
            "explanation": "Kiểm tra các ước của 31: 31 là số nguyên tố."
          },
          {
            "question": "Số 51 là số nguyên tố hay hợp số?",
            "options": [
              "51 không phải số nguyên tố cũng không phải hợp số",
              "51 là hợp số",
              "51 là số nguyên tố",
              "51 vừa là số nguyên tố vừa là hợp số"
            ],
            "correctIndex": 1,
            "explanation": "Kiểm tra các ước của 51: 51 là hợp số (ví dụ 51 chia hết cho 3)."
          },
          {
            "question": "Số 41 là số nguyên tố hay hợp số?",
            "options": [
              "41 không phải số nguyên tố cũng không phải hợp số",
              "41 là số nguyên tố",
              "41 là hợp số",
              "41 vừa là số nguyên tố vừa là hợp số"
            ],
            "correctIndex": 1,
            "explanation": "Kiểm tra các ước của 41: 41 là số nguyên tố."
          },
          {
            "question": "Số 57 là số nguyên tố hay hợp số?",
            "options": [
              "57 vừa là số nguyên tố vừa là hợp số",
              "57 là hợp số",
              "57 là số nguyên tố",
              "57 không phải số nguyên tố cũng không phải hợp số"
            ],
            "correctIndex": 1,
            "explanation": "Kiểm tra các ước của 57: 57 là hợp số (ví dụ 57 chia hết cho 3)."
          },
          {
            "question": "Số 61 là số nguyên tố hay hợp số?",
            "options": [
              "61 là số nguyên tố",
              "61 là hợp số",
              "61 không phải số nguyên tố cũng không phải hợp số",
              "61 vừa là số nguyên tố vừa là hợp số"
            ],
            "correctIndex": 0,
            "explanation": "Kiểm tra các ước của 61: 61 là số nguyên tố."
          },
          {
            "question": "Số 91 là số nguyên tố hay hợp số?",
            "options": [
              "91 là số nguyên tố",
              "91 vừa là số nguyên tố vừa là hợp số",
              "91 không phải số nguyên tố cũng không phải hợp số",
              "91 là hợp số"
            ],
            "correctIndex": 3,
            "explanation": "Kiểm tra các ước của 91: 91 là hợp số (ví dụ 91 chia hết cho 7)."
          },
          {
            "question": "Phân tích số 48 ra thừa số nguyên tố.",
            "options": [
              "2^5 * 3",
              "2 × 24",
              "2 * 3",
              "2^4 * 3"
            ],
            "correctIndex": 3,
            "explanation": "Phân tích 48 ra thừa số nguyên tố ta được: 48 = 2^4 * 3."
          },
          {
            "question": "Phân tích số 90 ra thừa số nguyên tố.",
            "options": [
              "2 * 3 * 5",
              "2^2 * 3^2 * 5",
              "2 * 3^2 * 5",
              "2 × 45"
            ],
            "correctIndex": 2,
            "explanation": "Phân tích 90 ra thừa số nguyên tố ta được: 90 = 2 * 3^2 * 5."
          },
          {
            "question": "Phân tích số 72 ra thừa số nguyên tố.",
            "options": [
              "2^3 * 3^2",
              "2^3 * 3",
              "2^4 * 3^2",
              "2 × 36"
            ],
            "correctIndex": 0,
            "explanation": "Phân tích 72 ra thừa số nguyên tố ta được: 72 = 2^3 * 3^2."
          },
          {
            "question": "Phân tích số 84 ra thừa số nguyên tố.",
            "options": [
              "2^3 * 3 * 7",
              "2 * 3 * 7",
              "2^2 * 3 * 7",
              "2 × 42"
            ],
            "correctIndex": 2,
            "explanation": "Phân tích 84 ra thừa số nguyên tố ta được: 84 = 2^2 * 3 * 7."
          },
          {
            "question": "Phân tích số 126 ra thừa số nguyên tố.",
            "options": [
              "2 * 3 * 7",
              "2 × 63",
              "2^2 * 3^2 * 7",
              "2 * 3^2 * 7"
            ],
            "correctIndex": 3,
            "explanation": "Phân tích 126 ra thừa số nguyên tố ta được: 126 = 2 * 3^2 * 7."
          },
          {
            "question": "Phân tích số 100 ra thừa số nguyên tố.",
            "options": [
              "2^3 * 5^2",
              "2^2 * 5^2",
              "2^2 * 5",
              "2 × 50"
            ],
            "correctIndex": 1,
            "explanation": "Phân tích 100 ra thừa số nguyên tố ta được: 100 = 2^2 * 5^2."
          },
          {
            "question": "Số nguyên tố nhỏ nhất là số nào?",
            "options": [
              "0",
              "1",
              "2",
              "3"
            ],
            "correctIndex": 2,
            "explanation": "Số nguyên tố là số tự nhiên lớn hơn 1 chỉ có đúng hai ước là 1 và chính nó. Số nguyên tố nhỏ nhất là 2."
          },
          {
            "question": "Trong các số 0 và 1, khẳng định nào sau đây đúng?",
            "options": [
              "0 và 1 đều là số nguyên tố",
              "0 và 1 đều là hợp số",
              "0 và 1 không phải là số nguyên tố cũng không phải là hợp số",
              "0 là số nguyên tố, 1 là hợp số"
            ],
            "correctIndex": 2,
            "explanation": "Theo định nghĩa, số nguyên tố và hợp số đều phải lớn hơn 1. Do đó 0 và 1 không thuộc loại nào trong hai loại này."
          },
          {
            "question": "Số các ước của một hợp số so với số các ước của một số nguyên tố như thế nào?",
            "options": [
              "Hợp số luôn có nhiều hơn 2 ước, số nguyên tố có đúng 2 ước",
              "Cả hai đều có đúng 2 ước",
              "Hợp số có ít ước hơn số nguyên tố",
              "Không thể so sánh"
            ],
            "correctIndex": 0,
            "explanation": "Số nguyên tố có đúng 2 ước (1 và chính nó), trong khi hợp số có nhiều hơn 2 ước."
          },
          {
            "question": "Cách phân tích ra thừa số nguyên tố bằng 'sơ đồ cột' thực hiện như thế nào?",
            "options": [
              "Chia số đó lần lượt cho các số nguyên tố nhỏ nhất có thể, đến khi thương bằng 1",
              "Cộng dồn các số nguyên tố nhỏ hơn số đó",
              "Nhân số đó với các số nguyên tố nhỏ hơn nó",
              "Lấy số đó trừ đi số nguyên tố lớn nhất nhỏ hơn nó"
            ],
            "correctIndex": 0,
            "explanation": "Sơ đồ cột: ta chia số cần phân tích cho số nguyên tố nhỏ nhất mà nó chia hết, ghi thương xuống dưới, tiếp tục quá trình cho đến khi thương bằng 1."
          }
        ]
      },
      {
        id: "m6-11",
        title: "Bài 11: Ước chung và Ước chung lớn nhất (ƯCLN)",
        summary: "Tìm ước chung, tìm ƯCLN bằng phân tích thừa số nguyên tố, ứng dụng rút gọn phân số.",
        theory: `### 1. Ước chung
- Một số được gọi là **ước chung** của hai hay nhiều số nếu nó là ước của tất cả các số đó.
- Tập hợp ước chung của $a$ và $b$ kí hiệu là $\\mathrm{U'C}(a, b)$.

### 2. Ước chung lớn nhất (ƯCLN)
- **ƯCLN** của hai hay nhiều số là số lớn nhất trong tập hợp các ước chung của các số đó. Kí hiệu là $\\mathrm{U'CLN}(a, b)$.
- **Cách tìm ƯCLN bằng cách phân tích thừa số nguyên tố**:
  - *Bước 1*: Phân tích mỗi số ra thừa số nguyên tố.
  - *Bước 2*: Chọn ra các thừa số nguyên tố **chung**.
  - *Bước 3*: Lập tích các thừa số đã chọn, mỗi thừa số lấy với **số mũ nhỏ nhất**. Tích đó là ƯCLN cần tìm.
- **Hai số nguyên tố cùng nhau**: Là hai số tự nhiên có ƯCLN bằng 1 (ví dụ 8 và 9).

### 3. Ứng dụng: Rút gọn phân số về tối giản
- Để rút gọn phân số $\\frac{a}{b}$ về phân số tối giản, ta chia cả tử và mẫu cho $\\mathrm{U'CLN}(a, b)$.`,
        questions: [
          {
            question: "Tìm ƯCLN của hai số 18 và 30.",
            options: [
              "3",
              "6",
              "9",
              "2"
            ],
            correctIndex: 1,
            explanation: "Phân tích: 18 = 2 * 3^2; 30 = 2 * 3 * 5. Thừa số chung là 2 và 3. Số mũ nhỏ nhất là 2^1 và 3^1. Vậy ƯCLN(18, 30) = 2 * 3 = 6."
          },
          {
            question: "Rút gọn phân số 24/36 về tối giản bằng cách chia cả tử và mẫu cho ƯCLN của chúng. Phân số thu được là:",
            options: [
              "12/18",
              "2/3",
              "4/6",
              "3/4"
            ],
            correctIndex: 1,
            explanation: "ƯCLN(24, 36) = 12. Chia cả tử và mẫu cho 12 ta được: (24 : 12) / (36 : 12) = 2/3."
          },
          {
            "question": "Tìm ƯCLN của hai số 24 và 36.",
            "options": [
              "14",
              "12",
              "6",
              "24"
            ],
            "correctIndex": 1,
            "explanation": "Phân tích 24 = 2^3 * 3; 36 = 2^2 * 3^2. Tích các thừa số chung với số mũ nhỏ nhất cho ta ƯCLN(24, 36) = 12."
          },
          {
            "question": "Tìm ƯCLN của hai số 45 và 60.",
            "options": [
              "16",
              "30",
              "17",
              "15"
            ],
            "correctIndex": 3,
            "explanation": "Phân tích 45 = 3^2 * 5; 60 = 2^2 * 3 * 5. Tích các thừa số chung với số mũ nhỏ nhất cho ta ƯCLN(45, 60) = 15."
          },
          {
            "question": "Tìm ƯCLN của hai số 28 và 42.",
            "options": [
              "14",
              "16",
              "7",
              "28"
            ],
            "correctIndex": 0,
            "explanation": "Phân tích 28 = 2^2 * 7; 42 = 2 * 3 * 7. Tích các thừa số chung với số mũ nhỏ nhất cho ta ƯCLN(28, 42) = 14."
          },
          {
            "question": "Tìm ƯCLN của hai số 56 và 84.",
            "options": [
              "14",
              "56",
              "28",
              "30"
            ],
            "correctIndex": 2,
            "explanation": "Phân tích 56 = 2^3 * 7; 84 = 2^2 * 3 * 7. Tích các thừa số chung với số mũ nhỏ nhất cho ta ƯCLN(56, 84) = 28."
          },
          {
            "question": "Tìm ƯCLN của hai số 63 và 105.",
            "options": [
              "42",
              "21",
              "23",
              "22"
            ],
            "correctIndex": 1,
            "explanation": "Phân tích 63 = 3^2 * 7; 105 = 3 * 5 * 7. Tích các thừa số chung với số mũ nhỏ nhất cho ta ƯCLN(63, 105) = 21."
          },
          {
            "question": "Tìm ƯCLN của hai số 18 và 27.",
            "options": [
              "9",
              "18",
              "10",
              "11"
            ],
            "correctIndex": 0,
            "explanation": "Phân tích 18 = 2 * 3^2; 27 = 3^3. Tích các thừa số chung với số mũ nhỏ nhất cho ta ƯCLN(18, 27) = 9."
          },
          {
            "question": "Rút gọn phân số 18/24 về phân số tối giản.",
            "options": [
              "18/24",
              "4/4",
              "9/12",
              "3/4"
            ],
            "correctIndex": 3,
            "explanation": "ƯCLN(18, 24) = 6. Chia cả tử và mẫu cho 6: (18:6)/(24:6) = 3/4."
          },
          {
            "question": "Rút gọn phân số 36/48 về phân số tối giản.",
            "options": [
              "36/48",
              "4/4",
              "3/4",
              "18/24"
            ],
            "correctIndex": 2,
            "explanation": "ƯCLN(36, 48) = 12. Chia cả tử và mẫu cho 12: (36:12)/(48:12) = 3/4."
          },
          {
            "question": "Rút gọn phân số 45/60 về phân số tối giản.",
            "options": [
              "45/60",
              "3/4",
              "4/4",
              "22/30"
            ],
            "correctIndex": 1,
            "explanation": "ƯCLN(45, 60) = 15. Chia cả tử và mẫu cho 15: (45:15)/(60:15) = 3/4."
          },
          {
            "question": "Rút gọn phân số 28/70 về phân số tối giản.",
            "options": [
              "14/35",
              "28/70",
              "2/5",
              "3/5"
            ],
            "correctIndex": 2,
            "explanation": "ƯCLN(28, 70) = 14. Chia cả tử và mẫu cho 14: (28:14)/(70:14) = 2/5."
          },
          {
            "question": "Hai số 8 và 15 có phải là hai số nguyên tố cùng nhau không?",
            "options": [
              "Không, vì ƯCLN(8, 15) = 15",
              "Có, vì ƯCLN(8, 15) = 8",
              "Không, vì ƯCLN(8, 15) = 1 ≠ 1",
              "Có, vì ƯCLN(8, 15) = 1"
            ],
            "correctIndex": 3,
            "explanation": "Tính ƯCLN(8, 15) = 1. Có, vì ƯCLN(8, 15) = 1."
          },
          {
            "question": "Hai số 9 và 12 có phải là hai số nguyên tố cùng nhau không?",
            "options": [
              "Không, vì ƯCLN(9, 12) = 3 ≠ 1",
              "Không, vì ƯCLN(9, 12) = 12",
              "Có, vì ƯCLN(9, 12) = 1",
              "Có, vì ƯCLN(9, 12) = 9"
            ],
            "correctIndex": 0,
            "explanation": "Tính ƯCLN(9, 12) = 3. Không, vì ƯCLN(9, 12) = 3 ≠ 1."
          },
          {
            "question": "Hai số 14 và 25 có phải là hai số nguyên tố cùng nhau không?",
            "options": [
              "Có, vì ƯCLN(14, 25) = 14",
              "Không, vì ƯCLN(14, 25) = 1 ≠ 1",
              "Không, vì ƯCLN(14, 25) = 25",
              "Có, vì ƯCLN(14, 25) = 1"
            ],
            "correctIndex": 3,
            "explanation": "Tính ƯCLN(14, 25) = 1. Có, vì ƯCLN(14, 25) = 1."
          },
          {
            "question": "Hai số 16 và 20 có phải là hai số nguyên tố cùng nhau không?",
            "options": [
              "Không, vì ƯCLN(16, 20) = 4 ≠ 1",
              "Có, vì ƯCLN(16, 20) = 1",
              "Có, vì ƯCLN(16, 20) = 16",
              "Không, vì ƯCLN(16, 20) = 20"
            ],
            "correctIndex": 0,
            "explanation": "Tính ƯCLN(16, 20) = 4. Không, vì ƯCLN(16, 20) = 4 ≠ 1."
          },
          {
            "question": "ƯCLN của một số a với chính số a bằng bao nhiêu?",
            "options": [
              "1",
              "0",
              "a",
              "Không xác định"
            ],
            "correctIndex": 2,
            "explanation": "Vì a là ước lớn nhất của chính nó, nên ƯCLN(a, a) = a."
          },
          {
            "question": "Bước đầu tiên trong quy tắc tìm ƯCLN bằng phân tích thừa số nguyên tố là gì?",
            "options": [
              "Chọn thừa số nguyên tố chung",
              "Phân tích mỗi số ra thừa số nguyên tố",
              "Lập tích các thừa số với số mũ lớn nhất",
              "Cộng các số lại với nhau"
            ],
            "correctIndex": 1,
            "explanation": "Quy tắc tìm ƯCLN gồm 3 bước, bước đầu tiên là phân tích mỗi số ra thừa số nguyên tố."
          },
          {
            "question": "Khi tìm ƯCLN bằng thừa số nguyên tố, với thừa số chung ta chọn số mũ nào?",
            "options": [
              "Số mũ lớn nhất",
              "Số mũ nhỏ nhất",
              "Tổng các số mũ",
              "Hiệu các số mũ"
            ],
            "correctIndex": 1,
            "explanation": "Khi tính ƯCLN, với mỗi thừa số nguyên tố chung, ta chọn số mũ nhỏ nhất của thừa số đó trong các số đã phân tích."
          },
          {
            "question": "ƯCLN(1, b) với b là một số tự nhiên bất kỳ khác 0 bằng bao nhiêu?",
            "options": [
              "b",
              "1",
              "0",
              "Không xác định"
            ],
            "correctIndex": 1,
            "explanation": "Vì 1 chỉ có duy nhất một ước là chính nó, nên ước chung lớn nhất của 1 và bất kỳ số nào khác 0 luôn bằng 1."
          }
        ]
      },
      {
        id: "m6-12",
        title: "Bài 12: Bội chung và Bội chung nhỏ nhất (BCNN)",
        summary: "Tìm bội chung, tìm BCNN bằng phân tích thừa số nguyên tố, ứng dụng quy đồng mẫu số các phân số.",
        theory: `### 1. Bội chung
- Một số được gọi là **bội chung** của hai hay nhiều số nếu nó là bội của tất cả các số đó.
- Tập hợp bội chung của $a$ và $b$ kí hiệu là $\\mathrm{BC}(a, b)$.

### 2. Bội chung nhỏ nhất (BCNN)
- **BCNN** của hai hay nhiều số là số nhỏ nhất khác $0$ trong tập hợp các bội chung của các số đó. Kí hiệu là $\\mathrm{BCNN}(a, b)$.
- **Cách tìm BCNN bằng cách phân tích thừa số nguyên tố**:
  - *Bước 1*: Phân tích mỗi số ra thừa số nguyên tố.
  - *Bước 2*: Chọn ra các thừa số nguyên tố **chung và riêng**.
  - *Bước 3*: Lập tích các thừa số đã chọn, mỗi thừa số lấy với **số mũ lớn nhất**. Tích đó là BCNN cần tìm.
- *Trường hợp đặc biệt*: Nếu các số cần tìm BCNN là các số nguyên tố cùng nhau từng đôi một thì BCNN bằng tích của các số đó (ví dụ BCNN(3, 5, 8) = 120).

### 3. Ứng dụng: Quy đồng mẫu số các phân số
- Ta chọn mẫu số chung là BCNN của các mẫu số của các phân số cần quy đồng.`,
        questions: [
          {
            question: "Tìm BCNN của hai số 8 và 12.",
            options: [
              "96",
              "24",
              "48",
              "12"
            ],
            correctIndex: 1,
            explanation: "Phân tích: 8 = 2^3; 12 = 2^2 * 3. Chọn thừa số chung và riêng là 2 và 3. Số mũ lớn nhất là 2^3 và 3^1. Vậy BCNN(8, 12) = 2^3 * 3 = 8 * 3 = 24."
          },
          {
            question: "Quy đồng hai phân số 5/6 và 3/8. Mẫu số chung nhỏ nhất của hai phân số này là bao nhiêu?",
            options: [
              "48",
              "24",
              "12",
              "14"
            ],
            correctIndex: 1,
            explanation: "Mẫu số chung nhỏ nhất là BCNN của 6 và 8. Phân tích: 6 = 2 * 3, 8 = 2^3. BCNN(6, 8) = 2^3 * 3 = 24."
          },
          {
            "question": "Tìm BCNN của hai số 4 và 6.",
            "options": [
              "12",
              "8",
              "24",
              "16"
            ],
            "correctIndex": 0,
            "explanation": "Phân tích 4 = 2^2; 6 = 2 * 3. Tích các thừa số chung và riêng với số mũ lớn nhất cho ta BCNN(4, 6) = 12."
          },
          {
            "question": "Tìm BCNN của hai số 9 và 12.",
            "options": [
              "108",
              "36",
              "27",
              "45"
            ],
            "correctIndex": 1,
            "explanation": "Phân tích 9 = 3^2; 12 = 2^2 * 3. Tích các thừa số chung và riêng với số mũ lớn nhất cho ta BCNN(9, 12) = 36."
          },
          {
            "question": "Tìm BCNN của hai số 10 và 15.",
            "options": [
              "150",
              "20",
              "40",
              "30"
            ],
            "correctIndex": 3,
            "explanation": "Phân tích 10 = 2 * 5; 15 = 3 * 5. Tích các thừa số chung và riêng với số mũ lớn nhất cho ta BCNN(10, 15) = 30."
          },
          {
            "question": "Tìm BCNN của hai số 6 và 8.",
            "options": [
              "24",
              "48",
              "18",
              "30"
            ],
            "correctIndex": 0,
            "explanation": "Phân tích 6 = 2 * 3; 8 = 2^3. Tích các thừa số chung và riêng với số mũ lớn nhất cho ta BCNN(6, 8) = 24."
          },
          {
            "question": "Tìm BCNN của hai số 14 và 21.",
            "options": [
              "42",
              "28",
              "294",
              "56"
            ],
            "correctIndex": 0,
            "explanation": "Phân tích 14 = 2 * 7; 21 = 3 * 7. Tích các thừa số chung và riêng với số mũ lớn nhất cho ta BCNN(14, 21) = 42."
          },
          {
            "question": "Tìm BCNN của hai số 15 và 20.",
            "options": [
              "300",
              "75",
              "45",
              "60"
            ],
            "correctIndex": 3,
            "explanation": "Phân tích 15 = 3 * 5; 20 = 2^2 * 5. Tích các thừa số chung và riêng với số mũ lớn nhất cho ta BCNN(15, 20) = 60."
          },
          {
            "question": "Muốn quy đồng mẫu số của hai phân số có mẫu là 4 và 6, mẫu số chung nhỏ nhất nên chọn là bao nhiêu?",
            "options": [
              "12",
              "16",
              "24",
              "6"
            ],
            "correctIndex": 0,
            "explanation": "Mẫu số chung nhỏ nhất chính là BCNN(4, 6) = 12."
          },
          {
            "question": "Muốn quy đồng mẫu số của hai phân số có mẫu là 6 và 9, mẫu số chung nhỏ nhất nên chọn là bao nhiêu?",
            "options": [
              "9",
              "18",
              "54",
              "24"
            ],
            "correctIndex": 1,
            "explanation": "Mẫu số chung nhỏ nhất chính là BCNN(6, 9) = 18."
          },
          {
            "question": "Muốn quy đồng mẫu số của hai phân số có mẫu là 8 và 12, mẫu số chung nhỏ nhất nên chọn là bao nhiêu?",
            "options": [
              "96",
              "12",
              "32",
              "24"
            ],
            "correctIndex": 3,
            "explanation": "Mẫu số chung nhỏ nhất chính là BCNN(8, 12) = 24."
          },
          {
            "question": "Muốn quy đồng mẫu số của hai phân số có mẫu là 5 và 15, mẫu số chung nhỏ nhất nên chọn là bao nhiêu?",
            "options": [
              "17",
              "20",
              "75",
              "15"
            ],
            "correctIndex": 3,
            "explanation": "Mẫu số chung nhỏ nhất chính là BCNN(5, 15) = 15."
          },
          {
            "question": "Hai số 3 và 5 là hai số nguyên tố cùng nhau. Tìm BCNN(3, 5).",
            "options": [
              "16",
              "10",
              "18",
              "15"
            ],
            "correctIndex": 3,
            "explanation": "Vì 3 và 5 là hai số nguyên tố cùng nhau nên BCNN(3, 5) = 3 × 5 = 15."
          },
          {
            "question": "Hai số 7 và 9 là hai số nguyên tố cùng nhau. Tìm BCNN(7, 9).",
            "options": [
              "63",
              "54",
              "64",
              "70"
            ],
            "correctIndex": 0,
            "explanation": "Vì 7 và 9 là hai số nguyên tố cùng nhau nên BCNN(7, 9) = 7 × 9 = 63."
          },
          {
            "question": "Hai số 4 và 9 là hai số nguyên tố cùng nhau. Tìm BCNN(4, 9).",
            "options": [
              "36",
              "40",
              "37",
              "27"
            ],
            "correctIndex": 0,
            "explanation": "Vì 4 và 9 là hai số nguyên tố cùng nhau nên BCNN(4, 9) = 4 × 9 = 36."
          },
          {
            "question": "Hai số 5 và 11 là hai số nguyên tố cùng nhau. Tìm BCNN(5, 11).",
            "options": [
              "56",
              "60",
              "55",
              "44"
            ],
            "correctIndex": 2,
            "explanation": "Vì 5 và 11 là hai số nguyên tố cùng nhau nên BCNN(5, 11) = 5 × 11 = 55."
          },
          {
            "question": "BCNN của một số a với số 1 bằng bao nhiêu?",
            "options": [
              "1",
              "a",
              "0",
              "a + 1"
            ],
            "correctIndex": 1,
            "explanation": "Vì mọi số đều là bội của 1, nên bội chung nhỏ nhất của a và 1 chính là a."
          },
          {
            "question": "Với thừa số nguyên tố chung khi tính BCNN, ta chọn số mũ nào?",
            "options": [
              "Số mũ nhỏ nhất",
              "Số mũ lớn nhất",
              "Số mũ bằng 1",
              "Tổng các số mũ"
            ],
            "correctIndex": 1,
            "explanation": "Khi tính BCNN, với mỗi thừa số nguyên tố (chung hoặc riêng), ta chọn số mũ lớn nhất của thừa số đó."
          },
          {
            "question": "So với ƯCLN(a, b), BCNN(a, b) có đặc điểm gì?",
            "options": [
              "BCNN luôn nhỏ hơn ƯCLN",
              "BCNN luôn lớn hơn hoặc bằng ƯCLN",
              "BCNN luôn bằng ƯCLN",
              "Không có mối liên hệ nào"
            ],
            "correctIndex": 1,
            "explanation": "Vì ƯCLN là ước chung (thường nhỏ) còn BCNN là bội chung (thường lớn), nên BCNN(a,b) luôn lớn hơn hoặc bằng ƯCLN(a,b)."
          },
          {
            "question": "Bội chung của hai hay nhiều số là gì?",
            "options": [
              "Số chia hết cho tất cả các số đó",
              "Số là ước của tất cả các số đó",
              "Số lớn nhất trong các số đó",
              "Số nhỏ nhất trong các số đó"
            ],
            "correctIndex": 0,
            "explanation": "Bội chung của hai hay nhiều số là số chia hết cho tất cả các số đó, tức là bội của tất cả các số đó."
          }
        ]
      },
      {
        id: "m6-13",
        title: "Bài 13: Tập hợp các số nguyên",
        summary: "Làm quen số nguyên âm, tập hợp số nguyên Z, trục số và quy tắc so sánh các số nguyên.",
        theory: `### 1. Số nguyên âm và sự cần thiết
- Trong thực tế, để biểu diễn nhiệt độ dưới $0^{\\circ}\\mathrm{C}$, độ sâu dưới mực nước biển, hoặc số tiền nợ, ta dùng **số nguyên âm** (ví dụ $-3, -50, -100$).
- Số nguyên âm được viết bằng cách thêm dấu trừ "$-$" trước số tự nhiên khác 0.

### 2. Tập hợp số nguyên $\\mathbb{Z}$
Tập hợp gồm các số nguyên âm, số 0 và các số nguyên dương được gọi là tập hợp các số nguyên, kí hiệu là $\\mathbb{Z}$:
$$\\mathbb{Z} = \\{\\dots; -3; -2; -1; 0; 1; 2; 3; \\dots\\}$$

### 3. Trục số nguyên
- Số nguyên được biểu diễn trên một đường thẳng có hướng gọi là **trục số**.
- Điểm $0$ được gọi là điểm gốc. Chiều từ trái sang phải là chiều dương (chiều mũi tên), chiều từ phải sang trái là chiều âm.
- Hai số nguyên nằm ở hai phía của điểm 0 và cách đều điểm 0 gọi là **hai số đối** của nhau. Ví dụ: $-3$ và $3$ là hai số đối.

### 4. So sánh hai số nguyên
- Trên trục số nằm ngang, điểm biểu diễn số nhỏ hơn nằm ở bên trái điểm biểu diễn số lớn hơn.
- Mọi số nguyên âm đều nhỏ hơn số 0 và nhỏ hơn mọi số nguyên dương.
- Với hai số nguyên âm, số nào có số đối lớn hơn thì số đó nhỏ hơn (ví dụ: $-5 < -3$ vì số đối $5 > 3$).`,
        questions: [
          {
            question: "Sắp xếp các số nguyên sau theo thứ tự tăng dần: -8; 5; 0; -3; 2.",
            options: [
              "-8; -3; 0; 2; 5",
              "-3; -8; 0; 2; 5",
              "5; 2; 0; -3; -8",
              "-8; -3; 0; 5; 2"
            ],
            correctIndex: 0,
            explanation: "Số nguyên âm càng xa điểm 0 càng nhỏ, do đó -8 < -3. Tiếp theo là số 0, sau đó là các số nguyên dương 2, 5. Vậy thứ tự tăng dần là: -8; -3; 0; 2; 5."
          },
          {
            question: "Tìm số đối của số nguyên -15.",
            options: [
              "-15",
              "15",
              "0",
              "1/15"
            ],
            correctIndex: 1,
            explanation: "Hai số đối nhau nằm đối xứng nhau qua điểm gốc 0 trên trục số. Số đối của số âm -15 là số dương 15."
          },
          {
            "question": "Sắp xếp các số nguyên sau theo thứ tự tăng dần: -5, 3, -1, 0, 4.",
            "options": [
              "0; -1; 3; 4; -5",
              "-5; -1; 0; 3; 4",
              "4; 3; 0; -1; -5",
              "-1; -5; 0; 3; 4"
            ],
            "correctIndex": 1,
            "explanation": "So sánh các số nguyên trên trục số (số âm càng xa 0 càng nhỏ, số dương càng xa 0 càng lớn), ta được thứ tự tăng dần: -5; -1; 0; 3; 4."
          },
          {
            "question": "Sắp xếp các số nguyên sau theo thứ tự tăng dần: -9, -2, 6, -6, 1.",
            "options": [
              "-9; -6; -2; 1; 6",
              "-6; -9; -2; 1; 6",
              "6; 1; -2; -6; -9",
              "1; -2; 6; -6; -9"
            ],
            "correctIndex": 0,
            "explanation": "So sánh các số nguyên trên trục số (số âm càng xa 0 càng nhỏ, số dương càng xa 0 càng lớn), ta được thứ tự tăng dần: -9; -6; -2; 1; 6."
          },
          {
            "question": "Sắp xếp các số nguyên sau theo thứ tự tăng dần: 7, -7, 0, -3, 3.",
            "options": [
              "0; -3; 3; 7; -7",
              "-3; -7; 0; 3; 7",
              "-7; -3; 0; 3; 7",
              "7; 3; 0; -3; -7"
            ],
            "correctIndex": 2,
            "explanation": "So sánh các số nguyên trên trục số (số âm càng xa 0 càng nhỏ, số dương càng xa 0 càng lớn), ta được thứ tự tăng dần: -7; -3; 0; 3; 7."
          },
          {
            "question": "Sắp xếp các số nguyên sau theo thứ tự tăng dần: -12, 5, -1, -8, 2.",
            "options": [
              "-1; 2; 5; -8; -12",
              "-12; -8; -1; 2; 5",
              "5; 2; -1; -8; -12",
              "-8; -12; -1; 2; 5"
            ],
            "correctIndex": 1,
            "explanation": "So sánh các số nguyên trên trục số (số âm càng xa 0 càng nhỏ, số dương càng xa 0 càng lớn), ta được thứ tự tăng dần: -12; -8; -1; 2; 5."
          },
          {
            "question": "Số đối của số nguyên 23 là số nào?",
            "options": [
              "23",
              "-22",
              "-24",
              "-23"
            ],
            "correctIndex": 3,
            "explanation": "Số đối của 23 là số nằm đối xứng với 23 qua điểm 0 trên trục số, tức là -23."
          },
          {
            "question": "Số đối của số nguyên -17 là số nào?",
            "options": [
              "16",
              "-17",
              "18",
              "17"
            ],
            "correctIndex": 3,
            "explanation": "Số đối của -17 là số nằm đối xứng với -17 qua điểm 0 trên trục số, tức là 17."
          },
          {
            "question": "Số đối của số nguyên 40 là số nào?",
            "options": [
              "-40",
              "40",
              "-41",
              "-39"
            ],
            "correctIndex": 0,
            "explanation": "Số đối của 40 là số nằm đối xứng với 40 qua điểm 0 trên trục số, tức là -40."
          },
          {
            "question": "Số đối của số nguyên -8 là số nào?",
            "options": [
              "7",
              "8",
              "-8",
              "9"
            ],
            "correctIndex": 1,
            "explanation": "Số đối của -8 là số nằm đối xứng với -8 qua điểm 0 trên trục số, tức là 8."
          },
          {
            "question": "Số đối của số nguyên 100 là số nào?",
            "options": [
              "100",
              "-100",
              "-99",
              "-101"
            ],
            "correctIndex": 1,
            "explanation": "Số đối của 100 là số nằm đối xứng với 100 qua điểm 0 trên trục số, tức là -100."
          },
          {
            "question": "Số đối của số nguyên -1 là số nào?",
            "options": [
              "0",
              "2",
              "-1",
              "1"
            ],
            "correctIndex": 3,
            "explanation": "Số đối của -1 là số nằm đối xứng với -1 qua điểm 0 trên trục số, tức là 1."
          },
          {
            "question": "So sánh hai số nguyên -8 và -3.",
            "options": [
              "-8 = -3",
              "Không thể so sánh -8 và -3",
              "-8 > -3",
              "-8 < -3"
            ],
            "correctIndex": 3,
            "explanation": "So sánh trên trục số ta có -8 < -3."
          },
          {
            "question": "So sánh hai số nguyên -15 và -15.",
            "options": [
              "-15 < -15",
              "-15 > -15",
              "Không thể so sánh -15 và -15",
              "-15 = -15"
            ],
            "correctIndex": 3,
            "explanation": "So sánh trên trục số ta có -15 = -15."
          },
          {
            "question": "So sánh hai số nguyên 6 và -6.",
            "options": [
              "Không thể so sánh 6 và -6",
              "6 < -6",
              "6 = -6",
              "6 > -6"
            ],
            "correctIndex": 3,
            "explanation": "So sánh trên trục số ta có 6 > -6."
          },
          {
            "question": "So sánh hai số nguyên -1 và 0.",
            "options": [
              "-1 = 0",
              "-1 < 0",
              "Không thể so sánh -1 và 0",
              "-1 > 0"
            ],
            "correctIndex": 1,
            "explanation": "So sánh trên trục số ta có -1 < 0."
          },
          {
            "question": "So sánh hai số nguyên -20 và -19.",
            "options": [
              "-20 > -19",
              "Không thể so sánh -20 và -19",
              "-20 < -19",
              "-20 = -19"
            ],
            "correctIndex": 2,
            "explanation": "So sánh trên trục số ta có -20 < -19."
          },
          {
            "question": "Tập hợp số nguyên Z bao gồm những thành phần nào?",
            "options": [
              "Chỉ gồm số nguyên dương",
              "Số nguyên âm, số 0 và số nguyên dương",
              "Chỉ gồm số nguyên âm và số 0",
              "Chỉ gồm số tự nhiên"
            ],
            "correctIndex": 1,
            "explanation": "Tập hợp số nguyên Z = {...; -3; -2; -1; 0; 1; 2; 3; ...} gồm các số nguyên âm, số 0 và các số nguyên dương."
          },
          {
            "question": "Mọi số nguyên âm so với số 0 và số nguyên dương như thế nào?",
            "options": [
              "Luôn lớn hơn số 0 và mọi số nguyên dương",
              "Luôn nhỏ hơn số 0 và mọi số nguyên dương",
              "Có thể lớn hơn hoặc nhỏ hơn tùy trường hợp",
              "Luôn bằng số 0"
            ],
            "correctIndex": 1,
            "explanation": "Theo quy tắc so sánh số nguyên, mọi số nguyên âm đều nhỏ hơn số 0 và nhỏ hơn mọi số nguyên dương."
          },
          {
            "question": "Với hai số nguyên âm, số nào có số đối lớn hơn thì số đó như thế nào?",
            "options": [
              "Lớn hơn",
              "Nhỏ hơn",
              "Bằng nhau",
              "Không so sánh được"
            ],
            "correctIndex": 1,
            "explanation": "Với hai số nguyên âm, số nào có số đối lớn hơn thì số đó nhỏ hơn. Ví dụ -5 < -3 vì số đối của -5 là 5 lớn hơn số đối của -3 là 3."
          }
        ]
      },
      {
        id: "m6-14",
        title: "Bài 14: Phép cộng, trừ số nguyên và Quy tắc dấu ngoặc",
        summary: "Cộng hai số nguyên cùng dấu, khác dấu. Phép trừ số nguyên và cách bỏ ngoặc có dấu cộng hoặc trừ phía trước.",
        theory: `### 1. Phép cộng hai số nguyên
- **Cộng hai số nguyên cùng dấu**:
  - *Cùng dương*: Thực hiện giống cộng hai số tự nhiên.
  - *Cùng âm*: Cộng hai số đối của chúng rồi thêm dấu trừ "$-$" đằng trước kết quả. Ví dụ: $(-3) + (-5) = -(3 + 5) = -8$.
- **Cộng hai số nguyên khác dấu**:
  - Nếu hai số đối nhau thì tổng bằng 0: $a + (-a) = 0$.
  - Nếu không đối nhau: Lấy số đối lớn hơn trừ số đối nhỏ hơn, rồi đặt trước kết quả dấu của số có số đối lớn hơn.
  - *Ví dụ:* $(-8) + 5 = -(8 - 5) = -3$; $12 + (-4) = +(12 - 4) = 8$.

### 2. Phép trừ hai số nguyên
Muốn trừ số nguyên $a$ cho số nguyên $b$, ta cộng $a$ với số đối của $b$:
$$a - b = a + (-b)$$
- *Ví dụ:* $3 - 8 = 3 + (-8) = -5$; $5 - (-2) = 5 + 2 = 7$.

### 3. Quy tắc dấu ngoặc
Khi bỏ dấu ngoặc trong một biểu thức:
- Nếu đằng trước dấu ngoặc có **dấu cộng "+""**, ta **giữ nguyên dấu** của tất cả các số hạng trong ngoặc.
  $$a + (b - c + d) = a + b - c + d$$
- Nếu đằng trước dấu ngoặc có **dấu trừ "-"**, ta phải **đổi dấu** của tất cả các số hạng trong ngoặc (dấu $+$ thành $-$, dấu $-$ thành $+$).
  $$a - (b - c + d) = a - b + c - d$$`,
        questions: [
          {
            question: "Tính kết quả phép tính: (-12) - (-15)",
            options: [
              "-27",
              "3",
              "-3",
              "27"
            ],
            correctIndex: 1,
            explanation: "Áp dụng quy tắc trừ số nguyên: (-12) - (-15) = (-12) + 15 = 15 - 12 = 3."
          },
          {
            question: "Hãy rút gọn biểu thức: A = 794 - (136 - 206) bằng cách phá ngoặc.",
            options: [
              "794 - 136 - 206",
              "794 - 136 + 206",
              "794 + 136 - 206",
              "794 + 136 + 206"
            ],
            correctIndex: 1,
            explanation: "Vì đằng trước ngoặc có dấu trừ '-', khi bỏ ngoặc ta phải đổi dấu các số hạng bên trong: 136 (mang dấu + ngầm định) đổi thành -136, -206 đổi thành +206. Vậy A = 794 - 136 + 206."
          },
          {
            "question": "Tính: (-7) + (-9)",
            "options": [
              "85",
              "-14",
              "16",
              "-16"
            ],
            "correctIndex": 3,
            "explanation": "Thực hiện phép cộng hai số nguyên: (-7) + (-9) = -16."
          },
          {
            "question": "Tính: (15) + (-8)",
            "options": [
              "-7",
              "7",
              "23",
              "9"
            ],
            "correctIndex": 1,
            "explanation": "Thực hiện phép cộng hai số nguyên: (15) + (-8) = 7."
          },
          {
            "question": "Tính: (-23) + (14)",
            "options": [
              "9",
              "-9",
              "-7",
              "37"
            ],
            "correctIndex": 1,
            "explanation": "Thực hiện phép cộng hai số nguyên: (-23) + (14) = -9."
          },
          {
            "question": "Tính: (-6) + (-11)",
            "options": [
              "-17",
              "-15",
              "17",
              "84"
            ],
            "correctIndex": 0,
            "explanation": "Thực hiện phép cộng hai số nguyên: (-6) + (-11) = -17."
          },
          {
            "question": "Tính: (30) + (-45)",
            "options": [
              "-13",
              "75",
              "-15",
              "15"
            ],
            "correctIndex": 2,
            "explanation": "Thực hiện phép cộng hai số nguyên: (30) + (-45) = -15."
          },
          {
            "question": "Tính: (-18) + (25)",
            "options": [
              "-7",
              "43",
              "9",
              "7"
            ],
            "correctIndex": 3,
            "explanation": "Thực hiện phép cộng hai số nguyên: (-18) + (25) = 7."
          },
          {
            "question": "Tính: 8 - (-5)",
            "options": [
              "-13",
              "15",
              "13",
              "3"
            ],
            "correctIndex": 2,
            "explanation": "Muốn trừ đi một số nguyên, ta cộng với số đối của nó: 8 - (-5) = 8 + (5) = 13."
          },
          {
            "question": "Tính: -14 - (6)",
            "options": [
              "-20",
              "-8",
              "-18",
              "20"
            ],
            "correctIndex": 0,
            "explanation": "Muốn trừ đi một số nguyên, ta cộng với số đối của nó: -14 - (6) = -14 + (-6) = -20."
          },
          {
            "question": "Tính: 20 - (-13)",
            "options": [
              "7",
              "35",
              "33",
              "-33"
            ],
            "correctIndex": 2,
            "explanation": "Muốn trừ đi một số nguyên, ta cộng với số đối của nó: 20 - (-13) = 20 + (13) = 33."
          },
          {
            "question": "Tính: -9 - (-9)",
            "options": [
              "2",
              "-18",
              "4",
              "0"
            ],
            "correctIndex": 3,
            "explanation": "Muốn trừ đi một số nguyên, ta cộng với số đối của nó: -9 - (-9) = -9 + (9) = 0."
          },
          {
            "question": "Tính: -3 - (17)",
            "options": [
              "14",
              "20",
              "-18",
              "-20"
            ],
            "correctIndex": 3,
            "explanation": "Muốn trừ đi một số nguyên, ta cộng với số đối của nó: -3 - (17) = -3 + (-17) = -20."
          },
          {
            "question": "Phá ngoặc biểu thức: a - (b - c + d)",
            "options": [
              "a - b + c - d",
              "a + b - c + d",
              "a - b + c + d",
              "a - b - c + d"
            ],
            "correctIndex": 0,
            "explanation": "Vì đằng trước ngoặc có dấu '-', ta đổi dấu tất cả các số hạng trong ngoặc. Kết quả: a - b + c - d."
          },
          {
            "question": "Phá ngoặc biểu thức: x + (y - z + t)",
            "options": [
              "x + y - z - t",
              "x + y + z + t",
              "x + y - z + t",
              "x - y + z - t"
            ],
            "correctIndex": 2,
            "explanation": "Vì đằng trước ngoặc có dấu '+', ta giữ nguyên dấu tất cả các số hạng trong ngoặc. Kết quả: x + y - z + t."
          },
          {
            "question": "Phá ngoặc biểu thức: m - (n + p - q)",
            "options": [
              "m + n + p - q",
              "m - n + p - q",
              "m - n - p - q",
              "m - n - p + q"
            ],
            "correctIndex": 3,
            "explanation": "Vì đằng trước ngoặc có dấu '-', ta đổi dấu tất cả các số hạng trong ngoặc. Kết quả: m - n - p + q."
          },
          {
            "question": "Phá ngoặc biểu thức: k + (h - g - f)",
            "options": [
              "k - h + g + f",
              "k + h + g - f",
              "k + h - g - f",
              "k + h - g + f"
            ],
            "correctIndex": 2,
            "explanation": "Vì đằng trước ngoặc có dấu '+', ta giữ nguyên dấu tất cả các số hạng trong ngoặc. Kết quả: k + h - g - f."
          },
          {
            "question": "Kết quả của phép tính (-25) + 25 là bao nhiêu?",
            "options": [
              "50",
              "0",
              "-50",
              "25"
            ],
            "correctIndex": 1,
            "explanation": "Hai số -25 và 25 là hai số đối nhau, tổng của hai số đối luôn bằng 0."
          },
          {
            "question": "Muốn trừ số nguyên a cho số nguyên b, ta thực hiện phép tính nào?",
            "options": [
              "a - b = a + b",
              "a - b = a + (-b)",
              "a - b = (-a) + b",
              "a - b = (-a) + (-b)"
            ],
            "correctIndex": 1,
            "explanation": "Quy tắc trừ số nguyên: muốn trừ a cho b, ta cộng a với số đối của b, tức a - b = a + (-b)."
          },
          {
            "question": "Khi đằng trước dấu ngoặc là dấu cộng '+', ta xử lý các số hạng trong ngoặc như thế nào khi bỏ ngoặc?",
            "options": [
              "Đổi dấu tất cả các số hạng",
              "Giữ nguyên dấu tất cả các số hạng",
              "Chỉ đổi dấu số hạng đầu tiên",
              "Chỉ đổi dấu số hạng cuối cùng"
            ],
            "correctIndex": 1,
            "explanation": "Nếu đằng trước ngoặc có dấu cộng, ta giữ nguyên dấu của tất cả các số hạng trong ngoặc khi bỏ ngoặc."
          }
        ]
      }
    ],
    "Tiếng Anh": [
      {
        id: "e6-1",
        title: "Unit 1: My New School",
        summary: "Learn basic vocabulary about school items, present simple tense, and expressions for greeting friends.",
        theory: `### 1. Vocabulary: School Items & Activities
- **calculator**: máy tính bỏ túi
- **compass**: cái la bàn / com-pa
- **heavy schoolbag**: cặp sách nặng
- **uniform**: đồng phục học sinh
- **play chess**: chơi cờ vua
- **do homework**: làm bài tập về nhà

### 2. Grammar: The Present Simple Tense (Thì Hiện tại đơn)
- **Usage**: Diễn tả một sự thật hiển nhiên, một thói quen hoặc hành động lặp đi lặp lại hàng ngày.
- **Form**:
  - *Affirmative*: 
    - I / You / We / They + V-inf
    - He / She / It + V(s/es)
  - *Negative*:
    - I / You / We / They + don't + V-inf
    - He / She / It + doesn't + V-inf
  - *Question*:
    - Do + I/you/we/they + V-inf?
    - Does + he/she/it + V-inf?`,
        questions: [
          {
            question: "Choose the correct answer: Vy ___ to school everyday with her best friend.",
            options: [
              "go",
              "goes",
              "going",
              "is go"
            ],
            correctIndex: 1,
            explanation: "Chủ ngữ 'Vy' là ngôi thứ ba số ít (She), nên động từ 'go' thêm đuôi 'es' thành 'goes' ở thì Hiện tại đơn."
          },
          {
            question: "Which tool is used to draw a perfect circle?",
            options: [
              "calculator",
              "ruler",
              "compass",
              "pencil sharpener"
            ],
            correctIndex: 2,
            explanation: "'compass' có nghĩa là cái com-pa, dụng cụ dùng để vẽ hình tròn hoàn hảo."
          }
        ]
      }
    ],
    "Văn": [
      {
        id: "l6-1",
        title: "Bài 1: Truyền thuyết và Truyện cổ tích Việt Nam",
        summary: "Phân biệt thể loại truyền thuyết và cổ tích thông qua các tác phẩm nổi bật: Thánh Gióng, Thạch Sanh.",
        theory: `### 1. Khái niệm Truyền thuyết
- Là thể loại truyện dân gian kể về các nhân vật và sự kiện có liên quan đến lịch sử thời quá khứ.
- Thường có yếu tố kì ảo, hoang đường thể hiện thái độ và cách đánh giá của nhân dân đối với các sự kiện, nhân vật lịch sử.
- *Ví dụ:* Thánh Gióng, Sơn Tinh Thủy Tinh, Sự tích Hồ Gươm.

### 2. Khái niệm Truyện cổ tích
- Là loại truyện dân gian kể về cuộc đời của một số kiểu nhân vật quen thuộc: nhân vật mồ côi, nhân vật có tài năng kì lạ, nhân vật thông minh/ngốc nghếch...
- Mang tính chất hư cấu, thể hiện ước mơ về công lí, cái thiện chiến thắng cái ác của nhân dân lao động.
- *Ví dụ:* Thạch Sanh, Tấm Cám, Cây tre trăm đốt.

### 3. Ý nghĩa cốt lõi của hình tượng Thánh Gióng
- Ca ngợi tinh thần yêu nước chống giặc ngoại xâm của nhân dân ta từ thời cổ đại.
- Thể hiện sức mạnh đoàn kết toàn dân (cả làng góp gạo nuôi Gióng).`,
        questions: [
          {
            question: "Điểm khác biệt cốt lõi nhất giữa Truyền thuyết và Truyện cổ tích là gì?",
            options: [
              "Truyền thuyết có yếu tố lịch sử thực tế, còn cổ tích thuần hư cấu ước mơ",
              "Cổ tích dài hơn truyền thuyết",
              "Truyền thuyết không có nhân vật thần kì",
              "Cổ tích kể về vua chúa nhiều hơn"
            ],
            correctIndex: 0,
            explanation: "Truyền thuyết luôn bám vào một sự kiện hoặc nhân vật lịch sử để phản ánh thái độ của nhân dân, trong khi cổ tích tập trung vào số phận cá nhân và ước mơ công lí xã hội."
          },
          {
            question: "Chi tiết 'Cả làng góp gạo nuôi Gióng' trong truyện Thánh Gióng thể hiện điều gì?",
            options: [
              "Nhà Gióng quá nghèo không đủ ăn",
              "Sức mạnh đoàn kết và sự đồng lòng của toàn dân tộc chống ngoại xâm",
              "Gióng rất háu ăn",
              "Sự giàu có của bà con nông dân thời bấy giờ"
            ],
            correctIndex: 1,
            explanation: "Chi tiết này thể hiện Gióng là người con của nhân dân, được nuôi dưỡng bằng tình yêu thương và sự đồng lòng đoàn kết của toàn bộ làng quê đất nước."
          }
        ]
      }
    ],
    "KHTN": [
      {
        id: "s6-1",
        title: "Bài 1: Giới thiệu về Khoa học tự nhiên",
        summary: "Hiểu vai trò của KHTN trong cuộc sống và học cách sử dụng các dụng cụ đo lường thể tích, khối lượng, nhiệt độ cơ bản.",
        theory: `### 1. Định nghĩa Khoa học tự nhiên (KHTN)
- KHTN là ngành khoa học nghiên cứu về các sự vật, hiện tượng của thế giới tự nhiên, các ảnh hưởng của chúng đến đời sống con người và môi trường.
- Các lĩnh vực chính: Vật lí học, Hóa học, Sinh học, Khoa học Trái Đất và Thiên văn học.

### 2. Vai trò của KHTN trong cuộc sống
- Cung cấp thông tin khoa học, nâng cao hiểu biết của con người.
- Ứng dụng công nghệ vào sản xuất, nông nghiệp, y học.
- Bảo vệ môi trường và phát triển bền vững.

### 3. Quy tắc an toàn trong phòng thực hành
- Luôn nghe theo hướng dẫn của giáo viên.
- Không tự ý ăn, uống, nếm thử các hóa chất.
- Biết vị trí của các thiết bị dập lửa, sơ cứu.
- Sử dụng kính bảo hộ và găng tay khi làm thí nghiệm hóa học nguy hiểm.`,
        questions: [
          {
            question: "Lĩnh vực nào dưới đây nghiên cứu về cấu tạo chất và sự biến đổi của chúng?",
            options: [
              "Sinh học",
              "Hóa học",
              "Vật lí học",
              "Thiên văn học"
            ],
            correctIndex: 1,
            explanation: "Hóa học là ngành nghiên cứu về các chất, cấu tạo, tính chất của chúng và sự biến đổi hóa học tạo ra chất mới."
          },
          {
            question: "Hành động nào sau đây là KHÔNG an toàn khi làm việc trong phòng thực hành?",
            options: [
              "Đọc kĩ nhãn hóa chất trước khi dùng",
              "Nếm thử vị của dung dịch lạ xem đó là chất gì",
              "Mặc áo choàng bảo hộ và đeo găng tay",
              "Rửa tay sạch bằng xà phòng sau khi thực hành"
            ],
            correctIndex: 1,
            explanation: "Nếm hoặc ngửi trực tiếp các hóa chất lạ vô cùng nguy hiểm vì chúng có thể chứa độc tố cực mạnh gây hại nghiêm trọng cho cơ thể."
          }
        ]
      }
    ]
  },
  "Lớp 7": {
    "Toán": [
      {
        id: "m7-1",
        title: "Bài 1: Tập hợp các số hữu tỉ",
        summary: "Làm quen với tập hợp số hữu tỉ Q, biểu diễn số hữu tỉ trên trục số và các phép tính cộng, trừ, nhân, chia số hữu tỉ.",
        theory: `### 1. Khái niệm Số hữu tỉ
- Số hữu tỉ là số viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}, b \\neq 0$.
- Tập hợp các số hữu tỉ được kí hiệu là $\\mathbb{Q}$.
- Mọi số nguyên, số thập phân, số phần trăm đều có thể chuyển về phân số, nên chúng đều thuộc tập hợp $\\mathbb{Q}$.
  *Ví dụ:* $-3 = \\frac{-3}{1}$; $0.25 = \\frac{1}{4}$; $1 \\frac{1}{2} = \\frac{3}{2}$.

### 2. Biểu diễn số hữu tỉ trên trục số
- Điểm biểu diễn số hữu tỉ $x$ trên trục số được gọi là điểm $x$.
- Số hữu tỉ dương nằm bên phải điểm 0; số hữu tỉ âm nằm bên trái điểm 0.

### 3. So sánh hai số hữu tỉ
- Với hai số hữu tỉ $x, y$ bất kì, ta luôn có: hoặc $x < y$, hoặc $x > y$, hoặc $x = y$.
- Ta có thể so sánh bằng cách đưa về hai phân số cùng mẫu số dương rồi so sánh tử số.`,
        questions: [
          {
            question: "Số nào dưới đây KHÔNG phải là số hữu tỉ?",
            options: [
              "-5",
              "1.25",
              "Phép chia cho 0 (ví dụ 3/0)",
              "3/4"
            ],
            correctIndex: 2,
            explanation: "Số hữu tỉ viết được dưới dạng phân số a/b với b phải khác 0. Do đó 3/0 không xác định và không phải số hữu tỉ."
          },
          {
            question: "Phát biểu nào sau đây đúng về tập hợp số?",
            options: [
              "Mọi số hữu tỉ đều là số tự nhiên",
              "Tập hợp số hữu tỉ Q chứa tập hợp số nguyên Z",
              "Số 0 không phải là số hữu tỉ",
              "Các số âm không thể là số hữu tỉ"
            ],
            correctIndex: 1,
            explanation: "Vì mọi số nguyên z ∈ Z đều có thể viết dưới dạng z/1 nên Z là tập con của Q. Hay tập hợp Q chứa tập hợp số nguyên Z."
          }
        ]
      }
    ],
    "Tiếng Anh": [
      {
        id: "e7-1",
        title: "Unit 1: Hobbies",
        summary: "Describe popular indoor and outdoor hobbies, using verbs of liking with gerunds (V-ing).",
        theory: `### 1. Vocabulary: Hobbies
- **gardening**: làm vườn
- **carving eggshells**: chạm khắc vỏ trứng
- **making models**: lắp ráp mô hình
- **collecting teddy bears**: sưu tầm gấu bông
- **taking photos**: chụp ảnh

### 2. Grammar: Verbs of Liking + V-ing
After verbs expressing like or dislike, we usually use a gerund (V-ing) to talk about interest.
- **Verbs of liking**: *like, love, enjoy, prefer, fancy*
- **Verbs of disliking**: *hate, dislike, detest*
- *Example*: 
  - I love **gardening** because it is peaceful.
  - She detests **playing** computer games in her free time.`,
        questions: [
          {
            question: "Complete the sentence: My sister fancies ___ dolls from other countries.",
            options: [
              "collect",
              "collects",
              "collecting",
              "collected"
            ],
            correctIndex: 2,
            explanation: "Sau động từ chỉ mức độ yêu thích 'fancy', ta sử dụng động từ ở dạng danh động từ thêm 'ing' (collecting)."
          },
          {
            question: "What is 'carving eggshells' in Vietnamese?",
            options: [
              "Thêu tranh chữ thập",
              "Chạm khắc vỏ trứng",
              "Làm mô hình đất sét",
              "Trồng cây ăn quả"
            ],
            correctIndex: 1,
            explanation: "'carving eggshells' dịch chính xác là chạm khắc vỏ trứng."
          }
        ]
      }
    ],
    "Văn": [
      {
        id: "l7-1",
        title: "Bài 1: Thơ bốn chữ và năm chữ",
        summary: "Phân tích đặc điểm vần, nhịp và nhạc điệu của thơ 4 chữ, 5 chữ thông qua tác phẩm Đồng dao mùa xuân.",
        theory: `### 1. Đặc điểm Thơ bốn chữ
- Mỗi dòng thơ có 4 tiếng (chữ).
- Cách gieo vần linh hoạt: vần chân (gieo cuối dòng), vần lưng (gieo giữa dòng), vần cách, vần liền.
- Thường ngắt nhịp: $2/2$ hoặc $3/1$.
- Phù hợp với thể loại đồng dao, vè, kể chuyện vui tươi hoặc tự sự mộc mạc.

### 2. Đặc điểm Thơ năm chữ
- Mỗi dòng thơ có 5 tiếng.
- Thường ngắt nhịp: $3/2$ hoặc $2/3$.
- Có khả năng diễn tả cảm xúc tinh tế, lắng đọng, trữ tình sâu sắc.

### 3. Phân tích tác phẩm 'Đồng dao mùa xuân' (Nguyễn Khoa Điềm)
- Tác phẩm viết về người lính trẻ hi sinh anh dũng nơi chiến trường Trường Sơn.
- Sự hi sinh của anh được miêu tả nhẹ nhàng như một giấc ngủ giữa đại ngàn xanh mướt, anh hóa thân vào dòng chảy xuân bất tận của đất nước.`,
        questions: [
          {
            question: "Nhịp thơ phổ biến nhất của thể thơ bốn chữ là nhịp nào?",
            options: [
              "Nhịp 1/3",
              "Nhịp 2/2",
              "Nhịp 4/0",
              "Nhịp 3/2"
            ],
            correctIndex: 1,
            explanation: "Thơ bốn chữ thường có nhịp cân đối, dễ đọc, nhịp phổ biến nhất là 2/2."
          },
          {
            question: "Ý nghĩa của hình tượng người lính trong bài thơ 'Đồng dao mùa xuân' là gì?",
            options: [
              "Ca ngợi sự giàu có của quân đội Việt Nam",
              "Khắc họa sự hi sinh thầm lặng, cao cả của tuổi trẻ và vẻ đẹp tâm hồn bất tử hòa vào thiên nhiên đất nước",
              "Kêu gọi mọi người cùng đi bộ trong rừng",
              "Kể về cuộc sống hái lượm của thanh niên xung phong"
            ],
            correctIndex: 1,
            explanation: "Bài thơ ca ngợi vẻ đẹp bất tử, tâm hồn trong sáng của người lính trẻ đã dâng hiến cả thanh xuân của mình để giữ gìn nền hòa bình, mùa xuân cho dân tộc."
          }
        ]
      }
    ],
    "KHTN": [
      {
        id: "s7-1",
        title: "Bài 1: Sơ lược về Bảng tuần hoàn các nguyên tố hóa học",
        summary: "Tìm hiểu cấu tạo nguyên tử, nguyên lí sắp xếp các nguyên tố hóa học trong bảng tuần hoàn Mendeleev.",
        theory: `### 1. Nguyên tắc sắp xếp các nguyên tố hóa học
Các nguyên tố trong Bảng tuần hoàn được sắp xếp theo:
- Chiều tăng dần của **điện tích hạt nhân** (số proton).
- Các nguyên tố có cùng số lớp electron được xếp vào cùng một **hàng** (Chu kì).
- Các nguyên tố có tính chất hóa học tương tự nhau được xếp vào cùng một **cột** (Nhóm).

### 2. Cấu tạo Bảng tuần hoàn
- **Ô nguyên tố**: Cho biết số hiệu nguyên tử (số hiệu proton), kí hiệu hóa học, tên nguyên tố và khối lượng nguyên tử.
- **Chu kì**: Là dãy các nguyên tố có cùng số lớp electron. Có 7 chu kì (đánh số từ 1 đến 7).
- **Nhóm**: Gồm các nguyên tố có tính chất hóa học tương tự nhau, có số electron hóa trị bằng nhau.`,
        questions: [
          {
            question: "Các nguyên tố hóa học trong bảng tuần hoàn được sắp xếp tăng dần theo tiêu chí nào?",
            options: [
              "Khối lượng cơ thể",
              "Điện tích hạt nhân (số proton)",
              "Thể tích chất lỏng",
              "Thời gian phát hiện ra nguyên tố"
            ],
            correctIndex: 1,
            explanation: "Bảng tuần hoàn hiện đại được sắp xếp theo chiều tăng dần của điện tích hạt nhân nguyên tử."
          },
          {
            question: "Ô nguyên tố hóa học KHÔNG cung cấp thông tin nào dưới đây?",
            options: [
              "Kí hiệu hóa học của nguyên tố",
              "Số hiệu nguyên tử (proton)",
              "Tên gọi và khối lượng nguyên tử",
              "Trạng thái đắt đỏ của nguyên tố trên thị trường"
            ],
            correctIndex: 3,
            explanation: "Ô nguyên tố chỉ cung cấp thông tin hóa lý căn bản của nguyên tố, không liên quan đến giá cả thị trường kinh tế."
          }
        ]
      }
    ]
  },
  "Lớp 8": {
    "Toán": [
      {
        id: "m8-1",
        title: "Bài 1: Đơn thức và Đa thức nhiều biến",
        summary: "Nhận biết đơn thức, đa thức thu gọn, bậc của đa thức và thực hiện phép cộng, trừ đa thức.",
        theory: `### 1. Đơn thức nhiều biến
- Đơn thức là biểu thức đại số chỉ gồm một số, hoặc một biến, hoặc một tích giữa các số và các biến.
- *Ví dụ:* $3x^2y$; $-5$; $xy^2z^3$; $\\frac{1}{2}x$.

### 2. Đa thức nhiều biến
- Đa thức là một tổng của những đơn thức. Mỗi đơn thức trong tổng gọi là một hạng tử của đa thức đó.
- *Ví dụ:* $P = 2x^2y - xy + 5$ là đa thức có 3 hạng tử.

### 3. Thu gọn đa thức
- Thu gọn đa thức là cộng các đơn thức đồng dạng với nhau trong đa thức đó để không còn hạng tử nào đồng dạng.
- **Bậc của đa thức**: Là bậc của hạng tử có bậc cao nhất trong dạng thu gọn của đa thức đó.`,
        questions: [
          {
            question: "Biểu thức nào dưới đây KHÔNG phải là đơn thức?",
            options: [
              "3x^2y",
              "2x + 3y",
              "-5",
              "x"
            ],
            correctIndex: 1,
            explanation: "2x + 3y là tổng của hai đơn thức, nên nó là một đa thức chứ không phải đơn thức."
          },
          {
            question: "Tìm bậc của đa thức Q = 5x^4y - 2x^2y^3 + 7 sau khi thu gọn.",
            options: [
              "4",
              "3",
              "5",
              "2"
            ],
            correctIndex: 2,
            explanation: "Hạng tử thứ nhất '5x^4y' có bậc là 4+1=5. Hạng tử thứ hai '-2x^2y^3' có bậc là 2+3=5. Do đó bậc cao nhất là 5, bậc của đa thức Q là 5."
          }
        ]
      }
    ],
    "Tiếng Anh": [
      {
        id: "e8-1",
        title: "Unit 1: Leisure Time",
        summary: "Talk about favorite leisure activities, using verbs of liking/disliking followed by both gerunds and to-infinitives.",
        theory: `### 1. Vocabulary: Leisure Activities
- **leisure activity**: hoạt động giải trí lúc rảnh rỗi
- **socialise with friends**: giao lưu, kết bạn với mọi người
- **surf the net**: lướt mạng internet
- **do DIY (Do It Yourself)**: tự làm đồ thủ công/đồ dùng sáng tạo
- **hang out with friends**: đi chơi, la cà cùng bạn bè

### 2. Grammar: Verbs of Liking followed by Gerund or To-infinitive
Some verbs can be followed by both **V-ing** or **To V-inf** with little or no difference in meaning:
- **Verbs**: *like, love, hate, prefer*
  - *Example*: I love **making** paper models. / I love **to make** paper models. (Both are correct)
- Note: *enjoy, fancy, dislike, detest, mind* are **ONLY** followed by **V-ing**.
  - *Example*: She fancies **surfing** the net. (NOT She fancies to surf the net).`,
        questions: [
          {
            question: "Choose the WRONG sentence grammatically:",
            options: [
              "She enjoys playing chess.",
              "He dislikes to wash the dishes.",
              "They love hanging out with friends.",
              "I prefer to read comic books."
            ],
            correctIndex: 1,
            explanation: "'dislike' bắt buộc phải đi kèm với V-ing. Do đó 'dislikes to wash' là sai, phải viết là 'dislikes washing'."
          },
          {
            question: "What does 'do DIY' stand for?",
            options: [
              "Do It Yourself",
              "Do It Yesterday",
              "Do Internet Yoga",
              "Direct International Youth"
            ],
            correctIndex: 0,
            explanation: "DIY viết tắt của 'Do It Yourself', tự tay thiết kế, chế tạo đồ vật không cần thợ chuyên nghiệp."
          }
        ]
      }
    ],
    "Văn": [
      {
        id: "l8-1",
        title: "Bài 1: Thơ Đường luật luật Đường và niêm luật",
        summary: "Nắm vững đặc điểm cấu trúc, niêm luật, vần, đối của thơ thất ngôn bát cú và thất ngôn tứ tuyệt Đường luật.",
        theory: `### 1. Thể thơ Thất ngôn bát cú Đường luật
- Cấu trúc gồm 8 câu, mỗi câu có đúng 7 chữ.
- **Bố cục 4 phần**:
  - *Đề* (Câu 1-2): Mở đề và giới thiệu vấn đề cảm hứng.
  - *Thực* (Câu 3-4): Triển khai miêu tả cảnh vật, sự việc cụ thể.
  - *Luận* (Câu 5-6): Bàn luận rộng hơn, nâng cao cảm xúc.
  - *Kết* (Câu 7-8): Đúc kết lại ý nghĩa toàn bài, tình cảm tác giả.
- **Niêm**: Nguyên tắc dính kết các câu thơ (câu 1 niêm với 8, 2 niêm với 3, 4 niêm với 5, 6 niêm với 7).
- **Phép đối**: Bắt buộc đối nhau ở phần Thực (câu 3-4) và phần Luận (câu 5-6).

### 2. Thể thơ Thất ngôn tứ tuyệt Đường luật
- Gồm 4 câu, mỗi câu có 7 chữ.
- Bố cục: Khai - Thừa - Chuyển - Hợp.
- Thể hiện cảm xúc dồn nén, ý tứ sâu xa, hàm súc.`,
        questions: [
          {
            question: "Bố cục của một bài thơ Thất ngôn bát cú Đường luật gồm những phần nào?",
            options: [
              "Khai - Thừa - Chuyển - Hợp",
              "Đề - Thực - Luận - Kết",
              "Mở bài - Thân bài - Kết luận",
              "Tự sự - Miêu tả - Biểu cảm"
            ],
            correctIndex: 1,
            explanation: "Thất ngôn bát cú Đường luật có bố cục chặt chẽ gồm 4 phần: Đề (câu 1-2), Thực (câu 3-4), Luận (câu 5-6) và Kết (câu 7-8)."
          },
          {
            question: "Trong thơ Thất ngôn bát cú Đường luật, các câu nào bắt buộc phải thực hiện phép đối?",
            options: [
              "Câu 1 đối câu 2, câu 7 đối câu 8",
              "Câu 3 đối câu 4, câu 5 đối câu 6",
              "Câu 2 đối câu 4, câu 6 đối câu 8",
              "Không bắt buộc phải đối ở bất kì câu nào"
            ],
            correctIndex: 1,
            explanation: "Cặp câu Thực (câu 3, 4) và cặp câu Luận (câu 5, 6) bắt buộc phải đối nhau cực kì nghiêm ngặt về cả thanh điệu lẫn từ loại."
          }
        ]
      }
    ],
    "KHTN": [
      {
        id: "s8-1",
        title: "Bài 1: Phản ứng hóa học và Định luật Bảo toàn khối lượng",
        summary: "Biết cách viết phương trình hóa học, xác định chất tham gia, sản phẩm và áp dụng định luật bảo toàn khối lượng để tính toán.",
        theory: `### 1. Phản ứng hóa học là gì?
- Là quá trình biến đổi chất này thành chất khác.
- Chất ban đầu bị biến đổi gọi là **chất phản ứng (hay chất tham gia)**.
- Chất mới sinh ra gọi là **chất sản phẩm**.
- Trong phản ứng hóa học, liên kết giữa các nguyên tử thay đổi làm phân tử này biến đổi thành phân tử khác, nhưng **số nguyên tử của mỗi nguyên tố được giữ nguyên**.

### 2. Định luật Bảo toàn khối lượng (Lomonosov - Lavoisier)
- Phát biểu: *"Trong một phản ứng hóa học, tổng khối lượng của các chất sản phẩm bằng tổng khối lượng của các chất tham gia phản ứng."*
- Công thức cho phản ứng $A + B \\rightarrow C + D$:
  $$m_A + m_B = m_C + m_D$$

### 3. Phương trình hóa học
- Biểu diễn ngắn gọn phản ứng hóa học bằng công thức hóa học của các chất kèm theo hệ số cân bằng thích hợp.`,
        questions: [
          {
            question: "Phát biểu nào sau đây đúng về định luật Bảo toàn khối lượng?",
            options: [
              "Khối lượng sản phẩm luôn lớn hơn khối lượng tham gia",
              "Khối lượng chất tham gia luôn biến mất hoàn toàn không dấu vết",
              "Tổng khối lượng của các chất tham gia bằng tổng khối lượng của các chất sản phẩm tạo thành",
              "Khối lượng các chất giảm dần theo nhiệt độ phòng thí nghiệm"
            ],
            correctIndex: 2,
            explanation: "Định luật bảo toàn khối lượng khẳng định vật chất không tự sinh ra hay mất đi, tổng khối lượng các chất tham gia luôn bằng tổng khối lượng sản phẩm."
          },
          {
            question: "Nung nóng đá vôi (CaCO3) thu được 5.6g vôi sống (CaO) và 4.4g khí carbonic (CO2). Khối lượng đá vôi đã phản ứng là:",
            options: [
              "1.2g",
              "10.0g",
              "24.8g",
              "5.6g"
            ],
            correctIndex: 1,
            explanation: "Áp dụng bảo toàn khối lượng: m(CaCO3) = m(CaO) + m(CO2) = 5.6 + 4.4 = 10.0g."
          }
        ]
      }
    ]
  },
  "Lớp 9": {
    "Toán": [
      {
        id: "m9-1",
        title: "Bài 1: Căn bậc hai và Căn bậc ba",
        summary: "Định nghĩa căn bậc hai số học, các phép biến đổi đơn giản căn thức bậc hai và hằng đẳng thức căn A^2 = |A|.",
        theory: `### 1. Căn bậc hai số học
- Với số thực $a \\ge 0$, số $\\sqrt{a}$ được gọi là căn bậc hai số học của $a$.
- Số 0 có căn bậc hai số học là chính nó: $\\sqrt{0} = 0$.
- Phép toán tìm căn bậc hai số học của số không âm gọi là phép khai phương.

### 2. Hằng đẳng thức $\\sqrt{A^2} = |A|$
Với mọi biểu thức $A$, ta luôn có:
$$\\sqrt{A^2} = |A|$$
- Nếu $A \\ge 0$ thì $\\sqrt{A^2} = A$.
- Nếu $A < 0$ thì $\\sqrt{A^2} = -A$.

### 3. Liên hệ giữa phép nhân, phép chia và phép khai phương
- Với hai số $a, b \\ge 0$: $\\sqrt{a \\cdot b} = \\sqrt{a} \\cdot \\sqrt{b}$.
- Với số $a \\ge 0$ và số $b > 0$: $\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}$.`,
        questions: [
          {
            question: "Giá trị rút gọn của biểu thức căn bậc hai của (-5)^2 là bao nhiêu?",
            options: [
              "-5",
              "5",
              "25",
              "-25"
            ],
            correctIndex: 1,
            explanation: "Áp dụng hằng đẳng thức: căn(A^2) = |A|. Do đó căn((-5)^2) = |-5| = 5."
          },
          {
            question: "Căn bậc hai số học của số 16 là bao nhiêu?",
            options: [
              "-4 và 4",
              "4",
              "256",
              "8"
            ],
            correctIndex: 1,
            explanation: "Căn bậc hai số học của một số không âm là một số không âm duy nhất. Căn bậc hai số học của 16 là 4 (vì 4^2 = 16 và 4 > 0). Số -4 là một căn bậc hai thường chứ không phải căn bậc hai số học."
          }
        ]
      }
    ],
    "Tiếng Anh": [
      {
        id: "e9-1",
        title: "Unit 1: Local Environment",
        summary: "Explore complex vocabulary about craft villages and learn double comparatives (the more..., the more...).",
        theory: `### 1. Vocabulary: Craft Villages & Tourism
- **artisan**: nghệ nhân làm đồ thủ công mỹ nghệ
- **handicraft**: sản phẩm thủ công
- **workshop**: xưởng sản xuất, workshop thực hành
- **preserve culture**: bảo tồn các giá trị bản sắc văn hóa
- **attraction**: địa điểm thu hút khách du lịch

### 2. Grammar: Double Comparatives (So sánh kép)
Used to show that two things change together (Càng... thì càng...).
- **Structure**:
  - **The + comparative + S + V, the + comparative + S + V**
  - *Example*:
    - **The more** you practice, **the better** your English will be. (Bạn càng luyện tập nhiều, tiếng Anh của bạn sẽ càng tốt).
    - **The cheaper** the tickets are, **the more** people will go. (Vé càng rẻ thì càng có nhiều người đi).`,
        questions: [
          {
            question: "Complete the sentence: The warmer the weather is, ___ I feel.",
            options: [
              "good",
              "the better",
              "better",
              "more better"
            ],
            correctIndex: 1,
            explanation: "Áp dụng cấu trúc so sánh kép: The + comparative, the + comparative. Do đó đáp án là 'the better'."
          },
          {
            question: "What is an 'artisan'?",
            options: [
              "A person who works in a hospital",
              "A skilled worker who makes things by hand (craftsman)",
              "A professional singer",
              "An engineer designing robots"
            ],
            correctIndex: 1,
            explanation: "'artisan' dùng để chỉ các nghệ nhân giàu kinh nghiệm, khéo léo tạo ra sản phẩm tinh xảo bằng tay."
          }
        ]
      }
    ],
    "Văn": [
      {
        id: "l9-1",
        title: "Bài 1: Tác phẩm Truyện Kiều và Đại thi hào Nguyễn Du",
        summary: "Phân tích giá trị nhân đạo, giá trị hiện thực xuất sắc và nghệ thuật miêu tả tả cảnh ngụ tình của Nguyễn Du.",
        theory: `### 1. Cuộc đời và sự nghiệp Đại thi hào Nguyễn Du (1765 - 1820)
- Sinh ra trong gia đình đại quý tộc có truyền thống văn học khoa bảng tại Thăng Long, quê gốc Hà Tĩnh.
- Sống trong thời đại bão táp lịch sử phong kiến suy tàn, khởi nghĩa Tây Sơn nổ ra. Đi nhiều, tiếp xúc nhiều mảnh đời bất hạnh, tích lũy vốn sống nhân đạo sâu sắc.

### 2. Tóm tắt cốt truyện 'Truyện Kiều' (Đoạn trường tân thanh)
- Tác phẩm gồm 3254 câu thơ lục bát tài hoa.
- Xoay quanh Thúy Kiều - người con gái tài sắc vẹn toàn, vì gia biến phải bán mình chuộc cha, chịu 15 năm lưu lạc truân chuyên trước khi đoàn tụ cùng Kim Trọng.

### 3. Nghệ thuật tả cảnh ngụ tình của Nguyễn Du
- Tả cảnh ngụ tình là mượn cảnh vật thiên nhiên để gián tiếp bộc lộ tâm trạng, cảm xúc bên trong của nhân vật. Cảnh vật nhuốm màu sắc tâm trạng con người.
- *Ví dụ:* *"Cảnh nào cảnh chẳng đeo sầu / Người buồn cảnh có vui đâu bao giờ."* hay trong đoạn trích Kiều ở lầu Ngưng Bích.`,
        questions: [
          {
            question: "Nghệ thuật 'Tả cảnh ngụ tình' nghĩa là gì?",
            options: [
              "Vẽ tranh phong cảnh cổ trang",
              "Mượn cảnh thiên nhiên bên ngoài để bộc lộ gián tiếp tâm sự, cảm xúc của nhân vật",
              "Kể lại chi tiết diễn biến câu chuyện tình yêu",
              "Bình luận về sự thay đổi của thời tiết khí hậu khí tượng"
            ],
            correctIndex: 1,
            explanation: "Tả cảnh ngụ tình là phương thức nghệ thuật lấy ngoại cảnh biểu hiện nội tâm, cảnh vật được lọc qua lăng kính tâm trạng nhân vật."
          },
          {
            question: "Truyện Kiều của Nguyễn Du được sáng tác bằng thể thơ dân tộc nào?",
            options: [
              "Thơ Đường luật thất ngôn bát cú",
              "Thơ bốn chữ",
              "Thơ lục bát",
              "Thơ song thất lục bát"
            ],
            correctIndex: 2,
            explanation: "Truyện Kiều được viết hoàn toàn bằng thể thơ lục bát truyền thống của Việt Nam cực kì uyển chuyển, giàu tính nhạc nhạc điệu."
          }
        ]
      }
    ],
    "KHTN": [
      {
        id: "s9-1",
        title: "Bài 1: Khái niệm về Dòng điện xoay chiều & Hiện tượng Cảm ứng điện từ",
        summary: "Tìm hiểu nguyên lý sinh ra dòng điện cảm ứng xoay chiều khi số đường sức từ xuyên qua tiết diện cuộn dây luân phiên biến thiên.",
        theory: `### 1. Hiện tượng cảm ứng điện từ là gì?
- Khi cho **nam châm quay trước cuộn dây dẫn kín** hoặc ngược lại, trong cuộn dây sẽ xuất hiện một dòng điện đặc biệt. Dòng điện đó được gọi là **dòng điện cảm ứng**.
- Hiện tượng xuất hiện dòng điện cảm ứng gọi là **hiện tượng cảm ứng điện từ**.

### 2. Khái niệm dòng điện xoay chiều (AC - Alternating Current)
- Dòng điện có **chiều luân phiên thay đổi liên tục tuần hoàn** theo thời gian được gọi là dòng điện xoay chiều.
- Dòng điện xoay chiều sinh ra do từ thông qua cuộn dây biến thiên tuần hoàn (số đường sức từ luân phiên tăng rồi giảm).

### 3. Cách tạo ra dòng điện xoay chiều trong thực tế
Có 2 cách phổ biến:
1. Cho nam châm quay tròn trước cuộn dây dẫn kín.
2. Cho cuộn dây dẫn kín quay tròn trong từ trường của nam châm.`,
        questions: [
          {
            question: "Dòng điện xoay chiều có đặc điểm cốt lõi nào dưới đây?",
            options: [
              "Chỉ chạy theo một chiều duy nhất không đổi",
              "Có chiều luân phiên thay đổi liên tục, tuần hoàn theo thời gian",
              "Cường độ dòng điện luôn bằng 0",
              "Chỉ sinh ra từ pin sạc dự phòng điện thoại"
            ],
            correctIndex: 1,
            explanation: "Dòng điện xoay chiều là dòng điện có chiều đổi liên tục luân phiên tuần hoàn, khác biệt với dòng điện một chiều (DC) chảy cố định."
          },
          {
            question: "Cách nào dưới đây giúp ta tạo ra được dòng điện cảm ứng xoay chiều?",
            options: [
              "Đặt một nam châm đứng yên hoàn toàn trước cuộn dây dẫn kín",
              "Cho nam châm hoặc cuộn dây dẫn quay tròn liên tục trong khoảng không",
              "Cắm cuộn dây trực tiếp vào cốc nước lọc tinh khiết",
              "Sử dụng dây cao su buộc chặt nam châm với cuộn dây sắt"
            ],
            correctIndex: 1,
            explanation: "Để xuất hiện dòng điện xoay chiều cảm ứng, số đường sức từ xuyên qua tiết diện cuộn dây phải liên tục luân phiên biến thiên, điều này xảy ra khi cho nam châm hoặc cuộn dây quay tròn."
          }
        ]
      }
    ]
  }
};
