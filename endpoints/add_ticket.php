<?php
header('Content-Type: application/json');
include '../conn/conn.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['success' => false, 'error' => 'No data received']);
    exit;
}

// Extract and sanitize
$ticketId = mysqli_real_escape_string($conn, $data['ticketId']);
$description = mysqli_real_escape_string($conn, $data['description']);
$assignee = mysqli_real_escape_string($conn, $data['assignee']);
$status = mysqli_real_escape_string($conn, $data['status']);
$dateCreated = mysqli_real_escape_string($conn, $data['dateCreated']);
$dateFinished = mysqli_real_escape_string($conn, $data['dateFinished']);
$url = mysqli_real_escape_string($conn, $data['url']);

// Run insert query
$sql = "INSERT INTO jira_tickets (ticket_num, description, assignee, status, date_created, date_finished, url) 
        VALUES ('$ticketId', '$description', '$assignee', '$status', '$dateCreated', '$dateFinished', '$url')";

if (mysqli_query($conn, $sql)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
}
?>
