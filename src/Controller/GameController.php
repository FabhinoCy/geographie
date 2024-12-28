<?php

namespace App\Controller;

use App\Entity\Game;
use App\Entity\User;
use App\Repository\GameRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/game/', name: 'app_game_')]
class GameController extends AbstractController
{
    #[Route('capitales-europe', name: 'capitales_europe')]
    public function capitalesEurope(GameRepository $gameRepository): Response
    {
        $nbGames   = count($gameRepository->findBy(['type' => 'capitales-europe']));

        $bestScore = 'X';

        if ($this->getUser() instanceof User) {
            $games     = $gameRepository->findBy(['type' => 'capitales-europe', 'user' => $this->getUser()]);
            $bestScore = 0;

            foreach ($games as $game) {
                if ($game->getResult() > $bestScore) {
                    $bestScore = $game->getResult();
                }
            }
        }

        return $this->render('game/capitales_europe.html.twig', [
            'nbGames'   => $nbGames,
            'bestScore' => $bestScore
        ]);
    }

    /**
     * @throws \Exception
     */
    #[Route('scoreboard/{type}', name: 'scoreboard')]
    public function scoreboard(string $type, GameRepository $gameRepository): Response
    {
        $month = $gameRepository->findBestScoresOfMonth('month');
        $week  = $gameRepository->findBestScoresOfMonth('week');
        $day   = $gameRepository->findBestScoresOfMonth('day');

        return $this->render('game/rankings.html.twig', [
            'monthBestScores' => $month,
            'weekBestScores'  => $week,
            'dayBestScores'   => $day,
        ]);
    }

    #[Route('save', name: 'save', methods: 'post')]
    public function save(Request $request, EntityManagerInterface $entityManager): Response
    {
        $user = $this->getUser();
        $data = $request->getContent();
        $data = json_decode($data, true);

        $game = new Game();

        $game->setScore($data['score'])
            ->setType($data['type'])
            ->setTime($data['time'])
            ->setUser($user)
            ->setResult($data['score'] * $data['time']);

        $entityManager->persist($game);
        $entityManager->flush();

        return $this->json(['ok']);
    }
}
