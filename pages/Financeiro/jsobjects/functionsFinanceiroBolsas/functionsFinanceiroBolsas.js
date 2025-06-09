export default {
  async salvarControleDeBolsa() {
    const docId = appsmith.store.projetoSelecionadoDocumentId;
    const valorTotal = Number(InputValorTotal.text?.replace(/[^\d.-]+/g,"")) || 0;

    const controleExistente = getControleBolsaDoProjeto.data?.data?.find(
      item => item.projeto?.data?.id === docId || item.projeto?.documentId === docId
    );

    const payload = {
      data: {
        valor_total: valorTotal,
        projeto: {
          connect: [{ documentId: docId }]
        }
      }
    };

    try {
      if (controleExistente) {
        await updateControleBolsa.run({
          pathParams: { id: controleExistente.id },
          body: payload
        });
        showAlert("Valor atualizado com sucesso!", "success");
      } else {
        await postControleBolsa.run({
          body: payload
        });
        showAlert("Valor criado com sucesso!", "success");
      }

      // Atualiza o dado novamente após salvar
      await getControleBolsaDoProjeto.run();

    } catch (error) {
      showAlert("Erro ao salvar: " + error.message, "error");
    }
  }
}
