<?php
    class User {
        private $db;

        public function __construct() {
            $this->db = Database::getInstance();
        }

        public function getUserByUsername($username) {
            $this->db->query('SELECT * FROM KNS_users WHERE username = :username;');
    
            $this->db->bind(':username', $username);
    
            $user = $this->db->single();
    
            return $user;
        }

        public function getUserById($id) {
            $this->db->query('SELECT * FROM KNS_users WHERE id = :id;');

            $this->db->bind(':id', $id);

            $user = $this->db->single();

            return $user;
        }

        public function getLeaderboardPage($page, $itemsPerPage) {
            $skip = ($page - 1) * $itemsPerPage;

            $this->db->query('SELECT * FROM KNS_users WHERE high_score IS NOT NULL ORDER BY high_score DESC LIMIT :skip, :limit;');

            $this->db->bind(":skip", $skip);
            $this->db->bind(":limit", $itemsPerPage);

            $users = $this->db->resultSet();

            return $users;
        }

        public function countParticipatingUsers() {
            $this->db->query('SELECT COUNT(*) AS count FROM KNS_users WHERE high_score IS NOT NULL;');

            $result = $this->db->single();

            return $result->count;
        }

        public function saveHighScore($userId, $score) {
            $this->db->query('UPDATE KNS_users SET high_score = :score WHERE id = :id AND (:score > high_score OR high_score IS NULL)');
            $this->db->bind(':score', $score);
            $this->db->bind(':id', $userId);

            $this->db->execute();
        }

        public function register($username, $hashedPassword) {
            $this->db->query('INSERT INTO KNS_users (username, password) VALUES (:username, :password);');
    
            $this->db->bind(':username', $username);
            $this->db->bind(':password', $hashedPassword);
    
            if ($this->db->execute()) {
                return true;
            } else {
                return false;
            }
        }

        public function login($username, $password) {
            $this->db->query('SELECT * FROM KNS_users WHERE username = :username');
    
            $this->db->bind(':username', $username);
    
            $row = $this->db->single();
    
            $hashedPassword = $row->password;
    
            if (password_verify($password, $hashedPassword)) {
                return $row;
            } else {
                return false;
            }
        }
    }
?>