import { useEffect } from 'react';
import Projects from '../components/Projects';

export default function ProjectsPage() {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Karya Terpilih & Portofolio — Luigi Iram Rangi | Founder of Ddev';
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <article className="relative w-full bg-[#07080B] text-white overflow-x-clip min-h-screen">
      <Projects />
    </article>
  );
}

