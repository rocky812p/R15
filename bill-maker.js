// Bill Maker Logic
const billForm = document.getElementById('bill-form');
const itemsBody = document.getElementById('bill-items-body');
const addItemBtn = document.getElementById('add-item');
const billPreview = document.getElementById('bill-preview');
const downloadBtn = document.getElementById('download-bill');
const shareBtn = document.getElementById('share-bill');

let items = [ { name: '', qty: 1, price: 0 } ];

function renderItems() {
  itemsBody.innerHTML = '';
  items.forEach((item, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" value="${item.name}" placeholder="Item" onchange="this.value=this.value.slice(0,40)" /></td>
      <td><input type="number" min="1" value="${item.qty}" style="width:60px;" /></td>
      <td><input type="number" min="0" value="${item.price}" style="width:80px;" step="0.01" /></td>
      <td>${(item.qty * item.price).toFixed(2)}</td>
      <td><button class="remove-btn" title="Remove">🗑️</button></td>
    `;
    tr.querySelectorAll('input')[0].oninput = e => { items[i].name = e.target.value; updateBill(); };
    tr.querySelectorAll('input')[1].oninput = e => { items[i].qty = Math.max(1, parseInt(e.target.value)||1); updateBill(); };
    tr.querySelectorAll('input')[2].oninput = e => { items[i].price = Math.max(0, parseFloat(e.target.value)||0); updateBill(); };
    tr.querySelector('.remove-btn').onclick = () => { items.splice(i, 1); if (!items.length) items.push({ name: '', qty: 1, price: 0 }); updateBill(); };
    itemsBody.appendChild(tr);
  });
}
function updateBill() {
  renderItems();
  // Preview
  const biz = document.getElementById('b-biz').value.trim();
  const client = document.getElementById('b-client').value.trim();
  const date = document.getElementById('b-date').value;
  const num = document.getElementById('b-num').value.trim();
  let total = 0;
  let rows = '';
  items.forEach(item => {
    if (item.name && item.qty && item.price) {
      rows += `<tr><td>${item.name}</td><td>${item.qty}</td><td>${item.price.toFixed(2)}</td><td>${(item.qty*item.price).toFixed(2)}</td></tr>`;
      total += item.qty * item.price;
    }
  });
  billPreview.innerHTML =
    `<h2>Invoice ${num ? '#' + num : ''}</h2>
    <div class="bill-contact">${biz ? 'From: ' + biz : ''}${biz && client ? ' &nbsp;|&nbsp; ' : ''}${client ? 'To: ' + client : ''}${date ? ' &nbsp;|&nbsp; ' + date : ''}</div>
    <div class="bill-section-title">Items</div>
    <table><thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead><tbody>${rows}</tbody></table>
    <div class="bill-total">Grand Total: ₹${total.toFixed(2)}</div>`;
}
addItemBtn.addEventListener('click', e => {
  e.preventDefault();
  items.push({ name: '', qty: 1, price: 0 });
  updateBill();
});
billForm.addEventListener('input', updateBill);
window.addEventListener('DOMContentLoaded', updateBill);

downloadBtn.addEventListener('click', () => {
  const win = window.open('', '', 'width=800,height=900');
  win.document.write('<html><head><title>Invoice</title><style>body{font-family:Segoe UI,Arial,sans-serif;padding:2rem;}h2{font-size:1.3rem;font-weight:800;}table{width:100%;border-collapse:collapse;}th,td{border:1px solid #e0e7f0;padding:0.5rem 0.7rem;text-align:left;}th{background:#e0e7ff;color:#2563eb;} .bill-section-title{font-size:1.1rem;font-weight:700;color:#2563eb;margin-top:1.2rem;margin-bottom:0.3rem;} .bill-total{font-weight:700;color:#2563eb;text-align:right;}</style></head><body>' + billPreview.innerHTML + '</body></html>');
  win.document.close();
  win.print();
});
shareBtn.addEventListener('click', () => {
  alert('Direct PDF sharing is not supported in browsers. Please use Download PDF and share the file manually.');
}); 