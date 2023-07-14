const{algoliasearch:e,aa:t}=window,a="latency",n="6be0576ff61c053d5f9a3225e2a90f76",s=e(a,n);t("init",{appId:a,apiKey:n}),t("setUserToken","ma-user-999"),window.instantsearch&&instantsearch.middlewares.createInsightsMiddleware({insightsClient:t});const i={catalogId:"products",catalogLabel:"All Products",recordsIndex:"instant_search",noResultsIndex:"instant_search",suggestionsIndex:"instant_search_demo_query_suggestions",searchPagePath:"/product-search-results"},o=new PubSub;function l(e,t){return e.length?e.find(e=>e.source.sourceId===t):null}const{autocomplete:r,getAlgoliaResults:c}=window["@algolia/autocomplete-js"],{createLocalStorageRecentSearchesPlugin:u}=window["@algolia/autocomplete-plugin-recent-searches"],{createAlgoliaInsightsPlugin:d}=window["@algolia/autocomplete-plugin-algolia-insights"],{createQuerySuggestionsPlugin:g}=window["@algolia/autocomplete-plugin-query-suggestions"],{createRedirectUrlPlugin:h}=window["@algolia/autocomplete-plugin-redirect-url"],m=d({insightsClient:t}),p=u({key:"navbar",limit:3,transformSource:({source:e})=>({...e,onSelect({state:e}){y(e)}})}),w=h({transformResponse:function(e){""!==e.query&&e.renderingContent&&e.renderingContent.redirect&&(window.location.href=e.renderingContent.redirect.url)}}),P=g({searchClient:s,indexName:i.suggestionsIndex,limit:6,transformSource:({source:e})=>({...e,onSelect({state:e}){y(e)}})});function S(e){let{item:t,components:a,html:n,state:s}=e;return n`
    <div class="aa-ItemWrapper">
    <div class="aa-ItemContent" onClick="${e=>{e.preventDefault(),console.log("Implementing this later!!")}}">
      <div class="aa-ItemContentImage">
        <img
          src="${t.image}"
          alt="${t.name}"
        />
      </div>
      <div class="aa-ItemContentBody">
        <div class="aa-ItemContentDescription">
          ${t.product_type}
        </div>
        <div class="aa-ProductItemContentFooter">
          <div class="aa-ItemContentTitle">
            ${a.Highlight({hit:t,attribute:"title"})}
          </div>
          <div class="aa-ItemContentDescription">
            ${`$${t.price.toFixed(2)}`}
          </div>
        </div>
      </div>
    </div>
  </div>`}function v({state:e,html:t,components:a}){let{context:n}=e,{noResultsHits:s,query:i}=n;return t`
      <ul class="aa-List" role="listbox" aria-labelledby="autocomplete-4-1-label" id="autocomplete-4-1-list">
      ${s.map(n=>t`
          <li class="aa-Item" id="autocomplete-4-1-item-1" role="option" aria-selected="false">
            ${S({item:n,components:a,html:t,state:e})}
          </li >`)}
      </ul>`}const y=e=>{e.query&&function(e,t){let a=new URLSearchParams(window.location.search);a.set("q",t);let n=window.location.origin+window.location.pathname+"?"+a.toString();window.history.replaceState({path:n},"",n)}(0,e.query),window.location.pathname!==i.searchPagePath?e.query?window.location.assign(`${i.searchPagePath}?q=${e.query}`):window.location.assign(`${i.searchPagePath}`):(console.log("Sending evnt!!",e.query),o.publish("QUERY_UPDATE_EVT",{query:e.query?e.query:"",index:i.recordsIndex}))};r({container:"#autocomplete__container",placeholder:"Search for manly goodness",openOnFocus:!0,insights:!0,onSubmit({state:e}){y(e)},render(e,t){let{elements:a,render:n,html:s,state:o}=e,{hitsPerPage:r,nbHits:c,query:u,navigator:d}=o.context,{recentSearchesPlugin:g,querySuggestionsPlugin:h,products:m,staticLinks:p}=a,w="Most Popular";u&&""!=u&&c>0?w=`${r} out of ${c} results for "${u}"`:u&&""!=u&&0==c&&(w=s`<span class="gutter"></span>No results found for <span class="highlighted-text"> "${u}"</span>, but take a look on our top sellers`),n(s`
          <div class="aa-PanelLayout aa-Panel--scrollable">
            <div class="aa-SearchPanel">
              <div class="aa-PanelSections">
                <div class="aa-PanelSection--left">
                    ${l(o.collections,"recentSearchesPlugin")&&l(o.collections,"recentSearchesPlugin").items.length>0?[s`<h2>Recent Searches</h2>`,g]:[]}
                  ${l(o.collections,"querySuggestionsPlugin")&&l(o.collections,"querySuggestionsPlugin").items.length>0?[s`<h2>Popular Searches</h2>`,h]:[]}
                </div >
                <div class="aa-PanelSection--right aa-Products">
                 <h2>${w} <span class="aa-SubmitSearch--link" onClick="${e=>{e.preventDefault(),o.query?window.location.href=`${i.searchPagePath}?q=${o.query}`:window.location.href=`${i.searchPagePath}`}}">See All</span></h2>
                  ${m}
                  ${p}
                </div>
              </div >
           </div>
          </div > `,t)},plugins:[p,P,m,w],initialState:{query:new URL(window.location).searchParams.get("q")||""},getSources:({query:e,setContext:t})=>[{sourceId:"products",panelPlacement:"full-width",getItems:()=>c({searchClient:s,queries:[{indexName:i.recordsIndex,query:e,params:{hitsPerPage:4,attributesToSnippet:["name:10","description:35"],snippetEllipsisText:"…"}},{indexName:i.noResultsIndex,query:"",params:{hitsPerPage:4,attributesToSnippet:["name:10","description:35"],snippetEllipsisText:"…"}}],getItemUrl:({item:e})=>e.url}),templates:{item:S,noResults:v}},{sourceId:"staticLinks",getItems:()=>[{label:"Some Static Link to FAQ",url:"https://www.google.com"},{label:"Other Link to Privacy Policies",url:"https://www.google.com"}],getItemUrl:({item:e})=>e.url,templates:{header:()=>"Check this links out!",item:({item:e,html:t})=>t`
              <div class="aa-ItemWrapper custom-source__container">
                <a class="custom-source__a text-sm text-blue-500" href="${e.url}">
                  ${e.label} >>>
                </a>
              </div>
            `,noResults:()=>"No matching Amazing LINKS."}}]});