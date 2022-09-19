<?php
    class ErrorController extends Controller {
        public function index() {
            $data = [
                'title' => 'chyba'
            ];
    
            $this->view('error', $data);
        }
    
        public function page404() {
            $data = [
                'title' => 'stránka nenalezena'
            ];
    
            $this->view('404', $data);
        }
    }
?>