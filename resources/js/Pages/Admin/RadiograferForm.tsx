import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import Header from '@/Components/Admin/Header';
import { User, Mail, Phone, Lock, ArrowLeft, Save } from 'lucide-react';

export default function RadiograferForm({ auth, radiografer = null }: { auth: any, radiografer: any }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isEditing = !!radiografer;

    const { data, setData, post, put, processing, errors } = useForm({
        name: radiografer?.name || '',
        email: radiografer?.email || '',
        phone: radiografer?.phone || '',
        password: '', // Kosongkan jika edit, kecuali mau ganti
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.radiografer.update', radiografer.id));
        } else {
            post(route('admin.radiografer.store'));
        }
    };

    return (
        <div className="flex h-screen bg-[#053247] overflow-hidden font-['DM_Sans']">
            <Head title={`${isEditing ? 'Edit' : 'Tambah'} Radiografer - DeTech`} />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} auth={auth} />

            <main className="flex-1 bg-[#F1FBFF] relative overflow-y-auto lg:rounded-l-[60px] shadow-2xl flex flex-col transition-all duration-500">
                <div className="px-8 lg:px-12">
                    <Header auth={auth} onMenuClick={() => setSidebarOpen(true)} />
                </div>

                <div className="px-8 lg:px-12 pt-4 pb-12">
                    <Link href={route('admin.radiografer.index')} className="inline-flex items-center gap-2 text-[#8BAFBF] hover:text-[#053247] font-bold mb-6 transition-colors">
                        <ArrowLeft size={20} /> Kembali ke Daftar
                    </Link>

                    <form onSubmit={submit} className="max-w-4xl space-y-6">
                        <section className="bg-white p-10 rounded-[40px] shadow-sm border border-[#C3E3EE] space-y-8">
                            <h3 className="text-xl font-bold text-[#053247] flex items-center gap-3">
                                <User className="text-[#8BAFBF]" size={24} /> 
                                {isEditing ? 'Perbarui Data Radiografer' : 'Tambah Radiografer Baru'}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup 
                                    label="Nama Lengkap" 
                                    value={data.name} 
                                    onChange={(e: any) => setData('name', e.target.value)} 
                                    placeholder="Masukkan nama" 
                                    icon={<User size={18} />} 
                                    error={errors.name}
                                />
                                <InputGroup 
                                    label="Email" 
                                    value={data.email} 
                                    onChange={(e: any) => setData('email', e.target.value)} 
                                    placeholder="email@detech.com" 
                                    icon={<Mail size={18} />} 
                                    error={errors.email}
                                />
                                <InputGroup 
                                    label="No. Telepon" 
                                    value={data.phone} 
                                    onChange={(e: any) => setData('phone', e.target.value.replace(/\D/g, ''))} 
                                    placeholder="08..." 
                                    icon={<Phone size={18} />} 
                                    error={errors.phone}
                                />
                                <InputGroup 
                                    label={isEditing ? "Password (Kosongkan jika tidak diubah)" : "Password"}
                                    type="password"
                                    value={data.password} 
                                    onChange={(e: any) => setData('password', e.target.value)} 
                                    placeholder="********" 
                                    icon={<Lock size={18} />} 
                                    error={errors.password}
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={processing} 
                                className="w-full py-5 bg-[#053247] text-white rounded-[24px] font-black text-lg shadow-xl hover:scale-[1.01] transition-all disabled:bg-gray-400 flex items-center justify-center gap-3"
                            >
                                <Save size={22} />
                                {processing ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Daftarkan Radiografer'}
                            </button>
                        </section>
                    </form>
                </div>
            </main>
        </div>
    );
}

// Reusable Component sesuai Style Paten Anda
function InputGroup({ label, placeholder, icon, value, onChange, type = "text", error }: any) {
    return (
        <div className="space-y-3 w-full text-left">
            <label className="text-sm font-black text-[#053247] ml-2 opacity-90">{label}</label>
            <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8BAFBF]">{icon}</div>
                <input 
                    type={type}
                    value={value} 
                    onChange={onChange}
                    className={`w-full pl-14 pr-5 py-4 bg-white border ${error ? 'border-red-500' : 'border-[#C3E3EE]'} rounded-[22px] font-medium text-[#3B5862] outline-none transition-all hover:bg-[#F1FBFF] focus:border-[#053247]`}
                    placeholder={placeholder}
                />
            </div>
            {error && <p className="text-red-500 text-xs ml-2 font-bold">{error}</p>}
        </div>
    );
}