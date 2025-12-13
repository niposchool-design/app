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
    `).eq("aula_id",a);return e?(console.error("Erro ao buscar pré-requisitos:",e),[]):d||[]}async function n(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("aulas").select("id, numero, titulo, objetivo_didatico, data_programada, status").gt("numero",a).order("numero",{ascending:!0}).limit(3);return e?(console.error("Erro ao buscar próximas aulas:",e),[]):d||[]}a.s(["getAulaById",()=>c,"getAulaPorNumero",()=>e,"getAulasShowFinal",()=>h,"getEstatisticasProgresso",()=>g,"getInstrumentosAula",()=>j,"getMetodologiasAula",()=>i,"getPreRequisitosAula",()=>m,"getProgressoGeralAluno",()=>f,"getProximasAulas",()=>n,"getRepertorioAula",()=>k,"getTodasAulas",()=>d,"getVideosAula",()=>l])},49442,a=>{"use strict";let b=(0,a.i(1269).default)("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);a.s(["Target",()=>b],49442)},88588,a=>{"use strict";let b=(0,a.i(1269).default)("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]);a.s(["Star",()=>b],88588)},39529,a=>{"use strict";let b=(0,a.i(1269).default)("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);a.s(["Trophy",()=>b],39529)},76382,a=>{"use strict";let b=(0,a.i(1269).default)("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);a.s(["Play",()=>b],76382)},45617,a=>{"use strict";var b=a.i(7997),c=a.i(76382),d=a.i(88588),e=a.i(39529),f=a.i(49442),g=a.i(60573),h=a.i(95936);async function i(){let a=await (0,g.getTodasAulas)(),i=a.length>0?a[0]:{titulo:"Introdução ao Hiragana",descricao_curta:"Aprenda os fundamentos da escrita japonesa e comece a ler suas primeiras palavras.",id:"#"};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("div",{className:"mb-8",children:[(0,b.jsx)("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"Konnichiwa, Aluno-san! 🎌"}),(0,b.jsx)("p",{className:"text-gray-600",children:"Sua jornada de aprendizado continua. O esforço de hoje é a maestria de amanhã."})]}),(0,b.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",children:[(0,b.jsxs)("div",{className:"bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-red-100 hover:shadow-md transition-all group",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,b.jsx)("div",{className:"p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors",children:(0,b.jsx)(d.Star,{className:"w-6 h-6 text-red-600"})}),(0,b.jsx)("span",{className:"text-2xl font-bold text-gray-900",children:"Level 3"})]}),(0,b.jsx)("h3",{className:"text-gray-600 font-medium",children:"Nível Atual"}),(0,b.jsx)("div",{className:"w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden",children:(0,b.jsx)("div",{className:"bg-red-500 h-full rounded-full w-[70%]"})}),(0,b.jsx)("p",{className:"text-xs text-gray-500 mt-2",children:"700/1000 XP para o próximo nível"})]}),(0,b.jsxs)("div",{className:"bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-red-100 hover:shadow-md transition-all group",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,b.jsx)("div",{className:"p-3 bg-orange-50 rounded-xl group-hover:bg-orange-100 transition-colors",children:(0,b.jsx)(e.Trophy,{className:"w-6 h-6 text-orange-600"})}),(0,b.jsx)("span",{className:"text-2xl font-bold text-gray-900",children:"12"})]}),(0,b.jsx)("h3",{className:"text-gray-600 font-medium",children:"Conquistas Desbloqueadas"}),(0,b.jsx)("p",{className:"text-xs text-gray-500 mt-2",children:"Você é um guerreiro dedicado!"})]}),(0,b.jsxs)("div",{className:"bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-red-100 hover:shadow-md transition-all group",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,b.jsx)("div",{className:"p-3 bg-pink-50 rounded-xl group-hover:bg-pink-100 transition-colors",children:(0,b.jsx)(f.Target,{className:"w-6 h-6 text-pink-600"})}),(0,b.jsx)("span",{className:"text-2xl font-bold text-gray-900",children:"5 dias"})]}),(0,b.jsx)("h3",{className:"text-gray-600 font-medium",children:"Sequência de Estudos"}),(0,b.jsx)("p",{className:"text-xs text-gray-500 mt-2",children:"Mantenha o ritmo!"})]})]}),(0,b.jsx)(h.default,{href:`/alunos/aulas/${"#"!==i.id?i.numero:""}`,className:"block",children:(0,b.jsxs)("div",{className:"bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group cursor-pointer transform hover:scale-[1.01] transition-all",children:[(0,b.jsx)("div",{className:"absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"}),(0,b.jsx)("div",{className:"absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl"}),(0,b.jsxs)("div",{className:"relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium mb-3",children:"Próxima Aula"}),(0,b.jsx)("h2",{className:"text-3xl font-bold mb-2",children:i.titulo}),(0,b.jsx)("p",{className:"text-red-100 max-w-lg line-clamp-2",children:i.descricao_curta||i.objetivo_didatico||"Continue sua jornada de aprendizado."})]}),(0,b.jsxs)("button",{className:"bg-white text-red-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-red-50 transition-colors flex items-center gap-2 group-hover:gap-3",children:[(0,b.jsx)(c.Play,{className:"w-5 h-5 fill-current"}),"Continuar"]})]})]})})]})}a.s(["default",()=>i])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__06953e56._.js.map