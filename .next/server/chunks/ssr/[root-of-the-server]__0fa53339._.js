module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},70864,a=>{a.n(a.i(33290))},43619,a=>{a.n(a.i(79962))},13718,a=>{a.n(a.i(85523))},18198,a=>{a.n(a.i(45518))},62212,a=>{a.n(a.i(66114))},1269,a=>{"use strict";var b=a.i(717);let c=(...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim();var d={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let e=(0,b.forwardRef)(({color:a="currentColor",size:e=24,strokeWidth:f=2,absoluteStrokeWidth:g,className:h="",children:i,iconNode:j,...k},l)=>(0,b.createElement)("svg",{ref:l,...d,width:e,height:e,stroke:a,strokeWidth:g?24*Number(f)/Number(e):f,className:c("lucide",h),...k},[...j.map(([a,c])=>(0,b.createElement)(a,c)),...Array.isArray(i)?i:[i]])),f=(a,d)=>{let f=(0,b.forwardRef)(({className:f,...g},h)=>(0,b.createElement)(e,{ref:h,iconNode:d,className:c(`lucide-${a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,f),...g}));return f.displayName=`${a}`,f};a.s(["default",()=>f],1269)},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},790,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js <module evaluation>"))},84707,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js"))},97647,a=>{"use strict";a.i(790);var b=a.i(84707);a.n(b)},95936,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return i},useLinkStatus:function(){return h.useLinkStatus}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(64240),g=a.r(7997),h=f._(a.r(97647));function i(a){let b=a.legacyBehavior,c="string"==typeof a.children||"number"==typeof a.children||"string"==typeof a.children?.type,d=a.children?.type?.$$typeof===Symbol.for("react.client.reference");return!b||c||d||(a.children?.type?.$$typeof===Symbol.for("react.lazy")?console.error("Using a Lazy Component as a direct child of `<Link legacyBehavior>` from a Server Component is not supported. If you need legacyBehavior, wrap your Lazy Component in a Client Component that renders the Link's `<a>` tag."):console.error("Using a Server Component as a direct child of `<Link legacyBehavior>` is not supported. If you need legacyBehavior, wrap your Server Component in a Client Component that renders the Link's `<a>` tag.")),(0,g.jsx)(h.default,{...a})}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},68815,a=>{a.n(a.i(60204))},60573,a=>{"use strict";var b=a.i(98310);async function c(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("aulas").select(`
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
    `).eq("numero",a).single();if(e||!d)return console.error("Erro ao buscar aula:",e),null;let{data:f}=await c.from("aula_materiais").select("*").eq("aula_id",d.id).order("ordem",{ascending:!0}),{data:g}=await c.from("aula_pre_requisitos").select("*").eq("aula_id",d.id),{data:h}=await c.from("aula_feedbacks").select("*").eq("aula_id",d.id).order("data_feedback",{ascending:!1}),{data:i}=await c.from("aula_registros").select("*").eq("aula_id",d.id).order("data_registro",{ascending:!1}),{data:j}=await c.from("aula_checklist").select("*").eq("aula_id",d.id).order("ordem",{ascending:!0});return{...d,materiais:f||[],pre_requisitos:g||[],feedbacks:h||[],registros:i||[],checklist:j||[]}}async function f(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("aluno_progresso_aula").select(`
      *,
      aulas (
        numero,
        titulo,
        data_programada
      )
    `).eq("aluno_id",a);return e?("{}"===JSON.stringify(e)||"PGRST116"===e.code||"42P01"===e.code||e.message?.includes("does not exist")||e.message?.includes("relation")&&e.message?.includes("does not exist")?console.log("Tabela aluno_progresso_aula não existe ainda. Retornando array vazio."):console.error("Erro ao buscar progresso geral:",e),[]):d}async function g(a){let c=await (0,b.createClient)(),{count:d,error:e}=await c.from("aulas").select("id",{count:"exact"});if(e)return console.error("Erro ao contar aulas:",e),{totalAulas:30,concluidas:0,emAndamento:0,desafiosAprovados:0,porcentagemConclusao:0};let{data:f,error:g}=await c.from("aluno_progresso_aula").select("*").eq("aluno_id",a);if(g?.code==="PGRST116"||g?.message?.includes("does not exist"))return console.log("Tabela aluno_progresso_aula não existe ainda. Retornando estatísticas padrão."),{totalAulas:d||30,concluidas:0,emAndamento:0,desafiosAprovados:0,porcentagemConclusao:0};let h=f?.filter(a=>"concluida"===a.status).length||0;return{totalAulas:d||30,concluidas:h,emAndamento:f?.filter(a=>"em_andamento"===a.status).length||0,desafiosAprovados:f?.filter(a=>a.desafio_aprovado).length||0,porcentagemConclusao:d?h/d*100:0}}async function h(){let a=await (0,b.createClient)(),{data:c,error:d}=await a.from("aulas").select("*").gte("numero",25).lte("numero",29).order("numero",{ascending:!0});return d?(console.error("Erro ao buscar aulas do show final:",d),[]):c}async function i(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("metodologias").select(`
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
    `).contains("tags",[a]);return e?(console.error("Erro ao buscar metodologias:",e),[]):d||[]}async function j(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("biblioteca_instrumentos").select(`
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
    `).contains("tags",[a]);return e?(console.error("Erro ao buscar instrumentos:",e),[]):d||[]}async function k(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("repertorio").select(`
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
    `).contains("tags",[a]);return e?(console.error("Erro ao buscar repertório:",e),[]):d||[]}async function l(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("videos_professores").select(`
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
    `).eq("aula_relacionada_id",a).eq("publico",!0);return e?(console.error("Erro ao buscar vídeos:",e),[]):d||[]}async function m(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("aula_pre_requisitos").select(`
      *,
      aula_prerequisito:pre_requisito_aula_id (
        id,
        numero,
        titulo,
        objetivo_didatico,
        status
      )
    `).eq("aula_id",a);return e?(console.error("Erro ao buscar pré-requisitos:",e),[]):d||[]}async function n(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("aulas").select("id, numero, titulo, objetivo_didatico, data_programada, status").gt("numero",a).order("numero",{ascending:!0}).limit(3);return e?(console.error("Erro ao buscar próximas aulas:",e),[]):d||[]}a.s(["getAulaById",()=>c,"getAulaPorNumero",()=>e,"getAulasShowFinal",()=>h,"getEstatisticasProgresso",()=>g,"getInstrumentosAula",()=>j,"getMetodologiasAula",()=>i,"getPreRequisitosAula",()=>m,"getProgressoGeralAluno",()=>f,"getProximasAulas",()=>n,"getRepertorioAula",()=>k,"getTodasAulas",()=>d,"getVideosAula",()=>l])},73992,a=>{"use strict";let b=(0,a.i(1269).default)("Music",[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]]);a.s(["Music",()=>b],73992)},60612,a=>{"use strict";let b=(0,a.i(1269).default)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);a.s(["Calendar",()=>b],60612)},49804,a=>{"use strict";let b=(0,a.i(1269).default)("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);a.s(["Sparkles",()=>b],49804)},88588,a=>{"use strict";let b=(0,a.i(1269).default)("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]);a.s(["Star",()=>b],88588)},9283,a=>{"use strict";let b=(0,a.i(1269).default)("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);a.s(["Award",()=>b],9283)},76382,a=>{"use strict";let b=(0,a.i(1269).default)("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);a.s(["Play",()=>b],76382)},57439,a=>{"use strict";var b=a.i(7997),c=a.i(60573),d=a.i(95936),e=a.i(76382),f=a.i(60612),g=a.i(88588),h=a.i(73992),i=a.i(9283),j=a.i(49804);async function k(){let a=await (0,c.getAulasShowFinal)();return(0,b.jsxs)("div",{className:"space-y-8",children:[(0,b.jsxs)("div",{className:"relative bg-black rounded-3xl overflow-hidden text-center text-white py-20 px-6 shadow-2xl",children:[(0,b.jsxs)("div",{className:"absolute inset-0 z-0 opacity-60",children:[(0,b.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-black via-red-900/60 to-black"}),(0,b.jsx)("div",{className:"absolute top-10 left-10 w-64 h-64 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"}),(0,b.jsx)("div",{className:"absolute bottom-10 right-10 w-64 h-64 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"})]}),(0,b.jsxs)("div",{className:"relative z-10 max-w-3xl mx-auto space-y-6",children:[(0,b.jsxs)("div",{className:"inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 text-red-400 border border-red-600/30 text-sm font-bold uppercase tracking-wider backdrop-blur-md shadow-lg shadow-red-900/20",children:[(0,b.jsx)(j.Sparkles,{size:16,className:"text-yellow-400"}),"Evento Especial"]}),(0,b.jsx)("h1",{className:"text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-white drop-shadow-sm",children:"Show Final Nipo"}),(0,b.jsx)("p",{className:"text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto",children:"O momento de brilhar! Prepare-se para sua apresentação de encerramento do módulo Alpha com estas aulas exclusivas."}),(0,b.jsxs)("div",{className:"flex flex-wrap justify-center gap-4 pt-6",children:[(0,b.jsxs)("div",{className:"flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all hover:scale-105 cursor-default",children:[(0,b.jsx)(f.Calendar,{className:"text-red-400 w-5 h-5"}),(0,b.jsx)("span",{className:"font-bold text-white",children:"20 de Dezembro"})]}),(0,b.jsxs)("div",{className:"flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all hover:scale-105 cursor-default",children:[(0,b.jsx)(h.Music,{className:"text-orange-400 w-5 h-5"}),(0,b.jsx)("span",{className:"font-bold text-white",children:"Grande Auditório"})]})]})]})]}),(0,b.jsxs)("div",{className:"max-w-4xl mx-auto",children:[(0,b.jsxs)("h2",{className:"text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3",children:[(0,b.jsx)("div",{className:"p-2 bg-red-100 rounded-lg",children:(0,b.jsx)(i.Award,{className:"text-red-600 w-6 h-6"})}),"Sua Jornada de Preparação"]}),(0,b.jsx)("div",{className:"space-y-8",children:a.length>0?a.map((c,f)=>(0,b.jsxs)("div",{className:"group relative flex gap-6",children:[f!==a.length-1&&(0,b.jsx)("div",{className:"absolute left-[22px] top-14 bottom-[-32px] w-0.5 bg-gradient-to-b from-red-200 to-transparent group-last:hidden"}),(0,b.jsx)("div",{className:"flex-shrink-0 w-12 h-12 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center font-bold z-10 text-lg transform group-hover:scale-110 transition-transform duration-300",children:f+1}),(0,b.jsxs)(d.default,{href:`/alunos/aulas/${c.numero}`,className:"flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-red-100/50 hover:border-red-100 transition-all group-hover:-translate-y-1 block relative overflow-hidden",children:[(0,b.jsx)("div",{className:"absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full -mr-12 -mt-12 opacity-50 group-hover:scale-150 transition-transform duration-500"}),(0,b.jsxs)("div",{className:"relative z-10",children:[(0,b.jsxs)("div",{className:"flex justify-between items-start mb-3",children:[(0,b.jsxs)("span",{className:"text-xs font-bold text-red-600 uppercase tracking-wide bg-red-50 px-2 py-1 rounded-md",children:["Aula ",c.numero]}),"concluida"===c.status&&(0,b.jsxs)("span",{className:"bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1",children:[(0,b.jsx)(g.Star,{size:10,fill:"currentColor"})," Concluída"]})]}),(0,b.jsx)("h3",{className:"text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors",children:c.titulo}),(0,b.jsx)("p",{className:"text-gray-600 mb-4 leading-relaxed",children:c.objetivo_didatico}),(0,b.jsxs)("div",{className:"flex items-center text-sm font-bold text-red-600 group-hover:gap-2 transition-all",children:["Ver detalhes da preparação ",(0,b.jsx)(e.Play,{className:"w-4 h-4 ml-1 fill-current"})]})]})]})]},c.id)):(0,b.jsxs)("div",{className:"text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200",children:[(0,b.jsx)("div",{className:"w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4",children:(0,b.jsx)(j.Sparkles,{className:"w-8 h-8 text-gray-400"})}),(0,b.jsx)("h3",{className:"text-lg font-bold text-gray-900",children:"Em breve"}),(0,b.jsx)("p",{className:"text-gray-500 mt-1",children:"O roteiro do Show Final será liberado em breve!"})]})})]})]})}a.s(["default",()=>k])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0fa53339._.js.map