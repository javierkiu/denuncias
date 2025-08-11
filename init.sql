CREATE TABLE IF NOT EXISTS denuncias (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    ubicacion TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foto_url TEXT
);

INSERT INTO denuncias (tipo, ubicacion, descripcion, foto_url)
VALUES
('Contaminación', 'Río Napo, Ecuador', 'Vertido de residuos químicos al río', 'fotos/contaminacion1.jpg'),
('Fuego', 'Bosque La Primavera', 'Incendio forestal en progreso', 'fotos/incendio1.jpg'),
('Minería', 'Zona rural, Perú', 'Minería ilegal cerca de la comunidad', 'fotos/mineria1.jpg');
