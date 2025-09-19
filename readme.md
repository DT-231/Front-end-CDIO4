# 📚 Hướng dẫn Git cho nhóm - CDIO Front-End

## 🚀 Giới thiệu

Đây là hướng dẫn Git cơ bản dành cho thành viên mới trong nhóm. Tài liệu này sẽ giúp bạn hiểu và sử dụng Git một cách hiệu quả trong dự án CDIO.

## 📋 Mục lục

- [Cài đặt và thiết lập](#cài-đặt-và-thiết-lập)
- [Quy trình làm việc cơ bản](#quy-trình-làm-việc-cơ-bản)
- [Các lệnh Git thường dùng](#các-lệnh-git-thường-dùng)
- [Quy tắc đặt tên branch](#quy-tắc-đặt-tên-branch)
- [Quy tắc commit message](#quy-tắc-commit-message)
- [Xử lý conflict](#xử-lý-conflict)
- [Best Practices](#best-practices)

## ⚙️ Cài đặt và thiết lập

### 1. Cài đặt Git

```bash
# macOS (sử dụng Homebrew)
brew install git

# Windows (tải từ git-scm.com)
# Linux (Ubuntu/Debian)
sudo apt-get install git
```

### 2. Thiết lập thông tin cá nhân

```bash
git config --global user.name "Tên của bạn"
git config --global user.email "email@example.com"
```

### 3. Clone repository

```bash
git clone https://github.com/DT-231/Front-end-CDIO4.git
cd Front-end-CDIO4
```

## 🔄 Quy trình làm việc cơ bản

### Bước 1: Cập nhật code mới nhất

```bash
git checkout dev
git pull origin dev
```

### Bước 2: Tạo branch mớiHoaiAnh_Login

```bash
git checkout -b feature/ten-tinh-nang
```

### Bước 3: Thực hiện thay đổi và commit

```bash
# Thêm file đã thay đổi
git add .

# Hoặc thêm file cụ thể
git add path/to/file.js

# Commit với message rõ ràng
git commit -m "feat: thêm chức năng đăng nhập"
```

### Bước 4: Push branch lên remote

```bash
git push origin feature/ten-tinh-nang
```

### Bước 5: Tạo Pull Request

- Vào GitHub repository
- Chọn "New Pull Request"
- So sánh branch của bạn với `dev`
- Viết mô tả chi tiết về thay đổi
- Request review từ team members

## 🏆 Quy trình làm việc của nhóm (QUAN TRỌNG!)

> **⚠️ Lưu ý**: Đây là quy trình chuẩn mà tất cả thành viên phải tuân theo!

### 📋 Quy tắc chung:

- **Luôn làm việc trên nhánh `dev`** trước khi tạo nhánh mới
- **Không bao giờ push trực tiếp** lên nhánh `dev`
- **Luôn tạo Pull Request** và đợi leader merge
- **Pull code mới nhất** sau khi leader merge

### 🔄 Quy trình chi tiết:

#### Bước 1: Chuẩn bị làm việc

```bash
# Chuyển về nhánh dev
git checkout dev

# Pull code mới nhất từ remote
git pull origin dev
```

#### Bước 2: Tạo nhánh mới cho task

```bash
# Tạo nhánh mới từ dev
git checkout -b feature/ten-task-cua-ban

# Ví dụ:
git checkout -b feature/login-page
git checkout -b bugfix/responsive-header
git checkout -b feature/product-list
```

#### Bước 3: Viết code và commit

```bash
# Thực hiện thay đổi code...

# Kiểm tra những file đã thay đổi
git status

# Thêm file vào staging
git add .

# Commit với message rõ ràng
git commit -m "feat: hoàn thành trang đăng nhập"
```

#### Bước 4: Push nhánh lên GitHub

```bash
# Push nhánh mới lên remote
git push origin feature/ten-task-cua-ban

# Ví dụ:
git push origin feature/login-page
```

#### Bước 5: Tạo Pull Request

1. Vào GitHub repository: https://github.com/DT-231/Front-end-CDIO4
2. Sẽ thấy thông báo "Compare & pull request" → Click vào
3. **Đảm bảo**: Base branch là `dev` (không phải `main`)
4. Viết tiêu đề và mô tả chi tiết:

   ```
   feat: Hoàn thành trang đăng nhập

   ## Thay đổi:
   - Thêm form đăng nhập
   - Validation cho email và password
   - Responsive design cho mobile

   ## Test:
   - [x] Form hoạt động đúng
   - [x] Responsive trên mobile
   - [x] Không có lỗi console
   ```

5. **Assign reviewer**: Chọn leader làm reviewer
6. Click "Create Pull Request"

#### Bước 6: Đợi review và merge

- **Đợi leader review** và approve
- **Không tự merge** Pull Request
- Nếu có feedback, sửa và push thêm commit vào cùng nhánh

#### Bước 7: Sau khi được merge

```bash
# Chuyển về nhánh dev
git checkout dev

# Pull code đã được merge
git pull origin dev

# Xóa nhánh local đã hoàn thành (tùy chọn)
git branch -d feature/ten-task-cua-ban
```

### 🚨 Những điều TUYỆT ĐỐI KHÔNG được làm:

❌ **KHÔNG push trực tiếp lên nhánh `dev`:**

```bash
# KHÔNG BAO GIỜ làm như này!
git checkout dev
git push origin dev
```

❌ **KHÔNG làm việc trực tiếp trên nhánh `dev`:**

```bash
# SAI! Không commit trực tiếp trên dev
git checkout dev
git add .
git commit -m "thay đổi gì đó"
```

❌ **KHÔNG merge Pull Request của chính mình**

❌ **KHÔNG force push:**

```bash
# NGUY HIỂM! Có thể mất code của người khác
git push --force
```

### ✅ Checklist trước khi tạo Pull Request:

- [ ] Code chạy không lỗi
- [ ] Đã test trên nhiều kích thước màn hình
- [ ] Commit message rõ ràng và đúng format
- [ ] Đã pull code mới nhất từ `dev` trước khi tạo nhánh
- [ ] Branch name đúng convention (feature/, bugfix/, etc.)
- [ ] Mô tả Pull Request chi tiết và dễ hiểu

### 💡 Tips hữu ích:

**Khi gặp conflict:**

```bash
# Pull code mới nhất từ dev vào nhánh của bạn
git checkout feature/your-branch
git pull origin dev

# Giải quyết conflict nếu có
# Sau đó commit và push
git add .
git commit -m "resolve: conflict với dev branch"
git push origin feature/your-branch
```

**Kiểm tra nhánh hiện tại:**

```bash
git branch        # Xem nhánh local
git status        # Xem trạng thái hiện tại
```

**Xem lịch sử commit:**

```bash
git log --oneline -10    # Xem 10 commit gần nhất
```

## 📝 Các lệnh Git thường dùng

### Quản lý branch

```bash
# Xem danh sách branch
git branch

# Xem tất cả branch (bao gồm remote)
git branch -a

# Tạo branch mới
git checkout -b <tên-branch>

# Chuyển đổi branch
git checkout <tên-branch>

# Xóa branch (local)
git branch -d <tên-branch>

# Xóa branch (remote)
git push origin --delete <tên-branch>
```

### Quản lý thay đổi

```bash
# Xem trạng thái hiện tại
git status

# Xem thay đổi chi tiết
git diff

# Xem lịch sử commit
git log --oneline

# Hoàn tác thay đổi chưa commit
git checkout -- <file>

# Hoàn tác thay đổi đã add
git reset HEAD <file>
```

### Đồng bộ với remote

```bash
# Lấy thông tin mới nhất từ remote
git fetch

# Lấy và merge code mới nhất
git pull origin <branch-name>

# Push code lên remote
git push origin <branch-name>
```

## 🏷️ Quy tắc đặt tên branch

### Cấu trúc: `<type>/<description>`

**Types:**

- `feature/` - Tính năng mới
- `bugfix/` - Sửa lỗi
- `hotfix/` - Sửa lỗi khẩn cấp
- `refactor/` - Tái cấu trúc code
- `docs/` - Cập nhật tài liệu

**Ví dụ:**

```bash
feature/login-form
bugfix/header-responsive
hotfix/payment-error
refactor/user-service
docs/api-documentation
```

## 💬 Quy tắc commit message

### Cấu trúc: `<type>(<scope>): <description>`

**Types:**

- `feat` - Tính năng mới
- `fix` - Sửa lỗi
- `docs` - Thay đổi tài liệu
- `style` - Thay đổi format code (không ảnh hưởng logic)
- `refactor` - Tái cấu trúc code
- `test` - Thêm hoặc sửa test
- `chore` - Thay đổi build process, tools

**Ví dụ:**

```bash
feat(auth): thêm chức năng đăng nhập bằng Google
fix(header): sửa lỗi responsive trên mobile
docs(readme): cập nhật hướng dẫn cài đặt
style(button): format lại CSS cho button component
refactor(api): tối ưu hóa API calls
test(login): thêm unit test cho form đăng nhập
chore(deps): cập nhật dependencies
```

## ⚠️ Xử lý conflict

### Khi gặp conflict:

1. **Không panic!** Conflict là điều bình thường
2. Mở file có conflict trong editor
3. Tìm các dấu hiệu conflict:
   ```
   <<<<<<< HEAD
   Code của bạn
   =======
   Code từ branch khác
   >>>>>>> branch-name
   ```
4. Chỉnh sửa để giữ lại code đúng
5. Xóa các dấu hiệu conflict
6. Add và commit:
   ```bash
   git add .
   git commit -m "resolve: giải quyết conflict trong file ABC"
   ```

## ✨ Best Practices

### 🎯 Quy tắc chung

- **Luôn pull code mới nhất** trước khi bắt đầu làm việc
- **Commit thường xuyên** với message rõ ràng
- **Không commit code broken** lên branch chung
- **Review code** của nhau trước khi merge
- **Sử dụng .gitignore** để loại bỏ file không cần thiết

### 📁 Cấu trúc project

```
Front-End/
├── assets/          # Hình ảnh, fonts, icons
├── css/            # File CSS
├── html/           # File HTML
├── js/             # File JavaScript
├── .gitignore      # File gitignore
└── readme.md       # Tài liệu hướng dẫn
```

### 🚫 Tránh commit những file sau:

- `node_modules/`
- `.DS_Store`
- `*.log`
- IDE settings (`.vscode/`, `.idea/`)
- File cache và temp

### 🔍 Trước khi commit:

```bash
# Kiểm tra status
git status

# Xem thay đổi
git diff

# Kiểm tra linting (nếu có)
npm run lint

# Test code (nếu có)
npm test
```

## 🆘 Các tình huống thường gặp

### 1. Quên pull code mới nhất

```bash
git stash                    # Lưu thay đổi tạm thời
git pull origin dev          # Pull code mới
git stash pop               # Lấy lại thay đổi
```

### 2. Commit nhầm file

```bash
# Hoàn tác commit cuối (giữ thay đổi)
git reset --soft HEAD~1

# Hoàn tác commit cuối (xóa thay đổi)
git reset --hard HEAD~1
```

### 3. Đổi tên commit cuối

```bash
git commit --amend -m "commit message mới"
```

### 4. Chuyển commit sang branch khác

```bash
git cherry-pick <commit-hash>
```

### 5. Đồng bộ nhánh của mình với dev mới nhất

```bash
# Khi dev đã có code mới và bạn muốn cập nhật vào nhánh đang làm
git checkout feature/your-branch
git pull origin dev

# Nếu có conflict, giải quyết rồi:
git add .
git commit -m "resolve: cập nhật từ dev branch"
```

### 6. Hủy Pull Request và làm lại

```bash
# Nếu muốn hủy PR và làm lại từ đầu
git checkout dev
git pull origin dev
git branch -D feature/old-branch    # Xóa nhánh cũ
git checkout -b feature/new-branch  # Tạo nhánh mới
```

### 7. Leader đã merge, nhưng quên pull về

```bash
# Luôn nhớ pull sau khi leader merge
git checkout dev
git pull origin dev

# Kiểm tra xem code đã được merge chưa
git log --oneline -5
```

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy:

1. Đọc lại hướng dẫn này
2. Hỏi trong group chat
3. Tham khảo [Git Documentation](https://git-scm.com/docs)
4. Sử dụng `git --help <command>` để xem hướng dẫn

## 👥 Team Members

- **Repository:** [Front-end-CDIO4](https://github.com/DT-231/Front-end-CDIO4)
- **Current Branch:** dev
- **Main Branches:**
  - `main` - Production code
  - `dev` - Development code (nhánh chính để merge)
- **Team Leader:** Chịu trách nhiệm review và merge Pull Request
- **Team Members:** Tạo nhánh từ `dev`, viết code, và tạo Pull Request

### 📞 Quy trình liên lạc:

1. **Trước khi bắt đầu task:** Thông báo trong group chat
2. **Khi gặp vấn đề:** Hỏi trong group hoặc tag leader
3. **Sau khi hoàn thành:** Tạo PR và thông báo để leader review
4. **Sau khi được merge:** Thông báo team để mọi người pull code mới

---

_Cập nhật lần cuối: September 2025_
_Quy trình này áp dụng cho tất cả thành viên nhóm CDIO Front-End_
