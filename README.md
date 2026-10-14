# Huong_dan
Thư viện hướng dẫn thiết kế bài thuyết trình bằng web dành cho học sinh chưa biết lập trình.

- Repo: https://github.com/HienCaoPhuNhuan/Huong_dan
- Website: https://hiencaophunhuan.github.io/Huong_dan/
- Bài mới: https://hiencaophunhuan.github.io/Huong_dan/ke-chuyen-thi-giac.html
- Cập nhật nội dung bàn giao: 2026-10-15.

## Dành cho ChatGPT tiếp tục công việc

README này là tài liệu bàn giao cho giáo viên và AI, không phải bài học cho học sinh. Mọi hướng dẫn học sinh cần đọc phải có trên các trang HTML, không yêu cầu học sinh vào repo đọc README.

Đây là trạng thái và quyết định của dự án, không phải toàn bộ lịch sử cuộc trò chuyện. Khi bắt đầu phiên mới, đọc README, kiểm tra mã hiện tại và commit mới nhất trước khi sửa. Cập nhật phần trạng thái/bàn giao sau mỗi lượt thay đổi đáng kể.

### Prompt tiếp tục trên ChatGPT web

> Tôi là giáo viên đang tiếp tục xây dựng thư viện https://github.com/HienCaoPhuNhuan/Huong_dan. Hãy đọc README.md và các tệp liên quan trước khi làm. Giữ nguyên bìa trang chủ, ba nhóm kiến thức và các quyết định trong README. Học sinh dùng ChatGPT Free và GitHub, không học hay dùng Codex. Công việc lần này: [ghi yêu cầu]. Trước tiên cho biết bạn đọc được repo và có công cụ sửa/commit hay chỉ đọc. Nếu có công cụ ghi, sửa đúng repo, kiểm tra rồi báo tệp thay đổi, commit và trạng thái xuất bản có bằng chứng. Nếu chỉ đọc, nói rõ giới hạn và cung cấp thay đổi cụ thể; không báo đã commit/deploy khi chưa thực hiện.

Kết nối GitHub/Authorize không tự bảo đảm một cuộc trò chuyện có công cụ ghi. Giáo viên đã thử tài khoản Free có thể chỉnh repo trong luồng công cụ phù hợp; không suy rộng thành mọi tài khoản và mọi phiên đều làm được. Không yêu cầu mật khẩu, passkey, mã xác thực hoặc token trong chat/repo. Xác nhận đúng chủ repo trước khi thực hiện.

## Mục tiêu và quyết định cần giữ

1. Tiếng Việt, trực quan: học sinh hiểu kết quả, thuật ngữ thiết kế, lựa chọn, prompt và kiểm chứng; không học lập trình đầy đủ.
2. Học sinh dùng ChatGPT Free để yêu cầu AI tạo mã và, khi có công cụ phù hợp, sửa/commit GitHub. Không đưa ứng dụng Codex thành bước học sinh phải dùng.
3. Ba nhóm trang chủ: Web là gì; Các khái niệm trong thiết kế; Làm chủ công nghệ. Mỗi bài có trang riêng, không khôi phục trang tổng hợp cũ `web-thuyet-trinh.html`.
4. Giữ nguyên bìa trang chủ: ảnh/video trường, chữ chạy, hạt và thông điệp. Không thay bằng bìa khác khi cập nhật phần học.
5. Thiết kế chính cho PC/máy chiếu, chiều rộng tối thiểu theo CSS hiện tại. Không tự thêm bố cục điện thoại cho website này. Điện thoại vẫn được nhắc trong bài bảo mật GitHub Mobile.
6. Ví dụ tự chạy khi nhìn thấy, nghỉ ngoài vùng xem/tab ẩn, tôn trọng prefers-reduced-motion. Không tự phát tiếng. Thao tác tương tác thực vẫn cần hành động của người dùng; bài nói thật không bắt buộc tự chuyển section.
7. Một section là một phần nội dung có mục tiêu, không luôn đồng nghĩa một màn hình. Học sinh tự nhập số section nguyên dương.
8. Không cắt bỏ nội dung đã duyệt, số liệu/nguồn hoặc chức năng cũ. Chỉ sửa phạm vi cần thiết; không hoàn tác thay đổi của giáo viên.
9. Hướng dẫn GitHub gồm tạo tài khoản/repo, connect, authorize, phạm vi All repositories theo lựa chọn đã thống nhất, kiểm chứng quyền và commit thật. Nêu rủi ro của phạm vi rộng; GitHub Mobile không thay thế việc thiết lập passkey/2FA.
10. Signup ChatGPT, Custom Instructions và Memory nằm cùng bài để cá nhân hóa mạch lạc. Memory không phải nơi lưu toàn bộ dự án hay dữ liệu bí mật.

