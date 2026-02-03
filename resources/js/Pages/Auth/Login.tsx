import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const [userType, setUserType] = useState<'faskes' | 'pasien'>('faskes');
    
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-white font-['DM_Sans'] flex">
            <Head title="Log in" />

            {/* --- BAGIAN KIRI: BRANDING & IMAGE --- */}
<div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#C3E3EE] via-[#8BAFBF] to-[#46626B] relative items-center justify-center p-12 overflow-hidden">
    <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-30 pointer-events-none"
        style={{
            backgroundImage: "url('assets/images/line-pattern.png')",
            backgroundPosition: 'center',
        }}
    />
    
    <div className="relative z-10 w-full max-w-[500px]">
        {/* Header Kiri */}
        <div className="flex items-center gap-3 mb-10">
            <img src="assets/images/logo-detech.png" alt="Logo" className="h-12 w-auto" />
            <span className="text-3xl font-bold text-[#053247]">DeTech</span>
        </div>

        {/* Container Utama untuk Image & Badge */}
        <div className="relative"> 
            
            {/* 1. Frame Gambar Dokter (Tetap overflow-hidden agar gambar rapi) */}
            <div className="relative rounded-[40px] p-6 bg-white/50 backdrop-blur-sm shadow-[0_0_40px_rgba(255,255,255,0.45)] border border-white/20 overflow-hidden aspect-[4/5] flex items-end">
                <img 
                    src="assets/images/doctor-login.png" 
                    alt="Doctor" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* 2. Floating Badges (Dipindahkan ke luar container overflow agar tidak terpotong) */}
            
            {/* Floating Badge Kiri - Sekarang menggunakan z-index lebih tinggi */}
            <div className="absolute bottom-24 -left-10 z-20 bg-white p-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-50 whitespace-nowrap">
                <div className="w-10 h-10 bg-[#F2F2F2] rounded-xl flex items-center justify-center">
                    <img src="assets/images/gigi-login.png" className="w-6 h-6" alt="Icon Gigi" />
                </div>
                <span className="text-[14px] font-bold text-[#053247]">1.200+ citra gigi dianalisis</span>
            </div>

            {/* Floating Badge Kanan */}
            <div className="absolute bottom-10 -right-4 z-20 bg-white py-3 px-5 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-50 whitespace-nowrap">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                    </svg>
                </div>
                <span className="text-[14px] font-bold text-[#053247]">Akurasi deteksi 98%</span>
            </div>
        </div>
    </div>
</div>

            {/* --- BAGIAN KANAN: FORM LOGIN --- */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 relative">
                
                {/* Toggle Faskes/Pasien */}
                <div className="absolute top-12 right-12 lg:right-24 flex bg-[#C3E3EE]/40 p-1 rounded-full w-fit">
                    <button 
                        onClick={() => setUserType('faskes')}
                        className={`px-8 py-2 rounded-full text-sm font-bold transition-all ${userType === 'faskes' ? 'bg-[#053247] text-white shadow-lg' : 'text-[#053247]'}`}
                    >
                        Faskes
                    </button>
                    <button 
                        onClick={() => setUserType('pasien')}
                        className={`px-8 py-2 rounded-full text-sm font-bold transition-all ${userType === 'pasien' ? 'bg-[#053247] text-white shadow-lg' : 'text-[#053247]'}`}
                    >
                        Pasien
                    </button>
                </div>

                <div className="w-full mt-10 max-w-[480px]">
                    <div className="mb-12">
                        <h2 className="text-[30px] lg:text-[40px] font-bold text-[#053247] leading-tight mb-4">
                            Selamat datang kembali, <br />
                            <span className="text-[#4C7282]">sistem cerdas untuk deteksi dan analisis gigi!</span>
                        </h2>
                    </div>

                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                    <form onSubmit={submit} className="space-y-6">
                        {/* Input Email */}
                        <div>
                            <label className="block text-sm font-bold text-[#053247] mb-2">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                placeholder="Masukkan email"
                                className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-6 text-[#053247] focus:outline-none focus:border-[#8BAFBF] focus:ring-1 focus:ring-[#8BAFBF] transition-all shadow-sm"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Input Password */}
                        <div>
                            <label className="block text-sm font-bold text-[#053247] mb-2">Kata Sandi</label>
                            <input
                                type="password"
                                value={data.password}
                                placeholder="Masukkan kata sandi Anda"
                                className="w-full bg-[#EBF5F9] border-transparent border rounded-2xl py-4 px-6 text-[#053247] focus:outline-none focus:border-[#8BAFBF] focus:bg-white transition-all"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Opsi Tambahan */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-2 text-sm font-medium text-[#053247]/70">Ingat Saya</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm font-bold text-[#053247] hover:underline"
                                >
                                    Lupa Password?
                                </Link>
                            )}
                        </div>

                        {/* Tombol Submit */}
                        <button 
                            disabled={processing}
                            className="w-full bg-[#053247] text-white py-4 rounded-2xl font-bold text-lg shadow-[0_12px_24px_rgba(5,50,71,0.2)] hover:bg-[#053247]/90 transition-all active:scale-[0.98] disabled:opacity-70"
                        >
                            Masuk Sekarang
                        </button>

                        <div className="text-center pt-4">
                            <p className="text-sm text-[#053247]/70 font-medium">
                                Belum punya akun? {' '}
                                <Link href={route('register')} className="text-[#8BAFBF] font-bold hover:underline">
                                    [Daftar disini]
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}