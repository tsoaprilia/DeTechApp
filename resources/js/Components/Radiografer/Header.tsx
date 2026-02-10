import { Link, usePage } from '@inertiajs/react';
import { Menu, ChevronDown, User, ShieldCheck, Settings, GitFork, Users, CameraIcon } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function Header({ auth, onMenuClick }: { auth: any, onMenuClick: () => void }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { url } = usePage();

    // PERBAIKAN: Logika Judul & Ikon Dinamis menggunakan Wildcard
    const pageConfig = useMemo(() => {
        // Dashboard
        if (route().current('admin.dashboard')) {
            return { title: 'Dashboard', icon: <ShieldCheck size={28} strokeWidth={2.5} /> };
        }
        
        // Deteksi Gigi Susu (Termasuk halaman detail .show dan .analyze)
        if (route().current('admin.deteksi') || route().current('admin.deteksi.*')) {
            return { title: 'Deteksi Gigi Susu', icon: <GitFork size={28} strokeWidth={2.5} /> };
        }

        // Contoh Data Pasien jika nanti ada
        if (route().current('admin.radiografer.*')) {
            return { title: 'Data Radiografer', icon: <CameraIcon size={28} strokeWidth={2.5} /> };
        }
        
        // Contoh Data Pasien jika nanti ada
        if (route().current('admin.pasien.*')) {
            return { title: 'Data Pasien', icon: <Users size={28} strokeWidth={2.5} /> };
        }
        
        return { title: 'Dashboard', icon: <ShieldCheck size={28} strokeWidth={2.5} /> };
    }, [url]);

    const getInitials = (name: string) => {
        return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
    };

    const avatarColor = useMemo(() => {
        const colors = ['bg-[#8BAFBF]', 'bg-[#4C7282]', 'bg-[#053247]', 'bg-[#C3E3EE]', 'bg-[#46626B]'];
        const index = auth.user.id % colors.length;
        return colors[index];
    }, [auth.user.id]);

    return (
        <header className="flex items-center justify-between py-6 bg-transparent relative z-30 font-['DM_Sans']">
            <div className="flex items-center gap-5">
                <button onClick={onMenuClick} className="lg:hidden p-2 bg-white rounded-xl shadow-sm text-[#053247]">
                    <Menu size={24} />
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-[0_10px_25px_rgba(5,50,71,0.08)] flex items-center justify-center text-[#053247] border border-white/50">
                        {pageConfig.icon}
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-black text-[#053247] tracking-tight">
                        {pageConfig.title}
                    </h1>
                </div>
            </div>

            <div className="relative">
                <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3 bg-white/80 backdrop-blur-md p-1.5 pr-5 rounded-full border border-white shadow-sm hover:border-[#C3E3EE] transition-all duration-300 active:scale-95 group"
                >
                    <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center border-2 border-white shadow-sm transition-transform group-hover:scale-105 group-hover:rotate-3`}>
                        <span className="text-white font-bold text-xs">
                            {getInitials(auth.user.name)}
                        </span>
                    </div>

                    <div className="hidden sm:block text-left">
                        <p className="text-[10px] font-bold text-gray-400 leading-none mb-1 uppercase tracking-wider">
                            {auth.user.role || 'Administrator'}
                        </p>
                        <p className="text-sm font-black text-[#053247] leading-none">{auth.user.name}</p>
                    </div>
                    <ChevronDown size={16} className={`text-[#053247] transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-[2rem] shadow-[0_25px_60px_rgba(5,50,71,0.18)] border border-gray-50 p-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <Link href={route('profile.edit')} className="flex items-center gap-3 px-4 py-3 hover:bg-[#F1FBFF] rounded-2xl transition-colors group">
                            <div className="p-2 bg-blue-50 rounded-xl text-[#8BAFBF] group-hover:bg-white transition-colors shadow-sm"><User size={18} /></div>
                            <span className="font-bold text-[#053247] text-sm">Detail Profil</span>
                        </Link>
                        <Link href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-[#F1FBFF] rounded-2xl transition-colors group">
                            <div className="p-2 bg-gray-50 rounded-xl text-gray-400 group-hover:bg-white transition-colors shadow-sm"><Settings size={18} /></div>
                            <span className="font-bold text-[#053247] text-sm">Pengaturan</span>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}