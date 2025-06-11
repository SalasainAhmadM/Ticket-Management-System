<?php
header('Content-Type: application/json');

include '../conn/conn.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['success' => false, 'error' => 'No data received']);
    exit;
}

// Extract and sanitize
$id = intval($data['id']);
$ticketId = mysqli_real_escape_string($conn, $data['ticketId']);
$description = mysqli_real_escape_string($conn, $data['description']);
$assignee = mysqli_real_escape_string($conn, $data['assignee']);
$status = mysqli_real_escape_string($conn, $data['status']);
$dateCreated = mysqli_real_escape_string($conn, $data['dateCreated']);
$dateFinished = mysqli_real_escape_string($conn, $data['dateFinished']);
$url = mysqli_real_escape_string($conn, $data['url']);

// Run update query 
$sql = "UPDATE jira_tickets SET 
            ticket_num = '$ticketId',
            description = '$description',
            assignee = '$assignee',
            status = '$status',
            date_created = '$dateCreated',
            date_finished = '$dateFinished',
            url = '$url'
        WHERE id = $id";

if (mysqli_query($conn, $sql)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
}
?>
