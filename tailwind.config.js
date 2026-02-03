import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['DM Sans', 'sans-serif'], // Ini akan mengganti font default sans menjadi DM Sans
            },
            colors: {
      'detech-dark': '#053247',
      'detech-blue': '#8BAFBF',
      'detech-light': '#C3E3EE',
    }
        },

    },

    plugins: [forms],
};
