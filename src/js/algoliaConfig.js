// Getting Dependencies from window
const { algoliasearch, aa } = window;

// Dev mode detector
const environment = process.env.NODE_ENV || false;

// Algolia Credentials
const appId = 'HLT7I6OQRX';
const apiKey = 'fbd3ce4b101f6f5c43320714127b53a4';

// Initializing Search Client
const clientBase = algoliasearch(appId, apiKey);
export const searchClient = { ...clientBase, ...clientProxy(clientBase) };

// Insights Analytics Client Initialization
aa("init", { appId, apiKey, useCookie: true });
// Set token for both Authenticated or unauthenticated users.
// aa('setUserToken', 'ma-user-999');

// Insights Client
export const insightsClient = aa;

// create and export middleware
export const insightsMiddleware = window.instantsearch ? instantsearch.middlewares.createInsightsMiddleware({ insightsClient: aa }) : {};

// Configure your indices here
export const searchConfig = preProcessConfig({
  recordsIndex: "main_search",
  noResultsIndex: "main_search",
  suggestionsIndex: "main_search_query_suggestions",
  searchPagePath: "https://www.uiw.edu/search/index.html",
  autocompleteTags: {
    recordsSearch: ['autocomplete-search'],
    nonResults: ['autocomplete-non-results'],
  },
  instantSearchTags: {
    recordsSearch: ['ais-results-page'],
    nonResults: ['ais-non-results-page'],
  },
});

// Export channel subscription
export const pubsub = new PubSub();


/**
 * Advance Algolia client config overrider.
 * @param {*} clientBase
 * @returns
 */
function clientProxy(clientBase) {
  return {
    search(requests) {
      const refinedRequests = requests.map(request => {
        // Get the non-results query from instant search and remove the instantSearch inherited tags
        if (request.indexName == searchConfig.noResultsIndex && request.params && request.params.ruleContexts) {
          const isNonResultsTagged = request.params.ruleContexts.find(context => searchConfig.instantSearchTags.nonResults.includes(context));
          if (isNonResultsTagged) {
            request.params.ruleContexts = request.params.ruleContexts.filter(context => {
              return !searchConfig.instantSearchTags.recordsSearch.includes(context);
            })
          }
        }
        return request;
      })
      return clientBase.search(refinedRequests);
    }
  };
}

/**
 * Controls configuration for local development ease
 * @param {} config
 */
function preProcessConfig(config) {
  if (environment === 'development') {
    return {
      ...config,
      searchPagePath: '/search.html'
    }
  }
  return config;
}