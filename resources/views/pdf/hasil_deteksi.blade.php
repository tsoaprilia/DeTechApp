<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Laporan DeTech - {{ $radiograph->id_radiograph }}</title>
    <style>
        @page { margin: 1cm; }
        body { 
            font-family: 'Helvetica', sans-serif; 
            color: #053247; 
            background-color: #ffffff; 
            margin: 0; 
            padding: 0; 
            line-height: 1.4;
        }

        .header { 
            text-align: center; 
            border-bottom: 3px solid #053247; 
            padding-bottom: 10px; 
            margin-bottom: 20px; 
        }
        .logo-text { font-size: 24px; font-weight: bold; color: #053247; }
        .sub-logo { font-size: 10px; color: #8BAFBF; text-transform: uppercase; letter-spacing: 2px; }

        .card-info { 
            border: 1px solid #C3E3EE; 
            border-radius: 15px; 
            padding: 15px; 
            background-color: #F8FDFF; 
            margin-bottom: 20px;
        }
        .table-info { width: 100%; border-collapse: collapse; }
        .table-info td { vertical-align: top; padding: 5px; font-size: 11px; }
        .label { font-weight: bold; color: #8BAFBF; text-transform: uppercase; font-size: 8px; margin-bottom: 2px; }
        .value { font-weight: bold; color: #053247; font-size: 12px; }

        .section-title { 
            font-size: 12px; 
            font-weight: bold; 
            margin: 20px 0 10px 0; 
            color: #053247; 
            text-transform: uppercase;
            border-left: 5px solid #053247;
            padding-left: 8px;
        }

        /* Gambar Panoramik */
        .main-img-box { 
            width: 100%; 
            background: #000000; 
            padding: 10px; 
            border-radius: 15px; 
            text-align: center;
        }
        .main-img { width: 100%; max-height: 400px; object-fit: contain; }

        /* Odontogram */
        .odontogram-box { 
            background: #F8FDFF; 
            border-radius: 15px; 
            padding: 20px; 
            text-align: center; 
            border: 1px solid #C3E3EE;
        }
        .teeth-row { margin-bottom: 10px; }
        .tooth { 
            display: inline-block; 
            width: 30px; 
            height: 30px; 
            line-height: 30px; 
            margin: 3px; 
            border-radius: 6px; 
            font-size: 11px; 
            font-weight: bold; 
        }
        .active { background-color: #C3E3EE; color: #053247; border: 1.5px solid #053247; }
        .inactive { background-color: #ffffff; color: #D1D5DB; border: 1.5px dashed #D1D5DB; }

        /* Galeri Crop */
        .gallery-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 8px;
            table-layout: fixed;
        }
        .crop-card {
            background: #ffffff;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            padding: 8px;
            text-align: center;
            vertical-align: top;
        }
        .img-wrapper {
            width: 100%;
            height: 90px;
            background-color: #F3F4F6;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 8px;
        }
        .crop-img { width: 100%; height: 100%; object-fit: cover; }
        
        .crop-no { font-size: 10px; font-weight: 800; color: #053247; margin-bottom: 2px; }
        
        /* ANALISIS DOKTER - PERBAIKAN DI SINI */
        .crop-status { 
            font-size: 9px; 
            color: #10B981; 
            font-weight: bold; 
            font-style: italic;
            line-height: 1.2;
            display: block;
            margin-top: 4px;
        }
        
        .off-text { 
            font-size: 9px; 
            color: #9CA3AF; 
            font-weight: bold; 
            padding-top: 35px; 
            text-transform: uppercase;
        }

        .footer { margin-top: 50px; }
        .sign-area { float: right; width: 220px; text-align: center; font-size: 12px; }
        
        .clearfix::after {
            content: "";
            clear: both;
            display: table;
        }
    </style>
</head>
<body>

    <div class="header">
        <div class="logo-text">DeTech <span style="font-weight: normal; color: #8BAFBF;">Dental AI</span></div>
        <div class="sub-logo">Laporan Verifikasi Gigi Susu & Analisis Klinis</div>
    </div>

    <div class="card-info">
        <table class="table-info">
            <tr>
                <td width="50%">
                    <div class="label">Nama Pasien</div>
                    <div class="value">{{ $radiograph->patient->user->name }}</div>
                </td>
                <td width="50%">
                    <div class="label">ID Pemeriksaan</div>
                    <div class="value">#{{ $radiograph->id_radiograph }}</div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="label">Nomor Induk Kependudukan (NIK)</div>
                    <div class="value">{{ $radiograph->patient_nik }}</div>
                </td>
                <td>
                    <div class="label">Tanggal Verifikasi</div>
                    <div class="value">{{ $radiograph->updated_at->format('d F Y') }}</div>
                </td>
            </tr>
        </table>
    </div>

    <div class="section-title">Citra Radiografi Panoramik</div>
    <div class="main-img-box">
        <img src="{{ public_path('storage/' . $radiograph->image) }}" class="main-img">
    </div>

    <div class="section-title">Odontogram Gigi Susu</div>
    <div class="odontogram-box">
        <!-- Tambahan Legenda Warna -->
        <div style="text-align: right; margin-bottom: 15px;">
            <div style="display: inline-block; margin-left: 15px;">
                <span style="display: inline-block; width: 10px; height: 10px; background-color: #C3E3EE; border: 1px solid #053247; border-radius: 2px;"></span>
                <span style="font-size: 8px; font-weight: bold; color: #053247; text-transform: uppercase; vertical-align: middle;">Gigi Susu Terdeteksi</span>
            </div>
            <div style="display: inline-block; margin-left: 15px;">
                <span style="display: inline-block; width: 10px; height: 10px; background-color: #ffffff; border: 1px dashed #D1D5DB; border-radius: 2px;"></span>
                <span style="font-size: 8px; font-weight: bold; color: #9CA3AF; text-transform: uppercase; vertical-align: middle;">Gigi Sudah Tanggal / Hilang</span>
            </div>
        </div>

        @php
            $upper = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65];
            $lower = [85, 84, 83, 82, 81, 71, 72, 73, 74, 75];
            $detected = $radiograph->detections->pluck('no_fdi')->toArray();
        @endphp

        <!-- Baris Atas -->
        <div class="teeth-row" style="margin-bottom: 0;">
            @foreach($upper as $fdi)
                <div class="tooth {{ in_array($fdi, $detected) ? 'active' : 'inactive' }}">{{ $fdi }}</div>
            @endforeach
        </div>

        <!-- Garis Tengah Presisi (Memanjang mengikuti lebar gigi) -->
        <div style="width: 440px; height: 1px; background: #C3E3EE; margin: 5px auto; border: none;"></div>

        <!-- Baris Bawah -->
        <div class="teeth-row" style="margin-top: 12;">
            @foreach($lower as $fdi)
                <div class="tooth {{ in_array($fdi, $detected) ? 'active' : 'inactive' }}">{{ $fdi }}</div>
            @endforeach
        </div>
    </div>

    <div class="section-title">Hasil Analisis per Gigi</div>
    <table class="gallery-table">
        @php
            $allTeeth = array_merge($upper, $lower);
            $imgName = explode('.', basename($radiograph->image))[0];
            // Kita bagi per baris isi 4 agar teks analisis dokter muat dan tidak sesak
            $chunks = array_chunk($allTeeth, 4);
        @endphp

        @foreach($chunks as $chunk)
            <tr>
                @foreach($chunk as $fdi)
                    @php 
                        $check = $radiograph->detections->where('no_fdi', $fdi)->first(); 
                        $path = public_path("storage/radiographs/crop_{$fdi}_{$imgName}.jpg");
                    @endphp
                    <td class="crop-card">
                        <div class="img-wrapper">
                            @if($check && file_exists($path))
                                <img src="{{ $path }}" class="crop-img">
                            @else
                                <div class="off-text">Tanggal/Hilang</div>
                            @endif
                        </div>
                        <div class="crop-no">Gigi #{{ $fdi }}</div>
                        
                        {{-- MENAMPILKAN ANALISIS DARI DATABASE --}}
                        @if($check)
                            <div class="crop-status">"{{ $check->analysis }}"</div>
                        @else
                            <div style="font-size: 8px; color: #9CA3AF;">Tidak Terdeteksi</div>
                        @endif
                    </td>
                @endforeach
            </tr>
        @endforeach
    </table>

    <div class="sign-area">
    <p>Surabaya, {{ date('d F Y') }}</p>
    <p style="margin-bottom: 10px;">Dokter Pemeriksa,</p>
    
    <!-- TAMPILAN QR CODE -->
    <div style="margin-bottom: 10px;">
        <img src="data:image/svg+xml;base64,{{ $qrcode }}" style="width: 80px; height: 80px;">
    </div>
    
    <p><strong>{{ $radiograph->dokter->name ?? 'Admin DeTech' }}</strong></p>
    <div style="border-top: 1px solid #053247; margin-top: 5px; font-size: 8px; color: #8BAFBF; text-transform: uppercase;">
        Scan to Verify Original Document
    </div>
</div>

</body>
</html>