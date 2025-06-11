<?php
session_start();
require_once './conn/conn.php';
date_default_timezone_set('Asia/Manila');
$userQuery = "SELECT first_name, m_name, last_name,role FROM user WHERE id = 1 LIMIT 1";
$userResult = mysqli_query($conn, $userQuery);
$userFullName = "Unknown User";

if ($userRow = mysqli_fetch_assoc($userResult)) {
    $userFullName = $userRow['first_name'] . ' ' . $userRow['m_name']. '.' . ' ' . $userRow['last_name'];
    $role = $userRow['role'] ?? 'User'; 
}

$limit = 10;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $limit;

$ticketsQuery = "SELECT * FROM jira_tickets LIMIT $limit OFFSET $offset";
$ticketsResult = mysqli_query($conn, $ticketsQuery);

// Get total count for footer
$countResult = mysqli_query($conn, "SELECT COUNT(*) as total FROM jira_tickets");
$countRow = mysqli_fetch_assoc($countResult);
$totalRows = $countRow['total'];
$totalColumns = mysqli_num_fields($ticketsResult);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jira Tickets - Ticket Management System</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="./css/style.css">
    <link rel="icon" type="image/png" href="./img/jira.png">
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-left">
                <div class="file-image">
                    <div class="file-image">
                        <img src="./img/kaizoku.jpg" alt="File Image">
                    </div>
                </div>
               <div class="header-name">
                    <h1><?php echo htmlspecialchars($userFullName); ?></h1>
                    <span><?php echo htmlspecialchars($role); ?></span>
                </div>
            </div>
            <!-- <div>
                <a href="#" class="download-btn">
                    <i class="fas fa-download"></i> Download
                </a>
            </div> -->
        </div>
        <div class="progress-bar">
             <div class="step completed current">
                <div class="step-number">
                    <i class="fab fa-jira"></i>
                </div>
                <span class="step-text"> Jira Tickets</span>
            </div>
            <div class="step-separator"></div>
            <div class="step active">
                <div class="step-number">
                    <i class="fab fa-bitbucket"></i>
                </div>
                <span class="step-text">Bitbucket Pull Requests</span>
            </div>
        </div>

        <div style="display:none" class="success-message">
            <i class="fas fa-check-circle checkmark"></i>
            Ticket Successfully updated!
        </div>
        <div class="controls-row">
           
            <input type="text" class="search-input" id="search-input" placeholder="Search Tickets...">
            <input type="date" class="date-filter" id="date-filter" placeholder="Filter by Date">
             <button class="add-button" onclick="addTicket()">
                <i class="fas fa-plus"></i> Add Ticket
            </button>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th><i class="fas fa-ticket-alt column-icon text"></i>Ticket #</th>
                        <th><i class="fas fa-align-left column-icon team"></i>Description</th>
                        <th><i class="fas fa-user-circle column-icon department"></i>Assignee</th>
                        <th><i class="fas fa-tasks column-icon number"></i>Status</th>
                        <th><i class="fas fa-calendar-plus column-icon date"></i>Date Created</th>
                        <th><i class="fas fa-calendar-check column-icon manager"></i>Date Finished</th>
                        <th><i class="fas fa-link column-icon text"></i>URL</th>
                        <th><i class="fas fa-cogs column-icon action"></i>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        $result = $ticketsResult;
                        $rowNum = 1;

                        while ($row = mysqli_fetch_assoc($result)) {
                            // Format date or show "-" if not set
                            $dateCreated = date("d M y", strtotime($row['date_created']));
                            $dateFinished = ($row['date_finished'] != '0000-00-00 00:00:00') ? date("d M y", strtotime($row['date_finished'])) : '-';

                            // Assign badge class based on status
                            $statusClass = '';
                            switch (strtolower($row['status'])) {
                                case 'completed': $statusClass = 'status-completed'; break;
                                case 'in progress': $statusClass = 'status-in-progress'; break;
                                case 'pending': $statusClass = 'status-pending'; break;
                                case 'urgent': $statusClass = 'status-urgent'; break;
                                default: $statusClass = 'status-default';
                            }

                            echo "<tr id='{$row['id']}'>
                                    <td class='row-number'>{$rowNum}</td>
                                    <td>{$row['ticket_num']}</td>
                                    <td>{$row['description']}</td>
                                    <td>{$row['assignee']}</td>
                                    <td><span class='status-badge {$statusClass}'>{$row['status']}</span></td>
                                    <td>{$dateCreated}</td>
                                    <td>{$dateFinished}</td>
                                    <td><a href='{$row['url']}' class='ticket-url' title='{$row['url']}'>{$row['url']}</a></td>
                                    <td>
                                        <a href='#' title='Edit'><i class='fas fa-edit action-icon edit' onclick='editTicket(this)'></i></a>&nbsp;
                                        <a href='#' title='Pull Request'><i class='fab fa-bitbucket action-icon pr' onclick='pullRequest(this)'></i></a>&nbsp;
                                        <a href='#' title='Delete'><i class='fas fa-trash-alt action-icon delete' onclick='deleteTicket(this)'></i></a>
                                    </td>
                                </tr>";
                            $rowNum++;
                        }
                    ?>
                </tbody>

            </table>
          <?php
                $totalPages = ceil($totalRows / $limit);
                if ($totalPages > 1): ?>
                <div class="pagination">
                    <?php for ($i = 1; $i <= $totalPages; $i++): ?>
                        <a href="?page=<?php echo $i; ?>" class="<?php echo $i == $page ? 'active' : ''; ?>">
                            <?php echo $i; ?>
                        </a>
                    <?php endfor; ?>
                </div>
                <?php endif; ?>

            <div class="footer-info">
                <?php
                $rowText = $totalRows == 1 ? "row" : "rows";
                $pageText = $totalPages == 1 ? "page" : "pages";
                echo "$totalRows $rowText • $totalPages $pageText";
                ?>
            </div>
        </div>

        <div class="footer-actions">
            <!-- <a href="#" class="btn btn-secondary">Go Back</a>
            <div>
                <a href="#" class="btn btn-danger" onclick="showCancelAlert()">Cancel import</a>
                <a href="#" class="btn btn-primary" onclick="showSuccessAlert()">Save</a>
            </div> -->
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="./js/script.js"></script>
    <script src="./js/navigator.js"></script>
</body>
</html>