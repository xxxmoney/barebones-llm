
FROM python:3.12.0-slim AS build

WORKDIR /app

RUN pip install poetry
RUN poetry config virtualenvs.create false

COPY pyproject.toml .
COPY poetry.lock .
RUN poetry install --no-root

COPY . .

RUN poetry install

EXPOSE 5000

CMD ["poetry", "run", "dev-backend-only"]
