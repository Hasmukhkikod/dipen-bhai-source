import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ContentContext = createContext();

const TOKEN_KEY = 'dipen_admin_token';

function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { ...(options.headers || {}) };
  if (options.body) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`/api${path}`, { ...options, headers });
  let payload = null;
  try { payload = await res.json(); } catch { /* no body */ }
  if (!res.ok) {
    throw new Error((payload && payload.error) || `Request to ${path} failed (${res.status})`);
  }
  return payload;
}

const ContentProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(() => !!getToken());

  const loadPublicSite = useCallback(async () => {
    const site = await apiFetch('/site');
    setData(site);
  }, []);

  const loadAdminSite = useCallback(async () => {
    const site = await apiFetch('/admin/site');
    setData(site);
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      if (isAdmin) {
        try {
          await loadAdminSite();
          return;
        } catch {
          // Stale/expired/invalid token — don't let it break the whole site
          // (ContentProvider wraps every route, not just the admin panel).
          // Fall back to the public view, as if never logged in.
          sessionStorage.removeItem(TOKEN_KEY);
          setIsAdmin(false);
        }
      }
      await loadPublicSite();
    })()
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (password) => {
    const { token } = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
    sessionStorage.setItem(TOKEN_KEY, token);
    // Load the fuller admin dataset (incl. leads) BEFORE flipping isAdmin,
    // so the admin UI never renders a frame where isAdmin=true but data
    // still only has the public (leads-less) shape.
    await loadAdminSite();
    setIsAdmin(true);
  }, [loadAdminSite]);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    setIsAdmin(false);
  }, []);

  const value = {
    data,
    loading,
    loadError,
    isAdmin,
    login,
    logout,

    changePassword: async (currentPassword, newPassword) => {
      await apiFetch('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
    },

    updateProfile: async (profile) => {
      await apiFetch('/admin/profile', { method: 'PUT', body: JSON.stringify(profile) });
      setData((d) => ({ ...d, profile: { ...d.profile, ...profile } }));
    },

    updateSettings: async (settings) => {
      await apiFetch('/admin/settings', { method: 'PUT', body: JSON.stringify(settings) });
      setData((d) => ({ ...d, settings: { ...d.settings, ...settings } }));
    },

    addProject: async (project) => {
      const created = await apiFetch('/admin/projects', { method: 'POST', body: JSON.stringify(project) });
      setData((d) => ({ ...d, projects: [...d.projects, created] }));
    },
    updateProject: async (project) => {
      const updated = await apiFetch(`/admin/projects/${project.id}`, { method: 'PUT', body: JSON.stringify(project) });
      setData((d) => ({ ...d, projects: d.projects.map((p) => (p.id === updated.id ? updated : p)) }));
    },
    deleteProject: async (id) => {
      await apiFetch(`/admin/projects/${id}`, { method: 'DELETE' });
      setData((d) => ({ ...d, projects: d.projects.filter((p) => p.id !== id) }));
    },

    addBlog: async (blog) => {
      const created = await apiFetch('/admin/blogs', { method: 'POST', body: JSON.stringify(blog) });
      setData((d) => ({ ...d, blogs: [created, ...(d.blogs || [])] }));
    },
    updateBlog: async (blog) => {
      const updated = await apiFetch(`/admin/blogs/${blog.id}`, { method: 'PUT', body: JSON.stringify(blog) });
      setData((d) => ({ ...d, blogs: (d.blogs || []).map((b) => (b.id === updated.id ? updated : b)) }));
    },
    deleteBlog: async (id) => {
      await apiFetch(`/admin/blogs/${id}`, { method: 'DELETE' });
      setData((d) => ({ ...d, blogs: (d.blogs || []).filter((b) => b.id !== id) }));
    },

    addLead: async (lead) => {
      // Public endpoint - anyone submitting the contact form calls this, logged out.
      await apiFetch('/leads', { method: 'POST', body: JSON.stringify(lead) });
    },
    deleteLead: async (id) => {
      await apiFetch(`/admin/leads/${id}`, { method: 'DELETE' });
      setData((d) => ({ ...d, leads: (d.leads || []).filter((l) => l.id !== id) }));
    },

    resetData: async () => {
      await apiFetch('/admin/reset', { method: 'POST' });
      await loadAdminSite();
    },
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#faf8f5', color: '#6e6d6a', fontFamily: 'sans-serif', fontSize: '0.9rem',
      }}>
        Loading…
      </div>
    );
  }

  if (loadError || !data) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '0.5rem',
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#faf8f5', color: '#141414',
        fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center',
      }}>
        <div style={{ fontWeight: 700 }}>Couldn't load site content.</div>
        <div style={{ fontSize: '0.85rem', color: '#6e6d6a' }}>{loadError || 'Unknown error'}</div>
      </div>
    );
  }

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

const useContent = () => useContext(ContentContext);

export { ContentContext, ContentProvider, useContent };
