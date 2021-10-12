const API_URL = process.env.REACT_APP_API_URL;

class Items {
  static async get() {
    const itemsUrl = `${API_URL}/items`;

    const response = await fetch(itemsUrl, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Items could not be retrieved.');
    }
  }
}

export default Items;
