import logging
import sys
from typing import Optional
from datetime import datetime

class LoggingManager:
    """
    Centralized logging manager for the shelf-scanner application.
    Provides consistent logging format across the entire application.
    """
    
    _instance = None
    _initialized = False
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(LoggingManager, cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        if not self._initialized:
            self.logger = logging.getLogger('shelf_scanner')
            self.logger.setLevel(logging.DEBUG)  # Set to lowest level, handlers will filter
            
            # Create formatter with level, filename:line_no and other necessary details
            formatter = logging.Formatter(
                '%(asctime)s - %(levelname)s - %(filename)s:%(lineno)d - %(funcName)s - %(message)s',
                datefmt='%Y-%m-%d %H:%M:%S'
            )
            
            # Console handler
            console_handler = logging.StreamHandler(sys.stdout)
            console_handler.setFormatter(formatter)
            self.logger.addHandler(console_handler)
            
            # File handler
            file_handler = logging.FileHandler('server.log')
            file_handler.setFormatter(formatter)
            self.logger.addHandler(file_handler)
            
            # Set default level to INFO
            self.set_level(logging.INFO)
            
            self._initialized = True
    
    def set_level(self, level: int):
        """Set the logging level for all handlers."""
        self.logger.setLevel(level)
        for handler in self.logger.handlers:
            handler.setLevel(level)
    
    def get_current_level(self) -> int:
        """Get the current logging level."""
        return self.logger.level
    
    def info(self, message: str, *args, **kwargs):
        """Log an info message."""
        self.logger.info(message, *args, **kwargs)
    
    def debug(self, message: str, *args, **kwargs):
        """Log a debug message."""
        self.logger.debug(message, *args, **kwargs)
    
    def warning(self, message: str, *args, **kwargs):
        """Log a warning message."""
        self.logger.warning(message, *args, **kwargs)
    
    def error(self, message: str, *args, **kwargs):
        """Log an error message."""
        self.logger.error(message, *args, **kwargs)
    
    def critical(self, message: str, *args, **kwargs):
        """Log a critical message."""
        self.logger.critical(message, *args, **kwargs)

# Global logger instance
logger = LoggingManager()

def get_logger() -> LoggingManager:
    """Get the global logger instance."""
    return logger
