package com.packt.cardatabase;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.packt.cardatabase.service.UserDetailsServiceImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import java.util.Arrays;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	private final UserDetailsServiceImpl userDetailsService;
	private final AuthenticationFilter authenticationFilter;
	private final AuthEntryPoint exceptionHandler;
	
	public SecurityConfig(UserDetailsServiceImpl userDetailsService, AuthenticationFilter authenticationFilter, AuthEntryPoint exceptionHandler) {
		this.userDetailsService = userDetailsService; 
		this.authenticationFilter = authenticationFilter;
		this.exceptionHandler = exceptionHandler;
	}
	
	public void configureGlobal (AuthenticationManagerBuilder auth) throws Exception{
		auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
	}
	
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(
			AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
		
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	    http
	        .csrf(csrf -> csrf.disable()) // CSRF 비활성화
	        .cors(cors -> cors.configurationSource(configurationSource())) // CORS 설정 적용
	        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	        .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());

		
		/*		http.csrf((csrf) -> csrf.disable())
			.cors(withDefaults())
			.sessionManagement((sessionManagement) -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.authorizeHttpRequests((authorizeHttpRequests)->authorizeHttpRequests.requestMatchers(HttpMethod.POST,"/login").permitAll())
//																			.requestMatchers("/admin/**").hasRole("ADMIN")
//																			.requestMatchers("/user/**").hasRole("USER").anyRequest())
			.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class)
			.exceptionHandling((exceptionHandling) -> exceptionHandling.authenticationEntryPoint(exceptionHandler)); 
		 */			
			
		return http.build();
	}
	
	// 클래스 내에 전역 CORS 필터 추
	@Bean
	public CorsConfigurationSource configurationSource() {
	    CorsConfiguration config = new CorsConfiguration();
	    
	    // 허용할 프론트엔드 도메인 지정 (React 앱 주소)
	    config.setAllowedOrigins(Arrays.asList("http://localhost:5173")); 

	    // 허용할 HTTP 메서드
	    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

	    // 허용할 헤더 설정
	    config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));

	    // 인증 정보 포함 가능하도록 설정
	    config.setAllowCredentials(true);

	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", config);

	    return source;
	}
}

