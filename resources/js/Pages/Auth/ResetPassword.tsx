import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { motion } from 'framer-motion';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-white font-['DM_Sans'] flex overflow-hidden">
            <Head title="Reset Password" />

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
                    <div className="flex items-center gap-3 mb-10">
                        <img src="assets/images/logo-detech.png" alt="Logo" className="h-14 w-auto drop-shadow-md" />
                        <span className="text-3xl font-bold text-white tracking-tight">DeTech</span>
                    </div>

                    <div className="relative"> 
                        <div className="relative rounded-[50px] p-2 bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl aspect-[4/5] flex items-end overflow-hidden">
                            <img 
                                src="assets/images/doctor-login.png" 
                                alt="Security Support" 
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
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m-2 4a2 2 0 01-2 2m-6-10V4a2 2 0 114 0v10M3 21h18M3 10a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10z"/></svg>
                            </div>
                            <div className="pr-4">
                                <p className="text-[16px] font-bold text-[#053247] leading-tight">Keamanan Akun</p>
                                <p className="text-[13px] text-gray-500 font-medium">Reset Kata Sandi</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* --- BAGIAN KANAN: FORM --- */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 relative bg-white rounded-tl-[100px] shadow-[-20px_0_50px_rgba(0,0,0,0.02)]">
                
                <div className="w-full max-w-[460px] z-10">
                    <div className="mb-12">
                        <h2 className="text-[34px] lg:text-[44px] font-extrabold text-[#053247] leading-[1.5] mb-4 tracking-tight">
                            Atur Ulang <br />
                            <span className="text-[#8BAFBF]">Kata Sandi Baru.</span>
                        </h2>
                        <p className="text-gray-400 font-medium leading-relaxed">
                            Silahkan masukkan kata sandi baru Anda untuk memulihkan akses ke sistem cerdas DeTech.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-7">
                        {/* Input Email (Style Putih dengan Border) */}
                        <div>
                            <label className="block text-sm font-bold text-[#053247] mb-2.5">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder="Masukkan email"
                                className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4.5 px-6 text-[#053247] font-semibold focus:outline-none focus:border-[#8BAFBF] focus:ring-4 focus:ring-[#8BAFBF]/10 transition-all shadow-sm"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Input Password Baru (Style Biru Muda Tanpa Border) */}
                        <div>
                            <label className="block text-sm font-bold text-[#053247] mb-2.5">Kata Sandi Baru</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                placeholder="••••••••••••"
                                className="w-full bg-[#F4F9FB] border-2 border-transparent rounded-2xl py-4.5 px-6 text-[#053247] font-semibold focus:outline-none focus:border-[#8BAFBF] focus:bg-white focus:ring-4 focus:ring-[#8BAFBF]/10 transition-all placeholder:text-gray-300"
                                onChange={(e) => setData('password', e.target.value)}
                                autoFocus
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Input Konfirmasi Password (Style Biru Muda Tanpa Border) */}
                        <div>
                            <label className="block text-sm font-bold text-[#053247] mb-2.5">Konfirmasi Kata Sandi</label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                placeholder="••••••••••••"
                                className="w-full bg-[#F4F9FB] border-2 border-transparent rounded-2xl py-4.5 px-6 text-[#053247] font-semibold focus:outline-none focus:border-[#8BAFBF] focus:bg-white focus:ring-4 focus:ring-[#8BAFBF]/10 transition-all placeholder:text-gray-300"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <button 
                            disabled={processing}
                            className="w-full bg-[#053247] text-white py-5 rounded-2xl font-black text-lg shadow-[0_20px_40px_rgba(5,50,71,0.25)] hover:bg-[#053247]/90 hover:-translate-y-1 transition-all active:scale-[0.98] disabled:opacity-70"
                        >
                            Reset Password Sekarang
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}