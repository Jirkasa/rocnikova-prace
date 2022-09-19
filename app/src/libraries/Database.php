<?php
    class Database {
        private $dbHost = DB_HOST;
        private $dbUser = DB_USER;
        private $dbPass = DB_PASS;
        private $dbName = DB_NAME;
        private $dbPort = DB_PORT;
    
        private $statement;
        private $dbHandler;
        private $error;
    
        private static $instance = null;
    
        private function __construct()
        {
            $conn = 'mysql:host=' . $this->dbHost . ';port=' . $this->dbPort . ';dbname=' . $this->dbName;
            $options = [
                PDO::ATTR_PERSISTENT => true,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ];
            try {
                $this->dbHandler = new PDO($conn, $this->dbUser, $this->dbPass, $options);
            } catch (PDOException $e) {
                $this->error = $e->getMessage();
                echo $this->error;
            }
        }
    
        public static function getInstance() {
            if (self::$instance == null)
            {
                self::$instance = new Database();
            }
    
            return self::$instance;
        }
    
        public function query($sql) {
            $this->statement = $this->dbHandler->prepare($sql);
        }
    
        public function bind($parameter, $value, $type = null) {
            switch (is_null($type)) {
                case is_int($value):
                    $type = PDO::PARAM_INT;
                    break;
                case is_bool($value):
                    $type = PDO::PARAM_BOOL;
                    break;
                case is_null($value):
                    $type = PDO::PARAM_NULL;
                    break;
                default:
                    $type = PDO::PARAM_STR;
            }
            $this->statement->bindValue($parameter, $value, $type);
        }
    
        // executes statement
        public function execute() {
            return $this->statement->execute();
        }
    
        // returns array
        public function resultSet() {
            $this->execute();
            return $this->statement->fetchAll(PDO::FETCH_OBJ);
        }
    
        // returns single row
        public function single() {
            $this->execute();
            return $this->statement->fetch(PDO::FETCH_OBJ);
        }
    }
?>