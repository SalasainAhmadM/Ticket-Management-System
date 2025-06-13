<?php
session_start();
require_once './conn/conn.php';
date_default_timezone_set('Asia/Manila');
$userQuery = "SELECT first_name, m_name, last_name, role, image FROM user WHERE id = 1 LIMIT 1";
$userResult = mysqli_query($conn, $userQuery);
$userFullName = "Unknown User";
$userImage = './img/jira.png';

if ($userRow = mysqli_fetch_assoc($userResult)) {
    $userFullName = $userRow['first_name'] . ' ' . $userRow['m_name'] . '.' . ' ' . $userRow['last_name'];
    $role = $userRow['role'] ?? 'User';
    $userImage = !empty($userRow['image']) ? './img/' . $userRow['image'] : $userImage;
}

$limit = 10;
$page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
$offset = ($page - 1) * $limit;

$ticketsQuery = "SELECT * FROM pull_request LIMIT $limit OFFSET $offset";
$ticketsResult = mysqli_query($conn, $ticketsQuery);

// Get total count for footer
$countResult = mysqli_query($conn, "SELECT COUNT(*) as total FROM pull_request");
$countRow = mysqli_fetch_assoc($countResult);
$totalRows = $countRow['total'];
$totalColumns = mysqli_num_fields($ticketsResult);

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pull Request - Ticket Management System</title>
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
                        <img src="<?php echo htmlspecialchars($userImage); ?>" alt="File Image">
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
            <div class="step completed">
                <div class="step-number">
                    <i class="fab fa-jira"></i>
                </div>
                <span class="step-text"> Jira Tickets</span>
            </div>
            <div class="step-separator"></div>
            <div class="step active current">
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
        <div class="controls-row-pull-request">

            <input type="text" class="search-input" id="search-input" placeholder="Search Tickets...">
            <input type="date" class="date-filter" id="date-filter" placeholder="Filter by Date">
            <button class="reset-button" onclick="resetPRPage()">
                <i class="fas fa-refresh"></i>
            </button>

        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th><i class="fas fa-ticket-alt column-icon text"></i>Ticket #</th>
                        <th><i class="fas fa-user-circle column-icon department"></i>Sir Jay</th>
                        <th><i class="fas fa-user-circle column-icon department"></i>Ma'am Kerima</th>
                        <th><i class="fas fa-user-circle column-icon department"></i>Ma'am Arlene</th>
                        <th><i class="fas fa-tasks column-icon number"></i>Status</th>
                        <th><i class="fas fa-calendar-plus column-icon date"></i>Date Created</th>
                        <th><i class="fas fa-link column-icon text"></i>URL</th>
                        <th><i class="fas fa-cogs column-icon action"></i>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $query = "
                        SELECT pr.*, jt.ticket_num 
                        FROM pull_request pr
                        JOIN jira_tickets jt ON pr.jira_ticket_id = jt.id
                        ORDER BY pr.created_at DESC
                    ";

                    $result = mysqli_query($conn, $query);

                    if (mysqli_num_rows($result) > 0) {
                        $rowNum = 1;
                        while ($pullRequest = mysqli_fetch_assoc($result)) {
                            $url = $pullRequest['url'] ?? '#';
                            $status = $pullRequest['status'] ?? 'Pending';
                            $dateCreated = date("d M y", strtotime($pullRequest['created_at']));

                            $reviewer1Status = $pullRequest['reviewer_1'] ? 'Approved' : 'Not Approved Yet';
                            $reviewer2Status = $pullRequest['reviewer_2'] ? 'Approved' : 'Not Approved Yet';
                            $reviewer3Status = $pullRequest['reviewer_3'] ? 'Approved' : 'Not Approved Yet';

                            $reviewer1Class = $pullRequest['reviewer_1'] ? 'approved' : 'not-approved';
                            $reviewer1Icon = $pullRequest['reviewer_1'] ? 'fa-thumbs-up' : 'fa-thumbs-down';

                            $reviewer2Class = $pullRequest['reviewer_2'] ? 'approved' : 'not-approved';
                            $reviewer2Icon = $pullRequest['reviewer_2'] ? 'fa-thumbs-up' : 'fa-thumbs-down';

                            $reviewer3Class = $pullRequest['reviewer_3'] ? 'approved' : 'not-approved';
                            $reviewer3Icon = $pullRequest['reviewer_3'] ? 'fa-thumbs-up' : 'fa-thumbs-down';

                            $ticketNum = $pullRequest['ticket_num'] ?? 'No Ticket Number';

                            echo "<tr id='{$pullRequest['jira_ticket_id']}'>
                        <td class='row-number'>{$rowNum}</td>
                        <td>{$ticketNum}</td>
                        <td class='reviewer-td-status'>
                            <span class='reviewer-status {$reviewer1Class}'>
                                <i class='fas {$reviewer1Icon}'></i> {$reviewer1Status}
                            </span>
                        </td>
                        <td class='reviewer-td-status'>
                            <span class='reviewer-status {$reviewer2Class}'>
                                <i class='fas {$reviewer2Icon}'></i> {$reviewer2Status}
                            </span>
                        </td>
                        <td class='reviewer-td-status'>
                            <span class='reviewer-status {$reviewer3Class}'>
                                <i class='fas {$reviewer3Icon}'></i> {$reviewer3Status}
                            </span>
                        </td>
                        <td><span class='status-badge'>{$status}</span></td>
                        <td>{$dateCreated}</td>
                        <td><a href='{$url}' class='ticket-url' title='{$url}' target='_blank'>{$url}</a></td>
                        <td style='text-align: center;'>
                            <a href='#' title='Edit'><i class='fas fa-edit action-icon edit' onclick='editPullRequest(this)'></i></a>&nbsp;
                            <a href='#' title='Delete'><i class='fas fa-trash-alt action-icon delete' onclick='deletePullRequest(this)'></i></a>
                        </td>
                    </tr>";

                            $rowNum++;
                        }
                    } else {
                        echo "<tr><td colspan='9' class='empty-message'>No data found</td></tr>";
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
    <script src="./js/sweetalert.js"></script>
</body>

</html>