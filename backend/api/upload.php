<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Only POST method allowed"]);
    exit;
}

if (!isset($_FILES['photo']) || $_FILES['photo']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(["error" => "No file uploaded or upload error"]);
    exit;
}

$file = $_FILES['photo'];

$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid file type. Only images allowed."]);
    exit;
}

$maxSize = 5 * 1024 * 1024; 
if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(["error" => "File too large. Maximum 5MB allowed."]);
    exit;
}

$uploadDir = 'uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = uniqid() . '_' . time() . '.' . $extension;
$filepath = $uploadDir . $filename;

if (move_uploaded_file($file['tmp_name'], $filepath)) {
    $fileUrl = 'http://localhost:4000/api/' . $filepath; 
    
    echo json_encode([
        "success" => true,
        "filename" => $filename,
        "url" => $fileUrl,
        "message" => "File uploaded successfully"
    ]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to save file"]);
}
?>