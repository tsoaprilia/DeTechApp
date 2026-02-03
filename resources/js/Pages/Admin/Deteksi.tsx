import { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import Header from '@/Components/Admin/Header';
import { User, Upload, Search, Calendar, Phone, MapPin, Hash, Info } from 'lucide-react';
import DatePicker from "react-datepicker";
import Select from 'react-select'; 
import "react-datepicker/dist/react-datepicker.css";
import "../../../css/datepicker-custom.css";

export default function DeteksiGigi({ auth, patients = [] }: { auth: any, patients: any[] }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isExistingPatient, setIsExistingPatient] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', nik: '', email: '', birth_place: '',
        birth_date: null as Date | null,
        age: '', gender: 'female', address: '',
        phone: '', image: null as File | null,
    });

    // 1. Format Data untuk Searchable Dropdown
    const patientOptions = [
        { value: '', label: 'Tambah Pasien Baru' },
        ...patients.map(p => ({
            value: p.nik,
            label: `${p.user?.name} (${p.nik})`
        }))
    ];

    // 2. Custom Styling React Select (Radius 22px, Hover Border #053247)
   const customSelectStyles = {
    control: (base: any, state: any) => ({
        ...base,
        backgroundColor: '#deeff6',
        borderRadius: '22px', 
        borderColor: state.isFocused ? '#053247' : '#C3E3EE', 
        paddingLeft: '40px',
        minHeight: '56px',
        boxShadow: 'none',
        '&:hover': { borderColor: '#053247' },
        fontFamily: 'DM Sans',
        fontSize: '14px',
        fontWeight: '500', 
        // Mengubah warna teks input utama menjadi Biru Dongker
        color: '#053247', 
    }),
    menu: (base: any) => ({
        ...base,
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 25px rgba(5, 50, 71, 0.1)', // Shadow lembut warna dongker
        marginTop: '8px',
        zIndex: 999,
    }),
    menuList: (base: any) => ({
        ...base,
        maxHeight: '250px',
        padding: '8px',
        '&::-webkit-scrollbar': { width: '6px' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#C3E3EE', borderRadius: '10px' },
    }),
    option: (base: any, state: any) => ({
        ...base,
        // Background saat dipilih biru dongker, saat hover biru sangat muda
        backgroundColor: state.isSelected ? '#053247' : state.isFocused ? '#F1FBFF' : 'transparent',
        // Teks Dongker jika tidak dipilih, Putih jika dipilih
        color: state.isSelected ? 'white' : '#053247', 
        fontFamily: 'DM Sans',
        fontSize: '14px',
        fontWeight: state.isSelected ? '600' : '500',
        padding: '12px 16px',
        borderRadius: '12px',
        cursor: 'pointer',
        '&:active': { backgroundColor: '#d5e9f3' },
    }),
    singleValue: (base: any) => ({ 
        ...base, 
        color: '#053247', // Warna teks yang sudah terpilih menjadi Biru Dongker
        fontWeight: '600'
    }),
    placeholder: (base: any) => ({ 
        ...base, 
        color: '#8BAFBF', // Warna teks placeholder (abu kebiruan)
        fontWeight: '400' 
    }),
    input: (base: any) => ({
        ...base,
        color: '#053247', // Warna teks saat Anda mengetik di pencarian
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (base: any) => ({
        ...base,
        color: '#8BAFBF',
        '&:hover': { color: '#053247' }
    })
};

    // 3. Logic saat pasien dipilih
    const handleSelectChange = (selectedOption: any) => {
        const nik = selectedOption?.value;
        if (!nik) {
            reset();
            setIsExistingPatient(false);
            return;
        }
        const patient = patients?.find(p => p.nik === nik);
        if (patient) {
            setIsExistingPatient(true);
            setData({
                ...data,
                nik: patient.nik,
                name: patient.user?.name || '',
                email: patient.user?.email || '',
                birth_place: patient.birth_place || '', 
                birth_date: patient.birth_date ? new Date(patient.birth_date) : null, 
                address: patient.address || '',
                phone: patient.user?.phone || '',
                age: patient.age.toString(),
                gender: patient.gender === 'male' ? 'male' : 'female',
            });
        }
    };

    // 4. Auto Calculate Age
    useEffect(() => {
        if (data.birth_date) {
            const today = new Date();
            const birthDate = new Date(data.birth_date);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }
            setData('age', age.toString());
        }
    }, [data.birth_date]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.deteksi.store'), { forceFormData: true });
    };

    return (
        <div className="flex h-screen bg-[#053247] overflow-hidden font-['DM_Sans']">
            <Head title="Deteksi Gigi Susu" />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} auth={auth} />

            <main className="flex-1 bg-[#F1FBFF] relative overflow-y-auto lg:rounded-l-[60px] shadow-2xl flex flex-col transition-all duration-500">
                <div className="px-8 lg:px-12">
                    <Header auth={auth} onMenuClick={() => setSidebarOpen(true)} />
                </div>

                <form onSubmit={submit} className="px-8 lg:px-12 pt-4 pb-12 space-y-6">
                    <section className="bg-white p-10 rounded-[40px] shadow-sm border border-[#C3E3EE] space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h3 className="text-xl font-bold text-[#053247] flex items-center gap-3">
                                <User className="text-[#8BAFBF]" size={24} /> Informasi Pasien
                            </h3>
                            
                            <div className="relative w-full md:w-96 group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8BAFBF] z-10" size={18} />
                                <Select
                                    options={patientOptions}
                                    styles={customSelectStyles}
                                    onChange={handleSelectChange}
                                    placeholder="Cari Nama atau NIK Pasien..."
                                    isSearchable={true}
                                    noOptionsMessage={() => "Pasien tidak tersedia"}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6">
                            <div className="md:col-span-2">
                                <InputGroup label="Nama Lengkap" value={data.name} readOnly={isExistingPatient} onChange={(e: any) => setData('name', e.target.value)} placeholder="Masukkan nama" icon={<User size={18} />} />
                            </div>
                            <div className="md:col-span-2">
                                <InputGroup label="NIK" value={data.nik} readOnly={isExistingPatient} maxLength={16} onChange={(e: any) => setData('nik', e.target.value.replace(/\D/g, ''))} placeholder="16 Digit NIK" icon={<Hash size={18} />} />
                            </div>

                            <InputGroup label="Tempat lahir" value={data.birth_place} readOnly={isExistingPatient} onChange={(e: any) => setData('birth_place', e.target.value)} placeholder="Kota" icon={<MapPin size={18} />} />
                            
                            <div className={`space-y-3 group ${isExistingPatient ? 'opacity-60' : ''}`}>
                                <label className="text-sm font-black text-[#053247] ml-2 opacity-90">Tanggal Lahir</label>
                                <div className="relative">
                                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8BAFBF] z-10" size={18} />
                                    <DatePicker
                                        selected={data.birth_date}
                                        disabled={isExistingPatient}
                                        onChange={(date) => setData('birth_date', date)}
                                        dateFormat="dd/MM/yyyy"
                                        className="w-full pl-14 pr-5 py-4 bg-white border border-[#C3E3EE] rounded-[22px] font-medium text-[#3B5862] outline-none"
                                    />
                                </div>
                            </div>

                            <InputGroup label="Umur" value={data.age} readOnly={true} suffix="Tahun" icon={<Info size={18} />} />

                            <div className={`space-y-3 ${isExistingPatient ? 'opacity-60 pointer-events-none' : ''}`}>
                                <label className="text-sm font-black text-[#053247] ml-2 opacity-90">Jenis Kelamin</label>
                                <div className="flex gap-4">
                                    <RadioLabel label="Laki-Laki" checked={data.gender === 'male'} onChange={() => setData('gender', 'male')} />
                                    <RadioLabel label="Perempuan" checked={data.gender === 'female'} onChange={() => setData('gender', 'female')} />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <InputGroup label="Alamat" value={data.address} readOnly={isExistingPatient} onChange={(e: any) => setData('address', e.target.value)} placeholder="Masukkan Alamat" icon={<MapPin size={18} />} />
                            </div>

                            <div className="md:col-span-2 grid grid-cols-2 gap-4">
                                <InputGroup label="No Telepon" value={data.phone} readOnly={isExistingPatient} maxLength={13} onChange={(e: any) => setData('phone', e.target.value.replace(/\D/g, ''))} placeholder="08..." icon={<Phone size={18} />} />
                                <InputGroup label="Email" value={data.email} readOnly={isExistingPatient} onChange={(e: any) => setData('email', e.target.value)} placeholder="ibu@email.com" icon={<User size={18} />} />
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-10 rounded-[40px] shadow-sm border border-[#C3E3EE] space-y-8">
                        <h3 className="text-xl font-bold text-[#053247] flex items-center gap-3">
                            <Upload className="text-[#8BAFBF]" size={24} /> Upload Radiografi
                        </h3>
                        <label htmlFor="image-upload" className="relative group border border-dashed border-[#C3E3EE] rounded-[30px] p-16 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-[#F1FBFF]/50 transition-all block text-center">
                            <input id="image-upload" type="file" className="hidden" onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)} />
                            <div className="w-20 h-20 bg-[#F1FBFF] rounded-3xl flex items-center justify-center border border-[#C3E3EE] group-hover:scale-110 transition-transform"><Upload size={40} /></div>
                            <p className="text-lg font-black text-[#053247]">{data.image ? data.image.name : 'Klik untuk upload radiografi'}</p>
                        </label>
                        <button type="submit" disabled={processing} className="w-full py-5 bg-[#053247] text-white rounded-[24px] font-black text-lg shadow-xl hover:scale-[1.01] transition-all disabled:bg-gray-400">
                            {processing ? 'Menyimpan...' : 'Simpan Data & Lanjutkan'}
                        </button>
                    </section>
                </form>
            </main>
        </div>
    );
}

