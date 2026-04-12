"""
Sorting and searching algorithms
"""

def bubble_sort(arr):
    """Sort array using bubble sort"""
    arr = arr.copy()
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

def quick_sort(arr):
    """Sort array using quick sort"""
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

def binary_search(arr, target):
    """Binary search for target in sorted array"""
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

def linear_search(arr, target):
    """Linear search for target in array"""
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print(f"Original: {arr}")
    print(f"Bubble sort: {bubble_sort(arr)}")
    print(f"Quick sort: {quick_sort(arr)}")
    
    sorted_arr = [11, 12, 22, 25, 34, 64, 90]
    print(f"Binary search 25: {binary_search(sorted_arr, 25)}")
    print(f"Linear search 22: {linear_search(arr, 22)}")