import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import Header from '@/Components/Admin/Header';
import { 
    ArrowLeft, User, Calendar, FileText, CheckCircle, Clock, 
    Activity, Hash, Eye, Trash2, MapPin, Phone, Mail, Baby, Heart, Stethoscope,
    Camera
} from 'lucide-react';

export default function RiwayatDetailPasien({ auth, patient }: any) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleDelete = (id: string) => {
        if (confirm('Apakah Anda yakin ingin menghapus data riwayat ini?')) {
            router.delete(route('admin.riwayat.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <div className="flex h-screen bg-[#053247] overflow-hidden font-['DM_Sans'] text-left">
            <Head title={`Profil Medis - ${patient.user.name}`} />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} auth={auth} />

            <main className="flex-1 bg-[#F1FBFF] relative overflow-y-auto lg:rounded-l-[60px] shadow-2xl transition-all duration-500">
                <div className="px-8 lg:px-12"><Header auth={auth} onMenuClick={() => setSidebarOpen(true)} /></div>

                <div className="px-8 lg:px-12 pt-4 pb-12 space-y-8">
                    <Link href={route('admin.pasien.index')} className="flex items-center gap-2 text-[#8BAFBF] font-bold hover:text-[#053247] w-fit transition-all group">
                        <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-[#053247] group-hover:text-white transition-all">
                            <ArrowLeft size={18} />
                        </div>
                        Kembali ke Data Pasien
                    </Link>

                    {/* CARD PROFIL PASIEN ESTETIK */}
                    <section className="bg-white rounded-[50px] shadow-sm border border-[#C3E3EE] overflow-hidden">
                        <div className="bg-gradient-to-r from-[#053247] to-[#0a4661] p-10 flex flex-col md:flex-row items-center gap-10">
                            <div className="relative">
                                <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-[40px] border-2 border-white/20 flex items-center justify-center text-5xl font-black text-white shadow-2xl">
                                    {patient.user.name.substring(0, 1).toUpperCase()}
                                </div>
                                <div className="absolute -bottom-2 -right-2 p-3 bg-emerald-500 text-white rounded-2xl border-4 border-[#053247] shadow-lg">
                                    <Heart size={20} fill="currentColor" />
                                </div>
                            </div>
                            
                            <div className="flex-1 text-center md:text-left space-y-4">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 mb-3">
                                        <Baby size={12} /> Patient Profile
                                    </div>
                                    <h2 className="text-4xl font-black text-white tracking-tight">{patient.user.name}</h2>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <InfoSmall icon={<Hash />} label="NIK" value={patient.nik} />
                                    <InfoSmall icon={<User />} label="Gender" value={patient.gender === 'male' ? 'Laki-laki' : 'Perempuan'} />
                                    <InfoSmall icon={<MapPin />} label="Lahir" value={`${patient.birth_place}`} />
                                    <InfoSmall icon={<Calendar />} label="Tgl Lahir" value={new Date(patient.birth_date).toLocaleDateString('id-ID')} />
                                </div>
                            </div>
                        </div>

                        <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#F8FDFF]">
                            <ContactItem icon={<Phone className="text-emerald-500" />} label="No. Telepon" value={patient.user?.phone || '-'} />
                            <ContactItem icon={<Mail className="text-blue-500" />} label="Alamat Email" value={patient.user?.email || '-'} />
                            <ContactItem icon={<MapPin className="text-red-500" />} label="Alamat Tinggal" value={patient.address} isFull />
                        </div>
                    </section>

                    {/* TABEL RIWAYAT */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-[#C3E3EE]"></div>
                            <h3 className="text-sm font-black text-[#8BAFBF] uppercase tracking-[0.3em]">Log Pemeriksaan Radiografi</h3>
                            <div className="h-px flex-1 bg-[#C3E3EE]"></div>
                        </div>

                        <div className="bg-white rounded-[45px] shadow-xl shadow-blue-900/5 border border-[#C3E3EE] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-[#deeff6]/40 border-b border-[#C3E3EE]">
                                            <th className="px-8 py-7 text-left text-xs font-black text-[#053247] uppercase tracking-widest">ID Deteksi</th>
                                            <th className="px-8 py-7 text-left text-xs font-black text-[#053247] uppercase tracking-widest">Tanggal</th>
                                            <th className="px-8 py-7 text-left text-xs font-black text-[#053247] uppercase tracking-widest">Dokter Pemeriksa</th>
                                            <th className="px-8 py-7 text-center text-xs font-black text-[#053247] uppercase tracking-widest">Gigi Susu</th>
                                            <th className="px-8 py-7 text-center text-xs font-black text-[#053247] uppercase tracking-widest">Status</th>
                                            <th className="px-8 py-7 text-center text-xs font-black text-[#053247] uppercase tracking-widest">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#F1FBFF]">
                                        {patient.radiographs.map((item: any) => {
                                            // Ambil nama dokter dari detections (mengambil dokter pertama yang memverifikasi)
                                            
                                            const doctorName = item.dokter?.name || "Menunggu Verifikasi";
                                            const radiograferName = item.radiografer?.name || "Admin/Sistem";
                                            return (
                                                <tr key={item.id_radiograph} className="hover:bg-[#F1FBFF]/60 transition-all group">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-[#F1FBFF] rounded-lg text-[#8BAFBF]"><Hash size={14} /></div>
                                                            <span className="font-black text-[#053247]">{item.id_radiograph}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6 font-bold text-[#3B5862]">
                                                        {new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2 text-sm font-black text-[#053247]">
                                                                <Stethoscope size={14} className="text-blue-500" />
                                                                Dr: {doctorName}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-[11px] font-bold text-[#8BAFBF]">
                                                                <Camera size={12} />
                                                                Rad: {radiograferName}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6 text-center">
                                                        <span className="inline-flex items-center justify-center w-12 h-12 bg-[#053247] text-white rounded-2xl font-black text-xl shadow-lg shadow-[#053247]/20 transform group-hover:scale-110 transition-transform">
                                                            {item.detections_count || 0}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-center">
                                                        {item.status === 'verified' ? (
                                                            <span className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-tighter border border-emerald-100 shadow-sm">
                                                                <CheckCircle size={12} /> Terverifikasi
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-2 px-5 py-2 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-tighter border border-amber-100 shadow-sm">
                                                                <Clock size={12} /> Menunggu
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-8 py-6 text-center">
                                                        <div className="flex justify-center gap-3">
                                                            <Link 
                                                                href={route('admin.deteksi.detail', item.id_radiograph)}
                                                                className="p-4 bg-[#EBF8FE] text-[#053247] rounded-2xl border border-[#C3E3EE] hover:bg-[#053247] hover:text-white transition-all shadow-sm"
                                                            >
                                                                <Eye size={20} />
                                                            </Link>
                                                            <button 
                                                                onClick={() => handleDelete(item.id_radiograph)}
                                                                className="p-4 bg-[#FFF3F3] text-[#FF5B5B] rounded-2xl border border-[#FFDEDE] hover:bg-[#FF5B5B] hover:text-white transition-all shadow-sm"
                                                            >
                                                                <Trash2 size={20} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function InfoSmall({ icon, label, value }: any) {
    return (
        <div className="space-y-1">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                {icon} {label}
            </p>
            <p className="text-sm font-bold text-white">{value || '-'}</p>
        </div>
    );
}

function ContactItem({ icon, label, value, isFull = false }: any) {
    return (
        <div className={`flex items-start gap-4 ${isFull ? 'md:col-span-1' : ''}`}>
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-[#C3E3EE]">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black text-[#8BAFBF] uppercase tracking-widest">{label}</p>
                <p className="text-sm font-bold text-[#053247] leading-relaxed">{value || '-'}</p>
            </div>
        </div>
    );
}