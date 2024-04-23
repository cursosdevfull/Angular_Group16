import { Observable } from 'rxjs';

import { IMetadata } from '../../shared/components/table/table.component';

export abstract class ComponentBase<
  ItemEntity,
  Entity extends Array<ItemEntity>
> {
  //abstract dataOriginal: Entity;
  abstract metadata: IMetadata[];
  pageSize = 20;
  currentPage = 0;
  totalItems = 0;
  data: Entity = [] as unknown as Entity;

  constructor(
    protected app: {
      getByPage: (page: number, pageSize: number) => Observable<any>;
    }
  ) {}

  fetchData(currentPage: number) {
    this.currentPage = currentPage;
    this.app.getByPage(this.currentPage + 1, this.pageSize).subscribe({
      next: (response) => {
        this.data = response.data;
        this.totalItems = response.total;
      },
      error: (error) => console.log(error),
    });
  }
}
