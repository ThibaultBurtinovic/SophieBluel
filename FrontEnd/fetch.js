// Fonction qui effectue le fetch et renvoie les données
async function fetchData() {
    try {
      const response = await fetch('https://example.com/data');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
      return null;
    }
  }
  
  // Exportez la fonction pour qu'elle puisse être utilisée ailleurs
  export { fetchData };