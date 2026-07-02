import { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import Header from '@/Components/Admin/Header';
import { Users, Activity, UserPlus, Database, TrendingUp, Bell, Clock, ChevronRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function Dashboard({ auth, stats, aktifitasDokter, aktifitasRadiografer, dataMingguan, dataBulanan, notifications }: any) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filter, setFilter] = useState('W'); 

    const activeChartData = useMemo(() => {
        return filter === 'M' ? dataBulanan : dataMingguan;
    }, [filter, dataMingguan, dataBulanan]);

    return (
        <div className="flex h-screen bg-[#053247] overflow-hidden font-['DM_Sans'] text-left">
            <Head title="Admin Dashboard" />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} auth={auth} />

            <main className="flex-1 bg-[#F1FBFF] relative overflow-y-auto lg:rounded-l-[60px] shadow-2xl transition-all duration-500">
                <div className="px-8 lg:px-12">
                    <Header auth={auth} onMenuClick={() => setSidebarOpen(true)} />
                </div>

                <div className="px-8 lg:px-12 pt-4 pb-12 grid grid-cols-12 gap-8">
                    
                    {/* --- LEFT COLUMN --- */}
                    <div className="col-span-12 lg:col-span-3 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white p-10 rounded-[45px] shadow-sm text-center border border-[#C3E3EE]">
                            <div className="relative w-28 h-28 mx-auto mb-6">
                                <div className="w-full h-full bg-gradient-to-tr from-[#46626B] to-[#8BAFBF] rounded-[35px] flex items-center justify-center text-white text-4xl font-black shadow-xl border-4 border-[#F0F7F9]">
                                    {auth.user.name.substring(0, 1).toUpperCase()}
                                </div>
                            </div>
                            <h4 className="text-xl font-black text-[#053247]">{auth.user.name}</h4>
                            <p className="text-xs font-bold text-[#8BAFBF] uppercase tracking-[0.2em] mt-2">Administrator</p>
                            <div className="mt-6 pt-6 border-t border-[#F0F7F9]">
                                <div className="bg-[#F1FBFF] py-3 px-4 rounded-2xl inline-flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                    <p className="text-[10px] font-black text-[#46626B] uppercase tracking-widest">Sistem Online</p>
                                </div>
                            </div>
                        </div>

                        {/* Notifications List - SCROLLBAR FIX HERE */}
                        <div className="bg-white p-8 rounded-[45px] shadow-sm border border-[#C3E3EE] max-h-[550px] overflow-y-auto space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <h5 className="font-black text-[#053247] mb-2 flex items-center gap-2">
                                <Bell size={18} className="text-[#8BAFBF]"/> Notifikasi
                            </h5>
                            
                            {notifications.map((notif: any, i: number) => (
                                <Link 
                                    key={i} 
                                    href={route('admin.deteksi.detail', notif.id)} 
                                    className="flex gap-4 p-4 bg-[#F1FBFF] hover:bg-white rounded-[25px] border border-transparent hover:border-[#C3E3EE] transition-all group shadow-sm hover:shadow-md block"
                                >
                                    {/* Tanggal Kotak */}
                                    <div className="text-[10px] font-black text-[#46626B] flex flex-col items-center justify-center bg-white h-12 w-12 shrink-0 rounded-2xl shadow-inner leading-tight uppercase border border-[#E3F0F5]">
                                        <span className="text-lg">{notif.date.split(' ')[0]}</span>
                                        <span className="opacity-60">{notif.date.split(' ')[1]}</span>
                                    </div>

                                    {/* Detail Teks */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-black text-[#053247] leading-tight truncate">
                                            {notif.patient_name}
                                        </p>
                                        <p className="text-[10px] font-bold text-[#8BAFBF] mt-1 flex items-center gap-1">
                                            <Clock size={10}/> {notif.time}
                                        </p>
                                    </div>
                                    
                                    {/* Panah Indikator */}
                                    <div className="flex items-center text-[#C3E3EE] group-hover:text-[#8BAFBF] transition-colors">
                                        <ChevronRight size={14} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN --- */}
                    <div className="col-span-12 lg:col-span-9 space-y-8 text-left">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <SmallStat title="Patients" value={stats.totalPasien} icon={<Users size={20}/>} color="#8BAFBF" />
                            <SmallStat title="Doctors" value={stats.totalDokter} icon={<Activity size={20}/>} color="#46626B" />
                            <SmallStat title="Radiografer" value={stats.totalRadiografer} icon={<UserPlus size={20}/>} color="#C3E3EE" />
                            <SmallStat title="Detections" value={stats.totalDeteksi} icon={<Database size={20}/>} color="#053247" />
                        </div>

                        <div className="bg-white p-10 rounded-[50px] shadow-[0_25px_50px_rgba(195,227,238,0.2)] border border-[#C3E3EE]">
                            <div className="flex justify-between items-center mb-10 text-left">
                                <div>
                                    <h3 className="text-2xl font-black text-[#053247]">Health Curve Deteksi</h3>
                                    <p className="text-sm font-bold text-[#8BAFBF]">Grafik Volume Deteksi Gigi Susu</p>
                                </div>
                                <div className="flex bg-[#F1FBFF] p-1.5 rounded-2xl border border-[#E3F0F5]">
                                    <button onClick={() => setFilter('W')} className={`w-12 h-10 rounded-xl text-xs font-black transition-all ${filter === 'W' ? 'bg-[#46626B] text-white shadow-lg' : 'text-[#8BAFBF]'}`}>W</button>
                                    <button onClick={() => setFilter('M')} className={`w-12 h-10 rounded-xl text-xs font-black transition-all ${filter === 'M' ? 'bg-[#46626B] text-white shadow-lg' : 'text-[#8BAFBF]'}`}>M</button>
                                </div>
                            </div>
                            <div className="h-[350px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={activeChartData}>
                                        <defs>
                                            <linearGradient id="colorCurve" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#C3E3EE" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#C3E3EE" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke="#F0F7F9" />
                                        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fill: '#8BAFBF', fontSize: 12, fontWeight: 'bold'}} dy={15} />
                                        <YAxis hide />
                                        <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', fontFamily: 'DM Sans'}} />
                                        <Area type="monotone" dataKey="value" stroke="#46626B" strokeWidth={4} fillOpacity={1} fill="url(#colorCurve)" dot={{ r: 6, fill: '#46626B', strokeWidth: 3, stroke: '#fff' }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left ">
                             <ActivityCard title="Aktifitas Dokter" data={aktifitasDokter} />
                             <ActivityCard title="Aktifitas Radiografer" data={aktifitasRadiografer} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function SmallStat({ title, value, icon, color }: any) {
    return (
        <div className="bg-white p-6 rounded-[35px] shadow-sm border border-[#C3E3EE] flex items-center gap-4 hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-inner" style={{ backgroundColor: color }}>{icon}</div>
            <div className="text-left">
                <p className="text-[10px] font-bold text-[#8BAFBF] uppercase tracking-widest">{title}</p>
                <p className="text-xl font-black text-[#053247]">{value}</p>
            </div>
        </div>
    );
}

function ActivityCard({ title, data }: any) {
    return (
        <div className="bg-white p-8 rounded-[45px] shadow-sm border border-[#C3E3EE]">
            <h5 className="font-black text-[#053247] mb-6 flex items-center gap-2">
                <div className="w-1.5 h-5 bg-[#C3E3EE] rounded-full" /> {title}
            </h5>
            <div className="space-y-4">
                {data.map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#F1FBFF] rounded-[25px] border border-transparent hover:border-[#C3E3EE] transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-tr from-[#053247] to-[#46626B] rounded-2xl flex items-center justify-center text-[#C3E3EE] font-black text-sm border-2 border-white shadow-md">{item.initials}</div>
                            <div className="text-left">
                                <p className="text-sm font-black text-[#053247]">{item.name}</p>
                                <p className="text-[10px] font-bold text-[#8BAFBF]">{item.detail}</p>
                                {item.todayDetail && (
                                    <p className="mt-0.5 text-[9px] font-black uppercase tracking-wide text-[#46626B]/60">{item.todayDetail}</p>
                                )}
                            </div>
                        </div>
                        <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${item.status === 'Aktif' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>{item.status}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
