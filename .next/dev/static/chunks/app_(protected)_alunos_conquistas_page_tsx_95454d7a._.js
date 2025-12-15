(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/(protected)/alunos/conquistas/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConquistasPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ConquistasPage() {
    _s();
    const [filtro, setFiltro] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('todas');
    // Mock data
    const conquistas = [
        {
            id: '1',
            titulo: 'Primeira Nota no Koto',
            descricao: 'Toque sua primeira nota no koto tradicional',
            icone: '🎵',
            raridade: 'comum',
            pontos: 50,
            desbloqueada: true,
            data_desbloqueio: '2025-01-10'
        },
        {
            id: '2',
            titulo: 'Sakura Dominada',
            descricao: 'Complete a música Sakura Sakura perfeitamente',
            icone: '🌸',
            raridade: 'raro',
            pontos: 150,
            desbloqueada: true,
            data_desbloqueio: '2025-01-15'
        },
        {
            id: '3',
            titulo: 'Mestre do Shamisen',
            descricao: 'Domine 10 músicas no shamisen',
            icone: '🎸',
            raridade: 'epico',
            pontos: 300,
            desbloqueada: false,
            progresso: 6,
            meta: 10
        },
        {
            id: '4',
            titulo: 'Sopro Zen',
            descricao: 'Complete 5 músicas no shakuhachi',
            icone: '🎋',
            raridade: 'epico',
            pontos: 250,
            desbloqueada: false,
            progresso: 2,
            meta: 5
        },
        {
            id: '5',
            titulo: 'Lenda Viva',
            descricao: 'Alcance nível 10 em todos os instrumentos japoneses',
            icone: '👑',
            raridade: 'lendario',
            pontos: 1000,
            desbloqueada: false,
            progresso: 0,
            meta: 3
        },
        {
            id: '6',
            titulo: 'Sequência Imbatível',
            descricao: 'Pratique por 30 dias consecutivos',
            icone: '🔥',
            raridade: 'raro',
            pontos: 200,
            desbloqueada: false,
            progresso: 12,
            meta: 30
        },
        {
            id: '7',
            titulo: 'Teoria Musical',
            descricao: 'Complete o curso de teoria musical japonesa',
            icone: '📚',
            raridade: 'comum',
            pontos: 100,
            desbloqueada: true,
            data_desbloqueio: '2025-01-05'
        },
        {
            id: '8',
            titulo: 'Performer',
            descricao: 'Apresente no show final',
            icone: '🎭',
            raridade: 'epico',
            pontos: 500,
            desbloqueada: false
        }
    ];
    const conquistasDesbloqueadas = conquistas.filter((c)=>c.desbloqueada);
    const conquistasBloqueadas = conquistas.filter((c)=>!c.desbloqueada);
    const conquistasFiltradas = filtro === 'desbloqueadas' ? conquistasDesbloqueadas : filtro === 'bloqueadas' ? conquistasBloqueadas : conquistas;
    const totalPontos = conquistasDesbloqueadas.reduce((acc, c)=>acc + c.pontos, 0);
    const progressoGeral = Math.round(conquistasDesbloqueadas.length / conquistas.length * 100);
    const getRaridadeColors = (raridade)=>{
        switch(raridade){
            case 'comum':
                return {
                    bg: 'from-slate-400 to-slate-500',
                    border: 'border-slate-300',
                    badge: 'bg-slate-200 text-slate-800'
                };
            case 'raro':
                return {
                    bg: 'from-blue-400 to-blue-600',
                    border: 'border-blue-300',
                    badge: 'bg-blue-200 text-blue-900'
                };
            case 'epico':
                return {
                    bg: 'from-purple-400 to-purple-600',
                    border: 'border-purple-300',
                    badge: 'bg-purple-200 text-purple-900'
                };
            case 'lendario':
                return {
                    bg: 'from-amber-400 to-orange-600',
                    border: 'border-amber-300',
                    badge: 'bg-gradient-to-r from-amber-200 to-orange-200 text-amber-900'
                };
            default:
                return {
                    bg: 'from-gray-400 to-gray-500',
                    border: 'border-gray-300',
                    badge: 'bg-gray-200 text-gray-800'
                };
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: -20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                className: "bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                        lineNumber: 64,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-lg",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                                            className: "w-6 h-6 text-white"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                                            lineNumber: 71,
                                                            columnNumber: 37
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                                        lineNumber: 70,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-100 font-bold tracking-widest text-sm uppercase",
                                                        children: "業績 Achievements"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                                        lineNumber: 73,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                                lineNumber: 69,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-4xl lg:text-5xl font-black mb-4",
                                                children: "🏆 Minhas Conquistas"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                                lineNumber: 75,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-100 text-lg md:text-xl max-w-2xl leading-relaxed",
                                                children: "Sua jornada de honra e dedicação registrada em cada medalha."
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                                lineNumber: 76,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                        lineNumber: 68,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-black/20 backdrop-blur-sm p-5 rounded-2xl border border-white/20 text-center min-w-[130px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-4xl font-black text-yellow-300",
                                                        children: totalPontos
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                                        lineNumber: 83,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-red-100 uppercase tracking-wider font-bold mt-1",
                                                        children: "Pontos de Honra"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                                        lineNumber: 84,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                                lineNumber: 82,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-black/20 backdrop-blur-sm p-5 rounded-2xl border border-white/20 text-center min-w-[130px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-4xl font-black text-white",
                                                        children: [
                                                            conquistasDesbloqueadas.length,
                                                            "/",
                                                            conquistas.length
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                                        lineNumber: 87,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-red-100 uppercase tracking-wider font-bold mt-1",
                                                        children: "Conquistas"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                                        lineNumber: 88,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                                lineNumber: 86,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                        lineNumber: 81,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                lineNumber: 67,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 bg-black/20 rounded-full h-4 overflow-hidden backdrop-blur-sm border border-white/20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        width: 0
                                    },
                                    animate: {
                                        width: `${progressoGeral}%`
                                    },
                                    transition: {
                                        duration: 1,
                                        ease: 'easeOut'
                                    },
                                    className: "h-full bg-gradient-to-r from-yellow-400 to-orange-500 relative",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-white/20 animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                        lineNumber: 101,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                    lineNumber: 95,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                lineNumber: 94,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between mt-2 text-xs text-red-100 font-bold",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Iniciado"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                        lineNumber: 105,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            progressoGeral,
                                            "% Completo"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                        lineNumber: 106,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Mestre"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                        lineNumber: 107,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                lineNumber: 104,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                        lineNumber: 66,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                lineNumber: 59,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    delay: 0.1
                },
                className: "flex flex-wrap gap-3 items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-gray-600 font-bold text-sm",
                        children: "Visualizar:"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                        lineNumber: 119,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFiltro('todas'),
                        className: `px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${filtro === 'todas' ? 'bg-gray-800 text-white shadow-gray-200 ring-4 ring-gray-100' : 'bg-white text-gray-600 border-2 border-gray-200'}`,
                        children: [
                            "🏅 Todas (",
                            conquistas.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                        lineNumber: 121,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFiltro('desbloqueadas'),
                        className: `px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${filtro === 'desbloqueadas' ? 'bg-green-600 text-white shadow-green-200 ring-4 ring-green-100' : 'bg-white text-gray-600 border-2 border-gray-200'}`,
                        children: [
                            "✅ Desbloqueadas (",
                            conquistasDesbloqueadas.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                        lineNumber: 132,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFiltro('bloqueadas'),
                        className: `px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${filtro === 'bloqueadas' ? 'bg-red-600 text-white shadow-red-200 ring-4 ring-red-100' : 'bg-white text-gray-600 border-2 border-gray-200'}`,
                        children: [
                            "🔒 Bloqueadas (",
                            conquistasBloqueadas.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                        lineNumber: 143,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                lineNumber: 113,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    delay: 0.2
                },
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
                children: conquistasFiltradas.map((conquista, idx)=>{
                    const colors = getRaridadeColors(conquista.raridade);
                    const progresso = conquista.progresso && conquista.meta ? conquista.progresso / conquista.meta * 100 : 0;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            scale: 0.9
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        transition: {
                            delay: idx * 0.05
                        },
                        className: `group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${colors.border} ${conquista.desbloqueada ? 'hover:-translate-y-2' : 'opacity-75'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-black uppercase ${colors.badge}`,
                                children: conquista.raridade
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                lineNumber: 177,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `relative w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-lg transform ${conquista.desbloqueada ? 'group-hover:scale-110 group-hover:rotate-6' : 'grayscale'} transition-all duration-300`,
                                children: [
                                    conquista.desbloqueada ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-5xl",
                                        children: conquista.icone
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                        lineNumber: 186,
                                        columnNumber: 37
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                        className: "w-12 h-12 text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                        lineNumber: 188,
                                        columnNumber: 37
                                    }, this),
                                    conquista.desbloqueada && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-md",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            className: "w-4 h-4 text-white",
                                            fill: "white"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                            lineNumber: 193,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                        lineNumber: 192,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                lineNumber: 182,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-black text-gray-900 mb-2 text-lg",
                                        children: conquista.desbloqueada ? conquista.titulo : '???'
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                        lineNumber: 200,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 text-sm mb-4 leading-relaxed",
                                        children: conquista.desbloqueada ? conquista.descricao : 'Conquista bloqueada. Continue praticando!'
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                        lineNumber: 203,
                                        columnNumber: 33
                                    }, this),
                                    !conquista.desbloqueada && conquista.progresso !== undefined && conquista.meta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-xs font-bold text-gray-600 mb-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Progresso"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                                        lineNumber: 211,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            conquista.progresso,
                                                            "/",
                                                            conquista.meta
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                                        lineNumber: 212,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                                lineNumber: 210,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-2 bg-gray-200 rounded-full overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `h-full bg-gradient-to-r ${colors.bg} rounded-full transition-all duration-500`,
                                                    style: {
                                                        width: `${progresso}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                                lineNumber: 214,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                        lineNumber: 209,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `inline-flex items-center gap-2 px-4 py-2 rounded-full font-black text-sm ${conquista.desbloqueada ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                className: "w-4 h-4",
                                                fill: "currentColor"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                                lineNumber: 227,
                                                columnNumber: 37
                                            }, this),
                                            "+",
                                            conquista.pontos,
                                            " XP"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                        lineNumber: 224,
                                        columnNumber: 33
                                    }, this),
                                    conquista.desbloqueada && conquista.data_desbloqueio && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-500 mt-3 font-medium",
                                        children: [
                                            "🎉 ",
                                            new Date(conquista.data_desbloqueio).toLocaleDateString('pt-BR')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                        lineNumber: 233,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                                lineNumber: 199,
                                columnNumber: 29
                            }, this)
                        ]
                    }, conquista.id, true, {
                        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                        lineNumber: 167,
                        columnNumber: 25
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
                lineNumber: 156,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(protected)/alunos/conquistas/page.tsx",
        lineNumber: 57,
        columnNumber: 9
    }, this);
}
_s(ConquistasPage, "KSfIpRFbPCrcB0RA4rUp3JGLFuY=");
_c = ConquistasPage;
var _c;
__turbopack_context__.k.register(_c, "ConquistasPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_%28protected%29_alunos_conquistas_page_tsx_95454d7a._.js.map