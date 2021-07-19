package com.stc.vieclam.configs;

import com.stc.vieclam.securities.*;
import com.stc.vieclam.securities.provider.NhaTuyenDungAuthenticationProvider;
import com.stc.vieclam.securities.provider.SinhVienAuthenticationProvider;
import com.stc.vieclam.securities.provider.TaiKhoanAuthenticationProvider;
import com.stc.vietnamstringutils.VietnameseStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 3/31/21
 * Time      : 09:50
 * Filename  : WebSecurityConfig
 */
@Order
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtTokenUtils jwtTokenUtils;

    @Autowired
    private TaiKhoanDetailsService taiKhoanDetailsService;

    @Autowired
    private SinhVienDetailsService sinhVienDetailsService;

    @Autowired
    private NhaTuyenDungDetailsService nhaTuyenDungDetailsService;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private MessageSource messageSource;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(getTaiKhoanProvider())
                .authenticationProvider(getSinhVienProvider())
                .authenticationProvider(getNhaTuyenDungProvider());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                .antMatchers("/swagger-ui.html").permitAll()
                .antMatchers("/webjars/**").permitAll()
                .antMatchers("/swagger-resources/**").permitAll()
                .antMatchers("/v2/**").permitAll()
                .antMatchers(HttpMethod.GET, "/rest/**").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .antMatchers(HttpMethod.POST, "/rest/login/**").permitAll()
                .anyRequest().authenticated();
        http.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);

        http.headers().cacheControl();
    }

    private AuthenticationProvider getTaiKhoanProvider() {
        return new TaiKhoanAuthenticationProvider(taiKhoanDetailsService, messageSource);
    }

    private AuthenticationProvider getSinhVienProvider() {
        return new SinhVienAuthenticationProvider(sinhVienDetailsService, messageSource);
    }

    private AuthenticationProvider getNhaTuyenDungProvider() {
        return new NhaTuyenDungAuthenticationProvider(nhaTuyenDungDetailsService, messageSource);
    }

    @Bean
    public JwtTokenFilter authenticationTokenFilterBean() throws Exception {
        return new JwtTokenFilter();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public JwtTokenUtils getJwtTokenUtils() {
        return jwtTokenUtils;
    }

    @Bean
    public VietnameseStringUtils getVietnameseStringUtils() {
        return new VietnameseStringUtils();
    }

}
