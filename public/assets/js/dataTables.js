$(document).ready(function() {
    var table = $('#datos-baston').DataTable( {
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontró información",
            "info": "¨Página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(Filtrado de _MAX_ registros totales)",
            "search": "Buscar: ",
            "paginate": {
                "previous": "Ant",
                "next": "Sig"
            }
        },
        dom: 'Bfrtip',
        buttons: [
            'excel', 'pdf', 'print'
        ]
    });

    table.buttons().container()
    .appendTo( '#datos-baston_wrapper .col-md-6:eq(0)' );

    var table2 = $('#datos-red').DataTable( {
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontró información",
            "info": "Página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(Filtrado de _MAX_ registros totales)",
            "search": "Buscar: ",
            "paginate": {
                "previous": "Ant",
                "next": "Sig"
            }
        },
        dom: 'Bfrtip',
        buttons: [
            'excel', 'pdf', 'print'
        ]
    });

    table2.buttons().container()
    .appendTo( '#datos-baston_wrapper .col-md-6:eq(0)' );
});
