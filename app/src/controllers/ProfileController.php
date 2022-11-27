<?php
    class ProfileController extends Controller {
        public function index() {
            if (isLoggedIn()) {
                $this->userModel = $this->model('User');

                $user = $this->userModel->getUserById($_SESSION['user_id']);

                $score = $user->high_score ? $user->high_score : 0;

                $this->view('Profile', ["score" => $score]);
            } else {
                header('Location: ' . URLROOT . "/prihlaseni");
                return;
            }
        }
    }
?>