module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/supabase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://eehidnwlwrzqzgytbfsd.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlaGlkbndsd3J6cXpneXRiZnNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyMzA1MjQsImV4cCI6MjA2MzgwNjUyNH0.SawTk_G0H8CYFEQ7h62Wsv35uNqZz0Q5rsLNT5wCcUM"), {
        cookies: {
            get (name) {
                return cookieStore.get(name)?.value;
            },
            set (name, value, options) {
                try {
                    cookieStore.set({
                        name,
                        value,
                        ...options
                    });
                } catch (error) {
                // Server Component context - set will be handled by middleware
                }
            },
            remove (name, options) {
                try {
                    cookieStore.set({
                        name,
                        value: '',
                        ...options
                    });
                } catch (error) {
                // Server Component context - remove will be handled by middleware
                }
            }
        }
    });
}
}),
"[project]/lib/supabase/queries/historia-completo.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCompositorCompleto",
    ()=>getCompositorCompleto,
    "getCompositoresByPeriodo",
    ()=>getCompositoresByPeriodo,
    "getCompositoresCompletos",
    ()=>getCompositoresCompletos,
    "getGenerosCompletos",
    ()=>getGenerosCompletos,
    "getHistoriaStats",
    ()=>getHistoriaStats,
    "getObraCompleta",
    ()=>getObraCompleta,
    "getObrasCompletas",
    ()=>getObrasCompletas,
    "getPeriodoCompleto",
    ()=>getPeriodoCompleto,
    "getPeriodosHistoria",
    ()=>getPeriodosHistoria,
    "getStatsByPais",
    ()=>getStatsByPais,
    "getStatsByPeriodo",
    ()=>getStatsByPeriodo,
    "getTimelineCompleta",
    ()=>getTimelineCompleta
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-route] (ecmascript)");
;
async function getPeriodosHistoria() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('historia_periodos').select('*').eq('ativo', true).order('periodo_inicio', {
        ascending: true
    });
    if (error) {
        console.error('Erro ao buscar períodos históricos:', error);
        return [];
    }
    return data || [];
}
async function getPeriodoCompleto(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const [periodo, compositores, obras] = await Promise.all([
        supabase.from('historia_periodos').select('*').eq('id', id).eq('ativo', true).single(),
        supabase.from('historia_compositores').select('*').eq('periodo_id', id).eq('ativo', true).order('nivel_importancia', {
            ascending: false
        }),
        supabase.from('historia_obras').select('*').eq('periodo_id', id).eq('ativo', true).order('ano_composicao', {
            ascending: true
        })
    ]);
    if (periodo.error) {
        console.error('Erro ao buscar período:', periodo.error);
        return null;
    }
    return {
        ...periodo.data,
        compositores: compositores.data || [],
        obras: obras.data || []
    };
}
async function getCompositoresCompletos() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: compositores, error } = await supabase.from('historia_compositores').select(`
      *,
      periodo:historia_periodos(nome, periodo_inicio, periodo_fim)
    `).eq('ativo', true).order('data_nascimento', {
        ascending: true
    });
    if (error) {
        console.error('Erro ao buscar compositores:', error);
        return [];
    }
    // Buscar obras de cada compositor
    const compositoresComObras = await Promise.all((compositores || []).map(async (compositor)=>{
        const { data: obras } = await supabase.from('historia_obras').select('id, titulo, ano_composicao, tipo_obra, audio_url').eq('compositor_id', compositor.id).eq('ativo', true).order('ano_composicao', {
            ascending: true
        }).limit(5);
        return {
            ...compositor,
            obras: obras || []
        };
    }));
    return compositoresComObras;
}
async function getCompositoresByPeriodo(periodoId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('historia_compositores').select('*').eq('periodo_id', periodoId).eq('ativo', true).order('nivel_importancia', {
        ascending: false
    });
    if (error) {
        console.error('Erro ao buscar compositores:', error);
        return [];
    }
    return data || [];
}
async function getCompositorCompleto(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const [compositor, obras] = await Promise.all([
        supabase.from('historia_compositores').select(`
      *,
      periodo:historia_periodos(*)
    `).eq('id', id).eq('ativo', true).single(),
        supabase.from('historia_obras').select('*').eq('compositor_id', id).eq('ativo', true).order('ano_composicao', {
            ascending: true
        })
    ]);
    if (compositor.error) {
        console.error('Erro ao buscar compositor:', compositor.error);
        return null;
    }
    return {
        ...compositor.data,
        obras: obras.data || []
    };
}
async function getObrasCompletas() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('historia_obras').select(`
      *,
      compositor:historia_compositores(nome_completo, nome_artistico, pais_nascimento),
      periodo:historia_periodos(nome, cor_tematica)
    `).eq('ativo', true).order('ano_composicao', {
        ascending: true
    });
    if (error) {
        console.error('Erro ao buscar obras:', error);
        return [];
    }
    return data || [];
}
async function getObraCompleta(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('historia_obras').select(`
      *,
      compositor:historia_compositores(*),
      periodo:historia_periodos(*)
    `).eq('id', id).eq('ativo', true).single();
    if (error) {
        console.error('Erro ao buscar obra:', error);
        return null;
    }
    return data;
}
async function getGenerosCompletos() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('historia_generos').select(`
      *,
      periodo:historia_periodos(nome, periodo_inicio, periodo_fim)
    `).eq('ativo', true).order('nome', {
        ascending: true
    });
    if (error) {
        console.error('Erro ao buscar gêneros:', error);
        return [];
    }
    return data || [];
}
async function getTimelineCompleta() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    // Buscar períodos com compositores e obras
    const { data: periodos, error } = await supabase.from('historia_periodos').select('*').eq('ativo', true).order('periodo_inicio', {
        ascending: true
    });
    if (error) {
        console.error('Erro ao buscar timeline:', error);
        return [];
    }
    // Para cada período, buscar compositores e obras
    const timelineCompleta = await Promise.all((periodos || []).map(async (periodo)=>{
        const [compositores, obras] = await Promise.all([
            supabase.from('historia_compositores').select('id, nome_completo, nome_artistico, data_nascimento, data_falecimento, pais_nascimento, foto_url, nivel_importancia').eq('periodo_id', periodo.id).eq('ativo', true).order('nivel_importancia', {
                ascending: false
            }).limit(10),
            supabase.from('historia_obras').select('id, titulo, ano_composicao, compositor_id, tipo_obra, audio_url').eq('periodo_id', periodo.id).eq('ativo', true).order('ano_composicao', {
                ascending: true
            }).limit(10)
        ]);
        return {
            ...periodo,
            compositores: compositores.data || [],
            obras: obras.data || [],
            total_compositores: compositores.data?.length || 0,
            total_obras: obras.data?.length || 0
        };
    }));
    return timelineCompleta;
}
async function getHistoriaStats() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const [periodos, compositores, obras, generos] = await Promise.all([
        supabase.from('historia_periodos').select('id', {
            count: 'exact',
            head: true
        }),
        supabase.from('historia_compositores').select('id', {
            count: 'exact',
            head: true
        }),
        supabase.from('historia_obras').select('id', {
            count: 'exact',
            head: true
        }),
        supabase.from('historia_generos').select('id', {
            count: 'exact',
            head: true
        })
    ]);
    return {
        totalPeriodos: periodos.count || 0,
        totalCompositores: compositores.count || 0,
        totalObras: obras.count || 0,
        totalGeneros: generos.count || 0
    };
}
async function getStatsByPais() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('historia_compositores').select('pais_nascimento').eq('ativo', true);
    if (error) {
        console.error('Erro ao buscar stats por país:', error);
        return [];
    }
    // Contar compositores por país
    const paisesCount = (data || []).reduce((acc, comp)=>{
        const pais = comp.pais_nascimento || 'Desconhecido';
        acc[pais] = (acc[pais] || 0) + 1;
        return acc;
    }, {});
    return Object.entries(paisesCount).map(([pais, count])=>({
            pais,
            count
        })).sort((a, b)=>b.count - a.count);
}
async function getStatsByPeriodo() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: periodos, error } = await supabase.from('historia_periodos').select('id, nome').eq('ativo', true);
    if (error) {
        console.error('Erro ao buscar períodos:', error);
        return [];
    }
    // Para cada período, contar compositores e obras
    const statsPromises = (periodos || []).map(async (periodo)=>{
        const [compositores, obras] = await Promise.all([
            supabase.from('historia_compositores').select('id', {
                count: 'exact',
                head: true
            }).eq('periodo_id', periodo.id).eq('ativo', true),
            supabase.from('historia_obras').select('id', {
                count: 'exact',
                head: true
            }).eq('periodo_id', periodo.id).eq('ativo', true)
        ]);
        return {
            periodo: periodo.nome,
            compositores: compositores.count || 0,
            obras: obras.count || 0
        };
    });
    const stats = await Promise.all(statsPromises);
    return stats.filter((s)=>s.compositores > 0 || s.obras > 0);
}
}),
"[project]/app/api/historia/timeline/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$queries$2f$historia$2d$completo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/queries/historia-completo.ts [app-route] (ecmascript)");
;
;
const dynamic = 'force-dynamic';
async function GET() {
    try {
        const [timeline, stats] = await Promise.all([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$queries$2f$historia$2d$completo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTimelineCompleta"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$queries$2f$historia$2d$completo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHistoriaStats"])()
        ]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            timeline,
            stats
        });
    } catch (error) {
        console.error('Erro ao carregar timeline:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Erro ao carregar dados da timeline'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__91b62b61._.js.map