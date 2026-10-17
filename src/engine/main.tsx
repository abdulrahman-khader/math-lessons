import { createRoot } from 'react-dom/client';
import '@fontsource/tajawal/arabic-500.css';
import '@fontsource/tajawal/arabic-700.css';
import '@fontsource/tajawal/arabic-800.css';
import '@fontsource/tajawal/latin-700.css';
import '@fontsource/baloo-bhaijaan-2/arabic-700.css';
import '@fontsource/baloo-bhaijaan-2/arabic-800.css';
import './styles/core.css';
import lesson from '@lesson';
import { LessonApp } from './LessonApp';

createRoot(document.getElementById('root')!).render(<LessonApp lesson={lesson} />);
