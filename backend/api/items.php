<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = "db"; // importante: usar el nombre del servicio en docker-compose
$dbname = "miapp";
$user = "miusuario";
$password = "mipassword";

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT * FROM items");
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($items);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
