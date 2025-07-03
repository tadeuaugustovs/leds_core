export default {
  async verificarAcesso(email, senha) {
    const resposta = await LogarUsuario.run();

    const usuario = resposta?.data?.find(
      u => u.email === email && u.senha === senha
    );

    if (!usuario) {
      throw new Error("Usuário ou senha inválidos.");
    }

    await storeValue("usuario", usuario);

    window.localStorage.setItem("usuario", JSON.stringify(usuario));

    return usuario;
  }
};
