# backend/app/core/logger.py

import logging
import os
from logging.handlers import RotatingFileHandler

def setup_logger():
    """
    Configures and returns a logger instance.
    """
    # Create a logger
    logger = logging.getLogger("inventory_app")
    logger.setLevel(os.getenv("LOG_LEVEL", "INFO").upper())

    # Ensure the logs directory exists
    os.makedirs("logs", exist_ok=True)

    # Create a console handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(os.getenv("LOG_LEVEL", "INFO").upper())
    console_formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s", "%Y-%m-%d %H:%M:%S"
    )
    console_handler.setFormatter(console_formatter)

    # Create a file handler with log rotation
    file_handler = RotatingFileHandler(
        "logs/inventory_app.log", maxBytes=10 * 1024 * 1024, backupCount=5, encoding="utf8"
    )
    file_handler.setLevel("DEBUG")
    file_formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s", "%Y-%m-%d %H:%M:%S"
    )
    file_handler.setFormatter(file_formatter)

    # Add handlers to the logger if not already added
    if not logger.hasHandlers():
        logger.addHandler(console_handler)
        logger.addHandler(file_handler)

    return logger


# Instantiate the logger
logger = setup_logger()
