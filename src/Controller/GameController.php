<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/game/', name: 'app_game_')]
class GameController extends AbstractController
{
    #[Route('capitales-europe', name: 'capitales_europe')]
    public function capitalesEurope(): Response
    {
        return $this->render('game/capitales_europe.html.twig');
    }
}
