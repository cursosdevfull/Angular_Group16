import { IMetadata } from '../../shared/components/table/table.component';

export abstract class ComponentBase<
  ItemEntity,
  Entity extends Array<ItemEntity>
> {
  abstract dataOriginal: Entity;
  abstract metadata: IMetadata[];
  pageSize = 20;
  currentPage = 0;
  data: Entity = [] as unknown as Entity;

  loadPage(page: number) {
    this.currentPage = page;
    this.data = this.dataOriginal.slice(
      page * this.pageSize,
      page * this.pageSize + this.pageSize
    ) as unknown as Entity;
  }
}
