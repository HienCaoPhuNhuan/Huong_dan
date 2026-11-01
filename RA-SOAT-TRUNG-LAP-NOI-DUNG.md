# Rà soát trùng lặp nội dung – Huong_dan (2026-11-02)

## Phạm vi đã đọc
Đã lấy nội dung của 21 tệp bài học trong curriculum.json, index.html và thu-vien-12-cong-cu.html, đối chiếu tiêu đề H1/H2, mục tiêu từng bài và vị trí thư viện mới. Đây là **rà soát cấu trúc và dấu hiệu chồng lấn nội dung**, không phải kiểm chứng trực quan tất cả tương tác trong trình duyệt.

## Đã xử lý
- `cong-nghe-do-hoa-web.html` và `thu-vien-12-cong-cu.html` cùng có 12 thẻ nguồn, mô tả, prompt. **Đã loại danh sách trùng trong bài lý thuyết**, giữ một mục tóm tắt và link đến thư viện demo; trang thư viện là nơi duy nhất có 12 thẻ tương tác.
- Không sửa trang chủ, curriculum.json, tên bài, thứ tự 21 bài hoặc ví dụ đang có.

## Những cặp có nội dung gần nhau nhưng nhiệm vụ khác nhau — không gộp máy móc
| Bài | Nhiệm vụ riêng |
|---|---|
| `animation.html` / `trigger.html` / `transition.html` / `interaction.html` | Animation: đối tượng, nhịp và easing; Trigger: điều kiện bắt đầu/dừng; Transition: giữa section; Interaction: thao tác và phản hồi |
| `hieu-ung-nhieu-lop.html` / `danh-muc-hieu-ung.html` / `ke-chuyen-thi-giac.html` | Nhiều lớp: ghép cảnh; Danh mục: tra cứu mẫu; Kể chuyện: tổ chức thông điệp, màu sắc và chuỗi section |
| `cong-nghe-do-hoa-web.html` / `cong-nghe-minh-hoa.html` / `thu-vien-12-cong-cu.html` | Lý thuyết: phân biệt định dạng/công nghệ; Minh họa: các thư viện đã tích hợp chạy thật; Thư viện 12: các minh họa giáo dục và prompt lựa chọn |
| `thiet-lap-github.html` / `cong-nghe-minh-hoa.html` / `lam-chu-cong-nghe.html` | Thiết lập: tài khoản và quyền; Minh họa: mô phỏng vòng đời; Làm chủ: kiểm chứng sản phẩm và tổng duyệt |
| `tai-nguyen-bai.html` / `tham-khao-codepen.html` | Tài nguyên: nội dung, media và nguồn; CodePen: đọc mã mẫu, phụ thuộc và quyền sử dụng |
| `yeu-cau-chatgpt.html` / prompt từng mẫu trong thư viện | Bài yêu cầu: xây dựng prompt tổng thể của dự án; Thư viện: prompt ngắn cho công nghệ được chọn |

## Nguyên tắc chống lặp khi cập nhật tiếp
1. Mỗi khái niệm có **một bài giải thích chính**. Bài khác chỉ nhắc 1–2 câu và dẫn liên kết.
2. Mỗi bộ demo có **một trang sở hữu chính**. Không nhân bản thẻ demo và prompt sang nhiều bài.
3. Không xóa ví dụ có mục đích sư phạm khác nhau chỉ vì dùng chung tên công nghệ.
4. Học sinh chỉ đọc website; tài liệu GitHub gốc là nguồn ChatGPT tự kiểm tra khi cần.
5. Trước khi gộp/xóa sâu, cần đối chiếu từng đoạn nội dung và kiểm thử điều hướng, JS và khả năng tiếp cận trong trình duyệt.

## Giới hạn
Chưa chạy bộ kiểm thử browser hoặc kiểm tra GitHub Pages sau deploy; không khẳng định toàn bộ 21 bài hoàn toàn không còn câu hoặc đoạn lặp. Rà soát này phát hiện và sửa trùng lặp rõ ràng nhất ở thư viện 12 công cụ, đồng thời xác định các vùng chồng lấn cần giữ ranh giới rõ.
