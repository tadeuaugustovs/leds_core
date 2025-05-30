export default {
  async verificarAcesso() {
    const usuarioSalvo = appsmith.store.usuario;

    // 1. Verificação básica da store
    if (!usuarioSalvo || !usuarioSalvo.email) {
      clearStore();
      navigateTo("authentication-68375c2c56cad916c8fc38f1", "SAME_WINDOW");
      return;
    }

    // 2. Monta URL da API do Strapi
    const url = `http://10.128.128.20:1337/api/usuarios?filters[email][$eq]=${encodeURIComponent(usuarioSalvo.email)}&pagination[pageSize]=1`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Falha ao consultar o backend");
      }

      const json = await response.json();
      const usuarioValido = json?.data?.length > 0;

      if (!usuarioValido) {
        clearStore();
        navigateTo("authentication-68375c2c56cad916c8fc38f1", "SAME_WINDOW");
      }
    } catch (e) {
      showAlert("Erro ao verificar acesso: " + e.message, "error");
      clearStore();
      navigateTo("authentication-68375c2c56cad916c8fc38f1", "SAME_WINDOW");
    }
  }
}
