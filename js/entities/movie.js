
export class Movie {
  id;
  posterImage;
  backdropImage;
  name;
  rating;
  prodectionDate;
  story;
  type;
  runtime;
  
  constructor(id, name, posterImage,backdropImage, prodectionDate, rating, story,type,runtime) {
      this.id = id;
      this.name = name;
      this.posterImage = posterImage;
      this.backdropImage = backdropImage;
      this.prodectionDate = prodectionDate;
      this.rating = rating;
      this.story = story;
      this.type = type;
      this.runtime = runtime;
  }
}
