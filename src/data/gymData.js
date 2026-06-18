/* ==========================================================================
   MILANO GYM - Real Data File (Scraped from Facebook Page)
   Contains actual subscription plans, branches, trainers, shop items, events
   ========================================================================== */

export const subscriptionPlans = [
  {
    id: '1-month',
    name: 'اشتراك شهري (حديد)',
    price: 400,
    period: 'شهر واحد',
    tag: 'الأكثر شعبية للمبتدئين',
    features: [
      'دخول غير محدود لصالة الحديد والأجهزة',
      'برنامج تدريبي مجاني للمبتدئين',
      'متابعة الوزن ونسبة الدهون عند الاشتراك',
      'استخدام غرف تغيير الملابس والخزائن'
    ]
  },
  {
    id: '3-month-new',
    name: 'اشتراك 3 شهور (جديد)',
    price: 1050,
    period: '3 شهور',
    tag: 'توفير ممتاز',
    features: [
      'دخول غير محدود لصالة الحديد والأجهزة طوال الـ 3 أشهر',
      'برنامج تدريبي مخصص لكل شهر',
      'قياس InBody مجاني مرتين خلال فترة الاشتراك',
      'استخدام غرف تغيير الملابس والخزائن'
    ]
  },
  {
    id: '3-month-cardio',
    name: 'اشتراك 3 شهور + كارديو',
    price: 1550,
    period: '3 شهور',
    tag: 'شامل اللياقة والكارديو',
    features: [
      'دخول صالة الحديد + صالة الكارديو والأجهزة الهوائية',
      'خطة تدريب وتخسيس مكثفة',
      'قياس InBody مجاني شهرياً (3 مرات)',
      'استشارات تغذية أساسية مع الكابتن'
    ]
  },
  {
    id: '6-month-new',
    name: 'اشتراك 6 شهور (جديد)',
    price: 2200,
    period: '6 شهور',
    tag: 'التحدي الحقيقي للضخامة',
    features: [
      'دخول كامل وغير محدود لصالة الحديد والأجهزة لمدة 6 أشهر',
      'برنامج تدريب متطور وتحديث دوري',
      'قياس InBody مجاني 6 مرات (مرة كل شهر)',
      'تجميد الاشتراك (Freeze) لمدة 15 يوماً مجاناً'
    ]
  },
  {
    id: '6-month-cardio',
    name: 'اشتراك 6 شهور + كارديو',
    price: 2650,
    period: '6 شهور',
    tag: 'الباقة الشاملة VIP',
    features: [
      'دخول صالة الحديد + صالة الكارديو والتخسيس',
      'برنامج متكامل (تخسيس / ضخامة عضلية)',
      'قياس InBody مجاني غير محدود ومتابعة أسبوعية',
      'تجميد الاشتراك (Freeze) لمدة 30 يوماً مجاناً',
      'خصم 10% على جميع المكملات من متجر الجيم'
    ]
  }
];

export const branches = [
  {
    id: 1,
    name: 'ميلانو جيم 1 - فرع الحنيفية',
    address: 'أول مدخل شارع الحنيفية، شارع البيطاش، العجمي، الإسكندرية',
    phone: '03 4356217',
    hours: 'من 6:00 صباحاً حتى 2:00 بعد منتصف الليل',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3413.784260271501!2d29.7807604760592!3d31.123383966952876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c3ad5d35efb9%3A0xe54e6027e69d7bdf!2sMillano%20Gym!5e0!3m2!1sar!2seg!4v1781816912000!5m2!1sar!2seg',
    mapsLink: 'https://goo.gl/maps/GxQ7FD8GEKkk3SDX7',
    features: ['صالة حديد ضخمة', 'أجهزة مستوردة بالكامل', 'صالة كارديو منفصلة', 'قسم مكملات غذائية']
  },
  {
    id: 2,
    name: 'ميلانو جيم 2 - فرع العوضي',
    address: 'أول مدخل شارع البيطاش، أمام كبدة الحرش، العجمي، الإسكندرية',
    phone: '03 4356217',
    hours: 'من 6:00 صباحاً حتى 2:00 بعد منتصف الليل',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3413.917409295551!2d29.790718576059045!3d31.119717567132952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c3453b05f2bf%3A0x6739de863d03bb6c!2z2YXZitmE2KfZhtmIINit2YrZhSAy!5e0!3m2!1sar!2seg!4v1781816913000!5m2!1sar!2seg',
    mapsLink: 'https://goo.gl/maps/dB8DfbdaiazpaNKj8',
    features: ['مساحة واسعة جداً', 'منطقة تمرين وظيفي (CrossFit)', 'تكييف مركزي', 'موقف سيارات']
  }
];

