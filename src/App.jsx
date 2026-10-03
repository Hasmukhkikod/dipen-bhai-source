import { useEffect, useState } from 'react';
import { ContentProvider } from './context/ContentContext';
import AdminPanel from './pages/AdminPanel';
import BlogPage from './pages/BlogPage';
import MainSite from './pages/MainSite';
import TalksPage from './pages/TalksPage';
import WhatsAppWidget from './components/WhatsAppWidget';
import { Toaster } from 'sonner';

function App() {
  let [e, t] = useState(window.location.hash || `#/`);
  useEffect(() => {
    let e = () => {
      let e = window.location.hash || `#/`;
      if (t(e), !e.startsWith(`#/admin`) && !e.startsWith(`#/blog`) && !e.startsWith(`#/talks`)) {
        let t = e.startsWith(`#/`) ? e.substring(2) : e.substring(1);
        if (t) {
          let e = document.getElementById(t);
          if (e) {
            e.scrollIntoView({
              behavior: `smooth`
            });
            return;
          }
        }
        window.scrollTo({
          top: 0,
          behavior: `instant`
        });
      } else window.scrollTo({
        top: 0,
        behavior: `instant`
      });
    };
    window.addEventListener(`hashchange`, e);
    return () => window.removeEventListener(`hashchange`, e);
  }, []);
  useEffect(() => {
    let e = window.location.hash;
    if (e && !e.startsWith(`#/admin`) && !e.startsWith(`#/blog`) && !e.startsWith(`#/talks`)) {
      let t = e.startsWith(`#/`) ? e.substring(2) : e.substring(1);
      if (t) {
        let e = setTimeout(() => {
          let e = document.getElementById(t);
          e && e.scrollIntoView({
            behavior: `smooth`
          });
        }, 150);
        return () => clearTimeout(e);
      }
    }
  }, []);
  return <ContentProvider>
      <Toaster position="bottom-right" theme="dark" />
      {e.startsWith(`#/admin`) ? <AdminPanel /> : <>
        {e.startsWith(`#/blog`) ? <BlogPage currentPath={e} /> : e.startsWith(`#/talks`) ? <TalksPage /> : <MainSite />}
        <WhatsAppWidget />
      </>}
    </ContentProvider>;
}

export default App;