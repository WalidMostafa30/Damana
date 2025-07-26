// api.js
import axios from 'axios';
import CryptoJS from 'crypto-js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import toast from "react-hot-toast";
dayjs.extend(utc);
dayjs.extend(timezone);
// إعداد القيم الثابتة من متغيرات البيئة (تأكد من وضعها في ملف .env)
/*
const STATIC_WORD = process.env.REACT_APP_SIGNATURE_STATIC_WORD || 'EdamAna2025RO';
const SECRET_KEY = process.env.REACT_APP_SIGNATURE_SECRET || 'AC03a1586d78af8170fe222d822ebswAW';
const API_KEY = process.env.REACT_APP_API_KEY || '771c47fb41-18684646a5-67fa2a8d10-95f8dbe30b-31cb9b261e-4ef52c9e4b';
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://localhost/';
*/

const STATIC_WORD = import.meta.env.VITE_SIGNATURE_STATIC_WORD || 'EdamAna2025RO';
const SECRET_KEY = import.meta.env.VITE_SIGNATURE_SECRET || 'default_secret';
const API_KEY = import.meta.env.VITE_API_KEY || 'default_key';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://qa.edamana.live/';
const BASE_URL_LOCAL = 'https://qa.edamana.live/';





// دالة لتوليد nonce فريد لكل طلب
const generateNonce = () => Date.now().toString();

// دالة لحساب التوقيع باستخدام HMAC-SHA256
// نستخدم هنا معايير مشابهة لتلك الموجودة على الخادم:
//   signature = hash_hmac('sha256', nonce + staticWord + urlWithoutProtocol + date + method, secretKey)
const computeSignature = (config, nonce) => {
    // نحصل على عنوان الـ URL بدون البروتوكول
    // يمكننا استخراج المضيف والمسار من config.url



    let urlObj = new URL(BASE_URL_LOCAL + config.url);





    let urlWithoutProtocol = urlObj.hostname + urlObj.pathname;


    // نحصل على التاريخ بصيغة yy-mm-dd بتوقيت 'asia/amman'
    const date = dayjs().tz('Asia/Amman').format('YY-MM-DD');


    // طريقة الطلب (GET, POST, ...)
    const method = config.method ? config.method.toUpperCase() : 'GET';


    // تجميع البيانات حسب الترتيب المطلوب
    const dataToSign = nonce + STATIC_WORD + urlWithoutProtocol + date + method;

    return CryptoJS.HmacSHA256(dataToSign, SECRET_KEY).toString();
};

// دالة للتحقق من توقيع الاستجابة
// نستخدم معلومات الطلب الأصلي وبعض معايير الحساب المماثلة للتحقق من صحة التوقيع المرسل من الخادم.
const verifyResponseSignature = (response) => {
    const nonce = response.headers['x-nonce'];
    const signature = response.headers['x-signature'];
    if (!nonce || !signature) {
        toast.error("غير متوافق مع استجابه الخادم");
        throw new Error('Response signature headers missing');
    }
    const expectedSignature = computeSignature(response.config, nonce);
    if (CryptoJS.enc.Hex.parse(expectedSignature).toString() !== CryptoJS.enc.Hex.parse(signature).toString()) {
        toast.error("غير متوافق مع استجابه الخادم");
        throw new Error('Response signature verification failed');

    }
    return response;
};
axios.defaults.withCredentials = true





// إنشاء instance مخصص من Axios مع الإعدادات الافتراضية
const api = axios.create({
    baseURL: BASE_URL_LOCAL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'accept-language': 'en',
        'X-API-Key': API_KEY,
    },
    maxBodyLength: Infinity,
});



// Interceptor للطلبات: لإضافة nonce وتوقيع الطلب
api.interceptors.request.use((config) => {
    const nonce = generateNonce();
    // يمكن هنا تطبيق التشفير على بيانات الطلب إذا لزم الأمر، على سبيل المثال:
    /*
        if (config.data) {
            // مثال للتشفير باستخدام AES (يمكن تعديله حسب احتياجاتك)
            const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(config.data), SECRET_KEY).toString();
            config.data = ciphertext;
        }
    */


    // حساب التوقيع وإضافته إلى الرؤوس
    const signature = computeSignature(config, nonce);



    config.headers['X-Nonce'] = nonce;
    config.headers['X-Signature'] = signature;
    config.headers['accept-language'] = "ar";



    return config;
}, (error) => Promise.reject(error));

// Interceptor للاستجابة: لفك تشفير البيانات والتحقق من التوقيع

api.interceptors.response.use(
    (response) => {
        if (response && response.status !== 204) {
            verifyResponseSignature(response);
        }
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        }


        if (error.response && error.response.data && error.response.data.error_msg) {
            toast.error(error.response.data.error_msg);
        } else {
            toast.error(error.message || "حدث خطأ");
        }



        return Promise.reject(error);
    }
);

/*
api.interceptors.response.use((response) => {
    console.log('response response' , response )

    // التحقق من توقيع الاستجابة
    verifyResponseSignature(response);

        // التحقق من توقيع الاستجابة
        // إذا كانت الاستجابة مشفرة (على سبيل المثال نص مشفر)، نحاول فك تشفيرها
        if (response.data && typeof response.data === 'string') {
            try {
                const bytes = CryptoJS.AES.decrypt(response.data, SECRET_KEY);
                response.data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            } catch (e) {
                console.error('فشل فك التشفير', e);
            }
        }



    // إذا كانت الاستجابة مشفرة (على سبيل المثال نص مشفر)، نحاول فك تشفيرها
    if (response.data && typeof response.data === 'string') {
        try {
            const bytes = CryptoJS.AES.decrypt(response.data, SECRET_KEY);
            response.data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (e) {
            console.error('فشل فك التشفير', e);
        }
    }
    return response;
}, (error) => Promise.reject(error));
*/




export default api;
