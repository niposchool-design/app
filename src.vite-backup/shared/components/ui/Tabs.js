import { jsx as _jsx } from "react/jsx-runtime";
/**
 * 📋 TABS COMPONENT - NIPO SCHOOL
 *
 * Sistema de abas com design japonês
 */
import { createContext, useContext, useState } from 'react';
import { cn } from '../../lib/utils';
const TabsContext = createContext(undefined);
const useTabs = () => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('useTabs deve ser usado dentro de um Tabs');
    }
    return context;
};
export function Tabs({ defaultValue, value, onValueChange, className, children }) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const activeTab = value ?? internalValue;
    const setActiveTab = (newValue) => {
        if (!value) {
            setInternalValue(newValue);
        }
        onValueChange?.(newValue);
    };
    return (_jsx(TabsContext.Provider, { value: { activeTab, setActiveTab }, children: _jsx("div", { className: cn('w-full', className), children: children }) }));
}
export function TabsList({ className, children }) {
    return (_jsx("div", { className: cn('inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-500', className), children: children }));
}
export function TabsTrigger({ value, className, children, disabled = false }) {
    const { activeTab, setActiveTab } = useTabs();
    const isActive = activeTab === value;
    return (_jsx("button", { className: cn('inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2', 'disabled:pointer-events-none disabled:opacity-50', isActive
            ? 'bg-white text-purple-900 shadow-sm border border-purple-200'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', className), onClick: () => !disabled && setActiveTab(value), disabled: disabled, children: children }));
}
export function TabsContent({ value, className, children }) {
    const { activeTab } = useTabs();
    if (activeTab !== value) {
        return null;
    }
    return (_jsx("div", { className: cn('mt-4 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2', className), children: children }));
}
// Tabs especializadas para diferentes contextos
// Tabs do Professor
export function ProfessorTabs({ className, ...props }) {
    return (_jsx(Tabs, { ...props, className: cn('professor-tabs', className) }));
}
// Tabs do Aluno
export function StudentTabs({ className, ...props }) {
    return (_jsx(Tabs, { ...props, className: cn('student-tabs', className) }));
}
// Tabs Admin
export function AdminTabs({ className, ...props }) {
    return (_jsx(Tabs, { ...props, className: cn('admin-tabs', className) }));
}
// Lista com estilo japonês
export function ZenTabsList({ className, children }) {
    return (_jsx("div", { className: cn('inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-1.5', 'border border-purple-100 shadow-sm', className), children: children }));
}
// Trigger com estilo zen
export function ZenTabsTrigger({ className, ...props }) {
    const { activeTab } = useTabs();
    const isActive = activeTab === props.value;
    return (_jsx(TabsTrigger, { ...props, className: cn('rounded-lg transition-all duration-300', isActive
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
            : 'text-purple-700 hover:bg-white/50 hover:text-purple-900', className) }));
}
export default Tabs;
