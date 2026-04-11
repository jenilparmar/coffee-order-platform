"""
Calculator module - Simple arithmetic operations
"""

class Calculator:
    def __init__(self):
        self.result = 0
    
    def add(self, a, b):
        self.result = a + b
        return self.result
    
    def subtract(self, a, b):
        self.result = a - b
        return self.result
    
    def multiply(self, a, b):
        self.result = a * b
        return self.result
    
    def divide(self, a, b):
        if b == 0:
            return "Error: Division by zero"
        self.result = a / b
        return self.result

if __name__ == "__main__":
    calc = Calculator()
    print("Addition: 10 + 5 =", calc.add(10, 5))
    print("Subtraction: 10 - 5 =", calc.subtract(10, 5))
    print("Multiplication: 10 * 5 =", calc.multiply(10, 5))
    print("Division: 10 / 5 =", calc.divide(10, 5))