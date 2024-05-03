package com.ssafy.c109.trigger.global.controller;


import com.ssafy.c109.trigger.domain.member.dto.request.SignUpRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
public class HomeController {
	@PostMapping(value="/api/v1/users/signup/gamer")
	public ResponseEntity<Void> signUpGamer(@RequestBody SignUpRequest signUpRequest) {
		return ResponseEntity.ok().build();
	}
	@PostMapping(value="/api/v1/users/signup/admin")
	public ResponseEntity<Void> signUpAdmin(@RequestBody SignUpRequest signUpRequest) {
		return ResponseEntity.ok().build();
	}
}