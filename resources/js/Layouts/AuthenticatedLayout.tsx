// resources/js/Layouts/AuthenticatedLayout.tsx

import { PropsWithChildren, ReactNode } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    // Kita tidak perlu state dropdown lagi karena navbarnya kita hapus
    return (
        <div className="min-h-screen bg-gray-100">
            {/* NAVBAR BAWAAN DIHAPUS 
                Agar tidak bentrok dengan Header kustom DeTech
            */}

            {/* Bagian Header ini juga bisa dihapus jika kamu tidak ingin ada bar putih di bawah navbar */}
            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Konten utama halaman akan muncul di sini */}
            <main>{children}</main>
        </div>
    );
}