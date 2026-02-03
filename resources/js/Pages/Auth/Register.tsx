import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { motion } from 'framer-motion';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '', // Tambahan field telepon sesuai gambar
        role: 'radiografer', // Default role
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-white font-['DM_Sans'] flex overflow-hidden">
            <Head title="Register" />

            {/* --- BAGIAN KIRI: BRANDING & IMAGE --- */}
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
                                alt="Doctor" 
                                className="absolute inset-0 w-full h-full object-cover scale-110"
                            />
                        </div>

                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-28 -left-8 z-20 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/50 whitespace-nowrap group hover:scale-105 transition-transform"
                        >
                            <div className="w-12 h-12 bg-[#F2F2F2] rounded-xl flex items-center justify-center shadow-inner text-[#053247]">
                                <img src="assets/images/gigi-login.png" className="w-7 h-7" />
                            </div>
                            <div className="pr-4">
                                <p className="text-[16px] font-bold text-[#053247] leading-tight">Cepat & Akurat</p>
                                <p className="text-[13px] text-gray-500 font-medium">Deteksi Otomatis AI</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* --- BAGIAN KANAN: FORM REGISTER --- */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-16 relative bg-white rounded-tl-[100px] shadow-[-20px_0_50px_rgba(0,0,0,0.02)]">
                
                <div className="w-full mt-10 max-w-[520px]">
                    <div className="mb-8">
                        <h2 className="text-[34px] lg:text-[40px] font-extrabold text-[#053247] leading-[1.5] mb-5 tracking-tight">
                            Buat Akun Baru, <br />
                            <span className="text-[#4C7282]">Mulai Perjalanan Anda!</span>
                        </h2>
                        <p className="text-gray-400 font-medium text-[15px]">Silahkan isi data diri Anda untuk bergabung bersama kami.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        {/* Input Nama Lengkap */}
                        <div className="w-full">
                            <label className="block text-sm font-bold text-[#053247] mb-2">Nama Lengkap</label>
                            <input
                                type="text"
                                value={data.name}
                                placeholder="Masukkan nama lengkap"
                                className="w-full bg-white border-2 border-gray-100 rounded-2xl py-3.5 px-6 text-[#053247] font-semibold focus:outline-none focus:border-[#8BAFBF] focus:ring-4 focus:ring-[#8BAFBF]/10 transition-all shadow-sm"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-1" />
                        </div>

                        {/* Baris Email & No Telepon */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-[#053247] mb-2">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    placeholder="contoh: nama@email.com"
                                    className="w-full bg-[#EBF5F9] border-none rounded-2xl py-3.5 px-6 text-[#053247] font-semibold focus:outline-none focus:ring-4 focus:ring-[#8BAFBF]/10 transition-all"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#053247] mb-2">No Telepon</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    placeholder="contoh: 081556790890"
                                    className="w-full bg-[#EBF5F9] border-none rounded-2xl py-3.5 px-6 text-[#053247] font-semibold focus:outline-none focus:ring-4 focus:ring-[#8BAFBF]/10 transition-all"
                                    onChange={(e) => setData('phone', e.target.value)}
                                />
                                <InputError message={errors.phone} className="mt-1" />
                            </div>
                        </div>

                        {/* Role Selection (Radio Buttons) */}
                        <div>
                            <label className="block text-sm font-bold text-[#053247] mb-3">Role</label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer transition-all ${data.role === 'radiografer' ? 'border-[#053247] bg-[#053247]/5 shadow-sm' : 'border-gray-200 hover:border-[#8BAFBF]'}`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="radiografer"
                                        checked={data.role === 'radiografer'}
                                        onChange={(e) => setData('role', e.target.value)}
                                        className="w-5 h-5 text-[#053247] focus:ring-[#053247]"
                                    />
                                    <span className="font-bold text-[#053247] text-[15px]">Radiografer</span>
                                </label>
                                <label className={`flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer transition-all ${data.role === 'dokter' ? 'border-[#053247] bg-[#053247]/5 shadow-sm' : 'border-gray-200 hover:border-[#8BAFBF]'}`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="dokter"
                                        checked={data.role === 'dokter'}
                                        onChange={(e) => setData('role', e.target.value)}
                                        className="w-5 h-5 text-[#053247] focus:ring-[#053247]"
                                    />
                                    <span className="font-bold text-[#053247] text-[15px]">Dokter Gigi</span>
                                </label>
                            </div>
                        </div>

                        {/* Baris Password */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-[#053247] mb-2">Kata Sandi</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    placeholder="Minimal 8 karakter"
                                    className="w-full bg-[#EBF5F9] border-none rounded-2xl py-3.5 px-6 text-[#053247] font-semibold focus:outline-none focus:ring-4 focus:ring-[#8BAFBF]/10 transition-all"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#053247] mb-2">Konfirmasi Kata Sandi</label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    placeholder="Ulangi kata sandi Anda"
                                    className="w-full bg-[#EBF5F9] border-none rounded-2xl py-3.5 px-6 text-[#053247] font-semibold focus:outline-none focus:ring-4 focus:ring-[#8BAFBF]/10 transition-all"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Checkbox Syarat & Ketentuan */}
                        <div className="flex items-center gap-3 pt-2">
                            <input type="checkbox" id="terms" className="w-5 h-5 rounded border-gray-300 text-[#053247] focus:ring-[#053247]" required />
                            <label htmlFor="terms" className="text-sm font-medium text-gray-600">
                                Saya menyetujui <span className="font-bold text-[#053247]">Syarat & Ketentuan</span> serta <span className="font-bold text-[#053247]">Kebijakan Privasi</span>
                            </label>
                        </div>

                        {/* Tombol Submit */}
                       {/* Tombol Submit yang Diperbaiki */}
<div className="pt-2">
    <button 
        disabled={processing}
        className="w-full bg-[#053247] text-white py-4 rounded-2xl font-bold text-lg shadow-[0_12px_24px_rgba(5,50,71,0.2)] hover:bg-[#053247]/90 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
    >
        <span className="flex items-center justify-center gap-2">
            {processing ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                "Daftar Sekarang"
            )}
        </span>
    </button>
</div>

                        <div className="text-center pt-2 font-bold">
                            <p className="text-[14px] text-[#053247]/50">
                                Sudah punya akun? {' '}
                                <Link href={route('login')} className="text-[#8BAFBF] hover:text-[#053247] transition-all underline underline-offset-4">
                                    Login di sini
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}