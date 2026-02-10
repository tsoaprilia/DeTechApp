interface StatProps {
    title: string;
    value: string | number;
    trend: string;
    iconBg: string;
    trendBg: string;
}

function StatCard({ title, value, trend, color, icon }: any) {
    const colors: any = {
        teal: 'bg-[#E6F6F4] text-[#0D9488]',
        navy: 'bg-[#EBEFF1] text-[#053247]',
        emerald: 'bg-[#ECFDF5] text-[#10B981]',
        blue: 'bg-[#EFF6FF] text-[#3B82F6]',
    };

    const trendColors: any = {
        teal: 'bg-[#0D9488]',
        navy: 'bg-[#053247]',
        emerald: 'bg-[#10B981]',
        blue: 'bg-[#1E3A8A]',
    };

    return (
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-white/50 flex flex-col gap-5 transition-all duration-500 group cursor-pointer hover:-translate-y-2 hover:shadow-[detech-blue]">
            <div className="flex justify-between items-start">
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors[color]} transition-transform group-hover:rotate-12`}>
                    {icon}
                </div>
                {/* Trend Badge */}
                <span className={`px-4 py-1.5 rounded-full text-[11px] font-black text-white uppercase tracking-wider ${trendColors[color]}`}>
                    {trend}
                </span>
            </div>
            <div>
                {/* Judul: Ketebalan dikurangi menjadi font-medium agar lebih estetik */}
                <p className="text-gray-400 font-medium text-sm mb-1">{title}</p>
                {/* Nilai: Tetap font-black agar menonjol */}
                <h3 className="text-5xl font-black text-[#053247] tracking-tighter leading-none">{value}</h3>
            </div>
        </div>
    );
}