module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},70864,a=>{a.n(a.i(33290))},43619,a=>{a.n(a.i(79962))},13718,a=>{a.n(a.i(85523))},18198,a=>{a.n(a.i(45518))},62212,a=>{a.n(a.i(66114))},68815,a=>{a.n(a.i(60204))},60573,a=>{"use strict";var b=a.i(98310);async function c(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("aulas").select(`
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
    `).eq("id",a).single();return e?(console.error(`Erro ao buscar aula por ID ${a}:`,e),null):d}async function d(a){let c=(await (0,b.createClient)()).from("aulas").select(`
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
    `).order("numero",{ascending:!0});a?.status&&(c=c.eq("status",a.status)),a?.formato&&(c=c.eq("formato",a.formato)),a?.modulo&&(c=c.eq("modulo_id",a.modulo)),a?.data_inicio&&(c=c.gte("data_programada",a.data_inicio)),a?.data_fim&&(c=c.lte("data_programada",a.data_fim)),a?.search&&(c=c.or(`titulo.ilike.%${a.search}%,objetivo_didatico.ilike.%${a.search}%`));let{data:d,error:e}=await c;return e?(console.error("Erro ao buscar todas as aulas:",e),[]):d}async function e(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("aulas").select(`
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
    `).eq("numero",a).single();if(e||!d)return console.error("Erro ao buscar aula:",e),null;let{data:f}=await c.from("aula_materiais").select("*").eq("aula_id",d.id).order("ordem",{ascending:!0}),{data:g}=await c.from("aula_pre_requisitos").select("*").eq("aula_id",d.id),{data:h}=await c.from("aula_feedbacks").select("*").eq("aula_id",d.id).order("data_feedback",{ascending:!1}),{data:i}=await c.from("aula_registros").select("*").eq("aula_id",d.id).order("data_registro",{ascending:!1}),{data:j}=await c.from("aula_checklist").select("*").eq("aula_id",d.id).order("ordem",{ascending:!0}),{data:k}=await c.from("aula_atividades").select("*").eq("aula_id",d.id),{data:l}=await c.from("aula_desafios").select("*").eq("aula_id",d.id);return{...d,materiais:f||[],pre_requisitos:g||[],feedbacks:h||[],registros:i||[],checklist:j||[],atividades:k||[],desafios:l||[]}}async function f(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("aluno_progresso_aula").select(`
      *,
      aulas (
        numero,
        titulo,
        data_programada
      )
    `).eq("aluno_id",a);return e?("{}"===JSON.stringify(e)||"PGRST116"===e.code||"42P01"===e.code||e.message?.includes("does not exist")||e.message?.includes("relation")&&e.message?.includes("does not exist")?console.log("Tabela aluno_progresso_aula não existe ainda. Retornando array vazio."):console.error("Erro ao buscar progresso geral:",e),[]):d}async function g(a){let c=await (0,b.createClient)(),{count:d,error:e}=await c.from("aulas").select("id",{count:"exact"});if(e)return console.error("Erro ao contar aulas:",e),{totalAulas:30,concluidas:0,emAndamento:0,desafiosAprovados:0,porcentagemConclusao:0};let{data:f,error:g}=await c.from("aluno_progresso_aula").select("*").eq("aluno_id",a);if(g?.code==="PGRST116"||g?.message?.includes("does not exist"))return console.log("Tabela aluno_progresso_aula não existe ainda. Retornando estatísticas padrão."),{totalAulas:d||30,concluidas:0,emAndamento:0,desafiosAprovados:0,porcentagemConclusao:0};let h=f?.filter(a=>"concluida"===a.status).length||0;return{totalAulas:d||30,concluidas:h,emAndamento:f?.filter(a=>"em_andamento"===a.status).length||0,desafiosAprovados:f?.filter(a=>a.desafio_aprovado).length||0,porcentagemConclusao:d?h/d*100:0}}async function h(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("aula_materiais").select("*").eq("aula_id",a).order("ordem",{ascending:!0});return e?(console.error("Erro ao buscar materiais:",e),[]):d}async function i(){let a=await (0,b.createClient)(),{data:c,error:d}=await a.from("aulas").select("*").gte("numero",25).lte("numero",29).order("numero",{ascending:!0});return d?(console.error("Erro ao buscar aulas do show final:",d),[]):c}async function j(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("metodologias").select(`
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
    `).contains("tags",[a]);return e?(console.error("Erro ao buscar metodologias:",e),[]):d||[]}async function k(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("biblioteca_instrumentos").select(`
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
    `).contains("tags",[a]);return e?(console.error("Erro ao buscar instrumentos:",e),[]):d||[]}async function l(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("repertorio").select(`
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
    `).contains("tags",[a]);return e?(console.error("Erro ao buscar repertório:",e),[]):d||[]}async function m(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("videos_professores").select(`
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
    `).eq("aula_relacionada_id",a).eq("publico",!0);return e?(console.error("Erro ao buscar vídeos:",e),[]):d||[]}async function n(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("aulas").select("id, numero, titulo, objetivo_didatico, data_programada, status").gt("numero",a).order("numero",{ascending:!0}).limit(3);return e?(console.error("Erro ao buscar próximas aulas:",e),[]):d||[]}a.s(["getAulaById",()=>c,"getAulaPorNumero",()=>e,"getAulasShowFinal",()=>i,"getEstatisticasProgresso",()=>g,"getInstrumentosAula",()=>k,"getMateriaisAula",()=>h,"getMetodologiasAula",()=>j,"getProgressoGeralAluno",()=>f,"getProximasAulas",()=>n,"getRepertorioAula",()=>l,"getTodasAulas",()=>d,"getVideosAula",()=>m])},27230,a=>{"use strict";var b=a.i(98310);async function c(){let a=await (0,b.createClient)(),{data:{user:c}}=await a.auth.getUser();if(!c)return null;let{data:d,error:e}=await a.from("profiles").select("*").eq("id",c.id).single();return e?(console.error("Erro ao buscar perfil atual:",e),null):d}async function d(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("profiles").select("*").eq("id",a).single();return e?(console.error("Erro ao buscar perfil:",e),null):d}async function e(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("matriculas").select(`
            *,
            turma:turmas(*)
        `).eq("aluno_id",a).eq("status","ativa");return e?(console.error("Erro ao buscar matrículas do aluno:",e),[]):d}async function f(a){let c=(await (0,b.createClient)()).from("turmas").select(`
      *,
      professor:profiles!professor_id(*),
      matriculas(count)
    `).eq("ativo",!0);a&&(c=c.eq("professor_id",a)),c=c.order("nome");let{data:d,error:e}=await c;return e?(console.error("Erro ao buscar turmas:",e),[]):d.map(a=>({...a,qtd_alunos:a.matriculas?.[0]?.count||0}))}async function g(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("turmas").select(`
      *,
      professor:profiles!professor_id(*)
    `).eq("id",a).single();return e?(console.error("Erro ao buscar turma:",e),null):d}async function h(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("matriculas").select(`
      *,
      aluno:profiles!aluno_id(*)
    `).eq("turma_id",a).order("aluno(full_name)");return e?(console.error("Erro ao buscar alunos da turma:",e),[]):d}a.s(["getAlunosTurma",()=>h,"getCurrentProfile",()=>c,"getMatriculasAluno",()=>e,"getProfileById",()=>d,"getTurmaById",()=>g,"getTurmas",()=>f])},19627,a=>{"use strict";let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/app/(protected)/alunos/aulas/_components/AulasClient.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/app/(protected)/alunos/aulas/_components/AulasClient.tsx <module evaluation>","default");a.s(["default",0,b])},78459,a=>{"use strict";let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/app/(protected)/alunos/aulas/_components/AulasClient.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/app/(protected)/alunos/aulas/_components/AulasClient.tsx","default");a.s(["default",0,b])},34872,a=>{"use strict";a.i(19627);var b=a.i(78459);a.n(b)},21902,a=>{"use strict";var b=a.i(7997),c=a.i(60573),d=a.i(27230),e=a.i(34872);async function f(){let a=await (0,d.getCurrentProfile)(),f=await (0,c.getTodasAulas)(),g=null;a?.id&&(g=await (0,c.getProgressoGeralAluno)(a.id));let h=(f||[]).map((a,b)=>({id:a.id,numero:a.numero,titulo:a.titulo,descricao:a.resumo_atividades||"",duracao_estimada:45,nivel_dificuldade:a.nivel||"Iniciante",status:g?.aulas_concluidas?.includes(a.id)?"concluida":0===b?"em-andamento":"bloqueada"}));return(0,b.jsx)(e.default,{aulas:h})}a.s(["default",()=>f])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__a84d7941._.js.map