import { useMemo, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import Header from '@/Components/Admin/Header';
import DatePickerHeader from '@/Components/DatePickerHeader';
import { Search, Eye, Trash2, Calendar, Hash, Activity, CheckCircle, Clock, AlertCircle, Filter, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../css/datepicker-custom.css';

export default function RiwayatDeteksi({ auth, radiographs = [] }: { auth: any, radiographs: any[] }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFilter, setDateFilter] = useState<Date | null>(null);
    const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'waiting'>('all');
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    
    // State untuk Modal Delete
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const isDokter = auth.user.role === 'dokter';
    const itemsPerPage = 8;
    const statusOptions = [
        { value: 'all', label: 'Semua Status', icon: <Filter size={15} /> },
        { value: 'verified', label: 'Terverifikasi', icon: <CheckCircle size={15} /> },
        { value: 'waiting', label: 'Menunggu', icon: <Clock size={15} /> },
    ] as const;

    const statusLabel = statusOptions.find((option) => option.value === statusFilter)?.label || 'Semua Status';

    const filteredData = useMemo(() => {
        const query = searchQuery.toLowerCase();

        return radiographs.filter(r => {
            const matchesSearch =
                (r.patient?.user?.name || "").toLowerCase().includes(query) ||
                (r.patient_nik || "").includes(searchQuery) ||
                (r.id_radiograph || "").toLowerCase().includes(query);

            const matchesDate = !dateFilter || toDateKey(r.created_at) === toDateKey(dateFilter);
            const matchesStatus = statusFilter === 'all' || r.status === statusFilter;

            return matchesSearch && matchesDate && matchesStatus;
        });
    }, [radiographs, searchQuery, dateFilter, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
    const visibleData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const startItem = filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, filteredData.length);

    const updateSearch = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const updateDateFilter = (value: Date | null) => {
        setDateFilter(value);
        setCurrentPage(1);
    };

    const updateStatusFilter = (value: 'all' | 'verified' | 'waiting') => {
        setStatusFilter(value);
        setShowStatusMenu(false);
        setCurrentPage(1);
    };

    const resetFilters = () => {
        setSearchQuery('');
        setDateFilter(null);
        setStatusFilter('all');
        setShowStatusMenu(false);
        setCurrentPage(1);
    };

    // Fungsi membuka modal
    const confirmDelete = (id: string) => {
        setSelectedId(id);
        setShowDeleteModal(true);
    };

   const executeDelete = () => {
    if (selectedId) {
        // GANTI 'riwayat' menjadi 'id' agar sesuai dengan {id} di web.php
        router.delete(route('admin.riwayat.destroy', { id: selectedId }), { 
            onSuccess: () => {
                setShowDeleteModal(false);
                setSelectedId(null);
            },
            onError: (errors) => {
                console.error(errors);
                alert("Gagal menghapus data.");
            },
            // Gunakan preserveState: false agar halaman melakukan refresh data secara bersih
            preserveState: false, 
            preserveScroll: true
        });
    }
};
    return (
        <div className="flex h-screen bg-[#053247] overflow-hidden font-['DM_Sans'] text-left">
            <Head title="Riwayat Deteksi - DeTech" />
            <style>{`
                .detech-datepicker {
                    border: 1px solid #C3E3EE;
                    border-radius: 24px;
                    box-shadow: 0 24px 60px rgba(5, 50, 71, 0.16);
                    overflow: hidden;
                    font-family: DM Sans, sans-serif;
                }
                .detech-datepicker .react-datepicker__header {
                    background: #F1FBFF;
                    border-bottom: 1px solid #C3E3EE;
                }
                .detech-datepicker .react-datepicker__current-month,
                .detech-datepicker .react-datepicker-time__header,
                .detech-datepicker .react-datepicker-year-header,
                .detech-datepicker .react-datepicker__day-name {
                    color: #053247;
                    font-weight: 900;
                }
                .detech-datepicker .react-datepicker__day {
                    border-radius: 12px;
                    color: #053247;
                    font-weight: 700;
                }
                .detech-datepicker .react-datepicker__day:hover {
                    background: #C3E3EE;
                }
                .detech-datepicker .react-datepicker__day--selected,
                .detech-datepicker .react-datepicker__day--keyboard-selected {
                    background: #053247;
                    color: white;
                }
                .detech-datepicker .react-datepicker__day--outside-month {
                    color: #8BAFBF;
                    opacity: 0.65;
                }
            `}</style>
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} auth={auth} />

            <main className="flex-1 bg-[#F1FBFF] relative overflow-y-auto lg:rounded-l-[60px] shadow-2xl transition-all duration-500">
                <div className="px-8 lg:px-12">
                    <Header auth={auth} onMenuClick={() => setSidebarOpen(true)} />
                </div>

                <div className="px-8 lg:px-12 pt-4 pb-12 space-y-6">
                    <section className="bg-white p-8 rounded-[40px] shadow-sm border border-[#C3E3EE] flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-[#F1FBFF] rounded-3xl text-[#053247] shadow-inner">
                                <Activity size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-[#053247] tracking-tight">Riwayat Deteksi</h3>
                                <p className="text-[#8BAFBF] font-medium text-sm">Arsip hasil analisis radiografi pasien</p>
                            </div>
                        </div>
                        
                        <div className="grid w-full xl:w-auto grid-cols-1 md:grid-cols-2 xl:grid-cols-[360px_190px_250px_auto] gap-3">
                            <div className="relative group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8BAFBF] group-focus-within:text-[#053247] transition-colors" size={20} />
                                <input 
                                    type="text" 
                                    placeholder="Cari Nama, NIK, atau ID Deteksi..." 
                                    className="w-full pl-14 pr-6 py-4 bg-[#F8FDFF] border border-[#C3E3EE] rounded-[22px] font-bold text-[#053247] outline-none focus:border-[#053247] focus:ring-4 focus:ring-[#053247]/5 transition-all shadow-sm"
                                    value={searchQuery}
                                    onChange={(e) => updateSearch(e.target.value)}
                                />
                            </div>

                            <div className="relative group">
                                <Calendar className="pointer-events-none absolute left-5 top-1/2 z-10 -translate-y-1/2 text-[#8BAFBF] group-focus-within:text-[#053247] transition-colors" size={18} />
                                <DatePicker
                                    selected={dateFilter}
                                    onChange={(date: Date | null) => updateDateFilter(date)}
                                    dateFormat="dd MMM yyyy"
                                    placeholderText="Pilih tanggal"
                                    renderCustomHeader={(props) => <DatePickerHeader {...props} />}
                                    calendarClassName="detech-datepicker"
                                    popperClassName="z-[120]"
                                    wrapperClassName="w-full"
                                    isClearable
                                    className="w-full pl-14 pr-10 py-4 bg-[#F8FDFF] border border-[#C3E3EE] rounded-[22px] font-bold text-[#053247] outline-none focus:border-[#053247] focus:ring-4 focus:ring-[#053247]/5 transition-all shadow-sm placeholder:text-[#8BAFBF]"
                                />
                            </div>

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowStatusMenu((value) => !value)}
                                    className={`flex w-full items-center justify-between gap-3 rounded-[22px] border px-5 py-4 text-left font-bold shadow-sm transition-all ${
                                        showStatusMenu
                                            ? 'border-[#053247] bg-white ring-4 ring-[#053247]/5'
                                            : 'border-[#C3E3EE] bg-[#F8FDFF] text-[#053247] hover:border-[#053247]'
                                    }`}
                                >
                                    <span className="flex items-center gap-3 text-[#053247]">
                                        <Filter size={18} className="text-[#8BAFBF]" />
                                        {statusLabel}
                                    </span>
                                    <ChevronRight size={18} className={`text-[#8BAFBF] transition-transform ${showStatusMenu ? 'rotate-90' : ''}`} />
                                </button>

                                {showStatusMenu && (
                                    <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-[130] rounded-[24px] border border-[#C3E3EE] bg-white p-2 shadow-[0_24px_60px_rgba(5,50,71,0.16)]">
                                        {statusOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => updateStatusFilter(option.value)}
                                                className={`flex w-full items-center gap-3 rounded-[18px] px-4 py-3 text-left text-sm font-black transition-all ${
                                                    statusFilter === option.value
                                                        ? 'bg-[#053247] text-white shadow-[0_10px_24px_rgba(5,50,71,0.18)]'
                                                        : 'text-[#053247] hover:bg-[#F1FBFF]'
                                                }`}
                                            >
                                                <span className={statusFilter === option.value ? 'text-white' : 'text-[#8BAFBF]'}>
                                                    {option.icon}
                                                </span>
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={resetFilters}
                                className="flex items-center justify-center gap-2 rounded-[22px] border border-[#C3E3EE] bg-white px-5 py-4 text-sm font-black text-[#053247] shadow-sm transition-all hover:bg-[#053247] hover:text-white"
                            >
                                <RotateCcw size={17} />
                                Reset
                            </button>
                        </div>
                    </section>

                    <div className="bg-white rounded-[40px] shadow-md border border-[#C3E3EE] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#deeff6]/30 border-b border-[#C3E3EE]">
                                        <th className="px-8 py-6 text-left text-xs font-black text-[#053247] uppercase tracking-widest">ID Deteksi</th>
                                        <th className="px-8 py-6 text-left text-xs font-black text-[#053247] uppercase tracking-widest">Pasien</th>
                                        <th className="px-8 py-6 text-left text-xs font-black text-[#053247] uppercase tracking-widest">Tanggal</th>
                                        <th className="px-8 py-6 text-center text-xs font-black text-[#053247] uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-6 text-center text-xs font-black text-[#053247] uppercase tracking-widest">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F1FBFF]">
                                    {visibleData.map((item) => (
                                        <tr key={item.id_radiograph} className="hover:bg-[#F1FBFF]/40 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-2">
                                                    <Hash size={14} className="text-[#8BAFBF]" />
                                                    <span className="font-bold text-[#053247]">{item.id_radiograph}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col text-left">
                                                    <span className="font-black text-[#053247]">{item.patient?.user?.name}</span>
                                                    <span className="text-xs font-bold text-[#8BAFBF]">{item.patient_nik}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-left">
                                                <div className="flex items-center gap-2 text-sm font-bold text-[#3B5862]">
                                                    <Calendar size={14} className="text-[#8BAFBF]" />
                                                    {new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </div>
                                            </td>
                                    
                                            <td className="px-8 py-5 text-center">
                                                {item.status === 'verified' ? (
                                                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase border border-emerald-100">
                                                        <CheckCircle size={12} /> Terverifikasi
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase border border-amber-100">
                                                        <Clock size={12} /> Menunggu
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-8 py-5">
    <div className="flex justify-center gap-3">
        {/* LOGIKA KHUSUS DOKTER DENGAN STATUS WAITING */}
        {isDokter && item.status === 'waiting' ? (
            <Link 
                href={route('admin.deteksi.detail', item.id_radiograph)} 
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition-all shadow-md flex items-center gap-2 font-black text-[11px] uppercase tracking-wider"
            >
                <CheckCircle size={16} />
                Verifikasi Sekarang
            </Link>
        ) : (
            /* TOMBOL LIHAT DETAIL BIASA */
            <Link 
                href={route('admin.deteksi.detail', item.id_radiograph)} 
                className="p-3 bg-[#EBF8FE] text-[#053247] rounded-2xl hover:bg-[#053247] hover:text-white transition-all shadow-sm"
            >
                <Eye size={18} />
            </Link>
        )}
        
        {/* TOMBOL HAPUS HANYA UNTUK ADMIN/RADIOGRAFER */}
        {!isDokter && (
            <button 
                onClick={() => confirmDelete(item.id_radiograph)}
                className="p-3 bg-[#FFF3F3] text-[#FF5B5B] rounded-2xl hover:bg-[#FF5B5B] hover:text-white transition-all shadow-sm"
            >
                <Trash2 size={18} />
            </button>
        )}
    </div>
</td>
                                        </tr>
                                    ))}
                                    {visibleData.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-16 text-center">
                                                <div className="mx-auto max-w-md rounded-[28px] border-2 border-dashed border-[#C3E3EE] bg-[#F8FDFF] p-8">
                                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#8BAFBF] shadow-sm">
                                                        <Search size={26} />
                                                    </div>
                                                    <p className="text-lg font-black text-[#053247]">Data tidak ditemukan</p>
                                                    <p className="mt-1 text-sm font-bold text-[#8BAFBF]">Coba ubah kata kunci, tanggal, atau status filter.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col gap-4 border-t border-[#F1FBFF] px-6 py-5 md:flex-row md:items-center md:justify-between">
                            <p className="text-sm font-bold text-[#8BAFBF]">
                                Menampilkan <span className="text-[#053247]">{startItem}-{endItem}</span> dari <span className="text-[#053247]">{filteredData.length}</span> riwayat
                            </p>

                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#C3E3EE] text-[#053247] transition-all hover:bg-[#053247] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-[#053247]"
                                    aria-label="Halaman sebelumnya"
                                >
                                    <ChevronLeft size={19} />
                                </button>

                                {Array.from({ length: totalPages }).map((_, index) => {
                                    const page = index + 1;
                                    const shouldShow = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                                    const previousShouldShow = page > 1 && (page - 1 === 1 || page - 1 === totalPages || Math.abs(page - 1 - currentPage) <= 1);

                                    if (!shouldShow && previousShouldShow) {
                                        return <span key={`ellipsis-${page}`} className="px-2 text-[#8BAFBF] font-black">...</span>;
                                    }

                                    if (!shouldShow) return null;

                                    return (
                                        <button
                                            type="button"
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`h-11 min-w-11 rounded-2xl px-4 text-sm font-black transition-all ${
                                                currentPage === page
                                                    ? 'bg-[#053247] text-white shadow-[0_10px_24px_rgba(5,50,71,0.18)]'
                                                    : 'border border-[#C3E3EE] bg-white text-[#053247] hover:bg-[#F1FBFF]'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}

                                <button
                                    type="button"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#C3E3EE] text-[#053247] transition-all hover:bg-[#053247] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-[#053247]"
                                    aria-label="Halaman berikutnya"
                                >
                                    <ChevronRight size={19} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* MODAL DELETE ESTETIK */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-[#053247]/70 backdrop-blur-md transition-all duration-300">
                    <div className="bg-white w-full max-w-md rounded-[45px] shadow-2xl p-10 text-center space-y-6 border border-[#C3E3EE] transform animate-in slide-in-from-bottom-4">
                        {/* Icon Peringatan */}
                        <div className="mx-auto w-24 h-24 bg-[#FFF3F3] text-[#FF5B5B] rounded-[30px] flex items-center justify-center border border-[#FFDEDE] shadow-inner">
                            <AlertCircle size={48} />
                        </div>
                        
                        <div className="space-y-2">
                            <h4 className="text-2xl font-black text-[#053247]">Hapus Riwayat?</h4>
                            <p className="text-[#8BAFBF] font-medium leading-relaxed text-sm px-2">
                                Data pemeriksaan <span className="font-bold text-[#053247]">#{selectedId}</span> akan dihapus permanen dari sistem DeTech.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button 
                                onClick={executeDelete} 
                                className="w-full py-4 bg-[#FF5B5B] text-white rounded-[22px] font-black text-lg shadow-lg hover:bg-red-600 transition-all active:scale-95"
                            >
                                Ya, Hapus Permanen
                            </button>
                            <button 
                                onClick={() => { setShowDeleteModal(false); setSelectedId(null); }} 
                                className="w-full py-4 bg-[#F1FBFF] text-[#053247] rounded-[22px] font-black text-lg hover:bg-[#EBF8FE] transition-all active:scale-95"
                            >
                                Batalkan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function toDateKey(value: string | Date) {
    const date = value instanceof Date ? value : new Date(value);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');

    return `${year}-${month}-${day}`;
}
