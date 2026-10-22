const categories = [
  {name:"मजदूर",en:"General Worker",icon:"👷",desc:"निर्माण और सामान्य श्रमिक कार्य"},
  {name:"इलेक्ट्रिशियन",en:"Electrician",icon:"🧑‍🔧",desc:"वायरिंग, मरम्मत और इलेक्ट्रिकल काम"},
  {name:"प्लंबर",en:"Plumber",icon:"🔧",desc:"पाइप, फिटिंग और पानी की व्यवस्था"},
  {name:"मिस्त्री",en:"Mason",icon:"🧱",desc:"निर्माण, ईंट और प्लास्टर का काम"},
  {name:"वेल्डर",en:"Welder",icon:"🥽",desc:"मेटल वेल्डिंग और फैब्रिकेशन"},
  {name:"कारपेंटर",en:"Carpenter",icon:"🪚",desc:"लकड़ी का काम और फर्नीचर"},
  {name:"ड्राइवर",en:"Driver",icon:"🚚",desc:"डिलीवरी, वाहन और ट्रांसपोर्ट"},
  {name:"कंप्यूटर ऑपरेटर",en:"Computer Operator",icon:"💻",desc:"डेटा एंट्री और ऑफिस कंप्यूटर कार्य"},
  {name:"पेंटर",en:"Painter",icon:"🖌️",desc:"घर, भवन और औद्योगिक पेंटिंग"},
  {name:"सिक्योरिटी गार्ड",en:"Security Guard",icon:"🛡️",desc:"सुरक्षा और निगरानी"},
  {name:"हाउसकीपिंग",en:"Housekeeping",icon:"🧹",desc:"सफाई और रखरखाव"},
  {name:"टेलर",en:"Tailor",icon:"🧵",desc:"सिलाई और कपड़ों की मरम्मत"}
];
let jobs = [
 {id:1,title:"इलेक्ट्रिशियन (अनुभवी)",company:"श्री साई सर्विसेज",location:"अकोला",salary:"₹15,000 – 20,000 / माह",minSalary:15000,type:"Full-time",icon:"🧑‍🔧",experience:"1–3 साल",description:"घरेलू और कमर्शियल साइट पर बेसिक वायरिंग, इलेक्ट्रिकल इंस्टॉलेशन और मेंटेनेंस। सुरक्षा नियमों का पालन आवश्यक है।"},
 {id:2,title:"प्लंबर (जूनियर)",company:"सिटी बिल्डर्स",location:"नागपुर",salary:"₹12,000 – 18,000 / माह",minSalary:12000,type:"Full-time",icon:"🔧",experience:"नया / 1 साल से कम",description:"पाइप फिटिंग, लीकेज जाँच और सामान्य प्लंबिंग कार्य। प्रशिक्षण और काम सीखने का अवसर।"},
 {id:3,title:"निर्माण मजदूर",company:"विश्वास कंस्ट्रक्शन",location:"अकोला",salary:"₹10,000 – 15,000 / माह",minSalary:10000,type:"Contract",icon:"👷",experience:"नया / 1 साल से कम",description:"निर्माण स्थल पर सामान्य मजदूरी, सामग्री व्यवस्थित करना और टीम के साथ काम करना।"},
 {id:4,title:"कंप्यूटर ऑपरेटर",company:"स्मार्ट ऑफिस सॉल्यूशन्स",location:"पुणे",salary:"₹14,000 – 19,000 / माह",minSalary:14000,type:"Full-time",icon:"💻",experience:"1–3 साल",description:"डेटा एंट्री, दस्तावेज़ तैयार करना और बुनियादी MS Office कार्य। कंप्यूटर का सामान्य ज्ञान आवश्यक।"},
 {id:5,title:"डिलीवरी ड्राइवर",company:"लोकल लॉजिस्टिक्स",location:"मुंबई",salary:"₹18,000 – 25,000 / माह",minSalary:18000,type:"Full-time",icon:"🚚",experience:"1–3 साल",description:"स्थानीय डिलीवरी और सामान की सुरक्षित ढुलाई। वैध ड्राइविंग लाइसेंस आवश्यक।"},
 {id:6,title:"कारपेंटर हेल्पर",company:"न्यू होम फर्नीचर",location:"नासिक",salary:"₹11,000 – 16,000 / माह",minSalary:11000,type:"Part-time",icon:"🪚",experience:"नया / 1 साल से कम",description:"फर्नीचर बनाने और इंस्टॉलेशन में सहायता। हाथ के औजारों की बुनियादी जानकारी उपयोगी।"}
];
const schemes = [
 {icon:"🧑‍🏭",title:"ई-श्रम पोर्टल",desc:"असंगठित क्षेत्र के कामगारों के पंजीकरण और संबंधित जानकारी के लिए आधिकारिक पोर्टल देखें।",url:"https://eshram.gov.in",label:"आधिकारिक ई-श्रम पोर्टल ↗"},
 {icon:"🏗️",title:"निर्माण श्रमिक कल्याण बोर्ड",desc:"निर्माण श्रमिकों के लिए राज्य के अनुसार पंजीकरण, सहायता और लाभ की जानकारी जाँचें।",url:"https://mahabocw.in",label:"महाराष्ट्र BOCW ↗"},
 {icon:"🎓",title:"कौशल भारत / Skill India",desc:"कौशल प्रशिक्षण और प्रमाणन के उपलब्ध कार्यक्रमों के बारे में जानकारी प्राप्त करें।",url:"https://www.skillindia.gov.in",label:"Skill India ↗"},
 {icon:"🏠",title:"प्रधानमंत्री आवास योजना",desc:"आवास संबंधी योजनाओं के दिशा-निर्देश, पात्रता और आवेदन अपडेट आधिकारिक स्रोत से देखें।",url:"https://pmay-urban.gov.in",label:"PMAY Urban ↗"},
 {icon:"🩺",title:"आयुष्मान भारत PM-JAY",desc:"स्वास्थ्य कवर और पात्रता की जाँच आधिकारिक योजना वेबसाइट पर करें।",url:"https://pmjay.gov.in",label:"PM-JAY ↗"},
 {icon:"💳",title:"जन धन योजना",desc:"बैंकिंग सुविधा और योजना की शर्तों की जानकारी आधिकारिक वित्तीय सेवा स्रोतों से जाँचें।",url:"https://pmjdy.gov.in",label:"PMJDY ↗"}
];
let applications = JSON.parse(localStorage.getItem("shramsetuApplications") || "[]");
let customJobs = JSON.parse(localStorage.getItem("shramsetuCustomJobs") || "[]");
jobs = [...customJobs, ...jobs];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2800)}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderCategories(){ $("#categoryGrid").innerHTML=categories.map(c=>`<button class="category-card" data-category="${escapeHtml(c.name)}"><span class="category-emoji">${c.icon}</span><h3>${c.name}</h3><p>${c.desc}</p><span class="text-link">नौकरियाँ देखें →</span></button>`).join(""); }
function jobCard(j){return `<article class="job-card"><div class="company-logo">${j.icon||"💼"}</div><div class="job-main"><h3>${escapeHtml(j.title)}</h3><p>${escapeHtml(j.company)} · ${escapeHtml(j.location)}</p><div class="job-meta"><span>◷ ${escapeHtml(j.type)}</span><span>♙ ${escapeHtml(j.experience||"अनुभव अनुसार")}</span></div></div><div class="job-side"><span class="salary">${escapeHtml(j.salary)}</span><button class="btn btn-soft view-job" data-id="${j.id}">विवरण देखें</button></div></article>`}
function renderJobs(){const q=($("#jobSearch")?.value||"").trim().toLowerCase(),loc=$("#locationFilter")?.value||"",type=$("#typeFilter")?.value||"";let list=jobs.filter(j=>(!q||(j.title+" "+j.company+" "+j.location+" "+(j.description||"")).toLowerCase().includes(q))&&(!loc||j.location===loc)&&(!type||j.type===type));if($("#sortJobs")?.value==="salary")list.sort((a,b)=>b.minSalary-a.minSalary);$("#jobsList").innerHTML=list.length?list.map(jobCard).join(""):`<div class="empty-state"><strong>कोई नौकरी नहीं मिली</strong>खोज के शब्द या फिल्टर बदलकर फिर कोशिश करें।</div>`;$("#resultsLabel").textContent=`${list.length} अवसर मिले`;$("#homeJobs").innerHTML=jobs.slice(0,3).map(jobCard).join("");}
function renderSchemes(){$("#schemeGrid").innerHTML=schemes.map(s=>`<article class="scheme-card"><div class="scheme-icon">${s.icon}</div><div><h3>${s.title}</h3><p>${s.desc}</p><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label}</a></div></article>`).join("")}
function renderApplications(){if(!applications.length){$("#applicationList").innerHTML='<div class="empty-state"><strong>अभी कोई आवेदन नहीं है</strong>नौकरी खोजें और “आवेदन करें” चुनें। <p><a class="text-link" href="#jobs">नौकरी खोजें →</a></p></div>';return}$("#applicationList").innerHTML=applications.map(a=>`<article class="application-card"><div class="company-logo">💼</div><div class="application-info"><h3>${escapeHtml(a.title)}</h3><p>${escapeHtml(a.company)} · ${escapeHtml(a.location)} · आवेदन: ${escapeHtml(a.date)}</p></div><span class="status submitted">आवेदन जमा</span></article>`).join("")}
function goPage(page){const valid=["home","categories","jobs","schemes","training","profile","applications","login"];if(!valid.includes(page))page="home";$$(".page").forEach(p=>p.classList.toggle("active",p.id===`page-${page}`));$$("[data-page]").forEach(a=>a.classList.toggle("active",a.dataset.page===page));$("#sidebar").classList.remove("open");if(page==="jobs")renderJobs();if(page==="applications")renderApplications();window.scrollTo({top:0,behavior:"smooth"});if(location.hash!==`#${page}`)history.replaceState(null,"",`#${page}`)}
function openJob(id){const j=jobs.find(x=>x.id===Number(id));if(!j)return;$("#modalTitle").textContent=j.title;$("#modalBody").innerHTML=`<span class="tag">${escapeHtml(j.type)}</span><h3>${escapeHtml(j.company)}</h3><p>📍 ${escapeHtml(j.location)}　 ·　 💰 <b>${escapeHtml(j.salary)}</b></p><p>अनुभव: ${escapeHtml(j.experience||"अनुभव अनुसार")}</p><p>${escapeHtml(j.description||"नौकरी की अतिरिक्त जानकारी के लिए नियोक्ता से संपर्क करें।")}</p><button class="btn btn-primary wide" id="applyBtn" data-id="${j.id}">इस नौकरी के लिए आवेदन करें</button><small style="display:block;color:#77899b;margin-top:10px">डेमो आवेदन — आपकी जानकारी किसी नियोक्ता को नहीं भेजी जाएगी।</small>`;$("#jobModal").showModal()}
function applyJob(id){const j=jobs.find(x=>x.id===Number(id));if(!j)return;if(applications.some(a=>a.jobId===j.id)){toast("आप इस नौकरी के लिए पहले ही आवेदन कर चुके हैं।");return}applications.unshift({jobId:j.id,title:j.title,company:j.company,location:j.location,date:new Date().toLocaleDateString("hi-IN")});localStorage.setItem("shramsetuApplications",JSON.stringify(applications));$("#applicationCount").textContent=String(applications.length).padStart(2,"0");$("#jobModal").close();toast("डेमो आवेदन सफलतापूर्वक दर्ज हुआ।");}
function loadProfile(){const p=JSON.parse(localStorage.getItem("shramsetuProfile")||"{}");for(const [key,id] of Object.entries({name:"profileName",mobile:"profileMobile",state:"profileState",city:"profileCity",skill:"profileSkill",experience:"profileExperience",about:"profileAbout"})){if(p[key]!==undefined)$("#"+id).value=p[key]}if(p.name){$("#profileHeading").textContent=p.name;$("#profileAvatar").textContent=p.name.trim().charAt(0);$(".sidebar-user b").textContent=p.name;$(".user-name").textContent=p.name;$(".avatar.small").textContent=p.name.trim().charAt(0)}}
function saveProfile(e){e.preventDefault();const p={name:$("#profileName").value.trim(),mobile:$("#profileMobile").value.trim(),state:$("#profileState").value,city:$("#profileCity").value.trim(),skill:$("#profileSkill").value,experience:$("#profileExperience").value,about:$("#profileAbout").value.trim()};if(p.mobile&&!/^\d{10}$/.test(p.mobile)){toast("मोबाइल नंबर 10 अंकों का होना चाहिए।");return}localStorage.setItem("shramsetuProfile",JSON.stringify(p));loadProfile();$("#profileMessage").textContent="प्रोफाइल इस डिवाइस पर सेव हो गई।";toast("प्रोफाइल सेव हो गई।")}
function postJob(e){e.preventDefault();const j={id:Date.now(),title:$("#postTitle").value.trim(),company:"स्थानीय नियोक्ता (डेमो)",location:$("#postLocation").value.trim(),salary:$("#postSalary").value.trim(),minSalary:0,type:$("#postType").value,icon:"💼",experience:"विवरण अनुसार",description:$("#postDescription").value.trim()};if(!j.title||!j.location||!j.salary||!j.description)return;customJobs.unshift(j);localStorage.setItem("shramsetuCustomJobs",JSON.stringify(customJobs));jobs=[...customJobs,...jobs.filter(x=>!customJobs.some(c=>c.id===x.id))];$("#postModal").close();$("#postJobForm").reset();renderJobs();toast("डेमो नौकरी जोड़ दी गई।");}
document.addEventListener("click",e=>{const nav=e.target.closest("[data-page]");if(nav){e.preventDefault();goPage(nav.dataset.page);return}const cat=e.target.closest("[data-category]");if(cat){$("#jobSearch").value=cat.dataset.category;goPage("jobs");renderJobs();return}const view=e.target.closest(".view-job");if(view){openJob(view.dataset.id);return}const apply=e.target.closest("#applyBtn");if(apply){applyJob(apply.dataset.id);return}const enroll=e.target.closest(".enroll");if(enroll){toast(`“${enroll.dataset.course}” प्रशिक्षण में रुचि दर्ज हुई (डेमो)।`);return}});
$("#menuBtn").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
$("#profileQuick").addEventListener("click",()=>goPage("profile"));
$("#notificationBtn").addEventListener("click",()=>toast("अभी कोई नई सूचना नहीं है।"));
$("#filterBtn").addEventListener("click",renderJobs);$("#jobSearch").addEventListener("input",renderJobs);$("#locationFilter").addEventListener("change",renderJobs);$("#typeFilter").addEventListener("change",renderJobs);$("#sortJobs").addEventListener("change",renderJobs);
$("#profileForm").addEventListener("submit",saveProfile);
$("#employerPostBtn").addEventListener("click",()=>$("#postModal").showModal());$("#closePostModal").addEventListener("click",()=>$("#postModal").close());$("#postJobForm").addEventListener("submit",postJob);
$("#loginForm").addEventListener("submit",e=>{e.preventDefault();const name=$("#loginName").value.trim(),mobile=$("#loginMobile").value.trim();if(!/^\d{10}$/.test(mobile)){toast("कृपया 10 अंकों का मोबाइल नंबर दर्ज करें।");return}localStorage.setItem("shramsetuProfile",JSON.stringify({...JSON.parse(localStorage.getItem("shramsetuProfile")||"{}"),name,mobile}));$("#loginMessage").textContent="डेमो प्रोफाइल बन गई। यह असली OTP लॉगिन नहीं है।";loadProfile();toast("डेमो रजिस्ट्रेशन सफल।");setTimeout(()=>goPage("profile"),700)});
$("#jobModal").addEventListener("click",e=>{if(e.target===$("#jobModal"))$("#jobModal").close()});
window.addEventListener("hashchange",()=>goPage(location.hash.slice(1)));
renderCategories();renderSchemes();renderJobs();renderApplications();loadProfile();$("#applicationCount").textContent=String(applications.length).padStart(2,"0");goPage(location.hash.slice(1)||"home");
/* ==========================================
   SHRAMSETU MULTI-LANGUAGE SYSTEM
   Hindi, English, Marathi, Urdu, Gujarati,
   Bengali
========================================== */

