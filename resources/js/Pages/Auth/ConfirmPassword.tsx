import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { motion } from 'framer-motion';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-white font-['DM_Sans'] flex overflow-hidden">
            <Head title="Confirm Password" />

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

                    {/* Frame Gambar Keamanan (Gunakan style gambar dokter sebelumnya) */}
                    <div className="relative"> 
                        <div className="relative rounded-[50px] p-2 bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl aspect-[4/5] flex items-end overflow-hidden">
                            <img 
                                src="assets/images/doctor-login.png" 
                                alt="Security Confirmation" 
                                className="absolute inset-0 w-full h-full object-cover scale-110 opacity-90"
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
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                            </div>
                            <div className="pr-4">
                                <p className="text-[16px] font-bold text-[#053247] leading-tight">Area Keamanan</p>
                                <p className="text-[13px] text-gray-500 font-medium">Verifikasi Diperlukan</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* --- BAGIAN KANAN: FORM CONFIRM PASSWORD --- */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 relative bg-white rounded-tl-[100px] shadow-[-20px_0_50px_rgba(0,0,0,0.02)]">
                
                <div className="w-full max-w-[460px] z-10">
                    <div className="mb-12">
                        <h2 className="text-[34px] lg:text-[44px] font-extrabold text-[#053247] leading-[1.5] mb-6 tracking-tight">
                            Keamanan <br />
                            <span className="text-[#8BAFBF]">Data Anda Utama.</span>
                        </h2>
                        <div className="bg-[#EBF5F9] p-5 rounded-2xl border-l-4 border-[#8BAFBF] text-[#053247]/80 font-medium leading-relaxed">
                            Ini adalah area aman aplikasi. Harap konfirmasi kata sandi Anda sebelum melanjutkan akses data gigi.
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-8">
                        {/* Input Password */}
                        <div>
                            <label className="block text-sm font-bold text-[#053247] mb-2.5">Kata Sandi</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                placeholder="Masukkan kata sandi Anda"
                                className="w-full bg-[#F4F9FB] border-2 border-transparent rounded-2xl py-4.5 px-6 text-[#053247] font-semibold focus:outline-none focus:border-[#8BAFBF] focus:bg-white focus:ring-4 focus:ring-[#8BAFBF]/10 transition-all placeholder:text-gray-300"
                                onChange={(e) => setData('password', e.target.value)}
                                autoFocus
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Tombol Confirm */}
                        <button 
                            disabled={processing}
                            className="w-full bg-[#053247] text-white py-5 rounded-2xl font-black text-lg shadow-[0_20px_40px_rgba(5,50,71,0.25)] hover:bg-[#053247]/90 hover:-translate-y-1 transition-all active:scale-[0.98] disabled:opacity-70"
                        >
                            Konfirmasi Sekarang
                        </button>

                        <div className="text-center pt-4 font-bold">
                            <p className="text-[15px] text-[#053247]/50">
                                Masalah keamanan? {' '}
                                <a href="mailto:support@detech.id" className="text-[#8BAFBF] hover:text-[#053247] transition-all decoration-2 underline-offset-4">
                                    Hubungi Admin
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}