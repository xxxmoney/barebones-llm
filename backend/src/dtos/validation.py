from pydantic import SerializeAsAny
from src.dtos.base import BaseDto

class ValidationDto(BaseDto):
    is_valid: bool
    fields: SerializeAsAny[BaseDto]

class ValidableDto[T: BaseDto](BaseDto):
    value: T
    validation: ValidationDto