## Cấu trúc nội dung

| Nhóm | Tệp | Nội dung |
| --- | --- | --- |
| Trang chủ | `index.html` | Bìa trường, tìm kiếm, theme, icon động, ba nhóm bài |
| 1 | `tai-khoan-chatgpt.html` | Tài khoản, Instructions, Memory |
| 1 | `web-la-gi.html` | Web tĩnh/động, HTML/CSS/JS, GitHub, authorize, bảo mật, Pages |
| 2 | `thanh-phan-thiet-ke.html` | Chữ, media, chart, form, document, navigation |
| 2 | `bo-cuc.html` | 24 bố cục section và 10 cấu trúc bài |
| 2 | `chu-va-typography.html`, `nguyen-tac-trinh-bay.html` | Font, thứ bậc, tương phản, mật độ |
| 2 | `hieu-ung-media.html`, `hieu-ung-nhieu-lop.html` | Hiệu ứng media và phối lớp |
| 2 | `animation.html`, `transition.html`, `interaction.html` | Nhịp, chuyển cảnh và thao tác |
| 2 | `danh-muc-hieu-ung.html`, `trigger.html` | 22 hiệu ứng, 32 nhóm trigger và 13 chế độ thử |
| 2 | `ke-chuyen-thi-giac.html` | Theme, trình chiếu, scrollytelling, ECharts, sơ đồ, View Transition, Swiper, lý thuyết Rive |
| Demo | `minh-hoa-trinh-chieu.html` | Demo Reveal.js thật, nhúng iframe và mở riêng; không phải bài hướng dẫn độc lập |
| 3 | `tai-nguyen-bai.html` | Media, đường dẫn và lưu tài nguyên |
| 3 | `yeu-cau-chatgpt.html` | Bộ tạo prompt, số section tùy chọn, sáu lựa chọn màu |
| 3 | `lam-chu-cong-nghe.html` | Thiết bị, độ mượt, workflow và trình bày |
| 3 | `tham-khao-codepen.html` | Tham khảo mã, giấy phép, VPN được phép |
| 3 | `cong-nghe-do-hoa-web.html` | Thuật ngữ tài nguyên/rendering/thư viện/framework |
| 3 | `cong-nghe-minh-hoa.html` | Three.js shader, Lottie online, GSAP, Vue và mô phỏng workflow |

Có 20 bài hướng dẫn, một trang chủ và một trang demo trình chiếu. Số liên kết chủ đề trên trang chủ khác số tệp HTML vì một bài có nhiều mục con.

### Tệp giao diện và hành vi

- `styles.css`, `course.css`, `course.js`: giao diện và hành vi chung; ảnh hưởng nhiều bài, cần kiểm tra rộng khi sửa.
- `kinetic.css/js`: bìa động và bài phối lớp. Không thay chính sách autoplay/reduced-motion để giải quyết sự cố riêng mà chưa kiểm chứng.
- `library.css/js`, `library-icons.js`: thư viện trang chủ, tìm kiếm, theme, icon.
- `lesson-motion.css/js`: trang trí và banner tự chạy cho 20 bài. Thêm bài mới thì cập nhật bảng `lessons`.
- `motion-workshop.css/js`, `workshop-shader.js`: minh họa công nghệ trước đây.
- `visual-story.css/js`: các demo kể chuyện thị giác mới, timer theo từng vùng, dữ liệu giả định.
- `presentation-demo.css/js`: Reveal.js trong trang riêng; CSS được cách ly với website bằng iframe.

## Trạng thái phiên cập nhật 2026-10-15

Đã triển khai:

