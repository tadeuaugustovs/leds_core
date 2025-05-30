export default {
  async verificarAcesso() {
    const usuarioSalvo = appsmith.store.usuario;

    if (!usuarioSalvo || !usuarioSalvo.email) {
      clearStore();
      navigateTo("Authentication", "SAME_WINDOW");
      return false;
    }

    const url = `http://10.128.128.20:1337/api/usuarios?filters[email][$eq]=${encodeURIComponent(usuarioSalvo.email)}&pagination[pageSize]=1`;

    try {
      const response = await fetch(url, {
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        throw new Error("Falha ao consultar o backend");
      }

      const json = await response.json();
      const usuarioValido = json?.data?.length > 0;

      if (!usuarioValido) {
        clearStore();
        navigateTo("Authentication", "SAME_WINDOW");
        return false;
      }

      return true;
    } catch (e) {
      showAlert("Erro ao verificar acesso: " + e.message, "error");
      clearStore();
      navigateTo("Authentication", "SAME_WINDOW");
      return false;
    }
  },

  __forcarExecucao__: (async () => {
    await this.verificarAcesso();
  })()
}
