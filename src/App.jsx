import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  RotateCcw, Trophy, Clock, Layers, Bot, Globe, Users, KeyRound,
  UserCircle, Copy, ArrowRight, Loader2, Check, PlusCircle, ShieldCheck, X,
  Mail, Gamepad2, LifeBuoy, Gavel, AlertTriangle, Ban, Settings2, PlayCircle, PauseCircle
} from 'lucide-react';

const WORDS = [
  "آخر","آدم","آذن","آفت","آلي","آمة","آمن","آية","أبا","أبت","أبد","أبط","أبق","أبن","أبي",
  "أتل","أتى","أثر","أثل","أثم","أجب","أجد","أجر","أجز","أجل","أحب","أحت","أحث","أحج","أحد",
  "أحر","أحس","أحش","أحط","أحل","أخذ","أخش","أخي","أدا","أدب","أدع","أدف","أدق","أدم","أذب",
  "أذل","أذن","أذى","أرت","أرث","أرج","أرح","أرخ","أرد","أرز","أرس","أرض","أرق","أرم","أرن",
  "أرى","أزر","أزف","أزل","أسب","أسد","أسر","أسس","أسف","أسق","أسم","أسى","أشب","أشد","أشط",
  "أشل","أشم","أشن","أصر","أصل","أضد","أضل","أضم","أطر","أطل","أطم","أظل","أظن","أعد","أعل",
  "أغر","أغط","أغم","أفج","أفع","أفق","أفك","أقص","أقض","أقف","أقل","أقم","أكب","أكد","أكر",
  "أكف","أكل","أكن","ألا","ألت","ألج","ألح","ألف","ألق","ألم","ألن","أله","ألى","ألي","أما",
  "أمة","أمد","أمر","أمس","أمش","أمل","أمن","أمي","أنا","أنت","أنج","أنس","أنف","أنق","أني",
  "أهل","أهم","أود","أول","أون","أوه","أوى","أية","أيد","أيض","أين","إتم","إذا","إذن","إرم",
  "إلا","إله","إلى","إما","إيف","إيل","ابل","ابن","احن","ارث","است","اسف","اسل","اسم","اصم",
  "بأر","بأس","باء","باب","بات","باز","باس","باص","باع","باغ","باق","بال","بان","بتر","بثر",
  "بثق","بجح","بجد","بجع","بحت","بحث","بحر","بحص","بحل","بخل","بدأ","بدا","بدر","بدل","بدن",
  "بدو","برا","برة","برج","برح","برد","برر","برز","برش","برص","برع","برق","برك","برم","برى",
  "بري","بزر","بزل","بزى","بسط","بسق","بسل","بسم","بشر","بشم","بصر","بصق","بصل","بضع","بطأ",
  "بطة","بطر","بطش","بطل","بطن","بعث","بعج","بعد","بعض","بعط","بعل","بغل","بغى","بقر","بقع",
  "بقل","بقى","بقي","بكر","بكل","بكم","بكى","بلج","بلح","بلد","بلس","بلط","بلع","بلق","بلل",
  "بلى","بنت","بنك","بنى","بني","بهت","بهج","بهر","بهق","بهو","بهي","بوس","بوق","بول","بيت",
  "بيض","بيع","بين","تأس","تأن","تاب","تاج","تام","تاه","تبت","تبع","تبن","تبي","تتم","تجب",
  "تجر","تجل","تحب","تحت","تحس","تحش","تحط","تحف","تحق","تحل","تحن","تخر","تخط","تخف","تدق",
  "تدل","تذم","ترج","ترع","ترف","ترك","ترى","تسع","تسل","تشع","تضل","تعب","تعر","تعس","تغم",
  "تفث","تفل","تفي","تقر","تقص","تقف","تقل","تقى","تكة","تكى","تلد","تلف","تلق","تلك","تله",
  "تلو","تمر","تمم","تنح","توت","توم","تيس","ثأر","ثاب","ثار","ثان","ثبت","ثبط","ثرم","ثرى",
  "ثقب","ثقة","ثقل","ثلة","ثلث","ثلج","ثلم","ثمر","ثمن","ثنى","ثني","ثوب","ثور","ثول","ثوم",
  "ثوى","ثيب","جاء","جاب","جاح","جاد","جار","جاز","جاس","جاش","جاض","جاع","جاف","جال","جان",
  "جبأ","جبر","جبس","جبل","جبن","جبه","جبى","جثا","جثة","جحا","جحد","جحر","جحش","جحم","جحه",
  "جحى","جدة","جدد","جدف","جدل","جدى","جذب","جذر","جرب","جرة","جرح","جرد","جرس","جرف","جرم",
  "جرى","جزأ","جزر","جزع","جزل","جزم","جزى","جسد","جسر","جسم","جشع","جعة","جعر","جعل","جفا",
  "جفف","جفل","جفن","جفى","جلب","جلد","جلس","جلط","جلف","جلل","جله","جلى","جلي","جمة","جمح",
  "جمد","جمر","جمس","جمع","جمل","جنا","جنب","جنة","جنح","جند","جنز","جنس","جنف","جنى","جهد",
  "جهر","جهش","جهض","جهل","جوب","جود","جوز","جوف","جول","جيب","جيد","جير","جيش","جيل","جين",
  "حاب","حاج","حاد","حاذ","حار","حاز","حاس","حاص","حاط","حاف","حاق","حاك","حال","حام","حان",
  "حبب","حبر","حبس","حبق","حبك","حبل","حتم","حتى","حثا","حثه","حجا","حجب","حجر","حجل","حجم",
  "حدا","حدب","حدث","حدج","حدد","حدس","حدق","حدي","حذر","حذف","حذق","حذو","حرب","حرج","حرر",
  "حرس","حرش","حرص","حرض","حرف","حرق","حرك","حرم","حرن","حري","حزب","حزة","حزر","حزم","حزن",
  "حسب","حسر","حسم","حسن","حسى","حسي","حشا","حشد","حشر","حشم","حشو","حشى","حشي","حصد","حصر",
  "حصص","حصل","حصم","حصن","حصى","حضر","حضن","حضى","حطب","حطت","حطط","حطم","حظر","حفر","حفص",
  "حفظ","حفل","حقد","حقر","حقق","حقل","حكر","حكم","حكى","حلا","حلب","حلة","حلف","حلق","حلل",
  "حلم","حلى","حما","حمد","حمر","حمس","حمص","حمط","حمق","حمل","حمم","حمو","حمى","حمي","حنا",
  "حنث","حنط","حنى","حوت","حور","حوش","حوص","حوض","حوق","حول","حوم","حوى","حية","حيث","حيد",
  "حيص","حيض","حيف","خاء","خاب","خار","خاس","خاص","خاض","خاط","خاف","خال","خام","خان","خبأ",
  "خبث","خبر","خبز","خبص","خبط","خبل","خبى","ختم","خثر","خجل","خدج","خدر","خدش","خدع","خدم",
  "خرب","خرج","خرز","خرس","خرط","خرف","خرق","خرم","خرى","خزا","خزف","خزي","خسأ","خسر","خشب",
  "خشع","خشم","خشن","خشي","خصب","خصر","خصص","خصف","خصل","خصم","خصى","خصي","خضب","خضع","خضف",
  "خضم","خطا","خطب","خطة","خطر","خطط","خطف","خطل","خطم","خطو","خطي","خفا","خفت","خفر","خفس",
  "خفض","خفق","خفه","خفى","خفي","خلا","خلب","خلة","خلد","خلس","خلص","خلط","خلع","خلف","خلق",
  "خلل","خلى","خلي","خمر","خمس","خمط","خنس","خنق","خور","خوش","خوض","خوف","خوى","خوي","خيب",
  "خير","خيط","خيل","خيم","دأب","دأل","داء","داخ","دار","داس","داع","دام","دان","دبج","دبر",
  "دبل","دبي","دثر","دجل","دحا","دحس","دحض","دحل","دحم","دحه","دخر","دخل","دخن","درب","درة",
  "درج","درس","درع","درك","دره","درى","دسر","دسم","دعا","دعث","دعر","دعه","دعى","دغر","دغل",
  "دغم","دفة","دفر","دفع","دفق","دفن","دفى","دقق","دقل","دقن","دقه","دكه","دلج","دلس","دلع",
  "دلك","دلل","دله","دلى","دمت","دمج","دمر","دمس","دمع","دمك","دمن","دمي","دنا","دنس","دنق",
  "دنى","دني","دهر","دهس","دهش","دهف","دهك","دهل","دهم","دهن","دهو","دوح","دور","دوس","دول",
  "دوم","دون","دوي","دية","دير","ديك","ديم","ذأل","ذئب","ذاب","ذات","ذاع","ذاق","ذاك","ذال",
  "ذبب","ذبة","ذبح","ذبل","ذخر","ذرا","ذرب","ذرة","ذرف","ذرق","ذقن","ذكر","ذكى","ذلل","ذمة",
  "ذنب","ذهب","ذهل","ذهن","ذود","ذول","ذوى","ذيل","رآه","رأس","رأف","رأى","رئة","راء","راب",
  "راح","راس","راع","راق","رام","ربا","ربة","ربح","ربض","ربط","ربع","ربك","ربي","رتب","رثم",
  "رجب","رجح","رجد","رجع","رجل","رجم","رجن","رجى","رحب","رحت","رحل","رحم","رحى","رخص","رخو",
  "ردت","ردح","ردد","ردع","ردم","رده","ردى","رذل","رزق","رزم","رسب","رسم","رسن","رسي","رشا",
  "رشح","رشد","رشف","رشق","رصد","رضع","رضم","رضه","رضي","رطب","رطل","رعب","رعد","رعى","رعي",
  "رغب","رغد","رغم","رغى","رفا","رفث","رفد","رفض","رفع","رفق","رقا","رقب","رقة","رقد","رقص",
  "رقط","رقع","رقق","رقم","رقي","ركب","ركد","ركز","ركض","ركع","ركل","ركن","رمة","رمث","رمح",
  "رمز","رمش","رمع","رمق","رمل","رمى","رنا","رنة","رها","رهب","رهط","رهف","رهن","روب","روث",
  "روح","روز","روش","روض","روع","روق","رول","روم","روى","روي","ريا","ريب","ريح","ريس","ريش",
  "ريع","ريق","زاح","زاد","زار","زاغ","زال","زبد","زبر","زبل","زجر","زحف","زحل","زحم","زرع",
  "زرق","زرم","زرى","زعج","زعط","زعق","زعل","زعم","زغب","زغل","زفت","زقم","زكا","زكم","زكي",
  "زلف","زلق","زلل","زلم","زمل","زمن","زمه","زنا","زند","زهد","زهر","زهق","زهم","زهى","زوج",
  "زور","زوى","زيت","زيد","زيغ","زيل","زين","سأل","سئد","ساء","ساب","ساح","ساد","سار","ساس",
  "ساط","ساق","سال","سام","سبأ","سبب","سبت","سبح","سبر","سبط","سبع","سبق","سبك","سبل","سبه",
  "سبى","سبي","ستر","سجا","سجد","سجر","سجع","سجل","سجى","سحا","سحب","سحر","سحق","سحم","سحن",
  "سخا","سخر","سخل","سخن","سخى","سدا","سدر","سدس","سدل","سدى","سرا","سرب","سرح","سرع","سرق",
  "سرك","سره","سرو","سرى","سري","سطا","سطح","سطر","سطع","سطل","سعد","سعر","سعف","سعل","سعى",
  "سفح","سفر","سفط","سفل","سفن","سفه","سقا","سقر","سقط","سقف","سقم","سقى","سقي","سكب","سكة",
  "سكت","سكر","سكن","سلب","سلس","سلط","سلع","سلف","سلق","سلك","سلم","سلى","سلي","سمة","سمت",
  "سمح","سمر","سمع","سمك","سمل","سمم","سمن","سمى","سمي","سنة","سنح","سند","سنع","سنه","سنى",
  "سهج","سهر","سهل","سهم","سهو","سهى","سوء","سوا","سود","سور","سوس","سوط","سوق","سول","سوى",
  "سوي","سيح","سيف","سيل","شأن","شاب","شاة","شاح","شاخ","شاد","شاذ","شار","شاع","شاف","شاق",
  "شال","شام","شاي","شبب","شبة","شبت","شبح","شبر","شبع","شبك","شبل","شبه","شتت","شتل","شتم",
  "شتى","شجر","شجع","شجن","شجي","شحب","شحد","شحط","شحم","شحن","شخص","شدة","شدد","شرب","شرج",
  "شرح","شرد","شرر","شرس","شرط","شرع","شرف","شرق","شرم","شره","شرى","شطب","شطح","شطر","شطط",
  "شطف","شعا","شعب","شعر","شعف","شعل","شغب","شغر","شغف","شغل","شفت","شفر","شفع","شفق","شفي",
  "شقة","شقح","شقى","شقي","شكس","شكل","شكم","شكى","شلح","شمة","شمر","شمس","شمع","شمل","شنط",
  "شنق","شهب","شهد","شهر","شهق","شهم","شور","شوط","شوك","شول","شوه","شوى","شيب","شيخ","شيز",
  "شيع","شيف","شيك","شيم","صاب","صاح","صاد","صار","صاع","صاف","صال","صام","صان","صبا","صبب",
  "صبح","صبر","صبغ","صبى","صبي","صحا","صحب","صحة","صحح","صحر","صحف","صحن","صحو","صخر","صدح",
  "صدد","صدر","صدع","صدف","صدق","صدم","صدى","صدي","صرح","صرخ","صرع","صرف","صرم","صعب","صعد",
  "صعق","صعى","صغر","صفا","صفة","صفح","صفر","صفع","صفق","صفو","صفي","صقر","صكة","صلب","صلت",
  "صلح","صلى","صمت","صمد","صمع","صنع","صنف","صنم","صهب","صهر","صهل","صوب","صوت","صور","صوغ",
  "صوف","صول","صوى","صيد","صيف","ضآل","ضاء","ضاح","ضار","ضاع","ضاف","ضاق","ضان","ضبأ","ضبا",
  "ضبح","ضبط","ضبع","ضجر","ضجع","ضحك","ضحل","ضحم","ضحى","ضده","ضدي","ضرا","ضرب","ضرس","ضرع",
  "ضره","ضري","ضعف","ضغط","ضغن","ضفت","ضفر","ضكه","ضلع","ضمد","ضمر","ضمن","ضوى","ضيف","ضيق",
  "طاب","طاح","طار","طاس","طاش","طاع","طاف","طال","طبح","طبخ","طبع","طبق","طبل","طبي","طحن",
  "طرأ","طرب","طرح","طرد","طرز","طرش","طرف","طرق","طعن","طغى","طفح","طفر","طفل","طفى","طلب",
  "طلة","طلح","طلع","طلق","طلى","طمح","طمر","طمس","طمع","طمي","طنز","طنى","طهر","طهو","طهى",
  "طور","طوع","طوف","طوق","طول","طوى","طوي","طيب","طير","طيف","طين","ظبي","ظرف","ظعن","ظفر",
  "ظلع","ظلل","ظلم","ظمأ","ظني","ظهر","عاء","عاب","عاد","عار","عاز","عاش","عاف","عال","عام",
  "عان","عبا","عبث","عبد","عبر","عبس","عبط","عبق","عبل","عتب","عتد","عتق","عتم","عثر","عجب",
  "عجز","عجل","عجم","عجن","عدا","عدة","عدد","عدس","عدل","عدم","عدن","عدو","عدى","عدي","عذر",
  "عرب","عرس","عرش","عرض","عرف","عرق","عرم","عرى","عري","عزا","عزب","عزة","عزز","عزف","عزل",
  "عزم","عسر","عسف","عسل","عسم","عسى","عشر","عشق","عشم","عشي","عصا","عصب","عصر","عصي","عضة",
  "عضد","عضل","عطا","عطب","عطر","عطس","عطش","عطف","عطل","عطن","عطه","عطى","عظم","عفت","عفج",
  "عفر","عفس","عفش","عفى","عقب","عقد","عقر","عقف","عقل","عقم","عكس","عكف","علا","علب","علف",
  "علق","علك","علل","علم","علن","على","علي","عمة","عمت","عمد","عمر","عمس","عمق","عمل","عمم",
  "عمن","عمى","عمي","عنا","عنب","عنت","عند","عنز","عنف","عنق","عنك","عنى","عني","عهد","عهر",
  "عهن","عوج","عود","عوز","عوض","عوق","عوم","عون","عوى","عيا","عيب","عيط","عيل","عين","غاب",
  "غار","غاص","غاض","غاط","غال","غاو","غبر","غبش","غبط","غدا","غذى","غرا","غرب","غرد","غرر",
  "غرس","غرف","غرق","غرم","غرى","غزو","غسل","غشم","غشي","غصب","غصة","غصن","غضب","غطا","غطس",
  "غفر","غفل","غفى","غلا","غلب","غلة","غلت","غلس","غلط","غلف","غلق","غلي","غمد","غمر","غمط",
  "غمم","غمى","غنت","غنم","غنى","غوث","غور","غوص","غول","غوى","غيب","غير","غيض","غيل","غيم",
  "غين","فأر","فأس","فأق","فاء","فات","فاح","فاد","فاق","فان","فتت","فتح","فتر","فتش","فتق",
  "فتك","فتل","فتن","فته","فتى","فجر","فجس","فجل","فحل","فحم","فخم","فدى","فرأ","فرث","فرج",
  "فرح","فرد","فرز","فرس","فرش","فرض","فرط","فرع","فرق","فرك","فرم","فرن","فره","فرى","فسح",
  "فسخ","فسد","فسر","فسق","فشا","فشق","فشل","فصح","فصل","فضا","فضح","فضخ","فضل","فضى","فطر",
  "فطس","فطم","فطن","فعل","فقأ","فقد","فقر","فقس","فقش","فقص","فقط","فقع","فقف","فقم","فقه",
  "فقى","فكر","فكك","فكن","فكه","فلا","فلت","فلج","فلح","فلس","فلق","فلك","فلل","فند","فنع",
  "فني","فها","فهد","فهق","فهل","فهم","فهي","فوت","فور","فوق","فول","فوم","فيض","فيل","فيه",
  "قاء","قات","قاد","قار","قاس","قاض","قاع","قاف","قال","قام","قبح","قبر","قبض","قبع","قبل",
  "قبو","قتل","قحط","قحم","قدا","قدح","قدر","قدس","قدع","قدم","قده","قذف","قذل","قرأ","قرا",
  "قرب","قرة","قرح","قرد","قرر","قرس","قرش","قرص","قرض","قرع","قرف","قرم","قرن","قسط","قسم",
  "قسى","قسي","قشة","قشر","قشط","قصب","قصة","قصد","قصر","قصص","قصف","قصم","قصي","قضم","قضى",
  "قطا","قطب","قطة","قطر","قطط","قطع","قطف","قطن","قعد","قعر","قعس","قعط","قفا","قفح","قفر",
  "قفز","قفش","قفص","قفل","قفى","قلب","قلت","قلد","قلص","قلع","قلق","قلم","قلي","قمة","قمت",
  "قمح","قمر","قمط","قمع","قمل","قمم","قنا","قنت","قند","قنط","قنع","قنى","قوة","قوس","قوم",
  "قوى","قوي","قيء","قيد","قيس","قيض","قيظ","قيم","كأد","كأن","كاب","كاح","كاد","كار","كاز",
  "كاس","كاش","كاف","كال","كان","كبد","كبر","كبس","كبش","كبل","كتب","كتف","كتم","كثب","كثر",
  "كحل","كدح","كدر","كدس","كدش","كذب","كرب","كرة","كرز","كرس","كرش","كرف","كرم","كره","كسب",
  "كسح","كسد","كسر","كسع","كسف","كسى","كشت","كشد","كشر","كشف","كظم","كعب","كفت","كفر","كفف",
  "كفل","كفن","كفي","كلا","كلب","كلف","كلل","كلم","كلى","كما","كمل","كمن","كنب","كنة","كنت",
  "كنز","كنس","كنف","كنى","كهن","كوب","كوت","كوخ","كود","كور","كوع","كوم","كون","كوى","كيد",
  "كيس","كيف","كيل","لآت","لئن","لاح","لاذ","لاز","لاق","لام","لان","لبث","لبد","لبس","لبن",
  "لبى","لثم","لجأ","لحد","لحس","لحق","لحم","لحن","لحي","لخص","لدة","لدد","لدن","لدى","لدي",
  "لذع","لزج","لزق","لزم","لزه","لسب","لسع","لسق","لصق","لطخ","لطع","لطف","لعب","لعق","لعل",
  "لعن","لغة","لغز","لغط","لغم","لغو","لغى","لغي","لفأ","لفة","لفت","لفح","لفظ","لفي","لقح",
  "لقط","لقم","لقي","لكة","لكم","لكن","لكي","لما","لمة","لمح","لمز","لمس","لمع","لمم","لمن",
  "لمى","لها","لهب","لهث","لهج","لهس","لهف","لهم","لهي","لوح","لوم","لون","لوى","ليت","ليس",
  "ليل","ليم","لين","ماء","مات","ماج","مار","ماش","ماع","مال","متع","متن","متى","مثل","مجد",
  "مجر","محش","محص","محض","محط","محق","محك","محل","محى","محي","مخض","مخط","مخل","مخي","مدح",
  "مدد","مدر","مدع","مدق","مدن","مده","مدى","مرأ","مرة","مرت","مرج","مرح","مرخ","مرد","مرر",
  "مرس","مرض","مرق","مرن","مرو","مزح","مسح","مسد","مسك","مسل","مسن","مسى","مسي","مشت","مشط",
  "مشق","مشى","مصب","مصح","مصد","مصر","مصغ","مضة","مضر","مضض","مضغ","مضل","مضى","مضي","مطر",
  "مطل","مظل","معا","معد","معز","معض","معك","معن","معي","مغم","مقت","مقر","مقص","مكت","مكر",
  "مكس","مكن","ملء","ملأ","ملح","ملس","ملط","ملك","ملل","ملى","ملي","ممر","منا","منح","منع",
  "منك","منن","منه","منى","مني","مهد","مهر","مهل","مهن","موت","موز","موس","موه","مية","ميت",
  "ميز","ميس","ميل","مين","ناب","ناح","ناد","نار","ناس","ناش","ناع","نال","نام","ناي","نبأ",
  "نبت","نبذ","نبس","نبض","نبط","نبع","نبل","نبي","نتج","نتع","نتف","نتق","نتل","نتن","نثر",
  "نجا","نجد","نجر","نجس","نجش","نجف","نجل","نجم","نجى","نحا","نحب","نحت","نحج","نحر","نحس",
  "نحش","نحف","نحل","نحن","نخب","نخر","نخز","نخس","نخط","نخل","ندا","ندب","ندة","ندر","ندع",
  "ندف","ندم","ندى","نذر","نزح","نزر","نزع","نزف","نزل","نسأ","نسب","نسر","نسف","نسق","نسل",
  "نسم","نسى","نسي","نشا","نشح","نشد","نشر","نشط","نشع","نشف","نشق","نشل","نشى","نصب","نصت",
  "نصح","نصر","نصف","نصل","نضب","نضح","نضد","نضر","نضل","نضى","نطئ","نطا","نطب","نطر","نطع",
  "نطق","نطل","نظر","نظف","نظم","نعا","نعت","نعر","نعس","نعش","نعق","نعل","نعم","نعى","نغر",
  "نغش","نغل","نفث","نفح","نفخ","نفد","نفذ","نفر","نفس","نفش","نفص","نفض","نفق","نفل","نفي",
  "نقا","نقب","نقد","نقر","نقص","نقض","نقط","نقع","نقف","نقل","نقم","نقى","نقي","نكب","نكت",
  "نكث","نكد","نكر","نكس","نكف","نما","نمر","نمض","نمل","نمى","نها","نهب","نهت","نهج","نهر",
  "نهز","نهس","نهش","نهض","نهق","نهم","نهى","نهي","نوخ","نور","نوض","نوع","نوف","نوم","نون",
  "نوه","نوى","نيح","هاء","هاب","هات","هاج","هاز","هاض","هان","هاه","هبط","هتف","هتك","هجأ",
  "هجا","هجت","هجد","هجر","هجس","هجل","هجم","هجو","هجى","هدأ","هدب","هدر","هدف","هدم","هدى",
  "هدي","هرأ","هرب","هرج","هرس","هرع","هرم","هري","هزئ","هزا","هزج","هزر","هزم","هشم","هضب",
  "هضم","هطف","هطل","هقا","هقى","هكر","هلا","هلس","هلع","هلك","هلل","هلم","همة","همز","همس",
  "همش","هنأ","هنا","هند","هنع","هني","هود","هوز","هوس","هول","هون","هوى","هوي","هيأ","هيئ",
  "هيا","هيض","هيل","وأد","واد","وبا","وبر","وبل","وتد","وتر","وتم","وتن","وثب","وثن","وجأ",
  "وجب","وجد","وجر","وجز","وجس","وجع","وجف","وجل","وجن","وجه","وحد","وحش","وحل","وحم","وحن",
  "وحى","وحي","ودر","ودع","ودق","ودل","ودن","ودى","ورث","ورد","ورش","ورط","ورع","ورق","ورك",
  "ورم","وره","ورى","وزر","وزع","وزف","وزم","وزن","وسب","وسد","وسط","وسع","وسق","وسم","وسن",
  "وشج","وشح","وشر","وشع","وشق","وشك","وشل","وشم","وشى","وشي","وصد","وصف","وصل","وصي","وضح",
  "وضع","وطد","وطن","وطى","وعد","وعر","وعف","وعق","وعل","وعى","وعي","وغر","وفر","وفق","وفى",
  "وفي","وقت","وقح","وقد","وقر","وقص","وقع","وقف","وقل","وقم","وقى","وكد","وكر","وكف","وكل",
  "وكم","وكن","ولج","ولد","ولع","ولف","ولك","ولم","وله","ومر","ومس","ومض","وهب","وهق","وهل",
  "وهم","وهن","وهي","ويب","ويح","ويس","ويل","يأس","يأي","يؤد","يبر","يبس","يبط","يتب","يتم",
  "يثب","يجب","يجد","يجز","يجس","يجف","يجن","يحد","يحر","يحط","يحف","يحن","يدا","يدع","يدف",
  "يدي","يرب","يرد","يرش","يرع","يرق","يرم","يرى","يزف","يزم","يزن","يسر","يسع","يسل","يشب",
  "يشق","يشل","يشم","يصب","يصد","يصف","يصل","يضع","يضي","يطب","يطن","يعش","يغل","يفع","يقع",
  "يكب","يكد","يكر","يكف","يكل","يلج","يلف","يلي","يمض","يمن","يهس","يهف","يهل","يهم","يهن",
  "يود","يوم"
];
// Letter-equivalence rules (per the reviewed word bank):
//  - أ/إ/آ are all treated as ا
//  - ئ/ء are all treated as ى
//  - ة is treated as ه
//  - a word ending in ا or ى accepts EITHER of those two letters at that position
function normalizeArabic(s) {
  return s.replace(/[أإآ]/g, 'ا').replace(/[ئء]/g, 'ى').replace(/ة/g, 'ه');
}
function expandFinalAlifYa(set, word) {
  set.add(word);
  if (word.endsWith('ا')) set.add(word.slice(0, -1) + 'ى');
  else if (word.endsWith('ى')) set.add(word.slice(0, -1) + 'ا');
}
const DICTIONARY = new Set();
WORDS.forEach((w) => expandFinalAlifYa(DICTIONARY, normalizeArabic(w)));
function isValidWord(word) { return DICTIONARY.has(normalizeArabic(word)); }

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// أ/إ/آ/ئ/ء/ة are no longer separate drawable tiles - ا, ى, and ه cover
// their role via the equivalence rules above, which keeps the tile set
// simpler for players.
const ARABIC_LETTERS = "ابتثجحخدذرزسشصضطظعغفقكلمنهويى".split('');
const STAR = '★';
function letterWeight(ch) {
  return "لمنرستبكجحدشقفعطهويا".includes(ch) ? 30 : 10;
}
function buildBag() {
  return buildBagExcluding([]);
}
// Same as buildBag, but skips any letters the host has excluded for this
// session (minimum 3 letters must always remain, enforced in the UI).
function buildBagExcluding(excluded) {
  let bag = [];
  ARABIC_LETTERS.forEach((ch) => {
    if (excluded.includes(ch)) return;
    for (let i = 0; i < letterWeight(ch); i++) bag.push(ch);
  });
  return shuffle(bag);
}

