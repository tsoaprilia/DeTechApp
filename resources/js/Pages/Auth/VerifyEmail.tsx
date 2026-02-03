import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { motion } from 'framer-motion';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <div className="min-h-screen bg-white font-['DM_Sans'] flex overflow-hidden">
            <Head title="Verifikasi Email" />

            {/* --- BAGIAN KIRI: BRANDING & IMAGE (STYLE PATEN) --- */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#C3E3EE] via-[#8BAFBF] to-[#46626B] relative items-center justify-center p-12 overflow-hidden rounded-br-[100px]">
                {/* Background Pattern (Topografi) */}
                <div 
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{ 
                        backgroundImage: `url('assets/images/line-pattern.png')`,
                        backgroundSize: 'cover' 
                    }}
                />
                
                <div className="relative z-10 w-full max-w-[500px]">
                    {/* Header Kiri */}
                    <div className="flex items-center gap-3 mb-10">
                        <img src="assets/images/logo-detech.png" alt="Logo" className="h-14 w-auto drop-shadow-md" />
                        <span className="text-3xl font-bold text-white tracking-tight">DeTech</span>
                    </div>

                    {/* Frame Gambar (Style Paten) */}
                    <div className="relative"> 
                        <div className="relative rounded-[50px] p-2 bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl aspect-[4/5] flex items-end overflow-hidden text-center justify-center">
                            <img 
                                src="assets/images/doctor-login.png" 
                                alt="Email Verification" 
                                className="absolute inset-0 w-full h-full object-cover scale-110"
                            />
                        </div>

                        {/* Floating Badge Kiri */}
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-28 -left-8 z-20 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/50 whitespace-nowrap"
                        >
                            <div className="w-12 h-12 bg-[#F2F2F2] rounded-xl flex items-center justify-center shadow-inner text-[#053247]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                            </div>
                            <div className="pr-4">
                                <p className="text-[16px] font-bold text-[#053247] leading-tight">Satu Langkah Lagi</p>
                                <p className="text-[13px] text-gray-500 font-medium">Aktivasi Akun Anda</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* --- BAGIAN KANAN: FORM VERIFIKASI --- */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 relative bg-white rounded-tl-[100px] shadow-[-20px_0_50px_rgba(0,0,0,0.02)]">
                
                <div className="w-full max-w-[480px] z-10">
                    <div className="mb-12">
                        <h2 className="text-[34px] lg:text-[44px] font-extrabold text-[#053247] leading-[1.5] mb-6 tracking-tight">
                            Verifikasi <br />
                            <span className="text-[#8BAFBF]">Email Anda Sekarang.</span>
                        </h2>
                        <div className="bg-[#F4F9FB] p-6 rounded-2xl border-l-4 border-[#8BAFBF] text-[#053247]/80 font-medium leading-relaxed shadow-sm">
                            Terima kasih telah mendaftar! Sebelum memulai, harap verifikasi alamat email Anda dengan mengeklik tautan yang baru saja kami kirimkan. Jika Anda tidak menerima email tersebut, kami akan dengan senang hati mengirimkan ulang.
                        </div>
                    </div>

                    {status === 'verification-link-sent' && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 font-bold text-sm text-green-600 bg-green-50 p-4 rounded-xl border border-green-100 flex items-center gap-3 shadow-sm"
                        >
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                            </svg>
                            Tautan verifikasi baru telah dikirim ke alamat email yang Anda berikan saat pendaftaran.
                        </motion.div>
                    )}

                    <form onSubmit={submit} className="space-y-8">
                        <div className="flex flex-col gap-4">
                            {/* Tombol Kirim Ulang */}
                            <button 
                                disabled={processing}
                                className="w-full bg-[#053247] text-white py-5 rounded-2xl font-black text-lg shadow-[0_20px_40px_rgba(5,50,71,0.25)] hover:bg-[#053247]/90 hover:-translate-y-1 transition-all active:scale-[0.98] disabled:opacity-70"
                            >
                                {processing ? 'Mengirim...' : 'Kirim Ulang Email Verifikasi'}
                            </button>

                            {/* Tombol Logout */}
                            <div className="text-center mt-4">
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="text-[15px] font-bold text-[#8BAFBF] hover:text-[#053247] transition-all decoration-2 underline-offset-4"
                                >
                                    Keluar (Log Out)
                                </Link>
                            </div>
                        </div>
                    </form>

                    <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                        <p className="text-[14px] text-[#053247]/40 font-medium">
                            Butuh bantuan? Hubungi kami di <br />
                            <a href="mailto:support@detech.id" className="text-[#8BAFBF] font-bold hover:underline">support@detech.id</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}