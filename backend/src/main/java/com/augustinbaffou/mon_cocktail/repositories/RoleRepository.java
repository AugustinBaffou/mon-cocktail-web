package com.augustinbaffou.mon_cocktail.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.augustinbaffou.mon_cocktail.entities.Role;

public interface RoleRepository extends JpaRepository<Role,Long> {
}
