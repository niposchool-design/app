/**
 * Bundle Analyzer - Análise de performance e tamanho do bundle
 * Localização: src_new/utils/bundle-analyzer.js
 * 
 * Este utilitário ajuda a analisar o tamanho do bundle e identificar
 * oportunidades de otimização.
 */

export class BundleAnalyzer {
  constructor() {
    this.metrics = {
      loadTimes: [],
      bundleSizes: new Map(),
      lazyLoadedChunks: new Set(),
      memoryUsage: []
    };
  }

  /**
   * Inicia o monitoramento de performance
   */
  startPerformanceMonitoring() {
    // Performance API para medir carregamento
    if (typeof window !== 'undefined' && window.performance) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'navigation') {
            this.metrics.loadTimes.push({
              timestamp: Date.now(),
              loadComplete: entry.loadEventEnd - entry.loadEventStart,
              domReady: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart
            });
          }
        });
      });
      
      observer.observe({ entryTypes: ['navigation'] });
    }
  }

  /**
   * Registra o carregamento de um chunk lazy
   */
  registerLazyChunk(chunkName, size = null) {
    this.metrics.lazyLoadedChunks.add({
      name: chunkName,
      loadedAt: Date.now(),
      size: size
    });

    console.log(`🚀 Lazy chunk carregado: ${chunkName}`, {
      totalChunks: this.metrics.lazyLoadedChunks.size,
      timestamp: new Date().toLocaleTimeString()
    });
  }

  /**
   * Analisa o uso de memória (aproximado)
   */
  analyzeMemoryUsage() {
    if (typeof window !== 'undefined' && window.performance && window.performance.memory) {
      const memory = window.performance.memory;
      this.metrics.memoryUsage.push({
        timestamp: Date.now(),
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit
      });

      return {
        usedMB: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        totalMB: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        limitMB: Math.round(memory.jsHeapSizeLimit / 1024 / 1024),
        usage: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100)
      };
    }
    return null;
  }

  /**
   * Gera relatório de performance
   */
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: {
        lazyChunksLoaded: this.metrics.lazyLoadedChunks.size,
        averageLoadTime: this.calculateAverageLoadTime(),
        currentMemoryUsage: this.analyzeMemoryUsage(),
        recommendations: this.generateRecommendations()
      },
      details: {
        lazyChunks: Array.from(this.metrics.lazyLoadedChunks),
        loadTimes: this.metrics.loadTimes.slice(-10), // Últimos 10
        memoryHistory: this.metrics.memoryUsage.slice(-5) // Últimos 5
      }
    };

    console.group('📊 Bundle Performance Report');
    console.table(report.metrics);
    console.log('Detalhes:', report.details);
    console.groupEnd();

    return report;
  }

  /**
   * Calcula tempo médio de carregamento
   */
  calculateAverageLoadTime() {
    if (this.metrics.loadTimes.length === 0) return 0;
    
    const total = this.metrics.loadTimes.reduce((sum, time) => sum + time.loadComplete, 0);
    return Math.round(total / this.metrics.loadTimes.length);
  }

  /**
   * Gera recomendações de otimização
   */
  generateRecommendations() {
    const recommendations = [];
    const memory = this.analyzeMemoryUsage();

    // Recomendações baseadas em memória
    if (memory && memory.usage > 70) {
      recommendations.push({
        type: 'memory',
        priority: 'high',
        message: 'Uso de memória alto. Considere implementar mais lazy loading.'
      });
    }

    // Recomendações baseadas em chunks
    if (this.metrics.lazyLoadedChunks.size < 3) {
      recommendations.push({
        type: 'chunking',
        priority: 'medium',
        message: 'Poucos chunks lazy carregados. Considere dividir mais componentes.'
      });
    }

    // Recomendações baseadas em tempo de carregamento
    const avgLoadTime = this.calculateAverageLoadTime();
    if (avgLoadTime > 3000) {
      recommendations.push({
        type: 'performance',
        priority: 'high',
        message: 'Tempo de carregamento alto. Otimize componentes críticos.'
      });
    }

    return recommendations;
  }

  /**
   * Limpa os dados coletados
   */
  clearMetrics() {
    this.metrics = {
      loadTimes: [],
      bundleSizes: new Map(),
      lazyLoadedChunks: new Set(),
      memoryUsage: []
    };
  }
}

// ===== INSTÂNCIA GLOBAL =====
export const bundleAnalyzer = new BundleAnalyzer();

// ===== HOOK PARA REACT =====
export const useBundleAnalyzer = () => {
  const startMonitoring = () => bundleAnalyzer.startPerformanceMonitoring();
  const registerChunk = (name, size) => bundleAnalyzer.registerLazyChunk(name, size);
  const getReport = () => bundleAnalyzer.generateReport();
  const getMemoryUsage = () => bundleAnalyzer.analyzeMemoryUsage();

  return {
    startMonitoring,
    registerChunk,
    getReport,
    getMemoryUsage,
    analyzer: bundleAnalyzer
  };
};

// ===== AUTO-INÍCIO EM DESENVOLVIMENTO =====
if (import.meta.env.DEV) {
  bundleAnalyzer.startPerformanceMonitoring();
  console.log('🔍 Bundle Analyzer iniciado em modo desenvolvimento');
}