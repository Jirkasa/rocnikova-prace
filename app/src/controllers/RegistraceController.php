<?php
    class RegistraceController extends Controller {
        public function index() {
            if (isLoggedIn()) {
                header('Location: ' . URLROOT);
                return;
            }

            $data = [
                'title' => "Registrace",
                'username' => '',
                'password' => '',
                'confirmPassword' => '',
                'usernameError' => '',
                'passwordError' => '',
                'confirmPasswordError' => ''
            ];

            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $this->userModel = $this->model('User');

                $data['username'] = htmlspecialchars(trim($_POST['username']));
                $data['password'] = htmlspecialchars(trim($_POST['password']));
                $data['confirmPassword'] = htmlspecialchars(trim($_POST['password-confirm']));

                if (empty($data['username'])) {
                    $data['usernameError'] = 'Musíš zadat uživatelské jméno.';
                } else if (mb_strlen($data['username']) < 3) {
                    $data['usernameError'] = 'Uživatelské jméno musí být dlouhé minimálně 3 znaky.';
                } else if (mb_strlen($data['username']) > 30) {
                    $data['usernameError'] = 'Uživatelské jméno může mít délku maximálně 30 znaků.';
                } else if ($this->userModel->getUserByUsername($data['username']) !== false) {
                    $data['usernameError'] = 'Toto uživatelské jméno má již někdo jiný.';
                }
    
                if (empty($data['password'])) {
                    $data['passwordError'] = "Musíš zadat heslo.";
                } else if (strlen($data['password']) < 6) {
                    $data['passwordError'] = 'Heslo musí být dlouhé alespoň 6 znaků.';
                } else if (strlen($data['password'] > 32)) {
                    $data['passwordError'] = 'Heslo může mít maximálně 32 znaků.';
                } else if (!preg_match('@[0-9]@', $data['password'])) {
                    $data['passwordError'] = 'Heslo musí obsahovat alespoň jednu číselnou hodnotu.';
                }
    
                if (empty($data['confirmPassword'])) {
                    $data['confirmPasswordError'] = 'Musíš potvrdit své heslo.';
                } else if ($data['password'] != $data['confirmPassword']) {
                    $data['confirmPasswordError'] = 'Zadaná hesla se neshodují.';
                }
    
                if (empty($data['usernameError']) && empty($data['passwordError']) && empty($data['confirmPasswordError'])) {
                    $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
    
                    if ($this->userModel->register($data['username'], $data['password'])) {
                        $user = $this->userModel->getUserByUsername($data['username']);
    
                        if ($user === false) {
                            header('Location: ' . URLROOT);
                            return;
                        }
    
                        // create session
                        $_SESSION['user_id'] = $user->id;
                        $_SESSION['user_username'] = $user->username;
    
                        header('Location: ' . URLROOT);
                    } else {
                        die('Něco se nepovedlo. :(');
                    }
                } else {
                    $this->view('Registrace', $data);
                }
                
                return;
            }

            $this->view('Registrace', $data);
        }
    }
?>