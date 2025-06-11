{{ 
  (() => {
    const url = currentRow.url;
    const win = window.open(url, '_blank');
    if (win) {
      win.focus();
    } else {
      showAlert("Pop-up bloqueado. Permita pop-ups no navegador.", "warning");
    }
  })()
}}
