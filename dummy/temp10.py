"""
Mathematical utilities
"""

import math

def fibonacci(n):
    """Generate Fibonacci sequence up to n terms"""
    sequence = []
    a, b = 0, 1
    for _ in range(n):
        sequence.append(a)
        a, b = b, a + b
    return sequence

def factorial(n):
    """Calculate factorial of n"""
    if n < 0:
        return None
    return math.factorial(n)

def is_prime(num):
    """Check if number is prime"""
    if num < 2:
        return False
    for i in range(2, int(math.sqrt(num)) + 1):
        if num % i == 0:
            return False
    return True

def gcd(a, b):
    """Calculate greatest common divisor"""
    while b:
        a, b = b, a % b
    return a

def lcm(a, b):
    """Calculate least common multiple"""
    return abs(a * b) // gcd(a, b)

def power(base, exponent):
    """Calculate base raised to exponent"""
    return base ** exponent

if __name__ == "__main__":
    print(f"Fibonacci (10): {fibonacci(10)}")
    print(f"Factorial (5): {factorial(5)}")
    print(f"Is 17 prime: {is_prime(17)}")
    print(f"GCD(48, 18): {gcd(48, 18)}")
    print(f"LCM(12, 18): {lcm(12, 18)}")
    print(f"2^8: {power(2, 8)}")