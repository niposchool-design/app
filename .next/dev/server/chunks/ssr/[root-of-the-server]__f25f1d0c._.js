module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/(protected)/admin/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/(protected)/admin/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/lib/supabase/server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://eehidnwlwrzqzgytbfsd.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlaGlkbndsd3J6cXpneXRiZnNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyMzA1MjQsImV4cCI6MjA2MzgwNjUyNH0.SawTk_G0H8CYFEQ7h62Wsv35uNqZz0Q5rsLNT5wCcUM"), {
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
"[project]/src/lib/supabase/queries/aulas.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAulaPorNumero",
    ()=>getAulaPorNumero,
    "getAulasShowFinal",
    ()=>getAulasShowFinal,
    "getEstatisticasProgresso",
    ()=>getEstatisticasProgresso,
    "getMateriaisAula",
    ()=>getMateriaisAula,
    "getProgressoAula",
    ()=>getProgressoAula,
    "getProgressoGeralAluno",
    ()=>getProgressoGeralAluno,
    "getTodasAulas",
    ()=>getTodasAulas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-rsc] (ecmascript)");
;
async function getTodasAulas(filtros) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    let query = supabase.from('aulas').select(`
      id,
      numero,
      titulo,
      data_programada,
      objetivo_didatico,
      resumo_atividades,
      desafio_alpha,
      nivel,
      formato,
      status,
      modulo_id,
      responsavel_id,
      detalhes_aula
    `).order('numero', {
        ascending: true
    });
    if (filtros?.status) {
        query = query.eq('status', filtros.status);
    }
    if (filtros?.formato) {
        query = query.eq('formato', filtros.formato);
    }
    if (filtros?.modulo) {
        query = query.eq('modulo_id', filtros.modulo);
    }
    if (filtros?.data_inicio) {
        query = query.gte('data_programada', filtros.data_inicio);
    }
    if (filtros?.data_fim) {
        query = query.lte('data_programada', filtros.data_fim);
    }
    if (filtros?.search) {
        query = query.or(`titulo.ilike.%${filtros.search}%,objetivo_didatico.ilike.%${filtros.search}%`);
    }
    const { data, error } = await query;
    if (error) {
        console.error('Erro ao buscar todas as aulas:', error);
        return [];
    }
    return data;
}
async function getAulaPorNumero(numero) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: aula, error: aulaError } = await supabase.from('aulas').select(`
      id,
      numero,
      titulo,
      data_programada,
      objetivo_didatico,
      resumo_atividades,
      desafio_alpha,
      nivel,
      formato,
      status,
      modulo_id,
      responsavel_id,
      detalhes_aula
    `).eq('numero', numero).single();
    if (aulaError || !aula) {
        console.error('Erro ao buscar aula:', aulaError);
        return null;
    }
    // Buscar materiais da aula
    const { data: materiais } = await supabase.from('aula_materiais').select('*').eq('aula_id', aula.id).order('ordem', {
        ascending: true
    });
    // Buscar pré-requisitos
    const { data: preRequisitos } = await supabase.from('aula_pre_requisitos').select('*').eq('aula_id', aula.id);
    // Buscar feedbacks
    const { data: feedbacks } = await supabase.from('aula_feedbacks').select('*').eq('aula_id', aula.id).order('data_feedback', {
        ascending: false
    });
    // Buscar registros
    const { data: registros } = await supabase.from('aula_registros').select('*').eq('aula_id', aula.id).order('data_registro', {
        ascending: false
    });
    // Buscar checklist
    const { data: checklist } = await supabase.from('aula_checklist').select('*').eq('aula_id', aula.id).order('ordem', {
        ascending: true
    });
    return {
        ...aula,
        materiais: materiais || [],
        pre_requisitos: preRequisitos || [],
        feedbacks: feedbacks || [],
        registros: registros || [],
        checklist: checklist || []
    };
}
async function getProgressoAula(alunoId, aulaId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('aluno_progresso_aula').select('*').eq('aluno_id', alunoId).eq('aula_id', aulaId).single();
    if (error) {
        return null;
    }
    return data;
}
async function getProgressoGeralAluno(alunoId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('aluno_progresso_aula').select(`
      *,
      aulas (
        numero,
        titulo,
        data_programada
      )
    `).eq('aluno_id', alunoId);
    if (error) {
        // Tabela de progresso ainda não implementada, retornar array vazio
        // Verifica se é erro de tabela não existente (objeto vazio {} ou código PGRST)
        const errorStr = JSON.stringify(error);
        const isTableNotFound = errorStr === '{}' || error.code === 'PGRST116' || error.code === '42P01' || error.message?.includes('does not exist') || error.message?.includes('relation') && error.message?.includes('does not exist');
        if (isTableNotFound) {
            console.log('Tabela aluno_progresso_aula não existe ainda. Retornando array vazio.');
            return [];
        }
        console.error('Erro ao buscar progresso geral:', error);
        return [];
    }
    return data;
}
async function getEstatisticasProgresso(alunoId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    // Buscar todas as aulas
    const { count: totalAulas, error: errorTotal } = await supabase.from('aulas').select('id', {
        count: 'exact'
    });
    if (errorTotal) {
        console.error('Erro ao contar aulas:', errorTotal);
        return {
            totalAulas: 30,
            concluidas: 0,
            emAndamento: 0,
            desafiosAprovados: 0,
            porcentagemConclusao: 0
        };
    }
    // Buscar progresso do aluno
    const { data: progressos, error: errorProgressos } = await supabase.from('aluno_progresso_aula').select('*').eq('aluno_id', alunoId);
    // Se tabela não existe, retornar estatísticas padrão
    if (errorProgressos?.code === 'PGRST116' || errorProgressos?.message?.includes('does not exist')) {
        console.log('Tabela aluno_progresso_aula não existe ainda. Retornando estatísticas padrão.');
        return {
            totalAulas: totalAulas || 30,
            concluidas: 0,
            emAndamento: 0,
            desafiosAprovados: 0,
            porcentagemConclusao: 0
        };
    }
    // Calcular estatísticas
    const concluidas = progressos?.filter((p)=>p.status === 'concluida').length || 0;
    const emAndamento = progressos?.filter((p)=>p.status === 'em_andamento').length || 0;
    const desafiosAprovados = progressos?.filter((p)=>p.desafio_aprovado).length || 0;
    return {
        totalAulas: totalAulas || 30,
        concluidas,
        emAndamento,
        desafiosAprovados,
        porcentagemConclusao: totalAulas ? concluidas / totalAulas * 100 : 0
    };
}
async function getMateriaisAula(aulaId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('aula_materiais').select('*').eq('aula_id', aulaId).order('ordem', {
        ascending: true
    });
    if (error) {
        console.error('Erro ao buscar materiais:', error);
        return [];
    }
    return data;
}
async function getAulasShowFinal() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('aulas').select('*').gte('numero', 25).lte('numero', 29).order('numero', {
        ascending: true
    });
    if (error) {
        console.error('Erro ao buscar aulas do show final:', error);
        return [];
    }
    return data;
}
}),
"[project]/src/lib/types/aulas.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Tipos e interfaces para o sistema de aulas - Método Alpha
__turbopack_context__.s([
    "BLOCOS_PEDAGOGICOS",
    ()=>BLOCOS_PEDAGOGICOS,
    "STATUS_CONFIG",
    ()=>STATUS_CONFIG,
    "TIPO_MATERIAL_CONFIG",
    ()=>TIPO_MATERIAL_CONFIG
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-rsc] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-rsc] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-rsc] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-rsc] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$todo$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ListTodo$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list-todo.js [app-rsc] (ecmascript) <export default as ListTodo>");
;
const BLOCOS_PEDAGOGICOS = {
    'BLOCO 1': {
        nome: 'Fundação e Iniciação',
        aulas: [
            0,
            1,
            2,
            3,
            4,
            5
        ]
    },
    'BLOCO 2': {
        nome: 'Alfabetização Musical',
        aulas: [
            6,
            7
        ]
    },
    'BLOCO 3': {
        nome: 'Repertório Brasileiro',
        aulas: [
            8,
            9
        ]
    },
    'BLOCO 4': {
        nome: 'Consolidação I',
        aulas: [
            10
        ]
    },
    'BLOCO 5': {
        nome: 'Técnica e Criatividade',
        aulas: [
            11,
            12,
            13,
            14,
            15
        ]
    },
    'BLOCO 6': {
        nome: 'Tecnologia e Improvisação',
        aulas: [
            16,
            17
        ]
    },
    'BLOCO 7': {
        nome: 'Repertório Multicultural',
        aulas: [
            18,
            19
        ]
    },
    'BLOCO 8': {
        nome: 'Performance e Prática de Conjunto',
        aulas: [
            20,
            21,
            22,
            23,
            24
        ]
    },
    'BLOCO 9': {
        nome: 'Preparação Final e Show',
        aulas: [
            25,
            26,
            27,
            28,
            29
        ]
    }
};
const STATUS_CONFIG = {
    'A Fazer': {
        label: 'A Fazer',
        color: '#6B7280',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$todo$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ListTodo$3e$__["ListTodo"]
    },
    'Em Preparação': {
        label: 'Em Preparação',
        color: '#3B82F6',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"]
    },
    'Concluída': {
        label: 'Concluída',
        color: '#10B981',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"]
    },
    'Revisão': {
        label: 'Revisão',
        color: '#F59E0B',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"]
    },
    'Cancelada': {
        label: 'Cancelada',
        color: '#EF4444',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"]
    }
};
const TIPO_MATERIAL_CONFIG = {
    pdf: {
        label: 'PDF',
        icon: 'FileText'
    },
    video: {
        label: 'Vídeo',
        icon: 'Video'
    },
    partitura: {
        label: 'Partitura',
        icon: 'Music'
    },
    audio: {
        label: 'Áudio',
        icon: 'Headphones'
    },
    formulario: {
        label: 'Formulário',
        icon: 'ClipboardList'
    },
    slide: {
        label: 'Slide',
        icon: 'Presentation'
    },
    link: {
        label: 'Link',
        icon: 'Link'
    }
};
}),
"[project]/app/(protected)/admin/aulas/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminAulasPage,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$queries$2f$aulas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/queries/aulas.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-rsc] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2f$aulas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/types/aulas.ts [app-rsc] (ecmascript)");
;
;
;
;
;
const metadata = {
    title: 'Aulas - Kanban | Admin | Nipo School',
    description: 'Gerenciar aulas em formato kanban'
};
async function AulasKanbanContent() {
    const aulas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$queries$2f$aulas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTodasAulas"])();
    // Agrupar aulas por status
    const aulasPorStatus = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2f$aulas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["STATUS_CONFIG"]).reduce((acc, status)=>{
        acc[status] = aulas.filter((aula)=>aula.status === status);
        return acc;
    }, {});
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl border border-gray-200 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold text-gray-900 mb-4",
                        children: [
                            "Visão Geral - ",
                            aulas.length,
                            " Aulas"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 md:grid-cols-5 gap-4",
                        children: Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2f$aulas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["STATUS_CONFIG"]).map(([key, config])=>{
                            const count = aulasPorStatus[key]?.length || 0;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 p-3 bg-gray-50 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full",
                                        style: {
                                            backgroundColor: config.color
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                        lineNumber: 37,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg font-bold text-gray-900",
                                                children: count
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                                lineNumber: 42,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-600",
                                                children: config.label
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                                lineNumber: 43,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                        lineNumber: 41,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, key, true, {
                                fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                lineNumber: 36,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4 overflow-x-auto pb-4",
                children: Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2f$aulas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["STATUS_CONFIG"]).map(([statusKey, config])=>{
                    const aulasColuna = aulasPorStatus[statusKey] || [];
                    const StatusIcon = config.icon;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 w-80 bg-gray-50 rounded-xl border border-gray-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-b border-gray-200",
                                style: {
                                    backgroundColor: `${config.color}10`
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusIcon, {
                                                    className: "w-5 h-5",
                                                    style: {
                                                        color: config.color
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                                    lineNumber: 69,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-bold text-sm",
                                                    style: {
                                                        color: config.color
                                                    },
                                                    children: config.label
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                                    lineNumber: 73,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                            lineNumber: 68,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-2 py-1 text-xs font-bold rounded",
                                            style: {
                                                backgroundColor: config.color,
                                                color: 'white'
                                            },
                                            children: aulasColuna.length
                                        }, void 0, false, {
                                            fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                            lineNumber: 80,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                    lineNumber: 67,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                lineNumber: 63,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 space-y-2 max-h-[600px] overflow-y-auto",
                                children: aulasColuna.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-8 text-gray-400 text-sm",
                                    children: "Nenhuma aula"
                                }, void 0, false, {
                                    fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                    lineNumber: 95,
                                    columnNumber: 19
                                }, this) : aulasColuna.map((aula)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-bold text-gray-500",
                                                        children: [
                                                            "Aula ",
                                                            aula.numero
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                                        lineNumber: 105,
                                                        columnNumber: 25
                                                    }, this),
                                                    aula.formato && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded",
                                                        children: aula.formato
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                                        lineNumber: 109,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                                lineNumber: 104,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-semibold text-gray-900 text-sm mb-2 line-clamp-2",
                                                children: aula.titulo
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                                lineNumber: 115,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-600 mb-3 line-clamp-2",
                                                children: aula.objetivo_didatico
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                                lineNumber: 119,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 text-xs text-gray-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 25
                                                    }, this),
                                                    new Date(aula.data_programada).toLocaleDateString('pt-BR', {
                                                        day: '2-digit',
                                                        month: 'short'
                                                    })
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                                lineNumber: 123,
                                                columnNumber: 23
                                            }, this),
                                            aula.desafio_alpha && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 pt-2 border-t border-gray-100",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-purple-600 font-medium",
                                                    children: "🎯 Desafio Alpha"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                                lineNumber: 132,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, aula.id, true, {
                                        fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                        lineNumber: 100,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                lineNumber: 93,
                                columnNumber: 15
                            }, this)
                        ]
                    }, statusKey, true, {
                        fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                        lineNumber: 58,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
function AdminAulasPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 lg:p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-gray-900",
                        children: "📊 Aulas - Kanban"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mt-2",
                        children: "Gerencie as aulas do Método Alpha em formato kanban"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl border border-gray-200 p-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                lineNumber: 163,
                                columnNumber: 13
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-3 text-gray-600",
                                children: "Carregando kanban..."
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                    lineNumber: 161,
                    columnNumber: 9
                }, void 0),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(AulasKanbanContent, {}, void 0, false, {
                    fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
        lineNumber: 152,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/(protected)/admin/aulas/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/(protected)/admin/aulas/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f25f1d0c._.js.map