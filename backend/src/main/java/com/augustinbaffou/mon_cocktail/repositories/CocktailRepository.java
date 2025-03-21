package com.augustinbaffou.mon_cocktail.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.augustinbaffou.mon_cocktail.entities.Cocktail;

@Repository
public interface CocktailRepository extends JpaRepository<Cocktail, Long> {
}
