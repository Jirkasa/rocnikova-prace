<?php
    class HomeController extends Controller {
        public function index() {
            $this->userModel = $this->model('User');

            $rowCount = $this->userModel->countParticipatingUsers();
            $itemsPerPage = 10;
            $pageCount = (int)ceil($rowCount/$itemsPerPage);

            $page = 1;

            $users = [];
            if ($pageCount > 0) {
                $users = $this->userModel->getLeaderboardPage($page, $itemsPerPage);
            }

            $data = [
                'leaderboardUsers' => $users
            ];

            $this->view('Home', $data);
        }
    }
?>