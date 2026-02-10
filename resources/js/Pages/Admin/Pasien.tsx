import { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import Header from '@/Components/Admin/Header';
import { User, Search, Edit2, Trash2, Plus, Phone, Mail, X, Save, Lock, Hash, Users, AlertCircle, MapPin, Calendar, RefreshCcw } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Pasien({ auth, patients = [] }: { auth: any, patients: any[] }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedNik, setSelectedNik] = useState<string | null>(null);
    const [editData, setEditData] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Menggunakan form helper dari Inertia dengan namespace 'form'
    const form = useForm({
        nik: '', name: '', email: '', phone: '', birth_place: '', 
        birth_date: null as Date | null, address: '', gender: 'male', password: ''
    });

    // Proteksi filter agar tidak error jika data patients kosong
    const filteredData = Array.isArray(patients) ? patients.filter(p => 
        (p.user?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
        (p.nik || "").includes(searchQuery)
    ) : [];

    // FUNGSI 1: MEMBUKA MODAL (TAMBAH / EDIT)
    const openModal = (patient: any = null) => {
        form.clearErrors();
        if (patient) {
            setEditData(patient);
            form.setData({
                nik: patient.nik,
                name: patient.user?.name || '',
                email: patient.user?.email || '',
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

    // FUNGSI 2: KONFIRMASI HAPUS
    const confirmDelete = (nik: string) => {
        setSelectedNik(nik);
        setShowDeleteModal(true);
    };

    // FUNGSI 3: EKSEKUSI HAPUS
    const executeDelete = () => {
        if (selectedNik) {
            router.delete(route('admin.pasien.destroy', selectedNik), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setSelectedNik(null);
                },
                preserveScroll: true
            });
        }
    };

    // FUNGSI 4: SIMPAN DATA
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Memformat tanggal ke YYYY-MM-DD untuk database
        const formattedBirthDate = form.data.birth_date 
            ? new Date(form.data.birth_date).toLocaleDateString('en-CA') 
            : null;

        const payload = { ...form.data, birth_date: formattedBirthDate };
        const options = { 
            onSuccess: () => { 
                setShowModal(false); 
                form.reset(); 
            },
            preserveScroll: true 
        };

        if (editData) {
            router.put(route('admin.pasien.update', editData.nik), payload, options);
        } else {
            router.post(route('admin.pasien.store'), payload, options);
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
                                <input type="text" placeholder="Cari NIK/Nama..." className="w-full pl-14 pr-5 py-4 bg-[#F8FDFF] border border-[#C3E3EE] rounded-[22px] outline-none focus:border-[#053247] transition-all" onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                            <button onClick={() => openModal()} className="bg-[#053247] text-white px-8 py-4 rounded-[22px] font-black flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95"><Plus size={20} /> Tambah Pasien</button>
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
                                    {filteredData.map((p) => (
                                        <tr key={p.nik} className="hover:bg-[#F1FBFF]/40 transition-colors group">
                                            <td className="px-8 py-5 text-left font-bold text-[#053247]">{p.nik}</td>
                                            <td className="px-8 py-5 text-left font-bold text-[#3B5862]">{p.user?.name || '-'}</td>
                                            <td className="px-8 py-5 text-left text-sm text-[#8BAFBF] truncate max-w-[200px]">{p.address}</td>
                                            <td className="px-8 py-5 text-center">
                                                <div className="flex justify-center gap-3">
                                                    <Link href={route('admin.pasien.riwayat', p.nik)} className="p-3 bg-[#E6F6F4] text-[#0D9488] rounded-2xl border border-[#C3E3EE] hover:bg-[#0D9488] hover:text-white transition-all shadow-sm">
                                                        <RefreshCcw size={18} />
                                                    </Link>
                                                    <button onClick={() => openModal(p)} className="p-3 bg-[#EBF8FE] text-[#053247] rounded-2xl border border-[#C3E3EE] hover:bg-[#053247] hover:text-white transition-all"><Edit2 size={18} /></button>
                                                    <button onClick={() => confirmDelete(p.nik)} className="p-3 bg-[#FFF3F3] text-[#FF5B5B] rounded-2xl border border-[#FFDEDE] hover:bg-[#FF5B5B] hover:text-white transition-all"><Trash2 size={18} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            {/* MODAL FORM */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#053247]/60 backdrop-blur-sm text-left">
                    <div className="bg-white w-full max-w-4xl rounded-[50px] shadow-2xl border border-[#C3E3EE] overflow-y-auto max-h-[90vh]">
                        <div className="px-10 py-8 border-b border-[#F1FBFF] flex justify-between items-center bg-white sticky top-0 z-10 font-black uppercase">
                            <h3 className="text-2xl text-[#053247]">{editData ? 'Edit Pasien' : 'Registrasi Pasien'}</h3>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-all"><X size={28} /></button>
                        </div>
                        <form onSubmit={submit} className="p-10 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <ModalInput label="NIK (16 Digit)" value={form.data.nik} onChange={(e:any) => form.setData('nik', e.target.value.replace(/\D/g, ''))} icon={<Hash size={18}/>} error={form.errors.nik} maxLength={16} readOnly={!!editData} />
                                <ModalInput label="Nama Lengkap" value={form.data.name} onChange={(e:any) => form.setData('name', e.target.value)} icon={<User size={18}/>} error={form.errors.name} />
                                <ModalInput label="Email" type="email" value={form.data.email} onChange={(e:any) => form.setData('email', e.target.value)} icon={<Mail size={18}/>} error={form.errors.email} />
                                <ModalInput label="No. Telepon" value={form.data.phone} onChange={(e:any) => form.setData('phone', e.target.value.replace(/\D/g, ''))} icon={<Phone size={18}/>} error={form.errors.phone} />
                                <ModalInput label="Tempat Lahir" value={form.data.birth_place} onChange={(e:any) => form.setData('birth_place', e.target.value)} icon={<MapPin size={18}/>} error={form.errors.birth_place} />
                                
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-[#053247] uppercase tracking-widest ml-2 opacity-70">Tanggal Lahir</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8BAFBF] z-10" size={18} />
                                        <DatePicker 
                                            selected={form.data.birth_date} 
                                            onChange={(date: Date | null) => form.setData('birth_date', date)} 
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
                                <ModalInput label="Password" type="password" value={form.data.password} onChange={(e:any) => form.setData('password', e.target.value)} icon={<Lock size={18}/>} error={form.errors.password} placeholder={editData ? "Kosongkan jika tak diubah" : "********"} />
                                <div className="md:col-span-2">
                                    <ModalInput label="Alamat Lengkap" value={form.data.address} onChange={(e:any) => form.setData('address', e.target.value)} icon={<MapPin size={18}/>} error={form.errors.address} />
                                </div>
                            </div>
                            <button disabled={form.processing} className="w-full py-5 bg-[#053247] text-white rounded-[28px] font-black text-xl shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-3">
                                <Save size={24} /> {form.processing ? 'Menyimpan...' : 'Simpan Data Pasien'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL DELETE */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-[#053247]/70 backdrop-blur-md transition-all duration-300">
                    <div className="bg-white w-full max-w-md rounded-[45px] shadow-2xl p-10 text-center space-y-6 border border-[#C3E3EE] transform animate-in slide-in-from-bottom-4">
                        <div className="mx-auto w-24 h-24 bg-[#FFF3F3] text-[#FF5B5B] rounded-[30px] flex items-center justify-center border border-[#FFDEDE] shadow-inner"><AlertCircle size={48} /></div>
                        <div className="space-y-2">
                            <h4 className="text-2xl font-black text-[#053247]">Hapus Pasien?</h4>
                            <p className="text-[#8BAFBF] font-medium leading-relaxed text-sm">Tindakan ini permanen. Data pasien akan dihapus dari sistem DeTech.</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button onClick={executeDelete} className="w-full py-4 bg-[#FF5B5B] text-white rounded-[22px] font-black text-lg shadow-lg hover:bg-red-600 transition-all">Hapus Permanen</button>
                            <button onClick={() => setShowDeleteModal(false)} className="w-full py-4 bg-[#F1FBFF] text-[#053247] rounded-[22px] font-black text-lg hover:bg-[#EBF8FE] transition-all">Batal</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ModalInput({ label, value, onChange, icon, error, type = "text", placeholder = "", maxLength, readOnly }: any) {
    return (
        <div className="space-y-2 group text-left">
            <label className="text-xs font-black text-[#053247] uppercase tracking-widest ml-2 opacity-70 transition-opacity">{label}</label>
            <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8BAFBF] group-focus-within:text-[#053247] transition-colors">{icon}</div>
                <input 
                    type={type} value={value} onChange={onChange} placeholder={placeholder} maxLength={maxLength} readOnly={readOnly}
                    className={`w-full pl-16 pr-6 py-4 bg-white border ${error ? 'border-red-400' : 'border-[#C3E3EE]'} ${readOnly ? 'bg-gray-100' : ''} rounded-[22px] font-bold text-[#053247] outline-none focus:border-[#053247] focus:ring-4 focus:ring-[#053247]/5 transition-all shadow-inner placeholder:text-[#8BAFBF]/40`} 
                />
            </div>
            {error && <p className="text-red-500 text-[10px] font-black italic ml-4 mt-1 uppercase tracking-wider">{error}</p>}
        </div>
    );
}