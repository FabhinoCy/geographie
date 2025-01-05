<?php

namespace App\Controller;

use App\Form\UserEditFormType;
use App\Repository\GameRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Translation\TranslatorBagInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class ProfilController extends AbstractController
{
    /**
     * @throws \Exception
     */
    #[Route('/profil', name: 'app_profil')]
    public function index(Request $request, EntityManagerInterface $entityManager, GameRepository $gameRepository): Response
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

            return $this->redirectToRoute('app_profil');
        }

        $gameOfCurrentUser = $gameRepository->findBy(['user' => $user], ['type' => 'ASC']);
        $gamesByType       = [];

        foreach ($gameOfCurrentUser as $game) {
            $type = $game->getType();
            if (!isset($gamesByType[$type])) {
                $gamesByType[$type] = [];
            }
            $gamesByType[$type][] = $game;
        }

        foreach ($gamesByType as $type => $games) {
            usort($games, function($a, $b) {
                return $b->getCreatedAt()->getTimestamp() - $a->getCreatedAt()->getTimestamp();
            });
            $gamesByType[$type] = $games;
        }

        return $this->render('profil/index.html.twig', [
            'form'        => $form,
            'gamesByType' => $gamesByType,
        ]);
    }
}
