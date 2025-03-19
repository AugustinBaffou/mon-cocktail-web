package com.augustinbaffou.mon_cocktail.auth.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PasswordResetConfirmDto {
    private String email;
    private String resetCode;
    private String newPassword;
}