import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen bg-white font-['DM_Sans'] flex overflow-hidden">
            <Head title="Forgot Password" />

            <AnimatePresence>
                {errors.email && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.98 }}
                        className="fixed right-5 top-5 z-[200] w-[calc(100%-40px)] max-w-md rounded-[24px] border border-red-100 bg-white p-5 shadow-[0_24px_60px_rgba(5,50,71,0.18)]"
                    >
                        <div className="flex gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                                <AlertCircle size={24} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-[15px] font-black text-[#053247]">Email belum valid</p>
                                <p className="mt-1 text-sm font-medium leading-relaxed text-[#053247]/65">{errors.email}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => clearErrors()}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#053247]/45 transition hover:bg-[#F1FBFF] hover:text-[#053247]"
                                aria-label="Tutup pesan error"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {status && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.98 }}
                        className="fixed right-5 top-5 z-[200] w-[calc(100%-40px)] max-w-md rounded-[24px] border border-emerald-100 bg-white p-5 shadow-[0_24px_60px_rgba(5,50,71,0.18)]"
                    >
                        <div className="flex gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
                                <CheckCircle size={24} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-[15px] font-black text-[#053247]">Tautan terkirim</p>
                                <p className="mt-1 text-sm font-medium leading-relaxed text-[#053247]/65">{status}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- BAGIAN KIRI: BRANDING & IMAGE (STYLE PATEN) --- */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#C3E3EE] via-[#8BAFBF] to-[#46626B] relative items-center justify-center p-12 overflow-hidden">
                <div 
                    className="absolute inset-0 bg-no-repeat bg-cover opacity-30 pointer-events-none"
                    style={{ 
                        backgroundImage: `url('assets/images/line-pattern.png')`,
                        backgroundPosition: 'center',
                    }}
                />
                
                <div className="relative z-10 w-full max-w-[500px]">
                    <div className="flex items-center gap-3 mb-10">
                        <img src="assets/images/logo-detech.png" alt="Logo" className="h-12 w-auto" />
                        <span className="text-3xl font-bold text-[#053247]">DeTech</span>
                    </div>

                    <div className="relative"> 
                        <div className="relative rounded-[40px] p-6 bg-white/50 backdrop-blur-sm shadow-[0_0_40px_rgba(255,255,255,0.45)] border border-white/20 overflow-hidden aspect-[4/5] flex items-end">
                            <img 
                                src="assets/images/doctor-login.png" 
                                alt="Recovery" 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>

                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-24 -left-10 z-20 bg-white p-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-50 whitespace-nowrap"
                        >
                            <div className="w-10 h-10 bg-[#F2F2F2] rounded-xl flex items-center justify-center text-[#053247]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                            </div>
                            <div className="pr-4">
                                <p className="text-[16px] font-bold text-[#053247] leading-tight">Pemulihan Akun</p>
                                <p className="text-[13px] text-gray-500 font-medium">Cek Email Anda</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* --- BAGIAN KANAN: FORM --- */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 relative bg-white">
                
                <div className="w-full mt-10 max-w-[480px] z-10">
                    <div className="mb-12">
                        <h2 className="text-[30px] lg:text-[40px] font-bold text-[#053247] leading-tight mb-4">
                            Lupa Kata Sandi? <br />
                            <span className="text-[#4C7282]">kami bantu pulihkan akun Anda.</span>
                        </h2>
                        <p className="text-gray-400 font-medium leading-relaxed">
                            Masukkan email terdaftar Anda untuk menerima tautan instruksi pengaturan ulang kata sandi.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-7">
                        {/* INPUT EMAIL (Style Sama dengan Login Paten) */}
                        <div>
                            <label className="block text-sm font-bold text-[#053247] mb-2.5">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder="Masukkan email"
                                className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 text-[#053247] focus:outline-none focus:border-[#8BAFBF] focus:ring-1 focus:ring-[#8BAFBF] transition-all shadow-sm"
                                onChange={(e) => setData('email', e.target.value)}
                                autoFocus
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* TOMBOL SUBMIT (Style Sama dengan Login Paten) */}
                        <button 
                            disabled={processing}
                            className="w-full bg-[#053247] text-white py-4 rounded-2xl font-bold text-lg shadow-[0_12px_24px_rgba(5,50,71,0.2)] hover:bg-[#053247]/90 transition-all active:scale-[0.98]"
                        >
                            Kirim Tautan Email
                        </button>

                        <div className="text-center pt-4 font-bold">
                            <p className="text-[15px] text-[#053247]/50">
                                Sudah ingat? {' '}
                                <Link href={route('login')} className="text-[#8BAFBF] hover:text-[#053247] transition-all decoration-2 underline-offset-4">
                                    Kembali Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
