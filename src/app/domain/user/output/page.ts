export class Page {
  constructor(
    public page: number,
    public size: number,
    public total: number,
    public content: any[],
    public totalPages: number,
  ) {}
}
