
export class Movie {
  id;
  image;
  name;
  rating;
  year;
  story;
  type;
  
  constructor(id, name, image, year, rating, story,type) {
      this.id = id;
      this.name = name;
      this.image = image;
      this.year = year;
      this.rating = rating;
      this.story = story;
      this.type = type;
  }
}
