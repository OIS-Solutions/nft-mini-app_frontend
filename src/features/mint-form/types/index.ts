export type TNftFormValues = {
    name: string,
    description?: string,
    image: string[]
}

export type TelegramUser = {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    photo_url?: string;
};

export type InitDataUnsafe = {
    user: TelegramUser;
    query_id?: string;
    auth_date: number;
    hash: string;
};

export type TFormDataDto = {
    name: string;
    image: string;
}
export type TFormData = {
    name: string;
    imageFile: File;
}