function InputGroup({ label, placeholder, icon, suffix, value, onChange, readOnly, maxLength }: any) {
    return (
        <div className={`space-y-3 w-full text-left ${readOnly ? 'opacity-60' : ''}`}>
            <label className="text-sm font-black text-[#053247] ml-2 opacity-90">{label}</label>
            <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8BAFBF]">{icon}</div>
                <input 
                    value={value} onChange={onChange} readOnly={readOnly} maxLength={maxLength}
                    className={`w-full pl-14 pr-5 py-4 bg-white border border-[#C3E3EE] rounded-[22px] font-medium text-[#3B5862] outline-none transition-all ${readOnly ? 'bg-gray-50 cursor-not-allowed' : 'hover:bg-[#F1FBFF] focus:border-[#053247]'}`}
                    placeholder={placeholder}
                />
                {suffix && <span className="absolute right-5 top-1/2 -translate-y-1/2 font-medium text-gray-400 text-sm">{suffix}</span>}
            </div>
        </div>
    );
}

function RadioLabel({ label, checked, onChange }: any) {
    return (
        <label onClick={onChange} className={`flex-1 flex items-center justify-center gap-3 p-4 border rounded-[22px] cursor-pointer transition-all ${checked ? 'border-[#053247] bg-[#053247]/5 ring-1 ring-[#053247]' : 'border-[#C3E3EE] bg-white hover:bg-[#F1FBFF]'}`}>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${checked ? 'border-[#053247]' : 'border-gray-300'}`}>
                {checked && <div className="w-2.5 h-2.5 bg-[#053247] rounded-full" />}
            </div>
            <span className="font-medium text-[#3B5862] text-sm">{label}</span>
        </label>
    );
}