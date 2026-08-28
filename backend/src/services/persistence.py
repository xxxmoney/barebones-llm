import shelve
from pathlib import Path
from src.constants.path_constants import user_data_path

class Persistence():
    _path: Path
    db: shelve.Shelf | None

    def __init__(self) -> None:
        self._path = user_data_path
        self.db = None

    def __enter__(self) -> "Persistence":
        self._path.parent.mkdir(parents=True, exist_ok=True)
        self.db = shelve.open(str(self._path))

        return self

    def __exit__(self, exc_type, exc_val, exc_tb) -> bool:
        if self.db is not None:
            self.db.close()

        return False

