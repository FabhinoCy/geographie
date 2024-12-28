<?php

namespace App\Controller;

use App\Form\UserEditFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ProfilController extends AbstractController
{
    /**
     * @throws \Exception
     */
    #[Route('/profil', name: 'app_profil')]
    public function index(Request $request, EntityManagerInterface $entityManager): Response
    {
        $user = $this->getUser();
        $form = $this->createForm(UserEditFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $request->request->all()['user_edit_form'];


            $user->setPseudo($data['pseudo']);
            $user->setLastname($data['lastname']);
            $user->setFirstname($data['firstname']);
            $user->setBirthday(new \DateTimeImmutable($data['birthday']));

            $entityManager->persist($user);
            $entityManager->flush();

            return $this->redirectToRoute('app_home');
        }

        return $this->render('profil/index.html.twig', [
            'form' => $form,
        ]);
    }
}
