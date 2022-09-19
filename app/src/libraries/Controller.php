<?php
    class Controller {
        /**
         * Creates new model instance.
         * @param string $model Model to instantiate
         */
        protected function model($model) {
            require_once '../src/models/' . $model . '.php';
            return new $model();
        }
    
        /**
         * Loads the view
         * @param string $view View to render
         * @param array $data Data for View
         */
        protected function view($view, $data = []) {
            if (file_exists('../src/views/' . $view . '.php')) {
                require_once '../src/views/' . $view . '.php';
            } else {
                require_once '../src/views/404.php';
            }
        }
    }
?>