export default {
  abrirModalDoItemSelecionado(row) {
    if (!row || !row.documentId) {
      showAlert("Erro: item inválido ou não encontrado.", "error");
      return;
    }

    const docId = row.documentId;

    const itensRelacionados = getItensDoFluxoCompleto.data?.data?.filter(
      item => item?.capital_custeio_item?.documentId === docId
    ) || [];

    storeValue("documentoDoItemSelecionado", docId);
    storeValue("itensSelecionados", itensRelacionados);

    showModal("VerItens");
  }
}
