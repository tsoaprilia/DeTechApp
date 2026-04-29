import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import Header from '@/Components/Admin/Header';
import { Search, ClipboardList, ArrowRight, Clock, Hash } from 'lucide-react';

export default function Verifikasi({ auth, antrean }: any) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = antrean.filter((item: any) =>
        item.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nik.includes(searchQuery)
    );

    return (
        <div className="flex h-screen bg-[#053247] overflow-hidden font-['DM_Sans'] text-left">
            <Head title="Tugas Verifikasi - DeTech" />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} auth={auth} />

            <main className="flex-1 bg-[#F1FBFF] relative overflow-y-auto lg:rounded-l-[60px] shadow-2xl transition-all duration-500">
                <div className="px-8 lg:px-12"><Header auth={auth} onMenuClick={() => setSidebarOpen(true)} /></div>

                <div className="px-8 lg:px-12 pt-4 pb-12 space-y-8">
                    {/* Header & Search */}
                    <section className="bg-white p-8 rounded-[40px] shadow-sm border border-[#C3E3EE] flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-5 text-left w-full">
                            <div className="p-4 bg-[#F1FBFF] rounded-3xl text-[#053247] shadow-inner"><ClipboardList size={32} /></div>
                            <div>
                                <h3 className="text-2xl font-black text-[#053247] tracking-tight">Tugas Verifikasi</h3>
                                <p className="text-[#8BAFBF] font-medium text-sm">Daftar radiografi yang menunggu validasi Anda</p>
                            </div>
                        </div>
                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8BAFBF] transition-colors" size={20} />
                            <input 
                                type="text" placeholder="Cari Nama atau NIK..." 
                                className="w-full pl-14 pr-6 py-4 bg-[#F8FDFF] border border-[#C3E3EE] rounded-[22px] font-bold text-[#053247] outline-none focus:border-[#053247] transition-all shadow-sm"
                                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </section>

                    {/* Grid Cards Style Pinterest */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {filteredData.map((item: any) => (
                            <div key={item.id} className="bg-white p-6 rounded-[45px] shadow-sm border border-[#C3E3EE] hover:shadow-xl transition-all group overflow-hidden flex flex-col">
                                {/* Header Card */}
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-[#F1FBFF] rounded-lg text-[#8BAFBF]"><Hash size={12} /></div>
                                        <span className="text-[10px] font-black text-[#053247] uppercase tracking-widest">ID: {item.id}</span>
                                    </div>
                                    <div className="px-3 py-1 bg-[#C3E3EE] text-[#053247] rounded-full text-[9px] font-black uppercase tracking-tighter shadow-sm">Waiting</div>
                                </div>

                                {/* Image Preview */}
                                <div className="rounded-[30px] overflow-hidden bg-slate-100 aspect-video mb-5 border-2 border-[#F1FBFF] shadow-inner relative group-hover:scale-[1.02] transition-transform duration-500">
                                    <img src={`/storage/${item.image}`} className="w-full h-full object-cover" alt="Radiografi" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>

                                {/* Patient Info */}
                                <div className="space-y-4 flex-1">
                                    <div>
                                        <h4 className="text-lg font-black text-[#053247] leading-tight mb-1">{item.patient_name}</h4>
                                        <p className="text-xs font-bold text-[#8BAFBF] tracking-widest">{item.nik}</p>
                                    </div>

                                    <div className="flex items-center justify-between py-4 border-y border-[#F1FBFF]">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-[#8BAFBF] uppercase">Tanggal Upload</p>
                                            <p className="text-xs font-bold text-[#053247] flex items-center gap-1.5">
                                                <Clock size={12} className="text-[#8BAFBF]" /> {item.date}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-black text-[#8BAFBF] uppercase">Status</p>
                                            <div className="flex items-center gap-1.5 justify-end mt-0.5">
                                                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
                                                <p className="text-xs font-black text-amber-500 uppercase">{item.status}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <Link 
                                        href={route('admin.deteksi.detail', item.id)} 
                                        className="w-full py-4 bg-[#053247] text-white rounded-[24px] font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 hover:bg-black transition-all uppercase tracking-widest group"
                                    >
                                        Verifikasi Sekarang <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredData.length === 0 && (
                        <div className="py-20 text-center bg-white rounded-[50px] border-2 border-dashed border-[#C3E3EE]">
                            <p className="text-[#8BAFBF] font-bold italic">Tidak ada tugas verifikasi yang ditemukan.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}