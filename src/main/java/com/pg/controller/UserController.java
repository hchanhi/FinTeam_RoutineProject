package com.pg.controller;

import com.pg.config.CurrentUser;
import com.pg.model.User;
import com.pg.exception.ResourceNotFoundException;
import com.pg.payload.UserIdentityAvailability;
import com.pg.payload.UserProfile;
import com.pg.payload.UserSummary;
import com.pg.payload.request.PasswordRequest;
import com.pg.payload.request.RequestChangePassword;
import com.pg.payload.response.ApiResponse;
import com.pg.repository.UserRepository;
import com.pg.service.AuthService;
import com.pg.service.PrincipalDetails;
import com.pg.service.UserService;
import com.pg.util.RedisUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


// UserController, API 작성
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthService authService;
    @Autowired
    private RedisUtil redisUtil;


    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    // 현재 로그인한 유저
    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser PrincipalDetails currentUser) {

        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getNickname());
        return userSummary;
    }

    // 유저 닉네임 체크
    @GetMapping("/user/checkNicknameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "nickname") String nickname) {
        Boolean isAvailable = !userRepository.existsByNickname(nickname);
        return new UserIdentityAvailability(isAvailable);
    }

    // 유저 이메일 체크
    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    // 유저 프로필

    @GetMapping("/users/{id}")
    public UserProfile getUserProfile(@PathVariable(value = "id") Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        UserProfile userProfile = new UserProfile(user.getId(), user.getNickname(), user.getEmail());

        return userProfile;
    }

    //닉네임 변경
    @PostMapping("/user/{id}/nickname")
    public boolean editNickname(@RequestBody HashMap<String, String> param){
       Long id = Long.parseLong(param.get("id"));
       String nickname = param.get("nickname");
       return userService.updateNickname(id, nickname);
    }

    //비밀번호 번경
    @PostMapping("/user/{id}/password")
    public boolean editPassword(@RequestBody HashMap<String, String> param){
        Long id = Long.parseLong(param.get("id"));
        String oldPassword = param.get("oldPassword");
        String newPassword = param.get("newPassword");
        return userService.updatePassword(id, oldPassword, newPassword);
    }

    //회원 삭제
    @PostMapping("/user/delete")
    public void deleteUser(@RequestBody HashMap<String, Long> param){
        long id = param.get("id");
        userService.deleteUser(id);
    }

    // 비밀번호 찾기
    @GetMapping("/user/passwordChange/{key}")
    public ApiResponse isPasswordUUIdValidate(@PathVariable String key) {
        ApiResponse apiResponse;
        System.out.println("key 인증 컨트롤러 들어왔다 : " + key);
        try {
            if (authService.isPasswordUuidValidate(key))
                apiResponse = new ApiResponse(true, authService.getUserEmailByCode(key));
            else
                apiResponse = new ApiResponse(false, "잘못된 경로입니다. 다시 확인해 주세요.");
        } catch (Exception e) {
            apiResponse = new ApiResponse(false, "잘못된 경로입니다. 다시 확인해 주세요.");
        }
        return apiResponse;
    }

    // 이메일 주소로 비밀번호 변경 링크 전송
    @PostMapping("/user/password")
        public ApiResponse requestChangePassword(@RequestBody RequestChangePassword requestChangePassword) {
            ApiResponse apiResponse;
            try {
                User user = authService.findByEmail(requestChangePassword.getEmail());
                System.out.println(user);
                if (!user.getEmail().equals(requestChangePassword.getEmail())) throw new NoSuchFieldException("");
                authService.requestChangePassword(user);
                apiResponse = new ApiResponse(true, "가입한 이메일 주소로 비밀번호 변경 메일을 보냈습니다.");
            } catch (NoSuchFieldException e) {
                apiResponse = new ApiResponse(false, "회원 정보를 찾을 수 없습니다. 다시 시도해 주세요.");
            } catch (Exception e) {
                apiResponse = new ApiResponse(false, "비밀번호를 변경할 수 없습니다. 다시 시도해 주세요.");
            }
        return apiResponse;
    }

    // 이메일 링크 검증 후 비밀번호 변경
    @PutMapping("/user/password")
    public ApiResponse changePassword(@RequestBody PasswordRequest passwordRequest) {
        ApiResponse apiResponse;
        try{
            User user = authService.findByEmail(passwordRequest.getEmail());
            authService.changePassword(user, passwordRequest.getPassword());
            apiResponse = new ApiResponse(true,"회원님의 비밀번호가 성공적으로 변경 되었습니다. ");
        }catch(Exception e){
            apiResponse = new ApiResponse(false,"비밀번호 변경에 실패했습니다. 다시 시도해 주세요.");
        }
        return apiResponse;

    }
}
