
# Backend

## Getting started
- Set up python correctly - recommended usage of [pyenv](https://github.com/pyenv-win/pyenv-win)
  - Version `3.12.0`
- Set up [Poetry](https://python-poetry.org) on your machine
- There is already an included `poetry.toml` to set up local .venv in the project
- Run `poetry install` - sets up .venv and downloads dependencies
- Start with `poetry run dev`
- Should run at `http://localhost:5000`

## Running poe tasks
- Build: `poetry run poe build`

## Resolving issues
- .venv
  - Check the current .venv `poetry env info --path`
  - Remove venvs `poetry env remove --all` (also need to remove the physical path to the venv)
- Stuck process
  - If you experience that the app's code is not updated even after restart (all the more if using `uvicorn` reload), the process is probably stuck
  - Try using these scripts:
    - `kill_process.ps1` - tries to kill the process it can find by port 5000
    - `list_processes.ps1` - get to know which processes may be used by port 5000 (listening)
    - `restart_winnat.ps1` if neither of them works, try using this one
    - Finally, if none works, restart the system

## Endpoints
- Endpoints can be tested at `/docs`

