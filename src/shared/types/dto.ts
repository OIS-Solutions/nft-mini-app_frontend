export type DtoResponse<T> = T & {
    id?: string;
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date | null,
};