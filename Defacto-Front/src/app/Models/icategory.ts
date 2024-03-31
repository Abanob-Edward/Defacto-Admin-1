export interface ICategory {
    id: number;
    name: string;
    subCategory: number | null;
    description: string | null;
    categoryImage: File | null;
}
