import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Welcome({ auth }: PageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

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

    // Animasi miring-miring floating text
    const floatingVariants = {
        animate: (i: number) => ({
            rotate: i % 2 === 0 ? [1, -1, 1] : [-1, 1, -1],
            y: [0, -5, 0],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
        })
    };

    // Animasi Fade In Saat Scroll
    const fadeInUp = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.7, ease: "easeOut" }
    };

    return (
        <>
            <Head title="DeTech - Asisten Pintar Pemeriksaan Gigi" />
            <div className="min-h-screen bg-white font-['DM_Sans'] antialiased overflow-x-hidden selection:bg-[#C3E3EE] selection:text-[#053247]">
                
                {/* --- HEADER --- */}
                <nav className="fixed w-full z-[100] bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
                    <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-[160px]">
                        <div className="relative flex items-center justify-between h-24">
                            <div className="flex items-center z-10">
                                <img src="assets/images/logo-detech.png" alt="Logo" className="h-14 w-auto" />
                                <span className="ml-3 text-2xl font-bold text-[#053247]">DeTech</span>
                            </div>

                            {/* Navigasi Desktop */}
                            <div className="hidden md:flex absolute inset-0 justify-center items-center pointer-events-none">
                                <div className="flex space-x-12 pointer-events-auto">
                                    <a href="#tentang" className="text-[18px] text-[#053247] hover:text-[#8BAFBF] font-semibold transition-all">Tentang Kami</a>
                                    <a href="#keunggulan" className="text-[18px] text-[#053247] hover:text-[#8BAFBF] font-semibold transition-all">Keunggulan</a>
                                    <a href="#layanan" className="text-[18px] text-[#053247] hover:text-[#8BAFBF] font-semibold transition-all">Layanan</a>
                                </div>
                            </div>

                            <div className="flex items-center z-10 gap-4">
                                <Link href={route('login')} className="hidden md:block text-[20px] bg-[#053247] text-white px-10 py-3 rounded-full font-semibold shadow-[0_8px_20px_rgba(195,227,238,0.5)] hover:bg-[#053247]/90 transition-all">
                                    Masuk
                                </Link>
                                {/* Tombol Toggle Mobile */}
                                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-[#053247]">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {isOpen ? <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round"/> : <path d="M4 6h16M4 12h16m-7 6h7" strokeWidth="2" strokeLinecap="round"/>}
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Menu Mobile Dropdown */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white border-t border-gray-100 overflow-hidden">
                                <div className="px-6 py-8 flex flex-col gap-6 text-center font-bold">
                                    <a href="#tentang" onClick={() => setIsOpen(false)} className="text-xl text-[#053247]">Tentang Kami</a>
                                    <a href="#keunggulan" onClick={() => setIsOpen(false)} className="text-xl text-[#053247]">Keunggulan</a>
                                    <a href="#layanan" onClick={() => setIsOpen(false)} className="text-xl text-[#053247]">Layanan</a>
                                    <Link href={route('register')} className="w-full bg-[#053247] text-white py-4 rounded-2xl shadow-lg">Daftar Sekarang</Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>

                {/* --- HERO SECTION --- */}
                <main id="tentang" className="pt-44 lg:pt-52 pb-24 w-full max-w-[1920px] mx-auto px-6 lg:px-[160px]">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="w-full lg:w-[45%]">
                            <h1 className="text-[52px] lg:text-[72px] font-bold leading-[1.1] mb-8">
                                <span className="text-[#053247]">Asisten Pintar </span> <br />
                                <span className="text-[#4C7282]">Pemeriksaan Gigi Anak</span>
                            </h1>
                            <p className="text-[20px] text-gray-500 leading-relaxed mb-12 max-w-[520px]">
                                Kami menghadirkan sistem cerdas yang membantu mendeteksi gigi susu anak secara otomatis melalui foto rontgen panoramik.
                            </p>
                            <div className="flex gap-6 mb-24">
                                <Link href={route('register')} className="px-12 py-4 bg-[#053247] text-white font-bold rounded-full shadow-[0_15px_35px_rgba(5,50,71,0.3)] hover:scale-[1.05] transition-transform text-[19px]">
                                    Daftar
                                </Link>
                                <a href="#keunggulan" className="px-12 py-4 bg-white text-[#053247] border border-[#C3E3EE] font-bold rounded-full shadow-[0_15px_35px_rgba(195,227,238,0.6)] hover:bg-[#C3E3EE]/20 transition-all text-[19px] text-center">
                                    Selengkapnya
                                </a>
                            </div>

                            {/* Carousel Statistik */}
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
                                <div className="overflow-hidden relative pb-4">
                                    <motion.div animate={{ x: `-${currentIndex * (100 / 3)}%` }} className="flex gap-5">
                                        {stats.map((stat, i) => (
                                            <div key={i} className={`min-w-[calc(33.33%-14px)] p-7 rounded-[28px] relative ${stat.color} shadow-sm group hover:shadow-[0_20px_40px_-15px_rgba(195,227,238,0.9)] transition-all duration-300`}>
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-[3px] h-10 bg-[#053247]/20 rounded-full group-hover:bg-[#053247]/40 transition-colors" />
                                                <div className="pl-3">
                                                    <div className="text-[34px] font-bold text-[#053247] leading-tight">{stat.value}<span className="text-[18px] ml-1">{stat.unit}</span></div>
                                                    <div className="text-[15px] text-gray-400 font-medium">{stat.label}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Image Right Side */}
                        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="w-full lg:w-[55%] relative flex justify-center lg:justify-end pr-8">
                            <div className="relative w-full max-w-[620px] z-10">
                                 {/* KANAN: GAMBAR DOKTER DENGAN GRADASI & FLOATING */}


                                

                                {/* Side Nav Icons */}

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



                                {/* MAIN IMAGE CONTAINER */}

                                <div className="relative w-full max-w-[620px] z-10">

                                   {/* LAYER 1: Background Paling Belakang (Gradasi) */}

                                <div className="absolute -inset-4 pt-40 bg-gradient-to-br from-[#C3E3EE] via-[#8BAFBF] to-[#46626B] rounded-[60px] blur-[2px] opacity-80" />



                                

                                    {/* LAYER 3: Frame Utama & Gambar Dokter */}

                                    <div className="relative rounded-[50px] overflow-hidden mt-40 ml-[60px] mr-[60px] pt-[6px] bg-white/50 backdrop-blur-sm shadow-2xl border border-white/20">

                                        <img 

                                            src="assets/images/hero-doctor.png" 

                                            alt="Doctor" 

                                            className="w-full h-auto rounded-[44px] relative z-10 object-cover" 

                                        />

                                    </div>



                                    {/* AI CARD Floating */}

                                    <div className="absolute top-[42%] -right-10 z-40 bg-white/95 backdrop-blur-md p-5 rounded-[28px] shadow-[0_15px_40px_rgba(0,0,0,0.12)] flex items-center gap-4 border border-gray-50">

                                        <div className="text-right">

                                            <p className="text-[12px] text-gray-400 font-medium">didukung dengan</p>

                                            <p className="text-[17px] font-bold text-[#053247]">Kecerdasan Buatan</p>

                                        </div>

                                        <div className="w-12 h-12 bg-detech-light/70 rounded-[20px] flex items-center justify-center p-2">                                            

                                        <img src="assets/images/logo-detech.png" className="w-full h-auto" />

                                        </div>

                                    </div>



                                    {/* FLOATING TEXTS dengan Animasi Miring */}

                                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[110%] flex flex-wrap justify-center gap-3.5 z-50">

                                        {[

                                            'Odontogram', 'Panoramik', 'Gigi Susu', 'Orang Tua', 

                                            'Susunan Gigi', '1-12 Tahun', 'Dokter Gigi', 'Radiografer'

                                        ].map((tag, i) => (

                                            <motion.span 

                                                key={tag}

                                                custom={i}

                                                variants={floatingVariants}

                                                animate="animate"

                                                className="bg-white px-7 py-3.5 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.08)] text-[15px] font-bold text-[#053247] border border-gray-50"

                                            >

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
                <motion.section id="keunggulan" {...fadeInUp} className="py-24 w-full max-w-[1920px] mx-auto px-6 lg:px-[160px] bg-white">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
                        <div className="flex flex-col gap-4">
                            <span className="inline-block px-6 py-2 bg-[#C3E3EE]/50 text-[#053247] font-bold rounded-full text-[14px] tracking-wide w-fit">KEUNGGULAN</span>
                            <h2 className="text-[40px] font-bold text-[#053247] leading-tight">Mengapa Harus Memilih DeTech?</h2>
                        </div>
                        <p className="text-[18px] text-gray-500 max-w-[420px] leading-relaxed">Solusi pintar yang membantu perawatan gigi anak jadi lebih mudah, cepat, dan jelas</p>
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
                            <div key={i} className={`p-8 rounded-[24px] border ${card.dark ? 'bg-[#053247] text-white border-none shadow-[0_20px_40px_rgba(5,50,71,0.3)]' : 'bg-[#C3E3EE]/20 border-white'} hover:shadow-[0_20px_40px_-15px_rgba(195,227,238,0.9)] transition-all duration-300`}>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 self-end shadow-sm ${card.dark ? 'bg-[#C3E3EE]/30 text-[#C3E3EE]' : 'bg-white text-[#053247]'}`}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={card.icon} /></svg>
                                </div>
                                <h3 className="text-[20px] font-bold mb-3">{card.title}</h3>
                                <p className={`leading-relaxed text-[16px] ${card.dark ? 'text-gray-300' : 'text-gray-500'}`}>{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* --- SECTION LAYANAN --- */}
                <motion.section id="layanan" {...fadeInUp} className="py-24 w-full max-w-[1920px] mx-auto px-6 lg:px-[160px] bg-white">
                    <div className="mb-14">
        
        {/* Header Section Layanan */}
        <div className="mb-10 text-center lg:text-left">
            <h2 className="text-[40px] font-bold text-[#053247] leading-tight">
                Apa saja yang bisa dilakukan DeTech?
            </h2>
        </div>

        {/* Grid Kartu Layanan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Template Layanan */}
            {[
                { title: "Analisis Rontgen Gigi Anak", desc: "Unggah rontgen panoramik", img: "layanan1.png" },
                { title: "Deteksi Gigi Susu Otomatis", desc: "Teknologi pintar yang bekerja", img: "layanan2.png" },
                { title: "Visualisasi & Penomoran Gigi", desc: "Hasil jelas dan mudah dipahami", img: "layanan3.png" },
                { title: "Laporan Pemeriksaan Digital", desc: "Siap dibagikan kapan saja", img: "layanan4.png" }
            ].map((item, index) => (
                <div key={index} className="relative group pt-16"> {/* Menambah padding top container agar gambar meluncur ke bawah */}
                    {/* Kartu Latar Belakang - Tinggi Dikurangi */}
                    <div className="p-6 pb-8 rounded-[24px] bg-gradient-to-b from-[#8BAFBF]/20 to-[#8BAFBF]/40 h-full flex flex-col justify-end min-h-[220px] border border-white/50 transition-all duration-300 group-hover:shadow-[0_20px_40px_-15px_rgba(195,227,238,0.9)] group-hover:-translate-y-1">
                        <h3 className="text-[19px] font-bold text-[#053247] mb-1.5 mt-10 leading-tight">
                            {item.title}
                        </h3>
                        <p className="text-[#053247]/70 text-[14px] leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                    {/* Gambar Animasi - Posisi diturunkan (top-2) agar mendekati teks */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[72%] z-10 transition-transform duration-500 group-hover:scale-105">
                        <img src={`assets/images/${item.img}`} alt={item.title} className="w-full h-auto drop-shadow-xl" />
                    </div>
                </div>
            ))}

        </div>
    </div>
                </motion.section>

                {/* Space antara layanan dan footer */}
                <div className="h-2" />

                {/* --- FOOTER SECTION --- */}
                <footer className="bg-[#053247] pt-24 pb-12 font-['DM_Sans'] text-white overflow-hidden relative w-full">
                    {/* Glow Effects */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C3E3EE]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#8BAFBF]/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

                    <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-[160px] relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                            {/* Branding */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-xl shadow-[0_0_20px_rgba(195,227,238,0.4)]">
                                        <img src="assets/images/logo-detech.png" alt="Logo" className="h-10 w-auto" />
                                    </div>
                                    <span className="text-2xl font-bold tracking-tight text-white">DeTech</span>
                                </div>
                                <p className="text-white/80 leading-relaxed text-[16px]">Platform cerdas berbasis AI untuk deteksi dini gigi susu anak melalui radiografi panoramik.</p>
                                <div className="flex gap-4">
                                    {/* Social Icons Berwarna Kebiruan */}
                                    {['M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z', 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'].map((path, i) => (
                                        <div key={i} className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-[#C3E3EE] hover:text-[#053247] transition-all cursor-pointer shadow-[0_10px_20px_rgba(195,227,238,0.2)]">
                                            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={path} /></svg>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Navigasi Footer */}
                            <div>
                                <h4 className="text-[18px] font-bold mb-8 text-white uppercase tracking-wider">Navigasi</h4>
                                <ul className="space-y-4 font-medium">
                                    {['Tentang Kami', 'Keunggulan', 'Layanan'].map((item) => (
                                        <li key={item}><a href={`#${item.toLowerCase().replace(' ', '')}`} className="text-white/70 hover:text-[#C3E3EE] transition-all flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#C3E3EE]" />{item}</a></li>
                                    ))}
                                </ul>
                            </div>
                            {/* Kontak */}
                            <div>
                                <h4 className="text-[18px] font-bold mb-8 text-white uppercase tracking-wider">Hubungi Kami</h4>
                                <ul className="space-y-6 text-white/80">
                                    <li className="flex gap-4"><svg className="w-5 h-5 text-[#C3E3EE]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>Jakarta Selatan, Indonesia</li>
                                    <li className="flex gap-4"><svg className="w-5 h-5 text-[#C3E3EE]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>support@detech.id</li>
                                </ul>
                            </div>
                            {/* Newsletter */}
                            <div>
                                <h4 className="text-[18px] font-bold mb-8 text-white uppercase tracking-wider">Newsletter</h4>
                                <p className="text-white/80 leading-relaxed text-[16px]">Jadilah yang pertama mengetahui pembaruan sistem AI kami dan tips perawatan gigi susu anak dari para ahli radiografi gigi</p>
                                <form className="relative mt-5">
                                    <input type="email" placeholder="Email Anda" className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-[#C3E3EE] transition-all" />
                                    <button className="absolute right-2 top-2 bottom-2 bg-[#C3E3EE] text-[#053247] px-4 rounded-xl font-bold hover:bg-white shadow-lg transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></button>
                                </form>
                            </div>
                        </div>
                        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/50 text-[14px]">
                            <p>© 2026 DeTech Project. Hak Cipta Dilindungi.</p>
                            <div className="flex gap-8"><a href="#" className="hover:text-[#C3E3EE]">Kebijakan Privasi</a><a href="#" className="hover:text-[#C3E3EE]">Syarat & Ketentuan</a></div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}