(function () {
  "use strict";

  const LANGUAGES = {
    hi: "हिंदी",
    en: "English",
    mr: "मराठी",
    ur: "اردو",
    gu: "ગુજરાતી",
    bn: "বাংলা"
  };

  const TRANSLATIONS = {
    "श्रमसेतु": {
      en: "ShramSetu",
      mr: "श्रमसेतू",
      ur: "شرم سیتو",
      gu: "શ્રમસેતુ",
      bn: "শ্রমসেতু"
    },
    "होम": {
      en: "Home",
      mr: "मुख्यपृष्ठ",
      ur: "ہوم",
      gu: "હોમ",
      bn: "হোম"
    },
    "मुख्य पृष्ठ": {
      en: "Home",
      mr: "मुख्यपृष्ठ",
      ur: "مرکزی صفحہ",
      gu: "મુખ્ય પૃષ્ઠ",
      bn: "মূল পৃষ্ঠা"
    },
    "नौकरियां": {
      en: "Jobs",
      mr: "नोकऱ्या",
      ur: "نوکریاں",
      gu: "નોકરીઓ",
      bn: "চাকরি"
    },
    "नौकरी": {
      en: "Job",
      mr: "नोकरी",
      ur: "نوکری",
      gu: "નોકરી",
      bn: "চাকরি"
    },
    "योजनाएं": {
      en: "Schemes",
      mr: "योजना",
      ur: "اسکیمیں",
      gu: "યોજનાઓ",
      bn: "প্রকল্প"
    },
    "सरकारी योजनाएं": {
      en: "Government Schemes",
      mr: "सरकारी योजना",
      ur: "سرکاری اسکیمیں",
      gu: "સરકારી યોજનાઓ",
      bn: "সরকারি প্রকল্প"
    },
    "प्रशिक्षण": {
      en: "Training",
      mr: "प्रशिक्षण",
      ur: "تربیت",
      gu: "તાલીમ",
      bn: "প্রশিক্ষণ"
    },
    "प्रोफाइल": {
      en: "Profile",
      mr: "प्रोफाइल",
      ur: "پروفائل",
      gu: "પ્રોફાઇલ",
      bn: "প্রোফাইল"
    },
    "मेरी प्रोफाइल": {
      en: "My Profile",
      mr: "माझी प्रोफाइल",
      ur: "میری پروفائل",
      gu: "મારી પ્રોફાઇલ",
      bn: "আমার প্রোফাইল"
    },
    "आवेदन": {
      en: "Applications",
      mr: "अर्ज",
      ur: "درخواستیں",
      gu: "અરજીઓ",
      bn: "আবেদন"
    },
    "मेरे आवेदन": {
      en: "My Applications",
      mr: "माझे अर्ज",
      ur: "میری درخواستیں",
      gu: "મારી અરજીઓ",
      bn: "আমার আবেদন"
    },
    "लॉगिन": {
      en: "Login",
      mr: "लॉगिन",
      ur: "لاگ ان",
      gu: "લૉગિન",
      bn: "লগইন"
    },
    "लॉग इन": {
      en: "Login",
      mr: "लॉगिन",
      ur: "لاگ ان",
      gu: "લૉગિન",
      bn: "লগইন"
    },
    "रजिस्टर": {
      en: "Register",
      mr: "नोंदणी",
      ur: "رجسٹر",
      gu: "રજિસ્ટર",
      bn: "নিবন্ধন"
    },
    "पंजीकरण": {
      en: "Registration",
      mr: "नोंदणी",
      ur: "رجسٹریشن",
      gu: "નોંધણી",
      bn: "নিবন্ধন"
    },
    "नाम": {
      en: "Name",
      mr: "नाव",
      ur: "نام",
      gu: "નામ",
      bn: "নাম"
    },
    "मोबाइल नंबर": {
      en: "Mobile Number",
      mr: "मोबाईल नंबर",
      ur: "موبائل نمبر",
      gu: "મોબાઇલ નંબર",
      bn: "মোবাইল নম্বর"
    },
    "ईमेल": {
      en: "Email",
      mr: "ईमेल",
      ur: "ای میل",
      gu: "ઈમેઇલ",
      bn: "ইমেল"
    },
    "पता": {
      en: "Address",
      mr: "पत्ता",
      ur: "پتہ",
      gu: "સરનામું",
      bn: "ঠিকানা"
    },
    "जिला": {
      en: "District",
      mr: "जिल्हा",
      ur: "ضلع",
      gu: "જિલ્લો",
      bn: "জেলা"
    },
    "राज्य": {
      en: "State",
      mr: "राज्य",
      ur: "ریاست",
      gu: "રાજ્ય",
      bn: "রাজ্য"
    },
    "खोजें": {
      en: "Search",
      mr: "शोधा",
      ur: "تلاش کریں",
      gu: "શોધો",
      bn: "খুঁজুন"
    },
    "सर्च करें": {
      en: "Search",
      mr: "शोधा",
      ur: "تلاش کریں",
      gu: "શોધો",
      bn: "খুঁজুন"
    },
    "विवरण देखें": {
      en: "View Details",
      mr: "तपशील पहा",
      ur: "تفصیلات دیکھیں",
      gu: "વિગતો જુઓ",
      bn: "বিস্তারিত দেখুন"
    },
    "आवेदन करें": {
      en: "Apply Now",
      mr: "अर्ज करा",
      ur: "درخواست دیں",
      gu: "અરજી કરો",
      bn: "আবেদন করুন"
    },
    "सब देखें": {
      en: "View All",
      mr: "सर्व पहा",
      ur: "سب دیکھیں",
      gu: "બધું જુઓ",
      bn: "সব দেখুন"
    },
    "वापस": {
      en: "Back",
      mr: "मागे",
      ur: "واپس",
      gu: "પાછા",
      bn: "ফিরে যান"
    },
    "सेव करें": {
      en: "Save",
      mr: "जतन करा",
      ur: "محفوظ کریں",
      gu: "સાચવો",
      bn: "সংরক্ষণ করুন"
    },
    "अपडेट करें": {
      en: "Update",
      mr: "अपडेट करा",
      ur: "اپ ڈیٹ کریں",
      gu: "અપડેટ કરો",
      bn: "আপডেট করুন"
    },
    "सबमिट करें": {
      en: "Submit",
      mr: "सबमिट करा",
      ur: "جمع کریں",
      gu: "સબમિટ કરો",
      bn: "জমা দিন"
    },
    "रद्द करें": {
      en: "Cancel",
      mr: "रद्द करा",
      ur: "منسوخ کریں",
      gu: "રદ કરો",
      bn: "বাতিল করুন"
    },
    "नोटिफिकेशन": {
      en: "Notifications",
      mr: "सूचना",
      ur: "اطلاعات",
      gu: "સૂચનાઓ",
      bn: "বিজ্ঞপ্তি"
    },
    "नौकरी खोजें": {
      en: "Find Jobs",
      mr: "नोकऱ्या शोधा",
      ur: "نوکری تلاش کریں",
      gu: "નોકરી શોધો",
      bn: "চাকরি খুঁজুন"
    },
    "सरकारी योजनाओं की जानकारी": {
      en: "Government Scheme Information",
      mr: "सरकारी योजनांची माहिती",
      ur: "سرکاری اسکیموں کی معلومات",
      gu: "સરકારી યોજનાઓની માહિતી",
      bn: "সরকারি প্রকল্পের তথ্য"
    },
    "भाषा चुनें": {
      en: "Select Language",
      mr: "भाषा निवडा",
      ur: "زبان منتخب کریں",
      gu: "ભાષા પસંદ કરો",
      bn: "ভাষা নির্বাচন করুন"
    }
  };

  let currentLanguage = localStorage.getItem("shramsetu_language") || "hi";

  function translateText(text) {
    if (!text || currentLanguage === "hi") {
      return text;
    }

    const trimmed = text.trim();

    if (TRANSLATIONS[trimmed] &&
        TRANSLATIONS[trimmed][currentLanguage]) {
      return text.replace(
        trimmed,
        TRANSLATIONS[trimmed][currentLanguage]
      );
    }

    return text;
  }

  function translatePage() {
    document.documentElement.lang = currentLanguage;

    document.documentElement.dir =
      currentLanguage === "ur" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      const key = element.getAttribute("data-i18n");

      if (TRANSLATIONS[key]) {
        element.textContent =
          currentLanguage === "hi"
            ? key
            : (TRANSLATIONS[key][currentLanguage] || key);
      }
    });

    document.querySelectorAll("input[placeholder], textarea[placeholder]")
      .forEach(function (element) {
        const original = element.getAttribute("data-original-placeholder")
          || element.placeholder;

        if (!element.hasAttribute("data-original-placeholder")) {
          element.setAttribute("data-original-placeholder", original);
        }

        element.placeholder = translateText(original);
      });

    document.querySelectorAll("button, a, label, h1, h2, h3, h4, p, span")
      .forEach(function (element) {
        if (element.children.length === 0 && element.textContent.trim()) {
          if (!element.hasAttribute("data-original-text")) {
            element.setAttribute("data-original-text", element.textContent);
          }

          const original = element.getAttribute("data-original-text");

          element.textContent = translateText(original);
        }
      });

    const languageSelect = document.getElementById("languageSelect");

    if (languageSelect) {
      languageSelect.value = currentLanguage;
    }
  }

  function setLanguage(language) {
    if (!LANGUAGES[language]) return;

    currentLanguage = language;

    localStorage.setItem("shramsetu_language", language);

    translatePage();
  }

  function initializeLanguageSelector() {
    const selector = document.getElementById("languageSelect");

    if (selector) {
      selector.value = currentLanguage;

      selector.addEventListener("change", function () {
        setLanguage(this.value);
      });
    }

    translatePage();
  }

  window.ShramSetuLanguage = {
    setLanguage: setLanguage,
    getLanguage: function () {
      return currentLanguage;
    },
    getLanguages: function () {
      return LANGUAGES;
    },
    translatePage: translatePage
  };

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeLanguageSelector
    );
  } else {
    initializeLanguageSelector();
  }

  // Translate newly rendered content as well.
  const observer = new MutationObserver(function () {
    if (!window._shramSetuTranslationRunning) {
      window._shramSetuTranslationRunning = true;

      requestAnimationFrame(function () {
        translatePage();
        window._shramSetuTranslationRunning = false;
      });
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

})();
