(() => {
 const advice={
  hover:'Ưu tiên CSS transition cho đổi màu, bóng hoặc phóng nhẹ; JavaScript khi cần đổi nội dung/trạng thái. Cả hover và focus đều có phản hồi, không thay đổi kích thước bố cục.',
  icon:'Chọn một bộ icon đồng nhất; SVG tĩnh + Lottie JSON và player nếu tài nguyên phù hợp. Lưu tệp và giấy phép, chạy một lượt khi vào vùng xem, phát lại khi hover/focus; giảm chuyển động dùng hình tĩnh.',
  sequence:'Dùng CSS/WAAPI hoặc thư viện timeline khi chuỗi thực sự phức tạp. Nêu thứ tự, khoảng cách bắt đầu, thời lượng và cách hủy khi rời section; không thêm framework chỉ để hiện lần lượt ba ảnh.',
  particles:'Cân nhắc Canvas 2D cho nhiều hạt; giới hạn số hạt và độ phân giải. Dừng khi ngoài vùng xem hoặc tab ở nền. Giữ chữ và điều khiển bằng HTML, có trạng thái tĩnh.',
  real:'Dùng ảnh hoặc video thật, không cần dựng lại bằng WebGL. Video nền không tiếng có poster dự phòng; audio có quyền phát/dừng và bắt đầu sau thao tác người dùng.',
  '3d':'Cần mô hình GLB/glTF và tài nguyên hợp lệ, thư viện như Three.js, camera và điều khiển quan sát. Thử hiệu năng GPU trên máy trường; có ảnh tĩnh nếu không hỗ trợ. Ảnh 2D không thay thế mô hình 3D.',
  state:'Mô tả trạng thái và điều kiện chuyển trước: chờ → trả lời → đúng/sai. Có thể dùng CSS/JavaScript cho mẫu đơn giản hoặc Rive với tài nguyên và runtime phù hợp cho hoạt hình phức tạp; không tự có nhân vật từ tệp rỗng.'
 };
 const goal=document.getElementById('technology-goal'),result=document.getElementById('technology-advice');const update=()=>result.textContent=advice[goal.value];goal.addEventListener('change',update);update();
 document.getElementById('check-terms').addEventListener('click',()=>{const answer=document.querySelector('input[name="term-answer"]:checked');document.getElementById('terms-feedback').textContent=!answer?'Hãy chọn một câu trả lời.':answer.value==='b'?'Đúng: tài nguyên, bộ phát và trigger là các vai trò khác nhau; hình tĩnh là phương án dự phòng.':'Chưa đúng. JSON không tự phát như ảnh; Lottie cũng không bắt buộc React hay WebGL. Xem lại ví dụ icon trang chủ.'});
})();
