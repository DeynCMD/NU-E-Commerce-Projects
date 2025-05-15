-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2025 at 08:16 PM
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
-- Database: `nubex_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `rating` decimal(2,1) NOT NULL,
  `material` varchar(255) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `product_condition` varchar(50) DEFAULT NULL,
  `product_type` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `name`, `price`, `rating`, `material`, `color`, `manufacturer`, `product_condition`, `product_type`, `gender`, `image_url`, `stock_quantity`) VALUES
(1, 'NU Flask', 699.00, 4.9, 'Stainless Steel', 'White', 'National University Philippines', 'Sealed/New', 'Flask', 'Unisex', '../assets/images/flask.png', 100);

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `id` int(11) NOT NULL,
  `id_number` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `branch` enum('laguna','manila','moa','lipa','fairview','clark','baliwag','nazareth','dasmariñas','eastortigas','bacolod') NOT NULL,
  `user_type` enum('student','staff') NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`id`, `id_number`, `password`, `branch`, `user_type`, `name`, `email`) VALUES
(4, '2023-120346', '$2y$10$JctrJtgex0T5HBUUpbUnMOiay0CPTMNzAAIxqjM.mNq3E/LGhzMr2', 'laguna', 'student', '', ''),
(5, '2023-120346', '$2y$10$tFCDpUViVmWoHNwnbnHPRutjeLe6mRFg0UihgtFzTMb4AU8q1Nfu2', 'laguna', 'student', '', ''),
(6, '2023-120346', '$2y$10$2GGsfYcEDcQkdSS/E2buPuCLyXKoCmUvBYryu3pCwM9GyvUAL.85i', 'laguna', 'student', '', ''),
(7, '2023-120346', '$2y$10$hmaTkXFSV1B1HKexbyuPS.bjTuV9yLcz29a82zfMCGOmSXyfuxNde', 'laguna', 'student', '', ''),
(8, '2023-120346', '$2y$10$vPBT78qebK2RoU4sIpF5EuAzJ9QalUM.mx.ecQJmMsatQz3iOE4R.', 'laguna', 'student', '', ''),
(9, '2023-120346', '$2y$10$jFsJJTMeqAttoAqUPdCcfOVGUoPDKE8jusfIsg0mL8BLZ5LqahMJO', 'laguna', 'student', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
