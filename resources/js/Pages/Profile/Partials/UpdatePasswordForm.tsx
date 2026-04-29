import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { Lock, Key, ShieldCheck, Save } from 'lucide-react';

export default function UpdatePasswordForm() {
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
            <form onSubmit={updatePassword} className="space-y-5">
                {/* CURRENT PASSWORD */}
                <div className="space-y-1">
                    <label className="text-[9px] font-black text-[#053247] uppercase opacity-50 ml-2">Kata Sandi Saat Ini</label>
                    <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8BAFBF]"><Key size={16}/></div>
                        <input 
                            type="password" value={data.current_password} onChange={(e) => setData('current_password', e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-[#F1FBFF] border border-[#C3E3EE] rounded-2xl font-bold text-[#053247] outline-none text-sm" 
                        />
                    </div>
                    <InputError message={errors.current_password} />
                </div>

                {/* NEW PASSWORD */}
                <div className="space-y-1">
                    <label className="text-[9px] font-black text-[#053247] uppercase opacity-50 ml-2">Kata Sandi Baru</label>
                    <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8BAFBF]"><Lock size={16}/></div>
                        <input 
                            type="password" value={data.password} onChange={(e) => setData('password', e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-[#F1FBFF] border border-[#C3E3EE] rounded-2xl font-bold text-[#053247] outline-none text-sm" 
                        />
                    </div>
                    <InputError message={errors.password} />
                </div>

                <button 
                    disabled={processing}
                    className="w-full py-4 bg-[#053247] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-[#46626B] transition-all"
                >
                    Update Kata Sandi
                </button>
            </form>
        </section>
    );
}