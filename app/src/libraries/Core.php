<?php
    /**
     * App Core Class
     * Creates URL & loads controller
     * URL FORMAT - /controller/method/params
     */
    class Core {
        protected $currentController = 'ErrorController';
        protected $currentMethod = 'page404';
        protected $params = [];

        public function __construct() {
            $url = $this->getUrl();

            if (count($url) > 0) {
                $url[0] = mb_ereg_replace('-', ' ', $url[0]);
                $url[0] = ucwords($url[0]);
                $url[0] = mb_ereg_replace(' ', '', $url[0]);
            }

            // get controller based on url if it exists
            if (count($url) === 0) {
                $this->currentController = "HomeController";
            } else if (isset($url[0]) && file_exists('../src/controllers/' . ucwords($url[0]) . 'Controller.php')) {
                $this->currentController = ucwords($url[0]) . 'Controller';
                unset($url[0]);
            }

            // require controller
            require_once '../src/controllers/' . $this->currentController . '.php';

            // create controller
            $this->currentController = new $this->currentController;

            // check second part of url (controller method)
            if (isset($url[1])) {
                // check whether method exists in controller
                if (method_exists($this->currentController, $url[1])) {
                    $this->currentMethod = $url[1];
                    unset($url[1]);
                } else {
                    $this->currentMethod = 'index';
                }
            } else if (count($url) === 0) {
                $this->currentMethod = "index";
            }

            // get parameters from URL for Controller method
            $this->params = $url ? array_values($url) : [];

            // call controller method
            call_user_func_array([$this->currentController, $this->currentMethod], $this->params);
        }


        /**
         * returns URL in array
         * @return array URL in array
         */
        public function getUrl() {
            if (isset($_GET['url'])) {
                $url = rtrim($_GET['url'], '/');
                $url = filter_var($url, FILTER_SANITIZE_URL);
                $url = explode('/', $url);
                return $url;
            } else {
                return [];
            }
        }
    }
?>