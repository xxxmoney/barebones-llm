from src.dtos.base import BaseDto

class ValidationFieldsDto(BaseDto):
    open_ai_url: bool = True
    open_ai_token: bool = True
    model: bool = True
    max_tokens: bool = True
    temperature: bool = True

class ValidationDto(BaseDto):
    is_valid: bool
    fields: ValidationFieldsDto = ValidationFieldsDto()
