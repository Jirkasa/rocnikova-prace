<?php
    class PrihlaseniController extends Controller {
        public function index() {
            if (isLoggedIn()) {
                header('Location: ' . URLROOT);
                return;
            }

            $data = [
                'title' => 'Přihlášení',
                'username' => '',
                'usernameError' => '',
                'passwordError' => ''
            ];

            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $this->userModel = $this->model('User');

                $data['username'] = htmlspecialchars(trim($_POST['username']));
                $data['password'] = htmlspecialchars(trim($_POST['password']));

                if (empty($data['username'])) {
                    $data['usernameError'] = 'Nezadal jsi uživatelské jméno.';
                }
    
                if (empty($data['password'])) {
                    $data['passwordError'] = 'Nezadal jsi heslo.';
                }
    
                if (empty($data['usernameError']) && empty($data['passwordError'])) {
                    $loggedInUser = $this->userModel->login($data['username'], $data['password']);
    
                    if ($loggedInUser) {
                        // create session
                        $_SESSION['user_id'] = $loggedInUser->id;
                        $_SESSION['user_username'] = $loggedInUser->username;
    
                        header('Location: ' . URLROOT);
                    } else {
                        $data['passwordError'] = 'Špatné heslo nebo uživatelské jméno.';
    
                        $this->view('Prihlaseni', $data);
                    }
    
                    return;
                }
            }

            $this->view('Prihlaseni', $data);
        }
    }
?>