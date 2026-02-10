import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar'; // Menggunakan Sidebar khusus Dokter
import Header from '@/Components/Dokter/Header';
import { Users, Activity, ClipboardCheck, Clock, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

export default function DokterDashboard({ auth }: { auth: any }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#053247] overflow-hidden font['DM_Sans'] text-left">
            <Head title="Dokter Dashboard - DeTech" />

            {/* Sidebar khusus Dokter */}
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} auth={auth} />

            <main className="flex-1 bg-[#F1FBFF] rellative overflow-y-auto lg:rounded-l-[60px] shadow-2xl flex flex-col transition-all duration-500">
                <div className="px-8 lg:px-12">
                    <Header auth={auth} onMenuClick={() => setSidebarOpen(true)} />
                </div>

                <div className="px-8 lg:px-12 pt-4 pb-12 space-y-8">
                    {/* STATS SECTION - Style Paten Dashboard */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                        <StatCard title="Pasien Saya" value="45" trend="Bulan Ini" color="teal" icon={<Users />} />
                        <StatCard title="Perlu Verifikasi" value="08" trend="Segera" color="navy" icon={<Clock />} />
                        <StatCard title="Total Verifikasi" value="112" trend="Selesai" color="emerald" icon={<CheckCircle />} />
                        <StatCard title="Riwayat Analisis" value="156" trend="Total" color="blue" icon={<ClipboardCheck />} />
                    </div>

                    {/* MAIN CONTENT SECTION */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                        {/* Antrean Verifikasi (Menunggu Tindakan Dokter) */}
                        <ActivitySection 
                            title="Antrean Verifikasi" 
                            icon={<Clock size={18}/>} 
                            data={[
                                { name: 'Ananda Fanz', detail: 'RAD-090226-001', initials: 'AF', date: '09/02/2026', type: 'pending' },
                                { name: 'Sandi Fanz', detail: 'RAD-090226-002', initials: 'SF', date: '09/02/2026', type: 'pending' },
                                { name: 'Nafia Zahra', detail: 'RAD-080226-014', initials: 'NZ', date: '08/02/2026', type: 'pending' },
                            ]} 
                        />

                        {/* Verifikasi Terbaru (Selesai Diverifikasi Dokter) */}
                        <ActivitySection 
                            title="Verifikasi Selesai" 
                            icon={<CheckCircle size={18}/>} 
                            data={[
                                { name: 'Adinda Maulida', detail: 'Terverifikasi Akurat', initials: 'AM', date: '07/02/2026', type: 'verified' },
                                { name: 'Fazaufa', detail: 'Terverifikasi Akurat', initials: 'FZ', date: '07/02/2026', type: 'verified' },
                                { name: 'Indana Fitri', detail: 'Terverifikasi Akurat', initials: 'IF', date: '06/02/2026', type: 'verified' },
                            ]} 
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

// Komponen StatCard (Sesuai Style Admin & Radiografer)
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
                <p className="text-gray-400 font-medium text-sm mb-1">{title}</p>
                <h3 className="text-5xl font-black text-[#053247] tracking-tighter leading-none">{value}</h3>
            </div>
        </div>
    );
}

// Komponen ActivitySection (Sesuai Style Admin & Radiografer)
function ActivitySection({ title, icon, data }: any) {
    return (
        <div className="bg-white p-10 rounded-[50px] shadow-sm border border-white/50">
            <h3 className="text-xl font-black text-[#053247] mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#8BAFBF] rounded-xl flex items-center justify-center text-white">
                    {icon}
                </div>
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
                                <p className="font-black text-[#053247] text-lg leading-tight">{item.name}</p>
                                {item.type === 'verified' ? (
                                    <span className="mt-1 px-3 py-0.5 bg-emerald-500 text-white text-[10px] font-black rounded-full inline-block uppercase tracking-tighter">
                                        {item.detail}
                                    </span>
                                ) : (
                                    <p className="text-sm font-bold text-gray-400">{item.detail}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-[#8BAFBF] font-bold text-xs">
                            <Calendar size={14} /> {item.date}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}