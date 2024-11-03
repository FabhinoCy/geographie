<?php

namespace App\Controller\Admin;

use App\Entity\Capital;
use App\Entity\Continent;
use App\Entity\Country;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        return $this->render('admin/index.html.twig');
        return parent::index();
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Geographie');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');
        yield MenuItem::linkToCrud('Continent', 'fas fa-list', Continent::class);
        yield MenuItem::linkToCrud('Country', 'fas fa-list', Country::class);
        yield MenuItem::linkToCrud('Capital', 'fas fa-list', Capital::class);
    }
}
