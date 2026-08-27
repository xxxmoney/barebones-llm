import pydantic

class BaseModel(pydantic.BaseModel):
    model_config = pydantic.ConfigDict(
        populate_by_name=True,
        from_attributes=True
    )

