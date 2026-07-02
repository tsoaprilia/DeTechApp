import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
    ShieldCheck, QrCode, Search, CheckCircle, 
    Activity, ChevronRight, ArrowRight 
} from 'lucide-react';

export default function Welcome({ auth }: PageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeSection, setActiveSection] = useState('tentang');

    const navItems = [
        { label: 'Tentang Kami', href: '#tentang', id: 'tentang' },
        { label: 'Keunggulan', href: '#keunggulan', id: 'keunggulan' },
        { label: 'Verifikasi', href: '#verifikasi', id: 'verifikasi' },
        { label: 'Layanan', href: '#layanan', id: 'layanan' },
    ];

    const stats = [
        { label: 'Dataset', value: '200', unit: '', color: 'bg-[#F2F2F2]' },
        { label: 'Akurasi', value: '92', unit: '%', color: 'bg-[#C3E3EE]/40' },
        { label: 'Deteksi', value: '< 2s', unit: '', color: 'bg-[#F2F2F2]' },
        { label: 'Gigi Susu', value: '20', unit: '', color: 'bg-[#F2F2F2]' },
    ];

    const nextSlide = () => {
        if (currentIndex < stats.length - 3) setCurrentIndex(prev => prev + 1);
    };

    const prevSlide = () => {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    const floatingVariants: Variants = {
        animate: (i: number) => ({
            rotate: i % 2 === 0 ? [1, -1, 1] : [-1, 1, -1],
            y: [0, -5, 0],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const, delay: i * 0.2 }
        })
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.7, ease: "easeOut" as const }
    };

    useEffect(() => {
        const updateActiveSection = () => {
            const scrollPosition = window.scrollY + 160;

            for (const item of [...navItems].reverse()) {
                const section = document.getElementById(item.id);

                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(item.id);
                    return;
                }
            }

            setActiveSection('tentang');
        };

        updateActiveSection();
        window.addEventListener('scroll', updateActiveSection, { passive: true });

        return () => window.removeEventListener('scroll', updateActiveSection);
    }, []);

    const getNavLinkClass = (id: string) =>
        `relative rounded-full px-5 py-2.5 text-[18px] font-semibold transition-all ${
            activeSection === id
                ? 'bg-[#053247] text-white shadow-[0_10px_24px_rgba(5,50,71,0.18)]'
                : 'text-[#053247] hover:bg-[#C3E3EE]/35 hover:text-[#053247]'
        }`;

    return (
        <>
            <Head title="DeTech - Asisten Pintar Pemeriksaan Gigi" />
            <div className="min-h-screen bg-white font-['DM_Sans'] antialiased overflow-x-hidden selection:bg-[#C3E3EE] selection:text-[#053247]">
                
                {/* --- HEADER --- */}
                <nav className="fixed w-full z-[100] bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 text-left">
                    <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-[160px]">
                        <div className="relative flex items-center justify-between h-24">
                            <div className="flex items-center z-10">
                                <img src="assets/images/logo-detech.png" alt="Logo" className="h-14 w-auto" />
                                <span className="ml-3 text-2xl font-bold text-[#053247]">DeTech</span>
                            </div>

                            <div className="hidden md:flex absolute inset-0 justify-center items-center pointer-events-none">
                                <div className="flex items-center gap-3 pointer-events-auto">
                                    {navItems.map((item) => (
                                        <a
                                            key={item.id}
                                            href={item.href}
                                            onClick={() => setActiveSection(item.id)}
                                            className={getNavLinkClass(item.id)}
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center z-10 gap-4 text-left">
                                <Link href={route('login')} className="hidden md:block text-[20px] bg-[#053247] text-white px-10 py-3 rounded-full font-semibold shadow-[0_8px_20px_rgba(195,227,238,0.5)] hover:bg-[#053247]/90 transition-all">
                                    Masuk
                                </Link>
                                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-[#053247]">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {isOpen ? <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round"/> : <path d="M4 6h16M4 12h16m-7 6h7" strokeWidth="2" strokeLinecap="round"/>}
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                className="md:hidden border-t border-gray-100 bg-white px-6 py-5 shadow-lg"
                            >
                                <div className="flex flex-col gap-3">
                                    {navItems.map((item) => (
                                        <a
                                            key={item.id}
                                            href={item.href}
                                            onClick={() => {
                                                setActiveSection(item.id);
                                                setIsOpen(false);
                                            }}
                                            className={`rounded-2xl px-5 py-3 text-[17px] font-bold transition-all ${
                                                activeSection === item.id
                                                    ? 'bg-[#053247] text-white shadow-[0_10px_24px_rgba(5,50,71,0.18)]'
                                                    : 'bg-[#F1FBFF] text-[#053247] hover:bg-[#C3E3EE]/45'
                                            }`}
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>

                {/* --- HERO SECTION --- */}
                <main id="tentang" className="pt-44 lg:pt-52 pb-24 w-full max-w-[1920px] mx-auto px-6 lg:px-[160px] text-left">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="w-full lg:w-[45%]">
                            <h1 className="text-[52px] lg:text-[72px] font-bold leading-[1.1] mb-8 text-left text-[#053247]">
                                Asisten Pintar <br />
                                <span className="text-[#4C7282]">Pemeriksaan Gigi Anak</span>
                            </h1>
                            <p className="text-[20px] text-gray-500 leading-relaxed mb-12 max-w-[520px] text-left">
                                Kami menghadirkan sistem cerdas yang membantu mendeteksi gigi susu anak secara otomatis melalui foto rontgen panoramik.
                            </p>
                            <div className="flex gap-6 mb-24">
                                <Link href={route('login')} className="px-12 py-4 bg-[#053247] text-white font-bold rounded-full shadow-[0_15px_35px_rgba(5,50,71,0.3)] hover:scale-[1.05] transition-transform text-[19px]">
                                    Masuk
                                </Link>
                                <a href="#keunggulan" className="px-12 py-4 bg-white text-[#053247] border border-[#C3E3EE] font-bold rounded-full shadow-[0_15px_35px_rgba(195,227,238,0.6)] hover:bg-[#C3E3EE]/20 transition-all text-[19px] text-center">
                                    Selengkapnya
                                </a>
                            </div>

                            <div className="max-w-[540px]">
                                <div className="flex justify-between items-center mb-8 px-1">
                                    <h3 className="text-[22px] font-bold text-[#053247]">DeTech dalam Angka</h3>
                                    <div className="flex gap-4">
                                        <button onClick={prevSlide} className={`w-12 h-12 flex items-center justify-center rounded-full border border-gray-100 shadow-sm transition ${currentIndex === 0 ? 'opacity-20 cursor-default' : 'hover:bg-gray-50'}`}>
                                            <svg className="w-6 h-6" fill="none" stroke="#053247" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
                                        </button>
                                        <button onClick={nextSlide} className={`w-12 h-12 flex items-center justify-center rounded-full bg-[#C3E3EE]/40 transition ${currentIndex >= stats.length - 3 ? 'opacity-20 cursor-default' : 'hover:bg-[#C3E3EE]/60'}`}>
                                            <svg className="w-6 h-6" fill="none" stroke="#053247" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-hidden relative pb-4 text-left">
                                    <motion.div animate={{ x: `-${currentIndex * (100 / 3)}%` }} className="flex gap-5">
                                        {stats.map((stat, i) => (
                                            <div key={i} className={`min-w-[calc(33.33%-14px)] p-7 rounded-[28px] relative ${stat.color} shadow-sm group hover:shadow-[0_20px_40px_-15px_rgba(195,227,238,0.9)] transition-all duration-300`}>
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-[3px] h-10 bg-[#053247]/20 rounded-full group-hover:bg-[#053247]/40 transition-colors" />
                                                <div className="pl-3">
                                                    <div className="text-[34px] font-bold text-[#053247] leading-tight text-left">{stat.value}<span className="text-[18px] ml-1">{stat.unit}</span></div>
                                                    <div className="text-[15px] text-gray-400 font-medium text-left">{stat.label}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="w-full lg:w-[55%] relative flex justify-center lg:justify-end pr-8">
                            <div className="relative w-full max-w-[620px] z-10">
                                <div className="absolute bg-gradient-to-br from-[#C3E3EE] via-[#8BAFBF] to-[#46626B] opacity-80 shadow-[0_0_40px_rgba(255,255,255,0.45)] p-[10px] rounded-[30px] left-0 lg:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-40">
                                    {[
                                        {icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', bg: 'bg-white', color: 'text-[#053247]'},
                                        {icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z', bg: 'bg-white', color: 'text-[#053247]'},
                                        {icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', bg: 'bg-[#053247]', color: 'text-white'}
                                    ].map((btn, i) => (
                                        <div key={i} className={`p-2 ${btn.bg} ${btn.color} rounded-[100px] shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:scale-110 transition cursor-pointer`}>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={btn.icon} /></svg>
                                        </div>
                                    ))}
                                </div>

                                <div className="relative w-full max-w-[620px] z-10 text-left">
                                    {/* --- KARTU BELAKANG YANG WARNANYA DIGANTI --- */}
                                    <div className="absolute -inset-4 pt-40 bg-gradient-to-br from-[#C3E3EE] via-[#A8C7D3] to-[#8BAFBF] rounded-[60px] blur-[1px] opacity-90 text-left" />
                                    
                                    <div className="relative rounded-[50px] overflow-hidden mt-40 ml-[60px] mr-[60px] pt-[6px] bg-white/50 backdrop-blur-sm shadow-2xl border border-white/20">
                                        <img src="assets/images/hero-doctor.png" alt="Doctor" className="w-full h-auto rounded-[44px] relative z-10 object-cover" />
                                    </div>

                                    <div className="absolute top-[42%] -right-10 z-40 bg-white/95 backdrop-blur-md p-5 rounded-[28px] shadow-[0_15px_40px_rgba(0,0,0,0.12)] flex items-center gap-4 border border-gray-50 text-right">
                                        <div>
                                            <p className="text-[12px] text-gray-400 font-medium text-left">didukung dengan</p>
                                            <p className="text-[17px] font-bold text-[#053247] text-left">Kecerdasan Buatan</p>
                                        </div>
                                        <div className="w-12 h-12 bg-[#C3E3EE]/30 rounded-[20px] flex items-center justify-center p-2 text-left">                                           
                                            <img src="assets/images/logo-detech.png" className="w-full h-auto" />
                                        </div>
                                    </div>

                                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[110%] flex flex-wrap justify-center gap-3.5 z-50">
                                        {[ 'Odontogram', 'Panoramik', 'Gigi Susu', 'Orang Tua', 'Susunan Gigi', '1-12 Tahun', 'Dokter Gigi', 'Radiografer' ].map((tag, i) => (
                                            <motion.span key={tag} custom={i} variants={floatingVariants} animate="animate" className="bg-white px-7 py-3.5 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.08)] text-[15px] font-bold text-[#053247] border border-gray-50 text-left">
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </main>

                {/* --- SECTION KEUNGGULAN --- */}
                <motion.section id="keunggulan" {...fadeInUp} className="py-24 w-full max-w-[1920px] mx-auto px-6 lg:px-[160px] bg-white text-left">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
                        <div className="flex flex-col gap-4">
                            <span className="inline-block px-6 py-2 bg-[#C3E3EE]/50 text-[#053247] font-bold rounded-full text-[14px] tracking-wide w-fit">KEUNGGULAN</span>
                            <h2 className="text-[40px] font-bold text-[#053247] leading-tight text-left">Mengapa Harus Memilih DeTech?</h2>
                        </div>
                        <p className="text-[18px] text-gray-500 max-w-[420px] leading-relaxed text-left">Solusi pintar yang membantu perawatan gigi anak jadi lebih mudah, cepat, dan jelas</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Deteksi Gigi Susu Otomatis", desc: "DeTech membantu mengenali gigi susu anak dari rontgen panoramik secara otomatis.", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" },
                            { title: "Penomoran Gigi yang Jelas", desc: "Setiap gigi ditandai dengan nomor standar (FDI), sehingga mudah dijelaskan ke orang tua.", icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" },
                            { title: "Laporan Siap Dibagikan", desc: "Hasil pemeriksaan bisa diunduh dalam bentuk PDF lengkap untuk arsip klinik atau dibawa pulang.", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", dark: true },
                            { title: "Pantau Perkembangan", desc: "Riwayat pemeriksaan tersimpan dengan aman, memudahkan monitoring pertumbuhan gigi secara berkala.", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                            { title: "Akses Sesuai Kebutuhan", desc: "Dokter, admin, dan orang tua memiliki akses yang berbeda-beda sesuai dengan peran masing-masing.", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
                            { title: "Cepat & Praktis", desc: "Proses analisis cerdas yang berlangsung hanya dalam hitungan detik, tanpa perlu menunggu lama.", icon: "M13 10V3L4 14h7v7l9-11h-7z" }
                        ].map((card, i) => (
                            <div key={i} className={`p-8 rounded-[24px] border ${card.dark ? 'bg-[#053247] text-white border-none shadow-[0_20px_40px_-15px_rgba(195,227,238,0.9)]' : 'bg-[#C3E3EE]/20 border-white'} hover:shadow-[0_20px_40px_-15px_rgba(195,227,238,0.9)] transition-all duration-300 text-left`}>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm ${card.dark ? 'bg-[#C3E3EE]/30 text-[#C3E3EE]' : 'bg-white text-[#053247]'} text-left`}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={card.icon} /></svg>
                                </div>
                                <h3 className="text-[20px] font-bold mb-3 text-left">{card.title}</h3>
                                <p className={`leading-relaxed text-[16px] ${card.dark ? 'text-gray-300' : 'text-gray-500'} text-left`}>{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* --- SECTION VERIFIKASI: DENGAN WARNA BARU --- */}
                <motion.section id="verifikasi" {...fadeInUp} className="py-32 w-full max-w-[1920px] mx-auto px-6 lg:px-[160px] bg-white relative overflow-hidden text-left">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#C3E3EE_0%,_transparent_70%)] opacity-20 pointer-events-none text-left" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-24">
                        <div className="w-full lg:w-1/2 relative flex justify-center min-h-[500px] items-center">
                            <div className="relative w-full max-w-[450px] h-[450px] text-left">
                                {/* --- BACK CARD WARNA BIRU MUDA KE SLATE --- */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#C3E3EE] via-[#A8C7D3] to-[#8BAFBF] rounded-[60px] blur-[1px] opacity-90 shadow-inner transform -rotate-3 scale-95" />

                                <motion.div 
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 z-20 bg-white rounded-[40px] shadow-[0_30px_70px_rgba(5,50,71,0.15)] border border-white p-1 flex flex-col text-left"
                                >
                                    <div className="bg-gradient-to-br from-[#053247] to-[#0A4661] rounded-[38px] p-8 h-full flex flex-col text-white relative overflow-hidden text-left">
                                        <motion.div 
                                            animate={{ top: ['15%', '85%', '15%'] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent z-30 shadow-[0_0_15px_#34d399] text-left"
                                        />
                                        
                                        <div className="flex justify-between items-center mb-6 relative z-10 text-left">
                                            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-left">
                                                <ShieldCheck className="text-emerald-400" size={24} />
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest text-left">Security Node</p>
                                                <p className="text-[10px] font-bold opacity-50 font-mono text-left">v2.4</p>
                                            </div>
                                        </div>

                                        <div className="flex-1 flex flex-col items-center justify-center space-y-6 relative z-10 text-center">
                                            
                                            {/* IKON CENTANG MELAYANG */}
                                            <motion.div animate={{ y: [0, -10, 0], x: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-0 -left-4 text-emerald-400 opacity-80 text-left">
                                                <CheckCircle size={32} strokeWidth={3} />
                                            </motion.div>

                                            <motion.div animate={{ y: [0, 10, 0], x: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }} className="absolute -top-10 right-4 text-emerald-400 opacity-60 text-left">
                                                <CheckCircle size={24} strokeWidth={3} />
                                            </motion.div>

                                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 -right-8 text-emerald-400 opacity-80 text-left">
                                                <CheckCircle size={36} strokeWidth={3} />
                                            </motion.div>

                                            <div className="relative p-6 bg-white rounded-[32px] shadow-2xl text-left">
                                                <QrCode size={110} className="text-[#053247] text-left" />
                                                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl text-left" />
                                                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl text-left" />
                                                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl text-left" />
                                                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-xl text-left" />
                                            </div>

                                            <motion.div 
                                                animate={{ opacity: [1, 0.5, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 rounded-full border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase text-left"
                                            >
                                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping text-left" />
                                                Live Verifying
                                            </motion.div>
                                        </div>

                                        <div className="mt-4 bg-white/10 backdrop-blur-md rounded-[24px] p-4 border border-white/10 relative z-10 text-left">
                                            <div className="flex items-center gap-3 text-left">
                                                <div className="p-2 bg-emerald-500 rounded-lg">
                                                    <CheckCircle size={16} className="text-white" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-[8px] font-bold text-white/50 uppercase text-left">Patient Record</p>
                                                    <p className="text-[12px] font-black tracking-tight text-left">H****U F****E [Verified]</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -right-12 top-1/3 z-30 bg-white p-4 rounded-2xl shadow-2xl border border-gray-50 flex items-center gap-3 text-left text-left">
                                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 text-left">
                                        <Activity size={18} />
                                    </div>
                                    <span className="text-[11px] font-black text-[#053247] text-left">Real-time Sync</span>
                                </motion.div>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 space-y-10 text-left">
                            <div className="space-y-4 text-left">
                                <span className="inline-block px-5 py-2 bg-[#C3E3EE]/40 text-[#053247] font-black rounded-full text-[12px] tracking-[2px] uppercase text-left">Keamanan Data</span>
                                <h2 className="text-[48px] lg:text-[56px] font-black text-[#053247] leading-[1.1] text-left">Integritas Medis <br /><span className="text-[#4C7282]">Tanpa Celah.</span></h2>
                                <p className="text-[19px] text-gray-500 leading-relaxed max-w-[550px] text-left">Setiap dokumen memiliki identitas digital yang tidak dapat dimanipulasi. Gunakan <span className="text-[#053247] font-bold underline decoration-[#C3E3EE] decoration-4 text-left">Sistem Verifikasi QR</span> untuk menjamin keaslian data.</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                <div className="space-y-3 text-left">
                                    <div className="w-10 h-10 bg-[#053247] text-white rounded-xl flex items-center justify-center shadow-lg text-left">
                                        <QrCode size={20} />
                                    </div>
                                    <h5 className="text-[17px] font-bold text-[#053247] text-left">Quick Verification</h5>
                                    <p className="text-sm text-gray-500 text-left">Pindai kode unik pada laporan untuk validasi instan.</p>
                                </div>
                                <div className="space-y-3 text-left">
                                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg text-left">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <h5 className="text-[17px] font-bold text-[#053247] text-left">Anti-Forgery System</h5>
                                    <p className="text-sm text-gray-500 text-left">Diagnosis tersinkronisasi langsung dengan database pusat DeTech.</p>
                                </div>
                            </div>

                            <div className="pt-4 text-left">
                                <Link href={route('login')} className="group flex items-center gap-4 text-[#053247] font-black uppercase tracking-widest text-sm hover:gap-6 transition-all text-left">
                                    Coba Verifikasi Sekarang 
                                    <div className="w-10 h-10 rounded-full bg-[#F1FBFF] flex items-center justify-center group-hover:bg-[#053247] group-hover:text-white transition-all text-left text-left">
                                        <ChevronRight size={20} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* --- SECTION LAYANAN --- */}
                <motion.section id="layanan" {...fadeInUp} className="py-24 w-full max-w-[1920px] mx-auto px-6 lg:px-[160px] bg-white text-left">
                    <div className="mb-14 text-left">
                        <h2 className="text-[40px] font-bold text-[#053247] leading-tight text-left">Apa saja yang bisa dilakukan DeTech?</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                        {[
                            { title: "Analisis Rontgen Gigi Anak", desc: "Unggah rontgen panoramik", img: "layanan1.png" },
                            { title: "Deteksi Gigi Susu Otomatis", desc: "Teknologi pintar yang bekerja", img: "layanan2.png" },
                            { title: "Visualisasi & Penomoran Gigi", desc: "Hasil jelas dan mudah dipahami", img: "layanan3.png" },
                            { title: "Laporan Pemeriksaan Digital", desc: "Siap dibagikan kapan saja", img: "layanan4.png" }
                        ].map((item, index) => (
                            <div key={index} className="relative group pt-16 text-left">
                                <div className="p-6 pb-8 rounded-[24px] bg-gradient-to-b from-[#8BAFBF]/20 to-[#8BAFBF]/40 h-full flex flex-col justify-end min-h-[220px] border border-white/50 transition-all duration-300 group-hover:shadow-[0_20px_40px_-15px_rgba(195,227,238,0.9)] group-hover:-translate-y-1 text-left text-left">
                                    <h3 className="text-[19px] font-bold text-[#053247] mb-1.5 mt-10 leading-tight text-left">{item.title}</h3>
                                    <p className="text-[#053247]/70 text-[14px] leading-relaxed text-left">{item.desc}</p>
                                </div>
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[72%] z-10 transition-transform duration-500 group-hover:scale-105 text-left">
                                    <img src={`assets/images/${item.img}`} alt={item.title} className="w-full h-auto drop-shadow-xl text-left" />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* --- FOOTER --- */}
                <footer className="bg-[#053247] pt-24 pb-12 font-['DM_Sans'] text-white overflow-hidden relative w-full text-left">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C3E3EE]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 text-left" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#8BAFBF]/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 text-left" />

                    <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-[160px] relative z-10 text-left">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-left">
                            <div className="space-y-8 text-left">
                                <div className="flex items-center gap-3 text-left text-left">
                                    <div className="bg-white p-2 rounded-xl shadow-[0_0_20px_rgba(195,227,238,0.4)] text-left text-left">
                                        <img src="assets/images/logo-detech.png" alt="Logo" className="h-10 w-auto" />
                                    </div>
                                    <span className="text-2xl font-bold tracking-tight text-white text-left text-left">DeTech</span>
                                </div>
                                <p className="text-white/80 leading-relaxed text-[16px] text-left text-left">Platform cerdas berbasis AI untuk deteksi dini gigi susu anak melalui radiografi panoramik.</p>
                                <div className="flex gap-4 text-left">
                                    {['M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253', 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z', 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'].map((path, i) => (
                                        <div key={i} className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-[#C3E3EE] hover:text-[#053247] transition-all cursor-pointer shadow-[0_10px_20px_rgba(195,227,238,0.2)] text-left">
                                            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={path} /></svg>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-left text-left text-left">
                                <h4 className="text-[18px] font-bold mb-8 text-white uppercase tracking-wider text-left text-left">Navigasi</h4>
                                <ul className="space-y-4 font-medium text-left">
                                    {['Tentang Kami', 'Keunggulan', 'Layanan'].map((item) => (
                                        <li key={item} className="text-left text-left"><a href={`#${item.toLowerCase().replace(' ', '')}`} className="text-white/70 hover:text-[#C3E3EE] transition-all flex items-center gap-2 text-left text-left text-left text-left"><span className="w-1.5 h-1.5 rounded-full bg-[#C3E3EE] text-left text-left" />{item}</a></li>
                                    ))}
                                </ul>
                            </div>
                            <div className="text-left text-left text-left">
                                <h4 className="text-[18px] font-bold mb-8 text-white uppercase tracking-wider text-left text-left text-left text-left">Hubungi Kami</h4>
                                <ul className="space-y-6 text-white/80 text-left text-left text-left text-left text-left">
                                    <li className="flex gap-4 text-left text-left text-left"><svg className="w-5 h-5 text-[#C3E3EE] text-left text-left text-left text-left" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>Jakarta Selatan, Indonesia</li>
                                    <li className="flex gap-4 text-left text-left text-left text-left text-left"><svg className="w-5 h-5 text-[#C3E3EE] text-left text-left text-left text-left text-left text-left" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>support@detech.id</li>
                                </ul>
                            </div>
                            <div className="text-left text-left text-left text-left text-left">
                                <h4 className="text-[18px] font-bold mb-8 text-white uppercase tracking-wider text-left text-left text-left text-left text-left">Newsletter</h4>
                                <p className="text-white/80 leading-relaxed text-[16px] text-left text-left text-left text-left text-left text-left">Jadilah yang pertama mengetahui pembaruan sistem AI kami dan tips perawatan gigi susu anak dari para ahli radiografi gigi</p>
                                <form className="relative mt-5 text-left text-left text-left text-left text-left text-left text-left">
                                    <input type="email" placeholder="Email Anda" className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-[#C3E3EE] transition-all text-left text-left text-left text-left text-left text-left text-left text-left" />
                                    <button className="absolute right-2 top-2 bottom-2 bg-[#C3E3EE] text-[#053247] px-4 rounded-xl font-bold hover:bg-white shadow-lg transition-all text-left text-left text-left text-left text-left text-left text-left"><svg className="w-5 h-5 text-left text-left text-left text-left text-left text-left text-left" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></button>
                                </form>
                            </div>
                        </div>
                        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/50 text-[14px] text-left text-left text-left text-left text-left">
                            <p className="text-left text-left text-left text-left text-left text-left text-left text-left">© 2026 DeTech Project. Hak Cipta Dilindungi.</p>
                            <div className="flex gap-8 text-left text-left text-left text-left text-left text-left text-left text-left"><a href="#" className="hover:text-[#C3E3EE] text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">Kebijakan Privasi</a><a href="#" className="hover:text-[#C3E3EE] text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">Syarat & Ketentuan</a></div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
