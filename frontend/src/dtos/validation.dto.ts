
export interface ValidationDto {
    isValid: string;
    fields: Record<string, boolean>
}

export interface ValidableDto<T> {
    value: T;
    validation: ValidationDto;
}
