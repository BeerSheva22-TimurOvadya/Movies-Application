export async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    if (data.errors) {
        throw data.errors;
    }
    return data;
}

export async function saveData(url, method, body) {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    return response;
}


