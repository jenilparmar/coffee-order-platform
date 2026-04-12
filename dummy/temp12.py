"""
Data structure utilities
"""

class Stack:
    """Simple Stack implementation"""
    def __init__(self):
        self.items = []
    
    def push(self, item):
        """Add item to stack"""
        self.items.append(item)
    
    def pop(self):
        """Remove and return top item"""
        return self.items.pop() if self.items else None
    
    def peek(self):
        """View top item without removing"""
        return self.items[-1] if self.items else None
    
    def is_empty(self):
        """Check if stack is empty"""
        return len(self.items) == 0
    
    def size(self):
        """Get stack size"""
        return len(self.items)

class Queue:
    """Simple Queue implementation"""
    def __init__(self):
        self.items = []
    
    def enqueue(self, item):
        """Add item to queue"""
        self.items.append(item)
    
    def dequeue(self):
        """Remove and return first item"""
        return self.items.pop(0) if self.items else None
    
    def peek(self):
        """View front item without removing"""
        return self.items[0] if self.items else None
    
    def is_empty(self):
        """Check if queue is empty"""
        return len(self.items) == 0
    
    def size(self):
        """Get queue size"""
        return len(self.items)

if __name__ == "__main__":
    stack = Stack()
    stack.push(1)
    stack.push(2)
    stack.push(3)
    print(f"Stack pop: {stack.pop()}")
    
    queue = Queue()
    queue.enqueue('a')
    queue.enqueue('b')
    queue.enqueue('c')
    print(f"Queue dequeue: {queue.dequeue()}")