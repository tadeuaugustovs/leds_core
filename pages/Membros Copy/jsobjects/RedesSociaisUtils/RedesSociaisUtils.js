export default {
  async atualizarRedeSocial(row) {
    const tipo = row?.nome?.toLowerCase(); // usa 'nome' como chave
    const valor = row?.valor;

    if (!tipo || !valor) {
      showAlert("Preencha todos os campos!", "warning");
      return;
    }

    const membro = getMembrosByDocumentId.data?.[0];
    if (!membro) {
      showAlert("Membro não carregado!", "error");
      return;
    }

    const payload = {
      data: {
        ...membro,
        [tipo]: valor
      }
    };

    return updateMembro.run({
      body: JSON.stringify(payload)
    }).then(() => {
      showAlert(`${tipo} atualizado com sucesso!`, "success");
      getMembrosByDocumentId.run(); // Recarrega os dados do membro
    }).catch(() => {
      showAlert("Erro ao atualizar a rede social.", "error");
    });
  }
}
