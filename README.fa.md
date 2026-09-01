<div align="center" dir="rtl">

# ⚡ سامانه مدیریت محتوای کلادپرس (CloudPress)

**سیستم مدیریت محتوا و سایت‌ساز تک‌فایلی، فوق‌سریع و بدون سرور (Serverless) بر بستر لبه شبکه Cloudflare و پایگاه داده D1 SQL**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Cloudflare D1](https://img.shields.io/badge/Cloudflare-D1_SQL-F38020?style=flat-square&logo=sqlite&logoColor=white)](https://developers.cloudflare.com/d1/)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero_Runtime-brightgreen?style=flat-square)](#)
[![Tests Passing](https://img.shields.io/badge/Tests-54%2F54_Passed-success?style=flat-square)](#)
[![Language: Bilingual](https://img.shields.io/badge/i18n-فارسی%20%7C%20English-blueviolet?style=flat-square)](#)

[**🇺🇸 Read Documentation in English**](README.md)

</div>

---

## 🌟 معرفی کلادپرس

**کلادپرس (CloudPress)** یک سامانه مدیریت محتوا و وبلاگ مدرن، فوق‌العاده سریع و کاملاً بدون سرور است که برای اجرا بر بستر شبکه جهانی **Cloudflare Workers** و پایگاه داده رابطه‌ای **Cloudflare D1 SQL** توسعه یافته است.

با استفاده از کلادپرس، نیاز به پرداخت هزینه‌های سنگین سرور مجازی (VPS)، هاست اشتراکی، پایگاه‌داده‌های حجیم و نگهداری‌های فنی سرورهای سنتی به کلی از بین می‌رود و سایت شما در بیش از ۳۰۰ دیتاسنتر کلادفلر در سراسر دنیا با زمان پاسخگویی (TTFB) زیر ۳۰ میلی‌ثانیه مستقر می‌شود.

کل این سیستم در قالب **تنها یک فایل مستقل (`worker.js`)** و بدون نیاز به هیچ‌گونه وابستگی npm در زمان اجرا کار می‌کند.

---

## ✨ ویژگی‌های کلیدی

- 🚀 **فوق‌سریع و لبه شبکه (Edge-First)**: اجرای پردازش‌ها در نزدیک‌ترین نقطه جغرافیایی به کاربر.
- 💾 **بدون نیاز به ذخیره‌ساز خارجی (R2/S3)**: تمامی تصاویر به صورت خودکار در مرورگر کاربر به فرمت بهینه WebP فشرده شده و به عنوان فیلد داده در جدول رسانه دیتابیس D1 SQL ذخیره می‌شوند.
- ✍️ **ویرایشگر دیداری پیشرفته (Quill.js WYSIWYG)**:
  - فرمت‌بندی متن: بولد، ایتالیک، آندرلاین، خط‌خورده، بلوک کد، نقل‌قول.
  - تیترها (H1, H2, H3) و پالت انتخاب رنگ متن و هایلایت پس‌زمینه.
  - لیست‌های نقطه‌ای و عددی با فاصله‌گذاری و جهت استاندارد RTL فارسی و LTR انگلیسی.
  - درج ویدیوهای آنلاین (YouTube / Vimeo) و درج تصاویر مستقیماً از رسانه‌خانه داخلی.
  - دکمه تغییر به حالت کد منبع HTML برای توسعه‌دهندگان.
  - ذخیره‌سازی خودکار پیش‌نویس در مرورگر (`localStorage`).
- 🌍 **کاملاً دو زبانه و استاندارد جهانی (فارسی و انگلیسی)**:
  - زبان انگلیسی استاندارد (چپ‌چین LTR با تایپوگرافی فونت اینتر Inter).
  - زبان فارسی بومی (راست‌چین RTL با تایپوگرافی فونت وزیرمتن Vazirmatn).
  - سوئیچ آنی زبان بدون رفرش با موتور ترجمه عمیق DOM.
- 🎨 **شخصی‌سازی نامحدود صفحه اصلی**:
  - بخش Hero قابل ویرایش (نشان بالای تیتر، عنوان اصلی، متن توضیحی، دکمه‌های اقدام و تصویر).
  - کارت‌های سه‌تایی ویژگی‌ها با عنوان، توضیحات، آیکون و قابلیت خاموش/روشن کردن.
  - منوساز درگ اند دراپ در هدر.
  - تزریق کدهای دلخواه CSS و اسکریپت‌های Head/Footer (گوگل آنالیتیکس، ابزارک‌های چت آنلاین).
- 💬 **دیدگاه‌ها و سیستم مدیریت نظرات**:
  - فرم ثبت دیدگاه با محافظت ضداسپم Honeypot.
  - قابلیت تعیین تایید خودکار نظرات یا نیاز به تایید دستی مدیر در پنل.
- 📈 **شمارشگر واقعی بازدیدها**:
  - ذخیره واقعی بازدید هر مقاله در فیلد `views_count` پایگاه داده D1.
  - نمایش آمار مجموع بازدیدها، نوشته‌ها و برگه‌ها در داشبورد مدیریت.
- 🔍 **سئوی لبه شبکه (Edge SEO)**:
  - نقشه سایت خودکار XML در مسیر `/sitemap.xml`.
  - راهنمای موتورهای جستجو در `/robots.txt`.
  - فید خواننده خودکار RSS 2.0 در `/rss.xml` و `/feed.xml`.
  - متاتگ‌های OpenGraph و JSON-LD برای تمامی نوشته‌ها و برگه‌ها.
- 📦 **پشتیبان‌گیری و بازیابی با یک کلیک**:
  - دریافت فایل خروجی کامل JSON از کل پایگاه داده.
  - بازیابی آنی اطلاعات از فایل پشتیبان بدون نیاز به دانش دیتابیس.

---

## 🚀 راهنمای راه‌اندازی سریع

### پیش‌نیازها
- نصب [Node.js](https://nodejs.org/) (نسخه ۱۸ به بالا)
- حساب کاربری رایگان در [Cloudflare](https://dash.cloudflare.com/)

### ۱. کلون کردن مخزن
```bash
git clone https://github.com/your-username/cloudpress.git
cd cloudpress
```

### ۲. نصب ابزار Wrangler
```bash
npm install
```

### ۳. ورود به حساب کلادفلر و ایجاد دیتابیس D1
ورود به حساب کاربری:
```bash
npx wrangler login
```
ایجاد پایگاه داده با نام `cloudpress_db`:
```bash
npx wrangler d1 create cloudpress_db
```
شناسه پایگاه داده (database_id) در خروجی ترمینال نمایش داده می‌شود:
```text
database_name = "cloudpress_db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### ۴. تنظیم فایل `wrangler.toml`
شناسه به دست آمده را در فایل `wrangler.toml` در بخش `database_id` جایگزین کنید:
```toml
[[d1_databases]]
binding = "DB"
database_name = "cloudpress_db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### ۵. اجرای سرور توسعه محلی
```bash
npm run dev
```
آدرس [http://localhost:8787](http://localhost:8787) را در مرورگر باز کنید.
- **صفحه اصلی سایت**: `http://localhost:8787/`
- **ورود به پنل مدیریت**: `http://localhost:8787/admin`
- **اطلاعات کاربری پیش‌فرض**:
  - نام کاربری: `admin`
  - کلمه عبور: `admin123`
  *(توصیه می‌شود در اولین ورود، کلمه عبور را در تب پروفایل مدیریت تغییر دهید)*

---

## 🚢 انتشار مستقیم روی اینترنت (Deploy)

برای انتشار نسخه نهایی روی دامنه یا ساب‌دامین اختصاصی کلادفلر:
```bash
npm run deploy
```

برای امنیت کامل توکن‌های JWT در محیط پروداکشن:
```bash
npx wrangler secret put JWT_SECRET
```

---

## 🧪 آزمون‌های جامع خودکار (Test Suite)

سامانه کلادپرس مجهز به یک سوئیت تست ۵۴ مرحله‌ای است که تمامی امکانات، روت‌ها، ساختار دیتابیس و ترجمه دو زبانه را بررسی می‌کند:
```bash
npm run test
```
خروجی تست:
```text
================================================================================
🏁 TEST SUITE COMPLETED: 54 PASSED, 0 FAILED
================================================================================
```

---

## 📄 لایسنس

این پروژه تحت مجوز متن‌باز [MIT License](LICENSE) منتشر شده است و برای مقاصد شخصی و تجاری کاملاً رایگان می‌باشد.
