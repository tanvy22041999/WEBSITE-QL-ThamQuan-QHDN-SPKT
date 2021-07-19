package com.stc.vieclam.dtos.taikhoan;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 4/8/21
 * Time      : 13:45
 * Filename  : TaiKhoanDto
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaiKhoanDto {
    private String email;

    private String password;

    private String hoTen;

    private List<String> roles = new ArrayList<>();
}
