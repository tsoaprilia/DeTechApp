import { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import Header from '@/Components/Admin/Header';
import { 
    User, ArrowLeft, RefreshCcw, MapPin, Hash, Fingerprint, Phone, Home, Mail,
    Calendar, CheckCircle, Save, Info, Camera, Stethoscope, 
    Plus
} from 'lucide-react';

const TOP_TEETH = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65];
const BOTTOM_TEETH = [85, 84, 83, 82, 81, 71, 72, 73, 74, 75];

export default function DetailDeteksi({ auth, radiograph,temp_results, temp_image }: any) {
const { flash }: any = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { post, processing } = useForm();

    const [progress, setProgress] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [curatedData, setCuratedData] = useState<any[]>([]);
    const [displayImage, setDisplayImage] = useState(radiograph.image);
    const p = radiograph.patient;

    const [selectedManualTeeth, setSelectedManualTeeth] = useState("");
    const [manualKeterangan, setManualKeterangan] = useState("");
    const [editingTeeth, setEditingTeeth] = useState<any>(null); // Untuk menyimpan gigi yang sedang diklik keterangannya

    const ALL_TEETH_LIST = [...TOP_TEETH, ...BOTTOM_TEETH];

    const radiograferName = radiograph.radiografer?.name || 'Admin DeTech';
    const dokterName = radiograph.dokter?.name || (radiograph.status === 'verified' ? 'Admin DeTech' : 'Belum Diverifikasi');

    useEffect(() => {
    const results = flash?.temp_results;
    const image = flash?.temp_image; 

    if (results && curatedData.length === 0) {
        setCuratedData(results.map((res: any) => ({
            fdi: res.fdi, 
            is_selected: true, 
            keterangan: ''
        })));
    }
    
    // LOGIKA PERBAIKAN:
    if (image) {
        const fileName = image.split('/').pop();
        // Jika nama filenya belum ada 'result_', kita tambahkan manual di sini
        const finalPath = fileName.startsWith('result_') ? fileName : `result_${fileName}`;
        setDisplayImage(`radiographs/${finalPath}?t=${new Date().getTime()}`);
    }
}, [flash]);

    const handleStartDetection = () => {
        setIsProcessing(true);
        setProgress(0);
        let interval = setInterval(() => setProgress(prev => prev >= 90 ? 90 : prev + 10), 500);
        router.post(route('admin.deteksi.analyze', radiograph.id_radiograph), {}, {
            preserveScroll: true,
            onFinish: () => { clearInterval(interval); setProgress(100); setTimeout(() => setIsProcessing(false), 1000); }
        });
    };

    // Filter gigi mana saja yang BELUM ada di curatedData
    const availableTeeth = ALL_TEETH_LIST.filter(fdi => 
        !curatedData.some(d => parseInt(d.fdi) === fdi)
    );

    const handleAddManual = () => {
        if (!selectedManualTeeth) return alert("Pilih nomor gigi terlebih dahulu");
        
        const newEntry = {
            fdi: selectedManualTeeth,
            is_selected: true,
            keterangan: manualKeterangan || "Input Manual",
            is_manual: true // Flag untuk menandai ini input manual
        };

        setCuratedData([...curatedData, newEntry]);
        setSelectedManualTeeth("");
        setManualKeterangan("");
    };

    const submitFinal = () => {
        const finalData = curatedData.filter(d => d.is_selected);
        if (finalData.length === 0) return alert("Pilih minimal satu gigi.");
        const targetRoute = auth.user.role === 'admin' ? route('admin.deteksi.finalize', radiograph.id_radiograph) : route('dokter.deteksi.finalize', radiograph.id_radiograph);
        router.post(targetRoute, { selected_detections: finalData }, { preserveScroll: true });
    };

    // Fungsi Toggle Benar/Salah
const toggleStatus = (index: number) => {
    const newData = [...curatedData];
    newData[index].is_selected = !newData[index].is_selected;
    setCuratedData(newData);
};

// Komponen Kotak Gigi (Render di dalam Map)
function TeethBox({ fdi, item, onClick, onEdit }: any) {
    return (
        <div className="flex flex-col items-center gap-2 group">
            <button
                type="button"
                onClick={onClick}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center font-black text-lg transition-all shadow-sm relative
                    ${!item ? 'bg-white border-2 border-dashed border-gray-200 text-gray-200' : 
                      item.is_selected ? 'bg-emerald-500 text-white border-4 border-emerald-100' : 'bg-red-500 text-white border-4 border-red-100'}`}
            >
                {fdi}
                {item && item.keterangan && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white"></div>
                )}
            </button>
            {item && (
                <button 
                    onClick={onEdit}
                    className="text-[9px] font-black text-[#8BAFBF] hover:text-[#053247] uppercase tracking-tighter"
                >
                    {item.keterangan ? 'Edit Catatan' : '+ Catatan'}
                </button>
            )}
        </div>
    );
}

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
    <div className={`grid gap-6 ${((curatedData.length > 0 || flash?.temp_image)) && radiograph.status === 'waiting' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        
        {/* GAMBAR UTAMA (ASLI) */}
        <div className="space-y-4 text-center">
            {((curatedData.length > 0 || flash?.temp_image)) && radiograph.status === 'waiting' && (
                <p className="text-xs font-black text-[#8BAFBF] uppercase tracking-widest text-left">Original Image</p>
            )}
            <div className="rounded-[30px] overflow-hidden bg-black flex justify-center border-4 border-[#F1FBFF] shadow-inner">
                <img 
                    src={`/storage/${radiograph.image}`} 
                    className="max-h-[450px] object-contain" 
                    alt="Radiografi Pasien" 
                />
            </div>
        </div>

        {/* GAMBAR HASIL AI (DENGAN BOUNDING BOX) */}
        {radiograph.status === 'waiting' && (curatedData.length > 0 || flash?.temp_image) && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-700">
                <p className="text-xs font-black text-emerald-500 uppercase tracking-widest text-center">
                    AI Detection (YOLOv11) - Bounding Box
                </p>
                <div className="rounded-[30px] overflow-hidden bg-black flex justify-center border-4 border-emerald-100 shadow-inner">
                   <img 
    key={displayImage}
    // Gabungkan /storage/ dengan isi displayImage yang sudah kita rakit di useEffect
    src={`/storage/${displayImage.replace('storage/', '').replace('/storage/', '')}`} 
    className="max-h-[450px] object-contain w-full" 
    alt="Hasil Deteksi AI"
    onError={(e: any) => {
        // Fallback jika path di atas masih salah baca folder
        const fileNameSaja = displayImage.split('/').pop();
        e.target.src = `/storage/radiographs/${fileNameSaja}`;
    }}
/>
                </div>
            </div>
        )}
    </div>

    {/* Tombol Deteksi */}
    {radiograph.status === 'waiting' && curatedData.length === 0 && !flash?.temp_image && (
        <button onClick={handleStartDetection} disabled={isProcessing || processing} className="w-full py-5 bg-[#425F6A] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg hover:bg-[#344d57] transition-all">
            {isProcessing ? <><RefreshCcw className="animate-spin" /> Memproses {progress}%</> : 'Mulai Deteksi YOLOv11'}
        </button>
    )}

                        {/* SECTION 3: VERIFIKASI INTERAKTIF (ODONTOGRAM STYLE) */}
{curatedData.length > 0 && radiograph.status === 'waiting' && (
    <div className="p-8 bg-white rounded-[40px] border-2 border-[#C3E3EE] shadow-sm animate-in fade-in zoom-in-95 duration-500">
        <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-[#053247] flex items-center gap-3">
                <CheckCircle className="text-emerald-500" /> Verifikasi Hasil Deteksi
            </h3>
            <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full"></div> Benar</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Salah</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white border-2 border-dashed border-gray-300 rounded-full"></div> Belum Ada</div>
            </div>
        </div>

        <div className="bg-[#F8FDFF] p-10 rounded-[30px] border border-[#C3E3EE] space-y-8 shadow-inner mb-8">
            {/* Baris Atas */}
            <div className="flex justify-center flex-wrap gap-3">
                {TOP_TEETH.map((fdi) => {
                    const index = curatedData.findIndex(d => parseInt(d.fdi) === fdi);
                    const item = curatedData[index];
                    return (
                        <TeethBox 
                            key={fdi} 
                            fdi={fdi} 
                            item={item} 
                            onClick={() => index !== -1 ? toggleStatus(index) : null}
                            onEdit={() => index !== -1 ? setEditingTeeth({ ...item, index }) : null}
                        />
                    );
                })}
            </div>

            <div className="w-full h-px bg-[#C3E3EE] max-w-2xl mx-auto" />

            {/* Baris Bawah */}
            <div className="flex justify-center flex-wrap gap-3">
                {BOTTOM_TEETH.map((fdi) => {
                    const index = curatedData.findIndex(d => parseInt(d.fdi) === fdi);
                    const item = curatedData[index];
                    return (
                        <TeethBox 
                            key={fdi} 
                            fdi={fdi} 
                            item={item} 
                            onClick={() => index !== -1 ? toggleStatus(index) : null}
                            onEdit={() => index !== -1 ? setEditingTeeth({ ...item, index }) : null}
                        />
                    );
                })}
            </div>
        </div>

        {/* INPUT MANUAL TETAP DI BAWAH ODONTOGRAM */}
        <div className="mt-8 p-6 bg-[#F1FBFF] rounded-[30px] border-2 border-dashed border-[#C3E3EE]">
            <p className="text-sm font-black text-[#053247] mb-4 flex items-center gap-2">
                <Plus size={18} className="text-emerald-500" /> Tambah Gigi Manual (Jika tidak terdeteksi)
            </p>
            <div className="flex flex-col md:flex-row gap-4">
                <select 
                    value={selectedManualTeeth}
                    onChange={(e) => setSelectedManualTeeth(e.target.value)}
                    className="flex-1 border-gray-200 rounded-xl text-sm focus:ring-[#053247]"
                >
                    <option value="">Pilih Nomor Gigi...</option>
                    {availableTeeth.map(fdi => <option key={fdi} value={fdi}>Gigi #{fdi}</option>)}
                </select>
                <button 
                    onClick={handleAddManual}
                    className="px-8 py-3 bg-[#053247] text-white rounded-xl font-bold hover:bg-black transition-all"
                >
                    Tambah ke Daftar
                </button>
            </div>
        </div>

        <button onClick={submitFinal} disabled={processing} className="w-full mt-8 py-5 bg-emerald-600 text-white rounded-[25px] font-black text-lg shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
            <Save size={20} /> SIMPAN SEMUA HASIL VERIFIKASI
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

                        {/* SECTION 5: CROP GIGI SUSU (GALERI HASIL AI) */}
{radiograph.status === 'verified' && (
    <div className="space-y-6 mt-12 animate-in fade-in slide-in-from-bottom-10 duration-1000 text-left">
        <h3 className="text-xl font-black text-[#053247] flex items-center gap-3">
            <RefreshCcw className="text-[#8BAFBF]" size={24} /> Galeri Hasil Potongan Gigi (Crop)
        </h3>
        <div className="bg-white p-8 rounded-[40px] border border-[#C3E3EE] shadow-sm space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {[...TOP_TEETH, ...BOTTOM_TEETH].map((fdi) => {
                    // 1. Cari data deteksi di database
                    const det = radiograph.detections?.find((d: any) => parseInt(d.no_fdi) === fdi);
                    
                    // 2. DEFINISIKAN VARIABEL 'base' DI SINI AGAR TIDAK ERROR
                    // Kita ambil nama file asli tanpa ekstensi
                    const base = radiograph.image.split('/').pop()?.split('.')[0];
                    
                    return (
                        <div key={fdi} className="space-y-2">
                            <div className={`aspect-[3/4] rounded-2xl overflow-hidden border-2 flex flex-col items-center justify-center bg-[#F1FBFF] shadow-sm transition-all ${det ? 'border-emerald-200' : 'border-dashed border-gray-200 opacity-60'}`}>
                                {det ? (
                                    <img 
                                        // Gunakan variabel 'base' yang sudah dibuat di atas
                                        src={`/storage/radiographs/crop_${fdi}_${base}.jpg?v=${new Date().getTime()}`} 
                                        className="w-full h-full object-cover" 
                                        alt={`Gigi ${fdi}`}
                                        onError={(e: any) => {
                                            e.target.src = `/radiographs/crop_${fdi}_${base}.jpg`;
                                        }}
                                    />
                                ) : (
                                    <p className="text-[7px] font-black text-gray-400 text-center uppercase px-2 leading-tight italic">Gigi Hilang / Tanggal</p>
                                )}
                            </div>
                           <div className="text-center mt-2">
    <p className="font-black text-[#053247] text-xs">Gigi #{fdi}</p>
    {det && (
        <p className="text-[10px] text-emerald-600 font-bold leading-tight italic mt-1 bg-emerald-50 py-1 px-2 rounded-lg border border-emerald-100 shadow-sm">
            {/* Menampilkan isi kolom analysis dari database */}
            "{det.analysis}"
        </p>
    )}
</div>
                            {/* Pemisah baris otomatis */}
                            {fdi === 65 && <div className="col-span-full h-px bg-[#F1FBFF] my-4" />}
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
)}
                    </section>
                </div>


                {/* MODAL POP-UP CATATAN */}
{editingTeeth && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#053247]/60 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl space-y-6">
            <div className="text-center">
                <div className="w-20 h-20 bg-[#F1FBFF] rounded-3xl flex items-center justify-center text-3xl font-black text-[#053247] mx-auto mb-4 border-2 border-[#C3E3EE]">
                    {editingTeeth.fdi}
                </div>
                <h4 className="text-xl font-black text-[#053247]">Tambah Analisis Dokter</h4>
                <p className="text-sm text-[#8BAFBF] font-bold">Gigi nomor {editingTeeth.fdi}</p>
            </div>

            <textarea 
                className="w-full h-32 bg-[#F8FDFF] border-2 border-[#C3E3EE] rounded-3xl p-4 text-sm focus:ring-[#053247] focus:border-[#053247] font-bold text-[#3B5862]"
                placeholder="Contoh: Gigi berlubang, harus dicabut, atau kondisi lainnya..."
                value={editingTeeth.keterangan}
                onChange={(e) => setEditingTeeth({...editingTeeth, keterangan: e.target.value})}
            ></textarea>

            <div className="flex gap-3">
                <button 
                    onClick={() => setEditingTeeth(null)}
                    className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black hover:bg-gray-200 transition-all"
                >
                    BATAL
                </button>
                <button 
                    onClick={() => {
                        const newData = [...curatedData];
                        newData[editingTeeth.index].keterangan = editingTeeth.keterangan;
                        setCuratedData(newData);
                        setEditingTeeth(null);
                    }}
                    className="flex-1 py-4 bg-[#053247] text-white rounded-2xl font-black hover:bg-black shadow-lg transition-all"
                >
                    SIMPAN CATATAN
                </button>
            </div>
        </div>
    </div>
)}
            </main>
        </div>
    );
}