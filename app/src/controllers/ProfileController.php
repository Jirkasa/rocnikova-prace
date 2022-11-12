<?php
    class ProfileController extends Controller {
        public function index() {
            if (isLoggedIn()) {
                $this->view('Profile');
            } else {
                header('Location: ' . URLROOT . "/prihlaseni");
                return;
            }
        }
    }
?>