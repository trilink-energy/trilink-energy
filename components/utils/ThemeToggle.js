import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    dark ? root.classList.add('dark') : root.classList.remove('dark');
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="ml-4 px-3 py-1 border rounded text-sm bg-white dark:bg-black dark:text-white"
    >
      {dark ? '☀ Light' : '🌙 Dark'}
    </button>
  );
}
