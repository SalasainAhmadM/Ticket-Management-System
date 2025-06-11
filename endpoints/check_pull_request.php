<?php
header('Content-Type: application/json');
include '../conn/conn.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['jira_ticket_id'])) {
    echo json_encode(['exists' => false, 'error' => 'No Jira ticket ID provided']);
    exit;
}

$ticketId = intval($data['jira_ticket_id']);
$sql = "SELECT id FROM pull_request WHERE jira_ticket_id = $ticketId LIMIT 1";
$result = mysqli_query($conn, $sql);

if ($result && mysqli_num_rows($result) > 0) {
    echo json_encode(['exists' => true]);
} else {
    echo json_encode(['exists' => false]);
}
?>
