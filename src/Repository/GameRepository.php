<?php

namespace App\Repository;

use App\Entity\Game;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

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
     * @throws \Exception
     */
    public function findBestScoresOfMonth(string $period)
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
            ->setParameter('type', 'capitales-europe')
            ->setParameter('startDate', new \DateTime('-1 ' . $period))
            ->setParameter('endDate', new \DateTime())
            ->setMaxResults(25)
            ->orderBy('game.result', 'DESC')
            ->getQuery()
            ->getResult();
    }
}