// Draws one letter from `bag` (mutating it) that ISN'T already in `hand`,
// unless every distinct letter left in the bag is already in the hand -
// in that case a duplicate is unavoidable and allowed.
function drawUniqueLetter(bag, hand) {
  if (bag.length === 0) return null;
  let idx = bag.findIndex((l) => !hand.includes(l));
  if (idx === -1) idx = 0;
  const letter = bag[idx];
  bag.splice(idx, 1);
  return letter;
}

function drawHand(bag, count) {
  const hand = [];
  for (let i = 0; i < count; i++) {
    const l = drawUniqueLetter(bag, hand);
    if (l === null) break;
    hand.push(l);
  }
  return hand;
}

// A random number of wildcard "star" cards get mixed into a freshly dealt
// hand. A star can stand in for any letter - the player picks which one
// when they play it.
function dealHandWithStars(bag, count) {
  const numStars = Math.min(count, Math.floor(Math.random() * 3)); // 0, 1, or 2
  const hand = drawHand(bag, count - numStars);
  for (let i = 0; i < numStars; i++) hand.push(STAR);
  return shuffle(hand);
}

const MIN_TIME = 10, MAX_TIME = 300, MIN_CARDS = 3, MAX_CARDS = 26;
const PREP_SECONDS = 5; // "get ready" window before the first turn's clock starts
const MIN_ROUNDS = { easy: 30, medium: 20, hard: 12 };
const DIFFICULTY_LABELS = { easy: 'سهل', medium: 'متوسط', hard: 'صعب' };
// Simple client-side gate for the suggestions review screen. This is NOT real
// authentication (there's no backend/login here) - just a basic deterrent so
// casual players don't stumble into it. Change this to whatever you like.
const REVIEW_PIN = '1234';
const ARABIC_WORD_RE = /^[ابتثجحخدذرزسشصضطظعغفقكلمنهويأإآءئؤةى]{3}$/;
function formatTime(sec) {
  sec = Math.max(0, sec);
  if (sec < 60) return `${sec} ثانية`;
  const m = Math.floor(sec / 60), s = sec % 60;
  return s === 0 ? `${m}:00 دقيقة` : `${m}:${String(s).padStart(2, '0')} دقيقة`;
}

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function makeCode() {
  let c = '';
  for (let i = 0; i < 5; i++) c += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  return c;
}
function makeId() { return Math.random().toString(36).slice(2, 10); }
function getOrCreateDeviceId() {
  try {
    let id = window.localStorage.getItem('faseeh_device_id');
    if (!id) {
      id = makeId();
      window.localStorage.setItem('faseeh_device_id', id);
    }
    return id;
  } catch (e) {
    return makeId();
  }
}

