"""
String formatting and text processing utilities
"""

def capitalize_words(text):
    """Capitalize first letter of each word"""
    return ' '.join(word.capitalize() for word in text.split())

def title_case(text):
    """Convert text to title case"""
    return text.title()

def snake_case(text):
    """Convert text to snake_case"""
    return text.lower().replace(' ', '_').replace('-', '_')

def camel_case(text):
    """Convert text to camelCase"""
    words = text.split()
    return words[0].lower() + ''.join(word.capitalize() for word in words[1:])

def kebab_case(text):
    """Convert text to kebab-case"""
    return text.lower().replace(' ', '-').replace('_', '-')

def truncate(text, length, suffix="..."):
    """Truncate text to specified length"""
    if len(text) <= length:
        return text
    return text[:length - len(suffix)] + suffix

def repeat_string(text, count):
    """Repeat string n times"""
    return text * count

def remove_duplicates_chars(text):
    """Remove duplicate characters while preserving order"""
    seen = set()
    result = []
    for char in text:
        if char not in seen:
            seen.add(char)
            result.append(char)
    return ''.join(result)

if __name__ == "__main__":
    text = "hello world programming"
    print(f"Capitalize: {capitalize_words(text)}")
    print(f"Title case: {title_case(text)}")
    print(f"Snake case: {snake_case(text)}")
    print(f"Camel case: {camel_case(text)}")
    print(f"Kebab case: {kebab_case(text)}")
    print(f"Truncate: {truncate('This is a long text', 10)}")
    print(f"Remove duplicates: {remove_duplicates_chars('aabbccdd')}")