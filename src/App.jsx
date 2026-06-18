import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { 
  Phone, Lock, User, Calendar, MapPin, CreditCard, ChevronLeft, ChevronRight, 
  Plus, Minus, ShoppingBag, Eye, EyeOff, Search, Compass, Clock, Award, Star,
  Bell, CheckCircle2, ChevronDown, Check, LogOut, ShieldAlert, Sparkles, QrCode
} from 'lucide-react';

// Import local assets/data
import MobileContainer from './components/MobileContainer';
import BottomNav from './components/BottomNav';
import { 
  subscriptionPlans, branches, trainers, products, gymEvents, mockAnnouncements 
} from './data/gymData';

export default function App() {
  // Navigation & Session State
  const [screen, setScreen] = useState('splash');
  const [user, setUser] = useState({
    name: 'محمد علي',
    phone: '01012345678',
    branchId: 1,
    planId: '3-month-new',
    joinDate: '12 مايو 2026',
    expiryDate: '12 أغسطس 2026',
    memberId: 'ML-9821'
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Form States
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerAge, setRegisterAge] = useState('');
  const [registerPass, setRegisterPass] = useState('');
  const [registerBranch, setRegisterBranch] = useState(1);
  const [registerPlan, setRegisterPlan] = useState('1-month');

  // Shop & Cart States
  const [cart, setCart] = useState([]);
  const [shopCategory, setShopCategory] = useState('all');
  const [shopSearch, setShopSearch] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Locations States
  const [activeBranch, setActiveBranch] = useState(branches[0]);

  // Trainers States
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  // Events States
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [joinedEvents, setJoinedEvents] = useState([]);

  // Active Promo Slider State
  const [promoIndex, setPromoIndex] = useState(0);

  // Auto transition for Splash Screen
  useEffect(() => {
    if (screen === 'splash') {
      const timer = setTimeout(() => {
        setScreen('login');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  // Auto slide for promo announcements
  useEffect(() => {
    if (screen === 'dashboard') {
      const timer = setInterval(() => {
        setPromoIndex((prev) => (prev + 1) % mockAnnouncements.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [screen]);

  // Toast Helpers
  const notifySuccess = (msg) => toast.success(msg, {
    style: { background: '#1c1c1e', color: '#fff', border: '1px solid rgba(255,215,0,0.2)' },
    iconTheme: { primary: '#ffd700', secondary: '#000' }
  });

  const notifyError = (msg) => toast.error(msg, {
    style: { background: '#1c1c1e', color: '#fff', border: '1px solid rgba(239,68,68,0.2)' }
  });

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginPhone) return notifyError('برجاء إدخال رقم الهاتف');
    if (!loginPass) return notifyError('برجاء إدخال كلمة المرور');
    
    setIsLoggedIn(true);
    setScreen('dashboard');
    notifySuccess(`أهلاً بك مجدداً في ميلانو جيم!`);
  };

  // Register handler
  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerName) return notifyError('برجاء إدخال الاسم كاملاً');
    if (registerPhone.length < 11) return notifyError('برجاء إدخال رقم هاتف صحيح');
    if (!registerPass) return notifyError('برجاء إدخال كلمة المرور');

    const selectedPlanObj = subscriptionPlans.find(p => p.id === registerPlan);
    const selectedBranchObj = branches.find(b => b.id === Number(registerBranch));

    setUser({
      name: registerName,
      phone: registerPhone,
      branchId: Number(registerBranch),
      planId: registerPlan,
      joinDate: 'اليوم',
      expiryDate: registerPlan.includes('1-month') ? 'بعد شهر' : registerPlan.includes('3-month') ? 'بعد 3 أشهر' : 'بعد 6 أشهر',
      memberId: 'ML-' + Math.floor(1000 + Math.random() * 9000)
    });

    setIsLoggedIn(true);
    setScreen('dashboard');
    notifySuccess(`تم تسجيل عضوية جديدة بنجاح في ${selectedBranchObj.name}`);
  };

  // Cart operations
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        notifySuccess(`تمت زيادة كمية ${product.arabicName}`);
        return prevCart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      notifySuccess(`تمت إضافة ${product.arabicName} إلى السلة`);
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prevCart) => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const checkoutCart = () => {
    setOrderComplete(true);
    setCart([]);
    notifySuccess('تم تأكيد طلبك! جاهز للاستلام من الكاونتر بالجيم');
  };

  // RENDER SCREENS
  
  // 1. Splash Screen
  const renderSplash = () => (
    <div className="flex-grow flex flex-col items-center justify-center p-6 text-center h-full min-h-[450px]">
      <div className="relative w-44 h-44 flex items-center justify-center mb-6 animate-logo">
        <div className="absolute inset-0 bg-gym-gold/15 rounded-full blur-3xl animate-pulse"></div>
        <img 
          src="/images/logo.png" 
          alt="Milano GYM Logo" 
          className="w-40 h-40 object-contain z-10"
        />
      </div>
      <motion.h1 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-4xl font-extrabold tracking-wider bg-gradient-to-r from-gym-gold to-white bg-clip-text text-transparent"
      >
        MILANO GYM
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="text-xs uppercase tracking-[0.3em] text-gym-gray mt-2 font-mono"
      >
        H Team - Premium Club
      </motion.p>
    </div>
  );

  // 2. Login Screen
  const renderLogin = () => (
    <div 
      className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 min-h-[600px] h-full bg-cover bg-center"
      style={{ backgroundImage: `linear-gradient(to top, rgba(5,5,7,0.95) 40%, rgba(5,5,7,0.8) 100%), url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200')` }}
    >
      <div className="w-full max-w-md rounded-2xl glass-panel-heavy p-6 md:p-8 border border-white/10 shadow-2xl flex flex-col justify-between z-10 my-auto">
        <div className="flex flex-col items-center mb-6">
          <img src="/images/logo.png" alt="Milano GYM" className="w-18 h-18 object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]" />
          <h2 className="text-xl font-bold text-white mt-3.5">تسجيل الدخول</h2>
          <p className="text-gym-gray text-xs mt-1">سجل دخولك لمتابعة تدريبك واشتراكك</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gym-gray mb-1.5 mr-1">رقم الهاتف</label>
            <div className="relative">
              <input 
                type="tel" 
                placeholder="01xxxxxxxxx"
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
                className="w-full h-11 rounded-xl bg-[#121214]/90 border border-white/10 px-4 text-sm text-white focus:outline-none focus:border-gym-gold transition font-mono text-left"
                style={{ direction: 'ltr' }}
              />
              <Phone size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-gym-gray" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 px-1">
              <label className="text-xs font-semibold text-gym-gray">كلمة المرور</label>
              <a href="#" onClick={(e) => { e.preventDefault(); notifySuccess('برجاء مراجعة الكاونتر بالجيم لاستعادة كلمة المرور'); }} className="text-[10px] text-gym-gold font-medium">نسيت كلمة المرور؟</a>
            </div>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                className="w-full h-11 rounded-xl bg-[#121214]/90 border border-white/10 px-10 text-sm text-white focus:outline-none focus:border-gym-gold transition"
              />
              <Lock size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-gym-gray" />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gym-gray hover:text-white"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full h-11 rounded-xl bg-gym-gold hover:bg-gym-gold-dark text-black font-bold text-sm shadow-lg shadow-gym-gold/25 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer mt-2"
          >
            تسجيل الدخول
          </button>
        </form>

        <div className="text-center mt-6 flex flex-col space-y-3">
          <p className="text-xs text-gym-gray">
            ليس لديك حساب؟{' '}
            <button 
              onClick={() => setScreen('register')}
              className="text-gym-gold font-bold hover:underline cursor-pointer"
            >
              سجّل كعضو جديد
            </button>
          </p>
          <div className="flex items-center justify-center space-x-2 space-x-reverse text-[10px] text-gym-gray bg-white/5 py-2 px-3 rounded-lg max-w-xs mx-auto">
            <Sparkles size={12} className="text-gym-gold" />
            <span>يمكنك الضغط على زر الدخول مباشرة للتجربة</span>
          </div>
        </div>
      </div>
    </div>
  );

  // 3. Register Screen
  const renderRegister = () => (
    <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 min-h-[600px] overflow-y-auto no-scrollbar pb-10">
      <div className="w-full max-w-md rounded-2xl bg-[#0e0e11]/90 border border-white/5 p-6 md:p-8 shadow-2xl flex flex-col z-10 my-auto">
        <div className="flex flex-col items-center mb-5">
          <img src="/images/logo.png" alt="Milano GYM" className="w-16 h-16 object-contain" />
          <h2 className="text-xl font-bold text-white mt-2">عضوية جديدة</h2>
          <p className="text-gym-gray text-xs mt-0.5">سجل بياناتك للانضمام فوراً إلى Milano GYM</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-gym-gray mb-1">الاسم بالكامل</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="الاسم ثلاثي"
                required
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                className="w-full h-10 rounded-xl bg-[#121214]/90 border border-white/5 px-4 text-sm text-white focus:outline-none focus:border-gym-gold transition"
              />
              <User size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-gym-gray" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gym-gray mb-1">رقم الهاتف</label>
            <div className="relative">
              <input 
                type="tel" 
                placeholder="01xxxxxxxxx"
                required
                value={registerPhone}
                onChange={(e) => setRegisterPhone(e.target.value)}
                className="w-full h-10 rounded-xl bg-[#121214]/90 border border-white/5 px-4 text-sm text-white focus:outline-none focus:border-gym-gold transition font-mono text-left"
                style={{ direction: 'ltr' }}
              />
              <Phone size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-gym-gray" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gym-gray mb-1">السن</label>
              <div className="relative">
                <input 
                  type="number" 
                  placeholder="23"
                  value={registerAge}
                  onChange={(e) => setRegisterAge(e.target.value)}
                  className="w-full h-10 rounded-xl bg-[#121214]/90 border border-white/5 px-4 text-sm text-white focus:outline-none focus:border-gym-gold transition font-mono text-left"
                  style={{ direction: 'ltr' }}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gym-gray mb-1">كلمة المرور</label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="••••••"
                  required
                  value={registerPass}
                  onChange={(e) => setRegisterPass(e.target.value)}
                  className="w-full h-10 rounded-xl bg-[#121214]/90 border border-white/5 px-4 text-sm text-white focus:outline-none focus:border-gym-gold transition"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gym-gray mb-1">اختر الفرع المفضل</label>
            <select 
              value={registerBranch}
              onChange={(e) => setRegisterBranch(Number(e.target.value))}
              className="w-full h-10 rounded-xl bg-[#121214]/90 border border-white/5 px-4 text-sm text-white focus:outline-none focus:border-gym-gold transition cursor-pointer"
            >
              {branches.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gym-gray mb-1">اختر باقة الاشتراك</label>
            <select 
              value={registerPlan}
              onChange={(e) => setRegisterPlan(e.target.value)}
              className="w-full h-10 rounded-xl bg-[#121214]/90 border border-white/5 px-4 text-sm text-white focus:outline-none focus:border-gym-gold transition cursor-pointer"
            >
              {subscriptionPlans.map(p => (
                <option key={p.id} value={p.id}>{p.name} - {p.price} ج</option>
              ))}
            </select>
          </div>

          <button 
            type="submit"
            className="w-full h-10 rounded-xl bg-gym-gold hover:bg-gym-gold-dark text-black font-bold text-sm shadow-lg shadow-gym-gold/10 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer mt-3"
          >
            سجل واشترك الآن
          </button>
        </form>

        <p className="text-center text-xs text-gym-gray mt-5">
          لديك حساب بالفعل؟{' '}
          <button 
            onClick={() => setScreen('login')}
            className="text-gym-gold font-bold hover:underline cursor-pointer"
          >
            تسجيل الدخول
          </button>
        </p>
      </div>
    </div>
  );

  // 4. Home Dashboard Screen
  const renderDashboard = () => {
    const activePlan = subscriptionPlans.find(p => p.id === user.planId) || subscriptionPlans[0];
    const userBranch = branches.find(b => b.id === user.branchId) || branches[0];

    return (
      <div className="flex-1 flex flex-col p-4 sm:p-5 md:p-6 overflow-y-auto no-scrollbar space-y-6">
        
        {/* Header bar (Mobile greeting, Hidden on desktop/header) */}
        <div className="flex justify-between items-center md:hidden border-b border-white/5 pb-3">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 rounded-full border border-gym-gold/20 bg-gym-card flex items-center justify-center overflow-hidden">
              <img src="/images/logo.png" alt="Profile" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <p className="text-gym-gray text-[9px]">أهلاً بك بطل</p>
              <h3 className="text-xs font-bold text-white leading-tight">{user.name}</h3>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5 flex items-center space-x-1.5 space-x-reverse">
              <span className="w-1.2 h-1.2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[9px] text-emerald-400 font-bold">نشط</span>
            </div>
            <button 
              onClick={() => notifySuccess('لا توجد إشعارات جديدة')}
              className="w-8 h-8 rounded-lg bg-gym-card border border-white/5 flex items-center justify-center text-white hover:bg-gym-card-hover relative"
            >
              <Bell size={14} />
              <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-gym-gold"></span>
            </button>
          </div>
        </div>

        {/* Responsive Desktop Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Column 1: Member Card & Status info */}
          <div className="flex flex-col space-y-5">
            <div 
              onClick={() => setScreen('my-id')}
              className="relative rounded-2xl p-5 overflow-hidden flex flex-col justify-between h-44 gold-glow cursor-pointer border border-gym-gold/20 bg-gradient-to-br from-[#1c1c1e] to-[#0c0c0e] hover:border-gym-gold/40 transition-all duration-300"
            >
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gym-gold/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex justify-between items-start z-10">
                <div>
                  <span className="text-[10px] text-gym-gold font-bold uppercase tracking-wider bg-gym-gold/10 px-2.5 py-0.5 rounded">عضوية بريميوم</span>
                  <h4 className="text-base font-bold text-white mt-2">{activePlan.name}</h4>
                </div>
                <QrCode size={26} className="text-gym-gold" />
              </div>

              <div className="flex justify-between items-end z-10 border-t border-white/5 pt-3">
                <div>
                  <p className="text-[9px] text-gym-gray">كود العضوية</p>
                  <p className="text-xs font-mono font-bold text-white tracking-wide">{user.memberId}</p>
                </div>
                <div className="text-left">
                  <p className="text-[9px] text-gym-gray">ينتهي في</p>
                  <p className="text-xs font-bold text-gym-gold">{user.expiryDate}</p>
                </div>
              </div>
            </div>

            {/* Gym Status & Suggested Workout */}
            <div className="rounded-2xl p-4.5 bg-gym-card border border-white/5 flex flex-col space-y-3.5">
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Compass size={15} className="text-gym-gold" />
                  <h4 className="text-xs font-bold text-white">حالة {userBranch.name}</h4>
                </div>
                <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">مناسب للتمرين حالياً</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center space-x-1.5 space-x-reverse text-gym-gray">
                  <Clock size={13} />
                  <span>الإشغال الحالي للفرع:</span>
                </div>
                <span className="font-mono font-bold text-white">40% (25 لاعب)</span>
              </div>

              <div className="bg-gym-gold/5 border border-gym-gold/10 rounded-xl p-2.5 flex items-center space-x-2.5 space-x-reverse">
                <div className="bg-gym-gold/10 text-gym-gold p-1.5 rounded-lg">
                  <Clock size={13} className="animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <div>
                  <p className="text-[9px] text-gym-gold font-bold">تمرين اليوم المقترح</p>
                  <p className="text-[11px] text-white/90 font-medium">سحب ظهر + بايسبس + كارديو 20 دقيقة</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Slider & Quick Nav actions */}
          <div className="flex flex-col space-y-5 lg:col-span-2">
            
            {/* Announcements Carousel */}
            <div className="relative rounded-2xl overflow-hidden bg-gym-card border border-white/5 h-44 flex flex-col justify-end p-5 shadow-lg">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.4) 100%), url('${mockAnnouncements[promoIndex].image}')` 
                }}
              ></div>
              
              <div className="z-10 flex flex-col space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] bg-gym-gold/20 text-gym-gold font-bold px-2.5 py-0.5 rounded">أخبار وعروض صالاتنا</span>
                  <div className="flex space-x-1 space-x-reverse">
                    {mockAnnouncements.map((_, idx) => (
                      <span 
                        key={idx} 
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          idx === promoIndex ? 'bg-gym-gold w-3.5' : 'bg-white/20'
                        }`}
                      ></span>
                    ))}
                  </div>
                </div>
                <h4 className="text-sm font-bold text-white mt-1.5">{mockAnnouncements[promoIndex].title}</h4>
                <p className="text-[10px] text-gym-gray line-clamp-2 leading-relaxed">{mockAnnouncements[promoIndex].content}</p>
              </div>
            </div>

            {/* Quick grid navigation links (Responsive column counts) */}
            <div>
              <h4 className="text-xs font-bold text-gym-gray mb-3 mr-1">خدمات وأقسام الجيم</h4>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  { id: 'my-id', label: 'هويتي (QR)', icon: QrCode, color: 'text-gym-gold bg-gym-gold/5 border-gym-gold/10' },
                  { id: 'plans', label: 'الاشتراكات', icon: CreditCard, color: 'text-blue-400 bg-blue-500/5 border-blue-500/10' },
                  { id: 'trainers', label: 'المدربين', icon: Award, color: 'text-indigo-400 bg-indigo-500/5 border-indigo-500/10' },
                  { id: 'shop', label: 'المتجر', icon: ShoppingBag, color: 'text-emerald-400 bg-emerald-500/5 border-emerald-500/10' },
                  { id: 'locations', label: 'الفروع', icon: MapPin, color: 'text-orange-400 bg-orange-500/5 border-orange-500/10' },
                  { id: 'events', label: 'الفعاليات', icon: Calendar, color: 'text-purple-400 bg-purple-500/5 border-purple-500/10' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setScreen(item.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border bg-gym-card hover:bg-gym-card-hover transition cursor-pointer text-center group ${item.color}`}
                    >
                      <Icon size={18} className="mb-1.5 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold text-white/90">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    );
  };

  // 5. Subscription Plans Screen
  const [activeTab, setActiveTab] = useState('iron');
  
  const renderPlans = () => {
    const plansToShow = activeTab === 'iron' 
      ? subscriptionPlans.filter(p => !p.id.includes('cardio'))
      : subscriptionPlans.filter(p => p.id.includes('cardio'));

    const selectPlan = (plan) => {
      setUser(prev => ({ ...prev, planId: plan.id }));
      notifySuccess(`تم تجديد الاشتراك بـ ${plan.name} بنجاح!`);
      setScreen('tracking');
    };

    return (
      <div className="flex-1 flex flex-col p-4 sm:p-5 md:p-6 overflow-y-auto no-scrollbar space-y-6">
        
        {/* Real Promo Card for 22% Facebook Discount */}
        <div className="rounded-2xl bg-gradient-to-r from-gym-gold/20 via-gym-gold/5 to-transparent border border-gym-gold/30 p-4.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5 space-x-reverse">
            <div className="p-2.5 rounded-xl bg-gym-gold/15 text-gym-gold mt-0.5">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">🔥 عرض خاص وحصري: خصم فوري 22%!</h4>
              <p className="text-[11px] text-gym-gray mt-1 leading-relaxed">
                خصم 22% على جميع باقات الاشتراكات عند التسجيل بفرع **العوضي** مع كابتن إسلام أحمد. العرض ساري لفترة محدودة جداً!
              </p>
            </div>
          </div>
          <button 
            onClick={() => {
              setUser(prev => ({ ...prev, branchId: 2 }));
              notifySuccess('تم تحويل فرعك المفضل إلى فرع العوضي للاستفادة بالخصم!');
            }}
            className="shrink-0 h-9 px-4 rounded-xl bg-gym-gold hover:bg-gym-gold-dark text-black text-xs font-bold transition active:scale-[0.98]"
          >
            تفعيل العرض بالفرع
          </button>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">باقات الاشتراك الأساسية</h2>
          <span className="text-[10px] text-gym-gray">اختر الباقة المناسبة لأهدافك</span>
        </div>

        {/* Tabs switcher */}
        <div className="flex bg-gym-card rounded-xl p-1 border border-white/5 max-w-md">
          <button 
            onClick={() => setActiveTab('iron')}
            className={`flex-1 text-center py-2.5 text-xs font-bold rounded-lg cursor-pointer transition ${
              activeTab === 'iron' ? 'bg-gym-gold text-black' : 'text-gym-gray hover:text-white'
            }`}
          >
            صالة الحديد والأجهزة
          </button>
          <button 
            onClick={() => setActiveTab('cardio')}
            className={`flex-1 text-center py-2.5 text-xs font-bold rounded-lg cursor-pointer transition ${
              activeTab === 'cardio' ? 'bg-gym-gold text-black' : 'text-gym-gray hover:text-white'
            }`}
          >
            الحديد + صالة الكارديو
          </button>
        </div>

        {/* Plans list (Responsive grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plansToShow.map((plan) => (
            <div 
              key={plan.id}
              className="rounded-2xl p-5 bg-gym-card border border-white/5 relative overflow-hidden flex flex-col justify-between hover:border-gym-gold/20 transition-all duration-300 shadow-md"
            >
              <div className="absolute right-0 top-0 w-24 h-24 bg-gym-gold/5 rounded-full blur-xl pointer-events-none"></div>
              
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-white">{plan.name}</h3>
                    <span className="text-[9px] text-gym-gold bg-gym-gold/10 px-2 py-0.5 rounded mt-1 inline-block font-bold">{plan.tag}</span>
                  </div>
                  <div className="text-left font-mono">
                    <span className="text-xl font-bold text-gym-gold">{plan.price}</span>
                    <span className="text-[9px] text-gym-gray mr-0.5">جنيه</span>
                    <p className="text-[9px] text-gym-gray font-sans">{plan.period}</p>
                  </div>
                </div>

                <div className="border-t border-white/5 my-4 pt-3">
                  <ul className="space-y-2.5 text-[11px] text-white/80">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center space-x-2 space-x-reverse">
                        <CheckCircle2 size={13} className="text-gym-gold shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button 
                onClick={() => selectPlan(plan)}
                className="w-full h-10 rounded-xl bg-gym-gold hover:bg-gym-gold-dark text-black font-bold text-xs tracking-wider cursor-pointer transition mt-4 active:scale-[0.98]"
              >
                اشترك الآن
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 6. Subscription Tracking Screen
  const renderTracking = () => {
    const activePlan = subscriptionPlans.find(p => p.id === user.planId) || subscriptionPlans[0];
    const userBranch = branches.find(b => b.id === user.branchId) || branches[0];
    
    return (
      <div className="flex-1 flex flex-col p-4 sm:p-5 md:p-6 overflow-y-auto no-scrollbar max-w-4xl mx-auto w-full space-y-6">
        <h2 className="text-xl font-bold text-white">تتبع اشتراكك الحالي</h2>

        {/* Responsive Flex / Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          
          {/* Active plan card details (Left) */}
          <div className="md:col-span-2 rounded-2xl p-5 bg-gym-card border border-white/5 relative overflow-hidden flex flex-col space-y-4 shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] text-gym-gray">باقة الاشتراك</p>
                <h3 className="text-base font-bold text-white mt-0.5">{activePlan.name}</h3>
              </div>
              <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">مفعّل ونشط</span>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-[10px] mb-1 px-0.5">
                <span className="text-gym-gray">تاريخ الانتهاء: {user.expiryDate}</span>
                <span className="text-gym-gold font-bold">متبقي 45 يوم</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gym-gold rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 text-xs">
              <div>
                <p className="text-[10px] text-gym-gray">تاريخ الاشتراك</p>
                <p className="font-bold text-white/90 mt-0.5">{user.joinDate}</p>
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gym-gray">الفرع المعتمد</p>
                <p className="font-bold text-white/90 mt-0.5">{userBranch.name.split(' - ')[1]}</p>
              </div>
            </div>
          </div>

          {/* Quick action actions (Right) */}
          <div className="rounded-2xl p-5 bg-gym-card border border-white/5 flex flex-col justify-center text-center space-y-3">
            <p className="text-xs text-gym-gray">هل أوشكت باقتك على الانتهاء؟ جددها مباشرة الآن.</p>
            <button 
              onClick={() => { setScreen('plans'); }}
              className="w-full h-10 rounded-xl bg-gym-gold hover:bg-gym-gold-dark text-black font-bold text-xs cursor-pointer transition active:scale-[0.98]"
            >
              تجديد أو ترقية الباقة
            </button>
          </div>
        </div>

        {/* Past Check-ins Logs (Full width below) */}
        <div>
          <h4 className="text-xs font-bold text-gym-gray mb-3 mr-1">سجل الحضور الأخير</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { date: '18 يونيو 2026', time: '07:30 م', branch: userBranch.name.split(' - ')[1] },
              { date: '16 يونيو 2026', time: '08:15 م', branch: userBranch.name.split(' - ')[1] },
              { date: '15 يونيو 2026', time: '06:45 م', branch: userBranch.name.split(' - ')[1] },
              { date: '13 يونيو 2026', time: '05:00 م', branch: userBranch.name.split(' - ')[1] },
            ].map((log, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-gym-card/60 border border-white/5 text-xs animate-fade-in">
                <div className="flex items-center space-x-2.5 space-x-reverse">
                  <div className="w-1.5 h-1.5 rounded-full bg-gym-gold"></div>
                  <div>
                    <p className="font-semibold text-white/90">{log.date}</p>
                    <p className="text-[9px] text-gym-gray mt-0.5">{log.branch}</p>
                  </div>
                </div>
                <span className="font-mono font-semibold text-gym-gray">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 7. Personal Trainers Screen
  const renderTrainers = () => {
    const bookTrainer = (trainer) => {
      notifySuccess(`تم إرسال طلب الحجز للكابتن ${trainer.name.split(' ')[1]}! سيتواصل معك للتنسيق.`);
    };

    return (
      <div className="flex-1 flex flex-col p-4 sm:p-5 md:p-6 overflow-y-auto no-scrollbar space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">طاقم تدريب Milano GYM الحقيقي</h2>
          <span className="text-[10px] text-gym-gray font-semibold">احجز حصتك الخاصة مباشرة</span>
        </div>

        {/* Responsive Grid layout for trainers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <div 
              key={trainer.id}
              className="rounded-2xl p-4.5 bg-gym-card border border-white/5 flex flex-col justify-between hover:border-gym-gold/25 transition-all duration-300 shadow-md"
            >
              <div className="flex flex-col space-y-3">
                <div className="flex space-x-4 space-x-reverse">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                    <img 
                      src={trainer.image} 
                      alt={trainer.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=400';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-bold text-white truncate">{trainer.name}</h3>
                      <div className="flex items-center space-x-0.5 space-x-reverse text-gym-gold font-mono text-xs">
                        <Star size={11} fill="#ffd700" />
                        <span className="font-bold">{trainer.rating}</span>
                      </div>
                    </div>
                    <p className="text-[9px] text-gym-gold font-bold mt-0.5">{trainer.role}</p>
                    <p className="text-[10.5px] text-gym-gray line-clamp-3 mt-1.5 leading-relaxed">{trainer.experience}</p>
                  </div>
                </div>

                {/* Specialties tags */}
                <div className="flex flex-wrap gap-1 border-t border-white/5 pt-3">
                  {trainer.specialties.map((spec, index) => (
                    <span 
                      key={index} 
                      className="text-[9px] font-bold text-white/80 bg-white/5 border border-white/10 px-2 py-0.5 rounded"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 space-x-reverse border-t border-white/5 pt-3.5 mt-4">
                <button 
                  onClick={() => bookTrainer(trainer)}
                  className="flex-1 h-9 rounded-lg bg-gym-gold hover:bg-gym-gold-dark text-black font-bold text-xs cursor-pointer transition active:scale-[0.98]"
                >
                  حجز جلسة خاصة
                </button>
                <button 
                  onClick={() => { setSelectedTrainer(trainer); }}
                  className="h-9 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/5 transition cursor-pointer"
                >
                  تفاصيل أكثر
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trainer Detail Modal */}
        <AnimatePresence>
          {selectedTrainer && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="w-full max-w-md rounded-2xl bg-gym-card border border-gym-gold/20 p-6 flex flex-col space-y-4 shadow-2xl"
              >
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <h4 className="text-sm font-bold text-white">تفاصيل المدرب الشخصي</h4>
                  <button onClick={() => setSelectedTrainer(null)} className="text-gym-gray text-xs font-bold hover:text-white cursor-pointer">إغلاق</button>
                </div>

                <div className="flex space-x-4 space-x-reverse">
                  <img src={selectedTrainer.image} className="w-16 h-16 rounded-xl object-cover border border-white/5" />
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedTrainer.name}</h3>
                    <p className="text-xs text-gym-gold font-semibold">{selectedTrainer.role}</p>
                    <p className="text-[10px] text-gym-gray mt-1">تنسيق وتدريب فردي مخصص</p>
                  </div>
                </div>

                <div className="text-xs space-y-2.5 text-white/80">
                  <p className="font-bold text-gym-gold">عن الكابتن:</p>
                  <p className="leading-relaxed">{selectedTrainer.experience}</p>
                  <p className="leading-relaxed">يقوم بتصميم خطط مخصصة مبنية على فحص الـ InBody ومستواك الرياضي لتصل لأسرع نتيجة ممكنة وبطريقة صحية وآمنة تماماً.</p>
                </div>

                <button 
                  onClick={() => { bookTrainer(selectedTrainer); setSelectedTrainer(null); }}
                  className="w-full h-11 rounded-xl bg-gym-gold hover:bg-gym-gold-dark text-black font-bold text-xs transition active:scale-[0.98] cursor-pointer"
                >
                  تأكيد حجز جلسة تدريب شخصي
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // 8. User Profile Screen
  const renderProfile = () => {
    const handleLogout = () => {
      setIsLoggedIn(false);
      setScreen('login');
      notifySuccess('تم تسجيل الخروج بنجاح.');
    };

    return (
      <div className="flex-1 flex flex-col p-4 sm:p-5 md:p-6 max-w-2xl mx-auto w-full justify-center space-y-6">
        {/* User Card */}
        <div className="flex flex-col items-center p-6 rounded-2xl bg-gym-card border border-white/5 text-center relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gym-gold/5 rounded-full blur-xl pointer-events-none"></div>
          
          <div className="w-18 h-18 rounded-full border border-gym-gold/25 bg-gym-card/85 p-1 flex items-center justify-center mb-3">
            <img src="/images/logo.png" alt="Profile" className="w-12 h-12 object-contain" />
          </div>

          <h3 className="text-base font-bold text-white">{user.name}</h3>
          <p className="text-xs text-gym-gray mt-0.5 font-mono">{user.phone}</p>
          <span className="text-[10px] text-gym-gold bg-gym-gold/10 px-3.5 py-1 rounded-full font-bold mt-2.5">كود العضوية: {user.memberId}</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gym-card border border-white/5 rounded-xl p-3.5 text-center shadow-sm">
            <p className="text-[9px] text-gym-gray">الوزن الحالي</p>
            <p className="text-sm font-bold font-mono text-white mt-1">82 <span className="text-[9px] text-gym-gray">كجم</span></p>
          </div>
          <div className="bg-gym-card border border-white/5 rounded-xl p-3.5 text-center shadow-sm">
            <p className="text-[9px] text-gym-gray">نسبة الدهون</p>
            <p className="text-sm font-bold font-mono text-gym-gold mt-1">16.4 <span className="text-[9px] text-gym-gray">%</span></p>
          </div>
          <div className="bg-gym-card border border-white/5 rounded-xl p-3.5 text-center shadow-sm">
            <p className="text-[9px] text-gym-gray">أيام الحضور</p>
            <p className="text-sm font-bold font-mono text-white mt-1">12 <span className="text-[9px] text-gym-gray">يوم</span></p>
          </div>
        </div>

        {/* List of Settings / Actions */}
        <div className="flex flex-col rounded-xl overflow-hidden bg-gym-card border border-white/5 text-xs text-white/90 shadow-md">
          <button 
            onClick={() => notifySuccess('تعديل البيانات متاح حالياً من خلال الكاونتر بالجيم')}
            className="flex justify-between items-center p-3.5 border-b border-white/5 hover:bg-white/5 text-right cursor-pointer"
          >
            <span>تعديل بيانات الحساب</span>
            <ChevronLeft size={14} className="text-gym-gray" />
          </button>
          <button 
            onClick={() => setScreen('plans')}
            className="flex justify-between items-center p-3.5 border-b border-white/5 hover:bg-white/5 text-right cursor-pointer"
          >
            <span>بيانات الاشتراك وتفاصيل الباقة</span>
            <ChevronLeft size={14} className="text-gym-gray" />
          </button>
          <button 
            onClick={() => notifySuccess('تليفون الجيم الأرضي: 03 4356217')}
            className="flex justify-between items-center p-3.5 border-b border-white/5 hover:bg-white/5 text-right cursor-pointer"
          >
            <span>اتصل بالجيم (03 4356217)</span>
            <ChevronLeft size={14} className="text-gym-gray" />
          </button>
          <button 
            onClick={handleLogout}
            className="flex justify-between items-center p-3.5 hover:bg-red-500/5 text-right text-red-400 cursor-pointer"
          >
            <span>تسجيل الخروج</span>
            <LogOut size={14} className="text-red-400" />
          </button>
        </div>
      </div>
    );
  };

  // 9. My ID Screen
  const renderMyId = () => {
    return (
      <div className="flex-1 flex flex-col p-4 md:p-6 items-center justify-center min-h-[500px]">
        <div className="w-full max-w-sm rounded-3xl p-6 bg-gradient-to-b from-[#1c1c1e] to-[#0a0a0c] border border-gym-gold/25 flex flex-col items-center text-center gold-glow relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gym-gold/20 via-gym-gold to-gym-gold/20 animate-pulse"></div>

          <img src="/images/logo.png" alt="Milano GYM" className="w-14 h-14 object-contain mb-3" />
          
          <h3 className="text-sm font-bold text-white">{user.name}</h3>
          <p className="text-[10px] text-gym-gold font-bold font-mono tracking-wider mt-0.5">{user.memberId}</p>

          {/* Pulsing QR Code Graphic */}
          <div className="my-5 p-4.5 rounded-2xl bg-white/95 flex items-center justify-center pulse-qr relative">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 100 100" 
              className="w-40 h-40 text-black"
              fill="currentColor"
            >
              {/* Corner 1 */}
              <rect x="0" y="0" width="30" height="30" />
              <rect x="5" y="5" width="20" height="20" fill="white" />
              <rect x="10" y="10" width="10" height="10" />

              {/* Corner 2 */}
              <rect x="70" y="0" width="30" height="30" />
              <rect x="75" y="5" width="20" height="20" fill="white" />
              <rect x="80" y="80" width="10" height="10" />

              {/* Corner 3 */}
              <rect x="0" y="70" width="30" height="30" />
              <rect x="5" y="75" width="20" height="20" fill="white" />
              <rect x="10" y="80" width="10" height="10" />

              {/* Center Logo Area Shield */}
              <rect x="35" y="35" width="30" height="30" fill="white" />
              
              {/* Randomized QR pixels */}
              <rect x="35" y="0" width="10" height="10" />
              <rect x="55" y="0" width="5" height="10" />
              <rect x="45" y="15" width="15" height="5" />
              <rect x="35" y="25" width="10" height="5" />
              
              <rect x="70" y="35" width="10" height="10" />
              <rect x="85" y="45" width="10" height="5" />
              <rect x="75" y="55" width="15" height="10" />

              <rect x="0" y="35" width="10" height="5" />
              <rect x="15" y="45" width="10" height="15" />
              <rect x="5" y="55" width="5" height="5" />
              
              <rect x="35" y="70" width="5" height="15" />
              <rect x="45" y="80" width="20" height="10" />
              <rect x="55" y="70" width="10" height="5" />
              <rect x="80" y="70" width="10" height="20" />
            </svg>
            <div className="absolute w-9 h-9 rounded-lg bg-black border border-gym-gold flex items-center justify-center overflow-hidden">
              <img src="/images/logo.png" className="w-7 h-7 object-contain" />
            </div>
          </div>

          <div className="w-full border-t border-white/5 pt-4 text-xs flex justify-between">
            <div className="text-right">
              <p className="text-[10px] text-gym-gray">الفرع المعتمد</p>
              <p className="font-bold text-white mt-0.5">فرع الحنيفية</p>
            </div>
            <div className="text-left">
              <p className="text-[10px] text-gym-gray">تاريخ الصلاحية</p>
              <p className="font-bold text-gym-gold mt-0.5">{user.expiryDate}</p>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-gym-gray mt-5 text-center">قم بمحاذاة كود الـ QR مع القارئ عند البوابة لتسجيل الحضور تلقائياً</p>
      </div>
    );
  };

  // 10. Events Screen
  const renderEvents = () => {
    const joinEvent = (event) => {
      setJoinedEvents(prev => {
        if (prev.includes(event.id)) {
          notifySuccess('تم إلغاء تسجيل حضورك في الفعالية.');
          return prev.filter(id => id !== event.id);
        }
        notifySuccess(`تم تأكيد تسجيل حضورك في ${event.title.split(' ')[0]}! ننتظرك هناك.`);
        return [...prev, event.id];
      });
    };

    return (
      <div className="flex-1 flex flex-col p-4 sm:p-5 md:p-6 overflow-y-auto no-scrollbar space-y-6">
        <h2 className="text-xl font-bold text-white">فعاليات وبطولات الجيم القادمة</h2>

        {/* Responsive Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gymEvents.map((ev) => {
            const isJoined = joinedEvents.includes(ev.id);
            return (
              <div 
                key={ev.id}
                className="rounded-2xl overflow-hidden bg-gym-card border border-white/5 flex flex-col justify-between hover:border-gym-gold/20 transition-all duration-300 shadow-md"
              >
                <div>
                  <div className="h-36 relative bg-white/5">
                    <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-gym-black/80 border border-gym-gold/20 text-gym-gold text-[9px] font-bold px-2 py-0.5 rounded">
                      {ev.branch}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col space-y-2.5">
                    <div>
                      <h3 className="text-sm font-bold text-white leading-snug">{ev.title}</h3>
                      <div className="flex items-center space-x-2 space-x-reverse mt-1 text-[9px] text-gym-gray">
                        <span>التاريخ: {ev.date}</span>
                        <span>•</span>
                        <span>الوقت: {ev.time}</span>
                      </div>
                    </div>

                    <p className="text-[10.5px] text-gym-gray leading-relaxed">{ev.description}</p>
                  </div>
                </div>

                <div className="p-4 flex justify-between items-center border-t border-white/5 mt-3 text-xs">
                  <span className="font-bold text-gym-gold">{ev.ticketPrice}</span>
                  <button 
                    onClick={() => joinEvent(ev)}
                    className={`h-8 px-4 rounded-lg font-bold text-xs cursor-pointer transition ${
                      isJoined 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-gym-gold hover:bg-gym-gold-dark text-black active:scale-[0.98]'
                    }`}
                  >
                    {isJoined ? 'مسجل حضور ✓' : 'تسجيل حضور'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // 11. Supplements Shop Screen
  const renderShop = () => {
    const filteredProducts = products.filter(p => {
      const matchCat = shopCategory === 'all' || p.category === shopCategory;
      const matchSearch = p.arabicName.includes(shopSearch) || p.name.toLowerCase().includes(shopSearch.toLowerCase());
      return matchCat && matchSearch;
    });

    const totalCartPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    return (
      <div className="flex-1 flex flex-col p-4 sm:p-5 md:p-6 overflow-y-auto no-scrollbar relative space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">متجر المكملات الغذائية</h2>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-10 h-10 rounded-xl bg-gym-card border border-white/5 flex items-center justify-center text-white hover:bg-gym-card-hover relative cursor-pointer"
          >
            <ShoppingBag size={16} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gym-gold text-black text-[9px] font-bold w-[16px] h-[16px] rounded-full flex items-center justify-center border border-[#0c0c0e]">
                {cart.reduce((a, b) => a + b.qty, 0)}
              </span>
            )}
          </button>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="ابحث عن مكمل غذائي..."
              value={shopSearch}
              onChange={(e) => setShopSearch(e.target.value)}
              className="w-full h-11 rounded-xl bg-gym-card border border-white/5 px-4 text-xs text-white focus:outline-none focus:border-gym-gold transition"
            />
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gym-gray" />
          </div>

          {/* Category Tabs switcher */}
          <div className="flex space-x-1.5 space-x-reverse overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'protein', label: 'بروتين' },
              { id: 'creatine', label: 'كرياتين' },
              { id: 'preworkout', label: 'طاقة' },
              { id: 'amino', label: 'أمينو' },
              { id: 'accessories', label: 'إكسسوارات' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setShopCategory(cat.id)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-[10px] font-bold border transition cursor-pointer ${
                  shopCategory === cat.id
                    ? 'bg-gym-gold text-black border-gym-gold'
                    : 'bg-gym-card text-gym-gray border-white/5 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((prod) => (
            <div 
              key={prod.id}
              className="rounded-xl p-3.5 bg-gym-card border border-white/5 flex flex-col justify-between hover:border-white/10 transition shadow-sm"
            >
              <div>
                <div className="h-28 rounded-lg overflow-hidden bg-white/5 mb-3">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xs font-bold text-white line-clamp-1 leading-tight">{prod.arabicName}</h3>
                <p className="text-[9px] text-gym-gray font-mono mt-0.5 line-clamp-1">{prod.name}</p>
                <p className="text-[10px] text-gym-gray mt-1.5 line-clamp-2 leading-relaxed h-7 overflow-hidden">{prod.description}</p>
              </div>

              <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                <span className="text-xs font-bold font-mono text-gym-gold">{prod.price} <span className="text-[9px] font-sans">ج</span></span>
                <button 
                  onClick={() => addToCart(prod)}
                  className="w-7 h-7 rounded-lg bg-gym-gold hover:bg-gym-gold-dark text-black flex items-center justify-center cursor-pointer transition active:scale-[0.9]"
                >
                  <Plus size={14} strokeWidth={3} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Slide-up drawer / Modal */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="w-full max-w-md rounded-2xl bg-gym-card border border-gym-gold/25 p-5 pb-6 flex flex-col space-y-4 max-h-[80%] shadow-2xl"
              >
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <h4 className="text-base font-bold text-white">سلة المشتريات</h4>
                  <button onClick={() => setIsCartOpen(false)} className="text-gym-gray text-xs font-bold hover:text-white cursor-pointer">إغلاق</button>
                </div>

                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <ShoppingBag size={36} className="text-gym-gray/30 mb-3" />
                    <p className="text-xs text-gym-gray">سلة المشتريات فارغة حالياً</p>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pr-0.5">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-xs border-b border-white/5 pb-2.5">
                          <div>
                            <p className="font-bold text-white/90">{item.arabicName}</p>
                            <p className="text-[9px] text-gym-gold font-mono mt-0.5">{item.price} ج</p>
                          </div>
                          
                          <div className="flex items-center space-x-2.5 space-x-reverse">
                            <button 
                              onClick={() => updateQty(item.id, -1)}
                              className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="font-mono font-bold w-4 text-center">{item.qty}</span>
                            <button 
                              onClick={() => updateQty(item.id, 1)}
                              className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/5 pt-3.5 space-y-3.5">
                      <div className="flex justify-between items-center text-xs px-0.5">
                        <span className="text-gym-gray">المجموع الكلي للطلب:</span>
                        <span className="font-mono font-bold text-gym-gold text-base">{totalCartPrice} ج</span>
                      </div>
                      <button 
                        onClick={() => { checkoutCart(); setIsCartOpen(false); }}
                        className="w-full h-11 rounded-xl bg-gym-gold hover:bg-gym-gold-dark text-black font-bold text-xs transition active:scale-[0.98] cursor-pointer"
                      >
                        تأكيد الطلب واستلامه من الجيم
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // 12. Locations Screen
  const renderLocations = () => {
    return (
      <div className="flex-1 flex flex-col p-4 sm:p-5 md:p-6 overflow-y-auto no-scrollbar space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">فروع Milano GYM المعتمدة</h2>
          <a href="tel:034356217" className="text-xs text-gym-gold font-bold hover:underline flex items-center gap-1.5">
            <Phone size={13} />
            <span>03 4356217</span>
          </a>
        </div>

        {/* Responsive Grid layout split on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Map Embed Container (Left/First Column on Desktop) */}
          <div className="w-full h-[250px] lg:h-auto min-h-[250px] rounded-2xl overflow-hidden border border-gym-gold/15 bg-gym-card relative shadow-md">
            <iframe 
              src={activeBranch.mapUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '100%' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title={activeBranch.name}
            ></iframe>
          </div>

          {/* Selector and Information (Right/Second Column on Desktop) */}
          <div className="flex flex-col space-y-4 justify-between">
            {/* Tabs switcher for branches */}
            <div className="flex bg-gym-card rounded-xl p-1 border border-white/5">
              {branches.map(b => (
                <button 
                  key={b.id}
                  onClick={() => setActiveBranch(b)}
                  className={`flex-1 text-center py-2.5 text-xs font-bold rounded-lg cursor-pointer transition ${
                    activeBranch.id === b.id ? 'bg-gym-gold text-black' : 'text-gym-gray hover:text-white'
                  }`}
                >
                  {b.name.split(' - ')[1]}
                </button>
              ))}
            </div>

            {/* Selected Branch details */}
            <div className="rounded-2xl p-5 bg-gym-card border border-white/5 flex flex-col space-y-4 flex-1 justify-center">
              <div>
                <h3 className="text-base font-bold text-white">{activeBranch.name}</h3>
                <p className="text-xs text-gym-gold font-semibold mt-0.5">فرع معتمد ومجهز بالكامل</p>
              </div>

              <div className="space-y-3 text-xs text-white/90 border-t border-white/5 pt-3.5">
                <div className="flex items-start space-x-2.5 space-x-reverse">
                  <MapPin size={15} className="text-gym-gold shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{activeBranch.address}</span>
                </div>
                <div className="flex items-center space-x-2.5 space-x-reverse">
                  <Phone size={15} className="text-gym-gold shrink-0" />
                  <span className="font-mono">{activeBranch.phone}</span>
                </div>
                <div className="flex items-start space-x-2.5 space-x-reverse">
                  <Clock size={15} className="text-gym-gold shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{activeBranch.hours}</span>
                </div>
              </div>

              {/* Key branch features */}
              <div className="border-t border-white/5 pt-3.5">
                <h4 className="text-[10px] text-gym-gray font-bold mb-2">مميزات الفرع</h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeBranch.features.map((feat, idx) => (
                    <span 
                      key={idx}
                      className="text-[9px] font-semibold text-white/90 bg-white/5 border border-white/10 px-2 py-0.5 rounded"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              <a 
                href={activeBranch.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 rounded-xl bg-gym-gold hover:bg-gym-gold-dark text-black font-bold text-xs flex items-center justify-center cursor-pointer transition mt-2"
              >
                فتح الاتجاهات في خرائط جوجل
              </a>
            </div>
          </div>
          
        </div>
      </div>
    );
  };

  // Main navigation structure
  return (
    <MobileContainer>
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Top Navbar for inner screens */}
      {screen !== 'splash' && screen !== 'login' && screen !== 'register' && (
        <div className="h-16 shrink-0 bg-[#0a0a0c]/90 backdrop-blur border-b border-white/5 px-4 md:px-6 flex items-center justify-between z-30 select-none">
          {/* Logo on Right */}
          <div className="flex items-center space-x-2 space-x-reverse cursor-pointer" onClick={() => setScreen('dashboard')}>
            <img src="/images/logo.png" alt="Milano Logo" className="w-8 h-8 object-contain" />
            <span className="text-xs font-bold text-white tracking-wide">MILANO GYM</span>
          </div>

          {/* Desktop Nav Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            {[
              { id: 'dashboard', label: 'الرئيسية' },
              { id: 'plans', label: 'الاشتراكات' },
              { id: 'my-id', label: 'هويتي (QR)' },
              { id: 'shop', label: 'المتجر' },
              { id: 'trainers', label: 'المدربين' },
              { id: 'locations', label: 'الفروع' },
              { id: 'events', label: 'الفعاليات' },
              { id: 'profile', label: 'حسابي' }
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => setScreen(item.id)}
                className={`text-xs font-bold transition hover:text-gym-gold cursor-pointer pb-1 ${
                  screen === item.id || (item.id === 'dashboard' && screen === 'dashboard') 
                    ? 'text-gym-gold border-b-2 border-gym-gold' 
                    : 'text-gym-gray'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Title in center (Mobile only) */}
          <h2 className="text-sm font-bold text-gym-gold gold-text-glow font-sans md:hidden">
            {screen === 'dashboard' && 'الرئيسية'}
            {screen === 'plans' && 'باقات الاشتراك'}
            {screen === 'tracking' && 'تتبع الاشتراك'}
            {screen === 'trainers' && 'المدربين'}
            {screen === 'profile' && 'الحساب الشخصي'}
            {screen === 'my-id' && 'كود الدخول'}
            {screen === 'events' && 'الأحداث والبطولات'}
            {screen === 'shop' && 'متجر المكملات'}
            {screen === 'locations' && 'فروعنا'}
          </h2>

          {/* Back button or placeholder on Left (Mobile only) */}
          <div>
            {screen !== 'dashboard' ? (
              <button 
                onClick={() => setScreen('dashboard')}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer transition border border-white/5 md:hidden"
              >
                <ChevronRight size={16} />
              </button>
            ) : (
              <div className="w-8 h-8 md:hidden"></div>
            )}
          </div>
        </div>
      )}

      {/* Main Screen Container with AnimatePresence */}
      <div className="flex-grow w-full relative overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full flex flex-col"
          >
            {screen === 'splash' && renderSplash()}
            {screen === 'login' && renderLogin()}
            {screen === 'register' && renderRegister()}
            {screen === 'dashboard' && renderDashboard()}
            {screen === 'plans' && renderPlans()}
            {screen === 'tracking' && renderTracking()}
            {screen === 'trainers' && renderTrainers()}
            {screen === 'profile' && renderProfile()}
            {screen === 'my-id' && renderMyId()}
            {screen === 'events' && renderEvents()}
            {screen === 'shop' && renderShop()}
            {screen === 'locations' && renderLocations()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation for internal screens (Mobile only) */}
      {screen !== 'splash' && screen !== 'login' && screen !== 'register' && (
        <BottomNav 
          currentScreen={screen} 
          setScreen={setScreen} 
          cartCount={cart.reduce((a, b) => a + b.qty, 0)}
        />
      )}
    </MobileContainer>
  );
}
