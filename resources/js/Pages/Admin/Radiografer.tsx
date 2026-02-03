import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import Header from '@/Components/Admin/Header';
import { User, Search, Edit2, Trash2, Plus, Phone, Mail, X, Save, Lock, Hash, ShieldCheck, AlertCircle } from 'lucide-react';

export default function Radiografer({ auth, radiografers = [] }: { auth: any, radiografers: any[] }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [editData, setEditData] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '', email: '', phone: '', password: '',
    });

    const filteredData = radiografers.filter(r => 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        r.id.toString().includes(searchQuery)
    );

    const openModal = (radiografer: any = null) => {
        clearErrors();
        if (radiografer) {
            setEditData(radiografer);
            setData({
                name: radiografer.name,
                email: radiografer.email,
                phone: radiografer.phone || '',
                password: '', 
            });
        } else {
            setEditData(null);
            reset();
        }
        setShowModal(true);
    };

    const confirmDelete = (id: number) => {
        setSelectedId(id);
        setShowDeleteModal(true);
    };

    const executeDelete = () => {
        if (selectedId) {
            router.delete(route('admin.radiografer.destroy', selectedId), {
                onSuccess: () => setShowDeleteModal(false)
            });
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = { onSuccess: () => { setShowModal(false); reset(); } };
        editData ? put(route('admin.radiografer.update', editData.id), options) : post(route('admin.radiografer.store'), options);
    };

    return (
        <div className="flex h-screen bg-[#053247] overflow-hidden font-['DM_Sans']">
            <Head title="Data Radiografer - DeTech" />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} auth={auth} />

            <main className="flex-1 bg-[#F1FBFF] relative overflow-y-auto lg:rounded-l-[60px] shadow-2xl flex flex-col transition-all duration-500">
                <div className="px-8 lg:px-12">
                    <Header auth={auth} onMenuClick={() => setSidebarOpen(true)} />
                </div>

                <div className="px-8 lg:px-12 pt-4 pb-12 space-y-6">
                    {/* Header & Search Section - FIXED DUPLICATE */}
                    <section className="bg-white p-8 rounded-[40px] shadow-sm border border-[#C3E3EE] flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-[#F1FBFF] rounded-3xl text-[#053247] shadow-inner">
                                <ShieldCheck size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-[#053247] tracking-tight">Manajemen Radiografer</h3>
                                <p className="text-[#8BAFBF] font-medium text-sm">Kelola akses tenaga medis radiografi</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                            <div className="relative w-full md:w-72">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8BAFBF]" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Cari Nama/ID..." 
                                    className="w-full pl-14 pr-5 py-4 bg-[#F8FDFF] border border-[#C3E3EE] rounded-[22px] text-[#053247] font-medium outline-none focus:border-[#053247] focus:ring-4 focus:ring-[#053247]/5 transition-all"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button 
                                onClick={() => openModal()} 
                                className="w-full md:w-auto bg-[#053247] text-white px-8 py-4 rounded-[22px] font-black flex items-center justify-center gap-2 hover:bg-[#0a4661] hover:shadow-lg transition-all"
                            >
                                <Plus size={20} strokeWidth={3} /> Tambah Akun
                            </button>
                        </div>
                    </section>

                    {/* Table Section - SEPARATED EMAIL & PHONE */}
                    <div className="bg-white rounded-[40px] shadow-md border border-[#C3E3EE] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#deeff6]/30 border-b border-[#C3E3EE]">
                                        <th className="px-8 py-6 text-xs font-black text-[#053247] uppercase tracking-widest">ID</th>
                                        <th className="px-8 py-6 text-xs font-black text-[#053247] uppercase tracking-widest">Nama</th>
                                        <th className="px-8 py-6 text-xs font-black text-[#053247] uppercase tracking-widest">Email</th>
                                        <th className="px-8 py-6 text-xs font-black text-[#053247] uppercase tracking-widest">Nomor Telepon</th>
                                        <th className="px-8 py-6 text-center text-xs font-black text-[#053247] uppercase tracking-widest">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F1FBFF]">
                                    {filteredData.map((user) => (
                                        <tr key={user.id} className="hover:bg-[#F1FBFF]/40 transition-colors group">
                                            <td className="px-8 py-5">
                                                <span className="font-bold text-[#053247]">#{user.id}</span>
                                            </td>
                                            <td className="px-8 py-5 font-bold text-[#3B5862] text-lg">{user.name}</td>
                                            <td className="px-8 py-5 font-medium text-[#3B5862]">{user.email}</td>
                                            <td className="px-8 py-5 font-bold text-[#8BAFBF]">{user.phone || '-'}</td>
                                            <td className="px-8 py-5">
                                                <div className="flex justify-center gap-3">
                                                    <button onClick={() => openModal(user)} className="p-3 bg-[#EBF8FE] text-[#053247] rounded-2xl border border-[#C3E3EE] hover:bg-[#053247] hover:text-white transition-all">
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button onClick={() => confirmDelete(user.id)} className="p-3 bg-[#FFF3F3] text-[#FF5B5B] rounded-2xl border border-[#FFDEDE] hover:bg-[#FF5B5B] hover:text-white transition-all">
                                                        <Trash2 size={18} />
                                                    </button>
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

            {/* MODAL FORM - PATEN STYLE */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#053247]/60 backdrop-blur-sm transition-all duration-300">
                    <div className="bg-white w-full max-w-2xl rounded-[50px] shadow-2xl border border-[#C3E3EE] overflow-hidden transform animate-in zoom-in duration-200">
                        <div className="px-10 py-8 border-b border-[#F1FBFF] flex justify-between items-center bg-gradient-to-r from-[#F1FBFF] to-white">
                            <h3 className="text-2xl font-black text-[#053247] tracking-tight uppercase tracking-widest">
                                {editData ? 'Edit Profil' : 'Daftar Baru'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-all"><X size={28} /></button>
                        </div>
                        <form onSubmit={submit} className="p-10 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <ModalInput label="Nama Lengkap" value={data.name} onChange={(e:any) => setData('name', e.target.value)} icon={<User size={18}/>} error={errors.name} />
                                <ModalInput label="Alamat Email" type="email" value={data.email} onChange={(e:any) => setData('email', e.target.value)} icon={<Mail size={18}/>} error={errors.email} />
                                <ModalInput 
                                    label="Nomor Telepon (Maks 13)" 
                                    value={data.phone} 
                                    onChange={(e:any) => {
                                        const val = e.target.value.replace(/\D/g, '');
                                        if (val.length <= 13) setData('phone', val);
                                    }} 
                                    icon={<Phone size={18}/>} 
                                    error={errors.phone} 
                                />
                                <ModalInput label="Password" type="password" value={data.password} onChange={(e:any) => setData('password', e.target.value)} icon={<Lock size={18}/>} error={errors.password} placeholder={editData ? "Kosongkan jika tak diubah" : "Minimal 8 karakter"} />
                            </div>
                            <button disabled={processing} className="w-full py-5 bg-[#053247] text-white rounded-[28px] font-black text-xl flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:bg-gray-400">
                                <Save size={24} /> {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL DELETE - INTERESTING & PATEN */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-[#053247]/70 backdrop-blur-md transition-all duration-300">
                    <div className="bg-white w-full max-w-md rounded-[45px] shadow-2xl p-10 text-center space-y-6 border border-[#C3E3EE] transform animate-in slide-in-from-bottom-4 duration-300">
                        <div className="mx-auto w-24 h-24 bg-[#FFF3F3] text-[#FF5B5B] rounded-[30px] flex items-center justify-center shadow-inner border border-[#FFDEDE]">
                            <AlertCircle size={48} />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-2xl font-black text-[#053247]">Hapus Akun?</h4>
                            <p className="text-[#8BAFBF] font-medium leading-relaxed">Tindakan ini permanen. Data radiografer akan dihapus dari sistem DeTech.</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button onClick={executeDelete} className="w-full py-4 bg-[#FF5B5B] text-white rounded-[22px] font-black text-lg hover:bg-red-600 transition-all shadow-lg shadow-red-200">Ya, Hapus Permanen</button>
                            <button onClick={() => setShowDeleteModal(false)} className="w-full py-4 bg-[#F1FBFF] text-[#053247] rounded-[22px] font-black text-lg hover:bg-[#EBF8FE] transition-all">Batalkan</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ModalInput({ label, value, onChange, icon, error, type = "text", placeholder = "" }: any) {
    return (
        <div className="space-y-2 group text-left">
            <label className="text-xs font-black text-[#053247] uppercase tracking-widest ml-2 opacity-70 group-focus-within:opacity-100 transition-opacity">{label}</label>
            <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8BAFBF] group-focus-within:text-[#053247] transition-colors">{icon}</div>
                <input 
                    type={type} 
                    value={value} 
                    onChange={onChange} 
                    placeholder={placeholder} 
                    className={`w-full pl-16 pr-6 py-4 bg-white border ${error ? 'border-red-400' : 'border-[#C3E3EE]'} rounded-[22px] font-bold text-[#053247] placeholder:text-[#8BAFBF]/50 outline-none focus:border-[#053247] focus:ring-4 focus:ring-[#053247]/5 transition-all shadow-inner`} 
                />
            </div>
            {error && <p className="text-red-500 text-[10px] font-black italic ml-4 mt-1 uppercase tracking-wider">{error}</p>}
        </div>
    );
}