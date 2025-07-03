export default {
  async verificarAcesso(email, senha) {
    if (!email || !senha) {
      throw new Error("Preencha o email e a senha.");
    }

    const resposta = await LogarUsuario.run();
    const usuarios = resposta?.data || [];

    // Garante que vai procurar corretamente
    const usuario = usuarios.find(
      u => u.email?.trim().toLowerCase() === email.toLowerCase() &&
           u.senha === senha
    );

    if (!usuario) {
      throw new Error("Email ou senha inválidos.");
    }

    await storeValue("usuario", usuario);
    return usuario;
  }
}
