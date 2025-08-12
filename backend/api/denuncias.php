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

            if (!empty($_GET['tipo'])) {
                $query .= " AND LOWER(tipo) = LOWER(:tipo)";
                $params[':tipo'] = $_GET['tipo'];
            }
            if (!empty($_GET['ubicacion'])) {
                $query .= " AND LOWER(ubicacion) LIKE LOWER(:ubicacion)";
                $params[':ubicacion'] = "%" . $_GET['ubicacion'] . "%";
            }
            if (!empty($_GET['fecha'])) {
                $query .= " AND DATE(fecha) = :fecha";
                $params[':fecha'] = $_GET['fecha'];
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

        if (empty($data['tipo']) || empty($data['ubicacion']) || empty($data['descripcion'])) {
            http_response_code(400);
            echo json_encode(["error" => "Faltan campos obligatorios"]);
            break;
        }

        $stmt = $pdo->prepare("INSERT INTO denuncias (tipo, ubicacion, descripcion, fecha, foto_url)
                               VALUES (:tipo, :ubicacion, :descripcion, :fecha, :foto_url)
                               RETURNING id");
        $stmt->execute([
            ':tipo' => $data['tipo'],
            ':ubicacion' => $data['ubicacion'],
            ':descripcion' => $data['descripcion'],
            ':fecha' => $data['fecha'] ?? date('Y-m-d H:i:s'),
            ':foto_url' => $data['foto_url'] ?? null
        ]);

        $id = $stmt->fetchColumn();
        http_response_code(201);
        echo json_encode(["message" => "Denuncia creada", "id" => $id]);
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

        foreach (['tipo', 'ubicacion', 'descripcion', 'fecha', 'foto_url'] as $campo) {
            if (isset($data[$campo])) {
                $fields[] = "$campo = :$campo";
                $params[":$campo"] = $data[$campo];
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

        echo json_encode(["message" => "Denuncia actualizada"]);
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
