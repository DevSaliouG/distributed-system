"const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';"
export const getProducts = async () => {
  try {
    const response = await fetch(`/api/products/`, {
      credentials: 'omit',
      mode: 'cors'
    });
    if (!response.ok) {
      throw new Error('Echec de la récupération des produits');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur récupération produits :', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(`/api/users/`, {
      credentials: 'omit',
      mode: 'cors'
    });
    if (!response.ok) {
      throw new Error('Echec de la récupération des utilisateurs');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur récupération utilisateurs :', error);
    throw error;
  }
};