/**
 * 
 * O modelo de paginação pode mudar conforme o backend define. Paginação deve ser sempre realizada pelo backend.
 * 
*/

export class Paginator {
    constructor(
        private page: number,
        private size: number,
        private offset: number,
    ) {}
    setPage(page: number): void {
        this.page = page;
    }
    setSize(size: number): void {
        this.size = size;
    }
    setOffset(offset: number): void {
        this.offset = offset;
    }
}