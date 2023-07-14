const{algoliasearch:e,aa:t}=window,n="latency",a="6be0576ff61c053d5f9a3225e2a90f76",i=e(n,a);t("init",{appId:n,apiKey:a}),t("setUserToken","ma-user-999");const s=window.instantsearch?instantsearch.middlewares.createInsightsMiddleware({insightsClient:t}):{},r={catalogId:"products",catalogLabel:"All Products",recordsIndex:"instant_search",noResultsIndex:"instant_search",suggestionsIndex:"instant_search_demo_query_suggestions",searchPagePath:"/product-search-results"},o=new PubSub,{instantsearch:c}=window,{connectSearchBox:d}=c.connectors,l=function(e="q"){return new URL(window.location).searchParams.get(e)}(),u={};""!==l?u[r.recordsIndex]={query:l}:u[r.recordsIndex]={};const h=c({indexName:r.recordsIndex,searchClient:i,initialUiState:u}),g=c.widgets.configure({hitsPerPage:10}),b=d(({refine:e,instantSearchInstance:t},n)=>{n&&o.subscribe("QUERY_UPDATE_EVT",(n,a)=>{n.index===t.indexName&&e(n.query)})}),p=b({container:"#searchbox__container"}),w=c.widgets.hits({container:"#hits-default__container",templates:{item:(e,{html:t,components:n,sendEvent:a})=>t`<article class="pb-8">
      <a href="#" onClick="${t=>{t.preventDefault(),a("click",e,"Result Clicked"),window.location.href=e.url}}" class="text-blue-400">
        ${n.Highlight({attribute:"name",hit:e})}
      </a>
      <img src="${e.image}"/>
      <p>${n.Snippet({attribute:"description",hit:e})}</p>
      <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded absolute bottom-5" onClick="${t=>{t.preventDefault(),a("conversion",e,"Product Added to Cart")}}">
        Add to Cart +
      </button>
    </article>`}}),m=c.widgets.pagination({container:"#pagination"}),x=[g,p,w,m];h.addWidgets(x),h.use(s),h.start();