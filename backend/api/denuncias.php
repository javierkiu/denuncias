<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$host = "db";
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
    case 'GET':
        $baseUrl = "http://localhost:4000/api/";
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare("SELECT * FROM denuncias WHERE id = :id");
            $stmt->execute([':id' => $_GET['id']]);
            $denuncia = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($denuncia && !empty($denuncia['foto_url'])) {
                $denuncia['foto_url'] = $baseUrl . $denuncia['foto_url'];
            }
            echo json_encode($denuncia ?: []);
        } else {
            $query = "SELECT * FROM denuncias WHERE 1=1";
            $params = [];
            // filtros opcionales
            foreach (['categoria','subcategoria','descripcion','fecha','lat_min','lat_max','lng_min','lng_max'] as $filtro) {
                if(!empty($_GET[$filtro])){
                    switch($filtro){
                        case 'categoria': $query.=" AND LOWER(categoria)=LOWER(:categoria)"; $params[':categoria']=$_GET[$filtro]; break;
                        case 'subcategoria': $query.=" AND LOWER(subcategoria)=LOWER(:subcategoria)"; $params[':subcategoria']=$_GET[$filtro]; break;
                        case 'descripcion': $query.=" AND LOWER(descripcion) LIKE LOWER(:descripcion)"; $params[':descripcion'] = "%".$_GET[$filtro]."%"; break;
                        case 'fecha': $query.=" AND DATE(fecha)=:fecha"; $params[':fecha']=$_GET[$filtro]; break;
                        case 'lat_min': case 'lat_max': if(isset($_GET['lat_min'],$_GET['lat_max'])){$query.=" AND latitud BETWEEN :lat_min AND :lat_max"; $params[':lat_min']=floatval($_GET['lat_min']); $params[':lat_max']=floatval($_GET['lat_max']);} break;
                        case 'lng_min': case 'lng_max': if(isset($_GET['lng_min'],$_GET['lng_max'])){$query.=" AND longitud BETWEEN :lng_min AND :lng_max"; $params[':lng_min']=floatval($_GET['lng_min']); $params[':lng_max']=floatval($_GET['lng_max']);} break;
                    }
                }
            }
            $query.=" ORDER BY fecha DESC";
            $stmt=$pdo->prepare($query);
            $stmt->execute($params);
            $denuncias=$stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach($denuncias as &$d){ if(!empty($d['foto_url'])) $d['foto_url']=$baseUrl.$d['foto_url']; }
            echo json_encode($denuncias);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if(empty($data['categoria']) || empty($data['subcategoria']) || empty($data['descripcion']) || !isset($data['latitud']) || !isset($data['longitud'])){
            http_response_code(400); echo json_encode(["error"=>"Faltan campos obligatorios"]); break;
        }
        $categorias_validas = [
            'Contaminación'=>["Basura en la vía pública","Vertido de desechos en ríos o mares","Contaminación del aire (humo, gases tóxicos)"],
            'Incendios forestales'=>["Quema de pastizales","Incendio activo","Fuegos provocados por actividades humanas","Uso ilegal de fuego en áreas protegidas"],
            'Minería ilegal'=>["Extracción de minerales sin permiso","Uso de maquinaria en ríos","Tala asociada a minería","Presencia de campamentos ilegales"],
            'Protección de flora y fauna'=>["Caza ilegal","Tráfico de especies","Tala ilegal de árboles","Daño a áreas protegidas"]
        ];
        if(!isset($categorias_validas[$data['categoria']]) || !in_array($data['subcategoria'],$categorias_validas[$data['categoria']])){
            http_response_code(400); echo json_encode(["error"=>"Categoría o Subcategoría no válida"]); break;
        }
        $stmt=$pdo->prepare("INSERT INTO denuncias (categoria,subcategoria,latitud,longitud,descripcion,fecha,foto_url) VALUES (:categoria,:subcategoria,:latitud,:longitud,:descripcion,:fecha,:foto_url) RETURNING id");
        $stmt->execute([
            ':categoria'=>$data['categoria'],
            ':subcategoria'=>$data['subcategoria'],
            ':latitud'=>floatval($data['latitud']),
            ':longitud'=>floatval($data['longitud']),
            ':descripcion'=>$data['descripcion'],
            ':fecha'=>$data['fecha']??date('Y-m-d H:i:s'),
            ':foto_url'=>$data['foto_url']??null
        ]);
        $id=$stmt->fetchColumn();
        http_response_code(201);
        echo json_encode(["message"=>"Denuncia creada exitosamente","id"=>$id]);
        break;

    case 'PUT':
        $data=json_decode(file_get_contents("php://input"),true);
        if(empty($data['id'])){ http_response_code(400); echo json_encode(["error"=>"Se requiere el ID"]); break; }
        $fields=[]; $params=[':id'=>$data['id']];
        foreach(['categoria','subcategoria','latitud','longitud','descripcion','fecha','foto_url'] as $c){ if(isset($data[$c])){$fields[]="$c=:$c"; $params[":$c"]=($c=='latitud'||$c=='longitud')?floatval($data[$c]):$data[$c]; } }
        if(empty($fields)){ http_response_code(400); echo json_encode(["error"=>"No hay campos para actualizar"]); break; }
        $stmt=$pdo->prepare("UPDATE denuncias SET ".implode(", ",$fields)." WHERE id=:id"); $stmt->execute($params);
        echo json_encode(["message"=>"Denuncia actualizada exitosamente"]);
        break;

    case 'DELETE':
        $data=json_decode(file_get_contents("php://input"),true);
        if(empty($data['id'])){ http_response_code(400); echo json_encode(["error"=>"Se requiere el ID"]); break; }
        $stmt=$pdo->prepare("DELETE FROM denuncias WHERE id=:id"); $stmt->execute([':id'=>$data['id']]);
        echo json_encode(["message"=>"Denuncia eliminada"]);
        break;

    default:
        http_response_code(405); echo json_encode(["error"=>"Método no permitido"]);
}
