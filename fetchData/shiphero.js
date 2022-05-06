const axios = require('axios');

export async function get (gQuery){
        const token = await refreshToken()
        const res = await axios({
            url: 'https://stark-oasis-84035.herokuapp.com/' + 'https://public-api.shiphero.com/graphql',
            method: 'post',
            headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'x-requested-with': 'XmlHttpRequest'
            },
            data: {query: gQuery}
        });
        const data = await res;
        return(JSON.stringify(data, undefined, 2))
}

export async function getOrder (gQuery){
    const token = await refreshToken()
    const res = await axios({
        url: 'https://stark-oasis-84035.herokuapp.com/' + 'https://public-api.shiphero.com/graphql',
        method: 'post',
        headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'x-requested-with': 'XmlHttpRequest'
        },
        data: {query: gQuery}
    });
    const data = await res;
    return(JSON.stringify(data, undefined, 2))
}

async function refreshToken(){
    const token = await axios({
        url: 'https://public-api.shiphero.com/auth/refresh',
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            "refresh_token": 'IH-o3MWEsI_Aoc5xI7BztYtkVegitjB6mznms6itJqL7g'
        }
    })
    return token.data.access_token
}
