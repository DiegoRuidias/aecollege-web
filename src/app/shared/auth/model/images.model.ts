export class ImageModel {
    previewImageSrc: string; // URL de la imagen grande
    thumbnailImageSrc: string; // URL de la miniatura
    alt: string; // Texto alternativo
    title: string; // Título de la imagen
  
    constructor(
      previewImageSrc: string,
      thumbnailImageSrc: string,
      alt: string,
      title: string
    ) {
      this.previewImageSrc = previewImageSrc;
      this.thumbnailImageSrc = thumbnailImageSrc;
      this.alt = alt;
      this.title = title;
    }
  
    // Método estático para devolver las imágenes
    static getDefaultImages(): ImageModel[] {
      return [
        new ImageModel(
          '/layout/images/descubre.jpg',
          '/layout/images/descubre.jpg',
          'Imagen 1',
          'Título 1'
        ),
        new ImageModel(
          '/layout/images/descubre1.jpg',
          '/layout/images/descubre1.jpg',
          'Imagen 2',
          'Título 2'
        ),
        new ImageModel(
          '/layout/images/descubre2.jpg',
          '/layout/images/descubre2.jpg',
          'Imagen 3',
          'Título 3'
        )
      ];
    }
  }
  