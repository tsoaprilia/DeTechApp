import { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import Header from '@/Components/Admin/Header';
import DatePickerHeader from '@/Components/DatePickerHeader';
import { User, Search, Edit2, Trash2, Plus, Phone, Mail, X, Save, Lock, Hash, Users, AlertCircle, MapPin, Calendar, LucideEye, Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../css/datepicker-custom.css";

export default function Pasien({ auth, patients = [] }: { auth: any, patients: any[] }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedNik, setSelectedNik] = useState<string | null>(null);
    const [editData, setEditData] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Shortcut untuk cek role
    const isDokter = auth.user.role === 'dokter';

    const form = useForm({
        nik: '', 
        name: '', 
        email: '', 
        phone: '', 
        birth_place: '', 
        birth_date: null as Date | null, 
        address: '', 
        gender: 'male', 
        password: ''
    });

    const filteredData = Array.isArray(patients) ? patients.filter(p => 
        (p.user?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
        (p.nik || "").includes(searchQuery)
    ) : [];
    const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
    const visibleData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const startItem = filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, filteredData.length);

    const updateSearch = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const openModal = (patient: any = null) => {
        if (isDokter) return; // Dokter dilarang buka modal tambah/edit
        form.clearErrors();
        setShowPassword(false);
        if (patient) {
            setEditData(patient);
            form.setData({
                nik: patient.nik,
                name: patient.user?.name || '',
                email: patient.user?.email?.endsWith('@detech.id') ? '' : patient.user?.email || '',
                phone: patient.user?.phone || '',
                birth_place: patient.birth_place || '',
                birth_date: patient.birth_date ? new Date(patient.birth_date) : null,
                address: patient.address || '',
                gender: patient.gender || 'male',
                password: '', 
            });
        } else {
            setEditData(null);
            form.reset();
        }
        setShowModal(true);
    };

    const confirmDelete = (nik: string) => {
        if (isDokter) return;
        setSelectedNik(nik);
        setShowDeleteModal(true);
    };

    const executeDelete = () => {
        if (selectedNik) {
            router.delete(route('admin.pasien.destroy', selectedNik), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setSelectedNik(null);
                    router.visit(route('admin.pasien.index'), { preserveScroll: true });
                },
            });
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = { 
            onSuccess: () => { setShowModal(false); form.reset(); },
            preserveScroll: true,
            transform: (data: any) => ({
                ...data,
                birth_date: data.birth_date ? new Date(data.birth_date).toISOString().split('T')[0] : null
            })
        };
        if (editData) {
            form.put(route('admin.pasien.update', editData.nik), options);
        } else {
            form.post(route('admin.pasien.store'), options);
        }
    };

    return (
        <div className="flex h-screen bg-[#053247] overflow-hidden font-['DM_Sans'] text-left">
            <Head title="Data Pasien - DeTech" />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} auth={auth} />

            <main className="flex-1 bg-[#F1FBFF] relative overflow-y-auto lg:rounded-l-[60px] shadow-2xl flex flex-col transition-all duration-500">
                <div className="px-8 lg:px-12"><Header auth={auth} onMenuClick={() => setSidebarOpen(true)} /></div>

                <div className="px-8 lg:px-12 pt-4 pb-12 space-y-6">
                    <section className="bg-white p-8 rounded-[40px] shadow-sm border border-[#C3E3EE] flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-[#F1FBFF] rounded-3xl text-[#053247] shadow-inner"><Users size={32} /></div>
                            <div>
                                <h3 className="text-2xl font-black text-[#053247] tracking-tight">Manajemen Pasien</h3>
                                <p className="text-[#8BAFBF] font-medium text-sm">Pusat rekam medis pasien DeTech</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative w-full md:w-72 group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8BAFBF] group-focus-within:text-[#053247]" size={18} />
                                <input type="text" placeholder="Cari NIK/Nama..." className="w-full pl-14 pr-5 py-4 bg-[#F8FDFF] border border-[#C3E3EE] rounded-[22px] outline-none focus:border-[#053247] transition-all" onChange={(e) => updateSearch(e.target.value)} />
                            </div>
                            
                            {/* HANYA ADMIN/RADIOGRAFER YANG BISA TAMBAH PASIEN */}
                            {!isDokter && (
                                <button onClick={() => openModal()} className="bg-[#053247] text-white px-8 py-4 rounded-[22px] font-black flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95">
                                    <Plus size={20} /> Tambah Pasien
                                </button>
                            )}
                        </div>
                    </section>

                    <div className="bg-white rounded-[40px] shadow-md border border-[#C3E3EE] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#deeff6]/30 border-b border-[#C3E3EE]">
                                        <th className="px-8 py-6 text-xs font-black text-[#053247] uppercase text-left">NIK</th>
                                        <th className="px-8 py-6 text-xs font-black text-[#053247] uppercase text-left">Nama</th>
                                        <th className="px-8 py-6 text-xs font-black text-[#053247] uppercase text-left">Alamat</th>
                                        <th className="px-8 py-6 text-center text-xs font-black text-[#053247] uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F1FBFF]">
                                    {visibleData.map((p) => (
                                        <tr key={p.nik} className="hover:bg-[#F1FBFF]/40 transition-colors group">
                                            <td className="px-8 py-5 text-left font-bold text-[#053247]">{p.nik}</td>
                                            <td className="px-8 py-5 text-left font-bold text-[#3B5862]">{p.user?.name || '-'}</td>
                                            <td className="px-8 py-5 text-left text-sm text-[#8BAFBF] truncate max-w-[200px]">{p.address}</td>
                                            <td className="px-8 py-5 text-center">
                                                <div className="flex justify-center gap-3">
                                                    {/* TOMBOL LIHAT DETAIL - SEMUA ROLE BISA */}
                                                    <Link href={route('admin.pasien.riwayat', p.nik)} className="p-3 bg-[#E6F6F4] text-[#0D9488] rounded-2xl border border-[#C3E3EE] hover:bg-[#0D9488] hover:text-white transition-all shadow-sm flex items-center gap-2 font-bold text-xs uppercase px-5">
                                                        <LucideEye size={18} /> {isDokter ? 'Lihat Detail' : ''}
                                                    </Link>

                                                    {/* TOMBOL EDIT & DELETE - HANYA ADMIN/BUKAN DOKTER */}
                                                    {!isDokter && (
                                                        <>
                                                            <button onClick={() => openModal(p)} className="p-3 bg-[#EBF8FE] text-[#053247] rounded-2xl border border-[#C3E3EE] hover:bg-[#053247] hover:text-white transition-all"><Edit2 size={18} /></button>
                                                            <button onClick={() => confirmDelete(p.nik)} className="p-3 bg-[#FFF3F3] text-[#FF5B5B] rounded-2xl border border-[#FFDEDE] hover:bg-[#FF5B5B] hover:text-white transition-all"><Trash2 size={18} /></button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {visibleData.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-14 text-center">
                                                <div className="mx-auto max-w-md rounded-[28px] border-2 border-dashed border-[#C3E3EE] bg-[#F8FDFF] p-8">
                                                    <p className="text-lg font-black text-[#053247]">Data tidak ditemukan</p>
                                                    <p className="mt-1 text-sm font-bold text-[#8BAFBF]">Coba ubah NIK atau nama pasien.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} startItem={startItem} endItem={endItem} totalItems={filteredData.length} label="pasien" />
                    </div>
                </div>
            </main>

            {/* MODAL FORM (Hanya untuk Admin/Radiografer) */}
            {!isDokter && showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#053247]/60 backdrop-blur-sm text-left">
                    <div className="bg-white w-full max-w-4xl rounded-[50px] shadow-2xl border border-[#C3E3EE] overflow-y-auto max-h-[90vh]" style={{ scrollbarWidth: 'none' }}>
                        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                        <div className="px-10 py-8 border-b border-[#F1FBFF] flex justify-between items-center bg-white sticky top-0 z-10 font-black uppercase">
                            <h3 className="text-2xl text-[#053247]">{editData ? 'Edit Pasien' : 'Registrasi Pasien'}</h3>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-all"><X size={28} /></button>
                        </div>
                        <form onSubmit={submit} className="p-10 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <ModalInput label="NIK (16 Digit)" value={form.data.nik} onChange={(e:any) => form.setData('nik', e.target.value.replace(/\D/g, ''))} icon={<Hash size={18}/>} error={form.errors.nik} maxLength={16} readOnly={!!editData} />
                                <ModalInput label="Nama Lengkap" value={form.data.name} onChange={(e:any) => form.setData('name', e.target.value)} icon={<User size={18}/>} error={form.errors.name} />
                                <ModalInput
                                    label="Email (Opsional)"
                                    type="email"
                                    value={form.data.email}
                                    onChange={(e:any) => form.setData('email', e.target.value)}
                                    icon={<Mail size={18}/>}
                                    error={form.errors.email}
                                    placeholder="Boleh dikosongkan"
                                    hint="Isi email jika pasien ingin reset password lewat email."
                                />
                                <ModalInput label="No. Telepon" value={form.data.phone} onChange={(e:any) => form.setData('phone', e.target.value.replace(/\D/g, ''))} icon={<Phone size={18}/>} error={form.errors.phone} />
                                <ModalInput label="Tempat Lahir" value={form.data.birth_place} onChange={(e:any) => form.setData('birth_place', e.target.value)} icon={<MapPin size={18}/>} error={form.errors.birth_place} />
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-[#053247] uppercase tracking-widest ml-2 opacity-70">Tanggal Lahir</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8BAFBF] z-10" size={18} />
                                        <DatePicker
                                            selected={form.data.birth_date}
                                            onChange={(date: Date | null) => form.setData('birth_date', date)}
                                            renderCustomHeader={(props) => <DatePickerHeader {...props} />}
                                            calendarClassName="detech-datepicker"
                                            popperClassName="z-[120]"
                                            wrapperClassName="w-full"
                                            className="w-full pl-16 pr-6 py-4 bg-white border border-[#C3E3EE] rounded-[22px] font-bold text-[#053247] outline-none shadow-inner focus:border-[#053247] transition-all"
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Pilih tanggal"
                                        />
                                    </div>
                                    {form.errors.birth_date && <p className="text-red-500 text-[10px] font-black italic ml-4">{form.errors.birth_date}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-[#053247] uppercase tracking-widest ml-2 opacity-70">Jenis Kelamin</label>
                                    <div className="flex gap-4">
                                        {['male', 'female'].map((g) => (
                                            <button key={g} type="button" onClick={() => form.setData('gender', g as any)} className={`flex-1 py-4 rounded-[22px] font-bold border transition-all ${form.data.gender === g ? 'bg-[#053247] text-white border-[#053247]' : 'bg-white text-[#3B5862] border-[#C3E3EE]'}`}>
                                                {g === 'male' ? 'Laki-Laki' : 'Perempuan'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {editData && (
                                    <div className="space-y-2 group text-left">
                                        <label className="text-xs font-black text-[#053247] uppercase tracking-widest ml-2 opacity-70">
                                            Password Saat Ini
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8BAFBF]">
                                                <Lock size={18} />
                                            </div>
                                            <input
                                                type="password"
                                                value="password-ter-enkripsi"
                                                disabled
                                                className="w-full pl-16 pr-6 py-4 bg-[#F8FDFF] border border-[#C3E3EE] rounded-[22px] font-bold text-[#053247]/55 outline-none shadow-inner cursor-not-allowed"
                                            />
                                        </div>
                                        <p className="text-[10px] font-bold text-[#8BAFBF] ml-4 leading-relaxed">
                                            Password asli tersimpan terenkripsi, jadi tidak bisa ditampilkan. Isi password baru di bawah untuk menggantinya.
                                        </p>
                                    </div>
                                )}
                                <ModalInput
                                    label={editData ? "Password Baru" : "Password"}
                                    type={showPassword ? "text" : "password"}
                                    value={form.data.password}
                                    onChange={(e:any) => form.setData('password', e.target.value)}
                                    icon={<Lock size={18}/>}
                                    error={form.errors.password}
                                    placeholder={editData ? "Isi jika ingin mengganti password" : "Kosongkan untuk default: password"}
                                    hint={editData ? "Kosongkan jika tidak ingin mengganti password." : "Jika kosong, pasien login memakai NIK dan password default: password."}
                                    rightAction={
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((value) => !value)}
                                            className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#8BAFBF] transition hover:bg-[#F1FBFF] hover:text-[#053247]"
                                            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                                        >
                                            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                                        </button>
                                    }
                                />
                                <div className="md:col-span-2"><ModalInput label="Alamat Lengkap" value={form.data.address} onChange={(e:any) => form.setData('address', e.target.value)} icon={<MapPin size={18}/>} error={form.errors.address} /></div>
                            </div>
                            <button disabled={form.processing} className="w-full py-5 bg-[#053247] text-white rounded-[28px] font-black text-xl shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-3">
                                <Save size={24} /> {form.processing ? 'Memproses...' : 'Simpan Data Pasien'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL DELETE (Hanya untuk Admin/Radiografer) */}
            {!isDokter && showDeleteModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-[#053247]/70 backdrop-blur-md transition-all duration-300">
                    <div className="bg-white w-full max-w-md rounded-[45px] shadow-2xl p-10 text-center space-y-6 border border-[#C3E3EE]">
                        <div className="mx-auto w-24 h-24 bg-[#FFF3F3] text-[#FF5B5B] rounded-[30px] flex items-center justify-center border border-[#FFDEDE] shadow-inner"><AlertCircle size={48} /></div>
                        <div className="space-y-2">
                            <h4 className="text-2xl font-black text-[#053247]">Hapus Pasien?</h4>
                            <p className="text-[#8BAFBF] font-medium text-sm">Tindakan ini permanen.</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button onClick={executeDelete} className="w-full py-4 bg-[#FF5B5B] text-white rounded-[22px] font-black text-lg shadow-lg hover:bg-red-600 transition-all">Hapus Permanen</button>
                            <button onClick={() => setShowDeleteModal(false)} className="w-full py-4 bg-[#F1FBFF] text-[#053247] rounded-[22px] font-black text-lg">Batal</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Pagination({ currentPage, totalPages, setCurrentPage, startItem, endItem, totalItems, label }: any) {
    return (
        <div className="flex flex-col gap-4 border-t border-[#F1FBFF] px-6 py-5 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-bold text-[#8BAFBF]">
                Menampilkan <span className="text-[#053247]">{startItem}-{endItem}</span> dari <span className="text-[#053247]">{totalItems}</span> {label}
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

function ModalInput({ label, value, onChange, icon, error, type = "text", placeholder = "", maxLength, readOnly, rightAction = null, hint = "" }: any) {
    return (
        <div className="space-y-2 group text-left">
            <label className="text-xs font-black text-[#053247] uppercase tracking-widest ml-2 opacity-70">{label}</label>
            <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8BAFBF] group-focus-within:text-[#053247] transition-colors">{icon}</div>
                <input 
                    type={type} value={value} onChange={onChange} placeholder={placeholder} maxLength={maxLength} readOnly={readOnly}
                    className={`w-full pl-16 ${rightAction ? 'pr-16' : 'pr-6'} py-4 bg-white border ${error ? 'border-red-400 focus:border-red-400' : 'border-[#C3E3EE] focus:border-[#053247]'} ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''} rounded-[22px] font-bold text-[#053247] outline-none focus:ring-4 focus:ring-[#053247]/5 transition-all shadow-inner placeholder:text-[#8BAFBF]/40`} 
                />
                {rightAction}
            </div>
            {hint && !error && <p className="text-[10px] font-bold text-[#8BAFBF] ml-4 leading-relaxed">{hint}</p>}
            {error && <p className="text-red-500 text-[10px] font-black italic ml-4 mt-1 uppercase tracking-wider">{error}</p>}
        </div>
    );
}
