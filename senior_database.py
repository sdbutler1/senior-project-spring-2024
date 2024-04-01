import sqlite3
import json

# Function to create tables
def create_tables(cursor, json_data):
    for table_name, columns in json_data.items():
        column_definitions = ', '.join([f"{column['id']} {column['type']}" for column in columns])
        cursor.execute(f'CREATE TABLE IF NOT EXISTS {table_name} ({column_definitions})')

# Function to insert data from JSON files
def insert_data_from_json(cursor, conn, filename, table_name):
    with open(filename, 'r') as file:
        data = json.load(file)
        for entry in data:
            values = [entry[column['id']] for column in table_columns[table_name]]
            cursor.execute(f'INSERT INTO {table_name} VALUES ({",".join(["?"] * len(values))})', values)
    conn.commit()

# Function to generate password
def generate_password(name):
    return name.lower().replace(" ", "") + "123"

# Main function
def main():
    # Connect to SQLite database
    conn = sqlite3.connect('university.db')
    cursor = conn.cursor()

    # Define table columns from JSON files
    with open('columns.json', 'r') as columns_file:
        table_columns = json.load(columns_file)

    # Create tables
    create_tables(cursor, table_columns)

    # Populate Staff table and generate passwords
    insert_data_from_json(cursor, conn, 'staff_info.json', 'Staff')
    cursor.execute('SELECT id, name FROM Staff')
    staff_data = cursor.fetchall()
    for staff in staff_data:
        password = generate_password(staff[1])
        cursor.execute('UPDATE Staff SET password = ? WHERE id = ?', (password, staff[0]))

    # Populate Student table
    insert_data_from_json(cursor, conn, 'student_info.json', 'Student')

    # Populate News table
    insert_data_from_json(cursor, conn, 'news_info.json', 'News')

    # Populate Internships table
    insert_data_from_json(cursor, conn, 'internship_info.json', 'Internships')

    # Close connection
    conn.close()

if __name__ == "__main__":
    main()