- Bài mới có tám phần theo mẫu: quan sát thật, thuật ngữ, trường hợp dùng, prompt, giới hạn và kiểm tra.
- Bốn theme tự đổi trên cùng nội dung; lựa chọn chủ động dừng tự đổi.
- Reveal.js Auto-Animate thật, ba slide; tự chạy demo, tương tác thì dừng tự chuyển.
- CSS sticky + GSAP ScrollTrigger: vùng cuộn minh họa tự chạy và có lựa chọn dừng.
- ECharts thật, hai bộ số liệu giả định, thang 0–50, nhãn, họa tiết, bảng HTML và câu kết luận tương ứng.
- SVG + GSAP MotionPathPlugin: luồng dữ liệu mô phỏng, không có commit/deploy thực.
- View Transition API: hai trạng thái ảnh; trình duyệt không hỗ trợ vẫn đổi bằng CSS.
- Swiper thật: bộ ảnh/icon có chú thích, tự chuyển khi thấy, nghỉ khi hover/focus.
- Thêm liên kết trên trang chủ, bài công nghệ và bộ tạo prompt; mở rộng bảng màu.
- Tài nguyên thư viện mới được lưu cục bộ theo phiên bản, không buộc học sinh cài công cụ lập trình.

Chưa triển khai và không được báo là đã có:

- Demo Rive trực tiếp: hiện chỉ có lý thuyết, link tài liệu, yêu cầu `.riv`/runtime/input/giấy phép.
- Mô hình 3D để xoay quan sát; shader đầu trang công nghệ là nền 2D tính màu bằng GPU, không phải mô phỏng chất lỏng.
- Speaker view/đồng hồ/mục lục/ xuất PDF trong demo trình chiếu: có hướng dẫn khái niệm, chưa xây thành bộ công cụ hoàn chỉnh.
- Cache offline/service worker: lưu asset trong repo không bảo đảm lần đầu mở khi mất mạng.
- Backend nhận form hoặc lưu dữ liệu chung: GitHub Pages không tự cung cấp backend.

### Sự cố Chrome cần biết

Lần kiểm tra trước: Windows báo bật animation, Chrome vẫn trả về `prefers-reduced-motion: reduce`; video tải được nhưng CSS/JS chủ động nghỉ theo tùy chọn đó. Chưa xác định chắc nguyên nhân của tín hiệu Chrome. Không có nút “Phát video nền” trong bản xuất bản vì giáo viên yêu cầu tự động. Không tự thay cấu hình Windows/Chrome hoặc bỏ hỗ trợ reduced-motion. Phải kiểm tra lại máy và trình duyệt thực, không coi kết quả cũ là trạng thái hiện tại.

## Thư viện, tài nguyên và giấy phép

| Thành phần trong `assets/vendor/` | Phiên bản | Vai trò / giấy phép |
| --- | --- | --- |
| Three.js | 0.186.1 | Shader WebGL; MIT |
| Vue | 3.5.44 | Component phản ứng trong demo; MIT |
| GSAP + ScrollTrigger + MotionPathPlugin | 3.15.0 | Timeline, cuộn, đường chuyển động; xem `GSAP-LICENSE.html` |
| lottie-web light | 5.13.0 | Phát icon; xem giấy phép đi kèm |
| Reveal.js | 6.0.2 | Trình chiếu; `REVEAL-LICENSE` (MIT) |
| Apache ECharts | 6.1.0 | Biểu đồ; `ECHARTS-LICENSE` và `ECHARTS-NOTICE` |
| Swiper | 14.3.0 | Băng chuyền; `SWIPER-LICENSE` (MIT) |

- Icon: `assets/icons/`, nguồn/giấy phép trong `sources.json`, `LICENSE`; dùng useAnimations.
- Media trường: `assets/media-effects/`; ảnh, video ngắn, poster, audio đã có. Không đổi ảnh cắt khác nhau thành tuyên bố về những địa điểm khác.
- Font: `assets/fonts/`; có tiếng Việt và giấy phép đi kèm.
- Không tải runtime từ nhánh “latest” mỗi lần mở web; giữ phiên bản rõ. Khi nâng cấp, kiểm tra API/giấy phép và demo trước khi thay.
- Không đưa API key, token, thông tin tài khoản hoặc dữ liệu cá nhân học sinh vào các tệp.

## Kiểm tra và xuất bản

