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

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
}
