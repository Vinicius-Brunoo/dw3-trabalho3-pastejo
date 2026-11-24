const db = require("../../../database/databaseconfig");

async function GetCredencial(username, password) {
    const result = await db.query(
        "SELECT username, password = crypt($2, password) AS senha_valida FROM usuarios WHERE username = $1 AND removido = false",
        [username, password]
    );
    return result.rows;
}

module.exports = { GetCredencial };
