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
$reviewer1 = intval($data['reviewer1']);
$reviewer2 = intval($data['reviewer2']);
$reviewer3 = intval($data['reviewer3']);
$status = mysqli_real_escape_string($conn, $data['status']);
$url = mysqli_real_escape_string($conn, $data['url']);

if ($reviewer1 == 1 && $reviewer2 == 1 && $reviewer3 == 1) {
    $status = 'For Merging';
} else {
    $status = 'Under Review';
}

// Run update query
$sql = "UPDATE pull_request SET 
            reviewer_1 = $reviewer1,
            reviewer_2 = $reviewer2,
            reviewer_3 = $reviewer3,
            status = '$status',
            url = '$url'
        WHERE jira_ticket_id = $id";

if (mysqli_query($conn, $sql)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
}
?>