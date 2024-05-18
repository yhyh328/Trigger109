package com.ssafy.c109.trigger.domain.notice.service;

import com.ssafy.c109.trigger.domain.member.entity.Member;
import com.ssafy.c109.trigger.domain.member.repository.MemberRepository;
import com.ssafy.c109.trigger.domain.notice.dto.request.PostNoticeRequest;
import com.ssafy.c109.trigger.domain.notice.dto.response.GetNoticeDetailResponse;
import com.ssafy.c109.trigger.domain.notice.dto.response.GetNoticeListResponse;
import com.ssafy.c109.trigger.domain.notice.entity.Notice;
import com.ssafy.c109.trigger.domain.notice.mapper.NoticeMapper;
import com.ssafy.c109.trigger.domain.notice.repository.NoticeRepository;
import com.ssafy.c109.trigger.global.s3.AwsS3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class NoticeServiceImpl implements NoticeService {

    private final AwsS3Service awsS3Service;
    private final NoticeRepository noticeRepository;
    private final MemberRepository memberRepository;
    private final NoticeMapper noticeMapper;
    @Override
    public List<GetNoticeListResponse> getNoticeList() {
        try {
            List<Notice> getNoticeList = noticeRepository.findAll();
            List<GetNoticeListResponse> getNoticeListResponseList = noticeMapper.toGetNoticeListResponse(getNoticeList);
            if(getNoticeListResponseList.isEmpty()){
                throw new RuntimeException("공지사항이 존재하지 않습니다.");
            }
            return getNoticeListResponseList;
        }catch (Exception e){
            // 예외 발생 시 로그를 남기고 예외 처리
            log.error("공지사항 목록을 불러오는 중 에러 발생: {}", e.getMessage());
            throw new RuntimeException("공지사항 목록을 불러오는 중 에러 발생했습니다.");
        }
    }
    @Override
    public GetNoticeDetailResponse getNoticeDetail(Long noticeId) {
        try {
            Notice getNotice = noticeRepository.findByNoticeId(noticeId);
            if (getNotice == null) {
                throw new RuntimeException("해당하는 공지사항을 찾을 수 없습니다. ID: " + noticeId);
            }
            GetNoticeDetailResponse getNoticeDetail = noticeMapper.toGetNoticeDetailResponse(getNotice);
            return getNoticeDetail;
        } catch (Exception e) {
            // 예외 발생 시 로그를 남기고 예외 처리
            log.error("공지사항 상세 정보를 불러오는 중 에러 발생: {}", e.getMessage());
            throw new RuntimeException("공지사항 상세 정보를 불러오는 중 에러 발생했습니다.");
        }
    }
    @Override
    public void postNotice(String email, PostNoticeRequest postNoticeRequest, String noticeImg) {
        try {
            Optional<Member> optionalMember = memberRepository.findByEmail(email);
            if (!optionalMember.isPresent()) {
                throw new RuntimeException("해당하는 회원을 찾을 수 없습니다. Email: " + email);
            }

            String profileImgUrl;
            if (noticeImg == null) {
                // 기본 이미지의 URL을 사용하도록 설정
                profileImgUrl = "https://trigger109-bucket.s3.ap-northeast-2.amazonaws.com/noticeImg.webp"; // 예시로 기본 이미지의 URL을 넣어주세요
            } else {
                // 프로필 이미지를 S3에 업로드하고 URL을 받아옴
                profileImgUrl = "https://trigger109-bucket.s3.ap-northeast-2.amazonaws.com/noticeImg.webp"; // 예시로 기본 이미지의 URL을 넣어주세요
//                profileImgUrl = awsS3Service.uploadFile(noticeImg);
            }

            Member member = optionalMember.get();
            Notice notice = Notice.builder()
                    .noticeCreatedAt(LocalDate.now())
                    .member(member)
                    .noticeTitle(postNoticeRequest.noticeTitle())
                    .noticeContent(postNoticeRequest.noticeContent())
                    .noticeCreatedAt(LocalDate.now())
                    .noticeEmergency(0)
                    .noticeViewCnt(0)
//                    .noticeImg(profileImgUrl)
                    .noticeImg(profileImgUrl)
                    .build();

            if (notice == null) {
                throw new RuntimeException("공지사항을 생성할 수 없습니다.");
            }

            noticeRepository.save(notice);

        } catch (Exception e) {
            // 예외 발생 시 로그를 남기고 예외 처리
            log.error("공지사항 등록 중 에러 발생: {}", e.getMessage());
            throw new RuntimeException("공지사항을 등록하는 데 에러가 발생했습니다.");
        }
    }

    @Override
    public void updateViewCnt(Long noticeId) {
        try {
            Notice notice = noticeRepository.findByNoticeId(noticeId);
            if (notice == null) {
                throw new RuntimeException("해당하는 공지사항을 찾을 수 없습니다. ID: " + noticeId);
            }
            notice.setNoticeViewCnt(notice.getNoticeViewCnt() + 1);
            noticeRepository.save(notice);
        } catch (Exception e) {
            // 예외 발생 시 로그를 남기고 예외 처리
            log.error("공지사항 조회수 업데이트 중 에러 발생: {}", e.getMessage());
            throw new RuntimeException("공지사항 조회수를 업데이트하는 중 에러가 발생했습니다.");
        }
    }


}
