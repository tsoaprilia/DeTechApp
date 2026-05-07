import { Head, Link } from '@inertiajs/react';
import { 
    ShieldCheck, User, Calendar, Stethoscope, 
    CheckCircle, ArrowLeft, ShieldAlert, XCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function VerifyResult({ radiograph, requested_id }: any) {
    const maskName = (name: string) => {
        if (!name) return "-";
        return name.split(' ').map(n => n[0] + "*".repeat(n.length - 1)).join(' ');
    };

    return (
        <div className="min-h-screen bg-white font-['DM_Sans'] flex overflow-hidden text-left">
            <Head title="Verifikasi Dokumen - DeTech" />

            {/* SISI KIRI: BRANDING */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#C3E3EE] via-[#8BAFBF] to-[#46626B] relative items-center justify-center p-12">
                <div className="absolute inset-0 bg-no-repeat bg-cover opacity-30 pointer-events-none" style={{ backgroundImage: "url('/assets/images/line-pattern.png')", backgroundPosition: 'center' }} />
                <div className="relative z-10 w-full max-w-[500px]">
                    <div className="flex items-center gap-3 mb-10">
                        <img src="/assets/images/logo-detech.png" alt="Logo" className="h-12 w-auto" />
                        <span className="text-3xl font-bold text-[#053247]">DeTech</span>
                    </div>
                    <div className="relative"> 
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative rounded-[40px] p-6 bg-white/50 backdrop-blur-sm shadow-[0_0_40px_rgba(255,255,255,0.45)] border border-white/20 overflow-hidden aspect-[4/5] flex items-end">
                            <img src="/assets/images/doctor-login.png" alt="Doctor" className="absolute inset-0 w-full h-full object-cover" />
                        </motion.div>
                        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="absolute bottom-24 -left-10 z-20 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-50">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${radiograph ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                {radiograph ? <ShieldCheck size={24} /> : <ShieldAlert size={24} />}
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Status Dokumen</p>
                                <p className="text-[14px] font-black text-[#053247]">{radiograph ? 'Terverifikasi Asli' : 'Tidak Terdaftar'}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* SISI KANAN: HASIL */}
            <div className={`w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 relative ${radiograph ? 'bg-[#F1FBFF]' : 'bg-[#FFF5F5]'}`}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[480px] bg-white rounded-[45px] shadow-[0_20px_50px_rgba(5,50,71,0.1)] overflow-hidden border border-white">
                    {radiograph ? (
                        <>
                            <div className="bg-emerald-500 p-10 text-center text-white relative">
                                <div className="bg-white/20 w-20 h-20 rounded-[28px] flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/30 shadow-inner">
                                    <ShieldCheck size={40} strokeWidth={2.5} />
                                </div>
                                <h1 className="text-xl font-black uppercase tracking-[3px]">Dokumen Asli</h1>
                                <p className="text-emerald-100 text-xs font-medium opacity-90">Sistem Verifikasi DeTech Dental AI</p>
                            </div>
                            <div className="p-10 space-y-5">
                                <div className="group flex items-center gap-4 bg-[#F8FDFF] p-5 rounded-[24px] border border-[#deeff6]">
                                    <div className="p-3 bg-white rounded-2xl shadow-sm text-[#053247]"><User size={20}/></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-[#8BAFBF] uppercase mb-0.5">Nama Pasien</p>
                                        <p className="font-black text-[#053247] text-base leading-tight">{maskName(radiograph.patient?.user?.name)}</p>
                                    </div>
                                </div>
                                <div className="group flex items-center gap-4 bg-[#F8FDFF] p-5 rounded-[24px] border border-[#deeff6]">
                                    <div className="p-3 bg-white rounded-2xl shadow-sm text-[#053247]"><Calendar size={20}/></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-[#8BAFBF] uppercase mb-0.5">Waktu Verifikasi</p>
                                        <p className="font-black text-[#053247] text-base">{new Date(radiograph.updated_at).toLocaleDateString('id-ID', {day:'2-digit', month:'long', year:'numeric'})}</p>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-dashed border-[#C3E3EE] flex items-center gap-4 px-1">
                                    <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 border border-emerald-100"><Stethoscope size={22}/></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-[#8BAFBF] uppercase">Dokter Pemeriksa</p>
                                        <p className="font-black text-[#053247] text-lg leading-tight">{radiograph.dokter?.name || 'Admin DeTech'}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="bg-red-500 p-10 text-center text-white relative">
                                <div className="bg-white/20 w-20 h-20 rounded-[28px] flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/30 shadow-inner">
                                    <ShieldAlert size={40} strokeWidth={2.5} />
                                </div>
                                <h1 className="text-xl font-black uppercase tracking-[3px]">Data Tidak Valid</h1>
                                <p className="text-red-100 text-xs font-medium opacity-90">Sistem Verifikasi DeTech Dental AI</p>
                            </div>
                            <div className="p-10 text-center space-y-6">
                                <div className="bg-red-50 p-6 rounded-[30px] border border-red-100">
                                    <XCircle size={60} className="text-red-500 mx-auto mb-4 opacity-80" />
                                    <p className="text-[#053247] font-black text-lg mb-2">Dokumen Tidak Terdaftar!</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">ID Pemeriksaan <span className="font-bold text-red-600">#{requested_id}</span> tidak ditemukan di database kami. Mohon pastikan kode benar atau hubungi pihak klinik.</p>
                                </div>
                            </div>
                        </>
                    )}
                    <div className="p-6 bg-gray-50/50 text-center border-t border-gray-100">
                        <Link href="/" className="flex items-center justify-center gap-2 text-[#053247] font-black text-xs uppercase hover:underline"><ArrowLeft size={14} /> Kembali ke Beranda</Link>
                    </div>
                </motion.div>
                <p className="mt-8 text-center text-[10px] text-[#8BAFBF] font-medium uppercase tracking-tighter opacity-70">© 2026 DeTech Dental AI Project. Integritas Data Medis Terjamin.</p>
            </div>
        </div>
    );
}