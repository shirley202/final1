class MyHandler extends Paged.Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
    }

    async beforeParsed(content) {
        try {
            // Obtener el valor seleccionado de la carrera
            const carreraSelect = document.getElementById('cboCarrera');
            const codCarrera = carreraSelect.value; // Valor del option (por ejemplo, 'KTII')

            console.log('Valor de codCarrera:', codCarrera); // Agregando console.log para verificar el valor

            // Limpiar contenido anterior
            content.innerHTML = '';

            // Consultar las materias de la carrera seleccionada
            const response = await fetch(`./materiasf/${codCarrera}`);
            const data = await response.json();

            if (data.message === 'Success') {
                // Crear el primer encabezado común
                let header = document.createElement('p');
                header.innerHTML = `UNIVERSIDAD NACIONAL DE CAAGUAZU<br>Con sede en Coronel Oviedo<br><b>FACULTAD DE CIENCIAS Y TECNOLOGÍAS</b><br>CARRERA DE ${carreraSelect.options[carreraSelect.selectedIndex].text.toUpperCase()}<br>PLAN CURRICULAR 2010<br><b>PROGRAMA DE ESTUDIOS</b>`;
                header.className = 'header';
                content.appendChild(header);

                // Crear el segundo encabezado específico de carrera como un párrafo con dos spans
                let header2 = document.createElement('p');
                let span1 = document.createElement('span');
                span1.innerHTML = `Carrera de ${carreraSelect.options[carreraSelect.selectedIndex].text}`;
                span1.className = 'left-span';
                let span2 = document.createElement('span');
                span2.innerHTML = 'Facultad de Ciencias Tecnológicas – UNC@';
                span2.className = 'right-span';
                header2.appendChild(span1);
                header2.appendChild(span2);
                header2.className = 'header2';
                content.appendChild(header2);
            } else {
                console.log('No se encontraron materias para la carrera seleccionada.');
            }
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }
}


Paged.registerHandlers(MyHandler);
