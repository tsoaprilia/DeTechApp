import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import Header from '@/Components/Admin/Header';
import { Search, FileText, Eye, Trash2, Calendar, Hash, User, Activity, CheckCircle, Clock } from 'lucide-react';

export default function RiwayatDeteksi({ auth, radiographs = [] }: { auth: any, radiographs: any[] }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Filter logic berdasarkan Nama Pasien atau NIK
    const filteredData = radiographs.filter(r => 
        r.patient?.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        r.patient_nik.includes(searchQuery) ||
        r.id_radiograph.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id: string) => {
        if (confirm('Apakah Anda yakin ingin menghapus data riwayat ini?')) {
            router.delete(route('admin.riwayat.destroy', id));
        }
    };

    return (
        <div className="flex h-screen bg-[#053247] overflow-hidden font-['DM_Sans'] text-left">
            <Head title="Riwayat Deteksi - DeTech" />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} auth={auth} />

            <main className="flex-1 bg-[#F1FBFF] relative overflow-y-auto lg:rounded-l-[60px] shadow-2xl transition-all duration-500">
                <div className="px-8 lg:px-12">
                    <Header auth={auth} onMenuClick={() => setSidebarOpen(true)} />
                </div>

                <div className="px-8 lg:px-12 pt-4 pb-12 space-y-6">
                    {/* Header & Search Section */}
                    <section className="bg-white p-8 rounded-[40px] shadow-sm border border-[#C3E3EE] flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-[#F1FBFF] rounded-3xl text-[#053247] shadow-inner">
                                <Activity size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-[#053247] tracking-tight">Riwayat Deteksi</h3>
                                <p className="text-[#8BAFBF] font-medium text-sm">Arsip hasil analisis radiografi pasien</p>
                            </div>
                        </div>
                        
                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8BAFBF] group-focus-within:text-[#053247] transition-colors" size={20} />
                            <input 
                                type="text" 
                                placeholder="Cari Nama, NIK, atau ID Deteksi..." 
                                className="w-full pl-14 pr-6 py-4 bg-[#F8FDFF] border border-[#C3E3EE] rounded-[22px] font-bold text-[#053247] outline-none focus:border-[#053247] focus:ring-4 focus:ring-[#053247]/5 transition-all shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </section>

                    {/* Table Section */}
                    <div className="bg-white rounded-[40px] shadow-md border border-[#C3E3EE] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#deeff6]/30 border-b border-[#C3E3EE]">
                                        <th className="px-8 py-6 text-left text-xs font-black text-[#053247] uppercase tracking-widest">ID Deteksi</th>
                                        <th className="px-8 py-6 text-left text-xs font-black text-[#053247] uppercase tracking-widest">Pasien</th>
                                        <th className="px-8 py-6 text-left text-xs font-black text-[#053247] uppercase tracking-widest">Tanggal</th>
                                        <th className="px-8 py-6 text-center text-xs font-black text-[#053247] uppercase tracking-widest">Gigi Susu</th>
                                        <th className="px-8 py-6 text-center text-xs font-black text-[#053247] uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-6 text-center text-xs font-black text-[#053247] uppercase tracking-widest">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F1FBFF]">
                                    {filteredData.map((item) => (
                                        <tr key={item.id_radiograph} className="hover:bg-[#F1FBFF]/40 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-2">
                                                    <Hash size={14} className="text-[#8BAFBF]" />
                                                    <span className="font-bold text-[#053247]">{item.id_radiograph}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="font-black text-[#053247]">{item.patient?.user?.name}</span>
                                                    <span className="text-xs font-bold text-[#8BAFBF]">{item.patient_nik}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-2 text-sm font-bold text-[#3B5862]">
                                                    <Calendar size={14} className="text-[#8BAFBF]" />
                                                    {new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <span className="inline-flex items-center justify-center w-10 h-10 bg-[#053247] text-white rounded-xl font-black text-lg shadow-lg shadow-[#053247]/20">
                                                    {item.detections_count || 0}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                {item.status === 'verified' ? (
                                                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                                                        <CheckCircle size={12} /> Terverifikasi
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-100 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-amber-200">
                                                        <Clock size={12} /> Menunggu
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex justify-center gap-3">
                                                    <Link 
                                                        href={route('admin.deteksi.detail', item.id_radiograph)}
                                                        className="p-3 bg-[#EBF8FE] text-[#053247] rounded-2xl hover:bg-[#053247] hover:text-white transition-all shadow-sm"
                                                    >
                                                        <Eye size={18} />
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(item.id_radiograph)}
                                                        className="p-3 bg-[#FFF3F3] text-[#FF5B5B] rounded-2xl hover:bg-[#FF5B5B] hover:text-white transition-all shadow-sm"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredData.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-8 py-20 text-center text-[#8BAFBF] font-bold">
                                                Tidak ada riwayat deteksi ditemukan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}