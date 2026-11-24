const mdlAnimais = require("../model/mdlAnimais");

async function GetAllAnimais(req, res) {
    const registro = await mdlAnimais.GetAllAnimais();
    res.json({ status: "ok", registro });
}

async function GetAnimalByID(req, res) {
    const id = parseInt(req.params.animalid);
    const registro = await mdlAnimais.GetAnimalByID(id);
    res.json({ status: "ok", registro });
}

async function InsertAnimal(req, res) {
    const registro = req.body;
    const result = await mdlAnimais.InsertAnimal(registro);
    res.json({ status: "ok", ...result });
}

async function UpdateAnimal(req, res) {
    const id = parseInt(req.params.animalid);
    const registro = req.body;
    const result = await mdlAnimais.UpdateAnimal(id, registro);
    res.json({ status: "ok", ...result });
}

async function DeleteAnimal(req, res) {
    const id = parseInt(req.params.animalid);
    const result = await mdlAnimais.DeleteAnimal(id);
    res.json({ status: "ok", ...result });
}

module.exports = { GetAllAnimais, GetAnimalByID, InsertAnimal, UpdateAnimal, DeleteAnimal };
