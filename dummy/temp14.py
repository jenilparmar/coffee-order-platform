"""
Configuration and logging utilities
"""

import json
from pathlib import Path

class Config:
    """Simple configuration management"""
    def __init__(self, config_file=None):
        self.config = {}
        if config_file:
            self.load(config_file)
    
    def load(self, config_file):
        """Load configuration from JSON file"""
        try:
            with open(config_file, 'r') as f:
                self.config = json.load(f)
        except FileNotFoundError:
            self.config = {}
    
    def save(self, config_file):
        """Save configuration to JSON file"""
        with open(config_file, 'w') as f:
            json.dump(self.config, f, indent=2)
    
    def get(self, key, default=None):
        """Get configuration value"""
        return self.config.get(key, default)
    
    def set(self, key, value):
        """Set configuration value"""
        self.config[key] = value
    
    def __repr__(self):
        return f"Config({self.config})"

class Logger:
    """Simple logging utility"""
    def __init__(self, name="Logger"):
        self.name = name
        self.messages = []
    
    def info(self, message):
        """Log info message"""
        log_msg = f"[INFO] {message}"
        self.messages.append(log_msg)
        print(log_msg)
    
    def warning(self, message):
        """Log warning message"""
        log_msg = f"[WARNING] {message}"
        self.messages.append(log_msg)
        print(log_msg)
    
    def error(self, message):
        """Log error message"""
        log_msg = f"[ERROR] {message}"
        self.messages.append(log_msg)
        print(log_msg)
    
    def debug(self, message):
        """Log debug message"""
        log_msg = f"[DEBUG] {message}"
        self.messages.append(log_msg)
        print(log_msg)
    
    def get_history(self):
        """Get all logged messages"""
        return self.messages

if __name__ == "__main__":
    logger = Logger("AppLogger")
    logger.info("Application started")
    logger.warning("This is a warning")
    logger.error("An error occurred")
    logger.debug("Debug information")
    
    config = Config()
    config.set("app_name", "CoffeeApp")
    config.set("debug_mode", True)
    print(config)