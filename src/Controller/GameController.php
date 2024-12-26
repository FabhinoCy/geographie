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

    #[Route('test', name: 'test', methods: 'post')]
    public function test(Request $request)
    {

        $data = $request->getContent();
        $data = json_decode($data, true);
        dd($data);

        // user
        // score
        // time
        // type
        // nombre de questions
        // resultat
    }
}
