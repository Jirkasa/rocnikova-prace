-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Sob 12. lis 2022, 13:20
-- Verze serveru: 10.4.14-MariaDB
-- Verze PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `rocnikova_prace`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `kns_users`
--

CREATE TABLE `kns_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(30) COLLATE utf8mb4_czech_ci NOT NULL,
  `password` varchar(256) COLLATE utf8mb4_czech_ci NOT NULL,
  `high_score` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `kns_users`
--
ALTER TABLE `kns_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `kns_users`
--
ALTER TABLE `kns_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
