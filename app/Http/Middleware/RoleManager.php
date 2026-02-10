<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RoleManager
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  ...$roles  // Menangkap semua role yang dikirim (admin, dokter, dll)
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // 1. Pastikan user sudah login
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $userRole = Auth::user()->role;

        // 2. Cek apakah role user ada di dalam daftar $roles yang diizinkan
        if (in_array($userRole, $roles)) {
            return $next($request);
        }

        // 3. Jika tidak punya akses, arahkan ke dashboard masing-masing role
        return match($userRole) {
            'admin'        => redirect()->route('admin.dashboard'),
            'dokter'       => redirect()->route('dokter.dashboard'),
            'radiografer'  => redirect()->route('radiografer.dashboard'),
            default        => redirect()->route('dashboard'), // Role pasien atau lainnya
        };
    }
}