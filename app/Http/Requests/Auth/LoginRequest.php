<?php

namespace App\Http\Requests\Auth;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string'],
            'user_type' => ['required', Rule::in(['faskes', 'pasien'])],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        $identifier = $this->normalizeIdentifier($this->string('email')->toString());
        $userType = $this->string('user_type')->toString();
        $user = $this->resolveUser($identifier, $userType);

        if (
            ! $user ||
            ! Auth::attempt([
                'email' => $user->email,
                'password' => $this->string('password')->toString(),
            ], $this->boolean('remember'))
        ) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'email' => 'Email/NIK atau kata sandi tidak sesuai.',
            ]);
        }

        RateLimiter::clear($this->throttleKey());
    }

    private function resolveUser(string $identifier, string $userType): ?User
    {
        $isEmail = filter_var($identifier, FILTER_VALIDATE_EMAIL);

        if ($userType === 'pasien') {
            if ($isEmail) {
                return User::where('email', $identifier)
                    ->where('role', 'pasien')
                    ->first();
            }

            return $this->resolvePatientByNik($identifier);
        }

        if (! $isEmail) {
            return $this->resolvePatientByNik($identifier);
        }

        return User::where('email', $identifier)
            ->whereIn('role', ['admin', 'dokter', 'radiografer'])
            ->first();
    }

    private function resolvePatientByNik(string $identifier): ?User
    {
        $nik = preg_replace('/\D+/', '', $identifier);

        if (! $nik) {
            return null;
        }

        return Patient::with(['user' => fn ($query) => $query->where('role', 'pasien')])
            ->where('nik', $nik)
            ->first()
            ?->user;
    }

    private function normalizeIdentifier(string $identifier): string
    {
        $identifier = trim($identifier);

        if (filter_var($identifier, FILTER_VALIDATE_EMAIL)) {
            return $identifier;
        }

        return preg_replace('/\s+/', '', $identifier);
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('email')).'|'.$this->ip());
    }
}
