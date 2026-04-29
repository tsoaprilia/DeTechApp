import InputError from '@/Components/InputError';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Mail, User, Phone, Save } from 'lucide-react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: any) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* INPUT NAMA */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#053247] uppercase tracking-widest ml-4 opacity-60">Nama Lengkap</label>
                        <div className="relative group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8BAFBF] group-focus-within:text-[#053247] transition-all"><User size={18}/></div>
                            <input 
                                value={data.name} onChange={(e) => setData('name', e.target.value)}
                                className="w-full pl-14 pr-6 py-4 bg-[#F8FDFF] border border-[#C3E3EE] rounded-[22px] font-bold text-[#053247] outline-none focus:border-[#053247] focus:ring-4 focus:ring-[#053247]/5 transition-all shadow-inner" 
                            />
                        </div>
                        <InputError message={errors.name} className="ml-4" />
                    </div>

                    {/* INPUT EMAIL */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#053247] uppercase tracking-widest ml-4 opacity-60">Alamat Email</label>
                        <div className="relative group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8BAFBF] group-focus-within:text-[#053247] transition-all"><Mail size={18}/></div>
                            <input 
                                value={data.email} onChange={(e) => setData('email', e.target.value)}
                                className="w-full pl-14 pr-6 py-4 bg-[#F8FDFF] border border-[#C3E3EE] rounded-[22px] font-bold text-[#053247] outline-none focus:border-[#053247] focus:ring-4 focus:ring-[#053247]/5 transition-all shadow-inner" 
                            />
                        </div>
                        <InputError message={errors.email} className="ml-4" />
                    </div>

                    {/* INPUT PHONE - YANG KAMU MINTA */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-black text-[#053247] uppercase tracking-widest ml-4 opacity-60">Nomor Telepon / WhatsApp</label>
                        <div className="relative group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8BAFBF] group-focus-within:text-[#053247] transition-all"><Phone size={18}/></div>
                            <input 
                                value={data.phone} onChange={(e) => setData('phone', e.target.value)}
                                className="w-full pl-14 pr-6 py-4 bg-[#F8FDFF] border border-[#C3E3EE] rounded-[22px] font-bold text-[#053247] outline-none focus:border-[#053247] focus:ring-4 focus:ring-[#053247]/5 transition-all shadow-inner" 
                            />
                        </div>
                        <InputError message={errors.phone} className="ml-4" />
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                    <button 
                        disabled={processing}
                        className="flex items-center gap-2 px-10 py-4 bg-[#053247] text-white rounded-[20px] font-black text-sm uppercase tracking-widest hover:bg-[#46626B] transition-all shadow-xl active:scale-95 disabled:opacity-50"
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