<?php

namespace Radio\Controller;

use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
use Doctrine\ORM\EntityManager;

class Show extends AbstractRestfulController {

    protected $em;

    public function getEntityManager() {
        if (null === $this->em) {
            $this->em = $this->getServiceLocator()->get('doctrine.entitymanager.orm_default');
        }
        return $this->em;
    }

    public function getList() {
        try {
            $resultSet = $this->getEntityManager()->getRepository("\Radio\Entity\Show")->findAll();
            $return = [];
            foreach ($resultSet as $result) {
                $a = $result->toArray();
                foreach ($result->getAuthors() as $author) {
                    $a['authors'][] = array('id' => $author->getId(), 'nick' => $author->getNick());
                }
                $return[] = $a;
            }
            return new JsonModel($return);
        } catch (Exception $ex) {
            $this->getResponse()->setStatusCode(500);
            return new JsonModel(array("error" => $ex->getMessage()));
        }
    }

    public function get($id) {
        //try {
        $result = $this->getEntityManager()->find("\Radio\Entity\Show", $id);
        if ($result == null) {
            $this->getResponse()->setStatusCode(404);
            return new JsonModel(array("error" => "Not found"));
        } else {
            $a = $result->toArray();
            foreach ($result->getAuthors() as $author) {
                $a['authors'][] = array('id' => $author->getId(), 'nick' => $author->getNick());
            }

            return new JsonModel($a);
        }
        /* } catch (\Exception $ex) {
          $this->getResponse()->setStatusCode(500);
          return new JsonModel(array("error" => $ex->getMessage()));
          } */
    }

}
