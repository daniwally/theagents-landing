// Airtable Utilities para Finanzas Wally
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || "pat8D4hEPif0EGgmR.af70bfd89f11d126e8b5ab807f47701b2e596acaeb910f874744ba537f29711e";
const BASE_ID = "appK3sEL2Z2NLcQnA";
const TABLE_ID = "tbl8B9PKPUnYcW4Va";

// Función para obtener vencimientos próximos
async function getVencimientosProximos() {
    const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?filterByFormula=AND(FIND("Vencimiento:", {Notes}), {Status} != "Done")`, {
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`
        }
    });
    
    const data = await response.json();
    return data.records;
}

// Función para agregar gasto
async function addGasto(fecha, banco, tarjeta, concepto, monto, vencimiento, mes) {
    const notes = `Fecha: ${fecha}
Banco: ${banco}
Tarjeta: ${tarjeta}
Monto: ${monto}
${concepto ? `Concepto: ${concepto}` : ''}
${vencimiento ? `Vencimiento: ${vencimiento}` : ''}
Mes: ${mes}`;

    const record = {
        fields: {
            Name: `${banco} ${tarjeta} - ${concepto}`,
            Notes: notes,
            Status: "Todo"
        }
    };

    const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ records: [record] })
    });

    return await response.json();
}

module.exports = { getVencimientosProximos, addGasto };