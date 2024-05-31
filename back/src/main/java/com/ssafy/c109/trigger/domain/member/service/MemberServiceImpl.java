package com.ssafy.c109.trigger.domain.member.service;

import com.ssafy.c109.trigger.domain.member.dto.request.SignUpRequest;
import com.ssafy.c109.trigger.domain.member.entity.Member;
import com.ssafy.c109.trigger.domain.member.repository.MemberRepository;
import com.ssafy.c109.trigger.domain.ranking.entity.Ranking;
import com.ssafy.c109.trigger.domain.ranking.repository.RankingRepository;
import com.ssafy.c109.trigger.global.jpaEnum.Role;
import com.ssafy.c109.trigger.global.jpaEnum.Status;
import com.ssafy.c109.trigger.global.s3.AwsS3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final AwsS3Service awsS3Service;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final RankingRepository rankingRepository;

    @Override
    public void singUp(SignUpRequest signUpRequest, MultipartFile profileImg) throws Exception {
        if (memberRepository.findByEmail(signUpRequest.email()).isPresent()) { // getEmail() 메서드 호출로 수정합니다.
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        if (memberRepository.findByNickName(signUpRequest.nickName()).isPresent()) { // getNickName() 메서드 호출로 수정합니다.
            throw new Exception("이미 존재하는 닉네임입니다.");
        }

        String profileImgUrl;
        log.info("profileImg : " + profileImg);
        if (profileImg == null) {
            log.info("profileImg : " + profileImg);
            // 기본 이미지의 URL을 사용하도록 설정
            profileImgUrl = "https://trigger109-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8A%B8%EB%A6%AC%EA%B1%B0%EC%B5%9C%EC%A2%85%EB%A1%9C%EA%B3%A0.png"; // 예시로 기본 이미지의 URL을 넣어주세요
        } else {
            log.info("profileImg : " + profileImg);
            // 프로필 이미지를 S3에 업로드하고 URL을 받아옴
            profileImgUrl = awsS3Service.uploadFile(profileImg);
        }

        Member member = Member.builder()
                .email(signUpRequest.email()) // getEmail() 메서드 호출로 수정합니다.
                .password(passwordEncoder.encode(signUpRequest.password())) // passwordEncoder를 사용하여 비밀번호를 암호화합니다.
                .nickName(signUpRequest.nickName()) // getNickName() 메서드 호출로 수정합니다.
                .gender(signUpRequest.gender()) // SignUpRequest에서 getGender() 메서드가 구현되어 있다고 가정합니다.
                .role(Role.gamer)
                .createdAt(LocalDate.now())
                .profileImg(profileImgUrl)
                .status(Status.inactive)
                .build();

        memberRepository.save(member);

        // 무작위로 랭킹 값 설정
        Random random = new Random();
        long rating = 800 + random.nextInt(701); // 800 ~ 1500
        int killCnt = (int) ((rating - 800) * 0.1 + random.nextInt(10));
        int death = (int) (10 - (rating - 800) * 0.01 + random.nextInt(5));
        int isWin = (rating > 1100) ? 1 : (rating > 950) ? random.nextInt(2) : 0;

        Ranking ranking = Ranking.builder()
                .member(member)
                .rating(rating)
                .killCnt(killCnt)
                .death(death)
                .isWin(isWin)
                .createdAt(LocalDate.now())
                .build();

        rankingRepository.save(ranking);
    }

    @Override
    public Member getMemberInfo(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            return optionalMember.get();
        } else {
            throw new RuntimeException("해당 이메일로 등록된 회원이 없습니다: " + email);
        }
    }

    @Override
    public List<Member> getAllMemberInfo() {
        Optional<List<Member>> optionalMemberList = Optional.of(memberRepository.findAll());
        if(optionalMemberList.isPresent()){
            return optionalMemberList.get();
        }else{
            throw new RuntimeException("유저목록이 없습니다: ");
        }
    }
}

