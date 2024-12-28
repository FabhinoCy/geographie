<?php

namespace App\DataFixtures;

use App\Entity\Game;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        $users = [];
        for ($i = 0; $i < 45; $i++) {
            $user = new User();
            $user->setEmail($faker->unique()->email)
                ->setPseudo($faker->unique()->userName)
                ->setBirthday(new \DateTimeImmutable())
                ->setFirstname($faker->firstName)
                ->setLastname($faker->lastName)
                ->setPassword($faker->password);

            $manager->persist($user);
            $users[] = $user;
        }

        for ($j = 0; $j < 80; $j++) {
            $game = new Game();

            $randomUser  = $users[array_rand($users)];
            $randomTime  = rand(2, 48);
            $randomScore = rand(500, 10000);

            $game->setUser($randomUser)
                ->setType('capitales-europe')
                ->setScore($randomScore)
                ->setResult($randomScore * $randomTime)
                ->setTime($randomTime);

            $manager->persist($game);
        }

        $manager->flush();
    }
}
