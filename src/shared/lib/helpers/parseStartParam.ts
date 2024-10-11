import { TStartParams } from "@/shared/types/webApp";

export function parseStartParam(startParam: string): TStartParams {
    const params = new URLSearchParams(startParam);
    const parsedObject: Record<string, string> = {};

    // Перебираем все параметры и добавляем их в объект
    params.forEach((value, key) => {
        parsedObject[key] = value;
    });

    return parsedObject;
}