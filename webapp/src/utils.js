const IS_DEV = window.IS_DEV || false

export async function load (input, method='GET', body=null, init={}) {
    if (body) {
        body = JSON.stringify(body)
    }
    const r = await fetch('/api/' + input, {
        method,
        body,
        ...init,
        headers: {
            'mode': 'no-cors',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            ...(init.headers || {}),
        },
    })
    if (r.status >= 400) {
        throw new Error(r.statusText)
    }
    if (method == 'GET') {
        return await r.json()
    } else {
        return r
    }
}
