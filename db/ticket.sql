-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2025 at 06:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ticket`
--

-- --------------------------------------------------------

--
-- Table structure for table `jira_tickets`
--

CREATE TABLE `jira_tickets` (
  `id` int(11) NOT NULL,
  `ticket_num` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `assignee` varchar(100) DEFAULT NULL,
  `status` enum('pending','in progress','completed','urgent') DEFAULT 'pending',
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_finished` datetime DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jira_tickets`
--

INSERT INTO `jira_tickets` (`id`, `ticket_num`, `description`, `assignee`, `status`, `date_created`, `date_finished`, `url`) VALUES
(1, 'SS-13401', 'URGENT All Apps: Route Manager > Disable of editing Default Route Name', 'ma\'am Arlene', 'completed', '2025-05-14 00:00:00', '2025-05-21 00:00:00', 'https://mstream.atlassian.net/browse/SS-13401'),
(2, 'SS-13746', 'All Apps: Vendors > Shopping List/Receive Goods > Use by date alert', 'ma\'am Arlene', 'completed', '2025-05-22 00:00:00', '2025-05-28 00:00:00', 'https://mstream.atlassian.net/browse/SS-13746'),
(3, 'SS-13759', 'App BigLoaf: Optimoroute > Not enabling to send Customers Proof of Delivery', 'sir Jay', 'completed', '2025-05-30 00:00:00', '2025-06-05 00:00:00', 'https://mstream.atlassian.net/browse/SS-13759'),
(4, 'SS-13726', 'App Catapult: Unexpected Error on Customer Dashboard', 'ma\'am Kerima', 'completed', '2025-05-23 00:00:00', '2025-05-23 00:00:00', 'https://mstream.atlassian.net/browse/SS-13726'),
(5, 'SS-13720', 'All Apps: Reject Payments > Remittance Modal - Show who rejected', 'ma\'am Kerima', 'completed', '2025-05-16 00:00:00', '2025-06-02 00:00:00', 'https://mstream.atlassian.net/browse/SS-13720'),
(6, 'SS-13787', 'Import Orders - Customers Module', 'sir Jay', 'pending', '2025-05-30 00:00:00', '0000-00-00 00:00:00', 'https://mstream.atlassian.net/browse/SS-13787?linkSource=email'),
(7, 'SS-13788', 'Xero (API) - Manual Import Payment set default Bank', 'sir Jay', 'in progress', '2025-05-30 00:00:00', '0000-00-00 00:00:00', 'https://mstream.atlassian.net/browse/SS-13788'),
(8, 'SS-13790', 'Proof of Delivery - List add \"Pending\" if on if no POD has been created', 'sir Jay', 'pending', '2025-05-30 00:00:00', '0000-00-00 00:00:00', 'https://mstream.atlassian.net/browse/SS-13790'),
(9, 'SS-13763', 'App Catapultnw: Error page', 'ma\'am Arlene', 'completed', '2025-06-02 00:00:00', '2025-06-09 00:00:00', 'https://mstream.atlassian.net/browse/SS-13763');

-- --------------------------------------------------------

--
-- Table structure for table `pull_request`
--

CREATE TABLE `pull_request` (
  `id` int(11) NOT NULL,
  `jira_ticket_id` int(11) NOT NULL,
  `reviewer_1` tinyint(1) DEFAULT 0,
  `reviewer_2` tinyint(1) DEFAULT 0,
  `reviewer_3` tinyint(1) DEFAULT 0,
  `status` varchar(50) DEFAULT 'Under Review',
  `created_at` datetime DEFAULT current_timestamp(),
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pull_request`
--

INSERT INTO `pull_request` (`id`, `jira_ticket_id`, `reviewer_1`, `reviewer_2`, `reviewer_3`, `status`, `created_at`, `url`) VALUES
(1, 1, 1, 1, 0, 'Under Review', '2025-06-11 21:03:10', 'https://bitbucket.org/mountainstream/streamfrommountain/pull-requests/1907'),
(2, 2, 1, 1, 0, 'Under Review', '2025-06-11 21:55:30', 'https://bitbucket.org/mountainstream/streamfrommountain/pull-requests/1915'),
(3, 3, 1, 1, 1, 'For Merging', '2025-06-11 22:10:03', 'https://bitbucket.org/mountainstream/streamfrommountain/pull-requests/1917'),
(4, 4, 1, 1, 0, 'Under Review', '2025-06-11 22:15:18', 'https://bitbucket.org/mountainstream/streamfrommountain/pull-requests/1914'),
(5, 5, 1, 1, 0, 'For Merging', '2025-06-11 22:22:16', 'https://bitbucket.org/mountainstream/streamfrommountain/pull-requests/1925'),
(6, 9, 1, 1, 0, 'Under Review', '2025-06-11 22:23:25', 'https://bitbucket.org/mountainstream/streamfrommountain/pull-requests/1928');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `m_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `m_name`, `last_name`, `email`, `image`, `role`) VALUES
(1, 'Gold', 'D', 'Roger', 'kaizoku@gmail.com', 'kaizoku.jpg', 'Backend Developer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jira_tickets`
--
ALTER TABLE `jira_tickets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pull_request`
--
ALTER TABLE `pull_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_jira_ticket` (`jira_ticket_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jira_tickets`
--
ALTER TABLE `jira_tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `pull_request`
--
ALTER TABLE `pull_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pull_request`
--
ALTER TABLE `pull_request`
  ADD CONSTRAINT `fk_jira_ticket` FOREIGN KEY (`jira_ticket_id`) REFERENCES `jira_tickets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
