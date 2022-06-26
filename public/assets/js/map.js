
// const map = L.map('map-template').setView([19.2261758,-103.7998969], 18);
// const map = L.map('map-template').setView([19.226203,-103.8013456], 18);

// const { render } = require("ejs");

// const map = L.map('map-template').setView([19.2262098,-103.8013348], 17.5);
const map = L.map('map-template').setView([19.227837, -103.799577], 17);

// const tileURL = 'https://tile.openstreetmap.org/${z}/${x}/${y}.png'
const tileURL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

L.tileLayer(tileURL).addTo(map);

var origen = [
    [19.225835, -103.800692],
    [19.225701, -103.800359],
    [19.225855, -103.800304],
    [19.225961, -103.800587]
];

var cobertura = [

    //Primera zona
    [
        [19.225851, -103.800289],
        [19.226052, -103.800171],
        [19.226250, -103.800542],
        [19.226030, -103.800644]
    ],

    // Segunda zona
    [
        [19.226310, -103.800511],
        [19.226084, -103.800134],
        [19.226578, -103.799756],
        [19.226916, -103.800200]
    ],

    // Tercera zona
    [
        [19.226730, -103.799639],
        [19.226878, -103.799503],
        [19.227235, -103.799922],
        [19.227085, -103.800067]
    ],

    // Cuarta zona
    [
        [19.226993, -103.799325],
        [19.227532, -103.798816],
        [19.228271, -103.799684],
        [19.227746, -103.800188]
    ],

    // Quinta zona
    [
        [19.228186, -103.799422],
        [19.227596, -103.798748],
        [19.228141, -103.798248],
        [19.228731, -103.798917]
    ],
    
    // Sexta zona
    [
        [19.228180, -103.798214],
        [19.228787, -103.797723],
        [19.229834, -103.799043],
        [19.229305, -103.799355]
    ],

];

var origen = L.polygon(origen, {color: 'red'}).addTo(map);
var poly = L.polygon(cobertura, {color: 'yellow'}).addTo(map);

var nodo1 = L.circle([19.225897, -103.800606], {
    color: "blue",
    fillColor: "blue",
    fillOpacity: 0.2,
    radius: 55.0
}).addTo(map);

var nodo2 = L.circle([19.226297, -103.800431], {
    color: "blue",
    fillColor: "blue",
    fillOpacity: 0.2,
    radius: 55.0
}).addTo(map);

var nodo3 = L.circle([19.226669, -103.800001], {
    color: "blue",
    fillColor: "blue",
    fillOpacity: 0.2,
    radius: 55.0
}).addTo(map);

var nodo4 = L.circle([19.227118, -103.799817], {
    color: "blue",
    fillColor: "blue",
    fillOpacity: 0.2,
    radius: 55.0
}).addTo(map);

var nodo5 = L.circle([19.227516, -103.799419], {
    color: "blue",
    fillColor: "blue",
    fillOpacity: 0.2,
    radius: 55.0
}).addTo(map);

var nodo6 = L.circle([19.227861, -103.799079], {
    color: "blue",
    fillColor: "blue",
    fillOpacity: 0.2,
    radius: 55.0
}).addTo(map);

var nodo7 = L.circle([19.228235, -103.798693], {
    color: "blue",
    fillColor: "blue",
    fillOpacity: 0.2,
    radius: 55.0
}).addTo(map);

var nodo8 = L.circle([19.228604, -103.798280], {
    color: "blue",
    fillColor: "blue",
    fillOpacity: 0.2,
    radius: 55.0
}).addTo(map);

var nodo9 = L.circle([19.228957, -103.798660], {
    color: "blue",
    fillColor: "blue",
    fillOpacity: 0.2,
    radius: 55.0
}).addTo(map);

var nodo10 = L.circle([19.229296, -103.799075], {
    color: "blue",
    fillColor: "blue",
    fillOpacity: 0.2,
    radius: 55.0
}).addTo(map);


//Leyenda

// const legend = L.control.Legend({
//     postion: "botomright",
//     collapsed: false,
//     symbolWidth: 24,
//     opacity: 1,
//     column: 1, 
//     legends: [
//         {
//             label: "Oficinas ORNACOL",
//             type: "polygon",
//             color: "red",
//             fillColor: "red",
//             weight: 2,
//             layers: [origen]
//         },
//         {
//             label: "Zonas de Producción",
//             color: "yellow",
//             type: "polygon",
//             layers: [poly]
//         }
//     ]
// }).addTo(map); 
