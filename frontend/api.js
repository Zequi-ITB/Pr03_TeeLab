const API_CAMISETAS = 'http://localhost:3001/api/camisetas';
const API_COMANDAS = 'http://localhost:3001/api/comandas';


//Incidencias
async function getAllCamisetes(size, color, search, sort) {

    let url = `${API_CAMISETAS}?talla=${size}&color=${color}&q=${search}&sort=${sort}`
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Error HTTP ${res.status}`);
        }

        return await res.json();

    } catch (error) {
        console.error("Error:", error);
    }
}


async function createComanda(comanda) {
    let url = `${API_COMANDAS}`
    try {
         const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comanda)
        });
        if (!res.ok) {
            throw new Error(`Error HTTP ${res.status}`);
        }

        return await res.json();

    } catch (error) {
        console.error("Error:", error);
    }
}