const mdlPastos = require("../model/mdlPastos");

async function GetAllPastos(req, res) {
    const registro = await mdlPastos.GetAllPastos();
    res.json({ status: "ok", registro });
}

async function GetPastoByID(req, res) {
    const id = parseInt(req.params.pastoid);
    const registro = await mdlPastos.GetPastoByID(id);
    res.json({ status: "ok", registro });
}

async function InsertPasto(req, res) {
    const registro = req.body;
    const result = await mdlPastos.InsertPasto(registro);
    res.json({ status: "ok", ...result });
}

async function UpdatePasto(req, res) {
    const id = parseInt(req.params.pastoid);
    const registro = req.body;
    const result = await mdlPastos.UpdatePasto(id, registro);
    res.json({ status: "ok", ...result });
}

async function DeletePasto(req, res) {
    const id = parseInt(req.params.pastoid);
    const result = await mdlPastos.DeletePasto(id);
    if (result.linhasAfetadas === 0) {
        const registro = await mdlPastos.GetPastoByID(id);
        if (registro.length === 0) {
            return res.status(404).json({ message: "Registro não encontrado." });
        }
        return res.status(409).json({ message: "O pasto não foi removido porque tem piquetes vinculados." });
    }
    res.json({ status: "ok", ...result });
}

module.exports = { GetAllPastos, GetPastoByID, InsertPasto, UpdatePasto, DeletePasto };
