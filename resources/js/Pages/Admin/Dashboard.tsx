import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/sidebar';
import Header from '@/Components/Admin/Header';
import { Users, Activity, UserPlus, Database } from 'lucide-react';

export default function Dashboard({ auth }: { auth: any }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
       <div className="flex h-screen bg-[#053247] overflow-hidden font-['DM_Sans']">
                   <Head title="Admin Dashboard" />
       
                   <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} auth={auth} />
       
                   <main className="flex-1 bg-[#F1FBFF] relative overflow-y-auto lg:rounded-l-[60px] shadow-2xl flex flex-col transition-all duration-500">
                       <div className="px-8 lg:px-12">
                           <Header auth={auth} onMenuClick={() => setSidebarOpen(true)} />
                       </div>

<div className="px-8 lg:px-12 pt-4 pb-12 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                        <StatCard title="Total Pasien" value="67" trend="+30" color="teal" icon={<Users />} />
                        <StatCard title="Total Dokter" value="24" trend="Aktif" color="navy" icon={<Activity />} />
                        <StatCard title="Total Radiografer" value="15" trend="+2" color="emerald" icon={<UserPlus />} />
                        <StatCard title="Deteksi" value="210" trend="Bulan Ini" color="blue" icon={<Database />} />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                        <ActivitySection title="Aktifitas Dokter" data={[
                            { name: 'dr. Ika Purwanti', detail: '45 Pasien', initials: 'IK', color: 'bg-emerald-500' },
                            { name: 'dr. Indana Zulfa', detail: '30 Pasien', initials: 'IN', color: 'bg-emerald-500' },
                            { name: 'dr. Anantasya', detail: '22 Pasien', initials: 'AN', color: 'bg-emerald-500' },
                        ]} />

                        <ActivitySection title="Aktifitas Radiografer" data={[
                            { name: 'Aprilia Cristyana', detail: '80 Deteksi', initials: 'AP', color: 'bg-amber-500' },
                            { name: 'Cristiana Putri', detail: '57 Deteksi', initials: 'CR', color: 'bg-amber-500' },
                            { name: 'Ihzam Fandi', detail: '12 Deteksi', initials: 'IH', color: 'bg-amber-500' },
                        ]} />
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatCard({ title, value, trend, color, icon }: any) {
    const colors: any = {
        teal: 'bg-[#E6F6F4] text-[#0D9488]',
        navy: 'bg-[#EBEFF1] text-[#053247]',
        emerald: 'bg-[#ECFDF5] text-[#10B981]',
        blue: 'bg-[#EFF6FF] text-[#3B82F6]',
    };

    const trendBg: any = {
        teal: 'bg-[#0D9488]',
        navy: 'bg-[#053247]',
        emerald: 'bg-[#10B981]',
        blue: 'bg-[#1E3A8A]',
    };

    return (
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-white/50 flex flex-col gap-5 transition-all duration-500 group cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(195,227,238,0.8),0_0_20px_#C3E3EE]">
            <div className="flex justify-between items-start mb-2">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors[color]} transition-transform group-hover:rotate-12`}>
                    {icon}
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[11px] font-black text-white uppercase tracking-wider ${trendBg[color]}`}>
                    {trend}
                </span>
            </div>
            <div>
                {/* Judul Teks Lebih Tipis (font-medium) */}
                <p className="text-gray-400 font-medium text-sm mb-1">{title}</p>
                <h3 className="text-5xl font-black text-[#053247] tracking-tighter leading-none">{value}</h3>
            </div>
        </div>
    );
}

function ActivitySection({ title, data }: any) {
    return (
        <div className="bg-white p-10 rounded-[50px] shadow-sm border border-white/50">
            <h3 className="text-xl font-black text-[#053247] mb-8 flex items-center gap-3">
                <div className="w-2 h-6 bg-[#8BAFBF] rounded-full" />
                {title}
            </h3>
            <div className="space-y-5">
                {data.map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-[#F1FBFF]/50 hover:bg-[#F1FBFF] rounded-[30px] transition-all border border-transparent hover:border-[#C3E3EE] hover:shadow-[0_10px_20px_#C3E3EE]">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-black text-lg border-4 border-white shadow-sm italic">
                                {item.initials}
                            </div>
                            <div>
                                <p className="font-black text-[#053247] text-lg">{item.name}</p>
                                <p className="text-sm font-bold text-gray-400">{item.detail}</p>
                            </div>
                        </div>
                        <span className={`px-5 py-1.5 ${item.color} text-white text-[11px] font-black rounded-xl shadow-lg uppercase tracking-widest`}>
                            Aktif
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}