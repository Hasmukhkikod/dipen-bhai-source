import { useEffect, useState } from 'react';
import { ContentProvider } from './context/ContentContext';
import AdminPanel from './pages/AdminPanel';
import BlogPage from './pages/BlogPage';
import MainSite from './pages/MainSite';

function App() {
  let [e, t] = useState(window.location.hash || `#/`);
  useEffect(() => {
    let e = () => {
      let e = window.location.hash || `#/`;
      if (t(e), !e.startsWith(`#/admin`) && !e.startsWith(`#/blog`)) {
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
    if (e && !e.startsWith(`#/admin`) && !e.startsWith(`#/blog`)) {
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
      {e.startsWith(`#/admin`) ? <AdminPanel /> : e.startsWith(`#/blog`) ? <BlogPage currentPath={e} /> : <MainSite />}
    </ContentProvider>;
}

export default App;