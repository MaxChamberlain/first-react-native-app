const axios = require('axios');
const proxy = process.env.REACT_APP_PROXY_URL
const endpoint = {
    request: process.env.REACT_APP_SH_REQUEST_URL, 
    refresh: process.env.REACT_APP_SH_REFRESH_URL
    }

export async function get (gQuery){
        const token = await refreshToken()
        const res = await axios({
            url: proxy + endpoint.request,
            method: 'post',
            headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'x-requested-with': 'XmlHttpRequest'
            },
            data: {query: gQuery}
        });
        const data = await res;
        console.log('Complexity:: ' + data.data.data.product.complexity)
        return(JSON.stringify(data, undefined, 2))
}

export async function getOrder (gQuery){
    const token = await refreshToken()
    const res = await axios({
        url: proxy + endpoint.request,
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
        url: proxy + endpoint.refresh,
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            "refresh_token": process.env.REACT_APP_SH_REFRESH_TOKEN
        }
    })
    return token.data.access_token
}
