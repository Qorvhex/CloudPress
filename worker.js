/**
 * CloudPress - Next-Gen Serverless Edge CMS
 * Fully self-contained single-file CMS for Cloudflare Workers + Cloudflare D1
 * Zero external hosting required | 100% Edge-native | Rich WYSIWYG Visual Editor
 * Smart UX: Auto-Compression, Visual Media Picker, Live Search, Auto-Save, SEO Preview & One-Click Backup
 */

export default {
    async fetch(request, env, ctx) {
        return handleRequest(request, env, ctx);
    }
};

const DEFAULT_SECRET = "cloudpress-edge-jwt-super-secret-key-2026";

// =========================================================================
// 0. سیستم بومی‌سازی، زبان و چندزبانگی (i18n & Localization System)
// =========================================================================
const I18N = {
  fa: {
    home: 'صفحه اصلی',
    blog: 'وبلاگ و مقالات',
    about: 'درباره ما',
    contact: 'تماس با ما',
    sitemap: 'نقشه سایت',
    rss: 'فید RSS',
    search_placeholder: 'جستجو در مقالات...',
    search_title: 'نتایج جستجو برای: ',
    all_rights_reserved: 'طراحی شده با CloudPress • تمامی حقوق محفوظ است.',
    switch_lang_title: 'Switch to English',
    switch_lang_btn: 'EN',
    latest_posts: 'آخرین مقالات و آموزش‌ها',
    latest_posts_sub: 'محتوای تولید شده در سیستم مدیریت محتوای کلادپرس',
    all_articles: 'تمام نوشته‌ها',
    read_more: 'مطالعه مقاله',
    min_read: 'دقیقه مطالعه',
    author: 'نویسنده',
    category: 'دسته‌بندی',
    tags: 'برچسب‌ها',
    views: 'بازدید',
    published_on: 'تاریخ انتشار: ',
    comments: 'دیدگاه‌ها',
    no_comments: 'هنوز دیدگاهی ثبت نشده است. شما اولین نفر باشید!',
    leave_comment: 'ارسال دیدگاه جدید',
    comment_name: 'نام و نام‌خانوادگی *',
    comment_email: 'ایمیل (اختیاری)',
    comment_content: 'متن دیدگاه خود را بنویسید...',
    submit_comment: 'ارسال نظر',
    sending: 'در حال ارسال...',
    no_posts: 'هیچ مقاله‌ای یافت نشد.',
    filter_by_cat: 'فیلتر بر اساس دسته‌بندی:',
    all: 'همه',
    page_not_found: 'برگه مورد نظر یافت نشد (404)',
    page_not_found_desc: 'متاسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد یا حذف شده است.',
    back_to_home: 'بازگشت به صفحه اصلی',
    feat_default_title: 'ویژگی‌ها و قابلیت‌های برتر',
    feat_default_sub: 'طراحی مدرن، سرعت فوق‌العاده و کاربری آسان در مقیاس جهانی',
    feat1_title: 'سرعت و عملکرد بالا',
    feat1_desc: 'ارائه بالاترین سرعت لود و پایداری برای بهترین تجربه کاربران شما.',
    feat2_title: 'امنیت و کیفیت استاندارد',
    feat2_desc: 'معماری مدرن با رعایت بالاترین استانداردهای امنیتی و قابلیت اطمینان.',
    feat3_title: 'شخصی‌سازی و نوآوری',
    feat3_desc: 'انعطاف‌پذیری فوق‌العاده با قابلیت تغییر متناسب با هر نوع محتوا و برند.'
  },
  en: {
    home: 'Home',
    blog: 'Blog & Articles',
    about: 'About',
    contact: 'Contact',
    sitemap: 'Sitemap',
    rss: 'RSS Feed',
    search_placeholder: 'Search articles...',
    search_title: 'Search results for: ',
    all_rights_reserved: 'Powered by CloudPress • All rights reserved.',
    switch_lang_title: 'تغییر به فارسی',
    switch_lang_btn: 'فا',
    latest_posts: 'Latest Articles & Insights',
    latest_posts_sub: 'Fresh insights, stories, and tutorials published with CloudPress',
    all_articles: 'All Posts',
    read_more: 'Read Article',
    min_read: 'min read',
    author: 'Author',
    category: 'Category',
    tags: 'Tags',
    views: 'views',
    published_on: 'Published on: ',
    comments: 'Comments',
    no_comments: 'No comments yet. Be the first to share your thoughts!',
    leave_comment: 'Leave a Comment',
    comment_name: 'Your Name *',
    comment_email: 'Email (optional)',
    comment_content: 'Write your comment here...',
    submit_comment: 'Post Comment',
    sending: 'Sending...',
    no_posts: 'No articles found.',
    filter_by_cat: 'Filter by category:',
    all: 'All',
    page_not_found: 'Page Not Found (404)',
    page_not_found_desc: 'The page you are looking for might have been removed or is temporarily unavailable.',
    back_to_home: 'Back to Home',
    feat_default_title: 'Core Features & Highlights',
    feat_default_sub: 'Engineered for sub-20ms global edge latency and unmatched developer velocity',
    feat1_title: 'High Performance & Speed',
    feat1_desc: 'Executed across 300+ Cloudflare edge data centers close to every visitor.',
    feat2_title: 'Enterprise Security & Stability',
    feat2_desc: 'Built on distributed D1 database with zero server maintenance required.',
    feat3_title: 'Unlimited Customization',
    feat3_desc: 'Completely adaptable to any brand, portfolio, blog, or enterprise portal.'
  }
};

const PUBLIC_SETTINGS_I18N = {
  en: {
    site_tagline: 'Ultra-fast Serverless CMS on Cloudflare Edge',
    site_description: 'Modern open-source publishing platform distributed at the edge, powered by Cloudflare Workers & D1.',
    hero_badge: '⚡ Powered by Cloudflare Serverless Edge',
    hero_title: 'Ultra-Fast & Intelligent CMS on Cloudflare Edge',
    hero_subtitle: 'Modern open-source publishing platform powered by Cloudflare Workers and D1 distributed SQL database.',
    hero_btn1_text: 'Explore Articles',
    hero_btn2_text: 'GitHub Repository',
    features_title: 'Engineered for Modern Web Performance',
    features_subtitle: 'Experience blazing-fast edge performance, zero server maintenance, and modern developer experience.',
    feat1_title: 'Serverless Architecture',
    feat1_desc: 'Runs directly on Cloudflare global edge network with instant response times and near-zero latency.',
    feat2_title: 'Cloudflare D1 SQL Database',
    feat2_desc: 'Enterprise-grade distributed SQL storage built on SQLite, eliminating costly separate server infrastructure.',
    feat3_title: 'Modern Visual WYSIWYG Editor',
    feat3_desc: 'Equipped with advanced Quill editor supporting rich text formatting, media library, and live previews.',
    footer_text: 'Designed & developed with Cloudflare Workers & D1 • All Rights Reserved.',
    author_default: 'System Admin',
    comment_success: 'Your comment has been submitted and will appear after moderation.',
    comment_error: 'Error submitting comment. Please try again.',
    network_error: 'Network connection error'
  },
  fa: {
    site_tagline: 'سایت‌ساز فوق‌سریع و بدون سرور بر بستر Cloudflare Edge',
    site_description: 'پلتفرم مدرن تولید محتوا و وبسایت بدون نیاز به هاستینگ و پایگاه داده‌های سنگین',
    hero_badge: '⚡ منتشر شده بر بستر لبه ابری کلودفلر',
    hero_title: 'مدیریت محتوای فوق‌سریع و هوشمند بر لبه شبکه',
    hero_subtitle: 'قدرت گرفته از Cloudflare Workers و پایگاه داده توزیع شده D1 بدون نیاز به سرور و هاست مجزا.',
    hero_btn1_text: 'شروع مطالعه مقالات',
    hero_btn2_text: 'مشاهده گیت‌هاب',
    features_title: 'چرا کلودپرس را انتخاب کنیم؟',
    features_subtitle: 'تجربه سرعت خارق‌العاده، ساختار مدرن و عدم وابستگی به سرورهای سنتی.',
    feat1_title: 'معماری توزیع شده Serverless',
    feat1_desc: 'اجرا با سرعت خارق‌العاده روی لبه شبکه (Edge) در بیش از ۳۰۰ دیتاسنتر جهان.',
    feat2_title: 'پایگاه داده Cloudflare D1',
    feat2_desc: 'ذخیره‌سازی پایدار و امن SQL بر بستر پایگاه داده توزیع شده D1 بدون نیاز به سرور مجزا.',
    feat3_title: 'ویرایشگر مدرن دیداری',
    feat3_desc: 'مجهز به ویرایشگر پیشرفته Quill با پشتیبانی کامل از نگارش فارسی و فرمت‌بندی غنی محتوا.',
    footer_text: 'طراحی و توسعه یافته با Cloudflare Workers & D1 • تمامی حقوق محفوظ است.',
    author_default: 'مدیر سیستم',
    comment_success: 'دیدگاه شما با موفقیت ثبت شد و پس از تایید نمایش داده خواهد شد.',
    comment_error: 'خطا در ثبت دیدگاه. لطفا دوباره تلاش کنید.',
    network_error: 'خطا در ارتباط با سرور'
  }
};

const MENU_I18N = {
  'صفحه اصلی': 'Home',
  'خانه': 'Home',
  'وبلاگ و مقالات': 'Blog',
  'وبلاگ': 'Blog',
  'مقالات': 'Articles',
  'درباره ما': 'About',
  'درباره': 'About',
  'تماس با ما': 'Contact',
  'تماس': 'Contact',
  'خدمات': 'Services',
  'نمونه کارها': 'Portfolio'
};

function getLocalizedSetting(key, dbValue, lang = 'fa') {
  if (lang === 'en') {
    if (!dbValue || /[\u0600-\u06FF]/.test(dbValue)) {
      return PUBLIC_SETTINGS_I18N.en[key] || dbValue || '';
    }
    return dbValue;
  }
  return dbValue || PUBLIC_SETTINGS_I18N.fa[key] || '';
}

function resolveLocale(request, settings = {}) {
    const url = new URL(request.url);
    let lang = url.searchParams.get('lang');
    if (!lang) {
        const cookieHeader = request.headers.get('Cookie') || '';
        const match = cookieHeader.match(/(?:^|;\s*)cp_lang=(fa|en)/);
        if (match) {
            lang = match[1];
        }
    }
    if (!lang) {
        lang = settings.site_language || 'fa';
    }
    if (lang !== 'en' && lang !== 'fa') {
        lang = 'fa';
    }
    const isRTL = lang === 'fa';
    const dir = isRTL ? 'rtl' : 'ltr';
    return { lang, dir, isRTL };
}

function t(key, lang = 'fa', fallback = '') {
    if (I18N[lang] && I18N[lang][key]) return I18N[lang][key];
    if (I18N.fa && I18N.fa[key]) return I18N.fa[key];
    return fallback || key;
}

function formatDate(dateStr, lang = 'fa') {
    if (!dateStr) return '';
    try {
        const d = new Date(dateStr);
        if (lang === 'en') {
            return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
        return d.toLocaleDateString('fa-IR');
    } catch (e) {
        return String(dateStr);
    }
}
async function handleRequest(request, env, ctx) {
    const url = new URL(request.url);
    const db = env && env.DB;
    const jwtSecret = (env && env.JWT_SECRET) || DEFAULT_SECRET;

    // ۱. مقداردهی اولیه و خودکار پایگاه‌داده در صورت اتصال D1
    if (db) {
        try {
            await initDatabase(db);
        } catch (e) {
            console.error("D1 Init Schema Error:", e);
        }
    }

    const authUser = await getAuthUser(request, jwtSecret, db);

    // ۲. مسیریابی احراز هویت ادمین (Login / Logout / Auth API)
    if (url.pathname === '/admin/login') {
        if (authUser) {
            return Response.redirect(`${url.origin}/admin`, 302);
        }
        const locale = resolveLocale(request, {});
        return new Response(getLoginHTML(locale), {
            headers: { 'content-type': 'text/html;charset=UTF-8' },
        });
    }

    if (url.pathname === '/admin/api/auth/login' && request.method === 'POST') {
        return await handleAuthLogin(request, db, jwtSecret);
    }

    if (url.pathname === '/admin/api/auth/logout' && request.method === 'POST') {
        return handleAuthLogout();
    }

    // ۳. مسیریابی سایر API‌های پنل مدیریت (نیاز به لاگین دارند)
    if (url.pathname.startsWith('/admin/api/')) {
        if (!authUser) {
            return new Response(JSON.stringify({ error: "عدم احراز هویت. لطفاً مجدداً وارد شوید." }), {
                status: 401,
                headers: { 'content-type': 'application/json;charset=UTF-8' }
            });
        }

        if (url.pathname === '/admin/api/auth/me') {
            return new Response(JSON.stringify({ user: authUser }), {
                headers: { 'content-type': 'application/json;charset=UTF-8' }
            });
        }

        if (url.pathname === '/admin/api/auth/profile' && request.method === 'PUT') {
            return await handleUpdateProfile(request, db, authUser, jwtSecret);
        }

        if (url.pathname.startsWith('/admin/api/stats')) {
            return await handleStatsAPI(db);
        }

        if (url.pathname.startsWith('/admin/api/posts')) {
            return await handlePostsAPI(request, db, authUser);
        }

        if (url.pathname.startsWith('/admin/api/pages')) {
            return await handlePagesAPI(request, db);
        }

        if (url.pathname.startsWith('/admin/api/categories')) {
            return await handleCategoriesAPI(request, db);
        }

        if (url.pathname.startsWith('/admin/api/tags')) {
            return await handleTagsAPI(request, db);
        }

        if (url.pathname.startsWith('/admin/api/media')) {
            return await handleMediaAPI(request, db);
        }

        if (url.pathname.startsWith('/admin/api/comments')) {
            return await handleCommentsAdminAPI(request, db);
        }

        if (url.pathname.startsWith('/admin/api/settings')) {
            return await handleSettingsAPI(request, db);
        }

        // سیستم پشتیبان‌گیری و بازیابی (Backup & Restore APIs)
        if (url.pathname === '/admin/api/backup/export' && request.method === 'GET') {
            return await handleBackupExport(db);
        }

        if (url.pathname === '/admin/api/backup/import' && request.method === 'POST') {
            return await handleBackupImport(request, db);
        }

        return new Response(JSON.stringify({ error: "Endpoint not found" }), { status: 404 });
    }

    // ۴. مسیریابی پنل مدیریت (Admin SPA UI)
    if (url.pathname.startsWith('/admin')) {
        if (!authUser) {
            return Response.redirect(`${url.origin}/admin/login`, 302);
        }
        return new Response(getAdminHTML(authUser), {
            headers: { 'content-type': 'text/html;charset=UTF-8' },
        });
    }

    // ۵. API‌های عمومی (ثبت نظر عمومی و جستجو)
    if (url.pathname === '/api/comments' && request.method === 'POST') {
        return await handlePublicCommentSubmit(request, db);
    }

    // ۶. خروجی‌های سئو و خوراک (Sitemap & Robots & RSS)
    if (url.pathname === '/sitemap.xml') {
        return await handleSitemapXML(db, url.origin);
    }
    if (url.pathname === '/robots.txt') {
        return new Response(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /admin/\nSitemap: ${url.origin}/sitemap.xml\n`, {
            headers: { 'content-type': 'text/plain;charset=UTF-8' }
        });
    }
    if (url.pathname === '/rss.xml' || url.pathname === '/feed.xml') {
        return await handleRssXML(db, url.origin);
    }

    // ۷. مسیریابی فرانت‌اند و قالب عمومی سایت
    return await handleFrontendRequest(request, db, url);
}

// =========================================================================
// 2. ساختار و مقداردهی دیتابیس D1 (Schema & Initial Seeding)
// =========================================================================
async function initDatabase(db) {
    if (!db) return;

    // ایجاد جدول کاربران (مدیران و نویسندگان)
    await db.prepare(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            salt TEXT NOT NULL,
            display_name TEXT,
            role TEXT DEFAULT 'admin',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `).run();

    // ایجاد جدول برگه‌ها
    await db.prepare(`
        CREATE TABLE IF NOT EXISTS pages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            content TEXT,
            status TEXT DEFAULT 'published',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `).run();

    // ایجاد جدول دسته‌بندی‌ها
    await db.prepare(`
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            description TEXT
        )
    `).run();

    // ایجاد جدول برچسب‌ها
    await db.prepare(`
        CREATE TABLE IF NOT EXISTS tags (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL
        )
    `).run();

    // ایجاد جدول مقالات و نوشته‌ها
    await db.prepare(`
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            excerpt TEXT,
            content TEXT,
            cover_image TEXT,
            category_id INTEGER,
            status TEXT DEFAULT 'published',
            views_count INTEGER DEFAULT 0,
            author_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            published_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `).run();

    // ایجاد جدول پیوند پست و برچسب
    await db.prepare(`
        CREATE TABLE IF NOT EXISTS post_tags (
            post_id INTEGER NOT NULL,
            tag_id INTEGER NOT NULL,
            PRIMARY KEY (post_id, tag_id)
        )
    `).run();

    // ایجاد جدول رسانه (تصاویر ذخیره شده به صورت Base64 فشرده درون D1)
    await db.prepare(`
        CREATE TABLE IF NOT EXISTS media (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            data TEXT NOT NULL,
            mime_type TEXT DEFAULT 'image/webp',
            size INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `).run();

    // ایجاد جدول دیدگاه‌ها
    await db.prepare(`
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            post_id INTEGER NOT NULL,
            author_name TEXT NOT NULL,
            author_email TEXT,
            content TEXT NOT NULL,
            status TEXT DEFAULT 'approved',
            parent_id INTEGER DEFAULT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `).run();

    // ایجاد جدول تنظیمات سایت
    await db.prepare(`
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    `).run();

    // درج داده‌های اولیه در صورت خالی بودن
    const userCount = await db.prepare("SELECT COUNT(*) as count FROM users").first();
    if (userCount && userCount.count === 0) {
        const salt = generateSalt();
        const hash = await hashPassword("admin123", salt);
        await db.prepare(`
            INSERT INTO users (username, email, password_hash, salt, display_name, role)
            VALUES (?, ?, ?, ?, ?, ?)
        `).bind('admin', 'admin@cloudpress.edge', hash, salt, 'مدیر کلادپرس', 'admin').run();
    }

    const pageCount = await db.prepare("SELECT COUNT(*) as count FROM pages").first();
    if (pageCount && pageCount.count === 0) {
        await db.batch([
            db.prepare("INSERT INTO pages (title, slug, content, status) VALUES (?, ?, ?, ?)").bind(
                'درباره ما',
                'about',
                '<h2>درباره سیستم CloudPress</h2><p>این سامانه یک سیستم مدیریت محتوای بدون سرور و نسل جدید است که روی شبکه ابری کلادفلر و پایگاه داده D1 مستقر گردیده است.</p><p>سرعت لود فوق‌العاده، امنیت لبه شبکه و عدم نیاز به مدیریت هاستینگ از مزایای کلیدی این پلتفرم است.</p>',
                'published'
            ),
            db.prepare("INSERT INTO pages (title, slug, content, status) VALUES (?, ?, ?, ?)").bind(
                'تماس با ما',
                'contact',
                '<h2>تماس با مدیریت</h2><p>شما می‌توانید از طریق ایمیل یا شبکه‌های اجتماعی درج شده در بخش فوتر با تیم ما در ارتباط باشید.</p>',
                'published'
            )
        ]);
    }

    const catCount = await db.prepare("SELECT COUNT(*) as count FROM categories").first();
    if (catCount && catCount.count === 0) {
        await db.batch([
            db.prepare("INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)").bind('تکنولوژی و وب', 'tech', 'مقالات پیرامون پردازش لبه، سرورلس و تکنولوژی‌های وب'),
            db.prepare("INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)").bind('آموزش و ترفندها', 'tutorials', 'راهنماها و آموزش‌های کاربردی کلادفلر')
        ]);
    }

    const postCount = await db.prepare("SELECT COUNT(*) as count FROM posts").first();
    if (postCount && postCount.count === 0) {
        await db.batch([
            db.prepare(`
                INSERT INTO posts (title, slug, excerpt, content, cover_image, category_id, status, views_count)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `).bind(
                'چرا Edge Computing و سرورلس آینده توسعه وب است؟',
                'edge-computing-future',
                'بررسی دلایلی که چرا سرورهای سنتی جای خود را به ورکرها و پردازش در نزدیک‌ترین نقطه به کاربر می‌دهند.',
                '<h2>انقلاب در سرعت و کارایی با Edge Network</h2><p>در وب سنتی، هر درخواست باید فاصله جغرافیایی زیادی را تا یک سرور فیزیکی در یک دیتاسنتر طی می‌کرد. اما در معماری Edge، کدهای شما در بیش از ۳۰۰ نقطه دنیا به طور همزمان اجرا می‌شوند.</p><blockquote>سرعت پاسخگویی زیر ۲۰ میلی‌ثانیه، عدم نیاز به نگهداری سرور و مقیاس‌پذیری خودکار از ویژگی‌های بی‌نظیر کلادپرس است.</blockquote><p>با ترکیب Cloudflare Workers و D1 Database، دیتابیس به صورت خودکار داده‌ها را با سرعت بالا در اختیار کاربران قرار می‌دهد.</p>',
                'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
                1,
                'published',
                142
            ),
            db.prepare(`
                INSERT INTO posts (title, slug, excerpt, content, cover_image, category_id, status, views_count)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `).bind(
                'راهنمای کامل تولید محتوا و سئو در کلادپرس',
                'cloudpress-seo-guide',
                'چگونه با استفاده از ویرایشگر گرافیکی و سئوی خودکار سایت خود را به رتبه‌های برتر گوگل برسانید.',
                '<h2>تولید محتوای جذاب با ویرایشگر دیداری</h2><p>ویرایشگر گرافیکی تعبیه شده در پنل مدیریت به شما این امکان را می‌دهد تا به سادگی عناوین، تصاویر، لیست‌ها و نقل‌قول‌ها را با ظاهر راست‌چین دلخواه تنظیم نمایید.</p><p>همچنین نقشه سایت (sitemap.xml) و تگ‌های شبکه‌های اجتماعی به صورت کاملاً خودکار برای تمامی نوشته‌ها ساخته می‌شوند.</p>',
                'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
                2,
                'published',
                89
            )
        ]);
    }

    const settingsCount = await db.prepare("SELECT COUNT(*) as count FROM settings").first();
    if (settingsCount && settingsCount.count === 0) {
        const defaultSettings = [
            ['site_title', 'CloudPress'],
            ['site_tagline', 'سایت‌ساز فوق‌سریع و بدون سرور بر بستر Cloudflare Edge'],
            ['site_description', 'پلتفرم مدرن تولید محتوا و وبسایت بدون نیاز به هاستینگ و پایگاه داده‌های سنگین'],
            ['site_logo', ''],
            ['header_menu', JSON.stringify([
                { title: 'صفحه اصلی', url: '/' },
                { title: 'وبلاگ و مقالات', url: '/blog' },
                { title: 'درباره ما', url: '/about' },
                { title: 'تماس با ما', url: '/contact' }
            ])],
            ['footer_text', 'طراحی و توسعه یافته با Cloudflare Workers & D1 • تمامی حقوق محفوظ است.'],
            ['site_language', 'fa'],
            ['social_github', 'https://github.com'],
            ['social_twitter', 'https://twitter.com'],
            ['social_discord', 'https://discord.gg'],
            ['social_telegram', 'https://t.me']
        ];

        for (const [k, v] of defaultSettings) {
            await db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").bind(k, v).run();
        }
    }
}

// =========================================================================
// 3. ماژول امنیت، هش کلمات عبور و نشست‌ها (Crypto & Auth Security)
// =========================================================================
function generateSalt() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        enc.encode(password + salt),
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
    );
    const bits = await crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: enc.encode(salt),
            iterations: 10000,
            hash: 'SHA-256'
        },
        keyMaterial,
        256
    );
    return Array.from(new Uint8Array(bits), b => b.toString(16).padStart(2, '0')).join('');
}

async function signToken(payload, secret) {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" })).replace(/=/g, '');
    const body = btoa(unescape(encodeURIComponent(JSON.stringify(payload)))).replace(/=/g, '');
    const data = `${header}.${body}`;
    
    const enc = new TextEncoder();
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        enc.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );
    const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(data));
    const signature = Array.from(new Uint8Array(signatureBuffer), b => b.toString(16).padStart(2, '0')).join('');
    return `${data}.${signature}`;
}

async function verifyToken(token, secret) {
    try {
        if (!token) return null;
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const [header, body, signature] = parts;
        const data = `${header}.${body}`;

        const enc = new TextEncoder();
        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            enc.encode(secret),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
        );
        const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(data));
        const expectedSignature = Array.from(new Uint8Array(signatureBuffer), b => b.toString(16).padStart(2, '0')).join('');

        if (signature !== expectedSignature) return null;

        const decodedBody = decodeURIComponent(escape(atob(body)));
        const payload = JSON.parse(decodedBody);

        if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
            return null;
        }

        return payload;
    } catch (e) {
        return null;
    }
}

function getCookie(request, name) {
    const cookieHeader = request.headers.get('Cookie');
    if (!cookieHeader) return null;
    const cookies = cookieHeader.split(';');
    for (let c of cookies) {
        const [k, v] = c.trim().split('=');
        if (k === name) return decodeURIComponent(v);
    }
    return null;
}

async function getAuthUser(request, jwtSecret, db) {
    const token = getCookie(request, 'cp_session');
    if (!token) return null;
    const payload = await verifyToken(token, jwtSecret);
    if (!payload || !payload.userId) return null;

    if (db) {
        try {
            const user = await db.prepare("SELECT id, username, email, display_name, role FROM users WHERE id = ?").bind(payload.userId).first();
            return user || null;
        } catch (e) {
            return null;
        }
    }
    return { id: payload.userId, username: payload.username, role: payload.role || 'admin', display_name: payload.display_name };
}

