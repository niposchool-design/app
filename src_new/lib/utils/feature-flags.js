/**
 * Feature Flags Configuration
 * Localização: src_new/lib/utils/feature-flags.js
 */

// ✅ CONFIGURAÇÃO DE FEATURE FLAGS
export const FEATURE_FLAGS = {
  // Nova estrutura
  USE_NEW_STRUCTURE: true,
  USE_NEW_ADMIN_PAGES: true,
  USE_NEW_COMPONENTS: true,
  USE_NEW_AUTH: true,
  
  // Páginas específicas
  NEW_ADMIN_DASHBOARD: true,
  NEW_ADMIN_STUDENTS: true,
  NEW_ADMIN_TEACHERS: true,
  NEW_ADMIN_INSTRUMENTS: true,
  NEW_ADMIN_CURRICULUM: true,
  
  // Funcionalidades
  BRIDGE_PAGE: true,
  DUAL_ROUTING: true,
  LEGACY_FALLBACK: true,
  
  // Debug
  SHOW_STRUCTURE_INFO: true,
  CONSOLE_LOGS: true
};

// ✅ HELPER FUNCTIONS
export const isFeatureEnabled = (featureName) => {
  return FEATURE_FLAGS[featureName] === true;
};

export const getEnabledFeatures = () => {
  return Object.entries(FEATURE_FLAGS)
    .filter(([, enabled]) => enabled)
    .map(([feature]) => feature);
};

export const getDisabledFeatures = () => {
  return Object.entries(FEATURE_FLAGS)
    .filter(([, enabled]) => !enabled)
    .map(([feature]) => feature);
};

// ✅ ROUTING HELPERS
export const shouldUseNewStructure = () => {
  return isFeatureEnabled('USE_NEW_STRUCTURE');
};

export const shouldUseNewAdminPages = () => {
  return isFeatureEnabled('USE_NEW_ADMIN_PAGES');
};

export const shouldShowBridge = () => {
  return isFeatureEnabled('BRIDGE_PAGE');
};

// ✅ DEBUG HELPER
export const logFeatureFlags = () => {
  if (isFeatureEnabled('CONSOLE_LOGS')) {
    console.log('🏁 Feature Flags Status:', {
      enabled: getEnabledFeatures(),
      disabled: getDisabledFeatures(),
      useNewStructure: shouldUseNewStructure(),
      useNewAdminPages: shouldUseNewAdminPages(),
      showBridge: shouldShowBridge()
    });
  }
};

// ✅ ENVIRONMENT DETECTION
export const getEnvironmentConfig = () => {
  const env = import.meta.env.MODE || 'development';
  
  return {
    isDevelopment: env === 'development',
    isProduction: env === 'production',
    isTest: env === 'test',
    environment: env
  };
};

export default FEATURE_FLAGS;