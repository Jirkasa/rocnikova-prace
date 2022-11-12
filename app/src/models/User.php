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