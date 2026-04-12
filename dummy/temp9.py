"""
Validation utilities for common data types
"""

import re

def is_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def is_phone(phone):
    """Validate phone number format"""
    pattern = r'^(\+?1)?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$'
    return re.match(pattern, phone) is not None

def is_valid_url(url):
    """Validate URL format"""
    pattern = r'^https?://[^\s/$.?#].[^\s]*$'
    return re.match(pattern, url) is not None

def is_strong_password(password):
    """Check if password is strong"""
    if len(password) < 8:
        return False
    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)
    has_special = any(c in '!@#$%^&*()_+-=[]{}|;:,.<>?' for c in password)
    return has_upper and has_lower and has_digit and has_special

def is_credit_card(card_number):
    """Validate credit card number using Luhn algorithm"""
    card_number = card_number.replace(" ", "").replace("-", "")
    if not card_number.isdigit() or len(card_number) < 13:
        return False
    total = 0
    for i, digit in enumerate(reversed(card_number)):
        n = int(digit)
        if i % 2 == 1:
            n *= 2
            if n > 9:
                n -= 9
        total += n
    return total % 10 == 0

if __name__ == "__main__":
    print(f"Valid email: {is_email('test@example.com')}")
    print(f"Valid phone: {is_phone('555-123-4567')}")
    print(f"Valid URL: {is_valid_url('https://example.com')}")
    print(f"Strong password: {is_strong_password('Secure@123')}")