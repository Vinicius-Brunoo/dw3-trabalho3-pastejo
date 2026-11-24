function dw3IniciarFormulario(config) {
  document.addEventListener('DOMContentLoaded', async function () {
    if (!dw3IsLogged()) return;

    const form = document.getElementById(config.formulario);
    if (!form) return;

    const { servidorDw3, oper, id } = form.dataset;
    const botao = form.querySelector('button');
    const campo = (nome) => form.querySelector('#' + nome);
    if (botao) botao.disabled = true;
    if (oper === 'Read' || oper === 'Delete') dw3DesabilitarCampos(form);

    try {
      for (const opcao of config.opcoes || []) {
        const dados = await dw3RequisicaoFormulario(servidorDw3 + opcao.rota);
        if (!dados) return;
        for (const item of dados.registro) {
          campo(opcao.campo).add(new Option(item[opcao.texto], item[opcao.id]));
        }
      }

      if (oper !== 'Create') {
        const dados = await dw3RequisicaoFormulario(servidorDw3 + config.consultar + id);
        if (!dados) return;
        const registro = dados.registro[0];
        if (!registro) throw new Error('Registro não encontrado.');
        for (const nome of config.campos) campo(nome).value = registro[nome] ?? '';
      }
    } catch (erro) {
      alert(erro.message);
      return;
    }

    if (!botao) return;
    botao.disabled = false;
    botao.addEventListener('click', salvar);

    async function salvar() {
      let metodo, rota, corpo;

      if (oper === 'Delete') {
        if (!confirm('Confirma a remoção deste registro?')) return;
        metodo = 'DELETE';
        rota = config.remover + id;
      } else {
        if (!form.reportValidity()) return;

        if (oper === 'Create') {
          metodo = 'POST';
          rota = config.inserir;
        } else if (oper === 'Update') {
          metodo = 'PUT';
          rota = config.atualizar + id;
        } else {
          return;
        }

        corpo = {};
        for (const nome of config.campos.slice(1)) corpo[nome] = campo(nome).value;
      }

      botao.disabled = true;
      try {
        const dados = await dw3RequisicaoFormulario(servidorDw3 + rota, metodo, corpo);
        if (dados) window.location.href = config.lista;
      } catch (erro) {
        alert(erro.message);
      } finally {
        botao.disabled = false;
      }
    }
  });
}

async function dw3RequisicaoFormulario(url, method = 'GET', corpo) {
  const headers = dw3MontarHeadersAutenticacao(corpo ? { 'Content-Type': 'application/json' } : {});
  const resposta = await fetch(url, { method, headers, body: corpo ? JSON.stringify(corpo) : undefined });
  const dados = await resposta.json().catch(() => null);
  if (dados && !dw3TratarRespostaAutenticacao(dados)) return null;
  if (!resposta.ok || dados?.status !== 'ok') {
    throw new Error(dados?.message || 'Não foi possível concluir a operação.');
  }
  return dados;
}
