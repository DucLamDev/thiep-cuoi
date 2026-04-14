# 🔧 Hướng Dẫn Debug EmailJS

## ✅ Checklist Kiểm Tra

### 1. Kiểm Tra Cấu Hình EmailJS Dashboard

Đăng nhập vào [EmailJS Dashboard](https://dashboard.emailjs.com/)

#### A. Email Service
- ✅ Vào **Email Services**
- ✅ Kiểm tra Service ID: `service_3aovr1j`
- ✅ Đảm bảo đã kết nối Gmail
- ✅ Status phải là **Active** (màu xanh)

#### B. Email Template
- ✅ Vào **Email Templates**
- ✅ Tìm template: `template_lwgw94b`
- ✅ Click **Test It** để test gửi email
- ✅ Kiểm tra các biến trong template:
  - `{{from_name}}` - Tên người gửi
  - `{{phone}}` - Số điện thoại
  - `{{attending}}` - Trạng thái tham dự
  - `{{message}}` - Lời nhắn
  - `{{page_url}}` - Link trang web

**Template Subject nên là:**
```
[Thiệp Cưới] Xác nhận tham dự từ {{from_name}}
```

**Template To Email:**
- Điền email của bạn muốn nhận thông báo

#### C. Public Key
- ✅ Vào **Account** → **General**
- ✅ Copy **Public Key**: `bqhxIBzfAPScJbmCS`
- ✅ Đảm bảo khớp với file `.env`

### 2. Kiểm Tra File .env

File `.env` phải có đúng format:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_3aovr1j
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_lwgw94b
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=bqhxIBzfAPScJbmCS
```

**Lưu ý:**
- ❌ Không có dấu ngoặc kép `""`
- ❌ Không có khoảng trắng trước/sau dấu `=`
- ✅ Phải có prefix `NEXT_PUBLIC_`

### 3. Restart Dev Server

Sau khi sửa `.env`, **BẮT BUỘC** restart server:

```bash
# Tắt server (Ctrl + C)
# Chạy lại
npm run dev
```

### 4. Test Trên Browser

1. Mở **DevTools** (F12)
2. Vào tab **Console**
3. Điền form RSVP và submit
4. Xem log trong Console:
   - ✅ Nếu thành công: không có lỗi
   - ❌ Nếu lỗi: sẽ hiển thị "EmailJS Error: ..."

### 5. Các Lỗi Thường Gặp

#### Lỗi 1: "The public key is invalid"
**Nguyên nhân:** Public Key sai
**Giải pháp:**
1. Vào EmailJS Dashboard → Account → General
2. Copy lại Public Key
3. Cập nhật vào `.env`
4. Restart server

#### Lỗi 2: "Template ID is invalid"
**Nguyên nhân:** Template ID không tồn tại
**Giải pháp:**
1. Vào EmailJS Dashboard → Email Templates
2. Kiểm tra Template ID
3. Cập nhật vào `.env`
4. Restart server

#### Lỗi 3: "Service ID is invalid"
**Nguyên nhân:** Service chưa được kích hoạt hoặc ID sai
**Giải pháp:**
1. Vào EmailJS Dashboard → Email Services
2. Đảm bảo service đang **Active**
3. Kiểm tra Service ID
4. Cập nhật vào `.env`

#### Lỗi 4: "EmailJS chưa được cấu hình"
**Nguyên nhân:** File `.env` không được load
**Giải pháp:**
1. Đảm bảo file tên là `.env` (không phải `.env.local` hay `.env.example`)
2. File phải ở root folder (cùng cấp với `package.json`)
3. Restart server

#### Lỗi 5: Email gửi thành công nhưng không nhận được
**Nguyên nhân:** Email template chưa cấu hình đúng
**Giải pháp:**
1. Vào EmailJS Dashboard → Email Templates → `template_lwgw94b`
2. Click **Settings**
3. Kiểm tra **To Email** - phải là email của bạn
4. Click **Save**
5. Test lại bằng nút **Test It**

### 6. Test EmailJS Trực Tiếp

Thêm đoạn code test này vào Console browser:

```javascript
emailjs.send(
  'service_3aovr1j',
  'template_lwgw94b',
  {
    from_name: 'Test User',
    phone: '0123456789',
    attending: 'Sẽ tham dự',
    message: 'Đây là test message',
    page_url: window.location.href
  },
  'bqhxIBzfAPScJbmCS'
).then(
  (response) => {
    console.log('SUCCESS!', response.status, response.text);
  },
  (error) => {
    console.log('FAILED...', error);
  }
);
```

### 7. Kiểm Tra Spam Folder

Email có thể bị đưa vào **Spam/Junk**:
- ✅ Kiểm tra folder Spam trong Gmail
- ✅ Đánh dấu "Not Spam" nếu tìm thấy
- ✅ Thêm `noreply@emailjs.com` vào Contacts

### 8. Rate Limit

EmailJS free plan có giới hạn:
- **200 emails/tháng**
- **Kiểm tra:** Dashboard → Account → Usage

Nếu vượt quota, cần upgrade hoặc đợi tháng mới.

## 🚀 Deploy Lên Vercel

Khi deploy lên Vercel, cần thêm Environment Variables:

1. Vào Vercel Dashboard → Project → Settings → Environment Variables
2. Thêm 3 biến:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID = service_3aovr1j
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = template_lwgw94b
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = bqhxIBzfAPScJbmCS
   ```
3. Chọn **Production, Preview, Development**
4. Redeploy project

## 📞 Liên Hệ Support

Nếu vẫn không hoạt động:
- EmailJS Support: https://www.emailjs.com/docs/
- EmailJS Community: https://github.com/emailjs-com/emailjs-sdk/issues
