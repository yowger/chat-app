interface BasePagination {
    page: number
    limit: number
}

export interface Pagination extends BasePagination {
    totalItems: number
    totalPages: number
}

export interface PaginationInput extends BasePagination {}
