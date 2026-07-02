import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Eye, EyeOff, Key, Lock } from 'lucide-react';

export default function UpdatePasswordForm() {
    const [visibleField, setVisibleField] = useState<string | null>(null);
    const { data, setData, put, errors, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e: any) => {
        e.preventDefault();
        put(route('password.update'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <section>
            <form onSubmit={updatePassword} className="space-y-4">
                {/* CURRENT PASSWORD */}
                <div className="space-y-2">
                    <label className="ml-2 text-[9px] font-black uppercase tracking-widest text-[#053247]/55">Kata Sandi Saat Ini</label>
                    <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8BAFBF]"><Key size={16}/></div>
                        <input 
                            type={visibleField === 'current' ? 'text' : 'password'} value={data.current_password} onChange={(e) => setData('current_password', e.target.value)}
                            className="w-full rounded-2xl border border-[#C3E3EE] bg-[#F8FDFF] py-3.5 pl-12 pr-12 text-sm font-bold text-[#053247] outline-none transition-all focus:border-[#053247] focus:bg-white focus:ring-4 focus:ring-[#053247]/5" 
                        />
                        <button type="button" onClick={() => setVisibleField(visibleField === 'current' ? null : 'current')} className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#8BAFBF] hover:bg-white hover:text-[#053247]">
                            {visibleField === 'current' ? <EyeOff size={17} /> : <Eye size={17} />}
                        </button>
                    </div>
                    <InputError message={errors.current_password} />
                </div>

                {/* NEW PASSWORD */}
                <div className="space-y-2">
                    <label className="ml-2 text-[9px] font-black uppercase tracking-widest text-[#053247]/55">Kata Sandi Baru</label>
                    <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8BAFBF]"><Lock size={16}/></div>
                        <input 
                            type={visibleField === 'new' ? 'text' : 'password'} value={data.password} onChange={(e) => setData('password', e.target.value)}
                            className="w-full rounded-2xl border border-[#C3E3EE] bg-[#F8FDFF] py-3.5 pl-12 pr-12 text-sm font-bold text-[#053247] outline-none transition-all focus:border-[#053247] focus:bg-white focus:ring-4 focus:ring-[#053247]/5" 
                        />
                        <button type="button" onClick={() => setVisibleField(visibleField === 'new' ? null : 'new')} className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#8BAFBF] hover:bg-white hover:text-[#053247]">
                            {visibleField === 'new' ? <EyeOff size={17} /> : <Eye size={17} />}
                        </button>
                    </div>
                    <InputError message={errors.password} />
                </div>

                <div className="space-y-2">
                    <label className="ml-2 text-[9px] font-black uppercase tracking-widest text-[#053247]/55">Konfirmasi Kata Sandi</label>
                    <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8BAFBF]"><Lock size={16}/></div>
                        <input
                            type={visibleField === 'confirm' ? 'text' : 'password'} value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full rounded-2xl border border-[#C3E3EE] bg-[#F8FDFF] py-3.5 pl-12 pr-12 text-sm font-bold text-[#053247] outline-none transition-all focus:border-[#053247] focus:bg-white focus:ring-4 focus:ring-[#053247]/5"
                        />
                        <button type="button" onClick={() => setVisibleField(visibleField === 'confirm' ? null : 'confirm')} className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#8BAFBF] hover:bg-white hover:text-[#053247]">
                            {visibleField === 'confirm' ? <EyeOff size={17} /> : <Eye size={17} />}
                        </button>
                    </div>
                    <InputError message={errors.password_confirmation} />
                </div>

                <button 
                    disabled={processing}
                    className="w-full rounded-2xl bg-[#053247] py-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-lg transition-all hover:bg-[#46626B] disabled:opacity-50"
                >
                    Update Kata Sandi
                </button>
                {recentlySuccessful && <p className="text-center text-sm font-bold text-emerald-500">Kata sandi berhasil diperbarui.</p>}
            </form>
        </section>
    );
}
