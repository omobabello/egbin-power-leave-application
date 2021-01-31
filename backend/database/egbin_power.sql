-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2021 at 04:26 PM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `egbin_power`
--
CREATE DATABASE IF NOT EXISTS `egbin_power` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `egbin_power`;

-- --------------------------------------------------------

--
-- Table structure for table `approvedleaverequests`
--

CREATE TABLE `approvedleaverequests` (
  `ApprovalID` varchar(255) NOT NULL,
  `LeaveID` varchar(255) NOT NULL,
  `LeaveBalanceBefore` int(11) NOT NULL,
  `LeaveBalanceAfter` int(11) NOT NULL,
  `ApprovedBy` int(11) NOT NULL,
  `ApprovalComment` text,
  `DateApproved` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `approvedleaverequests`
--

INSERT INTO `approvedleaverequests` (`ApprovalID`, `LeaveID`, `LeaveBalanceBefore`, `LeaveBalanceAfter`, `ApprovedBy`, `ApprovalComment`, `DateApproved`) VALUES
('4dfb56ad-8c06-4a22-985f-4a57a25c60c7', '018d6740-799c-4280-a90a-9e9f8b6bbb25', 8, 8, 16, 'Get well soon', '2021-01-31 15:43:53'),
('69af6ba4-74fd-40c0-b517-1feb17b78cd9', 'fa2b5338-eb93-4ea6-8da3-46a2512223cc', 5, 1, 2, 'Go to the farm and have fun my boy', '2021-01-30 08:21:45');

-- --------------------------------------------------------

--
-- Table structure for table `leaverequests`
--

CREATE TABLE `leaverequests` (
  `LeaveID` varchar(255) NOT NULL,
  `LeaveType` varchar(255) NOT NULL,
  `RequestComment` text NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `RequestedBy` int(11) NOT NULL,
  `DateRequested` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rejectedleaverequests`
--

CREATE TABLE `rejectedleaverequests` (
  `RejectionID` varchar(255) NOT NULL,
  `LeaveID` varchar(255) NOT NULL,
  `RejectedBy` int(11) NOT NULL,
  `RejectionComment` text NOT NULL,
  `DateRejected` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `staffs`
--

CREATE TABLE `staffs` (
  `ID` int(11) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `IsLineManager` tinyint(1) NOT NULL,
  `LineManager` int(11) DEFAULT NULL,
  `SickLeaveBalance` int(11) NOT NULL,
  `ExamLeaveBalance` int(11) NOT NULL,
  `CompassionateLeaveBalance` int(11) NOT NULL,
  `AnnualLeaveBalance` int(11) NOT NULL,
  `DateRegistered` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `approvedleaverequests`
--
ALTER TABLE `approvedleaverequests`
  ADD PRIMARY KEY (`ApprovalID`),
  ADD UNIQUE KEY `LeaveID` (`LeaveID`);

--
-- Indexes for table `leaverequests`
--
ALTER TABLE `leaverequests`
  ADD PRIMARY KEY (`LeaveID`);

--
-- Indexes for table `rejectedleaverequests`
--
ALTER TABLE `rejectedleaverequests`
  ADD PRIMARY KEY (`RejectionID`),
  ADD UNIQUE KEY `LeaveID` (`LeaveID`);

--
-- Indexes for table `staffs`
--
ALTER TABLE `staffs`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `staffs`
--
ALTER TABLE `staffs`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
