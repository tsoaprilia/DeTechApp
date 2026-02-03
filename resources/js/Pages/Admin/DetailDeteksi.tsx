import { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import Header from '@/Components/Admin/Header';
import { User, Upload, ArrowLeft, RefreshCcw, MapPin, Hash, Info, Calendar, Phone, CheckCircle, Trash2, Save } from 'lucide-react';

export default function DetailDeteksi({ auth, radiograph }: any) {
    const { flash }: any = usePage().props; // Mengambil data flash dari Middleware
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { post, processing } = useForm();
    const [progress, setProgress] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    
    // State kurasi sebelum masuk DB
    const [curatedData, setCuratedData] = useState<any[]>([]);
    const p = radiograph.patient;

    // Pantau flash data: Jika temp_results muncul, tampilkan tabel hijau
    useEffect(() => {
        if (flash?.temp_results) {
            const initial = flash.temp_results.map((res: any) => ({
                fdi: res.fdi,
                is_selected: true,
                keterangan: ''
            }));
            setCuratedData(initial);
        }
    }, [flash?.temp_results]);

    const handleStartDetection = () => {
        setIsProcessing(true);
        setProgress(0);
        let interval = setInterval(() => {
            setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
        }, 500);

        post(route('admin.deteksi.analyze', radiograph.id_radiograph), {
            preserveScroll: true,
            onFinish: () => {
                clearInterval(interval);
                setProgress(100);
                setTimeout(() => setIsProcessing(false), 1000);
            }
        });
    };

    const handleFinalSave = () => {
        const finalData = curatedData.filter(d => d.is_selected);
        post(route('admin.deteksi.finalize', radiograph.id_radiograph), {
            selected_detections: finalData
        } as any);
    };

    return (
        <div className="flex h-screen bg-[#053247] overflow-hidden font-['DM_Sans'] text-left">
            <Head title="Verifikasi Dokter" />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} auth={auth} />
            <main className="flex-1 bg-[#F1FBFF] relative overflow-y-auto lg:rounded-l-[60px] shadow-2xl transition-all duration-500">
                <div className="px-8 lg:px-12"><Header auth={auth} onMenuClick={() => setSidebarOpen(true)} /></div>
                <div className="px-8 lg:px-12 pt-4 pb-12 space-y-6">
                    <Link href={route('admin.deteksi')} className="flex items-center gap-2 text-[#8BAFBF] font-bold hover:text-[#053247] w-fit"><ArrowLeft size={20} /> Kembali</Link>

                    {/* INFORMASI PASIEN */}
                    <section className="bg-white p-10 rounded-[40px] shadow-sm border border-[#C3E3EE] space-y-8">
                        <h3 className="text-xl font-bold text-[#053247] flex items-center gap-3"><User className="text-[#8BAFBF]" size={24} /> Informasi Pasien</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6">
                            <DetailGroup label="Nama Lengkap" value={p.user?.name} icon={<User size={18} />} />
                            <DetailGroup label="NIK" value={p.nik} icon={<Hash size={18} />} />
                            <DetailGroup label="Tempat lahir" value={p.birth_place} icon={<MapPin size={18} />} />
                            <DetailGroup label="Tanggal Lahir" value={p.birth_date} icon={<Calendar size={18} />} />
                        </div>
                    </section>

                    {/* PREVIEW & TOMBOL DETEKSI */}
                    <section className="bg-white p-10 rounded-[40px] shadow-sm border border-[#C3E3EE] space-y-8">
                        <div className="rounded-[30px] overflow-hidden bg-black flex justify-center border-4 border-[#F1FBFF]">
                            <img src={`/detech/public/storage/${radiograph.image}`} className="max-h-[400px] object-contain" alt="Radiografi" />
                        </div>

                        {radiograph.status === 'waiting' && curatedData.length === 0 && (
                            <button onClick={handleStartDetection} disabled={isProcessing} className="w-full py-5 bg-[#425F6A] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg transition-all">
                                {isProcessing ? <><RefreshCcw className="animate-spin" /> Memproses {progress}%</> : 'Mulai Deteksi YOLOv11'}
                            </button>
                        )}

                        {/* TABEL VERIFIKASI DOKTER (MUNCUL OTOMATIS) */}
                        {curatedData.length > 0 && radiograph.status === 'waiting' && (
                            <div className="p-8 bg-emerald-50 rounded-[40px] border-2 border-emerald-200 animate-in fade-in zoom-in-95 duration-500">
                                <h3 className="text-xl font-black text-emerald-900 mb-6 flex items-center gap-3"><CheckCircle /> Verifikasi Hasil AI</h3>
                                <div className="bg-white rounded-3xl overflow-hidden border border-emerald-100">
                                    <table className="w-full">
                                        <thead className="bg-emerald-100 text-emerald-900 uppercase text-[10px] font-black tracking-widest">
                                            <tr><th className="p-5">FDI</th><th className="p-5">Validasi</th><th className="p-5">Analisis Dokter</th></tr>
                                        </thead>
                                        <tbody className="divide-y divide-emerald-50">
                                            {curatedData.map((item, idx) => (
                                                <tr key={idx} className={!item.is_selected ? 'opacity-30' : ''}>
                                                    <td className="p-5 font-black">Gigi {item.fdi}</td>
                                                    <td className="p-5">
                                                        <button onClick={() => { const n = [...curatedData]; n[idx].is_selected = !n[idx].is_selected; setCuratedData(n); }} 
                                                            className={`px-4 py-2 rounded-xl text-[10px] font-black ${item.is_selected ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                                                            {item.is_selected ? 'BENAR' : 'SALAH'}
                                                        </button>
                                                    </td>
                                                    <td className="p-5">
                                                        <input type="text" className="w-full border-gray-100 rounded-xl text-sm" placeholder="Catatan..." value={item.keterangan} 
                                                            onChange={(e) => { const n = [...curatedData]; n[idx].keterangan = e.target.value; setCuratedData(n); }} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <button onClick={handleFinalSave} className="w-full mt-8 py-5 bg-emerald-600 text-white rounded-[20px] font-black text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all">
                                    <Save size={20} className="inline mr-2" /> SIMPAN HASIL FINAL KE DATABASE
                                </button>
                            </div>
                        )}

                        {/* HASIL FIX PERMANEN */}
                        {radiograph.status === 'verified' && (
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 animate-in fade-in duration-700">
                                {radiograph.detections?.map((det: any) => (
                                    <div key={det.id_detection} className="p-5 bg-[#F9FDFF] rounded-[25px] border border-[#C3E3EE] text-center shadow-sm">
                                        <p className="text-3xl font-black text-[#053247]">{det.no_fdi}</p>
                                        <p className="text-[10px] text-emerald-600 italic mt-2">{det.analysis || 'Akurat'}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}

function DetailGroup({ label, value, icon }: any) {
    return (
        <div className="space-y-3">
            <label className="text-xs font-black text-[#8BAFBF] uppercase tracking-widest ml-2">{label}</label>
            <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8BAFBF]">{icon}</div>
                <div className="w-full pl-14 pr-5 py-4 bg-[#F1FBFF] border border-[#C3E3EE] rounded-[22px] font-bold text-[#053247]">{value || '-'}</div>
            </div>
        </div>
    );
}