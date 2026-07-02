import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import Header from '@/Components/Admin/Header';
import { Search, ClipboardList, ArrowRight, Clock, Hash, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Verifikasi({ auth, antrean }: any) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const filteredData = antrean.filter((item: any) =>
        item.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nik.includes(searchQuery)
    );
    const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
    const visibleData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const startItem = filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, filteredData.length);

    const updateSearch = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

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
                                value={searchQuery} onChange={(e) => updateSearch(e.target.value)}
                            />
                        </div>
                    </section>

                    <div className="space-y-5">
                        {/* Grid Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                        {visibleData.map((item: any) => (
                            <div key={item.id} className="bg-white p-4 rounded-[30px] shadow-sm border border-[#C3E3EE] hover:shadow-xl transition-all group overflow-hidden flex flex-col">
                                {/* Header Card */}
                                <div className="flex justify-between items-center gap-3 mb-3">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="p-1.5 bg-[#F1FBFF] rounded-lg text-[#8BAFBF]"><Hash size={12} /></div>
                                        <span className="text-[10px] font-black text-[#053247] uppercase tracking-widest truncate">ID: {item.id}</span>
                                    </div>
                                    <div className="shrink-0 px-3 py-1 bg-[#C3E3EE] text-[#053247] rounded-full text-[9px] font-black uppercase tracking-tighter shadow-sm">Waiting</div>
                                </div>

                                {/* Image Preview */}
                                <div className="rounded-[22px] overflow-hidden bg-slate-100 aspect-video mb-4 border-2 border-[#F1FBFF] shadow-inner relative group-hover:scale-[1.02] transition-transform duration-500">
                                    <img src={`/storage/${item.image}`} className="w-full h-full object-cover" alt="Radiografi" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>

                                {/* Patient Info */}
                                <div className="space-y-3 flex-1">
                                    <div>
                                        <h4 className="text-base font-black text-[#053247] leading-tight mb-1 truncate">{item.patient_name}</h4>
                                        <p className="text-xs font-bold text-[#8BAFBF] tracking-widest">{item.nik}</p>
                                    </div>

                                    <div className="flex items-center justify-between gap-3 py-3 border-y border-[#F1FBFF]">
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
                                        className="w-full py-3.5 bg-[#053247] text-white rounded-[20px] font-black text-[11px] flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 hover:bg-black transition-all uppercase tracking-widest group"
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

                        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} startItem={startItem} endItem={endItem} totalItems={filteredData.length} />
                    </div>
                </div>
            </main>
        </div>
    );
}

function Pagination({ currentPage, totalPages, setCurrentPage, startItem, endItem, totalItems }: any) {
    return (
        <div className="flex flex-col gap-4 rounded-[30px] border border-[#C3E3EE] bg-white px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-bold text-[#8BAFBF]">
                Menampilkan <span className="text-[#053247]">{startItem}-{endItem}</span> dari <span className="text-[#053247]">{totalItems}</span> tugas
            </p>
            <div className="flex flex-wrap items-center gap-2">
                <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((page: number) => Math.max(1, page - 1))} className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#C3E3EE] text-[#053247] transition-all hover:bg-[#053247] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-[#053247]">
                    <ChevronLeft size={19} />
                </button>
                {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    const shouldShow = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                    const previousShouldShow = page > 1 && (page - 1 === 1 || page - 1 === totalPages || Math.abs(page - 1 - currentPage) <= 1);

                    if (!shouldShow && previousShouldShow) return <span key={`ellipsis-${page}`} className="px-2 text-[#8BAFBF] font-black">...</span>;
                    if (!shouldShow) return null;

                    return (
                        <button type="button" key={page} onClick={() => setCurrentPage(page)} className={`h-11 min-w-11 rounded-2xl px-4 text-sm font-black transition-all ${currentPage === page ? 'bg-[#053247] text-white shadow-[0_10px_24px_rgba(5,50,71,0.18)]' : 'border border-[#C3E3EE] bg-white text-[#053247] hover:bg-[#F1FBFF]'}`}>
                            {page}
                        </button>
                    );
                })}
                <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((page: number) => Math.min(totalPages, page + 1))} className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#C3E3EE] text-[#053247] transition-all hover:bg-[#053247] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-[#053247]">
                    <ChevronRight size={19} />
                </button>
            </div>
        </div>
    );
}
