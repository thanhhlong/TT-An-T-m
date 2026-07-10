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
        title: "Bài 1: Tập hợp các số tự nhiên",
        summary: "Hiểu khái niệm tập hợp, phần tử thuộc tập hợp và cách biểu diễn tập hợp số tự nhiên N, N*.",
        theory: `### 1. Khái niệm Tập hợp
- Tập hợp là một khái niệm cơ bản của toán học. Ví dụ: Tập hợp các học sinh trong lớp, tập hợp các ngón tay trên bàn tay.
- Các đối tượng trong tập hợp được gọi là **phần tử** của tập hợp đó.
- Kí hiệu: $a \\in A$ (phần tử $a$ thuộc tập hợp $A$) và $b \\notin A$ (phần tử $b$ không thuộc tập hợp $A$).

### 2. Cách viết một tập hợp
Có hai cách thường dùng để viết một tập hợp:
1. **Liệt kê các phần tử**: Viết các phần tử trong cặp ngoặc nhọn $\\{ \\}$, cách nhau bởi dấu chấm phẩy ";". Mỗi phần tử được viết một lần.
   *Ví dụ:* $A = \\{1; 2; 3; 4\\}$
2. **Chỉ ra tính chất đặc trưng**: Chỉ ra dấu hiệu nhận biết chung của các phần tử.
   *Ví dụ:* $A = \\{x \\in \\mathbb{N} \\mid x < 5\\}$

### 3. Tập hợp các số tự nhiên $\\mathbb{N}$ và $\\mathbb{N}^*$
- Tập hợp các số tự nhiên kí hiệu là $\\mathbb{N} = \\{0; 1; 2; 3; ...\\}$.
- Tập hợp các số tự nhiên khác 0 kí hiệu là $\\mathbb{N}^* = \\{1; 2; 3; 4; ...\\}$.`,
        questions: [
          {
            question: "Cho tập hợp A = {2; 4; 6; 8}. Phát biểu nào sau đây là ĐÚNG?",
            options: [
              "2 không thuộc A",
              "5 thuộc A",
              "8 thuộc A",
              "A chỉ có 3 phần tử"
            ],
            correctIndex: 2,
            explanation: "Tập hợp A chứa các số chẵn 2, 4, 6, 8. Do đó phần tử 8 thuộc tập hợp A, viết là 8 ∈ A."
          },
          {
            question: "Kí hiệu N* dùng để chỉ tập hợp nào?",
            options: [
              "Tập hợp các số tự nhiên gồm cả số 0",
              "Tập hợp các số tự nhiên khác 0",
              "Tập hợp các số nguyên âm",
              "Tập hợp các số thập phân"
            ],
            correctIndex: 1,
            explanation: "Kí hiệu N* chỉ tập hợp các số tự nhiên khác 0: N* = {1; 2; 3; 4; ...}."
          }
        ]
      },
      {
        id: "m6-2",
        title: "Bài 2: Phép tính lũy thừa với số mũ tự nhiên",
        summary: "Cách viết gọn phép nhân nhiều thừa số giống nhau và các công thức nhân, chia hai lũy thừa cùng cơ số.",
        theory: `### 1. Khái niệm lũy thừa
Lũy thừa bậc $n$ của một số tự nhiên $a$ là tích của $n$ thừa số bằng nhau, mỗi thừa số bằng $a$:
$$a^n = a \\cdot a \\cdot a \\dots a \\quad (n \\text{ thừa số } a, n \\in \\mathbb{N}^*)$$
- $a$: Gọi là **Cơ số**.
- $n$: Gọi là **Số mũ**.
- Quy ước: $a^1 = a$ và $a^0 = 1$ (với $a \\neq 0$).

### 2. Nhân hai lũy thừa cùng cơ số
Khi nhân hai lũy thừa cùng cơ số, ta **giữ nguyên cơ số** và **cộng các số mũ**:
$$a^m \\cdot a^n = a^{m+n}$$

### 3. Chia hai lũy thừa cùng cơ số
Khi chia hai lũy thừa cùng cơ số (khác 0), ta **giữ nguyên cơ số** và **trừ các số mũ**:
$$a^m : a^n = a^{m-n} \\quad (a \\neq 0, m \\ge n)$$`,
        questions: [
          {
            question: "Viết tích 3 * 3 * 3 * 3 dưới dạng lũy thừa ta được kết quả nào?",
            options: [
              "3 * 4",
              "4^3",
              "3^4",
              "12"
            ],
            correctIndex: 2,
            explanation: "Tích của 4 thừa số 3 bằng nhau được viết gọn dưới dạng lũy thừa là 3^4."
          },
          {
            question: "Kết quả của phép tính 2^3 * 2^4 là bao nhiêu?",
            options: [
              "2^12",
              "2^7",
              "4^7",
              "128"
            ],
            correctIndex: 1,
            explanation: "Áp dụng công thức nhân hai lũy thừa cùng cơ số: 2^3 * 2^4 = 2^(3+4) = 2^7. (2^7 = 128 cũng đúng về mặt giá trị, nhưng dạng lũy thừa chuẩn là 2^7)."
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
