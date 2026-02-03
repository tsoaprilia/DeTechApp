import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { motion } from 'framer-motion';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen bg-white font-['DM_Sans'] flex overflow-hidden">
            <Head title="Forgot Password" />

            {/* --- BAGIAN KIRI: BRANDING & IMAGE (STYLE PATEN) --- */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#C3E3EE] via-[#8BAFBF] to-[#46626B] relative items-center justify-center p-12 overflow-hidden rounded-br-[100px]">
                <div 
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{ 
                        backgroundImage: `url('assets/images/line-pattern.png')`,
                        backgroundSize: 'cover' 
                    }}
                />
                
                <div className="relative z-10 w-full max-w-[500px]">
                    <div className="flex items-center gap-3 mb-10">
                        <img src="assets/images/logo-detech.png" alt="Logo" className="h-14 w-auto drop-shadow-md" />
                        <span className="text-3xl font-bold text-white tracking-tight">DeTech</span>
                    </div>

                    <div className="relative"> 
                        <div className="relative rounded-[50px] p-2 bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl aspect-[4/5] flex items-end overflow-hidden">
                            <img 
                                src="assets/images/doctor-login.png" 
                                alt="Recovery" 
                                className="absolute inset-0 w-full h-full object-cover scale-110"
                            />
                        </div>

                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-28 -left-8 z-20 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/50 whitespace-nowrap"
                        >
                            <div className="w-12 h-12 bg-[#F2F2F2] rounded-xl flex items-center justify-center shadow-inner text-[#053247]">
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
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 relative bg-white rounded-tl-[100px] shadow-[-20px_0_50px_rgba(0,0,0,0.02)]">
                
                <div className="w-full max-w-[460px] z-10">
                    <div className="mb-12">
                        <h2 className="text-[34px] lg:text-[44px] font-extrabold text-[#053247] leading-[1.5] mb-6 tracking-tight">
                            Lupa Kata Sandi? <br />
                            <span className="text-[#4C7282]">Atur Ulang Disini.</span>
                        </h2>
                        <p className="text-gray-400 font-medium leading-relaxed">
                            Masukkan email terdaftar Anda untuk menerima tautan instruksi pengaturan ulang kata sandi.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-8 font-bold text-sm text-green-600 bg-green-50 p-4 rounded-xl border border-green-100 flex items-center gap-3">
                            {status}
                        </div>
                    )}

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