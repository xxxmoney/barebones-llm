import pydantic
from pydantic.alias_generators import to_camel

class BaseDto(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

