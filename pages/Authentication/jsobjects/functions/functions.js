export default {
  defaultTab: "Sign In", // tem que bater com o nome exato da aba no tab_auth

  setDefaultTab: (newTab) => {
    this.defaultTab = newTab;
  },

  signIn: async () => {
    const email = InputEmail.text?.trim().toLowerCase();
    const senha = InputSenha.text;

    const resposta = await LoginUsuario.run();
    const usuario = resposta?.data?.find(u => u.email?.toLowerCase() === email);

    if (!usuario) {
      throw new Error("Email não encontrado");
    }

    if (usuario.senha !== senha) {
      throw new Error("Senha incorreta");
    }

    await storeValue("usuario", usuario);
    return usuario;
  }
};