const woodBgStyle = {
  backgroundColor: '#2b1810',
  backgroundImage:
    'repeating-linear-gradient(100deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 9px),' +
    'repeating-linear-gradient(100deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 2px, transparent 2px, transparent 40px),' +
    'linear-gradient(160deg, #5a3a20 0%, #3b2414 55%, #1f130a 100%)',
};
const woodPanelStyle = {
  backgroundImage:
    'repeating-linear-gradient(95deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 7px),' +
    'linear-gradient(160deg, #7a4d2c 0%, #5c3a20 100%)',
  boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.18), inset 0 -6px 10px rgba(0,0,0,0.45), 0 10px 22px rgba(0,0,0,0.5)',
};
const woodPanelDarkStyle = {
  backgroundImage:
    'repeating-linear-gradient(95deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 7px),' +
    'linear-gradient(160deg, #5c3a20 0%, #3b2414 100%)',
  boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.12), inset 0 -5px 9px rgba(0,0,0,0.5), 0 6px 14px rgba(0,0,0,0.45)',
};

// Responsive helpers: 100dvh avoids the mobile-Safari 100vh/URL-bar jump, and
// env(safe-area-inset-*) keeps content clear of iPhone notches/home indicators
// and Android gesture bars. The max()s guard the base padding on devices/browsers
// that don't report a safe-area inset (older Android, desktop Windows/macOS).
const safeAreaCentered = {
  minHeight: '100dvh',
  paddingTop: 'max(1.5rem, env(safe-area-inset-top))',
  paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
  paddingLeft: 'max(1.5rem, env(safe-area-inset-left))',
  paddingRight: 'max(1.5rem, env(safe-area-inset-right))',
};
const safeAreaPlay = {
  minHeight: '100dvh',
  paddingTop: 'max(1rem, env(safe-area-inset-top))',
  paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
  paddingLeft: 'max(1rem, env(safe-area-inset-left))',
  paddingRight: 'max(1rem, env(safe-area-inset-right))',
};

const AVATARS = ['🦁','🐫','🦅','🐪','🕌','⚔️','🏆','🌙'];

function SettingsPanel({ turnSeconds, setTurnSeconds, startCards, setStartCards }) {
  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-amber-50 font-bold text-sm flex items-center gap-1.5"><Clock size={16} /> وقت كل دور</span>
          <span className="text-emerald-300 font-bold text-sm">{formatTime(turnSeconds)}</span>
        </div>
        <input type="range" min={MIN_TIME} max={MAX_TIME} step={5} value={turnSeconds}
          onChange={(e) => setTurnSeconds(Number(e.target.value))} className="w-full accent-emerald-500" />
        <div className="flex justify-between text-amber-200/60 text-xs mt-1"><span>١٠ ثوانٍ</span><span>٥ دقائق</span></div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-amber-50 font-bold text-sm flex items-center gap-1.5"><Layers size={16} /> عدد الكروت لكل لاعب</span>
          <span className="text-emerald-300 font-bold text-sm">{startCards} كرت</span>
        </div>
        <input type="range" min={MIN_CARDS} max={MAX_CARDS} step={1} value={startCards}
          onChange={(e) => setStartCards(Number(e.target.value))} className="w-full accent-emerald-500" />
        <div className="flex justify-between text-amber-200/60 text-xs mt-1"><span>{MIN_CARDS} كروت</span><span>{MAX_CARDS} كرت</span></div>
      </div>
    </>
  );
}

function BackButton({ onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 text-amber-200/70 hover:text-amber-100 text-sm font-bold mb-4 transition-colors">
      <ArrowRight size={16} /> رجوع للقائمة
    </button>
  );
}

