var elasticsearch = require('elasticsearch');


var client = new elasticsearch.Client({
  host: "https://exnydh4945:7oq2rx1vg3@beech-51051932.eu-west-1.bonsaisearch.net",
});

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

var search = {
    def: function(from, size, el, order) {
        return client.search({
            body: {
            from,
            size,
    
            sort: [{
                [el]: {
                    order
                }
                }
    
            ]
            }
        })
    },
    
    multimatch: function(from, size, query, fields) {
        return client.search({
          body: {
            from,
            size,
            query: {
              function_score: {
                query: {
                  bool: {
                    should: {
                      multi_match: {
                        query,
                        fields,
                      }
                    },
    
                    filter: {  
                      "bool" : {
                          "must" : [
                              {"term": {"Read": "public"}},
                              {"term": {"Type": "subject"}},
                          ]
                      }
                    
                    }
                  }
    
                },
                field_value_factor: {
                  field: "Visits",
                  modifier: "log1p",
                  "factor": 0.1
                },
                boost_mode: "sum"
              }
            },
    
          }
        })
    },
    
    match: function(from, size, el, value, order) {
        return client.search({
            body: {
            from: from,
            size: size,
            query: {
                bool: {
                must: {
                    match: {
                      [el]: value
                    }
                },
    
                filter: {
                    term: {
                    "Read": "public"
                    },
                }
                }
            },
            sort: [{
                "Visits": {
                    "order": order
                }
                }
    
            ]
            }
        })
    }
}

export default search
