import Sidebar from '@/Components/Admin/Sidebar';
import Header from '@/Components/Admin/Header';
import { useState } from 'react';

export default function AuthenticatedLayout({ auth, children }: any) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#053247] overflow-hidden font-['DM_Sans'] text-left">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} auth={auth} />
            
            <main className="flex-1 bg-[#F1FBFF] relative overflow-y-auto lg:rounded-l-[60px] shadow-2xl transition-all duration-500">
                <div className="px-8 lg:px-12">
                    <Header auth={auth} onMenuClick={() => setSidebarOpen(true)} />
                </div>
                
                <div className="px-8 lg:px-12 pt-4 pb-12">
                    {children} {/* Konten Dashboard Admin/Dokter/Rad masuk di sini */}
                </div>
            </main>
        </div>
    );
}