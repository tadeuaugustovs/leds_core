export default {
  myFun1: () => {
    if (!appsmith.store.user || Object.keys(appsmith.store.user).length === 0) {
      navigateTo("Authentication", "SAME_WINDOW");
    }
  }
}
