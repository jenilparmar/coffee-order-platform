"""
Date and time utilities
"""

from datetime import datetime, timedelta, date

def get_current_datetime():
    """Get current date and time"""
    return datetime.now()

def format_datetime(dt, format_string="%Y-%m-%d %H:%M:%S"):
    """Format datetime object to string"""
    return dt.strftime(format_string)

def parse_datetime(date_string, format_string="%Y-%m-%d"):
    """Parse date string to datetime object"""
    try:
        return datetime.strptime(date_string, format_string)
    except ValueError:
        return None

def days_between(date1, date2):
    """Calculate days between two dates"""
    return abs((date2 - date1).days)

def add_days(dt, num_days):
    """Add days to a datetime"""
    return dt + timedelta(days=num_days)

def get_age(birthdate):
    """Calculate age from birthdate"""
    today = date.today()
    age = today.year - birthdate.year
    if (today.month, today.day) < (birthdate.month, birthdate.day):
        age -= 1
    return age

if __name__ == "__main__":
    now = get_current_datetime()
    print(f"Current time: {format_datetime(now)}")
    
    bday = parse_datetime("2000-01-15")
    if bday:
        print(f"Age: {get_age(bday.date())}")
    
    future = add_days(now, 7)
    print(f"Date in 7 days: {format_datetime(future)}")