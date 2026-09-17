import os
from pathlib import Path
from platformdirs import user_data_dir
from src.constants.constants import APP_NAME

custom_user_data = os.getenv("USER_DATA_PATH")
user_data_path = Path(custom_user_data) if custom_user_data else Path(user_data_dir(appname=APP_NAME))
