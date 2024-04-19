from flask import Flask, request, jsonify
import pymysql
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Replace these values with your actual database credentials
db_config = {
    'host': 'enter db host name',
    'user': 'enter master username',
    'password': 'enter username password',
    'database': 'employees'
}

def get_connection():
    return pymysql.connect(**db_config)

@app.route('/add_employee', methods=['POST'])
def add_employee():
    connection = get_connection()
    try:
        name = request.json['name']
        position = request.json['position']
        salary = request.json['salary']

        with connection.cursor() as cursor:
            query = "INSERT INTO employees (name, position, salary) VALUES (%s, %s, %s)"
            cursor.execute(query, (name, position, salary))
            connection.commit()

        return jsonify({ 'success': True })
    except Exception as e:
        return jsonify({ 'success': False })
    finally:
        connection.close()

@app.route('/get_employees')
def get_employees():
    connection = get_connection()
    try:
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            query = "SELECT * FROM employees"
            cursor.execute(query)
            employees = cursor.fetchall()

        return jsonify({ 'employees': employees })
    except Exception as e:
        return jsonify({ 'employees': [] })
    finally:
        connection.close()

@app.route('/delete_employee/<int:id>', methods=['DELETE'])
def delete_employee(id):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            query = "DELETE FROM employees WHERE id = %s"
            cursor.execute(query, (id,))
            connection.commit()

        return jsonify({ 'success': True })
    except Exception as e:
        return jsonify({ 'success': False })
    finally:
        connection.close()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
