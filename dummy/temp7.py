"""
File and JSON handling utilities
"""

import json
from pathlib import Path

def read_json_file(filepath):
    """Read and parse JSON file"""
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {"error": "File not found"}
    except json.JSONDecodeError:
        return {"error": "Invalid JSON"}

def write_json_file(filepath, data):
    """Write data to JSON file"""
    try:
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)
        return {"status": "success"}
    except Exception as e:
        return {"error": str(e)}

def file_exists(filepath):
    """Check if file exists"""
    return Path(filepath).exists()

def get_file_size(filepath):
    """Get file size in bytes"""
    try:
        return Path(filepath).stat().st_size
    except FileNotFoundError:
        return None

def list_directory(dirpath):
    """List all files in directory"""
    try:
        return [str(f) for f in Path(dirpath).iterdir()]
    except FileNotFoundError:
        return []

if __name__ == "__main__":
    print("File & JSON utilities loaded successfully")
    sample_data = {"name": "test", "value": 123}
    print(f"Sample data: {sample_data}")