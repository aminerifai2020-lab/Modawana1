import { useState, useRef, useEffect } from "react";

// ── ADMIN CREDENTIALS (غيّرها كما تشاء) ──────────────────────────────────
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin2026";

const initArticles = [
  { id: 1, title: "مباراة توظيف 500 أستاذ بالتعليم الابتدائي 2026", category: "مباريات التعليم", date: "08 يونيو 2026", dateISO: "2026-06-08", views: 4320, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80", desc: "أعلنت وزارة التربية الوطنية عن فتح باب الترشح لمباراة توظيف 500 أستاذ للسلم التاسع بالتعليم الابتدائي...", tag: "جديد", content: "", youtubeUrl: "", link: "" },
  { id: 2, title: "مباراة الدرك الملكي 2026 – شروط وطريقة التقديم", category: "الشرطة والجيش والدرك", date: "07 يونيو 2026", dateISO: "2026-06-07", views: 8150, image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80", desc: "تفتح القيادة العامة للدرك الملكي المغربي أبوابها لاستقطاب كفاءات شابة في مختلف التخصصات...", tag: "عاجل", content: "", youtubeUrl: "", link: "" },
  { id: 3, title: "منح الدراسة في كوريا الجنوبية 2026 – ممولة بالكامل", category: "منح الدراسة بالخارج", date: "06 يونيو 2026", dateISO: "2026-06-06", views: 5670, image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80", desc: "تتيح حكومة كوريا الجنوبية منحاً دراسية للطلاب الأجانب في إطار برنامج KGSP لسنة 2026...", tag: "منحة", content: "", youtubeUrl: "", link: "" },
  { id: 4, title: "مباراة توظيف في الوظيفة العمومية بوزارة الصحة", category: "الوظيفة العمومية", date: "05 يونيو 2026", dateISO: "2026-06-05", views: 3210, image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80", desc: "أعلنت وزارة الصحة المغربية عن فتح مباريات لتوظيف ممرضين وتقنيين في مجال الصحة...", tag: "", content: "", youtubeUrl: "", link: "" },
  { id: 5, title: "دليل التوجيه للباكالوريا 2026 – كل المسالك والشعب", category: "التوجيه الدراسي", date: "04 يونيو 2026", dateISO: "2026-06-04", views: 9800, image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80", desc: "دليل شامل يرشد حاملي شهادة الباكالوريا إلى مختلف المسالك والشعب المتاحة في الجامعات والمعاهد...", tag: "مميز", content: "", youtubeUrl: "", link: "" },
  { id: 6, title: "مباراة الأمن الوطني 2026 – الشروط والمراحل", category: "الشرطة والجيش والدرك", date: "03 يونيو 2026", dateISO: "2026-06-03", views: 7430, image: "https://images.unsplash.com/photo-1564979045531-fa386a275b27?w=400&q=80", desc: "المديرية العامة للأمن الوطني تطلق مباراة لتوظيف ضباط وأعوان الشرطة لسنة 2026...", tag: "", content: "", youtubeUrl: "", link: "" },
  { id: 7, title: "مباراة الجيش الملكي 2026 – التقديم والشروط", category: "الشرطة والجيش والدرك", date: "02 يونيو 2026", dateISO: "2026-06-02", views: 6100, image: "https://images.unsplash.com/photo-1560264280-88b68371db39?w=400&q=80", desc: "تفتح القوات المسلحة الملكية المغربية باب الترشح أمام الشباب الراغبين في الالتحاق بصفوفها...", tag: "جديد", content: "", youtubeUrl: "", link: "" },
  { id: 8, title: "منحة إيراسموس 2026 للدراسة في أوروبا", category: "منح الدراسة بالخارج", date: "01 يونيو 2026", dateISO: "2026-06-01", views: 4890, image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400&q=80", desc: "برنامج إيراسموس+ يوفر منحاً للطلاب المغاربة للدراسة في الجامعات الأوروبية لسنة 2026...", tag: "منحة", content: "", youtubeUrl: "", link: "" },
  { id: 9, title: "مباراة أساتذة التعليم الثانوي التأهيلي 2026", category: "مباريات التعليم", date: "31 مايو 2026", dateISO: "2026-05-31", views: 3750, image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80", desc: "وزارة التربية الوطنية تعلن عن مباراة لتوظيف أساتذة التعليم الثانوي التأهيلي في مختلف التخصصات...", tag: "", content: "", youtubeUrl: "", link: "" },
  { id: 10, title: "التوجيه نحو المدارس العليا بعد الباك 2026", category: "التوجيه الدراسي", date: "30 مايو 2026", dateISO: "2026-05-30", views: 8200, image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80", desc: "دليل شامل للالتحاق بالمدارس العليا المغربية بعد الحصول على شهادة الباكالوريا 2026...", tag: "مميز", content: "", youtubeUrl: "", link: "" },
  { id: 11, title: "مباراة توظيف تقنيين في وزارة التجهيز", category: "الوظيفة العمومية", date: "29 مايو 2026", dateISO: "2026-05-29", views: 2980, image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80", desc: "تعلن وزارة التجهيز والنقل عن مباراة لتوظيف تقنيين متخصصين في مجال الأشغال العمومية...", tag: "", content: "", youtubeUrl: "", link: "" },
  { id: 12, title: "منحة الصين 2026 – برنامج CSC كاملة", category: "منح الدراسة بالخارج", date: "28 مايو 2026", dateISO: "2026-05-28", views: 7100, image: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=400&q=80", desc: "مجلس الدولة الصيني يفتح باب التقديم على المنح الدراسية الكاملة للطلاب الأجانب 2026...", tag: "منحة", content: "", youtubeUrl: "", link: "" },
];

const categories = ["الكل", "آخر الكونكورات", "التوجيه الدراسي", "الشرطة والجيش والدرك", "مباريات التعليم", "الوظيفة العمومية", "منح الدراسة بالخارج"];
const navLinks = ["الرئيسية", "الكونكورات", "التوجيه", "الجيش والأمن", "التعليم", "منح", "اتصل بنا"];
const tagColors = { "جديد": "bg-emerald-500", "عاجل": "bg-red-500", "منحة": "bg-purple-500", "مميز": "bg-amber-500" };
const SP = { section: "py-8 md:py-12", card: "p-5", gap: "gap-6", mb: "mb-4", mbSm: "mb-3" };

function getYoutubeId(url) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/);
  return m ? m[1] : null;
}

// ── Per-line heading encoding ────────────────────────────────────────────
// Each line may start with a visible heading marker (#, ##, ###) followed
// by a space, then the text. This is the ONLY thing stored inside the
// content string — it's clean, readable text the admin can edit directly.
// Per-line colors/sizes/etc are kept separately in a `lineStyles` array
// (one entry per line) so editing text never corrupts formatting.
function parseLine(rawLine) {
  const hMatch = rawLine.match(/^(#{1,3})\s(.*)$/);
  if (hMatch) return { heading: hMatch[1].length, text: hMatch[2] };
  return { heading: 0, text: rawLine };
}

function serializeLine({ heading, text }) {
  if (heading) return "#".repeat(heading) + " " + text;
  return text;
}

// Parses [label](url) markdown-style links inside a text and returns
// an array of strings and clickable <a> elements with distinct styling.
function renderInlineLinks(text) {
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <a key={`link-${key++}`} href={match[2]} target="_blank" rel="noopener noreferrer"
        className="text-blue-600 underline font-bold hover:text-blue-800 transition-colors">
        {match[1]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length ? parts : [text];
}

// Renders article content — each line uses its own style from `lineStyles[i]`
// if present, falling back to the article-level defaults (opts).
function renderContentLines(content, lineStyles = [], opts = {}) {
  const baseDefaults = {
    fontSize: opts.fontSize || "text-base",
    color: opts.textColor || "#1e293b",
    textAlign: opts.textAlign || "right",
    fontStyle: opts.fontStyle || "normal",
    textDecoration: opts.textDecoration || "none",
    fontWeight: opts.fontWeight || "normal",
  };
  const lines = content.split("\n");
  return lines.map((rawLine, i) => {
    // Standalone image line: ![alt](url-or-base64)
    const imgMatch = rawLine.match(/^!\[([^\]]*)\]\((.+)\)$/);
    if (imgMatch) {
      return <img key={i} src={imgMatch[2]} alt={imgMatch[1] || "صورة المقال"} className="w-full rounded-2xl my-2 object-cover" />;
    }
    const { heading, text } = parseLine(rawLine);
    const s = { ...baseDefaults, ...(lineStyles[i] || {}) };
    const sharedStyle = { color: s.color, textAlign: s.textAlign, fontStyle: s.fontStyle, textDecoration: s.textDecoration };
    if (heading) {
      const shownText = text || (opts.placeholder ? `عنوان ${heading}` : "");
      const content2 = renderInlineLinks(shownText);
      if (heading === 1) return <h2 key={i} className="text-2xl font-black mb-2" style={sharedStyle}>{content2}</h2>;
      if (heading === 2) return <h3 key={i} className="text-xl font-bold mb-2" style={sharedStyle}>{content2}</h3>;
      return <h4 key={i} className="text-lg font-semibold mb-1" style={sharedStyle}>{content2}</h4>;
    }
    return <p key={i} className={s.fontSize} style={{...sharedStyle, fontWeight: s.fontWeight === "bold" ? "bold" : "normal"}}>{text ? renderInlineLinks(text) : <br/>}</p>;
  });
}

// ── Admin Login Modal ──────────────────────────────────────────────────────
function AdminLoginModal({ onLogin, onClose, darkMode }) {
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const card = darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800";
  const inputBg = darkMode ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-gray-100 border-gray-200 text-gray-700";
  const tryLogin = () => {
    if (user === ADMIN_USERNAME && pw === ADMIN_PASSWORD) onLogin();
    else setErr(true);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className={`${card} rounded-2xl p-8 w-full max-w-sm shadow-2xl`} dir="rtl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <div>
            <h2 className="text-xl font-black">لوحة التحكم</h2>
            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>أدخل بيانات الدخول</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-500"}`}>اسم المستخدم</label>
            <input type="text" value={user} onChange={e => { setUser(e.target.value); setErr(false); }}
              placeholder="اسم المستخدم"
              className={`rounded-xl px-4 py-3 text-base border focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
              style={{ fontSize: "16px" }}
              onKeyDown={e => e.key === "Enter" && tryLogin()} />
          </div>
          <div className="flex flex-col gap-1">
            <label className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-500"}`}>كلمة المرور</label>
            <input type="password" value={pw} onChange={e => { setPw(e.target.value); setErr(false); }}
              placeholder="••••••••"
              className={`rounded-xl px-4 py-3 text-base border focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
              style={{ fontSize: "16px" }}
              onKeyDown={e => e.key === "Enter" && tryLogin()} />
          </div>
          {err && (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 rounded-xl px-3 py-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              اسم المستخدم أو كلمة المرور غير صحيحة
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={tryLogin} className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-all">
            دخول
          </button>
          <button onClick={onClose} className={`flex-1 font-bold py-3 rounded-xl border transition-all ${darkMode ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-50"}`}>
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Article Editor Modal ───────────────────────────────────────────────────
function ArticleEditor({ article, onSave, onClose, darkMode }) {
  const [form, setForm] = useState({ ...article });
  const fileRef = useRef();
  const card = darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800";
  const inputCls = darkMode
    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
    : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400";
  const field = (label, key, type = "text", placeholder = "") => (
    <div className="flex flex-col gap-1">
      <label className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{label}</label>
      {type === "textarea" ? (
        <textarea rows={4} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
          placeholder={placeholder}
          style={{ fontSize: "16px" }}
          className={`rounded-xl px-3 py-2.5 text-base border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${inputCls}`} />
      ) : (
        <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
          placeholder={placeholder}
          style={{ fontSize: "16px" }}
          className={`rounded-xl px-3 py-2.5 text-base border focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputCls}`} />
      )}
    </div>
  );

  const handleImage = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setForm({ ...form, image: ev.target.result });
    reader.readAsDataURL(file);
  };

  const contentRef = useRef();
  const [, forceRerender] = useState(0);
  const [showLinkBox, setShowLinkBox] = useState(false);
  const [linkText, setLinkText] = useState("اضغط هنا");
  const [linkUrl, setLinkUrl] = useState("https://");
  const linkInsertPos = useRef(0);

  const [showImageBox, setShowImageBox] = useState(false);
  const [imageAlt, setImageAlt] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const imageInsertPos = useRef(0);
  const contentImageFileRef = useRef();

  // Article-level defaults — used for any line that has no specific style yet
  const baseDefaults = {
    fontSize: form.fontSize || "text-base",
    color: form.textColor || (darkMode ? "#e5e7eb" : "#1e293b"),
    textAlign: form.textAlign || "right",
    fontStyle: form.fontStyle || "normal",
    textDecoration: form.textDecoration || "none",
    fontWeight: form.fontWeight || "normal",
  };

  // Per-line styles, kept SEPARATE from the text content so editing text
  // (including inserting links) never corrupts formatting.
  const [lineStyles, setLineStyles] = useState(Array.isArray(form.lineStyles) ? form.lineStyles : []);

  // Keep lineStyles array length in sync with the number of content lines.
  // New lines inherit the style of the line right above them (so continuing
  // to type keeps the same look); removed lines drop their entry.
  const syncLineStyles = (newContent) => {
    const count = newContent.split("\n").length;
    setLineStyles(prev => {
      const arr = [...prev];
      while (arr.length < count) arr.push({ ...(arr[arr.length - 1] || {}) });
      while (arr.length > count) arr.pop();
      return arr;
    });
  };

  const getLineBounds = (text, pos) => {
    const lineStart = text.lastIndexOf("\n", pos - 1) + 1;
    let lineEnd = text.indexOf("\n", pos);
    if (lineEnd === -1) lineEnd = text.length;
    return { lineStart, lineEnd };
  };

  const getCurrentLineIndex = () => {
    const el = contentRef.current;
    if (!el) return 0;
    const pos = el.selectionStart || 0;
    return form.content.slice(0, pos).split("\n").length - 1;
  };

  // Returns the parsed heading/text of the line where the cursor is, plus its style.
  const getCurrentLineParsed = () => {
    const el = contentRef.current;
    const idx = getCurrentLineIndex();
    const text = form.content;
    let lineStart = 0, lineEnd = text.length;
    if (el) {
      const pos = el.selectionStart || 0;
      ({ lineStart, lineEnd } = getLineBounds(text, pos));
    }
    const parsed = parseLine(text.slice(lineStart, lineEnd));
    return { ...parsed, idx, style: { ...baseDefaults, ...(lineStyles[idx] || {}) } };
  };

  // Patch the CURRENT LINE's style only — every other line's style stays untouched.
  const updateCurrentLineStyle = (patch) => {
    const idx = getCurrentLineIndex();
    setLineStyles(prev => {
      const arr = [...prev];
      while (arr.length <= idx) arr.push({});
      arr[idx] = { ...baseDefaults, ...arr[idx], ...patch };
      return arr;
    });
    forceRerender(x => x + 1);
  };

  // Insert raw text at the cursor (used for bullet/numbered list markers)
  const insertFormat = (before) => {
    const el = contentRef.current;
    if (!el) return;
    const start = el.selectionStart, end = el.selectionEnd;
    const newContent = form.content.slice(0, start) + before + form.content.slice(start, end) + form.content.slice(end);
    syncLineStyles(newContent);
    setForm({ ...form, content: newContent });
    setTimeout(() => { el.focus(); const p = start + before.length; el.setSelectionRange(p, p); forceRerender(x => x + 1); }, 0);
  };

  // Toggle heading level (1/2/3) on the CURRENT LINE only — text-level marker (#, ##, ###)
  const toggleHeadingOnCurrentLine = (level) => {
    const el = contentRef.current;
    if (!el) return;
    const text = form.content;
    const pos = el.selectionStart;
    const { lineStart, lineEnd } = getLineBounds(text, pos);
    const line = text.slice(lineStart, lineEnd);
    const parsed = parseLine(line);
    const newHeading = parsed.heading === level ? 0 : level;
    const newLine = serializeLine({ heading: newHeading, text: parsed.text });
    const newContent = text.slice(0, lineStart) + newLine + text.slice(lineEnd);
    const diff = newLine.length - line.length;
    setForm({ ...form, content: newContent });
    setTimeout(() => { el.focus(); el.setSelectionRange(pos + diff, pos + diff); forceRerender(x => x + 1); }, 0);
  };

  const ToolBtn = ({ onClick, title, children, active }) => (
    <button type="button" onClick={onClick} title={title}
      className={`p-1.5 rounded-lg text-xs font-bold transition-all ${active ? "bg-blue-700 text-white" : darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-600"}`}>
      {children}
    </button>
  );

  // Current line's style — drives the toolbar's active/selected states
  const cur = getCurrentLineParsed();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm sm:p-4">
      <div className={`${card} w-full sm:max-w-2xl sm:rounded-2xl shadow-2xl sm:my-auto flex flex-col`} dir="rtl" style={{height:"100dvh", maxHeight:"100dvh"}}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200/20 shrink-0">
          <h2 className="text-lg font-black">✏️ تعديل المقال</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100/10 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="p-4 sm:p-5 flex flex-col gap-4 overflow-y-auto" style={{flex:"1 1 auto", minHeight:0, WebkitOverflowScrolling:"touch"}}>
          {field("العنوان", "title", "text", "عنوان المقال...")}
          {field("التصنيف", "category")}
          {field("الوصف المختصر", "desc", "textarea", "وصف قصير يظهر في الكارد...")}

          {/* ── Rich Text Editor ─────────────────────────── */}
          <div className="flex flex-col gap-1">
            <label className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-500"}`}>محتوى المقال</label>

            {/* Toolbar */}
            <div className={`rounded-t-xl border px-2 py-2 flex flex-wrap gap-1 items-center ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"}`}>

              {/* Heading — applies to current line only */}
              <ToolBtn onClick={() => toggleHeadingOnCurrentLine(1)} title="عنوان 1 (للسطر الحالي)" active={cur.heading === 1}>
                <span className="text-sm font-black">H1</span>
              </ToolBtn>
              <ToolBtn onClick={() => toggleHeadingOnCurrentLine(2)} title="عنوان 2 (للسطر الحالي)" active={cur.heading === 2}>
                <span className="text-sm font-bold">H2</span>
              </ToolBtn>
              <ToolBtn onClick={() => toggleHeadingOnCurrentLine(3)} title="عنوان 3 (للسطر الحالي)" active={cur.heading === 3}>
                <span className="text-sm font-semibold">H3</span>
              </ToolBtn>

              <div className={`w-px h-5 mx-1 ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}/>

              {/* Font size — applies to current line only */}
              <select value={cur.style.fontSize} onChange={e => updateCurrentLineStyle({ fontSize: e.target.value })}
                className={`text-xs rounded-lg px-2 py-1.5 border focus:outline-none ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-200"}`}>
                <option value="text-xs">XS</option>
                <option value="text-sm">صغير</option>
                <option value="text-base">عادي</option>
                <option value="text-lg">كبير</option>
                <option value="text-xl">أكبر</option>
                <option value="text-2xl">ضخم</option>
                <option value="text-3xl">كبير جداً</option>
              </select>

              <div className={`w-px h-5 mx-1 ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}/>

              {/* Bold / Italic / Strikethrough — current line only */}
              <ToolBtn onClick={() => updateCurrentLineStyle({ fontWeight: cur.style.fontWeight === "bold" ? "normal" : "bold" })} title="عريض" active={cur.style.fontWeight === "bold"}>
                <span className="font-black text-sm">B</span>
              </ToolBtn>
              <ToolBtn onClick={() => updateCurrentLineStyle({ fontStyle: cur.style.fontStyle === "italic" ? "normal" : "italic" })} title="مائل" active={cur.style.fontStyle === "italic"}>
                <span className="italic text-sm">I</span>
              </ToolBtn>
              <ToolBtn onClick={() => updateCurrentLineStyle({ textDecoration: cur.style.textDecoration === "line-through" ? "none" : "line-through" })} title="يتوسطه خط" active={cur.style.textDecoration === "line-through"}>
                <span className="line-through text-sm">S</span>
              </ToolBtn>

              <div className={`w-px h-5 mx-1 ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}/>

              {/* Text align — current line only */}
              <ToolBtn onClick={() => updateCurrentLineStyle({ textAlign: "right" })} title="يمين" active={cur.style.textAlign === "right"}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="12" x2="9" y2="12"/><line x1="21" y1="18" x2="3" y2="18"/></svg>
              </ToolBtn>
              <ToolBtn onClick={() => updateCurrentLineStyle({ textAlign: "center" })} title="وسط" active={cur.style.textAlign === "center"}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="21" y1="6" x2="3" y2="6"/><line x1="18" y1="12" x2="6" y2="12"/><line x1="21" y1="18" x2="3" y2="18"/></svg>
              </ToolBtn>
              <ToolBtn onClick={() => updateCurrentLineStyle({ textAlign: "left" })} title="يسار" active={cur.style.textAlign === "left"}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="21" y1="18" x2="3" y2="18"/></svg>
              </ToolBtn>

              <div className={`w-px h-5 mx-1 ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}/>

              {/* Lists */}
              <ToolBtn onClick={() => insertFormat("\n• ")} title="قائمة نقطية">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>
              </ToolBtn>
              <ToolBtn onClick={() => insertFormat("\n1. ")} title="قائمة مرقمة">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
              </ToolBtn>

              <div className={`w-px h-5 mx-1 ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}/>

              {/* Insert link */}
              <ToolBtn onClick={() => {
                const el = contentRef.current;
                linkInsertPos.current = el ? el.selectionStart : form.content.length;
                setLinkText("اضغط هنا");
                setLinkUrl("https://");
                setShowLinkBox(true);
              }} title="إضافة رابط">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5"/></svg>
              </ToolBtn>

              {/* Insert image */}
              <ToolBtn onClick={() => {
                const el = contentRef.current;
                imageInsertPos.current = el ? el.selectionStart : form.content.length;
                setImageAlt("");
                setImageSrc("");
                setShowImageBox(true);
              }} title="إضافة صورة">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </ToolBtn>

              <div className={`w-px h-5 mx-1 ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}/>

              {/* Color — current line only */}
              <div className="flex items-center gap-1">
                <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>لون</span>
                <input type="color" value={cur.style.color} onChange={e => updateCurrentLineStyle({ color: e.target.value })}
                  className="w-7 h-7 rounded cursor-pointer border-0 p-0" />
              </div>

              {/* Quick colors */}
              {["#1e40af","#dc2626","#16a34a","#d97706","#7c3aed","#000000"].map(c => (
                <button key={c} type="button" onClick={() => updateCurrentLineStyle({ color: c })}
                  className="w-5 h-5 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                  style={{background:c}} />
              ))}
            </div>

            {/* Link insertion popup */}
            {showLinkBox && (
              <div className={`rounded-xl border p-3 flex flex-col gap-2 ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"}`}>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5"/></svg>
                  <span className="text-xs font-bold">إضافة رابط في نص المقال</span>
                </div>
                <input value={linkText} onChange={e => setLinkText(e.target.value)}
                  placeholder="النص الظاهر (مثال: اضغط هنا)"
                  style={{ fontSize: "16px" }}
                  className={`rounded-xl px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputCls}`} />
                <input value={linkUrl} onChange={e => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  style={{ fontSize: "16px" }}
                  className={`rounded-xl px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputCls}`} />
                <div className="flex gap-2">
                  <button onClick={() => {
                    if (!linkText.trim() || !linkUrl.trim()) return;
                    const markdown = `[${linkText.trim()}](${linkUrl.trim()})`;
                    const pos = linkInsertPos.current;
                    const newContent = form.content.slice(0, pos) + markdown + form.content.slice(pos);
                    syncLineStyles(newContent);
                    setForm({ ...form, content: newContent });
                    setShowLinkBox(false);
                    setTimeout(() => { const el = contentRef.current; if (el) { el.focus(); const p = pos + markdown.length; el.setSelectionRange(p, p); } forceRerender(x => x + 1); }, 0);
                  }} className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-xl text-sm transition-all">
                    إدراج الرابط
                  </button>
                  <button onClick={() => setShowLinkBox(false)}
                    className={`flex-1 font-bold py-2 rounded-xl border text-sm transition-all ${darkMode ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-50"}`}>
                    إلغاء
                  </button>
                </div>
              </div>
            )}

            {/* Image insertion popup */}
            {showImageBox && (
              <div className={`rounded-xl border p-3 flex flex-col gap-2 ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"}`}>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  <span className="text-xs font-bold">إضافة صورة داخل المقال</span>
                </div>

                {imageSrc && (
                  <img src={imageSrc} alt="" className="w-full max-h-40 object-cover rounded-xl border" />
                )}

                <div className="flex gap-2 items-center">
                  <button onClick={() => contentImageFileRef.current.click()}
                    className={`flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border font-semibold transition-all ${darkMode ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-50"}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                    رفع من الجهاز
                  </button>
                  <input ref={contentImageFileRef} type="file" accept="image/*" className="hidden"
                    onChange={e => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = ev => setImageSrc(ev.target.result);
                      reader.readAsDataURL(file);
                    }} />
                </div>

                <input value={imageSrc.startsWith("data:") ? "" : imageSrc} onChange={e => setImageSrc(e.target.value)}
                  placeholder="أو ضع رابط الصورة https://..."
                  style={{ fontSize: "16px" }}
                  className={`rounded-xl px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputCls}`} />

                <input value={imageAlt} onChange={e => setImageAlt(e.target.value)}
                  placeholder="وصف الصورة (اختياري)"
                  style={{ fontSize: "16px" }}
                  className={`rounded-xl px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputCls}`} />

                <div className="flex gap-2">
                  <button onClick={() => {
                    if (!imageSrc.trim()) return;
                    const md = `![${imageAlt.trim()}](${imageSrc.trim()})`;
                    const text = form.content;
                    let pos = imageInsertPos.current;
                    // Insert the image on its own line
                    const needsLeadingNL = pos > 0 && text[pos - 1] !== "\n";
                    const needsTrailingNL = pos < text.length && text[pos] !== "\n";
                    const insertion = (needsLeadingNL ? "\n" : "") + md + (needsTrailingNL ? "\n" : "");
                    const newContent = text.slice(0, pos) + insertion + text.slice(pos);
                    syncLineStyles(newContent);
                    setForm({ ...form, content: newContent });
                    setShowImageBox(false);
                    setTimeout(() => { const el = contentRef.current; if (el) { el.focus(); const p = pos + insertion.length; el.setSelectionRange(p, p); } forceRerender(x => x + 1); }, 0);
                  }} className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-xl text-sm transition-all">
                    إدراج الصورة
                  </button>
                  <button onClick={() => setShowImageBox(false)}
                    className={`flex-1 font-bold py-2 rounded-xl border text-sm transition-all ${darkMode ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-50"}`}>
                    إلغاء
                  </button>
                </div>
              </div>
            )}

            {/* Textarea — plain editing surface (per-line styling shown in preview below) */}
            <textarea
              ref={contentRef}
              rows={8}
              value={form.content}
              onChange={e => { syncLineStyles(e.target.value); setForm({ ...form, content: e.target.value }); forceRerender(x => x + 1); }}
              onClick={() => forceRerender(x => x + 1)}
              onKeyUp={() => forceRerender(x => x + 1)}
              onSelect={() => forceRerender(x => x + 1)}
              placeholder="اكتب محتوى المقال هنا... ضع المؤشر في أي سطر، ثم استخدم أدوات التنسيق أعلاه — كل سطر يحتفظ بتنسيقه الخاص (الحجم، اللون، المحاذاة، العنوان...) بشكل مستقل عن باقي الأسطر."
              style={{ fontSize: "16px" }}
              className={`rounded-b-xl px-3 py-2.5 border-x border-b focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none w-full font-mono ${inputCls}`}
            />
            <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              💡 كل سطر يحتفظ بتنسيقه الخاص (الحجم، اللون، عريض/مائل، المحاذاة، العنوان) — تعديل سطر جديد لا يغيّر الأسطر السابقة.
            </p>

            {/* Live preview — shows exactly how it will look on the published page */}
            <div className={`rounded-xl border mt-2 overflow-hidden ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
              <div className={`text-xs font-bold px-3 py-2 border-b ${darkMode ? "bg-gray-800 border-gray-700 text-gray-400" : "bg-gray-100 border-gray-200 text-gray-500"}`}>
                👁 معاينة — هكذا سيظهر في المقال المنشور
              </div>
              <div className={`p-4 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
                {form.content ? (
                  renderContentLines(form.content, lineStyles, {
                    textColor: baseDefaults.color,
                    textAlign: baseDefaults.textAlign,
                    fontStyle: baseDefaults.fontStyle,
                    textDecoration: baseDefaults.textDecoration,
                    fontWeight: baseDefaults.fontWeight,
                    fontSize: baseDefaults.fontSize,
                    placeholder: true,
                  })
                ) : (
                  <p className={`text-sm italic ${darkMode ? "text-gray-500" : "text-gray-400"}`}>ستظهر معاينة المحتوى هنا أثناء الكتابة...</p>
                )}
              </div>
            </div>
          </div>

          {/* Image upload */}
          <div className="flex flex-col gap-2">
            <label className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-500"}`}>صورة المقال</label>
            <div className="flex gap-3 items-center">
              {form.image && <img src={form.image} alt="" className="h-16 w-24 object-cover rounded-xl border" />}
              <button onClick={() => fileRef.current.click()}
                className={`flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border font-semibold transition-all ${darkMode ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-50"}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                رفع صورة
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
            </div>
            {field("أو رابط الصورة", "image", "text", "https://...")}
          </div>

          {field("رابط يوتيوب (اختياري)", "youtubeUrl", "text", "https://youtube.com/watch?v=...")}
          {form.youtubeUrl && getYoutubeId(form.youtubeUrl) && (
            <a href={`https://www.youtube.com/watch?v=${getYoutubeId(form.youtubeUrl)}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{background:"linear-gradient(135deg,#ff0000,#cc0000)"}}>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white mr-[-1px]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <p className="text-white text-sm font-bold">معاينة — اضغط للمشاهدة على يوتيوب</p>
            </a>
          )}

          {field("رابط خارجي (اختياري)", "link", "text", "https://...")}

          {/* Tag selector */}
          <div className="flex flex-col gap-2">
            <label className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-500"}`}>الوسم</label>
            <div className="flex gap-2 flex-wrap">
              {["", "جديد", "عاجل", "منحة", "مميز"].map(t => (
                <button key={t} onClick={() => setForm({ ...form, tag: t })}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${form.tag === t ? "bg-blue-700 text-white border-blue-700" : darkMode ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                  {t || "بدون وسم"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 border-t border-gray-200/20 flex gap-3 shrink-0">
          <button onClick={() => onSave({ ...form, lineStyles })}
            className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-all">
            💾 حفظ التعديلات
          </button>
          <button onClick={onClose}
            className={`flex-1 font-bold py-3 rounded-xl border transition-all ${darkMode ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-50"}`}>
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirmation Modal ──────────────────────────────────────────────
function DeleteConfirmModal({ article, onConfirm, onCancel, darkMode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm" style={{ zIndex: 9999 }} onClick={onCancel}>
      <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"} rounded-2xl p-6 w-full max-w-sm shadow-2xl mx-4`} dir="rtl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"/></svg>
          </div>
          <div>
            <h2 className="text-lg font-black">حذف المقال</h2>
            <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>هل أنت متأكد من الحذف؟</p>
          </div>
        </div>
        <p className={`text-sm mb-5 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          سيتم حذف المقال <span className="font-bold">"{article.title}"</span> نهائياً ولا يمكن التراجع عن هذا الإجراء.
        </p>
        <div className="flex gap-3">
          <button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all">نعم، احذف</button>
          <button onClick={onCancel} className={`flex-1 font-bold py-3 rounded-xl border transition-all ${darkMode ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-50"}`}>إلغاء</button>
        </div>
      </div>
    </div>
  );
}

export default function MarocConcoursApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [page, setPage] = useState("home");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [articles, setArticles] = useState(initArticles);
  const [visibleCount, setVisibleCount] = useState(4);

  // Admin state
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [logoClicks, setLogoClicks] = useState(0);
  const logoClickTimer = useRef(null);

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (logoClickTimer.current) clearTimeout(logoClickTimer.current);
    if (next >= 5) {
      setLogoClicks(0);
      if (isAdmin) setIsAdmin(false);
      else setShowLogin(true);
    } else {
      logoClickTimer.current = setTimeout(() => setLogoClicks(0), 2000);
    }
  };

  const matchesCategory = (article, cat) => {
    if (cat === "آخر الكونكورات") {
      const articleDate = new Date(article.dateISO || article.date);
      const now = new Date();
      const diffDays = (now - articleDate) / (1000 * 60 * 60 * 24);
      return diffDays <= 30 && diffDays >= -1;
    }
    return article.category === cat;
  };

  const filtered = articles.filter(a => {
    const matchCat = activeCategory === "الكل" || matchesCategory(a, activeCategory);
    const matchSearch = a.title.includes(searchQuery) || a.desc.includes(searchQuery);
    return matchCat && matchSearch;
  });

  const bg       = darkMode ? "bg-gray-950" : "bg-gray-50";
  const card     = darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
  const text     = darkMode ? "text-gray-100" : "text-gray-800";
  const subtext  = darkMode ? "text-gray-400" : "text-gray-500";
  const headerBg = darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
  const inputBg  = darkMode ? "bg-gray-800 text-gray-100 placeholder-gray-500 border-gray-700" : "bg-gray-100 text-gray-700 placeholder-gray-400 border-gray-200";
  const divider  = darkMode ? "border-gray-800" : "border-gray-100";

  const saveArticle = updated => {
    setArticles(prev => prev.map(a => a.id === updated.id ? updated : a));
    if (selectedArticle?.id === updated.id) setSelectedArticle(updated);
    setEditingArticle(null);
  };

  const [deleteTarget, setDeleteTarget] = useState(null);

  const deleteArticle = id => {
    setArticles(prev => prev.filter(a => a.id !== id));
    setDeleteTarget(null);
    if (selectedArticle?.id === id) { setSelectedArticle(null); setPage("home"); }
    if (editingArticle?.id === id) setEditingArticle(null);
  };

  const openArticle = (article) => {
    // Increment real view count
    const updated = { ...article, views: (article.views || 0) + 1 };
    setArticles(prev => prev.map(a => a.id === article.id ? updated : a));
    setSelectedArticle(updated);
    setPage("article");
  };

  // ── Article Card ──────────────────────────────────────────────────────────
  const ArticleCard = ({ article, featured = false }) => (
    <div className={`${card} border rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-blue-200 ${featured ? "md:col-span-2" : ""}`}
      style={{ boxShadow: darkMode ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(30,64,175,0.07)" }}>
      <div className={`relative overflow-hidden ${featured ? "h-56" : "h-44"}`}
        onClick={() => { openArticle(article); }}>
        <img src={article.image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {article.tag && (
          <span className={`absolute top-3 right-3 ${tagColors[article.tag]} text-white text-xs font-bold px-3 py-1 rounded-full`}>{article.tag}</span>
        )}
        <span className="absolute bottom-3 right-3 text-white text-xs px-2 py-1 rounded-lg bg-blue-700/80 backdrop-blur-sm">{article.category}</span>
      </div>
      <div className={SP.card}>
        <h3 className={`font-bold text-base leading-relaxed ${SP.mbSm} group-hover:text-blue-600 transition-colors ${text}`}
          onClick={() => { openArticle(article); }}>
          {article.title}
        </h3>
        <p className={`text-sm leading-relaxed ${SP.mb} line-clamp-2 ${subtext}`}
          onClick={() => { openArticle(article); }}>
          {article.desc}
        </p>
        <div className={`flex items-center justify-between text-xs ${subtext}`}>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            {article.date}
          </span>
          {isAdmin && (
            <span className="flex items-center gap-1 bg-orange-50 text-orange-600 px-2 py-0.5 rounded-lg border border-orange-200">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              {article.views.toLocaleString()}
            </span>
          )}
          <div className="flex items-center gap-2">
            <button onClick={() => { openArticle(article); }} className="text-blue-600 font-semibold hover:underline">قراءة المزيد ←</button>
            {isAdmin && (
              <button onClick={e => { e.stopPropagation(); setEditingArticle(article); }}
                className="text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1 text-xs border border-orange-300 px-2 py-1 rounded-lg hover:bg-orange-50 transition-all">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                تعديل
              </button>
            )}
            {isAdmin && (
              <button onClick={e => { e.stopPropagation(); setDeleteTarget(article); }}
                className="text-red-500 hover:text-red-600 font-semibold flex items-center gap-1 text-xs border border-red-300 px-2 py-1 rounded-lg hover:bg-red-50 transition-all">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16"/></svg>
                حذف
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // ── Sidebar ───────────────────────────────────────────────────────────────
  const SidebarBlock = ({ title, children }) => (
    <div className={`${card} border rounded-2xl ${SP.card}`}>
      <h4 className={`font-bold ${SP.mb} text-blue-700`}>{title}</h4>
      {children}
    </div>
  );

  const Sidebar = () => (
    <div className={`flex flex-col ${SP.gap}`}>
      <SidebarBlock title="التصنيفات">
        <div className="flex flex-col gap-2">
          {categories.slice(1).map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setVisibleCount(4); }}
              className={`w-full text-right text-sm px-4 py-2.5 rounded-xl transition-all flex justify-between items-center ${activeCategory === cat ? "bg-blue-700 text-white" : darkMode ? "hover:bg-gray-800 text-gray-300" : "hover:bg-blue-50 text-gray-600"}`}>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeCategory === cat ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"}`}>
                {articles.filter(a => matchesCategory(a, cat)).length}
              </span>
              {cat}
            </button>
          ))}
        </div>
      </SidebarBlock>
    </div>
  );
  const logoB64 = "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";

  // ── Shared header ─────────────────────────────────────────────────────────
  const Header = () => {
    const suggestions = searchQuery.length >= 1
      ? articles.filter(a =>
          a.title.includes(searchQuery) ||
          a.category.includes(searchQuery) ||
          a.desc.includes(searchQuery)
        ).slice(0, 6)
      : [];

    return (
    <header className={`${headerBg} border-b sticky top-0 z-50 shadow-sm backdrop-blur-md bg-opacity-95`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between" style={{ height: "56px", overflow: "visible" }}>
          <button onClick={handleLogoClick} style={{ WebkitTapHighlightColor: "transparent" }}>
            <img src={`data:image/png;base64,${logoB64}`} alt="InfoConcours" className="h-24 w-auto object-contain" style={{ maxHeight: "96px", marginTop: "-20px", marginBottom: "-20px" }} />
          </button>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <button key={l} onClick={() => {
                if (l === "اتصل بنا") { setShowContact(true); return; }
                if (l === "الرئيسية") { setPage("home"); setActiveCategory("الكل"); return; }
                if (l === "الكونكورات") { setPage("home"); setActiveCategory("آخر الكونكورات"); setVisibleCount(4); return; }
                if (l === "التوجيه") { setPage("home"); setActiveCategory("التوجيه الدراسي"); setVisibleCount(4); return; }
                if (l === "الجيش والأمن") { setPage("home"); setActiveCategory("الشرطة والجيش والدرك"); setVisibleCount(4); return; }
                if (l === "التعليم") { setPage("home"); setActiveCategory("مباريات التعليم"); setVisibleCount(4); return; }
                if (l === "منح") { setPage("home"); setActiveCategory("منح الدراسة بالخارج"); setVisibleCount(4); return; }
              }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-blue-700 hover:text-white ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{l}</button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {/* Search with live suggestions */}
            <div className="relative">
              {searchOpen && (
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => { if (e.key === "Escape") { setSearchQuery(""); setSearchOpen(false); } }}
                  placeholder="ابحث عن مباراة..."
                  className={`rounded-xl px-3 py-2 text-base w-52 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
                  style={{ fontSize: "16px" }}
                />
              )}
              {/* Suggestions dropdown */}
              {searchOpen && searchQuery.length >= 1 && (
                <div className={`absolute top-full mt-2 left-0 w-80 rounded-2xl shadow-2xl border z-50 overflow-hidden ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-100"}`}
                  style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
                  {suggestions.length > 0 ? (
                    <>
                      <div className={`px-4 py-2 text-xs font-semibold border-b ${darkMode ? "text-gray-500 border-gray-700" : "text-gray-400 border-gray-50"}`}>
                        {suggestions.length} نتيجة مقترحة
                      </div>
                      {suggestions.map(a => (
                        <button key={a.id}
                          onClick={() => { openArticle(a); setSearchOpen(false); setSearchQuery(""); }}
                          className={`w-full text-right px-4 py-3 flex items-center gap-3 transition-all border-b last:border-0 ${darkMode ? "hover:bg-gray-800 border-gray-800" : "hover:bg-blue-50 border-gray-50"}`}>
                          <img src={a.image} alt="" className="w-10 h-10 rounded-xl object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            {/* Highlight matching text */}
                            <p className={`text-sm font-semibold leading-snug ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
                              {a.title.split(new RegExp(`(${searchQuery})`, 'g')).map((part, i) =>
                                part === searchQuery
                                  ? <mark key={i} className="bg-blue-200 text-blue-800 rounded px-0.5">{part}</mark>
                                  : part
                              )}
                            </p>
                            <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-400"}`}>{a.category}</p>
                          </div>
                          <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className={`px-4 py-5 text-center text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                      <p className="text-2xl mb-1">🔍</p>
                      لا توجد نتائج لـ "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            <button onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setSearchQuery(""); }}
              className={`p-2.5 rounded-xl transition-all ${searchOpen ? "bg-blue-700 text-white" : darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2.5 rounded-xl transition-all ${darkMode ? "hover:bg-gray-800 text-yellow-400" : "hover:bg-gray-100 text-gray-600"}`}>
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>
            <button className="md:hidden p-2.5 rounded-xl hover:bg-gray-100" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu — floating overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40" onClick={() => setMenuOpen(false)}>
          <div className={`absolute top-14 left-0 right-0 mx-4 rounded-2xl shadow-2xl border overflow-hidden ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-100"}`}
            onClick={e => e.stopPropagation()}>
            {navLinks.map(l => (
              <button key={l} onClick={() => {
                setMenuOpen(false);
                if (l === "اتصل بنا") { setShowContact(true); return; }
                if (l === "الرئيسية") { setPage("home"); setActiveCategory("الكل"); return; }
                if (l === "الكونكورات") { setPage("home"); setActiveCategory("آخر الكونكورات"); setVisibleCount(4); return; }
                if (l === "التوجيه") { setPage("home"); setActiveCategory("التوجيه الدراسي"); setVisibleCount(4); return; }
                if (l === "الجيش والأمن") { setPage("home"); setActiveCategory("الشرطة والجيش والدرك"); setVisibleCount(4); return; }
                if (l === "التعليم") { setPage("home"); setActiveCategory("مباريات التعليم"); setVisibleCount(4); return; }
                if (l === "منح") { setPage("home"); setActiveCategory("منح الدراسة بالخارج"); setVisibleCount(4); return; }
              }}
                className={`w-full text-right px-5 py-3.5 text-sm font-semibold border-b last:border-0 transition-all ${darkMode ? "border-gray-800 hover:bg-gray-800 text-gray-200" : "border-gray-50 hover:bg-blue-50 text-gray-700"}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Admin bar */}
      {isAdmin && (
        <div className="bg-orange-500 text-white text-sm px-4 py-2 flex items-center justify-between">
          <span className="font-bold flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            وضع الأدمين مفعّل — الأزرار البرتقالية للتعديل
          </span>
          <button onClick={() => setIsAdmin(false)} className="underline text-orange-100 hover:text-white text-xs">خروج</button>
        </div>
      )}
    </header>
  );
  };

  // ── Article Page ──────────────────────────────────────────────────────────
  if (page === "article" && selectedArticle) {
    const a = articles.find(x => x.id === selectedArticle.id) || selectedArticle;
    const ytId = a.youtubeUrl ? getYoutubeId(a.youtubeUrl) : null;
    return (
      <div className={`min-h-screen ${bg} ${text} transition-colors duration-300`} dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
        {showLogin && <AdminLoginModal onLogin={() => { setIsAdmin(true); setShowLogin(false); }} onClose={() => setShowLogin(false)} darkMode={darkMode} />}
        {editingArticle && <ArticleEditor article={editingArticle} onSave={saveArticle} onClose={() => setEditingArticle(null)} darkMode={darkMode} />}
        {deleteTarget && <DeleteConfirmModal article={deleteTarget} onConfirm={() => deleteArticle(deleteTarget.id)} onCancel={() => setDeleteTarget(null)} darkMode={darkMode} />}
        {showContact && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm" style={{zIndex:9999}} onClick={() => setShowContact(false)}>
            <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"} rounded-2xl p-8 w-full max-w-sm shadow-2xl`} dir="rtl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <h2 className="text-xl font-black">اتصل بنا</h2>
                  <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>نحن هنا للمساعدة</p>
                </div>
              </div>
              <div className={`rounded-xl p-4 mb-5 ${darkMode ? "bg-gray-800" : "bg-blue-50"}`}>
                <p className={`text-xs mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>للتواصل عبر البريد الإلكتروني:</p>
                <a href="mailto:Mohamedamine.rifai1@gmail.com" className="text-blue-600 font-bold text-sm hover:underline break-all">Mohamedamine.rifai1@gmail.com</a>
              </div>
              <button onClick={() => setShowContact(false)} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-all">إغلاق</button>
            </div>
          </div>
        )}
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button onClick={() => setPage("home")} className="text-blue-600 flex items-center gap-2 mb-6 hover:underline font-semibold">← العودة للرئيسية</button>
          <div className={`grid grid-cols-1 lg:grid-cols-4 ${SP.gap}`}>
            <div className="lg:col-span-3">
              <div className={`${card} border rounded-2xl overflow-hidden`}>
                <img src={a.image} alt="" className="w-full h-64 object-cover" />
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap gap-2 mb-4 items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                      <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">{a.category}</span>
                      {a.tag && <span className={`${tagColors[a.tag]} text-white text-xs px-3 py-1 rounded-full font-semibold`}>{a.tag}</span>}
                    </div>
                    {isAdmin && (
                      <div className="flex gap-2">
                        <button onClick={() => setEditingArticle(a)}
                          className="flex items-center gap-2 text-sm bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-xl transition-all">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          تعديل المقال
                        </button>
                        <button onClick={() => setDeleteTarget(a)}
                          className="flex items-center gap-2 text-sm bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-xl transition-all">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16"/></svg>
                          حذف
                        </button>
                      </div>
                    )}
                  </div>
                  <h1 className={`text-2xl font-black leading-relaxed ${SP.mb}`}>{a.title}</h1>
                  <div className={`flex gap-6 text-sm ${subtext} mb-6 pb-6 border-b ${divider}`}>
                    <span>📅 {a.date}</span>
                    {isAdmin && <span className="flex items-center gap-1 bg-orange-50 text-orange-600 px-2 py-0.5 rounded-lg border border-orange-200">👁 {a.views.toLocaleString()} مشاهدة</span>}
                  </div>
                  <div className={`text-base leading-loose ${subtext} flex flex-col gap-4`}>
                    <p>{a.desc}</p>
                    {a.content && (
                      <div className="leading-loose">
                        {renderContentLines(a.content, a.lineStyles || [], {
                          textColor: a.textColor || "inherit",
                          textAlign: a.textAlign || "right",
                          fontStyle: a.fontStyle || "normal",
                          textDecoration: a.textDecoration || "none",
                          fontWeight: a.fontWeight,
                          fontSize: a.fontSize || "text-base",
                        })}
                      </div>
                    )}
                    {ytId && (
                      <a href={`https://www.youtube.com/watch?v=${ytId}`} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-lg group"
                        style={{background: "linear-gradient(135deg, #ff0000 0%, #cc0000 100%)"}}>
                        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <svg className="w-7 h-7 text-white mr-[-2px]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                        <div className="text-white">
                          <p className="font-bold text-base">مشاهدة الفيديو على يوتيوب</p>
                          <p className="text-sm text-red-100 mt-0.5">اضغط للمشاهدة</p>
                        </div>
                        <svg className="w-5 h-5 text-white/70 mr-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                      </a>
                    )}
                    {a.link && (
                      <a href={a.link} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:underline font-semibold">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                        رابط المصدر الرسمي
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1"><Sidebar /></div>
          </div>
        </div>
      </div>
    );
  }

  // ── Home Page ─────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen ${bg} ${text} transition-colors duration-300`} dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      {showLogin && <AdminLoginModal onLogin={() => { setIsAdmin(true); setShowLogin(false); }} onClose={() => setShowLogin(false)} darkMode={darkMode} />}
      {editingArticle && <ArticleEditor article={editingArticle} onSave={saveArticle} onClose={() => setEditingArticle(null)} darkMode={darkMode} />}
        {deleteTarget && <DeleteConfirmModal article={deleteTarget} onConfirm={() => deleteArticle(deleteTarget.id)} onCancel={() => setDeleteTarget(null)} darkMode={darkMode} />}

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm" style={{zIndex:9999}} onClick={() => setShowContact(false)}>
          <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"} rounded-2xl p-8 w-full max-w-sm shadow-2xl`} dir="rtl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <h2 className="text-xl font-black">اتصل بنا</h2>
                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>نحن هنا للمساعدة</p>
              </div>
            </div>
            <div className={`rounded-xl p-4 mb-5 ${darkMode ? "bg-gray-800" : "bg-blue-50"}`}>
              <p className={`text-xs mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>للتواصل عبر البريد الإلكتروني:</p>
              <a href="mailto:Mohamedamine.rifai1@gmail.com"
                className="text-blue-600 font-bold text-sm hover:underline break-all">
                Mohamedamine.rifai1@gmail.com
              </a>
            </div>
            <button onClick={() => setShowContact(false)}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-all">
              إغلاق
            </button>
          </div>
        </div>
      )}

      <Header />

      {/* Category bar */}
      <div className={`${darkMode ? "bg-blue-900" : "bg-blue-700"} py-2.5`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex gap-2 overflow-x-auto">
          {categories.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setVisibleCount(4); }}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? "bg-white text-blue-700 shadow-md shadow-blue-900/40" : "text-blue-100 hover:bg-blue-600"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className={`relative overflow-hidden ${darkMode ? "bg-gradient-to-br from-blue-950 via-blue-900/60 to-gray-900" : "bg-gradient-to-br from-blue-600 via-blue-700/90 to-blue-800"} py-6 md:py-12`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-300 rounded-full blur-2xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="max-w-2xl flex flex-col gap-3 md:gap-5">
            <h1 className="text-xl md:text-4xl font-black text-white leading-tight">
              بوابتك الشاملة للكونكورات والتوجيه بالمغرب
            </h1>
            <p className="text-blue-100 text-sm md:text-base leading-relaxed">
              تابع آخر المباريات والكونكورات والمنح الدراسية بالمغرب وخارجه. كل ما تحتاجه في مكان واحد.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setActiveCategory("الكل")} className="bg-white text-blue-700 font-bold px-7 py-2.5 rounded-xl hover:bg-blue-50 transition-all shadow-lg">استكشف المباريات</button>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className={`max-w-7xl mx-auto px-4 ${SP.section}`}>
        <div className={`grid grid-cols-1 lg:grid-cols-4 ${SP.gap}`}>
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black flex items-center gap-2">
                {activeCategory === "الكل" ? "كل المباريات" : activeCategory}
                <button onClick={() => setSearchOpen(true)} className={`p-1.5 rounded-lg transition-all ${darkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </button>
              </h2>
              <span className={`text-sm ${subtext}`}>{filtered.length} نتيجة</span>
            </div>
            {filtered.length === 0 ? (
              <div className={`${card} border rounded-2xl p-12 text-center`}>
                <p className="text-4xl mb-3">🔍</p>
                <p className={subtext}>لم يتم العثور على نتائج</p>
              </div>
            ) : (
              <div className={`grid grid-cols-1 md:grid-cols-2 ${SP.gap}`}>
                {filtered.slice(0, visibleCount).map((article, i) => <ArticleCard key={article.id} article={article} featured={i === 0} />)}
              </div>
            )}
            {visibleCount < filtered.length && (
              <div className="text-center">
                <button onClick={() => setVisibleCount(v => v + 4)}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-10 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl">
                  تحميل المزيد ({filtered.length - visibleCount} متبقي)
                </button>
              </div>
            )}
          </div>
          <div className="lg:col-span-1"><Sidebar /></div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-12">
        <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col items-center gap-6 text-center">
          {/* Copyright */}
          <p className="text-sm text-gray-400 leading-relaxed">
            جميع الحقوق محفوظة ©{" "}
            <span className="text-orange-400 font-bold">INFOCONCOURS</span>
            {" | "}مباريات التوظيف في المغرب والتوجيه المدرسي
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {/* TikTok */}
            <a href="#" className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:opacity-80 transition-opacity">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center hover:opacity-80 transition-opacity">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="https://youtube.com/@info.concours?si=dhw0nlhHuMpxw74b" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center hover:opacity-80 transition-opacity">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
