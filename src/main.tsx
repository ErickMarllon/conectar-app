import { createRoot } from 'react-dom/client';
import '../src/locales/i18n.ts';
import App from './App.tsx';
import './styles/global.css';
// Slick Carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Lazy loading
import 'react-lazy-load-image-component/src/effects/blur.css';

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet.fullscreen';

// editor
import 'react-quill/dist/quill.snow.css';

// lightbox
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
// import { reportWebVitals } from './reportWebVitals.ts';

createRoot(document.getElementById('root')!).render(<App />);
// reportWebVitals(console.info);
