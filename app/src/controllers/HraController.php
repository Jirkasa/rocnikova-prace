<?php
    class HraController extends Controller {
        public function index() {
            $data = [
                'score' => 0
            ];

            if (isLoggedIn()) {
                $this->userModel = $this->model('User');

                $user = $this->userModel->getUserById($_SESSION['user_id']);

                $data["score"] = $user->high_score ? $user->high_score : 0;
            }

            $this->view('Hra', $data);
        }

        public function save() {
            if ($_SERVER['REQUEST_METHOD'] == 'POST' && isLoggedIn()) {
                $this->userModel = $this->model('User');

                $this->userModel->saveHighScore($_SESSION['user_id'], $_POST['score']);

                echo $_POST['score'];
            }
        }
    }
?>