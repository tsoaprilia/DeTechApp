import { Link, useForm } from '@inertiajs/react';
import { LogOut } from 'lucide-react';

export default function Header({ user, profileImage }: any) {
    const { post } = useForm();

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('logout'));
    };

    return (
        <nav className="bg-white border-b border-[#C3E3EE]/30 px-6 py-3 shadow-sm relative z-[100]">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <img src="/assets/images/logo-detech.png" className="h-10 w-auto object-contain" alt="DeTech" />
                    <span className="text-2xl font-black text-[#053247] tracking-tight">DeTech</span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 pr-6 border-r border-gray-100">
                        <div className="relative">
                            <img 
                                src={profileImage} 
                                className="h-10 w-10 rounded-full border-2 border-[#C3E3EE] object-cover shadow-sm"
                                alt="Profile" 
                            />
                            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <span className="font-bold text-[#053247] text-sm hidden sm:block">{user.name}</span>
                    </div>

                    <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-red-600 transition-colors font-bold text-sm group">
                        <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                        <span className="hidden md:inline">Keluar</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}