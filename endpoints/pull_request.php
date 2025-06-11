<?php
header('Content-Type: application/json');

include '../conn/conn.php'; 

$data = json_decode(file_get_contents('php://input'), true);

// Validate required data
if (!$data || !isset($data['jira_ticket_id'])) {
    echo json_encode(['success' => false, 'error' => 'Jira ticket ID not provided']);
    exit;
}

$jira_ticket_id = intval($data['jira_ticket_id']);
$reviewer_1 = mysqli_real_escape_string($conn, $data['reviewer_1'] ?? '');
$reviewer_2 = mysqli_real_escape_string($conn, $data['reviewer_2'] ?? '');
$reviewer_3 = mysqli_real_escape_string($conn, $data['reviewer_3'] ?? '');
$status = mysqli_real_escape_string($conn, $data['status'] ?? 'Under Review');

$sql = "INSERT INTO pull_request (jira_ticket_id, reviewer_1, reviewer_2, reviewer_3, status)
        VALUES ('$jira_ticket_id', '$reviewer_1', '$reviewer_2', '$reviewer_3', '$status')";

if (mysqli_query($conn, $sql)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
}
?>
