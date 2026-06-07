
# Backend for Self Learning App

## Getting started
- Set up [Poetry](https://python-poetry.org) on your machine
- There is already an included `poetry.toml` to set up local .venv in the project
- Run `poetry install` - sets up .venv and downloads dependencies
- Start with `poetry run dev`
- By default, the backend should run at `http://localhost:5000` 

## Resolving issue
- .venv
  - Check the current .venv `poetry env info --path`
  - Remove venvs `poetry env remove --all` (also need to remove the physical path to the venv)
- Stuck process
  - If you experience that the app's code is not updated even after restart, the process is probably stuck
  - Try using these scripts:
    - `kill_process.ps1` - tries to kill the process it can find by port 5000
    - `kill_processes.ps1` - broader version of the above
    - `restart_winnat.ps1` if neither of them works, try using this one
    - finally, if none works, restart the system

## Endpoints
- Endpoints can be tested at `/docs`


 
