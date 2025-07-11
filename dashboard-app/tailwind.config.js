/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple-inspired color palette
        apple: {
          gray: {
            50: '#fafafa',
            100: '#f5f5f7',
            200: '#e5e5e7',
            300: '#d2d2d7',
            400: '#86868b',
            500: '#6e6e73',
            600: '#515154',
            700: '#1d1d1f',
            800: '#161618',
            900: '#0a0a0b',
          },
          blue: {
            50: '#e6f3ff',
            100: '#b3d9ff',
            200: '#80bfff',
            300: '#4da6ff',
            400: '#1a8cff',
            500: '#007aff', // Apple blue
            600: '#0056cc',
            700: '#004999',
            800: '#003d66',
            900: '#002333',
          },
          green: {
            50: '#e6f7e6',
            100: '#b3e6b3',
            200: '#80d480',
            300: '#4dc34d',
            400: '#1ab31a',
            500: '#30d158', // Apple green
            600: '#26a644',
            700: '#1d7d33',
            800: '#135522',
            900: '#0a2c11',
          },
          orange: {
            50: '#fff5e6',
            100: '#ffe0b3',
            200: '#ffcb80',
            300: '#ffb64d',
            400: '#ffa11a',
            500: '#ff9500', // Apple orange
            600: '#cc7700',
            700: '#995900',
            800: '#663b00',
            900: '#331e00',
          },
          red: {
            50: '#ffe6e6',
            100: '#ffb3b3',
            200: '#ff8080',
            300: '#ff4d4d',
            400: '#ff1a1a',
            500: '#ff3b30', // Apple red
            600: '#cc2e26',
            700: '#99221d',
            800: '#661713',
            900: '#330b0a',
          },
          purple: {
            50: '#f5e6ff',
            100: '#e0b3ff',
            200: '#cb80ff',
            300: '#b64dff',
            400: '#a11aff',
            500: '#af52de', // Apple purple
            600: '#8c42b1',
            700: '#693285',
            800: '#462258',
            900: '#23112c',
          },
          indigo: {
            50: '#e6edff',
            100: '#b3ccff',
            200: '#80aaff',
            300: '#4d88ff',
            400: '#1a66ff',
            500: '#5856d6', // Apple indigo
            600: '#4645ab',
            700: '#353480',
            800: '#232355',
            900: '#12112b',
          }
        }
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 1s infinite',
      },
      boxShadow: {
        'apple': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'apple-lg': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'apple-xl': '0 12px 48px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'apple': '12px',
        'apple-lg': '16px',
        'apple-xl': '20px',
      }
    },
  },
  plugins: [],
}