import HeaderPasien from '@/Components/Pasien/Header'; // Menggunakan Header khusus Pasien
import { Head, Link } from '@inertiajs/react';
import { 
    ArrowLeft, Fingerprint, Calendar, Home, MapPin, Hash, 
    Camera, Stethoscope, Info, RefreshCcw, Download 
} from 'lucide-react';

const TOP_TEETH = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65];
const BOTTOM_TEETH = [85, 84, 83, 82, 81, 71, 72, 73, 74, 75];

export default function DetailDeteksi({ auth, radiograph, patient }: any) {
    const p = radiograph.patient;
    const base = radiograph.image.split('/').pop()?.split('.')[0];

    const profileImg = getProfileImage(auth.user.name || auth.user.email || 'Pasien');

    const handleDownloadPDF = () => {
        window.open(route('pasien.deteksi.print', radiograph.id_radiograph), '_blank');
    };

    return (
        <div className="bg-[#F1FBFF] min-h-screen font-['DM_Sans'] text-left overflow-x-hidden">
            <Head title={`Detail - ${radiograph.id_radiograph}`} />
            
            {/* HEADER KHUSUS PASIEN */}
            <HeaderPasien user={auth.user} profileImage={profileImg} />
            
            <div className="pb-20 pt-4 md:pt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
                    
                    {/* TOP BAR */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <Link href={route('dashboard')} className="flex items-center gap-2 text-[#8BAFBF] font-bold hover:text-[#053247] transition-all group">
                            <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-[#053247] group-hover:text-white transition-all">
                                <ArrowLeft size={18} />
                            </div>
                            <span className="text-sm md:text-base">Kembali</span>
                        </Link>
                        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                            {radiograph.status === 'verified' && (
                                <button 
                                    onClick={handleDownloadPDF}
                                    className="flex items-center gap-2 px-5 py-2 bg-[#053247] text-white rounded-full text-[11px] font-black uppercase hover:bg-[#406474] transition-all shadow-lg"
                                >
                                    <Download size={14} /> Download Hasil PDF
                                </button>
                            )}
                            <div className={`flex-1 sm:flex-none text-center px-4 py-2 rounded-full text-[10px] font-black uppercase border ${
                                radiograph.status === 'verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                            }`}>
                                {radiograph.status === 'verified' ? 'Terverifikasi' : 'Menunggu'}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 1: INFO & LOGISTIK */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <section className="lg:col-span-2 bg-white p-6 md:p-8 rounded-[30px] md:rounded-[40px] shadow-sm border border-[#C3E3EE] flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                            <div className="w-20 h-20 md:w-28 md:h-28 bg-[#053247] rounded-2xl md:rounded-[30px] flex items-center justify-center text-3xl md:text-4xl font-black text-white shadow-xl shrink-0">
                                {p.user?.name?.substring(0, 1).toUpperCase()}
                            </div>
                            <div className="flex-1 w-full space-y-5 text-center md:text-left">
                                <div>
                                    <p className="text-[9px] md:text-[10px] font-black text-[#8BAFBF] uppercase tracking-widest mb-1">Identitas Pasien</p>
                                    <h2 className="text-2xl md:text-3xl font-black text-[#053247]">{p.user?.name}</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <InfoItem icon={<Fingerprint size={16}/>} label="NIK" value={p.nik} />
                                    <InfoItem icon={<Calendar size={16}/>} label="Tgl Lahir" value={`${p.birth_date} (${p.age} Thn)`} />
                                    <InfoItem icon={<MapPin size={16}/>} label="Tempat" value={p.birth_place} />
                                    <InfoItem icon={<Home size={16}/>} label="Alamat" value={p.address} />
                                </div>
                            </div>
                        </section>

                        <section className="bg-[#053247] p-6 md:p-8 rounded-[30px] md:rounded-[40px] shadow-xl text-white flex flex-col justify-center gap-5">
                            <LogistikItem icon={<Hash size={18}/>} label="ID Radiografi" value={radiograph.id_radiograph} color="text-emerald-400" />
                            <LogistikItem icon={<Camera size={18}/>} label="Radiografer" value={radiograph.radiografer?.name || 'Admin'} color="text-blue-400" />
                            <LogistikItem icon={<Stethoscope size={18}/>} label="Dokter Pemeriksa" value={radiograph.dokter?.name || 'Admin'} color="text-purple-400" />
                        </section>
                    </div>

                    {/* PREVIEW GAMBAR UTAMA */}
                    <div className="bg-white p-4 md:p-8 rounded-[30px] md:rounded-[40px] border border-[#C3E3EE] shadow-sm flex justify-center bg-black overflow-hidden mb-10">
                        <img src={`/storage/${radiograph.image}`} className="w-full max-h-[300px] md:max-h-[500px] object-contain rounded-xl md:rounded-2xl shadow-2xl" alt="Radiografi Utama" />
                    </div>

                    {radiograph.status === 'verified' ? (
                        <>
                            <div className="space-y-4 mb-10">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-2">
                                    <h3 className="text-lg md:text-xl font-black text-[#053247] flex items-center gap-3">
                                        <Info className="text-emerald-500" size={20} /> Anatomi Gigi
                                    </h3>
                                    <div className="flex gap-4 text-[9px] font-bold uppercase tracking-widest">
                                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#C3E3EE] rounded-full border border-[#053247]"></div> Gigi Susu</div>
                                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-100 rounded-full border border-dashed border-gray-400"></div> Gigi Hilang</div>
                                    </div>
                                </div>
                                <div className="bg-white p-6 md:p-10 rounded-[30px] md:rounded-[40px] border border-[#C3E3EE] space-y-8 text-center shadow-sm overflow-x-auto">
                                    <div className="min-w-[500px] md:min-w-0 space-y-4">
                                        <div className="flex justify-center flex-wrap gap-2">
                                            {TOP_TEETH.map(fdi => <TeethIcon key={fdi} fdi={fdi} active={radiograph.detections?.some((d:any) => parseInt(d.no_fdi) === fdi)} />)}
                                        </div>
                                        <div className="w-full h-px bg-gray-100 max-w-xl mx-auto" />
                                        <div className="flex justify-center flex-wrap gap-2">
                                            {BOTTOM_TEETH.map(fdi => <TeethIcon key={fdi} fdi={fdi} active={radiograph.detections?.some((d:any) => parseInt(d.no_fdi) === fdi)} />)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg md:text-xl font-black text-[#053247] flex items-center gap-3 px-2">
                                    <RefreshCcw className="text-[#8BAFBF]" size={20} /> Galeri Analisis
                                </h3>
                                <div className="bg-white p-4 md:p-8 rounded-[30px] md:rounded-[40px] border border-[#C3E3EE] shadow-sm">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3 md:gap-4">
                                        {[...TOP_TEETH, ...BOTTOM_TEETH].map((fdi) => {
                                            const det = radiograph.detections?.find((d: any) => parseInt(d.no_fdi) === fdi);
                                            return (
                                                <div key={fdi} className="space-y-2 text-center">
                                                    <div className={`aspect-[3/4] rounded-xl overflow-hidden border-2 flex items-center justify-center bg-white ${det ? 'border-emerald-200 shadow-md' : 'border-dashed border-gray-300 opacity-80'}`}>
                                                        {det ? (
                                                            <img src={`/storage/radiographs/crop_${fdi}_${base}.jpg`} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <p className="text-[7px] font-black text-gray-500 uppercase italic">Gigi Hilang</p>
                                                        )}
                                                    </div>
                                                    <p className="text-[9px] md:text-[10px] font-black text-[#053247]">Gigi #{fdi}</p>
                                                    {det && <p className="text-[8px] md:text-[9px] text-emerald-600 font-black italic line-clamp-2 px-1">"{det.analysis}"</p>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="p-12 bg-amber-50 rounded-[40px] border-2 border-dashed border-amber-200 text-center space-y-4">
                            <RefreshCcw className="animate-spin mx-auto text-amber-500" size={32} />
                            <h4 className="text-xl font-black text-amber-800">Hasil Masih Diproses</h4>
                            <p className="text-amber-700/70 text-sm">Sedang dalam tahap verifikasi Dokter. Silakan cek kembali nanti.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function getProfileImage(name: string) {
    const initials = getInitials(name);
    const background = getAvatarColor(name);
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
            <rect width="160" height="160" rx="80" fill="${background}" />
            <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="58" font-weight="700">${initials}</text>
        </svg>
    `;

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function getInitials(name: string) {
    const words = name.trim().split(/\s+/).filter(Boolean);

    if (words.length >= 2) {
        return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }

    return (words[0] || 'P').slice(0, 2).toUpperCase();
}

function getAvatarColor(seed: string) {
    const colors = [
        '#053247',
        '#386274',
        '#4C7282',
        '#0F766E',
        '#2563EB',
        '#7C3AED',
        '#BE123C',
        '#C2410C',
        '#15803D',
        '#0E7490',
    ];

    const hash = seed.split('').reduce((total, char) => total + char.charCodeAt(0), 0);

    return colors[hash % colors.length];
}

// UI HELPERS
function InfoItem({ icon, label, value }: any) {
    return (
        <div className="flex items-center gap-3 text-[#3B5862] bg-[#F1FBFF] px-3 md:px-4 py-2 rounded-xl border border-[#deeff6]">
            <div className="text-[#8BAFBF] shrink-0">{icon}</div>
            <div className="text-left overflow-hidden">
                <p className="text-[7px] md:text-[8px] font-black uppercase text-[#8BAFBF] mb-1">{label}</p>
                <p className="text-[10px] md:text-[11px] font-bold truncate">{value}</p>
            </div>
        </div>
    );
}

function LogistikItem({ icon, label, value, color }: any) {
    return (
        <div className="flex items-center gap-3 md:gap-4">
            <div className={`p-2 bg-white/10 rounded-lg ${color} shrink-0`}>{icon}</div>
            <div className="text-left overflow-hidden">
                <p className="text-[8px] md:text-[9px] font-bold text-white/50 uppercase mb-1">{label}</p>
                <p className="font-black text-xs md:text-sm truncate">{value}</p>
            </div>
        </div>
    );
}

function TeethIcon({ fdi, active }: any) {
    return (
        <div className={`w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-lg md:rounded-2xl flex items-center justify-center font-black text-xs md:text-lg transition-all ${
            active 
            ? 'bg-[#C3E3EE] text-[#053247] border-2 border-[#053247] shadow-md scale-105' 
            : 'bg-gray-100 text-gray-500 border-2 border-dashed border-gray-400'
        }`}>
            {fdi}
        </div>
    );
}
