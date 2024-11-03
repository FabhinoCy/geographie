<?php

namespace App\Controller;

use App\Repository\CapitalRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/game/', name: 'app_game_')]
class GameController extends AbstractController
{
    #[Route('capitales-europe', name: 'capitales_europe')]
    public function capitalesEurope(): Response
    {
        return $this->render('game/capitale_europe.html.twig', [

        ]);
    }

    #[Route('capitales-europe-data', name:'capitales_europe_data')]
    public function dataCapitalesEurope(
        CapitalRepository $capitalRepository,
    ): JsonResponse
    {
        $capitals = $capitalRepository->findCapitalsByContinent('Europe');

        $array = [];

        foreach ($capitals as $capital) {
            $capitalName = $capital->getName();
            $countryName = $capital->getCountry()->getName();
            $array[] = [
                'capital' => $capitalName,
                'country' => $countryName,
            ];
        }

        return $this->json($array);
    }
}
