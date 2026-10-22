# ShramSetu — GitHub Pages Ready

यह ZIP श्रमसेतु के लिए एक responsive, static front-end demo है, जो दिए गए मोबाइल UI concept से प्रेरित है।

## फ़ाइलें
- `index.html` — सभी पेज और UI
- `style.css` — responsive design
- `app.js` — navigation, job search/filter, demo applications, profile storage, demo job posting
- `assets/` — भविष्य में logo/images रखने के लिए खाली फ़ोल्डर

## GitHub Pages पर चलाने का तरीका
1. ZIP को extract करें।
2. GitHub पर नया repository बनाएँ, उदाहरण: `shramsetu`.
3. Extract की गई फ़ाइलें और `assets` फ़ोल्डर repository के **root** में upload करें। ZIP को अकेले upload करने से वेबसाइट अपने आप extract नहीं होती।
4. Repository में **Settings → Pages** खोलें।
5. Build and deployment में **Deploy from a branch** चुनें।
6. Branch `main`, folder `/(root)` चुनकर Save करें।
7. कुछ मिनट बाद GitHub Pages का दिया हुआ URL खोलें।

## अभी क्या काम करता है?
- Responsive desktop/mobile dashboard
- Home, Categories, Jobs, Schemes, Training, Profile, Applications और Login/Register demo screens
- Job search, location/type filters और salary sorting
- Demo job details और demo apply flow
- Profile, demo applications और employer-created demo jobs `localStorage` में सेव होते हैं
- सरकारी योजनाओं के बाहरी लिंक

## महत्वपूर्ण सीमाएँ
यह अभी **front-end prototype** है, production-ready backend नहीं।
- Login/register केवल demo है; असली OTP भेजा नहीं जाता।
- डेटा सर्वर पर नहीं जाता और अलग डिवाइस/ब्राउज़र में sync नहीं होता।
- Job posts केवल उसी browser में दिखते हैं जिसने उन्हें बनाया है।
- Aadhaar/e-Shram authentication, real employer accounts, admin approval, database, email/SMS notifications, file uploads और payment integration शामिल नहीं हैं।
- Aadhaar number, OTP, UAN या अन्य संवेदनशील जानकारी इस static demo में न डालें।
- सरकारी योजनाओं के लाभ/पात्रता की जानकारी संबंधित आधिकारिक स्रोतों पर जाँचें।

## आगे के production चरण
Supabase/PostgreSQL backend, secure authentication, role-based access (worker/employer/admin), server-side job posting moderation, privacy policy, terms, reporting tools, backups और security review जोड़ें।
