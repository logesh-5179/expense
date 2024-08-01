document.getElementById('add').addEventListener('click', function() {
    const name=document.getElementById('exp-name').value;
    const amount=parseFloat(document.getElementById('amt').value);
    const category=document.querySelector('select').value;
    const date = document.getElementById('date').value;
    if (name && !isNaN(amount) && category && date) {
        const tableBody = document.querySelector('#exp-table tbody');
        const row=document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>${amount}</td>
            <td>${category}</td>
            <td>${date}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
        total();
    }
});
function total() {
    const rows=document.querySelectorAll('#exp-table tbody tr');
    let total=0;
    rows.forEach(row => {
        const amount=parseFloat(row.cells[1].textContent);
        if (!isNaN(amount)) {
            total += amount;
        }
    });
    document.getElementById('total').value = total.toFixed(2);
}

document.getElementById('opt').addEventListener('change', function() {
    const curr=this.value;
    const rows=document.querySelectorAll('#exp-table tbody tr');
    rows.forEach(row => {
        const category = row.cells[2].textContent;
        if (curr==='all' || curr===category) {
            row.style.display='';
        } else {
            row.style.display='none';
        }
    });
});

document.querySelector('#exp-table').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        event.target.closest('tr').remove();
        total();
    }
    if (event.target.classList.contains('edit-btn')) {
        const row = event.target.closest('tr');
        document.getElementById('exp-name').value = row.cells[0].textContent;
        document.getElementById('amt').value = row.cells[1].textContent;
        document.querySelector(`select option[value="${row.cells[2].textContent}"]`).selected = true;
        document.getElementById('date').value = row.cells[3].textContent;
        row.remove();
        total();
    }
});