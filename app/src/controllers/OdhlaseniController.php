<?php

class OdhlaseniController extends Controller {
    public function index() {
        if (!isLoggedIn()) {
            header('Location: ' . URLROOT . "/prihlaseni");
            return;
        }

        unset($_SESSION['user_id']);
        unset($_SESSION['user_username']);
        $this->view("Odhlaseni");
    }
}