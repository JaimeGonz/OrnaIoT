# OrnaIoT

Este proyecto fue creado para la empresa ORNACOL durante la Maestría en Sistemas Computacionales con el fin de almacenar los datos sensados de un nodo portable que mide pH y Conductividad Eléctrica y una Red de Sensores que mide Temperatura, Humedad, Luminosidad y Presión Atmosférica. 

Fue realizado con Node.js, Express, EJS, Firebase, HTML5, CSS, Bootstrap y AWS.

## Caracteristicas

### Inicio de Sesión
La plataforma IoT cuenta con una vista para el inicio de sesión de usuarios previamente registrados.

![image](https://github.com/JaimeGonz/OrnaIoT/assets/48028936/c19756c6-5ba6-4c0e-8728-f23a28c53cf6)

### Panel de Control
Una vez que se ingresa a la plataforma, se aprecia el panel de control, el cual contiene las siguientes secciones:
- Indicadores: Se muestran los datos del último muestreo registrado en la Base de Datos de Firebase.
- Red de Sensores: Muestra 4 tarjetas, cada uno con los datos que se tienen registrados y con la posibilidad de filtrar la información por un rango de fechas.
- Bastón Portable: Se visualiza la tarjeta de pH y de CE, los cuales también muestran los datos almacenados y la posibilidad de filtrar esos valores.
- Tablas: La información almacenada en la Base de Datos se concentra en estas dos tablas, las cuales pueden:
  - Buscar por valor, fecha, hora
  - Exportar a Excel, PDF o Imprimir

![image](https://github.com/JaimeGonz/OrnaIoT/assets/48028936/eda4de3e-58f8-4314-ba8b-2008d4bcf4b4)

![image](https://github.com/JaimeGonz/OrnaIoT/assets/48028936/72d5e5a1-9905-406f-bee5-e1223c3f32bb)

### Mapa
En esta vista se muestra el mapa de cobertura de los repetidores WiFi que fueron creados para ampliar la cobertura de Internet a lo largo del vivero y posibilitar al nodo portable de almacenar la información en la base de datos de forma dinámica.

![image](https://github.com/JaimeGonz/OrnaIoT/assets/48028936/a4479614-ca66-4e67-ae87-b311f16c1e63)

### Admin
- Esta vista únicamente se muestra a los usuarios administradores de la plataforma IoT, los cualen pueden visualizar a los productores que ya están registrados o agregar nuevos usuarios. 
- También es posible exportar los productores mediante un archivo de Excel, PDF o imprimir esos datos.

![image](https://github.com/JaimeGonz/OrnaIoT/assets/48028936/6d7f484f-db33-438f-b734-9a32aafb26e3)

### Registrar usuario
Si un usuario administrador desea registrar un nuevo usuario, deberá añadir un nombre de usuario, correo y una contraseña.

![image](https://github.com/JaimeGonz/OrnaIoT/assets/48028936/5110cf5e-9e78-46f6-95d8-98cee703da17)

### Cerrar sesión
- Existe la posibilidad de que el usuario cierre su sesión y se regrese a la pantalla de inicio de sesión. 
- De igual forma, en caso de inactividad, luego de 5 minutos la sesión se cierra automáticamente, por cuestiones de seguridad.

