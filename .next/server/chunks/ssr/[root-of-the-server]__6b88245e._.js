module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},70864,a=>{a.n(a.i(33290))},43619,a=>{a.n(a.i(79962))},13718,a=>{a.n(a.i(85523))},18198,a=>{a.n(a.i(45518))},62212,a=>{a.n(a.i(66114))},12851,a=>{a.n(a.i(91991))},1269,a=>{"use strict";var b=a.i(717);let c=(...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim();var d={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let e=(0,b.forwardRef)(({color:a="currentColor",size:e=24,strokeWidth:f=2,absoluteStrokeWidth:g,className:h="",children:i,iconNode:j,...k},l)=>(0,b.createElement)("svg",{ref:l,...d,width:e,height:e,stroke:a,strokeWidth:g?24*Number(f)/Number(e):f,className:c("lucide",h),...k},[...j.map(([a,c])=>(0,b.createElement)(a,c)),...Array.isArray(i)?i:[i]])),f=(a,d)=>{let f=(0,b.forwardRef)(({className:f,...g},h)=>(0,b.createElement)(e,{ref:h,iconNode:d,className:c(`lucide-${a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,f),...g}));return f.displayName=`${a}`,f};a.s(["default",()=>f],1269)},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},790,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js <module evaluation>"))},84707,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js"))},97647,a=>{"use strict";a.i(790);var b=a.i(84707);a.n(b)},95936,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return i},useLinkStatus:function(){return h.useLinkStatus}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(64240),g=a.r(7997),h=f._(a.r(97647));function i(a){let b=a.legacyBehavior,c="string"==typeof a.children||"number"==typeof a.children||"string"==typeof a.children?.type,d=a.children?.type?.$$typeof===Symbol.for("react.client.reference");return!b||c||d||(a.children?.type?.$$typeof===Symbol.for("react.lazy")?console.error("Using a Lazy Component as a direct child of `<Link legacyBehavior>` from a Server Component is not supported. If you need legacyBehavior, wrap your Lazy Component in a Client Component that renders the Link's `<a>` tag."):console.error("Using a Server Component as a direct child of `<Link legacyBehavior>` is not supported. If you need legacyBehavior, wrap your Server Component in a Client Component that renders the Link's `<a>` tag.")),(0,g.jsx)(h.default,{...a})}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},60573,a=>{"use strict";var b=a.i(98310);async function c(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("aulas").select(`
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
    `).eq("aula_id",a);return e?(console.error("Erro ao buscar pré-requisitos:",e),[]):d||[]}async function n(a){let c=await (0,b.createClient)(),{data:d,error:e}=await c.from("aulas").select("id, numero, titulo, objetivo_didatico, data_programada, status").gt("numero",a).order("numero",{ascending:!0}).limit(3);return e?(console.error("Erro ao buscar próximas aulas:",e),[]):d||[]}a.s(["getAulaById",()=>c,"getAulaPorNumero",()=>e,"getAulasShowFinal",()=>h,"getEstatisticasProgresso",()=>g,"getInstrumentosAula",()=>j,"getMetodologiasAula",()=>i,"getPreRequisitosAula",()=>m,"getProgressoGeralAluno",()=>f,"getProximasAulas",()=>n,"getRepertorioAula",()=>k,"getTodasAulas",()=>d,"getVideosAula",()=>l])},13743,a=>{"use strict";let b=(0,a.i(1269).default)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);a.s(["ArrowLeft",()=>b],13743)},20916,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"ReadonlyURLSearchParams",{enumerable:!0,get:function(){return e}});class d extends Error{constructor(){super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams")}}class e extends URLSearchParams{append(){throw new d}delete(){throw new d}set(){throw new d}sort(){throw new d}}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},21170,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"RedirectStatusCode",{enumerable:!0,get:function(){return e}});var d,e=((d={})[d.SeeOther=303]="SeeOther",d[d.TemporaryRedirect=307]="TemporaryRedirect",d[d.PermanentRedirect=308]="PermanentRedirect",d);("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},28859,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d,e={REDIRECT_ERROR_CODE:function(){return h},RedirectType:function(){return i},isRedirectError:function(){return j}};for(var f in e)Object.defineProperty(c,f,{enumerable:!0,get:e[f]});let g=a.r(21170),h="NEXT_REDIRECT";var i=((d={}).push="push",d.replace="replace",d);function j(a){if("object"!=typeof a||null===a||!("digest"in a)||"string"!=typeof a.digest)return!1;let b=a.digest.split(";"),[c,d]=b,e=b.slice(2,-2).join(";"),f=Number(b.at(-2));return c===h&&("replace"===d||"push"===d)&&"string"==typeof e&&!isNaN(f)&&f in g.RedirectStatusCode}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},44868,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={getRedirectError:function(){return i},getRedirectStatusCodeFromError:function(){return n},getRedirectTypeFromError:function(){return m},getURLFromRedirectError:function(){return l},permanentRedirect:function(){return k},redirect:function(){return j}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(21170),g=a.r(28859),h=a.r(20635).actionAsyncStorage;function i(a,b,c=f.RedirectStatusCode.TemporaryRedirect){let d=Object.defineProperty(Error(g.REDIRECT_ERROR_CODE),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return d.digest=`${g.REDIRECT_ERROR_CODE};${b};${a};${c};`,d}function j(a,b){throw i(a,b??=h?.getStore()?.isAction?g.RedirectType.push:g.RedirectType.replace,f.RedirectStatusCode.TemporaryRedirect)}function k(a,b=g.RedirectType.replace){throw i(a,b,f.RedirectStatusCode.PermanentRedirect)}function l(a){return(0,g.isRedirectError)(a)?a.digest.split(";").slice(2,-2).join(";"):null}function m(a){if(!(0,g.isRedirectError)(a))throw Object.defineProperty(Error("Not a redirect error"),"__NEXT_ERROR_CODE",{value:"E260",enumerable:!1,configurable:!0});return a.digest.split(";",2)[1]}function n(a){if(!(0,g.isRedirectError)(a))throw Object.defineProperty(Error("Not a redirect error"),"__NEXT_ERROR_CODE",{value:"E260",enumerable:!1,configurable:!0});return Number(a.digest.split(";").at(-2))}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},89798,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={HTTPAccessErrorStatus:function(){return f},HTTP_ERROR_FALLBACK_ERROR_CODE:function(){return h},getAccessFallbackErrorTypeByStatus:function(){return k},getAccessFallbackHTTPStatus:function(){return j},isHTTPAccessFallbackError:function(){return i}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f={NOT_FOUND:404,FORBIDDEN:403,UNAUTHORIZED:401},g=new Set(Object.values(f)),h="NEXT_HTTP_ERROR_FALLBACK";function i(a){if("object"!=typeof a||null===a||!("digest"in a)||"string"!=typeof a.digest)return!1;let[b,c]=a.digest.split(";");return b===h&&g.has(Number(c))}function j(a){return Number(a.digest.split(";")[1])}function k(a){switch(a){case 401:return"unauthorized";case 403:return"forbidden";case 404:return"not-found";default:return}}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},16155,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"notFound",{enumerable:!0,get:function(){return f}});let d=a.r(89798),e=`${d.HTTP_ERROR_FALLBACK_ERROR_CODE};404`;function f(){let a=Object.defineProperty(Error(e),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});throw a.digest=e,a}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},34557,(a,b,c)=>{"use strict";function d(){throw Object.defineProperty(Error("`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled."),"__NEXT_ERROR_CODE",{value:"E488",enumerable:!1,configurable:!0})}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"forbidden",{enumerable:!0,get:function(){return d}}),a.r(89798).HTTP_ERROR_FALLBACK_ERROR_CODE,("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},93845,(a,b,c)=>{"use strict";function d(){throw Object.defineProperty(Error("`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled."),"__NEXT_ERROR_CODE",{value:"E411",enumerable:!1,configurable:!0})}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"unauthorized",{enumerable:!0,get:function(){return d}}),a.r(89798).HTTP_ERROR_FALLBACK_ERROR_CODE,("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},73808,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"isPostpone",{enumerable:!0,get:function(){return e}});let d=Symbol.for("react.postpone");function e(a){return"object"==typeof a&&null!==a&&a.$$typeof===d}},1567,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"isNextRouterError",{enumerable:!0,get:function(){return f}});let d=a.r(89798),e=a.r(28859);function f(a){return(0,e.isRedirectError)(a)||(0,d.isHTTPAccessFallbackError)(a)}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},94783,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"unstable_rethrow",{enumerable:!0,get:function(){return function a(b){if((0,g.isNextRouterError)(b)||(0,f.isBailoutToCSRError)(b)||(0,i.isDynamicServerError)(b)||(0,h.isDynamicPostpone)(b)||(0,e.isPostpone)(b)||(0,d.isHangingPromiseRejectionError)(b)||(0,h.isPrerenderInterruptedError)(b))throw b;b instanceof Error&&"cause"in b&&a(b.cause)}}});let d=a.r(13091),e=a.r(73808),f=a.r(49640),g=a.r(1567),h=a.r(60384),i=a.r(96556);("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},60968,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"unstable_rethrow",{enumerable:!0,get:function(){return d}});let d=a.r(94783).unstable_rethrow;("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},73727,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={ReadonlyURLSearchParams:function(){return f.ReadonlyURLSearchParams},RedirectType:function(){return h.RedirectType},forbidden:function(){return j.forbidden},notFound:function(){return i.notFound},permanentRedirect:function(){return g.permanentRedirect},redirect:function(){return g.redirect},unauthorized:function(){return k.unauthorized},unstable_isUnrecognizedActionError:function(){return m},unstable_rethrow:function(){return l.unstable_rethrow}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(20916),g=a.r(44868),h=a.r(28859),i=a.r(16155),j=a.r(34557),k=a.r(93845),l=a.r(60968);function m(){throw Object.defineProperty(Error("`unstable_isUnrecognizedActionError` can only be used on the client."),"__NEXT_ERROR_CODE",{value:"E776",enumerable:!1,configurable:!0})}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},70396,a=>{"use strict";a.i(73727),a.s([])},38938,a=>{"use strict";let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call AulaForm() from the server but AulaForm is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/app/(protected)/admin/aulas/_components/AulaForm.tsx <module evaluation>","AulaForm");a.s(["AulaForm",0,b])},96861,a=>{"use strict";let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call AulaForm() from the server but AulaForm is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/app/(protected)/admin/aulas/_components/AulaForm.tsx","AulaForm");a.s(["AulaForm",0,b])},93259,a=>{"use strict";a.i(38938);var b=a.i(96861);a.n(b)},33835,a=>{"use strict";var b=a.i(7997),c=a.i(60573),d=a.i(93259),e=a.i(13743),f=a.i(95936);a.i(70396);var g=a.i(73727);async function h({params:a}){let h=await (0,c.getAulaById)(a.id);h||(0,g.notFound)();let i={id:h.id,numero:h.numero,titulo:h.titulo,data_programada:h.data_programada,objetivo_didatico:h.objetivo_didatico||"",resumo_atividades:h.resumo_atividades||"",nivel:h.nivel||"iniciante",formato:h.formato||"presencial",status:h.status||"rascunho"};return(0,b.jsxs)("div",{className:"p-6 lg:p-8 max-w-5xl mx-auto",children:[(0,b.jsxs)("div",{className:"mb-6",children:[(0,b.jsxs)(f.default,{href:"/admin/aulas",className:"inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors mb-4",children:[(0,b.jsx)(e.ArrowLeft,{className:"w-4 h-4 mr-1"}),"Voltar para lista"]}),(0,b.jsxs)("h1",{className:"text-3xl font-bold text-gray-900",children:["Editar Aula ",h.numero]}),(0,b.jsx)("p",{className:"text-gray-600",children:"Atualize as informações desta aula"})]}),(0,b.jsx)(d.AulaForm,{initialData:i,isEditing:!0})]})}a.s(["default",()=>h])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__6b88245e._.js.map