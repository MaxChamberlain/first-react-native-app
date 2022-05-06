const axios = require("axios");

export async function getData(method, table, filter, criteria) {

  let query = {
    "collection": table,
    "database": "vishi",
    "dataSource": "Cluster0"
  }

  if(filter !== ''){
    query = {
      "collection": table,
      "database": "vishi",
      "dataSource": "Cluster0",
      "filter": filter
    }
  }

  if(criteria) {
    if(criteria.update){
      query = {
        "collection": table,
        "database": "vishi",
        "dataSource": "Cluster0",
        "filter": filter,
        "update": criteria.update
      }
    }
    if(criteria.document) {
      query = {
        "collection": table,
        "database": "vishi",
        "dataSource": "Cluster0",
        "document": criteria.document
      }
    }
  }
  
  let config = {
    method: 'post',
    url: `https://data.mongodb-api.com/app/data-ildvi/endpoint/data/beta/action/${method}`,
    headers: { 
      'Content-Type': 'application/json', 
      'Access-Control-Request-Headers': '*', 
      'api-key': 'eSadkyvFObiGHVJuAcXtG0jNFrq3oGBaEnAOrkbtUXTLCC8PFXKZn9KFkoYKKzrT'
    },
    data : query
  }

  const res = await axios(config)
  return await res
}