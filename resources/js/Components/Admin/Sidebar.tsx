import { Link } from '@inertiajs/react';
import { 
    LayoutGrid, 
    GitFork, 
    Camera, 
    User, 
    Users, 
    RefreshCcw, 
    LogOut 
} from 'lucide-react';

interface Props {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    auth: any;
}

export default function Sidebar({ isOpen, setIsOpen, auth }: Props) {
    const menuItems = [
        { name: 'Dashboard', icon: <LayoutGrid size={20} fill="currentColor" />, link: 'admin.dashboard' },
        { name: 'Deteksi Gigi Susu', icon: <GitFork size={20} />, link: 'admin.deteksi' },
        { name: 'Radiografer', icon: <Camera size={20} fill="currentColor" />, link: 'admin.radiografer.index' },
        { name: 'Data Dokter', icon: <User size={20} fill="currentColor" />, link: '#' },
        { name: 'Data Pasien', icon: <Users size={20} fill="currentColor" />, link: '#' },
        { name: 'Riwayat Deteksi', icon: <RefreshCcw size={20} />, link: '#' },
    ];

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setIsOpen(false)} />}
            
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#053247] transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col`}>
                
                <div className="p-8 mb-6 flex items-center gap-3">
                    <img src="/assets/images/logo-detech.png" alt="Logo" className="h-10 w-auto brightness-0 invert" />
                    <span className="text-2xl font-black text-white tracking-tighter uppercase italic">DETECH</span>
                </div>

                <nav className="flex-1 flex flex-col pl-4 relative space-y-1">
                    {menuItems.map((item, index) => {
                        // PERBAIKAN: Cek Route Aktif termasuk sub-route (wildcard)
                        const isActive = item.link !== '#' && (
                            route().current(item.link) || route().current(item.link + '.*')
                        );

                        return (
                            <div key={index} className={`relative group transition-all duration-300 ${isActive ? 'mb-6' : 'mb-0'}`}>
                                {isActive && (
                                    <>
                                        <div className="absolute inset-y-0 right-0 w-full bg-[#F1FBFF] rounded-l-full shadow-[-10px_0_15px_rgba(5,50,71,0.05)]" />
                                        <div className="absolute -top-10 right-0 w-10 h-10 bg-[#F1FBFF] pointer-events-none after:content-[''] after:absolute after:inset-0 after:bg-[#053247] after:rounded-br-[40px]" />
                                        <div className="absolute -bottom-10 right-0 w-10 h-10 bg-[#F1FBFF] pointer-events-none after:content-[''] after:absolute after:inset-0 after:bg-[#053247] after:rounded-tr-[40px]" />
                                    </>
                                )}
                                
                                <Link
                                    href={item.link !== '#' ? route(item.link) : '#'}
                                    className={`relative z-10 flex items-center gap-4 px-8 py-4 transition-all duration-300 ${
                                        isActive ? 'text-[#053247]' : 'text-white/70 hover:text-white'
                                    }`}
                                >
                                    <span className={`${isActive ? 'text-[#053247]' : 'text-white'}`}>{item.icon}</span>
                                    <span className={`text-[15px] ${isActive ? 'font-black' : 'font-medium'}`}>{item.name}</span>
                                </Link>
                            </div>
                        );
                    })}
                </nav>

                <div className="px-6 py-8 mt-auto">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center justify-center gap-3 w-full bg-[#C3E3EE] py-2.5 rounded-2xl font-black text-[#053247] shadow-[0_12px_24px_rgba(5,50,71,0.15)] hover:scale-[1.02] transition-all active:scale-95 group uppercase tracking-[0.15em] text-[12px]"
                    >
                        <div className="bg-[#053247]/10 p-1.5 rounded-lg transition-colors group-hover:bg-[#053247]/20">
                            <LogOut size={16} strokeWidth={3} />
                        </div>
                        <span>KELUAR</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}