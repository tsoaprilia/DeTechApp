import { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import Header from '@/Components/Admin/Header';
import { 
    User, ArrowLeft, RefreshCcw, MapPin, Hash, Fingerprint, Phone, Home, Mail,
    Calendar, CheckCircle, Save, Info, Camera, Stethoscope 
} from 'lucide-react';

const TOP_TEETH = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65];
const BOTTOM_TEETH = [85, 84, 83, 82, 81, 71, 72, 73, 74, 75];

export default function DetailDeteksi({ auth, radiograph }: any) {
    const { flash }: any = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { post, processing } = useForm();

    const [progress, setProgress] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [curatedData, setCuratedData] = useState<any[]>([]);
    const p = radiograph.patient;

    const radiograferName = radiograph.radiografer?.name || 'Admin DeTech';
    const dokterName = radiograph.dokter?.name || (radiograph.status === 'verified' ? 'Admin DeTech' : 'Belum Diverifikasi');

    useEffect(() => {
        if (flash?.temp_results) {
            setCuratedData(flash.temp_results.map((res: any) => ({
                fdi: res.fdi, is_selected: true, keterangan: ''
            })));
        }
    }, [flash?.temp_results]);

    const handleStartDetection = () => {
        setIsProcessing(true);
        setProgress(0);
        let interval = setInterval(() => setProgress(prev => prev >= 90 ? 90 : prev + 10), 500);
        router.post(route('admin.deteksi.analyze', radiograph.id_radiograph), {}, {
            preserveScroll: true,
            onFinish: () => { clearInterval(interval); setProgress(100); setTimeout(() => setIsProcessing(false), 1000); }
        });
    };

    const submitFinal = () => {
        const finalData = curatedData.filter(d => d.is_selected);
        if (finalData.length === 0) return alert("Pilih minimal satu gigi.");
        const targetRoute = auth.user.role === 'admin' ? route('admin.deteksi.finalize', radiograph.id_radiograph) : route('dokter.deteksi.finalize', radiograph.id_radiograph);
        router.post(targetRoute, { selected_detections: finalData }, { preserveScroll: true });
    };

    return (
        <div className="flex h-screen bg-[#053247] overflow-hidden font-['DM_Sans'] text-left">
            <Head title={`Detail - ${radiograph.id_radiograph}`} />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} auth={auth} />
            
            <main className="flex-1 bg-[#F1FBFF] relative overflow-y-auto lg:rounded-l-[60px] shadow-2xl transition-all duration-500">
                <div className="px-8 lg:px-12"><Header auth={auth} onMenuClick={() => setSidebarOpen(true)} /></div>
                
                <div className="px-8 lg:px-12 pt-4 pb-12 space-y-6">
                    {/* TOP BAR */}
                    <div className="flex items-center justify-between">
                        <Link href={route('admin.deteksi')} className="flex items-center gap-2 text-[#8BAFBF] font-bold hover:text-[#053247] transition-all group">
                            <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-[#053247] group-hover:text-white transition-all"><ArrowLeft size={18} /></div>
                            Kembali
                        </Link>
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${radiograph.status === 'verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                            STATUS: {radiograph.status}
                        </div>
                    </div>

                    {/* SECTION 1: INFORMASI PASIEN LENGKAP & PANEL LOGISTIK */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                        <section className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-[#C3E3EE] flex flex-col md:flex-row gap-8 items-stretch">
                            {/* Inisial Nama (Rata Tengah Atas-Bawah) */}
                            <div className="w-28 h-28 bg-[#053247] rounded-[30px] flex items-center justify-center text-4xl font-black text-white shadow-xl shrink-0 self-center">
                                {p.user?.name?.substring(0, 1).toUpperCase()}
                            </div>
                            
                            <div className="flex-1 space-y-5">
                                <div>
                                    <p className="text-[10px] font-black text-[#8BAFBF] uppercase tracking-widest mb-1">Pasien Terdaftar</p>
                                    <h2 className="text-3xl font-black text-[#053247]">{p.user?.name}</h2>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="flex items-center gap-3 text-[#3B5862] bg-[#F1FBFF] px-4 py-2.5 rounded-2xl border border-[#deeff6]">
                                        <Fingerprint size={16} className="text-[#8BAFBF]" />
                                        <span className="text-[12px] font-bold">NIK: {p.nik}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[#3B5862] bg-[#F1FBFF] px-4 py-2.5 rounded-2xl border border-[#deeff6]">
                                        <Phone size={16} className="text-[#8BAFBF]" />
                                        <span className="text-[12px] font-bold">{p.user?.phone || '-'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[#3B5862] bg-[#F1FBFF] px-4 py-2.5 rounded-2xl border border-[#deeff6]">
                                        <Mail size={16} className="text-[#8BAFBF]" />
                                        <span className="text-[12px] font-bold">{p.user?.email}</span>
                                    </div>
                                    {/* Tempat Lahir (Kolom Terpisah) */}
                                    <div className="flex items-center gap-3 text-[#3B5862] bg-[#F1FBFF] px-4 py-2.5 rounded-2xl border border-[#deeff6]">
                                        <MapPin size={16} className="text-[#8BAFBF]" />
                                        <span className="text-[12px] font-bold">{p.birth_place}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[#3B5862] bg-[#F1FBFF] px-4 py-2.5 rounded-2xl border border-[#deeff6]">
                                        <Calendar size={16} className="text-[#8BAFBF]" />
                                        <span className="text-[12px] font-bold">{p.birth_date} ({p.age} Thn)</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[#3B5862] bg-[#F1FBFF] px-4 py-2.5 rounded-2xl border border-[#deeff6]">
                                        <Home size={16} className="text-[#8BAFBF]" />
                                        <span className="text-[12px] font-bold">{p.address}</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-[#053247] p-8 rounded-[40px] shadow-xl text-white flex flex-col justify-center gap-5 text-left">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-white/10 rounded-xl text-emerald-400"><Hash size={18} /></div>
                                <div><p className="text-[9px] font-bold text-white/50 uppercase">ID Radiografi</p><p className="font-black text-sm">{radiograph.id_radiograph}</p></div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-white/10 rounded-xl text-blue-400"><Camera size={18} /></div>
                                <div><p className="text-[9px] font-bold text-white/50 uppercase">Radiografer</p><p className="font-bold text-sm">{radiograferName}</p></div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-white/10 rounded-xl text-purple-400"><Stethoscope size={18} /></div>
                                <div><p className="text-[9px] font-bold text-white/50 uppercase">Dokter Pemeriksa</p><p className="font-bold text-sm">{dokterName}</p></div>
                            </div>
                        </section>
                    </div>

                    {/* SECTION 2: PREVIEW GAMBAR */}
                    <section className="bg-white p-10 rounded-[40px] shadow-sm border border-[#C3E3EE] space-y-8">
                        <div className="rounded-[30px] overflow-hidden bg-black flex justify-center border-4 border-[#F1FBFF] shadow-inner">
                            <img src={`/detech/public/storage/${radiograph.image}`} className="max-h-[400px] object-contain" alt="Radiografi" />
                        </div>

                        {radiograph.status === 'waiting' && curatedData.length === 0 && (
                            <button onClick={handleStartDetection} disabled={isProcessing || processing} className="w-full py-5 bg-[#425F6A] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg hover:bg-[#344d57] transition-all text-center">
                                {isProcessing ? <><RefreshCcw className="animate-spin" /> Memproses {progress}%</> : 'Mulai Deteksi YOLOv11'}
                            </button>
                        )}

                        {/* SECTION 3: TABEL VERIFIKASI */}
                        {curatedData.length > 0 && radiograph.status === 'waiting' && (
                            <div className="p-8 bg-emerald-50 rounded-[40px] border-2 border-emerald-200 animate-in fade-in zoom-in-95 duration-500">
                                <h3 className="text-xl font-black text-emerald-900 mb-6 flex items-center gap-3"><CheckCircle /> Verifikasi Hasil AI</h3>
                                <div className="bg-white rounded-3xl overflow-hidden border border-emerald-100 shadow-sm text-left">
                                    <table className="w-full">
                                        <thead className="bg-emerald-100 text-emerald-900 uppercase text-[10px] font-black tracking-widest">
                                            <tr><th className="p-5 text-left">FDI</th><th className="p-5 text-center">Validasi</th><th className="p-5 text-left">Analisis Dokter</th></tr>
                                        </thead>
                                        <tbody className="divide-y divide-emerald-50">
                                            {curatedData.map((item, idx) => (
                                                <tr key={idx} className={!item.is_selected ? 'opacity-30' : ''}>
                                                    <td className="p-5 font-black text-[#053247]">Gigi {item.fdi}</td>
                                                    <td className="p-5 text-center">
                                                        <button type="button" onClick={() => { const n = [...curatedData]; n[idx].is_selected = !n[idx].is_selected; setCuratedData(n); }} 
                                                            className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${item.is_selected ? 'bg-emerald-500 text-white shadow-md' : 'bg-red-500 text-white'}`}>
                                                            {item.is_selected ? 'BENAR' : 'SALAH'}
                                                        </button>
                                                    </td>
                                                    <td className="p-5">
                                                        <input type="text" className="w-full border-gray-100 rounded-xl text-sm focus:ring-emerald-500 focus:border-emerald-500" placeholder="Catatan analisis..." value={item.keterangan} 
                                                            onChange={(e) => { const n = [...curatedData]; n[idx].keterangan = e.target.value; setCuratedData(n); }} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <button onClick={submitFinal} disabled={processing} className="w-full mt-8 py-5 bg-emerald-600 text-white rounded-[20px] font-black text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 text-center">
                                    <Save size={20} /> SIMPAN HASIL FINAL KE DATABASE
                                </button>
                            </div>
                        )}

                        {/* SECTION 4: VISUALISASI ANATOMI GIGI */}
                        {radiograph.status === 'verified' && (
                            <div className="space-y-6 mt-10 animate-in fade-in zoom-in duration-700 text-left">
                                <h3 className="text-xl font-black text-[#053247] flex items-center gap-3">
                                    <Info className="text-[#8BAFBF]" size={24} /> Hasil Deteksi Anatomi Gigi
                                </h3>
                                <div className="bg-[#F8FDFF] p-10 rounded-[40px] border border-[#C3E3EE] space-y-4 shadow-inner">
                                    <div className="flex justify-center gap-2">
                                        {TOP_TEETH.map((fdi) => {
                                            const isDet = radiograph.detections?.some((d: any) => parseInt(d.no_fdi) === fdi);
                                            return (
                                                <div key={fdi} className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-black text-lg transition-all shadow-sm
                                                    ${isDet ? 'bg-[#C3E3EE] text-[#053247] border-2 border-[#8BAFBF] scale-105' : 'bg-[#CBD5E1] text-transparent opacity-40'}`}>
                                                    {isDet ? fdi : ''}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="w-full h-px bg-[#C3E3EE] my-4 max-w-2xl mx-auto" />
                                    <div className="flex justify-center gap-2">
                                        {BOTTOM_TEETH.map((fdi) => {
                                            const isDet = radiograph.detections?.some((d: any) => parseInt(d.no_fdi) === fdi);
                                            return (
                                                <div key={fdi} className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-black text-lg transition-all shadow-sm
                                                    ${isDet ? 'bg-[#C3E3EE] text-[#053247] border-2 border-[#8BAFBF] scale-105' : 'bg-[#CBD5E1] text-transparent opacity-40'}`}>
                                                    {isDet ? fdi : ''}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}