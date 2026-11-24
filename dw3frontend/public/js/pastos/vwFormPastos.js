dw3IniciarFormulario({
  formulario: 'frmPastos',
  lista: '/pastos',
  campos: ['pastoid', 'descricao', 'areatotal'],
  consultar: '/getPastoByID/',
  inserir: '/insertPasto',
  atualizar: '/updatePasto/',
  remover: '/deletePasto/'
});
