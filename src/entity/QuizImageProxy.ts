export default class QuizImageProxy {
  id: string
  originalImageId: string

  constructor(id: string, originalImageId: string) {
    this.id = id;
    this.originalImageId = originalImageId;
  }
}
