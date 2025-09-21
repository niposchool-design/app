// 🌸 Sistema Oriental Avançado - Componentes Complementares
// Expansão do sistema oriental para formulários, modais e tabelas

import React, { useState } from 'react';
import { X, Search, Filter, ChevronLeft, ChevronRight, Home, FileText } from 'lucide-react';

// ====================================
// ORIENTAL FORM - Formulários Unificados
// ====================================

export const OrientalForm = ({ 
  children, 
  onSubmit, 
  title, 
  subtitle, 
  level = "teacher",
  className = "",
  loading = false 
}) => {
  const levelStyles = {
    student: {
      container: "bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 border-orange-100",
      header: "from-orange-400 to-red-400",
      button: "from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
    },
    teacher: {
      container: "bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 border-orange-200", 
      header: "from-orange-500 to-red-500",
      button: "from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
    },
    admin: {
      container: "bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 border-orange-300",
      header: "from-red-600 to-pink-600", 
      button: "from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
    }
  };

  const styles = levelStyles[level];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <form 
          onSubmit={onSubmit}
          className={`
            bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 ${styles.container}
            p-8 ${className}
          `}
        >
          {/* Cabeçalho Oriental */}
          {(title || subtitle) && (
            <div className="mb-8 text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${styles.header} flex items-center justify-center shadow-lg`}>
                <span className="text-white text-2xl font-bold">
                  {level === 'student' && '学'}
                  {level === 'teacher' && '先'} 
                  {level === 'admin' && '師'}
                </span>
              </div>
              {title && (
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
              )}
              {subtitle && (
                <p className="text-gray-600">{subtitle}</p>
              )}
            </div>
          )}

          {/* Conteúdo do Formulário */}
          <div className="space-y-6">
            {children}
          </div>

          {/* Elementos Flutuantes Orientais */}
          <div className="fixed top-20 left-8 text-orange-200 text-xl animate-bounce opacity-30 pointer-events-none">
            🌸
          </div>
          <div className="fixed top-32 right-12 text-red-200 text-lg animate-bounce opacity-20 pointer-events-none" style={{animationDelay: '1s'}}>
            ✨
          </div>
        </form>
      </div>
    </div>
  );
};

// ====================================
// ORIENTAL INPUT - Campos de Input
// ====================================

