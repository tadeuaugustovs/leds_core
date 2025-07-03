export default {
  async verificarAcesso() {
    const email = InputEmail.text?.trim();
    const senha = InputSenha.text?.trim();

    const resposta = await LogarUsuario.run();

    // Busca um usuário com email e senha corretos
    const usuario = resposta?.data?.find(
      u => u.email === email && u.senha === senha
    );

    if (!usuario) {
      throw new Error("Usuário ou senha inválidos.");
    }

    // Salva no store para esta sessão
    await storeValue("usuario", usuario);

    // Salva no localStorage para persistir entre reloads
    window.localStorage.setItem("usuario", JSON.stringify(usuario));

    return usuario;
  }
};
