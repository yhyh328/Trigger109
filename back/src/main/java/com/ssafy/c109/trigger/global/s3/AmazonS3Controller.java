package com.ssafy.c109.trigger.global.s3;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/s3/file")
public class AmazonS3Controller {

    private final AwsS3Service awsS3Service;

    @PostMapping("/uploadFile")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile multipartFile){
        return ResponseEntity.ok(awsS3Service.uploadFile(multipartFile));
    }

//    @PostMapping("/uploadFile")
//    public ResponseEntity<List<String>> uploadFile(List<MultipartFile> multipartFiles){
//        return ResponseEntity.ok(awsS3Service.uploadFile(multipartFiles));
//    }
    @DeleteMapping("/deleteFile")
    public ResponseEntity<String> deleteFile(@RequestParam String fileName){
        awsS3Service.deleteFile(fileName);
        return ResponseEntity.ok(fileName);
    }
}

