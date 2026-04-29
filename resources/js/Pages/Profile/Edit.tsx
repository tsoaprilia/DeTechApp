import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import { User, ShieldCheck, Camera, Lock, Info } from 'lucide-react';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ auth, mustVerifyEmail, status }: any) {
    const user = auth.user;
    // Avatar lebih clean dengan background navy
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=053247&color=fff&size=256&bold=true`;

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Profil Saya - DeTech" />

            {/* Container Utama - Kita hilangkan overflow-hidden di level atas agar foto bisa meluap keluar */}
            <div className="font-['DM_Sans'] pb-20 relative">
                
                {/* 1. HERO BANNER */}
                <div className="relative h-56 md:h-72 bg-gradient-to-br from-[#053247] via-[#1a4a5e] to-[#386274] rounded-[40px] md:rounded-[50px] shadow-2xl overflow-hidden">
                    {/* Tekstur Subtle Hexagon */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    
                    {/* Variasi Cahaya Gradient */}
                    <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
                    <div className="absolute bottom-[-20%] left--[5%] w-80 h-80 bg-[#C3E3EE]/10 rounded-full blur-[100px]"></div>
                </div>

                {/* 2. AREA FOTO PROFIL (OVERLAP) */}
                <div className="max-w-7xl mx-auto px-8 md:px-16 relative">
                    <div className="flex flex-col md:flex-row items-end gap-6 -mt-20 md:-mt-24 mb-12">
                        {/* Frame Foto */}
                        <div className="relative group z-20">
                            <div className="w-36 h-36 md:w-48 md:h-48 rounded-[45px] bg-white p-2.5 shadow-[0_20px_50px_rgba(5,50,71,0.2)] transition-all duration-500 hover:rotate-2">
                                <img 
                                    src={avatarUrl} 
                                    alt={user.name} 
                                    className="w-full h-full rounded-[38px] object-cover border-4 border-[#F1FBFF]" 
                                />
                            </div>
                            <div className="absolute bottom-3 right-3 p-2.5 bg-[#053247] text-white rounded-2xl shadow-xl border-4 border-white cursor-pointer hover:bg-[#46626B] hover:scale-110 transition-all">
                                <Camera size={18} />
                            </div>
                        </div>

                        {/* Nama & Role */}
                        <div className="flex-1 pb-4 text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-black text-[#053247] tracking-tight drop-shadow-sm">
                                {user.name}
                            </h2>
                            <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                                <span className="px-4 py-1.5 bg-[#C3E3EE] text-[#053247] rounded-full text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-2 border border-[#053247]/10">
                                    <ShieldCheck size={12} /> {user.role} Account
                                </span>
                                <span className="text-[#8BAFBF] text-xs font-bold italic">
                                    Joined since {new Date(user.created_at).getFullYear()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 3. GRID CONTENT */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        
                        {/* KIRI: INFORMASI PERSONAL */}
                        <div className="lg:col-span-8">
                            <div className="bg-white p-8 md:p-12 rounded-[55px] shadow-[0_15px_45px_rgba(195,227,238,0.4)] border border-white relative overflow-hidden group">
                                {/* Hiasan Background */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F1FBFF] rounded-bl-[100px] -z-0 opacity-50 group-hover:scale-110 transition-transform"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="p-3.5 bg-[#053247] text-white rounded-2xl shadow-lg shadow-[#053247]/20">
                                            <User size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-[#053247] tracking-tight">Informasi Personal</h3>
                                            <p className="text-xs text-[#8BAFBF] font-bold">Pastikan data Anda selalu valid dan terbaru</p>
                                        </div>
                                    </div>

                                    <UpdateProfileInformationForm 
                                        mustVerifyEmail={mustVerifyEmail} 
                                        status={status} 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* KANAN: SECURITY & ACTION */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Card Ganti Password */}
                            <div className="bg-white p-8 md:p-10 rounded-[50px] shadow-sm border border-[#C3E3EE] relative overflow-hidden">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2.5 bg-amber-50 text-amber-500 rounded-2xl">
                                        <Lock size={20} />
                                    </div>
                                    <h4 className="font-black text-[#053247] tracking-tight text-lg">Keamanan</h4>
                                </div>
                                <UpdatePasswordForm />
                            </div>

                            {/* Info Box Estetik */}
                            <div className="bg-[#053247] p-8 md:p-10 rounded-[50px] text-white shadow-2xl relative overflow-hidden group">
                                {/* Background Glow */}
                                <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-[#386274] rounded-full blur-[50px] opacity-40"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-4 opacity-70">
                                        <Info size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Update Terakhir</span>
                                    </div>
                                    <p className="text-sm font-bold leading-relaxed mb-6">
                                        Data profil Anda terakhir diperbarui pada <span className="text-[#C3E3EE]">{new Date(user.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>.
                                    </p>
                                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                                        <p className="text-[9px] font-bold text-white/50 uppercase mb-1">User ID Token</p>
                                        <code className="text-xs font-black text-[#C3E3EE]">#DETECH-{user.id}-{new Date().getFullYear()}</code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}