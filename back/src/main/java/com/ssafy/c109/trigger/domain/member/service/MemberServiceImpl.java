package com.ssafy.c109.trigger.domain.member.service;

import com.ssafy.c109.trigger.domain.member.dto.request.SignUpRequest;
import com.ssafy.c109.trigger.domain.member.entity.Member;
import com.ssafy.c109.trigger.domain.member.repository.MemberRepository;
import com.ssafy.c109.trigger.global.jpaEnum.Role;
import com.ssafy.c109.trigger.global.jpaEnum.Status;
import com.ssafy.c109.trigger.global.s3.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final AwsS3Service awsS3Service;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void singUp(SignUpRequest signUpRequest) throws Exception {
        if (memberRepository.findByEmail(signUpRequest.email()).isPresent()) { // getEmail() 메서드 호출로 수정합니다.
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        if (memberRepository.findByNickName(signUpRequest.nickName()).isPresent()) { // getNickName() 메서드 호출로 수정합니다.
            throw new Exception("이미 존재하는 닉네임입니다.");
        }

        String profileImgUrl;
        if (signUpRequest.profileImg() == null) {
            // 기본 이미지의 URL을 사용하도록 설정
            profileImgUrl = "기본 이미지 URL"; // 예시로 기본 이미지의 URL을 넣어주세요
        } else {
            // 프로필 이미지를 S3에 업로드하고 URL을 받아옴
            profileImgUrl = awsS3Service.uploadFile(signUpRequest.profileImg());
        }

        Member member = Member.builder()
                .email(signUpRequest.email()) // getEmail() 메서드 호출로 수정합니다.
                .password(passwordEncoder.encode(signUpRequest.password())) // passwordEncoder를 사용하여 비밀번호를 암호화합니다.
                .nickName(signUpRequest.nickName()) // getNickName() 메서드 호출로 수정합니다.
                .gender(signUpRequest.gender()) // SignUpRequest에서 getGender() 메서드가 구현되어 있다고 가정합니다.
                .role(Role.gamer)
                .createdAt(LocalDate.from(LocalDateTime.now()))
                .profileImg(profileImgUrl)
                .status(Status.inactive)
                .build();

        memberRepository.save(member);
    }
}

