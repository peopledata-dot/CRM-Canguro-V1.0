async function cargarEmpleados() {
  const res = await fetch('http://localhost:3000/api/empleados');
  const empleados = await res.json();
  const select = document.getElementById('empleado');

  empleados.forEach(emp => {
    const option = document.createElement('option');
    option.value = JSON.stringify({
      nombre: emp[1],
      cargo: emp[2],
      ingreso: emp[3],
      sueldo: emp[4]
    });
    option.textContent = emp[1]; // Nombre visible
    select.appendChild(option);
  });
}

async function generarCarta() {
  const datos = JSON.parse(document.getElementById('empleado').value);

  const res = await fetch('http://localhost:3000/api/generar-carta', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });

  const data = await res.json();
  window.open(data.url, '_blank');
}

cargarEmpleados();

async function generarCartasMasivo() {
  const btn = event.target;
  btn.disabled = true;
  btn.textContent = 'Generando...';

  const res = await fetch('http://localhost:3000/api/generar-cartas-masivo', {
    method: 'POST'
  });

  const resultados = await res.json();
  const contenedor = document.getElementById('resultados');
  contenedor.innerHTML = '<h3>Cartas generadas:</h3>';

  resultados.forEach(({ nombre, url }) => {
    const link = document.createElement('a');
    link.href = url;
    link.textContent = `📄 Carta de ${nombre}`;
    link.target = '_blank';
    contenedor.appendChild(link);
    contenedor.appendChild(document.createElement('br'));
  });

  btn.disabled = false;
  btn.textContent = 'Generar Cartas Masivo';
}