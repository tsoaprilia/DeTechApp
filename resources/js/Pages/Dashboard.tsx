import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Calendar, User, Clock, Stethoscope, ChevronRight, Search, CheckCircle } from 'lucide-react';
import HeaderPasien from '@/Components/Pasien/Header'; 

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

    // Helper format tanggal agar tidak kepanjangan
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="bg-[#F1FBFF] min-h-screen font-['DM_Sans'] text-left overflow-x-hidden">
            <Head title="Dashboard Pasien - DeTech" />
            
            <HeaderPasien user={auth.user} profileImage={getProfileImage()} />

            <main className="pb-20">
                {/* HERO SECTION */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-8">
                    <div className="relative bg-gradient-to-r from-[#C3E3EE] via-[#386274] to-[#063348] rounded-[32px] md:rounded-[40px] p-6 md:p-12 overflow-hidden flex flex-col md:flex-row items-center shadow-lg">
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

                        <div className="relative md:absolute z-30 md:bottom-8 md:right-[20%] lg:right-[25%] bg-white/20 backdrop-blur-lg p-4 rounded-2xl flex items-center gap-4 min-w-full md:min-w-[220px] border border-white/20 shadow-xl">
                            <div className="bg-white p-3 rounded-xl shadow-sm shrink-0">
                                <User className="text-[#053247]" size={24} />
                            </div>
                            <div className="text-left">
                                <p className="text-[12px] md:text-[14px] text-white/90 font-bold leading-none mb-1">Pemeriksaan</p>
                                <p className="text-2xl md:text-3xl font-black text-white leading-none">{stats.count_pemeriksaan}</p>
                            </div>
                        </div>

                        <img 
                            src="/assets/images/doctor-hero.png" 
                            className="absolute right-[-20px] bottom-0 h-[60%] md:h-[95%] w-auto object-contain z-20 pointer-events-none opacity-40 md:opacity-100" 
                            alt="Doctor" 
                        />
                    </div>
                </div>

                {/* INFORMASI PASIEN */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-10">
                    <div className="bg-white rounded-[24px] md:rounded-[30px] p-6 md:p-10 shadow-sm border border-[#C3E3EE]">
                        <h3 className="text-base md:text-lg font-black text-[#053247] mb-6 md:mb-8 flex items-center gap-3">
                            <User size={20} /> Informasi Pasien
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InfoField label="Nama Lengkap" value={auth.user.name} />
                            <InfoField label="NIK" value={patient?.nik || '-'} />
                            <InfoField label="Tempat lahir" value={patient?.birth_place || '-'} />
                            <InfoField label="Tanggal Lahir" value={patient?.birth_date || '-'} />
                            <InfoField label="Alamat" value={patient?.address || '-'} />
                            <InfoField label="No Telepon" value={auth.user.phone || '-'} />
                        </div>
                    </div>
                </div>

                {/* RIWAYAT DETEKSI */}
                <div id="riwayat-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-10 text-left">
                    <div className="bg-white rounded-[24px] md:rounded-[30px] p-6 md:p-10 shadow-sm border border-[#C3E3EE] space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h3 className="text-base md:text-lg font-black text-[#053247] flex items-center gap-3">
                                <Clock size={20} /> Riwayat Deteksi
                            </h3>
                            <div className="relative w-full md:w-72">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="text" placeholder="Cari ID Radiografi..." value={searchId} 
                                    onChange={(e) => setSearchId(e.target.value)} 
                                    className="w-full pl-12 pr-6 py-3 bg-[#F1FBFF] border-none rounded-xl text-sm focus:ring-[#053247]" 
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {filteredRadiographs.length > 0 ? (
                                filteredRadiographs.map((rad: any) => (
                                    <div key={rad.id_radiograph} className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 md:p-6 bg-[#F8FDFF] rounded-[24px] border border-[#C3E3EE] hover:shadow-md transition-all gap-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-10 w-full md:w-auto">
                                            {/* Info ID & Tanggal */}
                                            <div className="space-y-1">
                                                <p className="font-black text-[#053247] text-sm md:text-base">{rad.id_radiograph}</p>
                                                <div className="flex items-center gap-2 text-[11px] text-[#8BAFBF] font-bold">
                                                    <Calendar size={14} /> {formatDate(rad.created_at)}
                                                </div>
                                            </div>

                                            {/* Status Badge */}
                                            <div className="shrink-0">
                                                {rad.status === 'verified' ? (
                                                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase border border-emerald-100 shadow-sm">
                                                        <CheckCircle size={12} /> Terverifikasi
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase border border-amber-100 shadow-sm">
                                                        <Clock size={12} /> Menunggu
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <Link 
                                            href={route('pasien.deteksi.detail', rad.id_radiograph)} 
                                            className="w-full md:w-auto bg-[#053247] text-white px-8 py-3 rounded-xl font-black text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-[#0a4661] transition-all shadow-md active:scale-95"
                                        >
                                            Lihat Detail <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-gray-400 font-bold italic bg-[#F1FBFF] rounded-3xl border-2 border-dashed border-[#C3E3EE]">
                                    Belum ada data pemeriksaan.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function InfoField({ label, value }: any) {
    return (
        <div className="space-y-1 text-left">
            <p className="text-[10px] md:text-xs font-black text-[#053247] uppercase opacity-60 ml-1">{label}</p>
            <div className="w-full bg-[#F8FDFF] px-4 py-3 rounded-xl border border-[#C3E3EE] text-[#3B5862] font-bold text-xs md:text-sm shadow-sm">
                {value}
            </div>
        </div>
    );
}