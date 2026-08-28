from typing import Dict
from src.dtos.base import BaseDto

class ValidationDto(BaseDto):
    is_valid: bool
    fields: Dict[str, bool] = {}

class ValidableDto[T: BaseDto](BaseDto):
    value: T
    validation: ValidationDto

