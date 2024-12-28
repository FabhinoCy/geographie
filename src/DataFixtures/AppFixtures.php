<?php

namespace App\DataFixtures;

use App\Entity\Game;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $users = [];
        for ($i = 0; $i < 45; $i++) {
            $user = new User();
            $user->setEmail('test' . $i . '@gmail.com')
                ->setPseudo('test' . $i)
                ->setBirthday(new \DateTimeImmutable())
                ->setFirstname('Fabien')
                ->setLastname('CURFS')
                ->setPassword('fabien');

            $manager->persist($user);
            $users[] = $user;
        }

        for ($j = 0; $j < 80; $j++) {
            $game = new Game();

            $randomUser = $users[array_rand($users)];
            $game->setUser($randomUser)
                ->setType('capitales-europe')
                ->setScore(10000)
                ->setResult(10000 * 36)
                ->setTime('36');

            $manager->persist($game);
        }

        $manager->flush();
    }
}
