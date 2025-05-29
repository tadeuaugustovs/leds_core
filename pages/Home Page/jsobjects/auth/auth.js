export default {
  async verificarAcesso() {
    // Verifica se existe algo na store
    const usuarioSalvo = appsmith.store.usuario;

    // Se não existir, redireciona
    if (!usuarioSalvo || !usuarioSalvo.email) {
      navigateTo("authentication-68375c2c56cad916c8fc38f1", "SAME_WINDOW");
      return;
    }

    // Faz nova consulta ao Strapi confirmando que o usuário ainda está ativo
    const url = `http://10.128.128.20:1337/api/usuarios?filters[email][$eq]=${usuarioSalvo.email}&filters[status][$eq]=Published`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      const usuarioValido = json?.data?.length > 0;

      if (!usuarioValido) {
        clearStore();
        navigateTo("authentication-68375c2c56cad916c8fc38f1", "SAME_WINDOW");
      }
    } catch (e) {
      showAlert("Erro ao verificar login", "error");
      clearStore();
      navigateTo("authentication-68375c2c56cad916c8fc38f1", "SAME_WINDOW");
    }
  }
};
