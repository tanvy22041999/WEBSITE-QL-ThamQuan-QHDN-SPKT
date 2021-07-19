package com.stc.vieclam.dtos.sinhvien;


import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


/**
 * Created by: IntelliJ IDEA
 * User      : thanhtruc
 * Date      : 4/8/21
 * Time      : 2:43
 * Filename  : SinhVienDto
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SinhVienDto {
    private String maSV;

    private String hoTen;

    private String email;

    private Date ngaySinh;

    private Date thoiGianTotNghiepDuKien;

    private String dienThoai;

    private String queQuan;

    private boolean gioiTinh;

    @ApiModelProperty(value = "Id ngành")
    private String nganhDaoTao;

}
