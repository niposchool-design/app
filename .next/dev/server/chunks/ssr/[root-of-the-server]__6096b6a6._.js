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
"[project]/src/lib/supabase/queries/aulas.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAulaById",
    ()=>getAulaById,
    "getAulaPorNumero",
    ()=>getAulaPorNumero,
    "getAulasShowFinal",
    ()=>getAulasShowFinal,
    "getEstatisticasProgresso",
    ()=>getEstatisticasProgresso,
    "getInstrumentosAula",
    ()=>getInstrumentosAula,
    "getMateriaisAula",
    ()=>getMateriaisAula,
    "getMetodologiasAula",
    ()=>getMetodologiasAula,
    "getPreRequisitosAula",
    ()=>getPreRequisitosAula,
    "getProgressoAula",
    ()=>getProgressoAula,
    "getProgressoGeralAluno",
    ()=>getProgressoGeralAluno,
    "getProximasAulas",
    ()=>getProximasAulas,
    "getRepertorioAula",
    ()=>getRepertorioAula,
    "getTodasAulas",
    ()=>getTodasAulas,
    "getVideosAula",
    ()=>getVideosAula
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-rsc] (ecmascript)");
;
async function getAulaById(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('aulas').select(`
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
    `).eq('id', id).single();
    if (error) {
        console.error(`Erro ao buscar aula por ID ${id}:`, error);
        return null;
    }
    return data;
}
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
    // Buscar atividades
    const { data: atividades } = await supabase.from('aula_atividades').select('*').eq('aula_id', aula.id);
    // Buscar desafios
    const { data: desafios } = await supabase.from('aula_desafios').select('*').eq('aula_id', aula.id);
    return {
        ...aula,
        materiais: materiais || [],
        pre_requisitos: preRequisitos || [],
        feedbacks: feedbacks || [],
        registros: registros || [],
        checklist: checklist || [],
        atividades: atividades || [],
        desafios: desafios || []
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
async function getMetodologiasAula(aulaId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('metodologias').select(`
      id,
      nome,
      resumo,
      filosofia,
      principios,
      caracteristicas,
      faixa_etaria,
      instrumentos_utilizados,
      sequencia_didatica,
      imagem_representativa_url,
      video_explicativo_url
    `).contains('tags', [
        aulaId
    ]);
    if (error) {
        console.error('Erro ao buscar metodologias:', error);
        return [];
    }
    return data || [];
}
async function getInstrumentosAula(aulaId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('biblioteca_instrumentos').select(`
      id,
      nome,
      categoria_id,
      origem,
      historia,
      curiosidades,
      uso_tradicional,
      uso_moderno,
      material,
      tecnicas_basicas,
      imagem_url,
      audio_exemplo_url,
      video_demonstracao_url,
      nivel_dificuldade,
      idade_recomendada,
      pre_requisitos,
      disponivel_escola,
      pode_emprestar
    `).contains('tags', [
        aulaId
    ]);
    if (error) {
        console.error('Erro ao buscar instrumentos:', error);
        return [];
    }
    return data || [];
}
async function getRepertorioAula(aulaId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('repertorio').select(`
      id,
      titulo,
      compositor,
      arranjo_por,
      tonalidade,
      andamento,
      duracao_estimada,
      nivel_dificuldade,
      instrumentos_necessarios,
      partitura_url,
      cifra_url,
      letra_url,
      playback_url,
      video_tutorial_url,
      tags,
      observacoes
    `).contains('tags', [
        aulaId
    ]);
    if (error) {
        console.error('Erro ao buscar repertório:', error);
        return [];
    }
    return data || [];
}
async function getVideosAula(aulaId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('videos_professores').select(`
      id,
      titulo,
      descricao,
      duracao,
      video_url,
      thumbnail_url,
      modulo,
      instrumento_foco,
      nivel_dificuldade,
      transcricao,
      materiais_complementares
    `).eq('aula_relacionada_id', aulaId).eq('publico', true);
    if (error) {
        console.error('Erro ao buscar vídeos:', error);
        return [];
    }
    return data || [];
}
async function getPreRequisitosAula(aulaId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('aula_pre_requisitos').select(`
      *,
      aula_prerequisito:pre_requisito_aula_id (
        id,
        numero,
        titulo,
        objetivo_didatico,
        status
      )
    `).eq('aula_id', aulaId);
    if (error) {
        console.error('Erro ao buscar pré-requisitos:', error);
        return [];
    }
    return data || [];
}
async function getProximasAulas(aulaNumero) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('aulas').select('id, numero, titulo, objetivo_didatico, data_programada, status').gt('numero', aulaNumero).order('numero', {
        ascending: true
    }).limit(3);
    if (error) {
        console.error('Erro ao buscar próximas aulas:', error);
        return [];
    }
    return data || [];
}
}),
"[project]/app/(protected)/admin/aulas/_components/AulasManager.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "AulasManager",
    ()=>AulasManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const AulasManager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AulasManager() from the server but AulasManager is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/(protected)/admin/aulas/_components/AulasManager.tsx <module evaluation>", "AulasManager");
}),
"[project]/app/(protected)/admin/aulas/_components/AulasManager.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "AulasManager",
    ()=>AulasManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const AulasManager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AulasManager() from the server but AulasManager is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/(protected)/admin/aulas/_components/AulasManager.tsx", "AulasManager");
}),
"[project]/app/(protected)/admin/aulas/_components/AulasManager.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$protected$292f$admin$2f$aulas$2f$_components$2f$AulasManager$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/(protected)/admin/aulas/_components/AulasManager.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$protected$292f$admin$2f$aulas$2f$_components$2f$AulasManager$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/(protected)/admin/aulas/_components/AulasManager.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$protected$292f$admin$2f$aulas$2f$_components$2f$AulasManager$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/(protected)/admin/aulas/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminAulasPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$queries$2f$aulas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/queries/aulas.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$protected$292f$admin$2f$aulas$2f$_components$2f$AulasManager$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(protected)/admin/aulas/_components/AulasManager.tsx [app-rsc] (ecmascript)");
;
;
;
async function AdminAulasPage() {
    const aulas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$queries$2f$aulas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTodasAulas"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 lg:p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$protected$292f$admin$2f$aulas$2f$_components$2f$AulasManager$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AulasManager"], {
            aulasIniciais: aulas
        }, void 0, false, {
            fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(protected)/admin/aulas/page.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/(protected)/admin/aulas/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/(protected)/admin/aulas/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6096b6a6._.js.map