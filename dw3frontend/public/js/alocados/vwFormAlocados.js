dw3IniciarFormulario({
  formulario: 'frmAlocados',
  lista: '/alocados',
  campos: ['alocadoid', 'animalidifk', 'piqueteidfk', 'datainicio', 'datafinal'],
  consultar: '/getAlocadoByID/',
  inserir: '/insertAlocado',
  atualizar: '/updateAlocado/',
  remover: '/deleteAlocado/',
  opcoes: [
    { campo: 'animalidifk', rota: '/getAllAnimais', id: 'animalid', texto: 'nome' },
    { campo: 'piqueteidfk', rota: '/getAllPiquetes', id: 'piqueteid', texto: 'descricao' },
  ]
});
