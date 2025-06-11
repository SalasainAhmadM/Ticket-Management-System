<?php
header('Content-Type: application/json');

include '../conn/conn.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['id'])) {
    echo json_encode(['success' => false, 'error' => 'No ID provided']);
    exit;
}

$id = intval($data['id']);

$sql = "DELETE FROM pull_request WHERE id = $id";

if (mysqli_query($conn, $sql)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
}
?>