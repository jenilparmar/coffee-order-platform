"""
String manipulation utilities
"""

def reverse_string(text):
    """Reverse a string"""
    return text[::-1]

def count_vowels(text):
    """Count vowels in a string"""
    vowels = "aeiouAEIOU"
    return sum(1 for char in text if char in vowels)

def is_palindrome(text):
    """Check if a string is a palindrome"""
    cleaned = text.replace(" ", "").lower()
    return cleaned == cleaned[::-1]

def word_frequency(text):
    """Count word frequency in text"""
    words = text.lower().split()
    frequency = {}
    for word in words:
        frequency[word] = frequency.get(word, 0) + 1
    return frequency

if __name__ == "__main__":
    test_string = "Hello World"
    print(f"Original: {test_string}")
    print(f"Reversed: {reverse_string(test_string)}")
    print(f"Vowel count: {count_vowels(test_string)}")
    print(f"Is palindrome: {is_palindrome('racecar')}")
    print(f"Word frequency: {word_frequency('hello world hello')}")