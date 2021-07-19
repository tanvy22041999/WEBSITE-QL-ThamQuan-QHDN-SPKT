package com.stc.vieclam.securities.provider;

import com.stc.vieclam.securities.TaiKhoanDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Locale;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 3/31/21
 * Time      : 17:56
 * Filename  : TaiKhoanAuthenticationProvider
 */
@Slf4j
@Service
public class TaiKhoanAuthenticationProvider implements AuthenticationProvider {

    private final TaiKhoanDetailsService taiKhoanDetailsService;

    private final MessageSource messageSource;

    public TaiKhoanAuthenticationProvider(TaiKhoanDetailsService taiKhoanDetailsService, MessageSource messageSource) {
        this.taiKhoanDetailsService = taiKhoanDetailsService;
        this.messageSource = messageSource;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        Locale locale = LocaleContextHolder.getLocale();
        TaiKhoanAuthenticationToken token = (TaiKhoanAuthenticationToken) authentication;
        String email = token.getName();
        String password = token.getCredentials() == null ? null : token.getCredentials().toString();
        boolean verifyCredentials = Boolean.parseBoolean(token.isVerifyCredentials().toString());
        UserDetails userDetails = taiKhoanDetailsService.loadUserByUsername(email);
        if (!userDetails.isEnabled())
            throw new BadCredentialsException(messageSource.getMessage("error.accountdisable",null,locale));
        if (verifyCredentials) {
            assert password != null;
            if (password.equals(userDetails.getPassword())) {
                return new TaiKhoanAuthenticationToken(email, password, verifyCredentials, userDetails.getAuthorities());
            } else {
                throw new BadCredentialsException(messageSource.getMessage("error.passwordwrong",null,locale));
            }
        } else {
            return new TaiKhoanAuthenticationToken(email, "N/A", verifyCredentials, userDetails.getAuthorities());
        }
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.equals(TaiKhoanAuthenticationToken.class);
    }
}
