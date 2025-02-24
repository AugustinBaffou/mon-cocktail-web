package com.augustinbaffou.mon_cocktail.auth.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class LoginDto {

    private String email;
    private String password;

}