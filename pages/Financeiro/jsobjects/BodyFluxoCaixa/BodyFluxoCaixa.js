export default {
  getBody() {
    const receita = Number(InputReceita.text.replace(',', '.')) || 0;
    const despesa = Number(InputDespesa.text.replace(',', '.')) || 0;
    const saldoAtual = parseFloat(
      ContaCorrente.text
        .replace(/\s/g, '')
        .replace('R$', '')
        .replace(/\./g, '')
        .replace(',', '.')
    ) || 0;

    const body = {
      data: {
        descricao: InputDescricao.text,
        receita,
        despesa,
        contacorrente: saldoAtual,
        data: SelecionarData.selectedDate,
        situacao: InputSituacao.text || 'Executado'
      }
    };

    if (Select4.selectedOptionValue) {
      body.data.capital_custeio_item = {
        connect: [
          {
            documentId: Select4.selectedOptionValue
          }
        ]
      };
    }

    return body;
  }
};
