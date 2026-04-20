<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Laporan DeTech - {{ $radiograph->id_radiograph }}</title>
    <style>
        @page { margin: 0.8cm; }
        body { 
            font-family: 'Helvetica', sans-serif; 
            color: #053247; 
            background-color: #ffffff; 
            margin: 0; 
            padding: 0; 
            line-height: 1.2;
        }

        .header { 
            text-align: center; 
            border-bottom: 2px solid #053247; 
            padding-bottom: 5px; 
            margin-bottom: 10px; 
        }
        .logo-text { font-size: 20px; font-weight: bold; }
        .sub-logo { font-size: 8px; color: #8BAFBF; text-transform: uppercase; letter-spacing: 1px; }

        .card-info { 
            border: 1px solid #C3E3EE; 
            border-radius: 10px; 
            padding: 10px; 
            background-color: #F8FDFF; 
            margin-bottom: 15px;
        }
        .table-info { width: 100%; border-collapse: collapse; }
        .table-info td { vertical-align: top; padding: 2px; font-size: 9px; }
        .label { font-weight: bold; color: #8BAFBF; text-transform: uppercase; font-size: 7px; }
        .value { font-weight: bold; color: #053247; }

        .section-title { 
            font-size: 10px; 
            font-weight: bold; 
            margin: 15px 0 8px 0; 
            color: #053247; 
            text-transform: uppercase;
            border-left: 4px solid #053247;
            padding-left: 6px;
        }

        /* Gambar Panoramik */
        .main-img-box { 
            width: 100%; 
            background: #000000; 
            padding: 5px; 
            border-radius: 10px; 
            text-align: center;
        }
        .main-img { width: 100%; height: auto; display: block; }

        /* Odontogram */
        .odontogram-box { 
            background: #F8FDFF; 
            border-radius: 12px; 
            padding: 15px; 
            text-align: center; 
            border: 1px solid #C3E3EE;
            margin-bottom: 15px;
        }
        .teeth-row { margin-bottom: 10px; }
        .tooth { 
            display: inline-block; 
            width: 25px; 
            height: 25px; 
            line-height: 25px; 
            margin: 2px; 
            border-radius: 4px; 
            font-size: 9px; 
            font-weight: bold; 
        }
        .active { background-color: #C3E3EE; color: #053247; border: 1px solid #053247; }
        .inactive { background-color: #ffffff; color: #D1D5DB; border: 1px dashed #D1D5DB; }

        /* Tambahan Legenda */
        .legend { margin-top: 10px; font-size: 8px; font-weight: bold; text-align: center; }
        .legend-item { display: inline-block; margin: 0 10px; vertical-align: middle; }
        .dot { 
            display: inline-block; 
            width: 10px; 
            height: 10px; 
            margin-right: 5px; 
            border-radius: 2px; 
            vertical-align: middle;
        }

        /* Galeri Crop */
        .gallery-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 5px;
            table-layout: fixed;
        }
        .crop-card {
            background: #ffffff;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            padding: 5px;
            text-align: center;
            height: 120px;
            vertical-align: top;
        }
        .img-wrapper {
            width: 100%;
            height: 80px;
            background-color: #F3F4F6;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 5px;
        }
        .crop-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .crop-no { font-size: 9px; font-weight: bold; color: #053247; }
        .crop-status { font-size: 7px; color: #10B981; font-weight: bold; text-transform: uppercase; }
        .off-text { 
            font-size: 8px; 
            color: #9CA3AF; 
            font-weight: bold; 
            padding-top: 30px; 
            text-transform: uppercase;
            line-height: 1;
        }

        .footer { margin-top: 30px; width: 100%; }
        .sign-area { float: right; width: 200px; text-align: center; font-size: 10px; }
        
        .clearfix::after {
            content: "";
            clear: both;
            display: table;
        }
    </style>
</head>
<body>

    <div class="header">
        <div class="logo-text">DeTech <span style="font-weight: normal; color: #8BAFBF;">Dental</span></div>
        <div class="sub-logo">Laporan Hasil Deteksi Gigi Susu Otomatis</div>
    </div>

    <div class="card-info">
        <table class="table-info">
            <tr>
                <td width="50%">
                    <div class="label">Nama Pasien</div>
                    <div class="value">{{ $radiograph->patient->user->name }}</div>
                </td>
                <td width="50%">
                    <div class="label">ID Radiografi</div>
                    <div class="value">#{{ $radiograph->id_radiograph }}</div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="label">NIK</div>
                    <div class="value">{{ $radiograph->patient_nik }}</div>
                </td>
                <td>
                    <div class="label">Tgl Periksa</div>
                    <div class="value">{{ $radiograph->created_at->format('d F Y') }}</div>
                </td>
            </tr>
        </table>
    </div>

    <div class="section-title">Citra Radiografi Panoramik</div>
    <div class="main-img-box">
        <img src="{{ public_path('storage/' . $radiograph->image) }}" class="main-img">
    </div>

    <div class="section-title">Hasil Odontogram</div>
    <div class="odontogram-box">
        @php
            $upper = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65];
            $lower = [85, 84, 83, 82, 81, 71, 72, 73, 74, 75];
            $detected = $radiograph->detections->pluck('no_fdi')->toArray();
        @endphp

        <div class="teeth-row">
            @foreach($upper as $fdi)
                <div class="tooth {{ in_array($fdi, $detected) ? 'active' : 'inactive' }}">{{ $fdi }}</div>
            @endforeach
        </div>
        <div class="teeth-row">
            @foreach($lower as $fdi)
                <div class="tooth {{ in_array($fdi, $detected) ? 'active' : 'inactive' }}">{{ $fdi }}</div>
            @endforeach
        </div>

        <div class="legend">
            <div class="legend-item">
                <span class="dot active"></span>
                <span>BIRU: GIGI SUSU</span>
            </div>
            <div class="legend-item">
                <span class="dot inactive"></span>
                <span>ABU: GIGI TANGGAL / HILANG</span>
            </div>
        </div>
    </div>

    <div class="section-title">Detail Hasil Crop Gigi</div>
    <table class="gallery-table">
        @php
            $allTeeth = array_merge($upper, $lower);
            $imgName = explode('.', basename($radiograph->image))[0];
            $chunks = array_chunk($allTeeth, 5);
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
                                <div class="off-text">GIGI<br>TANGGAL</div>
                            @endif
                        </div>
                        <div class="crop-no">Gigi #{{ $fdi }}</div>
                        @if($check)
                            <div class="crop-status">Terdeteksi</div>
                        @endif
                    </td>
                @endforeach
            </tr>
        @endforeach
    </table>

    <div class="footer clearfix">
        <div class="sign-area">
            <p>Surabaya, {{ date('d F Y') }}</p>
            <p style="margin-bottom: 40px;">Dokter Pemeriksa,</p>
            <p><strong>( {{ $radiograph->dokter->name ?? 'Admin DeTech' }} )</strong></p>
        </div>
    </div>

</body>
</html>