function LetterExcludePicker({ excluded, onToggle }) {
  const remaining = ARABIC_LETTERS.length - excluded.length;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-amber-50 font-bold text-sm flex items-center gap-1.5"><Ban size={16} /> استبعاد حروف من البنك</span>
        <span className="text-emerald-300 font-bold text-xs">{remaining} من {ARABIC_LETTERS.length} متاحة</span>
      </div>
      <div className="flex flex-wrap gap-1.5 justify-center">
        {ARABIC_LETTERS.map((l) => {
          const isExcluded = excluded.includes(l);
          const blocked = !isExcluded && remaining <= 3;
          return (
            <button
              key={l}
              disabled={blocked}
              onClick={() => onToggle(l)}
              className={`w-9 h-9 rounded-lg font-black text-sm border-2 transition-all ${
                isExcluded
                  ? 'bg-rose-950/50 border-rose-800 text-rose-400 line-through'
                  : 'bg-amber-50 border-amber-800 text-stone-900'
              } ${blocked ? 'opacity-30 cursor-not-allowed' : 'hover:border-emerald-500'}`}
            >
              {l}
            </button>
          );
        })}
      </div>
      {remaining <= 3 && (
        <p className="text-amber-200/50 text-xs text-center mt-2">وصلت للحد الأدنى — لازم يبقى ٣ حروف على الأقل</p>
      )}
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const cairo = { fontFamily: "'Cairo', sans-serif" };
  const myIdRef = useRef(getOrCreateDeviceId());
  const knownDealIdRef = useRef(null);
  const knownCurrentPlayerIdRef = useRef(null);
  const knownPendingIdRef = useRef(null);
  const knownPausedRef = useRef(false);

  const [screen, setScreen] = useState('menu');
  const [pendingDestination, setPendingDestination] = useState(null);
  const [nameGateInput, setNameGateInput] = useState('');
  const [nameGateError, setNameGateError] = useState('');
  const [mode, setMode] = useState(null); // 'bot' | 'online'
  const [turnSeconds, setTurnSeconds] = useState(10);
  const [startCards, setStartCards] = useState(10);
  const [communityMode, setCommunityMode] = useState(false);
  const [objectionSeconds, setObjectionSeconds] = useState(5);
  const [maxPlayers, setMaxPlayers] = useState(2);
  const [waitingPlayers, setWaitingPlayers] = useState([]);
  const [excludedLetters, setExcludedLetters] = useState([]);
  const [showLetterPanel, setShowLetterPanel] = useState(false);
  const [botDifficulty, setBotDifficulty] = useState('medium');
  const [roundNumber, setRoundNumber] = useState(1);
  const [minRoundsConfig, setMinRoundsConfig] = useState(MIN_ROUNDS);
  const [minRoundsDraft, setMinRoundsDraft] = useState(MIN_ROUNDS);
  const [minRoundsSaved, setMinRoundsSaved] = useState(false);

  const [profile, setProfile] = useState({ name: '', avatar: '🦁', gamesPlayed: 0, wins: 0 });
  const [profileDraft, setProfileDraft] = useState(profile);
  const [profileSaved, setProfileSaved] = useState(false);

  const [suggestionInput, setSuggestionInput] = useState('');
  const [suggestionMsg, setSuggestionMsg] = useState('');
  const [suggestionMsgType, setSuggestionMsgType] = useState('info');
  const [approvedWords, setApprovedWords] = useState([]);
  const [pendingSuggestions, setPendingSuggestions] = useState([]);
  const [reviewUnlocked, setReviewUnlocked] = useState(false);
  const [reviewPinInput, setReviewPinInput] = useState('');
  const [reviewPinError, setReviewPinError] = useState('');
  const [supportBotOpen, setSupportBotOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactMessageInput, setContactMessageInput] = useState('');
  const [contactFeedback, setContactFeedback] = useState(null);
  const [contactMessages, setContactMessages] = useState([]);

  const dynamicWordsRef = useRef(new Set());
  useEffect(() => {
    const set = new Set();
    approvedWords.forEach((w) => expandFinalAlifYa(set, normalizeArabic(w)));
    dynamicWordsRef.current = set;
  }, [approvedWords]);
  function checkWord(word) {
    const norm = normalizeArabic(word);
    return DICTIONARY.has(norm) || dynamicWordsRef.current.has(norm);
  }

  const [sessionCode, setSessionCode] = useState('');
  const [amHost, setAmHost] = useState(false);
  const [searchMsg, setSearchMsg] = useState('جاري البحث عن لاعب...');
  const [copyOk, setCopyOk] = useState(false);
  const [joinInput, setJoinInput] = useState('');
  const [joinError, setJoinError] = useState('');

  // core game state
  const [players, setPlayers] = useState([]); // [{id,name,hand}, {id,name,hand}]
  const [myIndex, setMyIndex] = useState(0);
  const [bag, setBag] = useState([]);
  const [tableWord, setTableWord] = useState([]);
  const [tableStarFlags, setTableStarFlags] = useState([]);
  const [starPicker, setStarPicker] = useState(null); // { pos } while choosing a letter for a star card
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedHand, setSelectedHand] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [winnerIdx, setWinnerIdx] = useState(null);
  const [flipPos, setFlipPos] = useState(null);
  const [turnEndsAt, setTurnEndsAt] = useState(0);
  const [gameStartsAt, setGameStartsAt] = useState(0);
  const [prepTimeLeft, setPrepTimeLeft] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [pendingMove, setPendingMove] = useState(null); // { moverIndex, pos, letter, isStar, candidateWord, deadline, disputed, id }
  const [paused, setPaused] = useState(false);
  const [objectionTimeLeft, setObjectionTimeLeft] = useState(0);

  const statedRef = useRef(false); // guards double stat-writes on finish
  const playersRef = useRef(players); playersRef.current = players;
  const bagRef = useRef(bag); bagRef.current = bag;
  const tableWordRef = useRef(tableWord); tableWordRef.current = tableWord;
  const currentIdxRef = useRef(currentIdx); currentIdxRef.current = currentIdx;
  const modeRef = useRef(mode); modeRef.current = mode;
  const myIndexRef = useRef(myIndex); myIndexRef.current = myIndex;
  const sessionCodeRef = useRef(sessionCode); sessionCodeRef.current = sessionCode;
  const amHostRef = useRef(amHost); amHostRef.current = amHost;
  const communityModeRef = useRef(communityMode); communityModeRef.current = communityMode;
  const profileRef = useRef(profile); profileRef.current = profile;
  const maxPlayersRef = useRef(maxPlayers); maxPlayersRef.current = maxPlayers;
  const excludedLettersRef = useRef(excludedLetters); excludedLettersRef.current = excludedLetters;
  const objectionSecondsRef = useRef(objectionSeconds); objectionSecondsRef.current = objectionSeconds;
  const turnSecondsRef = useRef(turnSeconds); turnSecondsRef.current = turnSeconds;
  const pendingMoveRef = useRef(pendingMove); pendingMoveRef.current = pendingMove;
  const botDifficultyRef = useRef(botDifficulty); botDifficultyRef.current = botDifficulty;
  const roundNumberRef = useRef(roundNumber); roundNumberRef.current = roundNumber;
  const minRoundsConfigRef = useRef(minRoundsConfig); minRoundsConfigRef.current = minRoundsConfig;

  // ---- profile load ----
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get('profile', false);
        if (r && r.value) {
          const p = JSON.parse(r.value);
          setProfile(p);
          setProfileDraft(p);
        }
      } catch (e) { /* no profile yet */ }
    })();
    loadApprovedWords();
    loadMinRoundsConfig();

    // Reconnect after an accidental refresh mid-session, if we were in one.
    (async () => {
      try {
        const savedCode = window.localStorage.getItem('faseeh_current_session');
        if (!savedCode) return;
        const session = await readSession(savedCode);
        if (!session || !session.players.some((p) => p.id === myIdRef.current)) {
          window.localStorage.removeItem('faseeh_current_session');
          return;
        }
        setSessionCode(savedCode);
        setAmHost(session.players[0].id === myIdRef.current);
        setMode('online');
        if (session.status === 'waiting') {
          setWaitingPlayers(session.players);
          setMaxPlayers(session.maxPlayers || 2);
          setSearchMsg(session.players[0].id === myIdRef.current ? 'بانتظار انضمام اللاعبين...' : 'بانتظار بدء اللاعب المضيف...');
          setScreen('session-wait');
        } else {
          applySessionToLocal(session);
        }
      } catch (e) { /* best effort */ }
    })();
  }, []);

  async function loadApprovedWords() {
    try {
      const r = await window.storage.get('approved_words', true);
      if (r && r.value) setApprovedWords(JSON.parse(r.value));
    } catch (e) { /* none yet */ }
  }

  async function loadMinRoundsConfig() {
    try {
      const r = await window.storage.get('bot_min_rounds', true);
      if (r && r.value) {
        const cfg = { ...MIN_ROUNDS, ...JSON.parse(r.value) };
        setMinRoundsConfig(cfg);
        setMinRoundsDraft(cfg);
      }
    } catch (e) { /* using defaults */ }
  }

  async function saveMinRoundsConfig() {
    const cleaned = {
      easy: Math.max(1, Number(minRoundsDraft.easy) || MIN_ROUNDS.easy),
      medium: Math.max(1, Number(minRoundsDraft.medium) || MIN_ROUNDS.medium),
      hard: Math.max(1, Number(minRoundsDraft.hard) || MIN_ROUNDS.hard),
    };
    setMinRoundsConfig(cleaned);
    setMinRoundsDraft(cleaned);
    try {
      await window.storage.set('bot_min_rounds', JSON.stringify(cleaned), true);
      setMinRoundsSaved(true);
      setTimeout(() => setMinRoundsSaved(false), 1500);
    } catch (e) { /* best effort */ }
  }

  async function loadSuggestions() {
    try {
      const r = await window.storage.get('word_suggestions', true);
      setPendingSuggestions(r && r.value ? JSON.parse(r.value) : []);
    } catch (e) { setPendingSuggestions([]); }
  }

  async function loadContactMessages() {
    try {
      const r = await window.storage.get('contact_messages', true);
      const list = r && r.value ? JSON.parse(r.value) : [];
      setContactMessages(list.sort((a, b) => b.ts - a.ts));
    } catch (e) { setContactMessages([]); }
  }

  async function submitContactMessage() {
    const text = contactMessageInput.trim();
    if (!text) {
      setContactFeedback({ type: 'error', text: 'اكتب رسالة قبل الإرسال' });
      return;
    }
    try {
      const r = await window.storage.get('contact_messages', true).catch(() => null);
      const list = r && r.value ? JSON.parse(r.value) : [];
      const entry = {
        id: `${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        name: profileRef.current.name || 'زائر',
        message: text,
        ts: Date.now(),
      };
      await window.storage.set('contact_messages', JSON.stringify([...list, entry]), true);
      setContactMessageInput('');
      setContactFeedback({ type: 'success', text: 'تم إرسال رسالتك، شكرًا لك!' });
      setTimeout(() => { setContactModalOpen(false); setContactFeedback(null); }, 1200);
    } catch (e) {
      setContactFeedback({ type: 'error', text: 'تعذّر إرسال الرسالة، حاول مرة أخرى' });
    }
  }

  async function deleteContactMessage(id) {
    try {
      const r = await window.storage.get('contact_messages', true).catch(() => null);
      const list = r && r.value ? JSON.parse(r.value) : [];
      const updated = list.filter((m) => m.id !== id);
      await window.storage.set('contact_messages', JSON.stringify(updated), true);
      setContactMessages(updated.sort((a, b) => b.ts - a.ts));
    } catch (e) { /* best effort */ }
  }

  async function submitSuggestion() {
    const word = suggestionInput.trim();
    if (!ARABIC_WORD_RE.test(word)) {
      setSuggestionMsg('اكتب كلمة عربية من ثلاثة أحرف بالضبط');
      setSuggestionMsgType('error');
      return;
    }
    if (checkWord(word)) {
      setSuggestionMsg('هذه الكلمة موجودة أصلًا بقائمة اللعبة');
      setSuggestionMsgType('error');
      return;
    }
    try {
      const r = await window.storage.get('word_suggestions', true).catch(() => null);
      const list = r && r.value ? JSON.parse(r.value) : [];
      if (list.some((s) => s.word === word)) {
        setSuggestionMsg('هذه الكلمة مُقترحة بالفعل وبانتظار المراجعة');
        setSuggestionMsgType('error');
        return;
      }
      const entry = { id: `${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, word, by: profile.name || 'مجهول', ts: Date.now() };
      await window.storage.set('word_suggestions', JSON.stringify([...list, entry]), true);
      setSuggestionInput('');
      setSuggestionMsg('تم إرسال اقتراحك، بانتظار موافقة صاحب اللعبة');
      setSuggestionMsgType('success');
    } catch (e) {
      setSuggestionMsg('تعذّر إرسال الاقتراح، حاول مرة أخرى');
      setSuggestionMsgType('error');
    }
  }

  const AUTO_FLAG_THRESHOLD = 30;
  // Tracks how many times a word got ACCEPTED via host/community judging
  // (either by timeout with no objection, or by the host's explicit call)
  // while NOT already being in the game's dictionary. Once the same such
  // word has been accepted across enough different games, it's very likely
  // a genuine word the bank is just missing - so it's auto-submitted to the
  // owner's review queue, the same queue manual "اقترح كلمة" suggestions
  // land in, instead of relying only on someone remembering to suggest it.
  async function trackAcceptedCommunityWord(word) {
    if (checkWord(word)) return; // already in the bank - nothing to learn here
    try {
      const cr = await window.storage.get('accepted_word_counts', true).catch(() => null);
      const counts = cr && cr.value ? JSON.parse(cr.value) : {};
      const newCount = (counts[word] || 0) + 1;
      counts[word] = newCount;
      await window.storage.set('accepted_word_counts', JSON.stringify(counts), true);

      if (newCount === AUTO_FLAG_THRESHOLD) {
        const sr = await window.storage.get('word_suggestions', true).catch(() => null);
        const list = sr && sr.value ? JSON.parse(sr.value) : [];
        if (!list.some((s) => s.word === word)) {
          const entry = {
            id: `${Date.now()}_auto_${Math.random().toString(36).slice(2, 6)}`,
            word,
            by: `🤖 رصد تلقائي (قُبلت باستضافات مختلفة ${newCount} مرة)`,
            ts: Date.now(),
          };
          await window.storage.set('word_suggestions', JSON.stringify([...list, entry]), true);
        }
      }
    } catch (e) { /* best effort */ }
  }

  async function approveSuggestion(entry) {
    try {
      const [wr, sr] = await Promise.all([
        window.storage.get('approved_words', true).catch(() => null),
        window.storage.get('word_suggestions', true).catch(() => null),
      ]);
      const words = wr && wr.value ? JSON.parse(wr.value) : [];
      const list = sr && sr.value ? JSON.parse(sr.value) : [];
      const newWords = words.includes(entry.word) ? words : [...words, entry.word];
      const newList = list.filter((s) => s.id !== entry.id);
      await window.storage.set('approved_words', JSON.stringify(newWords), true);
      await window.storage.set('word_suggestions', JSON.stringify(newList), true);
      setApprovedWords(newWords);
      setPendingSuggestions(newList);
    } catch (e) { /* best effort */ }
  }

  async function rejectSuggestion(entry) {
    try {
      const sr = await window.storage.get('word_suggestions', true).catch(() => null);
      const list = sr && sr.value ? JSON.parse(sr.value) : [];
      const newList = list.filter((s) => s.id !== entry.id);
      await window.storage.set('word_suggestions', JSON.stringify(newList), true);
      setPendingSuggestions(newList);
    } catch (e) { /* best effort */ }
  }

  async function saveProfile() {
    const updated = { ...profileDraft, name: profileDraft.name.trim() || 'لاعب' };
    setProfile(updated);
    setProfileDraft(updated);
    try {
      await window.storage.set('profile', JSON.stringify(updated), false);
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 1500);
    } catch (e) { /* best effort */ }
  }

  async function bumpStats(won) {
    try {
      const r = await window.storage.get('profile', false).catch(() => null);
      const base = r && r.value ? JSON.parse(r.value) : profile;
      const updated = { ...base, gamesPlayed: (base.gamesPlayed || 0) + 1, wins: (base.wins || 0) + (won ? 1 : 0) };
      setProfile(updated);
      await window.storage.set('profile', JSON.stringify(updated), false);
    } catch (e) { /* best effort */ }
  }

  // ---- shared session helpers ----
  async function writeSession(code, obj) {
    try { await window.storage.set(`session_${code}`, JSON.stringify(obj), true); } catch (e) {}
  }
  async function readSession(code) {
    try {
      const r = await window.storage.get(`session_${code}`, true);
      return r && r.value ? JSON.parse(r.value) : null;
    } catch (e) { return null; }
  }
  async function readLobby() {
    try {
      const r = await window.storage.get('lobby_public', true);
      return r && r.value ? JSON.parse(r.value) : [];
    } catch (e) { return []; }
  }
  async function writeLobby(list) {
    try { await window.storage.set('lobby_public', JSON.stringify(list), true); } catch (e) {}
  }

  // Merges the static session settings (which don't change mid-turn) with the
  // dynamic fields the caller supplies, so every write site doesn't have to
  // repeat turnSeconds/startCards/communityMode/etc by hand.
  function buildSessionPayload(dynamic) {
    return {
      code: sessionCodeRef.current,
      status: 'playing',
      turnSeconds,
      startCards,
      communityMode: communityModeRef.current,
      objectionSeconds: objectionSecondsRef.current,
      maxPlayers: maxPlayersRef.current,
      excludedLetters: excludedLettersRef.current,
      winnerId: null,
      pendingMove: null,
      ...dynamic,
    };
  }
  // Serialize the full N-player roster (2-12) for a session write.
  function rosterOf(list) { return list.map((p) => ({ id: p.id, name: p.name })); }
  function handsOf(list) { return Object.fromEntries(list.map((p) => [p.id, p.hand])); }

  function dealAndStart(code, session) {
    const sTurnSeconds = session.turnSeconds || 10;
    const sStartCards = session.startCards || 10;
    const sExcluded = session.excludedLetters || [];
    const newBag = buildBagExcluding(sExcluded);
    const hands = {};
    session.players.forEach((p) => { hands[p.id] = dealHandWithStars(newBag, sStartCards); });
    const startWord = WORDS[Math.floor(Math.random() * WORDS.length)].split('');
    // NOTE: gameStartsAt/turnEndsAt below are only a fallback for the very
    // first read; every client re-anchors these using its OWN clock the
    // moment it observes a new dealId (see applySessionToLocal), so clock
    // differences between devices never cause mismatched countdowns.
    const startsAt = Date.now() + PREP_SECONDS * 1000;
    return {
      code,
      status: 'playing',
      dealId: `${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      turnSeconds: sTurnSeconds,
      startCards: sStartCards,
      communityMode: !!session.communityMode,
      objectionSeconds: session.objectionSeconds || 5,
      maxPlayers: session.maxPlayers || 2,
      excludedLetters: sExcluded,
      players: session.players.map((p) => ({ id: p.id, name: p.name })),
      hands,
      bag: newBag,
      tableWord: startWord,
      tableStarFlags: startWord.map(() => false),
      currentPlayerId: session.players[0].id,
      gameStartsAt: startsAt,
      turnEndsAt: startsAt + sTurnSeconds * 1000,
      lastMessage: `بدأت المباراة! دور ${session.players[0].name}`,
      lastMessageType: 'info',
      winnerId: null,
      pendingMove: null,
      paused: false,
      pausedRemaining: null,
      pausedType: null,
    };
  }

  function applySessionToLocal(session) {
    const sPlayers = session.players;
    const sTurnSeconds = session.turnSeconds || 10;
    setPlayers(sPlayers.map((p) => ({ id: p.id, name: p.name, hand: session.hands[p.id] || [] })));
    setMyIndex(Math.max(0, sPlayers.findIndex((p) => p.id === myIdRef.current)));
    setBag(session.bag);
    setTableWord(session.tableWord);
    setTableStarFlags(session.tableStarFlags || session.tableWord.map(() => false));
    setCurrentIdx(Math.max(0, sPlayers.findIndex((p) => p.id === session.currentPlayerId)));
    setMessage(session.lastMessage || '');
    setMessageType(session.lastMessageType || 'info');
    setCommunityMode(!!session.communityMode);
    setObjectionSeconds(session.objectionSeconds || 5);
    setMaxPlayers(session.maxPlayers || 2);
    setExcludedLetters(session.excludedLetters || []);
    // The session's host is the single source of truth. Every client uses the
    // exact same broadcast deadlines; no client restarts a full turn on poll.
    setTurnSeconds(sTurnSeconds);
    if (session.dealId !== knownDealIdRef.current) {
      knownDealIdRef.current = session.dealId;
      knownCurrentPlayerIdRef.current = session.currentPlayerId;
    } else if (session.currentPlayerId !== knownCurrentPlayerIdRef.current) {
      knownCurrentPlayerIdRef.current = session.currentPlayerId;
    }
    if (session.gameStartsAt) setGameStartsAt(session.gameStartsAt);
    if (session.turnEndsAt) {
      setTurnEndsAt(session.turnEndsAt);
      setTimeLeft(Math.max(0, Math.ceil((session.turnEndsAt - Date.now()) / 1000)));
    }

    if (session.pendingMove) {
      const pmId = session.pendingMove.id;
      if (pmId !== knownPendingIdRef.current) {
        knownPendingIdRef.current = pmId;
        setPendingMove({ ...session.pendingMove, deadline: Date.now() + (session.objectionSeconds || 5) * 1000 });
      } else {
        // Same pending move as before (e.g. someone just disputed it) - keep
        // our own already-anchored deadline, just refresh the other fields.
        setPendingMove((prev) => (prev ? { ...session.pendingMove, deadline: prev.deadline } : { ...session.pendingMove, deadline: Date.now() + (session.objectionSeconds || 5) * 1000 }));
      }
    } else {
      knownPendingIdRef.current = null;
      setPendingMove(null);
    }

    if (session.paused && !knownPausedRef.current) {
      // just paused - ticking effects freeze on their own via the `paused` flag
    } else if (!session.paused && knownPausedRef.current) {
      // just resumed - reanchor from the remaining time using OUR clock,
      // but only if pausedRemaining is a valid number (not null/undefined).
      // This prevents clobbering turnEndsAt written by the host's accept/reject.
      const remaining = typeof session.pausedRemaining === 'number' ? session.pausedRemaining : null;
      if (remaining !== null) {
        if (session.pausedType === 'objection') {
          setPendingMove((prev) => (prev ? { ...prev, deadline: Date.now() + remaining * 1000 } : prev));
        } else {
          setTurnEndsAt(Date.now() + remaining * 1000);
        }
      }
      // If pausedRemaining is null, trust the session's turnEndsAt as-is
    }
    knownPausedRef.current = !!session.paused;
    setPaused(!!session.paused);

    if (session.winnerId) {
      setWinnerIdx(Math.max(0, sPlayers.findIndex((p) => p.id === session.winnerId)));
      setScreen('finished');
    } else {
      setScreen('playing');
    }
  }

  // ---- Host: create session, wait for join ----
  async function hostSession() {
    const code = makeCode();
    const me = { id: myIdRef.current, name: profileRef.current.name || 'المضيف' };
    await writeSession(code, {
      code, status: 'waiting', turnSeconds, startCards, communityMode, objectionSeconds,
      maxPlayers, autoStart: false, excludedLetters,
      players: [me], hands: {}, bag: [], tableWord: [], currentPlayerId: null,
      turnEndsAt: 0, lastMessage: '', winnerId: null, pendingMove: null,
    });
    setSessionCode(code);
    try { window.localStorage.setItem('faseeh_current_session', code); } catch (e) {}
    setAmHost(true);
    setMode('online');
    setWaitingPlayers([me]);
    setSearchMsg('بانتظار انضمام اللاعبين...');
    setScreen('session-wait');
  }

  // Any online destination (host / join / quick match) requires a name first,
  // so every player in a session is identifiable throughout it.
  function goOnline(destination) {
    if (!profile.name || !profile.name.trim()) {
      setPendingDestination(destination);
      setNameGateInput(profile.name || '');
      setNameGateError('');
      setScreen('name-gate');
      return;
    }
    if (destination === 'quick') quickMatch();
    else setScreen(destination);
  }

  async function confirmNameGate() {
    const name = nameGateInput.trim();
    if (!name) {
      setNameGateError('اكتب اسمك أو اسمك المستعار');
      return;
    }
    const updated = { ...profile, name };
    setProfile(updated);
    setProfileDraft(updated);
    profileRef.current = updated;
    try { await window.storage.set('profile', JSON.stringify(updated), false); } catch (e) { /* best effort */ }
    const dest = pendingDestination;
    setPendingDestination(null);
    if (dest === 'quick') quickMatch();
    else setScreen(dest);
  }

  async function quickMatch() {
    setMode('online');
    setScreen('session-wait');
    setSearchMsg('جاري البحث عن لاعب...');
    const lobby = await readLobby();
    const fresh = lobby.filter((e) => Date.now() - e.createdAt < 120000);
    if (fresh.length > 0) {
      const entry = fresh[0];
      const remaining = fresh.filter((e) => e.code !== entry.code);
      await writeLobby(remaining);
      const ok = await joinByCode(entry.code, true);
      if (!ok) {
        // stale/gone, fall back to hosting
        await createQuickHost();
      }
    } else {
      await createQuickHost();
    }
  }

  async function createQuickHost() {
    const code = makeCode();
    const me = { id: myIdRef.current, name: profileRef.current.name || 'أنا' };
    await writeSession(code, {
      code, status: 'waiting', turnSeconds, startCards, communityMode, objectionSeconds,
      maxPlayers: 2, autoStart: true,
      players: [me], hands: {}, bag: [], tableWord: [], currentPlayerId: null,
      turnEndsAt: 0, lastMessage: '', winnerId: null, pendingMove: null,
    });
    const lobby = await readLobby();
    await writeLobby([...lobby.filter((e) => e.code !== code), { code, createdAt: Date.now() }]);
    setSessionCode(code);
    try { window.localStorage.setItem('faseeh_current_session', code); } catch (e) {}
    setAmHost(true);
    setWaitingPlayers([me]);
    setSearchMsg('جاري البحث عن لاعب...');
  }

  async function joinByCode(code, silent) {
    const session = await readSession(code);
    if (!session) {
      if (!silent) setJoinError('لم يتم العثور على هذه الجلسة');
      return false;
    }
    if (session.status !== 'waiting') {
      if (!silent) setJoinError('المباراة بدأت بالفعل');
      return false;
    }
    const cap = session.maxPlayers || 2;
    if (session.players.length >= cap) {
      if (!silent) setJoinError('الجلسة ممتلئة بالفعل');
      return false;
    }
    const me = { id: myIdRef.current, name: profileRef.current.name || 'لاعب' };
    const updated = { ...session, players: [...session.players, me] };
    await writeSession(code, updated);
    setSessionCode(code);
    try { window.localStorage.setItem('faseeh_current_session', code); } catch (e) {}
    setAmHost(false);
    setMode('online');
    setMaxPlayers(cap);
    setWaitingPlayers(updated.players);
    setSearchMsg('بانتظار بدء اللاعب المضيف...');
    setScreen('session-wait');
    return true;
  }

  async function handleJoinSubmit() {
    setJoinError('');
    const code = joinInput.trim().toUpperCase();
    if (code.length !== 5) { setJoinError('أدخل رمزًا مكونًا من ٥ محارف'); return; }
    await joinByCode(code, false);
  }

  // Host manually kicks off a hosted (non-quick-match) session once enough
  // players have joined - no need to wait for the room to fill up.
  async function startHostedGame() {
    const code = sessionCodeRef.current;
    const session = await readSession(code);
    if (!session || session.players.length < 2) return;
    const full = dealAndStart(code, session);
    await writeSession(code, full);
    applySessionToLocal(full);
  }

  // ---- polling while waiting for players to join ----
  useEffect(() => {
    if (screen !== 'session-wait') return;
    const interval = setInterval(async () => {
      const code = sessionCodeRef.current;
      if (!code) return;
      const session = await readSession(code);
      if (!session) return;
      if (session.status === 'ended') {
        goMenu();
        return;
      }
      if (session.status === 'playing') {
        applySessionToLocal(session);
        return;
      }
      setWaitingPlayers(session.players || []);
      setMaxPlayers(session.maxPlayers || 2);
      const cap = session.maxPlayers || 2;
      if (amHostRef.current && session.autoStart && session.players.length >= cap) {
        const full = dealAndStart(code, session);
        await writeSession(code, full);
        applySessionToLocal(full);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [screen]);

  // ---- polling during play/finished (online) to receive opponent moves or a rematch ----
  useEffect(() => {
    if ((screen !== 'playing' && screen !== 'finished') || modeRef.current !== 'online') return;
    const interval = setInterval(async () => {
      const code = sessionCodeRef.current;
      if (!code) return;
      const session = await readSession(code);
      if (!session) return;
      if (session.status === 'ended') {
        goMenu();
        return;
      }
      applySessionToLocal(session);
    }, 1500);
    return () => clearInterval(interval);
  }, [screen, mode]);

  // ---- bot / local start ----
  function startBotGame() {
    const newBag = buildBag();
    const meHand = dealHandWithStars(newBag, startCards);
    const botHand = dealHandWithStars(newBag, startCards);
    const startWord = WORDS[Math.floor(Math.random() * WORDS.length)].split('');
    setPlayers([
      { id: 'me', name: profile.name || 'أنت', hand: meHand },
      { id: 'bot', name: `البوت 🤖 (${DIFFICULTY_LABELS[botDifficulty]})`, hand: botHand },
    ]);
    setMyIndex(0);
    setBag(newBag);
    setTableWord(startWord);
    setTableStarFlags(startWord.map(() => false));
    setCurrentIdx(0);
    setSelectedHand(null);
    setMessage(`أمامك ${formatTime(turnSeconds)} للعب`);
    setMessageType('info');
    setWinnerIdx(null);
    setRoundNumber(1);
    setMode('bot');
    const startsAt = Date.now() + PREP_SECONDS * 1000;
    setGameStartsAt(startsAt);
    setTurnEndsAt(startsAt + turnSeconds * 1000);
    statedRef.current = false;
    setScreen('playing');
  }

  // ---- grab attention the instant it becomes this player's turn ----
  const myTurnAttentionRef = useRef(false);
  const titleFlashIntervalRef = useRef(null);
  useEffect(() => {
    const isMyTurn = screen === 'playing' && !paused && prepTimeLeft === 0 && !pendingMove && mode && currentIdx === myIndex;
    if (isMyTurn && !myTurnAttentionRef.current) {
      try { if (navigator.vibrate) navigator.vibrate([200, 100, 200]); } catch (e) { /* not supported */ }
      const original = document.title;
      let on = false;
      if (titleFlashIntervalRef.current) clearInterval(titleFlashIntervalRef.current);
      titleFlashIntervalRef.current = setInterval(() => {
        document.title = on ? original : '🔔 دورك الآن!';
        on = !on;
      }, 900);
    } else if (!isMyTurn && myTurnAttentionRef.current && titleFlashIntervalRef.current) {
      clearInterval(titleFlashIntervalRef.current);
      titleFlashIntervalRef.current = null;
      document.title = 'فصيح';
    }
    myTurnAttentionRef.current = isMyTurn;
  }, [screen, paused, prepTimeLeft, pendingMove, currentIdx, myIndex, mode]);

  useEffect(() => {
    return () => { if (titleFlashIntervalRef.current) clearInterval(titleFlashIntervalRef.current); };
  }, []);

  // ---- pre-game "get ready" countdown ----
  useEffect(() => {
    if (screen !== 'playing' || !gameStartsAt) { setPrepTimeLeft(0); return; }
    const tick = () => setPrepTimeLeft(Math.max(0, Math.ceil((gameStartsAt - Date.now()) / 1000)));
    tick();
    const t = setInterval(tick, 250);
    return () => clearInterval(t);
  }, [screen, gameStartsAt]);

  // ---- local ticking countdown display (frozen while a move is under discussion, still in prep, or paused) ----
  useEffect(() => {
    if (screen !== 'playing' || pendingMove || prepTimeLeft > 0 || paused) return;
    const t = setInterval(() => {
      setTimeLeft(Math.max(0, Math.ceil((turnEndsAt - Date.now()) / 1000)));
    }, 250);
    return () => clearInterval(t);
  }, [screen, turnEndsAt, pendingMove, prepTimeLeft, paused]);

  // ---- timeout handling (only the player whose turn it is triggers it; never while a move is pending, in prep, or paused) ----
  useEffect(() => {
    if (screen !== 'playing' || winnerIdx !== null || pendingMove || prepTimeLeft > 0 || paused) return;
    if (currentIdxRef.current !== myIndexRef.current) return;
    if (timeLeft > 0) return;
    applyPenaltyAndAdvance('انتهى الوقت');
  }, [timeLeft, screen, winnerIdx, pendingMove, prepTimeLeft, paused]);

  // ---- objection countdown display ----
  useEffect(() => {
    if (screen !== 'playing' || !pendingMove || pendingMove.disputed || paused) { if (!paused) setObjectionTimeLeft(0); return; }
    const tick = () => setObjectionTimeLeft(Math.max(0, Math.ceil((pendingMove.deadline - Date.now()) / 1000)));
    tick();
    const t = setInterval(tick, 250);
    return () => clearInterval(t);
  }, [screen, pendingMove, paused]);

  // ---- auto-accept once the objection window passes with no objection (HOST's client confirms) ----
  useEffect(() => {
    if (screen !== 'playing' || !pendingMove || pendingMove.disputed || paused) return;
    if (objectionTimeLeft > 0) return;
    // Only the HOST can auto-accept — guests wait for the host's decision
    if (!amHostRef.current) return;
    // Pre-verify: read the session to make sure disputed wasn't set between
    // our last poll and the timer hitting zero (race-condition guard).
    (async () => {
      try {
        const code = sessionCodeRef.current;
        if (!code) return;
        const session = await readSession(code);
        if (session?.pendingMove?.id === pendingMove.id && !session.pendingMove.disputed) {
          resolvePendingMove('accept');
        }
        // If disputed was set in the meantime, do nothing — the host will
        // see the dispute UI and decide manually.
      } catch { /* storage error — skip auto-accept, host can decide manually */ }
    })();
  }, [objectionTimeLeft, pendingMove, screen, paused]);

  // ---- bot AI turn ----
  useEffect(() => {
    if (screen !== 'playing' || mode !== 'bot' || winnerIdx !== null || prepTimeLeft > 0 || paused) return;
    if (currentIdx !== 1) return;
    const botTimer = setTimeout(() => {
      try {
        const botPlayer = playersRef.current[1];
        const currentTableWord = tableWordRef.current;
        let found = null;
        for (let hi = 0; hi < botPlayer.hand.length && !found; hi++) {
          const card = botPlayer.hand[hi];
          const candidates = card === STAR ? ARABIC_LETTERS : [card];
          for (let ci = 0; ci < candidates.length && !found; ci++) {
            const letter = candidates[ci];
            for (let pos = 0; pos < currentTableWord.length && !found; pos++) {
              if (letter === currentTableWord[pos]) continue;
              const candidate = [...currentTableWord];
              candidate[pos] = letter;
              if (checkWord(candidate.join(''))) found = { hi, pos, letter, word: candidate.join(''), isStar: card === STAR };
            }
          }
        }
        // A move that would empty the bot's hand is a winning move. Each difficulty
        // holds the bot back from winning before its minimum round count is reached -
        // it deliberately "fails" to see that move and takes a penalty draw instead.
        const wouldWin = found && botPlayer.hand.length === 1;
        const minRounds = minRoundsConfigRef.current[botDifficultyRef.current] || MIN_ROUNDS.medium;
        if (wouldWin && roundNumberRef.current < minRounds) {
          found = null;
        }

        if (found) {
          const newHand = [...botPlayer.hand];
          newHand.splice(found.hi, 1);
          const newPlayers = [...playersRef.current];
          newPlayers[1] = { ...botPlayer, hand: newHand };
          const newTableWord = [...currentTableWord];
          newTableWord[found.pos] = found.letter;
          setPlayers(newPlayers);
          setTableWord(newTableWord);
          setTableStarFlags((sf) => { const c = [...sf]; c[found.pos] = found.isStar; return c; });
          setFlipPos(found.pos);
          setTimeout(() => setFlipPos(null), 350);
          if (newHand.length === 0) {
            setWinnerIdx(1);
            setScreen('finished');
            return;
          }
          setMessage(`🤖 البوت لعب "${found.word}" — دورك الآن`);
          setMessageType('info');
          setCurrentIdx(0);
          setTurnEndsAt(Date.now() + turnSecondsRef.current * 1000);
          setRoundNumber((r) => r + 1);
        } else {
          applyPenaltyAndAdvance('البوت لم يجد كلمة صحيحة');
        }
      } catch (err) {
        // Never let the bot's turn silently hang the game - fall back to a
        // penalty draw and hand the turn back if anything unexpected happens.
        console.error('Bot turn error:', err);
        applyPenaltyAndAdvance('حدث خطأ بدور البوت');
      }
    }, 1200);
    return () => clearTimeout(botTimer);
  }, [screen, mode, currentIdx, winnerIdx, prepTimeLeft]);

  // ---- finish stats ----
  useEffect(() => {
    if (screen !== 'finished' || statedRef.current) return;
    statedRef.current = true;
    if (mode === 'bot' || mode === 'online') {
      bumpStats(winnerIdx === myIndexRef.current);
    }
  }, [screen]);

  function applyPenaltyAndAdvance(reasonText) {
    const idx = currentIdxRef.current;
    const currentPlayers = playersRef.current;
    const currentBag = bagRef.current;
    const player = currentPlayers[idx];
    let newHand = player.hand, newBag = currentBag;
    if (currentBag.length > 0) {
      newBag = [...currentBag];
      const drawn = drawUniqueLetter(newBag, player.hand);
      newHand = [...player.hand, drawn];
    }
    const newPlayers = [...currentPlayers];
    newPlayers[idx] = { ...player, hand: newHand };
    const nextIdx = (idx + 1) % newPlayers.length;
    const newTurnEndsAt = Date.now() + turnSecondsRef.current * 1000;
    const msg = `⏱️ ${reasonText} — ${player.name} يسحب حرف عقوبة. دور ${newPlayers[nextIdx].name}`;
    setPlayers(newPlayers);
    setBag(newBag);
    setSelectedHand(null);
    setPendingMove(null);
    setMessage(msg);
    setMessageType('error');
    setCurrentIdx(nextIdx);
    setTurnEndsAt(newTurnEndsAt);
    if (modeRef.current === 'online') {
      knownCurrentPlayerIdRef.current = newPlayers[nextIdx].id;
      knownPendingIdRef.current = null;
    }
    if (modeRef.current === 'bot' && idx === 1) setRoundNumber((r) => r + 1);

    if (modeRef.current === 'online') {
      const code = sessionCodeRef.current;
      writeSession(code, buildSessionPayload({
        players: rosterOf(newPlayers),
        hands: handsOf(newPlayers),
        bag: newBag, tableWord, tableStarFlags, currentPlayerId: newPlayers[nextIdx].id,
        turnEndsAt: newTurnEndsAt, lastMessage: msg, lastMessageType: 'error',
        paused: false, pausedType: null, pausedRemaining: null,
      }));
    }
  }

  // Actually commits a move: removes the card from the mover's hand, updates
  // the table, checks for a win, and advances the turn. Used both for a
  // normal dictionary-confirmed move and for a community-mode move that got
  // accepted (by timeout or by the host).
  function applyAcceptedMove(moverIndex, pos, letter, isStar, candidateWord) {
    const currentPlayers = playersRef.current;
    const mover = currentPlayers[moverIndex];
    const candidate = [...tableWord];
    candidate[pos] = letter;
    const newStarFlags = [...tableStarFlags];
    newStarFlags[pos] = isStar;
    const cardToRemove = isStar ? STAR : letter;
    const newHand = [...mover.hand];
    const cardIdx = newHand.indexOf(cardToRemove);
    if (cardIdx >= 0) newHand.splice(cardIdx, 1);
    const newPlayers = [...currentPlayers];
    newPlayers[moverIndex] = { ...mover, hand: newHand };

    setSelectedHand(null);
    setPendingMove(null);
    if (modeRef.current === 'online') knownPendingIdRef.current = null;
    setFlipPos(pos);
    setTimeout(() => setFlipPos(null), 350);

    const nextIdx = (moverIndex + 1) % newPlayers.length;
    if (newHand.length === 0) {
      setPlayers(newPlayers);
      setTableWord(candidate);
      setTableStarFlags(newStarFlags);
      setWinnerIdx(moverIndex);
      if (modeRef.current === 'online') {
        const code = sessionCodeRef.current;
        writeSession(code, buildSessionPayload({
          players: rosterOf(newPlayers),
          hands: handsOf(newPlayers),
          bag, tableWord: candidate, tableStarFlags: newStarFlags, currentPlayerId: newPlayers[moverIndex].id,
          turnEndsAt, lastMessage: `✅ "${candidateWord}" — ${mover.name} فاز!`, lastMessageType: 'success',
          winnerId: newPlayers[moverIndex].id,
          paused: false, pausedType: null, pausedRemaining: null,
        }));
      }
      setScreen('finished');
      return;
    }

    setPlayers(newPlayers);
    setTableWord(candidate);
    setTableStarFlags(newStarFlags);
    const newTurnEndsAt = Date.now() + turnSecondsRef.current * 1000;
    const msg = `✅ "${candidateWord}" كلمة صحيحة — دور ${newPlayers[nextIdx].name}`;
    setMessage(msg);
    setMessageType('success');
    setCurrentIdx(nextIdx);
    setTurnEndsAt(newTurnEndsAt);
    if (modeRef.current === 'online') knownCurrentPlayerIdRef.current = newPlayers[nextIdx].id;

    if (modeRef.current === 'online') {
      const code = sessionCodeRef.current;
      writeSession(code, buildSessionPayload({
        players: rosterOf(newPlayers),
        hands: handsOf(newPlayers),
        bag, tableWord: candidate, tableStarFlags: newStarFlags, currentPlayerId: newPlayers[nextIdx].id,
        turnEndsAt: newTurnEndsAt, lastMessage: msg, lastMessageType: 'success',
        paused: false, pausedType: null, pausedRemaining: null,
      }));
    }
  }

  // Host's (or the timeout's) verdict on a disputed/pending community-mode move.
  function resolvePendingMove(decision) {
    const pm = pendingMoveRef.current;
    if (!pm) return;
    // In online community mode, only the host may resolve pending moves.
    // This prevents any guest client from accidentally (or intentionally)
    // calling resolvePendingMove, which would bypass the host's authority.
    if (modeRef.current === 'online' && communityModeRef.current && !amHostRef.current) return;
    if (decision === 'accept') {
      trackAcceptedCommunityWord(pm.candidateWord);
      applyAcceptedMove(pm.moverIndex, pm.pos, pm.letter, pm.isStar, pm.candidateWord);
    } else {
      applyPenaltyAndAdvance(`"${pm.candidateWord}" اعتُرض عليها ورفضها المضيف`);
    }
  }

  // Any other player in the session can flag a just-played word for the host to judge.
  function objectToMove() {
    const pm = pendingMoveRef.current;
    if (!pm || pm.disputed) return;
    const updated = { ...pm, disputed: true };
    setPendingMove(updated);
    if (modeRef.current === 'online') {
      const code = sessionCodeRef.current;
      const cp = playersRef.current;
      // Pause the session immediately so all timers freeze while the host decides.
      // This ensures the game is truly "stopped" during the dispute.
      setPaused(true);
      knownPausedRef.current = true;
      writeSession(code, buildSessionPayload({
        players: rosterOf(cp),
        hands: handsOf(cp),
        bag, tableWord, tableStarFlags, currentPlayerId: cp[currentIdxRef.current].id,
        turnEndsAt,
        lastMessage: `⚠️ تم الاعتراض على "${pm.candidateWord}" — بانتظار قرار المضيف`,
        lastMessageType: 'error',
        pendingMove: updated,
        paused: true,
        pausedType: 'objection',
        pausedRemaining: objectionTimeLeft,
      }));
    }
  }

  // Host-only: freeze/unfreeze the game for everyone (e.g. a bathroom break).
  // Captures whichever countdown is currently running so nobody loses time.
  async function togglePause() {
    const code = sessionCodeRef.current;
    const cp = playersRef.current;
    const nextPaused = !paused;
    setPaused(nextPaused);
    knownPausedRef.current = nextPaused;
    const remaining = pendingMove ? objectionTimeLeft : timeLeft;
    const type = pendingMove ? 'objection' : 'turn';
    await writeSession(code, buildSessionPayload({
      players: rosterOf(cp), hands: handsOf(cp), bag, tableWord, tableStarFlags,
      currentPlayerId: cp[currentIdxRef.current] ? cp[currentIdxRef.current].id : cp[0].id,
      turnEndsAt, pendingMove,
      paused: nextPaused,
      pausedRemaining: nextPaused ? remaining : null,
      pausedType: nextPaused ? type : null,
      lastMessage: nextPaused ? '⏸️ أوقف المضيف اللعبة مؤقتًا' : '▶️ استُؤنفت اللعبة',
      lastMessageType: 'info',
    }));
  }

  // Leave the current session and go back to the menu. If the game hasn't
  // started yet, also remove ourselves from the waiting room so the host
  // sees an accurate player count.
  async function leaveSession() {
    if (!window.confirm('متأكد إنك تبي تطلع من الجلسة؟')) return;
    const code = sessionCodeRef.current;
    try {
      const session = code ? await readSession(code) : null;
      if (session) {
        // The host owns the room lifecycle: ending it prevents every other
        // polling client from remaining in a permanently suspended session.
        if (amHostRef.current) {
          await writeSession(code, {
            ...session,
            status: 'ended',
            endedBy: myIdRef.current,
            endedAt: Date.now(),
          });
        } else {
          const leavingId = myIdRef.current;
          const oldPlayers = session.players || [];
          const leavingIndex = oldPlayers.findIndex((p) => p.id === leavingId);
          const remaining = oldPlayers.filter((p) => p.id !== leavingId);
          if (remaining.length === 0) {
            await writeSession(code, { ...session, status: 'ended', endedBy: leavingId, endedAt: Date.now() });
          } else {
            const nextPlayers = remaining.map((p) => ({ id: p.id, name: p.name }));
            const hands = { ...(session.hands || {}) };
            delete hands[leavingId];
            let currentPlayerId = session.currentPlayerId;
            const pending = session.pendingMove && session.pendingMove.moverIndex === leavingIndex ? null : session.pendingMove;
            if (!nextPlayers.some((p) => p.id === currentPlayerId)) {
              const nextIndex = Math.max(0, Math.min(leavingIndex, nextPlayers.length - 1));
              currentPlayerId = nextPlayers[nextIndex].id;
            }
            await writeSession(code, {
              ...session,
              players: nextPlayers,
              hands,
              currentPlayerId,
              pendingMove: pending,
              lastMessage: `${oldPlayers[leavingIndex]?.name || 'لاعب'} غادر الجلسة`,
              lastMessageType: 'info',
            });
          }
        }
      }
    } catch (e) { /* best effort */ }
    goMenu();
  }

  // Host-only: start a fresh round with the exact same roster - no need to
  // re-share the code or re-gather everyone.
  async function rematchSession() {
    const code = sessionCodeRef.current;
    const session = await readSession(code);
    if (!session) return;
    const full = dealAndStart(code, session);
    await writeSession(code, full);
    applySessionToLocal(full);
  }

  // Pre-game toggle (host-setup screen) - just local state, no bag exists yet.
  function toggleSetupExclude(letter) {
    setExcludedLetters((prev) => {
      if (prev.includes(letter)) return prev.filter((l) => l !== letter);
      const remaining = ARABIC_LETTERS.length - prev.length;
      if (remaining <= 3) return prev;
      return [...prev, letter];
    });
  }

  // Mid-game toggle (host only, any time) - also trims/replenishes the live
  // shared bag so the change takes effect on the very next draw.
  function toggleLiveExcludedLetter(letter) {
    const current = excludedLettersRef.current;
    const isExcluded = current.includes(letter);
    if (!isExcluded) {
      const remaining = ARABIC_LETTERS.length - current.length;
      if (remaining <= 3) return;
    }
    const updated = isExcluded ? current.filter((l) => l !== letter) : [...current, letter];
    setExcludedLetters(updated);

    const currentBag = bagRef.current;
    const newBag = isExcluded
      ? shuffle([...currentBag, ...Array.from({ length: letterWeight(letter) }, () => letter)])
      : currentBag.filter((l) => l !== letter);
    setBag(newBag);

    if (modeRef.current === 'online') {
      const code = sessionCodeRef.current;
      const cp = playersRef.current;
      writeSession(code, buildSessionPayload({
        players: rosterOf(cp), hands: handsOf(cp),
        bag: newBag, tableWord, tableStarFlags, currentPlayerId: cp[currentIdxRef.current].id,
        turnEndsAt, lastMessage: message, lastMessageType: messageType,
        excludedLetters: updated,
      }));
    }
  }

  function handleHandClick(idx) {
    if (currentIdx !== myIndex || pendingMove || prepTimeLeft > 0 || paused) return;
    setStarPicker(null);
    setSelectedHand(idx === selectedHand ? null : idx);
    if (idx !== selectedHand) {
      const isStar = players[myIndex].hand[idx] === STAR;
      setMessage(isStar ? 'نجمة! اضغط على مكان بالكلمة ثم اختر الحرف الذي تريده' : 'الآن اضغط على أحد حروف الكلمة على الطاولة لتبديله');
      setMessageType('info');
    }
  }

  function handleTableClick(pos) {
    if (currentIdx !== myIndex || pendingMove || prepTimeLeft > 0 || paused) return;
    if (selectedHand === null) {
      setMessage('اختر أولًا حرفًا من يدك');
      setMessageType('error');
      return;
    }
    const player = players[myIndex];
    const heldCard = player.hand[selectedHand];
    if (heldCard === STAR) {
      setStarPicker({ pos });
      setMessage('اختر الحرف الذي تريد أن تمثله النجمة');
      setMessageType('info');
      return;
    }
    attemptSwap(pos, heldCard, false);
  }

  function handleStarLetterChoice(chosenLetter) {
    if (!starPicker) return;
    attemptSwap(starPicker.pos, chosenLetter, true);
    setStarPicker(null);
  }

  function attemptSwap(pos, letter, isStar) {
    if (letter === tableWord[pos]) {
      setMessage('هذا الحرف موجود أصلًا بهذا المكان، اختر مكانًا آخر');
      setMessageType('error');
      return;
    }
    const candidate = [...tableWord];
    candidate[pos] = letter;
    const candidateWord = candidate.join('');

    // Community/party mode: skip the dictionary and let the table decide,
    // with the host as tie-breaker if someone objects.
    if (modeRef.current === 'online' && communityModeRef.current) {
      const pending = {
        id: `${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        moverIndex: myIndex, pos, letter, isStar, candidateWord,
        deadline: Date.now() + objectionSecondsRef.current * 1000,
        disputed: false,
      };
      setPendingMove(pending);
      knownPendingIdRef.current = pending.id;
      setSelectedHand(null);
      setMessage(`🗳️ "${candidateWord}" — ${objectionSecondsRef.current} ث للاعتراض وإلا تُقبل تلقائيًا`);
      setMessageType('info');
      const code = sessionCodeRef.current;
      const cp = playersRef.current;
      writeSession(code, buildSessionPayload({
        players: rosterOf(cp),
        hands: handsOf(cp),
        bag, tableWord, tableStarFlags, currentPlayerId: cp[currentIdxRef.current].id,
        turnEndsAt,
        lastMessage: `🗳️ ${cp[myIndex].name} لعب "${candidateWord}" — بانتظار القرار`,
        lastMessageType: 'info',
        pendingMove: pending,
      }));
      return;
    }

    if (checkWord(candidateWord)) {
      applyAcceptedMove(myIndex, pos, letter, isStar, candidateWord);
    } else {
      applyPenaltyAndAdvance(`"${candidateWord}" ليست كلمة صحيحة`);
    }
  }

  function goMenu() {
    try { window.localStorage.removeItem('faseeh_current_session'); } catch (e) { /* best effort */ }
    knownDealIdRef.current = null;
    knownCurrentPlayerIdRef.current = null;
    knownPendingIdRef.current = null;
    knownPausedRef.current = false;
    setPaused(false);
    setScreen('menu');
    setMode(null);
    setSessionCode('');
    setJoinInput('');
    setJoinError('');
    setExcludedLetters([]);
    setShowLetterPanel(false);
  }

  const msgColor = messageType === 'success' ? 'text-emerald-300' : messageType === 'error' ? 'text-rose-300' : 'text-amber-100';

  // ===================== SCREENS =====================

  if (screen === 'menu') {
    const items = [
      { key: 'bot-setup', icon: Bot, label: 'مواجهة البوت', desc: 'العب ضد الذكاء الاصطناعي على نفس الجهاز' },
      { key: 'quick', icon: Globe, label: 'مواجهة أونلاين', desc: 'مباراة سريعة مع لاعب عشوائي' },
      { key: 'host-setup', icon: Users, label: 'استضافة جلسة', desc: 'أنشئ رمزًا وشاركه مع صديقك' },
      { key: 'join-enter', icon: KeyRound, label: 'الانضمام إلى جلسة خاصة', desc: 'أدخل رمز جلسة صديقك' },
      { key: 'profile', icon: UserCircle, label: 'الملف الشخصي', desc: 'اسمك وشعارك وإحصائياتك' },
    ];
    return (
      <div dir="rtl" style={{ ...cairo, ...woodBgStyle, ...safeAreaCentered }} className="min-h-screen flex items-center justify-center">
        <div className="max-w-md sm:max-w-lg w-full">
          <div className="text-center mb-6">
            <div className="inline-flex gap-1 mb-4">
              {['ف','ص','ي','ح'].map((l, i) => (
                <span key={i} className="w-12 h-12 flex items-center justify-center bg-amber-100 text-stone-900 rounded-lg border-2 border-amber-950 shadow-lg font-black text-2xl">{l}</span>
              ))}
            </div>
            <h1 className="text-4xl font-black text-amber-100 mb-1" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>فصيح</h1>
            {profile.name && <p className="text-amber-200/70 text-sm">أهلًا، {profile.avatar} {profile.name}</p>}
          </div>

          <div className="space-y-3">
            {items.map(({ key, icon: Icon, label, desc }) => (
              <button
                key={key}
                onClick={() => (['quick', 'host-setup', 'join-enter'].includes(key) ? goOnline(key) : setScreen(key))}
                style={woodPanelStyle}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-amber-950 hover:brightness-110 transition-all text-right"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-700 border-2 border-emerald-400 flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-amber-50 font-bold">{label}</p>
                  <p className="text-amber-200/60 text-xs">{desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-amber-800/40 flex items-center justify-center gap-5">
            <button
              onClick={() => setContactModalOpen(true)}
              className="flex flex-col items-center gap-1 text-amber-200/60 hover:text-amber-100 text-xs transition-colors"
            >
              <Mail size={18} />
              تواصل مع Robin
            </button>
            <div className="flex flex-col items-center gap-1 text-amber-200/25 text-xs cursor-not-allowed">
              <Gamepad2 size={18} />
              <span>ألعاب Robin الأخرى</span>
              <span className="text-[10px] bg-stone-700 text-amber-200/50 rounded-full px-2 py-0.5">قريبًا</span>
            </div>
            <button
              onClick={() => setSupportBotOpen(true)}
              className="flex flex-col items-center gap-1 text-amber-200/60 hover:text-amber-100 text-xs transition-colors"
            >
              <LifeBuoy size={18} />
              بوت الدعم
            </button>
          </div>
        </div>

        {contactModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50" onClick={() => setContactModalOpen(false)}>
            <div style={woodPanelStyle} className="rounded-2xl p-6 border-4 border-amber-950 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-3">
                <p className="text-amber-100 font-bold flex items-center gap-2"><Mail size={18} /> تواصل مع Robin</p>
                <button onClick={() => setContactModalOpen(false)} className="text-amber-200/60 hover:text-amber-100"><X size={18} /></button>
              </div>
              <p className="text-amber-200/50 text-xs mb-3">اكتب رسالتك أو شكواك — تصل مباشرة لصاحب اللعبة.</p>
              <textarea
                value={contactMessageInput}
                onChange={(e) => setContactMessageInput(e.target.value)}
                placeholder="رسالتك هنا..."
                rows={4}
                className="w-full bg-amber-950/40 border-2 border-amber-800 rounded-lg px-3 py-2 text-amber-50 placeholder-amber-200/30 outline-none focus:border-emerald-500 text-sm resize-none"
              />
              {contactFeedback && (
                <p className={`text-xs font-bold mt-2 ${contactFeedback.type === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {contactFeedback.text}
                </p>
              )}
              <button
                onClick={submitContactMessage}
                className="w-full mt-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg border-2 border-emerald-800"
              >
                إرسال
              </button>
            </div>
          </div>
        )}

        {supportBotOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50" onClick={() => setSupportBotOpen(false)}>
            <div style={woodPanelStyle} className="rounded-2xl p-6 border-4 border-amber-950 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-3">
                <p className="text-amber-100 font-bold flex items-center gap-2"><LifeBuoy size={18} /> بوت دعم Robin</p>
                <button onClick={() => setSupportBotOpen(false)} className="text-amber-200/60 hover:text-amber-100"><X size={18} /></button>
              </div>
              <p className="text-amber-200/70 text-sm leading-relaxed">
                مرحبًا! أنا بوت الدعم الخاص بـ Robin. هذه واجهة تجريبية حاليًا — قريبًا راح أقدر أساعدك بأسئلتك عن اللعبة مباشرة هنا.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (screen === 'profile') {
    return (
      <div dir="rtl" style={{ ...cairo, ...woodBgStyle, ...safeAreaCentered }} className="min-h-screen flex items-center justify-center">
        <div className="max-w-md sm:max-w-lg w-full">
          <BackButton onClick={goMenu} />
          <div style={woodPanelStyle} className="rounded-2xl p-6 border-4 border-amber-950 space-y-5">
            <h2 className="text-2xl font-black text-amber-100 text-center flex items-center justify-center gap-2">
              <UserCircle size={26} /> الملف الشخصي
            </h2>
            <div>
              <p className="text-amber-50 font-bold text-sm mb-2">اسمك</p>
              <input
                type="text"
                value={profileDraft.name}
                onChange={(e) => setProfileDraft({ ...profileDraft, name: e.target.value })}
                placeholder="اكتب اسمك هنا"
                className="w-full bg-amber-950/40 border-2 border-amber-800 rounded-lg px-3 py-2 text-amber-50 placeholder-amber-200/40 outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <p className="text-amber-50 font-bold text-sm mb-2">شعارك</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {AVATARS.map((a) => (
                  <button
                    key={a}
                    onClick={() => setProfileDraft({ ...profileDraft, avatar: a })}
                    className={`w-11 h-11 rounded-lg text-xl border-2 transition-all ${
                      profileDraft.avatar === a ? 'bg-emerald-600 border-emerald-300 scale-110' : 'bg-amber-950/40 border-amber-800'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 justify-center text-center">
              <div style={woodPanelDarkStyle} className="flex-1 rounded-xl p-3 border-2 border-amber-950">
                <p className="text-2xl font-black text-amber-100">{profile.gamesPlayed || 0}</p>
                <p className="text-amber-200/60 text-xs">جولات لعبتها</p>
              </div>
              <div style={woodPanelDarkStyle} className="flex-1 rounded-xl p-3 border-2 border-amber-950">
                <p className="text-2xl font-black text-emerald-300">{profile.wins || 0}</p>
                <p className="text-amber-200/60 text-xs">انتصارات</p>
              </div>
            </div>
            <button
              onClick={saveProfile}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg py-3 rounded-xl transition-colors shadow-lg border-2 border-emerald-800 flex items-center justify-center gap-2"
            >
              {profileSaved ? <><Check size={18} /> تم الحفظ</> : 'حفظ'}
            </button>
          </div>

          <div style={woodPanelDarkStyle} className="mt-4 rounded-2xl p-5 border-2 border-amber-950 space-y-3">
            <p className="text-amber-100 font-bold text-sm flex items-center gap-1.5"><PlusCircle size={16} /> اقترح كلمة غير موجودة</p>
            <p className="text-amber-200/50 text-xs">كلمة عربية من ثلاثة أحرف بالضبط — تُرسل لمالك اللعبة للموافقة أو الرفض</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={suggestionInput}
                onChange={(e) => setSuggestionInput(e.target.value.slice(0, 3))}
                placeholder="مثال: شمس"
                maxLength={3}
                className="flex-1 text-center text-xl font-black bg-amber-950/40 border-2 border-amber-800 rounded-lg px-3 py-2 text-amber-50 placeholder-amber-200/30 outline-none focus:border-emerald-500"
              />
              <button onClick={submitSuggestion} className="px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 border-2 border-emerald-800 text-white font-bold text-sm">
                إرسال
              </button>
            </div>
            {suggestionMsg && (
              <p className={`text-xs font-bold ${suggestionMsgType === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}>{suggestionMsg}</p>
            )}
          </div>

          <button
            onClick={() => { setScreen('review-suggestions'); if (reviewUnlocked) loadSuggestions(); }}
            className="w-full mt-3 flex items-center justify-center gap-2 text-amber-200/50 hover:text-amber-100 text-xs font-bold transition-colors"
          >
            <ShieldCheck size={14} /> لوحة إدارة Robin (اقتراحات ورسائل)
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'review-suggestions') {
    return (
      <div dir="rtl" style={{ ...cairo, ...woodBgStyle, ...safeAreaCentered }} className="min-h-screen flex items-center justify-center">
        <div className="max-w-md sm:max-w-lg w-full">
          <BackButton onClick={goMenu} />
          <div style={woodPanelStyle} className="rounded-2xl p-6 border-4 border-amber-950 space-y-5">
            <h2 className="text-2xl font-black text-amber-100 text-center flex items-center justify-center gap-2">
              <ShieldCheck size={26} /> لوحة إدارة Robin
            </h2>

            {!reviewUnlocked ? (
              <>
                <p className="text-amber-200/60 text-xs text-center">أدخل رمز المالك للمتابعة</p>
                <input
                  type="password"
                  value={reviewPinInput}
                  onChange={(e) => setReviewPinInput(e.target.value)}
                  className="w-full text-center text-2xl tracking-[0.3em] font-black bg-amber-950/40 border-2 border-amber-800 rounded-lg px-3 py-2 text-amber-50 outline-none focus:border-emerald-500"
                />
                {reviewPinError && <p className="text-rose-300 text-xs text-center">{reviewPinError}</p>}
                <button
                  onClick={() => {
                    if (reviewPinInput === REVIEW_PIN) {
                      setReviewUnlocked(true); setReviewPinError('');
                      loadSuggestions(); loadContactMessages();
                    } else setReviewPinError('رمز غير صحيح');
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl border-2 border-emerald-800"
                >
                  دخول
                </button>
              </>
            ) : (
              <>
                <div style={woodPanelDarkStyle} className="rounded-xl p-4 border-2 border-amber-950 space-y-3">
                  <p className="text-amber-100 font-bold text-sm">أقل جولة يسمح فيها للبوت بالفوز</p>
                  <p className="text-amber-200/50 text-xs">هذا الإعداد غير ظاهر للاعبين إطلاقًا — خاص بك فقط</p>
                  <div className="grid grid-cols-3 gap-2">
                    {['easy', 'medium', 'hard'].map((d) => (
                      <div key={d} className="text-center">
                        <p className="text-amber-200/60 text-xs mb-1">{DIFFICULTY_LABELS[d]}</p>
                        <input
                          type="number"
                          min={1}
                          value={minRoundsDraft[d]}
                          onChange={(e) => setMinRoundsDraft({ ...minRoundsDraft, [d]: e.target.value })}
                          className="w-full text-center font-black bg-amber-950/40 border-2 border-amber-800 rounded-lg px-2 py-1.5 text-amber-50 outline-none focus:border-emerald-500"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={saveMinRoundsConfig}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-2 rounded-lg border-2 border-emerald-800 flex items-center justify-center gap-2"
                  >
                    {minRoundsSaved ? <><Check size={16} /> تم الحفظ</> : 'حفظ الإعداد'}
                  </button>
                </div>

                <div>
                  <p className="text-amber-100 font-bold text-sm mb-2 flex items-center gap-1.5">
                    <PlusCircle size={16} /> كلمات تحتاج مراجعة ({pendingSuggestions.length})
                  </p>
                  {pendingSuggestions.length === 0 ? (
                    <p className="text-amber-200/60 text-sm text-center py-4">لا توجد اقتراحات بانتظار المراجعة حاليًا</p>
                  ) : (
                    <div className="space-y-2 max-h-72 overflow-y-auto">
                      {pendingSuggestions.map((s) => (
                        <div key={s.id} style={woodPanelDarkStyle} className="flex items-center justify-between p-3 rounded-xl border-2 border-amber-950">
                          <div>
                            <p className="text-amber-50 font-black text-lg">{s.word}</p>
                            <p className="text-amber-200/50 text-xs">اقترحها: {s.by}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => approveSuggestion(s)} className="p-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 border-2 border-emerald-400">
                              <Check size={16} className="text-white" />
                            </button>
                            <button onClick={() => rejectSuggestion(s)} className="p-2 rounded-lg bg-rose-800 hover:bg-rose-700 border-2 border-rose-500">
                              <X size={16} className="text-white" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-amber-100 font-bold text-sm mb-2 flex items-center gap-1.5">
                    <Mail size={16} /> رسائل الزوار ({contactMessages.length})
                  </p>
                  {contactMessages.length === 0 ? (
                    <p className="text-amber-200/60 text-sm text-center py-4">لا توجد رسائل جديدة</p>
                  ) : (
                    <div className="space-y-2 max-h-72 overflow-y-auto">
                      {contactMessages.map((m) => (
                        <div key={m.id} style={woodPanelDarkStyle} className="p-3 rounded-xl border-2 border-amber-950">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-amber-50 font-bold text-sm">{m.name}</p>
                            <button onClick={() => deleteContactMessage(m.id)} className="text-rose-400 hover:text-rose-300 shrink-0">
                              <X size={16} />
                            </button>
                          </div>
                          <p className="text-amber-200/70 text-sm leading-relaxed whitespace-pre-wrap">{m.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'bot-setup') {
    return (
      <div dir="rtl" style={{ ...cairo, ...woodBgStyle, ...safeAreaCentered }} className="min-h-screen flex items-center justify-center">
        <div className="max-w-md sm:max-w-lg w-full">
          <BackButton onClick={goMenu} />
          <div style={woodPanelStyle} className="rounded-2xl p-6 border-4 border-amber-950 space-y-6">
            <h2 className="text-2xl font-black text-amber-100 text-center flex items-center justify-center gap-2">
              <Bot size={26} /> مواجهة البوت
            </h2>
            <div>
              <p className="text-amber-50 font-bold text-sm mb-2">مستوى الصعوبة</p>
              <div className="grid grid-cols-3 gap-2">
                {['easy', 'medium', 'hard'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setBotDifficulty(d)}
                    className={`py-2.5 rounded-xl font-black text-sm border-2 transition-all ${
                      botDifficulty === d
                        ? 'bg-emerald-600 border-emerald-300 text-white scale-105'
                        : 'bg-amber-950/40 border-amber-800 text-amber-100 hover:border-amber-600'
                    }`}
                  >
                    {DIFFICULTY_LABELS[d]}
                  </button>
                ))}
              </div>
            </div>
            <SettingsPanel turnSeconds={turnSeconds} setTurnSeconds={setTurnSeconds} startCards={startCards} setStartCards={setStartCards} />
            <button onClick={startBotGame} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg py-3 rounded-xl transition-colors shadow-lg border-2 border-emerald-800">
              ابدأ المواجهة
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'host-setup') {
    return (
      <div dir="rtl" style={{ ...cairo, ...woodBgStyle, ...safeAreaCentered }} className="min-h-screen flex items-center justify-center">
        <div className="max-w-md sm:max-w-lg w-full">
          <BackButton onClick={goMenu} />
          <div style={woodPanelStyle} className="rounded-2xl p-6 border-4 border-amber-950 space-y-6">
            <h2 className="text-2xl font-black text-amber-100 text-center flex items-center justify-center gap-2">
              <Users size={26} /> استضافة جلسة
            </h2>
            <SettingsPanel turnSeconds={turnSeconds} setTurnSeconds={setTurnSeconds} startCards={startCards} setStartCards={setStartCards} />

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-amber-50 font-bold text-sm flex items-center gap-1.5"><Users size={16} /> عدد اللاعبين الأقصى</span>
                <span className="text-emerald-300 font-bold text-sm">{maxPlayers} لاعبين</span>
              </div>
              <input
                type="range"
                min={2}
                max={12}
                step={1}
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="flex justify-between text-amber-200/60 text-xs mt-1"><span>لاعبان</span><span>١٢ لاعب</span></div>
            </div>

            <div style={woodPanelDarkStyle} className="rounded-xl p-4 border-2 border-amber-950 space-y-3">
              <button
                onClick={() => setCommunityMode(!communityMode)}
                className="w-full flex items-center justify-between"
              >
                <span className="text-amber-50 font-bold text-sm flex items-center gap-1.5"><Gavel size={16} /> وضع حكم اللاعبين</span>
                <span className={`w-11 h-6 rounded-full relative transition-colors ${communityMode ? 'bg-emerald-600' : 'bg-stone-600'}`}>
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${communityMode ? 'right-0.5' : 'right-5'}`} />
                </span>
              </button>
              <p className="text-amber-200/50 text-xs leading-relaxed">
                كل كلمة تُقبل مباشرة، وأي لاعب بالجلسة يقدر يعترض عليها — وإذا صار اعتراض، أنت (المضيف) تقرر تقبلها أو ترفضها.
              </p>
              {communityMode && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-amber-50 font-bold text-xs">مهلة الاعتراض</span>
                    <span className="text-emerald-300 font-bold text-xs">{objectionSeconds} ثانية</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={30}
                    step={1}
                    value={objectionSeconds}
                    onChange={(e) => setObjectionSeconds(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              )}
            </div>

            <div style={woodPanelDarkStyle} className="rounded-xl p-4 border-2 border-amber-950">
              <LetterExcludePicker excluded={excludedLetters} onToggle={toggleSetupExclude} />
            </div>

            <button onClick={hostSession} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg py-3 rounded-xl transition-colors shadow-lg border-2 border-emerald-800">
              أنشئ الجلسة
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'name-gate') {
    return (
      <div dir="rtl" style={{ ...cairo, ...woodBgStyle, ...safeAreaCentered }} className="min-h-screen flex items-center justify-center">
        <div className="max-w-md sm:max-w-lg w-full">
          <BackButton onClick={goMenu} />
          <div style={woodPanelStyle} className="rounded-2xl p-6 border-4 border-amber-950 space-y-5">
            <h2 className="text-2xl font-black text-amber-100 text-center flex items-center justify-center gap-2">
              <UserCircle size={26} /> باسم مين نعرّفك؟
            </h2>
            <p className="text-amber-200/60 text-sm text-center">
              اكتب اسمك أو اسمك المستعار — راح يظهر لبقية اللاعبين طول الجلسة
            </p>
            <input
              type="text"
              value={nameGateInput}
              onChange={(e) => setNameGateInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') confirmNameGate(); }}
              placeholder="اسمك هنا"
              autoFocus
              className="w-full text-center text-xl font-black bg-amber-950/40 border-2 border-amber-800 rounded-lg px-3 py-3 text-amber-50 placeholder-amber-200/30 outline-none focus:border-emerald-500"
            />
            {nameGateError && <p className="text-rose-300 text-sm text-center">{nameGateError}</p>}
            <button onClick={confirmNameGate} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg py-3 rounded-xl transition-colors shadow-lg border-2 border-emerald-800">
              متابعة
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'join-enter') {
    return (
      <div dir="rtl" style={{ ...cairo, ...woodBgStyle, ...safeAreaCentered }} className="min-h-screen flex items-center justify-center">
        <div className="max-w-md sm:max-w-lg w-full">
          <BackButton onClick={goMenu} />
          <div style={woodPanelStyle} className="rounded-2xl p-6 border-4 border-amber-950 space-y-5">
            <h2 className="text-2xl font-black text-amber-100 text-center flex items-center justify-center gap-2">
              <KeyRound size={26} /> الانضمام إلى جلسة
            </h2>
            <input
              type="text"
              value={joinInput}
              onChange={(e) => setJoinInput(e.target.value.toUpperCase().slice(0, 5))}
              placeholder="ABCDE"
              className="w-full text-center tracking-[0.3em] text-2xl font-black bg-amber-950/40 border-2 border-amber-800 rounded-lg px-3 py-3 text-amber-50 placeholder-amber-200/30 outline-none focus:border-emerald-500"
            />
            {joinError && <p className="text-rose-300 text-sm text-center">{joinError}</p>}
            <button onClick={handleJoinSubmit} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg py-3 rounded-xl transition-colors shadow-lg border-2 border-emerald-800">
              انضمام
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'session-wait') {
    return (
      <div dir="rtl" style={{ ...cairo, ...woodBgStyle, ...safeAreaCentered }} className="min-h-screen flex items-center justify-center">
        <div className="max-w-md sm:max-w-lg w-full text-center">
          <button onClick={leaveSession} className="flex items-center gap-1.5 text-amber-200/70 hover:text-amber-100 text-sm font-bold mb-4 transition-colors">
            <ArrowRight size={16} /> مغادرة والرجوع للقائمة
          </button>
          <div style={woodPanelStyle} className="rounded-2xl p-8 border-4 border-amber-950">
            <Loader2 size={40} className="mx-auto text-emerald-300 animate-spin mb-4" />
            <p className="text-amber-100 font-bold mb-4">{searchMsg}</p>
            {sessionCode && (
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl font-black tracking-[0.3em] text-amber-50 bg-amber-950/40 border-2 border-amber-800 rounded-lg px-4 py-2">
                  {sessionCode}
                </span>
                <button
                  onClick={() => { navigator.clipboard?.writeText(sessionCode).catch(() => {}); setCopyOk(true); setTimeout(() => setCopyOk(false), 1200); }}
                  className="p-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 border-2 border-emerald-400"
                >
                  {copyOk ? <Check size={18} className="text-white" /> : <Copy size={18} className="text-white" />}
                </button>
              </div>
            )}
            {amHost && sessionCode && <p className="text-amber-200/50 text-xs mt-4">شارك هذا الرمز مع من تريد اللعب معه</p>}

            {waitingPlayers.length > 0 && (
              <div className="mt-5">
                <p className="text-amber-200/60 text-xs font-bold mb-2">
                  اللاعبون ({waitingPlayers.length}{maxPlayers > 2 ? ` / ${maxPlayers}` : ''})
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {waitingPlayers.map((p) => (
                    <span key={p.id} style={woodPanelDarkStyle} className="px-3 py-1.5 rounded-full text-sm font-bold text-amber-50 border-2 border-amber-950">
                      {p.name}{p.id === myIdRef.current ? ' (أنت)' : ''}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {amHost && waitingPlayers.length >= 2 && (
              <button
                onClick={startHostedGame}
                className="w-full mt-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl border-2 border-emerald-800"
              >
                ابدأ اللعبة الآن ({waitingPlayers.length} لاعبين)
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'finished') {
    const winnerName = winnerIdx !== null && players[winnerIdx] ? players[winnerIdx].name : '';
    return (
      <div dir="rtl" style={{ ...cairo, ...woodBgStyle, ...safeAreaCentered }} className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-sm sm:max-w-md w-full">
          <Trophy size={64} className="mx-auto text-amber-300 mb-4" />
          <h2 className="text-3xl font-black text-amber-100 mb-2">🎉 مبروك!</h2>
          <p className="text-xl text-emerald-300 font-bold mb-8">{winnerName} فاز باللعبة</p>
          <div className="flex flex-col items-center gap-3">
            {mode === 'bot' && (
              <button onClick={startBotGame} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg border-2 border-emerald-800">
                <RotateCcw size={18} /> العب مرة أخرى
              </button>
            )}
            {mode === 'online' && amHost && (
              <button onClick={rematchSession} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg border-2 border-emerald-800">
                <RotateCcw size={18} /> جولة جديدة بنفس الأصدقاء
              </button>
            )}
            {mode === 'online' && !amHost && (
              <p className="text-amber-200/50 text-xs">المضيف يقدر يبدأ جولة جديدة بنفس اللاعبين</p>
            )}
            <button onClick={goMenu} className="inline-flex items-center gap-2 bg-stone-700 hover:bg-stone-600 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg border-2 border-stone-900">
              <ArrowRight size={18} /> القائمة الرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- playing ----
  if (screen !== 'playing' || players.length < 2) return null;

  const me = players[myIndex];
  const currentPlayerName = players[currentIdx] ? players[currentIdx].name : '';
  const nextIdx = players.length > 1 ? (currentIdx + 1) % players.length : currentIdx;
  const myTurn = currentIdx === myIndex;
  const timerColor = timeLeft <= Math.min(3, turnSeconds) ? 'text-rose-400' : timeLeft <= turnSeconds * 0.3 ? 'text-amber-300' : 'text-emerald-300';

  return (
    <div dir="rtl" style={{ ...cairo, ...woodBgStyle, ...safeAreaPlay }} className="min-h-screen flex flex-col">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto flex flex-col flex-1">
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {players.map((p, i) => {
          const isCurrent = i === currentIdx;
          const isNext = i === nextIdx && !isCurrent;
          return (
            <div
              key={p.id}
              style={isCurrent ? {} : woodPanelDarkStyle}
              className={`relative px-3 py-1.5 rounded-full text-sm font-bold border-2 transition-all ${
                isCurrent ? 'bg-emerald-700 border-emerald-300 text-white scale-105'
                : isNext ? 'border-amber-400 text-amber-100'
                : 'border-amber-950 text-amber-200'
              }`}
            >
              {isNext && (
                <span className="absolute -top-2 -left-1 text-[10px] font-black bg-amber-500 text-stone-900 rounded-full px-1.5 leading-4">
                  التالي
                </span>
              )}
              {p.name}{i === myIndex ? ' (أنت)' : ''} · {p.hand.length}
            </div>
          );
        })}
      </div>

      {mode === 'online' && (
        <div className="flex items-center justify-center gap-4 mb-2">
          <button
            onClick={leaveSession}
            className="flex items-center gap-1.5 text-amber-200/60 hover:text-rose-300 text-xs font-bold"
          >
            <ArrowRight size={14} /> مغادرة
          </button>
          {amHost && (
            <button
              onClick={togglePause}
              className="flex items-center gap-1.5 text-amber-200/60 hover:text-amber-100 text-xs font-bold"
            >
              {paused ? <><PlayCircle size={14} /> استئناف</> : <><PauseCircle size={14} /> إيقاف مؤقت</>}
            </button>
          )}
        </div>
      )}

      {mode === 'online' && communityMode && (
        <div className="flex justify-center mb-2">
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-amber-200 bg-amber-950/50 border border-amber-700 rounded-full px-3 py-1">
            <Gavel size={12} /> وضع حكم اللاعبين مفعّل — كل كلمة قابلة للاعتراض
          </span>
        </div>
      )}

      {myTurn && !paused && prepTimeLeft === 0 && !pendingMove && (
        <div className="mb-3 text-center rounded-2xl py-2 px-4 bg-emerald-600 border-2 border-emerald-300 animate-pulse shadow-lg">
          <p className="text-white font-black text-lg">🔔 دورك الآن يا {me.name}!</p>
        </div>
      )}

      {paused ? (
        <div className="flex items-center justify-center gap-2 mb-2">
          <PauseCircle size={18} className="text-amber-300" />
          <span className="text-amber-200 text-sm font-bold">اللعبة متوقفة مؤقتًا{amHost ? '' : ' من المضيف'}</span>
        </div>
      ) : prepTimeLeft > 0 ? (
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-amber-200 text-sm font-bold">
            استعد! تبدأ المباراة خلال <span className="text-emerald-300 text-xl tabular-nums">{prepTimeLeft}</span> ثانية
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock size={18} className={timerColor} />
          <span className={`text-2xl font-black tabular-nums ${timerColor}`}>{formatTime(timeLeft)}</span>
        </div>
      )}

      {mode === 'online' && amHost && (
        <div className="flex justify-center mb-2">
          <button
            onClick={() => setShowLetterPanel(true)}
            className="flex items-center gap-1.5 text-amber-200/60 hover:text-amber-100 text-xs font-bold"
          >
            <Settings2 size={14} /> ضبط حروف البنك
          </button>
        </div>
      )}

      {showLetterPanel && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50" onClick={() => setShowLetterPanel(false)}>
          <div style={woodPanelStyle} className="rounded-2xl p-5 border-4 border-amber-950 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3">
              <p className="text-amber-100 font-bold flex items-center gap-2"><Ban size={18} /> استبعاد حروف من البنك</p>
              <button onClick={() => setShowLetterPanel(false)} className="text-amber-200/60 hover:text-amber-100"><X size={20} /></button>
            </div>
            <p className="text-amber-200/50 text-xs mb-3">يطبّق فورًا على السحب القادم لكل اللاعبين — تقدر تعدّله بأي وقت.</p>
            <LetterExcludePicker excluded={excludedLetters} onToggle={toggleLiveExcludedLetter} />
          </div>
        </div>
      )}


      <div className="flex-1 flex flex-col items-center justify-center">
        <div style={woodPanelStyle} className="rounded-3xl border-4 border-amber-950 p-3 shadow-2xl mb-4 w-full">
          <div className="bg-emerald-900 rounded-2xl border-2 border-emerald-950 p-6">
            <p className="text-emerald-300 text-center text-xs font-bold mb-4 tracking-wide">كلمة الطاولة</p>
            <div className="flex gap-3 justify-center">
              {tableWord.map((letter, pos) => (
                <button
                  key={pos}
                  onClick={() => handleTableClick(pos)}
                  disabled={!myTurn || !!pendingMove || prepTimeLeft > 0 || paused}
                  className={`relative w-14 h-14 sm:w-20 sm:h-20 rounded-xl bg-amber-100 border-2 border-amber-800 text-stone-900 font-black text-2xl sm:text-4xl shadow-lg transition-all hover:scale-105 hover:border-emerald-500 disabled:opacity-70 ${
                    flipPos === pos ? 'scale-125 bg-emerald-200' : ''
                  } ${selectedHand !== null ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-emerald-900' : ''}`}
                >
                  {letter}
                  {tableStarFlags[pos] && <span className="absolute -top-1.5 -left-1.5 text-xs">⭐</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {pendingMove && (
          <div style={woodPanelStyle} className="rounded-2xl p-4 border-2 border-amber-950 mb-4 w-full">
            <p className="text-amber-200/70 text-xs font-bold text-center mb-2">
              {players[pendingMove.moverIndex]?.name} يقترح
            </p>
            <div className="flex gap-2 justify-center mb-3">
              {pendingMove.candidateWord.split('').map((ch, i) => (
                <span
                  key={i}
                  className={`w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg font-black text-xl sm:text-2xl border-2 ${
                    i === pendingMove.pos ? 'bg-amber-200 border-amber-600 animate-pulse' : 'bg-amber-100 border-amber-800'
                  } text-stone-900`}
                >
                  {ch}
                </span>
              ))}
            </div>

            {!pendingMove.disputed ? (
              <>
                <p className="text-emerald-300 text-center text-sm font-bold mb-3">
                  تُقبل تلقائيًا خلال {objectionTimeLeft} ثانية
                </p>
                {pendingMove.moverIndex !== myIndex && (
                  <button
                    onClick={objectToMove}
                    className="w-full flex items-center justify-center gap-2 bg-rose-800 hover:bg-rose-700 border-2 border-rose-500 text-white font-bold py-2.5 rounded-xl"
                  >
                    <AlertTriangle size={18} /> اعتراض
                  </button>
                )}
              </>
            ) : amHost ? (
              <>
                <p className="text-rose-300 text-center text-sm font-bold mb-3">تم الاعتراض — قرارك أنت كمضيف</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => resolvePendingMove('accept')}
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 border-2 border-emerald-400 text-white font-bold py-2.5 rounded-xl"
                  >
                    <Check size={18} /> صحيحة
                  </button>
                  <button
                    onClick={() => resolvePendingMove('reject')}
                    className="flex-1 flex items-center justify-center gap-2 bg-rose-800 hover:bg-rose-700 border-2 border-rose-500 text-white font-bold py-2.5 rounded-xl"
                  >
                    <X size={18} /> خاطئة
                  </button>
                </div>
              </>
            ) : (
              <p className="text-rose-300 text-center text-sm font-bold">تم الاعتراض — بانتظار قرار المضيف</p>
            )}
          </div>
        )}

        {starPicker && (
          <div style={woodPanelStyle} className="rounded-2xl p-4 border-2 border-amber-950 mb-4 w-full">
            <p className="text-amber-50 text-sm font-bold mb-3 text-center">⭐ اختر الحرف الذي تريد أن تمثله النجمة</p>
            <div className="flex flex-wrap gap-1.5 justify-center max-h-40 overflow-y-auto">
              {ARABIC_LETTERS.map((l) => (
                <button
                  key={l}
                  onClick={() => handleStarLetterChoice(l)}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg font-black text-lg sm:text-xl bg-amber-50 border-2 border-amber-800 text-stone-900 hover:border-emerald-500 hover:bg-emerald-100"
                >
                  {l}
                </button>
              ))}
            </div>
            <button onClick={() => setStarPicker(null)} className="w-full mt-3 text-amber-200/60 hover:text-amber-100 text-xs font-bold">
              إلغاء
            </button>
          </div>
        )}

        <p className={`text-center font-bold min-h-[2.5rem] px-4 ${msgColor}`}>{message}</p>
        {!myTurn && !pendingMove && <p className="text-amber-200/50 text-xs">بانتظار {currentPlayerName}...</p>}
        {mode === 'bot' && <p className="text-amber-200/40 text-xs mt-1">الجولة {roundNumber}</p>}
      </div>

      <div style={woodPanelStyle} className="rounded-2xl p-4 border-4 border-amber-950 mt-2">
        <p className="text-amber-50 text-sm font-bold mb-3 text-center">حروفك</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {me.hand.map((letter, idx) => (
            <button
              key={idx}
              onClick={() => handleHandClick(idx)}
              disabled={!myTurn || !!pendingMove || prepTimeLeft > 0 || paused}
              className={`w-11 h-11 sm:w-14 sm:h-14 rounded-lg font-black text-xl sm:text-2xl border-2 transition-all disabled:opacity-60 ${
                selectedHand === idx
                  ? 'bg-emerald-500 border-emerald-300 text-white scale-110'
                  : letter === STAR
                    ? 'bg-purple-100 border-purple-500 text-purple-700 hover:border-purple-700'
                    : 'bg-amber-50 border-amber-800 text-stone-900 hover:border-amber-950'
              }`}
            >
              {letter === STAR ? '⭐' : letter}
            </button>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
