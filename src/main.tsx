import 'leaflet.fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet/dist/leaflet.css';
import { createRoot } from 'react-dom/client';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-quill/dist/quill.snow.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';
import '../src/locales/i18n.ts';
import App from './App.tsx';
// import { reportWebVitals } from './reportWebVitals.ts';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(<App />);
// reportWebVitals(console.info);
