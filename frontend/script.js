document.getElementById('employee-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const salary = document.getElementById('salary').value;
  
    fetch('/webbackend/add_employee', { // Update the URL to include the correct port number
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        position,
        salary
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        document.getElementById('employee-form').reset();
        loadEmployees();
      } else {
        alert('Error adding employee');
      }
    })
    .catch(error => console.error(error));
  });
  
  document.getElementById('load-employees').addEventListener('click', loadEmployees);
  
  function loadEmployees() {
    fetch('/webbackend/get_employees', { // Update the URL to include the correct port number
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      const employeesTableBody = document.getElementById('employees-table').getElementsByTagName('tbody')[0];
      employeesTableBody.innerHTML = '';
  
      data.employees.forEach(employee => {
        const row = document.createElement('tr');
  
        const nameCell = document.createElement('td');
        nameCell.textContent = employee.name;
        row.appendChild(nameCell);
  
        const positionCell = document.createElement('td');
        positionCell.textContent = employee.position;
        row.appendChild(positionCell);
  
        const salaryCell = document.createElement('td');
        salaryCell.textContent = employee.salary;
        row.appendChild(salaryCell);
  
        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          deleteEmployee(employee.id);
        });
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
  
        employeesTableBody.appendChild(row);
      });
    })
    .catch(error => console.error(error));
  }
  
  function deleteEmployee(id) {
    fetch(`/webbackend/delete_employee/${id}`, { // Update the URL to include the correct port number
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        loadEmployees();
      } else {
        alert('Error deleting employee');
      }
    })
    .catch(error => console.error(error));
  }