export const OrientalInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  level = "teacher",
  icon: Icon,
  ...props
}) => {
  const levelStyles = {
    student: "focus:border-orange-400 focus:ring-orange-300",
    teacher: "focus:border-red-400 focus:ring-red-300", 
    admin: "focus:border-pink-400 focus:ring-pink-300"
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 ${Icon ? 'pl-10' : ''} 
            border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-2 ${levelStyles[level]}
            bg-white/80 backdrop-blur-sm transition-all duration-200
            placeholder:text-gray-400
            ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-300' : ''}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
};

// ====================================
// ORIENTAL BUTTON - Botões Unificados
// ====================================

export const OrientalFormButton = ({
  children,
  type = "button",
  variant = "primary",
  level = "teacher",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const levelStyles = {
    student: {
      primary: "from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
      secondary: "from-orange-100 to-red-100 text-orange-700 hover:from-orange-200 hover:to-red-200"
    },
    teacher: {
      primary: "from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600",
      secondary: "from-red-100 to-pink-100 text-red-700 hover:from-red-200 hover:to-pink-200"
    },
    admin: {
      primary: "from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600", 
      secondary: "from-pink-100 to-orange-100 text-pink-700 hover:from-pink-200 hover:to-orange-200"
    }
  };

  const baseStyles = "px-6 py-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantStyles = variant === 'primary' 
    ? `bg-gradient-to-r ${levelStyles[level][variant]} text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5`
    : `bg-gradient-to-r ${levelStyles[level][variant]} border border-current hover:shadow-md`;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
          Processando...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

// ====================================
// ORIENTAL MODAL - Modais Unificados
// ====================================

export const OrientalModal = ({
  isOpen,
  onClose,
  title,
  children,
  level = "teacher",
  size = "md",
  showCloseButton = true
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const levelStyles = {
    student: "from-orange-400 to-red-400",
    teacher: "from-red-500 to-pink-500",
    admin: "from-pink-600 to-orange-600"
  };

  const sizeStyles = {
    sm: "max-w-md",
    md: "max-w-2xl", 
    lg: "max-w-4xl",
    xl: "max-w-6xl"
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black/50 backdrop-blur-sm
        ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}
      `}
      onClick={handleClose}
    >
      <div 
        className={`
          bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl 
          border border-orange-200 ${sizeStyles[size]} w-full
          max-h-[90vh] overflow-hidden
          ${isClosing ? 'animate-scale-out' : 'animate-scale-in'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className={`px-6 py-4 bg-gradient-to-r ${levelStyles[level]} text-white rounded-t-2xl`}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{title}</h3>
            {showCloseButton && (
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// ====================================
// ORIENTAL TABLE - Tabelas Unificadas
// ====================================

export const OrientalTable = ({
  columns,
  data,
  level = "teacher",
  searchable = true,
  filterable = true,
  pagination = true,
  itemsPerPage = 10
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const levelStyles = {
    student: {
      header: "from-orange-400 to-red-400",
      row: "hover:bg-orange-50"
    },
    teacher: {
      header: "from-red-500 to-pink-500", 
      row: "hover:bg-red-50"
    },
    admin: {
      header: "from-pink-600 to-orange-600",
      row: "hover:bg-pink-50"
    }
  };

  // Filtrar dados
  const filteredData = data.filter(item =>
    Object.values(item).some(value => 
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Ordenar dados
  const sortedData = React.useMemo(() => {
    if (sortConfig.key) {
      return [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredData;
  }, [filteredData, sortConfig]);

  // Paginação
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 overflow-hidden">
      {/* Controles */}
      {(searchable || filterable) && (
        <div className="p-4 border-b border-orange-100 flex items-center justify-between">
          {searchable && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
          )}
          
          {filterable && (
            <button className="ml-4 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`bg-gradient-to-r ${levelStyles[level].header} text-white`}>
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index}
                  className="px-6 py-4 text-left font-medium cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    {column.sortable && sortConfig.key === column.key && (
                      <span className="text-sm">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} className={`${levelStyles[level].row} transition-colors`}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 text-sm text-gray-900">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {pagination && totalPages > 1 && (
        <div className="px-6 py-4 border-t border-orange-100 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, sortedData.length)} de {sortedData.length} resultados
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <span className="px-4 py-2 text-sm font-medium">
              {currentPage} / {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ====================================
// ORIENTAL BREADCRUMB - Navegação Contextual
// ====================================

export const OrientalBreadcrumb = ({ 
  items, 
  level = "teacher",
  className = ""
}) => {
  const levelStyles = {
    student: "text-orange-600 hover:text-orange-700",
    teacher: "text-red-600 hover:text-red-700", 
    admin: "text-pink-600 hover:text-pink-700"
  };

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`}>
      <Home className="w-4 h-4 text-gray-400" />
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.href ? (
            <a 
              href={item.href}
              className={`${levelStyles[level]} font-medium transition-colors`}
            >
              {item.label}
            </a>
          ) : (
            <span className="text-gray-600 font-medium">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// ====================================
// ORIENTAL PAGE - Layout de Página Completo
// ====================================

export const OrientalPage = ({
  children,
  title,
  subtitle,
  breadcrumbs,
  level = "teacher",
  actions,
  className = ""
}) => {
  const levelStyles = {
    student: "from-orange-400 to-red-400",
    teacher: "from-red-500 to-pink-500",
    admin: "from-pink-600 to-orange-600"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Cabeçalho da Página */}
      <div className={`bg-gradient-to-r ${levelStyles[level]} text-white shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {breadcrumbs && (
            <div className="mb-4">
              <OrientalBreadcrumb items={breadcrumbs} level={level} className="text-white/80" />
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              {subtitle && (
                <p className="mt-2 text-white/80">{subtitle}</p>
              )}
            </div>
            
            {actions && (
              <div className="flex items-center space-x-3">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
        {children}
      </div>

      {/* Elementos Flutuantes Orientais */}
      <div className="fixed top-1/4 left-4 text-orange-200 text-2xl animate-bounce opacity-30 pointer-events-none">
        🌸
      </div>
      <div className="fixed top-1/3 right-8 text-red-200 text-xl animate-bounce opacity-30 pointer-events-none" style={{animationDelay: '1s'}}>
        ✨
      </div>
      <div className="fixed bottom-1/3 left-8 text-pink-200 text-lg animate-bounce opacity-30 pointer-events-none" style={{animationDelay: '2s'}}>
        🎌
      </div>
    </div>
  );
};

// Animações CSS adicionais (adicionar ao CSS global)
const orientalAnimations = `
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes scale-out {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.9); }
}

.animate-fade-in { animation: fade-in 0.2s ease-out; }
.animate-fade-out { animation: fade-out 0.2s ease-out; }
.animate-scale-in { animation: scale-in 0.2s ease-out; }
.animate-scale-out { animation: scale-out 0.2s ease-out; }
`;