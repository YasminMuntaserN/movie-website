
export class Movie {
  id;
  image;
  name;
  rating;
  prodectionDate;
  story;
  type;
  
  constructor(id, name, image, prodectionDate, rating, story,type) {
      this.id = id;
      this.name = name;
      this.image = image;
      this.prodectionDate = prodectionDate;
      this.rating = rating;
      this.story = story;
      this.type = type;
  }
}
