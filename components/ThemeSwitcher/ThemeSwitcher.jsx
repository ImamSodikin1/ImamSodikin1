// components/ThemeSwitcher.js
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeSwitcher({ expanded }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mencegah kesalahan "hydration" dengan memastikan komponen sudah di-mount
  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Hanya render jika komponen sudah di-mount

  return (
    <div className={`relative flex items-center gap-3 p-1 rounded-full w-24 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300'}`}>
      <button
        onClick={() => setTheme('light')}
        className={`flex-1 py-2 text-xs font-medium rounded-full text-center transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300'}`}
      >
        Light
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`flex-1 py-1 text-xs font-medium rounded-full text-center transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300'}`}
      >
        Dark
      </button>
      <span
        className={`absolute top-1.5 h-7 text-white bottom-0.5 w-1/2 flex items-center justify-center rounded-full bg-yellow-500 transition-transform duration-200 ${theme === 'dark' ? 'translate-x-3/4 ' : 'translate-x-0 '}`}
      >
        {theme === 'dark' ? (
          <Moon size={16} className="absolute left-1/2 transform -translate-x-1/2 " /> // Ukuran ikon bulan kecil
        ) : (
          <Sun size={16} className="absolute left-1/2 transform -translate-x-1/2 " /> // Ukuran ikon matahari kecil
        )}
      </span>
    </div>
  );
}
