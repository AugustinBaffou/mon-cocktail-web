package com.augustinbaffou.mon_cocktail.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TypeDto {
    private Long id;
    private String name;
    private String emoji;
}