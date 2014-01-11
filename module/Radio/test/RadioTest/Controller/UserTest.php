<?php

namespace RadioTest\Controller;

use Doctrine\Common\DataFixtures\Executor\ORMExecutor;
use Doctrine\Common\DataFixtures\Loader;
use Doctrine\Common\DataFixtures\Purger\ORMPurger;
use Radio\Controller\Atom;
use Radio\Controller\User;
use RadioTest\Bootstrap;
use RadioTest\Fixitures\BaseData;
use Zend\Mvc\Router\Http\TreeRouteStack as HttpRouter;
use Zend\Http\Request;
use Zend\Mvc\MvcEvent;
use Zend\Mvc\Router\RouteMatch;

class UserTest extends TestBase
{

    protected function setUp()
    {
        $this->initTest("Radio\Controller\User", new User());
        $this->baseData();

    }

    public function testCurrentUser()
    {
        //when
        $this->user = null;
        $this->routeMatch->setParam('action', 'currentUser');

        $result = $this->controller->dispatch($this->request);
        $response = $this->controller->getResponse();
        //then

        $model = $this->event->getResult()->getVariables();
        $this->assertEquals([], $model);
    }

    public function testGetUser()
    {
        //when

        $this->routeMatch->setParam('id', '1');


        $result = $this->controller->dispatch($this->request);
        $response = $this->controller->getResponse();
        //then

        $model = $this->event->getResult()->getVariables();
        var_dump($model);
        $this->assertEquals('test', $model['username']);
        $this->assertEquals(1, count($model['authors']));
    }


    public function testCurrentUserReal()
    {
        //when
        $this->user = $this->createUser(1, "admin", "admin");

        $this->routeMatch->setParam('action', 'currentUser');

        $result = $this->controller->dispatch($this->request);
        $response = $this->controller->getResponse();
        //then

        $model = $this->event->getResult()->getVariables();
        $this->assertEquals('test', $model['username']);
        $this->assertEquals(1, $model['user']['id']);

    }


}

?>