Website là HTML/CSS/JavaScript tĩnh, không có bước build bắt buộc. GitHub Pages đang phục vụ repo này; giữ cấu hình hiện có, không hướng dẫn học sinh bật lại Pages trong các bài.

Các lệnh dưới đây dành cho người bảo trì/AI có terminal, không phải yêu cầu học sinh:

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm test
pnpm test:browser
git diff --check
```

Kiểm tra tự động trong repo: link/tài nguyên/anchor, ID trùng, các phần bài mới, dữ liệu và luật timer/fallback ở chế độ bình thường, giảm chuyển động, tab ẩn, thao tác người xem. Công cụ kiểm tra không được tải vào web học sinh. Không coi kiểm tra DOM giả lập là bằng chứng animation đã vẽ đúng trên browser.

`test:browser` dùng Chrome cài trên máy, tạo phiên kiểm tra riêng không truy cập hồ sơ đăng nhập cá nhân. Script mở server cổng trống, kiểm tra ở chiều rộng 1280/1920, chụp ảnh vào `qa-output/` (không commit), rồi đóng browser/server. Nếu môi trường không có Chrome thì sửa cấu hình launch để dùng Chromium đã cài và báo rõ sự thay đổi. Công cụ này dành cho người bảo trì; không thêm vào hướng dẫn học sinh.

Kết quả kiểm tra phiên này: kiểm tra cấu trúc và lifecycle đạt; Chrome tại 1280/1920 đạt cho theme, Reveal.js, cuộn, SVG biểu đồ, motion path, View Transition, Swiper; giảm chuyển động và lỗi tải thư viện đạt, không có pageerror. Các bài công nghệ cũ và bìa động cũng qua kiểm tra hồi quy. Trạng thái xuất bản cần xem commit/Actions thực tế, không suy ra chỉ từ ghi chú này.

Kiểm tra trình duyệt ở PC 1280×720 và 1920×1080:

1. Giữ bìa trang chủ; tìm được bài mới, link và anchor đúng; không tràn ngang ngoài giới hạn PC đã định.
2. Bốn theme đọc được; chọn theme dừng tự đổi.
3. Reveal.js vẽ slide thật và Auto-Animate; tiến/lùi hoạt động, không ăn phím của trang mẹ.
4. Cuộn kể chuyện thay chú thích; hover/focus nghỉ tự cuộn.
5. ECharts có biểu đồ và bảng; chọn lần khảo sát cập nhật kết luận và dừng tự đổi.
6. Chấm SVG đi theo đường; View Transition đổi trạng thái; Swiper đổi slide.
7. Tab ẩn/vùng ngoài viewport/giảm chuyển động thì nghỉ; không tự phát âm thanh.
8. Mô phỏng vẫn ghi rõ mô phỏng; dữ liệu giả định không thành số liệu nhà trường.
9. Kiểm tra console và tải thất bại: nội dung, bảng và hình tĩnh vẫn đọc được.

Nếu có quyền ghi: commit những tệp đúng phạm vi, push `main`, kiểm tra GitHub Actions/Pages đến trạng thái thành công rồi mở URL thực với `?v=<commit>` để tránh cache. Commit thành công không đồng nghĩa Pages đã xuất bản. Không báo “đã kiểm tra” cho việc chưa chạy; ghi rõ thiếu quyền/công cụ hoặc bước còn chưa xác minh.

### Tài liệu chính thức để tiếp tục

- https://revealjs.com/auto-animate/
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- https://gsap.com/docs/v3/Plugins/MotionPathPlugin/
- https://echarts.apache.org/handbook/en/how-to/animation/transition/
- https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
- https://swiperjs.com/demos
- https://github.com/rive-app/help-center/blob/master/runtimes/state-machines.md

## Việc nên làm ở phiên tiếp theo

Chỉ thực hiện khi giáo viên yêu cầu: bổ sung demo Rive có tài nguyên hợp lệ; xây mẫu bài thuyết trình hoàn chỉnh theo chủ đề học sinh; thêm chế độ ghi chú/PDF nếu cần. Không thêm hàng loạt framework hoặc thay bìa chỉ để tạo sự mới lạ. Sau mỗi phiên ghi lại việc đã làm, việc chưa làm, cách kiểm tra và commit thật; README không tự mang ký ức cuộc trò chuyện sang tài khoản khác.
