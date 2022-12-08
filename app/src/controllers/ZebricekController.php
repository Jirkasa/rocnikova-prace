<?php
    class ZebricekController extends Controller {
        public function index() {
            $this->userModel = $this->model('User');

            $rowCount = $this->userModel->countParticipatingUsers();
            $itemsPerPage = 10;
            $pageCount = (int)ceil($rowCount/$itemsPerPage);

            $page = 1;
            if (isset($_GET['page'])) {
                $page = (int)$_GET['page'];

                if (!is_numeric($page)) {
                    $page = 1;
                }
            }
            if ($page < 1) {
                $page = 1;
            } else if ($page > $pageCount) {
                $page = $pageCount;
            }

            $users = [];
            if ($pageCount > 0) {
                $users = $this->userModel->getLeaderboardPage($page, $itemsPerPage);
            }

            $data = [
                'title' => "Žebříček",
                'users' => $users,
                'activePage' => $page,
                'pageCount' => $pageCount,
                'itemsPerPage' => $itemsPerPage
            ];

            $this->view('Zebricek', $data);
        }
    }
?>