export const trainers = [
  {
    id: 1,
    name: 'كابتن أحمد ميلانو',
    role: 'المدير الفني ومؤسس الجيم',
    image: '/images/coach1.jpg',
    specialties: ['كمال أجسام', 'تأهيل إصابات ملاعب', 'تغذية علاجية'],
    experience: 'خبرة أكثر من 12 سنة في تدريب وتأسيس أبطال كمال الأجسام.',
    rating: 4.9,
    reviews: 148,
    isAvailable: true
  },
  {
    id: 2,
    name: 'كابتن سيد أبوالدهب',
    role: 'مدرب شخصي وخبير تنشيف وضخامة عضلية',
    image: '/images/coach2.jpg',
    specialties: ['برامج تنشيف (Cutting)', 'برامج ضخامة عضلية (Bulking)', 'تصميم خطط الدايت'],
    experience: 'خبير تحويل الأجسام، يساعدك على الوصول لهدفك بخطة تدريبية وتغذية مخصصة 100%.',
    rating: 4.8,
    reviews: 112,
    isAvailable: true
  },
  {
    id: 3,
    name: 'كابتن سيف',
    role: 'مدرب اللياقة البدنية والتحول الرياضي',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=400',
    specialties: ['تحويل الطاقة والكسل لنشاط', 'كروس فيت', 'بناء اللياقة البدنية'],
    experience: 'متواجد يومياً من 12 ظهراً حتى 5 مساءً لمساعدتك في التخلص من كسل الصيف واستعادة رشاقتك.',
    rating: 4.9,
    reviews: 84,
    isAvailable: true
  },
  {
    id: 4,
    name: 'كابتن إسلام أحمد',
    role: 'المدرب المسؤول بفرع العوضي',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400',
    specialties: ['فتنس وصحة عامة', 'كارديو وتخسيس', 'متابعة وتأهيل مشتركين الجيم'],
    experience: 'مشرف على صالة التدريب وفرع العوضي وخبير حرق الدهون والفتنس.',
    rating: 4.7,
    reviews: 76,
    isAvailable: true
  }
];

export const products = [
  {
    id: 'p1',
    name: 'Whey Protein Gold Standard (900g)',
    arabicName: 'واي بروتين جولد ستاندرد',
    price: 1850,
    category: 'protein',
    image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&q=80&w=400',
    description: 'البروتين الأفضل لبناء العضلات وسرعة الاستشفاء بعد التمرين.'
  },
  {
    id: 'p2',
    name: 'Creatine Monohydrate (300g)',
    arabicName: 'كرياتين مونوهيدرات نقي',
    price: 890,
    category: 'creatine',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=400',
    description: 'لزيادة القوة البدنية، الطاقة العضلية، وضخ الدم أثناء التمارين الصعبة.'
  },
  {
    id: 'p3',
    name: 'C4 Original Pre-Workout',
    arabicName: 'سي فور طاقة باور',
    price: 1200,
    category: 'preworkout',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=400',
    description: 'تركيبة الباور والطاقة القصوى للتركيز العالي وقدرة التحمل الخارقة.'
  },
  {
    id: 'p4',
    name: 'BCAA Amino Energy (30 Servings)',
    arabicName: 'أمينو إنرجي BCAA',
    price: 1100,
    category: 'amino',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400',
    description: 'لحماية العضلات من الهدم وتزويد الجسم بالطاقة أثناء الكارديو والتمرين.'
  },
  {
    id: 'p5',
    name: 'Milano Gym Shaker Bottle (700ml)',
    arabicName: 'شيكر ميلانو الأصلي',
    price: 250,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1594737625753-cfd027551488?auto=format&fit=crop&q=80&w=400',
    description: 'شيكر عالي الجودة مانع للتسريب مع كرة خلط وشعار ميلانو جيم.'
  },
  {
    id: 'p6',
    name: 'Quest Protein Bar (Box of 12)',
    arabicName: 'علبة كويست بروتين بار',
    price: 750,
    category: 'protein',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400',
    description: 'سناك صحي غني بالبروتين والألياف وقليل السعرات بدون سكر مضاف.'
  }
];

export const gymEvents = [
  {
    id: 'e1',
    title: 'بطولة ميلانو للقوة البدنية 2026',
    date: '25 يوليو 2026',
    time: '4:00 مساءً',
    branch: 'فرع الحنيفية',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600',
    description: 'البطولة السنوية لتحدي الـ Bench Press والـ Deadlift والـ Squat مع جوائز مالية وميداليات لأصحاب المراكز الأولى.',
    ticketPrice: '100 جنيه للمشاركة'
  },
  {
    id: 'e2',
    title: 'ندوة التغذية والضخامة العضلية الصحيحة',
    date: '10 أغسطس 2026',
    time: '7:00 مساءً',
    branch: 'فرع العوضي',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=600',
    description: 'محاضرة تفاعلية مع كابتن أحمد ميلانو وكابتن سيد أبوالدهب حول التخطيط السليم للوجبات وكيفية حساب الكالوري والمكملات الضرورية.',
    ticketPrice: 'مجانًا لجميع الأعضاء المشتركين'
  },
  {
    id: 'e3',
    title: 'تحدي حرق الدهون واللياقة المكثف',
    date: '1 سبتمبر 2026',
    time: '6:00 صباحاً',
    branch: 'جميع الفروع',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=600',
    description: 'برنامج حرق دهون جماعي وتحدي كارديو وفتنس يستمر لمدة 30 يوماً متواصلة مع متابعة أسبوعية وتكريم لأكثر الملتزمين.',
    ticketPrice: '200 جنيه للمشتركين'
  }
];

export const mockAnnouncements = [
  {
    id: 'a1',
    title: 'خصم خاص جداً 22% بفرع العوضي! 🔥',
    content: 'خصم فوري وحصري 22% على الاشتراكات بفرع العوضي مع كابتن إسلام أحمد. اشترك الآن وبلش تمرينك بقوة!',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'a2',
    title: 'كابتن سيد أبو الدهب ينضم للفريق! 🏋️',
    content: 'احصل على برنامجك التدريبي والغذائي المخصص للتنشيف أو الضخامة العضلية مع كابتن سيد أبو الدهب واستعد لتحول كامل لجسمك!',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'a3',
    title: 'تخلص من كسل الصيف مع كابتن سيف! ⚡',
    content: 'كابتن سيف متواجد يومياً من 12:00 ظهراً حتى 5:00 مساءً لمساعدتك على استعادة لياقتك البدنية وحرق دهون الصيف الزائدة.',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=600'
  }
];
