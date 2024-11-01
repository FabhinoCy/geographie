<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/country/', name:'app_')]
class CountryController extends AbstractController
{
    #[Route('france', name: 'france')]
    public function france(): Response
    {
        return $this->render('country/france.html.twig', [
            ''
        ]);
    }

    #[Route('europe', name: 'europe')]
    public function europe(): Response
    {
        return $this->render('country/europe.html.twig', [
            ''
        ]);
    }

    #[Route('afrique', name: 'afrique')]
    public function afrique(): Response
    {
        return $this->render('country/afrique.html.twig', [
            ''
        ]);
    }

    #[Route('asie', name: 'asie')]
    public function asie(): Response
    {
        return $this->render('country/asie.html.twig', [
            ''
        ]);
    }

    #[Route('oceanie', name: 'oceanie')]
    public function oceanie(): Response
    {
        return $this->render('country/oceanie.html.twig', [
            ''
        ]);
    }

    #[Route('amerique', name: 'amerique')]
    public function amerique(): Response
    {
        return $this->render('country/amerique.html.twig', [
            ''
        ]);
    }
}
