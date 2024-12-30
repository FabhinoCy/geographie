<?php

namespace App\Controller;

use App\Entity\Game;
use App\Entity\User;
use App\Repository\GameRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
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
        return $this->render('game/capitales_europe.html.twig', [
            'nbGames' => count($gameRepository->findBy(['type' => 'capitales-europe'])),
        ]);
    }

    #[Route('{type}/stats')]
    public function quizStats(string $type, GameRepository $gameRepository): Response
    {
        $bestScore = 'X';

        if ($this->getUser() instanceof User) {
            $games = $gameRepository->findBy(['type' => $type, 'user' => $this->getUser()]);

            if (!empty($games)) {
                $bestScore = max(array_map(fn($game) => $game->getResult(), $games));
            }
        }

        $allScores = $gameRepository->findUsersWithTheirBestScore($type);

        $distinctPlayersCount = count($allScores);

        $position = 1;

        foreach ($allScores as $score) {
            if ($score['user_id'] == $this->getUser()->getId()) {
                break;
            }
            $position++;
        }

        return $this->render('game/other_stats.html.twig', [
            'bestScore'            => $bestScore,
            'position'             => $position > $distinctPlayersCount ? 'x' : $position,
            'distinctPlayersCount' => $distinctPlayersCount
        ]);
    }

    /**
     * @throws Exception
     */
    #[Route('scoreboard/{type}')]
    public function scoreboard(string $type, GameRepository $gameRepository): Response
    {
        $month = $gameRepository->findBestScoresOfMonth($type, 'month');
        $week  = $gameRepository->findBestScoresOfMonth($type, 'week');
        $day   = $gameRepository->findBestScoresOfMonth($type, 'day');

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
