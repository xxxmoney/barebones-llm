
# Backend for Self Learning App

## Getting started
- Set up [Poetry](https://python-poetry.org) on your machine
- There is already an included `poetry.toml` to set up local .venv in the project
- Run `poetry install` - sets up .venv and downloads dependencies
- Start with `poetry run dev`

## Solving issues with .venv
- Check the current .venv `poetry env info --path`
- Remove venvs `poetry env remove --all` (also need to remove the physical path to the venv)

