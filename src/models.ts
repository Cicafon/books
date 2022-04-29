export interface Book {
    id: number;
    author: string[];
    city: string;
    country: string;
    title: string;
    pages: number;
    year: number;
}

export interface FilterType {
    type: "all"; 
    values: string[] 
 }
 
 export interface FetchBookParamType {
   page: number;
   itemsPerPage?: number;
   filters?: FilterType[] | null | undefined;
 }