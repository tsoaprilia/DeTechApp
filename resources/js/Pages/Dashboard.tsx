import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, User, Clock, Stethoscope, User2, ChevronRight, Search } from 'lucide-react';
import Header from '@/Components/Pasien/Header';

export default function Dashboard({ auth, patient, radiographs, stats }: any) {
    const [searchId, setSearchId] = useState("");

    const getProfileImage = () => {
        const name = encodeURIComponent(auth.user.name);
        if (patient?.gender === 'female') {
            return `https://ui-avatars.com/api/?name=${name}&background=fce4ec&color=d81b60`;
        }
        return `https://ui-avatars.com/api/?name=${name}&background=e3f2fd&color=1976d2`;
    };

    const scrollToHistory = () => {
        document.getElementById('riwayat-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const filteredRadiographs = radiographs.filter((rad: any) => 
        rad.id_radiograph.toLowerCase().includes(searchId.toLowerCase())
    );

    return (
        <AuthenticatedLayout> 
            <Head title="Dashboard Pasien" />
            <Header user={auth.user} profileImage={getProfileImage()} />

            <div className="bg-[#F1FBFF] min-h-screen pb-20 font-['DM_Sans'] text-left">
                
                {/* HERO SECTION - Responsive Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-8">
                    <div className="relative bg-gradient-to-r from-[#C3E3EE] via-[#386274] to-[#063348] rounded-[32px] md:rounded-[40px] p-6 md:p-12 overflow-hidden flex flex-col md:flex-row items-center shadow-lg min-h-[auto] md:min-h-[260px]">
                        
                        {/* KONTEN TEKS */}
                        <div className="relative z-30 space-y-4 md:space-y-5 w-full md:w-3/5 text-center md:text-left mb-6 md:mb-0">
                            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                                Pusat Informasi <br className="hidden md:block"/> Gigi Susu Pasien
                            </h1>
                            <p className="text-white/80 text-sm md:text-lg max-w-[350px] mx-auto md:mx-0">
                                Lihat semua hasil deteksi dan enumerasi gigi susu yang telah dijalani!
                            </p>
                            <button onClick={scrollToHistory} className="w-full md:w-auto bg-[#053247] hover:bg-[#406474] text-white px-10 py-3 rounded-xl font-black transition-all shadow-lg text-sm uppercase">
                                Lihat Sekarang
                            </button>
                        </div>

                        {/* STATS CARD - Relative on Mobile, Absolute on Desktop */}
                        <div className="relative md:absolute z-30 md:bottom-8 md:right-[20%] lg:right-[25%] bg-white/20 backdrop-blur-lg p-4 rounded-2xl flex items-center gap-4 min-w-full md:min-w-[220px] border border-white/20 shadow-xl">
                            <div className="bg-white p-3 rounded-xl shadow-sm shrink-0">
                                <User className="text-[#053247]" size={24} />
                            </div>
                            <div className="text-left">
                                <p className="text-[12px] md:text-[14px] text-white/90 font-bold leading-none mb-1">Jumlah Pemeriksaan</p>
                                <p className="text-2xl md:text-3xl font-black text-white leading-none">{stats.count_pemeriksaan}</p>
                            </div>
                        </div>

                        {/* GAMBAR DOKTER - Opacity adjusted for Mobile */}
                        <img 
                            src="/assets/images/doctor-hero.png" 
                            className="absolute right-[-20px] bottom-0 h-[60%] md:h-[95%] w-auto object-contain z-20 pointer-events-none opacity-40 md:opacity-100" 
                            alt="Doctor" 
                        />
                        
                        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#C3E3EE]/30 to-transparent z-10"></div>
                    </div>
                </div>

                {/* INFORMASI PASIEN */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-10">
                    <div className="bg-white rounded-[24px] md:rounded-[30px] p-6 md:p-10 shadow-sm border border-[#C3E3EE]">
                        <h3 className="text-base md:text-lg font-black text-[#053247] mb-6 md:mb-8 flex items-center gap-3">
                            <User size={20} /> Informasi Pasien
                        </h3>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <InfoField label="Nama Lengkap" value={auth.user.name} />
                                <InfoField label="NIK" value={patient?.nik || '-'} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 md:gap-6">
                                <div className="md:col-span-3">
                                    <InfoField label="Tempat lahir" value={patient?.birth_place || '-'} />
                                </div>
                                <div className="md:col-span-3">
                                    <InfoField label="Tanggal Lahir" value={patient?.birth_date || '-'} />
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-[10px] md:text-xs font-black text-[#053247] uppercase mb-2">Umur</p>
                                    <div className="w-full bg-[#F1FBFF] px-4 py-3 rounded-xl border border-blue-50 text-[#3B5862] font-bold text-sm flex justify-between items-center min-h-[48px]">
                                        <span>{patient?.age || '0'}</span> <span className="text-[10px] text-gray-400">Thn</span>
                                    </div>
                                </div>
                                <div className="md:col-span-4">
                                    <p className="text-[10px] md:text-xs font-black text-[#053247] uppercase mb-2">Jenis Kelamin</p>
                                    <div className="flex gap-2">
                                        <GenderBadge active={patient?.gender === 'male'} label="Laki-Laki" />
                                        <GenderBadge active={patient?.gender === 'female'} label="Perempuan" />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <InfoField label="Alamat" value={patient?.address || '-'} />
                                <InfoField label="No Telepon" value={auth.user.phone || '-'} />
                            </div>
                        </div>
                    </div>
                </div>

               {/* RIWAYAT DETEKSI */}
<div id="riwayat-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-10">
    <div className="bg-white rounded-[24px] md:rounded-[30px] p-6 md:p-10 shadow-sm border border-[#C3E3EE] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-base md:text-lg font-black text-[#053247] flex items-center gap-3">
                <Clock size={20} /> Riwayat Deteksi
            </h3>
            <div className="relative w-full md:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Cari ID Radiografi..." 
                    value={searchId} 
                    onChange={(e) => setSearchId(e.target.value)} 
                    className="w-full pl-12 pr-6 py-3 bg-[#F1FBFF] border-none rounded-xl text-sm focus:ring-[#053247]" 
                />
            </div>
        </div>

        <div className="space-y-4">
            {/* LOGIKA FILTER DATA */}
            {filteredRadiographs.length > 0 ? (
                filteredRadiographs.map((rad: any) => (
                    <div key={rad.id_radiograph} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 bg-[#F1FBFF] rounded-[24px] border border-blue-50 hover:shadow-[0_10px_20px_#C3E3EE] transition-all gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-8 w-full md:w-auto">
                            <div className="shrink-0">
                                <p className="font-black text-[#053247] text-sm md:text-base">{rad.id_radiograph}</p>
                                <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-500 font-bold">
                                    <Calendar size={14} /> {rad.created_at}
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-2">
                                {/* BADGE WARNA DINAMIS: Kuning (Waiting) vs Hijau (Verified) */}
                                <div className={`px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase transition-colors ${
                                    rad.status === 'verified' 
                                    ? 'bg-emerald-100 text-emerald-700' 
                                    : 'bg-amber-100 text-amber-700'
                                }`}>
                                    {rad.detections_count} Gigi Terdeteksi
                                </div>

                                <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-gray-600">
                                    <Stethoscope size={14} /> {rad.dokter?.name || 'Admin DeTech'}
                                </div>
                            </div>
                        </div>
                        
                        <Link 
                            href={route('pasien.deteksi.detail', rad.id_radiograph)} 
                            className="w-full md:w-auto bg-[#053247] text-white px-8 py-3 rounded-xl font-black text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-[#406474] transition-all"
                        >
                            Lihat Detail <ChevronRight size={16} />
                        </Link>
                    </div>
                ))
            ) : (
                /* TAMPILAN JIKA DATA TIDAK DITEMUKAN */
                <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-[30px] border-2 border-dashed border-gray-200">
                    <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                        <Search size={32} className="text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-black text-sm uppercase tracking-widest">Data tidak ditemukan</p>
                    <p className="text-gray-400 text-xs mt-1">Coba masukkan ID Radiografi yang berbeda.</p>
                </div>
            )}
        </div>
    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function InfoField({ label, value }: any) {
    return (
        <div className="space-y-1 md:space-y-2 text-left">
            <p className="text-[10px] md:text-xs font-black text-[#053247] uppercase">{label}</p>
            <div className="w-full bg-[#F1FBFF] px-4 md:px-5 py-3 rounded-xl border border-blue-50 text-[#3B5862] font-bold text-xs md:text-sm min-h-[48px] flex items-center">
                {value}
            </div>
        </div>
    );
}

function GenderBadge({ active, label }: any) {
    return (
        <div className={`flex-1 flex items-center justify-center md:justify-start gap-2 md:gap-3 px-2 md:px-4 py-3 rounded-xl border text-[10px] md:text-sm font-black transition-all ${active ? 'bg-[#C3E3EE] border-[#053247] text-[#053247]' : 'bg-[#F1FBFF] border-blue-50 text-gray-300 opacity-50'}`}>
            <div className={`h-4 w-4 md:h-5 md:w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${active ? 'border-[#053247]' : 'border-gray-200'}`}>
                {active && <div className="h-2 md:h-2.5 w-2 md:w-2.5 bg-[#053247] rounded-full"></div>}
            </div>
            <span className="truncate">{label}</span>
        </div>
    );
}