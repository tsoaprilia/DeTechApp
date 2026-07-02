import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import { User, ShieldCheck, Lock, Info, Mail, Phone } from 'lucide-react';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ auth, mustVerifyEmail, status }: any) {
    const user = auth.user;
    const initials = getInitials(user.name || user.email || 'User');
    const roleLabel = String(user.role || 'user').toUpperCase();

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Profil Saya - DeTech" />

            <div className="font-['DM_Sans'] pb-16">
                <div className="mx-auto max-w-7xl space-y-6">
                    <section className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-[#053247] via-[#17495D] to-[#386274] p-6 shadow-[0_24px_60px_rgba(5,50,71,0.22)] md:p-8">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(195,227,238,0.30),transparent_30%),radial-gradient(circle_at_15%_80%,rgba(255,255,255,0.14),transparent_32%)]" />
                        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[30px] border-4 border-white/80 bg-white p-2 shadow-[0_18px_44px_rgba(0,0,0,0.20)]">
                                    <div className="flex h-full w-full items-center justify-center rounded-[23px] bg-[#053247] text-4xl font-black text-white">
                                        {initials}
                                    </div>
                                </div>
                                <div className="text-white">
                                    <div className="mb-3 flex flex-wrap items-center gap-2">
                                        <span className="inline-flex items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#DDF4FB] ring-1 ring-white/18">
                                            <ShieldCheck size={13} /> {roleLabel} Account
                                        </span>
                                        <span className="rounded-full bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#053247]">
                                            Since {new Date(user.created_at).getFullYear()}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl font-black leading-tight tracking-tight md:text-4xl">{user.name}</h2>
                                    <div className="mt-4 flex flex-col gap-2 text-sm font-bold text-white/78 sm:flex-row sm:gap-5">
                                        <span className="inline-flex items-center gap-2"><Mail size={15} /> {user.email}</span>
                                        <span className="inline-flex items-center gap-2"><Phone size={15} /> {user.phone || 'Nomor belum diisi'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-[24px] bg-white/12 p-5 text-white ring-1 ring-white/15 backdrop-blur-md md:w-72">
                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C3E3EE]">Update Terakhir</p>
                                <p className="mt-2 text-sm font-bold leading-relaxed">
                                    {new Date(user.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                        <section className="rounded-[34px] border border-[#C3E3EE] bg-white p-6 shadow-[0_16px_42px_rgba(195,227,238,0.28)] md:p-8">
                            <div className="mb-8 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#053247] text-white shadow-lg shadow-[#053247]/20">
                                    <User size={22} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-[#053247]">Informasi Personal</h3>
                                    <p className="text-sm font-bold text-[#8BAFBF]">Kelola identitas akun yang dipakai di sistem.</p>
                                </div>
                            </div>

                            <UpdateProfileInformationForm 
                                mustVerifyEmail={mustVerifyEmail} 
                                status={status} 
                            />
                        </section>

                        <aside className="space-y-6">
                            <section className="rounded-[34px] border border-[#C3E3EE] bg-white p-6 shadow-sm md:p-7">
                                <div className="mb-7 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
                                        <Lock size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-[#053247]">Keamanan</h4>
                                        <p className="text-xs font-bold text-[#8BAFBF]">Perbarui kata sandi akun.</p>
                                    </div>
                                </div>
                                <UpdatePasswordForm />
                            </section>

                            <section className="overflow-hidden rounded-[34px] bg-[#053247] p-7 text-white shadow-[0_18px_44px_rgba(5,50,71,0.24)]">
                                <div className="mb-5 flex items-center gap-2 text-white/70">
                                    <Info size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Token Akun</span>
                                </div>
                                <p className="text-sm font-bold leading-relaxed text-white/86">
                                    ID ini membantu admin mengidentifikasi akun secara cepat saat audit data.
                                </p>
                                <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-4">
                                    <p className="text-[9px] font-bold uppercase text-white/50">User ID Token</p>
                                    <code className="mt-1 block text-xs font-black text-[#C3E3EE]">#DETECH-{user.id}-{new Date().getFullYear()}</code>
                                </div>
                            </section>
                        </aside>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function getInitials(name: string) {
    const words = name.trim().split(/\s+/).filter(Boolean);

    if (words.length >= 2) {
        return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }

    return (words[0] || 'U').slice(0, 2).toUpperCase();
}
