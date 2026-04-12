"""
List and dictionary operations
"""

def flatten_list(nested_list):
    """Flatten a nested list"""
    result = []
    for item in nested_list:
        if isinstance(item, list):
            result.extend(flatten_list(item))
        else:
            result.append(item)
    return result

def merge_dicts(*dicts):
    """Merge multiple dictionaries"""
    result = {}
    for d in dicts:
        result.update(d)
    return result

def remove_duplicates(items):
    """Remove duplicates while preserving order"""
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

def group_by_key(items, key):
    """Group items by a specific key"""
    groups = {}
    for item in items:
        k = item.get(key)
        if k not in groups:
            groups[k] = []
        groups[k].append(item)
    return groups

if __name__ == "__main__":
    nested = [1, [2, 3, [4, 5]], 6]
    print(f"Flatten: {flatten_list(nested)}")
    
    dict1 = {"a": 1, "b": 2}
    dict2 = {"c": 3, "d": 4}
    print(f"Merged dicts: {merge_dicts(dict1, dict2)}")
    
    items = [1, 2, 2, 3, 3, 3, 4]
    print(f"Remove duplicates: {remove_duplicates(items)}")