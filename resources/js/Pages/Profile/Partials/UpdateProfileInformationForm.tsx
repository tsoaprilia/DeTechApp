import InputError from '@/Components/InputError';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Mail, User, Phone, Save } from 'lucide-react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: any) {
    const user = usePage().props.auth.user as any;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<{
        name: string;
        email: string;
        phone: string;
    }>({
        name: user.name,
        email: user.email,
        phone: user.phone || '', // Data Phone
    });

    const submit = (e: any) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* INPUT NAMA */}
                    <div className="space-y-2">
                        <label className="ml-3 text-[10px] font-black uppercase tracking-widest text-[#053247]/60">Nama Lengkap</label>
                        <div className="relative group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8BAFBF] group-focus-within:text-[#053247] transition-all"><User size={18}/></div>
                            <input 
                                value={data.name} onChange={(e) => setData('name', e.target.value)}
                                className="w-full rounded-[20px] border border-[#C3E3EE] bg-[#F8FDFF] py-4 pl-14 pr-5 font-bold text-[#053247] outline-none transition-all focus:border-[#053247] focus:bg-white focus:ring-4 focus:ring-[#053247]/5" 
                            />
                        </div>
                        <InputError message={errors.name} className="ml-4" />
                    </div>

                    {/* INPUT EMAIL */}
                    <div className="space-y-2">
                        <label className="ml-3 text-[10px] font-black uppercase tracking-widest text-[#053247]/60">Alamat Email</label>
                        <div className="relative group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8BAFBF] group-focus-within:text-[#053247] transition-all"><Mail size={18}/></div>
                            <input 
                                value={data.email} onChange={(e) => setData('email', e.target.value)}
                                className="w-full rounded-[20px] border border-[#C3E3EE] bg-[#F8FDFF] py-4 pl-14 pr-5 font-bold text-[#053247] outline-none transition-all focus:border-[#053247] focus:bg-white focus:ring-4 focus:ring-[#053247]/5" 
                            />
                        </div>
                        <InputError message={errors.email} className="ml-4" />
                    </div>

                    {/* INPUT PHONE - YANG KAMU MINTA */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="ml-3 text-[10px] font-black uppercase tracking-widest text-[#053247]/60">Nomor Telepon / WhatsApp</label>
                        <div className="relative group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8BAFBF] group-focus-within:text-[#053247] transition-all"><Phone size={18}/></div>
                            <input 
                                value={data.phone} onChange={(e) => setData('phone', e.target.value)}
                                className="w-full rounded-[20px] border border-[#C3E3EE] bg-[#F8FDFF] py-4 pl-14 pr-5 font-bold text-[#053247] outline-none transition-all focus:border-[#053247] focus:bg-white focus:ring-4 focus:ring-[#053247]/5" 
                            />
                        </div>
                        <InputError message={errors.phone} className="ml-4" />
                    </div>
                </div>

                <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:items-center">
                    <button 
                        disabled={processing}
                        className="flex items-center justify-center gap-2 rounded-[20px] bg-[#053247] px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all hover:bg-[#46626B] active:scale-95 disabled:opacity-50"
                    >
                        <Save size={18} /> Simpan Profil
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm font-bold text-emerald-500 italic">Berhasil disimpan ✨</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
