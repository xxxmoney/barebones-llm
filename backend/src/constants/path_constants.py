from pathlib import Path
from platformdirs import user_data_dir
from src.constants.constants import APP_NAME

user_data_path = Path(user_data_dir(appname=APP_NAME))
