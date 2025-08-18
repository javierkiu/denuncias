DROP TABLE IF EXISTS denuncias;

CREATE TABLE denuncias (
    id SERIAL PRIMARY KEY,
    categoria VARCHAR(50) NOT NULL,
    subcategoria VARCHAR(50) NOT NULL,
    latitud DECIMAL(10, 8) NOT NULL,  
    longitud DECIMAL(11, 8) NOT NULL, 
    descripcion TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foto_url TEXT
);


ALTER TABLE denuncias 
ADD CONSTRAINT check_latitud_ecuador CHECK (latitud BETWEEN -5.0 AND 1.5);

ALTER TABLE denuncias 
ADD CONSTRAINT check_longitud_ecuador CHECK (longitud BETWEEN -81.0 AND -75.0);

CREATE INDEX idx_denuncias_categoria ON denuncias(categoria);
CREATE INDEX idx_denuncias_subcategoria ON denuncias(subcategoria);
CREATE INDEX idx_denuncias_coordenadas ON denuncias(latitud, longitud);
CREATE INDEX idx_denuncias_fecha ON denuncias(fecha);

INSERT INTO denuncias (categoria, subcategoria, latitud, longitud, descripcion, foto_url, fecha)
VALUES
(
    'Contaminación', 
    'Vertido de desechos en ríos o mares', 
    -0.4629, 
    -76.9875, 
    'Vertido de residuos químicos al río Napo', 
    'fotos/contaminacion1.jpg',
    '2025-01-15 10:30:00'
),
(
    'Incendios forestales', 
    'Incendio activo', 
    0.5833, 
    -79.7833, 
    'Incendio forestal en progreso en área protegida', 
    'fotos/incendio1.jpg',
    '2025-02-02 15:45:00'
),
(
    'Minería ilegal', 
    'Extracción de minerales sin permiso', 
    -3.7500, 
    -78.5000, 
    'Minería ilegal de oro en zona protegida', 
    'fotos/mineria1.jpg',
    '2025-03-20 09:10:00'
),
(
    'Protección de flora y fauna', 
    'Tala ilegal de árboles', 
    -1.0681, 
    -76.6436, 
    'Tala indiscriminada en el Parque Nacional Yasuní', 
    'fotos/tala1.jpg',
    '2025-04-01 08:00:00'
),
(
    'Contaminación', 
    'Basura en la vía pública', 
    -2.1969, 
    -79.8862, 
    'Acumulación de basura en las calles del centro', 
    'fotos/basura1.jpg',
    '2025-05-10 12:20:00'
),
(
    'Contaminación',
    'Contaminación del aire (humo, gases tóxicos)',
    -0.1807,
    -78.4678,
    'Emisiones tóxicas de fábrica sin control ambiental',
    'fotos/aire1.jpg',
    '2025-06-05 18:30:00'
),
(
    'Incendios forestales',
    'Quema de pastizales',
    -0.6833,
    -78.6167,
    'Quema ilegal de pastizales cerca del volcán Cotopaxi',
    'fotos/quema1.jpg',
    '2025-07-21 11:15:00'
),
(
    'Minería ilegal',
    'Uso de maquinaria en ríos',
    1.0500,
    -78.6167,
    'Uso de dragas ilegales para extracción de oro en el río',
    'fotos/dragas1.jpg',
    '2025-08-16 09:45:00'
);