export default {
  atualizarMembro: async () => {
    try {
      showAlert("Iniciando update...", "info");
      await updateMembro.run();
      showAlert("Update executado", "info");
      await getMembros.run();
      await getMembrosByDocumentId.run();
      closeModal("modalEditarMembro");
      showAlert("Membro atualizado com sucesso!", "success");
    } catch (e) {
      showAlert("Erro ao atualizar membro: " + e.message, "error");
      console.log("Erro no update:", e);
    }
  },

  salvarCampoEditado: async () => {
    const campo = Table2.updatedRow?.campo;
    const valor = Table2.updatedRow?.valor;
    const documentId = Table1?.selectedRow?.documentId;

    if (!campo || !documentId) {
      showAlert("Campo ou ID inválido", "error");
      console.log("DEBUG: campo:", campo, "documentId:", documentId);
      return;
    }

    // Se for campo fixo (já mapeado no Strapi), salva direto na API
    const camposFixos = ["github", "gitlab", "linkedin", "lattes", "discord"];
    const isCampoPadrao = camposFixos.includes(campo);

    try {
      if (isCampoPadrao) {
        const response = await fetch(`http://192.168.56.1:1337/api/membros/${documentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            data: {
              [campo]: valor
            }
          })
        });

        if (!response.ok) {
          const erro = await response.json();
          throw new Error(erro?.error?.message || "Erro ao atualizar");
        }

        storeValue("social_cache_" + campo, valor); // cache local
        await getMembrosByDocumentId.run();

        showAlert(`Campo "${campo}" atualizado para "${valor}" com sucesso!`, "success");
      } else {
        // Se for campo extra, salva no store para reexibir depois
        const custom = appsmith.store.social_custom || [];
        const atualizado = [
          ...custom.filter(r => r.campo !== campo),
          { campo, label: campo, valor }
        ];
        storeValue("social_custom", atualizado);
        showAlert(`Campo extra "${campo}" salvo localmente como "${valor}"`, "info");
      }
    } catch (e) {
      console.log("Erro ao salvar campo:", e);
      showAlert("Erro ao salvar campo: " + e.message, "error");
    }
  }
};
