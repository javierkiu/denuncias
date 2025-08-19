<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Manejo de preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$host = "db"; // nombre del servicio en docker-compose
$dbname = "miapp";
$user = "miusuario";
$password = "mipassword";

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  // 📌 Obtener denuncias (con o sin filtros)
    case 'GET':
        if (isset($_GET['id'])) {
            // Obtener una denuncia por ID
            $stmt = $pdo->prepare("SELECT * FROM denuncias WHERE id = :id");
            $stmt->execute([':id' => $_GET['id']]);
            $denuncia = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($denuncia ?: []);
        } else {
            // Aplicar filtros si existen
            $query = "SELECT * FROM denuncias WHERE 1=1";
            $params = [];

            if (!empty($_GET['categoria'])) {
                $query .= " AND LOWER(categoria) = LOWER(:categoria)";
                $params[':categoria'] = $_GET['categoria'];
            }
            if (!empty($_GET['subcategoria'])) {
                $query .= " AND LOWER(subcategoria) = LOWER(:subcategoria)";
                $params[':subcategoria'] = $_GET['subcategoria'];
            }
            if (!empty($_GET['descripcion'])) {
                $query .= " AND LOWER(descripcion) LIKE LOWER(:descripcion)";
                $params[':descripcion'] = '%' . $_GET['descripcion'] . '%';
            }
            if (!empty($_GET['fecha'])) {
                $query .= " AND DATE(fecha) = :fecha";
                $params[':fecha'] = $_GET['fecha'];
            }
            if (!empty($_GET['lat_min']) && !empty($_GET['lat_max'])) {
                $query .= " AND latitud BETWEEN :lat_min AND :lat_max";
                $params[":lat_min"] = floatval($_GET["lat_min"]);
                $params[":lat_max"] = floatval($_GET["lat_max"]);
            }
            if (!empty($_GET['lng_min']) && !empty($_GET['lng_max'])) {
                $query .= " AND longitud BETWEEN :lng_min AND :lng_max";
                $params[":lng_min"] = floatval($_GET["lng_min"]);
                $params[":lng_max"] = floatval($_GET["lng_max"]);
            }

            $query .= " ORDER BY fecha DESC";
            $stmt = $pdo->prepare($query);
            $stmt->execute($params);
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
        break;

    // 📌 Crear denuncia
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['categoria']) || empty($data['subcategoria']) || empty($data['descripcion']) || !isset($data['latitud']) || !isset($data['longitud'])) {
            http_response_code(400);
            echo json_encode(["error" => "Faltan campos obligatorios: categoria, subcategoria, descripcion, latitud, longitud"]);
            break;
        }

        $categorias_validas = [
            'Contaminación' => [
                "Basura en la vía pública",
                "Vertido de desechos en ríos o mares", 
                "Contaminación del aire (humo, gases tóxicos)"
            ],
            'Incendios forestales' => [
                "Quema de pastizales",
                "Incendio activo",
                "Fuegos provocados por actividades humanas",
                "Uso ilegal de fuego en áreas protegidas"
            ],
            'Minería ilegal' => [
                "Extracción de minerales sin permiso",
                "Uso de maquinaria en ríos",
                "Tala asociada a minería",
                "Presencia de campamentos ilegales"
            ],
            'Protección de flora y fauna' => [
                "Caza ilegal",
                "Tráfico de especies",
                "Tala ilegal de árboles",
                "Daño a áreas protegidas"
            ]
            ];

        if (!isset($categorias_validas[$data['categoria']]) || 
            !in_array($data['subcategoria'], $categorias_validas[$data['categoria']])) {
            http_response_code(400);
            echo json_encode(["error" => "No valid Category or Subcategory"]);
            break;
        }

        $stmt = $pdo->prepare("INSERT INTO denuncias (categoria, subcategoria, latitud, longitud, descripcion, fecha, foto_url)
                               VALUES (:categoria, :subcategoria, :latitud, :longitud, :descripcion, :fecha, :foto_url)
                               RETURNING id");
        $stmt->execute([
            ':categoria' => $data['categoria'],
            ':subcategoria' => $data['subcategoria'],
            ':latitud' => floatval($data['latitud']),
            ':longitud' => floatval($data['longitud']),
            ':descripcion' => $data['descripcion'],
            ':fecha' => $data['fecha'] ?? date('Y-m-d H:i:s'),
            ':foto_url' => $data['foto_url'] ?? null
        ]);

        $id = $stmt->fetchColumn();
        http_response_code(201);
        echo json_encode(["message" => "Denuncia creada exitosamente", "id" => $id]);
        break;

    // 📌 Editar denuncia
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['id'])) {
            http_response_code(400);
            echo json_encode(["error" => "Se requiere el ID"]);
            break;
        }

        $fields = [];
        $params = [':id' => $data['id']];

        foreach (['categoria','subcategoria', 'latitud', 'longitud', 'descripcion', 'fecha', 'foto_url'] as $campo) {
            if (isset($data[$campo])) {
                $fields[] = "$campo = :$campo";
                if ($campo == 'latitud' || $campo == 'longitud') {
                    $params[":$campo"] = floatval($data[$campo]);
                } else {
                    $params[":$campo"] = $data[$campo];
                }
            }
        }

        if (empty($fields)) {
            http_response_code(400);
            echo json_encode(["error" => "No hay campos para actualizar"]);
            break;
        }

        $sql = "UPDATE denuncias SET " . implode(", ", $fields) . " WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        echo json_encode(["message" => "Denuncia actualizada exitosamente"]);
        break;
    
    // 📌 Eliminar denuncia
    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['id'])) {
            http_response_code(400);
            echo json_encode(["error" => "Se requiere el ID"]);
            break;
        }

        $stmt = $pdo->prepare("DELETE FROM denuncias WHERE id = :id");
        $stmt->execute([':id' => $data['id']]);

        echo json_encode(["message" => "Denuncia eliminada"]);
        break;
    
    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
}
