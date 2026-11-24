dw3IniciarFormulario({
  formulario: 'frmPiquetes',
  lista: '/piquetes',
  campos: ['piqueteid', 'descricao', 'latitude', 'longitude', 'pastoidfk'],
  consultar: '/getPiqueteByID/',
  inserir: '/insertPiquete',
  atualizar: '/updatePiquete/',
  remover: '/deletePiquete/',
  opcoes: [
    { campo: 'pastoidfk', rota: '/getAllPastos', id: 'pastoid', texto: 'descricao' },
  ]
});
