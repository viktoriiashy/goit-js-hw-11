import axios from 'axios';

export async function getImages(name, page) {
  const baseUrl = `https://pixabay.com/api/?key=24502737-fca04681298a03fc6fb7dd619&q=${name}&per_page=40&page=${page}&image_type=photo&orientation=horizontal&safesearch=true`;
  return await axios.get(baseUrl);
}
