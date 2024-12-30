<?php

namespace App\Repository;

use App\Entity\Game;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Exception;

/**
 * @extends ServiceEntityRepository<Game>
 */
class GameRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Game::class);
    }

    /**
     * @throws Exception
     */
    public function findBestScoresOfMonth(string $type, string $period)
    {
        return $this->createQueryBuilder('game')
            ->select('game')
            ->innerJoin('game.user', 'user')
            ->where('game.type = :type')
            ->andWhere('game.createdAt BETWEEN :startDate AND :endDate')
            ->andWhere('game.user IS NOT NULL')
            ->andWhere('game.result = (
                SELECT MAX(g2.result)
                FROM App\Entity\Game g2
                WHERE g2.user = game.user
            )')
            ->setParameter('type', $type)
            ->setParameter('startDate', new \DateTime('-1 ' . $period))
            ->setParameter('endDate', new \DateTime())
            ->setMaxResults(25)
            ->orderBy('game.result', 'DESC')
            ->getQuery()
            ->getResult();
    }

    public function findUsersWithTheirBestScore(string $type)
    {
        return $this->createQueryBuilder('game')
            ->innerJoin('game.user', 'u')
            ->select('u.id AS user_id', 'MAX(game.result) AS max_result')
            ->where('game.type = :type')
            ->andWhere('game.user IS NOT NULL')
            ->setParameter('type', $type)
            ->groupBy('u.id')
            ->orderBy('max_result', 'DESC')
            ->getQuery()
            ->getResult();
    }
}
