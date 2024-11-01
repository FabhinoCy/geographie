<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241101200251 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE capital ADD country_id INT NOT NULL');
        $this->addSql('ALTER TABLE capital ADD CONSTRAINT FK_307CBAA6F92F3E70 FOREIGN KEY (country_id) REFERENCES country (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_307CBAA6F92F3E70 ON capital (country_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE capital DROP FOREIGN KEY FK_307CBAA6F92F3E70');
        $this->addSql('DROP INDEX UNIQ_307CBAA6F92F3E70 ON capital');
        $this->addSql('ALTER TABLE capital DROP country_id');
    }
}
