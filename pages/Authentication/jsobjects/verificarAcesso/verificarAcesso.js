export default {
  async verificarAcesso() {
    const resposta = await LogarUsuario.run();
    const usuario = resposta?.data?.[0];

    if (!usuario) {
      throw new Error("Usuário não encontrado no sistema.");
    }

    await storeValue("usuario", usuario);
    return usuario;
  }
}
