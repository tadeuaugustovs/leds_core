export default {
  verificarSessao() {
    const usuario = appsmith.store.usuario;

    if (!usuario || !usuario.email) {
      showAlert("Você precisa estar logado para acessar esta página.", "error");
      navigateTo("Authentication", "SAME_WINDOW");
      return false;
    }

    return true;
  }
}
