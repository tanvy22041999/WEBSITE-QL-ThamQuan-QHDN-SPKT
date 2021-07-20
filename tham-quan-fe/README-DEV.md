# LƯU Ý ĐỐI VỚI CODER

## Khi thực hiện task

1. **Checkout qua `master`, tạo một nhánh (branch) mới từ nhánh `master`** với cú pháp `<tên bạn><các chữ cái đầu của họ>-<fe><số thứ tự task>` ví dụ: `duyll-fe01`. Bạn chú ý kẻo tạo nhầm từ nhánh task đang làm nhé!
2. Sau khi merge request, bạn chuyển qua nhánh mới để làm task khác.
3. Sau khi có kết quả review code, bạn quay trở lại nhánh tương ứng để sửa các lỗi nếu có, KO SỬA TRÊN NHÁNH CỦA TASK KHÁC.
4. KHÔNG đặt các file model, service lung tung. Bạn nên hỏi leader trước khi tạo file để tránh thay đổi về sau.
5. Copy code nhớ đọc lại và chỉnh sửa, đừng bê nguyên cái tên function rồi để nguyên như thế nhé 😂
6. Code được copy có thể code-style sẽ khác so với code hiện tại, nhớ sửa lại nhé!
7. Cuối ngày nên push code mình đang làm lên (kể cả đang làm dở) để leader theo dõi tiến độ nhé!
8. Cần chú ý đến code style, Phải dặn lòng "KHÔNG ĐƯỢC ẨU", vì những dòng code sạch đẹp 😂
9. Nếu có thể, bạn nên suy nghĩ cách optimize code từ những chuyện nhỏ nhất.


## Khi Commit code

Bạn cần ghi rõ nội dung vừa thực hiện trong commit này, ví dụ `update form học hàm`, KHÔNG ghi chung chung kiểu `update`, `fix`,...

## Trước khi Merge request

Code của bạn cần đảm bảo phải "Lint" (ESLint), bằng cách gõ lệnh `ng lint`. Nếu `"All files pass linting."` thì bạn tiến hành push code mà merge request. Nếu không bạn sửa lại cho chuẩn (thông thường các lỗi liên quan đến code style).


## Khi fix conflicts

1. Chọn "Incoming changes" đối với các phần code không liên quan đến task của mình làm.
2. Chọn "Current changes" đối với các phần code liên quan đến task mình đang làm.
3. Trường hợp cả 2 coder cùng thao tác trên một phần code, 2 bạn cần thống nhất giữ phần code nào, tránh gây mất code.


## Khi có thắc mắc

1. Nếu bạn là người mới: Bạn có thể vừa tự Google và hỏi Leader xem như thế có được không,...
2. Nếu bạn đã có kinh nghiệm: `It's OK` 😂
3. Bạn cũng có thể thảo luận nhóm nếu cần thiết.


## Phụ lục

1. VS Code Plugin
https://marketplace.visualstudio.com/items?itemName=Mikael.Angular-BeastCode
https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion
https://marketplace.visualstudio.com/items?itemName=johnpapa.angular2
https://marketplace.visualstudio.com/items?itemName=natewallace.angular2-inline
https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials
https://marketplace.visualstudio.com/items?itemName=angular.ng-template
https://marketplace.visualstudio.com/items?itemName=michelemelluso.code-beautifier
https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
https://marketplace.visualstudio.com/items?itemName=xabikos.javascriptsnippets
https://marketplace.visualstudio.com/items?itemName=cyrilletuzi.angular-schematics
https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons
https://marketplace.visualstudio.com/items?itemName=cipchk.ng-zorro-vscode

2. NG-ANT-DESIGN (Zorro)
https://ng.ant.design/version/10.2.x/components/overview/en
