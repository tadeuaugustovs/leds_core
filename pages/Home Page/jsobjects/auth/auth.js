export default {
  /**
   * Verifica se o usuário está logado e redireciona se não estiver
   * Use em `onPageLoad` nas páginas protegidas
   */
  protegerPagina() {
    if (!appsmith.store.user) {
      navigateTo("authentication-68375c2c56cad916c8fc38f1", "SAME_WINDOW");
    }
  },

  /**
   * Faz login do usuário com base na query LoginUsuario
   * Salva o usuário e redireciona para Home
   */
  async login() {
    try {
      await LoginUsuario.run();
      const usuario = LoginUsuario.data?.data?.[0];

      if (usuario) {
        storeValue("user", usuario);
        navigateTo("home-page-6824f0605d08da37cb928219", "SAME_WINDOW");
      } else {
        showAlert("Email ou senha incorretos", "error");
      }
    } catch (err) {
      showAlert("Erro na autenticação: " + err.message, "error");
    }
  },

  /**
   * Função para deslogar
   * Limpa a store e redireciona para o login
   */
  logout() {
    clearStore();
    navigateTo("authentication-68375c2c56cad916c8fc38f1", "SAME_WINDOW");
  },
};
