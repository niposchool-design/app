// @new/app/config/index.js
// 🎯 Configurações centrais da aplicação

export const APP_CONFIG = {
  name: 'Nipo School',
  version: '2.0.0',
  description: 'Sistema Oriental de Ensino Musical',
  
  // URLs e endpoints
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  
  // Configurações de features
  features: {
    pwa: true,
    qrCode: true,
    offline: true,
    analytics: false,
  },
  
  // Configurações de UI
  ui: {
    theme: 'nipo',
    defaultLanguage: 'pt-BR',
    itemsPerPage: 10,
  },
  
  // Configurações de rotas
  routes: {
    public: ['/', '/login', '/register'],
    protected: ['/dashboard', '/admin', '/student', '/teacher'],
    admin: ['/admin'],
  }
};

export default APP_CONFIG;