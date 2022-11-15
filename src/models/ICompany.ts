export interface ICompany {
    id: number;
    title: string;
    address: string;
    count: number;
    total_pages: number;
}

export interface ListResponse<T> {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: T[]
}