const mdlAlocados = require("../model/mdlAlocados");

async function GetAllAlocados(req, res) {
    const registro = await mdlAlocados.GetAllAlocados();
    res.json({ status: "ok", registro });
}

async function GetAlocadoByID(req, res) {
    const id = parseInt(req.params.alocadoid);
    const registro = await mdlAlocados.GetAlocadoByID(id);
    res.json({ status: "ok", registro });
}

async function InsertAlocado(req, res) {
    const registro = req.body;
    registro.datafinal = registro.datafinal || null;
    const result = await mdlAlocados.InsertAlocado(registro);
    res.json({ status: "ok", ...result });
}

async function UpdateAlocado(req, res) {
    const id = parseInt(req.params.alocadoid);
    const registro = req.body;
    registro.datafinal = registro.datafinal || null;
    const result = await mdlAlocados.UpdateAlocado(id, registro);
    res.json({ status: "ok", ...result });
}

async function DeleteAlocado(req, res) {
    const id = parseInt(req.params.alocadoid);
    const result = await mdlAlocados.DeleteAlocado(id);
    res.json({ status: "ok", ...result });
}

module.exports = { GetAllAlocados, GetAlocadoByID, InsertAlocado, UpdateAlocado, DeleteAlocado };
