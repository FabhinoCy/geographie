<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
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

    #[Route('test', name: 'test')]
    public function test(Request $request)
    {
        dd($request);
    }

    #[Route('capitales-afrique', name: 'capitales_afrique')]
    public function capitalesAfrique(): Response
    {
        return $this->render('game/capitales_afrique.html.twig');
    }

    #[Route('capitales-asie', name: 'capitales_asie')]
    public function capitalesAsie(): Response
    {
        return $this->render('game/capitales_asie.html.twig');
    }

    #[Route('capitales-oceanie', name: 'capitales_oceanie')]
    public function capitalesOceanie(): Response
    {
        return $this->render('game/capitales_oceanie.html.twig');
    }
}
