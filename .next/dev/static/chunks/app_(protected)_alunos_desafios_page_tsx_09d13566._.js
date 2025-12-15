(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/(protected)/alunos/desafios/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DesafiosPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function DesafiosPage() {
    _s();
    const [filtro, setFiltro] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('ativos');
    // Mock data
    const desafios = [
        {
            id: '1',
            titulo: 'Domínio do Koto: Sakura Perfect',
            descricao: 'Toque Sakura Sakura no koto sem erros com 95% de precisão',
            dificuldade: 'medio',
            pontos: 200,
            prazo: '2025-12-31',
            status: 'ativo',
            participantes: 24,
            categoria: 'Koto',
            isJapones: true
        },
        {
            id: '2',
            titulo: 'Mestre do Shamisen',
            descricao: 'Complete 3 músicas tradicionais no shamisen',
            dificuldade: 'dificil',
            pontos: 300,
            prazo: '2025-12-25',
            status: 'ativo',
            participantes: 12,
            categoria: 'Shamisen',
            isJapones: true
        },
        {
            id: '3',
            titulo: 'Primeira Performance Pública',
            descricao: 'Grave e envie sua primeira apresentação musical completa',
            dificuldade: 'facil',
            pontos: 100,
            prazo: '2025-12-20',
            status: 'concluido',
            participantes: 45,
            categoria: 'Performance',
            isJapones: false
        },
        {
            id: '4',
            titulo: 'Respiração Zen: Shakuhachi',
            descricao: 'Domine a técnica de respiração e toque 2 músicas completas',
            dificuldade: 'dificil',
            pontos: 350,
            prazo: '2026-01-15',
            status: 'ativo',
            participantes: 8,
            categoria: 'Shakuhachi',
            isJapones: true
        },
        {
            id: '5',
            titulo: 'Teoria Musical Japonesa',
            descricao: 'Complete o quiz de escalas pentatônicas japonesas com 100%',
            dificuldade: 'medio',
            pontos: 150,
            prazo: '2025-12-28',
            status: 'ativo',
            participantes: 32,
            categoria: 'Teoria',
            isJapones: true
        },
        {
            id: '6',
            titulo: 'Sequência de Ouro',
            descricao: 'Pratique por 7 dias consecutivos sem faltar',
            dificuldade: 'facil',
            pontos: 80,
            prazo: '2025-12-22',
            status: 'concluido',
            participantes: 56,
            categoria: 'Dedicação',
            isJapones: false
        }
    ];
    const desafiosAtivos = desafios.filter((d)=>d.status === 'ativo');
    const desafiosConcluidos = desafios.filter((d)=>d.status === 'concluido');
    const desafiosFiltrados = filtro === 'ativos' ? desafiosAtivos : filtro === 'concluidos' ? desafiosConcluidos : desafios;
    const stats = {
        submetidos: desafiosConcluidos.length,
        aprovados: desafiosConcluidos.length,
        pontosGanhos: desafiosConcluidos.reduce((acc, d)=>acc + d.pontos, 0)
    };
    const getDificuldadeColor = (dif)=>{
        switch(dif){
            case 'facil':
                return {
                    bg: 'bg-green-500',
                    text: 'text-green-700',
                    badge: 'bg-green-100'
                };
            case 'medio':
                return {
                    bg: 'bg-yellow-500',
                    text: 'text-yellow-700',
                    badge: 'bg-yellow-100'
                };
            case 'dificil':
                return {
                    bg: 'bg-red-500',
                    text: 'text-red-700',
                    badge: 'bg-red-100'
                };
            default:
                return {
                    bg: 'bg-gray-500',
                    text: 'text-gray-700',
                    badge: 'bg-gray-100'
                };
        }
    };
    const getDificuldadeLabel = (dif)=>{
        switch(dif){
            case 'facil':
                return 'Fácil';
            case 'medio':
                return 'Médio';
            case 'dificil':
                return 'Difícil';
            default:
                return dif;
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
                        className: "absolute top-0 right-0 opacity-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                            size: 200
                        }, void 0, false, {
                            fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                            lineNumber: 140,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                        lineNumber: 139,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                            className: "w-6 h-6 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                            lineNumber: 145,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                        lineNumber: 144,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-100 font-bold tracking-widest text-sm uppercase",
                                        children: "挑戦 Challenges"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                lineNumber: 143,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl lg:text-5xl font-black mb-4",
                                children: "⚔️ Meus Desafios"
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                lineNumber: 149,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-100 text-lg md:text-xl max-w-3xl leading-relaxed mb-6",
                                children: "Aceite desafios musicais e prove sua dedicação. Cada vitória é uma conquista de honra."
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                lineNumber: 150,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/20 backdrop-blur-sm p-5 rounded-2xl border border-white/20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-3xl font-black mb-1",
                                                children: stats.submetidos
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                                lineNumber: 157,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-red-100 uppercase tracking-wider font-bold",
                                                children: "Submetidos"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                                lineNumber: 158,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/20 backdrop-blur-sm p-5 rounded-2xl border border-white/20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-3xl font-black mb-1",
                                                children: stats.aprovados
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                                lineNumber: 161,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-red-100 uppercase tracking-wider font-bold",
                                                children: "Aprovados"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                                lineNumber: 162,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                        lineNumber: 160,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/20 backdrop-blur-sm p-5 rounded-2xl border border-white/20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-3xl font-black mb-1",
                                                children: stats.pontosGanhos
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                                lineNumber: 165,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-red-100 uppercase tracking-wider font-bold",
                                                children: "XP Ganho"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                                lineNumber: 166,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                        lineNumber: 164,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                lineNumber: 155,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                        lineNumber: 142,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                lineNumber: 134,
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
                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                        lineNumber: 179,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFiltro('ativos'),
                        className: `px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${filtro === 'ativos' ? 'bg-orange-600 text-white shadow-orange-200 ring-4 ring-orange-100' : 'bg-white text-gray-600 border-2 border-gray-200'}`,
                        children: [
                            "🔥 Ativos (",
                            desafiosAtivos.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                        lineNumber: 181,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFiltro('todos'),
                        className: `px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${filtro === 'todos' ? 'bg-gray-800 text-white shadow-gray-200 ring-4 ring-gray-100' : 'bg-white text-gray-600 border-2 border-gray-200'}`,
                        children: [
                            "🎯 Todos (",
                            desafios.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                        lineNumber: 192,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFiltro('concluidos'),
                        className: `px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${filtro === 'concluidos' ? 'bg-green-600 text-white shadow-green-200 ring-4 ring-green-100' : 'bg-white text-gray-600 border-2 border-gray-200'}`,
                        children: [
                            "✅ Concluídos (",
                            desafiosConcluidos.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                        lineNumber: 203,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                lineNumber: 173,
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
                className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                children: desafiosFiltrados.map((desafio, idx)=>{
                    const difColors = getDificuldadeColor(desafio.dificuldade);
                    const isConcluido = desafio.status === 'concluido';
                    const isJapones = desafio.isJapones;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            scale: 0.95
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        transition: {
                            delay: idx * 0.05
                        },
                        className: `group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${isConcluido ? 'border-green-300 bg-green-50/30' : isJapones ? 'border-red-200 hover:border-red-400' : 'border-gray-200 hover:border-gray-300'} ${!isConcluido && 'hover:-translate-y-1'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `p-3 rounded-xl ${isConcluido ? 'bg-green-100 text-green-600' : isJapones ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`,
                                        children: isConcluido ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                            size: 28
                                        }, void 0, false, {
                                            fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                            lineNumber: 246,
                                            columnNumber: 52
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                            size: 28
                                        }, void 0, false, {
                                            fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                            lineNumber: 246,
                                            columnNumber: 81
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                        lineNumber: 241,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            isJapones && !isConcluido && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-2.5 py-1 bg-red-600 text-white rounded-full text-xs font-black",
                                                children: "🎌 JAPONÊS"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                                lineNumber: 251,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `px-2.5 py-1 rounded-full text-xs font-black uppercase ${difColors.badge} ${difColors.text}`,
                                                children: getDificuldadeLabel(desafio.dificuldade)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                                lineNumber: 255,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                        lineNumber: 249,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                lineNumber: 240,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors",
                                        children: desafio.titulo
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                        lineNumber: 263,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 text-sm leading-relaxed mb-3",
                                        children: desafio.descricao
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                        lineNumber: 266,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-xs text-gray-500 mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-2.5 py-1 bg-gray-100 rounded-full font-bold",
                                                children: [
                                                    "📂 ",
                                                    desafio.categoria
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                                lineNumber: 271,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-2.5 py-1 bg-gray-100 rounded-full font-bold",
                                                children: [
                                                    "👥 ",
                                                    desafio.participantes,
                                                    " participantes"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                                lineNumber: 274,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                        lineNumber: 270,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                lineNumber: 262,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between pt-4 border-t border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5 text-gray-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: new Date(desafio.prazo).toLocaleDateString('pt-BR')
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                                        lineNumber: 285,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                                lineNumber: 283,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5 font-black text-yellow-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                        size: 16,
                                                        fill: "currentColor"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                                        lineNumber: 288,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "+",
                                                            desafio.pontos,
                                                            " XP"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                                        lineNumber: 289,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                                lineNumber: 287,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                        lineNumber: 282,
                                        columnNumber: 33
                                    }, this),
                                    !isConcluido && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 shadow-md ${isJapones ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-orange-600 text-white hover:bg-orange-700'}`,
                                        children: "Aceitar Desafio"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                        lineNumber: 294,
                                        columnNumber: 37
                                    }, this),
                                    isConcluido && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-6 py-2.5 bg-green-100 text-green-700 rounded-xl font-black text-sm flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                                lineNumber: 305,
                                                columnNumber: 41
                                            }, this),
                                            "Concluído"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                        lineNumber: 304,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                                lineNumber: 281,
                                columnNumber: 29
                            }, this)
                        ]
                    }, desafio.id, true, {
                        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                        lineNumber: 228,
                        columnNumber: 25
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
                lineNumber: 216,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(protected)/alunos/desafios/page.tsx",
        lineNumber: 132,
        columnNumber: 9
    }, this);
}
_s(DesafiosPage, "T4AEh/Tc1Z2EiLJ7TJQLgKkJA6I=");
_c = DesafiosPage;
var _c;
__turbopack_context__.k.register(_c, "DesafiosPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_%28protected%29_alunos_desafios_page_tsx_09d13566._.js.map