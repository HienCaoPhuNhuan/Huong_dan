# Hướng dẫn dùng 12 nguồn GitHub với ChatGPT — không cài đặt

Mục đích: học sinh sử dụng **chính xác tài liệu gốc của tác giả** khi yêu cầu ChatGPT tạo website. Chỉ cần trình duyệt, ChatGPT và GitHub; không bắt buộc cài ứng dụng, CLI, Node.js, npm, VS Code hoặc Codex.

## Hai đường link cần cung cấp cho ChatGPT
1. Repository của **nhóm học sinh**, nơi ChatGPT được yêu cầu đọc, sửa và commit.
2. Repository **nguồn tham khảo**, nơi ChatGPT cần đọc README, tài liệu kỹ thuật, ví dụ, license và phiên bản trước khi sử dụng.

Danh sách 12 nguồn: xem [bài học công nghệ](cong-nghe-do-hoa-web.html#free-gallery). Link đến GitHub không tự động cấp cho ChatGPT quyền đọc nội dung; phải kiểm tra phiên có thể truy cập thật. Đặc biệt, skill dành cho AI không phải mã JavaScript để nhúng trực tiếp.

## Prompt mẫu: dùng nguồn gốc, không đoán API

> Tôi muốn làm website trình chiếu bằng ChatGPT và GitHub Pages, hoàn toàn trên trình duyệt, không cài phần mềm. Repo của nhóm: [LINK_REPO_CUA_NHOM]. Nguồn kỹ thuật tham khảo: [LINK_GITHUB_NGUON]. Trước khi viết code, hãy mở và đọc README, tài liệu sử dụng, ví dụ phù hợp và LICENSE của nguồn, xác định phiên bản, phụ thuộc, chi phí và giới hạn phân phối. Hãy nói rõ tệp nào bạn đọc được, tệp nào không. Không đoán API, không tự nhận đã đọc nếu chưa truy cập được. Ưu tiên HTML/CSS/JavaScript thuần và các phần miễn phí, tương thích GitHub Pages; không yêu cầu npm/build trên máy học sinh. Nếu nguồn chỉ hỗ trợ React hoặc dịch vụ trả phí, hãy đề xuất lựa chọn miễn phí phù hợp hoặc giải thích giới hạn trước khi làm. Giữ nguyên nội dung đã duyệt. Nếu phiên có công cụ GitHub với quyền ghi, sửa trực tiếp repo của nhóm, kiểm tra rồi commit thật; báo SHA, tệp đã sửa và trạng thái Pages có bằng chứng. Nếu không có quyền ghi, nói rõ, không tuyên bố đã commit.

## Quy trình thực hành
1. Mở bài học, chọn nguồn theo mục tiêu và nhấn sao chép prompt.
2. Dán prompt vào ChatGPT; điền **hai đường link** và mô tả hiệu ứng muốn tạo.
3. Yêu cầu ChatGPT xác nhận đã đọc tài liệu gốc và kiểm tra license/phụ thuộc. Nếu không đọc được, học sinh có thể mở README/tệp liên quan trên GitHub và sao chép nội dung vào chat; không cần tải/cài gì.
4. Duyệt phương án miễn phí và bản demo, sau đó yêu cầu ChatGPT sửa/commit vào repo nhóm nếu có công cụ phù hợp.
5. Kiểm chứng SHA commit trên GitHub và kết quả GitHub Pages. Nếu không có công cụ ghi, có thể sửa trực tiếp trong giao diện web GitHub, nhưng đó **không phải** ChatGPT tự commit.

## Lưu ý theo nhóm nguồn
- UI UX Pro Max, Taste Skill, Impeccable, Emil Kowalski Skills, Hallmark, GSAP Skills: tài liệu/skill để AI tham khảo; không bắt buộc cài skill.
- Awesome DESIGN.md, Google DESIGN.md: tham khảo định dạng, hệ thống quy tắc; chỉ đưa các quy tắc thích hợp vào repo nhóm.
- React Bits: thành phần React có phụ thuộc; không giả định dùng nguyên bản trong HTML thuần.
- Canvas UI: xem kỹ từng thành phần, phụ thuộc và license trước khi dùng.
- Scroll World, OpenDesign: có thể là ứng dụng/quy trình rộng hơn; không cam kết toàn bộ chức năng miễn phí hoặc triển khai trên Pages.

Không sao chép toàn bộ repository của tác giả vào website học tập. Luôn kiểm tra giấy phép hiện hành, ghi nguồn đúng yêu cầu, không đưa token, mật khẩu hoặc dữ liệu cá nhân học sinh vào repo công khai.
