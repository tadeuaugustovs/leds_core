export default {
  defaultTab: "Sign In", // se estiver usando tab_auth

  setDefaultTab: (newTab) => {
    this.defaultTab = newTab;
  },

  signIn: async () => {
    const email = InputEmail.text?.trim().toLowerCase();
    const senha = InputSenha.text;

    const resposta = await LogarUsuario.run();
    const usuario = resposta?.data?.find(
      (u) => u.email?.toLowerCase() === email
    );

    if (!usuario) {
      throw new Error("Email não encontrado");
    }

    if ((usuario.senha || "").toString().trim() !== (senha || "").toString().trim()) {
      throw new Error("Senha incorreta");
    }

    await storeValue("usuario", usuario);
    return usuario;
  },

  verificarAcesso: async () => {
    const usuarioSalvo = appsmith.store.usuario;

    if (!usuarioSalvo || !usuarioSalvo.email) {
      clearStore();
      navigateTo("Authentication", "SAME_WINDOW");
      return false;
    }

    try {
      const resposta = await fetch(`https://strapi.conectafapes.leds.dev.br/api/usuarios?filters[email][$eq]=${encodeURIComponent(usuarioSalvo.email)}&pagination[pageSize]=1`);
      const dados = await resposta.json();

      if (!dados.data || dados.data.length === 0) {
        clearStore();
        navigateTo("Authentication", "SAME_WINDOW");
        return false;
      }

      return true;
    } catch (err) {
      showAlert("Erro ao verificar acesso: " + err.message, "error");
      return false;
    }
  }
};
