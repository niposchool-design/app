import React, { useState, useEffect } from 'react';
import { useBundleAnalyzer } from '@new/utils/bundle-analyzer';
import { runPerformanceTests } from '@new/tests/performance-tests';
import Button from '@new/components/ui/Button';

/**
 * Performance Dashboard - Monitoramento de performance em tempo real
 * Localização: src_new/pages/performance-dashboard.jsx
 * 
 * Dashboard para monitorar métricas de performance e executar testes
 * durante o desenvolvimento.
 */
const PerformanceDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const { getReport, getMemoryUsage, startMonitoring } = useBundleAnalyzer();

  useEffect(() => {
    startMonitoring();
    updateMetrics();
    
    // Atualizar métricas a cada 5 segundos
    const interval = setInterval(updateMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateMetrics = () => {
    const bundleReport = getReport();
    const memoryUsage = getMemoryUsage();
    
    setMetrics({
      bundle: bundleReport,
      memory: memoryUsage,
      timestamp: new Date().toLocaleTimeString()
    });
  };

  const handleRunTests = async () => {
    setIsRunningTests(true);
    try {
      const results = await runPerformanceTests();
      setTestResults(results);
    } catch (error) {
      console.error('Erro ao executar testes:', error);
    } finally {
      setIsRunningTests(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'passed': return 'text-green-600 bg-green-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getMetricColor = (value, threshold, isReverse = false) => {
    const condition = isReverse ? value < threshold : value > threshold;
    return condition ? 'text-red-600' : 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Performance Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Monitoramento de performance e testes de otimização - Fases 6 e 7
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Métricas em Tempo Real */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Métricas em Tempo Real</h2>
              <span className="text-sm text-gray-500">
                Atualizado: {metrics?.timestamp || '--:--:--'}
              </span>
            </div>

            {metrics ? (
              <div className="space-y-4">
                {/* Memória */}
                {metrics.memory && (
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Uso de Memória</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Usado:</span>
                        <span className={`ml-2 font-mono ${getMetricColor(metrics.memory.usage, 70)}`}>
                          {metrics.memory.usedMB}MB ({metrics.memory.usage}%)
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Limite:</span>
                        <span className="ml-2 font-mono text-gray-900">
                          {metrics.memory.limitMB}MB
                        </span>
                      </div>
                    </div>
                    
                    {/* Barra de progresso */}
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          metrics.memory.usage > 70 ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(metrics.memory.usage, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Bundle Info */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Bundle Metrics</h3>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lazy Chunks:</span>
                      <span className="font-mono text-blue-600">
                        {metrics.bundle?.metrics?.lazyChunksLoaded || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tempo Médio:</span>
                      <span className="font-mono text-gray-900">
                        {metrics.bundle?.metrics?.averageLoadTime || 0}ms
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recomendações */}
                {metrics.bundle?.metrics?.recommendations?.length > 0 && (
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Recomendações</h3>
                    <div className="space-y-2">
                      {metrics.bundle.metrics.recommendations.map((rec, index) => (
                        <div 
                          key={index}
                          className={`text-xs p-2 rounded ${
                            rec.priority === 'high' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
                          }`}
                        >
                          <span className="font-medium">{rec.type}:</span> {rec.message}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Coletando métricas...</span>
              </div>
            )}
          </div>

          {/* Testes de Performance */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Testes de Performance</h2>
              <Button
                onClick={handleRunTests}
                loading={isRunningTests}
                size="sm"
                variant="primary"
              >
                {isRunningTests ? 'Executando...' : 'Executar Testes'}
              </Button>
            </div>

            {testResults ? (
              <div className="space-y-4">
                {/* Resumo */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Resumo dos Testes</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Total:</span>
                      <span className="ml-2 font-mono">{testResults.length}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Aprovados:</span>
                      <span className="ml-2 font-mono text-green-600">
                        {testResults.filter(t => t.status === 'passed').length}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Falharam:</span>
                      <span className="ml-2 font-mono text-red-600">
                        {testResults.filter(t => t.status === 'failed').length}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Taxa de Sucesso:</span>
                      <span className="ml-2 font-mono text-blue-600">
                        {((testResults.filter(t => t.status === 'passed').length / testResults.length) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lista de Testes */}
                <div className="space-y-2">
                  {testResults.map((test, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{test.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                          {test.status}
                        </span>
                      </div>
                      
                      {test.details && (
                        <div className="mt-2 text-xs text-gray-600">
                          {Object.entries(test.details).map(([key, value], i) => (
                            <div key={i} className="flex justify-between">
                              <span>{key}:</span>
                              <span className="font-mono">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {test.error && (
                        <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                          {test.error}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Clique em "Executar Testes" para começar</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Informações das Fases */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Status das Fases 6 e 7</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">✅ Fase 6: Limpeza e Otimização</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Lazy loading implementado</li>
                <li>• React.memo aplicado aos componentes</li>
                <li>• Bundle analyzer configurado</li>
                <li>• Monitoramento de performance ativo</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">🔄 Fase 7: Performance e Testes</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Suite de testes de performance</li>
                <li>• Dashboard de monitoramento</li>
                <li>• Análise de memória e bundle</li>
                <li>• Relatórios automatizados</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;