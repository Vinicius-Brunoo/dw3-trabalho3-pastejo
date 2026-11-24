const mdlPiquetes = require("../model/mdlPiquetes");

async function GetAllPiquetes(req, res) {
    const registro = await mdlPiquetes.GetAllPiquetes();
    res.json({ status: "ok", registro });
}

async function GetPiqueteByID(req, res) {
    const id = parseInt(req.params.piqueteid);
    const registro = await mdlPiquetes.GetPiqueteByID(id);
    res.json({ status: "ok", registro });
}

async function InsertPiquete(req, res) {
    const registro = req.body;
    const result = await mdlPiquetes.InsertPiquete(registro);
    res.json({ status: "ok", ...result });
}

async function UpdatePiquete(req, res) {
    const id = parseInt(req.params.piqueteid);
    const registro = req.body;
    const result = await mdlPiquetes.UpdatePiquete(id, registro);
    res.json({ status: "ok", ...result });
}

async function DeletePiquete(req, res) {
    const id = parseInt(req.params.piqueteid);
    const result = await mdlPiquetes.DeletePiquete(id);
    res.json({ status: "ok", ...result });
}

module.exports = { GetAllPiquetes, GetPiqueteByID, InsertPiquete, UpdatePiquete, DeletePiquete };