async function handleAuthLogin(request, db, jwtSecret) {
    if (!db) {
        return new Response(JSON.stringify({ error: "پایگاه داده متصل نیست." }), { status: 500 });
    }

    try {
        const { username, password } = await request.json();
        if (!username || !password) {
            return new Response(JSON.stringify({ error: "نام کاربری و کلمه عبور الزامی است." }), { status: 400 });
        }

        const user = await db.prepare("SELECT * FROM users WHERE username = ? OR email = ?").bind(username.trim(), username.trim()).first();
        if (!user) {
            return new Response(JSON.stringify({ error: "نام کاربری یا کلمه عبور نادرست است." }), { status: 401 });
        }

        const calculatedHash = await hashPassword(password, user.salt);
        if (calculatedHash !== user.password_hash) {
            return new Response(JSON.stringify({ error: "نام کاربری یا کلمه عبور نادرست است." }), { status: 401 });
        }

        const exp = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60);
        const token = await signToken({
            userId: user.id,
            username: user.username,
            role: user.role,
            display_name: user.display_name,
            exp
        }, jwtSecret);

        const cookieValue = `cp_session=${token}; Path=/; Max-Age=604800; HttpOnly; SameSite=Lax; Secure`;

        return new Response(JSON.stringify({
            success: true,
            user: { id: user.id, username: user.username, display_name: user.display_name, role: user.role }
        }), {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'Set-Cookie': cookieValue
            }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

function handleAuthLogout() {
    return new Response(JSON.stringify({ success: true }), {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'Set-Cookie': 'cp_session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure'
        }
    });
}

async function handleUpdateProfile(request, db, authUser, jwtSecret) {
    try {
        const body = await request.json();
        const { display_name, email, password } = body;

        let query = "UPDATE users SET display_name = ?, email = ?, updated_at = CURRENT_TIMESTAMP";
        const params = [display_name || authUser.display_name, email || authUser.email];

        if (password && password.trim().length >= 6) {
            const salt = generateSalt();
            const hash = await hashPassword(password.trim(), salt);
            query += ", password_hash = ?, salt = ?";
            params.push(hash, salt);
        }

        query += " WHERE id = ?";
        params.push(authUser.id);

        await db.prepare(query).bind(...params).run();

        return new Response(JSON.stringify({ success: true, message: "پروفایل با موفقیت به‌روزرسانی شد." }), {
            headers: { 'content-type': 'application/json;charset=UTF-8' }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// =========================================================================
// 4. ماژول API‌های پنل مدیریت (Admin REST APIs)
// =========================================================================

// الف: آمار و اطلاعات داشبورد
async function handleStatsAPI(db) {
    try {
        const [postsRes, pagesRes, commentsRes, mediaRes, totalViewsRes, recentPostsRes, recentCommentsRes] = await Promise.all([
            db.prepare("SELECT COUNT(*) as count FROM posts").first(),
            db.prepare("SELECT COUNT(*) as count FROM pages").first(),
            db.prepare("SELECT COUNT(*) as count FROM comments").first(),
            db.prepare("SELECT COUNT(*) as count FROM media").first(),
            db.prepare("SELECT SUM(views_count) as total FROM posts").first(),
            db.prepare("SELECT id, title, slug, views_count, status, created_at FROM posts ORDER BY id DESC LIMIT 5").all(),
            db.prepare("SELECT id, author_name, content, status, created_at FROM comments ORDER BY id DESC LIMIT 5").all()
        ]);

        return new Response(JSON.stringify({
            postsCount: postsRes ? postsRes.count : 0,
            pagesCount: pagesRes ? pagesRes.count : 0,
            commentsCount: commentsRes ? commentsRes.count : 0,
            mediaCount: mediaRes ? mediaRes.count : 0,
            totalViews: (totalViewsRes && totalViewsRes.total) || 0,
            recentPosts: (recentPostsRes && recentPostsRes.results) || [],
            recentComments: (recentCommentsRes && recentCommentsRes.results) || []
        }), {
            headers: { 'content-type': 'application/json;charset=UTF-8' }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

async function getUniquePostSlug(db, baseSlug, excludeId = null) {
    let slug = baseSlug || 'post';
    let counter = 1;
    while (true) {
        let query = "SELECT id FROM posts WHERE slug = ?";
        let params = [slug];
        if (excludeId) {
            query += " AND id != ?";
            params.push(excludeId);
        }
        const existing = await db.prepare(query).bind(...params).first();
        if (!existing) break;
        counter++;
        slug = `${baseSlug}-${counter}`;
    }
    return slug;
}

async function getUniquePageSlug(db, baseSlug, excludeId = null) {
    if (baseSlug === '/') return '/';
    let slug = baseSlug || 'page';
    let counter = 1;
    while (true) {
        let query = "SELECT id FROM pages WHERE slug = ?";
        let params = [slug];
        if (excludeId) {
            query += " AND id != ?";
            params.push(excludeId);
        }
        const existing = await db.prepare(query).bind(...params).first();
        if (!existing) break;
        counter++;
        slug = `${baseSlug}-${counter}`;
    }
    return slug;
}

// ب: مدیریت نوشته‌ها و مقالات (Posts API)
async function handlePostsAPI(request, db, authUser) {
    const method = request.method;
    const url = new URL(request.url);

    try {
        if (method === 'GET') {
            const id = url.searchParams.get('id');
            if (id) {
                const post = await db.prepare(`
                    SELECT p.*, c.name as category_name 
                    FROM posts p 
                    LEFT JOIN categories c ON p.category_id = c.id 
                    WHERE p.id = ?
                `).bind(id).first();
                return new Response(JSON.stringify(post || null), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
            }

            const { results } = await db.prepare(`
                SELECT p.*, c.name as category_name 
                FROM posts p 
                LEFT JOIN categories c ON p.category_id = c.id 
                ORDER BY p.id DESC
            `).all();

            return new Response(JSON.stringify(results || []), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }

        if (method === 'POST') {
            const body = await request.json();
            const { title, slug, excerpt, content, cover_image, category_id, status } = body;
            const finalSlug = await getUniquePostSlug(db, slugify(slug || title));

            await db.prepare(`
                INSERT INTO posts (title, slug, excerpt, content, cover_image, category_id, status, author_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `).bind(
                title,
                finalSlug,
                excerpt || '',
                content || '',
                cover_image || '',
                category_id ? parseInt(category_id) : null,
                status || 'published',
                authUser.id
            ).run();

            return new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }

        if (method === 'PUT') {
            const body = await request.json();
            const { id, title, slug, excerpt, content, cover_image, category_id, status } = body;
            const finalSlug = await getUniquePostSlug(db, slugify(slug || title), id);

            await db.prepare(`
                UPDATE posts 
                SET title = ?, slug = ?, excerpt = ?, content = ?, cover_image = ?, category_id = ?, status = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            `).bind(
                title,
                finalSlug,
                excerpt || '',
                content || '',
                cover_image || '',
                category_id ? parseInt(category_id) : null,
                status || 'published',
                id
            ).run();

            return new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }

        if (method === 'DELETE') {
            const id = url.searchParams.get('id');
            if (id) {
                await db.prepare("DELETE FROM posts WHERE id = ?").bind(id).run();
                await db.prepare("DELETE FROM comments WHERE post_id = ?").bind(id).run();
            }
            return new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// ج: مدیریت برگه‌ها (Pages API)
async function handlePagesAPI(request, db) {
    const method = request.method;
    const url = new URL(request.url);

    try {
        if (method === 'GET') {
            const { results } = await db.prepare("SELECT * FROM pages ORDER BY id DESC").all();
            return new Response(JSON.stringify(results || []), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }

        if (method === 'POST') {
            const body = await request.json();
            const { title, slug, content, status } = body;
            const cleanSlug = slug ? slug.trim().replace(/^\//, '') : slugify(title);
            const initialSlug = cleanSlug === '' ? '/' : cleanSlug;
            const finalSlug = await getUniquePageSlug(db, initialSlug);

            await db.prepare("INSERT INTO pages (title, slug, content, status) VALUES (?, ?, ?, ?)")
                .bind(title, finalSlug, content || '', status || 'published')
                .run();

            return new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }

        if (method === 'PUT') {
            const body = await request.json();
            const { id, title, slug, content, status } = body;
            const cleanSlug = slug ? slug.trim().replace(/^\//, '') : slugify(title);
            const initialSlug = cleanSlug === '' ? '/' : cleanSlug;
            const finalSlug = await getUniquePageSlug(db, initialSlug, id);

            await db.prepare("UPDATE pages SET title = ?, slug = ?, content = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
                .bind(title, finalSlug, content || '', status || 'published', id)
                .run();

            return new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }

        if (method === 'DELETE') {
            const id = url.searchParams.get('id');
            if (id) {
                await db.prepare("DELETE FROM pages WHERE id = ?").bind(id).run();
            }
            return new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// د: دسته‌بندی‌ها و برچسب‌ها (Categories & Tags API)
async function handleCategoriesAPI(request, db) {
    const method = request.method;
    const url = new URL(request.url);

    try {
        if (method === 'GET') {
            const { results } = await db.prepare("SELECT c.*, (SELECT COUNT(*) FROM posts WHERE category_id = c.id) as post_count FROM categories c ORDER BY c.id DESC").all();
            return new Response(JSON.stringify(results || []), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }

        if (method === 'POST') {
            const body = await request.json();
            const { name, slug, description } = body;
            const finalSlug = slugify(slug || name);
            await db.prepare("INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)")
                .bind(name, finalSlug, description || '')
                .run();
            return new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }

        if (method === 'DELETE') {
            const id = url.searchParams.get('id');
            if (id) {
                await db.prepare("DELETE FROM categories WHERE id = ?").bind(id).run();
                await db.prepare("UPDATE posts SET category_id = NULL WHERE category_id = ?").bind(id).run();
            }
            return new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

async function handleTagsAPI(request, db) {
    const method = request.method;
    const url = new URL(request.url);

    try {
        if (method === 'GET') {
            const { results } = await db.prepare("SELECT * FROM tags ORDER BY id DESC").all();
            return new Response(JSON.stringify(results || []), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }
        if (method === 'POST') {
            const body = await request.json();
            const { name } = body;
            const finalSlug = slugify(name);
            await db.prepare("INSERT INTO tags (name, slug) VALUES (?, ?)").bind(name, finalSlug).run();
            return new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }
        if (method === 'DELETE') {
            const id = url.searchParams.get('id');
            if (id) {
                await db.prepare("DELETE FROM tags WHERE id = ?").bind(id).run();
            }
            return new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// هـ: رسانه‌خانه و ذخیره تصاویر بهینه درون D1
async function handleMediaAPI(request, db) {
    const method = request.method;
    const url = new URL(request.url);

    try {
        if (method === 'GET') {
            const { results } = await db.prepare("SELECT id, name, data, mime_type, size, created_at FROM media ORDER BY id DESC").all();
            return new Response(JSON.stringify(results || []), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }

        if (method === 'POST') {
            const body = await request.json();
            const { name, data, mime_type, size } = body;

            if (!name || !data) {
                return new Response(JSON.stringify({ error: "اطلاعات تصویر ناقص است." }), { status: 400 });
            }

            await db.prepare("INSERT INTO media (name, data, mime_type, size) VALUES (?, ?, ?, ?)")
                .bind(name, data, mime_type || 'image/webp', size || data.length)
                .run();

            return new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }

        if (method === 'DELETE') {
            const id = url.searchParams.get('id');
            if (id) {
                await db.prepare("DELETE FROM media WHERE id = ?").bind(id).run();
            }
            return new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// و: مدیریت دیدگاه‌ها (Comments Admin API)
async function handleCommentsAdminAPI(request, db) {
    const method = request.method;
    const url = new URL(request.url);

    try {
        if (method === 'GET') {
            const { results } = await db.prepare(`
                SELECT c.*, p.title as post_title, p.slug as post_slug 
                FROM comments c 
                LEFT JOIN posts p ON c.post_id = p.id 
                ORDER BY c.id DESC
            `).all();
            return new Response(JSON.stringify(results || []), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }

        if (method === 'PUT') {
            const body = await request.json();
            const { id, status } = body;
            await db.prepare("UPDATE comments SET status = ? WHERE id = ?").bind(status, id).run();
            return new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }

        if (method === 'DELETE') {
            const id = url.searchParams.get('id');
            if (id) {
                await db.prepare("DELETE FROM comments WHERE id = ?").bind(id).run();
            }
            return new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// ز: تنظیمات سایت و منوساز (Settings API)
async function handleSettingsAPI(request, db) {
    const method = request.method;

    try {
        if (method === 'GET') {
            const { results } = await db.prepare("SELECT key, value FROM settings").all();
            const settingsObj = {};
            if (results) {
                for (const row of results) {
                    settingsObj[row.key] = row.value;
                }
            }
            return new Response(JSON.stringify(settingsObj), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }

        if (method === 'PUT') {
            const body = await request.json();
            for (const [k, v] of Object.entries(body)) {
                await db.prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?")
                    .bind(k, typeof v === 'object' ? JSON.stringify(v) : String(v), typeof v === 'object' ? JSON.stringify(v) : String(v))
                    .run();
            }
            return new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// ح: پشتیبان‌گیری و بازیابی (Backup & Restore Handlers)
async function handleBackupExport(db) {
    try {
        const [posts, pages, categories, tags, settings, comments] = await Promise.all([
            db.prepare("SELECT * FROM posts").all(),
            db.prepare("SELECT * FROM pages").all(),
            db.prepare("SELECT * FROM categories").all(),
            db.prepare("SELECT * FROM tags").all(),
            db.prepare("SELECT * FROM settings").all(),
            db.prepare("SELECT * FROM comments").all()
        ]);

        const backupData = {
            version: "1.0.0",
            exported_at: new Date().toISOString(),
            data: {
                posts: posts.results || [],
                pages: pages.results || [],
                categories: categories.results || [],
                tags: tags.results || [],
                settings: settings.results || [],
                comments: comments.results || []
            }
        };

        const today = new Date().toISOString().split('T')[0];
        return new Response(JSON.stringify(backupData, null, 2), {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'content-disposition': `attachment; filename="cloudpress-backup-${today}.json"`
            }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

async function handleBackupImport(request, db) {
    try {
        const payload = await request.json();
        const data = payload.data || payload;

        if (!data || (!data.posts && !data.pages && !data.settings)) {
            return new Response(JSON.stringify({ error: "فرمت فایل پشتیبان نامعتبر است." }), { status: 400 });
        }

        // بازیابی دسته‌بندی‌ها
        if (Array.isArray(data.categories)) {
            for (const c of data.categories) {
                await db.prepare("INSERT OR REPLACE INTO categories (id, name, slug, description) VALUES (?, ?, ?, ?)")
                    .bind(c.id, c.name, c.slug, c.description || '').run();
            }
        }

        // بازیابی مقالات
        if (Array.isArray(data.posts)) {
            for (const p of data.posts) {
                await db.prepare(`
                    INSERT OR REPLACE INTO posts (id, title, slug, excerpt, content, cover_image, category_id, status, views_count, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `).bind(
                    p.id, p.title, p.slug, p.excerpt || '', p.content || '', p.cover_image || '',
                    p.category_id || null, p.status || 'published', p.views_count || 0,
                    p.created_at || new Date().toISOString(), p.updated_at || new Date().toISOString()
                ).run();
            }
        }

        // بازیابی برگه‌ها
        if (Array.isArray(data.pages)) {
            for (const pg of data.pages) {
                await db.prepare(`
                    INSERT OR REPLACE INTO pages (id, title, slug, content, status, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `).bind(
                    pg.id, pg.title, pg.slug, pg.content || '', pg.status || 'published',
                    pg.created_at || new Date().toISOString(), pg.updated_at || new Date().toISOString()
                ).run();
            }
        }

        // بازیابی تنظیمات
        if (Array.isArray(data.settings)) {
            for (const s of data.settings) {
                await db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").bind(s.key, s.value).run();
            }
        }

        return new Response(JSON.stringify({ success: true, message: "اطلاعات با موفقیت بازیابی شد." }), {
            headers: { 'content-type': 'application/json;charset=UTF-8' }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// =========================================================================
// 5. API عمومی ثبت دیدگاه (Public Comment Submission)
// =========================================================================
async function handlePublicCommentSubmit(request, db) {
    if (!db) return new Response(JSON.stringify({ error: "Database offline" }), { status: 500 });

    try {
        const body = await request.json();
        const { post_id, author_name, author_email, content, honeypot } = body;

        if (honeypot) {
            return new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json' } });
        }

        if (!post_id || !author_name || !content) {
            return new Response(JSON.stringify({ error: "لطفاً نام و متن نظر خود را وارد کنید." }), { status: 400 });
        }

        const modSetting = await db.prepare("SELECT value FROM settings WHERE key = 'comments_auto_approve'").first();
        const autoApprove = !modSetting || modSetting.value !== 'false';
        const commentStatus = autoApprove ? 'approved' : 'pending';
        const userMsg = autoApprove 
            ? "دیدگاه شما با موفقیت ثبت شد." 
            : "دیدگاه شما با موفقیت ثبت شد و پس از تایید مدیر نمایش داده خواهد شد.";

        await db.prepare(`
            INSERT INTO comments (post_id, author_name, author_email, content, status)
            VALUES (?, ?, ?, ?, ?)
        `).bind(parseInt(post_id), author_name.trim(), (author_email || '').trim(), content.trim(), commentStatus).run();

        return new Response(JSON.stringify({ success: true, message: userMsg, autoApprove }), {
            headers: { 'content-type': 'application/json;charset=UTF-8' }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// =========================================================================
// 6. سئو، نقشه سایت XML و فید RSS (SEO, Sitemap & RSS)
// =========================================================================
async function handleSitemapXML(db, origin) {
    let posts = [], pages = [], categories = [];
    if (db) {
        try {
            const [pRes, pgRes, cRes] = await Promise.all([
                db.prepare("SELECT slug, updated_at FROM posts WHERE status = 'published'").all(),
                db.prepare("SELECT slug, updated_at FROM pages WHERE status = 'published'").all(),
                db.prepare("SELECT slug FROM categories").all()
            ]);
            posts = pRes.results || [];
            pages = pgRes.results || [];
            categories = cRes.results || [];
        } catch (e) { }
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${origin}/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${origin}/blog</loc>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    ${pages.map(p => `
    <url>
        <loc>${origin}/${p.slug === '/' ? '' : p.slug}</loc>
        <lastmod>${new Date(p.updated_at || Date.now()).toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`).join('')}
    ${posts.map(p => `
    <url>
        <loc>${origin}/blog/${p.slug}</loc>
        <lastmod>${new Date(p.updated_at || Date.now()).toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.85</priority>
    </url>`).join('')}
    ${categories.map(c => `
    <url>
        <loc>${origin}/category/${c.slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>`).join('')}
</urlset>`;

    return new Response(xml, {
        headers: { 'content-type': 'application/xml;charset=UTF-8' }
    });
}

async function handleRssXML(db, origin) {
    let posts = [];
    if (db) {
        try {
            const res = await db.prepare("SELECT * FROM posts WHERE status = 'published' ORDER BY id DESC LIMIT 20").all();
            posts = res.results || [];
        } catch (e) { }
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
    <channel>
        <title>CloudPress Blog</title>
        <link>${origin}</link>
        <description>جدیدترین نوشته‌ها و مقالات وبسایت CloudPress</description>
        <language>fa</language>
        ${posts.map(p => `
        <item>
            <title><![CDATA[${p.title}]]></title>
            <link>${origin}/blog/${p.slug}</link>
            <description><![CDATA[${p.excerpt || p.title}]]></description>
            <pubDate>${new Date(p.created_at).toUTCString()}</pubDate>
            <guid>${origin}/blog/${p.slug}</guid>
        </item>`).join('')}
    </channel>
</rss>`;

    return new Response(xml, {
        headers: { 'content-type': 'application/rss+xml;charset=UTF-8' }
    });
}

// =========================================================================
// 7. موتور رندر و قالب فرانت‌اند (Public Frontend Engine)
// =========================================================================
async function handleFrontendRequest(request, db, url) {
    let settings = {
        site_title: 'CloudPress',
        site_tagline: 'سایت‌ساز فوق‌سریع و بدون سرور روی شبکه ابری کلادفلر',
        site_description: 'یک پلتفرم مدرن برای وبسایت‌ها و وبلاگ‌های پرسرعت بدون نیاز به هاست و سرور',
        header_menu: JSON.stringify([
            { title: 'صفحه اصلی', url: '/' },
            { title: 'وبلاگ', url: '/blog' },
            { title: 'درباره ما', url: '/about' },
            { title: 'تماس با ما', url: '/contact' }
        ]),
        footer_text: 'طراحی شده بر پایه Cloudflare Workers & D1 • تمامی حقوق محفوظ است.',
        social_github: '#',
        social_telegram: '#'
    };

    if (db) {
        try {
            const { results } = await db.prepare("SELECT key, value FROM settings").all();
            if (results) {
                results.forEach(r => settings[r.key] = r.value);
            }
        } catch (e) { }
    }

    const pathname = url.pathname;
    const locale = resolveLocale(request, settings);
    const setCookieHeaders = {};
    if (url.searchParams.has('lang')) {
        setCookieHeaders['Set-Cookie'] = `cp_lang=${locale.lang}; Path=/; Max-Age=31536000; SameSite=Lax`;
    }
    const htmlHeaders = { 'content-type': 'text/html;charset=UTF-8', ...setCookieHeaders };

    // ۱. صفحه اصلی (Homepage)
    if (pathname === '/') {
        let latestPosts = [];
        if (db) {
            try {
                const res = await db.prepare(`
                    SELECT p.*, c.name as category_name 
                    FROM posts p 
                    LEFT JOIN categories c ON p.category_id = c.id 
                    WHERE p.status = 'published' 
                    ORDER BY p.id DESC LIMIT 6
                `).all();
                latestPosts = res.results || [];
            } catch (e) { }
        }
        return new Response(renderHomePage(settings, latestPosts, locale), {
            headers: htmlHeaders
        });
    }

    // ۲. صفحه وبلاگ و آرشیو نوشته‌ها (/blog)
    if (pathname === '/blog') {
        let posts = [];
        let categories = [];
        const searchQuery = url.searchParams.get('q');

        if (db) {
            try {
                const catRes = await db.prepare("SELECT * FROM categories").all();
                categories = catRes.results || [];

                let query = `
                    SELECT p.*, c.name as category_name 
                    FROM posts p 
                    LEFT JOIN categories c ON p.category_id = c.id 
                    WHERE p.status = 'published'
                `;
                const params = [];
                if (searchQuery) {
                    query += ` AND (p.title LIKE ? OR p.content LIKE ? OR p.excerpt LIKE ?)`;
                    const searchParam = `%${searchQuery}%`;
                    params.push(searchParam, searchParam, searchParam);
                }
                query += ` ORDER BY p.id DESC`;

                const res = await db.prepare(query).bind(...params).all();
                posts = res.results || [];
            } catch (e) { }
        }
        return new Response(renderBlogArchivePage(settings, posts, categories, searchQuery, locale), {
            headers: htmlHeaders
        });
    }

    let decodedPathname = pathname;
    try { decodedPathname = decodeURIComponent(pathname); } catch (e) {}

    // ۳. آرشیو دسته‌بندی (/category/:slug)
    if (decodedPathname.startsWith('/category/')) {
        const slug = decodedPathname.replace('/category/', '');
        let category = null;
        let posts = [];
        if (db) {
            try {
                category = await db.prepare("SELECT * FROM categories WHERE slug = ?").bind(slug).first();
                if (category) {
                    const res = await db.prepare(`
                        SELECT p.*, c.name as category_name 
                        FROM posts p 
                        LEFT JOIN categories c ON p.category_id = c.id 
                        WHERE p.status = 'published' AND p.category_id = ? 
                        ORDER BY p.id DESC
                    `).bind(category.id).all();
                    posts = res.results || [];
                }
            } catch (e) { }
        }
        if (!category) return new Response(render404Page(settings, locale), { status: 404, headers: htmlHeaders });
        return new Response(renderCategoryPage(settings, category, posts, locale), {
            headers: htmlHeaders
        });
    }

    // ۴. آرشیو برچسب (/tag/:slug)
    if (decodedPathname.startsWith('/tag/')) {
        const slug = decodedPathname.replace('/tag/', '');
        let tag = null;
        let posts = [];
        if (db) {
            try {
                tag = await db.prepare("SELECT * FROM tags WHERE slug = ?").bind(slug).first();
                if (tag) {
                    const res = await db.prepare(`
                        SELECT p.*, c.name as category_name 
                        FROM posts p 
                        JOIN post_tags pt ON p.id = pt.post_id 
                        LEFT JOIN categories c ON p.category_id = c.id 
                        WHERE p.status = 'published' AND pt.tag_id = ? 
                        ORDER BY p.id DESC
                    `).bind(tag.id).all();
                    posts = res.results || [];
                }
            } catch (e) { }
        }
        if (!tag) return new Response(render404Page(settings, locale), { status: 404, headers: htmlHeaders });
        const tagDesc = locale.lang === 'en' ? `Articles tagged with #${tag.name}` : `نوشته‌های مرتبط با برچسب ${tag.name}`;
        return new Response(renderCategoryPage(settings, { name: tag.name, description: tagDesc }, posts, locale), {
            headers: htmlHeaders
        });
    }

    // ۵. صفحه تکی مقاله (/blog/:slug یا /post/:slug)
    if (decodedPathname.startsWith('/blog/') || decodedPathname.startsWith('/post/')) {
        const slug = decodedPathname.replace(/^\/(blog|post)\//, '');
        let post = null;
        let comments = [];
        if (db) {
            try {
                post = await db.prepare(`
                    SELECT p.*, c.name as category_name, u.display_name as author_name 
                    FROM posts p 
                    LEFT JOIN categories c ON p.category_id = c.id 
                    LEFT JOIN users u ON p.author_id = u.id 
                    WHERE p.slug = ? AND p.status = 'published'
                `).bind(slug).first();

                if (post) {
                    await db.prepare("UPDATE posts SET views_count = views_count + 1 WHERE id = ?").bind(post.id).run();
                    post.views_count = (post.views_count || 0) + 1;

                    const comRes = await db.prepare("SELECT * FROM comments WHERE post_id = ? AND status = 'approved' ORDER BY id ASC").bind(post.id).all();
                    comments = comRes.results || [];
                }
            } catch (e) { }
        }
        if (!post) return new Response(render404Page(settings, locale), { status: 404, headers: htmlHeaders });
        return new Response(renderSinglePostPage(settings, post, comments, locale), {
            headers: htmlHeaders
        });
    }

    // ۶. صفحه تکی برگه (Pages - /:slug یا /page/:slug)
    let cleanSlug = decodedPathname.replace(/^\/(page\/)?/, '');
    let page = null;
    if (db) {
        try {
            page = await db.prepare("SELECT * FROM pages WHERE slug = ? AND status = 'published'").bind(cleanSlug).first();
        } catch (e) { }
    }

    if (page) {
        return new Response(renderSinglePage(settings, page, locale), {
            headers: htmlHeaders
        });
    }

    // ۷. صفحه ۴۰۴
    return new Response(render404Page(settings, locale), { status: 404, headers: htmlHeaders });
}

// =========================================================================
// 8. کدهای HTML و قالب‌های رابط کاربری (Public Themes & Admin UI)
// =========================================================================

function getHeaderNav(settings, activeUrl = '/', locale = { lang: 'fa', dir: 'rtl', isRTL: true }) {
    let menuItems = [];
    try {
        menuItems = JSON.parse(settings.header_menu || '[]');
    } catch (e) {
        menuItems = [{ title: t('home', locale.lang), url: '/' }, { title: t('blog', locale.lang), url: '/blog' }];
    }

    if (locale.lang === 'en') {
        menuItems = menuItems.map(item => ({
            title: MENU_I18N[item.title] || (/[ \u0600-\u06FF]/.test(item.title) ? (item.url === '/' ? 'Home' : (item.url.replace(/^\//, '') || 'Page')) : item.title),
            url: item.url
        }));
    }

    return `
    <header class="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <a href="/" class="flex items-center gap-3">
          ${settings.site_logo ? `
            <img src="${escapeHtml(settings.site_logo)}" alt="${escapeHtml(settings.site_title || 'CloudPress')}" class="h-10 w-auto max-w-[170px] object-contain">
          ` : `
            <div class="p-2 bg-gradient-to-tr from-brand-600 to-indigo-500 rounded-2xl text-white shadow-lg shadow-brand-500/20">
              <i data-lucide="zap" class="w-6 h-6"></i>
            </div>
            <div>
              <span class="font-black text-xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                ${escapeHtml(settings.site_title || 'CloudPress')}
              </span>
            </div>
          `}
        </a>

        <nav class="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-400">
          ${menuItems.map(item => `
            <a href="${escapeHtml(item.url)}" class="${item.url === activeUrl ? 'text-brand-600 dark:text-brand-400 font-bold' : 'hover:text-slate-900 dark:hover:text-slate-100 transition'}">
              ${escapeHtml(item.title)}
            </a>
          `).join('')}
        </nav>

        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Language Switcher Button -->
          <a href="?lang=${locale.lang === 'fa' ? 'en' : 'fa'}" class="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:text-brand-500 text-xs font-bold transition flex items-center gap-1.5" title="${t('switch_lang_title', locale.lang)}">
            <i data-lucide="globe" class="w-3.5 h-3.5 text-brand-500"></i>
            <span>${t('switch_lang_btn', locale.lang)}</span>
          </a>

          <button id="public-theme-toggle" class="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition" aria-label="Theme">
            <i id="theme-dark-icon" class="w-5 h-5 hidden" data-lucide="moon"></i>
            <i id="theme-light-icon" class="w-5 h-5 hidden" data-lucide="sun"></i>
          </button>

          <!-- Mobile Hamburger Button -->
          <button id="public-mobile-btn" class="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition" aria-label="Menu">
            <i data-lucide="menu" class="w-6 h-6"></i>
          </button>
        </div>

      </div>

      <!-- Mobile Dropdown Menu -->
      <div id="public-mobile-menu" class="hidden md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-6 py-4 space-y-3">
        ${menuItems.map(item => `
          <a href="${escapeHtml(item.url)}" class="block text-sm font-semibold ${item.url === activeUrl ? 'text-brand-500 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">
            ${escapeHtml(item.title)}
          </a>
        `).join('')}
        <a href="?lang=${locale.lang === 'fa' ? 'en' : 'fa'}" class="flex items-center justify-between text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-brand-500 pt-2 border-t border-slate-200 dark:border-slate-800">
          <span class="flex items-center gap-2"><i data-lucide="globe" class="w-4 h-4 text-brand-500"></i> ${locale.lang === 'fa' ? 'زبان / Language' : 'Language / زبان'}</span>
          <span class="px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 text-xs font-bold">${locale.lang === 'fa' ? 'English' : 'فارسی'}</span>
        </a>
      </div>
    </header>`;
}

const SOCIAL_ICONS = {
  github: '<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>',
  twitter: '<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  telegram: '<svg class="w-4 h-4 fill-current text-sky-400" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
  discord: '<svg class="w-4 h-4 fill-current text-indigo-400" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>',
  instagram: '<svg class="w-4 h-4 fill-current text-pink-400" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
  whatsapp: '<svg class="w-4 h-4 fill-current text-emerald-400" viewBox="0 0 24 24"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15-.2.301-.777.979-.953 1.18-.176.2-.351.226-.652.075-.3-.151-1.267-.467-2.414-1.49-.893-.796-1.496-1.78-1.672-2.08-.176-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.151-.175.201-.301.302-.501.1-.2.05-.376-.025-.526-.075-.151-.678-1.634-.929-2.237-.245-.588-.493-.508-.678-.517-.175-.01-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.479 1.078 2.908 1.229 3.109.15.2 2.122 3.24 5.141 4.544.718.31 1.279.496 1.716.635.722.23 1.379.197 1.9.12.58-.087 1.78-.727 2.03-1.43.251-.702.251-1.303.176-1.43-.076-.126-.276-.201-.577-.351zM12.004 2C6.48 2 2 6.48 2 12.004c0 1.947.558 3.766 1.524 5.308L2 22l4.821-1.503A9.957 9.957 0 0 0 12.004 22C17.524 22 22 17.52 22 12.004 22 6.48 17.524 2 12.004 2z"/></svg>',
  linkedin: '<svg class="w-4 h-4 fill-current text-blue-500" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>',
  youtube: '<svg class="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'
};

function getFooter(settings, locale = { lang: 'fa', dir: 'rtl', isRTL: true }) {
    // Helper to conditionally render active social media links (Global Standards)
    const socialItems = [
      { id: 'github', title: 'GitHub', icon: SOCIAL_ICONS.github },
      { id: 'twitter', title: 'Twitter / X', icon: SOCIAL_ICONS.twitter },
      { id: 'discord', title: 'Discord', icon: SOCIAL_ICONS.discord },
      { id: 'linkedin', title: 'LinkedIn', icon: SOCIAL_ICONS.linkedin },
      { id: 'youtube', title: 'YouTube', icon: SOCIAL_ICONS.youtube },
      { id: 'telegram', title: 'Telegram', icon: SOCIAL_ICONS.telegram },
      { id: 'instagram', title: 'Instagram', icon: SOCIAL_ICONS.instagram },
      { id: 'whatsapp', title: 'WhatsApp', icon: SOCIAL_ICONS.whatsapp }
    ];

    const activeSocialLinks = socialItems.filter(item => {
      const url = settings['social_' + item.id];
      const isEnabled = settings['social_' + item.id + '_enabled'] !== 'false';
      return isEnabled && url && url.trim().length > 0 && url.trim() !== '#';
    });

    return `
    <footer class="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-12 text-sm text-slate-500">
      <div class="max-w-7xl mx-auto px-6 space-y-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-3">
            ${settings.site_logo ? `
              <img src="${escapeHtml(settings.site_logo)}" alt="${escapeHtml(settings.site_title || 'CloudPress')}" class="h-8 w-auto max-w-[140px] object-contain">
            ` : `
              <div class="p-1.5 bg-brand-600 rounded-xl text-white">
                <i data-lucide="zap" class="w-4 h-4"></i>
              </div>
              <span class="font-bold text-slate-800 dark:text-slate-200">${escapeHtml(settings.site_title || 'CloudPress')}</span>
            `}
          </div>

          <!-- Social Links (Selectively Filtered) -->
          ${activeSocialLinks.length > 0 ? `
          <div class="flex items-center gap-2.5 flex-wrap text-slate-400">
            ${activeSocialLinks.map(s => `
              <a href="${escapeHtml(settings['social_' + s.id])}" target="_blank" rel="noopener" class="hover:text-brand-500 transition p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800" title="${escapeHtml(s.title)}">
                ${s.icon}
              </a>
            `).join('')}
          </div>
          ` : ''}

          <div class="flex items-center gap-6 text-xs font-semibold">
            <a href="/sitemap.xml" class="hover:text-brand-500 transition">${t('sitemap', locale.lang)}</a>
            <a href="/rss.xml" class="hover:text-brand-500 transition">${t('rss', locale.lang)}</a>
          </div>
        </div>

        <div class="pt-6 border-t border-slate-200 dark:border-slate-800/80 text-center">
          <p class="text-xs text-slate-400">${escapeHtml(getLocalizedSetting('footer_text', settings.footer_text, locale.lang))}</p>
        </div>
      </div>
      ${settings.custom_footer_code || ''}
    </footer>`;
}

function getHeadTags(title, description = '', ogImage = '', settings = {}, locale = { lang: 'fa', dir: 'rtl', isRTL: true }) {
    const brandColor = settings.brand_color || '#2563eb';
    let fontLink = '';
    let fontCssName = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

    if (locale.lang === 'en') {
        fontLink = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">';
        fontCssName = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    } else {
        const fontFamily = settings.font_family || 'Vazirmatn';
        fontLink = '<link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />';
        fontCssName = "'Vazirmatn', sans-serif";
        if (fontFamily === 'Shabnam') {
            fontLink = '<link href="https://cdn.jsdelivr.net/gh/rastikerdar/shabnam-font@v5.0.1/dist/font-face.css" rel="stylesheet" type="text/css" />';
            fontCssName = "'Shabnam', sans-serif";
        } else if (fontFamily === 'Sahel') {
            fontLink = '<link href="https://cdn.jsdelivr.net/gh/rastikerdar/sahel-font@v3.4.0/dist/font-face.css" rel="stylesheet" type="text/css" />';
            fontCssName = "'Sahel', sans-serif";
        }
    }

    return `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  ${ogImage ? `<meta property="og:image" content="${escapeHtml(ogImage)}">` : ''}
  <meta name="twitter:card" content="summary_large_image">
  ${settings.site_favicon ? `<link rel="icon" href="${escapeHtml(settings.site_favicon)}">` : ''}

  <!-- Tailwind CSS Warning Suppress -->
  <script>
    const origWarnPub = console.warn;
    console.warn = function(...args) {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('cdn.tailwindcss.com')) return;
      origWarnPub.apply(console, args);
    };
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#f8fafc',
              100: '#f1f5f9',
              500: '${brandColor}',
              600: '${brandColor}',
              700: '${brandColor}',
            }
          }
        }
      }
    }
  </script>

  ${fontLink}
  
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <style>
    :root { --color-brand-primary: ${brandColor}; }
    body { font-family: ${fontCssName}; }
    .prose img { border-radius: 1rem; margin: 1.5rem 0; max-width: 100%; height: auto; }
    .prose h1, .prose h2, .prose h3 { font-weight: 800; margin-top: 2rem; margin-bottom: 0.75rem; color: inherit; }
    .prose p { margin-bottom: 1.25rem; line-height: 1.85; }
    ${locale.isRTL ? `
    .prose blockquote { border-right: 4px solid var(--color-brand-primary); padding-right: 1rem; font-style: italic; margin: 1.5rem 0; border-left: none; }
    .prose ul, .ql-editor ul { list-style-type: disc; padding-right: 2rem !important; padding-left: 0 !important; margin-bottom: 1.25rem; }
    .prose ol, .ql-editor ol { list-style-type: decimal; padding-right: 2rem !important; padding-left: 0 !important; margin-bottom: 1.25rem; }
    .prose li, .ql-editor li { margin-bottom: 0.35rem; line-height: 1.8; }
    .ql-editor li:not(.ql-direction-ltr)::before { margin-right: -1.75em !important; margin-left: 0 !important; text-align: left !important; float: right !important; width: 1.4em !important; }
    ` : `
    .prose blockquote { border-left: 4px solid var(--color-brand-primary); padding-left: 1rem; font-style: italic; margin: 1.5rem 0; border-right: none; }
    .prose ul, .ql-editor ul { list-style-type: disc; padding-left: 2rem !important; padding-right: 0 !important; margin-bottom: 1.25rem; }
    .prose ol, .ql-editor ol { list-style-type: decimal; padding-left: 2rem !important; padding-right: 0 !important; margin-bottom: 1.25rem; }
    .prose li, .ql-editor li { margin-bottom: 0.35rem; line-height: 1.8; }
    .ql-editor li:not(.ql-direction-rtl)::before { margin-left: -1.75em !important; margin-right: 0 !important; text-align: right !important; float: left !important; width: 1.4em !important; }
    `}
    .prose a { color: var(--color-brand-primary); text-decoration: underline; }
    .prose pre, .prose code { direction: ltr; text-align: left; font-family: monospace; background: #0f172a; color: #f8fafc; padding: 0.2rem 0.4rem; border-radius: 0.375rem; }
    /* Quill Content Support */
    .ql-align-center { text-align: center !important; }
    .ql-align-right { text-align: right !important; }
    .ql-align-left { text-align: left !important; }
    .ql-align-justify { text-align: justify !important; }
    .ql-direction-rtl { direction: rtl !important; text-align: right !important; }
    .ql-syntax, pre.ql-syntax { direction: ltr !important; text-align: left !important; font-family: monospace !important; background: #0f172a !important; color: #38bdf8 !important; padding: 1rem !important; border-radius: 0.75rem !important; overflow-x: auto !important; margin: 1rem 0 !important; }
    .ql-video { display: block; max-width: 100%; aspect-ratio: 16/9; border-radius: 0.75rem; margin: 1.5rem auto; border: 0; }
    ${settings.custom_css ? `\n/* Custom Admin CSS */\n${settings.custom_css}\n` : ''}
  </style>
  ${settings.custom_header_code || ''}`;
}

function getThemeScript() {
    return `
    <script>
      lucide.createIcons();
      const themeBtn = document.getElementById('public-theme-toggle');
      const darkIcon = document.getElementById('theme-dark-icon');
      const lightIcon = document.getElementById('theme-light-icon');

      if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
          if (lightIcon) lightIcon.classList.remove('hidden');
      } else {
          document.documentElement.classList.remove('dark');
          if (darkIcon) darkIcon.classList.remove('hidden');
      }

      if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            if (lightIcon) lightIcon.classList.toggle('hidden');
            if (darkIcon) darkIcon.classList.toggle('hidden');

            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        });
      }

      // Mobile Menu Toggle
      const mobileBtn = document.getElementById('public-mobile-btn');
      const mobileMenu = document.getElementById('public-mobile-menu');
      if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', function() {
          mobileMenu.classList.toggle('hidden');
        });
      }
    </script>`;
}

function calcReadTime(text) {
    if (!text) return 1;
    const clean = text.replace(/<[^>]*>/g, ' ');
    const words = clean.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
}

// الف: صفحه اصلی
function renderHomePage(settings, latestPosts, locale = { lang: 'fa', dir: 'rtl', isRTL: true }) {
    const showReadingTime = settings.show_reading_time !== 'false';
    const showViews = settings.show_views_count !== 'false';
    const heroEnabled = settings.hero_enabled !== 'false';

    return `<!DOCTYPE html>
<html lang="${locale.lang}" dir="${locale.dir}" class="dark">
<head>
  ${getHeadTags((settings.site_title || 'CloudPress') + ' | ' + getLocalizedSetting('site_tagline', settings.site_tagline, locale.lang), getLocalizedSetting('site_description', settings.site_description, locale.lang), '', settings, locale)}
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 antialiased selection:bg-brand-500 selection:text-white transition-colors duration-300">
  ${getHeaderNav(settings, '/', locale)}

  ${heroEnabled ? `
  <!-- Customizable Hero Section -->
  <section class="relative pt-20 pb-28 overflow-hidden">
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-gradient-to-tr from-brand-500/20 via-purple-500/20 to-indigo-500/20 blur-[130px] rounded-full pointer-events-none"></div>

    <div class="max-w-5xl mx-auto px-6 text-center relative z-10">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold mb-8">
        <span class="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
        ${escapeHtml(getLocalizedSetting('hero_badge', settings.hero_badge, locale.lang))}
      </div>

      <h1 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.3] tracking-tight mb-6">
        ${escapeHtml(getLocalizedSetting('hero_title', settings.hero_title, locale.lang))}
      </h1>

      <p class="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
        ${escapeHtml(getLocalizedSetting('hero_subtitle', settings.hero_subtitle || settings.site_description, locale.lang))}
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="${escapeHtml(settings.hero_btn1_url || '/blog')}" class="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-xl shadow-brand-500/25 transition flex items-center justify-center gap-2">
          <span>${escapeHtml(getLocalizedSetting('hero_btn1_text', settings.hero_btn1_text, locale.lang))}</span>
          <i data-lucide="${locale.isRTL ? 'arrow-left' : 'arrow-right'}" class="w-5 h-5"></i>
        </a>
        <a href="${escapeHtml(settings.hero_btn2_url || 'https://github.com')}" class="w-full sm:w-auto bg-slate-200/70 dark:bg-slate-900/80 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-semibold px-8 py-3.5 rounded-2xl transition border border-slate-300/40 dark:border-slate-800">
          ${escapeHtml(getLocalizedSetting('hero_btn2_text', settings.hero_btn2_text, locale.lang))}
        </a>
      </div>

      ${settings.hero_image ? `
      <div class="mt-12 max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
        <img src="${escapeHtml(settings.hero_image)}" alt="Hero Banner" class="w-full h-auto max-h-[450px] object-cover">
      </div>
      ` : ''}
    </div>
  </section>
  ` : ''}

  <!-- Features Grid (Fully Dynamic & Customizable) -->
  ${settings.features_enabled !== 'false' ? `
  <section class="py-16 bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-3">${escapeHtml(getLocalizedSetting('features_title', settings.features_title, locale.lang))}</h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">${escapeHtml(getLocalizedSetting('features_subtitle', settings.features_subtitle, locale.lang))}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition">
          <div class="p-3 bg-brand-500/10 text-brand-500 w-fit rounded-2xl mb-5"><i data-lucide="${escapeHtml(settings.feat1_icon || 'zap')}" class="w-6 h-6"></i></div>
          <h3 class="text-xl font-bold mb-3">${escapeHtml(getLocalizedSetting('feat1_title', settings.feat1_title, locale.lang))}</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">${escapeHtml(getLocalizedSetting('feat1_desc', settings.feat1_desc, locale.lang))}</p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition">
          <div class="p-3 bg-purple-500/10 text-purple-500 w-fit rounded-2xl mb-5"><i data-lucide="${escapeHtml(settings.feat2_icon || 'shield')}" class="w-6 h-6"></i></div>
          <h3 class="text-xl font-bold mb-3">${escapeHtml(getLocalizedSetting('feat2_title', settings.feat2_title, locale.lang))}</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">${escapeHtml(getLocalizedSetting('feat2_desc', settings.feat2_desc, locale.lang))}</p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition">
          <div class="p-3 bg-emerald-500/10 text-emerald-500 w-fit rounded-2xl mb-5"><i data-lucide="${escapeHtml(settings.feat3_icon || 'sparkles')}" class="w-6 h-6"></i></div>
          <h3 class="text-xl font-bold mb-3">${escapeHtml(getLocalizedSetting('feat3_title', settings.feat3_title, locale.lang))}</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">${escapeHtml(getLocalizedSetting('feat3_desc', settings.feat3_desc, locale.lang))}</p>
        </div>
      </div>
    </div>
  </section>
  ` : ''}

  <!-- Latest Blog Posts -->
  <section class="py-20 max-w-7xl mx-auto px-6">
    <div class="flex items-end justify-between mb-12">
      <div>
        <h2 class="text-3xl font-extrabold mb-2">${t('latest_posts', locale.lang)}</h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm">${t('latest_posts_sub', locale.lang)}</p>
      </div>
      <a href="/blog" class="text-brand-500 hover:text-brand-600 font-bold text-sm flex items-center gap-1">
        <span>${t('all_articles', locale.lang)}</span>
        <i data-lucide="${locale.isRTL ? 'chevron-left' : 'chevron-right'}" class="w-4 h-4"></i>
      </a>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      ${latestPosts.map(post => `
        <article class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between">
          <div>
            ${post.cover_image ? `<img src="${escapeHtml(post.cover_image)}" alt="${escapeHtml(post.title)}" class="w-full h-48 object-cover">` : ''}
            <div class="p-6">
              <div class="flex items-center gap-3 text-xs text-slate-400 mb-3">
                ${post.category_name ? `<span class="bg-brand-500/10 text-brand-500 font-semibold px-2.5 py-1 rounded-md">${escapeHtml(post.category_name)}</span>` : ''}
                <span>•</span>
                <span>${formatDate(post.created_at, locale.lang)}</span>
                ${showReadingTime ? `
                <span>•</span>
                <span>${calcReadTime(post.content)} ${t('min_read', locale.lang)}</span>
                ` : ''}
              </div>
              <h3 class="font-bold text-lg mb-3 hover:text-brand-500 transition">
                <a href="/blog/${post.slug}">${escapeHtml(post.title)}</a>
              </h3>
              <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">${escapeHtml(post.excerpt || '')}</p>
            </div>
          </div>
          <div class="px-6 py-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            ${showViews ? `<span class="flex items-center gap-1"><i data-lucide="eye" class="w-3.5 h-3.5"></i> ${post.views_count || 0} ${t('views', locale.lang)}</span>` : '<span></span>'}
            <a href="/blog/${post.slug}" class="text-brand-500 font-bold flex items-center gap-1">${t('read_more', locale.lang)} <i data-lucide="${locale.isRTL ? 'arrow-left' : 'arrow-right'}" class="w-3.5 h-3.5"></i></a>
          </div>
        </article>
      `).join('')}
    </div>
  </section>

  ${getFooter(settings, locale)}
  ${getThemeScript()}
</body>
</html>`;
}

// ب: صفحه آرشیو مقالات
function renderBlogArchivePage(settings, posts, categories, searchQuery, locale = { lang: 'fa', dir: 'rtl', isRTL: true }) {
    const showReadingTime = settings.show_reading_time !== 'false';
    const showViews = settings.show_views_count !== 'false';

    return `<!DOCTYPE html>
<html lang="${locale.lang}" dir="${locale.dir}" class="dark">
<head>
  ${getHeadTags(t('blog', locale.lang) + ' | ' + (settings.site_title || 'CloudPress'), settings.site_description, '', settings, locale)}
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 antialiased selection:bg-brand-500 selection:text-white transition-colors duration-300">
  ${getHeaderNav(settings, '/blog', locale)}

  <main class="max-w-7xl mx-auto px-6 py-16">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
      <div>
        <h1 class="text-3xl md:text-4xl font-black mb-2">${t('blog', locale.lang)}</h1>
        <p class="text-slate-500 dark:text-slate-400 text-sm">${t('latest_posts_sub', locale.lang)}</p>
      </div>

      <form action="/blog" method="GET" class="flex items-center gap-2">
        <div class="relative w-72">
          <i data-lucide="search" class="w-4 h-4 absolute ${locale.isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input type="text" name="q" value="${escapeHtml(searchQuery || '')}" placeholder="${t('search_placeholder', locale.lang)}" class="w-full ${locale.isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
        </div>
        <button type="submit" class="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition">${t('search_placeholder', locale.lang).replace('...', '')}</button>
      </form>
    </div>

    <div class="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200 dark:border-slate-800/80">
      <a href="/blog" class="px-4 py-2 rounded-xl text-xs font-bold ${!searchQuery ? 'bg-brand-600 text-white' : 'bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300'} transition">${t('all', locale.lang)}</a>
      ${categories.map(c => `
        <a href="/category/${c.slug}" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200/70 dark:bg-slate-800 hover:bg-brand-500 hover:text-white text-slate-600 dark:text-slate-300 transition">${escapeHtml(c.name)}</a>
      `).join('')}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      ${posts.length === 0 ? `<div class="col-span-3 py-16 text-center text-slate-400">${t('no_posts', locale.lang)}</div>` : ''}
      ${posts.map(post => `
        <article class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between">
          <div>
            ${post.cover_image ? `<img src="${escapeHtml(post.cover_image)}" alt="${escapeHtml(post.title)}" class="w-full h-48 object-cover">` : ''}
            <div class="p-6">
              <div class="flex items-center gap-3 text-xs text-slate-400 mb-3">
                ${post.category_name ? `<span class="bg-brand-500/10 text-brand-500 font-semibold px-2.5 py-1 rounded-md">${escapeHtml(post.category_name)}</span>` : ''}
                <span>•</span>
                <span>${formatDate(post.created_at, locale.lang)}</span>
                ${showReadingTime ? `
                <span>•</span>
                <span>${calcReadTime(post.content)} ${t('min_read', locale.lang)}</span>
                ` : ''}
              </div>
              <h3 class="font-bold text-lg mb-3 hover:text-brand-500 transition">
                <a href="/blog/${post.slug}">${escapeHtml(post.title)}</a>
              </h3>
              <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">${escapeHtml(post.excerpt || '')}</p>
            </div>
          </div>
          <div class="px-6 py-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            ${showViews ? `<span class="flex items-center gap-1"><i data-lucide="eye" class="w-3.5 h-3.5"></i> ${post.views_count || 0} ${t('views', locale.lang)}</span>` : '<span></span>'}
            <a href="/blog/${post.slug}" class="text-brand-500 font-bold flex items-center gap-1">${t('read_more', locale.lang)} <i data-lucide="${locale.isRTL ? 'arrow-left' : 'arrow-right'}" class="w-3.5 h-3.5"></i></a>
          </div>
        </article>
      `).join('')}
    </div>
  </main>

  ${getFooter(settings, locale)}
  ${getThemeScript()}
</body>
</html>`;
}

// ج: صفحه تکی مقاله و ثبت نظرات
function renderSinglePostPage(settings, post, comments, locale = { lang: 'fa', dir: 'rtl', isRTL: true }) {
    const readingMinutes = calcReadTime(post.content);
    const showReadingTime = settings.show_reading_time !== 'false';
    const showViews = settings.show_views_count !== 'false';

    return `<!DOCTYPE html>
<html lang="${locale.lang}" dir="${locale.dir}" class="dark">
<head>
  ${getHeadTags(post.title + ' | ' + (settings.site_title || 'CloudPress'), post.excerpt || post.title, post.cover_image, settings, locale)}
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 antialiased selection:bg-brand-500 selection:text-white transition-colors duration-300">
  ${getHeaderNav(settings, '/blog', locale)}

  <article class="max-w-4xl mx-auto px-6 py-16">
    <header class="mb-10 text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 text-brand-500 text-xs font-semibold mb-4">
        ${post.category_name ? escapeHtml(post.category_name) : t('category', locale.lang)}
      </div>
      <h1 class="text-3xl md:text-5xl font-black leading-tight mb-6">${escapeHtml(post.title)}</h1>
      
      <div class="flex items-center justify-center gap-4 text-xs text-slate-400 flex-wrap">
        <span>${t('published_on', locale.lang)}${formatDate(post.created_at, locale.lang)}</span>
        <span>•</span>
        <span>${t('author', locale.lang)}: ${escapeHtml(post.author_name || (locale.lang === 'en' ? 'Admin' : 'مدیر سیستم'))}</span>
        ${showViews ? `
        <span>•</span>
        <span>${post.views_count || 0} ${t('views', locale.lang)}</span>
        ` : ''}
        ${showReadingTime ? `
        <span>•</span>
        <span class="text-brand-400 font-semibold flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i> ${readingMinutes} ${t('min_read', locale.lang)}</span>
        ` : ''}
      </div>
    </header>

    ${post.cover_image ? `
      <div class="mb-12 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
        <img src="${escapeHtml(post.cover_image)}" alt="${escapeHtml(post.title)}" class="w-full max-h-[500px] object-cover">
      </div>
    ` : ''}

    <div class="prose dark:prose-invert max-w-none text-base leading-relaxed bg-white dark:bg-slate-900/60 p-8 md:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm mb-16">
      ${post.content || ''}
    </div>

    <section class="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
      <h3 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <i data-lucide="message-square" class="w-6 h-6 text-brand-500"></i>
        ${t('comments', locale.lang)} (${comments.length})
      </h3>

      <div class="space-y-4 mb-10">
        ${comments.length === 0 ? `<p class="text-sm text-slate-400">${t('no_comments', locale.lang)}</p>` : ''}
        ${comments.map(c => `
          <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div class="flex items-center justify-between mb-2">
              <span class="font-bold text-sm text-brand-500">${escapeHtml(c.author_name)}</span>
              <span class="text-xs text-slate-400">${formatDate(c.created_at, locale.lang)}</span>
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${escapeHtml(c.content)}</p>
          </div>
        `).join('')}
      </div>

      <form id="comment-form" class="space-y-4">
        <input type="hidden" name="post_id" value="${post.id}">
        <input type="text" name="honeypot" class="hidden" tabindex="-1" autocomplete="off">

        <h4 class="font-bold text-base">${t('leave_comment', locale.lang)}</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" id="c-name" required placeholder="${t('comment_name', locale.lang)}" class="px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
          <input type="email" id="c-email" placeholder="${t('comment_email', locale.lang)}" class="px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
        </div>
        <textarea id="c-content" required rows="3" placeholder="${t('comment_content', locale.lang)}" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"></textarea>
        <button type="submit" class="bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-brand-500/20 transition">${t('submit_comment', locale.lang)}</button>
      </form>
    </section>
  </article>

  ${getFooter(settings, locale)}
  ${getThemeScript()}

  <script>
    document.getElementById('comment-form')?.addEventListener('submit', async function(e) {
      e.preventDefault();
      var postId = ${post.id};
      var name = document.getElementById('c-name').value;
      var email = document.getElementById('c-email').value;
      var content = document.getElementById('c-content').value;

      try {
        var res = await fetch('/api/comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ post_id: postId, author_name: name, author_email: email, content: content })
        });
        var data = await res.json();
        if (res.ok) {
          alert(data.message || (${JSON.stringify(locale.lang === 'en' ? 'Comment submitted successfully and awaiting approval.' : 'دیدگاه شما با موفقیت ثبت شد.')}));
          if (data.autoApprove) {
            window.location.reload();
          } else {
            document.getElementById('comment-form').reset();
          }
        } else {
          alert((${JSON.stringify(locale.lang === 'en' ? 'Error: ' : 'خطا: ')}) + (data.error || (${JSON.stringify(locale.lang === 'en' ? 'Failed to submit comment.' : 'ثبت نظر ناموفق بود')})));
        }
      } catch (e) {
        alert(${JSON.stringify(locale.lang === 'en' ? 'Connection error' : 'خطا در برقراری ارتباط')});
      }
    });
  </script>
</body>
</html>`;
}

// د: صفحه اختصاصی برگه ایستا/پویا
function renderSinglePage(settings, page, locale = { lang: 'fa', dir: 'rtl', isRTL: true }) {
    return `<!DOCTYPE html>
<html lang="${locale.lang}" dir="${locale.dir}" class="dark">
<head>
  ${getHeadTags(page.title + ' | ' + (settings.site_title || 'CloudPress'), page.title, '', settings, locale)}
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 antialiased selection:bg-brand-500 selection:text-white transition-colors duration-300">
  ${getHeaderNav(settings, '/' + page.slug, locale)}

  <main class="max-w-4xl mx-auto px-6 py-16">
    <header class="mb-10 text-center">
      <h1 class="text-3xl md:text-5xl font-black mb-4">${escapeHtml(page.title)}</h1>
    </header>

    <div class="prose dark:prose-invert max-w-none text-base leading-relaxed bg-white dark:bg-slate-900/60 p-8 md:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
      ${page.content || ''}
    </div>
  </main>

  ${getFooter(settings, locale)}
  ${getThemeScript()}
</body>
</html>`;
}

// هـ: صفحه آرشیو دسته
function renderCategoryPage(settings, category, posts, locale = { lang: 'fa', dir: 'rtl', isRTL: true }) {
    const showReadingTime = settings.show_reading_time !== 'false';
    const showViews = settings.show_views_count !== 'false';

    return `<!DOCTYPE html>
<html lang="${locale.lang}" dir="${locale.dir}" class="dark">
<head>
  ${getHeadTags(category.name + ' | ' + (settings.site_title || 'CloudPress'), category.description || category.name, '', settings, locale)}
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 antialiased selection:bg-brand-500 selection:text-white transition-colors duration-300">
  ${getHeaderNav(settings, '/blog', locale)}

  <main class="max-w-7xl mx-auto px-6 py-16">
    <div class="mb-12">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-500 text-xs font-semibold mb-3">${t('category', locale.lang)}</div>
      <h1 class="text-3xl md:text-4xl font-black mb-2">${escapeHtml(category.name)}</h1>
      <p class="text-slate-500 dark:text-slate-400 text-sm">${escapeHtml(category.description || '')}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      ${posts.length === 0 ? `<div class="col-span-3 py-16 text-center text-slate-400">${t('no_posts', locale.lang)}</div>` : ''}
      ${posts.map(post => `
        <article class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between">
          <div>
            ${post.cover_image ? `<img src="${escapeHtml(post.cover_image)}" alt="${escapeHtml(post.title)}" class="w-full h-48 object-cover">` : ''}
            <div class="p-6">
              <div class="flex items-center gap-3 text-xs text-slate-400 mb-3">
                <span>${formatDate(post.created_at, locale.lang)}</span>
                ${showReadingTime ? `
                <span>•</span>
                <span>${calcReadTime(post.content)} ${t('min_read', locale.lang)}</span>
                ` : ''}
              </div>
              <h3 class="font-bold text-lg mb-3 hover:text-brand-500 transition"><a href="/blog/${post.slug}">${escapeHtml(post.title)}</a></h3>
              <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">${escapeHtml(post.excerpt || '')}</p>
            </div>
          </div>
          <div class="px-6 py-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            ${showViews ? `<span>${post.views_count || 0} ${t('views', locale.lang)}</span>` : '<span></span>'}
            <a href="/blog/${post.slug}" class="text-brand-500 font-bold flex items-center gap-1">${t('read_more', locale.lang)} <i data-lucide="${locale.isRTL ? 'arrow-left' : 'arrow-right'}" class="w-3.5 h-3.5"></i></a>
          </div>
        </article>
      `).join('')}
    </div>
  </main>

  ${getFooter(settings, locale)}
  ${getThemeScript()}
</body>
</html>`;
}

// و: صفحه ۴۰۴
function render404Page(settings, locale = { lang: 'fa', dir: 'rtl', isRTL: true }) {
    return `<!DOCTYPE html>
<html lang="${locale.lang}" dir="${locale.dir}" class="dark">
<head>
  ${getHeadTags(t('page_not_found', locale.lang) + ' | 404', '', '', settings, locale)}
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 antialiased selection:bg-brand-500 selection:text-white flex flex-col min-h-screen justify-between">
  ${getHeaderNav(settings, '', locale)}

  <div class="max-w-md mx-auto text-center px-6 py-20">
    <div class="text-8xl font-black bg-gradient-to-r from-brand-500 to-indigo-500 bg-clip-text text-transparent mb-4">404</div>
    <h2 class="text-2xl font-bold mb-3">${t('page_not_found', locale.lang)}</h2>
    <p class="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">${t('page_not_found_desc', locale.lang)}</p>
    <a href="/" class="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-brand-500/25 transition">
      <i data-lucide="home" class="w-4 h-4"></i>
      <span>${t('back_to_home', locale.lang)}</span>
    </a>
  </div>

  ${getFooter(settings, locale)}
  ${getThemeScript()}
</body>
</html>`;
}

// =========================================================================
// 9. صفحه ورود اختصاصی ادمین (Login Page)
// =========================================================================
function getLoginHTML(locale = { lang: 'fa', dir: 'rtl', isRTL: true }) {
    const isEn = locale.lang === 'en';
    return `<!DOCTYPE html>
<html lang="${locale.lang}" dir="${locale.dir}" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isEn ? 'Admin Login | CloudPress' : 'ورود به مدیریت | CloudPress'}</title>
  
  <!-- Tailwind CSS Warning Suppress -->
  <script>
    const origWarnLog = console.warn;
    console.warn = function(...args) {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('cdn.tailwindcss.com')) return;
      origWarnLog.apply(console, args);
    };
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: { extend: { colors: { brand: { 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8' } } } }
    }
  </script>
  ${isEn ? `
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>body { font-family: 'Inter', sans-serif; }</style>
  ` : `
  <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
  <style>body { font-family: 'Vazirmatn', sans-serif; }</style>
  `}
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-slate-950 text-slate-100 flex items-center justify-center min-h-screen p-6 relative overflow-hidden">
  
  <!-- Language Toggle in Login -->
  <div class="absolute top-6 ${isEn ? 'right-6' : 'left-6'} z-20">
    <a href="?lang=${isEn ? 'fa' : 'en'}" class="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition">
      <i data-lucide="globe" class="w-3.5 h-3.5 text-brand-500"></i>
      <span>${isEn ? 'فارسی' : 'English'}</span>
    </a>
  </div>

  <div class="absolute w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none"></div>

  <div class="max-w-md w-full bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl relative z-10">
    <div class="text-center mb-8">
      <div class="inline-flex p-3 bg-brand-600 rounded-2xl text-white shadow-lg shadow-brand-500/30 mb-4">
        <i data-lucide="zap" class="w-8 h-8"></i>
      </div>
      <h1 class="text-2xl font-black tracking-tight">${isEn ? 'CloudPress Admin Login' : 'ورود به مدیریت CloudPress'}</h1>
      <p class="text-slate-400 text-xs mt-2">${isEn ? 'Sign in to manage your website, articles, and settings' : 'برای مدیریت سایت و تولید محتوا وارد حساب خود شوید'}</p>
    </div>

    <form id="login-form" class="space-y-4">
      <div>
        <label class="block text-xs font-semibold text-slate-400 mb-2">${isEn ? 'Username or Email' : 'نام کاربری یا ایمیل'}</label>
        <div class="relative">
          <i data-lucide="user" class="w-4 h-4 absolute ${isEn ? 'left-3.5' : 'right-3.5'} top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input type="text" id="username" required value="admin" class="w-full ${isEn ? 'pl-10 pr-4 text-left' : 'pr-10 pl-4 text-right'} py-2.5 bg-slate-800/80 border border-slate-700/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-white">
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-400 mb-2">${isEn ? 'Password' : 'کلمه عبور'}</label>
        <div class="relative">
          <i data-lucide="lock" class="w-4 h-4 absolute ${isEn ? 'left-3.5' : 'right-3.5'} top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input type="password" id="password" required value="admin123" class="w-full ${isEn ? 'pl-10 pr-4 text-left' : 'pr-10 pl-4 text-right'} py-2.5 bg-slate-800/80 border border-slate-700/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-white">
        </div>
      </div>

      <div id="login-alert" class="hidden p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs"></div>

      <button type="submit" id="submit-btn" class="w-full py-3 bg-brand-600 hover:bg-brand-700 font-bold rounded-xl text-white shadow-lg shadow-brand-500/25 transition flex items-center justify-center gap-2">
        <span>${isEn ? 'Sign In' : 'ورود به سامانه'}</span>
        <i data-lucide="${isEn ? 'arrow-right' : 'arrow-left'}" class="w-4 h-4"></i>
      </button>
    </form>

    <div class="mt-6 text-center text-xs text-slate-500">
      ${isEn ? 'Default credentials: ' : 'اطلاعات ورود پیش‌فرض: '}<span class="font-mono text-slate-400">admin / admin123</span>
    </div>
  </div>

  <script>
    lucide.createIcons();
    document.getElementById('login-form').addEventListener('submit', async function(e) {
      e.preventDefault();
      var btn = document.getElementById('submit-btn');
      var alertBox = document.getElementById('login-alert');
      alertBox.classList.add('hidden');
      btn.disabled = true;
      btn.innerText = ${JSON.stringify(isEn ? 'Signing in...' : 'در حال بررسی...')};

      try {
        var res = await fetch('/admin/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
          })
        });
        if (res.ok) {
          window.location.href = '/admin';
        } else {
          var data = await res.json();
          alertBox.innerText = data.error || ${JSON.stringify(isEn ? 'Login failed.' : 'ورود ناموفق بود.')};
          alertBox.classList.remove('hidden');
          btn.disabled = false;
          btn.innerHTML = '<span>' + ${JSON.stringify(isEn ? 'Sign In' : 'ورود به سامانه')} + '</span>';
          lucide.createIcons();
        }
      } catch (err) {
        alertBox.innerText = ${JSON.stringify(isEn ? 'Connection error' : 'خطا در ارتباط با سرور')};
        alertBox.classList.remove('hidden');
        btn.disabled = false;
        btn.innerHTML = '<span>' + ${JSON.stringify(isEn ? 'Sign In' : 'ورود به سامانه')} + '</span>';
      }
    });
  </script>
</body>
</html>`;
}

// =========================================================================
// 10. پنل مدیریت پیشرفته و ویرایشگر دیداری گرافیکی (Admin SPA + WYSIWYG)
// =========================================================================
function getAdminHTML(authUser) {
    return `<!DOCTYPE html>
<html lang="fa" dir="rtl" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>داشبورد مدیریت | CloudPress</title>
  
  <!-- Tailwind CSS Warning Suppress -->
  <script>
    const origWarnAdmin = console.warn;
    console.warn = function(...args) {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('cdn.tailwindcss.com')) return;
      origWarnAdmin.apply(console, args);
    };
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#eff6ff',
              100: '#dbeafe',
              500: '#3b82f6',
              600: '#2563eb',
              700: '#1d4ed8',
            }
          }
        }
      }
    }
  </script>

  <!-- Fonts: Vazirmatn & Inter -->
  <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <!-- Quill.js Rich WYSIWYG Editor -->
  <link href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js"></script>

  <style>
    body { font-family: 'Vazirmatn', sans-serif; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #475569; border-radius: 3px; }
    /* Quill Editor Dark Theme & Persian RTL Polish */
    .ql-toolbar.ql-snow { border-radius: 0.75rem 0.75rem 0 0; background: rgba(30, 41, 59, 0.7); border-color: rgba(51, 65, 85, 0.8) !important; padding: 8px 12px; }
    .ql-container.ql-snow { border-radius: 0 0 0.75rem 0.75rem; border-color: rgba(51, 65, 85, 0.8) !important; font-family: inherit !important; font-size: 0.95rem; min-height: 250px; }
    .ql-editor { direction: rtl; text-align: right; line-height: 1.8; padding: 16px 20px; }
    .ql-editor.ql-blank::before { right: 20px; left: auto; font-style: normal; color: #64748b; text-align: right; }
    
    /* Toolbar Sizing & Icons */
    .ql-toolbar.ql-snow button { width: 30px !important; height: 30px !important; padding: 4px !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; }
    .ql-toolbar.ql-snow button svg { width: 18px !important; height: 18px !important; }
    .ql-toolbar.ql-snow .ql-picker { height: 30px !important; }
    .ql-toolbar.ql-snow .ql-picker-label { display: inline-flex !important; align-items: center !important; height: 100% !important; padding: 2px 6px !important; }
    .ql-toolbar.ql-snow .ql-picker-label svg { width: 18px !important; height: 18px !important; }
    .ql-toolbar.ql-snow .ql-picker.ql-align { width: 36px !important; }
    .ql-toolbar.ql-snow .ql-picker.ql-direction { width: 36px !important; }
    .ql-toolbar.ql-snow .ql-color, .ql-toolbar.ql-snow .ql-background { width: 32px !important; }
    .ql-toolbar.ql-snow .ql-header { width: 100px !important; }

    /* Dark Mode Icons & Dropdowns */
    .dark .ql-snow .ql-stroke { stroke: #94a3b8 !important; }
    .dark .ql-snow .ql-fill { fill: #94a3b8 !important; }
    .dark .ql-snow .ql-picker { color: #94a3b8 !important; }
    .dark .ql-snow button:hover .ql-stroke, .dark .ql-snow button.ql-active .ql-stroke { stroke: #38bdf8 !important; }
    .dark .ql-snow button:hover .ql-fill, .dark .ql-snow button.ql-active .ql-fill { fill: #38bdf8 !important; }
    .dark .ql-snow .ql-picker-label:hover, .dark .ql-snow .ql-picker-label.ql-active { color: #38bdf8 !important; }
    .dark .ql-snow .ql-picker-label:hover .ql-stroke { stroke: #38bdf8 !important; }

    /* Fix Picker Dropdowns Background in Dark Mode */
    .ql-snow .ql-picker-options { background-color: #0f172a !important; border: 1px solid #334155 !important; border-radius: 0.75rem !important; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.6) !important; padding: 6px !important; z-index: 99 !important; }
    .ql-snow .ql-picker-item { color: #cbd5e1 !important; border-radius: 0.375rem !important; padding: 5px 10px !important; }
    .ql-snow .ql-picker-item:hover, .ql-snow .ql-picker-item.ql-selected { background-color: #1e293b !important; color: #38bdf8 !important; }

    /* Fix Link & Media Tooltips in Dark Mode */
    .ql-snow .ql-tooltip { background-color: #0f172a !important; border: 1px solid #334155 !important; border-radius: 0.75rem !important; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.6) !important; color: #f1f5f9 !important; padding: 10px 14px !important; z-index: 99 !important; }
    .ql-snow .ql-tooltip input[type=text] { background-color: #1e293b !important; border: 1px solid #475569 !important; color: #f8fafc !important; border-radius: 0.5rem !important; padding: 5px 10px !important; outline: none !important; font-family: sans-serif; }
    .ql-snow .ql-tooltip a.ql-action::after { color: #38bdf8 !important; font-weight: bold; }
    .ql-snow .ql-tooltip a.ql-remove::before { color: #f43f5e !important; }

    /* Fix List Numbers & Bullets Overlapping in Persian RTL */
    .ql-editor ol, .ql-editor ul { padding-right: 2.2rem !important; padding-left: 0 !important; }
    .ql-editor li { padding-right: 0.25rem !important; padding-left: 0 !important; }
    .ql-editor li:not(.ql-direction-ltr)::before {
      margin-right: -2rem !important;
      margin-left: 0 !important;
      text-align: left !important;
      float: right !important;
      width: 1.5em !important;
      position: relative !important;
    }
    .ql-editor li.ql-direction-ltr {
      padding-left: 1.8rem !important;
      padding-right: 0 !important;
      direction: ltr !important;
      text-align: left !important;
    }
    .ql-editor li.ql-direction-ltr::before {
      margin-left: -1.8rem !important;
      margin-right: 0 !important;
      text-align: right !important;
      float: left !important;
    }

    /* RTL Blockquotes & Code Blocks */
    .ql-editor blockquote { border-right: 4px solid #3b82f6 !important; border-left: none !important; padding-right: 16px !important; padding-left: 0 !important; color: #94a3b8 !important; font-style: italic; margin: 1rem 0; }
    .ql-editor pre.ql-syntax { background-color: #020617 !important; color: #38bdf8 !important; border: 1px solid #1e293b; border-radius: 0.75rem !important; padding: 1rem !important; font-family: monospace !important; direction: ltr !important; text-align: left !important; overflow-x: auto; margin: 1rem 0; }
    .ql-editor img { max-width: 100%; border-radius: 0.75rem; margin: 1rem auto; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
    .ql-editor h1 { font-size: 1.85rem; font-weight: 800; margin-bottom: 0.75rem; color: #f8fafc; }
    .ql-editor h2 { font-size: 1.45rem; font-weight: 700; margin-bottom: 0.5rem; color: #f8fafc; }
    .ql-editor h3 { font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem; color: #f8fafc; }
    .ql-editor a { color: #38bdf8 !important; text-decoration: underline; }

    /* Admin LTR Layout Adaptation Rules */
    [dir="ltr"] #sidebar { left: 0; right: auto; border-left: none; border-right: 1px solid #1e293b; }
    [dir="ltr"] .text-left { text-align: left; }
    [dir="ltr"] .text-right { text-align: right; }
    [dir="ltr"] input:not([type=checkbox]), [dir="ltr"] textarea, [dir="ltr"] select { direction: ltr; text-align: left; }
    [dir="ltr"] .ql-editor { direction: ltr; text-align: left; }
    [dir="ltr"] .ql-editor.ql-blank::before { left: 20px; right: auto; text-align: left; }
    [dir="ltr"] .ql-editor blockquote { border-left: 4px solid #3b82f6 !important; border-right: none !important; padding-left: 16px !important; padding-right: 0 !important; }
    [dir="ltr"] .ql-editor ol, [dir="ltr"] .ql-editor ul { padding-left: 2.2rem !important; padding-right: 0 !important; }
    [dir="ltr"] .ql-editor li { padding-left: 0.25rem !important; padding-right: 0 !important; }
    [dir="ltr"] .ql-editor li::before { margin-left: -2rem !important; margin-right: 0 !important; text-align: right !important; float: left !important; width: 1.5em !important; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 antialiased transition-colors duration-300">

  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar Navigation -->
    <aside id="sidebar" class="fixed inset-y-0 right-0 z-50 w-64 bg-slate-900 border-l border-slate-800 transition-transform duration-300 transform translate-x-0 md:relative md:translate-x-0 flex flex-col justify-between">
      <div>
        <div class="h-20 flex items-center justify-between px-6 border-b border-slate-800">
          <a href="/admin" class="flex items-center gap-3">
            <div class="p-2 bg-brand-600 rounded-xl text-white shadow-lg shadow-brand-500/20">
              <i data-lucide="zap" class="w-6 h-6"></i>
            </div>
            <span class="font-black text-lg tracking-wide bg-gradient-to-r from-brand-500 to-indigo-400 bg-clip-text text-transparent">
              CloudPress
            </span>
          </a>
          <button id="close-sidebar-btn" class="md:hidden text-slate-400 hover:text-white">
            <i data-lucide="x" class="w-6 h-6"></i>
          </button>
        </div>

        <nav class="p-4 space-y-1 text-sm font-medium text-slate-400">
          <button onclick="switchTab('dashboard')" id="tab-btn-dashboard" class="nav-tab-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-600/15 text-brand-400 font-bold transition">
            <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
            <span data-i18n="dashboard">داشبورد اصلی</span>
          </button>

          <button onclick="switchTab('posts')" id="tab-btn-posts" class="nav-tab-btn w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-800/60 hover:text-white transition">
            <div class="flex items-center gap-3">
              <i data-lucide="file-text" class="w-5 h-5"></i>
              <span data-i18n="posts">نوشته‌ها و مقالات</span>
            </div>
            <span id="badge-posts-count" class="bg-slate-800 text-xs px-2 py-0.5 rounded-full">...</span>
          </button>

          <button onclick="switchTab('pages')" id="tab-btn-pages" class="nav-tab-btn w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-800/60 hover:text-white transition">
            <div class="flex items-center gap-3">
              <i data-lucide="layers" class="w-5 h-5"></i>
              <span data-i18n="pages">برگه‌ها</span>
            </div>
            <span id="badge-pages-count" class="bg-slate-800 text-xs px-2 py-0.5 rounded-full">...</span>
          </button>

          <button onclick="switchTab('categories')" id="tab-btn-categories" class="nav-tab-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/60 hover:text-white transition">
            <i data-lucide="tag" class="w-5 h-5"></i>
            <span data-i18n="categories">دسته‌بندی‌ها</span>
          </button>

          <button onclick="switchTab('media')" id="tab-btn-media" class="nav-tab-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/60 hover:text-white transition">
            <i data-lucide="image" class="w-5 h-5"></i>
            <span data-i18n="media">رسانه‌خانه (تصاویر)</span>
          </button>

          <button onclick="switchTab('comments')" id="tab-btn-comments" class="nav-tab-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/60 hover:text-white transition">
            <i data-lucide="message-square" class="w-5 h-5"></i>
            <span data-i18n="comments">دیدگاه‌ها</span>
          </button>

          <div class="pt-4 pb-1">
            <div class="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider" data-i18n="site_management">مدیریت وبسایت</div>
          </div>

          <button onclick="switchTab('settings')" id="tab-btn-settings" class="nav-tab-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/60 hover:text-white transition">
            <i data-lucide="settings" class="w-5 h-5"></i>
            <span data-i18n="settings">تنظیمات و منوساز</span>
          </button>

          <button onclick="switchTab('profile')" id="tab-btn-profile" class="nav-tab-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/60 hover:text-white transition">
            <i data-lucide="user" class="w-5 h-5"></i>
            <span data-i18n="profile">پروفایل کاربری</span>
          </button>
        </nav>
      </div>

      <div class="p-4 m-4 bg-slate-800/50 rounded-2xl border border-slate-800 text-xs">
        <div class="flex items-center justify-between mb-2">
          <span class="text-slate-400" data-i18n="d1_status">وضعیت پایگاه داده D1</span>
          <span class="text-emerald-400 font-bold flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span data-i18n="d1_connected">آماده و متصل</span>
          </span>
        </div>
        <div class="text-slate-500 text-[11px]" data-i18n="d1_desc">پایگاه داده توزیع شده ابری</div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col h-screen overflow-y-auto">

      <!-- Top Header -->
      <header class="h-20 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 flex items-center justify-between px-6">
        <div class="flex items-center gap-4">
          <button id="open-sidebar-btn" class="md:hidden text-slate-400 hover:text-white">
            <i data-lucide="menu" class="w-6 h-6"></i>
          </button>
          <div class="font-bold text-base text-slate-200" id="current-page-title">داشبورد اصلی</div>
        </div>

        <div class="flex items-center gap-4">
          <!-- Admin Language Switcher -->
          <button id="admin-lang-toggle" onclick="toggleAdminLanguage()" class="p-2 text-slate-300 hover:text-white rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition flex items-center gap-1.5 text-xs font-semibold" title="تغییر زبان / Switch Language">
            <i data-lucide="globe" class="w-4 h-4 text-brand-500"></i>
            <span id="admin-lang-text">English</span>
          </button>

          <a href="/" target="_blank" class="p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition flex items-center gap-2 text-xs font-semibold" title="مشاهده سایت عمومی">
            <i data-lucide="external-link" class="w-4 h-4"></i>
            <span class="hidden sm:inline" data-i18n="view_site">مشاهده سایت</span>
          </a>

          <div class="h-6 w-px bg-slate-800"></div>

          <div class="flex items-center gap-3">
            <div class="text-left hidden sm:block">
              <div class="text-xs font-bold">${escapeHtml(authUser.display_name || authUser.username)}</div>
              <div class="text-[10px] text-slate-400">${escapeHtml(authUser.role || 'مدیر')}</div>
            </div>
            <button onclick="logout()" class="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl transition" title="خروج از حساب">
              <i data-lucide="log-out" class="w-5 h-5"></i>
            </button>
          </div>
        </div>
      </header>

      <!-- Dynamic Tab Views Container -->
      <main class="p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8 flex-1">

        <!-- ================= TAB 1: DASHBOARD ================= -->
        <section id="view-dashboard" class="tab-view space-y-8">
          <div class="rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-white p-6 md:p-8 shadow-xl shadow-brand-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="space-y-2">
              <h2 id="dash-welcome-heading" data-user="${escapeHtml(authUser.display_name || authUser.username)}" class="text-2xl md:text-3xl font-black">سلام ${escapeHtml(authUser.display_name || authUser.username)} عزیز! 🚀</h2>
              <p id="dash-welcome-desc" class="text-brand-100 text-sm max-w-xl leading-relaxed">
                سامانه مدیریت محتوای CloudPress آماده انتشار مقالات و مدیریت برگه‌ها بر بستر شبکه فوق‌سریع Edge است.
              </p>
            </div>
            <div class="flex flex-wrap gap-3">
              <button onclick="openPostModal()" class="bg-white text-brand-600 font-bold px-5 py-2.5 rounded-xl text-sm shadow-md hover:bg-brand-50 transition flex items-center gap-2">
                <i data-lucide="plus-circle" class="w-4 h-4"></i>
                نوشته جدید
              </button>
              <button onclick="openPageModal()" class="bg-brand-700/60 hover:bg-brand-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition flex items-center gap-2">
                <i data-lucide="file-plus" class="w-4 h-4"></i>
                برگه جدید
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div class="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div class="flex items-center justify-between text-slate-400 mb-3">
                <span class="text-xs font-semibold">تعداد مقالات</span>
                <div class="p-2 bg-blue-500/10 text-blue-400 rounded-xl"><i data-lucide="file-text" class="w-5 h-5"></i></div>
              </div>
              <div class="text-3xl font-black" id="stat-posts-count">0</div>
              <div class="text-xs text-slate-400 mt-2">مقالات منتشر شده و پیش‌نویس</div>
            </div>

            <div class="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div class="flex items-center justify-between text-slate-400 mb-3">
                <span class="text-xs font-semibold">تعداد برگه‌ها</span>
                <div class="p-2 bg-purple-500/10 text-purple-400 rounded-xl"><i data-lucide="layers" class="w-5 h-5"></i></div>
              </div>
              <div class="text-3xl font-black" id="stat-pages-count">0</div>
              <div class="text-xs text-slate-400 mt-2">برگه‌های ایستا و پویا</div>
            </div>

            <div class="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div class="flex items-center justify-between text-slate-400 mb-3">
                <span class="text-xs font-semibold">دیدگاه‌های کاربران</span>
                <div class="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl"><i data-lucide="message-square" class="w-5 h-5"></i></div>
              </div>
              <div class="text-3xl font-black" id="stat-comments-count">0</div>
              <div class="text-xs text-slate-400 mt-2">نظرات ثبت شده</div>
            </div>

            <div class="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div class="flex items-center justify-between text-slate-400 mb-3">
                <span class="text-xs font-semibold">مجموع بازدیدها</span>
                <div class="p-2 bg-amber-500/10 text-amber-400 rounded-xl"><i data-lucide="eye" class="w-5 h-5"></i></div>
              </div>
              <div class="text-3xl font-black" id="stat-views-count">0</div>
              <div class="text-xs text-emerald-400 mt-2 flex items-center gap-1"><i data-lucide="zap" class="w-3.5 h-3.5"></i> آمار لبه شبکه</div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-slate-900 rounded-3xl border border-slate-800 p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-lg">آخرین مقالات نوشته شده</h3>
                <button onclick="switchTab('posts')" class="text-xs text-brand-400 hover:text-brand-300 font-semibold">مشاهده همه</button>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-right text-xs">
                  <tbody id="dash-recent-posts" class="divide-y divide-slate-800/80">
                    <tr><td class="py-4 text-center text-slate-500">در حال بارگذاری...</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="bg-slate-900 rounded-3xl border border-slate-800 p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-lg">دیدگاه‌های اخیر</h3>
                <button onclick="switchTab('comments')" class="text-xs text-brand-400 hover:text-brand-300 font-semibold">مدیریت دیدگاه‌ها</button>
              </div>
              <div id="dash-recent-comments" class="space-y-3 text-xs">
                <div class="py-4 text-center text-slate-500">در حال بارگذاری...</div>
              </div>
            </div>
          </div>
        </section>

        <!-- ================= TAB 2: POSTS ================= -->
        <section id="view-posts" class="tab-view hidden space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-2xl font-black">مدیریت مقالات و نوشته‌ها</h2>
              <p class="text-slate-400 text-xs mt-1">تولید، ویرایش و مدیریت انتشار مقالات وبلاگ</p>
            </div>
            <div class="flex items-center gap-3">
              <!-- Live Filter Search -->
              <div class="relative w-64">
                <i data-lucide="search" class="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input type="text" id="posts-search-input" onkeyup="filterPostsTable(this.value)" placeholder="جستجوی آنی در مقالات..." class="w-full pr-10 pl-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 text-slate-100">
              </div>
              <button onclick="openPostModal()" class="bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-brand-500/20 transition flex items-center gap-2 w-fit">
                <i data-lucide="plus-circle" class="w-4 h-4"></i>
                نوشته جدید
              </button>
            </div>
          </div>

          <div class="bg-slate-900 rounded-3xl border border-slate-800 p-6">
            <div class="overflow-x-auto">
              <table class="w-full text-right text-sm">
                <thead class="bg-slate-800/50 text-slate-400 text-xs font-semibold">
                  <tr>
                    <th class="px-4 py-3 rounded-r-xl">عنوان نوشته</th>
                    <th class="px-4 py-3">دسته‌بندی</th>
                    <th class="px-4 py-3">آدرس پیوند (URL)</th>
                    <th class="px-4 py-3">بازدید</th>
                    <th class="px-4 py-3">وضعیت</th>
                    <th class="px-4 py-3 rounded-l-xl text-left">عملیات</th>
                  </tr>
                </thead>
                <tbody id="posts-table-body" class="divide-y divide-slate-800/80">
                  <tr><td colspan="6" class="px-4 py-8 text-center text-slate-500">در حال دریافت مقالات...</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- ================= TAB 3: PAGES ================= -->
        <section id="view-pages" class="tab-view hidden space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-2xl font-black">مدیریت برگه‌ها</h2>
              <p class="text-slate-400 text-xs mt-1">ایجاد و ویرایش صفحات ایستا و اختصاصی سایت</p>
            </div>
            <div class="flex items-center gap-3">
              <div class="relative w-64">
                <i data-lucide="search" class="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input type="text" id="pages-search-input" onkeyup="filterPagesTable(this.value)" placeholder="جستجوی آنی در برگه‌ها..." class="w-full pr-10 pl-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 text-slate-100">
              </div>
              <button onclick="openPageModal()" class="bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-brand-500/20 transition flex items-center gap-2 w-fit">
                <i data-lucide="plus-circle" class="w-4 h-4"></i>
                برگه جدید
              </button>
            </div>
          </div>

          <div class="bg-slate-900 rounded-3xl border border-slate-800 p-6">
            <div class="overflow-x-auto">
              <table class="w-full text-right text-sm">
                <thead class="bg-slate-800/50 text-slate-400 text-xs font-semibold">
                  <tr>
                    <th class="px-4 py-3 rounded-r-xl">عنوان برگه</th>
                    <th class="px-4 py-3">آدرس پیوند (URL)</th>
                    <th class="px-4 py-3">وضعیت</th>
                    <th class="px-4 py-3 rounded-l-xl text-left">عملیات</th>
                  </tr>
                </thead>
                <tbody id="pages-table-body" class="divide-y divide-slate-800/80">
                  <tr><td colspan="4" class="px-4 py-8 text-center text-slate-500">در حال دریافت برگه‌ها...</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- ================= TAB 4: CATEGORIES ================= -->
        <section id="view-categories" class="tab-view hidden space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-slate-900 rounded-3xl border border-slate-800 p-6 h-fit">
              <h3 class="text-lg font-bold mb-4">افزودن دسته‌بندی جدید</h3>
              <form id="category-form" class="space-y-4 text-xs">
                <div>
                  <label class="block text-slate-400 font-semibold mb-1">نام دسته‌بندی *</label>
                  <input type="text" id="cat-name" required class="w-full px-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-sm focus:ring-2 focus:ring-brand-500">
                </div>
                <div>
                  <label class="block text-slate-400 font-semibold mb-1">آدرس در لینک (URL)</label>
                  <input type="text" id="cat-slug" placeholder="اختیاری - خودکار ساخته می‌شود" class="w-full px-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-sm focus:ring-2 focus:ring-brand-500 dir-ltr text-right">
                </div>
                <div>
                  <label class="block text-slate-400 font-semibold mb-1">توضیحات کوتاه</label>
                  <textarea id="cat-desc" rows="3" class="w-full px-4 py-2 bg-slate-800 rounded-xl border border-slate-700 text-sm focus:ring-2 focus:ring-brand-500"></textarea>
                </div>
                <button type="submit" class="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md transition">افزودن دسته‌بندی</button>
              </form>
            </div>

            <div class="md:col-span-2 bg-slate-900 rounded-3xl border border-slate-800 p-6">
              <h3 class="text-lg font-bold mb-4">لیست دسته‌بندی‌ها</h3>
              <div class="overflow-x-auto">
                <table class="w-full text-right text-sm">
                  <thead class="bg-slate-800/50 text-slate-400 text-xs font-semibold">
                    <tr>
                      <th class="px-4 py-3 rounded-r-xl">نام دسته</th>
                      <th class="px-4 py-3">آدرس لینک</th>
                      <th class="px-4 py-3">تعداد مقالات</th>
                      <th class="px-4 py-3 rounded-l-xl text-left">عملیات</th>
                    </tr>
                  </thead>
                  <tbody id="categories-table-body" class="divide-y divide-slate-800/80">
                    <tr><td colspan="4" class="px-4 py-8 text-center text-slate-500">در حال بارگذاری...</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <!-- ================= TAB 5: MEDIA ================= -->
        <section id="view-media" class="tab-view hidden space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-2xl font-black">رسانه‌خانه (Media Library)</h2>
              <p class="text-slate-400 text-xs mt-1">تصاویر با الگوریتم هوشمند در مرورگر فشرده شده و درون پایگاه داده D1 ذخیره می‌شوند.</p>
            </div>
            <label class="cursor-pointer bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-brand-500/20 transition flex items-center gap-2 w-fit">
              <i data-lucide="upload-cloud" class="w-4 h-4"></i>
              <span>آپلود تصویر جدید (فشرده‌سازی خودکار)</span>
              <input type="file" id="media-file-input" accept="image/*" class="hidden" onchange="uploadImageWithProgress(event)">
            </label>
          </div>

          <div class="bg-slate-900 rounded-3xl border border-slate-800 p-6">
            <div id="media-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div class="col-span-full py-12 text-center text-slate-500">در حال بارگذاری تصاویر...</div>
            </div>
          </div>
        </section>

        <!-- ================= TAB 6: COMMENTS ================= -->
        <section id="view-comments" class="tab-view hidden space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-black">مدیریت دیدگاه‌ها</h2>
              <p class="text-slate-400 text-xs mt-1">بررسی، تایید و مدیریت نظرات کاربران</p>
            </div>
          </div>

          <div class="bg-slate-900 rounded-3xl border border-slate-800 p-6">
            <div class="overflow-x-auto">
              <table class="w-full text-right text-sm">
                <thead class="bg-slate-800/50 text-slate-400 text-xs font-semibold">
                  <tr>
                    <th class="px-4 py-3 rounded-r-xl">نویسنده</th>
                    <th class="px-4 py-3">متن دیدگاه</th>
                    <th class="px-4 py-3">مربوط به مقاله</th>
                    <th class="px-4 py-3">وضعیت</th>
                    <th class="px-4 py-3 rounded-l-xl text-left">عملیات</th>
                  </tr>
                </thead>
                <tbody id="comments-table-body" class="divide-y divide-slate-800/80">
                  <tr><td colspan="5" class="px-4 py-8 text-center text-slate-500">در حال بارگذاری دیدگاه‌ها...</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- ================= TAB 7: SETTINGS & FULL CUSTOMIZATION ================= -->
        <section id="view-settings" class="tab-view hidden space-y-8">
          <div>
            <h2 class="text-2xl font-black">تنظیمات و شخصی‌سازی پیشرفته سایت</h2>
            <p class="text-slate-400 text-xs mt-1">کنترل ۱۰۰٪ بر برندینگ، رنگ‌ها، فونت، بنر صفحه اصلی، منو، شبکه‌های اجتماعی و کدهای اختصاصی</p>
          </div>

          <form id="settings-form" class="space-y-8">
            
            <!-- 1. هویت بصری، لوگو و پالت رنگی -->
            <div class="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-6">
              <h3 class="text-lg font-bold flex items-center gap-2 text-white">
                <i data-lucide="palette" class="w-5 h-5 text-brand-500"></i>
                برندینگ، هویت بصری و رنگ‌بندی داینامیک
              </h3>

              <!-- Logo & Favicon -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Logo -->
                <div class="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/60 space-y-3">
                  <div class="flex items-center justify-between">
                    <label class="text-xs font-bold text-slate-300">لوگوی وب‌سایت</label>
                    <span class="text-[11px] text-slate-400">(در هدر و فوتر نمایش داده می‌شود)</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div id="set-logo-preview" class="w-16 h-16 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden p-1">
                      <span class="text-[10px] text-slate-500">بدون لوگو</span>
                    </div>
                    <div class="flex-1 space-y-2">
                      <input type="text" id="set-logo" placeholder="آدرس یا انتخاب تصویر..." class="w-full px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-700 text-xs focus:ring-2 focus:ring-brand-500 dir-ltr text-right" onchange="updateImagePreview('set-logo', 'set-logo-preview')">
                      <div class="flex items-center gap-2">
                        <button type="button" onclick="openMediaPickerFor('set-logo')" class="px-3 py-1 bg-brand-600/20 text-brand-400 hover:bg-brand-600 hover:text-white rounded-lg text-xs font-semibold transition">
                          انتخاب از رسانه
                        </button>
                        <button type="button" onclick="clearImageField('set-logo', 'set-logo-preview')" class="px-2 py-1 text-slate-400 hover:text-rose-400 text-xs transition">
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Favicon -->
                <div class="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/60 space-y-3">
                  <div class="flex items-center justify-between">
                    <label class="text-xs font-bold text-slate-300">فاوآیکون (Favicon)</label>
                    <span class="text-[11px] text-slate-400">(آیکون تب مرورگر)</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div id="set-favicon-preview" class="w-16 h-16 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden p-1">
                      <span class="text-[10px] text-slate-500">بدون آیکون</span>
                    </div>
                    <div class="flex-1 space-y-2">
                      <input type="text" id="set-favicon" placeholder="آدرس یا انتخاب فاوآیکون..." class="w-full px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-700 text-xs focus:ring-2 focus:ring-brand-500 dir-ltr text-right" onchange="updateImagePreview('set-favicon', 'set-favicon-preview')">
                      <div class="flex items-center gap-2">
                        <button type="button" onclick="openMediaPickerFor('set-favicon')" class="px-3 py-1 bg-brand-600/20 text-brand-400 hover:bg-brand-600 hover:text-white rounded-lg text-xs font-semibold transition">
                          انتخاب از رسانه
                        </button>
                        <button type="button" onclick="clearImageField('set-favicon', 'set-favicon-preview')" class="px-2 py-1 text-slate-400 hover:text-rose-400 text-xs transition">
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Brand Color, Font & Default Language -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <!-- Color -->
                <div class="space-y-3">
                  <label class="block text-xs font-bold text-slate-300">رنگ اصلی برند (Brand Color)</label>
                  <div class="flex items-center gap-3">
                    <input type="color" id="set-brand-color" value="#2563eb" onchange="syncColorInput(this.value)" class="w-11 h-11 p-0.5 rounded-xl bg-slate-800 border border-slate-700 cursor-pointer">
                    <input type="text" id="set-brand-color-text" value="#2563eb" onchange="syncColorPicker(this.value)" class="w-28 px-3 py-2 bg-slate-800 rounded-xl border border-slate-700 text-xs font-mono text-center text-slate-200">
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <button type="button" onclick="applyColorPreset('#2563eb')" class="w-7 h-7 rounded-lg bg-blue-600 border border-white/20 shadow-sm" title="Blue"></button>
                      <button type="button" onclick="applyColorPreset('#7c3aed')" class="w-7 h-7 rounded-lg bg-purple-600 border border-white/20 shadow-sm" title="Purple"></button>
                      <button type="button" onclick="applyColorPreset('#059669')" class="w-7 h-7 rounded-lg bg-emerald-600 border border-white/20 shadow-sm" title="Emerald"></button>
                      <button type="button" onclick="applyColorPreset('#e11d48')" class="w-7 h-7 rounded-lg bg-rose-600 border border-white/20 shadow-sm" title="Rose"></button>
                      <button type="button" onclick="applyColorPreset('#ea580c')" class="w-7 h-7 rounded-lg bg-orange-600 border border-white/20 shadow-sm" title="Orange"></button>
                    </div>
                  </div>
                </div>

                <!-- Font Family -->
                <div class="space-y-3">
                  <label class="block text-xs font-bold text-slate-300">فونت پیش‌فرض وب‌سایت</label>
                  <select id="set-font-family" class="w-full px-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-sm focus:ring-2 focus:ring-brand-500 text-slate-200">
                    <option value="Vazirmatn">فونت وزیرمتن (Vazirmatn)</option>
                    <option value="Shabnam">فونت شبنم (Shabnam)</option>
                    <option value="Sahel">فونت ساحل (Sahel)</option>
                  </select>
                </div>

                <!-- Default Language -->
                <div class="space-y-3">
                  <label class="block text-xs font-bold text-slate-300">زبان پیش‌فرض سایت (Default Language)</label>
                  <select id="set-site-language" class="w-full px-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-sm focus:ring-2 focus:ring-brand-500 text-slate-200">
                    <option value="fa">فارسی (Persian - RTL)</option>
                    <option value="en">English (LTR)</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- 2. بنر و بخش Hero صفحه نخست -->
            <div class="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-6">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-bold flex items-center gap-2 text-white">
                  <i data-lucide="sparkles" class="w-5 h-5 text-amber-400"></i>
                  شخصی‌سازی بنر و بخش Hero صفحه نخست
                </h3>
                <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                  <input type="checkbox" id="set-hero-enabled" class="rounded bg-slate-800 border-slate-700 text-brand-600 focus:ring-0 w-4 h-4">
                  <span>نمایش بنر Hero</span>
                </label>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-400 mb-1">نشان بالای عنوان (Badge Text)</label>
                  <input type="text" id="set-hero-badge" placeholder="مثال: نسل جدید وب‌سایت‌ها با سرعت نور" class="w-full px-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-sm focus:ring-2 focus:ring-brand-500">
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-400 mb-1">تیتر اصلی بنر (Headline)</label>
                  <input type="text" id="set-hero-title" placeholder="مدیریت محتوای فوق‌سریع و هوشمند بر لبه شبکه" class="w-full px-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-sm focus:ring-2 focus:ring-brand-500">
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-400 mb-1">توضیحات و زیرعنوان بنر (Subtitle)</label>
                <textarea id="set-hero-subtitle" rows="2" placeholder="متن توضیحی معرفی محصول یا خدمات شما..." class="w-full px-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-sm focus:ring-2 focus:ring-brand-500"></textarea>
              </div>

              <!-- Buttons 1 & 2 -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-800/40 rounded-2xl border border-slate-700/40">
                <div class="space-y-3">
                  <div class="text-xs font-bold text-brand-400">دکمه اول (اقدام اصلی)</div>
                  <input type="text" id="set-hero-btn1-text" placeholder="متن دکمه (مثال: ورود به مدیریت)" class="w-full px-3 py-2 bg-slate-800 rounded-xl border border-slate-700 text-xs">
                  <input type="text" id="set-hero-btn1-url" placeholder="لینک دکمه (مثال: /admin)" class="w-full px-3 py-2 bg-slate-800 rounded-xl border border-slate-700 text-xs dir-ltr text-right">
                </div>
                <div class="space-y-3">
                  <div class="text-xs font-bold text-slate-300">دکمه دوم (اقدام فرعی)</div>
                  <input type="text" id="set-hero-btn2-text" placeholder="متن دکمه (مثال: مشاهده وبلاگ)" class="w-full px-3 py-2 bg-slate-800 rounded-xl border border-slate-700 text-xs">
                  <input type="text" id="set-hero-btn2-url" placeholder="لینک دکمه (مثال: /blog)" class="w-full px-3 py-2 bg-slate-800 rounded-xl border border-slate-700 text-xs dir-ltr text-right">
                </div>
              </div>

              <!-- Hero Image -->
              <div class="space-y-2">
                <label class="block text-xs font-semibold text-slate-400">تصویر یا بنر گرافیکی Hero (اختیاری)</label>
                <div class="flex items-center gap-3">
                  <input type="text" id="set-hero-image" placeholder="آدرس تصویر یا انتخاب از رسانه‌خانه..." class="flex-1 px-4 py-2 bg-slate-800 rounded-xl border border-slate-700 text-xs dir-ltr text-right" onchange="updateImagePreview('set-hero-image', 'set-hero-preview')">
                  <button type="button" onclick="openMediaPickerFor('set-hero-image')" class="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700 transition">
                    انتخاب از رسانه
                  </button>
                  <button type="button" onclick="clearImageField('set-hero-image', 'set-hero-preview')" class="px-3 py-2 text-rose-400 hover:bg-rose-500/10 rounded-xl text-xs transition">
                    حذف
                  </button>
                </div>
                <div id="set-hero-preview" class="hidden mt-2 max-w-sm rounded-xl overflow-hidden border border-slate-700 max-h-36"></div>
              </div>
            </div>

            <!-- 3. شخصی‌سازی کارت‌های ویژگی صفحه نخست (Features Grid) -->
            <div class="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-6">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-bold flex items-center gap-2 text-white">
                  <i data-lucide="layout-grid" class="w-5 h-5 text-teal-400"></i>
                  کارت‌های ویژگی و خدمات صفحه نخست (Features Grid)
                </h3>
                <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                  <input type="checkbox" id="set-features-enabled" class="rounded bg-slate-800 border-slate-700 text-brand-600 focus:ring-0 w-4 h-4">
                  <span>نمایش کارت‌های ویژگی</span>
                </label>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-400 mb-1">تیتر بخش ویژگی‌ها (اختیاری)</label>
                  <input type="text" id="set-features-title" placeholder="مثال: چرا خدمات ما را انتخاب کنید؟" class="w-full px-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-sm focus:ring-2 focus:ring-brand-500">
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-400 mb-1">زیرعنوان بخش ویژگی‌ها (اختیاری)</label>
                  <input type="text" id="set-features-subtitle" placeholder="مثال: ارائه بالاترین کیفیت و رضایت برای مشتریان" class="w-full px-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-sm focus:ring-2 focus:ring-brand-500">
                </div>
              </div>

              <!-- 3 Feature Cards Config -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Card 1 -->
                <div class="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50 space-y-3">
                  <div class="text-xs font-bold text-brand-400 flex items-center justify-between">
                    <span>کارت اول</span>
                    <span class="text-[10px] text-slate-500">آیکون و متن</span>
                  </div>
                  <div>
                    <label class="block text-[11px] text-slate-400 mb-1">عنوان کارت</label>
                    <input type="text" id="set-feat1-title" placeholder="سرعت و عملکرد بالا" class="w-full px-3 py-2 bg-slate-900 rounded-xl border border-slate-700 text-xs">
                  </div>
                  <div>
                    <label class="block text-[11px] text-slate-400 mb-1">توضیحات کارت</label>
                    <textarea id="set-feat1-desc" rows="2" placeholder="توضیح کوتاه این ویژگی..." class="w-full px-3 py-2 bg-slate-900 rounded-xl border border-slate-700 text-xs"></textarea>
                  </div>
                  <div>
                    <label class="block text-[11px] text-slate-400 mb-1">نام آیکون Lucide</label>
                    <input type="text" id="set-feat1-icon" placeholder="zap" class="w-full px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-700 text-xs dir-ltr text-right">
                  </div>
                </div>

                <!-- Card 2 -->
                <div class="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50 space-y-3">
                  <div class="text-xs font-bold text-purple-400 flex items-center justify-between">
                    <span>کارت دوم</span>
                    <span class="text-[10px] text-slate-500">آیکون و متن</span>
                  </div>
                  <div>
                    <label class="block text-[11px] text-slate-400 mb-1">عنوان کارت</label>
                    <input type="text" id="set-feat2-title" placeholder="امنیت و کیفیت استاندارد" class="w-full px-3 py-2 bg-slate-900 rounded-xl border border-slate-700 text-xs">
                  </div>
                  <div>
                    <label class="block text-[11px] text-slate-400 mb-1">توضیحات کارت</label>
                    <textarea id="set-feat2-desc" rows="2" placeholder="توضیح کوتاه این ویژگی..." class="w-full px-3 py-2 bg-slate-900 rounded-xl border border-slate-700 text-xs"></textarea>
                  </div>
                  <div>
                    <label class="block text-[11px] text-slate-400 mb-1">نام آیکون Lucide</label>
                    <input type="text" id="set-feat2-icon" placeholder="shield" class="w-full px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-700 text-xs dir-ltr text-right">
                  </div>
                </div>

                <!-- Card 3 -->
                <div class="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50 space-y-3">
                  <div class="text-xs font-bold text-emerald-400 flex items-center justify-between">
                    <span>کارت سوم</span>
                    <span class="text-[10px] text-slate-500">آیکون و متن</span>
                  </div>
                  <div>
                    <label class="block text-[11px] text-slate-400 mb-1">عنوان کارت</label>
                    <input type="text" id="set-feat3-title" placeholder="شخصی‌سازی و نوآوری" class="w-full px-3 py-2 bg-slate-900 rounded-xl border border-slate-700 text-xs">
                  </div>
                  <div>
                    <label class="block text-[11px] text-slate-400 mb-1">توضیحات کارت</label>
                    <textarea id="set-feat3-desc" rows="2" placeholder="توضیح کوتاه این ویژگی..." class="w-full px-3 py-2 bg-slate-900 rounded-xl border border-slate-700 text-xs"></textarea>
                  </div>
                  <div>
                    <label class="block text-[11px] text-slate-400 mb-1">نام آیکون Lucide</label>
                    <input type="text" id="set-feat3-icon" placeholder="sparkles" class="w-full px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-700 text-xs dir-ltr text-right">
                  </div>
                </div>
              </div>
              <div class="text-[11px] text-slate-500 bg-slate-800/30 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2 flex-wrap">
                <span class="font-bold text-slate-400">آیکون‌های پیشنهادی:</span>
                <code class="text-brand-400">zap</code>
                <code class="text-brand-400">shield</code>
                <code class="text-brand-400">sparkles</code>
                <code class="text-brand-400">star</code>
                <code class="text-brand-400">heart</code>
                <code class="text-brand-400">rocket</code>
                <code class="text-brand-400">award</code>
                <code class="text-brand-400">check-circle</code>
                <code class="text-brand-400">users</code>
                <code class="text-brand-400">layers</code>
                <code class="text-brand-400">globe</code>
                <code class="text-brand-400">cpu</code>
                <span class="text-slate-500">(یا هر نام آیکون معتبر از کتابخانه Lucide)</span>
              </div>
            </div>

            <!-- 4. هویت عمومی و سئو -->
            <div class="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-4">
              <h3 class="text-lg font-bold flex items-center gap-2 text-white">
                <i data-lucide="globe" class="w-5 h-5 text-indigo-400"></i>
                اطلاعات عمومی وب‌سایت و سئو
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-400 mb-1">عنوان سایت *</label>
                  <input type="text" id="set-title" required class="w-full px-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-sm focus:ring-2 focus:ring-brand-500">
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-400 mb-1">شعار سایت (Tagline)</label>
                  <input type="text" id="set-tagline" class="w-full px-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-sm focus:ring-2 focus:ring-brand-500">
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-400 mb-1">توضیحات متای سئو (برای نتایج جستجوی گوگل)</label>
                <textarea id="set-desc" rows="2" class="w-full px-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-sm focus:ring-2 focus:ring-brand-500"></textarea>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-400 mb-1">متن کپی‌رایت فوتر</label>
                <input type="text" id="set-footer" class="w-full px-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-sm focus:ring-2 focus:ring-brand-500">
              </div>
            </div>

            <!-- 5. منوساز هوشمند هدر -->
            <div class="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-4">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 class="text-lg font-bold flex items-center gap-2 text-white">
                    <i data-lucide="menu" class="w-5 h-5 text-emerald-400"></i>
                    منوساز هوشمند هدر (Header Navigation)
                  </h3>
                  <p class="text-xs text-slate-400 mt-0.5">افزودن سریع برگه، دسته‌بندی یا لینک اختصاصی به منوی بالای سایت</p>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                  <select id="quick-add-page-select" onchange="quickAddPageToMenu(this)" class="bg-slate-800 text-xs px-3 py-2 rounded-xl border border-slate-700 text-brand-400">
                    <option value="">+ افزودن از برگه‌ها</option>
                  </select>
                  <select id="quick-add-cat-select" onchange="quickAddCatToMenu(this)" class="bg-slate-800 text-xs px-3 py-2 rounded-xl border border-slate-700 text-purple-400">
                    <option value="">+ افزودن از دسته‌ها</option>
                  </select>
                  <button type="button" onclick="addMenuItem()" class="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl text-slate-300 font-semibold flex items-center gap-1">
                    <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                    لینک دلخواه
                  </button>
                </div>
              </div>
              <div id="menu-items-container" class="space-y-2 pt-2"></div>
            </div>

            <!-- 6. شبکه‌های اجتماعی و پیام‌رسان‌ها (نمایش انتخابی) -->
            <div class="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-4">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 class="text-lg font-bold flex items-center gap-2 text-white">
                  <i data-lucide="share-2" class="w-5 h-5 text-sky-400"></i>
                  شبکه‌های اجتماعی و پیام‌رسان‌ها (نمایش انتخابی در فوتر)
                </h3>
                <span class="text-xs text-slate-400">فقط مواردی که تیک فعال دارند در سایت نمایش داده می‌شوند</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <!-- Telegram -->
                <div class="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-200 flex items-center gap-1.5">${SOCIAL_ICONS.telegram} تلگرام</span>
                    <label class="flex items-center gap-1 cursor-pointer text-[11px] text-slate-400"><input type="checkbox" id="set-social-telegram-enabled" class="rounded bg-slate-900 border-slate-700 text-brand-600 focus:ring-0"> <span>فعال</span></label>
                  </div>
                  <input type="text" id="set-social-telegram" placeholder="https://t.me/yourchannel" class="w-full px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-700 dir-ltr text-right text-xs">
                </div>
                <!-- Instagram -->
                <div class="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-200 flex items-center gap-1.5">${SOCIAL_ICONS.instagram} اینستاگرام</span>
                    <label class="flex items-center gap-1 cursor-pointer text-[11px] text-slate-400"><input type="checkbox" id="set-social-instagram-enabled" class="rounded bg-slate-900 border-slate-700 text-brand-600 focus:ring-0"> <span>فعال</span></label>
                  </div>
                  <input type="text" id="set-social-instagram" placeholder="https://instagram.com/yourpage" class="w-full px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-700 dir-ltr text-right text-xs">
                </div>
                <!-- X / Twitter -->
                <div class="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-200 flex items-center gap-1.5">${SOCIAL_ICONS.twitter} توییتر / X</span>
                    <label class="flex items-center gap-1 cursor-pointer text-[11px] text-slate-400"><input type="checkbox" id="set-social-twitter-enabled" class="rounded bg-slate-900 border-slate-700 text-brand-600 focus:ring-0"> <span>فعال</span></label>
                  </div>
                  <input type="text" id="set-social-twitter" placeholder="https://x.com/yourusername" class="w-full px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-700 dir-ltr text-right text-xs">
                </div>
                <!-- WhatsApp -->
                <div class="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-200 flex items-center gap-1.5">${SOCIAL_ICONS.whatsapp} واتساپ</span>
                    <label class="flex items-center gap-1 cursor-pointer text-[11px] text-slate-400"><input type="checkbox" id="set-social-whatsapp-enabled" class="rounded bg-slate-900 border-slate-700 text-brand-600 focus:ring-0"> <span>فعال</span></label>
                  </div>
                  <input type="text" id="set-social-whatsapp" placeholder="https://wa.me/98912..." class="w-full px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-700 dir-ltr text-right text-xs">
                </div>
                <!-- Discord -->
                <div class="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-200 flex items-center gap-1.5">${SOCIAL_ICONS.discord} دیسکورد / Discord</span>
                    <label class="flex items-center gap-1 cursor-pointer text-[11px] text-slate-400"><input type="checkbox" id="set-social-discord-enabled" class="rounded bg-slate-900 border-slate-700 text-brand-600 focus:ring-0"> <span>فعال</span></label>
                  </div>
                  <input type="text" id="set-social-discord" placeholder="https://discord.gg/yourserver" class="w-full px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-700 dir-ltr text-right text-xs">
                </div>
                <!-- LinkedIn -->
                <div class="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-200 flex items-center gap-1.5"><span class="text-blue-500">${SOCIAL_ICONS.linkedin}</span> لینکدین</span>
                    <label class="flex items-center gap-1 cursor-pointer text-[11px] text-slate-400"><input type="checkbox" id="set-social-linkedin-enabled" class="rounded bg-slate-900 border-slate-700 text-brand-600 focus:ring-0"> <span>فعال</span></label>
                  </div>
                  <input type="text" id="set-social-linkedin" placeholder="https://linkedin.com/in/..." class="w-full px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-700 dir-ltr text-right text-xs">
                </div>
                <!-- YouTube -->
                <div class="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-200 flex items-center gap-1.5"><span class="text-red-500">${SOCIAL_ICONS.youtube}</span> یوتیوب</span>
                    <label class="flex items-center gap-1 cursor-pointer text-[11px] text-slate-400"><input type="checkbox" id="set-social-youtube-enabled" class="rounded bg-slate-900 border-slate-700 text-brand-600 focus:ring-0"> <span>فعال</span></label>
                  </div>
                  <input type="text" id="set-social-youtube" placeholder="https://youtube.com/@..." class="w-full px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-700 dir-ltr text-right text-xs">
                </div>
                <!-- GitHub -->
                <div class="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-200 flex items-center gap-1.5">${SOCIAL_ICONS.github} گیت‌هاب</span>
                    <label class="flex items-center gap-1 cursor-pointer text-[11px] text-slate-400"><input type="checkbox" id="set-social-github-enabled" class="rounded bg-slate-900 border-slate-700 text-brand-600 focus:ring-0"> <span>فعال</span></label>
                  </div>
                  <input type="text" id="set-social-github" placeholder="https://github.com/youruser" class="w-full px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-700 dir-ltr text-right text-xs">
                </div>
              </div>
            </div>

            <!-- 6. تنظیمات مقالات و دیدگاه‌ها -->
            <div class="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-4">
              <h3 class="text-lg font-bold flex items-center gap-2 text-white">
                <i data-lucide="sliders" class="w-5 h-5 text-rose-400"></i>
                شخصی‌سازی مقالات و نظرات
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-3">
                  <label class="block text-xs font-bold text-slate-300">نمایش المان‌های مقالات در سایت</label>
                  <label class="flex items-center gap-2 cursor-pointer text-xs text-slate-400">
                    <input type="checkbox" id="set-show-reading-time" class="rounded bg-slate-800 border-slate-700 text-brand-600 focus:ring-0">
                    <span>نمایش برچسب زمان تخمینی مطالعه (Reading Time)</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer text-xs text-slate-400">
                    <input type="checkbox" id="set-show-views" class="rounded bg-slate-800 border-slate-700 text-brand-600 focus:ring-0">
                    <span>نمایش تعداد بازدید مقالات</span>
                  </label>
                </div>
                <div class="space-y-3">
                  <label class="block text-xs font-bold text-slate-300">نحوه تایید و انتشار دیدگاه‌های جدید کاربران</label>
                  <select id="set-comments-auto-approve" class="w-full px-3 py-2 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200">
                    <option value="true">تایید خودکار و نمایش آنی دیدگاه‌ها (Auto-Approve)</option>
                    <option value="false">نیاز به بررسی و تایید دستی مدیر قبل از نمایش (Moderation)</option>
                  </select>
                  <p class="text-[11px] text-slate-500">در صورت انتخاب حالت تایید دستی، دیدگاه‌ها تا قبل از تایید در پنل مدیریت در سایت نمایش داده نخواهند شد.</p>
                </div>
              </div>
            </div>

            <!-- 7. تزریق کدهای سفارشی پیشرفته (CSS / JS) -->
            <div class="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-4">
              <h3 class="text-lg font-bold flex items-center gap-2 text-white">
                <i data-lucide="code-2" class="w-5 h-5 text-teal-400"></i>
                تزریق کدهای سفارشی (Custom Code Injection)
              </h3>
              <p class="text-xs text-slate-400">بدون نیاز به ویرایش فایل‌ها، استایل‌های دلخواه یا اسکریپت‌های چت آنلاین و آمارگیر را مستقیماً تزریق کنید.</p>
              
              <div class="space-y-4 pt-2">
                <div>
                  <label class="block text-xs font-bold text-slate-300 mb-1">استایل‌های اختصاصی CSS (درون تگ style اعمال می‌شوند)</label>
                  <textarea id="set-custom-css" rows="3" placeholder="body { /* استایل‌های دلخواه شما */ }" class="w-full p-3 bg-slate-950 font-mono text-xs text-emerald-400 rounded-xl border border-slate-800 focus:ring-2 focus:ring-brand-500 dir-ltr text-left"></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-300 mb-1">کدهای اختصاصی Header (درون head)</label>
                    <textarea id="set-custom-header" rows="3" placeholder="<!-- کدهای گوگل آنالیتیکس یا متاتگ‌ها -->" class="w-full p-3 bg-slate-950 font-mono text-xs text-sky-400 rounded-xl border border-slate-800 focus:ring-2 focus:ring-brand-500 dir-ltr text-left"></textarea>
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-300 mb-1">کدهای اختصاصی Footer (انتهای body)</label>
                    <textarea id="set-custom-footer" rows="3" placeholder="<!-- ابزارک گفتینو، کریسپ یا رایاچت -->" class="w-full p-3 bg-slate-950 font-mono text-xs text-purple-400 rounded-xl border border-slate-800 focus:ring-2 focus:ring-brand-500 dir-ltr text-left"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <!-- Save Button Sticky Bar -->
            <div class="sticky bottom-4 z-30 p-4 bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl flex items-center justify-between gap-4">
              <span class="text-xs text-slate-400 font-semibold hidden sm:inline">برای اعمال تغییرات روی سایت، دکمه ذخیره را بزنید.</span>
              <button type="submit" class="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-8 py-3 rounded-xl shadow-lg shadow-brand-500/25 transition flex items-center justify-center gap-2">
                <i data-lucide="check" class="w-4 h-4"></i>
                ذخیره تمامی تنظیمات
              </button>
            </div>

          </form>

          <!-- 8. پشتیبان‌گیری و بازیابی یک‌کلیکه -->
          <div class="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-4">
            <h3 class="text-lg font-bold flex items-center gap-2">
              <i data-lucide="database" class="w-5 h-5 text-emerald-400"></i>
              پشتیبان‌گیری و بازیابی یک‌کلیکه (Backup & Restore)
            </h3>
            <p class="text-xs text-slate-400 leading-relaxed">
              شما می‌توانید تمام اطلاعات وبسایت (نوشته‌ها، برگه‌ها، دسته‌بندی‌ها، نظرات و تمام تنظیمات بالا) را در یک فایل JSON دانلود کرده و در هر زمان به راحتی بازیابی کنید.
            </p>
            <div class="flex flex-wrap items-center gap-4 pt-2">
              <a href="/admin/api/backup/export" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-2">
                <i data-lucide="download" class="w-4 h-4"></i>
                دانلود فایل پشتیبان کامل (JSON)
              </a>
              <label class="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-5 py-2.5 rounded-xl border border-slate-700 transition flex items-center gap-2">
                <i data-lucide="upload" class="w-4 h-4"></i>
                <span>بازیابی از فایل پشتیبان</span>
                <input type="file" id="backup-file-input" accept=".json" class="hidden" onchange="importBackup(event)">
              </label>
            </div>
          </div>
        </section>

        <!-- ================= TAB 8: PROFILE ================= -->
        <section id="view-profile" class="tab-view hidden space-y-6">
          <div>
            <h2 class="text-2xl font-black">پروفایل و امنیت کاربر</h2>
            <p class="text-slate-400 text-xs mt-1">تغییر نام نمایشی، ایمیل و کلمه عبور مدیر</p>
          </div>

          <form id="profile-form" class="max-w-xl bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1">نام نمایشی</label>
              <input type="text" id="prof-name" value="${escapeHtml(authUser.display_name || '')}" class="w-full px-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-sm focus:ring-2 focus:ring-brand-500">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1">آدرس ایمیل</label>
              <input type="email" id="prof-email" value="${escapeHtml(authUser.email || '')}" class="w-full px-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-sm focus:ring-2 focus:ring-brand-500">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1">کلمه عبور جدید (در صورت نیاز به تغییر)</label>
              <input type="password" id="prof-password" placeholder="حداقل ۶ کاراکتر (اختیاری)" class="w-full px-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-sm focus:ring-2 focus:ring-brand-500">
            </div>
            <button type="submit" class="bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-brand-500/20 transition">
              به‌روزرسانی اطلاعات حساب
            </button>
          </form>
        </section>

      </main>
    </div>

  </div>

  <!-- ================= MODAL: CREATE/EDIT POST WITH WYSIWYG & SEO PREVIEW ================= -->
  <div id="post-modal" class="fixed inset-0 z-50 hidden bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
    <div class="bg-slate-900 rounded-3xl border border-slate-800 max-w-4xl w-full p-6 md:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
      
      <!-- Auto-Save Draft Recovery Alert -->
      <div id="post-draft-banner" class="hidden mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between text-xs text-amber-300">
        <span class="flex items-center gap-1.5"><i data-lucide="alert-circle" class="w-4 h-4"></i> یک پیش‌نویس ذخیره‌نشده از قبل در حافظه مرورگر وجود دارد.</span>
        <div class="flex items-center gap-2">
          <button type="button" onclick="restorePostDraft()" class="px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 transition">بازیابی</button>
          <button type="button" onclick="dismissPostDraft()" class="px-2 py-1 text-slate-400 hover:text-white">نادیده گرفتن</button>
        </div>
      </div>

      <div class="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
        <div class="flex items-center gap-3">
          <h3 id="post-modal-title" class="text-xl font-bold">افزودن نوشته جدید</h3>
          <button type="button" onclick="openLiveDevicePreview()" class="text-xs bg-slate-800 hover:bg-slate-700 text-brand-400 px-3 py-1.5 rounded-xl border border-slate-700 font-semibold flex items-center gap-1">
            <i data-lucide="smartphone" class="w-3.5 h-3.5"></i>
            پیش‌نمایش در موبایل
          </button>
        </div>
        <button onclick="closePostModal()" class="text-slate-400 hover:text-white"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>

      <form id="post-form" class="space-y-4">
        <input type="hidden" id="post-id">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold mb-1 text-slate-400">عنوان نوشته *</label>
            <input type="text" id="post-title" required onkeyup="onPostTitleChange(this.value)" class="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500">
          </div>
          <div>
            <label class="block text-xs font-semibold mb-1 text-slate-400">آدرس لینک (URL در مرورگر)</label>
            <div class="relative">
              <input type="text" id="post-slug" placeholder="خودکار از عنوان ساخته می‌شود" class="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 dir-ltr text-right">
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold mb-1 text-slate-400">دسته‌بندی</label>
            <select id="post-category" class="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500"></select>
          </div>
          <div>
            <label class="block text-xs font-semibold mb-1 text-slate-400">وضعیت انتشار</label>
            <select id="post-status" class="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500">
              <option value="published">منتشر شده (عمومی)</option>
              <option value="draft">پیش‌نویس (خصوصی)</option>
            </select>
          </div>
        </div>

        <!-- Visual Cover Image Picker Area -->
        <div>
          <label class="block text-xs font-semibold mb-1 text-slate-400">تصویر شاخص مقاله</label>
          <input type="hidden" id="post-cover">
          <div id="post-cover-preview-box" class="p-4 bg-slate-800/60 rounded-2xl border border-slate-700 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <img id="post-cover-img" src="" class="w-16 h-16 rounded-xl object-cover hidden bg-slate-900 border border-slate-700">
              <div id="post-cover-placeholder" class="text-xs text-slate-400">هنوز تصویری انتخاب نشده است.</div>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" onclick="openMediaPickerModal('post')" class="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-sm transition">
                <i data-lucide="image" class="w-3.5 h-3.5"></i>
                انتخاب از رسانه‌خانه
              </button>
              <label class="cursor-pointer px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1 transition">
                <i data-lucide="upload" class="w-3.5 h-3.5"></i>
                <span>آپلود مستقیم</span>
                <input type="file" accept="image/*" class="hidden" onchange="uploadDirectCover(event, 'post')">
              </label>
              <button type="button" id="post-cover-remove-btn" onclick="removePostCover()" class="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-xl hidden" title="حذف تصویر">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold mb-1 text-slate-400">خلاصه کوتاه نوشته (نمایش در کارت‌ها و پیش‌نمایش گوگل)</label>
          <textarea id="post-excerpt" onkeyup="updateSeoPreview()" rows="2" class="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500"></textarea>
        </div>

        <div>
          <div class="flex items-center justify-between mb-1.5">
            <div class="flex items-center gap-2">
              <label class="block text-xs font-semibold text-slate-400">متن اصلی مقاله (ویرایشگر دیداری)</label>
              <button type="button" id="post-html-toggle-btn" onclick="toggleHtmlSourceView('post')" class="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-mono transition flex items-center gap-1">
                <i data-lucide="code" class="w-3 h-3"></i>
                <span id="post-html-toggle-text">مشاهده کد HTML</span>
              </button>
            </div>
            <div id="editor-word-count" class="text-[11px] text-brand-400 font-mono">۰ کلمه • ۱ دقیقه مطالعه</div>
          </div>
          <div id="post-quill-wrapper">
            <div id="post-quill-editor" class="bg-slate-800/40 text-slate-100"></div>
          </div>
          <textarea id="post-html-editor" class="hidden w-full h-[280px] p-4 bg-slate-950 text-emerald-400 font-mono text-xs rounded-xl border border-slate-700 dir-ltr text-left focus:ring-2 focus:ring-brand-500" placeholder="کدهای HTML دلخواه یا iframe ویدیو و جدول..."></textarea>
        </div>

        <!-- Live Google SEO & Social Snippet Preview -->
        <div class="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
          <div class="text-xs font-bold text-slate-400 flex items-center gap-1.5">
            <i data-lucide="search" class="w-4 h-4 text-brand-400"></i>
            پیش‌نمایش نحوه نمایش در نتایج گوگل (Google Preview):
          </div>
          <div class="p-4 bg-slate-900 rounded-xl border border-slate-800/80 space-y-1">
            <div id="seo-preview-url" class="text-xs text-slate-400 dir-ltr text-right truncate">https://yourdomain.workers.dev/blog/slug</div>
            <div id="seo-preview-title" class="text-base font-bold text-blue-400 truncate">عنوان نوشته شما</div>
            <div id="seo-preview-desc" class="text-xs text-slate-400 line-clamp-2 leading-relaxed">خلاصه مقاله شما در اینجا نمایش داده خواهد شد...</div>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <button type="button" onclick="closePostModal()" class="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-800 text-slate-300">انصراف</button>
          <button type="submit" class="px-6 py-2 rounded-xl text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/20">ذخیره نوشته</button>
        </div>
      </form>
    </div>
  </div>

  <!-- ================= MODAL: CREATE/EDIT PAGE ================= -->
  <div id="page-modal" class="fixed inset-0 z-50 hidden bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
    <div class="bg-slate-900 rounded-3xl border border-slate-800 max-w-3xl w-full p-6 md:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
        <h3 id="page-modal-title" class="text-xl font-bold">افزودن برگه جدید</h3>
        <button onclick="closePageModal()" class="text-slate-400 hover:text-white"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>

      <form id="page-form" class="space-y-4">
        <input type="hidden" id="page-id">
        <div>
          <label class="block text-xs font-semibold mb-1 text-slate-400">عنوان برگه *</label>
          <input type="text" id="page-title" required onkeyup="onPageTitleChange(this.value)" class="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500">
        </div>
        <div>
          <label class="block text-xs font-semibold mb-1 text-slate-400">آدرس لینک (URL در مرورگر) *</label>
          <input type="text" id="page-slug" required placeholder="مثلا about یا contact" class="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 dir-ltr text-right">
        </div>
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="block text-xs font-semibold text-slate-400">محتوای برگه (ویرایشگر دیداری)</label>
            <button type="button" id="page-html-toggle-btn" onclick="toggleHtmlSourceView('page')" class="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-mono transition flex items-center gap-1">
              <i data-lucide="code" class="w-3 h-3"></i>
              <span id="page-html-toggle-text">مشاهده کد HTML</span>
            </button>
          </div>
          <div id="page-quill-wrapper">
            <div id="page-quill-editor" class="bg-slate-800/40 text-slate-100"></div>
          </div>
          <textarea id="page-html-editor" class="hidden w-full h-[280px] p-4 bg-slate-950 text-emerald-400 font-mono text-xs rounded-xl border border-slate-700 dir-ltr text-left focus:ring-2 focus:ring-brand-500" placeholder="کدهای HTML دلخواه یا iframe ویدیو و جدول..."></textarea>
        </div>
        <div>
          <label class="block text-xs font-semibold mb-1 text-slate-400">وضعیت</label>
          <select id="page-status" class="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500">
            <option value="published">منتشر شده</option>
            <option value="draft">پیش‌نویس</option>
          </select>
        </div>
        <div class="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <button type="button" onclick="closePageModal()" class="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-800 text-slate-300">انصراف</button>
          <button type="submit" class="px-6 py-2 rounded-xl text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/20">ذخیره برگه</button>
        </div>
      </form>
    </div>
  </div>

  <!-- ================= MODAL: VISUAL MEDIA PICKER ================= -->
  <div id="media-picker-modal" class="fixed inset-0 z-50 hidden bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-slate-900 rounded-3xl border border-slate-800 max-w-2xl w-full p-6 shadow-2xl relative flex flex-col max-h-[85vh]">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-4">
        <div class="flex items-center gap-2">
          <i data-lucide="image" class="w-5 h-5 text-brand-400"></i>
          <h3 class="text-lg font-bold">انتخاب یا آپلود تصویر</h3>
        </div>
        <div class="flex items-center gap-2">
          <label class="cursor-pointer bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-md transition flex items-center gap-1.5">
            <i data-lucide="upload-cloud" class="w-3.5 h-3.5"></i>
            <span>آپلود تصویر جدید</span>
            <input type="file" accept="image/*" class="hidden" onchange="uploadImageFromPicker(event)">
          </label>
          <button onclick="closeMediaPickerModal()" class="p-1.5 text-slate-400 hover:text-white rounded-lg"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>
      </div>
      <div id="media-picker-grid" class="grid grid-cols-3 sm:grid-cols-4 gap-3 overflow-y-auto flex-1 p-1"></div>
    </div>
  </div>

  <!-- ================= MODAL: LIVE MOBILE/DEVICE PREVIEW ================= -->
  <div id="device-preview-modal" class="fixed inset-0 z-50 hidden bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
    <div class="flex items-center justify-between w-full max-w-sm mb-3">
      <div class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
        <i data-lucide="smartphone" class="w-4 h-4 text-brand-400"></i>
        پیش‌نمایش مقاله در موبایل
      </div>
      <button onclick="closeLiveDevicePreview()" class="text-slate-400 hover:text-white p-1"><i data-lucide="x" class="w-5 h-5"></i></button>
    </div>
    <!-- Phone Mockup Frame -->
    <div class="w-full max-w-[360px] h-[640px] bg-slate-950 rounded-[40px] border-4 border-slate-700 shadow-2xl flex flex-col overflow-hidden relative">
      <div class="h-6 bg-slate-900 flex items-center justify-center">
        <div class="w-20 h-3 bg-slate-800 rounded-full"></div>
      </div>
      <div id="phone-preview-content" class="flex-1 p-5 overflow-y-auto bg-slate-900 text-slate-100 text-xs leading-relaxed space-y-3"></div>
    </div>
  </div>

  <!-- ================= FLOATING UPLOAD PROGRESS BAR ================= -->
  <div id="upload-progress-box" class="fixed bottom-6 left-6 z-50 hidden bg-slate-900 border border-slate-700 p-4 rounded-2xl shadow-2xl max-w-xs w-full space-y-2">
    <div class="flex items-center justify-between text-xs font-bold">
      <span id="upload-status-text" class="text-brand-400">در حال فشرده‌سازی تصویر...</span>
      <span id="upload-percentage" class="text-slate-300">0%</span>
    </div>
    <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
      <div id="upload-progress-bar" class="bg-brand-500 h-full w-0 transition-all duration-200"></div>
    </div>
  </div>

  <!-- SPA Core JavaScript Logic -->
  <script>
    var quillToolbarOptions = [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }, { 'direction': 'rtl' }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']
    ];

    var postQuill = new Quill('#post-quill-editor', {
      theme: 'snow',
      modules: { toolbar: quillToolbarOptions },
      placeholder: 'متن مقاله را اینجا بنویسید...'
    });

    var pageQuill = new Quill('#page-quill-editor', {
      theme: 'snow',
      modules: { toolbar: quillToolbarOptions },
      placeholder: 'محتوای برگه را اینجا بنویسید...'
    });

    // Custom Image Handlers: connect Quill image button directly to Media Library
    postQuill.getModule('toolbar').addHandler('image', function() {
      openMediaPickerFor('postQuill');
    });

    pageQuill.getModule('toolbar').addHandler('image', function() {
      openMediaPickerFor('pageQuill');
    });

    var ADMIN_LANG = localStorage.getItem('cp_admin_lang') || 'fa';

    var ADMIN_DICT_FA_TO_EN = {
      // Navigation & Sidebar
      "داشبورد اصلی": "Dashboard",
      "نوشته‌ها و مقالات": "Posts & Articles",
      "برگه‌ها": "Pages",
      "دسته‌بندی‌ها": "Categories",
      "رسانه‌خانه (تصاویر)": "Media Library",
      "دیدگاه‌ها": "Comments",
      "مدیریت وبسایت": "Website Management",
      "تنظیمات و منوساز": "Settings & Menus",
      "پروفایل کاربری": "Profile & Security",
      "وضعیت پایگاه داده D1": "D1 Database Status",
      "آماده و متصل": "Ready & Connected",
      "پایگاه داده توزیع شده ابری": "Distributed Cloud Database",
      "مشاهده سایت": "Visit Site",
      "خروج از حساب": "Sign Out",
      "مدیر": "Admin",

      // Dashboard
      "سلام": "Welcome",
      "عزیز! 🚀": "! 🚀",
      "سامانه مدیریت محتوای CloudPress آماده انتشار مقالات و مدیریت برگه‌ها بر بستر شبکه فوق‌سریع Edge است.": "CloudPress CMS is ready for publishing articles and managing pages on Cloudflare Edge.",
      "نوشته جدید": "New Post",
      "برگه جدید": "New Page",
      "تعداد مقالات": "Total Posts",
      "مقالات منتشر شده و پیش‌نویس": "Published and draft articles",
      "تعداد برگه‌ها": "Total Pages",
      "برگه‌های ایستا و پویا": "Static and custom pages",
      "دیدگاه‌های کاربران": "User Comments",
      "نظرات ثبت شده": "Submitted comments",
      "مجموع بازدیدها": "Total Views",
      "آمار لبه شبکه": "Edge Network Analytics",
      "آخرین مقالات نوشته شده": "Recent Articles",
      "مشاهده همه": "View All",
      "دیدگاه‌های اخیر": "Recent Comments",
      "مدیریت دیدگاه‌ها": "Comments Moderation",
      "در حال بارگذاری...": "Loading...",

      // Posts Tab
      "مدیریت مقالات و نوشته‌ها": "Posts & Articles",
      "تولید، ویرایش و مدیریت انتشار مقالات وبلاگ": "Create, edit, and publish blog articles",
      "جستجوی آنی در مقالات...": "Search articles in real-time...",
      "عنوان نوشته": "Post Title",
      "دسته‌بندی": "Category",
      "آدرس پیوند (URL)": "Slug (URL)",
      "بازدید": "Views",
      "وضعیت": "Status",
      "عملیات": "Actions",
      "در حال دریافت مقالات...": "Loading articles...",
      "هیچ مقاله‌ای یافت نشد.": "No articles found.",

      // Pages Tab
      "مدیریت برگه‌ها": "Pages Management",
      "ایجاد و ویرایش صفحات ایستا و اختصاصی سایت": "Create and edit custom static pages",
      "جستجوی آنی در برگه‌ها...": "Search pages...",
      "عنوان برگه": "Page Title",
      "در حال دریافت برگه‌ها...": "Loading pages...",
      "هیچ برگه‌ای یافت نشد.": "No pages found.",

      // Categories Tab
      "افزودن دسته‌بندی جدید": "Add New Category",
      "نام دسته‌بندی *": "Category Name *",
      "آدرس در لینک (URL)": "Slug in URL",
      "اختیاری - خودکار ساخته می‌شود": "Optional - auto-generated",
      "توضیحات کوتاه": "Short Description",
      "افزودن دسته‌بندی": "Add Category",
      "لیست دسته‌بندی‌ها": "Categories List",
      "نام دسته": "Category Name",
      "آدرس لینک": "Slug",
      "تعداد مقالات": "Post Count",
      "هیچ دسته‌بندی یافت نشد.": "No categories found.",

      // Media Tab
      "رسانه‌خانه (Media Library)": "Media Library",
      "تصاویر با الگوریتم هوشمند در مرورگر فشرده شده و درون پایگاه داده D1 ذخیره می‌شوند.": "Images are compressed in browser and stored directly into Cloudflare D1 SQL database.",
      "آپلود تصویر جدید (فشرده‌سازی خودکار)": "Upload Image (Auto-compress)",
      "در حال بارگذاری تصاویر...": "Loading images...",
      "رسانه‌خانه خالی است. ابتدا تصویری آپلود کنید.": "Media library is empty. Upload an image first.",
      "کپی لینک": "Copy Link",
      "کپی لینک تصویر": "Copy Image URL",
      "حذف تصویر": "Delete Image",

      // Comments Tab
      "بررسی، تایید و مدیریت نظرات کاربران": "Review, approve and moderate user comments",
      "نویسنده": "Author",
      "متن دیدگاه": "Comment Content",
      "مربوط به مقاله": "Related Post",
      "تایید شده": "Approved",
      "در انتظار": "Pending",
      "در حال بارگذاری دیدگاه‌ها...": "Loading comments...",
      "هیچ دیدگاهی ثبت نشده است.": "No comments submitted yet.",

      // Settings Tab
      "تنظیمات و شخصی‌سازی پیشرفته سایت": "Advanced Website Settings & Customization",
      "کنترل ۱۰۰٪ بر برندینگ، رنگ‌ها، فونت، بنر صفحه اصلی، منو، شبکه‌های اجتماعی و کدهای اختصاصی": "Full 100% control over branding, colors, fonts, hero banner, menus, social links, and custom code",
      "برندینگ، هویت بصری و رنگ‌بندی داینامیک": "Branding, Visual Identity & Dynamic Colors",
      "لوگوی وب‌سایت": "Website Logo",
      "(در هدر و فوتر نمایش داده می‌شود)": "(Displayed in header and footer)",
      "بدون لوگو": "No Logo",
      "آدرس یا انتخاب تصویر...": "Image URL or select from media...",
      "انتخاب از رسانه": "Choose Media",
      "حذف": "Remove",
      "فاوآیکون (Favicon)": "Favicon",
      "(آیکون تب مرورگر)": "(Browser tab icon)",
      "بدون آیکون": "No Favicon",
      "آدرس یا انتخاب فاوآیکون...": "Favicon URL or select from media...",
      "رنگ اصلی برند (Brand Color)": "Brand Color",
      "فونت پیش‌فرض وب‌سایت": "Default Website Font",
      "زبان پیش‌فرض سایت (Default Language)": "Default Website Language",
      "شخصی‌سازی بنر و بخش Hero صفحه نخست": "Homepage Hero Banner Customization",
      "نمایش بنر Hero": "Show Hero Banner",
      "نشان بالای عنوان (Badge Text)": "Hero Badge Text",
      "نشان بالای تیتر (Badge)": "Hero Badge",
      "تیتر اصلی بنر (Headline)": "Hero Headline",
      "تیتر اصلی بنر (Hero Title)": "Hero Main Title",
      "توضیحات و زیرعنوان بنر (Subtitle)": "Hero Subtitle",
      "توضیحات تکمیلی بنر": "Hero Subtitle",
      "دکمه اول (اقدام اصلی)": "Primary Button (Action 1)",
      "متن دکمه اصلی (Button 1)": "Primary Button Text",
      "لینک دکمه اصلی": "Primary Button URL",
      "دکمه دوم (اقدام فرعی)": "Secondary Button (Action 2)",
      "متن دکمه دوم (Button 2)": "Secondary Button Text",
      "لینک دکمه دوم": "Secondary Button URL",
      "تصویر یا بنر گرافیکی Hero (اختیاری)": "Hero Graphic Banner Image (Optional)",
      "تصویر بزرگ بنر (Hero Image)": "Hero Image Banner",
      "بدون تصویر": "No Image",
      "کارت‌های ویژگی و خدمات صفحه نخست (Features Grid)": "Features & Services Cards (Features Grid)",
      "کارت‌های سه‌گانه معرفی ویژگی‌ها (Features Grid)": "Features Grid Cards (3-Column)",
      "نمایش کارت‌های ویژگی": "Show Features Section",
      "نمایش بخش کارت‌های ویژگی": "Show Features Section",
      "تیتر بخش ویژگی‌ها (اختیاری)": "Features Section Title (Optional)",
      "عنوان سرتیتر بخش ویژگی‌ها": "Features Section Title",
      "زیرعنوان بخش ویژگی‌ها (اختیاری)": "Features Section Subtitle (Optional)",
      "توضیح کوتاه سرتیتر": "Features Section Subtitle",
      "کارت اول": "Card 1",
      "کارت دوم": "Card 2",
      "کارت سوم": "Card 3",
      "آیکون و متن": "Icon & Content",
      "عنوان کارت": "Card Title",
      "توضیحات کارت": "Card Description",
      "نام آیکون Lucide": "Lucide Icon Name",
      "آیکون‌های پیشنهادی:": "Suggested Icons:",
      "(یا هر نام آیکون معتبر از کتابخانه Lucide)": "(or any valid Lucide icon name)",
      "اطلاعات عمومی وب‌سایت و سئو": "General Website Information & SEO",
      "تنظیمات عمومی، سئو و کپی‌رایت": "General, SEO & Copyright Settings",
      "عنوان سایت *": "Site Title *",
      "عنوان سایت (Site Title)": "Site Title",
      "شعار سایت (Tagline)": "Site Tagline",
      "شعار یا تیتر فرعی (Tagline)": "Site Tagline",
      "توضیحات متای سئو (برای نتایج جستجوی گوگل)": "SEO Meta Description (for Google Search)",
      "توضیحات متای سئو (Description)": "SEO Meta Description",
      "متن کپی‌رایت فوتر": "Footer Copyright Text",
      "متن کپی‌رایت فوتر سایت": "Footer Copyright Text",
      "منوساز هوشمند هدر (Header Navigation)": "Header Navigation Menu Builder",
      "منوساز ناوبری سریع هدر": "Header Navigation Menu Builder",
      "افزودن سریع برگه، دسته‌بندی یا لینک اختصاصی به منوی بالای سایت": "Quickly add pages, categories, or custom links to the header menu",
      "+ افزودن از برگه‌ها": "+ Add from Pages",
      "+ افزودن از دسته‌ها": "+ Add from Categories",
      "لینک دلخواه": "Custom Link",
      "عنوان منو": "Menu Title",
      "آدرس لینک (URL)": "Link URL",
      "افزودن به منو": "Add to Menu",
      "آیتم‌های فعال در منوی بالای سایت:": "Active Header Menu Items:",
      "شبکه‌های اجتماعی و پیام‌رسان‌ها (نمایش انتخابی در فوتر)": "Social Media Networks (Selectable in Footer)",
      "شبکه‌های اجتماعی (لینک‌های فعال)": "Social Media Networks",
      "فقط مواردی که تیک فعال دارند در سایت نمایش داده می‌شوند": "Only checked items will be displayed on the website",
      "فعال": "Active",
      "تلگرام": "Telegram",
      "اینستاگرام": "Instagram",
      "توییتر / X": "Twitter / X",
      "واتساپ": "WhatsApp",
      "دیسکورد / Discord": "Discord",
      "لینکدین": "LinkedIn",
      "یوتیوب": "YouTube",
      "گیت‌هاب": "GitHub",
      "شخصی‌سازی مقالات و نظرات": "Articles & Comments Customization",
      "تنظیمات وبلاگ و دیدگاه‌ها": "Blog & Comments Settings",
      "نمایش المان‌های مقالات در سایت": "Article Elements Visibility",
      "نمایش برچسب زمان تخمینی مطالعه (Reading Time)": "Show estimated reading time badge",
      "نمایش تخمین زمان مطالعه مقالات": "Show estimated reading time badge",
      "نمایش تعداد بازدید مقالات": "Show article view counter",
      "نحوه تایید و انتشار دیدگاه‌های جدید کاربران": "Comment Moderation Mode",
      "وضعیت تایید دیدگاه‌های جدید": "New Comments Approval Status",
      "تایید خودکار تمام دیدگاه‌ها": "Auto-approve all comments",
      "نیاز به بررسی و تایید توسط مدیر (توصیه‌شده)": "Require admin moderation (Recommended)",
      "تایید خودکار و نمایش آنی دیدگاه‌ها (Auto-Approve)": "Auto-approve and show immediately",
      "نیاز به بررسی و تایید دستی مدیر قبل از نمایش (Moderation)": "Require manual admin moderation before publishing",
      "در صورت انتخاب حالت تایید دستی، دیدگاه‌ها تا قبل از تایید در پنل مدیریت در سایت نمایش داده نخواهند شد.": "When manual moderation is selected, comments are kept hidden until approved.",
      "تزریق کدهای سفارشی (Custom Code Injection)": "Custom Code Injection (CSS / JS)",
      "کدهای اختصاصی (Custom Scripts & CSS)": "Custom Scripts & CSS Code",
      "بدون نیاز به ویرایش فایل‌ها، استایل‌های دلخواه یا اسکریپت‌های چت آنلاین و آمارگیر را مستقیماً تزریق کنید.": "Inject custom styles, chat widgets, analytics, and meta tags directly without touching files.",
      "استایل‌های اختصاصی CSS (درون تگ style اعمال می‌شوند)": "Custom CSS Styles (applied inside <style> tag)",
      "کدهای اختصاصی Header (درون head)": "Custom Header Code (inside <head>)",
      "کدهای اختصاصی داخل تگ <head> (مانند گوگل آنالیتیکس یا استایل)": "Custom code inside <head> (e.g. Analytics, CSS)",
      "کدهای اختصاصی Footer (انتهای body)": "Custom Footer Code (before </body>)",
      "کدهای اختصاصی انتهای فوتر (مانند چت آنلاین یا اسکریپت)": "Custom code before </body> (e.g. Chat widget, scripts)",
      "برای اعمال تغییرات روی سایت، دکمه ذخیره را بزنید.": "Click save to apply your changes across the website.",
      "ذخیره تمامی تنظیمات": "Save All Settings",
      "ذخیره تمامی تنظیمات وبسایت": "Save All Settings",
      "پشتیبان‌گیری و بازیابی یک‌کلیکه (Backup & Restore)": "One-Click Backup & Restore",
      "شما می‌توانید تمام اطلاعات وبسایت (نوشته‌ها، برگه‌ها، دسته‌بندی‌ها، نظرات و تمام تنظیمات بالا) را در یک فایل JSON دانلود کرده و در هر زمان به راحتی بازیابی کنید.": "Export all website data (posts, pages, categories, comments, settings) into a single JSON file and restore anytime.",
      "دانلود فایل پشتیبان کامل (JSON)": "Download Full Backup (JSON)",
      "بازیابی از فایل پشتیبان": "Restore from Backup File",

      // Profile Tab
      "پروفایل و امنیت کاربر": "User Profile & Security",
      "پروفایل و امنیت مدیر": "Admin Profile & Security",
      "تغییر نام نمایشی، ایمیل و کلمه عبور مدیر": "Update display name, email, and admin password",
      "تغییر اطلاعات ورود و مدیریت دسترسی": "Manage login credentials and security",
      "اطلاعات حساب کاربری": "Account Information",
      "نام کاربری (جهت ورود)": "Username (for login)",
      "نام نمایشی": "Display Name",
      "نام نمایشی (نویسنده)": "Display Name (Author)",
      "آدرس ایمیل": "Email Address",
      "نقش کاربری": "User Role",
      "مدیر کل سیستم": "Super Administrator",
      "کلمه عبور جدید (در صورت نیاز به تغییر)": "New Password (if changing)",
      "تغییر رمز عبور (اختیاری)": "Change Password (Optional)",
      "رمز عبور جدید": "New Password",
      "تکرار رمز عبور جدید": "Confirm New Password",
      "به‌روزرسانی اطلاعات حساب": "Update Account Profile",
      "به‌روزرسانی پروفایل و رمز عبور": "Update Profile & Password",

      // Post Modal
      "افزودن نوشته جدید": "Add New Post",
      "ویرایش نوشته": "Edit Post",
      "پیش‌نمایش در موبایل": "Mobile Live Preview",
      "یک پیش‌نویس ذخیره‌نشده از قبل در حافظه مرورگر وجود دارد.": "An unsaved draft was restored from browser memory.",
      "بازیابی": "Restore",
      "نادیده گرفتن": "Dismiss",
      "عنوان نوشته *": "Post Title *",
      "آدرس لینک (URL در مرورگر)": "URL Slug",
      "دسته‌بندی": "Category",
      "وضعیت انتشار": "Publication Status",
      "منتشر شده (عمومی)": "Published (Public)",
      "پیش‌نویس (خصوصی)": "Draft (Private)",
      "تصویر شاخص مقاله": "Featured Cover Image",
      "تصویر شاخص مقاله (Cover Image)": "Cover Image",
      "هنوز تصویری انتخاب نشده است.": "No image selected yet.",
      "بدون تصویر شاخص": "No cover image",
      "انتخاب از رسانه‌خانه": "Select from Media",
      "آپلود مستقیم": "Direct Upload",
      "حذف تصویر": "Remove Image",
      "حذف تصویر شاخص": "Remove cover image",
      "خلاصه کوتاه نوشته (نمایش در کارت‌ها و پیش‌نمایش گوگل)": "Short Summary (shown in cards and Google snippet)",
      "خلاصه کوتاه مقاله (Excerpt)": "Short Excerpt",
      "متن اصلی مقاله (ویرایشگر دیداری)": "Article Body (Visual WYSIWYG)",
      "مشاهده کد HTML": "View HTML Source",
      "بازگشت به ویرایشگر دیداری": "Back to Visual Editor",
      "پیش‌نمایش نحوه نمایش در نتایج گوگل (Google Preview):": "Google Search Snippet Preview:",
      "پیش‌نمایش در گوگل (SEO Preview)": "Google Search Preview (SEO)",
      "عنوان سئو (SEO Title)": "SEO Title",
      "اختیاری - پیش‌فرض عنوان نوشته": "Optional - defaults to post title",
      "توضیحات متای سئو (Meta Description)": "SEO Meta Description",
      "پیش‌نویس خودکار ذخیره شد": "Draft auto-saved",
      "انصراف": "Cancel",
      "ذخیره نوشته": "Save Post",
      "ذخیره به عنوان پیش‌نویس": "Save as Draft",
      "انتشار مقاله": "Publish Post",
      "بدون دسته‌بندی": "Uncategorized",

      // Page Modal
      "افزودن برگه جدید": "Add New Page",
      "ویرایش برگه": "Edit Page",
      "عنوان برگه *": "Page Title *",
      "آدرس لینک (URL در مرورگر) *": "URL Slug *",
      "آدرس برگه (اسلاگ یکتا)": "Page Slug (e.g. about)",
      "محتوای برگه (ویرایشگر دیداری)": "Page Content (Visual WYSIWYG)",
      "محتوای برگه *": "Page Content *",
      "وضعیت": "Status",
      "منتشر شده": "Published",
      "پیش‌نویس": "Draft",
      "ذخیره برگه": "Save Page",
      "انتشار برگه": "Publish Page",

      // Media Picker Modal
      "انتخاب یا آپلود تصویر": "Select or Upload Image",
      "انتخاب تصویر از رسانه‌خانه": "Select Image from Media Library",
      "بستن": "Close",

      // Device Preview Modal
      "پیش‌نمایش مقاله در موبایل": "Mobile Device Preview",

      // Floating Progress
      "در حال فشرده‌سازی تصویر...": "Compressing image...",

      // All Form Inputs & Textarea Placeholders (Examples)
      "جستجوی آنی در مقالات...": "Search articles in real-time...",
      "جستجوی آنی در برگه‌ها...": "Search pages...",
      "اختیاری - خودکار ساخته می‌شود": "Optional - auto-generated from name",
      "آدرس یا انتخاب تصویر...": "Image URL or select from media library...",
      "آدرس یا انتخاب فاوآیکون...": "Favicon URL or select from media library...",
      "مثال: نسل جدید وب‌سایت‌ها با سرعت نور": "e.g. Next-Generation Websites at the Speed of Light",
      "مدیریت محتوای فوق‌سریع و هوشمند بر لبه شبکه": "Ultra-Fast & Intelligent CMS on Cloudflare Edge",
      "متن توضیحی معرفی محصول یا خدمات شما...": "Modern publishing platform powered by Cloudflare Workers and D1 database...",
      "متن دکمه (مثال: ورود به مدیریت)": "Button text (e.g. Explore Articles)",
      "لینک دکمه (مثال: /admin)": "Button URL (e.g. /blog)",
      "متن دکمه (مثال: مشاهده وبلاگ)": "Button text (e.g. GitHub Repository)",
      "لینک دکمه (مثال: /blog)": "Button URL (e.g. https://github.com)",
      "آدرس تصویر یا انتخاب از رسانه‌خانه...": "Image URL or select from media library...",
      "مثال: چرا خدمات ما را انتخاب کنید؟": "e.g. Why Choose CloudPress?",
      "مثال: ارائه بالاترین کیفیت و رضایت برای مشتریان": "e.g. Superior edge performance and zero server maintenance",
      "سرعت و عملکرد بالا": "High Performance & Speed",
      "توضیح کوتاه این ویژگی...": "Short description of this feature...",
      "امنیت و کیفیت استاندارد": "Enterprise Security & Stability",
      "شخصی‌سازی و نوآوری": "Unlimited Customization",
      "body { /* استایل‌های دلخواه شما */ }": "body { /* Your custom CSS styles */ }",
      "<!-- کدهای گوگل آنالیتیکس یا متاتگ‌ها -->": "<!-- Google Analytics, meta tags, or custom head scripts -->",
      "<!-- ابزارک گفتینو، کریسپ یا رایاچت -->": "<!-- Live chat widgets (Crisp, Intercom) or footer scripts -->",
      "حداقل ۶ کاراکتر (اختیاری)": "Minimum 6 characters (optional)",
      "خودکار از عنوان ساخته می‌شود": "Auto-generated from title",
      "کدهای HTML دلخواه یا iframe ویدیو و جدول...": "Custom HTML code, video embed iframe, or tables...",
      "مثلا about یا contact": "e.g. about or contact",
      "عنوان لینک": "Link Title",
      "آدرس URL": "Link URL"
    };

    var ADMIN_DICT_EN_TO_FA = {};
    for (var k in ADMIN_DICT_FA_TO_EN) {
      ADMIN_DICT_EN_TO_FA[ADMIN_DICT_FA_TO_EN[k]] = k;
    }

    function translateAdminDOM(lang) {
      var isEn = lang === 'en';
      var dict = isEn ? ADMIN_DICT_FA_TO_EN : ADMIN_DICT_EN_TO_FA;

      var rootContainers = [
        document.getElementById('sidebar'),
        document.querySelector('header'),
        document.querySelector('main'),
        document.getElementById('post-modal'),
        document.getElementById('page-modal'),
        document.getElementById('media-picker-modal'),
        document.getElementById('device-preview-modal')
      ];

      rootContainers.forEach(function(root) {
        if (!root) return;
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
        var node;
        while (node = walker.nextNode()) {
          var val = node.nodeValue.trim();
          if (val && dict[val]) {
            node.nodeValue = node.nodeValue.replace(val, dict[val]);
          }
        }
      });

      // Explicit ID placeholder translation
      var explicitPlaceholders = {
        'posts-search-input': isEn ? 'Search articles in real-time...' : 'جستجوی آنی در مقالات...',
        'pages-search-input': isEn ? 'Search pages...' : 'جستجوی آنی در برگه‌ها...',
        'cat-slug': isEn ? 'Optional - auto-generated from name' : 'اختیاری - خودکار ساخته می‌شود',
        'set-logo': isEn ? 'Image URL or select from media library...' : 'آدرس یا انتخاب تصویر...',
        'set-favicon': isEn ? 'Favicon URL or select from media library...' : 'آدرس یا انتخاب فاوآیکون...',
        'set-hero-badge': isEn ? 'e.g. Next-Generation Websites at the Speed of Light' : 'مثال: نسل جدید وب‌سایت‌ها با سرعت نور',
        'set-hero-title': isEn ? 'Ultra-Fast & Intelligent CMS on Cloudflare Edge' : 'مدیریت محتوای فوق‌سریع و هوشمند بر لبه شبکه',
        'set-hero-subtitle': isEn ? 'Modern publishing platform powered by Cloudflare Workers and D1 database...' : 'متن توضیحی معرفی محصول یا خدمات شما...',
        'set-hero-btn1-text': isEn ? 'Button text (e.g. Explore Articles)' : 'متن دکمه (مثال: ورود به مدیریت)',
        'set-hero-btn1-url': isEn ? 'Button URL (e.g. /blog)' : 'لینک دکمه (مثال: /admin)',
        'set-hero-btn2-text': isEn ? 'Button text (e.g. GitHub Repository)' : 'متن دکمه (مثال: مشاهده وبلاگ)',
        'set-hero-btn2-url': isEn ? 'Button URL (e.g. https://github.com)' : 'لینک دکمه (مثال: /blog)',
        'set-hero-image': isEn ? 'Image URL or select from media library...' : 'آدرس تصویر یا انتخاب از رسانه‌خانه...',
        'set-features-title': isEn ? 'e.g. Why Choose CloudPress?' : 'مثال: چرا خدمات ما را انتخاب کنید؟',
        'set-features-subtitle': isEn ? 'e.g. Superior edge performance and zero server maintenance' : 'مثال: ارائه بالاترین کیفیت و رضایت برای مشتریان',
        'set-feat1-title': isEn ? 'High Performance & Speed' : 'سرعت و عملکرد بالا',
        'set-feat1-desc': isEn ? 'Short description of this feature...' : 'توضیح کوتاه این ویژگی...',
        'set-feat2-title': isEn ? 'Enterprise Security & Stability' : 'امنیت و کیفیت استاندارد',
        'set-feat2-desc': isEn ? 'Short description of this feature...' : 'توضیح کوتاه این ویژگی...',
        'set-feat3-title': isEn ? 'Unlimited Customization' : 'شخصی‌سازی و نوآوری',
        'set-feat3-desc': isEn ? 'Short description of this feature...' : 'توضیح کوتاه این ویژگی...',
        'set-custom-css': isEn ? 'body { /* Your custom CSS styles */ }' : 'body { /* استایل‌های دلخواه شما */ }',
        'set-custom-header': isEn ? '<!-- Google Analytics or custom meta tags -->' : '<!-- کدهای گوگل آنالیتیکس یا متاتگ‌ها -->',
        'set-custom-footer': isEn ? '<!-- Live chat widgets (Crisp, Intercom) or footer scripts -->' : '<!-- ابزارک گفتینو، کریسپ یا رایاچت -->',
        'prof-password': isEn ? 'Minimum 6 characters (optional)' : 'حداقل ۶ کاراکتر (اختیاری)',
        'post-slug': isEn ? 'Auto-generated from title' : 'خودکار از عنوان ساخته می‌شود',
        'post-html-editor': isEn ? 'Custom HTML code, video embed iframe, or tables...' : 'کدهای HTML دلخواه یا iframe ویدیو و جدول...',
        'page-slug': isEn ? 'e.g. about or contact' : 'مثلا about یا contact',
        'page-html-editor': isEn ? 'Custom HTML code, video embed iframe, or tables...' : 'کدهای HTML دلخواه یا iframe ویدیو و جدول...'
      };
      for (var phId in explicitPlaceholders) {
        var elPh = document.getElementById(phId);
        if (elPh) elPh.setAttribute('placeholder', explicitPlaceholders[phId]);
      }

      document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(function(input) {
        var ph = input.getAttribute('placeholder');
        if (ph && dict[ph.trim()]) {
          input.setAttribute('placeholder', dict[ph.trim()]);
        }
      });

      document.querySelectorAll('[title]').forEach(function(el) {
        var t = el.getAttribute('title');
        if (t && dict[t.trim()]) {
          el.setAttribute('title', dict[t.trim()]);
        }
      });

      var qp = document.getElementById('quick-add-page-select');
      if (qp && qp.options[0]) qp.options[0].text = isEn ? '+ Add from Pages' : '+ افزودن از برگه‌ها';
      var qc = document.getElementById('quick-add-cat-select');
      if (qc && qc.options[0]) qc.options[0].text = isEn ? '+ Add from Categories' : '+ افزودن از دسته‌ها';

      var pc = document.getElementById('post-category');
      if (pc && pc.options[0] && pc.options[0].value === '') {
        pc.options[0].text = isEn ? 'Uncategorized' : 'بدون دسته‌بندی';
      }

      var ps = document.getElementById('post-status');
      if (ps && ps.options.length >= 2) {
        ps.options[0].text = isEn ? 'Published (Public)' : 'منتشر شده (عمومی)';
        ps.options[1].text = isEn ? 'Draft (Private)' : 'پیش‌نویس (خصوصی)';
      }
      var pgs = document.getElementById('page-status');
      if (pgs && pgs.options.length >= 2) {
        pgs.options[0].text = isEn ? 'Published' : 'منتشر شده';
        pgs.options[1].text = isEn ? 'Draft' : 'پیش‌نویس';
      }
      var comApp = document.getElementById('set-comments-auto-approve');
      if (comApp && comApp.options.length >= 2) {
        comApp.options[0].text = isEn ? 'Auto-approve all comments' : 'تایید خودکار و نمایش آنی دیدگاه‌ها (Auto-Approve)';
        comApp.options[1].text = isEn ? 'Require admin moderation' : 'نیاز به بررسی و تایید دستی مدیر قبل از نمایش (Moderation)';
      }
    }

    var ADMIN_I18N = { fa: ADMIN_DICT_EN_TO_FA, en: ADMIN_DICT_FA_TO_EN };

    function updateQuillTooltips(toolbarEl, isEn) {
      if (!toolbarEl) return;
      var tooltips = isEn ? {
        'ql-bold': 'Bold',
        'ql-italic': 'Italic',
        'ql-underline': 'Underline',
        'ql-strike': 'Strike',
        'ql-blockquote': 'Quote',
        'ql-code-block': 'Code Block',
        'ql-link': 'Insert Link',
        'ql-image': 'Insert Image from Media',
        'ql-video': 'Embed Video (YouTube / Vimeo)',
        'ql-clean': 'Clear Formatting',
        'ql-direction': 'Text Direction (LTR / RTL)'
      } : {
        'ql-bold': 'درشت‌نویسی (Bold)',
        'ql-italic': 'مورب (Italic)',
        'ql-underline': 'خط زیرین (Underline)',
        'ql-strike': 'خط‌خوردگی (Strike)',
        'ql-blockquote': 'نقل‌قول (Quote)',
        'ql-code-block': 'بلوک کد (Code Block)',
        'ql-link': 'افزودن پیوند (Link)',
        'ql-image': 'افزودن تصویر از رسانه‌خانه',
        'ql-video': 'درج ویدیو آنلاین (YouTube / Vimeo)',
        'ql-clean': 'پاکسازی فرمت‌بندی',
        'ql-direction': 'تغییر جهت متن (راست‌چین/چپ‌چین)'
      };
      for (var cls in tooltips) {
        var btns = toolbarEl.querySelectorAll('.' + cls);
        btns.forEach(function(b) { b.setAttribute('title', tooltips[cls]); });
      }
      var headerPicker = toolbarEl.querySelector('.ql-header');
      if (headerPicker) headerPicker.setAttribute('title', isEn ? 'Header Size' : 'اندازه تیتر / سرتیتر');
      var colorPicker = toolbarEl.querySelector('.ql-color');
      if (colorPicker) colorPicker.setAttribute('title', isEn ? 'Text Color' : 'رنگ متن');
      var bgPicker = toolbarEl.querySelector('.ql-background');
      if (bgPicker) bgPicker.setAttribute('title', isEn ? 'Highlight Color' : 'رنگ هایلایت پس‌زمینه');
      var alignPicker = toolbarEl.querySelector('.ql-align');
      if (alignPicker) alignPicker.setAttribute('title', isEn ? 'Alignment' : 'ترازبندی متن');
      var listPickers = toolbarEl.querySelectorAll('.ql-list');
      if (listPickers[0]) listPickers[0].setAttribute('title', isEn ? 'Numbered List' : 'لیست شماره‌دار');
      if (listPickers[1]) listPickers[1].setAttribute('title', isEn ? 'Bulleted List' : 'لیست نشانه‌دار');
    }

    var addPersianTooltipsToQuillToolbar = function(t) { updateQuillTooltips(t, false); };

    function applyAdminLanguage(lang) {
      ADMIN_LANG = lang;
      var isEn = lang === 'en';
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('dir', isEn ? 'ltr' : 'rtl');
      
      document.body.style.fontFamily = isEn ? "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" : "'Vazirmatn', sans-serif";

      var toggleBtn = document.getElementById('admin-lang-text');
      if (toggleBtn) toggleBtn.innerText = isEn ? 'فارسی' : 'English';

      // Perform deep DOM translation
      translateAdminDOM(lang);

      var wHeading = document.getElementById('dash-welcome-heading');
      if (wHeading) {
        var rawUser = wHeading.getAttribute('data-user') || 'Admin';
        if (isEn) {
          var enUser = /[\u0600-\u06FF]/.test(rawUser) ? 'Admin' : rawUser;
          wHeading.innerHTML = 'Welcome, ' + escapeHtml(enUser) + '! 🚀';
        } else {
          wHeading.innerHTML = 'سلام ' + escapeHtml(rawUser) + ' عزیز! 🚀';
        }
      }
      var wDesc = document.getElementById('dash-welcome-desc');
      if (wDesc) {
        wDesc.innerText = isEn 
          ? 'CloudPress CMS is ready to publish articles and manage pages powered by Cloudflare Edge.'
          : 'سامانه مدیریت محتوای CloudPress آماده انتشار مقالات و مدیریت برگه‌ها بر بستر شبکه فوق‌سریع Edge است.';
      }

      var titles = {
        dashboard: isEn ? 'Dashboard' : 'داشبورد اصلی',
        posts: isEn ? 'Posts & Articles' : 'مدیریت مقالات و نوشته‌ها',
        pages: isEn ? 'Pages Management' : 'مدیریت برگه‌ها',
        categories: isEn ? 'Categories' : 'دسته‌بندی‌ها',
        media: isEn ? 'Media Library' : 'رسانه‌خانه (تصاویر)',
        comments: isEn ? 'Comments Moderation' : 'مدیریت دیدگاه‌ها',
        settings: isEn ? 'Settings & Menu Builder' : 'تنظیمات و منوساز',
        profile: isEn ? 'Profile & Security' : 'پروفایل و امنیت'
      };
      var titleEl = document.getElementById('current-page-title');
      if (titleEl) titleEl.innerText = titles[currentTab] || (isEn ? 'Admin Panel' : 'پنل مدیریت');

      if (postQuill && postQuill.getModule('toolbar')) {
        updateQuillTooltips(postQuill.getModule('toolbar').container, isEn);
        postQuill.root.dataset.placeholder = isEn ? 'Write article content here...' : 'متن مقاله را اینجا بنویسید...';
      }
      if (pageQuill && pageQuill.getModule('toolbar')) {
        updateQuillTooltips(pageQuill.getModule('toolbar').container, isEn);
        pageQuill.root.dataset.placeholder = isEn ? 'Write page content here...' : 'محتوای برگه را اینجا بنویسید...';
      }
    }

    function toggleAdminLanguage() {
      ADMIN_LANG = (ADMIN_LANG === 'fa') ? 'en' : 'fa';
      localStorage.setItem('cp_admin_lang', ADMIN_LANG);
      applyAdminLanguage(ADMIN_LANG);
      if (currentTab === 'posts' && postsData && postsData.length) renderPostsTable(postsData);
      if (currentTab === 'pages' && pagesData && pagesData.length) renderPagesTable(pagesData);
      if (currentTab === 'categories' && categoriesData && categoriesData.length) renderCategoriesTable();
      if (currentTab === 'comments' && commentsData && commentsData.length) renderCommentsTable();
    }

    function updatePostStats() {
      var text = postQuill.getText().trim();
      var words = text ? text.split(/\\s+/).filter(Boolean).length : 0;
      var minutes = Math.max(1, Math.ceil(words / 200));
      var isEn = ADMIN_LANG === 'en';
      document.getElementById('editor-word-count').innerText = isEn ? (words + ' words • ' + minutes + ' min read') : (words + ' کلمه • ' + minutes + ' دقیقه مطالعه');
    }

    // Toggle HTML Source Code View for Post and Page Editors
    function toggleHtmlSourceView(type) {
      var isPost = type === 'post';
      var quill = isPost ? postQuill : pageQuill;
      var wrapper = document.getElementById(isPost ? 'post-quill-wrapper' : 'page-quill-wrapper');
      var textarea = document.getElementById(isPost ? 'post-html-editor' : 'page-html-editor');
      var textLabel = document.getElementById(isPost ? 'post-html-toggle-text' : 'page-html-toggle-text');
      var isEn = ADMIN_LANG === 'en';

      if (textarea.classList.contains('hidden')) {
        textarea.value = quill.root.innerHTML;
        wrapper.classList.add('hidden');
        textarea.classList.remove('hidden');
        textLabel.innerText = isEn ? 'Back to Visual Editor' : 'بازگشت به ویرایشگر دیداری';
      } else {
        quill.root.innerHTML = textarea.value;
        textarea.classList.add('hidden');
        wrapper.classList.remove('hidden');
        textLabel.innerText = isEn ? 'View HTML Source' : 'مشاهده کد HTML';
        if (isPost) {
          updatePostStats();
          savePostDraft();
          updateSeoPreview();
        }
      }
    }

    // Auto-calculate word count & reading time on typing
    postQuill.on('text-change', function() {
      updatePostStats();
      savePostDraft();
      updateSeoPreview();
    });

    var currentTab = 'dashboard';
    var postsData = [];
    var pagesData = [];
    var categoriesData = [];
    var mediaData = [];
    var commentsData = [];
    var settingsData = {};

    function switchTab(tabId) {
      currentTab = tabId;
      document.querySelectorAll('.tab-view').forEach(function(el) { el.classList.add('hidden'); });
      document.querySelectorAll('.nav-tab-btn').forEach(function(el) {
        el.classList.remove('bg-brand-600/15', 'text-brand-400', 'font-bold');
        el.classList.add('text-slate-400');
      });

      var viewEl = document.getElementById('view-' + tabId);
      var btnEl = document.getElementById('tab-btn-' + tabId);
      if (viewEl) viewEl.classList.remove('hidden');
      if (btnEl) {
        btnEl.classList.add('bg-brand-600/15', 'text-brand-400', 'font-bold');
        btnEl.classList.remove('text-slate-400');
      }

      var isEn = ADMIN_LANG === 'en';
      var titles = {
        dashboard: isEn ? 'Dashboard' : 'داشبورد اصلی',
        posts: isEn ? 'Posts & Articles' : 'مدیریت مقالات و نوشته‌ها',
        pages: isEn ? 'Pages Management' : 'مدیریت برگه‌ها',
        categories: isEn ? 'Categories' : 'دسته‌بندی‌ها',
        media: isEn ? 'Media Library' : 'رسانه‌خانه (تصاویر)',
        comments: isEn ? 'Comments Moderation' : 'مدیریت دیدگاه‌ها',
        settings: isEn ? 'Settings & Menu Builder' : 'تنظیمات و منوساز',
        profile: isEn ? 'Profile & Security' : 'پروفایل و امنیت'
      };
      document.getElementById('current-page-title').innerText = titles[tabId] || (isEn ? 'Admin Panel' : 'پنل مدیریت');

      if (tabId === 'dashboard') loadStats();
      if (tabId === 'posts') loadPosts();
      if (tabId === 'pages') loadPages();
      if (tabId === 'categories') loadCategories();
      if (tabId === 'media') loadMedia();
      if (tabId === 'comments') loadComments();
      if (tabId === 'settings') loadSettings();
    }

    async function loadStats() {
      try {
        var res = await fetch('/admin/api/stats');
        if (res.ok) {
          var data = await res.json();
          document.getElementById('stat-posts-count').innerText = data.postsCount || 0;
          document.getElementById('stat-pages-count').innerText = data.pagesCount || 0;
          document.getElementById('stat-comments-count').innerText = data.commentsCount || 0;
          document.getElementById('stat-views-count').innerText = data.totalViews || 0;
          document.getElementById('badge-posts-count').innerText = data.postsCount || 0;
          document.getElementById('badge-pages-count').innerText = data.pagesCount || 0;

          var rp = data.recentPosts || [];
          var rpHtml = '';
          var isEn = ADMIN_LANG === 'en';
          if (rp.length === 0) {
            rpHtml = '<tr><td class="py-4 text-center text-slate-500">' + (isEn ? 'No articles yet.' : 'هیچ مقاله‌ای ثبت نشده است.') + '</td></tr>';
          } else {
            for (var i = 0; i < rp.length; i++) {
              var p = rp[i];
              rpHtml += '<tr>';
              rpHtml += '<td class="py-3 font-semibold text-slate-200">' + escapeHtml(p.title) + '</td>';
              rpHtml += '<td class="py-3 text-slate-400 text-left">' + (p.views_count || 0) + (isEn ? ' views' : ' بازدید') + '</td>';
              rpHtml += '</tr>';
            }
          }
          document.getElementById('dash-recent-posts').innerHTML = rpHtml;

          var rc = data.recentComments || [];
          var rcHtml = '';
          if (rc.length === 0) {
            rcHtml = '<div class="py-4 text-center text-slate-500">' + (isEn ? 'No comments yet.' : 'هیچ دیدگاهی موجود نیست.') + '</div>';
          } else {
            for (var j = 0; j < rc.length; j++) {
              var c = rc[j];
              rcHtml += '<div class="p-3 bg-slate-800/40 rounded-xl border border-slate-800">';
              rcHtml += '<div class="font-bold text-brand-400 mb-1">' + escapeHtml(c.author_name) + '</div>';
              rcHtml += '<p class="text-slate-300 line-clamp-2">' + escapeHtml(c.content) + '</p>';
              rcHtml += '</div>';
            }
          }
          document.getElementById('dash-recent-comments').innerHTML = rcHtml;
        }
      } catch (e) { console.error(e); }
    }

    // Posts Functions with Live Filter Search
    async function loadPosts() {
      try {
        var res = await fetch('/admin/api/posts');
        if (res.ok) {
          postsData = await res.json();
          renderPostsTable(postsData);
        }
      } catch(e) { console.error(e); }
    }

    function filterPostsTable(query) {
      if (!query) {
        renderPostsTable(postsData);
        return;
      }
      var q = query.toLowerCase();
      var filtered = postsData.filter(function(p) {
        return (p.title && p.title.toLowerCase().includes(q)) || (p.slug && p.slug.toLowerCase().includes(q));
      });
      renderPostsTable(filtered);
    }

    function renderPostsTable(list) {
      var tbody = document.getElementById('posts-table-body');
      if (!tbody) return;
      var isEn = ADMIN_LANG === 'en';
      if (!list || list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="px-4 py-8 text-center text-slate-500">' + (isEn ? 'No articles found.' : 'هیچ مقاله‌ای یافت نشد.') + '</td></tr>';
        return;
      }
      var html = '';
      for (var i = 0; i < list.length; i++) {
        var p = list[i];
        var statusBadge = p.status === 'published' ? '<span class="px-2.5 py-1 text-xs font-semibold bg-emerald-500/10 text-emerald-400 rounded-full">' + (isEn ? 'Published' : 'منتشر شده') + '</span>' : '<span class="px-2.5 py-1 text-xs font-semibold bg-amber-500/10 text-amber-400 rounded-full">' + (isEn ? 'Draft' : 'پیش‌نویس') + '</span>';
        var catName = p.category_name ? (isEn && p.category_name === 'بدون دسته‌بندی' ? 'Uncategorized' : p.category_name) : '-';
        html += '<tr>';
        html += '<td class="px-4 py-4 font-bold text-slate-200">' + escapeHtml(p.title) + '</td>';
        html += '<td class="px-4 py-4 text-slate-400 text-xs">' + escapeHtml(catName) + '</td>';
        html += '<td class="px-4 py-4 text-slate-400 text-xs dir-ltr text-right">' + escapeHtml(p.slug) + '</td>';
        html += '<td class="px-4 py-4 text-slate-400 text-xs">' + (p.views_count || 0) + '</td>';
        html += '<td class="px-4 py-4">' + statusBadge + '</td>';
        html += '<td class="px-4 py-4 text-left"><div class="flex items-center justify-end gap-2">';
        html += '<a href="/blog/' + p.slug + '" target="_blank" class="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white" title="' + (isEn ? 'View' : 'مشاهده') + '"><i data-lucide="eye" class="w-4 h-4"></i></a>';
        html += '<button onclick="editPost(' + p.id + ')" class="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-brand-400" title="' + (isEn ? 'Edit' : 'ویرایش') + '"><i data-lucide="edit-3" class="w-4 h-4"></i></button>';
        html += '<button onclick="deletePost(' + p.id + ')" class="p-1.5 hover:bg-rose-500/10 rounded-lg text-slate-400 hover:text-rose-400" title="' + (isEn ? 'Delete' : 'حذف') + '"><i data-lucide="trash-2" class="w-4 h-4"></i></button>';
        html += '</div></td>';
        html += '</tr>';
      }
      tbody.innerHTML = html;
      lucide.createIcons();
    }

    function onPostTitleChange(val) {
      var slugInput = document.getElementById('post-slug');
      if (!document.getElementById('post-id').value || !slugInput.value) {
        slugInput.value = slugifyClient(val);
      }
      updateSeoPreview();
      savePostDraft();
    }

    function updateSeoPreview() {
      var isEn = ADMIN_LANG === 'en';
      var title = document.getElementById('post-title').value || (isEn ? 'Your Post Title' : 'عنوان نوشته شما');
      var slug = document.getElementById('post-slug').value || 'url-slug';
      var excerpt = document.getElementById('post-excerpt').value || postQuill.getText().slice(0, 120) || (isEn ? 'Your post summary will appear here...' : 'خلاصه مقاله شما در اینجا نمایش داده خواهد شد...');

      document.getElementById('seo-preview-title').innerText = title;
      document.getElementById('seo-preview-url').innerText = window.location.origin + '/blog/' + slug;
      document.getElementById('seo-preview-desc').innerText = excerpt;
    }

    // Post Auto-Save Draft
    function savePostDraft() {
      var id = document.getElementById('post-id').value;
      if (id) return; // Don't auto-save over existing edited posts
      var draft = {
        title: document.getElementById('post-title').value,
        slug: document.getElementById('post-slug').value,
        excerpt: document.getElementById('post-excerpt').value,
        cover: document.getElementById('post-cover').value,
        content: postQuill.root.innerHTML
      };
      if (draft.title || draft.content.length > 20) {
        localStorage.setItem('cp_draft_post', JSON.stringify(draft));
      }
    }

    function restorePostDraft() {
      var raw = localStorage.getItem('cp_draft_post');
      if (!raw) return;
      var draft = JSON.parse(raw);
      document.getElementById('post-title').value = draft.title || '';
      document.getElementById('post-slug').value = draft.slug || '';
      document.getElementById('post-excerpt').value = draft.excerpt || '';
      if (draft.cover) setPostCover(draft.cover);
      
      var htmlEditor = document.getElementById('post-html-editor');
      if (htmlEditor && !htmlEditor.classList.contains('hidden')) {
        toggleHtmlSourceView('post');
      }
      postQuill.root.innerHTML = draft.content || '';
      document.getElementById('post-draft-banner').classList.add('hidden');
      updatePostStats();
      updateSeoPreview();
    }

    function dismissPostDraft() {
      localStorage.removeItem('cp_draft_post');
      document.getElementById('post-draft-banner').classList.add('hidden');
    }

    function openPostModal(post) {
      var isEn = ADMIN_LANG === 'en';
      document.getElementById('post-id').value = post ? post.id : '';
      document.getElementById('post-title').value = post ? post.title : '';
      document.getElementById('post-slug').value = post ? post.slug : '';
      document.getElementById('post-excerpt').value = post ? post.excerpt || '' : '';
      document.getElementById('post-status').value = post ? post.status : 'published';
      
      var htmlEditor = document.getElementById('post-html-editor');
      if (htmlEditor && !htmlEditor.classList.contains('hidden')) {
        toggleHtmlSourceView('post');
      }
      postQuill.root.innerHTML = post ? (post.content || '') : '';
      updatePostStats();
      document.getElementById('post-modal-title').innerText = post ? (isEn ? 'Edit Post' : 'ویرایش نوشته') : (isEn ? 'Add New Post' : 'افزودن نوشته جدید');

      if (post && post.cover_image) {
        setPostCover(post.cover_image);
      } else {
        removePostCover();
      }

      var catSelect = document.getElementById('post-category');
      catSelect.innerHTML = '<option value="">' + (isEn ? 'Uncategorized' : 'بدون دسته‌بندی') + '</option>';
      for (var i = 0; i < categoriesData.length; i++) {
        var c = categoriesData[i];
        var isSelected = (post && post.category_id == c.id) ? 'selected' : '';
        catSelect.innerHTML += '<option value="' + c.id + '" ' + isSelected + '>' + escapeHtml(c.name) + '</option>';
      }

      if (!post && localStorage.getItem('cp_draft_post')) {
        document.getElementById('post-draft-banner').classList.remove('hidden');
      } else {
        document.getElementById('post-draft-banner').classList.add('hidden');
      }

      updateSeoPreview();
      translateAdminDOM(ADMIN_LANG);
      document.getElementById('post-modal').classList.remove('hidden');
      lucide.createIcons();
    }

    function closePostModal() {
      document.getElementById('post-modal').classList.add('hidden');
    }

    function setPostCover(url) {
      document.getElementById('post-cover').value = url;
      var img = document.getElementById('post-cover-img');
      img.src = url;
      img.classList.remove('hidden');
      document.getElementById('post-cover-placeholder').classList.add('hidden');
      document.getElementById('post-cover-remove-btn').classList.remove('hidden');
    }

    function removePostCover() {
      document.getElementById('post-cover').value = '';
      var img = document.getElementById('post-cover-img');
      img.src = '';
      img.classList.add('hidden');
      document.getElementById('post-cover-placeholder').classList.remove('hidden');
      document.getElementById('post-cover-remove-btn').classList.add('hidden');
    }

    function editPost(id) {
      var post = postsData.find(function(item) { return item.id === id; });
      if (post) openPostModal(post);
    }

    async function deletePost(id) {
      var isEn = ADMIN_LANG === 'en';
      if (!confirm(isEn ? 'Are you sure you want to delete this article? All its comments will be deleted too.' : 'آیا از حذف این نوشته اطمینان دارید؟ تمامی دیدگاه‌های آن نیز حذف خواهند شد.')) return;
      try {
        var res = await fetch('/admin/api/posts?id=' + id, { method: 'DELETE' });
        if (res.ok) loadPosts();
      } catch (e) { alert(isEn ? 'Error deleting post' : 'خطا در حذف نوشته'); }
    }

    document.getElementById('post-form').addEventListener('submit', async function(e) {
      e.preventDefault();
      var id = document.getElementById('post-id').value;
      var title = document.getElementById('post-title').value;
      var slug = document.getElementById('post-slug').value;
      var cover_image = document.getElementById('post-cover').value;
      var excerpt = document.getElementById('post-excerpt').value;
      var category_id = document.getElementById('post-category').value;
      var status = document.getElementById('post-status').value;

      var htmlEditor = document.getElementById('post-html-editor');
      if (htmlEditor && !htmlEditor.classList.contains('hidden')) {
        postQuill.root.innerHTML = htmlEditor.value;
      }
      var content = postQuill.root.innerHTML;

      var payload = { title: title, slug: slug, cover_image: cover_image, excerpt: excerpt, category_id: category_id, status: status, content: content };
      if (id) payload.id = parseInt(id);

      try {
        var res = await fetch('/admin/api/posts', {
          method: id ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          localStorage.removeItem('cp_draft_post');
          closePostModal();
          loadPosts();
        } else {
          var err = await res.json();
          alert('خطا: ' + (err.error || 'عملیات ناموفق بود'));
        }
      } catch (err) { alert('خطا در ارتباط با سرور'); }
    });

    // Live Device Preview
    function openLiveDevicePreview() {
      var title = document.getElementById('post-title').value || 'عنوان پیش‌نمایش';
      var cover = document.getElementById('post-cover').value;
      var content = postQuill.root.innerHTML;

      var html = '<h2 class="text-base font-bold text-white mb-2">' + escapeHtml(title) + '</h2>';
      if (cover) html += '<img src="' + escapeHtml(cover) + '" class="w-full h-36 rounded-xl object-cover mb-3">';
      html += '<div class="prose prose-invert text-xs">' + content + '</div>';

      document.getElementById('phone-preview-content').innerHTML = html;
      document.getElementById('device-preview-modal').classList.remove('hidden');
      lucide.createIcons();
    }

    function closeLiveDevicePreview() {
      document.getElementById('device-preview-modal').classList.add('hidden');
    }

    // Pages Functions with Live Search
    async function loadPages() {
      try {
        var res = await fetch('/admin/api/pages');
        if (res.ok) {
          pagesData = await res.json();
          renderPagesTable(pagesData);
          populateQuickMenuDropdowns();
        }
      } catch(e) { console.error(e); }
    }

    function filterPagesTable(query) {
      if (!query) {
        renderPagesTable(pagesData);
        return;
      }
      var q = query.toLowerCase();
      var filtered = pagesData.filter(function(p) {
        return (p.title && p.title.toLowerCase().includes(q)) || (p.slug && p.slug.toLowerCase().includes(q));
      });
      renderPagesTable(filtered);
    }

    function renderPagesTable(list) {
      var tbody = document.getElementById('pages-table-body');
      if (!tbody) return;
      var isEn = ADMIN_LANG === 'en';
      if (!list || list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="px-4 py-8 text-center text-slate-500">' + (isEn ? 'No pages found.' : 'هیچ برگه‌ای یافت نشد.') + '</td></tr>';
        return;
      }
      var html = '';
      for (var i = 0; i < list.length; i++) {
        var p = list[i];
        var statusBadge = p.status === 'published' ? '<span class="px-2.5 py-1 text-xs font-semibold bg-emerald-500/10 text-emerald-400 rounded-full">' + (isEn ? 'Published' : 'منتشر شده') + '</span>' : '<span class="px-2.5 py-1 text-xs font-semibold bg-amber-500/10 text-amber-400 rounded-full">' + (isEn ? 'Draft' : 'پیش‌نویس') + '</span>';
        html += '<tr>';
        html += '<td class="px-4 py-4 font-bold text-slate-200">' + escapeHtml(p.title) + '</td>';
        html += '<td class="px-4 py-4 text-slate-400 text-xs dir-ltr text-right">' + escapeHtml(p.slug) + '</td>';
        html += '<td class="px-4 py-4">' + statusBadge + '</td>';
        html += '<td class="px-4 py-4 text-left"><div class="flex items-center justify-end gap-2">';
        html += '<a href="/' + (p.slug === '/' ? '' : p.slug) + '" target="_blank" class="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white" title="View"><i data-lucide="eye" class="w-4 h-4"></i></a>';
        html += '<button onclick="editPage(' + p.id + ')" class="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-brand-400" title="Edit"><i data-lucide="edit-3" class="w-4 h-4"></i></button>';
        html += '<button onclick="deletePage(' + p.id + ')" class="p-1.5 hover:bg-rose-500/10 rounded-lg text-slate-400 hover:text-rose-400" title="Delete"><i data-lucide="trash-2" class="w-4 h-4"></i></button>';
        html += '</div></td>';
        html += '</tr>';
      }
      tbody.innerHTML = html;
      lucide.createIcons();
    }

    function onPageTitleChange(val) {
      var slugInput = document.getElementById('page-slug');
      if (!document.getElementById('page-id').value || !slugInput.value) {
        slugInput.value = slugifyClient(val);
      }
    }

    function openPageModal(page) {
      var isEn = ADMIN_LANG === 'en';
      document.getElementById('page-id').value = page ? page.id : '';
      document.getElementById('page-title').value = page ? page.title : '';
      document.getElementById('page-slug').value = page ? page.slug : '';
      document.getElementById('page-status').value = page ? page.status : 'published';

      var htmlEditor = document.getElementById('page-html-editor');
      if (htmlEditor && !htmlEditor.classList.contains('hidden')) {
        toggleHtmlSourceView('page');
      }
      pageQuill.root.innerHTML = page ? (page.content || '') : '';
      document.getElementById('page-modal-title').innerText = page ? (isEn ? 'Edit Page' : 'ویرایش برگه') : (isEn ? 'Add New Page' : 'افزودن برگه جدید');
      translateAdminDOM(ADMIN_LANG);
      document.getElementById('page-modal').classList.remove('hidden');
    }

    function closePageModal() {
      document.getElementById('page-modal').classList.add('hidden');
    }

    function editPage(id) {
      var page = pagesData.find(function(item) { return item.id === id; });
      if (page) openPageModal(page);
    }

    async function deletePage(id) {
      var isEn = ADMIN_LANG === 'en';
      if (!confirm(isEn ? 'Are you sure you want to delete this page?' : 'آیا از حذف این برگه اطمینان دارید؟')) return;
      try {
        var res = await fetch('/admin/api/pages?id=' + id, { method: 'DELETE' });
        if (res.ok) loadPages();
      } catch (e) { alert(isEn ? 'Error deleting page' : 'خطا در حذف برگه'); }
    }

    document.getElementById('page-form').addEventListener('submit', async function(e) {
      e.preventDefault();
      var id = document.getElementById('page-id').value;
      var title = document.getElementById('page-title').value;
      var slug = document.getElementById('page-slug').value;
      var status = document.getElementById('page-status').value;

      var htmlEditor = document.getElementById('page-html-editor');
      if (htmlEditor && !htmlEditor.classList.contains('hidden')) {
        pageQuill.root.innerHTML = htmlEditor.value;
      }
      var content = pageQuill.root.innerHTML;

      var payload = { title: title, slug: slug, status: status, content: content };
      if (id) payload.id = parseInt(id);

      try {
        var res = await fetch('/admin/api/pages', {
          method: id ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          closePageModal();
          loadPages();
        } else {
          var err = await res.json();
          alert('خطا: ' + (err.error || 'عملیات ناموفق بود'));
        }
      } catch (err) { alert('خطا در ارتباط با سرور'); }
    });

    // Categories Functions
    async function loadCategories() {
      try {
        var res = await fetch('/admin/api/categories');
        if (res.ok) {
          categoriesData = await res.json();
          renderCategoriesTable();
          populateQuickMenuDropdowns();
        }
      } catch (e) { console.error(e); }
    }

    function renderCategoriesTable() {
      var tbody = document.getElementById('categories-table-body');
      if (!tbody) return;
      var isEn = ADMIN_LANG === 'en';
      if (!categoriesData || categoriesData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="px-4 py-8 text-center text-slate-500">' + (isEn ? 'No categories found.' : 'هیچ دسته‌بندی یافت نشد.') + '</td></tr>';
        return;
      }
      var html = '';
      for (var i = 0; i < categoriesData.length; i++) {
        var c = categoriesData[i];
        html += '<tr>';
        html += '<td class="px-4 py-4 font-bold text-slate-200">' + escapeHtml(c.name) + '</td>';
        html += '<td class="px-4 py-4 text-slate-400 text-xs dir-ltr text-right">' + escapeHtml(c.slug) + '</td>';
        html += '<td class="px-4 py-4 text-slate-400 text-xs">' + (c.post_count || 0) + (isEn ? ' articles' : ' مقاله') + '</td>';
        html += '<td class="px-4 py-4 text-left">';
        html += '<button onclick="deleteCategory(' + c.id + ')" class="p-1.5 hover:bg-rose-500/10 rounded-lg text-slate-400 hover:text-rose-400" title="Delete"><i data-lucide="trash-2" class="w-4 h-4"></i></button>';
        html += '</td>';
        html += '</tr>';
      }
      tbody.innerHTML = html;
      lucide.createIcons();
    }

    document.getElementById('category-form').addEventListener('submit', async function(e) {
      e.preventDefault();
      var name = document.getElementById('cat-name').value;
      var slug = document.getElementById('cat-slug').value;
      var desc = document.getElementById('cat-desc').value;

      try {
        var res = await fetch('/admin/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, slug: slug, description: desc })
        });
        if (res.ok) {
          document.getElementById('category-form').reset();
          loadCategories();
        }
      } catch (err) { alert('خطا در ثبت دسته'); }
    });

    async function deleteCategory(id) {
      var isEn = ADMIN_LANG === 'en';
      if (!confirm(isEn ? 'Are you sure you want to delete this category?' : 'آیا از حذف این دسته‌بندی اطمینان دارید؟')) return;
      try {
        var res = await fetch('/admin/api/categories?id=' + id, { method: 'DELETE' });
        if (res.ok) loadCategories();
      } catch (e) { alert(isEn ? 'Error deleting category' : 'خطا در حذف دسته‌بندی'); }
    }

    // Smart Image Compression with Canvas & Progress Bar
    function compressImageFile(file, maxWidth, quality, onProgress) {
      return new Promise(function(resolve, reject) {
        if (onProgress) onProgress(20, 'در حال خواندن فایل تصویر...');
        var reader = new FileReader();
        reader.onload = function(event) {
          if (onProgress) onProgress(45, 'در حال پردازش و بهینه‌سازی...');
          var img = new Image();
          img.onload = function() {
            var canvas = document.createElement('canvas');
            var width = img.width;
            var height = img.height;

            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            if (onProgress) onProgress(75, 'در حال فشرده‌سازی با فرمت WebP...');
            var base64 = canvas.toDataURL('image/webp', quality || 0.82);
            resolve({ data: base64, mime_type: 'image/webp' });
          };
          img.onerror = reject;
          img.src = event.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    function showProgress(percentage, text) {
      var box = document.getElementById('upload-progress-box');
      box.classList.remove('hidden');
      document.getElementById('upload-percentage').innerText = percentage + '%';
      document.getElementById('upload-progress-bar').style.width = percentage + '%';
      if (text) document.getElementById('upload-status-text').innerText = text;
    }

    function hideProgress() {
      setTimeout(function() {
        document.getElementById('upload-progress-box').classList.add('hidden');
        document.getElementById('upload-progress-bar').style.width = '0%';
      }, 800);
    }

    async function uploadImageWithProgress(event) {
      var file = event.target.files[0];
      if (!file) return;

      try {
        showProgress(10, 'در حال شروع فشرده‌سازی...');
        var compressed = await compressImageFile(file, 1280, 0.82, function(p, t) {
          showProgress(p, t);
        });

        showProgress(85, 'در حال ذخیره‌سازی در دیتابیس D1...');
        var res = await fetch('/admin/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: file.name,
            data: compressed.data,
            mime_type: compressed.mime_type,
            size: compressed.data.length
          })
        });

        if (res.ok) {
          showProgress(100, 'آپلود با موفقیت انجام شد!');
          hideProgress();
          loadMedia();
        } else {
          alert('خطا در ذخیره‌سازی تصویر در دیتابیس');
          hideProgress();
        }
      } catch (err) {
        alert('خطا در فشرده‌سازی تصویر');
        hideProgress();
      }
    }

    async function uploadDirectCover(event, type) {
      var file = event.target.files[0];
      if (!file) return;
      try {
        showProgress(20, 'در حال فشرده‌سازی تصویر کاور...');
        var compressed = await compressImageFile(file, 1280, 0.82, function(p, t) {
          showProgress(p, t);
        });
        showProgress(80, 'در حال ذخیره...');
        var res = await fetch('/admin/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: file.name,
            data: compressed.data,
            mime_type: compressed.mime_type,
            size: compressed.data.length
          })
        });
        if (res.ok) {
          showProgress(100, 'کاور با موفقیت تنظیم شد!');
          hideProgress();
          setPostCover(compressed.data);
          loadMedia();
        }
      } catch(e) { hideProgress(); }
    }

    // Media Functions
    async function loadMedia() {
      try {
        var res = await fetch('/admin/api/media');
        if (res.ok) {
          mediaData = await res.json();
          renderMediaGrid();
        }
      } catch (e) { console.error(e); }
    }

    function renderMediaGrid() {
      var grid = document.getElementById('media-grid');
      if (!grid) return;
      if (!mediaData || mediaData.length === 0) {
        grid.innerHTML = '<div class="col-span-full py-12 text-center text-slate-500">هیچ تصویری آپلود نشده است. با دکمه بالا اولین تصویر را آپلود کنید.</div>';
        return;
      }
      var html = '';
      for (var i = 0; i < mediaData.length; i++) {
        var m = mediaData[i];
        html += '<div class="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700/80 aspect-square flex items-center justify-center">';
        html += '<img src="' + escapeHtml(m.data) + '" alt="' + escapeHtml(m.name) + '" class="w-full h-full object-cover">';
        html += '<div class="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition duration-200 p-3 flex flex-col justify-between">';
        html += '<div class="text-[11px] font-bold text-white truncate">' + escapeHtml(m.name) + '</div>';
        html += '<div class="flex items-center justify-between gap-1">';
        html += '<button onclick="copyMediaUrl(' + m.id + ')" class="p-1.5 bg-brand-600 text-white rounded-lg text-xs" title="کپی دیتای تصویر"><i data-lucide="copy" class="w-3.5 h-3.5"></i></button>';
        html += '<button onclick="deleteMedia(' + m.id + ')" class="p-1.5 bg-rose-600/80 text-white rounded-lg text-xs" title="حذف"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
      }
      grid.innerHTML = html;
      lucide.createIcons();
    }

    function copyMediaUrl(id) {
      var isEn = ADMIN_LANG === 'en';
      var item = mediaData.find(function(x) { return x.id === id; });
      if (!item) return;
      navigator.clipboard.writeText(item.data).then(function() {
        alert(isEn ? 'Image data copied to clipboard.' : 'داده تصویر در حافظه کپی شد.');
      });
    }

    async function deleteMedia(id) {
      var isEn = ADMIN_LANG === 'en';
      if (!confirm(isEn ? 'Are you sure you want to delete this image?' : 'آیا از حذف این تصویر اطمینان دارید؟')) return;
      try {
        var res = await fetch('/admin/api/media?id=' + id, { method: 'DELETE' });
        if (res.ok) loadMedia();
      } catch (e) { alert(isEn ? 'Error deleting image' : 'خطا در حذف تصویر'); }
    }

    // Visual Media Picker Modal with Multi-target Support
    var activeMediaPickerTarget = 'postCover';

    function openMediaPickerModal(target) {
      var isEn = ADMIN_LANG === 'en';
      activeMediaPickerTarget = target || 'postCover';
      var grid = document.getElementById('media-picker-grid');
      if (!mediaData || mediaData.length === 0) {
        grid.innerHTML = '<div class="col-span-full py-12 text-center text-slate-400 text-xs">' + (isEn ? 'Media library is empty. Upload an image first.' : 'رسانه‌خانه خالی است. ابتدا تصویری آپلود کنید.') + '</div>';
      } else {
        var html = '';
        for (var i = 0; i < mediaData.length; i++) {
          var m = mediaData[i];
          html += '<div onclick="selectMediaForTarget(' + m.id + ')" class="cursor-pointer border-2 border-transparent hover:border-brand-500 rounded-xl overflow-hidden aspect-square bg-slate-800 transition">';
          html += '<img src="' + escapeHtml(m.data) + '" class="w-full h-full object-cover">';
          html += '</div>';
        }
        grid.innerHTML = html;
      }
      translateAdminDOM(ADMIN_LANG);
      document.getElementById('media-picker-modal').classList.remove('hidden');
      lucide.createIcons();
    }

    function openMediaPickerFor(targetFieldId) {
      openMediaPickerModal(targetFieldId);
    }

    function closeMediaPickerModal() {
      document.getElementById('media-picker-modal').classList.add('hidden');
    }

    function selectMediaForCover(id) {
      selectMediaForTarget(id);
    }

    function selectMediaForTarget(id) {
      var item = mediaData.find(function(x) { return x.id === id; });
      if (!item) return;

      if (activeMediaPickerTarget === 'postCover' || activeMediaPickerTarget === 'post') {
        setPostCover(item.data);
      } else if (activeMediaPickerTarget === 'postQuill') {
        insertImageIntoQuill(postQuill, item.data);
      } else if (activeMediaPickerTarget === 'pageQuill') {
        insertImageIntoQuill(pageQuill, item.data);
      } else if (activeMediaPickerTarget === 'set-logo') {
        setSettingImage('set-logo', 'set-logo-preview', item.data);
      } else if (activeMediaPickerTarget === 'set-favicon') {
        setSettingImage('set-favicon', 'set-favicon-preview', item.data);
      } else if (activeMediaPickerTarget === 'set-hero-image') {
        setSettingImage('set-hero-image', 'set-hero-preview', item.data);
      }
      closeMediaPickerModal();
    }

    function insertImageIntoQuill(quill, url) {
      var range = quill.getSelection(true);
      var index = range ? range.index : quill.getLength();
      quill.insertEmbed(index, 'image', url);
      quill.setSelection(index + 1);
      if (quill === postQuill) {
        updatePostStats();
        savePostDraft();
        updateSeoPreview();
      }
    }

    async function uploadImageFromPicker(event) {
      var file = event.target.files[0];
      if (!file) return;
      try {
        showProgress(15, 'در حال بهینه‌سازی و فشرده‌سازی تصویر...');
        var compressed = await compressImageFile(file, 1280, 0.82, function(p, t) {
          showProgress(p, t);
        });

        showProgress(80, 'در حال ذخیره‌سازی در دیتابیس D1...');
        var res = await fetch('/admin/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: file.name,
            data: compressed.data,
            mime_type: compressed.mime_type,
            size: compressed.data.length
          })
        });

        if (res.ok) {
          showProgress(100, 'آپلود با موفقیت انجام شد!');
          hideProgress();
          await loadMedia();
          var newest = (mediaData && mediaData.length > 0) ? mediaData[0] : null;
          if (newest) {
            selectMediaForTarget(newest.id);
          }
        } else {
          alert('خطا در ذخیره‌سازی تصویر در دیتابیس');
          hideProgress();
        }
      } catch (err) {
        alert('خطا در پردازش تصویر');
        hideProgress();
      }
    }

    function setSettingImage(fieldId, previewId, url) {
      var inp = document.getElementById(fieldId);
      if (inp) inp.value = url;
      updateImagePreview(fieldId, previewId);
    }

    function updateImagePreview(fieldId, previewId) {
      var inp = document.getElementById(fieldId);
      var prev = document.getElementById(previewId);
      if (!inp || !prev) return;
      if (inp.value) {
        prev.classList.remove('hidden');
        prev.innerHTML = '<img src="' + escapeHtml(inp.value) + '" class="w-full h-full object-contain">';
      } else {
        if (fieldId === 'set-hero-image') {
          prev.classList.add('hidden');
          prev.innerHTML = '';
        } else {
          prev.classList.remove('hidden');
          prev.innerHTML = '<span class="text-[10px] text-slate-500">بدون تصویر</span>';
        }
      }
    }

    function clearImageField(fieldId, previewId) {
      var inp = document.getElementById(fieldId);
      if (inp) inp.value = '';
      updateImagePreview(fieldId, previewId);
    }

    function syncColorInput(val) {
      var textInp = document.getElementById('set-brand-color-text');
      if (textInp) textInp.value = val;
    }

    function syncColorPicker(val) {
      var colorInp = document.getElementById('set-brand-color');
      if (colorInp && /^#[0-9A-Fa-f]{6}$/.test(val)) {
        colorInp.value = val;
      }
    }

    function applyColorPreset(hex) {
      var colorInp = document.getElementById('set-brand-color');
      var textInp = document.getElementById('set-brand-color-text');
      if (colorInp) colorInp.value = hex;
      if (textInp) textInp.value = hex;
    }

    // Comments Functions
    async function loadComments() {
      try {
        var res = await fetch('/admin/api/comments');
        if (res.ok) {
          commentsData = await res.json();
          renderCommentsTable();
        }
      } catch (e) { console.error(e); }
    }

    function renderCommentsTable() {
      var tbody = document.getElementById('comments-table-body');
      if (!tbody) return;
      var isEn = ADMIN_LANG === 'en';
      if (!commentsData || commentsData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="px-4 py-8 text-center text-slate-500">' + (isEn ? 'No comments found.' : 'هیچ دیدگاهی ثبت نشده است.') + '</td></tr>';
        return;
      }
      var html = '';
      for (var i = 0; i < commentsData.length; i++) {
        var c = commentsData[i];
        var statusBadge = c.status === 'approved' ? '<span class="px-2.5 py-1 text-xs font-semibold bg-emerald-500/10 text-emerald-400 rounded-full">' + (isEn ? 'Approved' : 'تایید شده') + '</span>' : '<span class="px-2.5 py-1 text-xs font-semibold bg-amber-500/10 text-amber-400 rounded-full">' + (isEn ? 'Pending' : 'در انتظار') + '</span>';
        html += '<tr>';
        html += '<td class="px-4 py-4 font-bold text-slate-200">' + escapeHtml(c.author_name) + '</td>';
        html += '<td class="px-4 py-4 text-slate-300 text-xs max-w-xs truncate">' + escapeHtml(c.content) + '</td>';
        html += '<td class="px-4 py-4 text-slate-400 text-xs">' + escapeHtml(c.post_title || '-') + '</td>';
        html += '<td class="px-4 py-4">' + statusBadge + '</td>';
        html += '<td class="px-4 py-4 text-left"><div class="flex items-center justify-end gap-2">';
        if (c.status !== 'approved') {
          html += '<button onclick="approveComment(' + c.id + ')" class="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs" title="Approve"><i data-lucide="check" class="w-4 h-4"></i></button>';
        }
        html += '<button onclick="deleteComment(' + c.id + ')" class="p-1.5 hover:bg-rose-500/10 rounded-lg text-slate-400 hover:text-rose-400" title="Delete"><i data-lucide="trash-2" class="w-4 h-4"></i></button>';
        html += '</div></td>';
        html += '</tr>';
      }
      tbody.innerHTML = html;
      lucide.createIcons();
    }

    function approveComment(id) {
      updateCommentStatus(id, 'approved');
    }

    async function updateCommentStatus(id, status) {
      try {
        var res = await fetch('/admin/api/comments', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id, status: status })
        });
        if (res.ok) loadComments();
      } catch (e) { alert(ADMIN_LANG === 'en' ? 'Failed to update status' : 'خطا در تغییر وضعیت'); }
    }

    async function deleteComment(id) {
      var isEn = ADMIN_LANG === 'en';
      if (!confirm(isEn ? 'Are you sure you want to delete this comment?' : 'آیا از حذف این نظر اطمینان دارید؟')) return;
      try {
        var res = await fetch('/admin/api/comments?id=' + id, { method: 'DELETE' });
        if (res.ok) loadComments();
      } catch (e) { alert(isEn ? 'Error deleting comment' : 'خطا در حذف دیدگاه'); }
    }

    // Settings & Smart Menu Builder
    async function loadSettings() {
      try {
        var res = await fetch('/admin/api/settings');
        if (res.ok) {
          settingsData = await res.json();

          // Branding & Identity
          document.getElementById('set-logo').value = settingsData.site_logo || '';
          updateImagePreview('set-logo', 'set-logo-preview');
          document.getElementById('set-favicon').value = settingsData.site_favicon || '';
          updateImagePreview('set-favicon', 'set-favicon-preview');
          
          var bColor = settingsData.brand_color || '#2563eb';
          document.getElementById('set-brand-color').value = bColor;
          document.getElementById('set-brand-color-text').value = bColor;
          if (settingsData.font_family) {
            document.getElementById('set-font-family').value = settingsData.font_family;
          }
          if (settingsData.site_language) {
            document.getElementById('set-site-language').value = settingsData.site_language;
          }

          // Hero
          document.getElementById('set-hero-enabled').checked = settingsData.hero_enabled !== 'false';
          document.getElementById('set-hero-badge').value = settingsData.hero_badge || '';
          document.getElementById('set-hero-title').value = settingsData.hero_title || '';
          document.getElementById('set-hero-subtitle').value = settingsData.hero_subtitle || '';
          document.getElementById('set-hero-btn1-text').value = settingsData.hero_btn1_text || '';
          document.getElementById('set-hero-btn1-url').value = settingsData.hero_btn1_url || '';
          document.getElementById('set-hero-btn2-text').value = settingsData.hero_btn2_text || '';
          document.getElementById('set-hero-btn2-url').value = settingsData.hero_btn2_url || '';
          document.getElementById('set-hero-image').value = settingsData.hero_image || '';
          updateImagePreview('set-hero-image', 'set-hero-preview');

          // Features Grid Section
          document.getElementById('set-features-enabled').checked = settingsData.features_enabled !== 'false';
          document.getElementById('set-features-title').value = settingsData.features_title || '';
          document.getElementById('set-features-subtitle').value = settingsData.features_subtitle || '';
          document.getElementById('set-feat1-title').value = settingsData.feat1_title || '';
          document.getElementById('set-feat1-desc').value = settingsData.feat1_desc || '';
          document.getElementById('set-feat1-icon').value = settingsData.feat1_icon || '';
          document.getElementById('set-feat2-title').value = settingsData.feat2_title || '';
          document.getElementById('set-feat2-desc').value = settingsData.feat2_desc || '';
          document.getElementById('set-feat2-icon').value = settingsData.feat2_icon || '';
          document.getElementById('set-feat3-title').value = settingsData.feat3_title || '';
          document.getElementById('set-feat3-desc').value = settingsData.feat3_desc || '';
          document.getElementById('set-feat3-icon').value = settingsData.feat3_icon || '';

          // General & SEO
          document.getElementById('set-title').value = settingsData.site_title || '';
          document.getElementById('set-tagline').value = settingsData.site_tagline || '';
          document.getElementById('set-desc').value = settingsData.site_description || '';
          document.getElementById('set-footer').value = settingsData.footer_text || '';

          // Social Networks (Value + Enabled Toggle)
          var socials = ['github', 'twitter', 'discord', 'linkedin', 'youtube', 'telegram', 'instagram', 'whatsapp'];
          socials.forEach(function(s) {
            var urlEl = document.getElementById('set-social-' + s);
            var enEl = document.getElementById('set-social-' + s + '-enabled');
            if (urlEl) urlEl.value = settingsData['social_' + s] || '';
            if (enEl) enEl.checked = settingsData['social_' + s + '_enabled'] !== 'false';
          });

          // Blog & Comments
          document.getElementById('set-show-reading-time').checked = settingsData.show_reading_time !== 'false';
          document.getElementById('set-show-views').checked = settingsData.show_views_count !== 'false';
          document.getElementById('set-comments-auto-approve').value = settingsData.comments_auto_approve === 'false' ? 'false' : 'true';

          // Custom Code
          document.getElementById('set-custom-css').value = settingsData.custom_css || '';
          document.getElementById('set-custom-header').value = settingsData.custom_header_code || '';
          document.getElementById('set-custom-footer').value = settingsData.custom_footer_code || '';

          // Menu
          renderMenuItems(JSON.parse(settingsData.header_menu || '[]'));
        }
      } catch (e) { console.error(e); }
    }

    function populateQuickMenuDropdowns() {
      var pSel = document.getElementById('quick-add-page-select');
      if (pSel) {
        pSel.innerHTML = '<option value="">+ افزودن از برگه‌ها</option>';
        pagesData.forEach(function(p) {
          pSel.innerHTML += '<option value="' + (p.slug === '/' ? '/' : '/' + p.slug) + '" data-title="' + escapeHtml(p.title) + '">' + escapeHtml(p.title) + '</option>';
        });
      }
      var cSel = document.getElementById('quick-add-cat-select');
      if (cSel) {
        cSel.innerHTML = '<option value="">+ افزودن از دسته‌ها</option>';
        categoriesData.forEach(function(c) {
          cSel.innerHTML += '<option value="/category/' + c.slug + '" data-title="' + escapeHtml(c.name) + '">' + escapeHtml(c.name) + '</option>';
        });
      }
    }

    function quickAddPageToMenu(sel) {
      if (!sel.value) return;
      var opt = sel.options[sel.selectedIndex];
      addMenuItem(opt.getAttribute('data-title'), sel.value);
      sel.value = '';
    }

    function quickAddCatToMenu(sel) {
      if (!sel.value) return;
      var opt = sel.options[sel.selectedIndex];
      addMenuItem(opt.getAttribute('data-title'), sel.value);
      sel.value = '';
    }

    function renderMenuItems(items) {
      var container = document.getElementById('menu-items-container');
      container.innerHTML = '';
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        addMenuItem(item.title, item.url);
      }
    }

    function addMenuItem(title = '', url = '') {
      var isEn = ADMIN_LANG === 'en';
      var container = document.getElementById('menu-items-container');
      var div = document.createElement('div');
      div.className = 'flex items-center gap-3 menu-item-row';
      div.innerHTML = '<input type="text" placeholder="' + (isEn ? 'Link Title' : 'عنوان لینک') + '" value="' + escapeHtml(title) + '" class="menu-item-title flex-1 px-4 py-2 bg-slate-800 rounded-xl border border-slate-700 text-xs focus:ring-2 focus:ring-brand-500">' +
                      '<input type="text" placeholder="' + (isEn ? 'Link URL' : 'آدرس URL') + '" value="' + escapeHtml(url) + '" class="menu-item-url flex-1 px-4 py-2 bg-slate-800 rounded-xl border border-slate-700 text-xs focus:ring-2 focus:ring-brand-500 dir-ltr text-right">' +
                      '<button type="button" onclick="this.parentElement.remove()" class="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg"><i data-lucide="trash-2" class="w-4 h-4"></i></button>';
      container.appendChild(div);
      lucide.createIcons();
    }

    document.getElementById('settings-form').addEventListener('submit', async function(e) {
      e.preventDefault();
      var menuRows = document.querySelectorAll('.menu-item-row');
      var menuItems = [];
      menuRows.forEach(function(row) {
        var t = row.querySelector('.menu-item-title').value.trim();
        var u = row.querySelector('.menu-item-url').value.trim();
        if (t && u) menuItems.push({ title: t, url: u });
      });

      var payload = {
        // Branding & Identity
        site_logo: document.getElementById('set-logo').value.trim(),
        site_favicon: document.getElementById('set-favicon').value.trim(),
        brand_color: document.getElementById('set-brand-color-text').value.trim() || '#2563eb',
        font_family: document.getElementById('set-font-family').value,

        // Hero
        hero_enabled: document.getElementById('set-hero-enabled').checked ? 'true' : 'false',
        hero_badge: document.getElementById('set-hero-badge').value.trim(),
        hero_title: document.getElementById('set-hero-title').value.trim(),
        hero_subtitle: document.getElementById('set-hero-subtitle').value.trim(),
        hero_btn1_text: document.getElementById('set-hero-btn1-text').value.trim(),
        hero_btn1_url: document.getElementById('set-hero-btn1-url').value.trim(),
        hero_btn2_text: document.getElementById('set-hero-btn2-text').value.trim(),
        hero_btn2_url: document.getElementById('set-hero-btn2-url').value.trim(),
        hero_image: document.getElementById('set-hero-image').value.trim(),

        // Features Grid
        features_enabled: document.getElementById('set-features-enabled').checked ? 'true' : 'false',
        features_title: document.getElementById('set-features-title').value.trim(),
        features_subtitle: document.getElementById('set-features-subtitle').value.trim(),
        feat1_title: document.getElementById('set-feat1-title').value.trim(),
        feat1_desc: document.getElementById('set-feat1-desc').value.trim(),
        feat1_icon: document.getElementById('set-feat1-icon').value.trim() || 'zap',
        feat2_title: document.getElementById('set-feat2-title').value.trim(),
        feat2_desc: document.getElementById('set-feat2-desc').value.trim(),
        feat2_icon: document.getElementById('set-feat2-icon').value.trim() || 'shield',
        feat3_title: document.getElementById('set-feat3-title').value.trim(),
        feat3_desc: document.getElementById('set-feat3-desc').value.trim(),
        feat3_icon: document.getElementById('set-feat3-icon').value.trim() || 'sparkles',

        // General
        site_title: document.getElementById('set-title').value.trim(),
        site_tagline: document.getElementById('set-tagline').value.trim(),
        site_description: document.getElementById('set-desc').value.trim(),
        site_language: document.getElementById('set-site-language').value,
        footer_text: document.getElementById('set-footer').value.trim(),

        // Social Networks (Value & Enabled)
        social_github: document.getElementById('set-social-github').value.trim(),
        social_github_enabled: document.getElementById('set-social-github-enabled').checked ? 'true' : 'false',
        social_twitter: document.getElementById('set-social-twitter').value.trim(),
        social_twitter_enabled: document.getElementById('set-social-twitter-enabled').checked ? 'true' : 'false',
        social_discord: document.getElementById('set-social-discord').value.trim(),
        social_discord_enabled: document.getElementById('set-social-discord-enabled').checked ? 'true' : 'false',
        social_linkedin: document.getElementById('set-social-linkedin').value.trim(),
        social_linkedin_enabled: document.getElementById('set-social-linkedin-enabled').checked ? 'true' : 'false',
        social_youtube: document.getElementById('set-social-youtube').value.trim(),
        social_youtube_enabled: document.getElementById('set-social-youtube-enabled').checked ? 'true' : 'false',
        social_telegram: document.getElementById('set-social-telegram').value.trim(),
        social_telegram_enabled: document.getElementById('set-social-telegram-enabled').checked ? 'true' : 'false',
        social_instagram: document.getElementById('set-social-instagram').value.trim(),
        social_instagram_enabled: document.getElementById('set-social-instagram-enabled').checked ? 'true' : 'false',
        social_whatsapp: document.getElementById('set-social-whatsapp').value.trim(),
        social_whatsapp_enabled: document.getElementById('set-social-whatsapp-enabled').checked ? 'true' : 'false',

        // Blog & Comments
        show_reading_time: document.getElementById('set-show-reading-time').checked ? 'true' : 'false',
        show_views_count: document.getElementById('set-show-views').checked ? 'true' : 'false',
        comments_auto_approve: document.getElementById('set-comments-auto-approve').value,

        // Custom Code
        custom_css: document.getElementById('set-custom-css').value,
        custom_header_code: document.getElementById('set-custom-header').value,
        custom_footer_code: document.getElementById('set-custom-footer').value,

        // Menu
        header_menu: JSON.stringify(menuItems)
      };

      try {
        var res = await fetch('/admin/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) alert(ADMIN_LANG === 'en' ? 'All settings have been successfully saved and applied to your website.' : 'تمامی تنظیمات با موفقیت ذخیره و روی سایت اعمال شدند.');
        else alert(ADMIN_LANG === 'en' ? 'Failed to save settings' : 'خطا در ذخیره‌سازی تنظیمات');
      } catch (err) { alert(ADMIN_LANG === 'en' ? 'Failed to save settings' : 'خطا در ذخیره تنظیمات'); }
    });

    // One-Click Backup Import
    async function importBackup(event) {
      var file = event.target.files[0];
      if (!file) return;
      var isEn = ADMIN_LANG === 'en';
      if (!confirm(isEn ? 'Are you sure you want to restore from this backup file? Existing data will be updated.' : 'آیا از بازیابی این فایل پشتیبان اطمینان دارید؟ داده‌های موجود به‌روزرسانی خواهند شد.')) return;

      var reader = new FileReader();
      reader.onload = async function(e) {
        try {
          var json = JSON.parse(e.target.result);
          var res = await fetch('/admin/api/backup/import', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(json)
          });
          if (res.ok) {
            alert(isEn ? 'Backup restored successfully!' : 'بازیابی با موفقیت انجام شد!');
            window.location.reload();
          } else {
            var err = await res.json();
            alert((isEn ? 'Restore error: ' : 'خطا در بازیابی: ') + (err.error || (isEn ? 'Invalid backup file' : 'فایل نامعتبر است')));
          }
        } catch(err) {
          alert(isEn ? 'Invalid JSON file format.' : 'فرمت فایل JSON نامعتبر است.');
        }
      };
      reader.readAsText(file);
    }

    // Profile Form
    document.getElementById('profile-form').addEventListener('submit', async function(e) {
      e.preventDefault();
      var isEn = ADMIN_LANG === 'en';
      var name = document.getElementById('prof-name').value;
      var email = document.getElementById('prof-email').value;
      var pass = document.getElementById('prof-password').value;

      try {
        var res = await fetch('/admin/api/auth/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ display_name: name, email: email, password: pass })
        });
        if (res.ok) {
          alert(isEn ? 'Account profile updated successfully.' : 'اطلاعات با موفقیت به‌روزرسانی شد.');
          window.location.reload();
        } else {
          var err = await res.json();
          alert((isEn ? 'Error: ' : 'خطا: ') + (err.error || (isEn ? 'Update failed' : 'به‌روزرسانی ناموفق بود')));
        }
      } catch (err) { alert(isEn ? 'Server connection error' : 'خطا در ارتباط با سرور'); }
    });

    // Logout
    async function logout() {
      var isEn = ADMIN_LANG === 'en';
      if (!confirm(isEn ? 'Are you sure you want to sign out?' : 'آیا از خروج از حساب مدیریت اطمینان دارید؟')) return;
      try {
        await fetch('/admin/api/auth/logout', { method: 'POST' });
        window.location.href = '/admin/login';
      } catch (e) {
        window.location.href = '/admin/login';
      }
    }

    // Helper Functions
    function escapeHtml(str) {
      return (str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    function slugifyClient(text) {
      if (!text) return '';
      return text.toString().toLowerCase().trim()
        .replace(/[\\s\\-_]+/g, '-')
        .replace(/[^\\u0600-\\u06FF\\w\\-]+/g, '')
        .replace(/\\-\\-\+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    }

    var sidebar = document.getElementById('sidebar');
    document.getElementById('open-sidebar-btn').addEventListener('click', function() { sidebar.classList.remove('translate-x-full'); });
    document.getElementById('close-sidebar-btn').addEventListener('click', function() { sidebar.classList.add('translate-x-full'); });

    // Initial Loading
    applyAdminLanguage(ADMIN_LANG);
    loadStats();
    loadCategories();
    loadPages();
    loadMedia();
  </script>
</body>
</html>`;
}

// ابزار کمکی ساخت اسلاگ تمیز و یکتا
function slugify(text) {
    if (!text) return '';
    return text.toString().toLowerCase().trim()
        .replace(/[\s\-_]+/g, '-')
        .replace(/[^\u0600-\u06FF\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}