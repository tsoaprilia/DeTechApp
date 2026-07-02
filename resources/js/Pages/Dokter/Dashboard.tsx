import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar'; 
import Header from '@/Components/Admin/Header';
import { Users, Clock, CheckCircle, ClipboardCheck, Calendar, ArrowRight, Activity, Bell } from 'lucide-react';

export default function DokterDashboard({ auth, stats, antrean, selesai }: any) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#053247] overflow-hidden font-['DM_Sans'] text-left">
            <Head title="Dokter Dashboard - DeTech" />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} auth={auth} />

            <main className="flex-1 bg-[#F1FBFF] relative overflow-y-auto lg:rounded-l-[60px] shadow-2xl flex flex-col transition-all duration-500">
                <div className="px-8 lg:px-12">
                    <Header auth={auth} onMenuClick={() => setSidebarOpen(true)} />
                </div>

                <div className="px-8 lg:px-12 pt-4 pb-12 space-y-10">
                    
                    {/* --- STAT CARDS --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                        <StatCard title="Pasien Saya" value={stats.pasienSaya} trend="Records" color="teal" icon={<Users />} />
                        <StatCard title="Antrean" value={stats.perluVerifikasi} trend="Perlu Tindakan" color="navy" icon={<Clock />} />
                        <StatCard title="Selesai" value={stats.totalVerifikasi} trend="Verified" color="emerald" icon={<CheckCircle />} />
                        <StatCard title="Total Sistem" value={stats.totalDeteksi} trend="Database" color="blue" icon={<ClipboardCheck />} />
                    </div>

                    <div className="grid grid-cols-12 gap-8">
                        
                        {/* --- COLUMN LEFT: ANTREAN VERIFIKASI --- */}
                        <div className="col-span-12 lg:col-span-7 bg-white p-10 rounded-[55px] shadow-sm border border-[#C3E3EE]">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black text-[#053247] flex items-center gap-3">
                                    <div className="p-2 bg-[#FFF9F0] text-[#FF9F1C] rounded-xl"><Clock size={24} /></div>
                                    Antrean Verifikasi
                                </h3>
                                <Link href={route('dokter.verifikasi.index')} className="rounded-full bg-[#F1FBFF] px-4 py-2 text-xs font-black text-[#8BAFBF] hover:bg-[#053247] hover:text-white uppercase tracking-widest flex items-center gap-1 transition-all">
                                    Lihat Semua <ArrowRight size={14} />
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {antrean.length > 0 ? antrean.map((item: any, i: number) => (
                                    <Link 
                                        key={i} 
                                        href={route('admin.deteksi.detail', item.id)}
                                        className="flex items-center justify-between p-6 bg-[#F8FDFF] hover:bg-white rounded-[35px] border border-transparent hover:border-[#C3E3EE] transition-all group shadow-sm hover:shadow-md"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 bg-gradient-to-tr from-[#46626B] to-[#8BAFBF] rounded-2xl flex items-center justify-center text-[#C3E3EE] font-black text-lg border-2 border-white shadow-md group-hover:scale-110 transition-transform">
                                                {item.initials}
                                            </div>
                                            <div>
                                                <p className="font-black text-[#053247] text-lg leading-tight">{item.name}</p>
                                                <p className="text-xs font-bold text-[#8BAFBF] mt-1 uppercase tracking-tighter">ID: {item.id}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="px-4 py-1.5 bg-[#FF9F1C] text-white text-[9px] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-orange-100">Verifikasi</div>
                                            <p className="text-[10px] font-bold text-[#8BAFBF] mt-2 italic">{item.time}</p>
                                            <p className="text-[9px] font-black text-[#8BAFBF]/70 mt-0.5">{item.date}</p>
                                        </div>
                                    </Link>
                                )) : (
                                    <div className="rounded-[35px] border border-dashed border-[#C3E3EE] bg-[#F8FDFF] p-10 text-center">
                                        <p className="text-lg font-black text-[#053247]">Belum ada antrean verifikasi</p>
                                        <p className="mt-2 text-sm font-bold text-[#8BAFBF]">Data terbaru akan muncul otomatis di sini.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* --- COLUMN RIGHT: RIWAYAT & INFO --- */}
                        <div className="col-span-12 lg:col-span-5 space-y-8">
                            <div className="bg-[#053247] p-10 rounded-[55px] text-white shadow-xl relative overflow-hidden">
                                <Activity className="absolute -right-10 -bottom-10 w-48 h-48 text-white/5 rotate-12" />
                                <h4 className="text-xl font-black mb-2 relative z-10">Halo, dr. {auth.user.name}!</h4>
                                <p className="text-white/60 text-sm leading-relaxed relative z-10">
                                    Ada <span className="text-emerald-400 font-black">{stats.perluVerifikasiHariIni} pasien</span> baru yang menunggu validasi radiografi gigi susu hari ini.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-[45px] shadow-sm border border-[#C3E3EE]">
                                <div className="mb-6 flex items-center justify-between gap-4">
                                    <h5 className="font-black text-[#053247] flex items-center gap-2">
                                        <div className="w-1.5 h-5 bg-[#C3E3EE] rounded-full" /> Selesai Diverifikasi
                                    </h5>
                                    <Link href={route('admin.riwayat')} className="text-[10px] font-black uppercase tracking-widest text-[#8BAFBF] hover:text-[#053247] flex items-center gap-1">
                                        Lihat Semua <ArrowRight size={12} />
                                    </Link>
                                </div>
                                <div className="space-y-4">
                                    {selesai.length > 0 ? selesai.map((item: any, i: number) => (
                                        <Link key={i} href={route('admin.deteksi.detail', item.id)} className="flex items-center justify-between p-4 bg-[#F4F9FB] hover:bg-white border border-transparent hover:border-[#C3E3EE] rounded-[25px] transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#8BAFBF] font-black text-xs border border-[#C3E3EE] shadow-sm">{item.initials}</div>
                                                <p className="text-sm font-black text-[#053247]">{item.name}</p>
                                            </div>
                                            <div className="text-[10px] font-bold text-[#8BAFBF]">{item.date}</div>
                                        </Link>
                                    )) : (
                                        <div className="rounded-[25px] border border-dashed border-[#C3E3EE] bg-[#F4F9FB] p-6 text-center">
                                            <p className="text-sm font-black text-[#053247]">Belum ada data selesai</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

// Komponen StatCard (Tetap sama karena sudah bagus)
function StatCard({ title, value, trend, color, icon }: any) {
    const colors: any = { teal: 'bg-[#E6F6F4] text-[#0D9488]', navy: 'bg-[#EBEFF1] text-[#053247]', emerald: 'bg-[#ECFDF5] text-[#10B981]', blue: 'bg-[#EFF6FF] text-[#3B82F6]' };
    const trendBg: any = { teal: 'bg-[#0D9488]', navy: 'bg-[#053247]', emerald: 'bg-[#10B981]', blue: 'bg-[#1E3A8A]' };

    return (
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-white flex flex-col gap-5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(195,227,238,0.5)] group">
            <div className="flex justify-between items-start mb-2">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors[color]} group-hover:rotate-12 transition-all`}>{icon}</div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest ${trendBg[color]}`}>{trend}</span>
            </div>
            <div>
                <p className="text-gray-400 font-bold text-xs mb-1 uppercase tracking-tight">{title}</p>
                <h3 className="text-5xl font-black text-[#053247] tracking-tighter leading-none">{value}</h3>
            </div>
        </div>
    );
}
