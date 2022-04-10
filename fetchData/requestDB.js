const axios = require("axios");

export async function getData(query) {
  const res = await axios({
    url: 'https://stark-oasis-84035.herokuapp.com/' + 'https://api.bit.io/api/v1beta/query/',
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'x-requested-with': 'XMLHttpRequest',
      Authorization: `Bearer 3DBUi_4uRgmbC5FKimFSNrHgfffuS`,
    },
    data: JSON.stringify({ query_string: query }),
  });
  const data = await res;
  return JSON.stringify(data) 
}